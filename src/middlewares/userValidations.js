const bcrypt = require('bcryptjs/dist/bcrypt');
const { check } = require('express-validator');
const path = require('path');
const usuarios = require('../database/usersDetalle.json');
const User = require('../models/users');

const db = require('../database/models/index.js');
const user = require('../models/users');
const { promiseImpl } = require('ejs');
const Op = db.Sequelize.Op;

const userValidations = [
	check('firstName')
		.notEmpty()
		.withMessage('Tienes que completar con tu nombre')
		.bail()
		.isLength({ min: 2 })
		.withMessage('Tiene que ser mayor a dos letras'),
	check('lastName')
		.notEmpty()
		.withMessage('Tienes que completar con tu apellido')
		.bail()
		.isLength({ min: 2 })
		.withMessage('Tiene que ser mayor a dos letras'),
	check('userName')
		.notEmpty()
		.withMessage('Tienes que elegir un nombre de usuario')
		.bail()
		.isLength({ min: 4 })
		.withMessage('Tu nombre de usuario tiene que ser mayor de 4 caracteres')
		.isLength({max: 15})
		.withMessage('Tu nombre de usuario tiene que ser menor de 15 caracteres')
		.bail()
		.custom(async (value, { req }) => {
			let allUserNames = await db.Users.findAll();
			if (allUserNames !== null) {
				for (let i = 0; i < allUserNames.length; i++) {
					if (
						allUserNames[i].dataValues.userName
							.toLowerCase()
							.trim()
							.replaceAll('-', '')
							.replaceAll('_', '')
							.replaceAll('.', '')
							.replaceAll(' ', '') ===
						value
							.toLowerCase()
							.trim()
							.replaceAll('-', '')
							.replaceAll('_', '')
							.replaceAll('.', '')
							.replaceAll(' ', '')
					) {
						throw new Error(
							'El nombre de usuario ya existe. Prube con otro'
						);
					}
				}
			}

			return true;
		}),
	check('email')
		.notEmpty()
		.withMessage('Tienes que completar con tu email')
		.bail()
		.isEmail()
		.withMessage('Tienes que ser un correo electronico valido')
		.bail()
		.custom(async (value, { req }) => {
			let userEmail = await db.Users.findOne({
				where: { email: value.toLowerCase() },
			});

			if (
				userEmail !== null &&
				userEmail.dataValues.email === value.toLowerCase()
			) {
				throw new Error('El email ya se encuentra registrado.');
			}

			return true;
		}),
	check('emailRespaldo')
		.notEmpty()
		.withMessage('Tienes que completar con tu email')
		.bail()
		.isEmail()
		.withMessage('Tienes que ser un correo electronico valido')
		.bail()
		.custom(async (value, { req }) => {
			let email = req.body.email.toLowerCase();
			let emailRespaldo = value.toLowerCase();

			if (email === emailRespaldo) {
				throw new Error(
					'El email de respaldo tiene que ser distinto al email'
				);
			}
			return true;
		}),
	check('password')
		.notEmpty()
		.withMessage('Tienes que poner una contraseña')
		.bail()
		.isLength({ min: 6 })
		.withMessage('La contraseña tiene que tener mas de 6 caracteres')
		.bail()
		.custom((value, { req }) => {
			let password = value;
			let password2 = req.body.password2;

			if (password !== password2) {
				throw new Error('La contraseña es distinta, pruebe otra vez');
			}
			return true;
		}),
	check('phoneNumber')
		.notEmpty()
		.withMessage('Tienes que poner tu número de telefono')
		.bail()
		.isNumeric()
		.withMessage('Tienes que poner un número de telefono')
		.bail()
		.isLength({ min: 13 })
		.withMessage('Un numero de telefono tiene 13 numeros')
		.bail()
		.isLength({ max: 13 })
		.withMessage('Un numero de telefono tiene 13 numeros')
		.bail()
		.custom(async (value, { req }) => {
			if (parseInt(value) < 0) {
				throw new Error('Esto no es un numero de telefono');
			}
			return true;
		})
		.bail()
		.custom(async (value, { req }) => {
			let allPhoneNumbers = await db.Users.findOne({
				where: {
					phoneNumber: value,
				},
			});

			if (allPhoneNumbers !== null) {
				throw new Error('Este numero de telefono ya esta registrado');
			}

			return true;
		}),
	check('phoneNumberRespaldo')
		.notEmpty()
		.withMessage('Tienes que poner tu número de telefono')
		.bail()
		.isNumeric()
		.withMessage('Tienes que poner un número de telefono')
		.bail()
		.isLength({ min: 13 })
		.withMessage('Un numero de telefono tiene 13 numeros')
		.bail()
		.isLength({ max: 13 })
		.withMessage('Un numero de telefono tiene 13 numeros')
		.bail()
		.custom(async (value, { req }) => {
			if (parseInt(value) < 0) {
				throw new Error('Esto no es un numero de telefono');
			}
			return true;
		})
		.bail()
		.custom(async (value, { req }) => {
			let phoneNumber = req.body.phoneNumber;
			let phoneNumberRespaldo = value;

			if (phoneNumber === phoneNumberRespaldo) {
				throw new Error('El numero de respaldo tiene que ser distinto');
			}
		}),
	check('avatar').custom((value, { req }) => {
		let file = req.file;
		let validExtension = ['.jpg', '.png', '.PNG', '.JPG'];

		if (file) {
			let fileExtension = path.extname(file.originalname);
			if (!validExtension.includes(fileExtension)) {
				throw new Error(
					`Las extensiones tienen que ser ${validExtension.join(
						', '
					)}"`
				);
			}
		}
		return true;
	}),
	check('genero_id').notEmpty().withMessage('Debes elegir tu genero'),
	check('dni')
		.notEmpty()
		.withMessage('Tienes que completar con tu dni')
		.bail()
		.isNumeric()
		.withMessage('Tienes que poner tu dni')
		.bail()
		.isLength({ min: 8 })
		.withMessage('Esto no es un dni')
		.bail()
		.isLength({ max: 8 })
		.withMessage('Esto no es un dni'),
	check('birthday')
		.notEmpty()
		.withMessage('Tienes que completar con tu fecha de nacimiento')
		.bail()
		.custom((value, { req }) => {
			function calcularEdad(value) {
				let fechaDeNacimiento = new Date(value);

				let hoy = new Date();

				let edad = hoy.getFullYear() - fechaDeNacimiento.getFullYear();
				let m = hoy.getMonth() - fechaDeNacimiento.getMonth();

				if (
					m < 0 ||
					(m === 0 && hoy.getDate() < fechaDeNacimiento.getDate())
				) {
					edad--;
				}
				return edad;
			}

			let edad = calcularEdad(value);
			if (edad < 18) {
				throw new Error('Tienes que ser mayor de edad');
			}

			return true;
		}),
	check('provincia')
		.notEmpty()
		.withMessage('Tienes que poner la provincia en donde vives')
		.bail(),
	check('municipio')
		.notEmpty()
		.withMessage('Tienes que poner el municipio en donde vives')
		.bail(),
	check('ciudad')
		.notEmpty()
		.withMessage('Tienes que poner la ciudad en donde vives')
		.bail(),
	check('calle')
		.notEmpty()
		.withMessage('Tienes que poner la calle en donde vives')
		.bail(),
	check('numeroVivienda')
		.notEmpty()
		.withMessage('Tienes que poner tu numero de vivienda')
		.bail(),
	check('codigoPostal')
		.notEmpty()
		.withMessage('Tienes que poner tu codigo postal')
		.bail(),
];

module.exports = userValidations;

// .custom(async (value, { req }) =>{
//     let entryUserEmail = req.body.email.toLowerCase();

//     let userEmail = await Users.findOne({
//         where: {
//             email: entryUserEmail
//         }
//     })
//     if (userEmail !== null) {
//         if (userEmail.dataValues.email === value) {
//             return Promise.resolve();
//         } else {
//             return Promise.reject();
//             }
//         }
//     })
//     .withMessage("El email ya se encuentra registrado.")
// })

// .custom(async value => {
//     let userEmail = await User.findOne({
//         where: { 'email': value }
//     })
//     if (userEmail !== null) {
//         if (userEmail.dataValues.email === value) {
//             return Promise.resolve();
//         } else {
//             return Promise.reject();
//         }
//       }
// })
// .withMessage("El email ya se encuentra registrado.")

// async function usersNames (){
//     let allUserNames = await db.Users.findAll()
//     if(allUserNames){
//         for (let i = 0; i < userNamesData.length; i++) {
//             if(userNamesData[i].dataValues.userName.toLowerCase() === value.toLowerCase()){
//                 return Promise.reject();
//             } else {
//                 return Promise.resolve();
//             }
//         }
//     }
// }

// let allUserNames = await db.Users.findAll()
// if(allUserNames !== null){
//     for (let i = 0; i < allUserNames.length; i++) {
//         if(allUserNames !== null){
//             if(allUserNames[i].dataValues.userName.toLowerCase() === value.toLowerCase()){
//                 return Promise.reject();
//             }
//         }
//         else {
//             return Promise.resolve();
//         }
//     }
// }

// messi('fran isol')

// if (dios !== null && dios[i].dataValues.userName.toLowerCase() === value.toLowerCase()) {
//     console.log('hola');
//     return Promise.reject();
// } else {
//     console.log('chau');
//
// }

// function verificarNombreDeUsuario (usersNames, entryUserName){
//     let entryUserNameLowerCase = entryUserName.toLowerCase()
//     for (let i = 0; i < usersNames.length; i++) {
//         if(usersNames[i] === entryUserNameLowerCase){
//             throw new Error ('Este nombre de usuario ya existe')
//         }
//     }
// }
// verificarNombreDeUsuario(nombresDeUsuario(), entryUserName)
// console.log(usersNames());

// let value = 'tomi@gmail.com'

// async function hola(){
//     let userEmail = await db.Users.findOne({
//         where: { email: value.toLowerCase() }
//     })
//     if (userEmail !== null) {
//         return Promise.reject();
//     } else {
//         return Promise.resolve();
//     }
// }

// console.log(hola());

// const all = User.findAll()
// function nombresDeUsuario(){
//     let nombreDeUsuario = []
//     let userNameLowerCase;
//     for (let i = 0; i < all.length; i++) {
//         userNameLowerCase = all[i].userName;
//         nombreDeUsuario.push(userNameLowerCase.toLowerCase());
//     }
//     return nombreDeUsuario;
// }

// function verificarNombreDeUsuario (usersNames, entryUserName){
//     let entryUserNameLowerCase = entryUserName.toLowerCase()
//     for (let i = 0; i < usersNames.length; i++) {
//         if(usersNames[i] === entryUserNameLowerCase){
//             throw new Error ('Este nombre de usuario ya existe')
//         }
//     }
// }
// verificarNombreDeUsuario(nombresDeUsuario(), entryUserName)

// return true

// async function hola(){
//     let value = '   f r  an     -is ol  a   '
//     let allUserNames = await db.Users.findAll()
//     console.log(allUserNames);
//     if(allUserNames !== null){
//         for (let i = 0; i < allUserNames.length; i++) {
//             if (allUserNames[i].dataValues.userName.toLowerCase().trim().replaceAll('-', '').replaceAll('_', '').replaceAll('.', '').replaceAll(' ', '') === value.toLowerCase().trim().replaceAll('-', '').replaceAll('_', '').replaceAll('.', '').replaceAll(' ', '')){
//                 ("El nombre de usuario ya existe. Prube con otro")
//             }
//         }
//     }
// }

// hola()

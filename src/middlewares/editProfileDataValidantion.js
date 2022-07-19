const { check } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const usuarios = require('../database/usersDetalle.json');
const User = require('../models/users');

const validations = [
	check('newAvatar').custom((value, { req }) => {
		let file = req.file;
		let validExtension = ['.jpg', '.png', '.PNG', '.JPG', '.jpeg', '.JPEG'];

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
	check('newUserName')
		.notEmpty()
		.withMessage('Tienes que elegir un nombre de usuario')
		.bail()
		.isLength({ min: 4 })
		.withMessage('Tu nombre de usuario tiene que ser mayor de 4 caracteres')
		.bail()
		.isLength({ max: 15 })
		.withMessage(
			'Tu nombre de usuario tiene que ser menor de 15 caracteres'
		)
		.custom(async (value, { req }) => {
			let idUser = req.params.id;

			let userName = value
				.toLowerCase()
				.trim()
				.replaceAll('-', '')
				.replaceAll('_', '')
				.replaceAll('.', '')
				.replaceAll(' ', '');

			let userNameById = await db.Users.findByPk(idUser);

			let users = await db.Users.findAll({
				where: {
					estadoCuenta: 1,
				},
			});

			if (users !== null) {
				for (let i = 0; i < users.length; i++) {
					if (
						users[i].dataValues.userName
							.toLowerCase()
							.trim()
							.replaceAll('-', '')
							.replaceAll('_', '')
							.replaceAll('.', '')
							.replaceAll(' ', '') === userName &&
						userNameById.dataValues.userName
							.toLowerCase()
							.trim()
							.replaceAll('-', '')
							.replaceAll('_', '')
							.replaceAll('.', '')
							.replaceAll(' ', '') !== userName
					) {
						throw new Error(
							'El nombre de usuario ya existe. Prube con otro'
						);
					}
				}
			}

			return true;
		}),
	check('newEmail')
		.notEmpty()
		.withMessage('Tienes que poner un email')
		.bail()
		.isEmail()
		.withMessage('Tiene que ser un correo electronico valido')
		.bail()
		.custom(async (value, { req }) => {
			let idUser = req.params.id;

			let email = value.toLowerCase().trim();

			let emailById = await db.Users.findByPk(idUser);

			let users = await db.Users.findAll();

			if (users !== null) {
				for (let i = 0; i < users.length; i++) {
					if (
						users[i].dataValues.email.toLowerCase().trim() ===
							email &&
						emailById.dataValues.email.toLowerCase().trim() !==
							email
					) {
						throw new Error('Este email ya existe. Prube con otro');
					}
				}
			}

			return true;
		}),
	check('newPhoneNumber')
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
			let idUser = req.params.id;

			let phoneNumber = value;

			let phoneNumberById = await db.Users.findByPk(idUser);

			let users = await db.Users.findAll();

			if (users !== null) {
				for (let i = 0; i < users.length; i++) {
					if (
						users[i].dataValues.phoneNumber === phoneNumber &&
						phoneNumberById.dataValues.phoneNumber !== phoneNumber
					) {
						throw new Error(
							'Este numero de telefono ya esta vinculado. Prube con otro'
						);
					}
				}
			}

			return true;
		}),
];

module.exports = validations;

// async function hola(value){

//     let id = 1
//     let userName = value.trim().toLowerCase()

//     let userByIdUserName = await db.Users.findAll({
//         where: {
//             id: id,
//             userName: userName,
//         }
//     })
//     if(userByIdUserName !== null){
//         return Promise.resolve()
//     } else {
//         db.Users.findAll()
//         .then(function(allUsers){
//             if(allUsers)
//         })
//     }

// }

// hola('    FRAN isola   ')

// db.Users.findAll()
//         .then(function(allUsers){
//             console.log(allUsers[1].dataValues);
//         })

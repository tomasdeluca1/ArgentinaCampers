const { check } = require('express-validator');
const db = require('../../database/models');

const validations = [
	check('email')
		.notEmpty()
		.withMessage('Este campo es obligatorio')
		.bail()
		.isEmail()
		.withMessage('Tienes que poner tu email correctamente')
		.bail()
		.custom(async (value, { req }) => {
			// let email = req.body.email.toLowerCase();
			// let findingEmail = User.findByField('email', email)
			// if(findingEmail == undefined){
			//     throw new Error ('Este email no existe')
			// }
			// return true
			let findingEmail = await db.Users.findOne({
				where: {
					estadoCuenta: 1,
					email: value.toLowerCase(),
				},
			});

			if (findingEmail === null) {
				throw new Error('Este email no existe');
			}

			return true;
		}),
	check('password')
		.notEmpty()
		.withMessage('Este campo es obligatorio')
		.bail(),
];

module.exports = validations;

// async function messi (value){
//     let findingEmail = await db.Users.findOne({
//         where: {
//             email: value.toLowerCase()
//         }
//     })
//     if(findingEmail === null){
//         if(findingEmail === null){
//             return Promise.resolve()
//         } else {
//             return Promise.reject()
//         }
//     }
// }

// async function messi (value){
//     let findingEmail = await db.Users.findOne({
//         where: {
//             email: value.toLowerCase()
//         }
//     })
//     console.log(findingEmail === null ? 'si' : 'no');
//     if(findingEmail !== null){
//         if(findingEmail !== null && value.toLowerCase() === findingEmail.dataValues.email){
//             return Promise.resolve()
//         } else if (findingEmail === null){
//             return Promise.reject()
//         }
//     }
// }

// messi('FRANDELQUERAN@GMAIL.COm')

// let findingEmail = await db.Users.findOne({
//                 where: {
//                     email: email
//                 }
//             })
//             console.log(findingEmail);
//             if(findingEmail == null){
//                 if(findingEmail == null){
//                     return Promise.resolve()
//                 } else {
//                     return Promise.reject()
//                 }
//             }

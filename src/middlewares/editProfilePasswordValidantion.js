const { check } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

const validations = [
	check('oldPassword')
		.notEmpty()
		.withMessage('Tienes que poner tu contraseña actual')
		.bail()
		.custom(async (value, { req }) => {
			let user = await db.Users.findByPk(req.params.id);
			let password = value;
			let verifyingPassword = bcrypt.compareSync(password, user.password);
			if (!verifyingPassword) {
				throw new Error('La contraseña es distinta a la actual');
			}

			return true;
		}),
	check('newPassword')
		.notEmpty()
		.withMessage('Tienes que poner una contraseña nueva')
		.bail()
		.isLength({ min: 6 })
		.withMessage('La contraseña tiene que tener mas de 6 caracteres')
		.bail()
		.custom(async (value, { req }) => {
			let user = await db.Users.findByPk(req.params.id);
			let password = value;

			let verifyingPassword = bcrypt.compareSync(password, user.password);

			if (verifyingPassword) {
				throw new Error(
					'La nueva contraseña tiene que ser distinta a la actual'
				);
			}

			return true;
		})
		.bail()
		.custom((value, { req }) => {
			let password = value;
			let password2 = req.body.confirmNewPassword;

			if (password !== password2) {
				throw new Error('La contraseña es distinta, pruebe otra vez');
			}
			return true;
		}),
];

module.exports = validations;

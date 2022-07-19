const { check } = require('express-validator');
const db = require('../../database/models');
const bcrypt = require('bcryptjs');

const validations = [
	check('password')
		.notEmpty()
		.withMessage(
			'Tienes que poner tu contraseña si quieres eliminar tu cuenta'
		)
		.bail()
		.custom(async (value, { req }) => {
			let user = await db.Users.findByPk(req.params.id);
			let password = value;
			let verifyingPassword = bcrypt.compareSync(password, user.password);
			if (!verifyingPassword) {
				throw new Error('Contraseña invalida');
			}

			return true;
		})
		.bail()
		.custom((value, { req }) => {
			let password = value;
			let password2 = req.body.password2;

			if (password !== password2) {
				throw new Error('La contraseña es distinta, pruebe otra vez');
			}
			return true;
		}),
];

module.exports = validations;

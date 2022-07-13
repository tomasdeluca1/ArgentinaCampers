const { check } = require('express-validator');
const path = require('path');
const usuarios = require('../database/usersDetalle.json');

const reviewValidations = [
	check('destino')
		.notEmpty()
		.withMessage('Tienes que completar con el destino de tu aventura')
		.bail()
		.isLength({ min: 2 })
		.withMessage('Tiene que ser mayor a dos letras'),
	check('experiencia')
		.notEmpty()
		.withMessage('Tienes que poner cual fue tu experiencia de tu aventura'),
	check('titulo')
		.notEmpty()
		.withMessage('Tienes que ponerle un titulo a tu aventura')
		.bail()
		.isLength({ min: 2 })
		.withMessage('Tiene que ser mayor a dos letras')
		.bail()
		.isLength({ max: 40 })
		.withMessage('El titulo no puede tener mas de 40 caracteres'),
	check('descripcion')
		.notEmpty()
		.withMessage('Tienes que hacer una descripcion de tu aventura')
		.bail()
		.isLength({ min: 2 })
		.withMessage('Tiene que ser mayor a dos letras')
		.bail(),
];

module.exports = reviewValidations;

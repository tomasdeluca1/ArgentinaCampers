const { check } = require('express-validator')


const validations = [
    check('selectTipoDeUsuario')
        .notEmpty()
        .withMessage('Tienes que seleccionar un tipo de usuario')
]

module.exports = validations;


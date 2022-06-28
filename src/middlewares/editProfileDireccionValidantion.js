const { check } = require ('express-validator');
const path = require ('path');
const db = require('../database/models');
const usuarios = require ('../database/usersDetalle.json')
const User = require('../models/users')


const validations = [
    check('newProvincia')
        .notEmpty().withMessage('Tienes que poner la provincia en donde vives').bail(),
    check('newMunicipio')
        .notEmpty().withMessage('Tienes que poner el municipio en donde vives').bail(),
    check('newCiudad')
        .notEmpty().withMessage('Tienes que poner la ciudad en donde vives').bail(),
    check('newCalle')
        .notEmpty().withMessage('Tienes que poner la calle en donde vives').bail(),
    check('newNumeroVivienda')
        .notEmpty().withMessage('Tienes que poner tu numero de vivienda').bail(),
    check('newCodigoPostal')
        .notEmpty().withMessage('Tienes que poner tu codigo postal').bail(),
]

module.exports = validations;
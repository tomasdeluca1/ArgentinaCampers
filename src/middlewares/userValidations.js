const bcrypt = require('bcryptjs/dist/bcrypt');
const { check } = require ('express-validator');
const path = require ('path')
const usuarios = require ('../database/usersDetalle.json')

const userValidations = [
    check('firstName')
        .notEmpty().withMessage('Tienes que completar con tu nombre').bail()
        .isLength({ min: 2}).withMessage('Tiene que ser mayor a dos letras'),
    check('lastName')
        .notEmpty().withMessage('Tienes que completar con tu apellido').bail()
        .isLength({ min: 2}).withMessage('Tiene que ser mayor a dos letras'),
    check('password')
        .notEmpty().withMessage('Tienes que poner una contraseña').bail()
        .custom((value, { req }) => {
        let password = req.body.password;
        let password2 = req.body.password2;
        
        if (password !== password2){
            throw new Error ('La contraseña es distinta, pruebe otra vez')
        }
        return true
    }),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let validExtension = ['.jpg', '.png', '.PNG', '.JPG'];

        if (file){ 
            let fileExtension = path.extname(file.originalname);
            if(!validExtension.includes(fileExtension)){
                throw new Error (`Las extensiones tienen que ser ${validExtension.join(', ')}"`)
            }
        }
        return true;
    }),
    check('email')
    .notEmpty().withMessage('Tienes que completar con tu email').bail()
    .isEmail().withMessage('Tienes que ser un correo electronico valido').bail()
    .custom((value, { req }) => {
        let entryEmail = req.body.email.toLowerCase();

        for(let i = 0; i < usuarios.length; i++){
            if(entryEmail == usuarios[i].email){
                throw new Error ('Este email ya esta registrado')
            }
        }

        return true
    })
]




module.exports = userValidations;
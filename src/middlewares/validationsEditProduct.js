const {check} = require ('express-validator');
const path = require ('path');

const validations = [
    check('marca')
        .notEmpty().withMessage('Tienes que completar el campo con la marca del producto').bail()
        .isLength({min:2}).withMessage('Tiene que tener al menos dos letras'),
    check('modelo')
        .notEmpty().withMessage('Tienes que completar el campo con el modelo del producto').bail()
        .isLength({min:2}).withMessage('Tiene que tener al menos dos letras'),
    check('color')
        .notEmpty().withMessage('Tienes que elegir el color de la van'),
    check('descripcion')
        .notEmpty().withMessage('Tienes que completar el campo con la descripcion del producto').bail()
        .isLength({min:20}).withMessage('La descripcion tiene que tener mas de 20 caracteres'),
    check('capacidad')
        .notEmpty().withMessage('Tienes que completar el campo con la capacidad del producto').bail()
        .isNumeric().withMessage('Tienes que completar con un número').bail()
        .custom((value, {req}) => {
            if(value == 0) {
                throw new Error ('No hay ninguna van que tenga capacidad para 0 personas')
            }
            return true;
        }),
    check('precio')
        .notEmpty().withMessage('Tienes que completar el campo con la capacidad del producto').bail()
        .isNumeric().withMessage('Tienes que completar con un número').bail()
        .custom((value, {req}) => {
            if(value == 0) {
                throw new Error ('Una van no puede valer $0')
            }
            return true;
        }),
    check('antiguedad')
        .notEmpty().withMessage('Tienes que completar el campo con la antiguedad del producto').bail()
        .isNumeric().withMessage('Tienes que completar con un número').bail()
        .custom((value, {req}) => {
            if(value < 2000) {
                throw new Error ('Nuestras vans son nuevas, todas son del 2000 en adelante')
            }
            return true;
        }),
    check('stock')
        .notEmpty().withMessage('Tienes que completar el campo con el stock del producto').bail()
        .isNumeric().withMessage('Tienes que completar con un número').bail()
        .custom((value, {req}) => {
            if(value < 0) {
                throw new Error ('No tenemos vans negativas')
            }
            return true;
        }),
    check('img').custom((value, { req }) => {
        let file = req.file;
        let validExtension = ['.jpg', '.png', '.PNG', '.JPG'];

        if (file){ 
            let fileExtension = path.extname(file.originalname);
            if(!validExtension.includes(fileExtension)){
                throw new Error (`Las extensiones tienen que ser ${validExtension.join(', ')}"`)
            }
        }
        return true;
    })
]

module.exports = validations;
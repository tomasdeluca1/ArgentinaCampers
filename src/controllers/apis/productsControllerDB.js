
const multer = require('multer')

const { validationResult } = require ('express-validator')

const db = require('../../database/models/index.js');

const Op = db.Sequelize.Op

const controller = {
    productos: function(req, res) {
        db.Productos.findAll({
            where: {
                estado_id: 1,
                estadoProducto: 1
            }
        }, {
            include: [{association: 'estado'}]
        })
        .then(productos => {
            res.render('./products/products', { productos })
        })
        
    },
    createVistas: function (req, res) {
        res.render('./products/productCreation')
    },
    createProduct: function (req, res) {
        let errors = validationResult(req)

        if(errors.isEmpty()) {

            if(req.file) {
                let image = req.file.filename; 
                db.Productos.create({
                    ...req.body,
                    img: image
                })

                res.redirect('/products')
            }

        } else {
            res.render('./products/productCreation', {errors: errors.mapped(), oldData: req.body})
        }       
    },
    getProductById: function(req, res) {
        let id = req.params.idProducto; 

        db.Productos.findByPk(id, {
            where: {
                estado_id: 1,
                estadoProducto: 1
            }
        })
        .then(producto => {
            if (producto) {
                res.render('./products/productDetail', { producto })
            } else {
                res.render('error404')
            }
        })
    },
    editVistas: function (req, res) {
        let id = req.params.idProducto;

        db.Productos.findByPk(id, {
            where: {
                estado_id: 1,
                estadoProducto: 1
            }
        })
        .then(producto => {
            if (producto) {
                res.render('./products/productEdit', { producto })
            } else {
                res.render('error404')
            }
        })
    }, 
    editProduct: function (req, res) {
        let errors = validationResult(req)

        if(errors.isEmpty()) {

            let id = req.params.idProducto;

            function image(){
                if (req.file) {
                    return req.file.filename;
                } 
            }

            db.Productos.update({
                ...req.body,
                img: image()
            }, {
                where: {
                    id: id
                }
            })     
            res.redirect('/products')   
        } else {
            let id = req.params.idProducto;

            db.Productos.findByPk(id, {
                where: {
                    estado_id: 1,
                    estadoProducto: 1
                }
            })
            .then (producto => {
                if(producto) {
                    res.render('./products/productEdit', {errors: errors.mapped(), oldData: req.body, producto})
                }
            })
            
        }
    },
    delete: function (req, res) {
        let id = req.params.idProducto;

        db.Productos.update({
            estadoProducto: 2
        }, {
            where: {
                id: id
            }
        })

        res.redirect('/products')  
    }
};



module.exports = controller; 



//Productos 
// .then(data => {
//     if(data) {
//         res.json({
//             productos: data,
//             status: 200
//         })
//     }
// });


//CreateVistas
// res.json({
//     msg: 'Todo ok',
//     status: 200
// })

//CreateProduct
// res.json({
//     producto: req.body,
//     status:200,
//     msg: "Todo ok"
// })


//GetProductById
// res.json({
//     producto,
//     status: 200, 
//     msg: 'Todo ok'
// })

// res.json({
//     status: 404, 
//     msg: 'Esta van no existe'
// })


// EditVistas
// res.json({
//     producto,
//     status: 200, 
//     msg: 'Todo ok'
// })

// res.json({
//     status: 404, 
//     msg: 'Esta van no existe'
// })

//EditProduct
// db.Productos.findByPk(id)
// .then(producto => {
//     if (producto) {
//         res.redirect('/products')
//         // res.json({
//         //     producto,
//         //     status: 200, 
//         //     msg: 'Todo ok'
//         // })
//     } else {
//         res.render('error404')
//         // res.json({
//         //     status: 404, 
//         //     msg: 'Esta van no existe'
//         // })
//     }
// })


//Delete
// db.Productos.findByPk(id)
// .then(producto => {
//     if (producto) {
//         res.redirect('/products')
//         res.json({
//             producto,
//             status: 200, 
//             msg: 'Todo ok'
//         })
//     } else {
//         res.render('error404')
//         res.json({
//             status: 404, 
//             msg: 'Esta van no existe'
//         })
//     }
// }) 
const multer = require('multer');

const { validationResult } = require('express-validator');

const db = require('../database/models/index.js');

const Op = db.Sequelize.Op;

const controller = {
	productos: async function (req, res) {
		let productos = await db.Productos.findAll({
			where: {
				estado_id: 1,
				estadoProducto: 1,
				stock: { [Op.gt]: 0 },
			},
		});

		let imagenes = await db.ProductosImagenes.findAll();

		let estado = await db.Estado.findAll();

		res.render('./products/products', { productos, imagenes, estado });
	},
	createVistas: function (req, res) {
		res.render('./products/productCreation');
	},
	createProduct: function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			if (req.files.length > 0) {
				db.Productos.create({
					...req.body,
				}).then((producto) => {
					if (producto) {
						let imagenes = [];

						req.files.forEach((imagen) => {
							imagenes.push(imagen.filename);
						});

						for (let i = 0; i < imagenes.length; i++) {
							db.ProductosImagenes.create({
								producto_id: producto.id,
								img: imagenes[i],
							});
						}
					}
				});

				res.redirect('/products');
			}
		} else {
			res.render('./products/productCreation', {
				errors: errors.mapped(),
				oldData: req.body,
			});
		}

		// res.json({
		//     data: req.files,
		//     msg: 'ok'
		// })

		// function img (image) {
		//     const images = []
		//     image.forEach(image => {
		//         images.push(image.filename)
		//     });
		//     return images
		// }
		
	},
	getProductById: function (req, res) {
		let id = req.params.idProducto;

		db.Productos.findByPk(id, {
			include: [{ association: 'estado' }, { association: 'imagenes' }],
		}).then((producto) => {
			if (producto) {
				res.render('./products/productDetail', { producto });
			} else {
				res.render('error404');
			}
		});
	},
	editVistas: function (req, res) {
		let id = req.params.idProducto;

		db.Productos.findByPk(id, {
			where: {
				estado_id: 1,
				estadoProducto: 1,
				stock: { [Op.gt]: 0 },
			},
		}).then((producto) => {
			if (producto) {
				res.render('./products/productEdit', { producto });
			} else {
				res.render('error404');
			}
		});
	},
	editProduct: function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let id = req.params.idProducto;

			let files = req.files;

			db.Productos.update(
				{
					...req.body,
				},
				{
					where: {
						id: id,
					},
				}
			).then((producto) => {
				if (producto && files != '') {
					db.ProductosImagenes.destroy({
						where: {
							producto_id: id,
						},
					});

					let imagenes = [];

					req.files.forEach((imagen) => {
						imagenes.push(imagen.filename);
					});

					for (let i = 0; i < imagenes.length; i++) {
						db.ProductosImagenes.create({
							producto_id: id,
							img: imagenes[i],
						});
					}
				}
			});

			res.redirect('/products');
		} else {
			let id = req.params.idProducto;

			db.Productos.findByPk(id, {
				where: {
					estado_id: 1,
					estadoProducto: 1,
				},
			}).then((producto) => {
				if (producto) {
					res.render('./products/productEdit', {
						errors: errors.mapped(),
						oldData: req.body,
						producto,
					});
				}
			});
		}
	},
	delete: function (req, res) {
		let id = req.params.idProducto;

		db.Productos.update(
			{
				estadoProducto: 2,
			},
			{
				where: {
					id: id,
				},
			}
		);

		res.redirect('/products');
	},

	enviarAlCarrito: async function (req, res) {
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			if (req.session && req.session.userLogged) {
				let idProducto = req.params.idProducto;
				let idUser = req.session.userLogged.id;

				let fechaPartida = req.body.fechaPartida;
				let fechaLlegada = req.body.fechaLlegada;

				let fecha1 = new Date(`${req.body.fechaPartida}`).getTime();
				let fecha2 = new Date(`${req.body.fechaLlegada}`).getTime();

				let diff = (fecha2 - fecha1) / (1000 * 60 * 60 * 24);

				let precioPorDia = await db.Productos.findByPk(idProducto, {
					where: {
						estado_id: 1,
						estadoProducto: 1,
						stock: { [Op.gt]: 0 },
					},
				});

				let precioTotal =
					parseInt(precioPorDia.dataValues.precioDia) * diff;

				db.Carrito.create({
					usuarios_id: idUser,
					productos_id: idProducto,
					fechaPartida: fechaPartida,
					fechaLlegada: fechaLlegada,
					cantidadDeDias: diff,
					precioTotal: precioTotal,
				});

				res.redirect('../products');
			}
		} else {
			let id = req.params.idProducto;

			db.Productos.findByPk(id, {
				include: [
					{ association: 'estado' },
					{ association: 'imagenes' },
				],
			}).then((producto) => {
				if (producto) {
					res.render('./products/productDetail', {
						errors: errors.mapped(),
						oldData: req.body,
						producto,
					});
				} else {
					res.render('error404');
				}
			});
		}
	},
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

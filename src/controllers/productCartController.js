const { validationResult } = require('express-validator');

const db = require('../database/models/index.js');

const Op = db.Sequelize.Op;

const controller = {
	productCart: async function (req, res) {
		if (req.session.userLogged) {
			let idUser = req.session.userLogged.id;

			let user = await db.Users.findByPk(idUser, {
				include: [
					{
						association: 'carrito',
						include: [
							{
								association: 'producto',
								include: [{ association: 'imagenes' }],
							},
						],
					},
				],
			});

			res.render('./productCart/productCart', {
				productos: user.carrito,
			});
		}
	},

	eliminarProductoDelCarrito: function (req, res) {
		if (req.session.userLogged) {
			let idProducto = req.body.idProducto;

			db.Carrito.destroy({
				where: {
					id: idProducto,
				},
			});

			res.redirect('rental-cart');
		}
	},
	eliminarCarritoUser: function(req, res) {
		if(req.session.userLogged) {
			let id = req.session.userLogged.id

			db.Carrito.destroy({
				where: {
					usuarios_id: id
				}
			})


			res.redirect('rental-cart');
		}
	}
};

// {
//     where: {
//         usuarios_id: idUser
//     }
// },

module.exports = controller;

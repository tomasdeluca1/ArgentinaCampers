const db = require('../database/models');

async function getByIdProductMiddleware(req, res, next) {
	let id = req.params.idProducto;
	let producto = await db.Productos.findOne({
		where: {
			id: id,
			estado_id: 1,
			estadoProducto: 1,
		},
	});

	if (producto === null) {
		res.render('./error404');
	}

	next();
}

module.exports = getByIdProductMiddleware;

// async function hola (id) {
//     let producto = await db.Productos.findOne({
//         where: {
//             id: id,
//             estado_id: 1,
//             estadoProducto: 1
//         }
//     })
//     console.log(producto);
// }
// hola(req.params.idProducto)

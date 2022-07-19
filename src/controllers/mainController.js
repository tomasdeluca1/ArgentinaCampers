const todosLosProductos = require('../database/productosDetalle.json');

const controller = {
	index: function (req, res) {
		res.render('index');
	},
	error: function (req, res) {
		res.render('error404')
	}
};

module.exports = controller;

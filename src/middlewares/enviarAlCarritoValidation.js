const { check } = require('express-validator');
const db = require('../database/models');

const validations = [
	check('fechaPartida')
		.notEmpty()
		.withMessage('Tienes que poner la fecha del dia en el que vas a partir')
		.custom((value, { req }) => {
			const hoy = new Date();
			const anoHoy = hoy.getFullYear();
			let añoValidacion = new Date(`${value}`).getFullYear();

			let restaAños = añoValidacion - anoHoy;

			if (añoValidacion.toString().length > 4 || restaAños >= 2) {
				throw new Error(
					'No puedes alquilar una van tanto tiempo, para eso compra una'
				);
			} else if (restaAños < 0) {
				throw new Error('Eso es un año pasado');
			} else {
				const hoy = new Date();
				const anoHoy = hoy.getFullYear();
				const mesHoy = parseInt(hoy.getMonth() + 1);
				const diaHoy = hoy.getDate();

				const anoRecibido = parseInt(String(value).substring(0, 4));
				const mesRecibido = parseInt(String(value).substring(5, 7));
				const diaRecibido = parseInt(String(value).substring(8, 10));

				let diasAntelacionReservas = diaRecibido - diaHoy;

				if (anoRecibido == anoHoy) {
					if (mesRecibido < mesHoy) {
						throw new Error('Eso es un mes pasado');
					} else if (mesRecibido == mesHoy) {
						if (diaRecibido < diaHoy) {
							throw new Error('Eso es un dia pasado');
						} else if (diasAntelacionReservas <= 2) {
							throw new Error(
								'No puedes hacer reservas sin tres dias de antelacion'
							);
						} else {
							return true;
						}
					} else {
						return true;
					}
				} else {
					return true;
				}
			}
		}),
	check('fechaLlegada')
		.notEmpty()
		.withMessage('Tienes que poner la fecha del dia en el que vas a volver')
		.custom((value, { req }) => {
			const hoy = new Date();
			const anoHoy = hoy.getFullYear();
			let añoValidacion = new Date(`${value}`).getFullYear();

			let restaAños = añoValidacion - anoHoy;

			if (añoValidacion.toString().length > 4 || restaAños >= 2) {
				throw new Error(
					'No puedes alquilar una van tanto tiempo, para eso compra una'
				);
			} else if (restaAños < 0) {
				throw new Error('Eso es un año pasado');
			} else {
				const hoy = new Date();
				const anoHoy = hoy.getFullYear();
				const mesHoy = parseInt(hoy.getMonth() + 1);
				const diaHoy = hoy.getDate();

				const anoRecibido = parseInt(String(value).substring(0, 4));
				const mesRecibido = parseInt(String(value).substring(5, 7));
				const diaRecibido = parseInt(String(value).substring(8, 10));

				let diasAntelacionReservas = diaRecibido - diaHoy;

				const fechaPartida = req.body.fechaPartida;

				let fecha1 = new Date(`${fechaPartida}`).getTime();
				let fecha2 = new Date(`${value}`).getTime();

				var diff = (fecha2 - fecha1) / (1000 * 60 * 60 * 24);

				if (anoRecibido == anoHoy) {
					if (mesRecibido < mesHoy) {
						throw new Error('Eso es un mes pasado');
					} else if (mesRecibido == mesHoy) {
						if (diaRecibido < diaHoy) {
							throw new Error('Eso es un dia pasado');
						} else if (diasAntelacionReservas <= 2) {
							throw new Error(
								'No puedes hacer reservas sin tres dias de antelacion'
							);
						} else if (value == fechaPartida) {
							throw new Error(
								'No puedes eliegir volver el mismo dia que te fuiste'
							);
						} else if (diff < 0) {
							throw new Error('No puedes viajar al pasado');
						}
					}
				}

				return true;
			}
		}),
];

module.exports = validations;

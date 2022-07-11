// const todasLasReviews = require("../database/reviewsDetalle.json")
// const fs = require('fs')
const { validationResult } = require('express-validator');

const db = require('../database/models/index.js');

const Op = db.Sequelize.Op;

// const json = __dirname + '/../database/reviewsDetalle.json'

// const controller = {
//     index: function(req, res){
//         res.render('aboutUs/aboutUs', {reviews : todasLasReviews});
//     },

//     create: function (req ,res, next){
//         let errors = validationResult(req)
//         if(errors.isEmpty()){
//             if(req.session && req.session.userLogged){

//                 let archivoReviewsParaElId = fs.readFileSync(json, {encoding: 'utf-8'});
//                 let archivoReviewsParaElIdJSON = JSON.parse(archivoReviewsParaElId);
//                 let id = 0;
//                 if(archivoReviewsParaElIdJSON.length > 0){
//                     id = archivoReviewsParaElIdJSON.length + 1;
//                 }

//                     var review = {
//                     id,
//                     nombre: req.body.viajero,
//                     email: req.body.email,
//                     destino: req.body.destino,
//                     rate: req.body.rate,
//                     estrellas: req.body.estrellas,
//                     titulo:req.body.adventureTitle,
//                     descripcion:req.body.adventureDescription
//                 }

//                 Guardar la info
//                 Primero: leer que cosas ya habia!

//                 let archivoReviews = fs.readFileSync(json, {encoding: 'utf-8'});
//                 if (archivoReviews == ""){
//                     reviews = []
//                 } else {
//                     reviews = JSON.parse(archivoReviews)
//                     reviews.push(review);
//                 };

//                 reviewsJSON = JSON.stringify(reviews, null, ' ')
//                 fs.writeFileSync(json, reviewsJSON);
//                 res.redirect('/aboutUs')
//             }
//         } else {
//             res.render('aboutUs/aboutUs', {errors: errors.mapped(), oldData: req.body, reviews: todasLasReviews})
//         }
//     }
// }

const controller = {
	index: async function (req, res) {
		let allComments = await db.Comentarios.findAll({
			include: [{ association: 'usuarios' }],
		});
		// res.json({
		//     comentarios: allComments,
		//     status: 200
		// })
		res.render('aboutUs/aboutUs', { reviews: allComments });
	},
	create: async function (req, res) {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			if (req.session && req.session.userLogged) {
				db.Comentarios.create({
					...req.body,
					id_usuario: req.session.userLogged.id,
				});

				let allComments = await db.Comentarios.findAll({
					include: [{ association: 'usuarios' }],
				});

				res.render('aboutUs/aboutUs', { reviews: allComments });

				// db.Comentarios.findAll({
				//     where: {
				//         id_usuario: req.session.userLogged.id
				//     }
				// })
				// .then(data => {
				//     if(data) {
				//         res.json({
				//             comentarios: data,
				//             status: 200
				//         })
				//     } else {
				//         res.json({
				//             status: 404
				//         })
				//     }
				// })
			}
		} else {
			let allComments = await db.Comentarios.findAll({
				include: [{ association: 'usuarios' }],
			});
			res.render('aboutUs/aboutUs', {
				errors: errors.mapped(),
				oldData: req.body,
				reviews: allComments,
			});
		}
	},
};

module.exports = controller;

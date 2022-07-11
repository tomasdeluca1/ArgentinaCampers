const db = require('../database/models');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	let emailInCookie = req.cookies.userEmail;

	res.locals.isLogged = false;

	let allUsers = await db.Users.findAll({
		where: {
			estadoCuenta: 1,
		},
	});

	function emailFromCookie(emailInCookie) {
		if (emailInCookie) {
			for (let i = 0; i < allUsers.length; i++) {
				if (
					bcrypt.compareSync(
						allUsers[i].dataValues.email,
						emailInCookie
					)
				) {
					return allUsers[i].dataValues.email;
				}
			}
		} else {
			return 'undefined';
		}
	}

	let userFromCookie = await db.Users.findOne({
		where: {
			estadoCuenta: 1,
			email: emailFromCookie(emailInCookie),
		},
	});

	if (userFromCookie !== null) {
		req.session.userLogged = userFromCookie.dataValues;
	} else {
		req.session.userLogged;
	}

	if (req.session && req.session.userLogged) {
		res.locals.isLogged = true;
		//Con esto los datos se transforman en datos locales y no datos que vienen de la web.
		res.locals.userLogged = await db.Users.findByPk(
			req.session.userLogged.id
		);
	}

	// req.session.userLogged;

	// let userFromCookie = User.findByField('email', emailInCookie);

	// if(userFromCookie){
	//     req.session.userLogged = userFromCookie;
	//     console.log(req.session.userLogged);
	// };

	// if(req.session && req.session.userLogged){
	//     res.locals.isLogged = true;
	//     //Con esto los datos se transforman en datos locales y no datos que vienen de la web.
	//     res.locals.userLogged = req.session.userLogged;
	// };

	next();
}

module.exports = userLoggedMiddleware;

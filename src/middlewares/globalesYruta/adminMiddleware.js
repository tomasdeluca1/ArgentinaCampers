const db = require("../../database/models");


async function adminMiddleware(req, res, next) {

	let user;

	if (req.session.userLogged) {
		user = await db.Users.findByPk(req.session.userLogged.id)
	}

	res.locals.admin = false;

	if (user && user.typeOfUser == 1) {
		res.locals.admin = true;
	}
	next();
}

module.exports = adminMiddleware;

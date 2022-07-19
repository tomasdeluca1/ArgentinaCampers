const db = require("../../database/models");

async function adminPermissions(req, res, next) {

	let user;

	if (req.session.userLogged) {
		user = await db.Users.findByPk(req.session.userLogged.id)
	}


	if (!user) {
		return res.redirect('../../../login');
	} else if (user && user.typeOfUser == 2) {
		return res.redirect('../../../not-found');
	}

	next();
}

module.exports = adminPermissions;

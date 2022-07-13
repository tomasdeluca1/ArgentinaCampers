function adminPermissions(req, res, next) {
	let user = req.session.userLogged;

	if (!user) {
		return res.redirect('../../../login');
	} else if (user && user.typeOfUser == 2) {
		return res.render('error404');
	}

	next();
}

module.exports = adminPermissions;

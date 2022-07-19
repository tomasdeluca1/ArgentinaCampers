function myProfileMiddleware(req, res, next) {
	let id = parseInt(req.params.id);
	if (req.session.userLogged.id !== id) {
		return res.redirect('../../../not-found');
	}
	next();
}

module.exports = myProfileMiddleware;

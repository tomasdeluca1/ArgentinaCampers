const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/users');

const db = require('../database/models/index.js');

const Op = db.Sequelize.Op;

const controller = {
	login: function (req, res) {
		res.render('./users/login');
	},
	register: function (req, res) {
		res.render('./users/register');
	},
	registration: async function (req, res) {
		let errors = validationResult(req);
		function image() {
			let imagen = 'avatarDefault.png';
			if (req.file) {
				return req.file.filename;
			} else {
				return imagen;
			}
		}
		if (errors.isEmpty()) {
			let typeOfUser = User.creatingTypeOFUser(req.body.email);

			let userData = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				userName: req.body.userName,
				email: req.body.email.toLowerCase(),
				emailRespaldo: req.body.emailRespaldo.toLowerCase(),
				password: bcrypt.hashSync(req.body.password, 10),
				password2: '',
				avatar: image(),
				birthday: req.body.birthday,
				dni: parseInt(req.body.dni),
				genero_id: parseInt(req.body.genero_id),
				phoneNumber: req.body.phoneNumber,
				phoneNumberRespaldo: req.body.phoneNumberRespaldo,
				typeOfUser: typeOfUser,
				estadoCuenta: 1,
				direccion: {
					provincia_id: parseInt(req.body.provincia),
					municipio: req.body.municipio,
					ciudad: req.body.ciudad,
					calle: req.body.calle,
					numeroVivienda: parseInt(req.body.numeroVivienda),
					codigoPostal: parseInt(req.body.codigoPostal),
				},
			};
			delete userData.password2;

			db.Users.create(userData, {
				include: [{ association: 'direccion' }],
			});
			res.redirect('login');
		} else {
			res.render('users/register', {
				errors: errors.mapped(),
				oldData: req.body,
			});
		}
	},
	loginProcess: function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let email = req.body.email.toLowerCase();
			let password = req.body.password;

			db.Users.findOne({
				where: {
					estadoCuenta: 1,
					email: email,
				},
			}).then(function (userToLogin) {
				if (userToLogin) {
					let verifyingPassword = bcrypt.compareSync(
						password,
						userToLogin.password
					);
					if (verifyingPassword) {
						delete userToLogin.password;
						req.session.userLogged = userToLogin;

						if (req.body.rememberUser) {
							res.cookie(
								'userEmail',
								bcrypt.hashSync(email, 10),
								{ maxAge: 1000 * 60 * 2 }
							);
						}
						return res.redirect('home');
						res.json('Estas logueado');
					}
					return res.render('users/login', {
						errors: {
							password: { msg: 'La contraseña es invalida' },
						},
					});
					res.json('No estas logueado');
				}
			});
		} else {
			res.render('users/login', {
				errors: errors.mapped(),
				oldData: req.body,
			});
		}
	},
	profile: function (req, res) {
		db.Users.findByPk(req.params.id, {
			where: {
				estadoCuenta: 1,
			},
		}).then(function (user) {
			if (user) {
				return res.render('./users/userProfile', { user: user });
			} else {
				res.render('error404');
			}
		});

		// res.render('./users/userProfile', {
		//     user: req.session.userLogged
		// })
	},
	editProfileData: async function (req, res) {
		let user = await db.Users.findByPk(req.params.id);
		if (user) {
			return res.render('users/editProfileData', { userData: user });
		} else {
			res.render('error404');
		}
	},
	processEditProfileData: async function (req, res) {
		function image() {
			if (req.file) {
				return req.file.filename;
			}
		}

		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let userName = req.body.newUserName;
			let email = req.body.newEmail;
			let phoneNumber = req.body.newPhoneNumber;
			// let user = await db.Users.findByPk(id);

			let id = req.params.id;

			db.Users.update(
				{
					avatar: image(),
					userName: userName,
					email: email,
					phoneNumber: phoneNumber,
				},
				{ where: { id: id } }
			);

			res.redirect('../' + id);
		} else {
			let id = req.params.id;

			db.Users.findByPk(id)
			.then(userData => {
				res.render('users/editProfileData', {
					errors: errors.mapped(),
					oldData: req.body,
					userData: userData,
				});
			})

		}
	},
	editProfilePassword: async function (req, res) {
		let user = await db.Users.findByPk(req.params.id);
		if (user) {
			return res.render('users/editProfilePassword', { userData: user });
		} else {
			res.render('error404');
		}
	},
	processEditProfilePassword: async function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let password = req.body.newPassword;

			// let user = await db.Users.findByPk(id)

			let id = req.params.id;

			db.Users.update(
				{
					password: bcrypt.hashSync(password, 10),
				},
				{ where: { id: id } }
			);

			res.redirect('../' + id);
		} else {
			let id = req.params.id;

			db.Users.findByPk(id)
			.then(userData => {
				res.render('users/editProfilePassword', {
					errors: errors.mapped(),
					oldData: req.body,
					userData: userData,
				});
			})
		}
	},
	editProfileDireccion: async function (req, res) {
		let user = await db.Users.findByPk(req.params.id, {
			include: [
				{
					association: 'direccion',
					include: [{ association: 'provincia' }],
				},
			],
		});
		if (user) {
			return res.render('users/editProfileDireccion', {
				userData: user.dataValues.direccion.dataValues,
			});
		} else {
			res.render('error404');
		}
	},
	processEditProfileDireccion: async function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let id = req.params.id;

			let idDireccion = await db.Users.findByPk(id);

			db.Direccion.update(
				{
					provincia_id: parseInt(req.body.newProvincia),
					municipio: req.body.newMunicipio,
					ciudad: req.body.newCiudad,
					calle: req.body.newCalle,
					numeroVivienda: parseInt(req.body.newNumeroVivienda),
					codigoPostal: parseInt(req.body.newCodigoPostal),
				},
				{
					where: {
						id: idDireccion.direccion_id,
					},
				}
			);

			res.redirect('../' + id);
		} else {
			let user = await db.Users.findByPk(req.params.id, {
				include: [
					{
						association: 'direccion',
						include: [{ association: 'provincia' }],
					},
				],
			});
			if (user) {
				res.render('users/editProfileDireccion', {
					errors: errors.mapped(),
					oldData: req.body,
					userData: user.dataValues.direccion.dataValues,
				});
			}
		}
	},
	destroyUser: async function (req, res) {
		let user = await db.Users.findByPk(req.params.id);
		if (user) {
			return res.render('users/destroyUser', { userData: user });
		} else {
			res.render('error404');
		}
	},

	processDestroyUser: async function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let id = req.params.id;

			db.Users.update(
				{
					estadoCuenta: 2,
				},
				{
					where: {
						id: id,
					},
				}
			);

			res.clearCookie('userEmail');
			req.session.destroy();
			res.redirect('../../home');
		} else {
			let user = await db.Users.findByPk(req.params.id);
			if (user) {
				res.render('users/destroyUser', {
					errors: errors.mapped(),
					oldData: req.body,
					userData: user,
				});
			}
		}
	},
	logout: function (req, res) {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('home');
	},
	allUsers: function (req, res) {
		db.Users.findAll({
			where: {
				estadoCuenta: 1,
			},
			limit: 5,
		}).then(function (users) {
			res.render('./users/allUsers', { users: users });
		});
	},
	search: function (req, res) {
		let loQueBuscoElAdmin = req.query.searchingUsers
			.toLowerCase()
			.trim()
			.replaceAll('-', '')
			.replaceAll('_', '')
			.replaceAll('.', '')
			.replaceAll(' ', '');

		let coincidences = [];

		db.Users.findAll({
			where: {
				estadoCuenta: 1,
				firstName: { [Op.like]: `%${loQueBuscoElAdmin}%` },
			},
			order: [['id', 'ASC']],
			limit: 5,
		}).then(function (getAllUsers) {
			if (getAllUsers.length == 0) {
				res.render('users/userResults', { usersResults: coincidences });
			} else {
				res.render('users/userResults', { usersResults: getAllUsers });
			}
		});
	},
};

module.exports = controller;

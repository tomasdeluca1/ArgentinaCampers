// 1. Guardar al usuario en la DB;
// 2. Buscar al usuario que se quiere loggear por su Email;
// 3. Buscar a un usuario por su Id;
// 4. Editar la info de un usuario;
// 5. Eliminar a un usuario de la DB;
const db = require('../database/models/index.js');

const Op = db.Sequelize.Op;

const fs = require('fs');
const path = require('path');

const user = {
	fileName: __dirname + '/../database/usersDetalle.json',

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findAll: function () {
		return this.getData();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find((oneUser) => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find((oneUser) => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {
		db.Users.create({
			...userData,
		}).then(function (data) {
			return data;
		});
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	},

	creatingTypeOFUser: function (email) {
		let admins = ['frandelqueran@gmail.com'];
		let emailLowerCase = email.toLowerCase();

		if (emailLowerCase.includes(admins)) {
			return 1;
		} else {
			return 2;
		}
	},
};

module.exports = user;

// db.Users.findAll()
// .then(function(data){
//     console.log(data);
// })

// db.Users.create({
//     firstName: 'hola',
//     lastName: 'chau',
//     userName: 'hola chau',
//     email: 'holachau@gmail.com',
//     password: '1234',
//     phoneNumber: 1,
//     avatar: 'imgUser-1653065309102.png'
// })

// db.Users.update({
//     firstName: 'everadadsd',
//     lastName: 'casi',
//     userName: 'todas locas'
// },{
//     where: {
//         id: 19,
//     }
// })

// let userToLogin = db.Users.findOne({
//         where: {
//             email: 'frandelqueran@gmai.com'
//         }
//     })
//     .then(function(userToLogin){
//         return userToLogin
//     })

// let busqueda = "n"

// db.Users.findAll({
//     where:{
//         firstName: {[Op.like]: `%${busqueda}%`},
//     },
// })
// .then(function(data){
//     console.table(data);
// })

// let loQueBuscoElAdmin = 'a'
// let coincidences;
// db.Users.findAll({
//     where:{
//         firstName: {[Op.like]: `%${loQueBuscoElAdmin}%`},
//     },
//     order: [
//         ['id', 'ASC']
//     ],
//     limit: 5
// })
// .then(function(getAllUsers){
//     coincidences = getAllUsers;
// })

// console.log(loQueBuscoElAdmin.length);

// if(loQueBuscoElAdmin.length == 0){
//     coincidences = [];
// }

// console.log(coincidences);

// for (let i = 0; i < coincidences.length; i++) {
//     console.log(coincidences[i].firstName)
// }

// db.Direccion.findAll({
//     include: [{association: 'provincia'}]
// })
// .then(data => {
//     console.log(data[0].dataValues.provincia.dataValues);
// })

// db.Users.findAll({
//     include: [
//         {association: 'genero'},
//         {association: 'direccion', include: [{association: 'provincia'}]}]
// })
// .then(data => {
//     console.log(data[0].dataValues.genero.dataValues);
// })

// db.Users.findAll({
//     include: [
//         {association: 'genero'},
//         {association: 'direccion', include: [{association: 'provincia'}]}]
// })
// .then(data => {
//     console.log(data[1].dataValues.direccion.dataValues.id);
// })

// async function id (){
//     let direcciones = await db.Direccion.findAll()
//     let idDireccion = direcciones.pop()
//     if(idDireccion){
//         return idDireccion.dataValues.id + 1;
//     } else {
//         return 1;
//     }
// }

// id().then(data => {
//     return console.log( data)
// });

// db.Users.create({
//     firstName: 'Francisco',
//     lastName: 'Isola',
//     userName: 'Fran Isola',
//     email: 'frandelqueran@gmail.com',
//     emailRespaldo: 'frandelqueran2@gmail.com',
//     password: 'hola123',
//     birthday: '25/11/2003',
//     phoneNumber: '1111111111111',
//     phoneNumberRespaldo:'1111111111111',
//     avatar: 'avatarDefault.png',
//     dni: 452348868,
//     typeOfUser: 1,
//     genero_id: 1,
//     direccion: {
//         provincia_id: 1,
//         municipio: 'La matanza',
//         ciudad: 'Ciudad Evita',
//         calle: 'La gaviota',
//         numeroVivienda: 13,
//         codigoPostal: 1778
//     }
// }, {include: [
//     {association: 'direccion'}]
// })

// async function hola (){
//     let idDireccion = await db.Users.findByPk(1)
//     db.Direccion.update({
//         municipio: ''
//     }, {where: {
//         id: idDireccion.direccion_id
//     }
//     })
// }
// hola()

// db.Users.findAll({
//     include: [
//         {association: 'comentarios'}
//     ]
// })
// .then(data => {
//     console.log(data.dataValues);
// })

// db.Comentarios.findAll({
//     include: [{association: 'usuarios'}]
// })
// .then(data => {
//     return data[0].dataValues.usuarios.userName;
// })

// db.Users.findByPk(1, {
//     include: [{association: 'genero'}]
// })
// .then(data => {
//     console.log(data.dataValues.genero.dataValues);
// })

// db.Productos.findByPk(1, {
//     where: {
//         estado_id: 1,
//         estadoProducto: 1
//     }
// })
// .then(producto => {
//     console.log(producto.dataValues);
// })

// db.Users.findByPk(1, {
//     include: [{association: 'genero'}]
// })
// .then(user => {
//     console.log(user);
// })

// db.Users.findAll({
//     include: [
//         {association: 'genero'},
//         {association: 'direccion', include: [{association: 'provincia'}]}]
// })
// .then(data => {
//     console.log(data[1].dataValues.direccion.dataValues.id);
// })

// db.ProductosImagenes.findAll()
// .then(imgs => {
//     console.log(imgs);
// })

// function img (imgs) {
//     for (let i = 0; i < imgs.length; i++) {
//         return imgs[i]
//     }
// }

// db.ProductosImagenes.create({
//     producto_id: 1,
//     img: img(imgs)
// })

// db.ProductosImagenes.findAll()
// .then(img => {
//     img.forEach(img => {
//         console.log(img.dataValues.img);
//     });
// })

// db.Productos.findByPk(1,{
//     include: [{association: 'estado'}, {association: 'imagenes'}]
// }, {
//     where: {
//         estado_id: 1,
//         estadoProducto: 1
//     }
// })
// .then(data =>{
//     console.log(data);
// })

// const imgs = [ 'imgProducto-1656516059745.png', 'imgProducto-1656516059747.png' ]

// for (let i = 0; i < imgs.length; i++) {
//     db.ProductosImagenes.create({
//         producto_id: 1,
//         img: imgs[i]
//     })
// }

// db.Productos.findByPk(15, {
//     include: [{association: 'imagenes'}]
// })
// .then(data => {
//     console.log(data.imagenes == '' ? 'si' : 'no');
// })



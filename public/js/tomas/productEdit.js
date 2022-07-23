window.addEventListener('load', () => {
	const marca = document.getElementById('marca-del-producto');
	const errorMarca = document.querySelector('.erroresMarca');

	// Validacion INPUT marca del vehículo
	// marca.addEventListener('change', () => {
	// 	if (marca.value.value != marca.value) {
	// 		errorMarca.innerHTML = 'todo ok';
	// 		console.log(1212);
	// 		marca.classList.remove('is-invalid');
	// 	} else if (marca.value.length > 0) {
	// 		errorMarca.innerHTML =
	// 			'<li>' + 'El campo debe llevar más de 2 caracteres.' + '</li>';
	// 		marca.classList.add('is-invalid');
	// 	} else if (marca.value == '') {
	// 		errorMarca.innerHTML = '<li>El campo actual está vacío</li>';
	// 		marca.classList.add('is-invalid');
	// 	}
	// });

	const modelo = document.getElementById('modelo-del-producto');
	const errorModelo = document.querySelector('.erroresModelo');

	// Validacion INPUT modelo del vehículo
	// modelo.addEventListener('blur', () => {
	// 	if (modelo.value.length >= 3) {
	// 		errorModelo.innerHTML = '';
	// 		modelo.classList.remove('is-invalid');
	// 	} else if (modelo.value.length > 0) {
	// 		errorModelo.innerHTML =
	// 			'<li>' + 'El campo debe llevar más de 2 caracteres.' + '</li>';
	// 		modelo.classList.add('is-invalid');
	// 	} else if (modelo.value == '') {
	// 		errorModelo.innerHTML = '<li>El campo actual está vacío</li>';
	// 		modelo.classList.add('is-invalid');
	// 	}
	// });

	const descripcion = document.querySelector('#descripcion-del-producto');
	const errorDescripcion = document.querySelector('.erroresDescripcion');

	// descripcion.addEventListener('blur', () => {
	// 	if (descripcion.value.length >= 20) {
	// 		errorDescripcion.innerHTML = '';
	// 		descripcion.classList.remove('is-invalid');
	// 	} else if (descripcion.value.length > 0) {
	// 		errorDescripcion.innerHTML =
	// 			'<li>' +
	// 			'El campo debe contar con un mínimo de 20 caracteres.' +
	// 			'</li>';
	// 		descripcion.classList.add('is-invalid');
	// 	} else if (modelo.value == '') {
	// 		errorDescripcion.innerHTML = '<li>El campo actual está vacío</li>';
	// 		descripcion.classList.add('is-invalid');
	// 	}
	// });

	const capacidad = document.querySelector('#capacidad-del-producto');
	const errorCapacidad = document.querySelector('.erroresCapacidad');

	// capacidad.addEventListener('blur', () => {
	// 	if (capacidad.value < 7 && capacidad.value > 0) {
	// 		console.log(1);
	// 		errorCapacidad.innerHTML = '';
	// 	} else if (capacidad >= 7) {
	// 		errorCapacidad.innerHTML =
	// 			'<li>Este vehículo es considerado un Motor Home, aquí alquilamos camperVans</li>';
	// 		capacidad.classList.add('is-invalid');
	// 	} else if (capacidad.value == '') {
	// 		errorCapacidad.innerHTML =
	// 			'<li>Debe completar el campo con un valor numérico.</li>';
	// 		capacidad.classList.add('is-invalid');
	// 	}
	// });

	const precio = document.getElementById('precio-del-producto');
	const errorPrecio = document.querySelector('.erroresPrecio');
	// precio.addEventListener('blur', () => {
	// 	if (precio.value > 10000) {
	// 		console.log(1);
	// 		errorPrecio.innerHTML = '';
	// 	} else if (precio.value < 10000) {
	// 		errorPrecio.innerHTML =
	// 			'<li>El precio mínimo por día es de $10.000</li>';
	// 		precio.classList.add('is-invalid');
	// 	} else if (precio.value == '') {
	// 		errorPrecio.innerHTML =
	// 			'<li>Debe completar el campo con un valor numérico.</li>';
	// 		precio.classList.add('is-invalid');
	// 	}
	// });

	const ultimoService = document.getElementById(
		'ultimo-service-del-producto'
	);
	const errorService = document.querySelector('.erroresService');

	// ultimoService.addEventListener('change', () => {
	// 	if (
	// 		ultimoService.value <= `${new Date().toISOString().split('T')[0]}`
	// 	) {
	// 		errorService.innerHTML = '';
	// 	} else {
	// 		alert(
	// 			'La fecha ingresada aún no pasó, si el vehículo no tiene el service hecho, vaya, hagalo y vuelva a completar el formulario. Muchas gracias :)'
	// 		);
	// 	}
	// });

	const antiguedad = document.getElementById('antiguedad-del-producto');
	const errorAntiguedad = document.querySelector('.errorAntiguedad');
	let añoActual = new Date().getFullYear();
	// antiguedad.addEventListener('blur', () => {
	// 	if (
	// 		antiguedad.value <= añoActual &&
	// 		antiguedad.value > 1940 &&
	// 		antiguedad.value.length == 4
	// 	) {
	// 		errorAntiguedad.innerHTML = '';
	// 	} else if (antiguedad.value > añoActual) {
	// 		errorAntiguedad.innerHTML =
	// 			'<li>La antigüedad del auto debe ser una fecha de hoy hacia atras</li>';
	// 		antiguedad.classList.add('is-invalid');
	// 	} else if (antiguedad.value < 1940) {
	// 		errorAntiguedad.innerHTML =
	// 			'<li>Este vehículo es muy antigüo.</li>';
	// 		antiguedad.classList.add('is-invalid');
	// 	} else if (antiguedad.value.length != 4) {
	// 		errorAntiguedad.innerHTML = '<li>Debe ingresar un año válido.</li>';
	// 		antiguedad.classList.add('is-invalid');
	// 	} else if (antiguedad.value == '') {
	// 		errorAntiguedad.innerHTML = '<li>Este campo está vacío.</li>';
	// 		antiguedad.classList.add('is-invalid');
	// 	}
	// });
	const stock = document.getElementById('stock-del-producto');
	const errorStock = document.querySelector('.erroresStock');
	// stock.addEventListener('blur', () => {
	// 	if (stock.value > 0) {
	// 		console.log(1);
	// 		errorStock.innerHTML = '';
	// 	} else if (stock.value == 0) {
	// 		errorStock.innerHTML =
	// 			'<li>Este campo está incompleto o no hay stock, intentelo cuando haya...</li>';
	// 		stock.classList.add('is-invalid');
	// 	}
	// });

	const form = document.querySelector('.formularioCreateProduct');

	// form.addEventListener('submit', (e) => {
	// 	const archivo = document.getElementById('imagen-del-producto-a-crear');
	// 	const errorFile = document.querySelector('.erroresFile');
	// 	const color = document.getElementById('color-del-producto');
	// 	const errorColor = document.querySelector('.erroresColor');

	// 	const totalErrores =
	// 		errorMarca.innerHTML == '' &&
	// 		errorModelo.innerHTML == '' &&
	// 		errorDescripcion.innerHTML == '' &&
	// 		errorCapacidad.innerHTML == '' &&
	// 		errorPrecio.innerHTML == '' &&
	// 		errorService.innerHTML == '' &&
	// 		errorStock.innerHTML == '' &&
	// 		errorAntiguedad.innerHTML == '';

	// 	// Validacion archivo adjunto
	// 	if (archivo.files.length > 0) {
	// 	} else {
	// 		alert('No hay ningún archivo adjunto');
	// 	}

	// 	// Validacion service incompleto
	// 	if (ultimoService.value == '') {
	// 		alert('El campo de úlitmo service no fue completado.');
	// 	}
	// 	//Que se mande solo si no tiene errores
	// 	if (totalErrores) {
	// 		console.log('Validación realizada exitosamente');
	// 		// form.submit();
	// 	} else {
	// 		e.preventDefault();
	// 	}
	// });
});

window.addEventListener('load', () => {
	const form = document.querySelector('#form-login');

	const email = document.getElementById('email');
	const password = document.getElementById('password');

	const errorBackEmail = document.getElementById('error-back-email');
	const errorEmail = document.querySelector('.email');
	const msgErrorEmail = document.querySelector('.email p');

	const errorBackPassword = document.getElementById('error-back-password');
	const errorPassword = document.querySelector('.password');
	const msgErrorPassword = document.querySelector('.password p');

	
	const btn = document.getElementById('btn');

	let errores = {};

	email.addEventListener('blur', (e) => {
		if (email.value === '' || email.value === undefined) {
			if (errorBackEmail != null) {
				errorBackEmail.style.display = 'none';
			}
			errores.email = 'No puedes dejar el email en vacio';
			email.classList.add('is-invalid');
			errorEmail.style.display = 'block';
			msgErrorEmail.innerText = errores.email;
		} else {
			delete errores.email;
            if (errorBackEmail != null) {
				errorBackEmail.style.display = 'none';
			}
            email.classList.remove('is-invalid');
		    errorEmail.style.display = 'none';
		}
	});
	password.addEventListener('change', (e) => {
		if (password.value === '' || password.value === undefined) {
			if (errorBackPassword != null) {
				errorBackPassword.style.display = 'none';
			}
			errores.password = 'Tienes que poner tu contraseña';
			password.classList.add('is-invalid');
			errorPassword.style.display = 'block';
			msgErrorPassword.innerText = errores.password;
		} else if (password.value.length < 6) {
			if (errorBackPassword != null) {
				errorBackPassword.style.display = 'none';
			}
			errores.password = 'La contraseña tiene que ser mayor a 5 digitos';
			password.classList.add('is-invalid');
			errorPassword.style.display = 'block';
			msgErrorPassword.innerText = errores.password;
		} else {
            if (errorBackPassword != null) {
				errorBackPassword.style.display = 'none';
			}
			delete errores.password;
            password.classList.remove('is-invalid');
		    errorPassword.style.display = 'none';
		}
	});

	btn.addEventListener('click', (e) => {
		if (email.value == '') {
            if (errorBackEmail != null) {
				errorBackEmail.style.display = 'none';
			}
			errores.email = 'No puedes dejar el email en vacio';
            email.classList.add('is-invalid');
			errorEmail.style.display = 'block';
			msgErrorEmail.innerText = errores.email;
		}
		if (password.value == '') {
            if (errorBackPassword != null) {
				errorBackPassword.style.display = 'none';
			}
			errores.password = 'Tienes que poner tu contraseña';
            password.classList.add('is-invalid');
			errorPassword.style.display = 'block';
			msgErrorPassword.innerText = errores.password;
		}

		if (errores.email || errores.password) {
			e.preventDefault();
		} else {
			form.submit();
		}
	});
});

// function validations() {
//  const errorBackEmail = document.querySelector('.error-back-email')
// 	const errorEmail = document.querySelector('.email');
// 	const msgErrorEmail = document.querySelector('.email p');

// email.addEventListener('blur', (e) => {
// 	if (email.value === '' || email.value === undefined) {
// 		email.classList.add('is-invalid');
// 		errorEmail.style.display = 'block';
// 		msgErrorEmail.innerText = 'No puedes dejar el email en vacio';
// 		e.preventDefault();
// 	} else {
// 		email.classList.remove('is-invalid');
// 		errorEmail.style.display = 'none';
// 	}
// });

//     const errorBackPassword = document.querySelector('.error-back-password')
// 	const errorPassword = document.querySelector('.password');
// 	const msgErrorPassword = document.querySelector('.password p');

// password.addEventListener('blur', (e) => {
// 	if (password.value === '' || password.value === undefined) {
// 		password.classList.add('is-invalid');
// 		errorPassword.style.display = 'block';
// 		msgErrorPassword.innerText = 'Tienes que poner tu contraseña';
// 		e.preventDefault();
// 	} else if (password.value.length < 6) {
// 		password.classList.add('is-invalid');
// 		errorPassword.style.display = 'block';
// 		msgErrorPassword.innerText =
// 			'La contraseña tiene que ser mayor a 5 digitos';
// 		e.preventDefault();
// 	} else {
// 		password.classList.remove('is-invalid');
// 		errorPassword.style.display = 'none';
// 	}
// });
// }

// email.addEventListener('blur', (e) => {
// 	if (email.value === '' || email.value === undefined) {
// 		if (errorBackEmail != null) {
// 			errorBackEmail.style.display = 'none';
// 		}
// 		email.classList.add('is-invalid');
// 		errorEmail.style.display = 'block';
// 		msgErrorEmail.innerText = 'No puedes dejar el email en vacio';
// 		btn.addEventListener('click', (error) => {
// 			error.preventDefault();
// 		});
// 	} else {
// 		email.classList.remove('is-invalid');
// 		errorEmail.style.display = 'none';
// 	}
// });

// password.addEventListener('blur', (e) => {
// 	if (password.value === '' || password.value === undefined) {
// 		if (errorBackPassword != null) {
// 			errorBackPassword.style.display = 'none';
// 		}
// 		password.classList.add('is-invalid');
// 		errorPassword.style.display = 'block';
// 		msgErrorPassword.innerText = 'Tienes que poner tu contraseña';
// 		btn.addEventListener('click', (error) => {
// 			error.preventDefault();
// 		});
// 	} else if (password.value.length < 6) {
// 		if (errorBackPassword != null) {
// 			errorBackPassword.style.display = 'none';
// 		}
// 		password.classList.add('is-invalid');
// 		errorPassword.style.display = 'block';
// 		msgErrorPassword.innerText =
// 			'La contraseña tiene que ser mayor a 5 digitos';
// 		btn.addEventListener('click', (error) => {
// 			error.preventDefault();
// 		});
// 	} else {
// 		password.classList.remove('is-invalid');
// 		errorPassword.style.display = 'none';
// 	}
// });

// form.addEventListener('submit', (e) => {
// 	if (email.value === '' || email.value === undefined) {
// 		if (errorBackEmail != null) {
// 			errorBackEmail.style.display = 'none';
// 		}
// 		email.classList.add('is-invalid');
// 		errorEmail.style.display = 'block';
// 		msgErrorEmail.innerText = 'No puedes dejar el email en vacio';
// 		e.preventDefault();
// 	}

// 	if (password.value === '' || password.value === undefined) {
// 		if (errorBackPassword != null) {
// 			errorBackPassword.style.display = 'none';
// 		}
// 		password.classList.add('is-invalid');
// 		errorPassword.style.display = 'block';
// 		msgErrorPassword.innerText = 'Tienes que poner tu contraseña';
// 		e.preventDefault();
// 	} else if (password.value.length < 6) {
// 		if (errorBackPassword != null) {
// 			errorBackPassword.style.display = 'none';
// 		}
// 		password.classList.add('is-invalid');
// 		errorPassword.style.display = 'block';
// 		msgErrorPassword.innerText =
// 			'La contraseña tiene que ser mayor a 5 digitos';
// 		e.preventDefault();
// 	}
// });

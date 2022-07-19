// const db = require('../../src/database/models');

window.addEventListener('load', () => {

	const passwordInput = document.getElementById('password');
	const confirmPasswordInput = document.getElementById('password2');

	const errorPassword = document.querySelector('.password');
	const errorConfirmPassword = document.querySelector('.confirm-password');

	const msgErrorPassword = document.querySelector('.password p');
	const msgErrorConfirmPassword = document.querySelector('.confirm-password p');

	const errorBackPassword = document.getElementById('error-back-password');

	const form = document.getElementById('form-edit-user-destroy');
	const btn = document.getElementById('btn');

	let errores = {
		todoOk: 'No',
	};

	passwordInput.addEventListener('blur', () => {
		errorBackPassword != null
			? (errorBackPassword.style.display = 'none')
			: null;

		if (
			passwordInput.value === '' ||
			passwordInput.value === undefined
		) {
            errores.password = 'Tienes que poner tu contraseña si quieres eliminar tu cuenta';
			passwordInput.classList.add('is-invalid');
			errorPassword.style.display = 'block';
			msgErrorPassword.innerText = errores.password;
		} else if (passwordInput.value.length < 6) {
            errores.password = 'La contraseña tiene que tener mas de 6 caracteres';
			passwordInput.classList.add('is-invalid');
			errorPassword.style.display = 'block';
			msgErrorPassword.innerText = errores.password;
        } else if (confirmPasswordInput.value != '') {
            if (passwordInput.value !== confirmPasswordInput.value) {
                errores.password = 'La contraseña es distinta, pruebe otra vez';
                passwordInput.classList.add('is-invalid');
                errorPassword.style.display = 'block';
                msgErrorPassword.innerText = errores.password;
            } else {
                delete errores.password;
                errores.todoOk = 'Ok';
                passwordInput.classList.remove('is-invalid');
                errorPassword.style.display = 'none';

                delete errores.confirmPassword;
                errores.todoOk = 'Ok';
                confirmPasswordInput.classList.remove('is-invalid');
                errorConfirmPassword.style.display = 'none';
            }
        } else {
            delete errores.password;
            errores.todoOk = 'Ok';
            passwordInput.classList.remove('is-invalid');
            errorPassword.style.display = 'none';
        }
	});






    confirmPasswordInput.addEventListener('blur', () => {

		if (
			confirmPasswordInput.value === '' ||
			confirmPasswordInput.value === undefined
		) {
            errores.confirmPassword = 'Tienes que poner tu contraseña si quieres eliminar tu cuenta';
			confirmPasswordInput.classList.add('is-invalid');
			errorConfirmPassword.style.display = 'block';
			msgErrorConfirmPassword.innerText = errores.confirmPassword;
		} else if (confirmPasswordInput.value.length < 6) {
            errores.confirmPassword = 'La contraseña tiene que tener mas de 6 caracteres';
			confirmPasswordInput.classList.add('is-invalid');
			errorConfirmPassword.style.display = 'block';
			msgErrorConfirmPassword.innerText = errores.confirmPassword;
        } else if (passwordInput.value != '') {
            if (passwordInput.value !== confirmPasswordInput.value) {
                errores.confirmPassword = 'La contraseña es distinta, pruebe otra vez';
                confirmPasswordInput.classList.add('is-invalid');
                errorConfirmPassword.style.display = 'block';
                msgErrorConfirmPassword.innerText = errores.confirmPassword;
            } else {
                delete errores.password;
                errores.todoOk = 'Ok';
                passwordInput.classList.remove('is-invalid');
                errorPassword.style.display = 'none';

                delete errores.confirmPassword;
                errores.todoOk = 'Ok';
                confirmPasswordInput.classList.remove('is-invalid');
                errorConfirmPassword.style.display = 'none';
            }
        } else {
            delete errores.confirmPassword;
            errores.todoOk = 'Ok';
            confirmPasswordInput.classList.remove('is-invalid');
            errorConfirmPassword.style.display = 'none';
        }
	});


    
    btn.addEventListener('click', (e) => {
     
		if (errores.password || errores.confirmPassword) {
			e.preventDefault();
		} else if (errores.todoOk == 'No') {
			e.preventDefault();
		} else {
			form.submit();
		}

	});
});



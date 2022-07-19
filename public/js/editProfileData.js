window.addEventListener('load', () => {
	const newUserNameInput = document.getElementById('new-user-name');
	const newEmailInput = document.getElementById('new-email');
	const newPhoneNumberInput = document.getElementById('new-phone-number');

	const errorBackUserName = document.getElementById('error-back-user-name');
	const errorBackEmail = document.getElementById('error-back-email');
	const errorBackPhoneNumber = document.getElementById(
		'error-back-phone-number'
	);

	const errorUserName = document.querySelector('.user-name');
	const errorEmail = document.querySelector('.email');
	const errorPhoneNumber = document.querySelector('.phone-number');

	const msgErrorUserName = document.querySelector('.user-name p');
	const msgErrorEmail = document.querySelector('.email p');
	const msgErrorPhoneNumber = document.querySelector('.phone-number p');

	const form = document.getElementById('form-edit-user-data');
	const btn = document.getElementById('btn');

	const userNameExistente = newUserNameInput.value;
	const emailExistente = newEmailInput.value;
	const phoneNumberExistente = newPhoneNumberInput.value;

	let errores = {
		todoOk: 'No',
	};


	newUserNameInput.addEventListener('blur', () => {
		errorBackUserName != null
			? (errorBackUserName.style.display = 'none')
			: null;

		if (
			newUserNameInput.value === '' ||
			newUserNameInput.value === undefined
		) {
			errores.userName = 'Tienes que elegir un nombre de usuario';
			newUserNameInput.classList.add('is-invalid');
			errorUserName.style.display = 'block';
			msgErrorUserName.innerText = errores.userName;
		} else if (newUserNameInput.value === userNameExistente) {
			errores.todoOk = 'No';
			newUserNameInput.classList.remove('is-invalid');
			errorUserName.style.display = 'none';
		} else if (newUserNameInput.value.length < 4) {
			errores.userName =
				'Tu nombre de usuario tiene que ser mayor de 4 caracteres';
			newUserNameInput.classList.add('is-invalid');
			errorUserName.style.display = 'block';
			msgErrorUserName.innerText = errores.userName;
		} else if (newUserNameInput.value.length > 15) {
			errores.userName =
				'Tu nombre de usuario tiene que ser menor de 15 caracteres';
			newUserNameInput.classList.add('is-invalid');
			errorUserName.style.display = 'block';
			msgErrorUserName.innerText = errores.userName;
		} else {
			delete errores.userName;
			errores.todoOk = 'Ok';
			newUserNameInput.classList.remove('is-invalid');
			errorUserName.style.display = 'none';
		}
	});

	newEmailInput.addEventListener('blur', () => {
		if (errorBackEmail != null) {
			errorBackEmail.style.display = 'none';
			newEmailInput.classList.remove('is-invalid');
		}

		if (newEmailInput.value === '' || newEmailInput.value === undefined) {
			errores.todoOk = 'No';
			newEmailInput.classList.add('is-invalid');
			errorEmail.style.display = 'block';
			msgErrorEmail.innerText = errores.email;
		} else if (newEmailInput.value === emailExistente) {
			errores.email = 'Mismo email';
			newUserNameInput.classList.remove('is-invalid');
			errorUserName.style.display = 'none';
		} else {
			delete errores.email;
			errores.todoOk = 'Ok';
			newEmailInput.classList.remove('is-invalid');
			errorEmail.style.display = 'none';
		}
	});

	newPhoneNumberInput.addEventListener('blur', (e) => {
		function validPhoneNumber() {
			let boolean = true;
			for (let i = 0; i < newPhoneNumberInput.value.length; i++) {
				if (!parseInt(newPhoneNumberInput.value[i])) {
					return (boolean = false);
				}
			}

			return boolean;
		}

		if (errorBackPhoneNumber != null) {
			errorBackPhoneNumber.style.display = 'none';
			newPhoneNumberInput.classList.remove('is-invalid');
		}

		if (
			newPhoneNumberInput.value === '' ||
			newPhoneNumberInput.value === undefined
		) {
			errores.phoneNumber = 'Tienes que poner tu número de telefono';
			newPhoneNumberInput.classList.add('is-invalid');
			errorPhoneNumber.style.display = 'block';
			msgErrorPhoneNumber.innerText = errores.phoneNumber;
		} else if (newPhoneNumberInput.value === phoneNumberExistente) {
			errores.todoOk = 'No';
			newPhoneNumberInput.classList.remove('is-invalid');
			errorPhoneNumber.style.display = 'none';
		} else if (validPhoneNumber() == false) {
			errores.phoneNumber = 'Tienes que poner un número de telefono';
			newPhoneNumberInput.classList.add('is-invalid');
			errorPhoneNumber.style.display = 'block';
			msgErrorPhoneNumber.innerText = errores.phoneNumber;
		} else if (
			newPhoneNumberInput.value.length < 13 ||
			newPhoneNumberInput.value.length > 13
		) {
			errores.phoneNumber = 'Un numero de telefono tiene 13 numeros';
			newPhoneNumberInput.classList.add('is-invalid');
			errorPhoneNumber.style.display = 'block';
			msgErrorPhoneNumber.innerText = errores.phoneNumber;
		} else {
			delete errores.phoneNumber;
			errores.todoOk = 'Ok';
			newPhoneNumberInput.classList.remove('is-invalid');
			errorPhoneNumber.style.display = 'none';
		}
	});

	btn.addEventListener('click', (e) => {
     
		if (errores.userName || errores.email || errores.phoneNumber) {
			e.preventDefault();
		} else if (errores.todoOk == 'No') {
			e.preventDefault();
		} else {
			form.submit();
		}

	});
});


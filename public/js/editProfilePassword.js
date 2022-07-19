window.addEventListener('load', () => {
	const oldPasswordInput = document.getElementById('old-password');
	const newPasswordInput = document.getElementById('new-password');
	const confirmNewPasswordInput = document.getElementById(
		'confirm-new-password'
	);

	const errorOldPassword = document.querySelector('.old-password');
	const errorNewPassword = document.querySelector('.new-password');
	const errorConfirmNewPassword = document.querySelector(
		'.confirm-new-password'
	);

	const msgErrorOldPassword = document.querySelector('.old-password p');
	const msgErrorNewPassword = document.querySelector('.new-password p');
	const msgErrorConfirmNewPassword = document.querySelector(
		'.confirm-new-password p'
	);

	const errorBackOldPassword = document.getElementById(
		'error-back-old-password'
	);
	const errorBackNewPassword = document.getElementById(
		'error-back-new-password'
	);

	const form = document.getElementById('form-edit-user-password');
	const btn = document.getElementById('btn');

	let errores = {
		todoOk: 'No',
	};

	oldPasswordInput.addEventListener('blur', () => {
		errorBackOldPassword != null
			? (errorBackOldPassword.style.display = 'none')
			: null;

		if (
			oldPasswordInput.value === '' ||
			oldPasswordInput.value === undefined
		) {
			errores.oldPassword = 'Tienes que poner tu contraseña actual';
			oldPasswordInput.classList.add('is-invalid');
			errorOldPassword.style.display = 'block';
			msgErrorOldPassword.innerText = errores.oldPassword;
		} else {
			delete errores.oldPassword;
			errores.todoOk = 'Ok';
			oldPasswordInput.classList.remove('is-invalid');
			errorOldPassword.style.display = 'none';
		}
	});

	newPasswordInput.addEventListener('blur', () => {
		errorBackNewPassword != null
			? (errorBackNewPassword.style.display = 'none')
			: null;

		if (
			newPasswordInput.value === '' ||
			newPasswordInput.value === undefined
		) {
			errores.newPassword = 'Tienes que poner una contraseña nueva';
			newPasswordInput.classList.add('is-invalid');
			errorNewPassword.style.display = 'block';
			msgErrorNewPassword.innerText = errores.newPassword;
		} else if (newPasswordInput.value.length < 6) {
			errores.newPassword =
				'La contraseña tiene que tener mas de 6 caracteres';
			newPasswordInput.classList.add('is-invalid');
			errorNewPassword.style.display = 'block';
			msgErrorNewPassword.innerText = errores.newPassword;
		} else if (confirmNewPasswordInput.value != '') {
			if (newPasswordInput.value !== confirmNewPasswordInput.value) {
				errores.newPassword =
					'La contraseña es distinta, pruebe otra vez';
				newPasswordInput.classList.add('is-invalid');
				errorNewPassword.style.display = 'block';
				msgErrorNewPassword.innerText = errores.newPassword;
			} else {
				delete errores.newPassword;
				errores.todoOk = 'Ok';
				newPasswordInput.classList.remove('is-invalid');
				errorNewPassword.style.display = 'none';

				delete errores.confirmNewPassword;
				errores.todoOk = 'Ok';
				confirmNewPasswordInput.classList.remove('is-invalid');
				errorConfirmNewPassword.style.display = 'none';
			}
		} else {
			delete errores.newPassword;
			errores.todoOk = 'Ok';
			newPasswordInput.classList.remove('is-invalid');
			errorNewPassword.style.display = 'none';
		}
	});

	confirmNewPasswordInput.addEventListener('blur', () => {
		if (
			confirmNewPasswordInput.value === '' ||
			confirmNewPasswordInput.value === undefined
		) {
			errores.confirmNewPassword =
				'Tienes que poner una contraseña nueva';
			confirmNewPasswordInput.classList.add('is-invalid');
			errorConfirmNewPassword.style.display = 'block';
			msgErrorConfirmNewPassword.innerText = errores.confirmNewPassword;
		} else if (confirmNewPasswordInput.value.length < 6) {
			errores.confirmNewPassword =
				'La contraseña tiene que tener mas de 6 caracteres';
			confirmNewPasswordInput.classList.add('is-invalid');
			errorConfirmNewPassword.style.display = 'block';
			msgErrorConfirmNewPassword.innerText = errores.confirmNewPassword;
		} else if (newPasswordInput.value != '') {
			if (confirmNewPasswordInput.value != newPasswordInput.value) {
				errores.confirmNewPassword =
					'La contraseña es distinta, pruebe otra vez';
				confirmNewPasswordInput.classList.add('is-invalid');
				errorConfirmNewPassword.style.display = 'block';
				msgErrorConfirmNewPassword.innerText =
					errores.confirmNewPassword;
			} else {
				delete errores.newPassword;
				errores.todoOk = 'Ok';
				newPasswordInput.classList.remove('is-invalid');
				errorNewPassword.style.display = 'none';

				delete errores.confirmNewPassword;
				errores.todoOk = 'Ok';
				confirmNewPasswordInput.classList.remove('is-invalid');
				errorConfirmNewPassword.style.display = 'none';
			}
		} else {
			delete errores.confirmNewPassword;
			errores.todoOk = 'Ok';
			confirmNewPasswordInput.classList.remove('is-invalid');
			errorConfirmNewPassword.style.display = 'none';
		}
	});

	btn.addEventListener('click', (e) => {
		if (
			errores.oldPassword ||
			errores.newPassword ||
			errores.confirmNewPassword
		) {
			e.preventDefault();
		} else if (errores.todoOk == 'No') {
			e.preventDefault();
		} else {
			form.submit();
		}
	});
});

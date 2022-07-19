window.addEventListener('load', () => {
	let ojos = document.querySelectorAll('.ojoCambiarPassword');
	let ojo = document.querySelector('.ojo');

	if (ojos.length == 0) {
		let ojo = document.querySelector('.ojo');
		let ojo2 = document.querySelector('.ojo2');
		let password = document.getElementById('password');
		let confirmPassword = document.getElementById('password2');

		ojo.addEventListener('click', () => {
			if (password.type === 'password') {
				password.type = 'text';
				ojo.classList.add('fa-eye-slash');
				ojo.classList.remove('fa-eye');
			} else {
				password.type = 'password';
				ojo.classList.remove('fa-eye-slash');
				ojo.classList.add('fa-eye');
			}
		});

		if (ojo2) {
			ojo2.addEventListener('click', () => {
				if (confirmPassword.type === 'password') {
					confirmPassword.type = 'text';
					ojo2.classList.add('fa-eye-slash');
					ojo2.classList.remove('fa-eye');
				} else {
					confirmPassword.type = 'password';
					ojo2.classList.remove('fa-eye-slash');
					ojo2.classList.add('fa-eye');
				}
			});
		}
	}

	let oldPassword = document.getElementById('old-password');
	let newPassword = document.getElementById('new-password');
	let confirmNewPassword = document.getElementById('confirm-new-password');

	if (ojos.length > 0) {
		for (let i = 0; i < ojos.length; i++) {
			ojos[i].addEventListener('click', () => {
				if (i == 0) {
					if (oldPassword.type === 'password') {
						oldPassword.type = 'text';
						ojos[i].classList.add('fa-eye-slash');
						ojos[i].classList.remove('fa-eye');
					} else {
						oldPassword.type = 'password';
						ojos[i].classList.remove('fa-eye-slash');
						ojos[i].classList.add('fa-eye');
					}
				} else if (i == 1) {
					if (newPassword.type === 'password') {
						newPassword.type = 'text';
						ojos[i].classList.add('fa-eye-slash');
						ojos[i].classList.remove('fa-eye');
					} else {
						newPassword.type = 'password';
						ojos[i].classList.remove('fa-eye-slash');
						ojos[i].classList.add('fa-eye');
					}
				} else if (i == 2) {
					if (confirmNewPassword.type === 'password') {
						confirmNewPassword.type = 'text';
						ojos[i].classList.add('fa-eye-slash');
						ojos[i].classList.remove('fa-eye');
					} else {
						confirmNewPassword.type = 'password';
						ojos[i].classList.remove('fa-eye-slash');
						ojos[i].classList.add('fa-eye');
					}
				}
			});
		}
	}
});

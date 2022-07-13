window.addEventListener('load', () => {
	let user = document.querySelector('.menu-horizontal');

	if (user) {
		user.addEventListener('click', () => {
			let menuVertical = document.querySelector('.sub-menu-vertical');

			menuVertical.classList.toggle('mostrar-menu-vertical');
		});
	}

	let burgerMenu = document.querySelector('.menu');
	let menuDesplegable = document.querySelector('.sub-burger-menu');

	burgerMenu.addEventListener('click', () => {

		if ((menuDesplegable.style.display === 'none')) {
			menuDesplegable.style.display = 'block';
		} else if (menuDesplegable.style.display !== 'none'){
			menuDesplegable.style.display = 'none';
		}
	});

});

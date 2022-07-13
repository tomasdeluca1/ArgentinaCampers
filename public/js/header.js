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
		menuDesplegable.classList.toggle('mostrar');
	});

	if (menuDesplegable.classList.contains('mostrar')) {
		cruz.addEventListener('click', () => {
			menuDesplegable.classList.remove('mostrar');
		});
	}
});

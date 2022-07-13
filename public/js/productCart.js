const precios = document.querySelectorAll('.precioTotal');
const precioTotalDelViaje = document.querySelector('.precio-total');

if (precios || precios != '') {
	window.addEventListener('load', () => {
		function precioTotal() {
			let precioTotal = 0;

			for (let precio of precios) {
				precioTotal = precioTotal + parseInt(precio.innerHTML);
			}

			return precioTotal;
		}

		precioTotalDelViaje.innerHTML = `$${precioTotal()}`;
	});
}

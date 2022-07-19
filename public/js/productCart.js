const precios = document.querySelectorAll('.precioTotal');
const precioTotalDelViaje = document.querySelector('.precio-total');

let form = document.getElementById('form-comprar');
let btn = document.getElementById('btn');

window.addEventListener('load', () => {
	if (precios.length > 0) {
		function precioTotal() {
			let precioTotal = 0;

			for (let precio of precios) {
				precioTotal = precioTotal + parseInt(precio.innerHTML);
			}

			return precioTotal;
		}

		precioTotalDelViaje.innerHTML = `$${precioTotal()}`;

		btn.addEventListener('click', (e) => {
			e.preventDefault();

			Swal.fire({
				icon: 'success',
				title: 'Felicitaciones por tu compra!',
				text: 'Los detalles de la entrega y la documentacion se haran por whatsapp, lo contactaremos en brevedad.',
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: true,
				confirmButtonText: 'Ok!',
				showConfirmButton: true,				
			})
			.then(result => {
				if (result.isConfirmed == true) {
					form.submit()
				}
			})

		});
	} else {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
		});
	}
});

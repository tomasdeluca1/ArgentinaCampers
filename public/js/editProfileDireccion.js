window.addEventListener('load', () => {
	const newProvinciaInput = document.getElementById('new-provincia');
	const newMunicipioInput = document.getElementById('new-municipio');
	const newCiudadInput = document.getElementById('new-ciudad');
	const newCalleInput = document.getElementById('new-calle');
	const newNumeroViviendaInput = document.getElementById('new-numero-vivienda');
	const newCodigoPostalInput = document.getElementById('new-codigo-postal');


    const errorNewProvincia = document.querySelector('.new-provincia');
    const errorNewMunicipio = document.querySelector('.new-municipio');
    const errorNewCiudad = document.querySelector('.new-ciudad');
    const errorNewCalle = document.querySelector('.new-calle')
    const errorNewNumeroVivienda = document.querySelector('.new-numero-vivienda');
    const errorNewCodigoPostal = document.querySelector('.new-codigo-postal');


    const msgErrorNewProvincia = document.querySelector('.new-provincia p');
    const msgErrorNewMunicipio = document.querySelector('.new-municipio p');
    const msgErrorNewCiudad = document.querySelector('.new-ciudad p');
    const msgErrorNewCalle = document.querySelector('.new-calle p')
    const msgErrorNewNumeroVivienda = document.querySelector('.new-numero-vivienda p');
    const msgErrorNewCodigoPostal = document.querySelector('.new-codigo-postal p');
    

    const errorBackNewProvincia = document.getElementById('error-back-new-provincia');
    const errorBackNewMunicipio = document.getElementById('error-back-new-municipio');
    const errorBackNewCiudad = document.getElementById('error-back-new-ciudad');
    const errorBackNewCalle = document.getElementById('error-back-new-calle');
    const errorBackNewNumeroVivienda = document.getElementById('error-back-new-numero-vivienda');
    const errorBackNewCodigoPostal = document.getElementById('error-back-new-codigo-postal');



    const provinciaExistente = newProvinciaInput.value;
    const municipioExistente = newMunicipioInput.value
    const ciudadExistente = newCiudadInput.value
    const calleExistente = newCalleInput.value
    const numeroViviendaExistente = newNumeroViviendaInput.value
    const codigoPostalExistente = newCodigoPostalInput.value


    const form = document.getElementById('form-edit-user-direccion');
	const btn = document.getElementById('btn');

    let errores = {
		todoOk: 'No',
	};


    newProvinciaInput.addEventListener('blur', () => {


        errorBackNewProvincia != null
			? (errorBackNewProvincia.style.display = 'none')
			: null;

        if (newProvinciaInput.value === '' || newProvinciaInput.value === undefined) {
            errores.newProvincia = 'Tienes que poner la provincia en donde vives';
			newProvinciaInput.classList.add('is-invalid');
			errorNewProvincia.style.display = 'block';
			msgErrorNewProvincia.innerText = errores.newProvincia;     
        } else if (newProvinciaInput.value === provinciaExistente) {
            errores.todoOk = 'No';
			newProvinciaInput.classList.remove('is-invalid');
			errorNewProvincia.style.display = 'none';
        } else {
            delete errores.newProvincia;
			errores.todoOk = 'Ok';
			newProvinciaInput.classList.remove('is-invalid');
			errorNewProvincia.style.display = 'none';
        }
    })

    newMunicipioInput.addEventListener('blur', () => {
        errorBackNewMunicipio != null
			? (errorBackNewMunicipio.style.display = 'none')
			: null;
        
        if (newMunicipioInput.value === '' || newMunicipioInput.value === undefined) {
            errores.newMunicipio = 'Tienes que poner el municipio en donde vives';
			newMunicipioInput.classList.add('is-invalid');
			errorNewMunicipio.style.display = 'block';
			msgErrorNewMunicipio.innerText = errores.newMunicipio; 
        } else if (newMunicipioInput.value === municipioExistente) {
            errores.todoOk = 'No';
			newMunicipioInput.classList.remove('is-invalid');
			errorNewMunicipio.style.display = 'none';
        } else {
            delete errores.newMunicipio;
			errores.todoOk = 'Ok';
			newMunicipioInput.classList.remove('is-invalid');
			errorNewMunicipio.style.display = 'none';
        }
    })



    newCiudadInput.addEventListener('blur', () => {
        errorBackNewCiudad != null
			? (errorBackNewCiudad.style.display = 'none')
			: null;
        
        if (newCiudadInput.value === '' || newCiudadInput.value === undefined) {
            errores.newCiudad = 'Tienes que poner la ciudad en donde vives';
			newCiudadInput.classList.add('is-invalid');
			errorNewCiudad.style.display = 'block';
			msgErrorNewCiudad.innerText = errores.newCiudad; 
        } else if (newCiudadInput.value === ciudadExistente) {
            errores.todoOk = 'No';
			newCiudadInput.classList.remove('is-invalid');
			errorNewCiudad.style.display = 'none';
        } else {
            delete errores.newCiudad;
			errores.todoOk = 'Ok';
			newCiudadInput.classList.remove('is-invalid');
			errorNewCiudad.style.display = 'none';
        }
    })


    newCalleInput.addEventListener('blur', () => {
        errorBackNewCalle != null
			? (errorBackNewCalle.style.display = 'none')
			: null;
        
        if (newCalleInput.value === '' || newCalleInput.value === undefined) {
            errores.newCalle = 'Tienes que poner la calle en donde vives';
			newCalleInput.classList.add('is-invalid');
			errorNewCalle.style.display = 'block';
			msgErrorNewCalle.innerText = errores.newCalle; 
        } else if (newCalleInput.value === calleExistente) {
            errores.todoOk = 'No';
			newCalleInput.classList.remove('is-invalid');
			errorNewCalle.style.display = 'none';
        } else {
            delete errores.newCalle;
			errores.todoOk = 'Ok';
			newCalleInput.classList.remove('is-invalid');
			errorNewCalle.style.display = 'none';
        }
    })


    newNumeroViviendaInput.addEventListener('blur', () => {
        errorBackNewNumeroVivienda != null
			? (errorBackNewNumeroVivienda.style.display = 'none')
			: null;
        
        if (newNumeroViviendaInput.value === '' || newNumeroViviendaInput.value === undefined) {
            errores.newNumeroVivienda = 'Tienes que poner tu numero de vivienda';
			newNumeroViviendaInput.classList.add('is-invalid');
			errorNewNumeroVivienda.style.display = 'block';
			msgErrorNewNumeroVivienda.innerText = errores.newNumeroVivienda; 
        } else if (newNumeroViviendaInput.value === numeroViviendaExistente) {
            errores.todoOk = 'No';
			newNumeroViviendaInput.classList.remove('is-invalid');
			errorNewNumeroVivienda.style.display = 'none';
        } else {
            delete errores.newNumeroVivienda;
			errores.todoOk = 'Ok';
			newNumeroViviendaInput.classList.remove('is-invalid');
			errorNewNumeroVivienda.style.display = 'none';
        }
    })


    newCodigoPostalInput.addEventListener('blur', () => {
        errorBackNewCodigoPostal != null
			? (errorBackNewCodigoPostal.style.display = 'none')
			: null;
        
        if (newCodigoPostalInput.value === '' || newCodigoPostalInput.value === undefined) {
            errores.newCodigoPostal = 'Tienes que poner tu codigo postal';
			newCodigoPostalInput.classList.add('is-invalid');
			errorNewCodigoPostal.style.display = 'block';
			msgErrorNewCodigoPostal.innerText = errores.newCodigoPostal; 
        } else if (newCodigoPostalInput.value === codigoPostalExistente) {
            errores.todoOk = 'No';
			newCodigoPostalInput.classList.remove('is-invalid');
			errorNewCodigoPostal.style.display = 'none';
        } else {
            delete errores.newCodigoPostal;
			errores.todoOk = 'Ok';
			newCodigoPostalInput.classList.remove('is-invalid');
			errorNewCodigoPostal.style.display = 'none';
        }
    })



    btn.addEventListener('click', (e) => {
     
		if (errores.newProvincia || errores.newMunicipio || errores.newCiudad || errores.newCalle || errores.newNumeroVivienda || errores.newCodigoPostal) {
			e.preventDefault();
		} else if (errores.todoOk == 'No') {
			e.preventDefault();
		} else {
			form.submit();
		}

	});



});

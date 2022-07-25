window.addEventListener('load', () => {

    //Inputs
    const formulario = document.getElementById("feedback");
    const destino = document.getElementById("probandoId");
    const calificacion = document.getElementById("calificacionFront");
    const titulo = document.getElementById("tituloFront");
    const descripcion = document.getElementById("descripcionFront");
   

    //errores
    let erroresDestino = document.querySelector(".destino-errores");
    let erroresCalificacion = document.querySelector(".calificacion-errores");
    let erroresTitulo = document.querySelector(".titulo-errores");
    let erroresDescripcion = document.querySelector(".descripcion-errores"); 
    
    //mensajes de errores
    let msgErroresDestino = document.querySelector(".errorDestinoFront");
    let msgErroresCalificacion = document.querySelector(".calificacion-errores p");
    let msgErroresTitulo = document.querySelector(".titulo-errores p");
    let msgErroresDescripcion = document.querySelector(".descripcion-errores p")

	let errores = {
		todoOk: 'No',
	};
    //CONSOLE LOG DE PRUEBA
    console.log(destino);
    console.log(calificacion);
    destino.addEventListener("blur", function(){

        if(destino.value === "" || destino.value === undefined){//verificar vacio
       
            errores.destino = 'Tienes que escribir un destino valido';  
			msgErroresDestino.innerHTML = errores.destino;
            erroresDestino.style.display = 'block';
            errores.todoOk="No"
            destino.classList.add('is-invalid');
        }else {     //salida

			delete errores.destino;
			errores.todoOk = 'Ok';
			erroresDestino.style.display = 'none';
            destino.classList.remove('is-invalid');
        }

    })
    calificacion.addEventListener("blur", function(){

        //verificar vecio
        if(calificacion.value == null || calificacion.value == "" || calificacion.value == undefined) {
            errores.calificacion = "Tienes que elegir una calificacion";
            msgErroresCalificacion.innerHTML = errores.calificacion;
            calificacion.classList.add('is-invalid');
            
        }else { //salida
			delete errores.calificacion;
			errores.todoOk = 'Ok';
			
			calificacion.classList.remove('is-invalid');
			erroresCalificacion.style.display = 'none';
		}
    })
    titulo.addEventListener("blur", function(){

        if(titulo.value == "" || titulo.value == undefined){//contenido vacio
            
            errores.titulo = "Este campo no puede estar vacio"
            msgErroresTitulo.innerHTML = errores.titulo;
            errores.todoOk = "No"
            titulo.classList.add('is-invalid');
        }
        else if (titulo.value.length <5) { //verificar el largo

            errores.titulo = "El titulo debe tener un minimo de 5 caracteres";
            msgErroresTitulo.innerHTML = errores.titulo;
            errores.todoOk = "No" ;
            titulo.classList.add('is-invalid');

        }
        else {                          //salida

            delete errores.titulo;
            erroresTitulo.style.display = 'none';
            errores.todoOk = "Ok";
            titulo.classList.remove('is-invalid');

        }
    })
    descripcion.addEventListener("blur", function(){

        if(descripcion.value == "" || descripcion.value == undefined){//verificar vacio

            errores.descripcion = "Este campo no puede estar vacio";
            msgErroresDescripcion.innerHTML = errores.descripcion;
            errores.todoOk = "No";
            descripcion.classList.add('is-invalid');
            
        }else if(descripcion.value.length < 15){ //verificar largo

            errores.descripcion = "La descripcion debe tener un minimo de 15 caracteres";
            msgErroresDescripcion.innerHTML = errores.descripcion;
            errores.todoOk = "No";   
            descripcion.classList.add('is-invalid');     
        
        }
        else{    //salida

            delete errores.descripcion;
            erroresDescripcion.style.display = "none";
            errores.todoOk = "Ok"
            descripcion.classList.remove('is-invalid');
        }

    })

    formulario.addEventListener('click', (e) => {
     
		if (errores.destino || errores.calificacion || errores.titulo || errores.descripcion) {
			e.preventDefault();
		} else if (errores.todoOk == 'No') {
			e.preventDefault();
		} else {
			form.submit();
		}

	});

})
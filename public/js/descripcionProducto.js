window.addEventListener('load', () => {

    const imagenes = document.querySelector('.imagenes')
    const flechaAtras = document.querySelector('#flecha-atras')
    const flechaAdelante = document.querySelector('#flecha-adelante')
    const imagenesArray = document.querySelectorAll('.imagen')
    
    
    imagenes.style.width = `calc(100% * ${imagenesArray.length} )`
    
    imagenesArray.forEach(imagen => {
        imagen.style.width = `calc(100% / ${imagenesArray.length})`
    })
    
    const transform = document.querySelector('.transform')
    let contador = 1
    
    flechaAtras.addEventListener('click', () => {
    
        let clicksPermitidos = imagenesArray.length 
    
        contador--
    
        if(contador < 1) {
            contador = clicksPermitidos
        }
    
        
    
        if(contador <= clicksPermitidos && contador > 0){
            imagenes.style.transform = `translateX(${( (contador - 1) * (100 / -clicksPermitidos))}%)`
        }
    
    })
    
    
    
    flechaAdelante.addEventListener('click', () => {
    
        let clicksPermitidos = imagenesArray.length 
    
        contador++
    
        if(contador > clicksPermitidos) {
            contador = 1
        }
    
        
    
        if(contador <= clicksPermitidos){
            imagenes.style.transform = `translateX(${( (contador - 1) * (100 / -clicksPermitidos))}%)`
        }
        
    })
    
    
    
    
    
    
    
    
    const fechaPartida = document.getElementById('fechaPartida')
    const fechaLlegada = document.getElementById('fechaLlegada')
    
    
    // function cantidadDias (fecha1, fecha2) {
    //     if(!(fecha1 instanceof Date) || !(fecha2 instanceof Date)) {
    //         throw TypeError('puto')
    //     }
    
    //     let diferencia =  (fecha2.getTime() - fecha1.getTime()) / 1000;
    //     diferencia /= (60 * 60 * 24)
    
    //     return Math.abs(Math.round(diferencia))
    // }
    
    
    
    
    
    // const anoPartidaRecibido = parseInt(String(fechaPartida.value).substring(0, 4));
    // const mesPartidaRecibido = parseInt(String(fechaPartida.value).substring(5, 7));
    // const diaPartidaRecibido = parseInt(String(fechaPartida.value).substring(8, 10));
    
    // const anoLLegadaRecibido = parseInt(String(fechaLlegada.value).substring(0, 4));
    // const mesLLegadaRecibido = parseInt(String(fechaLlegada.value).substring(5, 7));
    // const diaLLegadaRecibido = parseInt(String(fechaLlegada.value).substring(8, 10));
    
    
    fechaPartida.addEventListener('change', () => {
        if(fechaPartida.value && fechaLlegada.value) {
            let precioTotal = document.querySelector('.precio-total')
            let diasDeVacaciones = document.querySelector('.dias-de-vacaciones')
            let precio = document.querySelector('.precio')
    
            
            let fecha1 = new Date(`${fechaPartida.value}`).getTime()
            let fecha2 = new Date(`${fechaLlegada.value}`).getTime()
        
    
            var diff = (fecha2 - fecha1) / (1000*60*60*24);
    
            diasDeVacaciones.innerHTML = `Te irias de vacaciones desde el <strong>${fechaPartida.value}</strong> al <strong>${fechaLlegada.value}</strong>, <strong>${diff}</strong> dias en total`
            precioTotal.innerHTML = `El precio total seria de <strong>$${parseInt(precio.innerHTML) * diff}</strong>`
    
            diasDeVacaciones.style.display = 'block'
            precioTotal.style.display = 'block'         
            
        } else {
            let precioTotal = document.querySelector('.precio-total')
            let diasDeVacaciones = document.querySelector('.dias-de-vacaciones')
    
            diasDeVacaciones.style.display = 'none'
            precioTotal.style.display = 'none'  
        }
    })
    
    
    fechaLlegada.addEventListener('change', () => {
    
        if(fechaLlegada.value && fechaPartida.value) {
    
            let precioTotal = document.querySelector('.precio-total')
            let diasDeVacaciones = document.querySelector('.dias-de-vacaciones')
            let precio = document.querySelector('.precio')
    
            
            let fecha1 = new Date(`${fechaPartida.value}`).getTime()
            let fecha2 = new Date(`${fechaLlegada.value}`).getTime()
        
    
    
            var diff = (fecha2 - fecha1) / (1000*60*60*24);
     
    
            diasDeVacaciones.innerHTML = `Te irias de vacaciones desde el <strong>${fechaPartida.value}</strong> al <strong>${fechaLlegada.value}</strong>, <strong>${diff}</strong> dias en total`
            precioTotal.innerHTML = `El precio total seria de <strong>$${parseInt(precio.innerHTML) * diff}</strong>`
    
            diasDeVacaciones.style.display = 'block'
            precioTotal.style.display = 'block'
       
        } else {
            let precioTotal = document.querySelector('.precio-total')
            let diasDeVacaciones = document.querySelector('.dias-de-vacaciones')
    
            diasDeVacaciones.style.display = 'none'
            precioTotal.style.display = 'none'  
        } 
        
    })
    
})










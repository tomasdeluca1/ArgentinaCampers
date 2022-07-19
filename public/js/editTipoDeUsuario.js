window.addEventListener('load', () => {

    const tipoDeUsuarioInput = document.getElementById('select-tipo-de-usuario')
    const valorExistente = tipoDeUsuarioInput.value

    const form = document.getElementById('form-edit-tipo-de-usuario');
    const btn = document.getElementById('btn')

    btn.addEventListener('click', (e) => {

        console.log(valorExistente);
        console.log(tipoDeUsuarioInput.value);

        if (valorExistente === tipoDeUsuarioInput.value) {
            e.preventDefault();
        } else {
            form.submit();
        }
    })

})
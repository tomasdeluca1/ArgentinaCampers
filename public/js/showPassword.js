let ojo = document.querySelector('.ojo')
let ojo2 = document.querySelector('.ojo2')
let password = document.getElementById('password')
let confirmPassword = document.getElementById('password2')


ojo.addEventListener('click', () => {
    if(password.type === 'password') {
        password.type = 'text'
        ojo.classList.add('fa-eye-slash')
        ojo.classList.remove('fa-eye')
    } else {
        password.type = 'password'
        ojo.classList.remove('fa-eye-slash')
        ojo.classList.add('fa-eye')
    }
})



ojo2.addEventListener('click', () => {
    if(confirmPassword.type === 'password') {
        confirmPassword.type = 'text'
        ojo2.classList.add('fa-eye-slash')
        ojo2.classList.remove('fa-eye')
    } else {
        confirmPassword.type = 'password'
        ojo2.classList.remove('fa-eye-slash')
        ojo2.classList.add('fa-eye')
    }
})






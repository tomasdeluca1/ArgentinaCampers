let burgerMenu = document.querySelector('.menu')
let background = document.querySelector('.background')
let cruz = document.querySelector('.cruz')
let subBurgerMenu = document.querySelector('.sub-burger-menu')
let linksBurgerMenu = document.querySelectorAll('.links-burger-menu')


if(window.innerWidth > 0 && window.innerWidth < 1015) {
    burgerMenu.style.display = 'block'
    background.style.display = 'block'
    cruz.style.display = 'block'
    // subBurgerMenu.style.display = 'block'
} else {
    burgerMenu.style.display = 'none'
    background.style.display = 'none'
    cruz.style.display = 'none'
    // subBurgerMenu.style.display = 'none'
}

window.addEventListener('load', () =>{
    let user = document.querySelector('.menu-horizontal')

    if(user){
        user.addEventListener('click', () => {
            let menuVertical = document.querySelector('.sub-menu-vertical')
    
            menuVertical.classList.toggle('mostrar-menu-vertical')
        })
    }
})


if(burgerMenu.style.display == 'block') {
    burgerMenu.addEventListener('click', () => {
        subBurgerMenu.classList.add('mostrar-links-burger-menu');
        background.classList.add('mostrar-burger-menu');
        cruz.classList.add('mostrar-burger-menu');
        background.style.display = 'block';
        cruz.style.display = 'block';
    })

    cruz.addEventListener('click', () => {
        subBurgerMenu.classList.remove('ocultar-links-burger-menu')
        background.classList.remove('mostrar-burger-menu')
        cruz.classList.remove('mostrar-burger-menu')
        background.style.display = 'none'
        cruz.style.display = 'none'
    })
}












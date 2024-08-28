const body = document.body
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0
let slideInterval = null

function setBgToBody() {
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActiveSlide() {
    slides.forEach((slide) => slide.classList.remove('active'))
    slides[activeSlide].classList.add('active')
}

setBgToBody()

function nextSlide() {
    activeSlide++

    if (activeSlide > slides.length - 1) {
        activeSlide = 0
    }

    setBgToBody()
    setActiveSlide()
}

function prevSlide() {
    activeSlide--

    if(activeSlide < 0) {
        activeSlide = slides.length - 1
    }

    setBgToBody()
    setActiveSlide()
}

function startSlideInterval() {
    slideInterval = setInterval(prevSlide, 3000)
}

function resetSlideInterval() {
    clearInterval(slideInterval)
    startSlideInterval()
}

rightBtn.addEventListener('click', () => {
    nextSlide()
    resetSlideInterval()
})

leftBtn.addEventListener('click', () => {
    prevSlide()
    resetSlideInterval()
})

// Iniciar el cambio automático de diapositivas
startSlideInterval()

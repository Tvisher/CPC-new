const firstScreenBg = document.querySelector('.first-screen__bg');

const changeImage = (sliderEl) => {
    const currentSlide = sliderEl.slides[sliderEl.activeIndex];
    if (currentSlide) {
        const slideImage = currentSlide.querySelector('img');
        if (slideImage) {
            const imagePath = slideImage.getAttribute('src')
            firstScreenBg.style.backgroundImage = `url(${imagePath})`;
        }
    }

}

const mainSlider = new Swiper('.first-screen__slider', {
    spaceBetween: 40,
    speed: 800,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    on: {
        init(swiper) {
            changeImage(swiper)
        },
        activeIndexChange(swiper) {
            changeImage(swiper)
        }
    }

})
const firstScreenBg = document.querySelector('.first-screen__bg')


const mainSlider = new Swiper('.first-screen__slider', {
    spaceBetween: 40,
    speed: 800,
    on: {
        init(swiper) {
            const currentSlide = swiper.slides[swiper.activeIndex];
            const slideImage = currentSlide.querySelector('img').src
            firstScreenBg.style.backgroundImage = `url(${slideImage})`;
        },
        activeIndexChange(swiper) {
            const currentSlide = swiper.slides[swiper.activeIndex];
            const slideImage = currentSlide.querySelector('img').src
            firstScreenBg.style.backgroundImage = `url(${slideImage})`;
        }
    }
})
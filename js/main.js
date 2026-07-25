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


// const header = document.querySelector('header.header');
// const fixedHeader = document.querySelector('.fixed-header');

// const checkWindowScroll = () => {
//     if (window.scrollY > header.clientHeight) {
//         fixedHeader.classList.add('show')
//     } else {
//         fixedHeader.classList.remove('show')
//     }
// }
// checkWindowScroll()
// document.addEventListener('scroll', (e) => checkWindowScroll())

const header = document.querySelector('header.header');
const fixedHeader = document.querySelector('.fixed-header');

if (header && fixedHeader) {
    const observer = new IntersectionObserver(
        ([entry]) => {
            // Покажем fixedHeader, когда header полностью ушел с экрана
            fixedHeader.classList.toggle('show', !entry.isIntersecting);
        },
        { threshold: 0 } // Реакция сразу при выходе элемента из Viewport
    );

    observer.observe(header);
}
const firstScreenBg = document.querySelector(".first-screen__bg");
const changeImage = (sliderEl) => {
  const currentSlide = sliderEl.slides[sliderEl.activeIndex];
  if (currentSlide) {
    const slideImage = currentSlide.querySelector("img");
    if (slideImage) {
      const imagePath = slideImage.getAttribute("src");
      firstScreenBg.style.backgroundImage = `url(${imagePath})`;
    }
  }
};

const mainSlider = new Swiper(".first-screen__slider", {
  spaceBetween: 40,
  speed: 800,
  // loop: 1,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: 1,
  },
  on: {
    init(swiper) {
      changeImage(swiper);
    },
    activeIndexChange(swiper) {
      changeImage(swiper);
    },
  },
});

const leftMenuInner = document.querySelector(".left-menu__content");
const bodyEl = document.querySelector("body");
const leftMenu = document.querySelector(".left-menu");
document.addEventListener("click", (e) => {
  const target = e.target;
  if (
    bodyEl.classList.contains("menu-open") &&
    !target.closest(".left-menu__content")
  ) {
    leftMenu.classList.remove("open");
    leftMenuInner.classList.remove("open");
    bodyEl.classList.remove("menu-open");
    return;
  }
  if (target.closest(".left-menu") || target.closest(".left-menu__btn._mob")) {
    leftMenu.classList.toggle("open");
    leftMenuInner.classList.toggle("open");
    bodyEl.classList.toggle("menu-open");
    if (leftMenu.classList.contains("open")) {
      history.pushState({ menuOpen: true }, "");
    }
    return;
  }

  if (target.closest(".next-arrow")) {
    mainSlider.slideNext(800);
  }
  if (target.closest(".prev-arrow")) {
    mainSlider.slidePrev(800);
  }
});

const header = document.querySelector("header.header");
const fixedHeader = document.querySelector(".fixed-header");
if (header && fixedHeader) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      fixedHeader.classList.toggle("show", !entry.isIntersecting);
    },
    { threshold: 0 },
  );

  observer.observe(header);
}

$(".nav-menu__item .open-arrow").on("click", function () {
  const innerMenu = $(this)
    .parents(".nav-menu__item")
    .find(".nav-menu__submenu-wrapper");
  $(this).toggleClass("open");
  innerMenu.slideToggle("slow", function () { });
});

window.addEventListener("popstate", function (event) {
  const openedMemu = document.querySelector(".left-menu__content.open");
  if (openedMemu) {
    leftMenu.classList.remove("open");
    leftMenuInner.classList.remove("open");
    bodyEl.classList.remove("menu-open");
    if (history.state && history.state.menuOpen) {
      history.back();
    }
  }
});

const filterParams = {};
$(document).ready(function () {
  $(".select-item").each(function () {
    const placeholder = $(this).attr("placeholder");
    filterParams[`${$(this).attr("name")}`] = "";
    $(this).select2({
      minimumResultsForSearch: -1,
      placeholder: placeholder,
    });

    $(this).on("select2:select", function (e) {
      filterParams[`${$(this).attr("name")}`] = e.target.value;
      submitFilters();
    });
  });
});

const datePicker = new AirDatepicker(".datepicker-range", {
  isMobile: true,
  autoClose: true,
  range: true,
  multipleDatesSeparator: " - ",
  onSelect({ formattedDate }) {
    if (formattedDate.length > 1) {
      filterParams.date = formattedDate;
      submitFilters();
    }
  },
});
if (datePicker) {
  filterParams.date = [];
}

const resetFilter = document.querySelector(".filter-reset");
if (resetFilter) {
  resetFilter.addEventListener("click", (e) => {
    if (datePicker) {
      datePicker.clear();
    }
    $(".select-item").val(null).trigger("change");

    Object.keys(filterParams).forEach((key) => {
      filterParams[key] = key === "date" ? [] : "";
    });

    submitFilters();
  });
}

function submitFilters() {
  console.log(filterParams);
}

const articleSlider = new Swiper(".article-content__slider-el", {
  spaceBetween: 40,
  slidesPerView: 1,
  speed: 800,
  loop: 1,
  pagination: {
    el: ".article-content__slider-el .swiper-pagination",
    type: "bullets",
    clickable: 1,
  },
  navigation: {
    nextEl: ".article-content__slider-el .swiper-button-next",
    prevEl: ".article-content__slider-el .swiper-button-prev",
  },
});

Fancybox.bind("[data-fancybox]", {
  Carousel: {
    formatCaption: (carouselRef, slide) => {
      console.log(slide);

      return `${slide.caption ? slide.caption : ""}<a class='caption-link' target='_blank' download href='${slide.src}'>Скачать оригинал</a>`;
    },
  },
});

$("[data-toggle-item]").on("click", function () {
  const innerItem = $(this)
    .parents(".geography-toggle-item")
    .find(".geography-toggle-item__body");
  $(this).toggleClass("open");
  innerItem.slideToggle("slow", function () { });
});



const ecoinformerSlider = new Swiper(".ecoinformer__slider", {
  spaceBetween: 24,
  speed: 800,
  slidesPerView: 4,
  loop: 1,
  navigation: {
    nextEl: '.ecoinformer__slider-wrapper .swiper-button-next',
    prevEl: '.ecoinformer__slider-wrapper .swiper-button-prev',
  },
});


document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('[data-calculation-block]');

  blocks.forEach(block => {
    const progressLine = block.querySelector('[data-progress-line]');
    const maxValItem = block.querySelector('[data-max-value]');
    const limitingValElem = block.querySelector('[data-limiting-value]');
    const progressMore = block.querySelector('[data-progress-more]')
    if (!progressLine || !maxValItem || !limitingValElem) return;

    const maxValue = parseFloat(maxValItem.getAttribute('data-max-value'));
    const limitingValue = parseFloat(limitingValElem.getAttribute('data-limiting-value'));

    if (isNaN(maxValue) || isNaN(limitingValue) || limitingValue === 0) return;

    let percentage = (maxValue / limitingValue) * 100;

    if (percentage > 100) {
      percentage = 100;
      progressMore.classList.add('active');
    }
    progressLine.style.width = `${percentage}%`;
  });
});
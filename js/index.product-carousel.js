const slides = [
    '<div class="product-carousel__slide"><img src="img/baby-yoda.svg" alt="Baby Yoda"></div>',
    '<div class="product-carousel__slide"><img src="img/banana.svg" alt="Banana"></div>',
    '<div class="product-carousel__slide"><img src="img/girl.svg" alt="Girl"></div>',
    '<div class="product-carousel__slide"><img src="img/viking.svg" alt="Viking"></div>'
];

let currentSlideIndex = 0;

function showSlide(index) {
    const carouselContainer = document.querySelector('.product-carousel__track');
    carouselContainer.innerHTML = slides[index];
    if (window.matchMedia("(min-width: 600px)").matches) {
        const secondSlideIndex = (index + 1) % slides.length;
        carouselContainer.innerHTML += slides[secondSlideIndex];
        if (window.matchMedia("(min-width: 900px)").matches) {
            const thirdSlideIndex = (index + 2) % slides.length;
            carouselContainer.innerHTML += slides[thirdSlideIndex];
        }
    }
}

showSlide(currentSlideIndex);

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

// setInterval(nextSlide, 3000);

const btnNext = document.querySelector('.product-carousel__button--next');
btnNext.addEventListener('click', nextSlide);

const btnPrev = document.querySelector('.product-carousel__button--prev');
btnPrev.addEventListener('click', prevSlide);

window.addEventListener('resize',  () => showSlide(currentSlideIndex) );
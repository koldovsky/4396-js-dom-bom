const slidesData = [
    { src: 'img/baby-yoda.svg', alt: 'Baby Yoda' },
    { src: 'img/banana.svg', alt: 'Banana' },
    { src: 'img/girl.svg', alt: 'Girl' },
    { src: 'img/viking.svg', alt: 'Viking' }
];

const carousel = document.querySelector('.animated-carousel');

if (carousel) {
    const track = carousel.querySelector('.animated-carousel__track');
    const nextButton = carousel.querySelector('.animated-carousel__button--next');
    const prevButton = carousel.querySelector('.animated-carousel__button--prev');

    let slidesPerView = 1;
    let currentIndex = 0;
    let autoSlideTimer;
    let resizeTimer;

    const getSlidesPerView = () => {
        if (window.matchMedia('(min-width: 900px)').matches) return 3;
        if (window.matchMedia('(min-width: 600px)').matches) return 2;
        return 1;
    };

    const createSlideElement = (slide) => {
        const slideEl = document.createElement('div');
        slideEl.className = 'animated-carousel__slide';
        const img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.alt;
        slideEl.appendChild(img);
        return slideEl;
    };

    const setTransition = (enabled) => {
        track.style.transition = enabled ? 'transform 0.6s ease' : 'none';
    };

    const setPosition = () => {
        const offset = (100 / slidesPerView) * currentIndex;
        track.style.transform = `translateX(-${offset}%)`;
    };

    const getActiveIndex = () => {
        return (currentIndex - slidesPerView + slidesData.length) % slidesData.length;
    };

    const buildSlides = (activeIndex = 0) => {
        slidesPerView = getSlidesPerView();
        track.style.setProperty('--slides-per-view', slidesPerView);
        track.innerHTML = '';
        const total = slidesData.length;

        for (let i = total - slidesPerView; i < total; i++) {
            track.appendChild(createSlideElement(slidesData[i % total]));
        }

        slidesData.forEach((slide) => track.appendChild(createSlideElement(slide)));

        for (let i = 0; i < slidesPerView; i++) {
            track.appendChild(createSlideElement(slidesData[i % total]));
        }

        setTransition(false);
        currentIndex = slidesPerView + (activeIndex % total);
        setPosition();
        requestAnimationFrame(() => setTransition(true));
    };

    const moveToIndex = (index) => {
        currentIndex = index;
        setTransition(true);
        setPosition();
    };

    const nextSlide = () => {
        moveToIndex(currentIndex + 1);
        restartAutoSlide();
    };

    const prevSlide = () => {
        moveToIndex(currentIndex - 1);
        restartAutoSlide();
    };

    track.addEventListener('transitionend', () => {
        const total = slidesData.length;
        if (currentIndex >= total + slidesPerView) {
            setTransition(false);
            currentIndex = slidesPerView;
            setPosition();
            requestAnimationFrame(() => setTransition(true));
        } else if (currentIndex < slidesPerView) {
            setTransition(false);
            currentIndex = total + slidesPerView - 1;
            setPosition();
            requestAnimationFrame(() => setTransition(true));
        }
    });

    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideTimer = setInterval(() => moveToIndex(currentIndex + 1), 3500);
    };

    const stopAutoSlide = () => {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    };

    const restartAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    const handleResize = () => {
        const activeIndex = getActiveIndex();
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            buildSlides(activeIndex);
            restartAutoSlide();
        }
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 150);
    });

    buildSlides();
    startAutoSlide();
}

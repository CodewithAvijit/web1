document.addEventListener("DOMContentLoaded", () => {
    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');
    const slideDuration = 2000; // Duration for automatic slide transition
    const transitionDuration = 500; // Duration for slide transition animation

    function moveSlide(n) {
        slideIndex = (slideIndex + n + totalSlides) % totalSlides;
        updateSlider();
        updateContactButton();
    }

    function updateSlider() {
        if (slides.length === 0) return;

        const slideWidth = slides[0].offsetWidth;
        const newTransformValue = `translateX(-${slideIndex * slideWidth}px)`;
        slider.style.transition = 'none'; // Temporarily disable transition
        slider.style.transform = newTransformValue;

        // Use requestAnimationFrame to apply transition
        requestAnimationFrame(() => {
            slider.style.transition = `transform ${transitionDuration}ms ease-in-out`;
            slider.style.transform = newTransformValue;
        });
    }

    function updateContactButton() {
        const chatButtons = document.querySelectorAll('.contact-button');
        chatButtons.forEach(button => {
            button.classList.remove('green', 'blue'); // Remove previous classes
        });

        const currentSlide = slides[slideIndex];
        const currentButton = currentSlide.querySelector('.contact-button');
        if (currentButton) {
            currentButton.classList.add(slideIndex === 0 ? 'green' : 'blue');
        }
    }

    function updateContactButtons() {
        const chatButtons = document.querySelectorAll('.contact-button');
        chatButtons.forEach(button => {
            if (!button.hasAttribute('data-listener')) {
                button.addEventListener('click', handleButtonClick);
                button.setAttribute('data-listener', 'true'); // Mark as having listener
            }
        });
    }

    function handleButtonClick(event) {
        event.preventDefault();
        // Implement chat functionality or other actions here
    }

    updateSlider();
    updateContactButtons();

    setInterval(() => {
        moveSlide(1);
    }, slideDuration);

    const leftButton = document.querySelector('.slider-button.left');
    const rightButton = document.querySelector('.slider-button.right');

    if (leftButton) {
        leftButton.addEventListener('click', () => moveSlide(-1));
    }

    if (rightButton) {
        rightButton.addEventListener('click', () => moveSlide(1));
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const arrowButtonOverlay = document.querySelector('.arrow-button-overlay');
    if (arrowButtonOverlay) {
        arrowButtonOverlay.addEventListener('click', () => {
            const scrollAmount = window.innerHeight * 0.8;
            window.scrollBy({
                top: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
      // Smooth scroll function
      function smoothScrollTo(target) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // Duration in milliseconds
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, scrollAmount);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }


    // Intersection Observer for triggering animations
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger animation when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Add class to start animation
                target.classList.add('start-animation');
                // Stop observing the element once animation has started
                observer.unobserve(target);
            }
        });
    }, options);

    // Select all testimonial image overlays and observe them
    const testimonialImages = document.querySelectorAll(
        '.testimonial-imageT11-overlay, .testimonial-imageT12-overlay, .testimonial-imageT13-overlay, .testimonial-imageT14-overlay, .testimonial-imageT131-overlay, .testimonial-imageT21-overlay, .testimonial-imageT22-overlay, .testimonial-imageT31-overlay, .testimonial-imageT32-overlay, .testimonial-imageT41-overlay, .testimonial-imageT42-overlay, .testimonial-imageT51-overlay, .testimonial-imageT52-overlay, .testimonial-imageT511-overlay, .testimonial-imageT61-overlay,.testimonial-imageT62-overlay,.testimonial-imageT71-overlay,.testimonial-imageT72-overlay,.testimonial-imageT81-overlay,.testimonial-imageT82-overlay,.testimonial-imageT91-overlay,.testimonial-imageT821-overlay,.testimonial-imageTFF-overlay,.testimonial-imageTFF11-overlay,.testimonial-imageTFF12-overlay,.testimonial-imageTFF21-overlay,.testimonial-imageTFF22-overlay' // Added .testimonial-imageT61-overlay
    );

    testimonialImages.forEach(image => {
        observer.observe(image);
    });
});

window.addEventListener('scroll', function() {
    // Calculate the new amount based on scroll position
    // Adjust the formula to increase the rate by 4x
    const scrollTop = window.scrollY;
    const dollarAmount = Math.min(scrollTop / 1, 100000); // Adjust divisor for increased rate
    document.getElementById('dollar-amount').textContent = `$${Math.floor(dollarAmount)}`;
});
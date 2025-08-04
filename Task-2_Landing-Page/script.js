document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    const slideIntervalTime = 3500; // 3 seconds

    // Initialize slider
    function initSlider() {
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        startSlideShow();
    }

    // Show next slide
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Show previous slide
    function prevSlide() {
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }

    // Go to specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Start automatic slideshow
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    // Pause slideshow
    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            pauseSlideShow();
            nextSlide();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            pauseSlideShow();
            prevSlide();
            startSlideShow();
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            pauseSlideShow();
            goToSlide(index);
            startSlideShow();
        });

        // Add keyboard accessibility
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                pauseSlideShow();
                goToSlide(index);
                startSlideShow();
            }
        });
    });

    // Add to cart animation and functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animation
            this.classList.add('clicked');
            
            // Increment cart count
            itemCount++;
            cartCount.textContent = itemCount;
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
            
            // Reset button state after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 1500);
        });
    });

    // Handle increment/decrement buttons (if any still exist)
    const incrementButtons = document.querySelectorAll('.increment-btn');
    const decrementButtons = document.querySelectorAll('.decrement-btn');

    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            
            // Enable decrement button
            const decrementBtn = this.parentElement.querySelector('.decrement-btn');
            if (quantity > 0) {
                decrementBtn.disabled = false;
            }
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                
                // Disable decrement button when quantity is 0
                if (quantity === 0) {
                    this.disabled = true;
                }
            }
        });
    });

    // View More / View Less Products functionality
    const viewMoreBtn = document.getElementById('view-more-btn');
    const viewLessBtn = document.getElementById('view-less-btn');
    const additionalProducts = document.querySelectorAll('.additional-product');
    const productsSection = document.getElementById('products');

    viewMoreBtn.addEventListener('click', () => {
        additionalProducts.forEach(product => {
            product.classList.add('visible');
        });
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = 'inline-block';
    });

    viewLessBtn.addEventListener('click', () => {
        additionalProducts.forEach(product => {
            product.classList.remove('visible');
        });
        viewLessBtn.style.display = 'none';
        viewMoreBtn.style.display = 'inline-block';
        productsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize the slider
    initSlider();

    // Pause slideshow when user hovers over it
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseSlideShow);
        sliderContainer.addEventListener('mouseleave', startSlideShow);
    }

    // Add accessibility to slider indicators
    indicators.forEach((indicator, index) => {
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('aria-label', 'View slide ' + (index + 1));
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});

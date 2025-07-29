// Republic Gaming - Interactive JavaScript
(function() {
    'use strict';

    // Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initAnimations();
            }, 3500);
        }
    }

    // Navbar Scroll Effect
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            let lastScrollY = window.scrollY;
            
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScrollY = currentScrollY;
            });
        }
    }

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('hero-stats')) {
                        setTimeout(animateCounters, 500);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Observe hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
    }

    // Smooth Scroll for Navigation
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Parallax Effect for Floating Elements
    function initParallax() {
        const floatingElements = document.querySelectorAll('.floating-card');
        
        if (floatingElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.3;
                    element.style.transform = `translateY(${rate * speed}px)`;
                });
            });
        }
    }

    // Button Hover Effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // Video Background Optimization
    function initVideoOptimization() {
        const video = document.getElementById('bgVideo');
        
        if (video) {
            // Pause video when tab is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    video.pause();
                } else {
                    video.play();
                }
            });

            // Reduce quality on mobile
            if (window.innerWidth < 768) {
                video.style.filter = 'blur(2px)';
            }
        }
    }

    // Performance Optimization
    function initPerformanceOptimization() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Throttle scroll events
        let ticking = false;
        
        function updateParallax() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    initParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateParallax);
    }

    // Easter Eggs
    function initEasterEggs() {
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join('') === konamiSequence.join('')) {
                activateEasterEgg();
            }
        });
    }

    function activateEasterEgg() {
        document.body.style.filter = 'hue-rotate(180deg) brightness(1.2)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }

    // Initialize all features
    function initAnimations() {
        initNavbar();
        initScrollAnimations();
        initSmoothScroll();
        initButtonEffects();
        initVideoOptimization();
        initPerformanceOptimization();
        initEasterEggs();
    }

    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
        initLoadingScreen();
    });

    // Window Load
    window.addEventListener('load', () => {
        // Preloader fallback
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initAnimations();
            }, 1000);
        }
    });

    // Service Worker Registration (for PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(registrationError => console.log('SW registration failed'));
        });
    }

})();
// Advanced Scroll Animations for TrueLeafTech Website
// Inspired by Monks.com dynamic interactions

class ScrollAnimations {
    constructor() {
        this.init();
        this.setupIntersectionObserver();
        this.setupScrollTriggers();
        this.setupParallaxEffects();
    }

    init() {
        // Add CSS for animations
        this.addAnimationStyles();
        
        // Initialize GSAP-like animations without external library
        this.animationQueue = [];
        this.isAnimating = false;
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-up {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .fade-in-up.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .fade-in-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .fade-in-left.animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            .fade-in-right {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .fade-in-right.animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scale-in {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .scale-in.animate {
                opacity: 1;
                transform: scale(1);
            }
            
            .rotate-in {
                opacity: 0;
                transform: rotate(-10deg) scale(0.9);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .rotate-in.animate {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
            
            .stagger-animation {
                transition-delay: var(--stagger-delay, 0s);
            }
            
            .parallax-element {
                will-change: transform;
            }
            
            .floating-animation {
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            .pulse-animation {
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .slide-reveal {
                position: relative;
                overflow: hidden;
            }
            
            .slide-reveal::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
                transition: left 0.8s ease;
            }
            
            .slide-reveal.animate::before {
                left: 100%;
            }
            
            .text-reveal {
                overflow: hidden;
            }
            
            .text-reveal span {
                display: inline-block;
                transform: translateY(100%);
                transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .text-reveal.animate span {
                transform: translateY(0);
            }
            
            .morphing-background {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }

    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '-50px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, entry.intersectionRatio);
                }
            });
        }, options);

        // Observe elements with animation classes
        this.observeElements();
    }

    observeElements() {
        const animationClasses = [
            '.fade-in-up',
            '.fade-in-left', 
            '.fade-in-right',
            '.scale-in',
            '.rotate-in',
            '.slide-reveal',
            '.text-reveal'
        ];

        animationClasses.forEach(className => {
            document.querySelectorAll(className).forEach(el => {
                this.observer.observe(el);
            });
        });

        // Auto-add animation classes to common elements
        this.autoAddAnimationClasses();
    }

    autoAddAnimationClasses() {
        // Service cards
        document.querySelectorAll('.service-item, .feature-card').forEach((el, index) => {
            el.classList.add('fade-in-up', 'stagger-animation');
            el.style.setProperty('--stagger-delay', `${index * 0.1}s`);
        });

        // Testimonials
        document.querySelectorAll('.testimonial-item').forEach((el, index) => {
            el.classList.add('fade-in-left', 'stagger-animation');
            el.style.setProperty('--stagger-delay', `${index * 0.2}s`);
        });

        // Process steps
        document.querySelectorAll('.process-step, .timeline-item').forEach((el, index) => {
            el.classList.add('scale-in', 'stagger-animation');
            el.style.setProperty('--stagger-delay', `${index * 0.15}s`);
        });

        // Headers
        document.querySelectorAll('h1, h2').forEach(el => {
            if (!el.classList.contains('no-animate')) {
                el.classList.add('text-reveal');
                this.wrapTextInSpans(el);
            }
        });
    }

    wrapTextInSpans(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    }

    animateElement(element, ratio) {
        if (element.classList.contains('animate')) return;

        // Add stagger delay if present
        const delay = element.style.getPropertyValue('--stagger-delay') || '0s';
        
        setTimeout(() => {
            element.classList.add('animate');
            
            // Special animations for specific elements
            if (element.classList.contains('text-reveal')) {
                this.animateTextReveal(element);
            }
            
            if (element.classList.contains('slide-reveal')) {
                this.animateSlideReveal(element);
            }
        }, parseFloat(delay) * 1000);
    }

    animateTextReveal(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateSlideReveal(element) {
        element.style.overflow = 'hidden';
        setTimeout(() => {
            element.style.overflow = 'visible';
        }, 800);
    }

    setupScrollTriggers() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax effects
        document.querySelectorAll('.parallax-element').forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Progress indicators
        this.updateProgressIndicators();
        
        // Dynamic background changes
        this.updateDynamicBackgrounds(scrollY);
    }

    setupParallaxEffects() {
        // Add parallax to hero images
        document.querySelectorAll('.hero, .service-hero').forEach(hero => {
            hero.classList.add('parallax-element');
            hero.dataset.speed = '0.3';
        });

        // Add floating animation to certain elements
        document.querySelectorAll('.btn, .logo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('floating-animation');
            });
            
            el.addEventListener('mouseleave', () => {
                el.classList.remove('floating-animation');
            });
        });
    }

    updateProgressIndicators() {
        const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // Update any progress bars
        document.querySelectorAll('.scroll-progress').forEach(bar => {
            bar.style.width = `${scrollPercent}%`;
        });
    }

    updateDynamicBackgrounds(scrollY) {
        // Change hero background based on scroll
        const hero = document.querySelector('.hero, .service-hero');
        if (hero) {
            const opacity = Math.max(0, 1 - (scrollY / window.innerHeight));
            hero.style.opacity = opacity;
        }
    }

    // Utility methods for custom animations
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    morphBackground(element, colors, duration = 5000) {
        let colorIndex = 0;
        
        setInterval(() => {
            element.style.background = `linear-gradient(45deg, ${colors[colorIndex]}, ${colors[(colorIndex + 1) % colors.length]})`;
            colorIndex = (colorIndex + 1) % colors.length;
        }, duration);
    }

    // Initialize on DOM ready
    static init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new ScrollAnimations();
            });
        } else {
            new ScrollAnimations();
        }
    }
}

// Auto-initialize
ScrollAnimations.init();

// Export for manual initialization if needed
window.ScrollAnimations = ScrollAnimations;


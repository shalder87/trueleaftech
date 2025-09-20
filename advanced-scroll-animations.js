// Advanced Scroll Animations with Color Changes for TrueLeafTech Website
// Inspired by Monks.com dynamic interactions

class AdvancedScrollAnimations {
    constructor() {
        this.init();
        this.setupColorTransitions();
        this.setupIntersectionObserver();
        this.setupScrollTriggers();
        this.setupParallaxEffects();
        this.setupFormAnimations();
    }

    init() {
        // Add CSS for animations and color transitions
        this.addAnimationStyles();
        
        // Initialize animation queue
        this.animationQueue = [];
        this.isAnimating = false;
        this.currentSection = 0;
        this.sections = [];
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Color transition styles */
            body {
                transition: background-color 1s ease;
            }
            
            .section-transition {
                transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Advanced fade animations */
            .fade-in-up {
                opacity: 0;
                transform: translateY(60px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .fade-in-up.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .fade-in-left {
                opacity: 0;
                transform: translateX(-60px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .fade-in-left.animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            .fade-in-right {
                opacity: 0;
                transform: translateX(60px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .fade-in-right.animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scale-in {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .scale-in.animate {
                opacity: 1;
                transform: scale(1);
            }
            
            .rotate-in {
                opacity: 0;
                transform: rotate(-15deg) scale(0.9);
                transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .rotate-in.animate {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
            
            /* Stagger animations */
            .stagger-animation {
                transition-delay: var(--stagger-delay, 0s);
            }
            
            /* Parallax elements */
            .parallax-element {
                will-change: transform;
                transition: transform 0.1s ease-out;
            }
            
            /* Floating animations */
            .floating-animation {
                animation: advancedFloat 8s ease-in-out infinite;
            }
            
            @keyframes advancedFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-15px) rotate(2deg); }
                50% { transform: translateY(-25px) rotate(0deg); }
                75% { transform: translateY(-10px) rotate(-2deg); }
            }
            
            /* Pulse animation */
            .pulse-animation {
                animation: advancedPulse 3s ease-in-out infinite;
            }
            
            @keyframes advancedPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(102, 126, 234, 0); }
            }
            
            /* Slide reveal */
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
                transition: left 1s ease;
                z-index: 1;
            }
            
            .slide-reveal.animate::before {
                left: 100%;
            }
            
            /* Text reveal */
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
            
            /* Morphing background */
            .morphing-background {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradientShift 20s ease infinite;
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            /* Color transition classes */
            .bg-mint { background-color: #a8f5e6; }
            .bg-lavender { background-color: #e6e6fa; }
            .bg-peach { background-color: #ffdab9; }
            .bg-sky { background-color: #87ceeb; }
            .bg-rose { background-color: #ffe4e1; }
            .bg-sage { background-color: #9caf88; }
            
            /* Three block layout */
            .three-block-container {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
                margin: 4rem 0;
            }
            
            .block-item {
                background: white;
                padding: 2rem;
                border-radius: 20px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
            }
            
            .block-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
                transition: left 0.6s ease;
            }
            
            .block-item:hover::before {
                left: 100%;
            }
            
            .block-item:hover {
                transform: translateY(-15px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            }
            
            .block-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: block;
                color: #667eea;
            }
            
            .block-title {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
                color: #333;
            }
            
            .block-description {
                color: #666;
                line-height: 1.6;
            }
            
            /* Success story section */
            .success-story {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 4rem 0;
                position: relative;
                overflow: hidden;
            }
            
            .success-story::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="success" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23success)"/></svg>');
            }
            
            .success-content {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 3rem;
                align-items: center;
                position: relative;
                z-index: 2;
            }
            
            .success-image {
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .success-text h3 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .success-text p {
                font-size: 1.2rem;
                line-height: 1.8;
                margin-bottom: 2rem;
            }
            
            .success-cta {
                display: inline-block;
                background: white;
                color: #667eea;
                padding: 15px 30px;
                border-radius: 50px;
                text-decoration: none;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .success-cta:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(0,0,0,0.2);
            }
            
            /* Contact form styles */
            .contact-form-section {
                background: #f8f9fa;
                padding: 4rem 0;
            }
            
            .form-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            
            .form-group {
                margin-bottom: 2rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
                color: #333;
            }
            
            .form-group input,
            .form-group textarea,
            .form-group select {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e1e5e9;
                border-radius: 10px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .form-submit {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 50px;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
            }
            
            .form-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
            }
            
            /* Responsive design */
            @media (max-width: 768px) {
                .three-block-container {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                
                .success-content {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .success-text h3 {
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupColorTransitions() {
        // Define color schemes for different sections
        this.colorSchemes = [
            { bg: '#a8f5e6', class: 'bg-mint' },     // Mint
            { bg: '#e6e6fa', class: 'bg-lavender' }, // Lavender
            { bg: '#ffdab9', class: 'bg-peach' },    // Peach
            { bg: '#87ceeb', class: 'bg-sky' },      // Sky
            { bg: '#ffe4e1', class: 'bg-rose' },     // Rose
            { bg: '#9caf88', class: 'bg-sage' }      // Sage
        ];

        // Identify sections for color transitions
        this.sections = document.querySelectorAll('.service-section, .success-story, .contact-form-section');
        
        // Add data attributes for color schemes
        this.sections.forEach((section, index) => {
            section.dataset.colorIndex = index % this.colorSchemes.length;
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '-100px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, entry.intersectionRatio);
                    this.handleColorTransition(entry.target);
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
            '.text-reveal',
            '.block-item',
            '.success-story'
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
            el.style.setProperty('--stagger-delay', `${index * 0.15}s`);
        });

        // Three-block items
        document.querySelectorAll('.block-item').forEach((el, index) => {
            el.classList.add('scale-in', 'stagger-animation');
            el.style.setProperty('--stagger-delay', `${index * 0.2}s`);
        });

        // Headers
        document.querySelectorAll('h1, h2').forEach(el => {
            if (!el.classList.contains('no-animate')) {
                el.classList.add('text-reveal');
                this.wrapTextInSpans(el);
            }
        });

        // Form elements
        document.querySelectorAll('.form-group').forEach((el, index) => {
            el.classList.add('fade-in-up', 'stagger-animation');
            el.style.setProperty('--stagger-delay', `${index * 0.1}s`);
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

            if (element.classList.contains('block-item')) {
                this.animateBlockItem(element);
            }
        }, parseFloat(delay) * 1000);
    }

    animateTextReveal(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    animateSlideReveal(element) {
        element.style.overflow = 'hidden';
        setTimeout(() => {
            element.style.overflow = 'visible';
        }, 1000);
    }

    animateBlockItem(element) {
        // Add floating animation on hover
        element.addEventListener('mouseenter', () => {
            element.classList.add('floating-animation');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('floating-animation');
        });
    }

    handleColorTransition(element) {
        if (element.classList.contains('service-section') || 
            element.classList.contains('success-story') || 
            element.classList.contains('contact-form-section')) {
            
            const colorIndex = parseInt(element.dataset.colorIndex);
            const colorScheme = this.colorSchemes[colorIndex];
            
            if (colorScheme) {
                document.body.style.backgroundColor = colorScheme.bg;
                document.body.className = document.body.className.replace(/bg-\w+/g, '');
                document.body.classList.add(colorScheme.class);
            }
        }
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
        document.querySelectorAll('.hero, .service-hero, .services-hero').forEach(hero => {
            hero.classList.add('parallax-element');
            hero.dataset.speed = '0.3';
        });

        // Add floating animation to certain elements
        document.querySelectorAll('.btn, .logo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('pulse-animation');
            });
            
            el.addEventListener('mouseleave', () => {
                el.classList.remove('pulse-animation');
            });
        });
    }

    setupFormAnimations() {
        // Animate form inputs on focus
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
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
        const hero = document.querySelector('.hero, .service-hero, .services-hero');
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
                new AdvancedScrollAnimations();
            });
        } else {
            new AdvancedScrollAnimations();
        }
    }
}

// Auto-initialize
AdvancedScrollAnimations.init();

// Export for manual initialization if needed
window.AdvancedScrollAnimations = AdvancedScrollAnimations;


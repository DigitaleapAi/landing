/* ============================================
   Leap Digital - Interactive Features
   Premium Tech Vibe JavaScript
   ============================================ */

// ============================================
// Wait for DOM to be fully loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initStickyCTA();
    initCounterAnimation();
    initParallaxEffect();
    
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('#main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations with Intersection Observer
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .timeline-item, .guarantee-item, .stat-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .guarantee-item,
        .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in,
        .guarantee-item.animate-in,
        .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('#main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Sticky CTA Button Control
// ============================================
function initStickyCTA() {
    const stickyCTA = document.querySelector('#stickyCTA');
    const formSection = document.querySelector('#application-form');
    const heroSection = document.querySelector('#hero');
    
    if (!stickyCTA || !formSection) return;
    
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const formTop = formSection.offsetTop;
        const currentScroll = window.pageYOffset;
        
        // Show sticky CTA after hero section and before form section
        if (currentScroll > heroBottom && currentScroll < formTop - 200) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    });
}

// ============================================
// Counter Animation for Stats
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ============================================
// Parallax Effect for Background Orbs
// ============================================
function initParallaxEffect() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (window.innerWidth < 768) return; // Skip on mobile for performance
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// Form Tracking & Analytics (Optional)
// ============================================
function trackFormInteraction() {
    const iframe = document.querySelector('.iframe-wrapper iframe');
    
    if (!iframe) return;
    
    // Track when user interacts with the form
    iframe.addEventListener('load', () => {
        console.log('Form loaded successfully');
        
        // You can add analytics tracking here
        // Example: gtag('event', 'form_loaded', { form_name: 'Level 0 Application' });
    });
}

// ============================================
// Add Ripple Effect to Buttons
// ============================================
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .main-cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .cta-button,
        .main-cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize ripple effect
addRippleEffect();

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded CSS
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// Keyboard Navigation Enhancement
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// Performance Optimization
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Console Message
// ============================================
console.log('%c🚀 Leap Digital', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cPremium Tech Landing Page', 'font-size: 14px; color: #06b6d4;');
console.log('%cBuilt with ❤️ for aspiring remote workers', 'font-size: 12px; color: #94a3b8;');

// ============================================
// Export functions for external use (optional)
// ============================================
window.LeapDigital = {
    smoothScrollTo: function(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('#main-header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    },
    
    trackEvent: function(eventName, eventData) {
        console.log('Event tracked:', eventName, eventData);
        // Add your analytics tracking here
    }
};

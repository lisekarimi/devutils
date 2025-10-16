// DevUtils Landing Page JavaScript
// Interactive features and smooth animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initNavbarScroll();
    initScrollAnimations();
    initFloatingCards();
    initProjectCards();
    initCodeSnippet();
    initParallaxEffects();
    initLoadingAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effects
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for styling
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');

                // Add staggered animation for grid items
                if (entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('feature-card') ||
                    entry.target.classList.contains('step')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .project-card, .step, .section-title, .why-content, .code-snippet'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Floating cards animation
function initFloatingCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });

        // Add click effect to scroll to corresponding project
        card.addEventListener('click', function() {
            const projectId = this.classList[1].replace('card-', '');
            const projectMap = {
                '1': 'hfpusher',
                '2': 'dropsync',
                '3': 'nbclean',
                '4': 'dbignore'
            };

            const projectCard = document.querySelector(`[data-project="${projectMap[projectId]}"]`);
            if (projectCard) {
                projectCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Add highlight effect
                projectCard.style.transform = 'scale(1.02)';
                projectCard.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';

                setTimeout(() => {
                    projectCard.style.transform = '';
                    projectCard.style.boxShadow = '';
                }, 2000);
            }
        });
    });
}

// Project cards interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';

            // Animate the project icon
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';

            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });

        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(99, 102, 241, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Code snippet typing animation
function initCodeSnippet() {
    const codeLines = document.querySelectorAll('.code-line');
    let delay = 0;

    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            line.style.transition = 'all 0.5s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, delay);

        delay += 200;
    });
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelector('.floating-cards');

    if (hero && floatingCards) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            floatingCards.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Loading animations
function initLoadingAnimations() {
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stack, .cta-button');

    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Animate floating cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8)';

        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 1000 + (index * 200));
    });
}

// Utility functions
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

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// GitHub button click tracking (optional)
document.addEventListener('click', function(e) {
    if (e.target.closest('.github-btn')) {
        const button = e.target.closest('.github-btn');
        const project = button.closest('.project-card');
        const projectName = project ? project.querySelector('.project-title').textContent : 'Unknown';

        console.log(`GitHub button clicked for project: ${projectName}`);

        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(function() {
    // Scroll-based animations are handled by the individual functions
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Remove any loading spinners or add completion animations
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 300);
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Console welcome message
console.log(`
🛠️ DevUtils Landing Page
Built with modern web technologies
Enjoy the smooth animations and interactions!
`);

// Add some easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-logo')) {
        clickCount++;
        if (clickCount === 5) {
            console.log('🎉 You found the easter egg! DevUtils loves developers who click things!');
            // Add a fun animation
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

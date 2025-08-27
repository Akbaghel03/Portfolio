// Modern 3D Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Initialize all animations and effects
    initAnimations();
    initParallaxEffects();
    initSkillInteractions();
    initScrollAnimations();
    initTypingEffect();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
});

// Initialize all animations
function initAnimations() {
    // Add floating animation to shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * -4}s`;
        shape.style.animationDuration = `${20 + index * 2}s`;
    });

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.05) rotateY(10deg)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize skill interactions
function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('click', function () {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show skill info tooltip
            showSkillTooltip(this);
        });
    });
}

// Show skill tooltip
function showSkillTooltip(skillItem) {
    const skillName = skillItem.getAttribute('data-skill');
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = skillName;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(99, 102, 241, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        z-index: 1000;
        transform: translateY(-40px);
        opacity: 0;
        transition: all 0.3s ease;
    `;

    skillItem.appendChild(tooltip);

    // Animate tooltip in
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-50px)';
    }, 10);

    // Remove tooltip after delay
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-40px)';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }, 2000);
}

// Initialize scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-card, .project-card, .achievement-card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        scrollObserver.observe(el);
    });
}

// Initialize typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add 3D tilt effect to cards
function init3DTilt() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Add particle effects
function initParticleEffects() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

// Create individual particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 20s infinite linear;
    `;

    // Random position and animation delay
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';

    container.appendChild(particle);
}

// Add CSS for particle animation
const particleCSS = `
@keyframes float-particle {
    0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) translateX(100px);
        opacity: 0;
    }
}
`;

// Inject particle CSS
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particle effects
setTimeout(initParticleEffects, 1000);

// Add smooth reveal animations for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add scroll event listener for reveal animations
window.addEventListener('scroll', revealOnScroll);

// Add CSS for reveal animations
const revealCSS = `
.section-card {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
}

.section-card.active {
    opacity: 1;
    transform: translateY(0);
}

.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
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

// Inject reveal CSS
const revealStyle = document.createElement('style');
revealStyle.textContent = revealCSS;
document.head.appendChild(revealStyle);

// Add cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: screen;
    `;

    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// Initialize cursor trail
setTimeout(initCursorTrail, 2000);

// Add performance optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });
}

// Initialize performance optimizations
optimizePerformance();

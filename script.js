// ============================================
// GOLDEN SPACE THEME - LUXURY AI PORTFOLIO
// Starfield, Neural Networks, Golden Interactions
// ============================================

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ============================================
// SPACEFIELD - STAR BACKGROUND
// ============================================
class Starfield {
    constructor() {
        this.canvas = document.getElementById('starfield');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.mouse = { x: 0, y: 0 };
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create stars with different layers for parallax
        const starCounts = [150, 100, 50]; // Background to foreground
        const starSizes = [0.5, 1, 1.5];
        const starAlphas = [0.3, 0.5, 0.8];
        
        starCounts.forEach((count, layer) => {
            for (let i = 0; i < count; i++) {
                this.stars.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: starSizes[layer] * (0.5 + Math.random() * 0.5),
                    alpha: starAlphas[layer],
                    layer: layer,
                    twinkleSpeed: 0.02 + Math.random() * 0.03,
                    twinklePhase: Math.random() * Math.PI * 2,
                    parallaxFactor: 0.1 + (layer * 0.15)
                });
            }
        });
        
        // Mouse interaction (desktop only)
        if (!this.isTouch) {
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
                this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
            });
        }
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            // Twinkle effect
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
            
            // Parallax movement based on mouse
            let parallaxX = 0;
            let parallaxY = 0;
            
            if (!this.isTouch) {
                parallaxX = this.mouse.x * star.parallaxFactor * 50;
                parallaxY = this.mouse.y * star.parallaxFactor * 50;
            }
            
            const x = star.x + parallaxX;
            const y = star.y + parallaxY;
            
            // Draw star with glow
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
            gradient.addColorStop(0, `rgba(255, 215, 0, ${star.alpha * twinkle})`);
            gradient.addColorStop(0.5, `rgba(255, 215, 0, ${star.alpha * twinkle * 0.3})`);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, star.size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Core star
            this.ctx.beginPath();
            this.ctx.arc(x, y, star.size * 0.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

new Starfield();

// ============================================
// NEURAL NETWORK CANVAS
// ============================================
class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('neuralCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: null, y: null };
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create neural nodes
        const nodeCount = this.isTouch ? 15 : 25;
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: 2 + Math.random() * 2,
                pulse: Math.random() * Math.PI * 2
            });
        }
        
        // Mouse interaction
        if (!this.isTouch) {
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
        }
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw nodes
        this.nodes.forEach(node => {
            // Move nodes
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Mouse repulsion
            if (this.mouse.x && this.mouse.y) {
                const dx = node.x - this.mouse.x;
                const dy = node.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    node.x += dx * force * 0.02;
                    node.y += dy * force * 0.02;
                }
            }
            
            // Pulse effect
            node.pulse += 0.02;
            const pulseRadius = node.radius + Math.sin(node.pulse) * 1;
            
            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
            this.ctx.fill();
            
            // Node glow
            const glowGradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, pulseRadius * 4
            );
            glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.2)');
            glowGradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseRadius * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = glowGradient;
            this.ctx.fill();
        });
        
        // Draw connections
        this.nodes.forEach((nodeA, i) => {
            this.nodes.slice(i + 1).forEach(nodeB => {
                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 200) {
                    const alpha = (1 - dist / 200) * 0.3;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

new NeuralNetwork();

// ============================================
// COSMIC PARTICLES
// ============================================
class CosmicParticles {
    constructor() {
        this.container = document.getElementById('cosmicParticles');
        if (!this.container) return;
        
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        this.particles = [];
        this.createParticles();
    }
    
    createParticles() {
        const count = this.isTouch ? 15 : 25;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            
            const size = 2 + Math.random() * 4;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: cosmic-float ${15 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${-Math.random() * 15}s;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
        }
        
        // Add keyframes - particles move UPWARD like rising asteroids
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cosmic-float {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                5% {
                    opacity: 0.6;
                }
                95% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100px) translateX(100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

new CosmicParticles();

// ============================================
// CUSTOM CURSOR - GOLDEN
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor-main');
        this.trail = document.querySelector('.cursor-trail');
        this.glow = document.querySelector('.cursor-glow');
        
        if (!this.cursor || window.matchMedia('(pointer: coarse)').matches) {
            if (document.querySelector('.cursor-wrapper')) {
                document.querySelector('.cursor-wrapper').style.display = 'none';
            }
            return;
        }
        
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: this.pos.x, y: this.pos.y };
        this.speed = 0.15;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.animate();
        this.setupInteractions();
    }
    
    animate() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
        
        this.cursor.style.left = `${this.pos.x}px`;
        this.cursor.style.top = `${this.pos.y}px`;
        
        this.trail.style.left = `${this.pos.x}px`;
        this.trail.style.top = `${this.pos.y}px`;
        
        this.glow.style.left = `${this.pos.x}px`;
        this.glow.style.top = `${this.pos.y}px`;
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupInteractions() {
        // Hover elements
        document.querySelectorAll('[data-cursor="hover"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.trail.classList.add('hover');
                this.glow.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.trail.classList.remove('hover');
                this.glow.classList.remove('active');
            });
        });
        
        // Card hover
        document.querySelectorAll('[data-cursor="card"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('card-hover');
                this.glow.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('card-hover');
                this.glow.classList.remove('active');
            });
        });
        
        // Click ripple
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        document.querySelector('.cursor-wrapper').appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

new CustomCursor();

// ============================================
// MAGNETIC ELEMENTS
// ============================================
class MagneticElements {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic-element');
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.onMouseMove(e, el));
            el.addEventListener('mouseleave', (e) => this.onMouseLeave(e, el));
        });
    }
    
    onMouseMove(e, el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = el.classList.contains('nav-link') ? 0.3 : 0.4;
        
        gsap.to(el, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    onMouseLeave(e, el) {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    }
}

new MagneticElements();

// ============================================
// 3D TILT CARDS
// ============================================
class TiltCards {
    constructor() {
        this.cards = document.querySelectorAll('.tilt-card');
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
        });
    }
    
    onMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        
        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    onMouseLeave(e, card) {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    }
}

new TiltCards();

// ============================================
// TOUCH INTERACTIONS FOR MOBILE
// ============================================
class TouchInteractions {
    constructor() {
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (!this.isTouch) return;
        
        this.init();
    }
    
    init() {
        // Touch ripple effect
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.createTouchRipple(touch.clientX, touch.clientY);
        }, { passive: true });
        
        // Card touch effects
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('touchstart', () => {
                gsap.to(card, {
                    scale: 0.98,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
        
        // Button touch effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('touchstart', () => {
                gsap.to(btn, {
                    scale: 0.95,
                    duration: 0.1
                });
            }, { passive: true });
            
            btn.addEventListener('touchend', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
    
    createTouchRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            z-index: 9999;
            animation: touch-ripple 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

new TouchInteractions();

// Add touch ripple keyframes
const touchStyle = document.createElement('style');
touchStyle.textContent = `
    @keyframes touch-ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(touchStyle);

// ============================================
// SCROLL PROGRESS
// ============================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (!scrollProgress) return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            lenis.stop();
            mobileLinks.forEach((link, i) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, i * 100);
            });
        } else {
            lenis.start();
            mobileLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            lenis.start();
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.2
            });
        }
    });
});

// ============================================
// GSAP ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl.from('.hero-badge', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out'
})
.from('.hero-title .title-line', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out'
}, '-=0.4')
.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'expo.out'
}, '-=0.6')
.from('.hero-description', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out'
}, '-=0.4')
.from('.hero-stat', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'expo.out'
}, '-=0.4')
.from('.hero-buttons .btn', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
}, '-=0.4')
.from('.tech-float', {
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'elastic.out(1, 0.5)'
}, '-=0.8');

// Scroll reveal
const revealElements = document.querySelectorAll('[data-scroll-reveal]');

revealElements.forEach((el, i) => {
    gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Grid items stagger
const grids = document.querySelectorAll('.systems-grid, .missions-grid, .timeline-entries');

grids.forEach(grid => {
    const items = grid.children;
    gsap.fromTo(items,
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Parallax for hero elements
gsap.to('.floating-tech', {
    y: -100,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Timeline progress
ScrollTrigger.create({
    trigger: '.timeline',
    start: 'top 60%',
    end: 'bottom 60%',
    onUpdate: (self) => {
        const progress = document.querySelector('.timeline-progress');
        if (progress) {
            progress.style.height = `${self.progress * 100}%`;
        }
    }
});

// ============================================
// COUNTER ANIMATIONS
// ============================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(update);
    }
}

new CounterAnimation();

// ============================================
// METRIC PROGRESS BARS
// ============================================
const metricCards = document.querySelectorAll('.metric-card');

const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const progress = card.querySelector('.metric-progress');
            const count = card.dataset.count;
            
            if (progress && count) {
                setTimeout(() => {
                    progress.style.width = `${count}%`;
                }, 300);
            }
            
            metricObserver.unobserve(card);
        }
    });
}, { threshold: 0.5 });

metricCards.forEach(card => metricObserver.observe(card));

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const sendAnother = document.getElementById('sendAnother');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Transmitting...</span><i class="fas fa-satellite-dish fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            gsap.to(contactForm, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('active');
                    gsap.fromTo(formSuccess, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                }
            });
            
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

if (sendAnother) {
    sendAnother.addEventListener('click', () => {
        gsap.to(formSuccess, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                formSuccess.classList.remove('active');
                contactForm.style.display = 'flex';
                gsap.fromTo(contactForm,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                );
            }
        });
    });
}

// ============================================
// DATA STREAMS ANIMATION
// ============================================
class DataStreams {
    constructor() {
        this.container = document.getElementById('dataStreams');
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < 5; i++) {
            this.createStream(i);
        }
    }
    
    createStream(index) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.cssText = `
            position: absolute;
            width: 1px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(255, 215, 0, 0.5), transparent);
            left: ${20 + index * 15}%;
            top: -100px;
            animation: data-stream-fall ${3 + Math.random() * 2}s linear infinite;
            animation-delay: ${index * 0.5}s;
        `;
        
        this.container.appendChild(stream);
    }
}

new DataStreams();

// Add data stream keyframes
const streamStyle = document.createElement('style');
streamStyle.textContent = `
    @keyframes data-stream-fall {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(streamStyle);

// ============================================
// PREFERS REDUCED MOTION
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy();
    
    document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ============================================
// VISIBILITY CHANGE - PAUSE ANIMATIONS
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

// ============================================
// CONSOLE WELCOME
// ============================================
console.log('%c🌟 Welcome to Rahul\'s Portfolio', 'font-size: 24px; font-weight: bold; color: #FFD700;');
console.log('%cGolden Space Edition ✨', 'font-size: 16px; color: #FFA500;');
console.log('%cAI-Integrated | Enterprise Quality | Future-Ready', 'font-size: 12px; color: #888;');
console.log('%cBuilt with GSAP, Lenis, and cosmic inspiration 🚀', 'font-size: 12px; color: #666;');

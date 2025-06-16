// Lima RoadMap and CEO Profile Application

class LimaApp {
    constructor() {
        this.currentSection = 'roadmap';
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.sections = document.querySelectorAll('.content-section');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.initProgressBars();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // Navigation buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSection = e.target.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const sections = ['roadmap', 'claude-training', 'ceo'];
                const currentIndex = sections.indexOf(this.currentSection);
                const nextIndex = e.key === 'ArrowRight' ? 
                    (currentIndex + 1) % 3 : 
                    (currentIndex - 1 + 3) % 3;
                const nextSection = sections[nextIndex];
                this.switchSection(nextSection);
            }
        });

        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Add hover effects to cards
        this.setupHoverEffects();
    }

    switchSection(targetSection) {
        if (this.currentSection === targetSection) return;

        // Update navigation buttons
        this.navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === targetSection) {
                btn.classList.add('active');
            }
        });

        // Hide current section
        const currentSectionEl = document.getElementById(this.currentSection);
        const targetSectionEl = document.getElementById(targetSection);

        if (currentSectionEl) {
            currentSectionEl.style.opacity = '0';
            currentSectionEl.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentSectionEl.classList.remove('active');
                
                // Show target section
                targetSectionEl.classList.add('active');
                
                // Trigger reflow
                targetSectionEl.offsetHeight;
                
                // Animate in
                targetSectionEl.style.opacity = '1';
                targetSectionEl.style.transform = 'translateY(0)';
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Re-animate progress bars if switching to roadmap
                if (targetSection === 'roadmap') {
                    setTimeout(() => this.animateProgressBars(), 300);
                }
                
                // Animate CEO cards if switching to CEO section
                if (targetSection === 'ceo') {
                    setTimeout(() => this.animateCEOCards(), 300);
                }
                
                // Animate Claude training cards if switching to training section
                if (targetSection === 'claude-training') {
                    setTimeout(() => this.animateTrainingCards(), 300);
                }
                
            }, 150);
        }

        this.currentSection = targetSection;
    }

    setupAnimations() {
        // Initial fade-in animation for the active section
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }

        // Animate elements on scroll
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
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

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.status-card, .phase-block, .week-card, .team-member-card, .skill-item, .analysis-item, .recommendation-card'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add CSS for animate-in class
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    initProgressBars() {
        // Animate progress bars on load
        setTimeout(() => {
            this.animateProgressBars();
        }, 500);
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.style.width || '0%';
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = targetWidth;
            }, index * 200);
        });
    }

    animateCEOCards() {
        const cards = document.querySelectorAll('#ceo .skill-item, #ceo .analysis-item');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    animateTrainingCards() {
        const cards = document.querySelectorAll('#claude-training .training-overview > div > div, #claude-training .claude-benefits > div > div, #claude-training .screenshots-section > div');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    setupHoverEffects() {
        // Add enhanced hover effects to cards
        const cards = document.querySelectorAll(
            '.status-card, .week-card, .team-member-card, .skill-item, .analysis-item, .recommendation-card'
        );

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        // Add click ripple effect to buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', 'true');
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollEffects() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add parallax effect to navigation
        let lastScrollY = window.scrollY;
        const nav = document.querySelector('.main-nav');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Add scroll-based animations for phase blocks
        const phaseBlocks = document.querySelectorAll('.phase-block');
        const phaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    
                    // Animate progress bars within this phase
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                            bar.style.width = targetWidth;
                        }, index * 300);
                    });
                }
            });
        }, { threshold: 0.3 });

        phaseBlocks.forEach(block => {
            phaseObserver.observe(block);
        });
    }

    // Utility methods
    debounce(func, wait) {
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

    // Handle resize events
    handleResize() {
        // Recalculate animations and layouts on resize
        const debouncedResize = this.debounce(() => {
            // Re-trigger scroll animations
            this.setupScrollAnimations();
        }, 250);

        window.addEventListener('resize', debouncedResize);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new LimaApp();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add keyboard shortcuts info (optional)
    console.log('Lima RoadMap & CEO Profile');
    console.log('Keyboard shortcuts:');
    console.log('← → : Navigate between sections');
    console.log('Made with ❤️ for Lima Project');

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        
        if (Math.abs(deltaX) > 50) { // Minimum swipe distance
            const sections = ['roadmap', 'claude-training', 'ceo'];
            const currentIndex = sections.indexOf(app.currentSection);
            
            if (deltaX > 0 && currentIndex > 0) {
                // Swipe right - go to previous section
                app.switchSection(sections[currentIndex - 1]);
            } else if (deltaX < 0 && currentIndex < sections.length - 1) {
                // Swipe left - go to next section
                app.switchSection(sections[currentIndex + 1]);
            }
        }
    }, { passive: true });

    // Performance optimization: lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add focus management for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyle);
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }
});

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LimaApp;
}
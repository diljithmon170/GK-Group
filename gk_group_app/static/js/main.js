/**
 * GK Group - Premium Corporate Website JavaScript
 * Enhanced interactions and form handling
 */

// Global configuration
const GK_CONFIG = {
    scrollOffset: 80,
    animationDuration: 800,
    debounceDelay: 300,
    localStorageKey: 'gk_group_preferences'
};

// Utility functions
const Utils = {
    /**
     * Debounce function to limit function calls
     */
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
    },

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element, offset = 0) {
        const targetY = element.offsetTop - offset;
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Format phone number for WhatsApp
     */
    formatWhatsAppNumber(phone) {
        return phone.replace(/[^\d]/g, '');
    },

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    },

    /**
     * Local storage helpers
     */
    setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },

    getLocalStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return defaultValue;
        }
    }
};

// Navigation and scrolling
const Navigation = {
    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupMobileMenu();
    },

    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);

                if (target) {
                    Utils.smoothScrollTo(target, GK_CONFIG.scrollOffset);
                    // Update URL without scroll
                    history.pushState(null, null, `#${targetId}`);
                }
            }
        });
    },

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

        const updateActiveNav = Utils.debounce(() => {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - (GK_CONFIG.scrollOffset + 100);
                if (scrollPos >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 50);

        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    },

    setupMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            // Close mobile menu when clicking on links
            navbarCollapse.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                }
            });
        }
    }
};

// Form handling
const FormHandler = {
    init() {
        this.setupContactForms();
        this.setupNewsletterForm();
        this.setupFormValidation();
    },

    setupContactForms() {
        const contactForms = document.querySelectorAll('.gk-contact-form form, #contactForm, #homeContactForm');

        contactForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleContactFormSubmit(e, form));
        });
    },

    async handleContactFormSubmit(event, form) {
        event.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(form);

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken')
                }
            });

            const data = await response.json();

            if (data.success) {
                this.showSuccessMessage(form, data.message);
                form.reset();

                // Track conversion
                this.trackConversion('contact_form_submitted');
            } else {
                this.showErrorMessage(form, data.message || 'An error occurred. Please try again.');

                // Show field-specific errors if any
                if (data.errors) {
                    this.showFieldErrors(form, data.errors);
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage(form, 'Network error. Please check your connection and try again.');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    },

    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const email = newsletterForm.querySelector('input[name="email"]').value;

            // Validate email
            if (!this.validateEmail(email)) {
                this.showNewsletterMessage('Please enter a valid email address.', 'danger');
                return;
            }

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/newsletter/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': newsletterForm.querySelector('input[name="csrfmiddlewaretoken"]')?.value
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (data.success) {
                    this.showNewsletterMessage(data.message, 'success');
                    newsletterForm.reset();
                    this.trackConversion('newsletter_signup');
                } else {
                    this.showNewsletterMessage(data.message || 'An error occurred.', 'danger');
                }
            } catch (error) {
                console.error('Newsletter subscription error:', error);
                this.showNewsletterMessage('Network error. Please try again.', 'danger');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    },

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                // Remove error classes on input
                input.addEventListener('input', () => {
                    input.classList.remove('is-invalid');
                    const feedback = input.parentNode.querySelector('.invalid-feedback');
                    if (feedback) {
                        feedback.remove();
                    }
                });

                // Real-time validation for specific fields
                if (input.type === 'email') {
                    input.addEventListener('blur', () => {
                        if (input.value && !this.validateEmail(input.value)) {
                            this.showFieldError(input, 'Please enter a valid email address.');
                        }
                    });
                }

                if (input.type === 'tel') {
                    input.addEventListener('blur', () => {
                        if (input.value && !this.validatePhone(input.value)) {
                            this.showFieldError(input, 'Please enter a valid phone number.');
                        }
                    });
                }
            });
        });
    },

    showSuccessMessage(form, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show mb-3';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        form.parentNode.insertBefore(alertDiv, form);

        // Scroll to top to show message
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    },

    showErrorMessage(form, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show mb-3';
        alertDiv.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        form.parentNode.insertBefore(alertDiv, form);

        // Scroll to top to show message
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    showNewsletterMessage(message, type) {
        const messageDiv = document.getElementById('newsletterMessage');
        if (messageDiv) {
            messageDiv.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;

            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        }
    },

    showFieldError(input, message) {
        input.classList.add('is-invalid');

        let feedbackDiv = input.parentNode.querySelector('.invalid-feedback');
        if (!feedbackDiv) {
            feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'invalid-feedback';
            input.parentNode.appendChild(feedbackDiv);
        }

        feedbackDiv.textContent = message;
    },

    showFieldErrors(form, errors) {
        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldError(field, errors[fieldName].join(', '));
            }
        });
    },

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validatePhone(phone) {
        const phoneRegex = /^[\d\+\-\s\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 6;
    },

    trackConversion(event) {
        // Google Analytics event tracking (if GA is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                'event_category': 'engagement',
                'event_label': 'form_submission'
            });
        }

        // Facebook Pixel tracking (if available)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
        }
    }
};

// Animations and interactions
const Animations = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupCounterAnimations();
    },

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.gk-business-card, .gk-about-text, .gk-section-title');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    },

    setupHoverEffects() {
        // Enhanced hover effects for business cards
        const cards = document.querySelectorAll('.gk-business-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Smooth color transitions for buttons
        const buttons = document.querySelectorAll('.gk-hero-btn, .gk-business-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transition = 'all 0.3s ease';
            });
        });
    },

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    },

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
};

// WhatsApp integration
const WhatsApp = {
    init() {
        this.setupWhatsAppButton();
        this.setupPreFilledMessages();
    },

    setupWhatsAppButton() {
        const whatsappButton = document.querySelector('.gk-whatsapp-float');
        if (whatsappButton) {
            // Add tooltip on hover
            whatsappButton.addEventListener('mouseenter', () => {
                whatsappButton.title = 'Chat with us on WhatsApp';
            });

            // Track clicks
            whatsappButton.addEventListener('click', () => {
                this.trackWhatsAppClick();
            });
        }
    },

    setupPreFilledMessages() {
        const interestSelects = document.querySelectorAll('select[name="interest_area"]');
        interestSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateWhatsAppMessage(e.target.value);
            });
        });
    },

    updateWhatsAppMessage(interestArea) {
        const messages = {
            'gk_textiles': 'Hello GK Group! I\'m interested in your textile products. Could you please provide more information?',
            'gk_steels': 'Hello GK Group! I\'m interested in your steel products. Could you please provide more information?',
            'general': 'Hello GK Group! I have a general inquiry. Could you please assist me?',
            'partnership': 'Hello GK Group! I\'m interested in discussing partnership opportunities.',
            'feedback': 'Hello GK Group! I would like to provide some feedback.'
        };

        const message = messages[interestArea] || messages['general'];

        // Store in local storage for potential use
        Utils.setLocalStorage('whatsapp_message', message);
    },

    trackWhatsAppClick() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'engagement',
                'event_label': 'social_media'
            });
        }
    }
};

// Performance optimization
const Performance = {
    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
    },

    setupLazyLoading() {
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

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    },

    setupImageOptimization() {
        // Add loading="lazy" to all images without it
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
};

// Theme and preferences
const Theme = {
    init() {
        this.loadSavedPreferences();
        this.setupThemeToggle();
    },

    loadSavedPreferences() {
        const preferences = Utils.getLocalStorage(GK_CONFIG.localStorageKey, {});

        // Apply any saved preferences
        if (preferences.animations === false) {
            document.body.classList.add('reduced-motion');
        }
    },

    setupThemeToggle() {
        // Could be used for dark mode toggle in future
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                Utils.setLocalStorage(GK_CONFIG.localStorageKey, {
                    ...Utils.getLocalStorage(GK_CONFIG.localStorageKey, {}),
                    dark_theme: isDark
                });
            });
        }
    }
};

// Error handling
const ErrorHandler = {
    init() {
        window.addEventListener('error', this.handleGlobalError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    },

    handleGlobalError(event) {
        console.error('Global error:', event.error);
        // Could send error reports to analytics here
    },

    handlePromiseRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        // Could send error reports to analytics here
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Navigation.init();
    FormHandler.init();
    Animations.init();
    WhatsApp.init();
    Performance.init();
    Theme.init();
    ErrorHandler.init();

    // Show welcome message for first-time visitors
    const isFirstVisit = !Utils.getLocalStorage('has_visited_before');
    if (isFirstVisit) {
        Utils.setLocalStorage('has_visited_before', true);

        // Could show a welcome modal here if needed
        console.log('Welcome to GK Group!');
    }

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.scrollPosition) {
        window.scrollTo(0, event.state.scrollPosition);
    }
});

// Save scroll position before page unload
window.addEventListener('beforeunload', () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    history.replaceState({ scrollPosition }, document.title);
});

// Export for external use if needed
window.GK = {
    Utils,
    Navigation,
    FormHandler,
    Animations,
    WhatsApp,
    Performance,
    Theme,
    ErrorHandler
};
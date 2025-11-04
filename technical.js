// Language management and mobile menu functionality for technical page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initModals();
    initLanguage();
});

// ===== MOBILE MENU FUNCTIONALITY =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.hamburger') &&
            !e.target.closest('.language-selector')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            hamburger.focus();
        }
    });
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.activeElement?.blur();
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(element => {
        element.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MODAL FUNCTIONALITY =====
function initModals() {
    // Add event listeners to modal buttons
    document.querySelectorAll('.tech-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openTechModal(modalId);
        });
    });

    // Add event listeners to close buttons
    document.querySelectorAll('[data-close-modal]').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeTechModal(modal.id);
        });
    });

    // Close modal when clicking outside content
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTechModal(modal.id);
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay.active');
            if (openModal) {
                closeTechModal(openModal.id);
            }
        }
    });
}

function openTechModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTechModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== LANGUAGE MANAGEMENT =====
function initLanguage() {
    const languageSelector = document.getElementById('language-selector');
    let currentLanguage = 'en';
    let translations = {};

    // Load translations
    async function loadTranslations(lang) {
        if (translations[lang]) {
            return translations[lang];
        }

        try {
            const response = await fetch('i18n.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const allTranslations = await response.json();
            translations = allTranslations;
            
            return translations[lang] || {};
        } catch (error) {
            console.error('Error loading translations:', error);
            return {};
        }
    }

    // Update page content with translations
    function updateContent(translations) {
        if (!translations.meta) return;

        // Update meta tags
        document.title = translations.technical.meta.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', translations.technical.meta.description);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogTitle) ogTitle.setAttribute('content', translations.technical.meta.title);
        if (ogDescription) ogDescription.setAttribute('content', translations.technical.meta.description);
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = getNestedValue(translations, key);
            
            if (value !== undefined && value !== null) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', value);
                    if (!element.value) {
                        element.value = value;
                    }
                } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                    element.setAttribute('alt', value);
                } else if (element.hasAttribute('aria-label')) {
                    element.setAttribute('aria-label', value);
                } else {
                    element.textContent = value;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', currentLanguage);
        
        // Update language selector
        if (languageSelector) {
            languageSelector.value = currentLanguage;
        }
    }

    // Helper function to get nested object values
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    // Initialize language
    async function initializeLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const userLang = browserLang.startsWith('fr') ? 'fr' : 'en';
        
        currentLanguage = localStorage.getItem('preferredLanguage') || userLang;
        
        const loadedTranslations = await loadTranslations(currentLanguage);
        updateContent(loadedTranslations);
    }

    // Language selector change event
    if (languageSelector) {
        languageSelector.addEventListener('change', async function(e) {
            currentLanguage = e.target.value;
            localStorage.setItem('preferredLanguage', currentLanguage);
            
            const loadedTranslations = await loadTranslations(currentLanguage);
            updateContent(loadedTranslations);
            
            // Close mobile menu after language change on mobile
            const navMenu = document.querySelector('.nav-menu');
            if (window.innerWidth <= 768 && navMenu?.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Initialize the language
    initializeLanguage();

    // Preload other language for better performance
    const browserLang = navigator.language || navigator.userLanguage;
    const otherLang = browserLang.startsWith('fr') ? 'en' : 'fr';
    loadTranslations(otherLang);
}

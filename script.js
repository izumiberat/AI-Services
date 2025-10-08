// Language management and mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Language management
    const languageSelector = document.getElementById('language-selector');
    let currentLanguage = 'en';

    // Load translations
    function loadTranslations(lang) {
        return fetch('i18n.json')
            .then(response => response.json())
            .then(translations => {
                return translations[lang];
            })
            .catch(error => {
                console.error('Error loading translations:', error);
                return {};
            });
    }

    // Update page content with translations
    function updateContent(translations) {
        // Update meta tags
        document.title = translations.meta.title;
        document.querySelector('meta[name="description"]').setAttribute('content', translations.meta.description);
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations;
            
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value !== null) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', value);
                } else if (element.tagName === 'LABEL') {
                    element.textContent = value;
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

    // Initialize language
    function initLanguage() {
        // Get browser language or default to English
        const browserLang = navigator.language || navigator.userLanguage;
        const userLang = browserLang.startsWith('fr') ? 'fr' : 'en';
        
        currentLanguage = localStorage.getItem('preferredLanguage') || userLang;
        
        loadTranslations(currentLanguage).then(translations => {
            updateContent(translations);
        });
    }

    // Language selector change event
    if (languageSelector) {
        languageSelector.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            localStorage.setItem('preferredLanguage', currentLanguage);
            
            loadTranslations(currentLanguage).then(translations => {
                updateContent(translations);
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('lead-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Form submitted! In a real implementation, this would send the data to your server.');
        });
    }

    // Initialize the page
    initLanguage();
});

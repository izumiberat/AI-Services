// Internationalization (i18n) setup
const i18n = {
    en: {
        // English translations
    },
    fr: {
        // French translations  
    }
};

// Fetch translations from i18n.json
fetch('i18n.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(translations => {
        i18n.en = translations.en;
        i18n.fr = translations.fr;
        
        // Initialize with proper language detection
        const currentLang = initializeLanguage();
        
        // Initialize the page with the correct language
        updateContent(currentLang);
        
        // Set up language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.value = currentLang;
            languageSelector.addEventListener('change', (e) => {
                const newLang = e.target.value;
                localStorage.setItem('selectedLanguage', newLang);
                updateContent(newLang);
                
                // Update URL without changing path - using search params
                updateURLForLanguage(newLang);
            });
        }
    })
    .catch(error => {
        console.error('Error loading translations:', error);
        // Fallback to English
        updateContent('en');
    });

// Utility function to get nested object properties
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

// Update content based on selected language
function updateContent(lang) {
    const translations = i18n[lang];
    if (!translations) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        
        if (value !== undefined && value !== null) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', value);
                // Keep current value if user has started typing
                if (!element.value) {
                    element.value = value;
                }
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                element.setAttribute('alt', value);
            } else {
                // For all other elements, update the text content
                element.textContent = value;
                // If the element has an aria-label, update it too
                if (element.hasAttribute('aria-label')) {
                    element.setAttribute('aria-label', value);
                }
            }
        }
        updateSocialMetaTags(lang);
    });

    // Update language attribute
    document.documentElement.setAttribute('lang', lang);

    // Update meta tags for SEO
    updateMetaTags(lang);

    // Update canonical and hreflang
    updateCanonicalAndHreflang(lang);
}

// Update meta tags for SEO
function updateMetaTags(lang) {
    const translations = i18n[lang];
    if (!translations) return;

    // Update page title
    const title = getNestedValue(translations, 'meta.title');
    if (title) {
        document.title = title;
    }

    // Update meta description
    const description = getNestedValue(translations, 'meta.description');
    if (description) {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
        
        // Update Open Graph description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', description);
        }
        
        // Update Twitter description
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', description);
        }
    }
}

// Initialize language based on URL parameter or stored preference
function initializeLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('selectedLanguage');
    const browserLang = navigator.language.split('-')[0]; // Get primary language
    
    // Priority: URL param > stored preference > browser language > default (en)
    let lang = 'en';
    if (urlLang && (urlLang === 'en' || urlLang === 'fr')) {
        lang = urlLang;
    } else if (storedLang) {
        lang = storedLang;
    } else if (browserLang === 'fr') {
        lang = 'fr';
    }
    
    return lang;
}


// Update canonical URL and hreflang tags
function updateCanonicalAndHreflang(lang) {
    const baseURL = 'https://izutech.fr';
    
    // Update canonical URL - always point to main domain
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = baseURL;
    
    // Update hreflang tags with proper URLs
    updateHreflangTags(lang, baseURL);
}

// Update hreflang tags for multilingual SEO
function updateHreflangTags(currentLang, baseURL) {
    // Remove existing hreflang tags
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(link => link.remove());
    
    // Add new hreflang tags with proper self-referencing
    const languages = [
        { code: 'en', url: baseURL },
        { code: 'fr', url: `${baseURL}?lang=fr` }
    ];
    
    languages.forEach(lang => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang.code;
        link.href = lang.url;
        document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = baseURL;
    document.head.appendChild(xDefaultLink);
    
    // Set self-referencing hreflang for current language
    const selfLink = document.createElement('link');
    selfLink.rel = 'alternate';
    selfLink.hreflang = 'x-default';
    selfLink.href = currentLang === 'en' ? baseURL : `${baseURL}?lang=${currentLang}`;
    document.head.appendChild(selfLink);
}

// Update URL for language changes
function updateURLForLanguage(lang) {
    // Use URL search parameters instead of path changes
    const url = new URL(window.location);
    
    if (lang === 'en') {
        // Remove language parameter for English (default)
        url.searchParams.delete('lang');
    } else {
        // Set language parameter for other languages
        url.searchParams.set('lang', lang);
    }
    
    // Update URL without page reload
    window.history.replaceState(null, '', url.toString());
}

// Update Open Graph and social media URLs
function updateSocialMetaTags(lang) {
    const baseURL = 'https://izutech.fr';
    const ogUrl = lang === 'en' ? baseURL : `${baseURL}?lang=${lang}`;
    
    // Update Open Graph URL
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
        ogUrlMeta.content = ogUrl;
    }
    
    // Update og:locale based on language
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
        ogLocale.content = lang === 'en' ? 'en_US' : 'fr_FR';
    }
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Update hamburger animation
            this.classList.toggle('active');
        });
    }
    
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
    
    // Contact form handling
    const contactForm = document.getElementById('lead-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
                
                // Reset button state (for when form is shown again)
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Contact options toggle functionality
    const showFormBtn = document.querySelector('.show-form-btn');
    const backToOptionsBtn = document.querySelector('.back-to-options');
    const contactOptions = document.querySelector('.contact-options');
    const contactFormContainer = document.querySelector('.contact-form-and-trust');
    
    if (showFormBtn && contactOptions && contactFormContainer) {
        showFormBtn.addEventListener('click', function() {
            contactOptions.style.display = 'none';
            contactFormContainer.style.display = 'block';
            this.setAttribute('aria-expanded', 'true');
        });
    }
    
    if (backToOptionsBtn && contactOptions && contactFormContainer) {
        backToOptionsBtn.addEventListener('click', function() {
            contactFormContainer.style.display = 'none';
            contactOptions.style.display = 'grid';
            showFormBtn.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Reset form function
    window.resetForm = function() {
        const contactForm = document.getElementById('lead-form');
        const formSuccess = document.getElementById('form-success');
        
        if (contactForm && formSuccess) {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }
    };
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfEntries = performance.getEntriesByType('navigation');
                if (perfEntries.length > 0) {
                    const navEntry = perfEntries[0];
                    console.log('Page load time:', navEntry.loadEventEnd - navEntry.fetchStart, 'ms');
                }
            }, 0);
        });
    }
});

// Error handling for failed resources
window.addEventListener('error', function(e) {
    console.error('Error loading resource:', e.target.src || e.target.href);
}, true);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

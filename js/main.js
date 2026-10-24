/* ==========================================
   EXCELLENCE SYSTÈME - MULTI-PAGE INTERACTIVE JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initActiveNavLink();
    initHeaderScroll();
    initMobileNav();
    initHeroCanvas();
    initHeroImageSlideshow();
    initStatsCounter();
    initProductFilters();
    initPortfolioFilters();
    initTestimonialCarousel();
    initModals();
    initContactForm();
    initFaqAccordion();
    initBrandAnimations();
    initAboutSlider();
    initAboutTabbedVisual();
    initActivityBrandsTilt();
    initReviewSystem();
    initLanguageSwitcher();
    initLegalScrollspy();
});

/* Global HTML sanitization helper */
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* 0. Highlight Active Navigation Link based on current page URL */
function initActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (href && !href.startsWith('#') && !currentPath.includes(href)) {
            link.classList.remove('active');
        }
    });
}

/* 1. Header Scroll Effect */
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* 2. Mobile Navigation Drawer & Dropdown Accordions */
function ensureNavIcons() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    navMenu.querySelectorAll(':scope > li:not(.drawer-header-item):not(.drawer-footer-item) > a.nav-link').forEach(link => {
        if (link.querySelector('.nav-icon')) return;
        const text = link.textContent.trim().toLowerCase();
        let iconClass = '';
        if (text.includes('accueil') || text.includes('home')) {
            iconClass = 'fa-solid fa-house';
        } else if (text.includes('propos') || text.includes('about')) {
            iconClass = 'fa-solid fa-circle-info';
        } else if (text.includes('solution') || text.includes('activit')) {
            iconClass = 'fa-solid fa-microchip';
        } else if (text.includes('réalisation') || text.includes('project')) {
            iconClass = 'fa-solid fa-trophy';
        } else if (text.includes('marque') || text.includes('brand')) {
            iconClass = 'fa-solid fa-award';
        } else if (text.includes('contact')) {
            iconClass = 'fa-solid fa-envelope';
        }
        if (iconClass) {
            const icon = document.createElement('i');
            icon.className = iconClass + ' nav-icon';
            link.prepend(icon);
        }
    });
}

function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggleBtn || !navMenu) return;

    // 1. Ensure Backdrop exists in DOM
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
    }

    // 2. Ensure Drawer Header exists in nav-menu
    if (!navMenu.querySelector('.drawer-header-item')) {
        const headerItem = document.createElement('li');
        headerItem.className = 'drawer-header-item';
        headerItem.innerHTML = `
            <div class="drawer-header">
                <a href="index.html" class="drawer-brand">
                    <img src="assets/logo-3d.png" alt="Excellence Système" class="drawer-logo" onerror="this.src='../assets/logo-3d.png'">
                    <div class="drawer-brand-text">
                        <span class="drawer-brand-title">EXCELLENCE</span>
                        <span class="drawer-brand-sub">SYSTÈME</span>
                    </div>
                </a>
                <button type="button" class="drawer-close-btn" aria-label="Fermer le menu">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
        navMenu.prepend(headerItem);
    }

    // 3. Ensure Drawer Footer exists in nav-menu
    if (!navMenu.querySelector('.drawer-footer-item')) {
        const footerItem = document.createElement('li');
        footerItem.className = 'drawer-footer-item';
        const isDocEn = document.documentElement.getAttribute('lang') === 'en';
        footerItem.innerHTML = `
            <div class="drawer-footer">
                <button type="button" class="btn btn-primary btn-drawer-quote" data-open-quote>
                    <i class="fa-solid fa-paper-plane"></i> <span data-i18n="btnQuote">${isDocEn ? 'Request a Quote' : 'Demander un devis'}</span>
                </button>
                <div class="drawer-contacts-grid">
                    <a href="https://wa.me/212668764271" target="_blank" rel="noopener" class="drawer-contact-card wa">
                        <i class="fa-brands fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </a>
                    <a href="tel:+212525324288" class="drawer-contact-card phone">
                        <i class="fa-solid fa-phone"></i>
                        <span data-i18n="drawerCall">${isDocEn ? 'Call Us' : 'Appeler'}</span>
                    </a>
                </div>
                <div class="drawer-lang-row">
                    <span class="drawer-lang-tag"><i class="fa-solid fa-globe"></i> <span data-i18n="drawerLangLabel">${isDocEn ? 'Language:' : 'Langue :'}</span></span>
                    <div class="drawer-lang-buttons">
                        <button type="button" class="drawer-lang-btn ${!isDocEn ? 'active' : ''}" data-lang="fr">FR</button>
                        <span class="drawer-lang-divider">|</span>
                        <button type="button" class="drawer-lang-btn ${isDocEn ? 'active' : ''}" data-lang="en">EN</button>
                    </div>
                </div>
            </div>
        `;
        navMenu.appendChild(footerItem);

        // Bind Quote Button in drawer
        const drawerQuoteBtn = footerItem.querySelector('.btn-drawer-quote');
        if (drawerQuoteBtn) {
            drawerQuoteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeNav();
                const quoteModal = document.getElementById('quoteModal');
                if (quoteModal) {
                    quoteModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    window.location.href = 'contact.html#quote';
                }
            });
        }
    }

    // 4. Prepend icons to top-level navigation links
    ensureNavIcons();

    function openNav() {
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    }

    function closeNav() {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
        // Close any open mobile submenus
        document.querySelectorAll('.nav-item.has-dropdown.dropdown-open').forEach(item => {
            item.classList.remove('dropdown-open');
        });
    }

    function toggleNav(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (navMenu.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    }

    toggleBtn.addEventListener('click', toggleNav);

    // Backdrop click closes drawer
    backdrop.addEventListener('click', closeNav);

    // Drawer close button click
    const drawerCloseBtn = navMenu.querySelector('.drawer-close-btn');
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeNav();
        });
    }

    // Mobile dropdown accordion toggles
    const dropdownItems = navMenu.querySelectorAll('.nav-item.has-dropdown');
    dropdownItems.forEach(item => {
        const trigger = item.querySelector(':scope > a');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    const wasOpen = item.classList.contains('dropdown-open');
                    // Close sibling dropdowns for clean accordion behavior
                    dropdownItems.forEach(sibling => {
                        if (sibling !== item) sibling.classList.remove('dropdown-open');
                    });
                    item.classList.toggle('dropdown-open', !wasOpen);
                }
            });
        }
    });

    // Close menu when clicking any direct link (not a dropdown trigger) or dropdown sub-item
    const directLinks = navMenu.querySelectorAll('a:not(.nav-item.has-dropdown > a)');
    directLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                closeNav();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeNav();
    });

    // Close if resized to desktop layout
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            closeNav();
        }
    });
}

/* 3. Hero Canvas Network Background */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 45);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 196, 196, ${0.15 * (1 - dist / 140)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 196, 196, ${p.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#63C4C4';
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* 4. Stats Counter Animation */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCounter() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || '0', 10);
            const prefix = stat.getAttribute('data-prefix') || '';
            const suffix = stat.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = Math.ceil(target / 40);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = `${prefix}${current}${suffix}`;
            }, 35);
        });
    }

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.trust-bar');
        if (!statsSection || animated) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
            animated = true;
            startCounter();
        }
    });

    const statsSection = document.querySelector('.trust-bar');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            animated = true;
            startCounter();
        }
    }
}

/* 5. Product Category Filtering */
function initProductFilters() {
    const tabs = document.querySelectorAll('.products .tab-btn');
    const cards = document.querySelectorAll('.product-card');

    if (tabs.length === 0 || cards.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || category === cardCat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* 6. Portfolio Category Filtering */
function initPortfolioFilters() {
    const tabs = document.querySelectorAll('.realisations .tab-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    if (tabs.length === 0 || cards.length === 0) return;

    function applyFilter(category) {
        tabs.forEach(t => {
            if (t.getAttribute('data-category') === category) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        cards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || category === cardCat) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            applyFilter(category);
        });
    });

    function handleHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            applyFilter(hash);
        }
    }

    handleHash();
    window.addEventListener('hashchange', handleHash);
}

/* 7. Testimonial Carousel Slider */
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = index;
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const offset = isRTL ? index * 100 : -index * 100;
        track.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }, 5000);
}

/* 8. Modal Management */
function initModals() {
    const quoteModal = document.getElementById('quoteModal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const openQuoteBtns = document.querySelectorAll('[data-open-quote]');
    const solutionSelect = document.getElementById('modalSolutionSelect');

    openQuoteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = btn.getAttribute('data-subject');
            if (subject && solutionSelect) {
                solutionSelect.value = subject;
            }
            if (quoteModal) {
                quoteModal.classList.add('active');
            }
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (quoteModal) quoteModal.classList.remove('active');
        });
    });

    if (quoteModal) {
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('active');
            }
        });
    }
}

/* 9. Contact Form, Quote Request & Real Email Submission */
const FORM_CONFIG = {
    primaryEmail: 'Excellencesysteme@gmail.com',
    ccEmail: 'commercial.exsys@gmail.com',
    endpoint: 'https://formsubmit.co/ajax/Excellencesysteme@gmail.com',
    web3formsKey: '', // Optionnel : collez ici votre clé Web3Forms (https://web3forms.com) si vous préférez Web3Forms
    whatsappNumber: '212668764271'
};

function extractFormData(form) {
    const data = {};
    const formData = new FormData(form);
    for (const [key, val] of formData.entries()) {
        if (key && typeof val === 'string' && val.trim()) {
            data[key] = val.trim();
        }
    }

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        let name = input.getAttribute('name');
        if (!name) {
            const type = (input.type || '').toLowerCase();
            const tag = input.tagName.toLowerCase();
            const placeholder = (input.placeholder || '').toLowerCase();
            const formGroup = input.closest('.form-group');
            const label = formGroup ? (formGroup.querySelector('label')?.textContent || '').toLowerCase() : '';

            if (type === 'email' || placeholder.includes('email') || label.includes('email')) {
                name = 'email';
            } else if (type === 'tel' || placeholder.includes('tel') || label.includes('téléphone') || label.includes('phone')) {
                name = 'telephone';
            } else if (label.includes('nom') || placeholder.includes('nom') || label.includes('name')) {
                name = 'nom';
            } else if (label.includes('société') || label.includes('societe') || placeholder.includes('entreprise')) {
                name = 'societe';
            } else if (tag === 'select' || label.includes('activité') || label.includes('solution') || input.id === 'modalSolutionSelect') {
                name = 'activite';
            } else if (tag === 'textarea' || label.includes('message') || placeholder.includes('besoin')) {
                name = 'message';
            } else {
                name = input.id || 'champ_' + Math.random().toString(36).substring(7);
            }
        }
        if (!data[name] && input.value && input.value.trim()) {
            data[name] = input.value.trim();
        }
    });

    return data;
}

function initContactForm() {
    const quoteAndContactForms = document.querySelectorAll(
        '#modalQuoteForm, #pageContactForm, .contact-interactive-form, form:not(#submitReviewForm):not(#inlineReviewForm)'
    );

    quoteAndContactForms.forEach(form => {
        if (form.dataset.initializedSubmit) return;
        form.dataset.initializedSubmit = 'true';

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isEn = (document.documentElement.lang || '').toLowerCase().startsWith('en');
            const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
            const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

            const extractedData = extractFormData(form);

            // 1. Validation stricte des données du formulaire
            if (!extractedData.nom || extractedData.nom.trim().length < 2) {
                showToast(isEn ? 'Please enter your full name.' : 'Veuillez saisir votre nom et prénom.', 'error');
                const nameInput = form.querySelector('input[name="nom"], input[type="text"]');
                if (nameInput) nameInput.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!extractedData.email || !emailRegex.test(extractedData.email.trim())) {
                showToast(isEn ? 'Please enter a valid email address.' : 'Veuillez saisir une adresse e-mail valide (ex: contact@domaine.com).', 'error');
                const emailInput = form.querySelector('input[type="email"], input[name="email"]');
                if (emailInput) emailInput.focus();
                return;
            }

            const phoneClean = (extractedData.telephone || '').replace(/[\s\-\.]/g, '');
            if (!phoneClean || phoneClean.length < 8) {
                showToast(isEn ? 'Please enter a valid phone number.' : 'Veuillez renseigner un numéro de téléphone valide.', 'error');
                const telInput = form.querySelector('input[type="tel"], input[name="telephone"]');
                if (telInput) telInput.focus();
                return;
            }

            // 2. État de chargement du bouton
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.75';
                submitBtn.style.cursor = 'wait';
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${isEn ? 'Sending...' : 'Envoi en cours...'}</span>`;
            }

            // 3. Préparation du payload et de la cible d'envoi
            let targetUrl = FORM_CONFIG.endpoint;
            let payload = {};

            if (FORM_CONFIG.web3formsKey && FORM_CONFIG.web3formsKey.trim().length > 10) {
                targetUrl = 'https://api.web3forms.com/submit';
                payload = {
                    access_key: FORM_CONFIG.web3formsKey.trim(),
                    subject: isEn ? `New Quote Request - ${extractedData.nom}` : `Demande de Devis - ${extractedData.nom} (${extractedData.activite || 'Général'})`,
                    from_name: 'Excellence Système Website',
                    name: extractedData.nom,
                    email: extractedData.email,
                    phone: extractedData.telephone,
                    company: extractedData.societe || 'Non spécifiée',
                    activity: extractedData.activite || 'Général',
                    message: extractedData.message || 'Demande de devis',
                    page_source: window.location.href,
                    date_maroc: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })
                };
            } else {
                targetUrl = FORM_CONFIG.endpoint;
                payload = {
                    _subject: isEn ? `Demande de Devis - ${extractedData.nom}` : `Demande de Devis - ${extractedData.nom} (${extractedData.activite || 'Général'})`,
                    _cc: FORM_CONFIG.ccEmail,
                    _replyto: extractedData.email,
                    _template: 'table',
                    _captcha: 'false',
                    "Nom & Prénom": extractedData.nom,
                    "Email du client": extractedData.email,
                    "Téléphone": extractedData.telephone,
                    "Société": extractedData.societe || 'Non spécifiée',
                    "Activité / Domaine": extractedData.activite || 'Général',
                    "Message / Détails": extractedData.message || 'Demande de devis transmise via le site web',
                    "Date de réception (Maroc)": new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
                    "Page source": window.location.href
                };
            }

            console.info('[Excellence Système - Formulaire] 📤 Envoi des données vers le service :', {
                endpoint: targetUrl,
                destinataire: FORM_CONFIG.primaryEmail,
                copie: FORM_CONFIG.ccEmail,
                donnees: payload
            });

            const statusDiv = form.querySelector('.form-status-msg') || document.getElementById('contactFormStatus');
            if (statusDiv) {
                statusDiv.innerHTML = '';
            }

            let response = null;
            let result = null;

            try {
                response = await fetch(targetUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                result = await response.json().catch(err => {
                    console.warn('[Excellence Système - Formulaire] Impossible de parser la réponse JSON du serveur:', err);
                    return {};
                });

                console.info('[Excellence Système - Formulaire] 📥 Réponse reçue du service email (HTTP ' + response.status + ') :', result);

                const isActivationPending = Boolean(
                    result && typeof result.message === 'string' && result.message.toLowerCase().includes('activation')
                );

                const isLocalServerWarning = Boolean(
                    result && typeof result.message === 'string' && result.message.toLowerCase().includes('web server')
                );

                const isSuccess = Boolean(
                    response.ok &&
                    (result.success === true || result.success === 'true') &&
                    !isActivationPending &&
                    !isLocalServerWarning
                );

                if (isSuccess) {
                    // SUCCÈS RÉEL ET CONFIRMÉ
                    console.log('[Excellence Système - Formulaire] ✅ E-mail transmis avec succès !');
                    const successMsg = isEn 
                        ? `Your quote request has been transmitted successfully! A notification was sent to our team (${FORM_CONFIG.primaryEmail}). We will contact you within 24 hours.`
                        : `Votre demande a bien été envoyée avec succès à notre équipe commerciale (${FORM_CONFIG.primaryEmail}) ! Nous vous recontacterons sous 24h.`;
                    showToast(successMsg, 'success');

                    form.reset();

                    const modal = form.closest('.modal-overlay');
                    if (modal) {
                        setTimeout(() => modal.classList.remove('active'), 1500);
                    }

                    if (statusDiv) {
                        statusDiv.innerHTML = `
                            <div style="background: rgba(99, 196, 196, 0.12); border: 1px solid rgba(99, 196, 196, 0.45); border-radius: 8px; padding: 14px; margin-top: 15px; color: #63C4C4; font-size: 0.95rem; line-height: 1.5;">
                                <p style="margin:0; font-weight:600;"><i class="fa-solid fa-circle-check"></i> ${successMsg}</p>
                            </div>
                        `;
                    }
                } else if (isActivationPending) {
                    // ERREUR SPÉCIFIQUE : ACTIVATION INITIALE DU COMPTE FORMSUBMIT REQUISE
                    console.error('[Excellence Système - Formulaire] ❌ Blocage FormSubmit : L\'adresse e-mail destinataire (' + FORM_CONFIG.primaryEmail + ') doit être activée. Un e-mail d\'activation a été envoyé par FormSubmit.', result);
                    
                    const activationErr = isEn
                        ? `Email dispatch is pending one-time activation on FormSubmit for ${FORM_CONFIG.primaryEmail}. Please contact us via WhatsApp or phone directly.`
                        : `L'envoi automatique est en attente d'activation initiale par le destinataire (${FORM_CONFIG.primaryEmail}). FormSubmit a envoyé un e-mail avec un lien "Activate Form". En attendant, contactez-nous directement sur WhatsApp !`;
                    showToast(activationErr, 'error');

                    const waMessage = encodeURIComponent(
                        `Bonjour Excellence Système,\nJe souhaite un devis pour : ${extractedData.activite || 'Courant faible / Sécurité'}\nNom: ${extractedData.nom}\nTéléphone: ${extractedData.telephone}\nEmail: ${extractedData.email}\nMessage: ${extractedData.message || 'Demande de devis'}`
                    );

                    if (statusDiv) {
                        statusDiv.innerHTML = `
                            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 14px; margin-top: 15px; color: #fca5a5; font-size: 0.9rem; line-height: 1.5;">
                                <p style="margin-bottom: 8px; font-weight:600;"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> Notification d'envoi :</p>
                                <p style="margin-bottom: 10px; font-size: 0.88rem; color: #fecaca;">
                                    Le service FormSubmit requiert une activation unique pour l'adresse <strong>${FORM_CONFIG.primaryEmail}</strong>. Un e-mail de confirmation avec un lien <em>"Activate Form"</em> a été transmis dans votre boîte Gmail. Dès validation, les réceptions seront 100% directes.
                                </p>
                                <p style="margin-bottom: 8px; font-weight:600; color:#fff;">Pour transmettre votre demande immédiatement sans attendre :</p>
                                <div style="display:flex; flex-wrap:wrap; gap:10px;">
                                    <a href="https://wa.me/${FORM_CONFIG.whatsappNumber}?text=${waMessage}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; background: #25D366; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 600; text-decoration: none;">
                                        <i class="fa-brands fa-whatsapp"></i> Envoyer via WhatsApp
                                    </a>
                                    <a href="mailto:${FORM_CONFIG.primaryEmail}?cc=${FORM_CONFIG.ccEmail}&subject=${encodeURIComponent('Demande de devis - ' + extractedData.nom)}&body=${encodeURIComponent('Nom: ' + extractedData.nom + '\nEmail: ' + extractedData.email + '\nTéléphone: ' + extractedData.telephone + '\nActivité: ' + (extractedData.activite || '') + '\nMessage:\n' + (extractedData.message || ''))}" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.25); padding: 8px 16px; border-radius: 6px; font-weight: 600; text-decoration: none;">
                                        <i class="fa-solid fa-envelope"></i> Envoyer par E-mail
                                    </a>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    // AUTRE ERREUR DU SERVEUR / API
                    const errorDetail = result.message || `Erreur serveur HTTP ${response.status}`;
                    throw new Error(errorDetail);
                }
            } catch (err) {
                console.error('[Excellence Système - Formulaire] ❌ Erreur critique lors de l\'envoi :', {
                    erreur: err.message || err,
                    statut: response ? response.status : 'Connexion impossible',
                    reponse: result,
                    donnees: payload
                });

                const errorMsg = isEn 
                    ? "Submission issue. Please reach us directly on WhatsApp or by email."
                    : "Une erreur est survenue lors de l'envoi du formulaire. Vous pouvez nous joindre directement sur WhatsApp ou par email.";
                showToast(errorMsg, 'error');

                const waMessage = encodeURIComponent(
                    `Bonjour Excellence Système,\nJe souhaite un devis pour : ${extractedData.activite || 'Courant faible / Sécurité'}\nNom: ${extractedData.nom}\nTéléphone: ${extractedData.telephone}\nEmail: ${extractedData.email}\nMessage: ${extractedData.message || 'Demande de devis'}`
                );

                if (statusDiv) {
                    statusDiv.innerHTML = `
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 14px; margin-top: 15px; color: #fca5a5; font-size: 0.9rem; line-height: 1.5;">
                            <p style="margin-bottom: 8px; font-weight:600;"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> ${errorMsg}</p>
                            <p style="margin-bottom: 10px; font-size: 0.85rem; color: #cbd5e1;">Détail technique : ${err.message || 'Erreur réseau ou réponse inattendue'}</p>
                            <div style="display:flex; flex-wrap:wrap; gap:10px;">
                                <a href="https://wa.me/${FORM_CONFIG.whatsappNumber}?text=${waMessage}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; background: #25D366; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 600; text-decoration: none;">
                                    <i class="fa-brands fa-whatsapp"></i> Envoyer via WhatsApp
                                </a>
                                <a href="mailto:${FORM_CONFIG.primaryEmail}?cc=${FORM_CONFIG.ccEmail}&subject=${encodeURIComponent('Demande de devis - ' + extractedData.nom)}&body=${encodeURIComponent('Nom: ' + extractedData.nom + '\nEmail: ' + extractedData.email + '\nTéléphone: ' + extractedData.telephone + '\nActivité: ' + (extractedData.activite || '') + '\nMessage:\n' + (extractedData.message || ''))}" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.25); padding: 8px 16px; border-radius: 6px; font-weight: 600; text-decoration: none;">
                                    <i class="fa-solid fa-envelope"></i> Envoyer par E-mail
                                </a>
                            </div>
                        </div>
                    `;
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.innerHTML = originalBtnHTML;
                }
            }
        });
    });
}

function showToast(message, type = 'success') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.classList.remove('toast-error');
    if (type === 'error') {
        toast.classList.add('toast-error');
        toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444; font-size:1.2rem;"></i> <span>${message}</span>`;
    } else {
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#63C4C4; font-size:1.2rem;"></i> <span>${message}</span>`;
    }

    toast.classList.add('show');

    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

/* 10. Universal Multi-Page Language Switcher (FR <-> EN)
   Covers 100% of website pages, menus, headings, paragraphs, cards,
   forms, placeholders, options, modals, footers and dynamic content. */

const translations = {
    fr: {
        navHome: "Accueil",
        navAbout: "À propos",
        navSolutions: "Solutions IT <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navActivities: "Nos activités <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navServices: "Nos services <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navRealizations: "Nos réalisations <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navBrands: "Nos marques",
        navContact: "Contact",
        btnQuote: "Demander un devis",

        solHotel: "<i class='fa-solid fa-hotel'></i> Solutions Hôtelière",
        solVilla: "<i class='fa-solid fa-house-chimney'></i> Solutions Riad & Villa",
        solInnov: "<i class='fa-solid fa-lightbulb'></i> Solutions Innovantes",

        realHosp: "<i class='fa-solid fa-hospital'></i> Hôpitaux",
        realFact: "<i class='fa-solid fa-industry'></i> Usines",
        realAdmin: "<i class='fa-solid fa-landmark'></i> Administrations",
        realUniv: "<i class='fa-solid fa-graduation-cap'></i> Universités",
        realVilla: "<i class='fa-solid fa-house-chimney'></i> Riad & Villa",

        drawerLangLabel: "Langue :",
        drawerCall: "Appeler",

        actDetection: "<i class='fa-solid fa-fire-flame-curved'></i> Détection incendie",
        actIntrusion: "<i class='fa-solid fa-shield-cat'></i> Anti-intrusion",
        actReseau: "<i class='fa-solid fa-network-wired'></i> Réseau informatique",
        actVideo: "<i class='fa-solid fa-video'></i> Vidéosurveillance IP",
        actTelephonie: "<i class='fa-solid fa-phone-volume'></i> Téléphonie IP",
        actAcces: "<i class='fa-solid fa-fingerprint'></i> Contrôle d'accès",
        actAudio: "<i class='fa-solid fa-tv'></i> Audiovisuel",
        actDomotique: "<i class='fa-solid fa-house-signal'></i> Domotique & GTB",
        actMotorisation: "<i class='fa-solid fa-torii-gate'></i> Motorisation portail",
        actOptique: "<i class='fa-solid fa-bolt-lightning'></i> Réseau optique",
        actTeledist: "<i class='fa-solid fa-satellite-dish'></i> Télédistribution",

        srvHotel: "<i class='fa-solid fa-hotel'></i> Hôtellerie & Resorts",
        srvVilla: "<i class='fa-solid fa-house-chimney'></i> Villas & Résidences",
        srvEntreprise: "<i class='fa-solid fa-building'></i> Entreprises & Bureaux",
        srvAdmin: "<i class='fa-solid fa-landmark'></i> Administrations & Industrie",

        heroTag: "<i class='fa-solid fa-shield-halved'></i> <span>EXPERT EN COURANT FAIBLE & SÉCURITÉ ÉLECTRONIQUE</span>",
        heroTitle: "Intégrer des solutions IT à vos projets<br><span class='highlight'>Apporter de l'innovation à vos clients</span>",
        heroDesc: "Plus de 11 ans d'expérience au Maroc dans le conseil, la fourniture, l'intégration et la maintenance de solutions de sécurité électronique, réseaux informatiques et domotique.",
        btnDiscover: "Découvrir nos activités <i class='fa-solid fa-arrow-right'></i>",
        stat1Label: "Projets & Solutions Déployés",
        stat2Label: "Clients Accompagnés au Maroc",
        stat3Label: "Années d'Expérience",
        stat4Label: "Support Technique & Maintenance",

        whyUsTag: "NOS ENGAGEMENTS",
        whyUsTitle: "POURQUOI NOUS CHOISIR ?",
        whyUsSub: "Découvrez ce qui fait la force et la réputation d'Excellence Système au Maroc.",
        benefit1Title: "SUPPORT INÉGALÉ",
        benefit1Desc: "Une assistance technique réactive et un service de maintenance disponible 24h/24 et 7j/7.",
        benefit2Title: "PRIX COMPÉTITIFS",
        benefit2Desc: "Le meilleur rapport qualité/prix garanti pour vos équipements et installations.",
        benefit3Title: "CONFIANCE ÉTABLIE",
        benefit3Desc: "Plus de 11 ans d'expérience au Maroc et des dizaines de projets d'envergure concrétisés.",
        benefit4Title: "LIVRAISON ET INSTALLATION",
        benefit4Desc: "Déploiement rapide, clé en main et rigoureusement conforme aux normes internationales.",

        reviewsTag: "RETOURS D'EXPÉRIENCE",
        reviewsTitle: "AVIS CLIENTS",
        reviewsAvgLabel: "Note moyenne :",
        reviewsSubText: "sur plus de 100 projets livrés au Maroc",
        reviewsCountLabel: "avis vérifiés",
        reviewsWriteBtn: "Rédiger un avis client",
        reviewsFormTitle: "Publier votre avis client",
        reviewsFormRateLabel: "Votre Note :",
        reviewsPlaceholderName: "Votre Nom & Prénom *",
        reviewsPlaceholderRole: "Votre Fonction / Établissement & Ville *",
        reviewsPlaceholderText: "Rédigez votre avis sur nos services, installations et accompagnement...",
        reviewsFormNote: "<i class='fa-solid fa-shield-halved' style='color:var(--primary-turquoise); margin-right:4px;'></i> Votre avis sera affiché au format carte du site.",
        reviewsSubmitBtn: "Publier mon avis",

        homeExpertiseTag: "NOS DOMAINES D'EXPERTISE ÉPROUVÉS",
        homeExpertiseTitle: "Nos Activités Principales",
        homeExpertiseSub: "Découvrez nos domaines d'intervention clés. Cliquez sur une carte pour consulter nos équipements et réalisations réelles.",
        btnSeeAllActivities: "Explorer nos 11 activités intégrales <i class='fa-solid fa-arrow-right'></i>",

        card1Badge: "<i class='fa-solid fa-fire-flame-curved'></i> Certifié S.S.I.",
        card1Title: "Détection Incendie",
        card1Desc: "Centrales ECS/CMSI conventionnelles et adressables conformes aux normes ERP.",

        card2Badge: "<i class='fa-solid fa-video'></i> Ultra HD 4K",
        card2Title: "Vidéosurveillance IP",
        card2Desc: "Caméras motorisées PTZ, reconnaissance de plaques LPR et serveurs NVR réseau.",

        card3Badge: "<i class='fa-solid fa-network-wired'></i> Cat6 / Cat7 / Fibre",
        card3Title: "Réseau Informatique",
        card3Desc: "Câblage structuré, baies de brassage serveur et switching PoE administrable.",

        card4Badge: "<i class='fa-solid fa-fingerprint'></i> Biométrie & RFID",
        card4Title: "Contrôle d'Accès",
        card4Desc: "Reconnaissance faciale, tourniquets piétons, badges RFID et pointeuses horaires.",

        card5Badge: "<i class='fa-solid fa-house-signal'></i> iNELS & KNX",
        card5Title: "Domotique & GTB",
        card5Desc: "Gestion technique des bâtiments, automatisation d'éclairage et régulation HVAC.",

        card6Badge: "<i class='fa-solid fa-shield-cat'></i> Alarme Connectée",
        card6Title: "Système Anti-intrusion",
        card6Desc: "Protection périmétrique extérieure, détecteurs double technologie et sirènes.",

        btnLearnMore: "En savoir plus <i class='fa-solid fa-arrow-right'></i>",

        aboutTag: "À PROPOS D'EXCELLENCE SYSTÈME",
        aboutTitle: "Plus de 11 ans d'expertise technique au Maroc",
        aboutDesc1: "Excellence Système est votre partenaire de confiance spécialisé dans l'ingénierie, l'intégration et la maintenance des systèmes de courant faible, de sécurité électronique, de réseaux informatiques et de domotique.",
        aboutDesc2: "Nous accompagnons les entreprises grands comptes, les institutions publiques, le secteur hôtelier et les résidences privées en offrant des prestations complètes du conseil à la maintenance 24/7.",
        aboutBenefit1Title: "Conseil & Étude d'Ingénierie Préalable",
        aboutBenefit1Desc: "Analyse schématique de vos plans architecturaux et réglementaires.",
        aboutBenefit2Title: "Fourniture de Matériel Certifié & Intégration",
        aboutBenefit2Desc: "Déploiement rigoureux et paramétrage par des techniciens qualifiés.",
        btnAboutMore: "En savoir plus sur notre entreprise <i class='fa-solid fa-arrow-right'></i>",

        homeSectorsTag: "CHAMPS D'INTERVENTION",
        homeSectorsTitle: "Solutions Adaptées à Votre Secteur",
        homeSectorsSub: "Nos ingénieurs déploient des architectures de sécurité électronique et courant faible taillées pour vos besoins métiers.",
        sec1Title: "Hôtellerie & Resorts",
        sec1Desc: "Télédistribution IP TV, Wi-Fi très haute densité, serrures à cartes magnétiques & sonorisation d'ambiance.",
        sec2Title: "Villas & Résidences",
        sec2Desc: "Domotique iNELS, alarme anti-intrusion connectée, visiophonie et contrôle d'accès sur smartphone.",
        sec3Title: "Entreprises & Tertiaire",
        sec3Desc: "Baies informatiques Datacenter, vidéoprotection 4K, pointage horaire biométrique & téléphonie IP.",
        sec4Title: "Industrie & Administrations",
        sec4Desc: "Détection incendie SSI globale, supervision GTB/GTC, tourniquets de sécurité et motorisation de barrières.",
        btnDiscoverSector: "Découvrir l'offre <i class='fa-solid fa-chevron-right'></i>",

        ctaBannerTag: "PROJET COURANT FAIBLE OU SÉCURITÉ ?",
        ctaBannerTitle: "Prêt à sécuriser & automatiser vos infrastructures ?",
        ctaBannerSub: "Nos experts réalisent une étude de vos plans et un devis sur-mesure sous 24h.",
        btnFreeQuote: "<i class='fa-solid fa-paper-plane'></i> Demander un Devis Gratuit",

        footerPrivacy: "Politique de Confidentialité",
        footerTerms: "Conditions d'Utilisation",
        footerCookies: "Politique des Cookies"
    },
    en: {
        navHome: "Home",
        navAbout: "About Us",
        navSolutions: "IT Solutions <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navActivities: "Our Activities <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navServices: "Our Services <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navRealizations: "Our Projects <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navBrands: "Our Brands",
        navContact: "Contact",
        btnQuote: "Request a Quote",

        solHotel: "<i class='fa-solid fa-hotel'></i> Hotel Solutions",
        solVilla: "<i class='fa-solid fa-house-chimney'></i> Riad & Villa Solutions",
        solInnov: "<i class='fa-solid fa-lightbulb'></i> Innovative Solutions",

        realHosp: "<i class='fa-solid fa-hospital'></i> Hospitals",
        realFact: "<i class='fa-solid fa-industry'></i> Factories",
        realAdmin: "<i class='fa-solid fa-landmark'></i> Administrations",
        realUniv: "<i class='fa-solid fa-graduation-cap'></i> Universities",
        realVilla: "<i class='fa-solid fa-house-chimney'></i> Riad & Villa",

        drawerLangLabel: "Language:",
        drawerCall: "Call Us",

        actDetection: "<i class='fa-solid fa-fire-flame-curved'></i> Fire Detection",
        actIntrusion: "<i class='fa-solid fa-shield-cat'></i> Intrusion Alarm",
        actReseau: "<i class='fa-solid fa-network-wired'></i> IT Networking",
        actVideo: "<i class='fa-solid fa-video'></i> IP CCTV",
        actTelephonie: "<i class='fa-solid fa-phone-volume'></i> IP Telephony",
        actAcces: "<i class='fa-solid fa-fingerprint'></i> Access Control",
        actAudio: "<i class='fa-solid fa-tv'></i> Audio & Visual",
        actDomotique: "<i class='fa-solid fa-house-signal'></i> Smart Home & BMS",
        actMotorisation: "<i class='fa-solid fa-torii-gate'></i> Gate Automation",
        actOptique: "<i class='fa-solid fa-bolt-lightning'></i> Fiber Optics",
        actTeledist: "<i class='fa-solid fa-satellite-dish'></i> Satellite & TV",

        srvHotel: "<i class='fa-solid fa-hotel'></i> Hotels & Resorts",
        srvVilla: "<i class='fa-solid fa-house-chimney'></i> Villas & Residences",
        srvEntreprise: "<i class='fa-solid fa-building'></i> Corporate & Offices",
        srvAdmin: "<i class='fa-solid fa-landmark'></i> Public & Industry",

        heroTag: "<i class='fa-solid fa-shield-halved'></i> <span>LOW CURRENT & ELECTRONIC SECURITY EXPERT</span>",
        heroTitle: "Integrate IT solutions into your projects<br><span class='highlight'>Bring innovation to your clients</span>",
        heroDesc: "Over 11 years of experience in Morocco in consulting, supply, integration, and maintenance of electronic security, IT networking, and home automation.",
        btnDiscover: "Explore Our Activities <i class='fa-solid fa-arrow-right'></i>",
        stat1Label: "Deployed Projects & Solutions",
        stat2Label: "Satisfied Clients in Morocco",
        stat3Label: "Years of Experience",
        stat4Label: "Technical Support & Maintenance",

        whyUsTag: "OUR COMMITMENTS",
        whyUsTitle: "WHY CHOOSE US?",
        whyUsSub: "Discover what makes Excellence Système strong and reputable across Morocco.",
        benefit1Title: "UNRIVALED SUPPORT",
        benefit1Desc: "Responsive technical assistance and maintenance service available 24/7.",
        benefit2Title: "COMPETITIVE PRICES",
        benefit2Desc: "Guaranteed best value for money for your equipment and installations.",
        benefit3Title: "ESTABLISHED TRUST",
        benefit3Desc: "Over 10 years of experience in Morocco and dozens of major projects delivered.",
        benefit4Title: "DELIVERY AND INSTALLATION",
        benefit4Desc: "Fast turnkey deployment strictly compliant with international standards.",

        reviewsTag: "CLIENT REVIEWS",
        reviewsTitle: "CUSTOMER REVIEWS",
        reviewsAvgLabel: "Average rating:",
        reviewsSubText: "over 100+ projects delivered in Morocco",
        reviewsCountLabel: "verified reviews",
        reviewsWriteBtn: "Write a client review",
        reviewsFormTitle: "Submit your client review",
        reviewsFormRateLabel: "Your Rating:",
        reviewsPlaceholderName: "Your Full Name *",
        reviewsPlaceholderRole: "Your Role / Organization & City *",
        reviewsPlaceholderText: "Write your review on our services, installations and technical support...",
        reviewsFormNote: "<i class='fa-solid fa-shield-halved' style='color:var(--primary-turquoise); margin-right:4px;'></i> Your review will be displayed in the website card format.",
        reviewsSubmitBtn: "Submit my review",

        homeExpertiseTag: "OUR PROVEN EXPERTISE",
        homeExpertiseTitle: "Our Main Activities",
        homeExpertiseSub: "Discover our key intervention domains. Click a card to view specs and real projects.",
        btnSeeAllActivities: "Explore all 11 activities <i class='fa-solid fa-arrow-right'></i>",

        card1Badge: "<i class='fa-solid fa-fire-flame-curved'></i> S.S.I. Certified",
        card1Title: "Fire Detection",
        card1Desc: "Conventional & addressable fire panels compliant with safety standards.",

        card2Badge: "<i class='fa-solid fa-video'></i> Ultra HD 4K",
        card2Title: "IP CCTV Surveillance",
        card2Desc: "PTZ motorized cameras, LPR plate recognition, and network NVR servers.",

        card3Badge: "<i class='fa-solid fa-network-wired'></i> Cat6 / Cat7 / Fiber",
        card3Title: "IT Networking",
        card3Desc: "Structured cabling, datacenter server racks, and managed PoE switches.",

        card4Badge: "<i class='fa-solid fa-fingerprint'></i> Biometrics & RFID",
        card4Title: "Access Control",
        card4Desc: "Facial recognition, turnstiles, RFID badges, and time attendance devices.",

        card5Badge: "<i class='fa-solid fa-house-signal'></i> iNELS & KNX",
        card5Title: "Smart Home & BMS",
        card5Desc: "Building management systems, lighting automation, and HVAC control.",

        card6Badge: "<i class='fa-solid fa-shield-cat'></i> Connected Alarm",
        card6Title: "Intrusion Alarm System",
        card6Desc: "Perimeter outdoor protection, dual tech sensors, and loud alarm sirens.",

        btnLearnMore: "Learn more <i class='fa-solid fa-arrow-right'></i>",

        aboutTag: "ABOUT EXCELLENCE SYSTÈME",
        aboutTitle: "Over 10 Years of Technical Expertise in Morocco",
        aboutDesc1: "Excellence Système is your trusted engineering and maintenance partner for low current, electronic security, IT networks, and home automation.",
        aboutDesc2: "We support large corporations, public institutions, hotels, and luxury private residences with 24/7 support.",
        aboutBenefit1Title: "Consulting & Prior Engineering Study",
        aboutBenefit1Desc: "Schematic analysis of architectural plans and regulatory compliance.",
        aboutBenefit2Title: "Certified Hardware Supply & Integration",
        aboutBenefit2Desc: "Rigorous deployment and configuration by certified technicians.",
        btnAboutMore: "Learn more about our company <i class='fa-solid fa-arrow-right'></i>",

        homeSectorsTag: "FIELDS OF INTERVENTION",
        homeSectorsTitle: "Solutions Tailored to Your Sector",
        homeSectorsSub: "Our engineers deploy custom electronic security and low current architectures suited to your industry.",
        sec1Title: "Hotels & Resorts",
        sec1Desc: "IP TV, High-Density Wi-Fi, Magnetic Card Locks & Background Sound Systems.",
        sec2Title: "Villas & Residences",
        sec2Desc: "iNELS Smart Home, connected alarm, video intercom & mobile access control.",
        sec3Title: "Corporate & Offices",
        sec3Desc: "Datacenter IT racks, 4K video surveillance, biometric attendance & IP telephony.",
        sec4Title: "Industry & Public Sector",
        sec4Desc: "Global SSI Fire Detection, BMS supervision, security turnstiles & gate automation.",
        btnDiscoverSector: "Explore offering <i class='fa-solid fa-chevron-right'></i>",

        ctaBannerTag: "LOW CURRENT OR SECURITY PROJECT?",
        ctaBannerTitle: "Ready to secure & automate your premises?",
        ctaBannerSub: "Our experts audit your blueprints and deliver a custom quote within 24h.",
        btnFreeQuote: "<i class='fa-solid fa-paper-plane'></i> Request a Free Quote",

        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Use",
        footerCookies: "Cookie Policy"
    }
};

/* Exhaustive Dictionary of Phrases (FR -> EN) across All Pages */
const PHRASE_DICT_FR_TO_EN = {
    "Accueil": "Home",
    "À propos": "About Us",
    "Nos activités": "Our Activities",
    "Nos services": "Our Services",
    "Solutions IT": "IT Solutions",
    "Nos réalisations": "Our Projects",
    "Nos marques": "Our Brands",
    "Contact": "Contact",
    "Demander un devis": "Request a Quote",
    "Demander un devis gratuit": "Request a Free Quote",
    "Demander un devis sur-mesure": "Request a Custom Quote",
    "Appeler": "Call Us",
    "Langue :": "Language:",
    "EXPERT EN COURANT FAIBLE & SÉCURITÉ ÉLECTRONIQUE": "LOW CURRENT & ELECTRONIC SECURITY EXPERT",
    "Intégrer des solutions IT à vos projets": "Integrate IT solutions into your projects",
    "Apporter de l'innovation à vos clients": "Bring innovation to your clients",
    "Plus de 11 ans d'expérience au Maroc dans le conseil, la fourniture, l'intégration et la maintenance de solutions de sécurité électronique, réseaux informatiques et domotique.": "Over 11 years of experience in Morocco in consulting, supply, integration, and maintenance of electronic security, IT networking, and home automation.",
    "Découvrir nos activités": "Explore Our Activities",
    "Projets & Solutions Déployés": "Deployed Projects & Solutions",
    "Clients Accompagnés au Maroc": "Satisfied Clients in Morocco",
    "Années d'Expérience": "Years of Experience",
    "Support Technique & Maintenance": "Technical Support & Maintenance",
    "POURQUOI NOUS CHOISIR ?": "WHY CHOOSE US?",
    "POURQUOI NOUS CHOISIR": "WHY CHOOSE US",
    "NOS ENGAGEMENTS": "OUR COMMITMENTS",
    "Découvrez ce qui fait la force et la réputation d'Excellence Système au Maroc.": "Discover what makes Excellence Système strong and reputable across Morocco.",
    "SUPPORT INÉGALÉ": "UNRIVALED SUPPORT",
    "Une assistance technique réactive et un service de maintenance disponible 24h/24 et 7j/7.": "Responsive technical assistance and maintenance service available 24/7.",
    "PRIX COMPÉTITIFS": "COMPETITIVE PRICES",
    "Le meilleur rapport qualité/prix garanti pour vos équipements et installations.": "Guaranteed best value for money for your equipment and installations.",
    "CONFIANCE ÉTABLIE": "ESTABLISHED TRUST",
    "Plus de 11 ans d'expérience au Maroc et des dizaines de projets d'envergure concrétisés.": "Over 11 years of experience in Morocco and dozens of major projects delivered.",
    "LIVRAISON ET INSTALLATION": "DELIVERY AND INSTALLATION",
    "Déploiement rapide, clé en main et rigoureusement conforme aux normes internationales.": "Fast turnkey deployment strictly compliant with international standards.",
    "Une Expertise Complète en Courant Faible": "Comprehensive Low Current Expertise",
    "De la phase d'étude à la maintenance préventive, découvrez pourquoi les leaders font confiance à Excellence Système.": "From blueprint analysis to preventive maintenance, discover why industry leaders trust Excellence Système.",
    "CONSEIL & ÉTUDE PRÉALABLE": "CONSULTING & ENGINEERING STUDY",
    "Audit technique personnalisé de vos plans, identification des contraintes et conception d'architectures sur-mesure.": "Tailored technical audit of your architectural blueprints, constraints identification, and custom architecture design.",
    "FOURNITURE DE MATÉRIEL CERTIFIÉ": "CERTIFIED HARDWARE SUPPLY",
    "Équipements professionnels aux normes internationales (CE, ISO, NF S.S.I.) issus des constructeurs leaders mondiaux.": "Professional-grade hardware compliant with international standards (CE, ISO, NF S.S.I.) from leading global manufacturers.",
    "SUPPORT & MAINTENANCE 24/7": "24/7 SUPPORT & MAINTENANCE",
    "Contrats d'astreinte sur-mesure, maintenance préventive et interventions d'urgence garanties sous 4 heures.": "Tailored SLA on-call contracts, preventive maintenance schedules, and guaranteed emergency response under 4 hours.",
    "RETOURS D'EXPÉRIENCE": "CLIENT REVIEWS",
    "AVIS CLIENTS": "CUSTOMER REVIEWS",
    "Note moyenne :": "Average rating:",
    "sur plus de 100 projets livrés au Maroc": "over 100+ projects delivered in Morocco",
    "avis vérifiés": "verified reviews",
    "Rédiger un avis client": "Write a client review",
    "Publier votre avis client": "Submit your client review",
    "Votre Note :": "Your Rating:",
    "Votre Nom & Prénom *": "Your Full Name *",
    "Votre Fonction / Établissement & Ville *": "Your Role / Organization & City *",
    "Rédigez votre avis sur nos services, installations et accompagnement...": "Write your review on our services, installations and technical support...",
    "Votre avis sera affiché au format carte du site.": "Your review will be displayed in the website card format.",
    "Publier mon avis": "Submit my review",
    "Annuler": "Cancel",
    "Client Vérifié": "Verified Client",
    "Nouveau": "New",
    "NOS DOMAINES D'EXPERTISE ÉPROUVÉS": "OUR PROVEN EXPERTISE",
    "Nos Activités Principales": "Our Main Activities",
    "Découvrez nos domaines d'intervention clés. Cliquez sur une carte pour consulter nos équipements et réalisations réelles.": "Discover our key intervention domains. Click a card to view specs and real projects.",
    "Explorer nos 11 activités intégrales": "Explore all 11 activities",
    "En savoir plus": "Learn more",
    "Certifié S.S.I.": "S.S.I. Certified",
    "Détection Incendie": "Fire Detection",
    "Centrales ECS/CMSI conventionnelles et adressables conformes aux normes ERP.": "Conventional & addressable fire panels compliant with safety standards.",
    "Ultra HD 4K": "Ultra HD 4K",
    "Vidéosurveillance IP": "IP CCTV Surveillance",
    "Caméras motorisées PTZ, reconnaissance de plaques LPR et serveurs NVR réseau.": "PTZ motorized cameras, LPR plate recognition, and network NVR servers.",
    "Cat6 / Cat7 / Fibre": "Cat6 / Cat7 / Fiber",
    "Réseau Informatique": "IT Networking",
    "Câblage structuré, baies de brassage serveur et switching PoE administrable.": "Structured cabling, datacenter server racks, and managed PoE switches.",
    "Biométrie & RFID": "Biometrics & RFID",
    "Contrôle d'Accès": "Access Control",
    "Reconnaissance faciale, tourniquets piétons, badges RFID et pointeuses horaires.": "Facial recognition, turnstiles, RFID badges, and time attendance devices.",
    "iNELS & KNX": "iNELS & KNX",
    "Domotique & GTB": "Smart Home & BMS",
    "Gestion technique des bâtiments, automatisation d'éclairage et régulation HVAC.": "Building management systems, lighting automation, and HVAC control.",
    "Alarme Connectée": "Connected Alarm",
    "Système Anti-intrusion": "Intrusion Alarm System",
    "Système Anti-intrusion & Alarmes": "Intrusion Alarm System & Detection",
    "Protection périmétrique extérieure, détecteurs double technologie et sirènes.": "Perimeter outdoor protection, dual tech sensors, and loud alarm sirens.",
    "Téléphonie IP": "IP Telephony",
    "Téléphonie IP & Standard PABX": "IP Telephony & PABX PBX",
    "Audiovisuel": "Audio & Visual",
    "Audiovisuel & Sonorisation": "Audiovisual & Sound Systems",
    "Motorisation portail": "Gate Automation",
    "Automations de Portails Coulissants": "Sliding Gate Automations",
    "Réseau optique": "Fiber Optic Network",
    "Réseaux Optiques & Fibre Optique": "Fiber Optics & Optical Networks",
    "Télédistribution": "Satellite & TV Distribution",
    "Télédistribution Collective & IPTV": "Collective TV Distribution & IPTV",
    "À PROPOS D'EXCELLENCE SYSTÈME": "ABOUT EXCELLENCE SYSTÈME",
    "À propos d'Excellence Système": "About Excellence Système",
    "Plus de 11 ans d'expertise technique au Maroc": "Over 11 Years of Technical Expertise in Morocco",
    "Excellence Système est votre partenaire de confiance spécialisé dans l'ingénierie, l'intégration et la maintenance des systèmes de courant faible, de sécurité électronique, de réseaux informatiques et de domotique.": "Excellence Système is your trusted engineering and maintenance partner for low current, electronic security, IT networks, and home automation.",
    "Nous accompagnons les entreprises grands comptes, les institutions publiques, le secteur hôtelier et les résidences privées en offrant des prestations complètes du conseil à la maintenance 24/7.": "We support large corporations, public institutions, hotels, and luxury private residences with 24/7 support.",
    "Conseil & Étude d'Ingénierie Préalable": "Consulting & Prior Engineering Study",
    "Analyse schématique de vos plans architecturaux et réglementaires.": "Schematic analysis of architectural plans and regulatory compliance.",
    "Fourniture de Matériel Certifié & Intégration": "Certified Hardware Supply & Integration",
    "Déploiement rigoureux et paramétrage par des techniciens qualifiés.": "Rigorous deployment and configuration by certified technicians.",
    "En savoir plus sur notre entreprise": "Learn more about our company",
    "Notre Mission": "Our Mission",
    "Apporter de la valeur ajoutée à chaque infrastructure grâce à des technologies éprouvées et un accompagnement de proximité.": "Delivering added value to every infrastructure through proven technologies and close client partnership.",
    "Nos Valeurs": "Our Core Values",
    "Rigueur, innovation continue, transparence et satisfaction totale de nos partenaires et clients.": "Rigorous standards, continuous innovation, total transparency, and unwavering partner satisfaction.",
    "Notre Équipe": "Our Team",
    "Des techniciens et ingénieurs certifiés par les plus grands constructeurs mondiaux.": "Engineers and technicians certified by the world's premier equipment manufacturers.",
    "CHAMPS D'INTERVENTION": "FIELDS OF INTERVENTION",
    "Solutions Adaptées à Votre Secteur": "Solutions Tailored to Your Sector",
    "Nos ingénieurs déploient des architectures de sécurité électronique et courant faible taillées pour vos besoins métiers.": "Our engineers deploy custom electronic security and low current architectures suited to your industry.",
    "Hôtellerie & Resorts": "Hotels & Resorts",
    "Télédistribution IP TV, Wi-Fi très haute densité, serrures à cartes magnétiques & sonorisation d'ambiance.": "IP TV, High-Density Wi-Fi, Magnetic Card Locks & Background Sound Systems.",
    "Villas & Résidences": "Villas & Residences",
    "Domotique iNELS, alarme anti-intrusion connectée, visiophonie et contrôle d'accès sur smartphone.": "iNELS Smart Home, connected alarm, video intercom & mobile access control.",
    "Entreprises & Tertiaire": "Corporate & Offices",
    "Baies informatiques Datacenter, vidéoprotection 4K, pointage horaire biométrique & téléphonie IP.": "Datacenter IT racks, 4K video surveillance, biometric attendance & IP telephony.",
    "Industrie & Administrations": "Industry & Public Sector",
    "Détection incendie SSI globale, supervision GTB/GTC, tourniquets de sécurité et motorisation de barrières.": "Global SSI Fire Detection, BMS supervision, security turnstiles & gate automation.",
    "Découvrir l'offre": "Explore offering",
    "PROJET COURANT FAIBLE OU SÉCURITÉ ?": "LOW CURRENT OR SECURITY PROJECT?",
    "Prêt à sécuriser & automatiser vos infrastructures ?": "Ready to secure & automate your premises?",
    "Nos experts réalisent une étude de vos plans et un devis sur-mesure sous 24h.": "Our experts audit your blueprints and deliver a custom quote within 24h.",
    "Demander un Devis Gratuit": "Request a Free Quote",
    "Contactez notre équipe": "Contact Our Team",
    "Contactez Nos Ingénieurs": "Contact Our Engineers",
    "Nous sommes à votre disposition pour étudier tous vos projets de sécurité, réseau et automatisme.": "We are at your disposal to analyze all your security, network, and automation projects.",
    "Envoyez-nous un message": "Send Us a Message",
    "Objet de votre demande": "Subject of Your Request",
    "Votre message": "Your Message",
    "Envoyer le message": "Send Message",
    "Notre Adresse": "Our Address",
    "Horaires d'ouverture": "Business Hours",
    "Lundi au Vendredi : 8h30 - 18h30": "Monday to Friday: 8:30 AM - 6:30 PM",
    "Samedi : 9h00 - 13h00": "Saturday: 9:00 AM - 1:00 PM",
    "Support d'urgence 24h/24 et 7j/7": "Emergency support 24/7",
    "Discutons de votre prochain projet": "Let's Discuss Your Next Project",
    "Discutons de Votre Projet en Sécurité & Courant Faible": "Let's Discuss Your Security & Low Current Project",
    "Vous avez un projet de sécurité ou réseau à réaliser ?": "Do you have a security or networking project to build?",
    "Politique de Confidentialité": "Privacy Policy",
    "Conditions d'Utilisation": "Terms of Use",
    "Conditions Générales d'Utilisation": "General Terms of Use",
    "Politique des Cookies": "Cookie Policy",
    "Politique relative aux Cookies": "Cookie Policy",
    "Tous droits réservés.": "All rights reserved.",
    "Votre partenaire de confiance en courant faible et sécurité électronique": "Your trusted partner in low current and electronic security",
    "NOS MARQUES & PARTENAIRES": "OUR BRANDS & PARTNERS",
    "Nos Marques & Partenaires Officiels": "Our Official Brands & Partners",
    "Toutes les marques": "All Brands",
    "Constructeurs leaders mondiaux partenaires d'Excellence Système.": "World-leading manufacturers partnering with Excellence Système.",
    "Nos Réalisations & Projets Déployés": "Our Projects & Deployed Systems",
    "Hôpitaux & Cliniques": "Hospitals & Clinics",
    "Industrie & Usines": "Industry & Factories",
    "Administrations Publiques": "Public Administrations",
    "Universités & Écoles": "Universities & Schools",
    "Villas & Riads Privés": "Private Villas & Riads",
    "Sécurité Incendie S.S.I. & Appel Malade CHU": "SSI Fire Safety & Smart Nurse Call CHU",
    "Contrôle d'Accès Biométrique & Barrières Usine": "Biometric Access Control & Factory Barriers",
    "Supervision GTB & Câblage VDI Administrations": "BMS Supervision & VDI Cabling Administrations",
    "Wi-Fi Haute Densité & Fibre Optique Campus": "High-Density Wi-Fi & Campus Fiber Optics",
    "Domotique Smart Home & Alarme Riad & Villa": "Smart Home Automation & Alarm for Riad & Villa",
    "Détection Adressable Type 1": "Type 1 Addressable Detection",
    "Détection Conventionnelle": "Conventional Detection",
    "Asservissement & CMSI": "CMSI Safety Automation",
    "Plans d'Évacuation Réglementaires": "Regulatory Evacuation Plans",
    "Caméras Réseau IP & Enregistreurs NVR": "Network IP Cameras & NVR Recorders",
    "Analyse Vidéo Intelligente IA": "AI Smart Video Analytics",
    "Caméras IP 4K & Vision Nocturne": "4K IP Cameras & Night Vision",
    "Postes de Supervision & NVR": "Supervision Stations & NVR",
    "Câblage Cuivre Cat 6 / Cat 6A / Cat 7": "Copper Cabling Cat 6 / 6A / 7",
    "Baies & Équipements Courant Faible": "Server Racks & Low Current Gear",
    "Switching PoE & Routage IP": "PoE Switching & IP Routing",
    "Datacenters & Salles Serveur": "Datacenters & Server Rooms",
    "Lecteurs Biométriques & Badges RFID": "Biometric Readers & RFID Badges",
    "Tourniquets & Obstacles Physiques": "Turnstiles & Speed Gates",
    "Pointeuses Horaires & Gestion du Personnel": "Time Attendance & Staff Management",
    "Logiciel de Gestion & Historique des Accès": "Access Management Software & History",
    "Pilotage Centralisé Éclairage & Volets": "Centralized Lighting & Shutter Control",
    "Gestion Technique du Bâtiment (GTB)": "Building Management Systems (BMS)",
    "Interface Tactile & Application Mobile": "Touch Interface & Mobile App",
    "Économies d'Énergie & Supervision": "Energy Efficiency & Monitoring",
    "Centrales d'Alarme Intelligentes & Détecteurs": "Smart Alarm Panels & Detectors",
    "Détection Périmétrique Extérieure": "Outdoor Perimeter Detection",
    "Alerte Instantanée & Télésurveillance": "Instant Alert & Remote Monitoring",
    "Centrale Alarme GSM / IP": "GSM / IP Alarm Panel",
    "Autocommutateurs IPBX / PABX": "IPBX / PABX Phone Switches",
    "Postes Téléphoniques IP & DECT": "IP & DECT Phones",
    "Solutions de Téléphonie Unifiée": "Unified Communications Solutions",
    "Réduction des Coûts Télécoms": "Telecom Cost Reduction",
    "Ingénierie Audiovisuelle pour Salles de Réunion": "Audiovisual Engineering for Meeting Rooms",
    "Systèmes de Visioconférence HD": "HD Video Conferencing Systems",
    "Sonorisation Ambiance & Ligne 100V": "100V Background & PA Sound",
    "Murs d'Images & Écrans d'Affichage Dynamique": "Video Walls & Digital Signage",
    "Moteurs de Portail Coulissant, Battant & Barrières": "Sliding, Swing Gate Motors & Barriers",
    "Barrières Automatiques de Parking": "Automatic Parking Barriers",
    "Portes de Garage Sectionnelles": "Sectional Garage Doors",
    "Gestion Intelligente du Parking": "Smart Parking Management",
    "Soudures Fibre Optique & Tiroirs de Brassage": "Fiber Optic Splicing & Patch Panels",
    "Liaisons Fibre Monomode & Multimode": "Single-mode & Multi-mode Fiber Links",
    "Tests & Rapport Réflectométrique OTDR": "OTDR Testing & Certification Reports",
    "Coffrets & Tiroirs Optiques de Rue": "Street Optical Enclosures & Cabinets",
    "Distribution TV sur Réseau Coaxial & IP": "Coaxial & IP TV Distribution",
    "Solutions IPTV & Canaux Hôteliers": "IPTV Solutions & Hotel Channels",
    "Antennes Collectives Satellite & TNT": "Collective Satellite & TNT Antennas",
    "Distribution TV Haute Définition & Canaux Interne": "HD TV Distribution & Internal Channels",
    "Solutions Hôtelières Clé en Main": "Turnkey Hospitality Solutions",
    "Solutions Riad & Villa de Prestige": "Luxury Riad & Villa Solutions",
    "Solutions Innovantes & Smart Building": "Innovative Solutions & Smart Building",
    "Architecture Système & Équipements Déployés": "System Architecture & Deployed Hardware",
    "Bénéfices pour les Établissements Hôteliers": "Benefits for Hospitality Establishments",
    "Bénéfices pour les Propriétaires de Villas": "Benefits for Villa Owners",
    "Pourquoi Choisir nos Solutions Innovantes": "Why Choose Our Innovative Solutions",
    "Votre nom complet": "Your Full Name",
    "Votre email": "Your Email Address",
    "Votre numéro de téléphone": "Your Phone Number",
    "Ville / Région": "City / Region",
    "Sélectionnez un service": "Select a Service",
    "Description de votre projet": "Project Description",
    "Envoyer ma demande": "Submit Request",
    "Recherche...": "Search...",
    "Marrakech, Maroc": "Marrakech, Morocco",
    "Agadir, Maroc": "Agadir, Morocco",
    "Tanger, Maroc": "Tangier, Morocco",
    "Casablanca, Maroc": "Casablanca, Morocco",
    "Rabat, Maroc": "Rabat, Morocco",
    "PROJET COURANT FAIBLE OU SÉCURITÉ": "LOW CURRENT OR SECURITY PROJECT",
    "Prêt à sécuriser & automatiser vos infrastructures": "Ready to secure & automate your premises",
    "Vous avez un projet de sécurité ou réseau à réaliser": "Do you have a security or networking project to build",
    "Solutions Hôtelière": "Hospitality Solutions",
    "Solutions Riad & Villa": "Riad & Villa Solutions",
    "Solutions Innovantes": "Innovative Solutions",
    "Hôpitaux": "Hospitals & Clinics",
    "Usines": "Industrial Plants",
    "Administrations": "Public Administrations",
    "Universités": "Universities & Schools",
    "Riad & Villa": "Riad & Luxury Villa",
    "Entreprises & Bureaux": "Offices & Enterprises",
    "Administrations & Industrie": "Administrations & Industry",
    "Détection incendie": "Fire Detection",
    "Anti-intrusion": "Intrusion Alarm",
    "Système Alarme Anti-Intrusion": "Intruder Alarm System",
    "Réseau informatique": "IT Network Infrastructure",
    "Contrôle d'accès": "Access Control",
    "Motorisation Portail & Garage": "Gate & Garage Automation",
    "Réseau Optique & Fibre": "Fiber Optic Network",
    "Télédistribution & IPTV": "IPTV & TV Distribution",
    "Motorisation portails coulissants, battants, barrières levantes et portes sectionnelles.": "Sliding and swing gate motors, automatic boom barriers, and sectional garage doors.",
    "NOS DOMAINES D'APPLICATION": "OUR APPLICATION DOMAINS",
    "Solutions IT Clé en Main": "Turnkey IT & Low Voltage Solutions",
    "Des réponses technologiques adaptées à chaque secteur d'activité.": "Targeted technological solutions tailored to every business vertical.",
    "Vidéosurveillance IP, contrôle d'accès chambres par serrure connectée, sonorisation multizone et Wi-Fi haute densité pour resorts et boutique-hôtels.": "IP surveillance, connected room locks, multi-zone sound distribution, and high-density Wi-Fi for resorts and boutique hotels.",
    "Domotique sans fil et filaire (iNELS), alarme périmétrique connectée, interphonie vidéo et motorisation discrète pour résidences d'exception.": "Wireless and wired smart home (iNELS), perimeter alarms, IP video intercoms, and silent automated gates for private luxury villas.",
    "Systèmes d'extinction automatique par gaz, caméras thermiques industrielles, détection d'intrusion par faisceaux laser et réseaux fibre longue portée.": "Automatic gas fire suppression, industrial thermal cameras, laser perimeter detection, and long-range fiber optics.",
    "RÉALISATIONS": "PROJECTS & REFERENCES",
    "Nos Références au Maroc": "Our Reference Projects in Morocco",
    "Découvrez quelques-uns de nos projets récents livrés à travers le Royaume.": "Discover selected recent installations delivered across the Kingdom of Morocco.",
    "Tous": "All",
    "Voir tous les projets": "View all projects",
    "PARTENAIRES DE CONFIANCE": "TRUSTED PARTNERS",
    "CONSTRUCTEURS CERTIFIÉS": "CERTIFIED MANUFACTURERS",
    "Constructeurs & Équipementiers Leaders Mondiaux": "World-Leading Manufacturers & Hardware Brands",
    "Excellence Système s'associe aux plus grandes marques internationales pour garantir à vos installations une fiabilité à toute épreuve.": "Excellence Système partners with the world's most prestigious hardware manufacturers to guarantee unwavering reliability.",
    "Voir toutes nos marques partenaires": "View all partner brands",
    "PARLONS DE VOTRE PROJET": "LET'S TALK ABOUT YOUR PROJECT",
    "Prêt à moderniser vos infrastructures de sécurité et réseaux ?": "Ready to upgrade your security and network infrastructure?",
    "Nos ingénieurs vous accompagnent de l'étude préliminaire jusqu'à la mise en service et la maintenance.": "Our certified engineers assist you from initial feasibility studies through installation, commissioning, and maintenance.",
    "Demander une étude gratuite": "Request a Free Study",
    "Appelez notre équipe": "Call Our Team",
    "Discuter sur WhatsApp": "Chat on WhatsApp",
    "Votre partenaire de confiance en courant faible et sécurité électronique au Maroc. Plus de 11 ans d'expertise à votre service.": "Your trusted partner in low current engineering and electronic security across Morocco. Over 11 years of dedicated expertise.",
    "Navigation": "Navigation",
    "Nos Activités": "Our Activities",
    "Sécurité Électronique": "Electronic Security",
    "Automatisme": "Automation Systems",
    "Gestion Technique (GTB/GTC)": "Building Management (BMS)",
    "Réseaux Informatiques & Fibre": "IT Networks & Fiber Optics",
    "Contact rapide": "Quick Contact",
    "Téléphone :": "Phone:",
    "Email :": "Email:",
    "Administration": "Administration",
    "Obtenir une estimation sur-mesure": "Get a Custom Estimate",
    "Nom & Prénom *": "Full Name *",
    "Votre nom et prénom": "Your full name",
    "Email *": "Email Address *",
    "Téléphone *": "Phone Number *",
    "Fermer": "Close",
    "À propos de nous": "About Us",
    "Notre Histoire & Vision": "Our History & Vision",
    "Depuis sa création, Excellence Système s'est imposée comme une référence incontournable de l'ingénierie en courant faible et des technologies de sécurité au Maroc.": "Since its inception, Excellence Système has established itself as a benchmark in low-current engineering and security technologies across Morocco.",
    "RETROURS D'EXPÉRIENCE": "CLIENT REVIEWS",
    "Client Vérifié — Nouveau": "Verified Client — New",
    "Client Vérifié — Avis publié": "Verified Client — Published",
    "Client Vérifié — Marrakech": "Verified Client — Marrakech",
    "Client Vérifié — Casablanca": "Verified Client — Casablanca",
    "Client Vérifié — Agadir": "Verified Client — Agadir",
    "Client Vérifié — Tanger": "Verified Client — Tangier",
    "Avis précédent": "Previous review",
    "Avis suivant": "Next review",
    "Language:": "Language:",
    "Call Us": "Call Us",
    "WhatsApp": "WhatsApp",
    "En savoir plus ": "Learn More ",
    "Voir sur Google Maps": "View on Google Maps",
    "Contact & Devis": "Contact & Quote",
    "Solutions de Prestige Riad & Villa": "Luxury Riad & Villa Solutions",
    "Solutions Innovantes Smart Building": "Innovative Smart Building Solutions",
    "Nos Marques & Partenaires": "Our Brands & Partners",
    "Nos Prestations & Services": "Our Services & Offerings",
    "Casablanca, Marrakech, Agadir, Tanger...": "Casablanca, Marrakech, Agadir, Tangier...",
    "Usine / Site industriel": "Factory / Industrial Site",
    "Commerce / Magasin / Galerie": "Retail / Store / Mall",
    "Administration publique": "Public Administration",
    "Demander mon devis gratuit": "Request My Free Quote",
    "Marques & Constructeurs Officiels": "Official Brands & Manufacturers",
    "EXCELLENCE SYSTEME": "EXCELLENCE SYSTÃME",
    "+11 ANS": "+11 YEARS",
    "au Maroc": "in Morocco",
    "Accompagnement et support professionnel 24/7": "Professional Guidance & 24/7 Support",
    "Automatisme & Domotique": "Automation & Smart Home",
    "Baies & Armoires": "Racks & Cabinets",
    "Discutons de Votre Projet en": "Let's Discuss Your Project in",
    "Devis Express 24h": "Express 24h Quote",
    "Support Astreinte 24/7": "24/7 On-Call Support",
    "Couverture Nationale Maroc": "National Coverage Morocco",
    "Ligne Directe & Assistance": "Direct Line & Assistance",
    "Adresses Email Professionnelles": "Professional Email Addresses",
    "Implantation Marrakech": "Marrakech Office",
    "Implantation Agadir": "Agadir Office",
    "Horaires d'Ouverture": "Opening Hours",
    "Support Technique 24h/24 & 7j/7 pour clients": "24/7 Technical Support for contracted clients",
    "Discuter directement sur WhatsApp": "Chat directly on WhatsApp",
    "DEVIS GRATUIT & RAPIDE": "FREE & FAST QUOTE",
    "Nom de votre entreprise": "Your company name",
    "Domotique & Gestion GTB": "Smart Home & BMS",
    "Motorisation & Portails": "Gate Automation & Barriers",
    "Audit & Conseil global": "Comprehensive Audit & Consulting",
    "Message ou description de votre besoin *": "Message or description of your requirements *",
    "Nos Domaines d'Expertise Technique": "Our Technical Domains of Expertise",
    "ANTI-INTRUSION": "INTRUSION ALARM",
    "AUDIOVISUEL": "AUDIOVISUAL",
    "DOMOTIQUE": "SMART HOME",
    "FIBRE OPTIQUE": "FIBER OPTICS",
    "Vision Nocturne IR": "IR Night Vision",
    "Analyse IA & LPR": "AI & LPR Analytics",
    "Baies Server": "Server Racks",
    "Wi-Fi 6 Pro": "Enterprise Wi-Fi 6",
    "Autres Domaines d'Expertise Technique": "Other Technical Domains of Expertise",
    "Domotique & Supervision GTB": "Smart Home & BMS Supervision",
    "Monomode / Multimode": "Singlemode / Multimode",
    "IPBX & VoIP Cloud": "IPBX & Cloud VoIP",
    "IPTV & TNT HD": "IPTV & HD Terrestrial",
    "Automatisme BFT & CAME": "BFT & CAME Automation",
    "Tous les projets": "All Projects"
};

function getPhraseTranslation(rawText) {
    if (!rawText) return null;
    const trimmed = rawText.trim();
    if (!trimmed) return null;

    // 1. Direct match
    if (PHRASE_DICT_FR_TO_EN[trimmed]) {
        return PHRASE_DICT_FR_TO_EN[trimmed];
    }

    // 2. Normalized punctuation match (strip trailing ?, ., !, :)
    const clean = trimmed.replace(/[?!.:]+$/, '').trim();
    if (PHRASE_DICT_FR_TO_EN[clean]) {
        let res = PHRASE_DICT_FR_TO_EN[clean];
        if (trimmed.endsWith('?') || trimmed.endsWith(' ?')) {
            res += '?';
        } else if (trimmed.endsWith(':')) {
            res += ':';
        }
        return res;
    }

    // 3. Case-insensitive / whitespace-normalized lookup
    const lower = trimmed.toLowerCase();
    for (const k in PHRASE_DICT_FR_TO_EN) {
        if (k.toLowerCase() === lower) {
            return PHRASE_DICT_FR_TO_EN[k];
        }
    }

    return null;
}

function applyUniversalTranslations(lang) {
    const isEn = lang === 'en';

    // 1. Elements with [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!el._origFrContent) {
            el._origFrContent = el.innerHTML.trim();
        }
        if (isEn && translations.en && translations.en[key]) {
            el.innerHTML = translations.en[key];
        } else {
            if (el._origFrContent) {
                el.innerHTML = el._origFrContent;
            }
        }
    });

    // 2. Elements with [data-i18n-placeholder]
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!el._origFrPlaceholder) {
            el._origFrPlaceholder = el.placeholder.trim();
        }
        if (isEn && translations.en && translations.en[key]) {
            el.placeholder = translations.en[key];
        } else {
            if (el._origFrPlaceholder) {
                el.placeholder = el._origFrPlaceholder;
            }
        }
    });

    // 3. Dictionary-based phrase translation for general elements
    const elementsToTranslate = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, .btn, button, .section-tag span, .hero-badge span, ' +
        '.badge, .card-badge, .card-title, .solution-title, .solution-desc, .card-description, ' +
        '.card-features span, .card-mini-tag, .form-label, label, .footer-heading, ' +
        '.footer-links a, .breadcrumbs a, .breadcrumbs span, .circle-badge-label, ' +
        '.quick-badge-item span, .support-24-badge, .info-links a, .card-address-text, ' +
        '.faq-question, .faq-answer, .why-title, .why-desc, .benefit-content h4, .benefit-content p, ' +
        '.modal-container h3, .solution-modal-title, .solution-modal-desc, .brands-title-with-line'
    );

    elementsToTranslate.forEach(el => {
        if (el.closest('script, style, canvas') || el.hasAttribute('data-no-translate') || el.hasAttribute('data-i18n')) return;

        // Protect icon-only circular buttons: do NOT replace their innerHTML with text
        if (el.classList.contains('floating-btn') || (el.closest('.floating-btn') && !el.classList.contains('floating-tooltip'))) {
            if (el.classList.contains('floating-btn')) {
                const tooltip = el.querySelector('.floating-tooltip');
                if (tooltip) {
                    if (!tooltip._origFrText) tooltip._origFrText = tooltip.textContent.trim();
                    if (isEn) {
                        const tr = getPhraseTranslation(tooltip._origFrText);
                        if (tr) tooltip.textContent = tr;
                        el.setAttribute('aria-label', tr || 'Request a Quote');
                    } else {
                        tooltip.textContent = tooltip._origFrText;
                        el.setAttribute('aria-label', tooltip._origFrText || 'Demander un devis');
                    }
                }
            }
            return;
        }

        if (el.classList.contains('circle-icon-btn') || el.classList.contains('social-btn') || el.classList.contains('hero-slideshow-nav') || el.classList.contains('scroll-top-btn')) {
            return;
        }

        if (!el._origFrHtml) {
            el._origFrHtml = el.innerHTML.trim();
        }
        if (!el._origFrText) {
            el._origFrText = el.textContent.trim();
        }

        if (isEn) {
            const raw = el._origFrHtml;
            const textOnly = el._origFrText;
            const transRaw = getPhraseTranslation(raw);
            if (transRaw) {
                el.innerHTML = transRaw;
            } else {
                const transText = getPhraseTranslation(textOnly);
                if (transText) {
                    const icon = el.querySelector('i');
                    if (icon) {
                        el.innerHTML = `${icon.outerHTML} <span>${transText}</span>`;
                    } else {
                        el.textContent = transText;
                    }
                }
            }
        } else {
            if (el._origFrHtml) {
                el.innerHTML = el._origFrHtml;
            }
        }
    });

    // 4. Form placeholders translation
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        if (!input._origFrPlaceholder) {
            input._origFrPlaceholder = input.placeholder.trim();
        }
        if (isEn) {
            const transPl = getPhraseTranslation(input._origFrPlaceholder);
            if (transPl) {
                input.placeholder = transPl;
            }
        } else {
            if (input._origFrPlaceholder) {
                input.placeholder = input._origFrPlaceholder;
            }
        }
    });

    // 5. Select dropdown options translation
    document.querySelectorAll('select option').forEach(opt => {
        if (!opt._origFrText) {
            opt._origFrText = opt.textContent.trim();
        }
        if (isEn) {
            const transOpt = getPhraseTranslation(opt._origFrText);
            if (transOpt) {
                opt.textContent = transOpt;
            }
        } else {
            if (opt._origFrText) {
                opt.textContent = opt._origFrText;
            }
        }
    });

    // 6. Sync Review cards and dynamic components
    if (window.ExSysReviews && window.ExSysReviews.init) {
        window.ExSysReviews.init();
    }
}

function initLanguageSwitcher() {
    const isDocEn = document.documentElement.getAttribute('lang') === 'en';

    function setLanguage(lang) {
        if (lang !== 'en' && lang !== 'fr') lang = 'fr';

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl-mode');

        // Update all header & drawer language buttons
        document.querySelectorAll('.lang-btn, .drawer-lang-btn').forEach(b => {
            const text = b.textContent.trim().toLowerCase();
            const btnLang = b.getAttribute('data-lang') || (text.includes('en') ? 'en' : 'fr');
            b.classList.toggle('active', btnLang === lang);
        });

        // Apply complete universal translations to all DOM elements
        applyUniversalTranslations(lang);

        // Ensure nav-links with nav-icon get their icons maintained
        ensureNavIcons();
    }

    // Clean up any remaining Arabic buttons from DOM
    document.querySelectorAll('.lang-btn[data-lang="ar"], .drawer-lang-btn[data-lang="ar"]').forEach(el => el.remove());

    // Attach click listeners to all language buttons and links
    document.querySelectorAll('.lang-btn, .drawer-lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.textContent.trim().toLowerCase();
            const btnLang = btn.getAttribute('data-lang') || (text.includes('en') ? 'en' : 'fr');
            try {
                localStorage.setItem('preferredLang', btnLang);
            } catch (err) { }

            // If it's a link to dedicated page (e.g. privacy-policy.html <-> politique-confidentialite.html), let browser navigate
            if (btn.tagName.toLowerCase() === 'a') {
                return;
            }

            e.preventDefault();
            setLanguage(btnLang);
        });
    });

    try {
        let savedLang = localStorage.getItem('preferredLang');
        if (savedLang === 'ar') {
            savedLang = 'fr';
            localStorage.setItem('preferredLang', 'fr');
        }

        if (isDocEn) {
            setLanguage('en');
            localStorage.setItem('preferredLang', 'en');
        } else if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
            setLanguage(savedLang);
        } else {
            setLanguage('fr');
        }
    } catch (e) {
        setLanguage(isDocEn ? 'en' : 'fr');
    }
}


/* 12. Brand Cards Staggered Reveal Animation & Filtering */
function initBrandAnimations() {
    const brandCards = document.querySelectorAll('.brand-card');
    if (brandCards.length === 0) return;

    // IntersectionObserver for staggered entrance animation
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-animated');
                }, (index % 6) * 70); // Staggered delay of 70ms per item
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    brandCards.forEach(card => observer.observe(card));

    // Brand Category Filtering Tabs (if present)
    const brandTabs = document.querySelectorAll('.brand-tab-btn');
    if (brandTabs.length > 0) {
        brandTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                brandTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.getAttribute('data-category');

                brandCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || !cardCategory || category === cardCategory) {
                        card.style.display = 'flex';
                        setTimeout(() => card.classList.add('reveal-animated'), 50);
                    } else {
                        card.classList.remove('reveal-animated');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

/* 13. Interactive About Image Gallery Showcase with Automatic Cycling */
function initAboutTabbedVisual() {
    const items = document.querySelectorAll('.about-thumb-item, .about-tab-btn');
    const mainImg = document.getElementById('aboutMainFeaturedImg');
    const mainCaption = document.getElementById('aboutMainCaptionText');

    if (!items.length || !mainImg) return;

    let currentIndex = 0;
    let timer = null;

    function activateIndex(index) {
        currentIndex = (index + items.length) % items.length;
        const item = items[currentIndex];

        items.forEach(t => t.classList.remove('active'));
        item.classList.add('active');

        const newSrc = item.getAttribute('data-img');
        const newCaption = item.getAttribute('data-caption');

        mainImg.style.opacity = '0';
        setTimeout(() => {
            if (newSrc) mainImg.src = newSrc;
            if (mainCaption && newCaption) {
                mainCaption.innerHTML = `<i class="fa-solid fa-compass-drafting" style="color: var(--primary-turquoise);"></i> ${newCaption}`;
            }
            mainImg.style.opacity = '1';
        }, 180);
    }

    function startAutoPlay() {
        stopAutoPlay();
        timer = setInterval(() => {
            activateIndex(currentIndex + 1);
        }, 3500);
    }

    function stopAutoPlay() {
        if (timer) clearInterval(timer);
    }

    items.forEach((item, idx) => {
        item.addEventListener('click', () => {
            activateIndex(idx);
            startAutoPlay();
        });

        item.addEventListener('mouseenter', () => {
            activateIndex(idx);
            stopAutoPlay();
        });

        item.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    });

    const showcaseWrapper = document.querySelector('.about-image-column');
    if (showcaseWrapper) {
        showcaseWrapper.addEventListener('mouseenter', stopAutoPlay);
        showcaseWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
}

/* 13b. Interactive About Image Slider (Fallback) */
function initAboutSlider() {
    const sliders = document.querySelectorAll('.about-slider-wrapper');
    if (!sliders.length) return;

    sliders.forEach(wrapper => {
        const slides = wrapper.querySelectorAll('.about-slide');
        const dots = wrapper.querySelectorAll('.dot');
        const prevBtn = wrapper.querySelector('.about-slider-btn.prev');
        const nextBtn = wrapper.querySelector('.about-slider-btn.next');
        let currentIndex = 0;
        let timer = null;

        if (!slides.length) return;

        function goToSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            currentIndex = (index + slides.length) % slides.length;
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        function startAutoPlay() {
            stopAutoPlay();
            timer = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4500);
        }

        function stopAutoPlay() {
            if (timer) clearInterval(timer);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                startAutoPlay();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                goToSlide(idx);
                startAutoPlay();
            });
        });

        wrapper.addEventListener('mouseenter', stopAutoPlay);
        wrapper.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay();
    });
}

/* 14. Automatic Hero Background & Visual Image Slideshow */
function initHeroImageSlideshow() {
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const fgImages = document.querySelectorAll('.hero-slideshow-img');
    const dots = document.querySelectorAll('.hero-slideshow-dots .dot');
    const prevBtn = document.querySelector('.hero-slideshow-nav.prev');
    const nextBtn = document.querySelector('.hero-slideshow-nav.next');

    const total = fgImages.length || bgSlides.length;
    if (total < 2) return;

    let currentIndex = 0;
    let timer = null;

    function goToSlide(index) {
        if (bgSlides.length) {
            bgSlides[currentIndex]?.classList.remove('active');
            bgSlides[index]?.classList.add('active');
        }
        if (fgImages.length) {
            fgImages[currentIndex]?.classList.remove('active');
            fgImages[index]?.classList.add('active');
        }
        if (dots.length) {
            dots[currentIndex]?.classList.remove('active');
            dots[index]?.classList.add('active');
        }
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % total;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + total) % total;
        goToSlide(prevIndex);
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(nextSlide, 3500);
    }

    function stopTimer() {
        if (timer) clearInterval(timer);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startTimer();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            startTimer();
        });
    });

    startTimer();
}

/* 15. Activity Brands 3D Tilt Effect */
function initActivityBrandsTilt() {
    const cards = document.querySelectorAll('.activity-brand-card, .home-brand-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / (rect.height / 2)) * -14;
            const tiltY = (x / (rect.width / 2)) * 14;

            card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-12px) scale(1.08)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* 16. FAQ Accordion Toggle */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');

        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const ic = i.querySelector('.faq-icon i');
                    if (ic) {
                        ic.className = 'fa-solid fa-plus';
                    }
                });

                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.faq-icon i');
                    if (icon) {
                        icon.className = 'fa-solid fa-minus';
                    }
                }
            });
        }
    });
}

/* 17. Persistent Customer Reviews System with Smooth Horizontal Carousel */
const ExSysReviewsManager = (function() {
    const STORAGE_KEY = 'exsys_customer_reviews_v2';

    const DEFAULT_REVIEWS = [
        {
            id: 'rev_seed_1',
            name: 'M. REDA EL AMRANI',
            role: 'Hôtel Riad (Marrakech)',
            roleEn: 'Riad Hotel (Marrakech)',
            roleAr: 'فندق رياض (مراكش)',
            comment: "Un accompagnement d'exception pour la refonte de notre sécurité incendie SSI et l'installation de la vidéosurveillance IP. Réactivité et professionnalisme au top !",
            commentEn: "Exceptional support for upgrading our SSI fire safety and IP CCTV installation. Outstanding responsiveness and professionalism!",
            commentAr: "مواكبة استثنائية لتجديد نظام السلامة من الحرائق وتركيب المراقبة بالفيديو عبر بروتوكول الإنترنت. استجابة واحترافية عالية المستوى!",
            rating: 5,
            city: 'Marrakech',
            date: '14 Oct 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_2',
            name: 'MME. SALMA BENJELLOUN',
            role: 'Clinique Privée (Casablanca)',
            roleEn: 'Private Clinic (Casablanca)',
            roleAr: 'عيادة خاصة (الدار البيضاء)',
            comment: "Excellence Système a déployé nos baies informatiques Datacenter et nos contrôles d'accès biométriques. Équipe très qualifiée et support 24/7 super efficace.",
            commentEn: "Excellence Système deployed our Datacenter server racks and biometric access control. Highly qualified team and super efficient 24/7 support.",
            commentAr: "قامت إكسلنس سيستم بنشر خزائن مركز البيانات الخاصة بنا وأنظمة التحكم البيومتري في الوصول. فريق مؤهل للغاية ودعم تقني فعال على مدار الساعة.",
            rating: 5,
            city: 'Casablanca',
            date: '28 Sep 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_3',
            name: 'M. KARIM TAZI',
            role: 'Domaine & Villa (Agadir)',
            roleEn: 'Estate & Villa (Agadir)',
            roleAr: 'ضيعة وفيلا (أكادير)',
            comment: "Installation domotique iNELS remarquable. Contrôle d'éclairage et alarme anti-intrusion entièrement centralisés sur smartphone. Finition haut de gamme.",
            commentEn: "Remarkable iNELS smart home installation. Lighting control and intrusion alarm fully centralized on smartphone. Premium finish.",
            commentAr: "تركيب نظام المنازل الذكية iNELS رائع للغاية. تم دمج التحكم في الإضاءة وإنذار كشف التسلل بالكامل على الهاتف الذكي. تشطيبات فاخرة وعالية الدقة.",
            rating: 5,
            city: 'Agadir',
            date: '12 Sep 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_4',
            name: 'M. YOUSSEF BERRADA',
            role: 'Zone Industrielle (Tanger)',
            roleEn: 'Industrial Zone (Tangier)',
            roleAr: 'منطقة صناعية (طنجة)',
            comment: "Mise en place d'un réseau fibre optique structuré et de caméras thermiques PTZ. Travail rapide, matériel 100% certifié et devis compétitif.",
            commentEn: "Structured fiber optic deployment and PTZ thermal cameras. Fast work, 100% certified hardware and competitive quote.",
            commentAr: "إنشاء شبكة ألياف بصرية هيكلية وكاميرات حرارية متحركة PTZ. عمل سريع ومعدات معتمدة بنسبة 100% وأسعار تنافسية.",
            rating: 5,
            city: 'Tanger',
            date: '03 Sep 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_5',
            name: 'MME. HIND CHRAIBI',
            role: 'Groupe Scolaire Privé (Rabat)',
            roleEn: 'Private School Group (Rabat)',
            roleAr: 'مجموعة مدرسية خاصة (الرباط)',
            comment: "Installation complète du système de sonorisation d'évacuation, de contrôle d'accès par badges et d'interphonie IP. Équipement fiable et formation claire de nos équipes.",
            commentEn: "Complete installation of PA evacuation sound system, badge access control, and IP intercoms. Reliable equipment and clear training for our staff.",
            commentAr: "تركيب شامل لنظام الصوتيات للإخلاء والتحكم في الدخول عبر البطاقات ونظام الاتصال الداخلي IP. معدات موثوقة وتدريب واضح لفرق عملنا.",
            rating: 5,
            city: 'Rabat',
            date: '19 Oct 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_6',
            name: 'M. TARIQ MANSOURI',
            role: 'Entrepôt Logistique (Tanger Med)',
            roleEn: 'Logistics Hub (Tangier Med)',
            roleAr: 'مستودع لوجستي (طنجة المتوسط)',
            comment: "Câblage structuré cuivre et fibre optique de grande envergure avec certification de liens. Respect rigoureux des délais industriels et audit technique irréprochable.",
            commentEn: "Large-scale structured copper and fiber optic cabling with link certification. Strict adherence to industrial deadlines and impeccable technical audit.",
            commentAr: "تمديد شبكات نحاسية وألياف بصرية واسعة النطاق مع اختبارات التصديق للروابط. التزام صارم بالمواعيد الصناعية وتدقيق تقني لا غبار عليه.",
            rating: 5,
            city: 'Tanger Med',
            date: '08 Oct 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_7',
            name: 'M. OMAR EL FASSI',
            role: 'Résidence de Luxe & Riad (Fès)',
            roleEn: 'Luxury Residence & Riad (Fez)',
            roleAr: 'إقامة فاخرة ورياض (فاس)',
            comment: "Motorisation de portails coulissants et barrières automatiques avec domotique intégrée. Qualité des finitions, discrétion des câblages et sécurité maximale.",
            commentEn: "Motorized sliding gates and automatic barriers with integrated home automation. Top quality finishes, discreet wiring, and maximum security.",
            commentAr: "أتمتة البوابات المنزلقة والحواجز الآلية مع نظام تحكم ذكي مدمج. جودة عالية في التشطيب، دقة في تمديد الكابلات وأقصى درجات الأمان.",
            rating: 5,
            city: 'Fès',
            date: '22 Sep 2026',
            status: 'verified'
        },
        {
            id: 'rev_seed_8',
            name: 'DR. AMINE LAHLOU',
            role: 'Centre Médical & Laboratoire (Mohammedia)',
            roleEn: 'Medical Center & Lab (Mohammedia)',
            roleAr: 'مركز طبي ومختبر (المحمدية)',
            comment: "Sécurisation intégrale de notre établissement : détection incendie adressable, alarme anti-intrusion et vidéosurveillance haute définition. Un vrai partenaire de confiance.",
            commentEn: "Full security upgrade for our facility: addressable fire detection, intruder alarm, and high-definition video surveillance. A truly reliable partner.",
            commentAr: "تأمين شامل لمنشأتنا الطبية: نظام كشف حرائق معنون، إنذار ضد السرقة ومراقبة بالفيديو فائقة الدقة. شريك موثوق بحق.",
            rating: 5,
            city: 'Mohammedia',
            date: '05 Sep 2026',
            status: 'verified'
        }
    ];

    let animationFrameId = null;
    let isUserHovering = false;
    let isUserTouching = false;
    let scrollSpeed = 0.75; // pixels per frame

    function getAllReviews() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
                return DEFAULT_REVIEWS.slice();
            }
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                const existingIds = new Set(parsed.map(r => r.id));
                let merged = parsed.slice();
                let addedNew = false;
                DEFAULT_REVIEWS.forEach(seed => {
                    if (!existingIds.has(seed.id)) {
                        merged.push(seed);
                        addedNew = true;
                    }
                });
                if (addedNew) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                }
                return merged;
            }
            return DEFAULT_REVIEWS.slice();
        } catch (e) {
            return DEFAULT_REVIEWS.slice();
        }
    }

    function getPublicReviews() {
        const all = getAllReviews();
        return all.filter(r => r.status === 'approved' || r.status === 'verified');
    }

    function saveReviews(reviews) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
            window.dispatchEvent(new CustomEvent('exsys_reviews_changed', { detail: { reviews } }));
            return true;
        } catch (e) {
            console.error('Failed to save reviews to localStorage:', e);
            return false;
        }
    }

    function addReview(data, asApproved = false) {
        const reviews = getAllReviews();
        const initialStatus = asApproved ? 'approved' : (data.status || 'pending');
        const newReview = {
            id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            name: data.name,
            role: data.role,
            roleEn: data.roleEn || data.role,
            comment: data.comment,
            commentEn: data.commentEn || data.comment,
            rating: parseInt(data.rating, 10) || 5,
            city: data.city || '',
            date: data.date || new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: initialStatus,
            isNew: true,
            createdAt: new Date().toISOString()
        };

        reviews.unshift(newReview);
        const saved = saveReviews(reviews);

        if (saved) {
            // Asynchronously dispatch remote notification email via FormSubmit
            try {
                if (typeof FORM_CONFIG !== 'undefined' && FORM_CONFIG.endpoint) {
                    fetch(FORM_CONFIG.endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            _subject: `[Nouvel Avis Client - ${initialStatus === 'pending' ? 'En attente' : 'Publié'}] ${newReview.name} - ${newReview.rating}/5`,
                            nom: newReview.name,
                            etablissement_ville: newReview.role,
                            note: `${newReview.rating} / 5 étoiles`,
                            avis_commentaire: newReview.comment,
                            statut: initialStatus,
                            date_depot: newReview.date,
                            source: 'Site Web Excellence Système'
                        })
                    }).catch(() => {});
                }
            } catch (err) {}
        }

        return saved ? newReview : null;
    }

    function approveReview(id) {
        const reviews = getAllReviews();
        const item = reviews.find(r => r.id === id);
        if (!item) return false;
        item.status = 'approved';
        item.moderatedAt = new Date().toLocaleString('fr-FR');
        item.moderatedBy = 'Administrateur';
        item.isNew = false;
        const saved = saveReviews(reviews);
        if (saved) render();
        return saved;
    }

    function rejectReview(id, reason = '') {
        const reviews = getAllReviews();
        const item = reviews.find(r => r.id === id);
        if (!item) return false;
        item.status = 'rejected';
        item.rejectionReason = reason;
        item.moderatedAt = new Date().toLocaleString('fr-FR');
        item.moderatedBy = 'Administrateur';
        const saved = saveReviews(reviews);
        if (saved) render();
        return saved;
    }

    function deleteReview(id) {
        let reviews = getAllReviews();
        const initialLen = reviews.length;
        reviews = reviews.filter(r => r.id !== id);
        if (reviews.length === initialLen) return false;
        const saved = saveReviews(reviews);
        if (saved) render();
        return saved;
    }

    function updateReview(id, updatedData) {
        const reviews = getAllReviews();
        const item = reviews.find(r => r.id === id);
        if (!item) return false;

        // Traceability: track previous values
        const auditEntry = {
            timestamp: new Date().toLocaleString('fr-FR'),
            modifiedBy: 'Administrateur',
            previous: {
                name: item.name,
                role: item.role,
                rating: item.rating,
                comment: item.comment,
                status: item.status
            }
        };

        if (!item.history) item.history = [];
        item.history.unshift(auditEntry);

        if (updatedData.name !== undefined) item.name = updatedData.name.trim();
        if (updatedData.role !== undefined) item.role = updatedData.role.trim();
        if (updatedData.roleEn !== undefined) item.roleEn = updatedData.roleEn.trim();
        if (updatedData.city !== undefined) item.city = updatedData.city.trim();
        if (updatedData.comment !== undefined) item.comment = updatedData.comment.trim();
        if (updatedData.commentEn !== undefined) item.commentEn = updatedData.commentEn.trim();
        if (updatedData.rating !== undefined) item.rating = parseInt(updatedData.rating, 10) || 5;
        if (updatedData.status !== undefined) item.status = updatedData.status;

        item.lastModified = new Date().toLocaleString('fr-FR');
        item.lastModifiedBy = 'Administrateur';

        const saved = saveReviews(reviews);
        if (saved) render();
        return saved;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function createCardElement(rev, isClone = false) {
        const isEn = (document.documentElement.getAttribute('lang') || 'fr') === 'en';
        const card = document.createElement('div');
        card.className = `solution-card review-card-item ${rev.isNew && !isClone ? 'review-card-new' : ''}`;
        if (isClone) {
            card.setAttribute('aria-hidden', 'true');
        }

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rev.rating) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star" style="color:var(--text-muted);"></i>';
            }
        }

        const roleText = (isEn && rev.roleEn) ? rev.roleEn : rev.role;
        const commentText = (isEn && rev.commentEn) ? rev.commentEn : rev.comment;
        const verifiedLabel = isEn ? 'Verified Client' : 'Client Vérifié';
        const newBadgeLabel = isEn ? 'New' : 'Nouveau';

        card.innerHTML = `
            <div class="review-card-icon">
                <i class="fa-solid fa-quote-left"></i>
            </div>
            <div class="review-card-stars">
                ${starsHtml}
            </div>
            <h3 class="review-card-author">${escapeHtml(rev.name)}</h3>
            <div class="review-card-role">${escapeHtml(roleText)}</div>
            <p class="review-card-text">
                "${escapeHtml(commentText)}"
            </p>
            <div class="review-card-footer">
                <i class="fa-solid fa-circle-check" style="color:var(--primary-turquoise);"></i> 
                <span>${verifiedLabel}</span>
                ${rev.city ? `<span>— ${escapeHtml(rev.city)}</span>` : ''}
                ${rev.isNew ? `<span class="review-badge-new-pill">${newBadgeLabel}</span>` : ''}
            </div>
        `;

        return card;
    }

    function stopAutoScroll() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function startAutoScroll(viewport, track) {
        stopAutoScroll();

        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        function step() {
            if (!isUserHovering && !isUserTouching && viewport) {
                viewport.scrollLeft += scrollSpeed;
                const halfWidth = track.scrollWidth / 2;
                if (halfWidth > 0 && viewport.scrollLeft >= halfWidth) {
                    viewport.scrollLeft -= halfWidth;
                }
            }
            animationFrameId = requestAnimationFrame(step);
        }

        animationFrameId = requestAnimationFrame(step);
    }

    function render() {
        const container = document.getElementById('reviewsCardContainer');
        const wrapper = document.getElementById('reviewsSliderWrapper');
        const viewport = document.getElementById('reviewsViewport');
        if (!container || !wrapper) return;

        stopAutoScroll();
        container.innerHTML = '';

        // Only display APPROVED / VERIFIED reviews on the public site
        const reviews = getPublicReviews();

        // Update score & counts dynamically
        let totalScore = 0;
        reviews.forEach(r => totalScore += (r.rating || 5));
        const avgScore = reviews.length > 0 ? (totalScore / reviews.length).toFixed(1) : '5.0';

        const avgScoreEl = document.getElementById('reviewsAverageScore');
        if (avgScoreEl) avgScoreEl.textContent = `${avgScore} / 5`;

        const totalCountEl = document.getElementById('reviewsTotalCount');
        if (totalCountEl) totalCountEl.textContent = reviews.length.toString();

        const hasMoreThanFour = reviews.length > 4;

        if (!hasMoreThanFour) {
            // <= 4 reviews: Standard static responsive grid without auto-scroll
            wrapper.classList.remove('reviews-marquee-mode');
            wrapper.classList.add('reviews-grid-mode');

            reviews.forEach(rev => {
                const card = createCardElement(rev, false);
                container.appendChild(card);
            });
        } else {
            // > 4 reviews: Animated horizontal continuous marquee
            wrapper.classList.remove('reviews-grid-mode');
            wrapper.classList.add('reviews-marquee-mode');

            // Append original cards
            reviews.forEach(rev => {
                const card = createCardElement(rev, false);
                container.appendChild(card);
            });

            // Append cloned cards for seamless infinite loop without gaps
            reviews.forEach(rev => {
                const clone = createCardElement(rev, true);
                container.appendChild(clone);
            });

            // Setup mouse & touch listeners for pause on interaction
            if (viewport && !viewport._listenersAttached) {
                viewport._listenersAttached = true;

                viewport.addEventListener('mouseenter', () => { isUserHovering = true; });
                viewport.addEventListener('mouseleave', () => { isUserHovering = false; });
                viewport.addEventListener('touchstart', () => { isUserTouching = true; }, { passive: true });
                viewport.addEventListener('touchend', () => { isUserTouching = false; }, { passive: true });

                const prevBtn = document.getElementById('reviewsPrevBtn');
                const nextBtn = document.getElementById('reviewsNextBtn');

                if (prevBtn) {
                    prevBtn.onclick = () => {
                        const cardWidth = 320 + 24;
                        viewport.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                    };
                }

                if (nextBtn) {
                    nextBtn.onclick = () => {
                        const cardWidth = 320 + 24;
                        viewport.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    };
                }
            }

            // Start smooth infinite glide loop
            startAutoScroll(viewport, container);
        }

        // Dynamically compute and enforce identical height across all review cards
        function syncReviewCardsEqualHeight() {
            const allCards = container.querySelectorAll('.review-card-item');
            if (!allCards.length) return;
            allCards.forEach(c => c.style.height = '');
            let maxHeight = 0;
            allCards.forEach(c => {
                const h = c.offsetHeight;
                if (h > maxHeight) maxHeight = h;
            });
            if (maxHeight < 420) maxHeight = 420;
            allCards.forEach(c => {
                c.style.height = maxHeight + 'px';
            });
        }

        syncReviewCardsEqualHeight();
        requestAnimationFrame(syncReviewCardsEqualHeight);
        setTimeout(syncReviewCardsEqualHeight, 100);
        setTimeout(syncReviewCardsEqualHeight, 350);
    }

    window.addEventListener('resize', () => {
        const container = document.getElementById('reviewsCardContainer');
        if (container) {
            const allCards = container.querySelectorAll('.review-card-item');
            if (!allCards.length) return;
            allCards.forEach(c => c.style.height = '');
            let maxHeight = 0;
            allCards.forEach(c => {
                const h = c.offsetHeight;
                if (h > maxHeight) maxHeight = h;
            });
            if (maxHeight < 420) maxHeight = 420;
            allCards.forEach(c => {
                c.style.height = maxHeight + 'px';
            });
        }
    });

    // Cross-tab real-time sync with Admin Space
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
            render();
        }
    });
    window.addEventListener('exsys_reviews_changed', () => {
        render();
    });

    return {
        init: render,
        add: addReview,
        getAll: getAllReviews,
        getPublic: getPublicReviews,
        approve: approveReview,
        reject: rejectReview,
        delete: deleteReview,
        update: updateReview,
        resetDefaults: function() {
            localStorage.removeItem(STORAGE_KEY);
            render();
        }
    };
})();

// Expose reviews management API to window
window.ExSysReviews = window.ExSysReviewsManager = ExSysReviewsManager;

function initReviewSystem() {
    let currentRating = 5;

    // Initialize reviews rendering on load
    ExSysReviewsManager.init();

    // Toggle Collapsible Comment Form Button
    const toggleBtn = document.getElementById('toggleReviewFormBtn');
    const collapsibleWrapper = document.getElementById('collapsibleReviewForm');
    const chevron = document.getElementById('reviewBtnChevron');

    if (toggleBtn && collapsibleWrapper) {
        toggleBtn.addEventListener('click', function () {
            const isOpen = collapsibleWrapper.classList.contains('open');
            if (isOpen) {
                collapsibleWrapper.classList.remove('open');
                if (chevron) chevron.classList.remove('rotated');
            } else {
                collapsibleWrapper.classList.add('open');
                if (chevron) chevron.classList.add('rotated');
                const authorInput = document.getElementById('inlineAuthorName');
                if (authorInput) {
                    setTimeout(() => authorInput.focus(), 300);
                }
            }
        });
    }

    // Star Pickers (Inline & Modal)
    const pickers = document.querySelectorAll('#inlineStarPicker .stars i, #starRatingPicker i');
    pickers.forEach(star => {
        star.addEventListener('click', function () {
            const val = parseInt(this.getAttribute('data-val') || '5', 10);
            currentRating = val;
            const parent = this.parentElement;
            const stars = parent.querySelectorAll('i');
            stars.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-val') || '0', 10);
                if (sVal <= val) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Inline Comment Form Submission with Real Storage Persistence & Validation
    const inlineForm = document.getElementById('inlineCommentForm');
    if (inlineForm) {
        inlineForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('inlineAuthorName');
            const roleInput = document.getElementById('inlineAuthorRole');
            const commentInput = document.getElementById('inlineCommentText');
            const submitBtn = document.getElementById('btnSubmitInlineReview');

            if (!nameInput || !roleInput || !commentInput) return;

            const name = nameInput.value.trim();
            const role = roleInput.value.trim();
            const comment = commentInput.value.trim();

            const isEn = (document.documentElement.getAttribute('lang') || 'fr') === 'en';

            if (name.length < 2) {
                showToast(isEn ? 'Please enter a valid name (at least 2 characters).' : 'Veuillez renseigner votre nom complet (au moins 2 caractères).', 'error');
                nameInput.focus();
                return;
            }

            if (role.length < 2) {
                showToast(isEn ? 'Please specify your establishment/role and city.' : 'Veuillez renseigner votre établissement/fonction et ville.', 'error');
                roleInput.focus();
                return;
            }

            if (comment.length < 10) {
                showToast(isEn ? 'Please provide a detailed review (at least 10 characters).' : 'Veuillez rédiger un avis détaillé (au moins 10 caractères).', 'error');
                commentInput.focus();
                return;
            }

            const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${isEn ? 'Publishing...' : 'Publication en cours...'}`;
            }

            // Extract city from role if available (e.g. "Hôtel Riad (Marrakech)")
            let city = '';
            const match = role.match(/[\(\-–]\s*([A-Za-zÀ-ÿ\s]+)\s*[\)]?$/);
            if (match && match[1]) {
                city = match[1].trim();
            }

            const saved = ExSysReviewsManager.add({
                name: name,
                role: role,
                comment: comment,
                rating: currentRating,
                city: city,
                status: 'pending'
            });

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origBtnHtml;
            }

            if (saved) {
                // Show toast confirmation explaining it has been recorded and is pending moderation
                const successMsg = isEn 
                    ? `Thank you ${name}! Your review has been submitted and will appear on the site after moderation by our team.`
                    : `Merci ${name} ! Votre avis a bien été enregistré et sera publié sur le site après validation par notre équipe.`;
                showToast(successMsg, 'success');

                // Reset form and collapse
                inlineForm.reset();
                currentRating = 5;
                const parentStars = document.querySelectorAll('#inlineStarPicker .stars i');
                parentStars.forEach(s => s.classList.add('active'));

                if (collapsibleWrapper) {
                    collapsibleWrapper.classList.remove('open');
                    if (chevron) chevron.classList.remove('rotated');
                }
            } else {
                showToast(isEn ? 'Error saving review. Please try again.' : "Erreur lors de l'enregistrement de l'avis. Veuillez réessayer.", 'error');
            }
        });
    }

    // Modal Form Submission (if present)
    const modalForm = document.getElementById('submitReviewForm');
    if (modalForm) {
        modalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('revAuthorName');
            const roleInput = document.getElementById('revAuthorRole');
            const commentInput = document.getElementById('revCommentText');

            if (!nameInput || !roleInput || !commentInput) return;

            const name = nameInput.value.trim();
            const role = roleInput.value.trim();
            const comment = commentInput.value.trim();

            if (!name || !role || !comment) return;

            const saved = ExSysReviewsManager.add({
                name: name,
                role: role,
                comment: comment,
                rating: currentRating
            });

            if (saved) {
                ExSysReviewsManager.init();
                const isEn = (document.documentElement.getAttribute('lang') || 'fr') === 'en';
                showToast(isEn ? `Thank you ${name}! Your review has been successfully published.` : `Merci ${name} ! Votre avis a été enregistré et publié avec succès.`, 'success');
                modalForm.reset();
                currentRating = 5;
                const modal = document.getElementById('writeReviewModal');
                if (modal) modal.classList.remove('active');
            }
        });
    }
}


/* Solution & Activity Detail Modal Trigger (Updated with Screenshot 2 Crisp Brand Cards) */
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('solutionDetailModalOverlay')) {
        const modalHTML = `
        <div class="solution-detail-modal-overlay" id="solutionDetailModalOverlay">
            <div class="solution-detail-modal">
                <button type="button" class="solution-modal-close" id="closeSolutionModal" aria-label="Fermer">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <img src="" alt="" class="solution-modal-img" id="solutionModalImg">
                <div class="solution-modal-body">
                    <div class="solution-modal-badge" id="solutionModalBadge">
                        <i class="fa-solid fa-star"></i> Excellence Système
                    </div>
                    <h3 class="solution-modal-title" id="solutionModalTitle">Titre Solution</h3>
                    <p class="solution-modal-desc" id="solutionModalDesc">Description complète de la solution.</p>
                    
                    <div class="solution-modal-features" id="solutionModalBrandsBlock" style="margin-bottom: 22px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 14px;">
                        <div class="text-center">
                            <h4 class="brands-title-with-line" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 15px 0;">
                                <i class="fa-solid fa-award" style="color:var(--primary-turquoise); margin-right:6px;"></i> Marques & Constructeurs Officiels
                            </h4>
                        </div>
                        <div class="solution-modal-brands-grid" id="solutionModalBrandsList">
                        </div>
                    </div>

                    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:24px;">
                        <a href="#" class="btn btn-primary" id="solutionModalLink" style="padding:12px 24px;">
                            Accéder à la page détaillée <i class="fa-solid fa-arrow-right"></i>
                        </a>
                        <button type="button" class="btn btn-outline" data-open-quote style="padding:12px 24px;">
                            <i class="fa-solid fa-paper-plane"></i> Demander un devis
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const overlay = document.getElementById('solutionDetailModalOverlay');
    const closeBtn = document.getElementById('closeSolutionModal');
    const modalImg = document.getElementById('solutionModalImg');
    const modalBadge = document.getElementById('solutionModalBadge');
    const modalTitle = document.getElementById('solutionModalTitle');
    const modalDesc = document.getElementById('solutionModalDesc');
    const modalLink = document.getElementById('solutionModalLink');
    const modalBrandsList = document.getElementById('solutionModalBrandsList');

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    }

    const activity_brands_js = {
        'incendie': [
            ['Comelit', 'LOGO PNG/SYSTEME DE DETECTION INCENDIE PNG/comelit-large.png'],
            ['SSI Partenaire', 'LOGO PNG/SYSTEME DE DETECTION INCENDIE PNG/1_h7cz-m7.png'],
            ['Détecteurs Certifiés', 'LOGO PNG/SYSTEME DE DETECTION INCENDIE PNG/2-1-1024x341.png'],
            ['Alarme ERP', 'LOGO PNG/SYSTEME DE DETECTION INCENDIE PNG/7-1-1024x341.png']
        ],
        'video': [
            ['Hikvision', 'LOGO PNG/SYSTÈME DE VIDÉOSURVEILLANCE PNG/Hikvision-Logo.wine.png'],
            ['Dahua', 'LOGO PNG/SYSTÈME DE VIDÉOSURVEILLANCE PNG/dahua_technology-logo-brandlogo.net_.png'],
            ['Uniview', 'LOGO PNG/SYSTÈME DE VIDÉOSURVEILLANCE PNG/unv-logo-1024x522.png'],
            ['Bosch', 'LOGO PNG/SYSTÈME DE VIDÉOSURVEILLANCE PNG/Bosch-logo.png'],
            ['Imou', 'LOGO PNG/SYSTÈME DE VIDÉOSURVEILLANCE PNG/imou-logo_brandlogos.net_i0qhd.png'],
            ['Ezviz', 'LOGO PNG/SYSTÈME DE VIDÉOSURVEILLANCE PNG/ezviz-logo_brandlogos.net_z9wlt.png']
        ],
        'reseau': [
            ['Cisco Systems', 'LOGO PNG/RESEAU INFORMATIQUE PNG/cisco-logo-transparent.png'],
            ['Ubiquiti', 'LOGO PNG/RESEAU INFORMATIQUE PNG/Ubiquiti-Logo-2013.png'],
            ['Grandstream', 'LOGO PNG/RESEAU INFORMATIQUE PNG/grandstream.png'],
            ['Aruba Networks', 'LOGO PNG/RESEAU INFORMATIQUE PNG/480x220-Aruba-Networks-Partner-Cameo-Global.png'],
            ['Nexans', 'LOGO PNG/RESEAU INFORMATIQUE PNG/159-1595269_nexans-logo.png']
        ],
        'optique': [
            ['Nexans Telecom', 'LOGO PNG/RESEAU OPTIQUE PNG/159-1595269_nexans-logo.png'],
            ['Aginode', 'LOGO PNG/RESEAU OPTIQUE PNG/Logo-Aginode.png'],
            ['Multimedia Connect', 'LOGO PNG/RESEAU OPTIQUE PNG/MMC_MULTIMEDIA_CONNECT_logos.png']
        ],
        'wifi': [
            ['Ubiquiti Networks', 'LOGO PNG/RESEAU INFORMATIQUE PNG/Ubiquiti-Logo-2013.png'],
            ['Aruba Networks', 'LOGO PNG/RESEAU INFORMATIQUE PNG/480x220-Aruba-Networks-Partner-Cameo-Global.png'],
            ['Ruijie Reyee', 'LOGO PNG/RESEAU INFORMATIQUE PNG/Ruijie Reyee.png']
        ],
        'domotique': [
            ['Shelly Smart', 'LOGO PNG/DOMOTIQUE & SMART HOME PNG/shelly-logo-png_seeklogo-434027.png'],
            ['Loxone Building', 'LOGO PNG/DOMOTIQUE & SMART HOME PNG/Logo-Loxone-green-Web.png'],
            ['EAE Technology', 'LOGO PNG/DOMOTIQUE & SMART HOME PNG/EAE_logo.png']
        ],
        'telephonie': [
            ['Cisco Systems', 'LOGO PNG/TÉLÉPHONIE IP PNG/cisco-logo-transparent.png'],
            ['Grandstream', 'LOGO PNG/TÉLÉPHONIE IP PNG/grandstream.png'],
            ['Yealink', 'LOGO PNG/TÉLÉPHONIE IP PNG/Yealink_logo.png'],
            ['Alcatel-Lucent', 'LOGO PNG/TÉLÉPHONIE IP PNG/ALCATEL.png'],
            ['Fanvil', 'LOGO PNG/TÉLÉPHONIE IP PNG/Fanvil-Logo-PNG.png']
        ],
        'acces': [
            ['Slinex', 'LOGO PNG/CONTRÔLE D’ACCÈS PNG/SLINEX.png'],
            ['Suprema Biometrics', 'LOGO PNG/CONTRÔLE D’ACCÈS PNG/suprema.png'],
            ['CDVI Access', 'LOGO PNG/CONTRÔLE D’ACCÈS PNG/CDVI-Logo-400.png'],
            ['Dahua Technology', 'LOGO PNG/CONTRÔLE D’ACCÈS PNG/dahua_technology-logo-brandlogo.net_.png']
        ],
        'teledist': [
            ['Televes Corporation', 'LOGO PNG/TELEDESTRIBUTION PNG/televes-logo-actual.png'],
            ['Alcad Electronics', 'LOGO PNG/CONTRÔLE D’ACCÈS PNG/logo-alcad.png']
        ],
        'audio': [
            ['Bose Professional', 'LOGO PNG/AUDIOVISUEL PNG/bose-logo-png_seeklogo-291380.png'],
            ['Yamaha Audio', 'LOGO PNG/AUDIOVISUEL PNG/yamaha-logo-png_seeklogo-154895.png'],
            ['Denon Audio', 'LOGO PNG/AUDIOVISUEL PNG/Denon-Logo.wine.png'],
            ['Biamp Systems', 'LOGO PNG/AUDIOVISUEL PNG/logo-Biamp-2.png']
        ],
        'intrusion': [
            ['Ajax Systems', 'LOGO PNG/SYSTEME ALARME ANTI - INTRUSION PNG/ajax-logo-png_seeklogo-515756.png'],
            ['SECOLink', 'LOGO PNG/SYSTEME ALARME ANTI - INTRUSION PNG/SECOLink_logo.png'],
            ['Somfy Protection', 'LOGO PNG/SYSTEME ALARME ANTI - INTRUSION PNG/somfy-logo-png_seeklogo-296260.png']
        ],
        'motorisation': [
            ['Proteco Automation', 'LOGO PNG/MOTORISATION PORTAIL & GARAGE PNG/Proteco_Logo.png'],
            ['Nice Automation', 'LOGO PNG/MOTORISATION PORTAIL & GARAGE PNG/logo_Nice.png'],
            ['Somfy Automation', 'LOGO PNG/MOTORISATION PORTAIL & GARAGE PNG/somfy-logo-png_seeklogo-296260.png'],
            ['Comunello Automation', 'LOGO PNG/MOTORISATION PORTAIL & GARAGE PNG/COMUNELLO_AUTOMATION_LOGO-300x90.png']
        ]
    };

    function getBrandsForModal(title) {
        const tl = String(title).toLowerCase();
        if (tl.includes('incendie') || tl.includes('extinction')) return activity_brands_js['incendie'];
        if (tl.includes('vidéo') || tl.includes('caméra')) return activity_brands_js['video'];
        if (tl.includes('optique') || tl.includes('fibre')) return activity_brands_js['optique'];
        if (tl.includes('wifi') || tl.includes('wi-fi')) return activity_brands_js['wifi'];
        if (tl.includes('réseau') || tl.includes('datacenter')) return activity_brands_js['reseau'];
        if (tl.includes('téléphonie') || tl.includes('pabx')) return activity_brands_js['telephonie'];
        if (tl.includes('accès') || tl.includes('intercom')) return activity_brands_js['acces'];
        if (tl.includes('domotique') || tl.includes('gtb') || tl.includes('gtc')) return activity_brands_js['domotique'];
        if (tl.includes('sonorisation') || tl.includes('audio') || tl.includes('cinéma')) return activity_brands_js['audio'];
        if (tl.includes('intrusion') || tl.includes('alarme')) return activity_brands_js['intrusion'];
        if (tl.includes('télédist') || tl.includes('satellite')) return activity_brands_js['teledist'];
        if (tl.includes('automatis') || tl.includes('motoris') || tl.includes('portail')) return activity_brands_js['motorisation'];
        return activity_brands_js['reseau'];
    }

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-solution-title]');
        if (btn && !e.target.closest('a')) {
            const title = btn.getAttribute('data-solution-title');
            const desc = btn.getAttribute('data-solution-desc') || '';
            const img = btn.getAttribute('data-solution-img') || 'assets/img/incendie-hero.jpg';
            const badge = btn.getAttribute('data-solution-badge') || 'Excellence Système';
            const link = btn.getAttribute('data-solution-link') || '';

            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalImg) modalImg.src = img;
            if (modalBadge) modalBadge.innerHTML = `<i class="fa-solid fa-star"></i> ${badge}`;
            
            if (modalLink) {
                if (link && link !== '#') {
                    modalLink.href = link;
                    modalLink.style.display = 'inline-flex';
                } else {
                    modalLink.style.display = 'none';
                }
            }

            if (modalBrandsList) {
                modalBrandsList.innerHTML = '';
                const brands = getBrandsForModal(title);
                brands.forEach(([bName, bPath], idx) => {
                    const card = document.createElement('div');
                    card.className = 'modal-brand-card';
                    card.style.animationDelay = `${idx * 0.08}s`;
                    card.innerHTML = `<img src="${bPath}" alt="${bName}">`;
                    modalBrandsList.appendChild(card);
                });
            }

            if (overlay) overlay.classList.add('active');
        }
    });
});

/* 16. Legal Pages Smooth Scroll & Active State Scrollspy */
function initLegalScrollspy() {
    const navLinks = document.querySelectorAll('.legal-nav-link');
    const sections = document.querySelectorAll('.legal-article-section');
    if (navLinks.length === 0 || sections.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                current = sec.getAttribute('id');
            }
        });

        if (!current && window.scrollY < 200) {
            current = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

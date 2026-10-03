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
    initLanguageSwitcher();
    initBrandAnimations();
    initAboutSlider();
    initAboutTabbedVisual();
    initActivityBrandsTilt();
    initReviewSystem();
    initLegalScrollspy();
});

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
    web3formsKey: '', // Optionnel : collez ici votre clé Web3Forms si vous préférez Web3Forms
    whatsappNumber: '212668764271'
};

function extractFormData(form) {
    const data = {};
    const formData = new FormData(form);
    for (const [key, val] of formData.entries()) {
        if (key && val) data[key] = val;
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
        if (!data[name] && input.value) {
            data[name] = input.value;
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

            // Validation de base
            if (!extractedData.nom || !extractedData.telephone) {
                showToast(isEn ? 'Please fill in your name and phone number.' : 'Veuillez renseigner votre nom et votre numéro de téléphone.', 'error');
                return;
            }

            // Loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.75';
                submitBtn.style.cursor = 'wait';
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${isEn ? 'Sending...' : 'Envoi en cours...'}</span>`;
            }

            // Détection du mode de test local (fichier ouvert en file://)
            const isLocalFile = window.location.protocol === 'file:';

            if (isLocalFile) {
                setTimeout(() => {
                    const devMsg = isEn 
                        ? `Local test mode: Form verified! In production, the quote is dispatched to ${FORM_CONFIG.primaryEmail} & ${FORM_CONFIG.ccEmail}.`
                        : `Mode test local : Formulaire validé ! En ligne, l'email sera envoyé à ${FORM_CONFIG.primaryEmail} et ${FORM_CONFIG.ccEmail}.`;
                    showToast(devMsg, 'success');

                    form.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.cursor = 'pointer';
                        submitBtn.innerHTML = originalBtnHTML;
                    }

                    const modal = form.closest('.modal-overlay');
                    if (modal) {
                        setTimeout(() => modal.classList.remove('active'), 1200);
                    }
                }, 800);
                return;
            }

            // Préparation des données pour l'envoi en ligne
            let targetUrl = FORM_CONFIG.endpoint;
            let payload = {};

            if (FORM_CONFIG.web3formsKey) {
                targetUrl = 'https://api.web3forms.com/submit';
                payload = {
                    access_key: FORM_CONFIG.web3formsKey,
                    subject: isEn ? `New Quote Request - ${extractedData.nom}` : `Demande de devis - ${extractedData.nom}`,
                    from_name: 'Excellence Système Website',
                    name: extractedData.nom,
                    email: extractedData.email || '',
                    phone: extractedData.telephone,
                    company: extractedData.societe || 'Non spécifié',
                    activity: extractedData.activite || 'Demande générale',
                    message: extractedData.message || 'Demande de devis',
                    page_source: window.location.href
                };
            } else {
                payload = {
                    ...extractedData,
                    _subject: isEn ? `Demande de Devis - ${extractedData.nom}` : `Demande de Devis - ${extractedData.nom}`,
                    _cc: FORM_CONFIG.ccEmail,
                    _replyto: extractedData.email || '',
                    _template: 'table',
                    _captcha: 'false',
                    page_source: window.location.href,
                    date_maroc: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })
                };
            }

            try {
                const response = await fetch(targetUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json().catch(() => ({}));

                if (response.ok || result.success === 'true' || result.success === true || (result.message && result.message.includes('Activation'))) {
                    const successMsg = isEn 
                        ? "Your quote request has been transmitted successfully! Our team will contact you within 24 hours."
                        : "Votre demande a bien été transmise à Excellence Système. Notre équipe vous recontactera sous 24h.";
                    showToast(successMsg, 'success');

                    form.reset();

                    const modal = form.closest('.modal-overlay');
                    if (modal) {
                        setTimeout(() => modal.classList.remove('active'), 1200);
                    }

                    const statusDiv = form.querySelector('.form-status-msg') || document.getElementById('contactFormStatus');
                    if (statusDiv) {
                        statusDiv.innerHTML = `
                            <div style="background: rgba(99, 196, 196, 0.1); border: 1px solid rgba(99, 196, 196, 0.4); border-radius: 8px; padding: 12px; margin-top: 15px; color: #63C4C4; font-size: 0.9rem;">
                                <i class="fa-solid fa-circle-check"></i> ${successMsg}
                            </div>
                        `;
                    }
                } else {
                    throw new Error(result.message || 'Erreur lors de l\'envoi');
                }
            } catch (err) {
                console.warn('Erreur envoi formulaire:', err);
                const errorMsg = isEn 
                    ? "Submission issue. You can reach us directly on WhatsApp or phone."
                    : "Une erreur est survenue lors de l'envoi. Vous pouvez nous contacter directement sur WhatsApp.";
                showToast(errorMsg, 'error');

                const statusDiv = form.querySelector('.form-status-msg') || document.getElementById('contactFormStatus');
                const waMessage = encodeURIComponent(
                    `Bonjour Excellence Système,\nJe souhaite un devis pour : ${extractedData.activite || 'Courant faible / Sécurité'}\nNom: ${extractedData.nom}\nTéléphone: ${extractedData.telephone}\nEmail: ${extractedData.email || 'Non précisé'}\nMessage: ${extractedData.message || 'Demande de devis'}`
                );

                if (statusDiv) {
                    statusDiv.innerHTML = `
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 12px; margin-top: 15px; color: #fca5a5; font-size: 0.9rem;">
                            <p style="margin-bottom: 8px;"><i class="fa-solid fa-triangle-exclamation"></i> ${errorMsg}</p>
                            <a href="https://wa.me/${FORM_CONFIG.whatsappNumber}?text=${waMessage}" target="_blank" rel="noopener" style="display: inline-block; background: #25D366; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 600; text-decoration: none; margin-top: 6px;">
                                <i class="fa-brands fa-whatsapp"></i> Envoyer ma demande via WhatsApp
                            </a>
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

/* 10. Multi-Page Language Switcher (FR / EN) */
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

        heroTag: "EXPERT EN COURANT FAIBLE & SÉCURITÉ ÉLECTRONIQUE",
        heroTitle: "Intégrer des solutions IT à vos projets<br><span class='highlight'>Apporter de l'innovation à vos clients</span>",
        heroDesc: "Plus de 11 ans d'expérience dans le conseil, la fourniture, l'intégration et la maintenance de solutions de sécurité électronique, réseaux informatiques et domotique au Maroc.",
        btnDiscover: "Découvrir nos activités <i class='fa-solid fa-arrow-right'></i>",
        stat1Label: "Projets & Solutions Déployés",
        stat2Label: "Clients Accompagnés au Maroc",
        stat3Label: "Années d'Expérience",
        stat4Label: "Support Technique & Maintenance",

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
        aboutTitle: "Plus de 10 ans d'expertise technique au Maroc",
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

        heroTag: "LOW CURRENT & ELECTRONIC SECURITY EXPERT",
        heroTitle: "Integrate IT solutions into your projects<br><span class='highlight'>Bring innovation to your clients</span>",
        heroDesc: "Over 11 years of experience in consulting, supply, integration, and maintenance of electronic security, IT networking, and smart home solutions in Morocco.",
        btnDiscover: "Explore Our Activities <i class='fa-solid fa-arrow-right'></i>",
        stat1Label: "Deployed Projects",
        stat2Label: "Satisfied Clients in Morocco",
        stat3Label: "Years of Experience",
        stat4Label: "Technical Support & Maintenance",

        homeExpertiseTag: "OUR PROVEN EXPERTISE",
        homeExpertiseTitle: "Our Main Activities",
        homeExpertiseSub: "Discover our key intervention domains. Click a card to view specs and real projects.",
        btnSeeAllActivities: "Explore all 11 activities <i class='fa-solid fa-arrow-right'></i>",

        card1Badge: "<i class='fa-solid fa-fire-flame-curved'></i> S.S.I. Certified",
        card1Title: "Fire Detection",
        card1Desc: "Conventional & addressable fire panels compliant with safety standards.",

        card2Badge: "<i class='fa-solid fa-video'></i> Ultra HD 4K",
        card2Title: "IP Surveillance",
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
        card6Title: "Intrusion Alarm",
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

function initLanguageSwitcher() {
    const isDocEn = document.documentElement.getAttribute('lang') === 'en';

    function setLanguage(lang) {
        if (!translations[lang]) return;

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', 'ltr');

        // Update all header & drawer language buttons
        document.querySelectorAll('.lang-btn, .drawer-lang-btn').forEach(b => {
            const btnLang = b.getAttribute('data-lang') || (b.textContent.trim().toLowerCase().includes('en') ? 'en' : 'fr');
            b.classList.toggle('active', btnLang === lang);
        });

        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (t[key]) {
                elem.innerHTML = t[key];
            }
        });

        // Ensure nav-links with nav-icon get their icons maintained
        ensureNavIcons();
    }

    // Attach click listeners to all language buttons and links
    document.querySelectorAll('.lang-btn, .drawer-lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = btn.getAttribute('data-lang') || (btn.textContent.trim().toLowerCase().includes('en') ? 'en' : 'fr');
            try {
                localStorage.setItem('preferredLang', lang);
            } catch (err) { }

            // If it's a link to another page (e.g. privacy-policy.html <-> politique-confidentialite.html), let browser navigate
            if (btn.tagName.toLowerCase() === 'a') {
                return;
            }

            e.preventDefault();
            setLanguage(lang);
        });
    });

    try {
        let savedLang = localStorage.getItem('preferredLang');
        if (savedLang === 'ar') savedLang = 'fr';

        if (isDocEn) {
            // Dedicated English page: enforce English and save preference
            setLanguage('en');
            localStorage.setItem('preferredLang', 'en');
        } else if (savedLang && translations[savedLang]) {
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

/* 17. Interactive Reviews & Comment System */
function initReviewSystem() {
    let currentRating = 5;

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

    // Helper to generate solution-card review markup
    function createSolutionStyleCard(name, role, comment, rating) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star" style="color:var(--text-muted);"></i>';
            }
        }

        const card = document.createElement('div');
        card.className = 'solution-card review-card-new';
        card.style.cssText = 'padding: 28px; text-align: center;';
        card.innerHTML = `
            <div class="solution-icon" style="margin: 0 auto 16px auto; width: 56px; height: 56px; font-size: 1.4rem;">
                <i class="fa-solid fa-quote-left"></i>
            </div>
            <div style="color: var(--primary-turquoise); font-size: 0.9rem; margin-bottom: 12px; display: flex; justify-content: center; gap: 4px;">
                ${starsHtml}
            </div>
            <h3 class="solution-title" style="font-size: 1.2rem; margin-bottom: 4px;">${escapeHtml(name)}</h3>
            <div style="color: var(--primary-turquoise); font-size: 0.85rem; font-weight: 600; margin-bottom: 14px;">${escapeHtml(role)}</div>
            <p class="solution-desc" style="font-size: 0.9rem; line-height: 1.6; font-style: italic;">
                "${escapeHtml(comment)}"
            </p>
            <div style="font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: auto;">
                <i class="fa-solid fa-circle-check" style="color: var(--primary-turquoise); margin-right: 4px;"></i> Client Vérifié — Nouveau
            </div>
        `;
        return card;
    }

    // Inline Comment Form Submission
    const inlineForm = document.getElementById('inlineCommentForm');
    if (inlineForm) {
        inlineForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('inlineAuthorName');
            const roleInput = document.getElementById('inlineAuthorRole');
            const commentInput = document.getElementById('inlineCommentText');

            if (!nameInput || !roleInput || !commentInput) return;

            const name = nameInput.value.trim();
            const role = roleInput.value.trim();
            const comment = commentInput.value.trim();

            if (!name || !role || !comment) return;

            const card = createSolutionStyleCard(name, role, comment, currentRating);
            const container = document.getElementById('reviewsCardContainer');
            if (container) {
                container.prepend(card);
            }

            // Show Toast Success
            showToast(`Merci ${name} ! Votre avis a été publié avec succès.`);

            // Reset form & close collapse
            inlineForm.reset();
            currentRating = 5;
            const parentStars = document.querySelectorAll('#inlineStarPicker .stars i');
            parentStars.forEach(s => s.classList.add('active'));

            if (collapsibleWrapper) {
                collapsibleWrapper.classList.remove('open');
                if (chevron) chevron.classList.remove('rotated');
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

            const card = createSolutionStyleCard(name, role, comment, currentRating);
            const container = document.getElementById('reviewsCardContainer');
            if (container) {
                container.prepend(card);
            }

            showToast(`Merci ${name} ! Votre avis a été publié avec succès.`);
            modalForm.reset();
            currentRating = 5;
            const modal = document.getElementById('writeReviewModal');
            if (modal) modal.classList.remove('active');
        });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

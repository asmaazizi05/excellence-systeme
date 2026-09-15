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
    initActivityBrandsTilt();
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

/* 2. Mobile Navigation Drawer */
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
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

/* 9. Contact Form & Submission Toast */
function initContactForm() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            showToast('Votre demande a bien été transmise à Excellence Système. Notre équipe vous recontactera sous 24h.');

            form.reset();

            const modal = form.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#63C4C4; font-size:1.2rem;"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

/* 10. Multi-Page Language Switcher (FR / EN / AR) */
const translations = {
    fr: {
        navHome: "Accueil",
        navAbout: "À propos",
        navActivities: "Nos activités <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navServices: "Nos services <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navRealizations: "Nos réalisations",
        navBrands: "Nos marques",
        navContact: "Contact",
        btnQuote: "Demander un devis",

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
        heroTitle: "Votre partenaire de confiance en <span class='highlight'>courant faible et sécurité électronique</span>",
        heroDesc: "Plus de 10 ans d'expérience dans le conseil, la fourniture, l'intégration et la maintenance de solutions de sécurité électronique, réseaux informatiques et domotique au Maroc.",
        btnDiscover: "Découvrir nos activités <i class='fa-solid fa-arrow-right'></i>",
        stat1Label: "Projets & Solutions déployés",
        stat2Label: "Clients accompagnés au Maroc",
        stat3Label: "Années d'expertise éprouvée",
        stat4Label: "Support technique & maintenance",

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
        btnFreeQuote: "<i class='fa-solid fa-paper-plane'></i> Demander un Devis Gratuit"
    },
    en: {
        navHome: "Home",
        navAbout: "About Us",
        navActivities: "Our Activities <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navServices: "Our Services <i class='fa-solid fa-chevron-down' style='font-size:0.75rem; margin-left:4px;'></i>",
        navRealizations: "Projects",
        navBrands: "Our Brands",
        navContact: "Contact",
        btnQuote: "Get a Quote",

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
        heroTitle: "Your trusted partner in <span class='highlight'>low current & electronic security</span>",
        heroDesc: "Over 10 years of expertise in consulting, supply, integration, and maintenance of electronic security, IT networking, and smart home solutions in Morocco.",
        btnDiscover: "Explore Our Activities <i class='fa-solid fa-arrow-right'></i>",
        stat1Label: "Deployed Projects",
        stat2Label: "Satisfied Clients in Morocco",
        stat3Label: "Years of Proven Expertise",
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
        btnFreeQuote: "<i class='fa-solid fa-paper-plane'></i> Request a Free Quote"
    }
};

function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');

    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', 'ltr');

        langBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });

        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (t[key]) {
                elem.innerHTML = t[key];
            }
        });
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            try {
                localStorage.setItem('preferredLang', lang);
            } catch (e) {}
        });
    });

    try {
        let savedLang = localStorage.getItem('preferredLang'); if (savedLang === 'ar') savedLang = 'fr';
        if (savedLang) {
            setLanguage(savedLang);
        }
    } catch (e) {}
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

/* 13. Interactive About Image Slider */
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

/* 14. Automatic Right-Side Hero Image Slideshow */
function initHeroImageSlideshow() {
    const images = document.querySelectorAll('.hero-slideshow-img');
    if (images.length < 2) return;

    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3500);
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







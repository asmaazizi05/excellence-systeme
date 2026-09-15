import re

new_realisations_html = '''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nos Réalisations | Excellence Système - Projets Déployés au Maroc</title>
    <meta name="description" content="Découvrez les projets et réalisations d'Excellence Système à travers le Maroc : hôpitaux, usines, administrations, universités et riads & villas.">
    
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .portfolio-img-box {
            position: relative;
            width: 100%;
            height: 220px;
            border-radius: var(--radius-md);
            overflow: hidden;
            margin-bottom: 18px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.4);
            border: 1px solid rgba(99, 196, 196, 0.2);
        }
        .portfolio-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .portfolio-card:hover .portfolio-img-box img {
            transform: scale(1.08);
        }
    </style>
</head>
<body>

    <!-- Header Navigation with Dropdown Menu -->
    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>

                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="about.html" class="nav-link">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="activites.html" class="nav-link">Solutions & Activités <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="solutions-hoteliere.html" class="dropdown-item"><i class="fa-solid fa-hotel"></i> Solutions Hôtelière</a>
                            <a href="solutions-riad-villa.html" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Solutions Riad & Villa</a>
                            <a href="solutions-innovantes.html" class="dropdown-item"><i class="fa-solid fa-lightbulb"></i> Solutions Innovantes</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="realisations.html" class="nav-link active">Nos réalisations <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="realisations.html#hopitaux" class="dropdown-item"><i class="fa-solid fa-hospital"></i> Hôpitaux</a>
                            <a href="realisations.html#usines" class="dropdown-item"><i class="fa-solid fa-industry"></i> Usines</a>
                            <a href="realisations.html#administrations" class="dropdown-item"><i class="fa-solid fa-landmark"></i> Administrations</a>
                            <a href="realisations.html#universites" class="dropdown-item"><i class="fa-solid fa-graduation-cap"></i> Universités</a>
                            <a href="realisations.html#villas" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Riad & Villa</a>
                        </div>
                    </li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>

                <div class="nav-actions">
                    <div class="lang-selector">
                        <button type="button" class="lang-btn active" data-lang="fr">FR</button>
                        <button type="button" class="lang-btn" data-lang="en">EN</button>
                        <button type="button" class="lang-btn" data-lang="ar">AR</button>
                    </div>

                    <button type="button" class="btn btn-primary btn-sm" data-open-quote>
                        Demander un devis
                    </button>

                    <button type="button" class="mobile-toggle" aria-label="Toggle Menu">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                </div>
            </nav>
        </div>
    </header>

    <!-- Page Hero Banner with Particle Canvas -->
    <section class="page-hero" style="position:relative;">
        <canvas id="hero-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; opacity:0.6;"></canvas>

        <div class="container" style="position:relative; z-index:2;">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Nos Réalisations</span>
            </div>
            <h1 class="page-hero-title">Nos Réalisations & Projets Déployés</h1>
            <p class="page-hero-subtitle">
                Aperçu visuel de nos projets concrétisés sur le terrain en sécurité électronique, réseaux informatiques et domotique au Maroc.
            </p>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section class="realisations">
        <div class="container">
            <div class="text-center">
                <div class="section-tag">
                    <i class="fa-solid fa-briefcase"></i> <span>RÉFÉRENCES SUR LE TERRAIN</span>
                </div>
                <h2 class="section-title">Déploiements par secteurs au Maroc</h2>
                <p class="section-subtitle">
                    Découvrez nos installations réelles chez nos clients hôpitaux, usines, administrations, universités et riads & villas.
                </p>
            </div>

            <!-- Category Filter Tabs (MATCHING DROPDOWN ITEMS EXACTLY) -->
            <div class="category-tabs">
                <button type="button" class="tab-btn active" data-category="all">Tous les projets</button>
                <button type="button" class="tab-btn" data-category="hopitaux"><i class="fa-solid fa-hospital"></i> Hôpitaux</button>
                <button type="button" class="tab-btn" data-category="usines"><i class="fa-solid fa-industry"></i> Usines</button>
                <button type="button" class="tab-btn" data-category="administrations"><i class="fa-solid fa-landmark"></i> Administrations</button>
                <button type="button" class="tab-btn" data-category="universites"><i class="fa-solid fa-graduation-cap"></i> Universités</button>
                <button type="button" class="tab-btn" data-category="villas"><i class="fa-solid fa-house-chimney"></i> Riad & Villa</button>
            </div>

            <div class="portfolio-grid">
                
                <!-- 1. Hôpitaux -->
                <div class="portfolio-card" data-category="hopitaux" id="hopitaux">
                    <div class="portfolio-img-box">
                        <img src="assets/img/detection-incendie-ssi.jpg" alt="Projet Sécurité Incendie & Appel Malade Hôpital">
                    </div>
                    <span class="portfolio-category"><i class="fa-solid fa-hospital"></i> Hôpitaux & Santé</span>
                    <h3 class="portfolio-title">Sécurité Incendie S.S.I. & Appel Malade CHU</h3>
                    <div class="portfolio-location" style="margin-bottom: 12px;">
                        <i class="fa-solid fa-location-dot" style="color:#63C4C4;"></i> Marrakech & Agadir, Maroc
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-muted);">
                        Centrale d'alarme adressable certifiée de catégorie A, bornes d'appel malade certifiées et réseau IP de sécurité hospitalière.
                    </p>
                </div>

                <!-- 2. Usines -->
                <div class="portfolio-card" data-category="usines" id="usines">
                    <div class="portfolio-img-box">
                        <img src="assets/img/controle-acces-biometrie.jpg" alt="Projet Contrôle d'Accès Usine">
                    </div>
                    <span class="portfolio-category"><i class="fa-solid fa-industry"></i> Usines & Industrie</span>
                    <h3 class="portfolio-title">Contrôle d'Accès Biométrique & Barrières Usine</h3>
                    <div class="portfolio-location" style="margin-bottom: 12px;">
                        <i class="fa-solid fa-location-dot" style="color:#63C4C4;"></i> Agadir & Tanger, Maroc
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-muted);">
                        Gestion du temps du personnel avec pointeuses biométriques, tourniquets piétons et barrières d'accès pour poids lourds.
                    </p>
                </div>

                <!-- 3. Administrations -->
                <div class="portfolio-card" data-category="administrations" id="administrations">
                    <div class="portfolio-img-box">
                        <img src="assets/img/services-gtb.jpg" alt="Projet Supervision GTB Administrations">
                    </div>
                    <span class="portfolio-category"><i class="fa-solid fa-landmark"></i> Administrations Publiques</span>
                    <h3 class="portfolio-title">Supervision GTB & Câblage VDI Administrations</h3>
                    <div class="portfolio-location" style="margin-bottom: 12px;">
                        <i class="fa-solid fa-location-dot" style="color:#63C4C4;"></i> Rabat & Marrakech, Maroc
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-muted);">
                        Supervision technique centralisée GTB/GTC des bâtiments ministériels, câblage structuré Cat6A et sécurité accès RFID.
                    </p>
                </div>

                <!-- 4. Universités -->
                <div class="portfolio-card" data-category="universites" id="universites">
                    <div class="portfolio-img-box">
                        <img src="assets/img/services-entreprises.jpg" alt="Projet Réseau Wifi Campus Universitaire">
                    </div>
                    <span class="portfolio-category"><i class="fa-solid fa-graduation-cap"></i> Universités & Écoles</span>
                    <h3 class="portfolio-title">Wi-Fi Haute Densité & Fibre Optique Campus</h3>
                    <div class="portfolio-location" style="margin-bottom: 12px;">
                        <i class="fa-solid fa-location-dot" style="color:#63C4C4;"></i> Marrakech & Casablanca, Maroc
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-muted);">
                        Réseau Wi-Fi 6 haute densité pour 5000+ étudiants, backbone fibre optique inter-facultés et amphi visioconférence.
                    </p>
                </div>

                <!-- 5. Riad & Villa -->
                <div class="portfolio-card" data-category="villas" id="villas">
                    <div class="portfolio-img-box">
                        <img src="assets/img/services-villa.jpg" alt="Projet Domotique & Sécurité Riad & Villa">
                    </div>
                    <span class="portfolio-category"><i class="fa-solid fa-house-chimney"></i> Riad & Villa de Standing</span>
                    <h3 class="portfolio-title">Domotique Smart Home & Alarme Riad & Villa</h3>
                    <div class="portfolio-location" style="margin-bottom: 12px;">
                        <i class="fa-solid fa-location-dot" style="color:#63C4C4;"></i> Marrakech & Rabat, Maroc
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-muted);">
                        Automatisation Smart Home, vidéosurveillance 4K discrète, alarme périmétrique connectée et sonorisation multi-room.
                    </p>
                </div>

            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-banner">
        <div class="container">
            <div class="cta-box">
                <div class="cta-text">
                    <h3>Vous avez un projet de sécurité ou réseau à réaliser ?</h3>
                    <p>Nos ingénieurs et techniciens certifiés se déplacent sur votre site pour réaliser une étude gratuite sur mesure.</p>
                </div>
                <div class="cta-actions">
                    <button type="button" class="btn btn-primary" data-open-quote>
                        Demander un rendez-vous <i class="fa-solid fa-calendar-check"></i>
                    </button>
                    <a href="contact.html" class="btn btn-secondary">
                        Nous contacter
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- FLOATING QUICK CONTACT ACTION WIDGETS -->
    <div class="floating-contact-bar">
        <a href="https://wa.me/212668764271" target="_blank" rel="noopener" class="floating-btn whatsapp" aria-label="Contact WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
            <span class="floating-tooltip">Discuter sur WhatsApp</span>
        </a>

        <a href="tel:+212525324288" class="floating-btn call" aria-label="Appeler l'assistance">
            <i class="fa-solid fa-phone"></i>
            <span class="floating-tooltip">Appeler au +212 5 25 32 42 88</span>
        </a>

        <button type="button" class="floating-btn quote" data-open-quote aria-label="Demander un devis">
            <i class="fa-solid fa-paper-plane"></i>
            <span class="floating-tooltip">Demander un devis</span>
        </button>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                    <p>Votre partenaire de confiance en courant faible et sécurité électronique au Maroc. Plus de 10 ans d'expertise à votre service.</p>
                    <div class="social-links" style="margin-top:16px;">
                        <a href="https://web.facebook.com/ste.excellence.systeme.2025" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/ste__excellence_syst?stkn=MXZ0a3pjbzh1NmE2MQ==" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/excellence-systeme-44733a397/" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://wa.me/212668764271" target="_blank" rel="noopener" class="social-btn" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Navigation</h4>
                    <div class="footer-links">
                        <a href="index.html">Accueil</a>
                        <a href="about.html">À propos</a>
                        <a href="activites.html">Solutions & Activités</a>
                        <a href="realisations.html">Nos réalisations</a>
                        <a href="contact.html">Contact</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Nos Activités</h4>
                    <div class="footer-links">
                        <a href="activites/detection-incendie.html">Détection incendie</a>
                        <a href="activites/videosurveillance.html">Vidéosurveillance IP</a>
                        <a href="activites/controle-acces.html">Contrôle d'accès</a>
                        <a href="activites/reseau-informatique.html">Réseaux informatiques</a>
                        <a href="activites/reseau-optique.html">Réseaux optiques</a>
                        <a href="activites/domotique.html">Domotique & Smart Home</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Contact rapide</h4>
                    <div class="footer-links" style="gap:14px;">
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.4;">
                            <i class="fa-solid fa-location-dot" style="color:#63C4C4; margin-right:8px;"></i>
                            <strong>Adresse :</strong><br>Marrakech ...<br>Agadir ...
                        </p>
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.5;">
                            <i class="fa-solid fa-phone" style="color:#63C4C4; margin-right:8px;"></i> <strong>Téléphone :</strong><br>
                            +212 525324288<br>
                            +212 668764271<br>
                            +212 660270446
                        </p>
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.5;">
                            <i class="fa-solid fa-envelope" style="color:#63C4C4; margin-right:8px;"></i> <strong>Email :</strong><br>
                            <a href="mailto:Excellencesysteme@gmail.com" style="color:var(--text-light);">Excellencesysteme@gmail.com</a><br>
                            <a href="mailto:commercial.exsys@gamil.com" style="color:var(--text-light);">commercial.exsys@gamil.com</a>
                        </p>
                        <a href="https://maps.app.goo.gl/qGhGEnQhsorKXpJs6" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:6px; font-size:0.8rem; padding:8px 14px;">
                            <i class="fa-solid fa-map-location-dot"></i> Localiser sur Google Maps
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 Excellence Système. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <!-- Quote Modal -->
    <div class="modal-overlay" id="quoteModal">
        <div class="modal-container">
            <button type="button" class="modal-close" aria-label="Fermer"><i class="fa-solid fa-xmark"></i></button>
            <div style="margin-bottom: 24px;">
                <div class="hero-badge" style="margin-bottom: 12px;"><i class="fa-solid fa-calculator"></i> DEMANDE DE DEVIS GRATUIT</div>
                <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--white);">Obtenir une estimation sur-mesure</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Remplissez ce formulaire et notre équipe vous recontactera sous 24h ouvrées.</p>
            </div>
            <form id="modalQuoteForm">
                <div class="form-group">
                    <label class="form-label">Nom & Prénom *</label>
                    <input type="text" class="form-control" placeholder="Votre nom" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-control" placeholder="votre@email.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Téléphone *</label>
                        <input type="tel" class="form-control" placeholder="+212 6..." required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Envoyer ma demande de devis <i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>'''

with open('realisations.html', 'w', encoding='utf-8') as f:
    f.write(new_realisations_html)

print("Updated realisations.html successfully!")

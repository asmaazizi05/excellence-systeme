import os

header_nav_root = '''<ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="about.html" class="nav-link">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="activites.html" class="nav-link active">Solutions IT <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="solutions-hoteliere.html" class="dropdown-item"><i class="fa-solid fa-hotel"></i> Solutions Hôtelière</a>
                            <a href="solutions-riad-villa.html" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Solutions Riad & Villa</a>
                            <a href="solutions-innovantes.html" class="dropdown-item"><i class="fa-solid fa-lightbulb"></i> Solutions Innovantes</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="realisations.html" class="nav-link">Nos réalisations <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="realisations.html#hopitaux" class="dropdown-item"><i class="fa-solid fa-hospital"></i> Hôpitaux</a>
                            <a href="realisations.html#usines" class="dropdown-item"><i class="fa-solid fa-industry"></i> Usines</a>
                            <a href="realisations.html#administrations" class="dropdown-item"><i class="fa-solid fa-landmark"></i> Administrations</a>
                            <a href="realisations.html#universites" class="dropdown-item"><i class="fa-solid fa-graduation-cap"></i> Universités</a>
                            <a href="realisations.html#villas" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Riad & Villa</a>
                        </div>
                    </li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>'''

footer = '''<footer class="site-footer">
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
                        <a href="activites.html">Solutions IT</a>
                        <a href="realisations.html">Nos réalisations</a>
                        <a href="contact.html">Contact</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Nos Solutions</h4>
                    <div class="footer-links">
                        <a href="solutions-hoteliere.html">Solutions Hôtelière</a>
                        <a href="solutions-riad-villa.html">Solutions Riad & Villa</a>
                        <a href="solutions-innovantes.html">Solutions Innovantes</a>
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
    </footer>'''

modal = '''<div class="modal-overlay" id="quoteModal">
        <div class="modal-container">
            <button type="button" class="modal-close" aria-label="Fermer"><i class="fa-solid fa-xmark"></i></button>
            <h3>Obtenir une estimation sur-mesure</h3>
            <form id="modalQuoteForm">
                <div class="form-group"><label class="form-label">Nom & Prénom *</label><input type="text" class="form-control" required></div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-control" required></div>
                    <div class="form-group"><label class="form-label">Téléphone *</label><input type="tel" class="form-control" required></div>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Envoyer ma demande</button>
            </form>
        </div>
    </div>'''

# PAGE 1: solutions-hoteliere.html
hoteliere_content = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Hôtelière | Excellence Système</title>
    <meta name="description" content="Solutions Hôtelières en courant faible : les 3 activités principales et les activités rattachées pour hôtels et resorts.">
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>
                {header_nav_root}
                <div class="nav-actions">
                    <div class="lang-selector">
                        <button type="button" class="lang-btn active" data-lang="fr">FR</button>
                        <button type="button" class="lang-btn" data-lang="en">EN</button>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-open-quote>Demander un devis</button>
                    <button type="button" class="mobile-toggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
                </div>
            </nav>
        </div>
    </header>

    <section class="page-hero" style="position:relative;">
        <canvas id="hero-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; opacity:0.6;"></canvas>
        <div class="container" style="position:relative; z-index:2;">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions IT</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Hôtelière</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS HÔTELIÈRE</h1>
            <p class="page-hero-subtitle">
                Infrastructures globales de sécurité, de communication et de connectivité haute performance pour hôtels, resorts et complexes touristiques.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 70px 0;">
        <div class="container">
            
            <!-- SECTION 1: LES 3 ACTIVITÉS PRINCIPALES (Row 1 - 3 Large Cards with Photos) -->
            <div style="margin-bottom: 70px;">
                <div class="text-center" style="margin-bottom: 45px;">
                    <div class="section-tag"><i class="fa-solid fa-star" style="color:var(--primary-turquoise);"></i> <span>ACTIVITÉS PRINCIPALES</span></div>
                    <h2 class="section-title">Les 3 Activités Principales</h2>
                    <p class="section-subtitle">Les piliers majeurs de la Solution Hôtelière.</p>
                </div>

                <div class="solutions-grid">
                    <!-- Main Activity 1 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/detection-incendie-ssi.jpg" alt="Système de Détection Incendie" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-fire-flame-curved"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">SYSTÈME DE DÉTECTION INCENDIE</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Centrales d'alarme adressables certifiées S.S.I. de catégorie A et équipements conformes aux normes hôtelières.</p>
                            <a href="activites/detection-incendie.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Main Activity 2 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/reseau-datacenter.jpg" alt="Réseau Informatique" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-network-wired"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">RÉSEAU INFORMATIQUE</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Câblage structuré Cat6/Cat7, baies serveurs, switching PoE d'établissement et gestion d'infrastructure réseau.</p>
                            <a href="activites/reseau-informatique.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Main Activity 3 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/optique-hero.jpg" alt="Réseau Fibre Optique" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-bolt-lightning"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">RESEAU FIBRE OPTIQUE</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Backbone optique monomode/multimode, raccordements par fusion et très haut débit sur tout l'hôtel.</p>
                            <a href="activites/reseau-optique.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: LES AUTRES ACTIVITÉS (Row 2 - Circular Badges with Logos/Icons) -->
            <div>
                <div class="text-center" style="margin-bottom: 40px;">
                    <div class="section-tag"><i class="fa-solid fa-layer-group"></i> <span>AUTRES ACTIVITÉS</span></div>
                    <h2 class="section-title">Autres Activités de la Solution Hôtelière</h2>
                    <p class="section-subtitle">Cliquez sur un logo circulaire pour accéder à sa page dédiée.</p>
                </div>

                <div class="circle-badge-row">
                    <a href="activites/reseau-informatique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-wifi"></i></div>
                        <span class="circle-badge-label">Réseau Wifi Smart</span>
                    </a>

                    <a href="activites/controle-acces.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-cash-register"></i></div>
                        <span class="circle-badge-label">Solution POS</span>
                    </a>

                    <a href="activites/domotique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-building-user"></i></div>
                        <span class="circle-badge-label">Domotique & Smart Building</span>
                    </a>

                    <a href="activites/videosurveillance.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-video"></i></div>
                        <span class="circle-badge-label">Vidéoprotection</span>
                    </a>

                    <a href="activites/telephonie-ip.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-phone-volume"></i></div>
                        <span class="circle-badge-label">Téléphonie IP</span>
                    </a>

                    <a href="activites/controle-acces.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-fingerprint"></i></div>
                        <span class="circle-badge-label">Contrôle d'Accès</span>
                    </a>

                    <a href="activites/teledistribution.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                        <span class="circle-badge-label">Télédistribution</span>
                    </a>

                    <a href="activites/audiovisuel.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-volume-high"></i></div>
                        <span class="circle-badge-label">Sonorisation</span>
                    </a>

                    <a href="activites/audiovisuel.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-video-slash"></i></div>
                        <span class="circle-badge-label">Vidéoconférence</span>
                    </a>

                    <a href="activites/domotique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-sliders"></i></div>
                        <span class="circle-badge-label">Gestion Technique Centralisée (GTC)</span>
                    </a>
                </div>
            </div>

        </div>
    </section>

    {footer}
    {modal}
    <script src="js/main.js"></script>
</body>
</html>'''

with open('solutions-hoteliere.html', 'w', encoding='utf-8') as f:
    f.write(hoteliere_content)
print("Updated solutions-hoteliere.html")


# PAGE 2: solutions-riad-villa.html
riad_content = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Riad & Villa | Excellence Système</title>
    <meta name="description" content="Solutions Riad & Villa en domotique et sécurité : les 3 activités principales et les activités rattachées.">
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>
                {header_nav_root}
                <div class="nav-actions">
                    <div class="lang-selector">
                        <button type="button" class="lang-btn active" data-lang="fr">FR</button>
                        <button type="button" class="lang-btn" data-lang="en">EN</button>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-open-quote>Demander un devis</button>
                    <button type="button" class="mobile-toggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
                </div>
            </nav>
        </div>
    </header>

    <section class="page-hero" style="position:relative;">
        <canvas id="hero-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; opacity:0.6;"></canvas>
        <div class="container" style="position:relative; z-index:2;">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions IT</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Riad & Villa</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS RIAD & VILLA</h1>
            <p class="page-hero-subtitle">
                Solutions haut de gamme sur-mesure d'automatisation, de protection anti-intrusion, de vidéosurveillance et de confort multimédia pour résidences d'exception, riads et villas.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 70px 0;">
        <div class="container">
            
            <!-- SECTION 1: LES 3 ACTIVITÉS PRINCIPALES (Row 1 - 3 Large Cards with Photos) -->
            <div style="margin-bottom: 70px;">
                <div class="text-center" style="margin-bottom: 45px;">
                    <div class="section-tag"><i class="fa-solid fa-star" style="color:var(--primary-turquoise);"></i> <span>ACTIVITÉS PRINCIPALES</span></div>
                    <h2 class="section-title">Les 3 Activités Principales</h2>
                    <p class="section-subtitle">Les piliers majeurs de la Solution Riad & Villa.</p>
                </div>

                <div class="solutions-grid">
                    <!-- Main Activity 1 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/incendie-adressable.png" alt="Système de Détection Incendie" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-fire-flame-curved"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">SYSTÈME DE DÉTECTION INCENDIE</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Détecteurs autonomes et adressables pour la protection précoce de la villa ou du riad contre les risques d'incendie.</p>
                            <a href="activites/detection-incendie.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Main Activity 2 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/anti-intrusion-ajax.jpg" alt="Système Anti-intrusion" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-shield-cat"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">SYSTÈME ANTI-INTRUSION</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Protection périmétrique extérieure, barrières infrarouges, détecteurs de mouvement et alarme connectée GSM/IP.</p>
                            <a href="activites/anti-intrusion.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Main Activity 3 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/video-hero.jpg" alt="Vidéoprotection" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-video"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">VIDÉOPROTECTION</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Caméras HD/4K esthétiques et discrètes, vision nocturne, analyse intelligente et consultation sur smartphone.</p>
                            <a href="activites/videosurveillance.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: LES AUTRES ACTIVITÉS (Row 2 - Circular Badges with Logos/Icons) -->
            <div>
                <div class="text-center" style="margin-bottom: 40px;">
                    <div class="section-tag"><i class="fa-solid fa-layer-group"></i> <span>AUTRES ACTIVITÉS</span></div>
                    <h2 class="section-title">Autres Activités de la Solution Riad & Villa</h2>
                    <p class="section-subtitle">Cliquez sur un logo circulaire pour accéder à sa page dédiée.</p>
                </div>

                <div class="circle-badge-row">
                    <a href="activites/domotique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-house-signal"></i></div>
                        <span class="circle-badge-label">Domotique & Smart Home</span>
                    </a>

                    <a href="activites/reseau-informatique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-network-wired"></i></div>
                        <span class="circle-badge-label">Réseau Info & Optique</span>
                    </a>

                    <a href="activites/reseau-informatique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-wifi"></i></div>
                        <span class="circle-badge-label">Réseau Wifi Smart</span>
                    </a>

                    <a href="activites/telephonie-ip.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-phone-volume"></i></div>
                        <span class="circle-badge-label">Intercom IP</span>
                    </a>

                    <a href="activites/audiovisuel.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-volume-high"></i></div>
                        <span class="circle-badge-label">Sonorisation</span>
                    </a>

                    <a href="activites/motorisation.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-torii-gate"></i></div>
                        <span class="circle-badge-label">Automatisme (Portails)</span>
                    </a>

                    <a href="activites/audiovisuel.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-sliders"></i></div>
                        <span class="circle-badge-label">Multi Room</span>
                    </a>

                    <a href="activites/teledistribution.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                        <span class="circle-badge-label">Télédistribution</span>
                    </a>

                    <a href="activites/audiovisuel.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-tv"></i></div>
                        <span class="circle-badge-label">Home Cinéma</span>
                    </a>
                </div>
            </div>

        </div>
    </section>

    {footer}
    {modal}
    <script src="js/main.js"></script>
</body>
</html>'''

with open('solutions-riad-villa.html', 'w', encoding='utf-8') as f:
    f.write(riad_content)
print("Updated solutions-riad-villa.html")


# PAGE 3: solutions-innovantes.html
innov_content = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Innovantes | Excellence Système</title>
    <meta name="description" content="Solutions Innovantes en sécurité et bâtiment intelligent : les 3 activités principales et les activités rattachées.">
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>
                {header_nav_root}
                <div class="nav-actions">
                    <div class="lang-selector">
                        <button type="button" class="lang-btn active" data-lang="fr">FR</button>
                        <button type="button" class="lang-btn" data-lang="en">EN</button>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-open-quote>Demander un devis</button>
                    <button type="button" class="mobile-toggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
                </div>
            </nav>
        </div>
    </header>

    <section class="page-hero" style="position:relative;">
        <canvas id="hero-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; opacity:0.6;"></canvas>
        <div class="container" style="position:relative; z-index:2;">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions IT</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Innovantes</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS INNOVANTES</h1>
            <p class="page-hero-subtitle">
                Technologies de pointe pour la gestion de parking, l'appel malade, la GTB/GTC et l'automatisation avancée des bâtiments.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 70px 0;">
        <div class="container">
            
            <!-- SECTION 1: LES 3 ACTIVITÉS PRINCIPALES (Row 1 - 3 Large Cards with Photos) -->
            <div style="margin-bottom: 70px;">
                <div class="text-center" style="margin-bottom: 45px;">
                    <div class="section-tag"><i class="fa-solid fa-star" style="color:var(--primary-turquoise);"></i> <span>ACTIVITÉS PRINCIPALES</span></div>
                    <h2 class="section-title">Les 3 Activités Principales</h2>
                    <p class="section-subtitle">Les piliers majeurs des Solutions Innovantes.</p>
                </div>

                <div class="solutions-grid">
                    <!-- Main Activity 1 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/motorisation-barriere.jpg" alt="Gestion de Parking" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-square-parking"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">GESTION DE PARKING</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Lecture automatique de plaques d'immatriculation LPR/ANPR, barrières automatiques et comptage de places.</p>
                            <a href="activites/controle-acces.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Main Activity 2 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/telephony-hero.jpg" alt="Appel Malade" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-kit-medical"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">APPEL MALADE</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Systèmes d'appel et d'alerte médicale pour hôpitaux, cliniques et résidences médicalisées avec traçabilité complète.</p>
                            <a href="activites/telephonie-ip.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Main Activity 3 -->
                    <div class="solution-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 220px; width: 100%; overflow: hidden; position: relative;">
                            <img src="assets/img/services-gtb.jpg" alt="Gestion Technique de Bâtiment (GTB)" style="width: 100%; height: 100%; object-fit: cover;">
                            <span class="main-activity-badge">Principale</span>
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div class="solution-icon" style="margin-bottom: 0; width: 44px; height: 44px; font-size: 1.2rem;"><i class="fa-solid fa-building-user"></i></div>
                                <h3 class="solution-title" style="font-size: 1.15rem; margin-bottom: 0;">GESTION TECHNIQUE (GTB)</h3>
                            </div>
                            <p class="solution-desc" style="font-size: 0.9rem;">Supervision centralisée des consommations énergétiques, de l'éclairage, du CVC et de la sécurité du bâtiment.</p>
                            <a href="activites/domotique.html" class="solution-link" style="margin-top: auto;">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: LES AUTRES ACTIVITÉS (Row 2 - Circular Badges with Logos/Icons) -->
            <div>
                <div class="text-center" style="margin-bottom: 40px;">
                    <div class="section-tag"><i class="fa-solid fa-layer-group"></i> <span>AUTRES ACTIVITÉS</span></div>
                    <h2 class="section-title">Autres Activités des Solutions Innovantes</h2>
                    <p class="section-subtitle">Cliquez sur un logo circulaire pour accéder à sa page dédiée.</p>
                </div>

                <div class="circle-badge-row">
                    <a href="activites/detection-incendie.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-fire-extinguisher"></i></div>
                        <span class="circle-badge-label">Extinction Automatique</span>
                    </a>

                    <a href="activites/domotique.html" class="circle-badge-item" style="width: 115px;">
                        <div class="circle-badge-icon"><i class="fa-solid fa-microchip"></i></div>
                        <span class="circle-badge-label">Automate Programmable</span>
                    </a>
                </div>
            </div>

        </div>
    </section>

    {footer}
    {modal}
    <script src="js/main.js"></script>
</body>
</html>'''

with open('solutions-innovantes.html', 'w', encoding='utf-8') as f:
    f.write(innov_content)
print("Updated solutions-innovantes.html")

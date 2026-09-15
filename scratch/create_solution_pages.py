import os

def create_solution_pages():
    header_nav_root = '''<ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="about.html" class="nav-link">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="activites.html" class="nav-link active">Solutions & Activités <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
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
                        <a href="activites.html">Solutions & Activités</a>
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
    hoteliere_html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Hôtelière | Excellence Système</title>
    <meta name="description" content="Infrastructures complètes en courant faible et sécurité électronique pour hôtels et établissements touristiques au Maroc.">
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
                        <button type="button" class="lang-btn" data-lang="ar">AR</button>
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
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions & Activités</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Hôtelière</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS HÔTELIÈRE</h1>
            <p class="page-hero-subtitle">
                Ingénierie, fourniture et installation clé en main de solutions en courant faible, sécurité et réseaux pour les hôtels, resorts et complexes touristiques.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 60px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-tag"><i class="fa-solid fa-hotel"></i> <span>13 ACTIVITÉS DE LA SOLUTION HÔTELIÈRE</span></div>
                <h2 class="section-title">Catalogue des Activités Métier Hôtelières</h2>
                <p class="section-subtitle">Découvrez l'ensemble des expertises techniques rattachées aux établissements hôteliers.</p>
            </div>

            <div class="solutions-grid">
                <!-- 1 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <h3 class="solution-title">SYSTÈME DE DÉTECTION INCENDIE</h3>
                    <p class="solution-desc">Centrale d'alarme adressable certifiée SSI de catégorie A, détecteurs optiques et déclencheurs conformes aux normes hôtelières.</p>
                    <a href="activites/detection-incendie.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 2 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <h3 class="solution-title">RÉSEAU INFORMATIQUE</h3>
                    <p class="solution-desc">Câblage structuré VDI Cat6/Cat7, baies serveurs, switching PoE d'établissement et gestion d'infrastructure réseau.</p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 3 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
                    <h3 class="solution-title">RESEAU FIBRE OPTIQUE</h3>
                    <p class="solution-desc">Backbone optique monomode/multimode, raccordements par fusion et très haut débit sur l'ensemble du complexe hôtelier.</p>
                    <a href="activites/reseau-optique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 4 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-wifi"></i></div>
                    <h3 class="solution-title">RESEAU WIFI SMART</h3>
                    <p class="solution-desc">Bornes Wi-Fi 6 haute densité, portail captif d'établissement, gestion multi-SSID pour clients et administration.</p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 5 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-cash-register"></i></div>
                    <h3 class="solution-title">SOLUTION POS</h3>
                    <p class="solution-desc">Terminaux de point de vente tactiles, lecteurs de badges et intégration logicielle pour restaurants et bars d'hôtels.</p>
                    <a href="activites/controle-acces.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 6 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-building-user"></i></div>
                    <h3 class="solution-title">DOMOTIQUE & SMART BUILDING</h3>
                    <p class="solution-desc">Gestion de l'éclairage des chambres, régulation de température CVC et scénarios d'accueil à la carte.</p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 7 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-video"></i></div>
                    <h3 class="solution-title">VIDÉOPROTECTION</h3>
                    <p class="solution-desc">Caméras IP Haute Définition 4K, vision nocturne, enregistreurs NVR et supervision des zones publiques et accès.</p>
                    <a href="activites/videosurveillance.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 8 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-phone-volume"></i></div>
                    <h3 class="solution-title">TÉLÉPHONIE IP</h3>
                    <p class="solution-desc">Autocommutateurs IP-PBX hôteliers, terminaux de chambre, pré-décroché automatique et postes administratifs.</p>
                    <a href="activites/telephonie-ip.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 9 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-fingerprint"></i></div>
                    <h3 class="solution-title">CONTRÔLE D’ACCÈS</h3>
                    <p class="solution-desc">Serrures électroniques à carte RFID/Mifare, contrôle d'accès du personnel, ascenseurs et zones réservées.</p>
                    <a href="activites/controle-acces.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 10 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                    <h3 class="solution-title">TELEDISTRIBUTION</h3>
                    <p class="solution-desc">Station de tête satellite/TNT, distribution IPTV sur réseau Ethernet, bouquets de chaînes internationales HD.</p>
                    <a href="activites/teledistribution.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 11 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-volume-high"></i></div>
                    <h3 class="solution-title">SONORISATION</h3>
                    <p class="solution-desc">Sonorisation d'ambiance multi-zone pour halls, restaurants, spas, terrasses et diffusion d'évacuation d'urgence.</p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 12 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-video-slash"></i></div>
                    <h3 class="solution-title">VIDÉOCONFERENCE</h3>
                    <p class="solution-desc">Équipements audiovisuels pour salles de réunion et séminaires : visioconférence 4K, micros sans fil et écrans interactifs.</p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 13 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-sliders"></i></div>
                    <h3 class="solution-title">GESTION TECHNIQUE CENTRALISE (GTC)</h3>
                    <p class="solution-desc">Supervision centralisée des équipements techniques de l'établissement pour optimiser la maintenance et l'énergie.</p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
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
        f.write(hoteliere_html)
    print("Created solutions-hoteliere.html")


    # PAGE 2: solutions-riad-villa.html
    riad_html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Riad & Villa | Excellence Système</title>
    <meta name="description" content="Domotique, sécurité et automatisation haut de gamme pour riads, villas et résidences de standing au Maroc.">
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
                        <button type="button" class="lang-btn" data-lang="ar">AR</button>
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
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions & Activités</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Riad & Villa</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS RIAD & VILLA</h1>
            <p class="page-hero-subtitle">
                Technologie d'automatisation Smart Home, protection anti-intrusion discrète et confort multimédia sur-mesure pour riads et villas de luxe.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 60px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-tag"><i class="fa-solid fa-house-chimney"></i> <span>12 ACTIVITÉS DE LA SOLUTION RIAD & VILLA</span></div>
                <h2 class="section-title">Catalogue des Activités Résidentielles & Riads</h2>
                <p class="section-subtitle">Découvrez les expertises techniques rattachées aux villas et résidences de standing.</p>
            </div>

            <div class="solutions-grid">
                <!-- 1 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <h3 class="solution-title">SYSTÈME DE DÉTECTION INCENDIE</h3>
                    <p class="solution-desc">Protection précoce incendie, détecteurs optiques et thermiques autonomes ou raccordés pour riads et villas.</p>
                    <a href="activites/detection-incendie.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 2 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-shield-cat"></i></div>
                    <h3 class="solution-title">SYSTÈME ANTI-INTRUSION</h3>
                    <p class="solution-desc">Alarme sans fil/filaire connectée, barrières infrarouges extérieures et télésurveillance mobile GSM/IP.</p>
                    <a href="activites/anti-intrusion.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 3 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-video"></i></div>
                    <h3 class="solution-title">VIDÉOPROTECTION</h3>
                    <p class="solution-desc">Vidéosurveillance IP 4K esthétique et discrète, vision nocturne et consultation en direct sur smartphone.</p>
                    <a href="activites/videosurveillance.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 4 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-house-signal"></i></div>
                    <h3 class="solution-title">DOMOTIQUE & SMART HOME</h3>
                    <p class="solution-desc">Pilotage centralisé de l'éclairage, climatisation, volets et scénarios d'ambiance sur écran tactile et mobile.</p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 5 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <h3 class="solution-title">RÉSEAU INFORMATIQUE & OPTIQUE</h3>
                    <p class="solution-desc">Câblage structuré Cat6/Cat7, coffrets réseau discrets et backbone fibre optique d'interconnexion.</p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 6 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-wifi"></i></div>
                    <h3 class="solution-title">RESEAU WIFI SMART</h3>
                    <p class="solution-desc">Couverture Wi-Fi Mesh fluide sans interruption dans toute la propriété, terrasses et espaces extérieurs.</p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 7 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-phone-volume"></i></div>
                    <h3 class="solution-title">INTERCOM IP</h3>
                    <p class="solution-desc">Visiophonie IP connectée, portiers vidéo haute définition avec réponse à distance sur smartphone.</p>
                    <a href="activites/telephonie-ip.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 8 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-volume-high"></i></div>
                    <h3 class="solution-title">SONORISATION</h3>
                    <p class="solution-desc">Systèmes de sonorisation d'ambiance d'intérieur et d'extérieur étanches pour jardins et piscines.</p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 9 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-torii-gate"></i></div>
                    <h3 class="solution-title">AUTOMATISME</h3>
                    <p class="solution-desc">Motorisation de portails coulissants ou battants, portes de garage sectionnelles et barrières d'accès.</p>
                    <a href="activites/motorisation.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 10 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-sliders"></i></div>
                    <h3 class="solution-title">MULTI ROOM</h3>
                    <p class="solution-desc">Diffusion audio multi-zone sans fil ou filaire indépendante dans chaque suite, salon et patio.</p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 11 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                    <h3 class="solution-title">TELEDISTRIBUTION</h3>
                    <p class="solution-desc">Réception et distribution par câble ou IP des bouquets télévisés HD/4K dans l'ensemble de la demeure.</p>
                    <a href="activites/teledistribution.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 12 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-tv"></i></div>
                    <h3 class="solution-title">HOME CINEMA</h3>
                    <p class="solution-desc">Installation sur-mesure de salles de cinéma privées, vidéoprojecteurs laser 4K et acoustique immersives Dolby Atmos.</p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
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
        f.write(riad_html)
    print("Created solutions-riad-villa.html")


    # PAGE 3: solutions-innovantes.html
    innov_html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Innovantes | Excellence Système</title>
    <meta name="description" content="Solutions technologiques innovantes : gestion de parking, appel malade, GTB et automatisation avancée au Maroc.">
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
                        <button type="button" class="lang-btn" data-lang="ar">AR</button>
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
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions & Activités</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Innovantes</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS INNOVANTES</h1>
            <p class="page-hero-subtitle">
                Systèmes intelligents d'automatisation, gestion intelligente du stationnement, alerte médicale certifiée et supervision GTB/GTC.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 60px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-tag"><i class="fa-solid fa-lightbulb"></i> <span>5 ACTIVITÉS DE LA SOLUTION INNOVANTE</span></div>
                <h2 class="section-title">Catalogue des Activités Innovantes</h2>
                <p class="section-subtitle">Découvrez les expertises technologiques innovantes pour bâtiments intelligents.</p>
            </div>

            <div class="solutions-grid">
                <!-- 1 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-square-parking"></i></div>
                    <h3 class="solution-title">GESTION DE PARKING</h3>
                    <p class="solution-desc">Lecture automatique de plaques d'immatriculation LPR/ANPR, barrières rapides, comptage dynamique et guidage à la place.</p>
                    <a href="activites/controle-acces.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 2 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-kit-medical"></i></div>
                    <h3 class="solution-title">APPEL MALADE</h3>
                    <p class="solution-desc">Systèmes d'appel et d'alerte médicale d'urgence certifiés pour hôpitaux, cliniques et résidences médicalisées.</p>
                    <a href="activites/telephonie-ip.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 3 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-building-user"></i></div>
                    <h3 class="solution-title">GESTION TECHNIQUE DE BATIMENT (GTB)</h3>
                    <p class="solution-desc">Supervision globale centralisée de l'énergie, de l'éclairage, du CVC et de la sécurité des grands bâtiments.</p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 4 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-fire-extinguisher"></i></div>
                    <h3 class="solution-title">EXTINCTION AUTOMATIQUE</h3>
                    <p class="solution-desc">Dispositifs d'extinction automatique par gaz (FM200, Novec, N2) pour la protection des datacenters et locaux à haut risque.</p>
                    <a href="activites/detection-incendie.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <!-- 5 -->
                <div class="solution-card">
                    <div class="solution-icon"><i class="fa-solid fa-microchip"></i></div>
                    <h3 class="solution-title">AUTOMATE PROGRAMMABLE</h3>
                    <p class="solution-desc">Contrôleurs et automates industriels de régulation pour l'automatisation technique avancée des installations.</p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
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
        f.write(innov_html)
    print("Created solutions-innovantes.html")

create_solution_pages()

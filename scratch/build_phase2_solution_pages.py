import os

header_nav = '''<ul class="nav-menu">
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
                        <a href="https://www.instagram.com/ste__excellence_systeme?stkn=MXZ0a3pjbzh1NmE2MQ==" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/mohamed-azizi-7a390a77?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
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
                            <a href="mailto:commercial.exsys@gmail.com" style="color:var(--text-light);">commercial.exsys@gmail.com</a>
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
    <meta name="description" content="Infrastructures globales de sécurité, communication et connectivité pour hôtels et complexes hôteliers au Maroc.">
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .solution-hero-bg {{
            background: linear-gradient(135deg, rgba(13,16,19,0.88), rgba(13,16,19,0.75)), url('assets/img/bg-solution-hoteliere.jpg') center/cover no-repeat;
            padding: 110px 0 80px 0;
            border-bottom: 1px solid var(--charcoal-border);
        }}
    </style>
</head>
<body>

    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>
                {header_nav}
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

    <section class="solution-hero-bg">
        <div class="container">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions IT</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Hôtelière</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS HÔTELIÈRE</h1>
            <p class="page-hero-subtitle" style="max-width:850px;">
                Infrastructures globales de sécurité, de communication et de connectivité haute performance spécialement conçues pour les hôtels, resorts et complexes touristiques de standing.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 70px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-tag" style="justify-content:center;"><i class="fa-solid fa-hotel"></i> <span>DESCRIPTIONS DES ACTIVITÉS HÔTELIÈRES</span></div>
                <h2 class="section-title">Les Activités de la Solution Hôtelière</h2>
                <p class="section-subtitle">Retrouvez ci-dessous la totalité des services et technologies intégrés dans nos déploiements hôteliers.</p>
            </div>

            <div class="solutions-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
                
                <!-- 1 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <h3 class="solution-title">Système de Détection Incendie</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        La solution de détection incendie permet d’assurer une surveillance continue et fiable contre les risques d’incendie. Elle comprend des systèmes adressables et conventionnels adaptés aux configurations hôtelières. La technologie adressable identifie précisément le détecteur à l’origine de l’alarme, tandis que la technologie conventionnelle organise les équipements par zones. Intégration de détecteurs de fumée, de chaleur, déclencheurs manuels et sirènes.
                    </p>
                    <a href="activites/detection-incendie.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 2 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <h3 class="solution-title">Réseau Informatique</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        La solution de réseau informatique assure une infrastructure fiable, performante et sécurisée. Elle permet de interconnecter ordinateurs, serveurs, téléphones IP, bornes Wi-Fi et baies de brassage. Les switches gèrent la distribution et alimentent les équipements en PoE. Le réseau est structuré en VLANs pour isoler les flux clients et administratifs avec des pare-feu de protection.
                    </p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 3 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
                    <h3 class="solution-title">Réseau Fibre Optique</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Le réseau fibre optique assure une transmission très haut débit sur de longues distances. Il offre une résistance totale aux interférences électromagnétiques. L'infrastructure monomode ou multimode relie efficacement les sous-répartiteurs, baies serveurs et équipements de l'établissement avec raccordements par fusion.
                    </p>
                    <a href="activites/reseau-optique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 4 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-wifi"></i></div>
                    <h3 class="solution-title">Réseau Wi-Fi Smart</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Déploiement de bornes Wi-Fi 6 haute densité pour garantir une connexion haut débit fluide et homogène sans zone d'ombre dans les chambres, halls, restaurants et espaces extérieurs de l'hôtel.
                    </p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 5 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-cash-register"></i></div>
                    <h3 class="solution-title">Solution POS (Point de Vente)</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Terminaux de caisse intelligents et gestion informatisée des points de vente pour restaurants, bars, spa et boutiques de l'établissement avec synchronisation des consommations sur la note de chambre.
                    </p>
                    <a href="activites/controle-acces.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 6 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-building-user"></i></div>
                    <h3 class="solution-title">Domotique & Smart Building</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Gestion centralisée et automatisée du bâtiment : pilotage de l'éclairage d'ambiance, de la climatisation, des rideaux et de l'énergie pour offrir un confort d'exception aux résidents et réduire la facture énergétique.
                    </p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 7 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-video"></i></div>
                    <h3 class="solution-title">Vidéoprotection</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Surveillance continue des espaces par caméras IP haute définition avec vision nocturne, analyse intelligente des mouvements et enregistrement centralisé NVR consultant à distance.
                    </p>
                    <a href="activites/videosurveillance.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 8 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-phone-volume"></i></div>
                    <h3 class="solution-title">Téléphonie IP</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Gestion des communications VoIP via IPBX centralisé, postes téléphones IP en chambre et en réception, transfert d'appels, messagerie vocale et postes sans fil Wi-Fi.
                    </p>
                    <a href="activites/telephonie-ip.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 9 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-fingerprint"></i></div>
                    <h3 class="solution-title">Contrôle d'Accès</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Sécurisation des accès par lecteurs de badges, cartes RFID, serrures électroniques de chambre et biométrie avec traçabilité complète des entrées/sorties.
                    </p>
                    <a href="activites/controle-acces.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 10 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                    <h3 class="solution-title">Télédistribution</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Réception et distribution centralisée des signaux TV (TNT, Satellite) vers les chambres avec une qualité d'image HD/4K optimale et réseau coaxial ou IPTV structuré.
                    </p>
                    <a href="activites/teledistribution.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 11 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-volume-high"></i></div>
                    <h3 class="solution-title">Sonorisation</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Diffusion de musique d'ambiance et d'annonces sonores multi-zone pour halls, restaurants, spas et terrasses avec enceintes encastrées et amplificateurs professionnels.
                    </p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 12 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-video-slash"></i></div>
                    <h3 class="solution-title">Vidéoconférence</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Équipement haut de gamme pour salles de réunion hôtelières : caméras tracking, microphones de table, écrans interactifs et visioconférence collaborative.
                    </p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 13 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-sliders"></i></div>
                    <h3 class="solution-title">Gestion Technique Centralisée (GTC)</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Supervision centralisée sur écran des consommations électriques, de l'éclairage, du CVC et des équipements de sécurité pour une gestion efficiente de l'établissement.
                    </p>
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
print("Built solutions-hoteliere.html")


# PAGE 2: solutions-riad-villa.html
riad_html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Riad & Villa | Excellence Système</title>
    <meta name="description" content="Solutions sur mesure de domotique, sécurité, visiophoine et sonorisation pour riads et villas d'exception au Maroc.">
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .solution-hero-bg {{
            background: linear-gradient(135deg, rgba(13,16,19,0.88), rgba(13,16,19,0.75)), url('assets/img/bg-solution-riad-villa.png') center/cover no-repeat;
            padding: 110px 0 80px 0;
            border-bottom: 1px solid var(--charcoal-border);
        }}
    </style>
</head>
<body>

    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>
                {header_nav}
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

    <section class="solution-hero-bg">
        <div class="container">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions IT</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Riad & Villa</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS RIAD & VILLA</h1>
            <p class="page-hero-subtitle" style="max-width:850px;">
                Solutions haut de gamme sur-mesure d'automatisation domotique, de protection anti-intrusion, de vidéosurveillance et de confort multimédia pour résidences d'exception, riads et villas.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 70px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-tag" style="justify-content:center;"><i class="fa-solid fa-house-chimney"></i> <span>DESCRIPTIONS DES ACTIVITÉS RIAD & VILLA</span></div>
                <h2 class="section-title">Les Activités de la Solution Riad & Villa</h2>
                <p class="section-subtitle">Découvrez l'ensemble de nos technologies conçues pour sublimer et sécuriser votre demeure.</p>
            </div>

            <div class="solutions-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
                
                <!-- 1 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <h3 class="solution-title">Système de Détection Incendie</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Détecteurs autonomes et adressables pour la protection précoce de la villa ou du riad contre les risques d'incendie, assurant une sécurité absolue tout en s'intégrant discrètement à l'architecture.
                    </p>
                    <a href="activites/detection-incendie.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 2 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-shield-cat"></i></div>
                    <h3 class="solution-title">Système Anti-Intrusion</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Protection périmétrique extérieure, barrières infrarouges, détecteurs de mouvement et alarme connectée GSM/IP avec notification immédiate sur votre smartphone en cas d'anomalie.
                    </p>
                    <a href="activites/anti-intrusion.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 3 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-video"></i></div>
                    <h3 class="solution-title">Vidéoprotection</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        La solution de vidéosurveillance assure une surveillance continue et discrète des accès et extérieurs par caméras IP 4K avec vision nocturne et visionnage à distance sur mobile.
                    </p>
                    <a href="activites/videosurveillance.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 4 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-house-signal"></i></div>
                    <h3 class="solution-title">Domotique & Smart Home</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Transformez votre villa ou riad en un espace d'exception : contrôle centralisé de l'éclairage d'ambiance, de la climatisation, des volets et des accès depuis une interface unique sur smartphone.
                    </p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 5 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <h3 class="solution-title">Réseau Informatique & Optique</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Couverture Wi-Fi professionnelle intégrale sans zone d'ombre à travers les murs épais des riads, baies de brassage structurées et liaisons fibre optique haute performance.
                    </p>
                    <a href="activites/reseau-informatique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 6 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-phone-volume"></i></div>
                    <h3 class="solution-title">Intercom IP pour Villa & Riad</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        L’intercom IP permet la communication audio et vidéo HD entre l’entrée, les pièces et votre smartphone. Caméra HD, contrôle à distance et intégration de la serrure électrique.
                    </p>
                    <a href="activites/telephonie-ip.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 7 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-volume-high"></i></div>
                    <h3 class="solution-title">Sonorisation pour Villa & Riad</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Diffusion musicale élégante et de haute qualité dans les salons, chambres, terrasses et jardins grâce à des enceintes encastrées ou d'extérieur adaptées à l'architecture.
                    </p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 8 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-torii-gate"></i></div>
                    <h3 class="solution-title">Automatisme pour Villa & Riad</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Motorisation et commande centralisée des portails, portes, volets roulants, stores et rideaux avec programmation de scénarios et intégration au système domotique.
                    </p>
                    <a href="activites/motorisation.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 9 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-sliders"></i></div>
                    <h3 class="solution-title">Multiroom Audio pour Villa & Riad</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Diffusion de musique indépendante ou synchronisée dans tous les espaces (salons, piscine, terrasses) contrôlée facilement depuis smartphone ou écran mural.
                    </p>
                    <a href="activites/audiovisuel.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 10 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                    <h3 class="solution-title">Télédiffusion & Télédistribution</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Distribution centralisée des signaux TV (TNT, Satellite) pour desservir tous les téléviseurs de la résidence avec une qualité d'image optimale et une installation très discrète.
                    </p>
                    <a href="activites/teledistribution.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 11 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-tv"></i></div>
                    <h3 class="solution-title">Home Cinéma pour Villa & Riad</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Création d'une salle de cinéma privée haut de gamme : vidéoprojecteur 4K, son enveloppant multicanal et automatisation synchrone des éclairages et rideaux.
                    </p>
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
print("Built solutions-riad-villa.html")


# PAGE 3: solutions-innovantes.html
innov_html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solutions Innovantes | Excellence Système</title>
    <meta name="description" content="Technologies innovantes pour gestion de parking, appel malade, GTB et extinction automatique au Maroc.">
    <link rel="icon" type="image/png" href="assets/logo-3d.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .solution-hero-bg {{
            background: linear-gradient(135deg, rgba(13,16,19,0.88), rgba(13,16,19,0.75)), url('assets/img/bg-solution-innovante.jpg') center/cover no-repeat;
            padding: 110px 0 80px 0;
            border-bottom: 1px solid var(--charcoal-border);
        }}
    </style>
</head>
<body>

    <header class="site-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-logo">
                    <img src="assets/logo-3d.png" alt="Excellence Système Logo">
                </a>
                {header_nav}
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

    <section class="solution-hero-bg">
        <div class="container">
            <div class="breadcrumbs">
                <a href="index.html">Accueil</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <a href="activites.html">Solutions IT</a> <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i> <span>Solutions Innovantes</span>
            </div>
            <h1 class="page-hero-title">SOLUTIONS INNOVANTES</h1>
            <p class="page-hero-subtitle" style="max-width:850px;">
                Technologies de pointe pour la gestion intelligente de parking, l'appel malade hospitalier, la GTB/GTC, l'extinction automatique et les automates programmables industriels.
            </p>
        </div>
    </section>

    <section class="solutions" style="padding: 70px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-tag" style="justify-content:center;"><i class="fa-solid fa-lightbulb"></i> <span>DESCRIPTIONS DES SOLUTIONS INNOVANTES</span></div>
                <h2 class="section-title">Les Activités des Solutions Innovantes</h2>
                <p class="section-subtitle">Découvrez nos technologies spécialisées de sécurité et de gestion intelligente du bâtiment.</p>
            </div>

            <div class="solutions-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
                
                <!-- 1 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-square-parking"></i></div>
                    <h3 class="solution-title">Gestion Intelligente du Parking</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        La solution de gestion intelligente du parking permet d’optimiser, sécuriser et automatiser l’accès aux espaces de stationnement. Elle intègre la reconnaissance automatique de plaques d'immatriculation (LPR/ANPR), barrières automatiques, comptage de places disponibles et guidage à la place.
                    </p>
                    <a href="activites/controle-acces.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 2 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-kit-medical"></i></div>
                    <h3 class="solution-title">Système d’Appel Malade Intelligent</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Communication rapide et fiable entre patients et soignants pour hôpitaux et cliniques. Transmissions instantanées des demandes d'assistance sur postes infirmiers et mobiles du personnel avec voyants lumineux et traçabilité complète.
                    </p>
                    <a href="activites/telephonie-ip.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 3 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-building-user"></i></div>
                    <h3 class="solution-title">Gestion Technique du Bâtiment (GTB)</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Supervision et pilotage centralisés de l’éclairage, de la climatisation, du chauffage, de la ventilation et de l'énergie depuis une plateforme unique pour réduire les consommations et optimiser le confort.
                    </p>
                    <a href="activites/domotique.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 4 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-fire-extinguisher"></i></div>
                    <h3 class="solution-title">Système d’Extinction Automatique</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Protection rapide et autonome des zones sensibles (salles serveurs, locaux électriques) avec détection et déclenchement automatique d'agents d'extinction appropriés sans intervention humaine.
                    </p>
                    <a href="activites/detection-incendie.html" class="solution-link">En savoir plus <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- 5 -->
                <div class="solution-card" style="padding: 28px;">
                    <div class="solution-icon"><i class="fa-solid fa-microchip"></i></div>
                    <h3 class="solution-title">Automate Programmable Industriel (API)</h3>
                    <p class="solution-desc" style="line-height:1.65; color:var(--text-muted);">
                        Automates de commande pour piloter les installations techniques (éclairage, pompes, moteurs, portes, ventilation) selon des scénarios et capteurs prédéfinis pour une efficacité maximale.
                    </p>
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
print("Built solutions-innovantes.html")

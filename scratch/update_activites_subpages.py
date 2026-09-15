import os
import glob

nav_replacement = '''                    <li><a href="../index.html" class="nav-link">Accueil</a></li>
                    <li><a href="../about.html" class="nav-link">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="../activites.html" class="nav-link active">Solutions& Activités <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="../services.html#hotellerie" class="dropdown-item" style="color:var(--primary-turquoise); font-weight:700; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:4px;"><i class="fa-solid fa-hotel"></i> Solutions Hôtelière</a>
                            <a href="../services.html#villas" class="dropdown-item" style="color:var(--primary-turquoise); font-weight:700; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:4px;"><i class="fa-solid fa-house-chimney"></i> Solutions Riad & Villa</a>
                            <a href="../services.html#entreprises" class="dropdown-item" style="color:var(--primary-turquoise); font-weight:700; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:4px;"><i class="fa-solid fa-lightbulb"></i> Solutions Innovantes</a>
                            <a href="detection-incendie.html" class="dropdown-item"><i class="fa-solid fa-fire-flame-curved"></i> Détection incendie</a>
                            <a href="anti-intrusion.html" class="dropdown-item"><i class="fa-solid fa-shield-cat"></i> Anti-intrusion</a>
                            <a href="reseau-informatique.html" class="dropdown-item"><i class="fa-solid fa-network-wired"></i> Réseau informatique</a>
                            <a href="videosurveillance.html" class="dropdown-item"><i class="fa-solid fa-video"></i> Vidéosurveillance IP</a>
                            <a href="telephonie-ip.html" class="dropdown-item"><i class="fa-solid fa-phone-volume"></i> Téléphonie IP</a>
                            <a href="controle-acces.html" class="dropdown-item"><i class="fa-solid fa-fingerprint"></i> Contrôle d'accès</a>
                            <a href="audiovisuel.html" class="dropdown-item"><i class="fa-solid fa-tv"></i> Audiovisuel</a>
                            <a href="domotique.html" class="dropdown-item"><i class="fa-solid fa-house-signal"></i> Domotique & GTB</a>
                            <a href="motorisation.html" class="dropdown-item"><i class="fa-solid fa-torii-gate"></i> Motorisation portail</a>
                            <a href="reseau-optique.html" class="dropdown-item"><i class="fa-solid fa-bolt-lightning"></i> Réseau optique</a>
                            <a href="teledistribution.html" class="dropdown-item"><i class="fa-solid fa-satellite-dish"></i> Télédistribution</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="../realisations.html" class="nav-link">Réalisations <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="../realisations.html#hopitaux" class="dropdown-item"><i class="fa-solid fa-hospital"></i> Hôpitaux</a>
                            <a href="../realisations.html#usines" class="dropdown-item"><i class="fa-solid fa-industry"></i> Usines</a>
                            <a href="../realisations.html#administrations" class="dropdown-item"><i class="fa-solid fa-landmark"></i> Administrations</a>
                            <a href="../realisations.html#universites" class="dropdown-item"><i class="fa-solid fa-graduation-cap"></i> Universités</a>
                            <a href="../realisations.html#villas" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Riad & Villa</a>
                        </div>
                    </li>
                    <li><a href="../marques.html" class="nav-link">Nos marques</a></li>
                    <li><a href="../contact.html" class="nav-link">Contact</a></li>'''

footer_brand_replacement = '''                <div class="footer-brand">
                    <img src="../assets/logo-3d.png" alt="Excellence Système Logo">
                    <p>Votre partenaire de confiance en courant faible et sécurité électronique au Maroc. Plus de 10 ans d'expertise à votre service.</p>
                    <div class="social-links" style="margin-top:16px;">
                        <a href="https://web.facebook.com/ste.excellence.systeme.2025" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/ste__excellence_systeme?stkn=MXZ0a3pjbh1NmE2MQ==" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/excellence-systeme-44733a397/" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://wa.me/212668764271" target="_blank" rel="noopener" class="social-btn" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>'''

footer_contact_replacement = '''                <div>
                    <h4 class="footer-heading">Contact rapide</h4>
                    <div class="footer-links" style="gap:14px;">
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.4;"><i class="fa-solid fa-location-dot" style="color:#63C4C4; margin-right:8px;"></i> <strong>Marrakech:</strong> 1057 Lot Al Housna 2, ASKJOUR</p>
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.4;"><i class="fa-solid fa-location-dot" style="color:#63C4C4; margin-right:8px;"></i> <strong>Agadir:</strong> IMM 42 APP 166 ADRAR</p>
                        <p style="color:var(--text-light); font-size:0.88rem;"><i class="fa-solid fa-phone" style="color:#63C4C4; margin-right:8px;"></i> +212 5 25 32 42 88</p>
                        <p style="color:var(--text-light); font-size:0.88rem;"><i class="fa-solid fa-mobile-screen" style="color:#63C4C4; margin-right:8px;"></i> +212 6 68 76 42 71 | +212 6 60 27 04 46</p>
                        <p style="color:var(--text-light); font-size:0.88rem;"><i class="fa-solid fa-envelope" style="color:#63C4C4; margin-right:8px;"></i> commercial.exsys@gmail.com</p>
                        <p style="color:var(--text-light); font-size:0.88rem;"><i class="fa-solid fa-envelope" style="color:#63C4C4; margin-right:8px;"></i> Excellencesysteme@gmail.com</p>
                        <a href="https://maps.app.goo.gl/qGhGEnQhsorKXpJs6" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:6px; font-size:0.8rem; padding:6px 12px;">
                            <i class="fa-solid fa-map-location-dot"></i> Localiser sur Google Maps
                        </a>
                    </div>
                </div>'''

directory = "/Users/user/Desktop/Excellence systeme/activites/*.html"
files = glob.glob(directory)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Nav
    import re
    nav_pattern = r'<ul class="nav-menu">.*?</ul>'
    content = re.sub(nav_pattern, '<ul class="nav-menu">\n' + nav_replacement + '\n                </ul>', content, flags=re.DOTALL)

    # Replace Footer Brand
    brand_pattern = r'<div class="footer-brand">.*?</div>'
    content = re.sub(brand_pattern, footer_brand_replacement, content, flags=re.DOTALL)

    # Replace Footer Contact
    contact_pattern = r'<div>\s*<h4 class="footer-heading">Contact rapide</h4>.*?</div>\s*</div>'
    # Or replace the contact section specifically
    if "Contact rapide" in content:
        start_idx = content.find('<h4 class="footer-heading">Contact rapide</h4>')
        if start_idx != -1:
            div_start = content.rfind('<div>', 0, start_idx)
            div_end = content.find('</div>', start_idx) + 6
            if div_start != -1 and div_end != -1:
                content = content[:div_start] + footer_contact_replacement + content[div_end:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(files)} activity subpages successfully!")

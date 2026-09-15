import glob, re

activites_pages = glob.glob('activites/*.html')

nav_html = '''<ul class="nav-menu">
                    <li><a href="../index.html" class="nav-link">Accueil</a></li>
                    <li><a href="../about.html" class="nav-link">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="../activites.html" class="nav-link active">Solutions & Activités <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu mega-dropdown">
                            <div class="mega-dropdown-grid">
                                <div class="dropdown-column">
                                    <div class="dropdown-header"><i class="fa-solid fa-lightbulb"></i> Solutions</div>
                                    <a href="../services.html#hotellerie" class="dropdown-item"><i class="fa-solid fa-hotel"></i> Solutions Hôtelière</a>
                                    <a href="../services.html#villas" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Solutions Riad & Villa</a>
                                    <a href="../services.html#entreprises" class="dropdown-item"><i class="fa-solid fa-layer-group"></i> Solutions Innovantes</a>
                                </div>
                                <div class="dropdown-column">
                                    <div class="dropdown-header"><i class="fa-solid fa-city"></i> Activités / Secteurs</div>
                                    <a href="../realisations.html#hopitaux" class="dropdown-item"><i class="fa-solid fa-hospital"></i> Hôpitaux</a>
                                    <a href="../realisations.html#usines" class="dropdown-item"><i class="fa-solid fa-industry"></i> Usines</a>
                                    <a href="../realisations.html#administrations" class="dropdown-item"><i class="fa-solid fa-landmark"></i> Administrations</a>
                                    <a href="../realisations.html#universites" class="dropdown-item"><i class="fa-solid fa-graduation-cap"></i> Universités</a>
                                    <a href="../realisations.html#villas" class="dropdown-item"><i class="fa-solid fa-building-user"></i> Riad & Villa</a>
                                </div>
                            </div>
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
                    <li><a href="../contact.html" class="nav-link">Contact</a></li>
                </ul>'''

footer_html = '''<footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="../assets/logo-3d.png" alt="Excellence Système Logo">
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
                        <a href="../index.html">Accueil</a>
                        <a href="../about.html">À propos</a>
                        <a href="../activites.html">Solutions & Activités</a>
                        <a href="../realisations.html">Nos réalisations</a>
                        <a href="../marques.html">Nos marques</a>
                        <a href="../contact.html">Contact</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Nos Activités</h4>
                    <div class="footer-links">
                        <a href="detection-incendie.html">Détection incendie</a>
                        <a href="videosurveillance.html">Vidéosurveillance IP</a>
                        <a href="controle-acces.html">Contrôle d'accès</a>
                        <a href="reseau-informatique.html">Réseaux informatiques</a>
                        <a href="reseau-optique.html">Réseaux optiques</a>
                        <a href="domotique.html">Domotique & Smart Home</a>
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

for page in activites_pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'<ul class="nav-menu">.*?</ul>', nav_html, content, flags=re.DOTALL)
    content = re.sub(r'<footer class="site-footer">.*?</footer>', footer_html, content, flags=re.DOTALL)
    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated subpage:', page)

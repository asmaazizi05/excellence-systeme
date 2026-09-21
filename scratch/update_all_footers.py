import os
import glob
import re

ROOT_FOOTER = '''<footer class="site-footer">
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
                    <h4 class="footer-heading">Nos Activités</h4>
                    <div class="footer-links">
                        <a href="activites.html">Sécurité Électronique</a>
                        <a href="activites/motorisation.html">Automatisme</a>
                        <a href="activites/domotique.html">Gestion Technique (GTB/GTC)</a>
                        <a href="activites/reseau-informatique.html">Réseaux Informatiques & Fibre</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Contact rapide</h4>
                    <div class="footer-links" style="gap:14px;">
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.4;">
                            <i class="fa-solid fa-location-dot" style="color:#63C4C4; margin-right:8px;"></i>
                            <strong>Adresse :</strong><br>
                            Marrakech : 1057, Lot Al Housna 2, ASKJOUR<br>
                            Agadir : IMM 42, APP 166 ADRAR
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

SUBPAGE_FOOTER = '''<footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="../assets/logo-3d.png" alt="Excellence Système Logo">
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
                        <a href="../index.html">Accueil</a>
                        <a href="../about.html">À propos</a>
                        <a href="../activites.html">Solutions IT</a>
                        <a href="../realisations.html">Nos réalisations</a>
                        <a href="../contact.html">Contact</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Nos Activités</h4>
                    <div class="footer-links">
                        <a href="../activites.html">Sécurité Électronique</a>
                        <a href="motorisation.html">Automatisme</a>
                        <a href="domotique.html">Gestion Technique (GTB/GTC)</a>
                        <a href="reseau-informatique.html">Réseaux Informatiques & Fibre</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading">Contact rapide</h4>
                    <div class="footer-links" style="gap:14px;">
                        <p style="color:var(--text-light); font-size:0.88rem; line-height:1.4;">
                            <i class="fa-solid fa-location-dot" style="color:#63C4C4; margin-right:8px;"></i>
                            <strong>Adresse :</strong><br>
                            Marrakech : 1057, Lot Al Housna 2, ASKJOUR<br>
                            Agadir : IMM 42, APP 166 ADRAR
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

# Update root files
for fn in glob.glob('*.html'):
    with open(fn, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html_updated = re.sub(r'<footer class="site-footer">.*?</footer>', ROOT_FOOTER, html, flags=re.DOTALL)
    
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(html_updated)
    print(f"Updated footer in {fn}")

# Update subpages
for fn in glob.glob('activites/*.html'):
    with open(fn, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html_updated = re.sub(r'<footer class="site-footer">.*?</footer>', SUBPAGE_FOOTER, html, flags=re.DOTALL)
    
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(html_updated)
    print(f"Updated footer in {fn}")

print("ALL FOOTERS UPDATED SUCCESSFULLY.")

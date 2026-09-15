import re

overview_solutions_html = '''<section class="solutions">
    <div class="container">
        <div class="text-center" style="margin-bottom: 50px;">
            <div class="section-tag"><i class="fa-solid fa-layer-group"></i> <span>NOS 3 SOLUTIONS IT MÉTIERS</span></div>
            <h2 class="section-title">Découvrez nos Solutions par Secteur</h2>
            <p class="section-subtitle">Sélectionnez une solution pour consulter l'ensemble des activités et expertises techniques associées.</p>
        </div>

        <div class="solutions-grid">
            <!-- 1. Solutions Hôtelière -->
            <div class="solution-card">
                <div class="solution-icon"><i class="fa-solid fa-hotel"></i></div>
                <h3 class="solution-title">Solutions Hôtelière</h3>
                <p class="solution-desc">Infrastructures globales de sécurité, de communication et de connectivité haute performance spécialement conçues pour les hôtels, resorts et établissements touristiques (13 activités métier).</p>
                <a href="solutions-hoteliere.html" class="btn btn-primary" style="margin-top:auto; align-self:flex-start;">
                    Accéder à la page dédiée <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>

            <!-- 2. Solutions Riad & Villa -->
            <div class="solution-card">
                <div class="solution-icon"><i class="fa-solid fa-house-chimney"></i></div>
                <h3 class="solution-title">Solutions Riad & Villa</h3>
                <p class="solution-desc">Solutions haut de gamme sur-mesure d'automatisation, de protection anti-intrusion, de vidéosurveillance et de confort multimédia pour résidences d'exception, riads et villas (12 activités métier).</p>
                <a href="solutions-riad-villa.html" class="btn btn-primary" style="margin-top:auto; align-self:flex-start;">
                    Accéder à la page dédiée <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>

            <!-- 3. Solutions Innovantes -->
            <div class="solution-card">
                <div class="solution-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <h3 class="solution-title">Solutions Innovantes</h3>
                <p class="solution-desc">Technologies de pointe pour la gestion intelligente des bâtiments, l'automatisation avancée et la sécurité des environnements complexes (5 activités métier).</p>
                <a href="solutions-innovantes.html" class="btn btn-primary" style="margin-top:auto; align-self:flex-start;">
                    Accéder à la page dédiée <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>
</section>'''

for page in ['activites.html', 'services.html']:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'<section class="solutions">.*?</section>', overview_solutions_html, content, flags=re.DOTALL)
    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated overview section in {page}")


import re

solutions_html = '''<section class="solutions">
    <div class="container">

        <!-- 1. SOLUTIONS HÔTELIÈRE -->
        <div class="solution-section" id="hotellerie" style="scroll-margin-top: 100px;">
            <div class="solution-section-header">
                <div class="solution-badge"><i class="fa-solid fa-hotel"></i> SOLUTION IT MÉTIER</div>
                <h2 class="solution-section-title">SOLUTIONS HÔTELIÈRE</h2>
                <p class="solution-section-desc">
                    Infrastructures globales de sécurité, de communication et de connectivité haute performance spécialement conçues pour les hôtels, resorts et établissements touristiques.
                </p>
            </div>

            <div class="activities-subheading"><i class="fa-solid fa-star"></i> ACTIVITÉS PRINCIPALES (3)</div>
            <div class="main-activities-grid">
                <!-- Main Activity 1 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <h3 class="solution-title">Système de Détection Incendie</h3>
                    <p class="solution-desc">Centrales d'alarme adressables certifiées S.S.I. de catégorie A et équipement de sécurité conforme aux exigences hôtelières.</p>
                    <a href="activites/detection-incendie.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- Main Activity 2 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <h3 class="solution-title">Réseau Informatique</h3>
                    <p class="solution-desc">Câblage structuré Cat6/Cat7, baies serveurs, switching PoE d'établissement et gestion d'infrastructure réseau.</p>
                    <a href="activites/reseau-informatique.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- Main Activity 3 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
                    <h3 class="solution-title">Réseau Fibre Optique</h3>
                    <p class="solution-desc">Backbone optique monomode/multimode, raccordements par fusion et haut débit sur l'ensemble de l'hôtel.</p>
                    <a href="activites/reseau-optique.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>

            <div class="activities-subheading"><i class="fa-solid fa-layer-group"></i> AUTRES ACTIVITÉS RATTACHÉES (10)</div>
            <div class="secondary-activities-grid">
                <a href="activites/reseau-informatique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-wifi"></i></div>
                    <span class="secondary-activity-title">Réseau Wifi Smart</span>
                </a>
                <a href="activites/controle-acces.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-cash-register"></i></div>
                    <span class="secondary-activity-title">Solution POS</span>
                </a>
                <a href="activites/domotique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-building-user"></i></div>
                    <span class="secondary-activity-title">Domotique & Smart Building</span>
                </a>
                <a href="activites/videosurveillance.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-video"></i></div>
                    <span class="secondary-activity-title">Vidéoprotection</span>
                </a>
                <a href="activites/telephonie-ip.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-phone-volume"></i></div>
                    <span class="secondary-activity-title">Téléphonie IP</span>
                </a>
                <a href="activites/controle-acces.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-fingerprint"></i></div>
                    <span class="secondary-activity-title">Contrôle d'Accès</span>
                </a>
                <a href="activites/teledistribution.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                    <span class="secondary-activity-title">Télédistribution</span>
                </a>
                <a href="activites/audiovisuel.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-volume-high"></i></div>
                    <span class="secondary-activity-title">Sonorisation</span>
                </a>
                <a href="activites/audiovisuel.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-video-slash"></i></div>
                    <span class="secondary-activity-title">Vidéoconférence</span>
                </a>
                <a href="activites/domotique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-sliders"></i></div>
                    <span class="secondary-activity-title">Gestion Technique Centralisée (GTC)</span>
                </a>
            </div>
        </div>


        <!-- 2. SOLUTIONS RIAD & VILLA -->
        <div class="solution-section" id="villas" style="scroll-margin-top: 100px;">
            <div class="solution-section-header">
                <div class="solution-badge"><i class="fa-solid fa-house-chimney"></i> SOLUTION IT MÉTIER</div>
                <h2 class="solution-section-title">SOLUTIONS RIAD & VILLA</h2>
                <p class="solution-section-desc">
                    Solutions haut de gamme sur-mesure d'automatisation, de protection anti-intrusion, de vidéosurveillance et de confort multimédia pour résidences d'exception, riads et villas.
                </p>
            </div>

            <div class="activities-subheading"><i class="fa-solid fa-star"></i> ACTIVITÉS PRINCIPALES (3)</div>
            <div class="main-activities-grid">
                <!-- Main Activity 1 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <h3 class="solution-title">Système de Détection Incendie</h3>
                    <p class="solution-desc">Détecteurs autonomes et adressables pour la protection précoce de la villa ou du riad contre les départs d'incendie.</p>
                    <a href="activites/detection-incendie.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- Main Activity 2 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-shield-cat"></i></div>
                    <h3 class="solution-title">Système Anti-intrusion</h3>
                    <p class="solution-desc">Protection périmétrique extérieure, barrières infrarouges, détecteurs de mouvement et centrale connectée GSM/IP.</p>
                    <a href="activites/anti-intrusion.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- Main Activity 3 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-video"></i></div>
                    <h3 class="solution-title">Vidéoprotection</h3>
                    <p class="solution-desc">Caméras HD/4K discrètes, vision nocturne, analyse vidéo intelligente et consultation à distance sur smartphone.</p>
                    <a href="activites/videosurveillance.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>

            <div class="activities-subheading"><i class="fa-solid fa-layer-group"></i> AUTRES ACTIVITÉS RATTACHÉES (9)</div>
            <div class="secondary-activities-grid">
                <a href="activites/domotique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-house-signal"></i></div>
                    <span class="secondary-activity-title">Domotique & Smart Home</span>
                </a>
                <a href="activites/reseau-informatique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <span class="secondary-activity-title">Réseau Informatique & Optique</span>
                </a>
                <a href="activites/reseau-informatique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-wifi"></i></div>
                    <span class="secondary-activity-title">Réseau Wifi Smart</span>
                </a>
                <a href="activites/telephonie-ip.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-phone-volume"></i></div>
                    <span class="secondary-activity-title">Intercom IP</span>
                </a>
                <a href="activites/audiovisuel.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-volume-high"></i></div>
                    <span class="secondary-activity-title">Sonorisation</span>
                </a>
                <a href="activites/motorisation.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-torii-gate"></i></div>
                    <span class="secondary-activity-title">Automatisme (Portails & Accès)</span>
                </a>
                <a href="activites/audiovisuel.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-sliders"></i></div>
                    <span class="secondary-activity-title">Multi Room</span>
                </a>
                <a href="activites/teledistribution.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-satellite-dish"></i></div>
                    <span class="secondary-activity-title">Télédistribution</span>
                </a>
                <a href="activites/audiovisuel.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-tv"></i></div>
                    <span class="secondary-activity-title">Home Cinéma</span>
                </a>
            </div>
        </div>


        <!-- 3. SOLUTIONS INNOVANTES -->
        <div class="solution-section" id="innovantes" style="scroll-margin-top: 100px;">
            <div class="solution-section-header">
                <div class="solution-badge"><i class="fa-solid fa-lightbulb"></i> SOLUTION IT MÉTIER</div>
                <h2 class="solution-section-title">SOLUTIONS INNOVANTES</h2>
                <p class="solution-section-desc">
                    Technologies de pointe pour la gestion intelligente des bâtiments, l'automatisation avancée et la sécurité des environnements complexes.
                </p>
            </div>

            <div class="activities-subheading"><i class="fa-solid fa-star"></i> ACTIVITÉS PRINCIPALES (3)</div>
            <div class="main-activities-grid">
                <!-- Main Activity 1 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-square-parking"></i></div>
                    <h3 class="solution-title">Gestion de Parking</h3>
                    <p class="solution-desc">Lecture de plaques LPR/ANPR, barrières automatiques, comptage de places et gestion du stationnement intelligent.</p>
                    <a href="activites/controle-acces.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- Main Activity 2 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-kit-medical"></i></div>
                    <h3 class="solution-title">Appel Malade</h3>
                    <p class="solution-desc">Systèmes d'appel et d'alerte médicale pour hôpitaux, cliniques et résidences médicalisées avec traçabilité complète.</p>
                    <a href="activites/telephonie-ip.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <!-- Main Activity 3 -->
                <div class="main-activity-card">
                    <span class="main-activity-badge">Principale</span>
                    <div class="solution-icon"><i class="fa-solid fa-building-user"></i></div>
                    <h3 class="solution-title">Gestion Technique de Bâtiment (GTB)</h3>
                    <p class="solution-desc">Supervision centralisée des consommations énergétiques, de l'éclairage, du CVC et de la sécurité globale du bâtiment.</p>
                    <a href="activites/domotique.html" class="solution-link">Voir détails <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>

            <div class="activities-subheading"><i class="fa-solid fa-layer-group"></i> AUTRES ACTIVITÉS RATTACHÉES (2)</div>
            <div class="secondary-activities-grid">
                <a href="activites/detection-incendie.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-fire-extinguisher"></i></div>
                    <span class="secondary-activity-title">Extinction Automatique</span>
                </a>
                <a href="activites/domotique.html" class="secondary-activity-card">
                    <div class="secondary-activity-icon"><i class="fa-solid fa-microchip"></i></div>
                    <span class="secondary-activity-title">Automate Programmable</span>
                </a>
            </div>
        </div>

    </div>
</section>'''

# 1. Update activites.html
with open('activites.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<section class="solutions">.*?</section>', solutions_html, content, flags=re.DOTALL)

with open('activites.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated activites.html successfully!")

# 2. Update services.html
with open('services.html', 'r', encoding='utf-8') as f:
    content_serv = f.read()

content_serv = re.sub(r'<section class="solutions">.*?</section>', solutions_html, content_serv, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(content_serv)
print("Updated services.html successfully!")

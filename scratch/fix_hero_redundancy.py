import os
import re

HERO_SUBTITLES = {
    "activites/detection-incendie.html": "Infrastructures de détection incendie adressable et conventionnelle, centrales SSI de catégorie A et dispositifs d'asservissement d'urgence.",
    "activites/anti-intrusion.html": "Systèmes d'alarme anti-intrusion haute sécurité avec centrales certifiées, détecteurs infrarouges, sirènes et levée de doute vidéo.",
    "activites/videosurveillance.html": "Vidéoprotection IP haute définition, enregistreurs réseaux NVR, vision nocturne et analyse vidéo intelligente pour la sécurité de vos espaces.",
    "activites/controle-acces.html": "Solutions de contrôle d'accès physique et de gestion des identités par badges RFID, biométrie et serrures électroniques motorisées.",
    "activites/reseau-informatique.html": "Câblage réseau structuré Cat6A/Cat7, baie de brassage, switching intelligent PoE et architecture réseau sécurisée haute performance.",
    "activites/reseau-optique.html": "Infrastructures en fibre optique monomode et multimode, soudures par fusion et liaisons très haut débit pour cœurs de réseau.",
    "activites/telephonie-ip.html": "Solutions de téléphonie sur IP (VoIP), serveurs IPBX, terminaux professionnels et communications unifiées d'entreprise.",
    "activites/domotique.html": "Automatisation intelligente et centralisée de l'éclairage, du génie climatique, des ouvrants et de l'énergie pour Smart Building et Smart Home.",
    "activites/teledistribution.html": "Distribution vidéo et réseaux coaxiaux/IPTV centralisés pour la diffusion des chaînes TNT, satellite et chaînes numériques.",
    "activites/audiovisuel.html": "Systèmes de sonorisation de confort et d'ambiance multi-zones, équipements audiovisuels et intégration d'espaces de conférence.",
    "activites/motorisation.html": "Motorisation de portails coulissants et battants, portes de garage et automatismes d'accès pour résidences et sites professionnels."
}

for filepath, new_subtitle in HERO_SUBTITLES.items():
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <p class="page-hero-subtitle">...</p>
    content = re.sub(
        r'<p class="page-hero-subtitle">.*?</p>',
        f'<p class="page-hero-subtitle">\n                {new_subtitle}\n            </p>',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated hero subtitle in {filepath}")

print("Hero redundancy fix complete.")

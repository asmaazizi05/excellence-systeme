import os, shutil

mappings = [
    ("Mon Site Web/Domotique/smart-home-3317435_1920.jpg", "assets/img/domotique-smart.jpg"),
    ("Mon Site Web/Domotique/d20_cover_FB_YT.jpg", "assets/img/domotique-cover.jpg"),
    ("Mon Site Web/GTB/gtb-performance-energetique.jpg", "assets/img/services-gtb.jpg"),
    ("Mon Site Web/Détection incendie/plan-devacuation-reglementation.jpg", "assets/img/about-plan-evacuation.jpg"),
    ("Mon Site Web/Détection incendie/Détection incendie adressable/Alarme Incendie Adressable type 1 Base.png", "assets/img/incendie-adressable.png"),
    ("Mon Site Web/Détection incendie/Détection incendie conventionnelle/detection-incendie-au-maroc.jpg", "assets/img/incendie-conventionnelle.jpg"),
    ("Mon Site Web/Détection incendie/Asservissement/CMSI.jpg", "assets/img/incendie-cmsi.jpg"),
    ("Mon Site Web/Alarme anti-intrusion/20170425_144227.jpg", "assets/img/anti-intrusion-ajax.jpg"),
    ("Mon Site Web/Cablage courant faible/Cable alarme anti-intrusion/matassa_bianco-2.jpg", "assets/img/intrusion-matassa.jpg"),
    ("Mon Site Web/AudioVisuel/Conférence/Conf2.jpg", "assets/img/av-conference.jpg"),
    ("Mon Site Web/AudioVisuel/Vidéoprojection/videoprojection.jpg", "assets/img/av-projection.jpg"),
    ("Mon Site Web/AudioVisuel/Sonorisation Home cinéma & Haute fidélité/2play_salon.jpg", "assets/img/av-hifi.jpg"),
    ("Mon Site Web/Controle d'accés/Lecteur biométrique/ZktF18.jpg", "assets/img/access-biometric.jpg"),
    ("Mon Site Web/Controle d'accés/Tourniquets/slidecontrole.png", "assets/img/access-turnstile.png"),
    ("Mon Site Web/Controle d'accés/Clavier à code/controle-acces.jpg", "assets/img/access-keypad.jpg"),
    ("Mon Site Web/Automatisme/Barriére automatique/SIGNO4.jpg", "assets/img/motorisation-signo.jpg"),
    ("Mon Site Web/Automatisme/Barriére automatique/Barriere-levante-automatique-B680H-Faac.jpg", "assets/img/motorisation-faac.jpg"),
    ("Mon Site Web/Automatisme/automatisme_portail_automatique_telecommande (1).jpg", "assets/img/motorisation-portail.jpg"),
    ("Mon Site Web/Réseau optique/fd3fa4a17113da9d96f9ce10460176d74749b1b9_fibre-optique.jpg", "assets/img/optique-fiber.jpg"),
    ("Mon Site Web/Réseau optique/jarretiere-optique-625125-om1-stsc-duplex-30-metres.jpg", "assets/img/optique-jarretiere.jpg"),
    ("Mon Site Web/Réseau optique/Coffret-Fibre-Optique-Rue.jpg", "assets/img/optique-coffret.jpg"),
    ("Mon Site Web/Réseau téléphonique/IPBX/cisco-ip-phones-large.jpg", "assets/img/telephony-ipbx.jpg"),
    ("Mon Site Web/Réseau téléphonique/PABX/aria_soho.png", "assets/img/telephony-aria.png"),
    ("Mon Site Web/Télédistribution IPTV/antenne_collective2.jpg", "assets/img/teledist-collective2.jpg"),
    ("Mon Site Web/Télédistribution IPTV/antenne_collective3.jpg", "assets/img/teledist-collective3.jpg"),
    ("Mon Site Web/Télédistribution IPTV/TNT_0.jpg", "assets/img/teledist-tnt.jpg")
]

for src, dst in mappings:
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {src} -> {dst}")
    else:
        print(f"Warning: {src} not found")

import os
import re

# Comprehensive dictionary mapping exact activity titles and all variations to DOCX text:

DESCS = {
    # 1. INCENDIE
    "incendie": {
        "short": "La solution de détection incendie permet d’assurer une surveillance continue et fiable contre les risques d’incendie. Elle comprend des systèmes adressables et conventionnels adaptés aux différentes configurations des bâtiments.",
        "full": "La solution de détection incendie permet d’assurer une surveillance continue et fiable contre les risques d’incendie. Elle comprend des systèmes adressables et conventionnels adaptés aux différentes configurations des bâtiments. La technologie adressable identifie précisément le détecteur ou l’équipement à l’origine de l’alarme. La technologie conventionnelle organise les équipements par zones afin de localiser rapidement la zone concernée. Les installations peuvent intégrer des détecteurs de fumée, de chaleur, des déclencheurs manuels et des sirènes. La centrale assure la supervision permanente des équipements et signale les éventuels défauts du système. Des modules spécifiques permettent également de commander certains équipements de sécurité en cas d’alarme. Le choix de la technologie dépend de la taille, de la structure et des exigences du bâtiment. Ces solutions conviennent aux hôtels, villas, bureaux, commerces, établissements publics et sites industriels. Elles garantissent une détection rapide, une alerte efficace et une gestion adaptée aux exigences de sécurité incendie."
    },
    # 2. ANTI-INTRUSION
    "intrusion": {
        "short": "La solution anti-intrusion permet d’assurer la sécurité des personnes et de protéger les biens contre les tentatives d’intrusion.",
        "full": "La solution anti-intrusion permet d’assurer la sécurité des personnes et de protéger les biens contre les tentatives d’intrusion. Elle repose sur des équipements de détection adaptés aux espaces intérieurs et extérieurs, tels que détecteurs de mouvement, contacts d’ouverture et barrières infrarouges. En cas de détection d’une présence non autorisée, la centrale déclenche immédiatement les sirènes et transmet une alerte aux utilisateurs ou au centre de télésurveillance. Le système peut être armé, désarmé et supervisé facilement depuis un clavier, une télécommande ou une application mobile. L’intégration de la levée de doute vidéo permet de vérifier rapidement la cause de l’alarme via les caméras associées. Il est également possible d’associer des capteurs de sécurité technique tels que détection de fumée, fuite d’eau ou coupure de courant. La solution offre ainsi une protection continue, une réactivité optimale et une tranquillité d’esprit au quotidien. Elle convient aux résidences, villas, commerces, bureaux et sites professionnels."
    },
    # 3. VIDÉOPROTECTION / VIDÉOSURVEILLANCE
    "video": {
        "short": "La solution de vidéosurveillance IP assure une surveillance continue des espaces afin de prévenir, détecter et analyser les situations à risque.",
        "full": "La solution de vidéosurveillance IP permet d’assurer la sécurité des personnes et de protéger les espaces intérieurs et extérieurs. Elle repose sur des caméras haute définition connectées au réseau local, offrant des images claires et détaillées de jour comme de nuit. Les caméras peuvent être consultées en direct ou en replay depuis un smartphone, une tablette ou un écran dédié. Le système permet également de recevoir des alertes en cas de détection d’une activité inhabituelle. Il peut être intégré au système anti-intrusion et au contrôle d’accès pour une protection globale. Cette solution garantit ainsi une surveillance fiable, discrète et adaptée aux besoins des entreprises, hôtels, villas et établissements publics."
    },
    # 4. CONTRÔLE D'ACCÈS
    "acces": {
        "short": "Le système de contrôle d’accès permet de sécuriser les entrées et sorties d’un bâtiment en autorisant uniquement les personnes habilitées.",
        "full": "Le système de contrôle d’accès permet de sécuriser les entrées et sorties d’un bâtiment en autorisant uniquement les personnes habilitées. Il permet de gérer et de contrôler les accès aux différentes zones selon les profils et les niveaux d’autorisation. La solution peut intégrer des lecteurs de badges, cartes, codes PIN, biométrie ou reconnaissance faciale. Les portes sont équipées de dispositifs de verrouillage adaptés, tels que ventouses, gâches électriques ou serrures motorisées. Une centrale de contrôle assure la gestion et la communication avec les différents équipements du système. Les droits d’accès peuvent être configurés selon les utilisateurs, les zones et les horaires autorisés. Le système permet également d’enregistrer les événements afin d’assurer une traçabilité des accès. Il peut être intégré à la vidéosurveillance, à l’alarme anti-intrusion et aux systèmes de gestion du bâtiment. La solution convient aux entreprises, hôtels, bureaux, résidences, sites industriels et établissements publics. Elle garantit ainsi une gestion centralisée, une meilleure sécurité et un contrôle précis des accès."
    },
    # 5. RÉSEAU INFORMATIQUE
    "reseau_info": {
        "short": "La solution de réseau informatique assure une infrastructure fiable, performante et sécurisée pour la communication des données.",
        "full": "La solution de réseau informatique assure une infrastructure fiable, performante et sécurisée pour la communication des données. Elle permet de connecter les ordinateurs, serveurs, imprimantes, téléphones IP, points d’accès Wi-Fi et équipements réseau. L’infrastructure peut être réalisée en cuivre, en fibre optique ou en combinant les deux technologies. Les switches assurent la distribution des connexions et peuvent intégrer la technologie PoE pour alimenter certains équipements. Le réseau peut être organisé en VLAN afin de séparer les différents services et renforcer la sécurité. Une architecture correctement dimensionnée garantit une connexion stable, rapide et évolutive. Le câblage structuré facilite l’installation, la maintenance et l’évolution future de l’infrastructure. Des solutions de routage, pare-feu et sécurité réseau permettent de protéger les communications et les données. Cette solution s’adapte aux entreprises, hôtels, villas, commerces, établissements publics et sites industriels. Elle constitue ainsi une base essentielle pour assurer la connectivité, la performance et la continuité des services numériques."
    },
    # 6. RÉSEAU OPTIQUE / FIBRE
    "optique": {
        "short": "Offrez à votre établissement une connectivité d'exception grâce à nos solutions de réseau fibre optique conçues sur mesure.",
        "full": "Offrez à votre établissement une connectivité d'exception grâce à nos solutions de réseau de fibre optique conçues sur mesure. Nous garantissons un haut débit stable et une interconnexion haute performance pour l'ensemble de vos équipements. Nos équipes déploient du câblage réseau haute performance et des liaisons en fibre optique pour interconnecter en toute fluidité l'ensemble de vos baies et serveurs. Grâce à nos réseaux évolutifs et sécurisés, vous profitez d'un confort numérique inégalé et d'une performance optimale."
    },
    # 7. TÉLÉPHONIE IP
    "telephonie": {
        "short": "La solution de téléphonie IP permet de gérer les communications professionnelles via le réseau informatique.",
        "full": "La solution de téléphonie IP permet de gérer les communications professionnelles via le réseau informatique. Elle utilise la technologie VoIP pour transmettre les appels sous forme de données numériques. Le système peut intégrer un IPBX, des téléphones IP, des postes Wi-Fi et des applications de communication. Il permet de créer plusieurs extensions et de gérer les appels internes et externes de manière centralisée. Des fonctionnalités telles que le transfert d’appels, la conférence, le répondeur et la messagerie vocale peuvent être intégrées. La solution facilite également la gestion des utilisateurs, des groupes et des droits d’appel. Elle peut être connectée au réseau local et aux services téléphoniques existants selon les besoins. La téléphonie IP permet de réduire les coûts de communication tout en offrant une infrastructure évolutive. Elle convient aux entreprises, hôtels, bureaux, centres d’appels, commerces et établissements professionnels. Cette solution garantit ainsi une communication moderne, flexible et adaptée aux besoins des organisations."
    },
    # 8. DOMOTIQUE / SMART HOME / SMART BUILDING
    "domotique": {
        "short": "La solution domotique permet de centraliser, automatiser et superviser intelligemment les équipements de votre espace pour un confort absolu.",
        "full": "Transformez votre espace en un lieu d'exception où l'élégance de l'architecture s'allie parfaitement à la pointe de la technologie. Notre expertise en domotique et smart building vous permet de centraliser le contrôle de votre environnement pour un confort absolu et une gestion simplifiée au quotidien. Depuis une interface unique et intuitive sur votre smartphone ou une tablette dédiée, pilotez avec précision l'éclairage d'ambiance, ajustez la climatisation de chaque pièce et gérez vos systèmes audiovisuels en toute fluidité. La protection de votre propriété est également renforcée grâce à une intégration sur mesure du contrôle d'accès intelligent, de la vidéosurveillance et des dispositifs de sécurité, consultables à distance. En automatisant vos routines et en optimisant votre consommation énergétique, nos solutions domotiques redéfinissent l'art de vivre, vous offrant ainsi une tranquillité d'esprit totale et un prestige moderne."
    },
    # 9. TÉLÉDISTRIBUTION
    "teledistribution": {
        "short": "La solution de télédistribution assure la réception et la distribution des signaux TV et radio dans l’ensemble du bâtiment.",
        "full": "La solution de télédistribution assure la réception et la distribution des signaux TV et radio dans l’ensemble du bâtiment. Elle permet de desservir plusieurs téléviseurs à partir d’une installation centralisée, avec une qualité d’image optimale. Le système peut intégrer les signaux TNT, satellite et différentes sources audiovisuelles selon les besoins du projet. Une distribution structurée garantit une réception stable et fiable dans chaque espace. L’installation peut être discrètement intégrée afin de préserver l’esthétique des lieux. Elle offre également une solution évolutive pour accompagner l’ajout de nouveaux points TV ou équipements. Une infrastructure professionnelle conçue pour assurer confort, qualité de réception et simplicité d’utilisation."
    },
    # 10. SONORISATION / AUDIOVISUEL
    "sonorisation": {
        "short": "La solution de sonorisation permet de diffuser une musique d'ambiance et des messages audio avec une qualité sonore adaptée à chaque espace.",
        "full": "La solution de sonorisation permet de diffuser une musique et des messages audio avec une qualité sonore adaptée à chaque espace. Elle peut intégrer des amplificateurs, haut-parleurs, microphones, mélangeurs et sources audio professionnelles. Le système permet de gérer plusieurs zones sonores selon les besoins du bâtiment. Il peut être utilisé pour la diffusion de musique d’ambiance, d’annonces, de messages et d’informations. La sonorisation peut être centralisée et contrôlée depuis une interface de gestion simple et intuitive. Elle s’adapte aux différents environnements intérieurs et extérieurs grâce à des équipements adaptés. Cette solution convient aux hôtels, restaurants, commerces, bureaux, résidences, salles de réunion et espaces publics."
    },
    # 11. AUTOMATISME / MOTORISATION
    "automatisme": {
        "short": "La solution d’automatisme permet de motoriser et de piloter facilement les portails, portes et accès motorisés.",
        "full": "La solution d’automatisme permet de motoriser et de piloter facilement les équipements de la propriété. Elle assure la commande des portails, portes, volets roulants, stores, rideaux et autres accès motorisés. Les équipements peuvent être contrôlés localement ou à distance depuis un smartphone ou une tablette. La programmation de scénarios permet d’adapter automatiquement les installations selon les besoins des occupants. L’intégration avec le contrôle d’accès et la domotique renforce la sécurité et le confort au quotidien. Des capteurs et automatismes intelligents permettent d’optimiser le fonctionnement et la consommation énergétique. Une solution fiable, élégante et évolutive pour un habitat moderne, sécurisé et entièrement connecté."
    },
    # 12. INTERCOM IP
    "intercom": {
        "short": "L’intercom IP offre une solution moderne et sécurisée pour contrôler les accès depuis un poste fixe ou smartphone.",
        "full": "L’intercom IP offre une solution moderne et sécurisée pour contrôler les accès des bâtiments et résidences. Il permet la communication audio et vidéo entre l’entrée, les différentes pièces et les postes intérieurs. Grâce à la technologie IP, les appels peuvent être gérés via écran tactile, téléphone ou smartphone. La caméra HD assure une identification claire des visiteurs, de jour comme de nuit. Le système peut intégrer une serrure électrique, un portail automatique et un contrôle d’accès. La gestion à distance permet de répondre aux visiteurs et d’autoriser l’accès depuis n’importe où. Une solution élégante, fiable et évolutive, adaptée aux exigences de confort et de sécurité."
    },
    # 13. MULTIROOM AUDIO
    "multiroom": {
        "short": "La solution Multiroom permet de profiter d’une expérience audio immersive et homogène dans plusieurs espaces simultanément.",
        "full": "La solution Multiroom permet de profiter d’une expérience audio immersive et homogène dans toute la propriété. Elle assure la diffusion de musique dans plusieurs espaces tels que salons, chambres, terrasses, jardins et espaces de réception. Chaque zone peut être contrôlée indépendamment ou synchronisée pour diffuser le même contenu simultanément. Le système s’intègre parfaitement aux enceintes encastrées, murales ou extérieures pour préserver l’esthétique des lieux. La gestion se fait facilement depuis un smartphone, une tablette ou des interfaces de commande dédiées. Il est possible de programmer des ambiances sonores adaptées à chaque espace et à chaque moment de la journée. Une solution élégante, flexible et évolutive."
    },
    # 14. HOME CINÉMA
    "home_cinema": {
        "short": "La solution Home Cinéma transforme un espace dédié en véritable salle de divertissement haute définition.",
        "full": "La solution Home Cinéma transforme un espace dédié en véritable salle de divertissement haut de gamme. Elle combine vidéoprojecteur ou écran haute définition avec un système audio immersif pour une expérience audiovisuelle exceptionnelle. La sonorisation multicanale assure une restitution précise et enveloppante des dialogues, musiques et effets sonores. L’ensemble des équipements peut être centralisé et piloté facilement depuis une télécommande, une tablette ou un smartphone. L’installation s’intègre harmonieusement dans l’architecture grâce aux équipements encastrables et aux solutions sur mesure. Des scénarios automatisés permettent de contrôler simultanément l’éclairage, les rideaux, l’écran et le système audiovisuel."
    },
    # 15. POS
    "pos": {
        "short": "La solution POS permet de gérer efficacement les opérations de vente, d’encaissement et de suivi commercial.",
        "full": "La solution POS permet de gérer efficacement les opérations de vente, d’encaissement et de suivi commercial. Elle centralise les transactions et facilite la gestion quotidienne des points de vente. Le système peut intégrer une caisse tactile, un écran client, une imprimante ticket et un lecteur de codes-barres. Il permet de gérer les produits, les prix, les stocks, les promotions et les différents moyens de paiement. Les utilisateurs peuvent suivre les ventes et consulter les opérations réalisées en temps réel. La solution facilite également la gestion des utilisateurs grâce à des profils et droits d’accès personnalisés. Elle peut être connectée au réseau informatique afin d’assurer une communication fluide entre les équipements. Des fonctions de reporting permettent d’analyser les ventes et d’améliorer le suivi de l’activité. Elle convient aux commerces, restaurants, hôtels, magasins, supermarchés et établissements professionnels."
    },
    # 16. GTC / GTB
    "gtc": {
        "short": "La Gestion Technique Centralisée (GTC/GTB) permet de superviser et piloter l'ensemble des équipements techniques depuis une plateforme unique.",
        "full": "La Gestion Technique Centralisée (GTC/GTB) permet de superviser et piloter les équipements techniques d’un bâtiment depuis une interface unique. Elle centralise le contrôle de l’éclairage, de la climatisation, de la ventilation, de l’énergie et des installations électriques. Les capteurs remontent en temps réel les informations nécessaires au suivi des différents équipements. Le système permet de détecter les anomalies, générer des alertes et faciliter les interventions techniques. Des scénarios et automatismes peuvent être programmés afin d’optimiser le fonctionnement des installations. La supervision centralisée améliore la performance énergétique, le confort des occupants et la maintenance du bâtiment. Cette solution s’adapte aux hôtels, bureaux, villas, bâtiments administratifs et sites professionnels."
    },
    # 17. WIFI SMART
    "wifi": {
        "short": "Une couverture Wi-Fi haute densité, transparente et sécurisée avec portail captif pour vos clients et collaborateurs.",
        "full": "La solution Wi-Fi Smart assure un roaming fluide sans coupure, une gestion centralisée du réseau sans fil et la séparation sécurisée du réseau visiteur et professionnel. Dans des architectures aux structures complexes, nous garantissons un haut débit stable et une couverture Wi-Fi professionnelle intégrale sans aucune zone d'ombre."
    },
    # 18. VIDÉOCONFÉRENCE
    "videoconference": {
        "short": "La solution de vidéoconférence permet d’organiser des réunions à distance avec une excellente qualité audio et vidéo.",
        "full": "La solution de vidéoconférence permet d’organiser des réunions à distance avec une excellente qualité audio et vidéo. Elle intègre des caméras professionnelles, microphones, haut-parleurs et écrans adaptés aux salles de réunion. Le système permet de partager facilement des présentations, documents et écrans en temps réel. Des fonctions intelligentes peuvent assurer le suivi automatique des participants et améliorer la captation audio. La solution peut fonctionner avec les principales plateformes de collaboration et de visioconférence. Elle convient aux entreprises, hôtels, établissements éducatifs et salles de réunion professionnelles."
    },
    # INNOVANTES
    "parking": {
        "short": "La solution de gestion intelligente du parking permet d’optimiser, sécuriser et automatiser l’accès aux espaces de stationnement.",
        "full": "La solution de gestion intelligente du parking permet d’optimiser, sécuriser et automatiser l’accès aux espaces de stationnement. Elle intègre le contrôle d’accès, la vidéosurveillance, la reconnaissance des plaques et la gestion des entrées et sorties. Les utilisateurs autorisés peuvent accéder au parking automatiquement grâce aux badges, QR codes ou systèmes ANPR. La supervision centralisée permet de suivre en temps réel l’occupation, les accès et les mouvements des véhicules. Des capteurs peuvent également indiquer les places disponibles afin de faciliter le stationnement et réduire le temps de recherche. La solution peut être connectée à une plateforme de gestion pour générer des rapports et analyser l’utilisation du parking."
    },
    "appel_malade": {
        "short": "La solution d’appel malade permet d’assurer une communication rapide et fiable entre les patients et le personnel soignant.",
        "full": "La solution d’appel malade permet d’assurer une communication rapide et fiable entre les patients et le personnel soignant. Elle permet au patient de déclencher facilement une demande d’assistance depuis sa chambre ou son espace de soins. Les appels sont transmis instantanément aux postes infirmiers et aux dispositifs mobiles du personnel autorisé. Des indicateurs lumineux et sonores permettent de localiser rapidement la chambre ou la zone concernée. Le système peut intégrer des boutons d’appel, tirettes, voyants de présence et dispositifs d’annulation. La supervision centralisée facilite le suivi des appels, des interventions et des priorités en temps réel."
    },
    "extinction": {
        "short": "Le système d’extinction automatique assure une protection rapide et efficace des zones sensibles contre les risques d’incendie.",
        "full": "Le système d’extinction automatique assure une protection rapide et efficace des zones sensibles contre les risques d’incendie. Il détecte automatiquement le départ de feu et déclenche l’extinction sans intervention humaine lorsque les conditions sont réunies. La solution peut être adaptée aux salles serveurs, locaux électriques, cuisines professionnelles, parkings et espaces techniques. Elle utilise des agents d’extinction appropriés selon la nature des équipements et les contraintes du site. L’installation peut être intégrée au système de détection incendie pour assurer une réaction coordonnée et sécurisée."
    },
    "api": {
        "short": "La solution d’automatisme basée sur un automate programmable permet de piloter et de contrôler efficacement les équipements techniques.",
        "full": "La solution d’automatisme basée sur un automate programmable permet de piloter et de contrôler efficacement les équipements techniques d’un bâtiment ou d’une installation. Elle me permet d'assurer l’exécution automatique des commandes selon des scénarios, horaires, capteurs et conditions prédéfinies. L’API peut gérer l’éclairage, la ventilation, les pompes, moteurs, portes, équipements électriques et systèmes de production. Il permet de centraliser les informations provenant des différents capteurs et de commander les équipements en temps réel. La supervision facilite le suivi des états, la détection des anomalies et l’analyse du fonctionnement des installations."
    }
}

# Matcher function
def match_desc(title_str):
    t = title_str.lower()
    if 'incendie' in t or 'extinction' in t:
        if 'extinction' in t: return DESCS['extinction']
        return DESCS['incendie']
    if 'intrusion' in t or 'alarme' in t: return DESCS['intrusion']
    if 'vidéo' in t or 'video' in t or 'surveillance' in t:
        if 'conférence' in t or 'conference' in t: return DESCS['videoconference']
        return DESCS['video']
    if 'accès' in t or 'acces' in t or 'pointage' in t: return DESCS['acces']
    if 'optique' in t or 'fibre' in t: return DESCS['optique']
    if 'wifi' in t or 'wi-fi' in t: return DESCS['wifi']
    if 'informatique' in t or 'datacenter' in t or 'réseau info' in t: return DESCS['reseau_info']
    if 'téléphonie' in t or 'telephonie' in t or 'pabx' in t: return DESCS['telephonie']
    if 'domotique' in t or 'smart home' in t or 'smart building' in t: return DESCS['domotique']
    if 'télédistribution' in t or 'teledistribution' in t or 'télédiffusion' in t: return DESCS['teledistribution']
    if 'sonorisation' in t or 'audiovisuel' in t: return DESCS['sonorisation']
    if 'automatisme' in t or 'motorisation' in t or 'portail' in t: return DESCS['automatisme']
    if 'intercom' in t: return DESCS['intercom']
    if 'multiroom' in t or 'multi room' in t: return DESCS['multiroom']
    if 'cinéma' in t or 'cinema' in t: return DESCS['home_cinema']
    if 'pos' in t or 'vente' in t: return DESCS['pos']
    if 'gtc' in t or 'gtb' in t or 'technique' in t: return DESCS['gtc']
    if 'parking' in t: return DESCS['parking']
    if 'malade' in t: return DESCS['appel_malade']
    if 'api' in t or 'automate' in t: return DESCS['api']
    return None

# Update HTML solution pages
def update_solution_html(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace data-solution-desc
    def r_data(m):
        tag = m.group(0)
        tm = re.search(r'data-solution-title="([^"]+)"', tag)
        if tm:
            title = tm.group(1).strip()
            data = match_desc(title)
            if data:
                full_clean = data["full"].replace('"', '&quot;')
                tag = re.sub(r'data-solution-desc="[^"]*"', f'data-solution-desc="{full_clean}"', tag)
        return tag

    content = re.sub(r'<(?:a|div)[^>]*data-solution-title="[^"]*"[^>]*>', r_data, content)

    # Replace card-v2-desc
    def r_card(m):
        card = m.group(0)
        tm = re.search(r'<h3 class="card-title-text">([^<]+)</h3>', card)
        if tm:
            title = tm.group(1).strip()
            data = match_desc(title)
            if data:
                short_clean = data["short"]
                card = re.sub(r'<p class="card-v2-desc">.*?</p>', f'<p class="card-v2-desc">{short_clean}</p>', card, flags=re.DOTALL)
        return card

    content = re.sub(r'<div class="card-v2-container">.*?</div>\s*</div>', r_card, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fully updated descriptions in {filepath}")

for p in ['solutions-hoteliere.html', 'solutions-riad-villa.html', 'solutions-innovantes.html', 'activites.html']:
    update_solution_html(p)

print("COMPLETED COMPLETE DESCRIPTIONS UPDATE.")

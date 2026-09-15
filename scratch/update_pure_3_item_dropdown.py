import glob, re

root_pages = [
    'index.html', 'about.html', 'activites.html', 'services.html', 
    'realisations.html', 'marques.html', 'contact.html',
    'solutions-hoteliere.html', 'solutions-riad-villa.html', 'solutions-innovantes.html'
]
sub_pages = glob.glob('activites/*.html')

def get_root_nav(active_page):
    act_index = ' active' if active_page == 'index.html' else ''
    act_about = ' active' if active_page == 'about.html' else ''
    act_sol = ' active' if active_page in ['activites.html', 'solutions-hoteliere.html', 'solutions-riad-villa.html', 'solutions-innovantes.html'] else ''
    act_real = ' active' if active_page == 'realisations.html' else ''
    act_contact = ' active' if active_page == 'contact.html' else ''

    return f'''<ul class="nav-menu">
                    <li><a href="index.html" class="nav-link{act_index}">Accueil</a></li>
                    <li><a href="about.html" class="nav-link{act_about}">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="activites.html" class="nav-link{act_sol}">Solutions IT <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="solutions-hoteliere.html" class="dropdown-item"><i class="fa-solid fa-hotel"></i> Solutions Hôtelière</a>
                            <a href="solutions-riad-villa.html" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Solutions Riad & Villa</a>
                            <a href="solutions-innovantes.html" class="dropdown-item"><i class="fa-solid fa-lightbulb"></i> Solutions Innovantes</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="realisations.html" class="nav-link{act_real}">Nos réalisations <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="realisations.html#hopitaux" class="dropdown-item"><i class="fa-solid fa-hospital"></i> Hôpitaux</a>
                            <a href="realisations.html#usines" class="dropdown-item"><i class="fa-solid fa-industry"></i> Usines</a>
                            <a href="realisations.html#administrations" class="dropdown-item"><i class="fa-solid fa-landmark"></i> Administrations</a>
                            <a href="realisations.html#universites" class="dropdown-item"><i class="fa-solid fa-graduation-cap"></i> Universités</a>
                            <a href="realisations.html#villas" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Riad & Villa</a>
                        </div>
                    </li>
                    <li><a href="contact.html" class="nav-link{act_contact}">Contact</a></li>
                </ul>'''

def get_sub_nav():
    return '''<ul class="nav-menu">
                    <li><a href="../index.html" class="nav-link">Accueil</a></li>
                    <li><a href="../about.html" class="nav-link">À propos</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="../activites.html" class="nav-link active">Solutions IT <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="../solutions-hoteliere.html" class="dropdown-item"><i class="fa-solid fa-hotel"></i> Solutions Hôtelière</a>
                            <a href="../solutions-riad-villa.html" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Solutions Riad & Villa</a>
                            <a href="../solutions-innovantes.html" class="dropdown-item"><i class="fa-solid fa-lightbulb"></i> Solutions Innovantes</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="../realisations.html" class="nav-link">Nos réalisations <i class="fa-solid fa-chevron-down" style="font-size:0.75rem; margin-left:4px;"></i></a>
                        <div class="dropdown-menu">
                            <a href="../realisations.html#hopitaux" class="dropdown-item"><i class="fa-solid fa-hospital"></i> Hôpitaux</a>
                            <a href="../realisations.html#usines" class="dropdown-item"><i class="fa-solid fa-industry"></i> Usines</a>
                            <a href="../realisations.html#administrations" class="dropdown-item"><i class="fa-solid fa-landmark"></i> Administrations</a>
                            <a href="../realisations.html#universites" class="dropdown-item"><i class="fa-solid fa-graduation-cap"></i> Universités</a>
                            <a href="../realisations.html#villas" class="dropdown-item"><i class="fa-solid fa-house-chimney"></i> Riad & Villa</a>
                        </div>
                    </li>
                    <li><a href="../contact.html" class="nav-link">Contact</a></li>
                </ul>'''

# Update Root Pages
for page in root_pages:
    if not glob.glob(page):
        continue
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'<ul class="nav-menu">.*?</ul>', get_root_nav(page), content, flags=re.DOTALL)
    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated dropdown on root page: {page}')

# Update Sub Pages
for page in sub_pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'<ul class="nav-menu">.*?</ul>', get_sub_nav(), content, flags=re.DOTALL)
    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated dropdown on sub page: {page}')

print("Pure 3-item dropdown update complete on all pages!")

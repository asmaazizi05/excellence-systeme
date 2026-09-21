import glob
import re
import os

old_linkedin = r'https://www\.linkedin\.com/in/excellence-systeme-44733a397/'
new_linkedin = 'https://www.linkedin.com/in/mohamed-azizi-7a390a77?utm_source=share_via&utm_content=profile&utm_medium=member_android'

old_insta = r'https://www\.instagram\.com/ste__excellence_syst\?stkn=MXZ0a3pjbzh1NmE2MQ=='
new_insta = 'https://www.instagram.com/ste__excellence_systeme?stkn=MXZ0a3pjbzh1NmE2MQ=='

old_email = 'commercial.exsys@gamil.com'
new_email = 'commercial.exsys@gmail.com'

html_files = glob.glob('**/*.html', recursive=True)

# 1. Update Social Links and Email in all HTML files
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    new_content = re.sub(old_linkedin, new_linkedin, new_content)
    new_content = re.sub(old_insta, new_insta, new_content)
    new_content = new_content.replace(old_email, new_email)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated social links & email in: {file_path}")

# 2. Update realisations.html - Remove category filter tabs
if os.path.exists('realisations.html'):
    with open('realisations.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern for portfolio-filter tabs
    filter_pattern = r'<div class="portfolio-filters"[^>]*>.*?</div>'
    new_content = re.sub(filter_pattern, '', content, flags=re.DOTALL)
    
    if new_content != content:
        with open('realisations.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Removed filter tabs from realisations.html")

# 3. Update Activity Pages in activites/ - Remove Marques & Partenaires section
activity_files = glob.glob('activites/*.html')
for file_path in activity_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove brands section if present
    brands_pattern = r'<section class="brands-section"[^>]*>.*?</section>'
    new_content = re.sub(brands_pattern, '', content, flags=re.DOTALL)
    
    # Also check for alternate section class/structure for brands
    alt_brands_pattern = r'<!-- MARQUES & PARTENAIRES -->.*?</section>'
    new_content = re.sub(alt_brands_pattern, '', new_content, flags=re.DOTALL)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed brands section from: {file_path}")

print("Phase 2 Global Fixes Applied Successfully!")

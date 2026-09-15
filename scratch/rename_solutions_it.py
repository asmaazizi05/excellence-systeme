import glob, re

files = glob.glob('*.html') + glob.glob('activites/*.html')

count = 0
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Solutions & Activités' in content:
        content = content.replace('Solutions & Activités', 'Solutions IT')
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Updated {fpath}")

print(f"Renamed 'Solutions & Activités' to 'Solutions IT' in {count} files!")

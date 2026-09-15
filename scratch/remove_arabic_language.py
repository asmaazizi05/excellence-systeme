import glob
import re

html_files = glob.glob('**/*.html', recursive=True)
count = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the AR language button
    pattern = r'\s*<button type="button" class="lang-btn" data-lang="ar">AR</button>'
    new_content = re.sub(pattern, '', content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed Arabic button from: {file_path}")
        count += 1

print(f"Total files updated: {count}")

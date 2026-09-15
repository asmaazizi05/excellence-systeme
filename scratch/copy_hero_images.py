import os, shutil

src_dir = "/Users/user/Desktop/Excellence systeme/images site web"
dst_dir = "/Users/user/Desktop/Excellence systeme/assets/hero_slideshow"

os.makedirs(dst_dir, exist_ok=True)

images = [
    "WhatsApp Image 2026-09-14 at 16.53.54.jpeg",
    "WhatsApp Image 2026-09-14 at 16.54.04.jpeg",
    "WhatsApp Image 2026-09-14 at 16.54.05.jpeg",
    "WhatsApp Image 2026-09-14 at 16.54.07.jpeg"
]

copied_files = []
for idx, img_name in enumerate(images, 1):
    src_path = os.path.join(src_dir, img_name)
    dst_name = f"hero-slide-{idx}.jpeg"
    dst_path = os.path.join(dst_dir, dst_name)
    shutil.copy2(src_path, dst_path)
    copied_files.append(f"assets/hero_slideshow/{dst_name}")
    print(f"Copied '{img_name}' -> '{dst_path}'")

print("All hero slideshow images copied successfully!")

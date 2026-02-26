
import os

def bump_version(directory, old_v, new_v):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                if old_v in content:
                    new_content = content.replace(old_v, new_v)
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"🚀 Bumped version in: {path}")
                    count += 1
    
    print(f"✅ Version bump complete. Updated {count} files.")

if __name__ == "__main__":
    # Bumping from 2.1 to 3.0 for the Gold Master release
    bump_version("Website", "styles.css?v=2.1", "styles.css?v=3.0")

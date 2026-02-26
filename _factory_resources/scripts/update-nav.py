
import os
import re

# Configuration
target_dir = "Website"

# Nav addition
nav_item = '<li><a href="/blog/">Blog</a></li>'

def update_headers(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # We look for the closing </ul> of the nav-menu
                if '<li><a href="/blog/">' not in content:
                    # Insert before the last </ul> in <nav class="nav-menu">
                    # Pattern strategy: find the specific nav menu block
                    nav_pattern = re.compile(r'(<nav class="nav-menu">.*?<ul>)(.*?)(</ul>)', re.DOTALL)
                    
                    def replace_nav(match):
                        p1 = match.group(1) # <nav ...><ul>
                        p2 = match.group(2) # existing items
                        p3 = match.group(3) # </ul>
                        return f"{p1}{p2}                    {nav_item}\n                {p3}"

                    new_content = nav_pattern.sub(replace_nav, content)
                    
                    if content != new_content:
                        with open(path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"✅ Added Blog to header: {path}")
                        count += 1
    
    print(f"🎉 Header Update complete. Updated {count} files.")

if __name__ == "__main__":
    update_headers(target_dir)

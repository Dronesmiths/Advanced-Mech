
import os
import re

# Configuration
target_dir = "Website"

# New Footer Section Templates

# 1. Locations: HQ + 5 Areas = 6 Total
new_locations_html = """
                    <div class="aw-footer-locations">
                        <h4>Service Areas</h4>
                        <ul>
                            <li><a href="/locations/">[CITY_HQ], CA</a></li>
                            <li><a href="/locations/">[CITY_1], CA</a></li>
                            <li><a href="/locations/">[CITY_2], CA</a></li>
                            <li><a href="/locations/">[CITY_3], CA</a></li>
                            <li><a href="/locations/">[CITY_4]</a></li>
                            <li><a href="/locations/">[CITY_5]</a></li>
                        </ul>
                    </div>
"""

# 2. Services: 3 Main + 5 Sub = 8 Total
new_services_html = """
                    <div class="aw-footer-services">
                        <h4>Our Services</h4>
                        <ul>
                            <li><a href="/services/hardscape-landscape/">Hardscape & Landscape</a></li>
                            <li><a href="/services/handyman-pro/">Handyman Pro</a></li>
                            <li><a href="/services/hauling-cleanup/">Hauling & Cleanup</a></li>
                            <li><a href="/services/">[SUB_SERVICE_1]</a></li>
                            <li><a href="/services/">[SUB_SERVICE_2]</a></li>
                            <li><a href="/services/">[SUB_SERVICE_3]</a></li>
                            <li><a href="/services/">[SUB_SERVICE_4]</a></li>
                            <li><a href="/services/">[SUB_SERVICE_5]</a></li>
                        </ul>
                    </div>
"""

# 3. Bottom Bar: Generic
new_bottom_bar_html = """
                <div class="aw-footer-bottom">
                    <p>© <span id="year"></span> [BUSINESS_NAME]. All rights reserved. | [LICENSE_TEXT] | <a href="[GOOGLE_MAPS_URL]">Find Us on Google</a> | <a href="/sitemap.xml">Sitemap</a> | <a href="/privacy/">Privacy Policy</a></p>
                </div>
"""

# 4. Communities List Component
new_communities_list_html = """
                    <h3>Communities We Support</h3>
                    <ul class="av-palmdale-area-list">
                        <li>[CITY_HQ], CA</li>
                        <li>[CITY_1], CA</li>
                        <li>[CITY_2], CA</li>
                        <li>[CITY_3]</li>
                        <li>[CITY_4]</li>
                        <li>[CITY_5]</li>
                    </ul>
"""

# Regex Patterns to find existing blocks
service_pattern = re.compile(r'<div class="aw-footer-services">.*?</div>', re.DOTALL)
location_pattern = re.compile(r'<div class="aw-footer-locations">.*?</div>', re.DOTALL)
bottom_bar_pattern = re.compile(r'<div class="aw-footer-bottom">.*?</div>', re.DOTALL)
communities_pattern = re.compile(r'<h3>Communities We Support</h3>.*?<ul class="av-palmdale-area-list">.*?</ul>', re.DOTALL)

def update_files(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Update Services
                new_content = service_pattern.sub(new_services_html.strip(), content)
                
                # Update Locations
                new_content = location_pattern.sub(new_locations_html.strip(), new_content)
                
                # Update Bottom Bar
                new_content = bottom_bar_pattern.sub(new_bottom_bar_html.strip(), new_content)
                
                # Update Communities List
                new_content = communities_pattern.sub(new_communities_list_html.strip(), new_content)

                # Clean Hardcoded Bits
                # Phone: (661) 582-2919 -> [PHONE_NUMBER]
                new_content = new_content.replace("(661) 582-2919", "[PHONE_NUMBER]")
                
                # Region: Antelope Valley -> [REGION]
                new_content = new_content.replace("Antelope Valley", "[REGION]")

                # Iframe maps sterilization
                # Replace specific map queries with a placeholder or generic Antelope Valley one
                # Actually, replacing the query with [CITY_HQ]+[REGION] is better
                map_regex = re.compile(r'https://www\.google\.com/maps/embed\?pb=[^"]+', re.IGNORECASE)
                # Generic AV map embed if we don't have a specific dynamic one yet
                new_content = map_regex.sub("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104689.87329582846!2d-118.21634848358485!3d34.69532822452296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c25a075e7aee29%3A0xe67b40742d4a13d7!2s[REGION]!5e0!3m2!1sen!2sus!4v1703112345678!5m2!1sen!2sus", new_content)

                if content != new_content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"✅ Cleaned: {path}")
                    count += 1
    
    print(f"🎉 Global Cleanup complete. Updated {count} files.")

if __name__ == "__main__":
    print("🚀 Running Final Factory Sterilization...")
    update_files(target_dir)

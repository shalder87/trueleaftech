import os
import re

# Define the old and new footer patterns
old_footer_pattern = r'<li><a href="#">Privacy Policy</a></li>\s*<li><a href="#">Terms of Service</a></li>'
new_footer_links = '''<li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-of-service.html">Terms of Service</a></li>'''

# Get all HTML files except the ones we just created
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
html_files = [f for f in html_files if f not in ['index.html', 'privacy-policy.html', 'terms-of-service.html']]

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the footer links
        if re.search(old_footer_pattern, content):
            content = re.sub(old_footer_pattern, new_footer_links, content)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated footer in {file}")
        else:
            print(f"Footer pattern not found in {file}")
    except Exception as e:
        print(f"Error updating {file}: {e}")

print("Footer update complete!")

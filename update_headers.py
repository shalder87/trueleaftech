import os
import re

# Define the old and new header navigation
old_nav = '''            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="case-studies.html">Case Studies</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="free-audit.html" class="btn btn-small">Free Audit</a></li>
                </ul>
            </nav>'''

new_nav = '''            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li class="dropdown">
                        <a href="services.html">Services</a>
                        <ul class="dropdown-menu">
                            <li><a href="amazon-ppc-management.html">Amazon PPC Management</a></li>
                            <li><a href="amazon-listing-optimization.html">Listing Optimization</a></li>
                            <li><a href="amazon-posts-social-media.html">Amazon Posts & Social Media</a></li>
                            <li><a href="amazon-customer-service-management.html">Amazon Customer Service Management</a></li>
                            <li><a href="amazon-product-research-services.html">Amazon Product Research Services</a></li>
                            <li><a href="amazon-review-management-services.html">Amazon Review Management Services</a></li>
                            <li><a href="amazon-account-audit-health-services.html">Amazon Account Audit & Health Services</a></li>
                            <li><a href="amazon-fba-returns-reimbursement-services.html">Amazon FBA Returns & Reimbursement Services</a></li>
                            <li><a href="walmart-marketplace-management-services.html">Walmart Marketplace Management Services</a></li>
                        </ul>
                    </li>
                    <li><a href="case-studies.html">Case Studies</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="free-audit.html" class="btn btn-small">Free Audit</a></li>
                </ul>
            </nav>'''

# Get all HTML files
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Skip index.html as it's already updated
html_files = [f for f in html_files if f != 'index.html']

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the navigation
        if old_nav in content:
            content = content.replace(old_nav, new_nav)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file}")
        else:
            print(f"Navigation not found in {file}")
    except Exception as e:
        print(f"Error updating {file}: {e}")

print("Header update complete!")

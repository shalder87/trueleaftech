import os
import re

# Files that need manual updating
files_to_update = [
    'pricing.html', 'faq.html', 'amazon-ppc-management.html', 
    'amazon-listing-optimization.html', 'amazon-posts-social-media.html',
    'free-audit.html', 'amazon-customer-service-management.html',
    'amazon-product-research-services.html', 'amazon-review-management-services.html',
    'amazon-account-audit-health-services.html', 'amazon-suspension-appeal-reinstatement-services.html',
    'amazon-product-photography-design-services.html', 'amazon-trademark-brand-registry-services.html',
    'amazon-fba-returns-reimbursement-services.html', 'amazon-vendor-central-management-services.html',
    'walmart-marketplace-management-services.html', 'tiktok-shop-management-services.html',
    'shopify-store-management-services.html', 'multi-platform-inventory-management-services.html',
    'omnichannel-ecommerce-advertising-services.html', 'ecommerce-logistics-fulfillment-services.html',
    'case-studies.html'
]

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

for file in files_to_update:
    if os.path.exists(file):
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find and replace navigation using regex
            nav_pattern = r'<nav>\s*<ul>.*?</ul>\s*</nav>'
            if re.search(nav_pattern, content, re.DOTALL):
                content = re.sub(nav_pattern, new_nav, content, flags=re.DOTALL)
                
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {file}")
            else:
                print(f"Navigation pattern not found in {file}")
        except Exception as e:
            print(f"Error updating {file}: {e}")
    else:
        print(f"File {file} not found")

print("Remaining header updates complete!")

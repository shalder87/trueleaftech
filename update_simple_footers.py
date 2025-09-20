import os
import re

# Files that need footer updates (those without Privacy/Terms links)
files_to_update = [
    'amazon-customer-service-management.html', 'amazon-product-research-services.html',
    'amazon-review-management-services.html', 'amazon-account-audit-health-services.html',
    'amazon-suspension-appeal-reinstatement-services.html', 'amazon-product-photography-design-services.html',
    'amazon-trademark-brand-registry-services.html', 'amazon-fba-returns-reimbursement-services.html',
    'amazon-vendor-central-management-services.html', 'walmart-marketplace-management-services.html',
    'tiktok-shop-management-services.html', 'shopify-store-management-services.html',
    'multi-platform-inventory-management-services.html', 'omnichannel-ecommerce-advertising-services.html',
    'ecommerce-logistics-fulfillment-services.html'
]

# Case study files
case_study_files = [f for f in os.listdir('.') if f.startswith('case-study-') and f.endswith('.html')]
files_to_update.extend(case_study_files)

# New footer with Privacy Policy and Terms of Service links
new_footer = '''    <footer>
        <div class="container">
            <p>&copy; 2025 TrueLeafTech. All rights reserved.</p>
            <ul>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-of-service.html">Terms of Service</a></li>
            </ul>
        </div>
    </footer>'''

for file in files_to_update:
    if os.path.exists(file):
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find and replace simple footer
            footer_pattern = r'<footer>\s*<div class="container">\s*<p>&copy; \d{4} TrueLeafTech\. All rights reserved\.</p>\s*</div>\s*</footer>'
            if re.search(footer_pattern, content):
                content = re.sub(footer_pattern, new_footer, content)
                
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated simple footer in {file}")
            else:
                print(f"Simple footer pattern not found in {file}")
        except Exception as e:
            print(f"Error updating {file}: {e}")
    else:
        print(f"File {file} not found")

print("Simple footer update complete!")

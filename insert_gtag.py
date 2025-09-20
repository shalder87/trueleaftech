import os

def insert_gtag_script(file_path, gtag_script):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the closing </head> tag
    head_end_index = content.find('</head>')

    if head_end_index != -1:
        # Insert the gtag script immediately after the <head> tag (or before </head>)
        # It's safer to insert before </head> to ensure it's within the head section
        new_content = content[:head_end_index] + gtag_script + content[head_end_index:]
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Inserted gtag into {file_path}")
    else:
        print(f"</head> tag not found in {file_path}, skipping.")

gtag_code = '''
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L2MVMDXN6T"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L2MVMDXN6T');
</script>
'''

html_files = [
    './index.html',
    './about.html',
    './services.html',
    './testimonials.html',
    './pricing.html',
    './faq.html',
    './contact.html',
    './amazon-ppc-management.html',
    './amazon-listing-optimization.html',
    './amazon-posts-social-media.html',
    './free-audit.html',
    './amazon-customer-service-management.html',
    './amazon-product-research-services.html',
    './amazon-review-management-services.html',
    './amazon-account-audit-health-services.html',
    './amazon-suspension-appeal-reinstatement-services.html',
    './amazon-product-photography-design-services.html',
    './amazon-trademark-brand-registry-services.html',
    './amazon-fba-returns-reimbursement-services.html',
    './amazon-vendor-central-management-services.html',
    './walmart-marketplace-management-services.html',
    './tiktok-shop-management-services.html',
    './shopify-store-management-services.html',
    './multi-platform-inventory-management-services.html',
    './omnichannel-ecommerce-advertising-services.html',
    './ecommerce-logistics-fulfillment-services.html',
    './case-study-steamtech-solutions.html',
    './case-study-ethical-footwear.html',
    './case-study-wellness-device-brand.html',
    './case-study-outdoor-equipment-retailer.html',
    './case-study-tech-accessories-firm.html',
    './case-study-nutrition-brand.html',
    './case-study-specialty-beauty-line.html',
    './case-study-pet-accessory-brand.html',
    './case-study-casual-footwear-brand.html',
    './case-study-health-advisory-firm.html',
    './case-study-techgear-pro.html',
    './case-study-urbangrow-solutions.html',
    './case-study-ecoclean-innovations.html',
    './case-study-freshbite-organics.html',
    './case-study-luxeliving-home.html',
    './case-study-greenthumb-gardens.html',
    './case-study-autorevive-parts.html',
    './case-study-globalconnect-solutions.html',
    './case-study-freshfinds-market.html',
    './case-study-swiftship-logistics.html',
    './case-study-fashionfusion-brands.html',
    './case-study-brandguard-solutions.html',
    './case-study-vendorlink-solutions.html',
    './case-studies.html',
    './privacy-policy.html',
    './terms-of-service.html'
]

for file_name in html_files:
    insert_gtag_script(file_name, gtag_code)

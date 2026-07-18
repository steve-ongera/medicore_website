#api/management/commands/seed_data.py
from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import (
    ModuleCategory, Module, Package, PackageModule, PackageFeature,
    Testimonial, FAQ, SiteSetting,
)


class Command(BaseCommand):
    help = "Seed the database with demo Medicore HMIS marketing content."

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Seeding module categories & modules...")

        categories = {
            "clinical": ModuleCategory.objects.get_or_create(name="Clinical", order=1)[0],
            "compliance": ModuleCategory.objects.get_or_create(name="Compliance & Billing", order=2)[0],
            "operations": ModuleCategory.objects.get_or_create(name="Operations", order=3)[0],
        }

        modules_data = [
            ("Outpatient (OP)", "OP", "clinical", True, "Fast patient triage, queueing and consultation records."),
            ("Inpatient Admission (IP ADM)", "IP-ADM", "clinical", True, "Ward admission, transfer and discharge workflows."),
            ("Bed Management", "BED", "operations", True, "Live bed occupancy tracking across wards and wings."),
            ("Pharmacy", "PHARM", "clinical", False, "Drug dispensing, stock levels and prescription tracking."),
            ("Laboratory", "LAB", "clinical", False, "Lab test orders, sample tracking and results delivery."),
            ("SHA Integration", "SHA", "compliance", True, "Direct claims submission to the Social Health Authority."),
            ("eTIMS Integration", "ETIMS", "compliance", True, "KRA-compliant electronic tax invoicing on every bill."),
            ("Billing & Invoicing", "BILL", "compliance", True, "Patient billing, insurance co-pay and M-Pesa payments."),
            ("Records Management", "REC", "operations", False, "Digital patient records with fast search and retrieval."),
            ("Reporting & Analytics", "RPT", "operations", False, "Facility-wide dashboards for occupancy, revenue and staffing."),
        ]

        modules = {}
        for i, (name, code, cat_key, is_core, desc) in enumerate(modules_data):
            m, _ = Module.objects.get_or_create(
                name=name,
                defaults=dict(
                    short_code=code,
                    category=categories[cat_key],
                    is_core=is_core,
                    short_description=desc,
                    order=i,
                ),
            )
            modules[code] = m

        self.stdout.write("Seeding packages...")

        packages_data = [
            {
                "name": "Starter",
                "tagline": "For small clinics & dispensaries",
                "description": "Everything a single-facility clinic needs to digitize outpatient care and stay SHA/eTIMS compliant.",
                "price": 8500,
                "max_beds": 0,
                "max_users": 5,
                "is_featured": False,
                "modules": ["OP", "SHA", "ETIMS", "BILL"],
                "features": ["Email & WhatsApp support", "Free onboarding", "Daily automatic backups"],
            },
            {
                "name": "Standard",
                "tagline": "For nursing homes & mid-size hospitals",
                "description": "Adds bed management, inpatient admissions and pharmacy to run a full ward operation.",
                "price": 22000,
                "max_beds": 60,
                "max_users": 25,
                "is_featured": True,
                "modules": ["OP", "IP-ADM", "BED", "PHARM", "SHA", "ETIMS", "BILL", "REC"],
                "features": ["Priority phone support", "Free onboarding & staff training", "Daily automatic backups", "M-Pesa Paybill integration"],
            },
            {
                "name": "Enterprise",
                "tagline": "For hospitals & multi-branch facilities",
                "description": "The full Medicore HMIS suite with lab, analytics and multi-branch reporting.",
                "price": None,
                "max_beds": None,
                "max_users": None,
                "is_featured": False,
                "modules": ["OP", "IP-ADM", "BED", "PHARM", "LAB", "SHA", "ETIMS", "BILL", "REC", "RPT"],
                "features": ["24/7 dedicated support", "On-site onboarding & training", "Custom integrations", "Multi-branch dashboards"],
            },
        ]

        for i, pkg in enumerate(packages_data):
            package, _ = Package.objects.get_or_create(
                name=pkg["name"],
                defaults=dict(
                    tagline=pkg["tagline"],
                    description=pkg["description"],
                    price=pkg["price"],
                    billing_cycle="monthly" if pkg["price"] else "one_time",
                    max_beds=pkg["max_beds"],
                    max_users=pkg["max_users"],
                    is_featured=pkg["is_featured"],
                    order=i,
                ),
            )
            for code in pkg["modules"]:
                PackageModule.objects.get_or_create(package=package, module=modules[code])
            for j, text in enumerate(pkg["features"]):
                PackageFeature.objects.get_or_create(package=package, text=text, defaults={"order": j})

        self.stdout.write("Seeding testimonials...")
        testimonials = [
            ("Dr. Wanjiru Kamau", "Medical Director", "South B Medical Centre, Nairobi",
             "Medicore cut our SHA claim rejection rate dramatically and our front desk queues moved so much faster.", 5),
            ("James Otieno", "Hospital Administrator", "Riverside Nursing Home, Kisumu",
             "Bed management alone saved us hours every shift change. Support has been excellent.", 5),
            ("Faith Chebet", "Finance Officer", "Uasin Gishu Health Centre, Eldoret",
             "eTIMS compliance used to be a headache. Now every invoice goes out correctly the first time.", 4),
        ]
        for i, (name, role, org, msg, rating) in enumerate(testimonials):
            Testimonial.objects.get_or_create(
                client_name=name,
                defaults=dict(client_role=role, organization=org, message=msg, rating=rating, order=i),
            )

        self.stdout.write("Seeding FAQs...")
        faqs = [
            ("Is Medicore HMIS compliant with SHA claim submission?",
             "Yes. All packages except custom Enterprise add-ons ship with direct SHA claims integration out of the box."),
            ("Do you support M-Pesa payments?",
             "Yes, Standard and Enterprise packages include M-Pesa Paybill/STK Push billing integration."),
            ("Can I upgrade my package later?",
             "Yes, you can upgrade at any time and we'll migrate your existing data at no extra cost."),
            ("Is my patient data secure?",
             "All data is encrypted in transit and at rest, with daily automatic backups on every plan."),
        ]
        for i, (q, a) in enumerate(faqs):
            FAQ.objects.get_or_create(question=q, defaults={"answer": a, "order": i})

        self.stdout.write("Seeding site settings...")
        settings_obj = SiteSetting.load()
        settings_obj.site_name = "Medicore HMIS"
        settings_obj.hero_headline = "Hospital Management, Simplified for Kenya"
        settings_obj.hero_subtext = (
            "SHA-ready, eTIMS-compliant HMIS software for clinics, nursing homes "
            "and hospitals across Kenya — from outpatient to bed management."
        )
        settings_obj.support_email = "support@medicorehmis.co.ke"
        settings_obj.support_phone = "+254 700 000000"
        settings_obj.address = "Nairobi, Kenya"
        settings_obj.save()

        self.stdout.write(self.style.SUCCESS("Medicore HMIS demo data seeded successfully."))

"""
Management command to seed the database with the content used on the
public homepage (Medicore HMIS): pricing Packages (+ PackageModules),
TeamMembers, and Services.

Usage:
    python manage.py seed_data
    python manage.py seed_data --flush   # wipe existing rows first
"""

from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import Package, PackageModule, TeamMember, Service


# ---------------------------------------------------------------------------
# PACKAGES — exact copy of the PACKAGES array in HomePage.jsx
# ---------------------------------------------------------------------------
PACKAGES_DATA = [
    {
        "name": "MediCore Essential",
        "tagline": "Clinics & Small Outpatient Centres (0 Beds)",
        "description": (
            "Ideal for small clinics and outpatient-only centres that need a "
            "clean, compliant foundation — registration, billing, pharmacy "
            "and reporting in one system."
        ),
        "price": "50,000",
        "price_prefix": "",
        "monthly_sla": "5,000",
        "monthly_sla_prefix": "",
        "is_featured": False,
        "badge_text": "",
        "modules_label": "All Included Modules",
        "display_order": 1,
        "modules": [
            "Dashboard",
            "Patient Registration",
            "EMR Framework",
            "Outpatient (OPD)",
            "Billing & Cashier",
            "Pharmacy",
            "Laboratory",
            "Appointments",
            "Queue Management",
            "Reports",
            "User & Role Mgmt",
            "Basic Inventory",
        ],
    },
    {
        "name": "MediCore Professional",
        "tagline": "Small Hospitals & Centres (20–30 Beds)",
        "description": (
            "Built for small hospitals moving beyond outpatient care — full "
            "inpatient workflows, bed and ward management, plus full SHA and "
            "eTIMS integration."
        ),
        "price": "150,000",
        "price_prefix": "",
        "monthly_sla": "15,000",
        "monthly_sla_prefix": "",
        "is_featured": False,
        "badge_text": "",
        "modules_label": "All Included Modules",
        "display_order": 2,
        "modules": [
            "Dashboard & Reports",
            "Registration & EMR",
            "Outpatient (OPD) Suite",
            "Inpatient (IPD) Suite",
            "Admissions & Discharge",
            "Bed & Ward Mgmt",
            "Nursing Notes",
            "Billing & Cashier",
            "Pharmacy & Laboratory",
            "Radiology & Theatre",
            "Appointments & Queue",
            "Blood Bank",
            "Dental & Eye Clinic",
            "Procurement & Assets",
            "Full SHA Claims",
            "Full eTIMS Integration",
            "User & Role Mgmt",
        ],
    },
    {
        "name": "MediCore Advanced",
        "tagline": "Medium Level 3 & 4 (30–80 Beds)",
        "description": (
            "Our most popular tier for medium-sized facilities — adds "
            "emergency, maternity, ICU/HDU, dialysis and specialized clinics "
            "on top of the full hospital core."
        ),
        "price": "320,000",
        "price_prefix": "",
        "monthly_sla": "28,000",
        "monthly_sla_prefix": "",
        "is_featured": True,
        "badge_text": "Most Popular",
        "modules_label": "All Included Modules",
        "display_order": 3,
        "modules": [
            "Emergency Dept",
            "Ambulance Mgmt",
            "Maternity Suite",
            "ICU/HDU Module",
            "Physio & Nutrition",
            "Dialysis Unit",
            "Specialized Clinics",
            "User Portals",
            "Executive Dash",
            "Insurance Billing",
            "IPD/OPD Workflows",
            "Admissions & Beds",
            "Radiology & Lab",
            "Pharmacy & Theatre",
            "Blood Bank Suite",
            "Procurement & Assets",
            "Full SHA & eTIMS",
        ],
    },
    {
        "name": "MediCore Enterprise",
        "tagline": "Level 4 & 5 Facilities (80–150 Beds)",
        "description": (
            "For large, multi-department facilities that need HR & payroll, "
            "finance, mortuary and CSSD control alongside advanced analytics "
            "and automation."
        ),
        "price": "580,000",
        "price_prefix": "",
        "monthly_sla": "45,000",
        "monthly_sla_prefix": "",
        "is_featured": False,
        "badge_text": "",
        "modules_label": "All Included Modules",
        "display_order": 4,
        "modules": [
            "Multi-Branch Support",
            "HR & Payroll Engine",
            "Finance & Accounting",
            "Mortuary Mgmt",
            "CSSD Control",
            "Oncology Care",
            "Mental Health Suite",
            "Public Health Rep.",
            "Equip. Maintenance",
            "BI & Automation",
            "Advanced APIs",
            "Emergency/Ambulance",
            "Maternity & ICU/HDU",
            "Physio & Dialysis",
            "IPD/OPD Full Workflows",
            "Theatre & Radiology",
            "Lab & Pharmacy",
            "SHA & eTIMS Systems",
        ],
    },
    {
        "name": "MediCore Prestige",
        "tagline": "Teaching & Referral (150+ Beds)",
        "description": (
            "The complete MediCore suite for teaching and referral "
            "hospitals — every module, every specialty, multi-hospital "
            "management and an executive AI dashboard."
        ),
        "price": "950,000",
        "price_prefix": "From ",
        "monthly_sla": "75,000",
        "monthly_sla_prefix": "From ",
        "is_featured": False,
        "badge_text": "",
        "modules_label": "COMPLETE SUITE MODULES",
        "display_order": 5,
        "modules": [
            "Multi-Hospital Mgmt",
            "OPD & IPD Core Suite",
            "Comprehensive Care",
            "Emergency & Ambulance",
            "Maternity & ICU Suite",
            "Oncology & Dialysis",
            "Mental & Nutrition",
            "Dental & Eye Clinics",
            "Physio & Rehab",
            "Theatre & CSSD Engine",
            "Lab & Blood Bank",
            "Radiology & Imaging",
            "Pharmacy & Retail POS",
            "Inventory & Procure",
            "Asset Lifecycle Mgmt",
            "HR, Payroll & Finance",
            "All Core Portals",
            "SHA Claims & Ins Engine",
            "eTIMS Integration",
            "Executive AI Dash",
        ],
    },
]


# ---------------------------------------------------------------------------
# TEAM MEMBERS — 4 members for the About page
# ---------------------------------------------------------------------------
TEAM_MEMBERS_DATA = [
    {
        "name": "Dr. Wanjiru Kamau",
        "role": "Chief Executive Officer & Co-Founder",
        "bio": (
            "A former hospital administrator with over 15 years in Kenyan "
            "healthcare, Wanjiru founded Medicore HMIS to close the gap "
            "between imported hospital software and how Kenyan facilities "
            "actually operate."
        ),
        "phone": "+254 700 111222",
        "email": "wanjiru@medicorehmis.co.ke",
        "linkedin_url": "https://www.linkedin.com/in/wanjirukamau",
        "twitter_url": "",
        "display_order": 1,
    },
    {
        "name": "Brian Otieno",
        "role": "Chief Technology Officer & Co-Founder",
        "bio": (
            "Brian leads product and engineering, with a background in "
            "building SHA and eTIMS-compliant fintech systems before turning "
            "his focus to hospital management software."
        ),
        "phone": "+254 700 222333",
        "email": "brian@medicorehmis.co.ke",
        "linkedin_url": "https://www.linkedin.com/in/brianotieno",
        "twitter_url": "https://twitter.com/brianotieno",
        "display_order": 2,
    },
    {
        "name": "Faith Achieng",
        "role": "Head of Client Success",
        "bio": (
            "Faith and her team manage onboarding and support for every "
            "facility on Medicore HMIS, from initial rollout through to "
            "day-to-day troubleshooting."
        ),
        "phone": "+254 700 333444",
        "email": "faith@medicorehmis.co.ke",
        "linkedin_url": "https://www.linkedin.com/in/faithachieng",
        "twitter_url": "",
        "display_order": 3,
    },
    {
        "name": "Samuel Njoroge",
        "role": "Head of Compliance & Partnerships",
        "bio": (
            "Samuel works directly with SHA, KRA and county health teams to "
            "keep Medicore HMIS aligned with the latest regulatory and "
            "reporting requirements."
        ),
        "phone": "+254 700 444555",
        "email": "samuel@medicorehmis.co.ke",
        "linkedin_url": "https://www.linkedin.com/in/samuelnjoroge",
        "twitter_url": "",
        "display_order": 4,
    },
]


# ---------------------------------------------------------------------------
# SERVICES — 10 services for the Services grid
# ---------------------------------------------------------------------------
SERVICES_DATA = [
    {
        "name": "SHA Integration",
        "short_description": "Submit claims directly to the Social Health Authority with real-time validation.",
        "description": (
            "Medicore HMIS connects directly to the Social Health Authority "
            "so claims are validated and submitted in real time, cutting "
            "down manual re-keying and reducing the rate of rejected claims."
        ),
        "icon": "fa-solid fa-hand-holding-medical",
        "display_order": 1,
    },
    {
        "name": "eTIMS Compliance",
        "short_description": "Every invoice is KRA eTIMS-compliant out of the box.",
        "description": (
            "Every invoice generated by the system is automatically "
            "compliant with KRA's eTIMS requirements, keeping your facility "
            "on the right side of tax law without extra plugins or manual work."
        ),
        "icon": "fa-solid fa-suitcase-medical",
        "display_order": 2,
    },
    {
        "name": "Bed Management",
        "short_description": "Live bed occupancy across every ward and wing.",
        "description": (
            "Track live bed occupancy across every ward and wing, so "
            "admissions and transfers stop relying on whiteboards and phone "
            "calls between departments."
        ),
        "icon": "fa-solid fa-bed-pulse",
        "display_order": 3,
    },
    {
        "name": "Patient Records & EMR",
        "short_description": "Fast, searchable digital records shared across departments.",
        "description": (
            "A fast, searchable electronic medical record follows the "
            "patient from outpatient triage through to discharge summaries, "
            "shared instantly across every department."
        ),
        "icon": "fa-solid fa-file-waveform",
        "display_order": 4,
    },
    {
        "name": "Pharmacy & Inventory",
        "short_description": "Track stock levels, expiries and dispensing in real time.",
        "description": (
            "Track stock levels, expiry dates and dispensing in real time, "
            "with automatic low-stock alerts before critical drugs run out."
        ),
        "icon": "fa-solid fa-pills",
        "display_order": 5,
    },
    {
        "name": "Billing & Insurance",
        "short_description": "Handle cash, insurance and SHA billing from one screen.",
        "description": (
            "Handle cash, private insurance and SHA billing from a single "
            "screen, with automatic reconciliation against claims already "
            "submitted."
        ),
        "icon": "fa-solid fa-file-invoice-dollar",
        "display_order": 6,
    },
    {
        "name": "Laboratory Management",
        "short_description": "Order, track and report lab tests without paper trails.",
        "description": (
            "Manage lab orders, sample tracking and results reporting "
            "digitally, so clinicians get results faster and nothing gets "
            "lost between departments."
        ),
        "icon": "fa-solid fa-flask",
        "display_order": 7,
    },
    {
        "name": "Appointments & Queue Management",
        "short_description": "Cut waiting times with digital scheduling and queueing.",
        "description": (
            "Digital appointment scheduling paired with queue management "
            "reduces patient waiting times and gives reception a clear, "
            "real-time view of the day."
        ),
        "icon": "fa-solid fa-calendar-check",
        "display_order": 8,
    },
    {
        "name": "Radiology & Imaging",
        "short_description": "Order, track and archive imaging requests digitally.",
        "description": (
            "Radiology requests, results and imaging archives are managed "
            "digitally and linked directly to the patient's record for easy "
            "retrieval."
        ),
        "icon": "fa-solid fa-x-ray",
        "display_order": 9,
    },
    {
        "name": "Reports & Analytics",
        "short_description": "Export SHA and management reports in a few clicks.",
        "description": (
            "Generate SHA-ready and internal management reports in a few "
            "clicks, with an executive dashboard giving leadership a live "
            "view of occupancy, billing and claims status."
        ),
        "icon": "fa-solid fa-chart-line",
        "display_order": 10,
    },
]


class Command(BaseCommand):
    help = "Seed the database with Packages, PackageModules, TeamMembers and Services used on the homepage."

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing Package, TeamMember and Service rows before seeding.",
        )

    def handle(self, *args, **options):
        with transaction.atomic():
            if options["flush"]:
                self.stdout.write(self.style.WARNING("Flushing existing seed data..."))
                PackageModule.objects.all().delete()
                Package.objects.all().delete()
                TeamMember.objects.all().delete()
                Service.objects.all().delete()

            self._seed_packages()
            self._seed_team_members()
            self._seed_services()

        self.stdout.write(self.style.SUCCESS("Seed data created successfully."))

    def _seed_packages(self):
        for data in PACKAGES_DATA:
            modules = data.pop("modules")
            package, created = Package.objects.update_or_create(
                name=data["name"],
                defaults={
                    "tagline": data["tagline"],
                    "description": data["description"],
                    "price": data["price"],
                    "price_prefix": data["price_prefix"],
                    "monthly_sla": data["monthly_sla"],
                    "monthly_sla_prefix": data["monthly_sla_prefix"],
                    "is_featured": data["is_featured"],
                    "badge_text": data["badge_text"],
                    "modules_label": data["modules_label"],
                    "display_order": data["display_order"],
                    "is_active": True,
                },
            )

            # Rebuild the module list for this package so re-running the
            # command keeps the modules in sync with the data above.
            package.modules.all().delete()
            PackageModule.objects.bulk_create(
                [
                    PackageModule(
                        package=package,
                        name=mod_name,
                        display_order=index,
                        is_active=True,
                    )
                    for index, mod_name in enumerate(modules)
                ]
            )

            action = "Created" if created else "Updated"
            self.stdout.write(f"  {action} package: {package.name} ({len(modules)} modules)")

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(PACKAGES_DATA)} packages."))

    def _seed_team_members(self):
        for data in TEAM_MEMBERS_DATA:
            member, created = TeamMember.objects.update_or_create(
                name=data["name"],
                defaults={
                    "role": data["role"],
                    "bio": data["bio"],
                    "phone": data["phone"],
                    "email": data["email"],
                    "linkedin_url": data["linkedin_url"],
                    "twitter_url": data["twitter_url"],
                    "display_order": data["display_order"],
                    "is_active": True,
                },
            )
            action = "Created" if created else "Updated"
            self.stdout.write(f"  {action} team member: {member.name}")

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(TEAM_MEMBERS_DATA)} team members."))

    def _seed_services(self):
        for data in SERVICES_DATA:
            service, created = Service.objects.update_or_create(
                name=data["name"],
                defaults={
                    "short_description": data["short_description"],
                    "description": data["description"],
                    "icon": data["icon"],
                    "display_order": data["display_order"],
                    "is_active": True,
                },
            )
            action = "Created" if created else "Updated"
            self.stdout.write(f"  {action} service: {service.name}")

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(SERVICES_DATA)} services."))
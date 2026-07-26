from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator

class Package(models.Model):
    """
    Hospital management software packages for pricing section
    """
    
    # Basic Information
    name = models.CharField(max_length=100, help_text="Package name e.g., MediCore Essential")
    slug = models.SlugField(max_length=120, unique=True, blank=True, help_text="URL-friendly version of name")
    tagline = models.CharField(max_length=200, blank=True, help_text="Short description under package name")
    description = models.TextField(blank=True, help_text="Detailed description of the package")
    
    # Pricing
    price = models.CharField(max_length=20, help_text="Setup fee in KES (e.g., '50,000')")
    price_prefix = models.CharField(max_length=20, blank=True, default="", help_text="e.g., 'From '")
    monthly_sla = models.CharField(max_length=20, help_text="Monthly SLA fee in KES (e.g., '5,000')")
    monthly_sla_prefix = models.CharField(max_length=20, blank=True, default="", help_text="e.g., 'From '")
    
    # Display Options
    is_featured = models.BooleanField(default=False, help_text="Mark as featured/most popular")
    badge_text = models.CharField(max_length=50, blank=True, help_text="e.g., 'Most Popular'")
    modules_label = models.CharField(max_length=100, blank=True, default="All Included Modules", 
                                     help_text="Custom label for modules section")
    display_order = models.IntegerField(default=0, help_text="Order in which packages appear")
    
    # Status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = "Package"
        verbose_name_plural = "Packages"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class PackageModule(models.Model):
    """
    Individual modules/features included in a package
    """
    
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='modules')
    name = models.CharField(max_length=100, help_text="Module name")
    display_order = models.IntegerField(default=0, help_text="Order in which modules appear")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = "Package Module"
        verbose_name_plural = "Package Modules"
    
    def __str__(self):
        return f"{self.package.name} - {self.name}"


class TeamMember(models.Model):
    """
    Team members for About page
    """
    
    name = models.CharField(max_length=100, help_text="Full name of team member")
    role = models.CharField(max_length=100, help_text="Job title/position")
    photo = models.ImageField(upload_to='team/', blank=True, null=True, help_text="Profile image")
    bio = models.TextField(blank=True, help_text="Short biography")
    
    # Contact & Social
    phone = models.CharField(max_length=20, blank=True, help_text="Contact phone number")
    email = models.EmailField(blank=True, help_text="Contact email address")
    linkedin_url = models.URLField(blank=True, help_text="LinkedIn profile URL")
    twitter_url = models.URLField(blank=True, help_text="Twitter/X profile URL")
    
    # Display
    display_order = models.IntegerField(default=0, help_text="Order in which team members appear")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
    
    def __str__(self):
        return self.name


class Service(models.Model):
    """
    Services/modules offered
    """
    
    name = models.CharField(max_length=100, help_text="Service name")
    slug = models.SlugField(max_length=120, unique=True, blank=True, help_text="URL-friendly version of name")
    short_description = models.CharField(max_length=200, help_text="Brief description shown on services grid")
    description = models.TextField(blank=True, help_text="Full detailed description")
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class (e.g., 'fa-solid fa-heart-pulse')")
    image = models.ImageField(upload_to='services/', blank=True, null=True, help_text="Service image")
    
    # Display
    display_order = models.IntegerField(default=0, help_text="Order in which services appear")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = "Service"
        verbose_name_plural = "Services"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    """
    Contact form submissions
    """
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


class Appointment(models.Model):
    """
    Demo appointment/book a demo requests
    """
    
    FACILITY_TYPES = [
        ('Clinic', 'Clinic'),
        ('Nursing Home', 'Nursing Home'),
        ('Hospital', 'Hospital'),
        ('Other', 'Other'),
    ]
    
    INTERESTED_PACKAGES = [
        ('Essential', 'Essential'),
        ('Standard', 'Standard'),
        ('Premium', 'Premium'),
        ('Not sure yet', 'Not sure yet'),
    ]
    
    # Personal Details
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    # Facility Details
    facility_name = models.CharField(max_length=200)
    facility_type = models.CharField(max_length=50, choices=FACILITY_TYPES)
    bed_capacity = models.PositiveIntegerField(blank=True, null=True, help_text="Number of beds")
    
    # Demo Preferences
    interested_package = models.CharField(max_length=50, choices=INTERESTED_PACKAGES, blank=True)
    preferred_date = models.DateTimeField()
    message = models.TextField(blank=True, help_text="Additional information about facility needs")
    
    # Status
    is_contacted = models.BooleanField(default=False, help_text="Has the team contacted this lead?")
    notes = models.TextField(blank=True, help_text="Internal notes about this lead")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"
    
    def __str__(self):
        return f"{self.name} - {self.facility_name}"


class FAQ(models.Model):
    """
    Frequently Asked Questions for Packages page
    """
    
    question = models.CharField(max_length=255)
    answer = models.TextField()
    display_order = models.IntegerField(default=0, help_text="Order in which FAQs appear")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'question']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
    
    def __str__(self):
        return self.question[:50]


class SiteSetting(models.Model):
    """
    Site-wide settings (contact info, etc.)
    """
    
    key = models.CharField(max_length=100, unique=True, help_text="Setting key e.g., 'support_phone'")
    value = models.TextField(help_text="Setting value")
    description = models.CharField(max_length=255, blank=True, help_text="Description of what this setting controls")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return self.key
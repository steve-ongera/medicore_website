from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


def module_icon_path(instance, filename):
    return f"modules/icons/{instance.slug}/{filename}"


def package_image_path(instance, filename):
    return f"packages/{instance.slug}/{filename}"


def testimonial_image_path(instance, filename):
    return f"testimonials/{instance.slug}/{filename}"


def general_upload_path(instance, filename):
    return f"site/{instance.__class__.__name__.lower()}/{filename}"


class TimeStampedModel(models.Model):
    """Abstract base with created/updated timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SlugModel(TimeStampedModel):
    """Abstract base that auto-generates a unique slug from `name` on save."""
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            model_class = self.__class__
            while model_class.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class ModuleCategory(models.Model):
    """
    Groups modules e.g. Clinical, Compliance, Operations, Finance.
    Used to organise the modules listing on the packages/module pages.
    """
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Module Category"
        verbose_name_plural = "Module Categories"
        ordering = ["order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Module(SlugModel):
    """
    A single HMIS module/feature, e.g. SHA Integration, eTIMS Integration,
    Bed Management, Outpatient (OP), Inpatient Admission (IP ADM), Pharmacy,
    Laboratory, Radiology, Billing, Records, etc.
    """
    category = models.ForeignKey(
        ModuleCategory, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="modules"
    )
    name = models.CharField(max_length=150)
    short_code = models.CharField(
        max_length=20, blank=True,
        help_text="Short tag e.g. SHA, ETIMS, OP, IP-ADM, BED, PHARM"
    )
    icon = models.ImageField(upload_to=module_icon_path, blank=True, null=True)
    short_description = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_core = models.BooleanField(
        default=False,
        help_text="Core modules ship in every package regardless of tier."
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Package(SlugModel):
    """
    A Medicore HMIS pricing/feature package, e.g. Starter, Standard, Premium,
    Enterprise. Each package bundles a set of Modules.
    """
    BILLING_CYCLE_CHOICES = [
        ("monthly", "Monthly"),
        ("annually", "Annually"),
        ("one_time", "One-Time / Custom"),
    ]

    name = models.CharField(max_length=150)
    tagline = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to=package_image_path, blank=True, null=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        help_text="Price in KES. Leave blank for 'Contact us' / custom pricing."
    )
    billing_cycle = models.CharField(
        max_length=20, choices=BILLING_CYCLE_CHOICES, default="monthly"
    )
    max_beds = models.PositiveIntegerField(
        null=True, blank=True, help_text="Bed capacity limit for this package, if any."
    )
    max_users = models.PositiveIntegerField(
        null=True, blank=True, help_text="Staff/user account limit for this package, if any."
    )
    modules = models.ManyToManyField(
        Module, through="PackageModule", related_name="packages", blank=True
    )
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "price"]

    def __str__(self):
        return self.name


class PackageModule(models.Model):
    """
    Through-model linking a Package to a Module, so extra context (e.g. a
    module being 'add-on only' for a given package) can be attached later.
    """
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    is_addon = models.BooleanField(
        default=False, help_text="True if this module is an optional add-on for the package."
    )

    class Meta:
        unique_together = ("package", "module")
        ordering = ["module__order"]

    def __str__(self):
        return f"{self.package.name} — {self.module.name}"


class PackageFeature(models.Model):
    """
    Free-text bullet-point features/highlights listed under a package card,
    separate from Modules (e.g. '24/7 support', 'Free onboarding & training').
    """
    package = models.ForeignKey(
        Package, on_delete=models.CASCADE, related_name="features"
    )
    text = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text


class Testimonial(SlugModel):
    client_name = models.CharField(max_length=150)
    client_role = models.CharField(max_length=150, blank=True)
    organization = models.CharField(max_length=150, blank=True)
    image = models.ImageField(upload_to=testimonial_image_path, blank=True, null=True)
    message = models.TextField()
    rating = models.PositiveSmallIntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]

    @property
    def name(self):
        # SlugModel.save() slugifies `self.name`; alias it to client_name.
        return self.client_name

    def __str__(self):
        return f"{self.client_name} ({self.organization})"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
        ordering = ["order"]

    def __str__(self):
        return self.question


class TeamMember(SlugModel):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    bio = models.TextField(blank=True)
    linkedin_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class ContactMessage(TimeStampedModel):
    """Submissions from the public Contact Us page."""
    STATUS_CHOICES = [
        ("new", "New"),
        ("read", "Read"),
        ("responded", "Responded"),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    organization = models.CharField(max_length=150, blank=True)
    interested_package = models.ForeignKey(
        Package, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="contact_messages"
    )
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} — {self.subject or 'General Inquiry'}"


class DemoRequest(TimeStampedModel):
    """A dedicated 'Book a Demo' CTA, separate from general contact messages."""
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    facility_name = models.CharField(max_length=150)
    facility_type = models.CharField(
        max_length=100, blank=True,
        help_text="e.g. Hospital, Clinic, Nursing Home, Dispensary"
    )
    package = models.ForeignKey(
        Package, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="demo_requests"
    )
    preferred_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    is_contacted = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Demo request — {self.facility_name}"


class SiteSetting(models.Model):
    """
    Singleton-style model for global site content (hero copy, contact
    details, social links) editable from the Django admin.
    """
    site_name = models.CharField(max_length=150, default="Medicore HMIS")
    logo = models.ImageField(upload_to="site/", blank=True, null=True)
    hero_headline = models.CharField(max_length=255, blank=True)
    hero_subtext = models.TextField(blank=True)
    hero_image = models.ImageField(upload_to="site/", blank=True, null=True)
    support_email = models.EmailField(blank=True)
    support_phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.site_name

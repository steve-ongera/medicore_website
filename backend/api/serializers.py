from rest_framework import serializers
from .models import (
    ModuleCategory,
    Module,
    Package,
    PackageModule,
    PackageFeature,
    Testimonial,
    FAQ,
    TeamMember,
    ContactMessage,
    DemoRequest,
    SiteSetting,
)


class ModuleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleCategory
        fields = ["id", "name", "slug", "order"]


class ModuleSerializer(serializers.ModelSerializer):
    category = ModuleCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ModuleCategory.objects.all(), source="category",
        write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Module
        fields = [
            "id", "name", "slug", "short_code", "category", "category_id",
            "icon", "short_description", "description", "is_core",
            "is_active", "order",
        ]


class ModuleListSerializer(serializers.ModelSerializer):
    """Lightweight module representation, used nested inside Package output."""
    is_addon = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Module
        fields = [
            "id", "name", "slug", "short_code", "icon",
            "short_description", "is_core", "is_addon",
        ]


class PackageFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageFeature
        fields = ["id", "text", "order"]


class PackageListSerializer(serializers.ModelSerializer):
    """Compact serializer for the packages grid / homepage cards."""
    module_count = serializers.SerializerMethodField()

    class Meta:
        model = Package
        fields = [
            "id", "name", "slug", "tagline", "image", "price",
            "billing_cycle", "max_beds", "max_users", "is_featured",
            "order", "module_count",
        ]

    def get_module_count(self, obj):
        return obj.modules.count()


class PackageDetailSerializer(serializers.ModelSerializer):
    """Full package detail, including modules (with add-on flag) and features."""
    modules = serializers.SerializerMethodField()
    features = PackageFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Package
        fields = [
            "id", "name", "slug", "tagline", "description", "image",
            "price", "billing_cycle", "max_beds", "max_users",
            "is_featured", "modules", "features",
        ]

    def get_modules(self, obj):
        links = PackageModule.objects.filter(package=obj).select_related(
            "module", "module__category"
        )
        result = []
        for link in links:
            data = ModuleListSerializer(link.module).data
            data["is_addon"] = link.is_addon
            result.append(data)
        return result


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id", "client_name", "slug", "client_role", "organization",
            "image", "message", "rating", "is_featured", "order",
        ]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "slug", "role", "photo", "bio", "linkedin_url", "order"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id", "full_name", "email", "phone", "organization",
            "interested_package", "subject", "message", "status", "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]


class DemoRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoRequest
        fields = [
            "id", "full_name", "email", "phone", "facility_name",
            "facility_type", "package", "preferred_date", "notes",
            "is_contacted", "created_at",
        ]
        read_only_fields = ["id", "is_contacted", "created_at"]


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = [
            "site_name", "logo", "hero_headline", "hero_subtext", "hero_image",
            "support_email", "support_phone", "address",
            "facebook_url", "twitter_url", "linkedin_url", "instagram_url",
        ]

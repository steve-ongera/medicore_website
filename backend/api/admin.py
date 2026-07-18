from django.contrib import admin
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


@admin.register(ModuleCategory)
class ModuleCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ["name", "short_code", "category", "is_core", "is_active", "order"]
    list_filter = ["category", "is_core", "is_active"]
    search_fields = ["name", "short_code"]
    prepopulated_fields = {"slug": ("name",)}


class PackageModuleInline(admin.TabularInline):
    model = PackageModule
    extra = 1


class PackageFeatureInline(admin.TabularInline):
    model = PackageFeature
    extra = 1


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "billing_cycle", "is_featured", "is_active", "order"]
    list_filter = ["is_featured", "is_active", "billing_cycle"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [PackageModuleInline, PackageFeatureInline]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["client_name", "organization", "rating", "is_featured", "order"]
    list_filter = ["is_featured", "rating"]
    prepopulated_fields = {"slug": ("client_name",)}


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "order", "is_active"]
    list_filter = ["is_active"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "subject", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["full_name", "email", "message"]


@admin.register(DemoRequest)
class DemoRequestAdmin(admin.ModelAdmin):
    list_display = ["full_name", "facility_name", "package", "is_contacted", "created_at"]
    list_filter = ["is_contacted", "created_at"]
    search_fields = ["full_name", "facility_name", "email"]


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not SiteSetting.objects.exists()

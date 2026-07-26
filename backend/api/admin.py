from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Package, PackageModule, TeamMember, Service, 
    ContactMessage, Appointment, FAQ, SiteSetting
)


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    """
    Admin configuration for Package model
    """
    list_display = ['name', 'price', 'monthly_sla', 'is_featured', 'is_active', 'display_order']
    list_filter = ['is_featured', 'is_active']
    search_fields = ['name', 'tagline', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'tagline', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'price_prefix', 'monthly_sla', 'monthly_sla_prefix')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'badge_text', 'modules_label', 'display_order')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


@admin.register(PackageModule)
class PackageModuleAdmin(admin.ModelAdmin):
    """
    Admin configuration for PackageModule model
    """
    list_display = ['name', 'package', 'display_order', 'is_active']
    list_filter = ['package', 'is_active']
    search_fields = ['name', 'package__name']
    ordering = ['package', 'display_order']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    """
    Admin configuration for TeamMember model
    """
    list_display = ['name', 'role', 'display_order', 'is_active', 'avatar_preview']
    list_filter = ['is_active']
    search_fields = ['name', 'role', 'bio']
    ordering = ['display_order', 'name']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'role', 'photo', 'bio')
        }),
        ('Contact & Social', {
            'fields': ('phone', 'email', 'linkedin_url', 'twitter_url')
        }),
        ('Display Settings', {
            'fields': ('display_order', 'is_active')
        }),
    )
    
    def avatar_preview(self, obj):
        """
        Display a thumbnail preview of the team member's photo
        """
        if obj.photo:
            return format_html(
                '<img src="{}" width="50" height="50" style="border-radius: 50%; object-fit: cover;" />',
                obj.photo.url
            )
        return "No photo"
    avatar_preview.short_description = 'Avatar'


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """
    Admin configuration for Service model
    """
    list_display = ['name', 'short_description', 'icon', 'display_order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'short_description', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'short_description', 'description')
        }),
        ('Icons & Images', {
            'fields': ('icon', 'image')
        }),
        ('Display Settings', {
            'fields': ('display_order', 'is_active')
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """
    Admin configuration for ContactMessage model
    """
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"
    
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Mark selected messages as unread"


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """
    Admin configuration for Appointment model
    """
    list_display = [
        'name', 'facility_name', 'facility_type', 'bed_capacity', 
        'preferred_date', 'interested_package', 'is_contacted', 'created_at'
    ]
    list_filter = ['facility_type', 'interested_package', 'is_contacted', 'created_at']
    search_fields = ['name', 'email', 'phone', 'facility_name', 'message']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Personal Details', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Facility Details', {
            'fields': ('facility_name', 'facility_type', 'bed_capacity')
        }),
        ('Demo Preferences', {
            'fields': ('interested_package', 'preferred_date', 'message')
        }),
        ('Status', {
            'fields': ('is_contacted', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_contacted']
    
    def mark_as_contacted(self, request, queryset):
        queryset.update(is_contacted=True)
    mark_as_contacted.short_description = "Mark selected as contacted"


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    """
    Admin configuration for FAQ model
    """
    list_display = ['question', 'display_order', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['question', 'answer']
    ordering = ['display_order', 'question']
    
    fieldsets = (
        ('FAQ Details', {
            'fields': ('question', 'answer')
        }),
        ('Display Settings', {
            'fields': ('display_order', 'is_active')
        }),
    )


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    """
    Admin configuration for SiteSetting model
    """
    list_display = ['key', 'value', 'description', 'updated_at']
    search_fields = ['key', 'value', 'description']
    ordering = ['key']
    
    fieldsets = (
        ('Setting Details', {
            'fields': ('key', 'value', 'description')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
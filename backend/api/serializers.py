from rest_framework import serializers
from .models import (
    Package, PackageModule, TeamMember, Service, 
    ContactMessage, Appointment, FAQ, SiteSetting
)


class PackageModuleSerializer(serializers.ModelSerializer):
    """
    Serializer for package modules/features
    """
    
    class Meta:
        model = PackageModule
        fields = [
            'id',
            'name',
            'display_order',
        ]


class PackageSerializer(serializers.ModelSerializer):
    """
    Serializer for packages with their modules
    """
    
    modules = PackageModuleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Package
        fields = [
            'id',
            'name',
            'slug',
            'tagline',
            'description',
            'price',
            'price_prefix',
            'monthly_sla',
            'monthly_sla_prefix',
            'is_featured',
            'badge_text',
            'modules_label',
            'display_order',
            'is_active',
            'modules',
        ]
    
    def to_representation(self, instance):
        """
        Customize the output to match the frontend expected format
        """
        data = super().to_representation(instance)
        
        # Transform to match the frontend structure
        return {
            'id': data['id'],
            'name': data['name'],
            'slug': data['slug'],
            'tagline': data['tagline'],
            'description': data['description'],
            'price': data['price'],
            'price_prefix': data['price_prefix'],
            'sla': data['monthly_sla'],
            'sla_prefix': data['monthly_sla_prefix'],
            'featured': data['is_featured'],
            'badge': data['badge_text'],
            'modulesLabel': data['modules_label'],
            'modules': [module['name'] for module in data['modules']],
        }


class TeamMemberSerializer(serializers.ModelSerializer):
    """
    Serializer for team members
    """
    
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = [
            'id',
            'name',
            'role',
            'photo',
            'photo_url',
            'bio',
            'phone',
            'email',
            'linkedin_url',
            'twitter_url',
            'display_order',
            'is_active',
        ]
    
    def get_photo_url(self, obj):
        """
        Get the full URL of the photo if it exists
        """
        if obj.photo and hasattr(obj.photo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None
    
    def to_representation(self, instance):
        """
        Customize the output to match the frontend expected format
        """
        data = super().to_representation(instance)
        
        # Frontend expects 'photo' field with URL
        return {
            'id': data['id'],
            'name': data['name'],
            'role': data['role'],
            'photo': data['photo_url'] or data['photo'],
            'bio': data['bio'],
            'phone': data['phone'],
            'email': data['email'],
            'linkedin_url': data['linkedin_url'],
            'twitter_url': data['twitter_url'],
        }


class ServiceSerializer(serializers.ModelSerializer):
    """
    Serializer for services
    """
    
    class Meta:
        model = Service
        fields = [
            'id',
            'name',
            'slug',
            'short_description',
            'description',
            'icon',
            'image',
            'display_order',
            'is_active',
        ]
    
    def to_representation(self, instance):
        """
        Customize the output to match the frontend expected format
        """
        data = super().to_representation(instance)
        
        # Frontend expects 'short_description'
        return {
            'id': data['id'],
            'name': data['name'],
            'slug': data['slug'],
            'short_description': data['short_description'],
            'description': data['description'],
            'icon': data['icon'],
            'image': data['image'],
        }


class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for contact form submissions
    """
    
    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'subject',
            'message',
            'is_read',
            'created_at',
        ]
        read_only_fields = ['id', 'is_read', 'created_at']


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for demo appointment requests
    """
    
    class Meta:
        model = Appointment
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'facility_name',
            'facility_type',
            'bed_capacity',
            'interested_package',
            'preferred_date',
            'message',
            'is_contacted',
            'notes',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'is_contacted', 'notes', 'created_at', 'updated_at']


class FAQSerializer(serializers.ModelSerializer):
    """
    Serializer for FAQs
    """
    
    class Meta:
        model = FAQ
        fields = [
            'id',
            'question',
            'answer',
            'display_order',
            'is_active',
        ]


class SiteSettingSerializer(serializers.ModelSerializer):
    """
    Serializer for site settings
    """
    
    class Meta:
        model = SiteSetting
        fields = [
            'key',
            'value',
            'description',
        ]
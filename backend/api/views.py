from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import (
    Package, TeamMember, Service, ContactMessage, 
    Appointment, FAQ, SiteSetting
)
from .serializers import (
    PackageSerializer, TeamMemberSerializer, ServiceSerializer,
    ContactMessageSerializer, AppointmentSerializer, 
    FAQSerializer, SiteSettingSerializer
)


# ============================================
# PACKAGES API
# ============================================

class PackageListView(generics.ListAPIView):
    """
    API endpoint to retrieve all active packages
    """
    permission_classes = [AllowAny]
    serializer_class = PackageSerializer
    
    def get_queryset(self):
        return Package.objects.filter(is_active=True)


class PackageDetailView(generics.RetrieveAPIView):
    """
    API endpoint to retrieve a single package by slug
    """
    permission_classes = [AllowAny]
    serializer_class = PackageSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Package.objects.filter(is_active=True)


# ============================================
# TEAM API
# ============================================

class TeamMemberListView(generics.ListAPIView):
    """
    API endpoint to retrieve all active team members
    """
    permission_classes = [AllowAny]
    serializer_class = TeamMemberSerializer
    
    def get_queryset(self):
        return TeamMember.objects.filter(is_active=True)


# ============================================
# SERVICES API
# ============================================

class ServiceListView(generics.ListAPIView):
    """
    API endpoint to retrieve all active services
    """
    permission_classes = [AllowAny]
    serializer_class = ServiceSerializer
    
    def get_queryset(self):
        return Service.objects.filter(is_active=True)


class ServiceDetailView(generics.RetrieveAPIView):
    """
    API endpoint to retrieve a single service by slug
    """
    permission_classes = [AllowAny]
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Service.objects.filter(is_active=True)


# ============================================
# CONTACT API
# ============================================

class ContactMessageCreateView(generics.CreateAPIView):
    """
    API endpoint to submit a contact message
    """
    permission_classes = [AllowAny]
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return success response
        return Response({
            'message': 'Your message has been sent successfully!',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


# ============================================
# APPOINTMENT / BOOK DEMO API
# ============================================

class AppointmentCreateView(generics.CreateAPIView):
    """
    API endpoint to submit a demo appointment request
    """
    permission_classes = [AllowAny]
    serializer_class = AppointmentSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return success response
        return Response({
            'message': 'Your demo request has been submitted successfully! We will contact you shortly.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


# ============================================
# FAQ API
# ============================================

class FAQListView(generics.ListAPIView):
    """
    API endpoint to retrieve all active FAQs
    """
    permission_classes = [AllowAny]
    serializer_class = FAQSerializer
    
    def get_queryset(self):
        return FAQ.objects.filter(is_active=True)


# ============================================
# SITE SETTINGS API
# ============================================

class SiteSettingListView(generics.ListAPIView):
    """
    API endpoint to retrieve all site settings
    """
    permission_classes = [AllowAny]
    serializer_class = SiteSettingSerializer
    
    def get_queryset(self):
        return SiteSetting.objects.all()


class SiteSettingDetailView(generics.RetrieveAPIView):
    """
    API endpoint to retrieve a specific site setting by key
    """
    permission_classes = [AllowAny]
    serializer_class = SiteSettingSerializer
    lookup_field = 'key'
    
    def get_queryset(self):
        return SiteSetting.objects.all()


# ============================================
# SITE SETTINGS - Combined Response
# ============================================

class SiteSettingsView(views.APIView):
    """
    API endpoint to retrieve all site settings as a single object
    """
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        settings = SiteSetting.objects.all()
        data = {}
        for setting in settings:
            # Try to convert to appropriate type
            value = setting.value
            if value.lower() == 'true':
                value = True
            elif value.lower() == 'false':
                value = False
            elif value.isdigit():
                value = int(value)
            data[setting.key] = value
        
        return Response(data)


# ============================================
# ADMIN-ONLY VIEWS (Optional - for managing content)
# ============================================

class PackageAdminListView(generics.ListCreateAPIView):
    """
    Admin endpoint to list and create packages
    """
    permission_classes = [IsAdminUser]
    serializer_class = PackageSerializer
    queryset = Package.objects.all()


class PackageAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to retrieve, update, or delete a package
    """
    permission_classes = [IsAdminUser]
    serializer_class = PackageSerializer
    queryset = Package.objects.all()
    lookup_field = 'slug'


class TeamMemberAdminListView(generics.ListCreateAPIView):
    """
    Admin endpoint to list and create team members
    """
    permission_classes = [IsAdminUser]
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all()


class TeamMemberAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to retrieve, update, or delete a team member
    """
    permission_classes = [IsAdminUser]
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all()


class ServiceAdminListView(generics.ListCreateAPIView):
    """
    Admin endpoint to list and create services
    """
    permission_classes = [IsAdminUser]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


class ServiceAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to retrieve, update, or delete a service
    """
    permission_classes = [IsAdminUser]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    lookup_field = 'slug'
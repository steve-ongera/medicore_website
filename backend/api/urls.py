from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    # ============================================
    # PACKAGES
    # ============================================
    path('packages/', views.PackageListView.as_view(), name='package-list'),
    path('packages/<slug:slug>/', views.PackageDetailView.as_view(), name='package-detail'),
    
    # ============================================
    # TEAM
    # ============================================
    path('team/', views.TeamMemberListView.as_view(), name='team-list'),
    
    # ============================================
    # SERVICES
    # ============================================
    path('services/', views.ServiceListView.as_view(), name='service-list'),
    path('services/<slug:slug>/', views.ServiceDetailView.as_view(), name='service-detail'),
    
    # ============================================
    # CONTACT
    # ============================================
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact-create'),
    
    # ============================================
    # APPOINTMENTS / BOOK DEMO
    # ============================================
    path('appointments/', views.AppointmentCreateView.as_view(), name='appointment-create'),
    
    # ============================================
    # FAQ
    # ============================================
    path('faqs/', views.FAQListView.as_view(), name='faq-list'),
    
    # ============================================
    # SITE SETTINGS
    # ============================================
    path('settings/', views.SiteSettingsView.as_view(), name='site-settings'),
    path('settings/all/', views.SiteSettingListView.as_view(), name='site-setting-list'),
    path('settings/<str:key>/', views.SiteSettingDetailView.as_view(), name='site-setting-detail'),
    
    # ============================================
    # ADMIN ENDPOINTS
    # ============================================
    path('admin/packages/', views.PackageAdminListView.as_view(), name='admin-package-list'),
    path('admin/packages/<slug:slug>/', views.PackageAdminDetailView.as_view(), name='admin-package-detail'),
    path('admin/team/', views.TeamMemberAdminListView.as_view(), name='admin-team-list'),
    path('admin/team/<int:pk>/', views.TeamMemberAdminDetailView.as_view(), name='admin-team-detail'),
    path('admin/services/', views.ServiceAdminListView.as_view(), name='admin-service-list'),
    path('admin/services/<slug:slug>/', views.ServiceAdminDetailView.as_view(), name='admin-service-detail'),
]
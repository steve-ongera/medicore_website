from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ModuleCategoryViewSet,
    ModuleViewSet,
    PackageViewSet,
    TestimonialViewSet,
    FAQViewSet,
    TeamMemberViewSet,
    ContactMessageCreateView,
    DemoRequestCreateView,
    SiteSettingView,
)

router = DefaultRouter()
router.register(r"module-categories", ModuleCategoryViewSet, basename="module-category")
router.register(r"modules", ModuleViewSet, basename="module")
router.register(r"packages", PackageViewSet, basename="package")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")
router.register(r"faqs", FAQViewSet, basename="faq")
router.register(r"team", TeamMemberViewSet, basename="team-member")

urlpatterns = [
    path("", include(router.urls)),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
    path("book-demo/", DemoRequestCreateView.as_view(), name="demo-request-create"),
    path("site-settings/", SiteSettingView.as_view(), name="site-settings"),
]

from rest_framework import viewsets, generics, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    ModuleCategory,
    Module,
    Package,
    Testimonial,
    FAQ,
    TeamMember,
    ContactMessage,
    DemoRequest,
    SiteSetting,
)
from .serializers import (
    ModuleCategorySerializer,
    ModuleSerializer,
    PackageListSerializer,
    PackageDetailSerializer,
    TestimonialSerializer,
    FAQSerializer,
    TeamMemberSerializer,
    ContactMessageSerializer,
    DemoRequestSerializer,
    SiteSettingSerializer,
)


class ModuleCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    list:   GET /api/module-categories/
    detail: GET /api/module-categories/{slug}/
    """
    queryset = ModuleCategory.objects.all().order_by("order", "name")
    serializer_class = ModuleCategorySerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]


class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    list:   GET /api/modules/?category=<slug>&search=sha
    detail: GET /api/modules/{slug}/
    """
    queryset = Module.objects.filter(is_active=True).select_related("category")
    serializer_class = ModuleSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category__slug", "is_core"]
    search_fields = ["name", "short_code", "short_description"]


class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    list:   GET /api/packages/
    detail: GET /api/packages/{slug}/   (full module + feature breakdown)
    """
    queryset = Package.objects.filter(is_active=True).prefetch_related(
        "modules", "features"
    ).order_by("order", "price")
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PackageDetailSerializer
        return PackageListSerializer

    @action(detail=False, methods=["get"], url_path="featured")
    def featured(self, request):
        featured_qs = self.get_queryset().filter(is_featured=True)
        serializer = PackageListSerializer(featured_qs, many=True, context={"request": request})
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    list: GET /api/testimonials/?featured=true
    """
    queryset = Testimonial.objects.all().order_by("order", "-created_at")
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get("featured")
        if featured in ("true", "1"):
            qs = qs.filter(is_featured=True)
        return qs


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """list: GET /api/faqs/"""
    queryset = FAQ.objects.filter(is_active=True).order_by("order")
    serializer_class = FAQSerializer
    permission_classes = [permissions.AllowAny]


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """list: GET /api/team/"""
    queryset = TeamMember.objects.all().order_by("order")
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]


class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/ — public contact form submission."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]


class DemoRequestCreateView(generics.CreateAPIView):
    """POST /api/book-demo/ — public 'Book a Demo' form submission."""
    queryset = DemoRequest.objects.all()
    serializer_class = DemoRequestSerializer
    permission_classes = [permissions.AllowAny]


class SiteSettingView(generics.RetrieveAPIView):
    """GET /api/site-settings/ — global site content (logo, hero, contacts)."""
    serializer_class = SiteSettingSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return SiteSetting.load()

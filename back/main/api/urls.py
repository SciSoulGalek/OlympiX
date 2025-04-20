from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OlympiadViewSet, NewsViewSet

from .views import RegisterView, LoginView

router = DefaultRouter()
router.register(r'olympiads', OlympiadViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
]

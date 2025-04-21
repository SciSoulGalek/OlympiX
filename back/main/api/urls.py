from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OlympiadViewSet, NewsViewSet, create_registration, UserProfileDetail
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView

router = DefaultRouter()
router.register(r'olympiads', OlympiadViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('registrations/', create_registration),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileDetail.as_view(), name='profile-detail')
]

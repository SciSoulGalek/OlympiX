from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OlympiadViewSet, NewsViewSet, user_profile_view
from rest_framework_simplejwt.views import TokenRefreshView

from .views import register_user, LoginView

router = DefaultRouter()
router.register(r'olympiads', OlympiadViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('login/', LoginView.as_view()),
    # path('registrations/', create_registration),
    path('profile/', user_profile_view, name='profile-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]

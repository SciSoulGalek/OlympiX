from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OlympiadViewSet, NewsViewSet, my_olympiads, register_for_olympiad, user_profile_view
from rest_framework_simplejwt.views import TokenRefreshView

from .views import register_user, LoginView, AllRegistrationsView

router = DefaultRouter()
router.register(r'olympiads', OlympiadViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('login/', LoginView.as_view()),
    path('profile/', user_profile_view, name='profile-detail'),
    path('registration/olympiad/<int:olympiad_id>/', register_for_olympiad),
    path('registration_admin/', AllRegistrationsView.as_view()),
    path('my-olympiads/', my_olympiads),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]

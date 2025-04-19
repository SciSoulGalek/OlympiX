from django.urls import path
from .views import news_list, advertisement_list, OlympiadListCreateAPIView, RegistrationCreateAPIView

urlpatterns = [
    path('news/', news_list),
    path('advertisements/', advertisement_list),
    path('olympiads/', OlympiadListCreateAPIView.as_view()),
    path('register/', RegistrationCreateAPIView.as_view()),
]
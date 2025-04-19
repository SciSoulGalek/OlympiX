from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import News, Advertisement, Olympiad, Registration
from .serializers import NewsSerializer, AdvertisementSerializer, OlympiadSerializer, RegistrationSerializer

# FBV - Function Based Views
@api_view(['GET'])
def news_list(request):
    news = News.objects.all()
    serializer = NewsSerializer(news, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def advertisement_list(request):
    ads = Advertisement.objects.all()
    serializer = AdvertisementSerializer(ads, many=True)
    return Response(serializer.data)

# CBV - Class Based Views
class OlympiadListCreateAPIView(generics.ListCreateAPIView):
    queryset = Olympiad.objects.all()
    serializer_class = OlympiadSerializer

class RegistrationCreateAPIView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        olympiad = Olympiad.objects.get(id=serializer.validated_data['olympiad'])
        Registration.objects.create(user=request.user, olympiad=olympiad)
        return Response({'message': 'Registered successfully!'}, status=status.HTTP_201_CREATED)
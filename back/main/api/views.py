from rest_framework import viewsets
from .models import News, Olympiad, Registration
from .serializers import NewsSerializer
from .serializers import OlympiadSerializer
from .serializers import RegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'User already exists'}, status=400)
            user = User.objects.create_user(username=username, password=password)
            token = Token.objects.create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Missing username or password'}, status=400)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=400)
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username
        }
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


#news and list
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer

class OlympiadViewSet(viewsets.ModelViewSet):
    queryset = Olympiad.objects.all()
    serializer_class = OlympiadSerializer

def get_queryset(self):
    return Registration.objects.filter(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_registration(request):
    user = request.user
    olympiad_id = request.data.get('olympiadId')
    answer = request.data.get('answer')

    try:
        olympiad = Olympiad.objects.get(id=olympiad_id)
        registration = Registration.objects.create(
            user=user,
            olympiad=olympiad,
            answer=answer,
            status='pending'
        )
        return Response({'message': 'Registration submitted'}, status=status.HTTP_201_CREATED)
    except Olympiad.DoesNotExist:
        return Response({'error': 'Olympiad not found'}, status=status.HTTP_404_NOT_FOUND)
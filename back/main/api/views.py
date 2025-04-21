from rest_framework import viewsets, generics, permissions
from .models import News, Olympiad, Registration, UserProfile
from .serializers import NewsSerializer
from .serializers import OlympiadSerializer
from .serializers import RegistrationSerializer
from .serializers import UserSerializer
from .serializers import UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_registration(request):
    user = request.user
    olympiad_id = request.data.get('olympiadId')
    answer = request.data.get('answer')

    # Proceed to create registration
    # Example:
    from .models import Registration, Olympiad
    olympiad = Olympiad.objects.get(id=olympiad_id)
    Registration.objects.create(user=user, olympiad=olympiad, answer=answer, status='Pending')

    return Response({'message': 'Registration submitted successfully'})@api_view(['GET'])

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_registrations(request):
    from .models import Registration
    from .serializers import RegistrationSerializer
    from datetime import date

    user = request.user
    today = date.today()

    registrations = Registration.objects.filter(user=user).select_related('olympiad')
    
    pending = []
    registered = []
    completed = []

    for reg in registrations:
        olympiad_date = reg.olympiad.date
        serialized = RegistrationSerializer(reg).data

        if reg.status == 'Pending':
            pending.append(serialized)
        elif reg.status == 'Registered' and olympiad_date >= today:
            registered.append(serialized)
        elif olympiad_date < today:
            completed.append(serialized)

    return Response({
        'pending': pending,
        'registered': registered,
        'completed': completed
    })

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        # Get or create profile if it doesn't exist
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile
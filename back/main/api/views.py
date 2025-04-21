from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import News, Olympiad, OlympiadRegistration, Registration, UserProfile
from .serializers import NewsSerializer
from .serializers import OlympiadSerializer
from .serializers import UserProfileSerializer
from .serializers import OlympiadRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.permissions import IsAdminUser


# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)

    # Create UserProfile right after User
    UserProfile.objects.create(user=user)

    return Response({'message': 'User registered successfully'})


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=400)
    

#news and list
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer

class OlympiadViewSet(viewsets.ModelViewSet):
    queryset = Olympiad.objects.all()
    serializer_class = OlympiadSerializer

#Registrations
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_for_olympiad(request, olympiad_id):
    user = request.user
    answers = request.data.get('answers', '')
    
    olympiad = get_object_or_404(Olympiad, id=olympiad_id)

    registration, created = OlympiadRegistration.objects.get_or_create(
        user=user, olympiad=olympiad,
        defaults={'answers': answers}
    )

    if not created:
        return Response({'detail': 'Already registered.'}, status=400)

    return Response({'detail': 'Registration submitted for review.'})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_pending_registrations(request):
    pending = Registration.objects.filter(status='Pending')
    data = [
        {
            'id': reg.id,
            'username': reg.user.username,
            'olympiad_id': reg.olympiad.id,
            'olympiad_name': reg.olympiad.name,
            'answer': reg.answer,
            'registered_at': reg.registered_at
        }
        for reg in pending
    ]
    return Response(data)


class AllRegistrationsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        registrations = OlympiadRegistration.objects.all()
        serializer = OlympiadRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)


# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def user_registrations(request):
#     from .models import Registration
#     from datetime import date

#     user = request.user
#     today = date.today()

#     registrations = Registration.objects.filter(user=user).select_related('olympiad')
    
#     pending = []
#     registered = []
#     completed = []

#     for reg in registrations:
#         olympiad_date = reg.olympiad.date
#         serialized = RegistrationSerializer(reg).data

#         if reg.status == 'Pending':
#             pending.append(serialized)
#         elif reg.status == 'Registered' and olympiad_date >= today:
#             registered.append(serialized)
#         elif olympiad_date < today:
#             completed.append(serialized)

#     return Response({
#         'pending': pending,
#         'registered': registered,
#         'completed': completed
#     })

from django.http import JsonResponse
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
    olympiad = get_object_or_404(Olympiad, id=olympiad_id)
    answers = request.data.get('answers', '')

    registration, created = OlympiadRegistration.objects.get_or_create(
        user=user, olympiad=olympiad,
        defaults={'answers': answers}
    )

    if not created:
        return Response({'status': 'already_registered'}, status=200)

    return Response({'status': 'registered'}, status=201)


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_olympiads(request):
    user = request.user
    registrations = OlympiadRegistration.objects.filter(user=user).select_related('olympiad')

    data = []
    for reg in registrations:
        data.append({
            'id': reg.id,
            'approved': reg.approved,
            'olympiad': {
                'id': reg.olympiad.id,
                'name': reg.olympiad.name,
                'date': reg.olympiad.date,
                'field': reg.olympiad.field,
                'country': reg.olympiad.country,
            }
        })

    return Response(data)

@permission_classes([IsAuthenticated])
def olympiad_registration_status(request, olympiad_id):
    # Get the current logged-in user
    user = request.user

    # Get the Olympiad object
    olympiad = get_object_or_404(Olympiad, id=olympiad_id)

    # Check if the user is registered for the Olympiad
    try:
        registration = Registration.objects.get(olympiad=olympiad, user=user)
        if registration.status == 'pending':
            return JsonResponse('pending', safe=False)
        elif registration.status == 'approved':
            return JsonResponse('approved', safe=False)
        else:
            return JsonResponse('not_registered', safe=False)
    except Registration.DoesNotExist:
        # If the user has not registered yet
        return JsonResponse('not_registered', safe=False)
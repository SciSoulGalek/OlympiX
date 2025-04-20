from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer
from .models import Olympiad
from .serializers import OlympiadSerializer

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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


#news and list
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer

class OlympiadViewSet(viewsets.ModelViewSet):
    queryset = Olympiad.objects.all()
    serializer_class = OlympiadSerializer

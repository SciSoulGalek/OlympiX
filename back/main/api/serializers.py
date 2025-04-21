from rest_framework import serializers
from .models import News, OlympiadRegistration
from .models import Olympiad
from .models import Registration
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class OlympiadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Olympiad
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    olympiad_id = serializers.IntegerField(source='olympiad.id', read_only=True)
    
    class Meta:
        model = Registration
        fields = ['id', 'username', 'olympiad_id', 'registered_at', 'status', 'answers']


class OlympiadRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    olympiad = serializers.StringRelatedField()

    class Meta:
        model = OlympiadRegistration
        fields = ['id', 'user', 'olympiad', 'answers', 'approved']

from rest_framework import serializers
from .models import News
from .models import Olympiad
# from .models import Registration
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

# class RegistrationSerializer(serializers.ModelSerializer):
#     olympiad_name = serializers.CharField(source='olympiad.name')
#     olympiad_date = serializers.DateField(source='olympiad.date')

#     class Meta:
#         model = Registration
#         fields = ['id', 'status', 'answer', 'olympiad_name', 'olympiad_date']


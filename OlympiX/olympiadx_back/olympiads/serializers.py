from rest_framework import serializers
from .models import News, Advertisement, Olympiad, Registration

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = '__all__'

class OlympiadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Olympiad
        fields = '__all__'

class RegistrationSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    olympiad = serializers.IntegerField()
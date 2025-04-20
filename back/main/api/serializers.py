from rest_framework import serializers
from .models import News
from .models import Olympiad

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class OlympiadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Olympiad
        fields = '__all__'

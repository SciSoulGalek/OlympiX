from django.db import models
from django.contrib.auth.models import User

class News(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='news_images/')

class Advertisement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='ad_images/')

class Olympiad(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    country = models.CharField(max_length=100)
    field = models.CharField(max_length=100)
    date = models.DateField()
    mode = models.CharField(max_length=50, choices=[('Online', 'Online'), ('Offline', 'Offline')])

class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    olympiad = models.ForeignKey(Olympiad, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
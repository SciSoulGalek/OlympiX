from django.db import models
from django.contrib.auth.models import User
from datetime import date

class News(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    full_text = models.TextField(blank=True)
    date = models.DateField(default=date.today)

    def __str__(self):
        return self.title

class Olympiad(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    full_description = models.TextField(null=True, blank=True)
    field = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    date = models.DateField(default=date.today)
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return self.name
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    school = models.CharField(max_length=100, blank=True)
    grade = models.IntegerField(null=True, blank=True)
    olympiad_interests = models.TextField(blank=True)
    # Add any other fields needed for Olympiad registration
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    olympiad = models.ForeignKey(Olympiad, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')  # pending/accepted/rejected
    answers = models.TextField(blank=True)  # store user's answers as JSON or plain text

    def __str__(self):
        return f"{self.user.username} - {self.olympiad.name}"
    
class OlympiadRegistration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    olympiad = models.ForeignKey(Olympiad, on_delete=models.CASCADE)
    answers = models.JSONField()
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.olympiad.name}"
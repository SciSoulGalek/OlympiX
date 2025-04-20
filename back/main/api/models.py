from django.db import models

class News(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    full_text = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Olympiad(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    field = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.name

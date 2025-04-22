from django.contrib import admin
from .models import Olympiad
from .models import OlympiadRegistration

@admin.register(Olympiad)
class OlympiadAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'winner')
    fields = ('name', 'description', 'field', 'country', 'date', 'winner')

@admin.register(OlympiadRegistration)
class OlympiadRegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'olympiad', 'approved')
    list_filter = ('approved',)
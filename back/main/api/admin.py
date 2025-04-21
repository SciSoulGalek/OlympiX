from django.contrib import admin
from .models import OlympiadRegistration

@admin.register(OlympiadRegistration)
class OlympiadRegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'olympiad', 'approved')
    list_filter = ('approved',)
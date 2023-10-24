from django.contrib import admin
from .models import *


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'id')
    list_display_links = ('name', 'id')
    search_fields = ('name', 'user__username')
    list_filter = ('user',)
    list_per_page = 25


@admin.register(ChatItem)
class ChatItemAdmin(admin.ModelAdmin):
    list_display = ('chat', 'input', 'output', 'id')
    list_display_links = ('chat', 'id')
    search_fields = ('chat__name', 'input', 'output')
    list_filter = ('chat',)
    list_per_page = 25

from django.contrib import admin

# Register your models here.
from .models import Category, Post, Comment


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    list_display_links = ('name', 'id')
    search_fields = ('name',)
    list_per_page = 25


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at', 'id')
    list_display_links = ('title', 'id')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_per_page = 25


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at', 'id')
    list_display_links = ('id', 'author')
    list_filter = ('created_at',)
    search_fields = ('content',)
    list_per_page = 25

from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_pro', 'plan_validity')
    list_display_links = ('user',)
    list_filter = ('is_pro', 'plan_validity')
    search_fields = ('user__username', 'user__email')
    list_per_page = 25


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('user', 'order_id', 'payment_id',
                    'status', 'is_paid', 'amount')
    list_display_links = ('user',)
    list_filter = ('status', 'is_paid')
    search_fields = ('user__username', 'user__email', 'order_id', 'payment_id')
    list_per_page = 25

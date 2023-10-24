from django.db import models
from accounts.models import User
from django.utils import timezone
import uuid
from shortuuid.django_fields import ShortUUIDField
# Create your models here.


class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='profile')
    is_pro = models.BooleanField(default=False)
    plan_validity = models.DateField(
        default=timezone.now() + timezone.timedelta(days=3))

    def __str__(self):
        return f'Profile for {self.user.email}'


class Purchase(models.Model):
    id = ShortUUIDField(
        length=10,
        max_length=50,
        prefix="cl_",
        alphabet="0123456789",
        primary_key=True,
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="purchase")
    order_id = models.CharField(max_length=255, blank=True, null=True)
    payment_id = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=100, choices=(
        ('pending', 'Pending'), ('confirmed', 'Confirmed'), ('failed', 'Failed'), ('cancelled', 'Cancelled')), default='pending')
    is_paid = models.BooleanField(default=False)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'Purchase for {self.user.email}'

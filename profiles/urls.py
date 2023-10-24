from django.urls import path
from .views import *


urlpatterns = [
    path("payment/", CheckoutView.as_view(), name="payment"),
    path("payment/confirm/", PaymentConfirmView.as_view(), name="payment_confirm"),
    path("payment/cancel/", RefundView.as_view(), name="payment_refund"),
    path("contact/", ContactAPIView.as_view(), name="contact")
]

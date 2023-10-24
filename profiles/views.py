from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Profile, Purchase
from .serializers import ProfileSerializer, OrderSerializer
import razorpay
import requests
from decouple import config
from bs4 import BeautifulSoup
from django.core.mail import send_mail
from django.conf import settings

RZP_KEY = config("RZP_KEY")
RZP_SECRET = config("RZP_SECRET")
client = razorpay.Client(auth=(RZP_KEY, RZP_SECRET))


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            url = f"https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=INR"
            response = requests.get(
                url, headers={"Access-Control-Allow-Origin": "*"})
            soup = BeautifulSoup(response.text, 'html.parser')
            html_text = soup.find(class_="iGrAod").get_text()
            exchange_rate = float(html_text.split()[0])
            amount = 5 * exchange_rate
            payment = client.order.create({"amount": int(amount * 100),
                                           "currency": "INR",
                                           "payment_capture": "1"})

            purchase = Purchase.objects.create(
                user=request.user, order_id=payment['id'], amount=amount)

            serializer = OrderSerializer(purchase)

            data = {
                "payment": payment,
                "order": serializer.data
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PaymentConfirmView(APIView):

    def post(self, request):
        try:
            res = request.data['response']
            global ord_id
            global raz_pay_id
            global raz_signature

            for key in res.keys():
                if key == 'razorpay_order_id':
                    ord_id = res[key]
                elif key == 'razorpay_payment_id':
                    raz_pay_id = res[key]
                elif key == 'razorpay_signature':
                    raz_signature = res[key]

            purchase = Purchase.objects.get(order_id=ord_id)
            data = {
                'razorpay_order_id': ord_id,
                'razorpay_payment_id': raz_pay_id,
                'razorpay_signature': raz_signature
            }

            if purchase.status == 'confirmed':
                return Response({'message': 'your booking has already been confirmed.'}, status=status.HTTP_200_OK)

            def verify_signature(data):
                return client.utility.verify_payment_signature(data)

            if not verify_signature(data):
                purchase.status = 'failed'
                purchase.save()
                return Response({'error': 'payment failed'}, status=status.HTTP_400_BAD_REQUEST)

            purchase.status = 'confirmed'
            purchase.is_paid = True
            purchase.payment_id = raz_pay_id
            purchase.save()
            return Response({'message': 'your booking has been confirmed.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RefundView(APIView):

    def get(self, request, pk):
        try:
            purchase = Purchase.objects.get(id=pk)
            if purchase.status == 'cancelled':
                return Response({'message': 'order is already cancelled'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                refund_amount = int(purchase.amount * 100)
                refund_data = {
                    'amount': refund_amount,
                    'currency': 'INR',
                    'speed': 'normal'
                }
                refund = client.payment.refund(
                    purchase.payment_id, refund_data)
                if refund.get('error_code') is not None:
                    return Response({'error': 'Refund not successful'}, status=status.HTTP_400_BAD_REQUEST)
                purchase.status = 'cancelled'
                purchase.save()
                return Response({'message': 'order cancelled and refund initiated'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Purchase.DoesNotExist:
            return Response({'error': 'Order not found.'}, status=status.HTTP_400_BAD_REQUEST)


class ContactAPIView(APIView):
    def post(self, request, format=None):
        try:
            name = request.data.get('name')
            email = request.data.get('email')
            phone_number = request.data.get('phone_number')
            message = request.data.get('message')

            send_mail(
                'Contact Form Submission',
                f'You have a new contact form submission from:\n\nName: {name}\nEmail: {email}\nPhone Number: {phone_number}\n\nMessage: {message}',
                settings.EMAIL_HOST_USER,
                [config('EMAIL_RECEPIENT_USER')],
                fail_silently=False,
            )

            return Response({'message': 'your query has been sent'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

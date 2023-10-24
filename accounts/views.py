from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from shortuuid import ShortUUID
from .helper import send_verification_email, send_password_reset_email
from decouple import config
import jwt
from rest_framework_simplejwt.tokens import RefreshToken


class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=serializer.data['email'])
            code = ShortUUID(alphabet='0123456789').random(length=6)
            user.verification_code = code
            user.save()
            email_sent = send_verification_email(
                user.email, user.verification_code)
            if not email_sent:
                return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'success': 'an verification email has been sent to your email address'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailVerificationView(APIView):
    def get(self, request, code):
        try:
            user = User.objects.get(verification_code=code)
        except User.DoesNotExist:
            return Response({'error': 'verification code is invalid or expired'}, status=status.HTTP_404_NOT_FOUND)
        user.is_verified = True
        user.verification_code = ""
        user.save()
        return Response({'success': 'User has been verified'}, status=status.HTTP_200_OK)


class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        token = str(uuid.uuid4())
        user.pwd_reset_token = token
        user.save()
        url = f"{config('FRONTEND_URL')}/password-reset/{token}"
        email_sent = send_password_reset_email(user.email, url)
        if not email_sent:
            return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'An email has been sent to your account'}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    def post(self, request, token):
        try:
            user = User.objects.get(pwd_reset_token=token)
        except User.DoesNotExist:
            return Response({'error': 'Token is invalid or expired'}, status=status.HTTP_404_NOT_FOUND)

        password = request.data.get('password')
        password2 = request.data.get('password2')

        if password != password2:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()
        return Response({'success': 'Your password has been changed'}, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = User.objects.get(email=request.user)
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not user.check_password(current_password):
            return Response({'error': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)
        if new_password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'success': 'Your password has been changed'}, status=status.HTTP_200_OK)


class GoogleLogin(APIView):
    def post(self, request):
        token = request.data.get('token')
        try:
            decoded_token = jwt.decode(
                token, options={"verify_signature": False})

            name = decoded_token['name']
            email = decoded_token['email']
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
        except:
            user = User.objects.create(
                email=email, name=name, is_verified=True)
        token = RefreshToken.for_user(user)
        return Response({'token': str(token.access_token), 'email': user.email}, status=status.HTTP_200_OK)

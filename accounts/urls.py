from django.urls import path
from .views import *
from .token import MyTokenObtainPairView

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("email-verify/<code>/", EmailVerificationView.as_view(),
         name="email_verification"),
    path("login/", MyTokenObtainPairView.as_view(), name="login"),
    path("login/google/", GoogleLogin.as_view(), name="google_login"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path("reset-password/<token>/",
         ResetPasswordView.as_view(), name="reset_password"),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
]

from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string


def send_verification_email(email, code):
    try:
        msg_plain = render_to_string('email-verification.txt', {'code': code})
        msg_html = render_to_string('email-verification.html', {'code': code})
        subject = "Email Verification Code: Please Confirm Your Email"
        send_mail(subject, msg_plain, settings.EMAIL_HOST_USER,
                  [email], html_message=msg_html)
        return True
    except Exception as e:
        return False


def send_password_reset_email(email, url):
    try:
        msg_plain = render_to_string('password-reset.txt', {'url': url})
        msg_html = render_to_string('password-reset.html', {'url': url})
        subject = "Password Reset Link"
        send_mail(subject, msg_plain, settings.EMAIL_HOST_USER,
                  [email], html_message=msg_html)
        return True
    except Exception as e:
        return False

from django.urls import path
from .views import create_message


urlpatterns = [
    path('create-message', create_message),
]

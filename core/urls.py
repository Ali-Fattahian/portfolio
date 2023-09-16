from django.urls import path
from django.views.generic import TemplateView
from .views import CreateMessageView


urlpatterns = [
    path('create-message', CreateMessageView.as_view()),
    path('', TemplateView.as_view(template_name='core/index.html'))
]

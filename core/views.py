from rest_framework.generics import CreateAPIView
from .models import Message
from .serializers import MessageSerializer


class CreateMessageView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

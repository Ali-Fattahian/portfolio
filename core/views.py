from django.http import HttpResponse
from .models import Message
from threading import Thread


def new_message(author, email, subject, content):
    Message.objects.create(author=author, email=email,
                           subject=subject, content=content)


def create_message(request):
    if request.method == 'POST':
        author = request.POST.get('author')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        content = request.POST.get('message')

        if author and email and subject and content:
            thread = Thread(target=new_message)
            thread.start()
            return HttpResponse('Thanks for sending the message,\
                                 i will try to send you a reponse\
                                 email as soon as i can.', status=201)
        return HttpResponse('Please fill out all the fields.',
                             status=400)
    
    return HttpResponse('You can only send a post request\
                         to this route', status=405)

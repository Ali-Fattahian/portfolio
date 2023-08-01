from django.db import models


class Message(models.Model):
    author = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return f'{self.email}: {self.subject}'

from django.db import models

class Algorithm(models.Model):
    name = models.CharField(max_length=20)
    desctiption = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return self.name
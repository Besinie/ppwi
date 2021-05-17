from django.shortcuts import render
from .models import Algorithm


def home(request):

    algorithm = Algorithm.objects.all()

    return render(request, 'base/index.html', {'algorithm': algorithm})

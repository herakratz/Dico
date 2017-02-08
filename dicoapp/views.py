from django.shortcuts import render


def index(request):
    return render(request, 'dicoapp/index.html')


def landing(request):
    return render(request, 'dicoapp/landing.html')

def test(request):
    return render(request, 'dicoapp/test.html')

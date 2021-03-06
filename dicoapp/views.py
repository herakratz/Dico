# -*- coding: utf-8 -*-
from django.template import loader, Context
from django.template import RequestContext
from django.shortcuts import render
from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.generic import FormView
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMessage

from forms import ContactForm
from forms import WorkWithUsForm

def index(request):
	return render(request, 'dicoapp/index.html')

def landing(request):
    return render(request, 'dicoapp/landing.html')

def test(request):
    return render(request, 'dicoapp/test.html')

#vista para el formulario de Contactenos
class FormContactView(FormView):
    form_class = ContactForm
    success_url = '/dicoapp/p'
    template_name = 'dicoapp/contact_form.html'

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        mensaje = "{nombre} / {email} / {celular} dice: ".format(
            nombre=form.cleaned_data.get('nombre'),
            celular=form.cleaned_data.get('celular'),
            email=form.cleaned_data.get('email'))
        mensaje += "\n\n{0}".format(form.cleaned_data.get('mensaje'))
        
        print (mensaje)

        send_mail(
            subject=form.asunto,
            message=mensaje,
            from_email=form.cleaned_data.get('email'),
            recipient_list=['correodicosas@gmail.com'],
        )

        return super(FormContactView, self).form_valid(form)

#vista para el formulario de TRaba con nostros
class FormWorkWithUsView(FormView):
    form_class = WorkWithUsForm
    success_url = '/dicoapp/p'
    template_name = 'dicoapp/workwithus_form.html'

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        mensaje = "{nombre} / {celular} dice: ".format(
            nombre=form.cleaned_data.get('nombre'),
            celular=form.cleaned_data.get('celular'))
        mensaje += "\n\n{0}".format(form.cleaned_data.get('habilidades'))
        
        archivo = form.cleaned_data.get('archivo')
        print (mensaje)
        print (settings.PROJECT_ROOT)
        
        email = EmailMessage(
            subject=form.asunto, 
            body=mensaje, 
            to=['correodicosas@gmail.com'])
        if form.cleaned_data['archivo']:
             file = form.cleaned_data['archivo']
             if hasattr(file, 'path'):
                 email.attach_file(file.path)
             else:
                 email.attach(file.name, file.read())
        email.send(fail_silently=not(settings.DEBUG))
        
        return super(FormWorkWithUsView, self).form_valid(form)
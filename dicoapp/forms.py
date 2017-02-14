# -*- coding: utf-8 -*-
from django import forms

#creacion de clase del formulario
class ContactForm(forms.Form):
	asunto = 'Mensaje de contacto desde la página DICO'
	nombre = forms.CharField(label= None, max_length = 100, widget=forms.TextInput(attrs={'placeholder': 'Nombre Completo'}))
	celular = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Celular'}))
	email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Email'}))
	mensaje = forms.CharField(widget=forms.Textarea)

from django.conf.urls import url, include

from . import views


urlpatterns = [
    url(r'^$', views.landing, name='landing'),
    url(r'^p/', views.index, name='index'),
	url(r'^t/', views.test, name='test'),
	url(r'contactenos', views.FormContactView.as_view(), name='contact'),
]
from django.urls import path
from . import views
urlpatterns = [
    path('', views.MainView.as_view()),
    path('order/', views.OrderView.as_view()),

]

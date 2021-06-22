from django.shortcuts import render, HttpResponse
from . import models
import json
from .forms import QuestionForm, OrderForm
from django.views.generic import View
from .models import Customer, Order
# Create your views here.


class MainView(View):

    def get(self, request, *args, **kwargs):
        form = QuestionForm(request.POST)
        context = {'form': form}
        return render(request, 'index.html', context)

    def post(self, request, *args, **kwargs):
        form = QuestionForm(request.POST or None)
        if form.is_valid():
            email = form.cleaned_data['email']
            name = form.cleaned_data['name']
            question = form.cleaned_data['question']
            form.save()
            form = QuestionForm()
        return render(request, 'index.html', {'form': form})


class OrderView(View):

    def get(self, request, *args, **kwargs):
        form = OrderForm(request.POST)
        context = {'form': form}
        return render(request, 'order.html', context)

    def post(self, request, *args, **kwargs):
        form = OrderForm(request.POST or None)
        if form.is_valid():
            user = Customer.objects.filter(phone_number=form.cleaned_data['phone_number'])
            if user:
                user = Customer.objects.get(phone_number=form.cleaned_data['phone_number'])
                Order.objects.create(user_id=user.id, number="#1", description="pass")

            else:
                Customer.objects.create(name=form.cleaned_data['name'], email=form.cleaned_data['email'],
                                        phone_number=form.cleaned_data['phone_number'])
                user = Customer.objects.get(phone_number=form.cleaned_data['phone_number'])
                Order.objects.create(user_id=user.id, number="#1", description="pass")

        return render(request, 'order.html', {'form': form})

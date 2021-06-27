from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
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


class ProductsView(View):
    products = models.Product.objects.all()

    def get(self, request):
        to_send = []
        for product in self.products:
            to_send.append(json.loads(product.description))
        to_send = json.dumps(to_send, ensure_ascii=False)
        return HttpResponse(to_send, content_type="application/json")


class SearchView(View):
    products = models.Product.objects.all()

    def get(self, request):
        return render(request, 'products.html')

    def post(self, request):
        to_send = []
        to_find = request.POST['search']
        for product in self.products:
            if to_find.lower() in product.name.lower():
                to_send.append(json.loads(product.description))
        to_send = json.dumps(to_send, ensure_ascii=False)
        return HttpResponse(to_send, content_type="application/json")

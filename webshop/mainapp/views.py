from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from . import models
import json
from .forms import QuestionForm, OrderForm
from django.views.generic import View
from .models import Order
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


class MainView(View):

    def get(self, request, *args, **kwargs):
        form = QuestionForm(request.POST)
        context = {'form': form}
        return render(request, 'index.html', context)

    def post(self, request, *args, **kwargs):
        form = QuestionForm(request.POST or None)
        if form.is_valid():
            form.save()
            form = QuestionForm()
        return render(request, 'index.html', {'form': form})


@csrf_exempt
def order(request):

    if request.method == 'POST':
        context = json.loads(request.body.decode('utf-8'))
        Order.objects.create(number='pass', name=context['name'], email=context['email'],
                             phone_number=context['phone'], description=context['products'])
    return HttpResponse()


class ProductsView(View):
    products = models.Product.objects.all()

    def get(self, request):
        to_send = []
        for product in self.products:
            to_send.append(json.loads(product.description))
        to_send = json.dumps(to_send, ensure_ascii=False)
        return HttpResponse(to_send, content_type="application/json")


@csrf_exempt
def search(request):
    products = models.Product.objects.all()

    if request.method == 'POST':
        to_send = []
        context = json.loads(request.body.decode('utf-8'))
        to_find = context['search']
        for product in products:
            if to_find.lower() in product.name.lower():
                to_send.append(json.loads(product.description))
        to_send = json.dumps(to_send, ensure_ascii=False)
        return HttpResponse(to_send, content_type="application/json")
    return HttpResponse()


@csrf_exempt
def info(request):
    products = models.Product.objects.all()
    if request.method == 'POST':
        context = json.loads(request.body.decode('utf-8'))
        to_find = context['id']
        for product in products:
            description = json.loads(product.description)
            if description['id'] == to_find:
                to_send = json.dumps(description, ensure_ascii=False)
                return HttpResponse(to_send, content_type="application/json")
    return HttpResponse()

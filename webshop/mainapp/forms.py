import django.forms as forms
from . import models
from phonenumber_field.formfields import PhoneNumberField
from phonenumber_field.widgets import PhoneNumberInternationalFallbackWidget


class QuestionForm(forms.ModelForm):

    email = forms.EmailField(label='Email', widget=forms.EmailInput())
    name = forms.CharField(label='Ваше Имя', widget=forms.TextInput())
    question = forms.CharField(label='Ваш вопрос', widget=forms.Textarea())

    class Meta:
        model = models.Question
        fields = ['email', 'name', 'question']


class OrderForm(forms.ModelForm):

    name = forms.CharField(label='Имя', widget=forms.TextInput())
    email = forms.EmailField(label='Email', widget=forms.EmailInput())
    phone_number = PhoneNumberField(label='Телефон',
                                    widget=PhoneNumberInternationalFallbackWidget())

    class Meta:
        model = models.Order
        fields = ['name', 'email', 'phone_number']

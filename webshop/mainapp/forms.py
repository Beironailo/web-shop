import django.forms as forms
from . import models
from phonenumber_field.formfields import PhoneNumberField
from phonenumber_field.widgets import PhoneNumberInternationalFallbackWidget


class QuestionForm(forms.ModelForm):

    email = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'type': "text", 'name': "email",
                                                                           'placeholder': "Ваш Email",
                                                                           'class': "form-input"}))
    name = forms.CharField(label='Ваше Имя', widget=forms.TextInput(attrs={'type': "text", 'name': "name",
                                                                           'placeholder': "Ваше Имя",
                                                                           'class': "form-input"}))
    question = forms.CharField(label='Ваш вопрос',
                               widget=forms.Textarea({'type': "text", 'name': "text",
                                                       'placeholder': "Вы не нашли то, что нужно?",
                                                       'class': "form-input",
                                                       'style': "height:120px;"}))

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

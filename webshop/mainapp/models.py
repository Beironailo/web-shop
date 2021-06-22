from django.db import models
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


class Product(models.Model):
    """Товары"""
    name = models.CharField(max_length=255, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    number = models.CharField(max_length=255, blank=True, verbose_name="Уникальный номер")
    image = models.URLField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class Customer(models.Model):
    """Пользователи"""
    name = models.CharField(max_length=255, verbose_name="Имя")
    phone_number = PhoneNumberField(unique=True, verbose_name="Телефон")
    email = models.EmailField(verbose_name="E-mail")

    def __str__(self):
        return str(self.name + " | " + str(self.phone_number))

    def get_context(self):
        return str(self.name)

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Question(models.Model):
    """Вопросы"""
    email = models.EmailField(verbose_name="E-mail", default='example@example.com')
    name = models.CharField(max_length=100, verbose_name="От кого", default='guest')
    question = models.TextField(verbose_name="Текст")
    time = models.DateTimeField(verbose_name="Время", default=timezone.now)

    def __str__(self):
        return str(self.name + " | " + self.email + " | " + str(self.time))

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"


class Order(models.Model):
    """Заказы"""
    number = models.CharField(max_length=255, verbose_name="Номер заказа")
    user = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name="Заказчик")
    description = models.TextField(verbose_name="Описание заказа")
    status = models.BooleanField(default=False, verbose_name="Статус заказа")
    time = models.DateTimeField(verbose_name="Время заказа", default=timezone.now)

    def __str__(self):
        return str(self.number + "(" + self.user.get_context() + ") | " + str(self.time))

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

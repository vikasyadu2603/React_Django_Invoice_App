from django.contrib import admin
from .models import InvoiceModel


# Register your models here.
class InvoiceAdmin(admin.ModelAdmin):
    pass
admin.site.register(InvoiceModel,InvoiceAdmin)
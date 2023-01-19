from rest_framework import serializers
from invoiceApp.models import InvoiceModel


class InvoiceSerializer(serializers.ModelSerializer):  #get product list all object
      class Meta:
        model = InvoiceModel
        fields = '__all__'
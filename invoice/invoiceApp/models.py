from django.db import models

# Create your models here.
class InvoiceModel(models.Model):
    id = models.AutoField(primary_key=True)
    customer_name=models.CharField(max_length=255)
    product_name=models.CharField(max_length=255)
    product_price=models.CharField(max_length=50)



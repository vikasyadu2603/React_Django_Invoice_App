from django.shortcuts import render
from .models import InvoiceModel
from rest_framework.response import Response
from rest_framework.views import APIView
from  .serializers import  InvoiceSerializer

# Create your views here.


class InvoiceAPI(APIView):      
    def get(self,request,pk=None,format=None):
        
            id=pk
            if id is not None:
                emp=InvoiceModel.objects.get(id=id)
                serializer=InvoiceSerializer(emp)
                return Response(serializer.data) 
            product_data=InvoiceModel.objects.all()
            serializer=InvoiceSerializer(product_data, many=True)
            return Response(serializer.data) 
    
    def post(self,request,format=None):
        serial=InvoiceSerializer(data=request.data)
        if serial.is_valid():
            serial.save()
            return Response({'msg':'data posted'})
        return Response(serial.errors)    
   
    
    def put(self,request,pk,format=None):
        import pdb
        pdb.set_trace()
        id=pk
        var=InvoiceModel.objects.get(pk=id)
        serializer=InvoiceSerializer(var,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'data put apply'})  
        return Response(serializer.errors)

    def delete(self,request,pk,format=None):
        id=pk
        var=InvoiceModel.objects.get(pk=id)
        var.delete()
        return Response({'msg':'data deleted'})



class InvoiceDeatisByName(APIView):  
    def post(self,request,pk=None,format=None):
            if request.method=='POST':
                name = request.data.get('customer_name')
                stu=InvoiceModel.objects.filter(customer_name=name)
                serializer=InvoiceSerializer(stu,many=True)
                return Response(serializer.data) 

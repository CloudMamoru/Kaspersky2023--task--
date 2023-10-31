from django.shortcuts import render
from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer


class EmployeesAPIList(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

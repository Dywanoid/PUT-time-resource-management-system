from app import app
from decimal import *

VAT_RATE = Decimal('0.23')


@app.template_filter('hours')
def hours(duration):
    return duration.seconds / 60 / 60


@app.template_filter('rounded_decimal')
def rounded_decimal(number):
    return Decimal(number).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)


@app.template_filter('vat_amount')
def vat_amount(net_amount):
    return VAT_RATE * net_amount


@app.template_filter('gross_amount')
def gross_amount(net_amount):
    return VAT_RATE * net_amount + net_amount

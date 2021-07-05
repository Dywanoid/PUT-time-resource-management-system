from app import app
from decimal import *


@app.template_filter('hours')
def hours(duration):
    return duration.total_seconds() / 60 / 60


@app.template_filter('rounded_decimal')
def rounded_decimal(number):
    return Decimal(number).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)


@app.template_filter('rounded_integer')
def rounded_integer(number):
    return Decimal(number).quantize(Decimal('1.'), rounding=ROUND_HALF_UP)


@app.template_filter('currency')
def currency(currency):
    return currency.name


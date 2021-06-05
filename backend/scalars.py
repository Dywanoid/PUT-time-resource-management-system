from datetime import datetime, date, timedelta
from ariadne import ScalarType

datetime_scalar = ScalarType("DateTime")
date_scalar = ScalarType("Date")
interval_scalar = ScalarType("Interval")


@datetime_scalar.serializer
def serialize_datetime(value):
    return value.isoformat()


@date_scalar.serializer
def serialize_date(value):
    return value.isoformat()


@date_scalar.value_parser
def deserialize_date(value):
    return date.fromisoformat(value)


@interval_scalar.serializer
def serialize_interval(value):
    return value.total_seconds() // 60


@interval_scalar.value_parser
def deserialize_interval(value):
    return timedelta(minutes=value)

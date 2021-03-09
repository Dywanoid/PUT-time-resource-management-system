FROM python:3.8-alpine

WORKDIR /app
COPY ./requirements.txt .

RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

COPY . .
RUN chmod +x main.py

CMD ["/bin/sh", "-c", "/app/main.py db upgrade && /app/main.py runserver"]

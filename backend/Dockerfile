FROM python:3.8-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc g++ musl-dev postgresql-dev

COPY ./requirements.txt .

RUN python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

COPY . .

CMD ["/bin/sh", "-c", "/app/entrypoint.sh"]

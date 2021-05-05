# Stage 0, builds frontend
FROM node:15.13-alpine AS frontend-builder

WORKDIR /app/frontend

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install
COPY ./frontend .
RUN npm run build

# Stage 1, builds and runs backend
FROM python:3.8-alpine

WORKDIR /app/backend

RUN apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc g++ musl-dev postgresql-dev

COPY ./backend/requirements.txt .

RUN python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

COPY --from=frontend-builder /app/frontend/build /app/frontend/build

ENV FLASK_APP=main.py

COPY ./backend .

CMD ["/bin/sh", "-c", "/app/backend/entrypoint.sh"]

FROM python:3.13-slim-trixie

WORKDIR /

COPY ./app /app
COPY ./.env /.env
COPY ./requirements.txt /requirements.txt

RUN pip install -r requirements.txt
ENTRYPOINT ["fastapi", "run"]

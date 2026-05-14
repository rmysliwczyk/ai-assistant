FROM python:3.13-slim-trixie

WORKDIR /

COPY . .

RUN pip install -r requirements.txt
ENTRYPOINT ["fastmcp", "run", "-t", "http", "--host", "0.0.0.0", "--port", "9000", "mcp_server.py:mcp_server"]

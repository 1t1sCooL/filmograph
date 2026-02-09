FROM python:3.13-slim

WORKDIR /app

COPY be/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY be/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

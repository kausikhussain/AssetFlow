# Use Python 3.12 slim as the base image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY . .

# Expose port 8000 for FastAPI
EXPOSE 8000

# Start the application using uvicorn with auto-reload enabled
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

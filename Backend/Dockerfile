# Use the official Python image from the Docker Hub
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port your backend application runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]

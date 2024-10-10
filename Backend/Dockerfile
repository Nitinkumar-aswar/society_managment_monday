# Use the official Python image from the Docker Hub
FROM python:3.11 AS backend

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY Backend/requirements.txt ./

# Upgrade pip and install the backend dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code to the working directory
COPY Backend/ .  # Make sure only backend files are copied

# Expose the port your backend application runs on
EXPOSE 5000

# Command to run the backend application
CMD ["python", "app.py"]

# If you have frontend dependencies, add the following section

# Install Node.js and npm for frontend
FROM node:16 AS frontend

# Set the working directory for frontend
COPY Frontend/myapp/. .

# Copy frontend package files and install dependencies
COPY Frontend/myapp/package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY Frontend/myapp/ .  # Ensure only frontend files are copied

# Command to run the frontend application (if needed)
# CMD ["npm", "start"]  # Uncomment if you want to run the frontend

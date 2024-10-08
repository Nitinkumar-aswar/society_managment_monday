# Use the official Node.js image
FROM node:20.17.0

# Set the working directory
WORKDIR /Frontend/myapp

# Copy package.json and package-lock.json (if it exists)
COPY Backend/package.json

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on (if applicable)
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]

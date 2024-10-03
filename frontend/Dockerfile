# Use a lightweight Node.js image as base
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose port 3000 (assuming your frontend application runs on port 3000)
EXPOSE 5173

# Command to run the application
CMD ["npm", "run" , "dev"]

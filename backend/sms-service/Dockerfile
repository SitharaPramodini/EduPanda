FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm install

# Bundle app source
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
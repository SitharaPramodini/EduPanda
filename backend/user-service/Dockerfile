FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 5002
EXPOSE 5002

# Command to run the application
CMD ["npm", "start"]
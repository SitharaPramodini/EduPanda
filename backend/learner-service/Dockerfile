FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 5050
EXPOSE 5050

# Command to run the application
CMD ["npm", "start"]
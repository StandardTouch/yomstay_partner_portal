# Base image with Node.js 24
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the Vite app
RUN npm run build

# Expose the default Vite preview port
EXPOSE 4173

# Start the app with Vite preview
CMD ["npm", "run", "preview"]

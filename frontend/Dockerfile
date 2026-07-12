# Use Node 22 LTS as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend source code
COPY . .

# Expose port 5173 for the Vite dev server
EXPOSE 5173

# Start the Vite development server with host configuration for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

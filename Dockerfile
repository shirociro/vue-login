# Stage 1: Build the Vue app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the app (production)
RUN npm run build

# Stage 2: Serve with a lightweight web server
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
# Use Nginx to serve static files
FROM nginx:alpine

# Set working directory inside container
WORKDIR /usr/share/nginx/html

# Copy all frontend files into Nginx folder
COPY . .

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
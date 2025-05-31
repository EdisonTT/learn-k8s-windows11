# Use nginx as the base image
FROM nginx:alpine

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your custom HTML to the nginx public directory
COPY index.html /usr/share/nginx/html

# Expose port 80
EXPOSE 80

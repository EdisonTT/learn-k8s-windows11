# Base image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy only what's needed to run
COPY dist ./dist
COPY package*.json ./
RUN npm install --omit=dev

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]

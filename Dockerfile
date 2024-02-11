# Use the official Node.js image with Alpine Linux as a base image.

FROM node:18-alpine

# Set the working directory inside the container.
# WORKDIR /usr/src/app
WORKDIR /usr/seed/auth

# Copy package files and install dependencies.
COPY package*.json ./

# Switch to the non-root user.
# USER nodeuser

# Copy the rest of the source files into the image.
COPY ./ ./


RUN npm install


# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "start"]

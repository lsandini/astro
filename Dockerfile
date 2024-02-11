# Use the official Node.js image with Alpine Linux as a base image.

ARG NODE_VERSION=16.18.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

# Create a non-root user to run the application.
RUN adduser -D -u 1001 nodeuser

# Set the working directory inside the container.
# WORKDIR /usr/src/app
WORKDIR /usr/seed/auth

# Copy package files and install dependencies.
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Switch to the non-root user.
USER nodeuser

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001



# Run the application.
CMD ["npm", "start"]

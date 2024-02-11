# Use the official Node.js image with Alpine Linux as a base image.

FROM alpine:3.14

# Use production node environment by default.
ENV NODE_VERSION 18.19.0

# Create a non-root user to run the application.
RUN apk add --update nodejs npm
RUN adduser -D -u 1001 nodeuser

# Set the working directory inside the container.
# WORKDIR /usr/src/app
WORKDIR /usr/seed/auth

# Copy package files and install dependencies.
COPY package*.json ./
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Switch to the non-root user.
# USER nodeuser

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001



# Run the application.
CMD ["npm", "start"]

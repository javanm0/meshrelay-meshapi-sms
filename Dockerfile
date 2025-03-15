# Stage 1: Build
FROM node:18-slim AS build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies for building native modules
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --production

# Copy local code to the container image.
COPY . .

# Stage 2: Runtime
FROM node:18-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Install only production dependencies
RUN npm install --production

# Run the web service on container startup.
CMD [ "npm", "start" ]

# Expose the port the app runs on
EXPOSE 3000
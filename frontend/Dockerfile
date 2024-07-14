# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.15.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app


################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

# Copy the replacement script and .env template
COPY replace-env.sh ./
COPY .env.template ./

# Set build arguments
ARG HYT_POC_BACKEND_HOST

# Replace environment variables and build the app
ENV HYT_POC_BACKEND_HOST=$HYT_POC_BACKEND_HOST

# Replace environment variables and build the app
RUN chmod +x replace-env.sh && ./replace-env.sh

# Build the app
RUN npm run build


################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as development

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
#USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build app/src ./src

#USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm start



################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as build_prod_image

# Install envsubst
RUN apk add --no-cache gettext

# Set working directory for all build stages.
WORKDIR /app

# Copy the replacement script and .env template
COPY replace-env.sh ./
COPY .env.template ./

# Copy package.json and install dependencies
COPY package.json .

# Install all the packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Set build arguments
ARG HYT_POC_BACKEND_HOST

# Replace environment variables and build the app
ENV HYT_POC_BACKEND_HOST=$HYT_POC_BACKEND_HOST

# Replace environment variables and build the app
RUN chmod +x replace-env.sh
RUN ./replace-env.sh
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM node:${NODE_VERSION}-alpine   as  prod
# Set working directory for all build stages.
ENV NODE_ENV production

WORKDIR /app

# take local folder directory /app/build which is create in this command npm run build above  and copy to nginx folder /usr/share/nginx/html
# the default folder for nginx is /usr/share/nginx/html because nginx require the static files to run the app. when i try to npm run build it create stic files in build folder and we copy that build folder to nginx folder
COPY --from=build_prod_image /app/build /app/build

COPY package.json .

RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["serve","-s","build"]
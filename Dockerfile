# Step 1: Build the React frontend
FROM node:16 AS build-frontend
WORKDIR /frontend

# Copy only the package.json and package-lock.json to install dependencies first
COPY react-app/package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY react-app ./react-app

# Build the React app (output will go to /frontend/build)
RUN npm run build

# Step 2: Set up the Node.js backend
FROM node:16 AS build-backend
WORKDIR /backend

# Copy only the package.json and package-lock.json to install dependencies first
COPY app/package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY app ./app

# Step 3: Serve the backend (Express server) and frontend
FROM node:16
WORKDIR /app

# Copy the built frontend files from the build-frontend stage
# We copy from /frontend/build now
COPY --from=build-frontend /frontend/build ./react-app/build

# Copy the backend from the build-backend stage
COPY --from=build-backend /backend/app ./app

# Install serve to serve the frontend build files (optional)
RUN npm install -g serve

# Start the backend (Express server)
CMD ["npm", "start"]

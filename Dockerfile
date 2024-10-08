# Step 1: Build the React frontend
FROM node:16 AS build-frontend
WORKDIR /frontend
COPY react-app/package*.json ./
RUN npm install
COPY react-app ./react-app
RUN npm run build

# Step 2: Set up the Node.js backend
FROM node:16 AS build-backend
WORKDIR /backend
COPY app/package*.json ./
RUN npm install
COPY app ./app

# Step 3: Serve the backend (Express server) and frontend
FROM node:16
WORKDIR /app

# Copy the built frontend files from the build-frontend stage
COPY --from=build-frontend /frontend/react-app/build ./react-app/build

# Copy the backend from the build-backend stage
COPY --from=build-backend /backend/app ./app

# Install serve (optional) to serve the frontend build files, if necessary
RUN npm install -g serve

# Start the backend (Express server)
CMD ["npm", "start"]

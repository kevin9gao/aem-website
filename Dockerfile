# Step 1: Build the React frontend
FROM node:16 AS build-frontend
WORKDIR /app/react-app

# Copy only the package.json and package-lock.json to install dependencies first
COPY react-app/package*.json ./
RUN npm install

# Copy the rest of the frontend source code and build it
COPY react-app ./react-app
RUN npm run build

# Step 2: Set up the Node.js backend
FROM node:16 AS build-backend
WORKDIR /app/app

# Copy only the package.json and package-lock.json to install dependencies first
COPY app/package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY app ./app

# Step 3: Serve the backend (Express server) and frontend
FROM node:16
WORKDIR /app

# Copy the built frontend files from the build-frontend step
COPY --from=build-frontend /app/react-app/build ./react-app/build

# Copy the backend from the build-backend step
COPY --from=build-backend /app/app ./app

# Install serve to serve the frontend build files (optional, depends on how you're serving the frontend)
RUN npm install -g serve

# Start the backend (Express server)
CMD ["npm", "start"]

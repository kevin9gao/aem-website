# Step 1: Build the React frontend
FROM node:16 AS build-frontend
WORKDIR /app
COPY react-app ./react-app
WORKDIR /app/react-app
RUN npm install
RUN npm run build

# Step 2: Set up the Node.js backend
FROM node:16 AS build-backend
WORKDIR /app
COPY app ./app
WORKDIR /app/app
RUN npm install

# Step 3: Serve the backend (Express server) and frontend
FROM node:16
WORKDIR /app
COPY --from=build-frontend /app/react-app/build ./react-app/build
COPY --from=build-backend /app/app ./app

# Install serve to serve the frontend build files
RUN npm install -g serve

# Start the backend (Express server) and frontend
CMD ["npm", "start"]

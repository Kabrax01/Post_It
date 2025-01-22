# Create a new build stage from a base image.
FROM node:alpine

# Create a directory  and go to the directory 
WORKDIR /app

# Copy the package.json file to my current directory  
COPY package.json /app

# Install dependencies
RUN npm i

# Copy other files to my current directory
COPY . /app

# Open port for frontend
EXPOSE 5173

# Run scripts
CMD [ "npm", "run", "dev" ]

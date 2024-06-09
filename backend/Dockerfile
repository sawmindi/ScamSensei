# Use the official Node.js 16 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm rebuild bcrypt


# Copy the rest of the application code into the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3100

# Command to run the application
CMD ["npm", "start"]

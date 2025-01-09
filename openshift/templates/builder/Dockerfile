# Use UBI 8 with Node.js 20 pre-installed
FROM registry.access.redhat.com/ubi8/nodejs-20:latest

# Set working directory
WORKDIR /opt/app-root/src

# Copy application source code
COPY . .

# Install application dependencies
RUN npm install

# Build the application (if applicable)
RUN npm run build

# Expose application port
EXPOSE 8080

# Run the application
CMD ["npm", "start"]

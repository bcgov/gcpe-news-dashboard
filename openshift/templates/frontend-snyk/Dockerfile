# Get community edition of nodejs v8.x (LTS)
FROM node:16.10-bullseye

ENV PATH="/opt/rh/rh-nodejs12/root/usr/bin/:$PATH"

RUN npm install -g snyk

# Switch to root for package installs
USER 0

# Run container by default as user with id 1001 (default)
USER 1001

# Get community edition of nodejs v8.x (LTS)
FROM centos/nodejs-12-centos7

ENV PATH="/opt/rh/rh-nodejs10/root/usr/bin/:$PATH"

RUN npm install -g snyk

# Switch to root for package installs
USER 0

# Run container by default as user with id 1001 (default)
USER 1001

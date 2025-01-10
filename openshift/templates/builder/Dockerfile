# Use Node.js 18 as the base image
FROM node:18

# Set PATH for Node.js binaries
ENV PATH="/usr/local/bin:$PATH"

# Switch to root for package installs
USER 0

# Install an npm version compatible with Node.js 18
RUN npm i npm@10.8.0 -g

# Set permissions for the .npm directory
RUN mkdir -p /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.npm && \
    chmod -R ug+rwx /opt/app-root/src/.npm

# Switch back to non-root user
USER 1001

# Use the RHEL-based Node.js 18 image
FROM registry.access.redhat.com/ubi8/nodejs-18:latest

# Update the PATH to include Node.js binaries
ENV PATH="/opt/app-root/src/.npm-global/bin:/opt/app-root/src/.config:/opt/app-root/src/node_modules/.bin:$PATH"

# Switch to root user for administrative tasks
USER 0

# Install a compatible version of npm for Node.js 18.x
RUN npm install -g npm@10.8.0 && \
    rm -rf /opt/app-root/src/.npm-global/lib/node_modules/npm

# Set proper permissions for necessary directories
RUN mkdir -p /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.npm && \
    chmod -R ug+rwx /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.config

# Switch back to the non-root user
USER 1001

# Set the working directory
WORKDIR /opt/app-root/src

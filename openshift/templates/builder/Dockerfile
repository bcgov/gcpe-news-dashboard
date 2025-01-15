# Use a RHEL/CentOS-based Node.js 18+ image as the base
FROM registry.access.redhat.com/ubi8/nodejs-18:latest

# Update the PATH to include Node.js binaries
ENV PATH="/opt/app-root/src/.npm-global/bin:/opt/app-root/src/.config:/opt/app-root/src/node_modules/.bin:$PATH"

# Switch to root for administrative tasks
USER 0

# Update npm to the latest version compatible with Node.js 18+
RUN npm install -g npm@latest && \
    rm -rf /opt/app-root/src/.npm-global/lib/node_modules/npm

# Ensure proper permissions for .npm and other directories to support caching
RUN mkdir -p /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.npm && \
    chmod -R ug+rwx /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.config

# Run the container by default as user with id 1001 (non-root user)
USER 1001

# Optional: Set the working directory
WORKDIR /opt/app-root/src

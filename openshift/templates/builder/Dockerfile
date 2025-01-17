# Use Node.js 18 from the CentOS Stream collection
FROM quay.io/sclorg/nodejs-20-c8s:latest

# Update PATH environment variable
ENV PATH="/opt/rh/rh-nodejs14/root/usr/bin/:$PATH"

# Switch to root for npm update
USER 0

# Update npm to a specific version
RUN npm i npm@7.24.0 -g

# Ensure necessary directories exist and set permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chown -R 1001:0 /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.npm /opt/app-root/src/.config

# Switch back to the non-root user
USER 1001

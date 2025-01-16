# Use UBI8 minimal as a base image
FROM registry.access.redhat.com/ubi8-minimal:latest

# Install Node.js 18
RUN microdnf install -y nodejs && \
    microdnf clean all

# Set the PATH to include Node.js binaries
ENV PATH="/usr/bin:$PATH"

# Set working directory
WORKDIR /opt/app-root/src

# Create necessary directories and set permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config /tmp/src && \
    chown -R 1001:0 /opt/app-root/src /tmp/src && \
    chmod -R ug+rwx /opt/app-root/src /tmp/src

# Update npm to match package-lock.json version
RUN npm install -g npm@7 && \
    npm_path=$(npm root -g) && \
    if [ -d "$npm_path/npm" ]; then \
        rm -R "$npm_path/npm"; \
    fi

# Use non-root user for container operations
USER 1001

# Set default command
CMD ["node"]

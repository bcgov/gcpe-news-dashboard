# Get community edition of Node.js (LTS)
FROM adevur/centos-nodejs:latest

ENV PATH="/opt/rh/rh-nodejs14/root/usr/bin/:$PATH"

# Switch to root for package installs
USER 0

# Ensure necessary directories exist and set permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chown -R 1001:0 /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.npm /opt/app-root/src/.config

# Update npm to the desired version
RUN npm i npm@7.24.0 -g && \
    npm_path=$(npm root -g) && \
    if [ -d "$npm_path/npm" ]; then \
        rm -R "$npm_path/npm"; \
    fi

# Run container by default as user with ID 1001 (default)
USER 1001

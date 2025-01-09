# Use Node.js 20 on CentOS 7
FROM quay.io/centos7/nodejs-20-centos7:latest

# Update PATH for CentOS-based Node.js image (if required)
ENV PATH="/opt/rh/rh-nodejs20/root/usr/bin/:$PATH"

# Switch to root for package installations
USER 0

# Update npm to the latest version compatible with Node.js 20
RUN npm i npm@latest -g && \
    rm -R /opt/rh/rh-nodejs20/root/usr/lib/node_modules/npm

# Set ownership and permissions for .npm and config directories
RUN chown -R 1001:0 .npm && \
    chmod -R ug+rwx .npm && \
    chown -R 1001:0 /opt/app-root/src/.config

# Run container by default as user with ID 1001 (non-root)
USER 1001

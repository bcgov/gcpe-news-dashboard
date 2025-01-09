# Use CentOS 7 as the base image
FROM centos:7

# Update PATH for custom Node.js installation
ENV PATH="/usr/local/bin:$PATH"

# Switch to root for package installations
USER 0

# Install prerequisites and Node.js 20 from NodeSource
RUN curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - && \
    yum install -y nodejs && \
    yum clean all

# Update npm to the latest version compatible with Node.js 20
RUN npm i npm@latest -g

# Set ownership and permissions for .npm and config directories
RUN mkdir -p /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.npm && \
    chmod -R ug+rwx /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.config

# Set working directory (optional, based on your application structure)
WORKDIR /opt/app-root/src

# Run container by default as user with ID 1001 (non-root)
USER 1001

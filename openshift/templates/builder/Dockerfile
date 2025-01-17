# Use Node.js 18 from the CentOS Stream collection
FROM quay.io/sclorg/nodejs-18-c8s:20230125

# Update PATH environment variable
ENV PATH="/opt/rh/rh-nodejs14/root/usr/bin/:$PATH"

# Switch to root for package installation and updates
USER 0

# Update base image packages to address vulnerabilities
RUN yum -y update && \
    yum -y install \
      vim \
      git \
      wget \
      curl && \
    yum -y clean all && \
    rm -rf /var/cache/yum/*

# Update npm to a specific version
RUN npm i npm@7.24.0 -g

# Ensure necessary directories exist and set permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chown -R 1001:0 /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.npm /opt/app-root/src/.config

# Switch back to the non-root user
USER 1001

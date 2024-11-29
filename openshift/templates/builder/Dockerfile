FROM registry.access.redhat.com/ubi8/ubi

# Install Node.js 16
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs && \
    yum clean all

# Install Chrome Headless and additional dependencies
RUN yum -y install \
      pango \
      libXcomposite \
      libXcursor \
      libXdamage \
      libXext \
      libXi \
      libXtst \
      cups-libs \
      libXScrnSaver \
      libXrandr \
      GConf2 \
      alsa-lib \
      atk \
      gtk3 \
      xorg-x11-fonts-Type1 \
      xorg-x11-fonts-misc && \
    yum clean all && rm -rf /var/cache/yum/*

# Update npm to a specific version
RUN npm i npm@7.24.0 -g && \
    rm -R /usr/lib/node_modules/npm

# Ensure directories exist and set permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config /tmp/scripts /tmp/src && \
    chown -R 1001:0 /opt/app-root/src/.npm /opt/app-root/src/.config /tmp/scripts /tmp/src && \
    chmod -R ug+rwx /opt/app-root/src/.npm /opt/app-root/src/.config /tmp/scripts /tmp/src

# Copy any necessary application scripts or configuration files
# Ensure proper permissions for files copied into the container
COPY --chown=1001:0 upload/scripts /tmp/scripts
COPY --chown=1001:0 upload/src /tmp/src

# Run as a non-root user for OpenShift compatibility
USER 1001

# Set default working directory if required
WORKDIR /tmp

# Command or entrypoint for the application
CMD ["/tmp/scripts/assemble"]

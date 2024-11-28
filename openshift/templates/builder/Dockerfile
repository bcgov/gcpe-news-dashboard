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
      ipa-gothic-fonts \
      xorg-x11-fonts-100dpi \
      xorg-x11-fonts-75dpi \
      xorg-x11-utils \
      xorg-x11-fonts-cyrillic \
      xorg-x11-fonts-Type1 \
      xorg-x11-fonts-misc && \
    yum clean all && rm -rf /var/cache/yum/*

# Update npm to a specific version
RUN npm i npm@7.24.0 -g && \
    rm -R /usr/lib/node_modules/npm

# Ensure directories exist and set permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chown -R 1001:0 /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.npm /opt/app-root/src/.config

# Set non-root user for OpenShift compatibility
USER 1001

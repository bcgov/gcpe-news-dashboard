FROM registry.access.redhat.com/ubi8/nodejs-14

# Set environment path
ENV PATH="/opt/app-root/src:/opt/app-root/bin:/opt/rh/rh-nodejs14/root/usr/bin:$PATH"

# Switch to root for package installations
USER 0

# Install available Chrome Headless and other dependencies
RUN yum -y install \
      pango.x86_64 \
      libXcomposite.x86_64 \
      libXcursor.x86_64 \
      libXdamage.x86_64 \
      libXext.x86_64 \
      libXi.x86_64 \
      libXtst.x86_64 \
      cups-libs.x86_64 \
      libXScrnSaver.x86_64 \
      libXrandr.x86_64 \
      GConf2.x86_64 \
      alsa-lib.x86_64 \
      atk.x86_64 \
      gtk3.x86_64 \
      xorg-x11-fonts-Type1 \
      xorg-x11-fonts-misc \
      && yum clean all -y && \
      rm -rf /var/cache/yum/*

# Update npm to match the pipeline setup
RUN npm i npm@7.24.0 -g && \
    rm -R /usr/lib/node_modules/npm

# Adjust permissions for non-root user
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chown -R 1001:0 /opt/app-root/src/.npm /opt/app-root/src/.config && \
    chmod -R ug+rwx /opt/app-root/src/.npm /opt/app-root/src/.config

# Default to non-root user for OpenShift compatibility
USER 1001

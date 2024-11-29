# Use the Red Hat UBI 8 Node.js base image
FROM registry.access.redhat.com/ubi8/nodejs-14

# Set up PATH for Node.js
ENV PATH="/opt/app-root/src:/opt/app-root/bin:/opt/rh/rh-nodejs14/root/usr/bin:$PATH"

# Switch to root for package installation
USER 0

# Install all required dependencies, including libdrm
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
      nss \
      nss-tools \
      libX11 \
      libdrm && \
    yum clean all && \
    rm -rf /var/cache/yum/*

# Switch to non-root user for OpenShift compatibility
USER 1001

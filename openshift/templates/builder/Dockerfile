# Use the CentOS 7 base image
FROM quay.io/centos7/nodejs-14-centos7:centos7

# Set the PATH for Node.js
ENV PATH="/opt/rh/rh-nodejs14/root/usr/bin/:$PATH"

# Switch to root for package installs
USER 0

# Update yum to use vault.centos.org and install dependencies
RUN sed -i 's|^mirrorlist=|#mirrorlist=|g' /etc/yum.repos.d/CentOS-Base.repo && \
    sed -i 's|^#baseurl=http://mirror.centos.org/centos|baseurl=http://vault.centos.org/centos|g' /etc/yum.repos.d/CentOS-Base.repo && \
    yum -y install pango.x86_64 \
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
        ipa-gothic-fonts \
        xorg-x11-fonts-100dpi \
        xorg-x11-fonts-75dpi \
        xorg-x11-utils \
        xorg-x11-fonts-cyrillic \
        xorg-x11-fonts-Type1 \
        xorg-x11-fonts-misc && \
    yum clean all -y && \
    rm -rf /var/cache/yum/*

# Update npm to the required version
RUN npm i npm@7.24.0 -g && \
    rm -R /opt/rh/rh-nodejs14/root/usr/lib/node_modules/npm

# Set appropriate permissions for .npm and app-root
RUN chown -R 1001:0 .npm && \
    chmod -R ug+rwx .npm && \
    chown -R 1001:0 /opt/app-root/src/.config

# Run the container by default as user with id 1001 (non-root user)
USER 1001

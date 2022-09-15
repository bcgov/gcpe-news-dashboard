# Get community edition of nodejs v8.x (LTS)
FROM quay.io/centos7/nodejs-14-centos7

ENV PATH="/opt/rh/rh-nodejs16/root/usr/bin/:$PATH"

# Switch to root for package installs
USER 0

# install Chrome Headless dependencies
RUN yum -y install pango.x86_64 \
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
      xorg-x11-fonts-misc \
      && yum clean all -y && \
# yum cache files may still exist (and quite large in size)
      rm -rf /var/cache/yum/*

# update npm
RUN npm i npm@7.24.0 -g	&& \
  rm -R /opt/rh/rh-nodejs16/root/usr/lib/node_modules/npm

# Required in order to mount .npm as a volume to cache downloaded files
RUN chown -R 1001:0 .npm && \
  chmod -R ug+rwx .npm && \
  chown -R 1001:0 /opt/app-root/src/.config

# Run container by default as user with id 1001 (default)
USER 1001
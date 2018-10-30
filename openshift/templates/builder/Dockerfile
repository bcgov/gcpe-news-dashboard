# Get community edition of nodejs v8.x (LTS)
FROM centos/nodejs-8-centos7

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ENV PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

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

# Run container by default as user with id 1001 (default)
USER 1001

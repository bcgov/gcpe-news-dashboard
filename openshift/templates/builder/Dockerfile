# Get community edition of nodejs v8.x (LTS)
FROM node:16.10-bullseye

ENV PATH="/opt/rh/rh-nodejs16/root/usr/bin/:$PATH"

# Switch to root for package installs
USER 0

# install Chrome Headless dependencies
RUN apt-get update && apt-get -y upgrade
RUN apt -y install pango.x86_64 \
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
# Required in order to mount .npm as a volume to cache downloaded files
# Run container by default as user with id 1001 (default)
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
CMD "npm" "start"


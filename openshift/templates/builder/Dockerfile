# Get community edition of nodejs v8.x (LTS)
FROM quay.io/centos7/nodejs-14-centos7:20230614

ENV PATH="/opt/rh/rh-nodejs14/root/usr/bin/:$PATH"

# Switch to root for package installs
USER 0

# update npm
RUN npm i npm@7.24.0 -g	&& \
  rm -R /opt/rh/rh-nodejs14/root/usr/lib/node_modules/npm

# Required in order to mount .npm as a volume to cache downloaded files
RUN chown -R 1001:0 .npm && \
  chmod -R ug+rwx .npm && \
  chown -R 1001:0 /opt/app-root/src/.config

# Run container by default as user with id 1001 (default)
USER 1001

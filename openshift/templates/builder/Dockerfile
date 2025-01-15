# Get community edition of nodejs v8.x (LTS)
FROM adevur/centos-nodejs:latest

ENV PATH="/opt/rh/rh-nodejs14/root/usr/bin/:$PATH"

# Switch to root for package installs
USER 0

RUN npm i npm@7.24.0 -g && \
  npm_path=$(npm root -g) && \
  if [ -d "$npm_path/npm" ]; then \
    rm -R "$npm_path/npm"; \
  fi


# Required in order to mount .npm as a volume to cache downloaded files
RUN chown -R 1001:0 .npm && \
  chmod -R ug+rwx .npm && \
  chown -R 1001:0 /opt/app-root/src/.config

# Run container by default as user with id 1001 (default)
USER 1001

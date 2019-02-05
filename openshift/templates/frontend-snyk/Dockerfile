# Get community edition of nodejs v8.x (LTS)
FROM centos/nodejs-8-centos7

ENV PATH="/opt/rh/rh-nodejs8/root/usr/bin/:$PATH"

RUN npm i npm@6.4.1 -g	&& \       
  rm -R /opt/rh/rh-nodejs8/root/usr/lib/node_modules/npm
  
RUN npm install -g snyk

# Switch to root for package installs
USER 0

# Run container by default as user with id 1001 (default)
USER 1001

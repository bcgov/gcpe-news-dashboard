# Get community edition of nodejs v8.x (LTS)
FROM centos/nodejs-8-centos7

RUN curl -o- -L https://yarnpkg.com/install.sh | bash && yarn global add snyk

ENV PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# Switch to root for package installs
USER 0

RUN npm install -g snyk

# Run container by default as user with id 1001 (default)
USER 1001

# base image - latest LTS
FROM node:carbon

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
<<<<<<< HEAD
RUN apt-get update && apt-get install -y google-chrome-stable
=======
RUN apt-get update && apt-get install -y google-chrome-stable_current
>>>>>>> a55b62a871531cbba194c9af4db9524f1a695b9c

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# angular cli
RUN npm install -g @angular/cli@8.3.3

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json package.json
RUN npm install --silent

# add app
COPY . .

# start app
CMD ng serve --host 0.0.0.0 --poll 2000

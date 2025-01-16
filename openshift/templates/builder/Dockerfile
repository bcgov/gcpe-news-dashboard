FROM registry.access.redhat.com/ubi8-minimal:latest

RUN microdnf install -y nodejs && microdnf clean all

# Set working directory
WORKDIR /opt/app-root/src

# Ensure permissions
RUN mkdir -p /opt/app-root/src/.npm /opt/app-root/src/.config /tmp/src && \
    chown -R 1001:0 /opt/app-root/src /tmp/src && \
    chmod -R ug+rwx /opt/app-root/src /tmp/src

# Install npm and verify
RUN npm install -g npm@7.24.0 && \
    npm --version && node --version

# (Optional) Add legacy peer deps flag
RUN echo "legacy-peer-deps=true" > ~/.npmrc

# Install dependencies (if package.json exists)
COPY package.json package-lock.json ./
RUN npm install

USER 1001
CMD ["node"]

# Use official Node.js 18 base image (Debian-based)
FROM node:18

# Set PATH (update if necessary for compatibility with application expectations)
ENV PATH="/usr/local/bin:$PATH"

# Switch to root for package installs
USER 0

# Update npm to the latest version compatible with Node.js 18
RUN npm i npm@latest -g

# Required in order to mount .npm as a volume to cache downloaded files
RUN mkdir -p /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.npm && \
    chmod -R ug+rwx /opt/app-root/src/.npm && \
    chown -R 1001:0 /opt/app-root/src/.config

# Run container by default as user with id 1001 (non-root)
USER 1001

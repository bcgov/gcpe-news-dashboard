# Stage 1: Build
FROM frontend-yarn-builder:latest as builder

# Set working directory
WORKDIR /opt/app-root/src

# Ensure permissions in the builder image
RUN chmod -R u+rwX,g+rwX,o+rX /opt/app-root/src/dist

# Stage 2: Runtime
FROM nginx-runtime:latest

# Set working directory in runtime image
WORKDIR /tmp/app

# Copy the build artifacts from the builder image
COPY --from=builder /opt/app-root/src/dist/. /tmp/app/dist/

# Fix permissions in the runtime image
RUN chmod -R u+rwX,g+rwX,o+rX /tmp/app/dist

# Since the runtime image is itself an s2i image, we need to short-circuit the s2i lifecycle
CMD /usr/libexec/s2i/run

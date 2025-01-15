# Base image for builder
FROM frontend-yarn-builder:latest as builder

# Base image for runtime
FROM nginx-runtime:latest

# Set up necessary environment variables
ENV STI_SCRIPTS_PATH=/usr/libexec/s2i

# Install required tools for runtime (if any)
RUN apk update && \
    apk add --no-cache openssl ca-certificates && \
    rm -rf /var/cache/apk/*

# Copy OpenShift S2I scripts
COPY ./s2i/bin/ /usr/libexec/s2i/

# Expose S2I scripts for OpenShift
LABEL io.openshift.s2i.scripts-url=image:///usr/libexec/s2i

# Copy configuration template
COPY nginx.conf.template /tmp/

# Fix permissions for S2I and source directories
RUN chmod -R g+rwx $STI_SCRIPTS_PATH /tmp && \
    chmod g+rw /var/cache/nginx \
               /var/run \
               /var/log/nginx \
               /etc/nginx/nginx.conf

# Copy build artifacts from builder
COPY --from=builder /opt/app-root/src/dist/. /tmp/app/dist/

# Ensure ownership of source files for the non-root user
RUN chown -R 1001:0 /tmp

# Set working directory
WORKDIR /tmp

# Expose port 8080 for nginx
EXPOSE 8080

# Switch to user 1001 (non-root user)
USER 1001

# Run the S2I lifecycle script
CMD /usr/libexec/s2i/run

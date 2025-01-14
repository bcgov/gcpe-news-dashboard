# Use Alpine-based nginx image
FROM nginx:stable-alpine

ENV STI_SCRIPTS_PATH=/usr/libexec/s2i

# Required for HTTP Basic feature
RUN apk update && \
    apk add --no-cache openssl ca-certificates && \
    rm -rf /var/cache/apk/*

# Copy OpenShift S2I scripts to the default location
COPY ./s2i/bin/ /usr/libexec/s2i/

# Expose S2I scripts to OpenShift
LABEL io.openshift.s2i.scripts-url=image:///usr/libexec/s2i

# Copy config from source to container
COPY nginx.conf.template /tmp/

# =================================================================================
# Fix permissions
# - S2I scripts must be executable
# - Ensure nginx can read and write its working directories
# =================================================================================
RUN chmod -R g+rwx $STI_SCRIPTS_PATH && \
    chmod g+rw /var/cache/nginx \
               /var/run \
               /var/log/nginx \
               /etc/nginx/nginx.conf \
               /tmp

# Work-around for S2I build issues on Windows
WORKDIR /tmp

# Nginx runs on port 8080 by default
EXPOSE 8080

# Switch to user mode
USER 104

# Short-circuit the S2I lifecycle
CMD /usr/libexec/s2i/run

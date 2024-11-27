FROM registry.access.redhat.com/ubi8/ubi

# Install Node.js 16
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs && \
    yum clean all

# Install only essential dependencies (minimal set)
RUN yum -y install \
      pango \
      libXcomposite \
      libXcursor \
      libXdamage \
      gtk3 && \
    yum clean all && rm -rf /var/cache/yum/*

# Run a simple test
RUN node --version && npm --version

USER 1001

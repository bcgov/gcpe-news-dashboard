# frontend-runtime (aka nginx-runtime)

This folder contains the `frontend-runtime` Dockerfile and associated OpenShift configuration template. This is your runtime image that serves the compiled Angular frontend SPA (Single Page Application) to the outside world.

The OpenShift template (`frontend-runtime.yaml`) defines resources needed to serve static content via Nginx HTTP Server and a reverse proxy (nginx).

> Nginx is a web server and a reverse proxy server, with a strong focus on high concurrency, performance and low memory usage.

The main benefits are:

- It uses Nginx to serve static files (10x faster than NodeJS).
- Only the build output (i.e. the compiled code) is stored within the runtime container. This reduces the attack surface and the size of the final image.
- It uses `mainline` Nginx to automatically keep up with patches in the base Nginx image.
- Optional: Configure Nginx as a reverse proxy for REST APIs.

Nginx runtime features:

- Security response HTTP headers.
- Throttling to reduce DDoS.
- W3C standard log formatting.
- Security hardening and performance tuning.
- Uses X-Forwarded-For for client IP for better logging and access control.
- Gzip enabled for better client performance.
- Optional IP filtering for access control.
- TODO: Optional HTTP Basic for access control.

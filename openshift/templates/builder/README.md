# frontend-builder (aka yarn-builder)

This folder contains the `frontend-builder` Dockerfile and associated OpenShift configuration template. This is your builder image that compiles the Angular source code.

The OpenShift template (`frontend-builder.yaml`) takes the application source from your Git repository and produces an image containing a `dist/` folder with the compiled Angular frontend HTML and JavaScript. The image is then pushed to the `frontend-builder:latest` image stream. The path of the output artifact is **/opt/app-root/src/dist/**.

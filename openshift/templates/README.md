# Deploy Frontend Application to OpenShift

## Overview

This folder contains several templates that will aid you in deploying this Frontend Application to OpenShift. This application makes use of an OpenShift feature called "Chained Builds", to learn more read on.

```
templates/
    builder/
        frontend-builder.yaml           // yarn-builder build to be added to your "tools" project
    runtime/
        frontend-runtime.yaml           // nginx-runtime build to be added to your "tools" project
    frontend/
        news-dashboard-build.yaml        // Frontend builds to be added to your "tools" project
        news-dashboard-deploy.yaml       // Frontend deployment, to be added to application environments (dev, test, etc)
```

**Builder:**

This is your builder image that compiles the Angular source code.

**Runtime:**

This is your runtime image that will serve the compiled Angular code as static content. This image uses Nginx to serve the Angular application.

**Frontend:**

This is the image that "glues" together the output from `yarn-builder` with the `nginx-runtime` image. The result is a new image based on `nginx-runtime` (that serves static content via Nginx) but with the output from `yarn-builder`.

This is the final image that copies the artifacts of the NodeJS/Yarn build into the Nginx runtime.

NOTE: This is your **output**/deployable image stream.

## Build Pipeline as Code (aka _Jenkins Pipeline_)

This application makes use of a _declarative pipeline_ supported by [Jenkins](https://jenkins.io/solutions/pipeline/). The  [`Jenkinsfile`](../../Jenkinsfile) can be found at the root of this repository. This file defines our declarative pipeline, currently this is how the pipeline is structured:

- Assemble Runtime and Builder images
- ⬇
- Build Application Artifacts
- Combine Artifacts with Runtime
- ⬇
- Tag the Image as `dev`
- Verify deployment in dev environment
- Wait for approval ⏱
- ⬇
- Tag the Image as `test`
- Verify deployment in test environment
- Wait for approval ⏱
- ⬇
- Tag the Image as `prod`
- Verify deployment in prod environment

To learn more about Jenkins Pipelines, see:

- [Pipeline as Code with Jenkins](https://jenkins.io/solutions/pipeline/)
- [What are Jenkins Pipelines and What is a Jenkinsfile?](https://www.coveros.com/jenkins-pipelines-jenkinsfile/)

## Chaining Builds

![Chaining Builds](https://developers.redhat.com/blog/wp-content/uploads/2017/10/img_59d242b09f698.png)

For compiled languages (Go, C, C++, Java, etc.), including the dependencies necessary for compilation in the application image might increase the size of the image or introduce vulnerabilities that can be exploited.

To avoid these problems, two builds can be chained together: one that produces the compiled artifact, and a second build that places that artifact in a separate image that runs the artifact.

For this application in particular, the first build (i.e. **Yarn-Builder**) takes the application source and produces an image containing a `dist/` folder with the compiled Angular frontend HTML and JavaScript. The image is then pushed to the `frontend-yarn-builder:latest` image stream. The path of the output artifact is **/opt/app-root/src/dist/**.

The second build uses an Image Source with a path to the build output inside the output image from the first build. An inline Dockerfile copies the application artifacts into the final image. That is, it copies the compiled output, `/opt/app-root/src/dist/` from **Yarn-Builder** into directory `tmp/app` of **Nginx-Runtime** image.

The runtime image only has a fast web server (i.e. Nginx) and no NodeJS for instance. This reduces the attack surface, size of the final image and doesn’t expose internal mechanisms.

The result of this setup is that the output image of the second build does not need to contain any of the build tools that are needed to create the Angular frontend application. Also, because the second build contains an image change trigger, whenever the first build is run and produces a new image with updated binary artifact, the second build is automatically triggered to produce a runtime image that contains that artifact. Therefore, both builds behave as a single build with two stages.

More information in [OpenShift documentation](https://docs.openshift.com/container-platform/3.9/dev_guide/builds/advanced_build_operations.html#dev-guide-chaining-builds).






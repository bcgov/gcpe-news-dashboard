# frontend (aka the final Angular frontend to be deployed)

This is the final image that "glues" together the output from `frontend-builder` with the `frontend-runtime` image.

The result is a new image based on `frontend-runtime` (that serves static content via Nginx) but with the output from `frontend-builder`.

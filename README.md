# GCPE News Dashboard

BC Gov News Dashboard frontend application for keeping Ministry Offices and stakeholders informed.
This application is built with Angular 7.

## Prerequisites

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3 and requires the following:

#### Node and NPM

**Node Version Requirement**

Angular CLI and the generated project requires [Node 8.9](https://nodejs.org/en/) or higher, together with NPM 5.5.1 or higher.  You can manage multiple versions of Node on the same machine with [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

:warning: NOTE: You’ll need to have Node on your **local development machine** (but it’s not required on the server).

#### Angular CLI

To install the Angular CLI:

```bash
npm install -g @angular/cli
```

After installation, you will have access to the `ng` binary in your command line. You can verify that it is properly installed by simply running `ng`, which should present you with a help message listing all available commands.

You can check you have the right version with this command:

```bash
# should be 7.0.0 (or greater)
ng version
```

## Getting Started

From your command line:

```bash
# Clone this repository
git clone https://github.com/bcgov/gcpe-news-dashboard

# Go into the repository
cd gcpe-news-dashboard

# Install dependencies
npm install -g @angular/cli
npm install

# Build from source
npm run build

# Run the app
npm start
```

## Development

### Running in development mode

```bash
npm start
```

Runs the app in development mode. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

To build the project:

```bash
# Build in development mode
ng build

# Build in production mode
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

> Use the `--prod` flag for a production build.

### Linting

From your command line:

```bash
npm run lint
```

>  This will lint your app code using [TSLint](https://palantir.github.io/tslint/). Linting rules are specified in **tslint.json**

## Code scaffolding

To generate a new component:

```bash
ng generate component [component-name]
```

>  You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`

#### Examples

Generate a customer component

```bash
ng generate component customer
```

Generate a directive: search-box

```bash
ng generate directive search-box
```

Generate a service: general-data

```bash
ng generate service general-data
```

> Angular will give out a warning line after this command,
>
> "WARNING - service is generated but not provided, it must be provided to be used"
>
> After generating a service, you must go into the parent module and add the service to the `providers` array.

Generate a service and include it in a module automatically

```bash
ng generate service general-data2 -m app.module
```

Generate a class, an interface and enum

```bash
# class
ng generate class models/customer

# interface
ng generate interface models/person

# enum
ng generate enum models/gender
```

Generate a pipe

```bash
ng generate pipe shared/init-caps
```

Generate a module

```bash
ng generate module login/login.module
```

> The CLI creates a **login** directory and generates a login module in that directory

Add Routing Features

```bash
ng generate module admin --routing
```

> Generates a module called admin and adds routing feature to it.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Testing

### Running unit tests

```bash
npm run test
```

Tests will execute after a build is executed via [Karma](https://karma-runner.github.io), and it will automatically watch your files for changes. You can run tests a single time via `--watch=false` or `--single-run`.

### Running end-to-end tests

```bash
npm run e2e
```

Before running the tests make sure you are serving the app via `ng serve`. End-to-end tests are run via [Protractor](http://www.protractortest.org/).

### Writing tests

Place your test files next to the tested modules using some kind of naming convention, like `<module_name>.spec.ts`. Your tests should live together with the tested modules, keeping them in sync. It would be really hard to find and maintain the tests and the corresponding functionality when the test files are completely separated from the business logic.

## Folder Structure

```
angular.json                  - Configuration for Angular CLI
tsconfig.json                 - TypeScript compiler configuration for your IDE
├───node_modules/             - Where npm-installed modules end up going
├───e2e/                      - End-to-end (functional) tests
├───openshift/                - OpenShift-specific files
│   ├───scripts               - Helper scripts
│   └───templates             - Application templates
├───dist/                     - Distributable files (.js)
└───src/                      - Source files (.ts)
    ├───app                   - Root of the frontend application
    ├───assets                - Public HTML assets (e.g. images, css)
    └───environments          - Configuration variables to use in your application
```

## Running in Docker

The following instructions provide details on how to deploy the project using [Docker Compose](https://docs.docker.com/compose/install/#install-compose). This method of deployment is intended for local development and demonstration purposes. It is **NOT** intended to be supported in production level deployments where security, availability, resilience, and data integrity are important.

All application services are exposed to the host so they may be easily accessed individually for development and testing purposes.

#### Starting the project

```bash
./start.sh
```

Docker will serve the application at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Stopping the project

```bash
./stop.sh
```

#### Troubleshooting

To verify which containers are running:

```bash
# List the currently running containers.
docker ps

# List all containers.
docker ps -a
```

To launch an interactive shell on the frontend container:

```bash
docker exec -it news-dashboard bash
```

> This will launch a bash shell that is running within the container, allowing you to inspect the internal files and folders within the container.

## OpenShift Deployment

See [OpenShift README](openshift/README.md)

## Common Issues

#### Not working on Internet Explorer? Or older browser versions?

Enable the legacy browser polyfills. See `/src/polyfills.ts` for instructions.

## Useful resources

- [Angular](https://angular.io/) - Frontend framework
- [Angular CLI](https://cli.angular.io/) - Tool to initialize, develop, scaffold and maintain Angular applications
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
- [Jasmine](https://jasmine.github.io/), [Karma](https://karma-runner.github.io/2.0/index.html), [Protractor](http://www.protractortest.org/) - Unit Tests
- [Docker](https://www.docker.com/) - Containers

## Getting Help or Reporting an Issue

To report bugs/issues/feature requests, please file an [issue](https://github.com/bcgov/gcpe-news-dashboard/issues/).

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

```
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

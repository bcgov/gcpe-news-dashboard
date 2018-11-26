// Protractor configuration file...
// This file contains overrides that are SPECIFIC for running E2E tests in a CI/CD build pipeline; e.g. Jenkins/OpenShift
// To run on CI/CD environments, run:
//    npm run e2e-ci
const config = require('./protractor.conf').config;
const puppeteer = require('puppeteer');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    //args: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-gpu', '--window-size=1000x1000'],
    args: ['--headless', '--no-sandbox', '--window-size=1000x1000'],
    binary: puppeteer.executablePath()
  }
};

exports.config = config;

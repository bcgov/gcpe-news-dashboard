// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// The Chrome DevTools team created Puppeteer
// - it will automatically install Chromium for all platforms and contains everything you need to run it from within your CI.
process.env.CHROME_BIN = process.env.CI ? require('puppeteer').executablePath() : process.env.CHROME_BIN;
//process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    // https://angular.io/guide/testing#set-up-continuous-integration
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222']
      },
      ChromeCI: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      ChromeHeadlessCustom: {
        base: 'ChromiumHeadless',
        flags: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--disable-translate',
            '--disable-extensions'
        ]
    }
    },
    singleRun: false,
    files: [
      'https://connect.facebook.net/en_US/sdk.js',
      'https://www.instagram.com/embed.js',
      'https://platform.twitter.com/widgets.js'
    ],
    // Test config for social media post
    crossOriginAttribute: false,
  });
};

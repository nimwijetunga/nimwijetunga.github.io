const puppeteer = require('puppeteer');
const assert = require('chai').assert;
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'assert']);

// puppeteer options
const opts = {
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

// expose variables
before(async function () {
  global.assert = assert;
  global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after(function () {
  global.browser.close();

  global.browser = globalVariables.browser;
  global.assert = globalVariables.assert;
});
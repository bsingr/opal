  var browser_exports = require('./browser');

  for (var prop in browser_exports) {
    Opal[prop] = browser_exports[prop];
  }
})(this, Opal);


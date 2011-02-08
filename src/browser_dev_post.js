  var dev_exports = require('./browser_dev');

  for (var prop in dev_exports) {
     Opal[prop] = dev_exports[prop];
  }
})(this, Opal);


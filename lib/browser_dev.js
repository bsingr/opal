/*
 * Browser dev wraps all the dev tools, for compiling etc, but adds some functionality
 * in-browser. It will automatically pick out text/ruby script tags and execute their
 * content. opal.js does not do this as the compiler is required. opal_dev.js should
 * only be used in development mode, so overhead in checking/compiling ruby code
 * in the browser will not affect production level environments.
 */

var dev_tools = require('./parser');

for (var prop in dev_tools) {
  exports[prop] = dev_tools[prop];
};

/*
 * Document ready listener can take callbacks that are fired when the document
 * and/or window are ready to run. If already loaded then the callback is just
 * called immediately.
 */
var browser_register_ready_listener = function(callback) {
  if (browser_is_ready) return callback();

  (function() {
    // w3c - chrome, safari, ff
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
    // IE
    else {
      (function() {
        try {
          document.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(arguments.callee, 0);
          return;
        }
        callback();
      })();
    }
  })();
};

/*
 * Document is not ready yet...
 */
var browser_is_ready = false;

/*
 * Find all script tags and run them.
 */
browser_register_ready_listener(function() {
  var tags = document.getElementsByTagName('script'), tag;

  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];

    if (tag.type == 'text/ruby') {
      // src property - load by ajax, then run
      if (tag.src) {

      }
      // no src, so just run inner contents
      else {
        console.log('need to run content:');
        console.log(tag.innerHTML);
        var result = Opal.compile(tag.innerHTML);
        console.log(result);
        eval(result);
      }
    }
  }
});


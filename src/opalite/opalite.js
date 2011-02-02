if (typeof Opalite == 'undefined')
  Opalite = {};

(function(global, exports) {

// access preprocessor stuff
#include "../opal.h"

// used by ready callback listener
var browser_is_ready = false;

// Document ready listener. Calls the callback when document ready.
var register_ready_callback_listener = function(callback) {
  if (browser_is_ready) return callback();

  (function() {
    // w3c - chrome, safari, ff
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
    else {
    // IE (opera?)
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

// default listener
register_ready_callback_listener(function() {
  browser_is_ready = true;
  console.log("BROWSER IS READY");
});

// listener for script tags. if we have any text/ruby tags then we should run them!
register_ready_callback_listener(function() {
  var tag, tags = document.getElementsByTagName('script');

  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];

    if (tag.type == 'text/ruby') {
      // src property - get via AJAX
      if (tag.src) {

      } else {
        console.log('run content:');
        console.log(tag.innerHTML);
        var result = Opal.compile(tag.innerHTML);
        console.log(result);
        var func = new Function('self', result);
        func(rb_top_self);
      }
    }
  }
});

#include "browser.js"
#include "element.js"

Init_Browser();
Init_Element();

})(this, Opalite);


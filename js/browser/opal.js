/**
  Opal for the browser just contains the runtime in this file. This is the basic
  minimal runtime that is required to run an opal application. To do in browser
  development, opal_dev.js is also required, but is built seperately to minimize
  download size for the essential runtime files.
*/

// Top level Opal object available for us to use
if (typeof Opal == 'undefined')
  Opal = {};

(function(global, exports) {
  
  // print function to make available to runtime
  var print = function() {
    if (typeof console != 'undefined' && console.log) {
      for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
      }
    }
  };
  
  /**
    Document ready listener can take callbacks that are fired when the document
    and/or window is ready to run (all DOM content loaded). If already loaded,
    the callback is just called immediately.
  */
  function browser_register_ready_listener(callback) {
    if (browser_is_ready) return callback();
    
    (function() {
      // w3c - chrome, safari, ff etc
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", callback, false);
      }
      
      // IE
      (function() {
        try {
          document.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(arguments.callee, 0);
          return;
        }
        callback();
      })
    })();
  }
  
  /**
    For use with above, keep tracks if we are ready yet.
  */
  var browser_is_ready = false;
  
  /**
    default behaviour is to just mark browser_is_ready as true
  */
  browser_register_ready_listener(function() {
    browser_is_ready = true;
  });
  
  /**
    Main Boot order and sequence
    ============================
    
    There are two ways that opal in the browser works/operates.
    
    1. Run prebuilt code (Deployment)
    =================================
    
    Opalite can be used to prebuild ruby into packages that take the opalite
    format. These are generated from gemspecs.
    
    2. Run code within browser (Development)
    ========================================
    
    Run code from script tags within the browser. Requires opal_dev.js
    
    
    Basically, if Opal.run() is called at any point before this callback is
    triggered, then the first path is taken. Otherwise, script tags are loaded
    and run. Opalite server can be used for automatic package building for step
    1 to avoid manual recompilation between steps.
  */
  browser_register_ready_listener(function() {
    if (false) { // path 1
      
    }
    else { // path 2
      browser_run_ruby_tags();
    }
  });
  
  /**
    Returns an array of all script tags in DOM page that have the mime type
    text/ruby. Should only be called once dom content has loaded.
  */
  function browser_run_ruby_tags() {
    // init ruby
    exports.init();
    var tags = document.getElementsByTagName('script'), tag;
    
    for (var i = 0; i < tags.length; i++) {
      tag = tags[i];
      
      if (tag.type == "text/ruby") {
        // src property - Ajax load file, then run it
        if (tag.src) {
          
        }
        // just run the inner content
        else {
          print("run content:");
          print(tag.innerHTML);
          rb_run(function() {
            var res = exports.compile(tag.innerHTML);
            print(res);
            var func = new Function('self', '__FILE__', res);
            func(rb_top_self, "");
          });
        }
      }
    }
  }
  
  function io_puts(str) {
    print(str);
  }
  
  
/**
  Import just core runtime (and header)
*/
#import "browser.h"
#import "../opal.h"
#import "../runtime.js"
#import "browser.js"
#import "element.js"
#import "fs.js"
})(this, Opal);

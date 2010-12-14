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
  Register run commands from a js file. These will be used to run the opal
  "program". If this is called, then path 1 (below) will take effect, otherwise
  path 2 will (load script tags etc).
  
  cwd is basically which gem do we pretend we are in the working directory of
  
  program_name is a bin name, e.g. "ospec".
*/
exports.run_opal = function(cwd, program_name) {
  print("running program: " + program_name);
  OPAL_RUN_DIR = cwd;
  OPAL_RUN_BIN = program_name;
}

/**
  Same as above but run a lib instead (no gems defined)
*/
exports.run_lib = function() {};

var OPAL_RUN_DIR = null;
var OPAL_RUN_BIN = null;

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
    
    var bin_file = OPAL_RUN_BIN;
    var argv = [];
    
    var href_uri = window.location.href;
    var page_uri = OpalURI.parse(href_uri);
    var page_dir = rb_file_dirname(page_uri.path);

    // file system paths
    FS_PAGE_URI = page_uri;
    FS_OPALS_PATH = rb_file_join(page_dir, "opals");
    FS_LIB_PATH = rb_file_join(page_dir, "lib");
    FS_CWD = rb_file_join(FS_OPALS_PATH, OPAL_RUN_DIR);
    
    // go through all registered opals and "boot" them
    for (var i = 0; i < FS_REGISTERED_OPALS.length; i++) {
      var opal_spec = FS_REGISTERED_OPALS[i];
      var opal_path = rb_file_join(FS_OPALS_PATH, opal_spec.name);
      // all files
      for (var opal_file in opal_spec.files) {
        var file_path = rb_file_join(opal_path, opal_file);
        FS_FILES[file_path] = opal_spec.files[opal_file];
      }
      // executables
      if (opal_spec.executables) {
        for (var j = 0; j < opal_spec.executables.length; j++) {
          var bin_file = opal_spec.executables[j];
          FS_BIN_FILES[bin_file] = rb_file_join(opal_path, "bin", bin_file);
        }
      }
      
      // lib path
      load_paths.push(rb_file_join(opal_path, 'lib'));
      print("---- " + rb_file_join(opal_path, 'lib'));
    }

    // replace ruby loader
    extensions[".rb"] = fs_replaced_ruby_loader;
    
    // argv 0 is simply opal..
    argv[0] = "opal";
    // replace bin file with its full path
    argv[1] = FS_BIN_FILES[bin_file];
    
    // actual arguments we get from hash:
    var hash_args = window.location.hash.substr(1).split("&");
    
    for (var i = 0; i < hash_args.length; i++) {
      // decide uri?
      argv.push(hash_args[i]);
    }
    
    exports.argv = argv;
    
    exports.opal_lib_path = FS_LIB_PATH;
    
  if (OPAL_RUN_BIN) { // path 1  
    exports.main();
  }
  else { // path 2
    exports.init();
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
  Platform
*/
var opal_ruby_platform = "browser";

  
/**
  Import just core runtime (and header)
*/
#include "browser.h"
#include "../opal.h"
#include "../runtime.js"
#include "browser.js"
#include "element.js"
#include "fs.js"
#include "uri.js"
})(this, Opal);

// =======================
// = Opal loading system =
// =======================

// "Opals" are similar to gems in vanilla ruby. An opal is like a framework of
// code and other resources.

// Register an opal with the given specification, which is a json literal with
// name, description, dependencies etc.
// 
// Example
// =======
// 
// opal.register({
//  name: "browser",
//  version: "0.1.0",
//  files: {
//    "bin/browser", function() { ... bin imp ... },
//    "lib/browser.rb": function() { ... browser.rb imp ... },
//    "lib/browser/element.rb": function() { ... element.rb imp ... }
//  }
// });
// 
// Notes
// =====
// 
// We then add the lib/ path in browser to our load path, so require('browser')
// will load lib/browser.rb, and require('browser/element') will load
// lib/browser/element.rb
// 
// All opals are stores with their name as a prefix, so lib/browser.rb as above
// will actually have a full path url of "/browser/lib/browser.rb"
// 
// Applications are initialized by calling their "bin" file, which by default is
// named identically to their opal name, so to start our "sample_controls"
// application, we initialize "/sample_controls/bin/sample_controls" which will
// probably require "/sample_controls/lib/sample_controls.rb" which will itself
// load cherry_kit etc etc. the main bin file most often than not will simply
// call something like CKApplication.start()
// 
// Resources like css could be added here, as well as auto loading for them, so
// when the main lib file is loaded, then they are automatically required.. 
// might work.
// 
// require('browser') will first search all opals, so we can carry out potential
// autoloading of css etc
// 
exports.register = function(specification) {
  // console.log("registering new opal: " + specification.name);
  opal_list[specification.name] = specification;
  
  load_paths.push(specification.name + "/lib/");
  
  for (var file_name in specification.files) {
    file_list[specification.name + "/" + file_name] = specification.files[file_name];
  }
};

// same as above but register this as the default application sequence. will
// look in this opal for a bin file with same name to be used for running
// exports.register_application = function(specification) {
//   exports.register(specification);
//   bin_file = '/' + specification.name + '/bin/' + specification.name;
// };

// array of loadpaths used in "require" .. each opal listed etc
// by default has root of filesystem, but each added opal also adds its libpath
var load_paths = [""];

// to load on window.load
var bin_file = null;

// cwd for application
var opal_cwd = null;

// list of all opals: name to specification json object
var opal_list = {};

// dictionary of all files:
// 
// /path/to_file.1: function() { ... imp ... },
// /path/to_file.2: function() { ... imp ... }
// 
// If a file has been included, then its function will be marked with an 
// property ".opal_required" and set to true
var file_list = exports.files = {};

// =======================================================
// = Temp launching - should be done via window.onload.. =
// =======================================================
// Run is our main file to run. usually app path, sometimes spec path etc
// 
// @param [String] path - the main executable file
// @param [String] path - the working directory
// @param [String] lib_path - the lib dir for the main target (default is "lib"), but could well be "ruby" or "opal" or indeed "" 
exports.run = function(path, cwd, lib_path) {
  bin_file = path;
  exports.getwd = opal_cwd = cwd;
  var require_path;
  
  if (!bin_file)
    throw "Opal: no bin file defined."
    
  var bin_path = bin_file + "/bin/" + bin_file + ".rb";
  
  if (exports.files[bin_path])
    require_path = bin_path;
    // exports.require(bin_path);
  else if (exports.files[bin_path = path + '/lib/' + path + '.rb']) {
    // bin_path = bin_file + "/lib/" + bin_file + ".rb";
    // exports.require(bin_path);
    require_path = bin_path;
  }
  else if (exports.files[bin_path = path + '/' + path + '.rb']) {
    // bin_path = bin_file + "/lib/" + bin_file + ".rb";
    // exports.require(bin_path);
    require_path = bin_path;
  }
  else {
    throw "cannot find bin file"
  }
  
  opal.entry_point(function() {
    return exports.require(require_path);
  });
};

// require the file at the given path: we have already checked it exists - mark
// as being required - execute in context of top_self
// 
// params function(__FILE__) { .. }
var file_require_path = function(path) {
  if (STACK_TRACE) {
    exports.current_file = path;
  }
  // console.log("requiring " + path);
  var f = file_list[path];
  f.opal_required = true;
  return f.apply(exports.top_self, [path]);
};

// require the js string path.. might come from ruby, might come from js
exports.require = function(orig_path) {
  // console.log("native require: " + orig_path);
  // console.log(load_paths);
  var path = orig_path;
  // basically loop through each of the load paths looking for a match
  if ((path.substr(path.length - 3) != '.rb') && (path.substr(path.length -3) != '.js')) {
    // console.log("need to add .rb");
    path += '.rb'
  }
  
  for (var i = 0; i < load_paths.length; i++) {
    var try_path = load_paths[i] + path;
    // console.log("does exist? " + try_path);
    if (file_list.hasOwnProperty(try_path)) {
      if (file_list[try_path].opal_required) {
        // console.log("already required " + path);
        return;
      }
      // console.log("shit son!!!!");
      // console.log(file_list[try_path]);
      return file_require_path(try_path);
    }
  }
  
  throw "could not find require: " + orig_path;
};

// =========================
// = Browser bits and bobs =
// =========================

var browser = exports.browser = (function() {
  var agent = navigator.userAgent.toLowerCase();
  var version = 1;
  var browser = {
    version: 0,
    safari: (/webkit/).test(agent) ? version : 0,
    opera: (/opera/).test(agent) ? version : 0,
    msie: (/msie/).test(agent) && !(/opera/).test(agent) ? version : 0
  };
  
  return browser;
})();

// set callback for when opal/document is ready to go!
exports.setDocumentReadyListener = function(callback) {
  // run it in the context of top self
  var on_ready = function() {
    opal.entry_point(function() {
      callback.apply(opal.top_self);
    });
  };
  // attach ready function
  (function(){
    // w3c - firefox, safari, opera
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", on_ready, false);
    }
    // internet explorer
    if (exports.browser.msie) {
      (function() {
        try {
          document.documentElement.doScroll('left');
        }
        catch (e) {
          setTimeout(arguments.callee, 0);
          return;
        }
        on_ready();
      })();
    }

  })();
};

// ================
// = On ready etc =
// ================
// var on_ready = function() {
  // console.log("===== on_ready");

// };



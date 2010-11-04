

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
// exports.run = function(path, cwd, lib_path) {
//   bin_file = path;
//   exports.getwd = opal_cwd = cwd;
//   var require_path;
//   
//   if (!bin_file)
//     throw "Opal: no bin file defined."
//     
//   var bin_path = bin_file + "/bin/" + bin_file + ".rb";
//   
//   if (exports.files[bin_path])
//     require_path = bin_path;
//     // exports.require(bin_path);
//   else if (exports.files[bin_path = path + '/lib/' + path + '.rb']) {
//     // bin_path = bin_file + "/lib/" + bin_file + ".rb";
//     // exports.require(bin_path);
//     require_path = bin_path;
//   }
//   else if (exports.files[bin_path = path + '/' + path + '.rb']) {
//     // bin_path = bin_file + "/lib/" + bin_file + ".rb";
//     // exports.require(bin_path);
//     require_path = bin_path;
//   }
//   else {
//     throw "cannot find bin file"
//   }
//   
//   exports.entry_point(function() {
//     // require our main "browser" spec as well - seems silly making the user
//     // have to do this when we know for a fact we are in the browser.
//     exports.require('browser');
//     return exports.require(require_path);
//   });
// };

// require the file at the given path: we have already checked it exists - mark
// as being required - execute in context of top_self
// 
// params function(__FILE__) { .. }
var file_require_path = function(path) {
  // console.log("requiring " + path);
  var f = file_list[path];
  f.opal_required = true;
  return f(exports.top_self, path, function(path) {
    // console.log("need to require: " + path);
  });
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

// load the raw file, given as a function imolementation as the given filename
// 
// @param [String] filename
// @param [Function] implementation
exports.load_raw_file = function(filename, implementation) {
  return implementation.apply(exports.top_self, '', function(path) {
    // console.log("need to require: " + path);
  });
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

var document_now_ready = false;

// set callback for when opal/document is ready to go!
exports.setDocumentReadyListener = function(callback) {
  // if already loaded:
  if (document_now_ready) return callback();
  // run it in the context of top self
  var on_ready = function() {
    // opal.entry_point(function() {
      callback.apply(exports.top_self);
    // });
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



exports.setDocumentReadyListener(function() {
  document_now_ready = true;
});




exports.glob_files = function(glob) {
  var working = glob.replace(/\*\*\//g, '.*').replace(/\*\*/g, '.*').replace(/\//g, '\\/');
  var result = [];
  var reg = new RegExp('^' + working + '$');
  for (var prop in opal.files) {
    if (reg.exec(prop)) {
      result.push(prop);
    }
  }
  return result;
};


exports.ruby_platform = "browser";

// =============================================================================
// = ************************* NEW LOADING SEQUENCE ************************** =
// =============================================================================

// package to run. Prebuitl systems will call .run() which sets this. If not set,
// we need to do async style loading.
var OPAL_PACKAGE_TO_RUN = null;

// run the given package name when the document is ready. We assume all needed
// packages will be available. (they are built into the js file loaded by html).
exports.run = function(package_name) {
  OPAL_PACKAGE_TO_RUN = package_name;
};

// =============================================================================
// =                            BOOTING ORDER AND LOGIC                        =
// =============================================================================
// 
// There are three ways to run our ruby code within a browser. We wait until the
// document is ready (everything is loaded), and then we try in order:
// 
// 1. Run code that is already prebuilt (compiled into javascript)
// ===============================================================
// 
// Prebuilt packages will be included in the page (usually in a script-src), 
// where each package resigters itself with Opal.register(..). Browser also does
// this, as its built into opal.js. So, when we run, if any package has called
// Opal.run('package_name'), we know we have all our sources, and we must run
// package_name as if it was the main package.
// 
// Essentially, if Opal.run() has been called, we do not do any async. This is
// production ready code, and we just run it.
// 
// 2. Run code that is referenced through script tags in the html page
// ===================================================================
// 
// If there are ANY script tags of type "text/ruby", then we simply preprocess
// those and then run them. We do not look for a package.json file. These script
// tags can also require() other sources, so we preprocess them to get their
// dependencies recursively and then run the script tags in order. Embedded code
// (with no src), are treated the same (order prevails).
// 
// 3. Look for a package.json and async load from there to load/parse code
// =======================================================================
// 
// Basically a more complicated package based system. CherryKit applications,
// for instance, will use this system as it allows for complete browser based
// parsing and running with no initial built. If Opal.run() is not called, and
// there are no matching script tags, then we simply look for a package.json and
// run our application from there. 
// 

// Decide which of our three paths to go down:
exports.setDocumentReadyListener(function() {
  // first thing we do (for any of the cases) is to load opal and browser packages
  opal_init();
  // 1. run prebuilt code (was Opal.run() called).
  if (OPAL_PACKAGE_TO_RUN) {
    console.log("we need to run: " + OPAL_PACKAGE_TO_RUN);
  }
  else {
    var ruby_tags = ruby_script_tags();
    // 2. Run all script tags of type ruby
    if (ruby_tags.length > 0) {
      console.log("need to run script tags");
    }
    // 3. Must look for our package.json and load from there
    else {
      console.log("looking for package.json");
    }
  }
});

// uri => files preloaded (in packages). the file (value) will be a string
// representation of the actual file (ready to be evald())
OPAL_FILES = {};

// Get an array of all script tags that are of type text/ruby
var ruby_script_tags = function() {
  var script, result = [], tags = document.getElementsByTagName('script');
  for (var i = 0; i < tags.length; i++) {
    script = tags[i];
    if (script.type == 'text/ruby') {
      result.push(script);
    }
  }
  return result;
};

// initialize opal - basically load core library, then browser (if exists)
var opal_init = function() {
  console.log("init opal..");
  // opal_require('opal');
  opal_require('browser');
};

// require the given path with no context. Here we can load any file with no
// assumed context. Used to load 'browser' for example (as well as core opal)
var opal_require = function(path) {
  
};

// register a package. specification should be the equivalent of a package.json
// 
// Format
// ======
// 
// Main format is simply json - like package.json
// 
// Example
// =======
// 
//  {
//    "name": "browser",
//    "version": "0.1.0"
// 
//    // opal specific 
//    "opal": {
//      "files": [
//        // [filename, [dependencies], code]
//        ["element.rb", [], "function() { print('in element'); }"]
//      ]
//    }
//  }
// 
// We also assume a package will have a default uri of the current page?
exports.register = function(pkg_json) {
  console.log("Registering " + pkg_json.name);
  var pkg_uri = OpalURI.parse(window.location.href).merge(pkg_json.name);
  var pkg = new OpalPackage(pkg_uri, pkg_json);
  // console.log("registering new opal: " + specification.name);
  // opal_list[pkg.name] = pkg;
  
  // load_paths.push(pkg.name + "/lib/");
  
  // if (pkg.opal) {
    // for (var file_name in pkg.opal.files) {
      // file_list[pkg.name + "/" + file_name] = pkg.opal.files[file_name];
    // }
  // }
};

// =====================================================================
// = Completely async - we look for a package.json and load from there =
// =====================================================================
// exports.setDocumentReadyListener(function() {
//   var href_uri = window.location.href;
//   // var href_uri = new OpalURI(window.location.href);
//   console.log("href is  " + href_uri);
//   
//   var page_uri = OpalURI.parse(href_uri);
//   console.log("page_uri: ");
//   console.log(page_uri);
//   
//   var root_package_uri = page_uri.merge('.');
//   console.log("root_package_uri: ");
//   console.log(root_package_uri);
//   
//   var root_package = new OpalAsyncPackage(root_package_uri);
//   
//   root_package.add_event_listener('complete', function() {
//     console.log("package is complete: " + root_package_uri);
//   });
//   
//   root_package.resolve();
// });

// ==========================================
// = Run script tags without a package.json =
// ==========================================
// exports.setDocumentReadyListener(function() {
//   var script, tags = document.getElementsByTagName('script');
//   for (var i = 0; i < tags.length; i++) {
//     script = tags[i];
//     if (script.type == 'text/ruby') {
//       if (script.src)
//         // load via XMLHttpRequest
//         false;
//       else
//         setTimeout(function() {
//           console.log(script.innerHTML);
//           var res = exports.compile(script.innerHTML);
//           console.log(res);
//           // console.log(new Function('return ' + res + ';'));
//           (new Function('return ' + res + ';'))()(exports.top_self, "(main)", function(path) {
//             console.log("need to require " + path);
//           });
//           // console.log(exports.compile(script.innerHTML));
//         }, 0);
//     }
//   }
// });

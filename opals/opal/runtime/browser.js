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
exports.register = function(pkg) {
  // console.log("registering new opal: " + specification.name);
  opal_list[pkg.name] = pkg;
  
  load_paths.push(pkg.name + "/lib/");
  
  if (pkg.opal) {
    for (var file_name in pkg.opal.files) {
      file_list[pkg.name + "/" + file_name] = pkg.opal.files[file_name];
    }
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
  
  exports.entry_point(function() {
    // require our main "browser" spec as well - seems silly making the user
    // have to do this when we know for a fact we are in the browser.
    exports.require('browser');
    return exports.require(require_path);
  });
};

// require the file at the given path: we have already checked it exists - mark
// as being required - execute in context of top_self
// 
// params function(__FILE__) { .. }
var file_require_path = function(path) {
  // console.log("requiring " + path);
  var f = file_list[path];
  f.opal_required = true;
  return f(exports.top_self, path);
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
  return implementation.apply(exports.top_self);
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

var run_script_tags = function() {
  var script, tags = document.getElementsByTagName('script');
  for (var i = 0; i < tags.length; i++) {
    script = tags[i];
    if (script.type == 'text/ruby') {
      if (script.src)
        // load via XMLHttpRequest
        false;
      else
        setTimeout(function() {
          console.log(script.innerHTML);
          var res = exports.compile(script.innerHTML);
          console.log(res);
          // console.log(new Function('return ' + res + ';'));
          (new Function('return ' + res + ';'))()(exports.top_self, "(main)");
          // console.log(exports.compile(script.innerHTML));
        }, 0);
    }
  }
};

exports.setDocumentReadyListener(function() {
  document_now_ready = true;
});

exports.setDocumentReadyListener(run_script_tags);


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

// ================
// = On ready etc =
// ================
// var on_ready = function() {
  // console.log("===== on_ready");

// };


exports.ruby_platform = "browser";





// ================
// = Boot n' load =
// ================

exports.setDocumentReadyListener(function() {
  var href_uri = new OpalURI(window.location.href);
  console.log("href is  " + href_uri);
  
  var root_package_uri = new OpalURI(href_uri);

  var root_package = new OpalPackage(href_uri);
  console.log(root_package);
  root_package.load();
});


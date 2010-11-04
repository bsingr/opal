// 
// // hash of uris to their actual OpalAsyncResource instance. Multiple objects may
// // require a file, so multiple objects will want to listen and register listeners
// // for that file. 
// 
// // change this to var OPAL_RESOURCES
// OPAL_RESOURCES = {};
// 
// // Event Listeners
// // ===============
// // 
// //  "load"
// //  "error"
// //  "complete" - when all dependencies are also done
// var OpalAsyncResource = function(uri) {
//   // make sure we dont already have something looking for this resource
//   var uri_str = uri.to_s();
//   
//   if (OPAL_RESOURCES.hasOwnProperty(uri_str)) {
//     return OPAL_RESOURCES[uri_str];
//   }
//   
//   OPAL_RESOURCES[uri_str] = this;
//   
//   // ok, we are good to go.
//   this._uri = uri;
//   this._event_listeners = {};
//   this._loaded = false;
//   this._complete = false;
//   this._file_content = "";
//   this._dependencies = [];
//   this._active_dependencies = [];
//   
//   return this;
// };
// 
// OpalAsyncResource.prototype.check_dependencies = function() {
//   console.log("checking dependencies!!");
// };
// 
// OpalAsyncResource.prototype.add_dependency = function(uri) {
//   var dependency = new OpalAsyncResource(uri);
//   console.log("add dependency: " + uri);
//   this._dependencies.push(dependency);
//   if (!dependency.complete()) {
//     this._active_dependencies.push(dependency);
//     
//     var self = this;
//     
//     dependency.add_event_listener('load', function() {
//       console.log("loaded dependency");
//     });
// 
//     dependency.add_event_listener('error', function() {
//       // console.log("got error");
//       self.dispatch_event('error', 'got error loading: ' + dependency);
//     });
// 
//     dependency.resolve();
//   }
// };
// 
// OpalAsyncResource.prototype.complete = function() {
//   return this._complete;
// };
// 
// OpalAsyncResource.prototype.file_content = function() {
//   return this._file_content;
// };
// 
// OpalAsyncResource.prototype.resolve = function() {
//   if (this._loaded) return;
//   console.log("resolving " + this._uri);
//   this._loaded = true;
//   
//   var self = this;
//   
//   var on_success = function(request) {
//     self._file_content = request.responseText();
//     self.dispatch_event('load');
//     // we give listeners the opportunity now to add dependencies. if there are
//     // none left, then...
//     self.check_dependencies();
//   };
//   
//   var on_failure = function(request) {
//     self.dispatch_event('error', 'Could not load resource at: ' + self._uri.to_s());
//   };
//   
//   new OpalRequest.file(this._uri, on_success, on_failure);
// };
// 
// OpalAsyncResource.prototype.add_event_listener = function(name, callback) {
//   if (!this._event_listeners.hasOwnProperty(name)) {
//     this._event_listeners[name] = [];
//   }
//   this._event_listeners[name].push(callback);
// };
// 
// OpalAsyncResource.prototype.dispatch_event = function(name) {
//   // console.log("dispatching event " + name);
//   var listeners = this._event_listeners[name];
//   
//   if (listeners) {
//     for (var i = 0; i < listeners.length; i++) {
//       // console.log("callback " + i);
//       listeners[i](this, name, Array.prototype.slice.call(arguments, 1));
//       // listeners[i](this);
//     }
//   }
// };


// hash of uris to their actual OpalAsyncResource instance. Multiple objects may
// require a file, so multiple objects will want to listen and register listeners
// for that file. 

// change this to var OPAL_RESOURCES
OPAL_RESOURCES = {};

// Event Listeners
// ===============
// 
//  "load"
//  "error"
//  "complete" - when all dependencies are also done
var OpalAsyncResource = function(uri) {
  // make sure we dont already have something looking for this resource
  var uri_str = uri.to_s();
  
  if (OPAL_RESOURCES.hasOwnProperty(uri_str)) {
    return OPAL_RESOURCES[uri_str];
  }
  
  OPAL_RESOURCES[uri_str] = this;
  
  // ok, we are good to go.
  this._uri = uri;
  this._event_listeners = {};
  this._loading = false;

  return this;
};

OpalAsyncResource.prototype.resolve = function() {
  if (this._loading) return;
  var self = this;
  console.log("resolving: " + this._uri);
  
  var on_success = function(request) {
    // self._file_content = request.responseText();
    
    self.handle_content(request.responseText());
    self.dispatch_event('load');
    console.log("on success!");
  };
  
  var on_failure = function(request) {
    throw "on failure :(";
  };
  
  new OpalRequest.file(this._uri, on_success, on_failure);
  
  
  //   if (this._loaded) return;
  //   console.log("resolving " + this._uri);
  //   this._loaded = true;
  //   
  //   var self = this;
  //   
  //   var on_success = function(request) {
  //     self._file_content = request.responseText();
  //     self.dispatch_event('load');
  //     // we give listeners the opportunity now to add dependencies. if there are
  //     // none left, then...
  //     self.check_dependencies();
  //   };
  //   
  //   var on_failure = function(request) {
  //     self.dispatch_event('error', 'Could not load resource at: ' + self._uri.to_s());
  //   };
  //   
  //   new OpalRequest.file(this._uri, on_success, on_failure);
};

// handle content
OpalAsyncResource.prototype.handle_content = function(content) {
  console.log("handling content!");
  console.log(content);
};

OpalAsyncResource.prototype.add_file_dependency = function(uri) {
  var file = new OpalAsyncFile(uri);
  
  file.add_event_listener('complete', function() {
    console.log("file is complete!");
  });
  
  file.add_event_listener('error', function() {
    console.log("file produced an error!");
  });
  
  file.resolve();
};

OpalAsyncResource.prototype.add_event_listener = function(name, callback) {
  if (!this._event_listeners.hasOwnProperty(name)) {
    this._event_listeners[name] = [];
  }
  this._event_listeners[name].push(callback);
};

OpalAsyncResource.prototype.dispatch_event = function(name) {
  // console.log("dispatching event " + name);
  var listeners = this._event_listeners[name];
  
  if (listeners) {
    for (var i = 0; i < listeners.length; i++) {
      // console.log("callback " + i);
      listeners[i](this, name, Array.prototype.slice.call(arguments, 1));
      // listeners[i](this);
    }
  }
};

var OpalAsyncPackage = (function() {
  var ctor = function() {};
  ctor.prototype = OpalAsyncResource.prototype;
  var result = function(uri) { 
    OpalAsyncResource.call(this, uri.merge('package.json'));
    return this; 
  };
  result.prototype = new ctor();
  return result;
})();

OpalAsyncPackage.prototype.handle_content = function(content) {
  this._file_content = content;
  // now need to register package with json
  var package_json = JSON.parse(content);
  var pkg = new OpalPackage(this._uri, package_json);
  var lib_uri = pkg.lib_uri();
  this.add_file_dependency(lib_uri);
  // console.log("our lib uri is:");
  // console.log(lib_uri);
};

var OpalAsyncFile = (function() {
  var ctor = function() {};
  ctor.prototype = OpalAsyncResource.prototype;
  var result = function(uri) { 
    OpalAsyncResource.call(this, uri);
    return this; 
  };
  result.prototype = new ctor();
  return result;
})();

OpalAsyncFile.prototype.handle_content = function(content) {
  this._file_content = content;
  extension = this._uri.extension();
  
  var result;
  
  if (extension == 'rb') {
    var parsed = exports.compile(content, this._uri);
    console.log("result of " + this._uri);
    console.log(parsed);
    // console.log("need to parse " + content);
    var dependencies = parsed[1];
    for (var i = 0; i < dependencies.length; i++) {
      // this.add_file_dependency(this._uri.merge(dependencies[i]));
      console.log("uri for " + dependencies[i]);
      console.log(uri_for_require_path(dependencies[i], this._uri));
      this.add_file_dependency(uri_for_require_path(dependencies[i], this._uri));
    }
  }
  else
    console.log("regular js code:" + content);
  // console.log("File content:");
  // console.log(content);
  // console.log("extension " + this._uri.extension());
};

var uri_for_require_path = function(path, current) {
  var result;
  if (path[0] == '.') {
    // local/relative to current file
    result = current.merge(path);
    console.log("relative:");
    console.log(result);
  }
  else if (path.indexOf('/') !== -1) {
    // 'a/b'
    var package_name = path.substr(0, path.indexOf('/'));
    var require_path = path.substr(path.indexOf('/') + 1);
    var pkg = OpalPackage.all_names[package_name];
    if (!pkg) {
      throw "Cannot require " + path + ", unknown package name: " + package_name;
    }
    // console.log("look in " + package_name);
    // console.log(pkg.uri_for_lib(require_path));
    // FIXME: assume we have found package
    result = pkg.uri_for_lib(require_path);
  }
  else {
    // 'a'
  }
  
  if (!result.extension()) {
    result.path += '.rb';
  }
  // console.log("extension is " + result.extension());
  return result;
};

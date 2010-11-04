
var OpalPackage = function(uri, package_json) {
  
  if (OpalPackage.all[uri.to_s()]) {
    return OpalPackage.all[uri.to_s()];
  }
  
  OpalPackage.all[uri.to_s()] = this;
  
  this._uri = uri;
  this._package_json = package_json;
  this.process_package();
  return this;
};

// remove me
OPAL_TMP_PACKAGES = OpalPackage;

// all opal packages by uri
OpalPackage.all = {};

// all opal packahes by name
OpalPackage.all_names = {};

// Async load the given package, plus all (yes, ALL) of its dependencies. This 
// will involve parsing all code parts as they come in, and fetching their
// dependencies also.
// OpalPackage.fetch = function(uri, callback) {
//   // we want to get a package.json file from the given uri, so
//   var package_json = uri.merge('package.json');
//   var package_async = new OpalAsyncResource(package_json);
//   
//   package_async.add_event_listener('load', function() {
//     console.log("loaded package");
//     console.log(package_async.file_content());
//     var content = package_async.file_content();
//     var pkg = new OpalPackage(uri, JSON.parse(content));
//     // we only call our callback once we load all resources that our package 
//     // needs
//     pkg.finish_loading(callback);
//     // instruct our package_async to find its lib/package_name.rb file
//     package_async.add_dependency(uri.merge('lib/' + pkg.name() + '.rb'));
//   });
//   
//   package_async.add_event_listener('error', function() {
//     console.log("got error");
//   });
//   
//   package_async.resolve();
// };

OpalPackage.prototype.lib_uri = function() {
  if (this._lib_uri) return this._lib_uri;
  return this._lib_uri = this._uri.merge('lib/' + this.name() + '.rb');
};

// path is something like photo_inspector.rb, which we assume lives in
// some_package/lib/some_package/photo_inspector.rb
OpalPackage.prototype.uri_for_lib = function(path) {
  return this.lib_uri().merge(this.name() + '/' + path);
};

OpalPackage.prototype.name = function() {
  return this._name;
};

OpalPackage.prototype.dependencies = function() {
  if (this._package_json.dependencies) {
    var result = [];
    for (var d in this._package_json.dependencies) {
      result.push(d);
    }
    return result;
  }
  
  return [];
};

// process package to get all correct ivars
OpalPackage.prototype.process_package = function() {
  var json = this._package_json;
  this._name = json.name;
  OpalPackage.all_names[json.name] = this;
  
  // do we have files built in
  if (json.opal_files) {
    for (var i = 0; i < json.opal_files.length; i++) {
      var file = json.opal_files[i];
      var file_uri = this._uri.merge(file[0]).to_s();
      OPAL_FILES[file_uri] = file[2];
    }
  }
};

// we have our json, so load package_name.rb from our lib directory
OpalPackage.prototype.finish_loading = function(callback) {
  console.log("need to load:");
  var lib_file = this._uri.merge('lib/' + this.name() + '.rb');
  console.log(lib_file.to_s());
};

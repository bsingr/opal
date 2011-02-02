// Hash of module names to their implementation.
var MODULES = {};

// Used to register a single module
exports.module = function(module_name, module_body) {
  console.log('defining module ' + module_name);
};

// Used to register a package
exports.package = function() {

};

// External interface to require/run a module. This simply uses the internal
// require system, so a module will only ever be called once as per commonjs.
exports.require = function(module_name) {

};


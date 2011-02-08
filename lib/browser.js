// Browser loader.

var init = function() {
  require('./runtime');
  $opal.init();
  $opal.require = do_require;
};

/* 
 * Module system
 * =============
 *
 * Opal runtime implementes a basic version of the commonjs loading module system.
 * This is the implementation of it. The core library uses a basic system, just
 * enough to get opal to init(). All user code will then be loaded by this
 * system.
 */

// All modules. Hash of names => { exports, implementation, id }; id and
// implementation are set on module definitoon, but exports will be undefined
// until the module is loaded; so we check whether a module is loaded by simply
// checking the exports property - never load a module more than once.
var modules = {};
// tmp for debugging
exports.modules = modules;

// Public way to define a module. Opal.module('some/module/name', function(){})
exports.module = function(module_id, module_body) {
  var module = {
    id: module_id,
    implementation: module_body
  };
  modules[module_id] = module;
};

// global require statement. Good way to 'run' a ruby file. E.g., opalspecs
// calls Opal.run('opalspec/autorun_browser') in the browser to start
// running all the specs.
exports.require = function(module_id) {
  $opal.rb_run(function() {
    return do_require(module_id);
  });
};

// the actual require statement. The public ones wraps itself in an error
// reporter closure
var do_require = function(module_id) {
  var module = modules[module_id];

  if (!module) {
    throw new Error("cannot find module '" + module_id + "'");
  }

  if (module.exports) {
    return module.exports;
  }

  var exports = {};
  module.exports = exports;

  module.implementation(exports, function(){}, module);
  return module.exports;
};

init();


if (typeof Opal == 'undefined')
  Opal = {};

(function(global, exports, undefined) {
  var modules = {};

  var require = function(name) {
    if (require[name]) return require[name];
    var exports = {};
    modules[name](exports, modules[name]);
    require[name] = exports;
    return exports;
  };

  //global.modules = modules;
  //global.require = require;


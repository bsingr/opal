// Narwhal/commonjs specific behaviour

var narwhal_fs = require('file');

// Dir.getwd
var io_getwd = function() {
  return narwhal_fs.cwd();
};

// Dir.glob
var io_glob = function(glob) {
  return narwhal_fs.glob(glob);
};

// File.join
var io_join = function() {
  return narwhal_fs.join.apply(this, arguments);
};

// require
var io_require = function(path) {
  require(path);
};

var io_puts = function(str) {
  print(str);
};

var io_basename = function(str) {
  return narwhal_fs.basename(str);
};


exports.ruby_platform = "opal";

exports.ruby_version = "1.9.0";

// our main method for simply logging to the console. OpalLog from core, or
// self.log from ruby. All ruby objects will be able to access this (for puts).
var OpalLog = exports.log = function(str) {
  print("printing string here, actually");
  print(str);  
};

// // native require..
// exports.require = function(path) {
//   // OpalLog("need to require: " + path);
//   require(path);
// };

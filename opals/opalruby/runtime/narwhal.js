// Narwhal/commonjs specific behaviour

var narwhal_fs = require('file');

exports.IO = {
  
  getwd: function() {
    return narwhal_fs.cwd();
  }
};

exports.ruby_platform = "opal";

exports.ruby_version = "1.9.0";

// our main method for simply logging to the console. OpalLog from core, or
// self.log from ruby. All ruby objects will be able to access this (for puts).
var OpalLog = exports.log = function(str) {
  print(str);  
};

// Narwhal/commonjs specific behaviour

var node_path = require('path');
var node_glob = require('glob');
var node_fs = require('fs');

// Dir.getwd
var io_getwd = function() {
  // return narwhal_fs.cwd();
  return process.cwd();
};

var io_raw_glob = function(glob) {
  var all_parts = [];
  
  // console.log("globbing: " + glob);
  var parts = glob.split('**');
  // console.log(parts);
  // only if subsir..
  if (parts.length > 1) {
    // console.log("doing subdir");
    var sub_dirs = node_glob.globSync(parts[0] + '**/');
    // console.log("subdirs:");
    // console.log(sub_dirs);
    for (var i = 0; i < sub_dirs.length; i++) {
      all_parts = all_parts.concat(io_raw_glob(sub_dirs[i] + '**' + parts[1]));
    }
    all_parts = all_parts.concat(node_glob.globSync(parts[0] + parts[1].substr(1)));
  }
  else {
    all_parts = all_parts.concat(node_glob.globSync(glob));
  }
  
  
  // console.log(node_glob.globSync(parts[0] + '**/'));
  // return narwhal_fs.glob(glob);
  // console.log("result");
  // console.log(all_parts);
  return all_parts;
}

// Dir.glob
var io_glob = function(glob) {
  var globs = io_raw_glob(glob);
  // console.log("RESULT:");
  // console.log(globs);
  return globs;
};

// File.join
var io_join = function() {
  return node_path.join.apply(this, arguments);
  // return "";
};

// require
var io_require = function(path) {
  require(path);
};

// puts
var io_puts = function(str) {
  console.log(str);
};

// normal puts
var puts = function(str) {
  console.log(str);
};

// file exists? true/false
var io_file_exists = function(path) {
  var stats;
  
  try {
    stats = node_fs.statSync(path);
  }
  catch (e) {
    return false;
  }
  
  if (stats && !stats.isDirectory()) 
    return true;
  
  return false;
};

// extension name of given file
var io_extname = function(fname) {
  return node_path.extname(fname);
};

// read file into string
var io_read = function(fname) {
  return node_fs.readFileSync(fname);
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

/**
  Running on node platform
*/
(function(global, exports) {

var node_path = require('path');
var node_fs = require('fs');
var node_buffer = require('buffer');

/**
  Import all Opal defines, and bundle in runtime as well as development 
  (compiler, parser etc).
*/
#include "../opal.h"
#include "../runtime.js"
#include "../dev.js"

// node specific
// include 'file.js'
// include 'dir.js'
// include 'fs.js'

var Init_Platform = function() {
  console.log("Initing platform");
};

/**
  Make sure print is available
*/  
var print = function(str) {
  console.log(str)
}

/*
 * piggy back nodejs load paths
 */
var load_paths = require.paths;

/**
  Our platform
*/
var opal_ruby_platform = "opal";

/**
  start REPL session (node specific)
*/
exports.start_repl = function() {
  var Readline = require("readline");
  var read_stream = process.openStdin();
 
  var repl = Readline.createInterface(read_stream, process.stdout);
  repl.setPrompt(">> ");
  
  if (Readline.createInterface.length < 3) {
    read_stream.on("data", function(b) {
      repl.write(b);
    });
  }
  
  repl.on("close", function() {
    read_stream.destroy();
  });
  
  repl.on("line", function(b) {
    rb_run(function() {
      var code = exports.compile(b.toString());
      var func = new Function("self", "__FILE__", code);
      //var result = func(rb_top_self, "(irb)");
      var result = func(rb_top_self, '(irb)');
      
      print("=> " + CALL(result, "inspect"));
    });
    
    repl.prompt();
  });
  
  repl.prompt();
}

/**
  Check file exists
  
  @returns true or false
*/
function opal_file_exists(file) {
  // print("checking exists: " + file);
  // print(node_path.exists(file));
  return node_path.existsSync(file);
}

/**
  Open the file at the given path. This will return a fd if successfull. The fd
  should then be saved for accessing the file in future.
  
  @example
  
    opal_file_open("some/path/to/file.txt")
    # => 4
*/
function opal_file_open(path, flags, mode) {
  return node_fs.openSync(path, flags, mode);
}

/**
  Read from the file at the given fd
*/
function opal_file_read(fd, offset, length, position) {
  // print(Array.prototype.slice.call(arguments).join(", "));
  var buffer = new node_buffer.Buffer(4048);
  var read = node_fs.readSync(fd, buffer, offset, length, position || null);
  // print( buffer.toString('', 0, read));
  // print("returning");
  return buffer.toString('', 0, read);
};

/**
  Write data to the given fd
*/
function opal_file_write(fd, str, offset, length, position) {
  var buffer = new node_buffer.Buffer(str);
  var write = node_fs.writeSync(fd, buffer, offset, length, position || null);
  return write;
}

/**
  Close the file with the given fd. This will then stop the given file from 
  being read/write/access able. Returns file descriptor.
  
  @example
  
    opal_file_close(5)
    # => 5
*/
function opal_file_close(fd) {
  node_fs.closeSync(fd);
  return fd;
}

/**
  Current working directory
*/
function opal_getwd() {
	return process.cwd();
};

/**
  IS the given file path a directory? true or false
*/
function opal_file_is_directory(path) {
  try {
    return node_fs.statSync(path).isDirectory();
  } catch (e) {
    return false;
  }
}

/**
  Mkdir
*/
function opal_file_mkdir(path) {
  return node_fs.mkdirSync(path, 0777);
}

/**
  Array of all files in given dir
*/
function opal_file_list(path) {
  return node_fs.readdirSync(path);
}

/**
  need to remove.
*/
var io_puts = function(str) {
	print(str);
	return Qnil;
};

})(global, exports);

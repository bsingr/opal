/**
  Running on node platform
*/
(function(global, exports) {

var node_path = require('path');
var node_fs = require('fs');
var node_buffer = require('buffer');
  
/**
  Make sure print is available
*/  
var print = function(str) {
  console.log(str)
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
  need to remove.
*/
var io_puts = function(str) {
	print(str);
	return Qnil;
};


/**
  Import all Opal defines, and bundle in runtime as well as development 
  (compiler, parser etc).
*/
#include "../opal.h"
#include "../runtime.js"
#include "../dev.js"

})(global, exports);

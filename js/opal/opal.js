/**
  opal platform - stand alone runtime for node.
  =============================================
  
  A single JS file is built for this runtime, and both the runtime and dev files
  are bundled.
*/

(function(global, exports) {
  
/**
  Import all Opal defines, and bundle in runtime as well as development 
  (compiler, parser etc).
*/
#include "../opal.h"
#include "../runtime.js"
#include "../dev.js"


/**
  Open the file at the given path. This will return a fd if successfull. The fd
  should then be saved for accessing the file in future.
  
  @example
  
    opal_file_open("some/path/to/file.txt")
    # => 4
*/
function opal_file_open(path) {
  var fd = OpalFile.open(path, 0, 0666);
  return fd;
}

/**
  Close the file with the given fd. This will then stop the given file from 
  being read/write/access able. Returns file descriptor.
  
  @example
  
    opal_file_close(5)
    # => 5
*/
function opal_file_close(fd) {
  OpalFile.close(fd);
  return fd;
}

/**
  Checks if the given file/dir exists. Returns true or false.
*/
function opal_file_exists(path) {
  return OpalFile.exists(path);
}

/**
  Read the entire file at the given fd
*/
function opal_file_read(fd) {
	var str = OpalFile.read(fd, 0, 4048);
	return str;
};

/**
  Raw read given filename path
*/
function opal_read(path) {
  var fd = opal_file_open(path);
  var str = opal_file_read(fd);
  opal_file_close(fd);
  return str;
}

// FIXME: remove this! used for tmp readline
global.OpalIRB = function() {
	try {
		var res = exports.compile(IRBString);
		var func = new Function('self', '__FILE__', res);
	  // execute function (code)
		var obj;

		rb_run(function() {

	  print((obj = func(rb_top_self, '(irb)'), obj.$m.$inspect(obj, "inspect")));
		});
	}
	catch (e) {
		print('compile error');
		// for (var prop in e.stack) print(prop);
		// print(e.toString)
	}
};

// Returns the extension name of the given path. The extension must be in the
// last path component (i.e. so it is not found in ./bin/opal, for example)
var io_extname = function(path) {
	var idx = path.lastIndexOf('.');
	
	if (idx <= path.lastIndexOf('/'))
		return "";
	else
		return path.substring(idx);
};

// Join the given path components
// var io_join = function() {
	// return Array.prototype.slice.call(arguments).join('/');
// };

// Returns true if the given fname exists, false otherwise. Use native bridge.
// FIXME: remove this just in favor of file_exists below.
var io_file_exists = OpalFile.exists;

var io_expand_path = function(path, dir_string) {
	// print("path is: " + path);
	// print("cwd is: " + io_getwd());
	// print("dir string is: " + dir_string);
	
	var start_slash = (path[0] === "/");
	
	if (dir_string) 
		path = file_join(dir_string, path);
  else if (!start_slash)
		path = file_join(io_getwd(), path);

	// print("NEW PATH: " + path);

	var parts = path.split("/");
  var result = [];
  var part;
  for (var i = 0; i < parts.length; i++) {
    part = parts[i];
    switch (part) {
      case '..':
        result.pop();
        break;
      case '.':
        break;
      case '':
        break;
      default:
        result.push(part);
    }
  }
  
	// print("result is: " + result.join('/'));

  if (result[0] != "") {
    // if we started with a slash, use that
    return "/" + result.join("/");
  } else {
    // otherwise join with our current working dir
    // return file_join(io_getwd(), result.join("/"));
		return result.join("/");
  }
	// return path;
};

var io_getwd = function() {
	return OpalFile.cwd();
};


var io_puts = function(str) {
	print(str);
	return Qnil;
};

var file_is_directory = OpalFile.is_directory;

var file_is_file = OpalFile.is_file;

var file_size = OpalFile.size;

var file_mtime = OpalFile.mtime;

var file_list = OpalFile.list;

var file_exists = OpalFile.exists;

})(this, Opal);

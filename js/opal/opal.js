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
  File mode flags
*/
#define FMODE_READABLE  OpalFile.O_RDONLY
#define FMODE_READWRITE OpalFile.O_RDWR
#define FMODE_WRITABLE  OpalFile.O_WRONLY
#define FMODE_CREATE    OpalFile.O_CREAT
#define FMODE_APPEND    OpalFile.O_APPEND
#define FMODE_TRUNC     OpalFile.O_TRUNC

/**
  Convert mode flags (strings) to their correct numerical values
*/
function opal_mode_flag_for(mode) {
  if (typeof mode != 'string') return mode;
  
  switch (mode) {
    case "r":   return FMODE_READABLE;
    case "r+":  return FMODE_READWRITE;
    case "w":   return FMODE_WRITABLE | FMODE_CREATE | FMODE_TRUNC;
    case "w+":  return FMODE_READWRITE | FMODE_CREATE | FMORE_TRUNC;
    default: throw "Bad file mode flags (" + mode + ")";
  }
}

/**
  Open the file at the given path. This will return a fd if successfull. The fd
  should then be saved for accessing the file in future.
  
  @example
  
    opal_file_open("some/path/to/file.txt")
    # => 4
*/
function opal_file_open(path, flags, mode) {
  flags = opal_mode_flag_for(flags == undefined ? 'r' : flags);
  
  var fd = OpalFile.open(path, flags, 0666);
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
  Read from the file at the given fd
*/
function opal_file_read(fd, offset, length, position) {
	var str = OpalFile.read(fd, offset, length, position);
	return str;
};

/**
  Write to the given fd
*/
function opal_file_write(fd, str, offset, length, position) {
  var len = OpalFile.write(fd, str, offset, length, position);
  return len;
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

function opal_getwd() {
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

})(this, Opal);

// v8 compatibiloity for running opalv8

// c++ API gives us:
// 	OpalFile
// 		.open(path, flags, perms)
// 
// 	OpalIO
// 


// FIXME: remove this! used for tmp readline
global.OpalIRB = function() {
	try {
		var res = exports.compile(IRBString);
		var func = new Function('self', '__FILE__', res);
	  // execute function (code)
		var obj;

		rb_run(function() {

	  	print((obj = func(rb_top_self, '(irb)'), obj.$m.$inspect(obj, rb_nil)));
		});
	}
	catch (e) {
		print('compile error');
		// for (var prop in e.stack) print(prop);
		// print(e.toString)
	}
};

// var opal_file_read
var opal_file_read = function(path) {
	var fd = OpalFile.open(path, 0, 0666);
	var str = OpalFile.read(fd, 0, 4048);
	OpalFile.close(fd);
	
	print("read file :" + path);
	// return "path fd is: " + fd;
	return str;
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

// Simple read of the given file
var io_read = function(path) {
	return opal_file_read(path);
};

var io_expand_path = function(path, dir_string) {
	var start_slash = (path[0] === "/");
	if (dir_string) path = file_join(dir_string, path);
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
  
  if (start_slash) {
    // if we started with a slash, use that
    return "/" + result.join("/");
  } else {
    // otherwise join with our current working dir
    return file_join(io_getwd(), result.join("/"));
		// return result.join("/");
  }
	// return path;
};

var io_getwd = function() {
	return OpalFile.cwd();
};


var io_puts = function(str) {
	print(str);
	return rb_nil;
};

var file_is_directory = OpalFile.is_directory;

var file_is_file = OpalFile.is_file;

var file_size = OpalFile.size;

var file_mtime = OpalFile.mtime;

var file_list = OpalFile.list;

var file_exists = OpalFile.exists;
// v8 compatibiloity for running opalv8

// c++ API gives us:
// 	OpalFile
// 		.open(path, flags, perms)
// 
// 	OpalIO
// 

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
var io_join = function() {
	return Array.prototype.slice.call(arguments).join('/');
};

// Returns true if the given fname exists, false otherwise. Use native bridge.
var io_file_exists = OpalFile.exists;

// Simple read of the given file
var io_read = function(path) {
	return opal_file_read(path);
};

var io_expand_path = function(path) {
	return path;
};

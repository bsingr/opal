// file.js
// =======
// 
// Dealing with files etc. Used for ALL environments (opal, narwhal, node,
// browser). Also some dir methods (as appropriate).
// 

// FIXME: these three should depend on whether we are running on windows or not.
// Windows uses backslashes instead..
var FILE_SEPARATOR 		= '/',
		FILE_ALT_SEPARATOR	=	'';

var file_split = function(fname) {
	var parts = fname.split(FILE_SEPARATOR);
	
	return parts;
};

var file_is_absolute = function(fname) {
	var parts = file_split(fname);
	
	if (parts.length == 0 || parts[0] !== "")
		return false;
	
	return true;
};

var file_is_relative = function(fname) {
	return !file_is_absolute(fname);
};

var file_join = function() {
	return Array.prototype.slice.call(arguments).join(FILE_SEPARATOR);
};

var file_dirname = function(path) {
	var parts = file_split(path);
	parts.pop();
	return file_join.apply(this, parts) || '.';
};

// Initialize core File (and Dir) classes with some bootstrap methods.
var InitFile = function() {
	// @class File
	rb_cFile = rb_define_class('File', rb_cObject);
	
	// VM methods for core file access.
	rb_define_singleton_method(rb_cFile, '__join__', rb_cFile_join);
	rb_define_singleton_method(rb_cFile, '__dirname__', rb_cFile_dirname);
	rb_define_singleton_method(rb_cFile, '__expand_path__', rb_cFile_expand_path);
	
	// @class Dir
	rb_cDir = rb_define_class('Dir', rb_cObject);
	
	// VM methods for Dir access
	rb_define_singleton_method(rb_cDir, '__getwd__', rb_cDir_getwd);
	rb_define_singleton_method(rb_cDir, '__glob__', rb_cDir_glob);
};

// All methods used from here are methods for the File class to use directly

// File#__join__
var rb_cFile_join = function(self, block) {
	var parts = Array.prototype.slice.call(arguments, 2);
	return file_join.apply(null, parts);
};

// File#__dirname__
var rb_cFile_dirname = function(self, block, path) {
	return file_dirname(path);
};

// File#__expand_path__
var rb_cFile_expand_path = function(self, block, path) {
	return io_expand_path(path);
};

// Dir#__getwd__
var rb_cDir_getwd = function(self, block) {
	return io_getwd();
};

// Dir.__glob__
var rb_cDir_glob = function(self, block) {
	return [];
};

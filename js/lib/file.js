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

file_list_tree = function(path) {
	var result = [];
	var children = file_list(path);
	
	for (var i = 0; i < children.length; i++) {
		var child_path = file_join(path, children[i]);
		// print("child_path: " + child_path);
		result.push(child_path);
		if (file_is_directory(child_path)) {
			// print("-- directory");
			var child_tree = file_list_tree(child_path);
			for (var j = 0; j <  child_tree.length; j++) {
				// print("child_tree_path: " + child_tree[j]);
				// result.push(file_join(child_path, child_tree[j]));
				result.push(child_tree[j]);
			}
		}
	}
	
	return result;
};

// FIXME: this is slow and very hacky
var file_glob = function(pattern, flags) {
	var parts = pattern.split(new RegExp(FILE_SEPARATOR + '+'));
	var glob_paths;
		
	if (file_is_absolute(pattern)) {
			glob_paths = ['/'];
			parts.shift();
		} else {
			glob_paths = ['.'];
		}
		
		for (var i = 0; i < parts.length; i++) {
			var part = parts[i];
			// print("doing " + part);
			
			if (part == '**') {
				var new_path = [];
				for (var idx = 0; idx < glob_paths.length; idx++) {
					if (file_is_directory(glob_paths[idx])) {
						var new_path_candidate = file_list_tree(glob_paths[idx]);
						// print("new path cdidiate is: " + new_path_candidate.join(', '));
						// new_path.push(file_join())
						for (var j = 0; j < new_path_candidate.length; j++) {
							new_path.push(new_path_candidate[j]);
						}
					}
				}
				
				glob_paths = new_path;
			} else if(/\*/.test(part)) {
				var new_path = [], regexp = file_glob_build_regexp(part);
				// print('using regexp: ' + regexp);
				for (var idx = 0; idx < glob_paths.length; idx++) {
					if (file_is_directory(glob_paths[idx])) {
						// need to do list..
						var children = file_list(glob_paths[idx]);
						for (var j = 0; j < children.length; j++) {
							if (regexp.test(children[j])) {
								new_path.push(file_join(glob_paths[idx], children[j]));
							}
						}
					} else {
						if (regexp.test(glob_paths[idx])) {
							new_path.push(glob_paths[idx]);
						}
					}
					// print('testing: ' + glob_paths[idx]);
					// if (regexp.test(glob_paths[idx])) {
						// new_path.push(glob_paths[idx]);
					// }
				}
				glob_paths = new_path;
				// print("testing part.. " + part);
				// print("regexp is: " + file_glob_build_regexp(part));
			} else {
				var new_path = [];
				for (var idx = 0; idx < glob_paths.length; idx ++) {
					var new_path_candidate = file_join(glob_paths[idx], part);
					if (file_exists(new_path_candidate)) {
						new_path.push(new_path_candidate);
					}
				}
				// print("new paths: " + new_path.join(', '));
				glob_paths = new_path;
			}
		}
		
		var seen = {}, result = [], current, current_parts;
		
		for (var i = 0; i < glob_paths.length; i++) {
			current = glob_paths[i];
			
			if (seen[current]) continue;
			
			current_parts = current.split(FILE_SEPARATOR);
			
			if (current_parts[0] == '.') current_parts.shift();
			
			result.push(current_parts.join(FILE_SEPARATOR));
			// push original!!
			seen[current] = current;
		}
		
		return result;
};

var file_glob_build_regexp = function(pattern, flags) {
	return new RegExp('^' + pattern.replace('.', '\\.').split('*').join('.*') + '$');
};

// Initialize core File (and Dir) classes with some bootstrap methods.
var InitFile = function() {
	// @class File
	rb_cFile = rb_define_class('File', rb_cObject);
	
	// VM methods for core file access.
	rb_define_singleton_method(rb_cFile, '__join__', rb_cFile_join);
	rb_define_singleton_method(rb_cFile, '__dirname__', rb_cFile_dirname);
	rb_define_singleton_method(rb_cFile, '__expand_path__', rb_cFile_expand_path);
	rb_define_singleton_method(rb_cFile, '__exists__', rb_cFile_exists);
	rb_define_singleton_method(rb_cFile, '__read__', rb_cFile_read);
	
	// @class Dir
	rb_cDir = rb_define_class('Dir', rb_cObject);
	
	// VM methods for Dir access
	rb_define_singleton_method(rb_cDir, '__getwd__', rb_cDir_getwd);
	rb_define_singleton_method(rb_cDir, '__glob__', rb_cDir_glob);
};

// All methods used from here are methods for the File class to use directly

// File#__join__
var rb_cFile_join = function(self) {
	var parts = Array.prototype.slice.call(arguments, 1);
	return file_join.apply(null, parts);
};

// File#__dirname__
var rb_cFile_dirname = function(self, path) {
	return file_dirname(path);
};

// File#__expand_path__
var rb_cFile_expand_path = function(self, path, dir_string) {
	return io_expand_path(path, dir_string);
};

// File.__exists__
var rb_cFile_exists = function(self, path) {
	return file_exists(path) ? Qtrue : Qfalse;
};

// File.__read__
var rb_cFile_read = function(self, path) {
	if (file_exists(path)) {
		return opal_file_read(path);
	}
	else {
		rb_raise(rb_eRuntimeError, "No such file to load - " + path);
	}
}

// Dir#__getwd__
var rb_cDir_getwd = function(self) {
	return io_getwd();
};

// Dir.__glob__
var rb_cDir_glob = function(self, glob) {
	return file_glob(glob);
};


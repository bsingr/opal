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

/**
  Internel mathod for joining parts of a path by system separator.
*/
function rb_file_join() {
	return Array.prototype.slice.call(arguments).join(FILE_SEPARATOR);
};

/**
  Internal method for getting dirname of the given path
*/
function rb_file_dirname(path) {
	var parts = file_split(path);
	parts.pop();
	return rb_file_join.apply(this, parts) || '.';
};

/**
  Internel method for expanding paths
*/
function rb_expand_path(path, dir_string) {
	var start_slash = (path[0] === "/");
	
	if (dir_string) 
		path = rb_file_join(dir_string, path);
  else if (!start_slash)
		path = rb_file_join(opal_getwd(), path);

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
  

  if (result[0] != "") {
    // if we started with a slash, use that
    return "/" + result.join("/");
  } else {
    // otherwise join with our current working dir
		return result.join("/");
  }
};

/**
  Returns the extension name of the given path. The extension must be in the
  last path component (i.e. so it is not found in ./bin/opal, for example)
*/
function rb_file_extname(path) {
	var idx = path.lastIndexOf('.');
	
	if (idx <= path.lastIndexOf('/'))
		return "";
	else
		return path.substring(idx);
};

file_list_tree = function(path) {
	var result = [];
	var children = file_list(path);
	
	for (var i = 0; i < children.length; i++) {
		var child_path = rb_file_join(path, children[i]);
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
								new_path.push(rb_file_join(glob_paths[idx], children[j]));
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
					var new_path_candidate = rb_file_join(glob_paths[idx], part);
					if (opal_file_exists(new_path_candidate)) {
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

/**
  File.join(string, ...)    # => path
  
  Returns a new string formed by joining all arguments using SEPARATOR.
*/
function file_s_join(self, mid) {
	var parts = Array.prototype.slice.call(arguments, 2);
	return rb_file_join.apply(null, parts);
};

/**
  Returns all components of the filename given in `file_name` except last
  one. The filename must be formed using forward slashed ("/") regardless of
  the separator used on the local filesystem.

  @example
    File.dirname "home/adam/work/ruby.rb"
    # => "/home/adam/work"

  @param [String] path
  @return [String]
*/
function file_s_dirname(klass, mid, path) {
  return rb_file_dirname(path);
}

/**
  Expand the given path
*/
function file_s_expand_path(klass, mid, path, dir_string) {
  return rb_expand_path(path, dir_string);
}

// File.__exists__
function file_s_exists_p(self, mid, path) {
	return opal_file_exists(path) ? Qtrue : Qfalse;
};

// Initialize core File (and Dir) classes with some bootstrap methods.
function Init_File() {
	// @class File
	rb_cFile = rb_define_class("File", rb_cIO);
	
	// VM methods for core file access.
	rb_define_singleton_method(rb_cFile, 'join', file_s_join);
	rb_define_singleton_method(rb_cFile, 'dirname', file_s_dirname);
	rb_define_singleton_method(rb_cFile, 'expand_path', file_s_expand_path);
	rb_define_singleton_method(rb_cFile, "exists?", file_s_exists_p);
	
};


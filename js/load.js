// NEW - we piggy back nodejs loading system....yay!

// basically just wrap require(). should we try/catch to make a nicer ruby
// error? probably..
//
// Also, this will return Qtrue or Qfalse - it will not return the exports
// as we cant do anything with them...maybe obj_require should return true
// and this should retunr the exports so that opal libraries can use them.
// ..
var rb_require = function(fname) {
  console.log("trying to require: " + fname);
  require(fname);
  return Qtrue;
};













// OLD


// All extensions that are loadable. Currently only 'rb' and 'js' are supported.
// Loaders register their extension and their factory function which should take
// a single argument: fname. This is the filename (already assured to exist),
// and the loader will need to load that file. Loaders do not need to worry 
// about making sure files are not included twice, this will be done before 
// the factories are actually called.
// 
// @local
var extensions = {};

// Load paths. All load paths are stored here. They are enumerated when looking
// for require() files, with each extension (from above) being checked in order.
// Note, first match is always used.
// 
// @local
var load_paths = [];

rb_load_paths = load_paths;

/**
  Ruby loader. This will load raw ruby code (compile => run)
*/
extensions[".rb"] = function(fname) {
  // get file content
  var content = rb_read_file(fname).toString();
  // compile ruby
  var code = exports.compile(content);
  // print('#################################################################');
  console.log(code);
  // function prototype. we only pass filename as argument.
  var func = new Function(code);
  // execute function (code)
	
	// print("===== loading at " + fname);
	print(rb_expand_path(fname));
	// print("!!!!!");

  func.call(rb_top_self);  
};

/**
  Javascript loader. This will just raw eval the given javascript (wrapped in a
  closure).
*/
extensions[".js"] = function(fname) {
  
};

// All files that have already been loaded: we do not want to load a file more
// than once. This is a fully path (path + extension). Key is the filename, and
// value is the relative feature.
var loaded_filenames = {};

// All features that have been loaded. These are qualified from their load_path
// onwards, so for '/Users/adam/lib/a/b.rb', we use 'a/b.rb'
var loaded_features = [];

// Main way to require a file. This is the method that can be used from ruby or
// from javascript directly.
// 
// @local
//var rb_require = function(fname) {
//  var resolved = resolve_require_filename(fname);
  
  // if we have already loaded the file, return false.. (no error)
//  if (loaded_filenames[resolved[0]]) return Qfalse;
  // we have not loaded the file, so load it
//  loaded_filenames[resolved[0]] = resolved[1];
//  loaded_features.push(resolved[1]);
  // get the correct extension
//  var ext_name = rb_file_extname(resolved[0]);
//  extensions[ext_name](resolved[0]);
//  return Qtrue;
//};

// Find correct filename for the given fname path
// 
// @returns [full_path, feature_path]
var resolve_require_filename = function(fname) {
  var resolved = find_require_filename(fname);
  if (!resolved) {
    // could not find a file, so LoadError..
    rb_raise(rb_eLoadError, 'no such file to load -- ' + fname);
  }
  
  return resolved;
};

// Find the filename to use for the require (do not actually require it!!), or
// return false if one cannot be found. To do this, loop over each load_path,
// and with each registered extension, using the given fname.
var find_require_filename = function(fname) {
  // current path to lookup
  var cur_path, given_ext = rb_file_extname(fname);
  // loop over each load_path
  for (var path_idx = 0; path_idx < load_paths.length; path_idx++) {
    // if we were given an extension, dont loop through, just use that
    if (given_ext) {
      cur_path = rb_file_join(load_paths[path_idx], fname + ext_name);
      
      if (opal_file_exists(cur_path)) {
        return [cur_path, cur_path];
      }
    }
    else {
      // loop over each extension
      for (var ext_name in extensions) {
        cur_path = rb_file_join(load_paths[path_idx], fname + ext_name);

        if (opal_file_exists(cur_path))
          // cur_path is our file to load!!
          return [cur_path, fname + ext_name];
      }
    }
  }
  
  // try full path..
  // FIXME: this doesnt support windows paths, and doesnt check the extension
  // name!!
  if (fname[0] === '/') {
    // if we have an extension..
    if (given_ext) {
      if (opal_file_exists(fname)) {
        return [fname, fname];
      }
    }
    // otherwise loop over all extensions..
    else {
      for (var ext_name in extensions) {
        cur_path = fname + ext_name;
        
        if (opal_file_exists(cur_path)) {
          return [cur_path, cur_path];
        }
      }
    }
  }
  
  // could not find a path to load
  return false;
};

// gets the load path
// @local
var load_path_getter = function(id) {
  return load_paths;
};

// gets laoded features
var loaded_feature_getter = function(id) {
  return loaded_features;
};

var Init_Load = function() {
  //print("adding load path:" + exports.opal_lib_path);
  // add core libs to load_paths
  load_paths.unshift(exports.opal_lib_path);
  
rb_define_hooked_variable('$:', load_path_getter, rb_gvar_readonly_setter);
rb_define_hooked_variable("$LOAD_PATH", load_path_getter, rb_gvar_readonly_setter);
rb_define_hooked_variable('$"', loaded_feature_getter, rb_gvar_readonly_setter);

	//rb_const_set(rb_cObject, 'ARGV', init_argv);
};

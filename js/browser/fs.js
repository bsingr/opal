/**
  Loading libs and gems etc. This is where loading and registering takes place
  to "pretend" that we can load files. We refer to this as our filesystem, fake
  it may be
*/

/**
  Replaced ruby loader. In the browser our ruby loader will be loading a
  precompiled set of ruby code, so we can just load it as a regular piece of
  javascript
*/
var fs_replaced_ruby_loader = function(fname) {
  // get file content
  print("need to execute ruby loader for " + fname);
  FS_FILES[fname](rb_top_self, fname);
};

/**
  Init_BrowserFS will set these. These will all act as file paths (i.e. http etc
  will not be included in path as expand_path etc will just remove them anyway)
*/
var FS_PAGE_URI   = null; // OpalURI object for web page
var FS_OPALS_PATH = null; // String path to opals (page_dir/opals)
var FS_LIB_PATH   = null; // String path to libs (page_dir/lib)
var FS_CWD        = null; // String path to cwd (page_dir/main_opal)

/**
  All bin files (defined within opals/gems). Keys are the bin name, and the
  value is the full path to bin name. This full path is calculated given the url
  etc, e.g.:
  
  {
    "spec": "http://localhost/my_app/opals/ospec/bin/spec",
    "vienna": "http://localhost/my_app/opals/vienna/bin/vienna"
  }
*/
FS_BIN_FILES = {};

/**
  All opals we get given (save them)
*/
var FS_REGISTERED_OPALS = [];

/**
  All files. Keys are full file path, value are files content (might be function
  depending on content).
*/
FS_FILES = {};

/**
  Register a gem. Might be called more than once per gem (e.g. register core
  gem, then register test files, then register image resources etc)
  
  @param [JSONObject] opal_specification
*/
exports.register_opal = function(opal_specification) {
  // we just save each defined opal, in order, and they are dealt with on page
  // load
  FS_REGISTERED_OPALS.push(opal_specification);
}

/**
  Working directory
*/
function opal_getwd() {
  return FS_CWD;
}

/**
  Check file exists.
  
  For the browser we manually need to check the exact given path, and then need
  to check the file by joining it to the working directory (for relative path)
  
  @returns true or false
*/
function opal_file_exists(file) {
  print("checking file exists: " + file);
  if (FS_FILES.hasOwnProperty(file)) { // absolute
    return true
  } else { // relative
    var try_path = rb_file_join(opal_getwd(), file);
    print("cjhecking " + try_path);
    if (FS_FILES.hasOwnProperty(try_path))
      return true;
    
    return false;
  }
}

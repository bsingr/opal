
// All functionality here is not run in the browser.. it is just loaded in the 
// ruby env (in opal etc), so replicates all the methods from browser.js

// load the raw file, given as a function imolementation as the given filename
// 
// @param [String] filename
// @param [Function] implementation
exports.load_raw_file = function(filename, implementation) {
  // console.log("running " + filename);
  return implementation.apply(exports.top_self);
};

// Are we ever going to load browser opal? in case we do
exports.setDocumentReadyListener = function(callback) {

};

exports.getwd = __opal_fs_access.getwd();

// require the file at the given path: we have already checked it exists - mark
// as being required - execute in context of top_self
// 
// params function(__FILE__) { .. }
var file_require_path = function(path) {
  // console.log("requiring " + path);
  var f = file_list[path];
  f.opal_required = true;
  return f.apply(exports.top_self, [path]);
};

exports.require = function(orig_path) {
  if(__opal_fs_access.require(orig_path)) {
    return vnTrue;
  } else {
    throw "cannot find require: " + orig_path;
  };
};

exports.glob_files = function(glob) {
  return __opal_fs_access.glob(glob);
};

exports.ruby_platform = "opal";

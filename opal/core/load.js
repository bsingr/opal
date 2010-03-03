/* 
 * load.js
 * opal
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
/**
  Array of the loadpaths - i.e. where to look for 'require()' statements
*/
var ruby_loadpath;

/**
  load path initialization
*/
function ruby_init_loadpath() {
  ruby_loadpath = [""];
};

/**
  Add path to the loadpaths array
*/
function ruby_incpush(path) {
  ruby_loadpath.push(path);
};

/**
  Actually do a require with the given filename.
  
  Already checked file exists, and we pass the raw filename which is already in
  the vn_fs_path_hash. This method marks the file as being already required and
  will then exectute the file, by putting it to the top of the vm.
*/
function rb_require_file(file_path) {
  var f = opal_files[file_path];
  if (f.included) {
    // already included
    return;
  }
  else {
    f.included = true;
    f.content(opal_top_self);
    // console.log(f.content);
    // if (window.execScript) {
      // return window.execScript(f.content);
    // }
    // else {
      // with (window) {
        // return eval(f.content);
      // }
    // }
  }
};

/**
  Main entry point for a require statement.
*/
function rb_f_require(obj, id, _, path) {
  path = rb_file_s_expand_path(1, [path], nil);
  // the file this was called from (basically last but one sf)
  // var called_from_file = rb_top_vm.cfs[rb_top_vm.cfs.length - 2].iseq[3];
  var correct_path;
  // console.log("want to require: " + path + '.rb');
  // find the file..
  var found = rb_find_require_path(path);
  if (found === nil) {
    // throw "cannot find require: " + path;
    rb_raise(rb_eLoadError, "no such file to load -- " + path);
  }
  else {
    // console.log(found);
    rb_require_file(found);
    return true;
  }
};

/**
  find a require statement path. Returns the full path, or nil if not found.
*/
function rb_find_require_path(path) {
  var try_path;
  for (var i = 0; i < ruby_loadpath.length; i++) {
    // try base
    try_path = ruby_loadpath[i] + path + '.rb';
    if (opal_files[try_path]) {
      return try_path;
    }
    // try without .rb extension incase we included it in path
    try_path = ruby_loadpath[i] + path;
    if (opal_files[try_path]) {
      return try_path;
    }
  }
  return nil;
};

/**
  load root path - only called from js
*/
function rb_loadpath(path) {
  var found = rb_find_require_path(path);
  if (found === nil) {
    throw "cannot find require: " + path + ", called from " + called_from_file;
  }
  else {
    rb_require_file(found);
    return true;
  }
};

/**
  Load, parse, eval the given text using the filename provided
*/
function rb_eval_raw(str, filename) {
  var parser = vn_parser(filename, str);
  var iseq = parser.parse();
  console.log(iseq);
  rb_iseq_eval(iseq);
};

function Init_load() {
  // require
  rb_define_method(rb_cBasicObject, "require", rb_f_require, 1);
  // rb_define_global_variable("$:", // ruby_loadpath);
};

/* 
 * load.js
 * cappruby
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
  an array of all loadpaths to use
*/
rb_loadpath = [];

/**
  Add path to loadpath array
*/
function ruby_incpush(path) {
  rb_loadpath.push(path);
};

/**
  Array of file paths already included
*/
rb_required_files = [];

/**
  Kernel#require:(path)
*/
function rb_f_require(self, cls, path) {
  path = rb_file_s_expand_path(cls, '', path);
  // console.log(path);
  var found = rb_find_require_path(path);
  if (found === nil) {
    throw "require: cannot find path " + path
  }
  else {
    rb_require_file(found);
  }
  return true;
};

function rb_find_require_path(path) {
  var try_path;
  for (var i = 0; i < rb_loadpath.length; i++) {
    // try with .rb extension
    try_path = rb_loadpath[i] + path + '.rb';
    // console.log(try_path);
    if (objj_files[try_path]) {
      return try_path;
    }
    
    // try without .rb extension
    try_path = rb_loadpath[i] + path;
    // console.log(try_path);
    if (objj_files[try_path]) {
      return try_path;
    }
  }
  
  return nil;
};

/**
  Require the known good file path, path.
*/
function rb_require_file(path) {
  objj_import(path, true, function(){});
  // if (rb_required_files[path]) {
    // console.log("already required " + path);
  // }
  // else {
    // rb_required_files[path] = true;
    // cappruby_file_hash[path](cappruby_top_self);
  // }
};

function Init_Load() {
  // loadpaths
  ruby_incpush("");
  ruby_incpush("lib/");
  ruby_incpush('Frameworks/CappRuby/lib/');
  
  rb_define_method(rb_mKernel, "require:", rb_f_require, 1);
};

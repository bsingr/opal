/* 
 * file.js
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
  @class File
  @super Object
  
  File.
*/
var rb_cFile;

function opal_file() {
  this.content = "";
  this.path = "";
  this.included = false;
  this.klass = rb_cFile;
};

/**
  Base object to store file/dir directory structure
  
  Vienna FileSystem Root ("/")
  
  Every entry has:
    . as a self referring link to current dir
    .. as a link to the parent dir
    $ holds the current dirname (not whole path, just node name)
    
    every other entry is then a file (child) belonging to the directory.
    Objects as childs represent directories, where as a string refers to a
    file, where the string content is the file content.
    
    Directory names do not include a path seperator, and cannot be 0 length.
    0 length is reserved for root directory.
*/
var vn_fs_root = {};
// roots' parent directory points to itself, only exception to rule.
vn_fs_root[".."] = vn_fs_root["."] = vn_fs_root;
vn_fs_root['$'] = "";

/**
  Object/hash, from full file/dir names to either the file contents, for files,
  or the directory structure, for directories. Makes accessing explicit file
  paths easier, instead of splitting the path and manually going through the
  tree, e.g:
  
  ...
  /vendor/vienna/lib/models => [Object object]
  /vendor/vienna/lib/views/button.rb => "class Button < Control ... end"
  ...
*/
var opal_files = {
  "/": vn_fs_root
};

/**
  define a new file by filename (f), and filecontent (c)
*/
function vn_fs_define_file(f, content) {
  var file = new opal_file();
  file.content = content;
  file.path = f;
  opal_files[f] = file;
  var p = f.split("/");
  var i, c = vn_fs_root, b;
  // for each path segment, except first (which will be empty) and
  // last, which will be a file, so treat differently
  for (i = 1; i < p.length - 1; i++) {
    b = p[i];
    if (c[b] === undefined) {
      c[b] = { };
      c[b]['.'] = c[b];
      c[b]['..'] = c;
      c[b]['$'] = b;
    }
    c = c[b];
  }
  c[p[p.length - 1]] = content;
  return file;
};


function rb_file_s_dirname(cls, id, _, dirname) {
  return dirname.substr(0, dirname.lastIndexOf('/'));
  // return "/dirname";
};

function rb_file_s_join(cls, id, _) {
  return Array.prototype.slice.call(arguments, 3).join("/");
};

function rb_file_s_expand_path(argc, args, obj) {
  var res_stack = [], cur;
  args = args[0].split("/")
  for (var i = 0; i < args.length; i++) {
    cur = args[i];
    if (cur == '..') {
      res_stack.pop();
    }
    else if (cur == '.' || cur == '') {
      // do nothing
    }
    else {
      res_stack.push(cur);
    }
  }
  return res_stack.join("/");
};

function Init_File() {
  rb_cFile = rb_define_class("File", rb_cObject);
};


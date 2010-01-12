/* 
 * dir.js
 * vienna
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

var rb_cDir;

// glob
// /^\/app\/.*\/charles\/[^\/]*\.rb$/
//   \/app\/.*\/[^\/]*\.rb
function rb_dir_s_glob(argc, argv, dir) {
  if (argc > 1) throw "unsupported Dir.glob.. FIXME"
  
  var result = [], eof = false;
  
  var scanner = new vn_ruby_string_scanner(argv[0]);
  while (!eof) {
    // ** does not HAVE to include a dir, so capture **/ to match .* which will
    // match a dir, or no dir.. allows both to work together.
    if (scanner.scan(/^\*\*\//)) {
      result.push('.*');
    }
    else if (scanner.scan(/^\*\*/)) {
      result.push('.*');
    }
    else if (scanner.scan(/^\//)) {
      result.push('\\/');
    }
    else if (scanner.scan(/^\*/)) {
      result.push('[^\\/]*');
    }
    else if (scanner.scan(/^[a-zA-Z_]+/)) {
      result.push(scanner.matched);
    }
    else if (scanner.scan(/^\./)) {
      result.push('\\.');
    }
    else {
      eof = true;
    }
    // if (result.length > 108)
    // throw result.join("") + scanner.peek(10);
  }
  
  var reg =  new RegExp('^' + result.join("") + '$');
  var matching = [];
  for (prop in vn_fs_path_hash) {
    if (reg.exec(prop)) {
      matching.push(prop);
    }
  }
  return matching;
}

function Init_Dir() {
  
  rb_cDir = rb_define_class("Dir", rb_cObject);
  // rb_include_module(rb_cDir, rb_mEnumerable);
  
  // rb_define_alloc_func(rb_cDir, rb_dir_s_alloc);
  // rb_define_singleton_method(rb_cDir, "open", rb_dir_s_open, -1);
  // rb_define_singleton_method(rb_cDir, "foreach", rb_dir_foreach, -1);
  // rb_define_singleton_method(rb_cDir, "entries", rb_dir_entries, -1);
  // 
  // rb_define_method(rb_cDir,"initialize", rb_dir_initialize, -1);
  // rb_define_method(rb_cDir,"path", rb_dir_path, 0);
  // rb_define_method(rb_cDir,"inspect", rb_dir_inspect, 0);
  // rb_define_method(rb_cDir,"read", rb_dir_read, 0);
  // rb_define_method(rb_cDir,"each", rb_dir_each, 0);
  // rb_define_method(rb_cDir,"rewind", rb_dir_rewind, 0);
  // rb_define_method(rb_cDir,"tell", rb_dir_tell, 0);
  // rb_define_method(rb_cDir,"seek", rb_dir_seek, 1);
  // rb_define_method(rb_cDir,"pos", rb_dir_tell, 0);
  // rb_define_method(rb_cDir,"pos=", rb_dir_set_pos, 1);
  // rb_define_method(rb_cDir,"close", rb_dir_close, 0);
  // 
  // rb_define_singleton_method(rb_cDir,"chdir", rb_dir_s_chdir, -1);
  // rb_define_singleton_method(rb_cDir,"getwd", rb_dir_s_getwd, 0);
  // rb_define_singleton_method(rb_cDir,"pwd", rb_dir_s_getwd, 0);
  // rb_define_singleton_method(rb_cDir,"chroot", rb_dir_s_chroot, 1);
  // rb_define_singleton_method(rb_cDir,"mkdir", rb_dir_s_mkdir, -1);
  // rb_define_singleton_method(rb_cDir,"rmdir", rb_dir_s_rmdir, 1);
  // rb_define_singleton_method(rb_cDir,"delete", rb_dir_s_rmdir, 1);
  // rb_define_singleton_method(rb_cDir,"unlink", rb_dir_s_rmdir, 1);
  // 
  rb_define_singleton_method(rb_cDir,"glob", rb_dir_s_glob, -1);
  // rb_define_singleton_method(rb_cDir,"[]", rb_dir_s_aref, -1);
  // rb_define_singleton_method(rb_cDir,"exist?", rb_file_directory_p, 1);
  // rb_define_singleton_method(rb_cDir,"exists?", rb_file_directory_p, 1);
  // 
  // rb_define_singleton_method(rb_cFile,"fnmatch", rb_file_s_fnmatch, -1);
  // rb_define_singleton_method(rb_cFile,"fnmatch?", rb_file_s_fnmatch, -1);
}
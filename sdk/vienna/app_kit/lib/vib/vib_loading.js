/* 
 * vib_loading.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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
 
// Faster to do all this is in JS seeing as we are dealing with raw JSON objects
function vn_vib_load_bang(self, _cmd) {
  rb_ivar_set(self, '@top_level_objects', []);
  rb_ivar_set(self, '@connections', []);
  // console.log("laoding!!!");
  var top_level = rb_funcall(self, 'decode_object', 'root_objects');
};

function vn_vib_decode_object(self, _cmd, key) {
  key = rb_funcall(key, 'to_s');
  
};

var vib_class = rb_cObject.$iv_tbl.Vienna.$iv_tbl.Vib;

rb_define_method(vib_class, 'load!', vn_vib_load_bang);
rb_define_method(vib_class, 'decode_object', vn_vib_decode_object);

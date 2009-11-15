/* 
 * bundle.js
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

// Bundles are 'borrowed' to offer some of the capabilities associated with
// app development. Seeing as vienna is mainly tailored to be compatible
// with appkit etc, it makes sense to offer bundles as a feature rather than
// working around them. Every framework, bundle etc must conform to the 
// bundle setup.
// 
// Message Flow: (per bundle), example for 'AppKit'
// 
//  rb_funcall(vn_cBundle, 'begin_new_bundle', 'AppKit');
//  rb_funcall(vn_cBundle, 'set_info_dictionary_for_current_bundle', '{"version": "1.0"...[snip]...}');
//  
//  ... add each resource (data uri's of images, vib files, other .json resources, .yml resources in json format)
// 
//  ... bundle code goes here... any classes defined will be associated with the given bundle

var vn_cBundle = rb_define_class('Bundle', rb_cObject);

var vn_current_bundle = null;
var vn_all_bundles = []

function vn_bundle_add_class_to_current_bundle(self, _cmd, klass) {
  if (!RTEST(rb_ivar_get(self, '@current_bundle'))) {
    // console.log('skipping: no current bundle for klass ' + klass);
  }
  else {
    
  }
};

function vn_bundle_begin_new_bundle(self, _cmd, bundle_identifier) {
  var bundle = rb_funcall(self, 'new', bundle_identifier);
  vn_all_bundles.push(bundle);
  // rb_ivar_set(self, '@current_bundle', bundle);
  vn_current_bundle = bundle;
};

function vn_bundle_initialize(self, _cmd, bundle_identifier) {
  rb_ivar_set(self, '@bundle_identifier', bundle_identifier);
};

function vn_bundle_add_resource_to_current_bundle(self, _cmd, resource_path, resource_text) {
  // var bundle = rb_ivar_get(self, '@current_bundle');
  // rb_funcall(bundle, 'add_resource', resource_path, resource_text);
};

// dont do this? just look for info.json file when we need it (or info.yaml)
function vn_bundle_set_info_dictionary_for_current_bundle(self, _cmd, info_dictionary) {
  // var bundle = rb_ivar_get(self, '@current_bundle');
  // we should convert this to a hash.....
  // var info_hash = JSONParserReformatter(info_dictionary_text);
  // rb_funcall(bundle, 'info_dictionary=', info_hash);
};


rb_define_singleton_method(vn_cBundle, 'add_class_to_bundle', vn_bundle_add_class_to_current_bundle);
rb_define_singleton_method(vn_cBundle, 'begin_new_bundle', vn_bundle_begin_new_bundle);
rb_define_singleton_method(vn_cBundle, 'add_resource_to_current_bundle', vn_bundle_add_resource_to_current_bundle);
rb_define_singleton_method(vn_cBundle, 'set_info_dictionary_for_current_bundle', vn_bundle_set_info_dictionary_for_current_bundle);
rb_define_method(vn_cBundle, 'initialize', vn_bundle_initialize);
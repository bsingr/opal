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
 
var vn_cBundle = rb_define_class('Bundle', rb_cObject);

var vn_all_bundles = rb_hash_new();
rb_ivar_set(vn_cBundle, '@all_bundles', vn_all_bundles);

// This also adds the created bundle to the global bundles list
function vn_bundle_create_from_parse_text(bundle_text) {

  var url_mapper = function() {
    // get url marker length
    var str_len = marker_count();
    var url = get_next(marker_count());
    var url_map = get_next(marker_count());
    rb_funcall(rb_ivar_get(result, '@url_map'), 'store', url, url_map);
    // console.log('mapping url ' + url);
  };
  
  var resource_mapper = function() {
    var str_len = marker_count();
    var resource = get_next(marker_count());
    var resource_map = get_next(marker_count());
    rb_funcall(rb_ivar_get(result, '@resources'), 'store', resource, resource_map);
    // console.log('mapping resource ' + resource);
    // console.log(resource_map);
    // console.log(vn_binary_plist_parse(resource_map));  
  };


  var bundle_path = function() {
    var str_len = marker_count();
    var str = get_next(str_len);
    // return console.log(str);
    return str;
  };
  
  var code = function() {
    // console.log('got in code...' + ch);
    var str_len = marker_count();
    var str = get_next(str_len);
    return str;
  };
  
  var next = function(c) {
    if (c && c !== ch) {
      console.log('bundle parse error: Expected ' + c + ', but instead got ' + ch);
    }
    ch = text.charAt(at);
    at += 1;
    return ch;
  };
  
  var get_next = function(i) {
    var result = text.substr(at, i);
    at += i;
    return result;
  };
  
  var marker_count = function() {
    var len = '';
    next();
    while (ch >= '0' && ch <= '9') {
      len += ch;
      next(); // this will also pass us through the $ at the end of length
    }
    return parseInt(len);
  };
  
  var result = rb_funcall(vn_cBundle, 'new');
  
  var at = 0;
  var ch = '';
  var text = bundle_text;
  
  // get bundle format
  var bundle_format = (function() {
    var marker = text.indexOf('$', at);
    var format = text.substr(at, marker - at);
    at = marker + 1;
    return format;
  })();
  
  // get bundle version
  var bundle_version = (function() {
    var marker = text.indexOf('$', at);
    var version = text.substr(at, marker - at);
    at = marker + 1;
    return version;
  })();
  
  // Go through all bundle properties...
  while (next()) {
    switch (ch) {
      case 'p':
        // set bundle path once retrieved
        var path = bundle_path()
        // alert('found path ' + path);
        rb_ivar_set(result, '@bundle_path', path);
        break;
      case 'c':
        // this.add_executable_code(code());
        var code_fragment = code();
        // alert('found code ' + code_fragment);
        rb_ivar_get(result, '@executable_codes').push(code_fragment);
        break;
      case 'u':
      // alert('found url');
        url_mapper();
        break;
      case 'r':
      // alert('found resource');
        resource_mapper();
        break;
      default:
        console.log('wtf? bundle parse unknown marker - ' + ch);
        return result;
    }
  };
  
  return result;
};

function vn_bundle_finish_loading(a_bundle) {
  // load info dictionary ready for use
  // alert(rb_ivar_get(a_bundle, '@resources').keys.length);
  rb_ivar_set(a_bundle, '@info_dictionary', vn_binary_plist_parse(rb_funcall(rb_ivar_get(a_bundle, '@resources'), '[]', 'info.yml')));
  
  var codes = rb_ivar_get(a_bundle, '@executable_codes');
  while (codes.length) {
    // try/catch around this... we can pin load errors to a particular
    // bundle then
    window.vn_current_bundle = a_bundle;
    eval(codes.pop());
  }
};

function vn_bundle_initialize(self, _cmd) {
  rb_ivar_set(self, '@executable_codes', []);
  rb_ivar_set(self, '@resources', rb_hash_new());
  rb_ivar_set(self, '@url_map', rb_hash_new());
  // rb_ivar_set(self, '@bundle_path', []);
};

rb_define_method(vn_cBundle, 'initialize', vn_bundle_initialize);

/* 
 * lib.js
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

// Functions to load a 'lib'. A lib contains one or more compiled bundles, but
// contains other useful bits and pieces. Each bundle contains a compiled plist,
// resources and other 'requirements'. Typically, an application will load a 
// single lib, which contains every bundle required. More libs/bundles can be
// loaded as required, but this is for bundles that are not really required to
// run, and are often use for 'extras'.
// 
// Each lib contains its own metadata at the top of the file, which relate to
// symbol tables, string tables etc relevant to the entire application and all
// bundles within. These are loaded and executed before any bundle is loaded as
// the are typically useful for every bundle. This metadata is related to as
// the lib 'header', while all the bundles make up the lib 'content'.
// 
// libs, for the moment, are just served as .js files for compatibility with
// header types to reduce the need for server configuration. Once retirved,
// they are not simply eval()'d, only 'code poritons' are executed. Libs dont
// technically have to contain any executable code..



// lib
function vn_lib(path, load_callback) {
  this.path = path;
  this.load_callback = load_callback;
  this.bundles = [];
  // array of strings to be eval'd
  this.executable_codes = [];
};

// Request the lib located at 'path', and run it (build bundles etc), then call
// the callback once completed with itself as the callback parameter (so the
// caller can check load status etc (check for failure...)
vn_lib.prototype.load = function() {
  var lib = this;
  var request = new XMLHttpRequest();
  request.open("GET", this.path, true);
  request.onreadystatechange=function() {
    if (request.readyState==4) {
      // console.log(request.responseText)
      lib.parse(request.responseText);
      lib.finish_loading();
      // alert('Lib has bundles: ' + lib.bundles.length);
      lib.load_callback(lib);
    }
  }
  request.send(null)
};

vn_lib.prototype.finish_loading = function() {
  for (var i = 0; i < this.executable_codes.length; i++) {
    // console.log('evaling ' + this.executable_codes[i]);
    eval(this.executable_codes[i]);
  }
  
  for (var b = 0; b < this.bundles.length; b++) {
    // console.log('evaling ' + this.executable_codes[i]);
    vn_bundle_finish_loading(this.bundles[b]);
  }
  
  // call main?!?!?!?
  rb_funcall(rb_cObject.$iv_tbl.Vienna, 'ApplicationMain');
};

// Given 'hash', add each of its keys to the ENV variable so that they are
// accessible from all code. These should only be REQUIRED keys... a lot of
// bundle specific info can be placed in bundles themselves, of their 
// respective info dictionarys.
vn_lib.prototype.add_environment_keys = function(hash) {
  
};

// String will be JS text that needs to be eval'd and run.
vn_lib.prototype.add_executable_code = function(str) {
  this.executable_codes.push(str);
};

vn_lib.prototype.add_bundle = function(bundle_text) {
  var the_bundle = vn_bundle_create_from_parse_text(bundle_text);
  // alert(rb_ivar_get(the_bundle, '@bundle_path'));
  this.bundles.push(the_bundle);
  rb_funcall(vn_all_bundles, 'store', rb_ivar_get(the_bundle, '@bundle_path'), the_bundle);
};


// 'Execute' the lib. The 'parse_text' is the entire response text, which will
// contain metadata, code, bundles etc.. so deal with it as appropriate
vn_lib.prototype.parse = function(parse_text) {
  
  // parse environment marker
  var environment = function() {
    var str_len = marker_count();
    var str = get_next(str_len);
    return vn_yaml_quick_parse_text(str);
  };
  
  var code = function() {
    // console.log('got in code...' + ch);
    var str_len = marker_count();
    var str = get_next(str_len);
    return str;
  };
  
  var bundle = function() {
    var str_len = marker_count();
    var str = get_next(str_len);
    return str;
  };
  
  var next = function(c) {
    if (c && c !== ch) {
      console.log('file parse error: Expected ' + c + ', but instead got ' + ch);
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
  
  var lib_format = function() {
    var marker = text.indexOf('$', at);
    var format = text.substr(at, marker - at);
    at = marker + 1;
    return format;
  };
  
  var lib_version = function() {
    var marker = text.indexOf('$', at);
    var version = text.substr(at, marker - at);
    at = marker + 1;
    return version;
  };
  
  var at = 0;
  var ch = '';
  var text = parse_text;
  var format = lib_format();
  var version = lib_version();
  
  // variable number of bundles, code etc, so keep going until we reach end of file
  while (next()) {
    switch (ch) {
      case 'e':
        this.add_environment_keys(environment());
        break;
      case 'c':
        this.add_executable_code(code());
        break;
      case 'b':
        this.add_bundle(bundle());
        break;
      default:
        console.log('wtf? lib parse unknown marker');
        return;
    }
  };
};

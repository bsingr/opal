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
 
var vn_all_bundles = { };

function vn_bundle() {
  this.path = null;
  this.files = { };
}

function vn_file() {
  this.path = null;
  this.source = "";
  this.required = false;
}

function Init_Bundle() {
  // do we actually need to do anything?
}

function vn_bundle_load_at_path(path, callback) {
  console.log("load: " + path + ".vn");
  var r = new XMLHttpRequest();
  r.open("GET", path + '.vn', true);
  r.onreadystatechange=function() {
    if (r.readyState==4) {
      var rt = r.responseText;
      var b = new vn_bundle();
      b.path = path;
      vn_bundle_initialize_with_content(b, rt);
      vn_all_bundles[path] = b;
      callback(b);
    }
  }
  r.send(null);
}


function vn_bundle_initialize_with_content(bundle, content) {
  
  var parse_file = function() {
    var flen = marker_count();
    var fname = get_next(flen);
    var clen = marker_count();
    var fcontent = get_next(clen);
    var file = new vn_file();
    file.path = fname;
    file.source = fcontent;
    
    bundle.files[fname] = file; 
  }
  
  
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
  
  var at = 0;
  var ch = '';
  var text = content;
  
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
  
  while (next()) {
    switch (ch) {
      case 'f':
        parse_file();
        break;
      default:
        throw "unknown bundle part " + ch
    }
  }
  
  return bundle;
}

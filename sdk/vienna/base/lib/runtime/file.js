/* 
 * file.js
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
 
VN_BASE_URL = "";

/**
  Require the file 'path'. This should not have an extension, as this is 
  automatically determined. callback is called on completion. Note, this is not
  the same as require(); (although this will be called by require)
*/
function vn_require(path, callback) {
  console.log("requiring: " + path);
  
  var r = new XMLHttpRequest();
  r.open("GET", path + '.rb', true);
  r.onreadystatechange=function() {
    if (r.readyState==4) {
      var p = new vn_parser();
      var g = p.parse(r.responseText);
      console.log("generated:");
      console.log(g);
      eval(g);
      // console.log(p(r.responseText))
      // lib.parse(request.responseText);
      // lib.finish_loading();
      // // alert('Lib has bundles: ' + lib.bundles.length);
      // lib.load_callback(lib);
    }
  }
  r.send(null)
}

function vn_file() {
  this.path = null;
}


if (!window.XMLHttpRequest) {
  throw "XMLHttpRequest missing. currently unsupported browser. fix coming soon"
}
/* 
 * opal_string_scanner.js
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

var OpalStringScanner = function OpalStringScanner(str) {
  // whole string
  this.str = str;
  // current index
  this.at = 0;
  // last matched data
  this.matched = "";
  // working string (basically str substr'd from the 'at' index to the end)
  this.working_string = str;
};

OpalStringScanner.prototype = {
  scan: function (reg) {
    var res = reg.exec(this.working_string);
    if (res == null) {
      return false;
    }
    else if (typeof res == "object") {
      // array.
      this.at += res[0].length;
      this.working_string = this.working_string.substr(res[0].length);
      this.matched = res[0];
      return res;
    }
    else if (typeof res == "string") {
      this.at += res.length;
      this.working_string = this.working_string.substr(res.length);
      return res;
    }
    return false;
  },
  
  check: function(reg) {
    // reg = this._fix_regexp_to_match_beg(reg);
    var res = reg.exec(this.working_string);
    return res;
  },
  
  peek: function(len) {
    return this.working_string.substr(0, len);
  }
};

/* 
 * ruby_eval.js
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

// Provides functions for parsing simple ruby directly within the browser. This 
// is very experimental, and should only be used for simple statements, like eval()
// for adding methods to classes. Supported language features are listed where
// relevant.

var vn_ruby_parser = function(str) {
  
  // Lex/parser state

      
  // current lex state
  var lex_state = 0;
  // the scanner
  var scanner = new vn_ruby_string_scanner(str);

};

vn_ruby_parser.prototype.EXPR_BEG    = 0;
vn_ruby_parser.prototype.EXPR_END    = 1;
vn_ruby_parser.prototype.EXPR_ENDARG = 2;
vn_ruby_parser.prototype.EXPR_ARG    = 3;
vn_ruby_parser.prototype.EXPR_CMDARG = 4;
vn_ruby_parser.prototype.EXPR_MID    = 5;
vn_ruby_parser.prototype.EXPR_FNAME  = 6;
vn_ruby_parser.prototype.EXPR_DOT    = 7;
vn_ruby_parser.prototype.EXPR_CLASS  = 8;
vn_ruby_parser.prototype.EXPR_VALUE  = 9;

vn_ruby_parser.prototype.next_token = function() {
  var t = this.get_next_token();
  console.log('token: ' + t[0] + ' : ' + t[1] + '(' + this.lex_state + ')');
  return t;
};

vn_ruby_parser.prototype.get_next_token = function() {
  var c = '',
      space_seen = false,
      last_state = this.lex_state,
      scanner = this.scanner;
  
  while (true) {
    if (scanner.scan(/\ |\t|\r/)) {
      space_seen = true;
      continue;
    }
    else if (scanner.scan(/\n|#/)) {
      c = scanner.matched();
      if (c == '#') {
        scanner.scan(/.*\n/);
      }
      // we can skip any more blank lines..(combine them into one..)
      scanner.scan(/\n+/);
      
      
      this.lex_state = this.EXPR_BEG;
      return ['\n', '\n'];
    }
  }
  
  // false, false === end of stream
  return [false, false];
};






var vn_ruby_string_scanner = function(str) {
  // whole string
  this.str = str;
  // current index
  this.at = 0;
  // last matched data
  this.matched = "";
  // working string (basically str substr'd from the 'at' index to the end)
};

vn_ruby_string_scanner.prototype.scan = function(reg) {
  
};

vn_ruby_string_scanner.prototype.matched = function() {
  
};

vn_ruby_string_scanner.prototype.peek = function(len) {
  
};


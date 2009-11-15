/* 
 * yaml.js
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

// Quickly loads the parse text of vienna's compressed yaml format, and loads
// the resulting object and returns it. This, for the moment, assumes basic
// types: hash, array, string, numbers, booleans and nil: 'extra' ruby objects
// such as symbols and custom classes are not (yet supported).
// 
// NOTE: this only parses vienna's compressed yaml, it doest not actually parse
// true yaml. This is forthcoming... if we actually need it....
function vn_yaml_quick_parse_text(parse_text) {
  // begin parsing hash, and then return it
  var hash = function(c) {
    var result = { };
    var hash_len = marker_count();
    for (var i = 0; i < hash_len; i++) {
      var key = value();
      var val = value();
      result[key] = val;
    }
    return result;
  };
  
  // parse array
  var array = function(c) {
    var result = [];
    var arr_len = marker_count();
    for (var i = 0; i < arr_len; i++) {
      result.push(value());
    }
    // console.log('parsing array of length' + arr_len);
    return result;
  };
  
  // parse int
  var int_number = function(c) {
    var int_len = marker_count();
    return parseInt(get_next(int_len));
  };
  
  // parse float
  var float_number = function(c) {
    var float_len = marker_count();
    return parseFloat(get_next(float_len));
  };
  
  // string
  var string = function(c) {
    var str_len = marker_count();
    var string = get_next(str_len);
    return string;
  };
  
  // true (boolean)
  var true_boolean = function(c) {
    // just parse through marker '$'
    next();
    return true;
  };
  
  // false bool
  var false_boolean = function(c) {
    // just parse through marker '$'
    next();
    return false;    
  };
  
  // nil_obj so that we can still access nil object
  var nil_object = function(c) {
    // just parse through marker '$'
    next();
    return null;    
  };
  
  // parse any 'value' member, could be top, or in hash, array etc
  var value = function() {
    // get our next char
    next();
    switch (ch) {
      case 'h':
        return hash();
      case 'a':
        return array();
      case 'i':
        return int_number();
      case 'd':
        return float_number();
      case 's':
        return string();
      case 't':
        return true_boolean();
      case 'f':
        return false_boolean();
      case '~':
        return nil_object();
    }
  };
  
  // returns next char
  // c is what we expect. If it exists, make sure the char we get is the
  // same.. otherwise, throw error
  var next = function(c) {
    if (c && c !== ch) {
      console.log("yaml parse error! Expected " + c + " instead of " + ch)
    }
    ch = text.charAt(at);
    at += 1;
    return ch;
  };
  
  // returns the next 'i' number of characters and moves the pointer 'at' accordingly
  // throws error if the given number cannot be parsed
  var get_next = function(i) {
    var result = text.substr(at, i);
    at += i;
    return result;
  };
  
  // goes through and gets the count for the current object type. The count is
  // the string length, number length, array count, hash keys count etc. It is
  // used differently by differtent types, but the process is the same... keep
  // parsing numbers between 0 and 9. Once we stop getting numbers, we parse
  // and ending marker '$' and move the at/ch accordingly.
  var marker_count = function() {
    var len = '';
    next();
    while (ch >= '0' && ch <= '9') {
      len += ch;
      next(); // this will also pass us through the $ at the end of length
    }
    return parseInt(len);
  };
  
  // current position in parse_text
  var at = 0;
  // current char
  var ch = '';
  // text to parse
  var text = parse_text
  // value will return our top level object
  var result = value();
  return result;
};
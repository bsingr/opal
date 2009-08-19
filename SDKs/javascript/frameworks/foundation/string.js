/* 
 * string.js
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

include('foundation/object');

/*
  @enum NSStringCompareOptions
*/
var NSCaseInsensitiveSearch     = 1;
var NSLiteralSearch         = 2;
var NSBackwardsSearch         = 4;
var NSAnchoredSearch        = 8;
var NSNumericSearch         = 64;
var NSDiacriticInsensitiveSearch  = 128;
var NSWidthInsensitiveSearch    = 256;
var NSForcedOrderingSearch      = 512;

// NSString just mirrors native String object
var NSString = String;

NSString.create = function() {
  return "";
};

NSString.mixin = function(props) {
  VN.extend(this.prototype, props);
};

/*
  @mixin NSString
  @class NSString
*/
NSString.mixin({
  
  capitalize: function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
  },
  
  /*
    @returns Integer
  */
  length: function() {
    return this.length;
  },
  
  /*
    @param {Integer} index
    @returns {NSString}
  */
  characterAtIndex: function(index) {
    
  }
});

NSString.mixin({
 
 typeOf: function(aClass) {
   return aClass == NSString;
 },
 
 capitalizedString: function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
 }
});

/*
  @mixin NSStringExtensionMethods
  @class NSString
*/
NSString.mixin({
  
  /*
    @param {Integer} from
    @returns NSString
  */
  substringFromIndex: function(from) {
    
  },
  
  /*
    @param {Integer} to
    @returns NSString
  */
  substringToIndex: function(to) {
    
  },
  
  /*
    @param {NSRange} range
    @returns NSString
  */
  substringWithRange: function(range) {
    
  },
  
  /*
    @param {NSString} string
    @param {NSStringCompareOptions} mask
    @returns NSComparisonResult
  */
  compareWithOptions: function(string, mask) {
    
  },
  
  /*
    @param {NSString} string
    @param {NSStringCompareOptions} mask
    @param {NSRange} compareRange
    @returns NSComparisonResult
  */
  compareWithOptionsInRange: function(string, mask, compareRange) {
    
  },
  
  /*
    @param {NSString} aString
    @returns Boolean
  */
  isEqualToString: function(aString) {
    
  },
  
  /*
    @param {NSString} aString
    @returns Boolean
  */
  hasPrefix: function(aString) {
    
  },
  
  /*
    @param {NSString} aString
    @returns Boolean
  */
  hasSuffix: function(aString) {
    
  },
  
  
  
});

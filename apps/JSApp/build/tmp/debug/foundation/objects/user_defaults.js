/* 
 * user_defaults.js
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


var NSGlobalDomain      = "NSGlobalDomain";
var NSArgumentDomain    = "NSArgumentDomain";
var NSRegistrationDomain  = "NSRegistrationDomain";

var NSUserDefaultsDidChangeNotification = "NSUserDefaultsDidChangeNotification";

/*
  @class NSUserDefaults
*/
var NSUserDefaults = NSObject.extend({
  
  init: function() {
    this._super();
    return this;
  },
  
  /*
    @param {NSString} defaultName
    @returns id
  */
  objectForKey: function(defaultName) {
    
  },
  
  /*
    @param {id} value
    @param {NSString} defaultName
  */
  setObjectForKey: function(value, defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
  */
  removeObjectForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns {NSString}
  */
  stringForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSArray
  */
  arrayForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSDictionary
  */
  dictionaryForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSData
  */
  dataForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSArray
  */
  stringArrayForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Integer
  */
  integerForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Float
  */
  floatForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Double
  */
  doubleForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Boolean
  */
  boolForKey: function(defaultName) {
    
  },
  
});

/*
  @returns NSUserDefaults
*/
NSUserDefaults.standardUserDefaults = function() {
  return this.create();
};

/*
  Reset
*/
NSUserDefaults.resetUserDefaults = function() {
  // do something
};

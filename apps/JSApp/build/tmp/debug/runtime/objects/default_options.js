/* 
 * default_options.js
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


VN.OptionsHash = function() {
  
  this.values = { };
  
  /**
    Removes all the key-value pairs from the dictionary
  */
  this.clear = function() {
    this.values = { };
  };
  
  /**
    Merges the passed object into this one
    
    @param {Object} obj
    @returns VN.defaultOptions this
  */
  this.merge = function(obj) {
    for (prop in obj)
      this.values[prop] = obj[prop];
    
    return this;
  };
  
  /**
    Removes the key/value pair from the hash and returns the value, should it
    be needed
    
    @param {VN.String} key
    @returns Object
  */
  this.remove = function(key) {
    if (this.values[key]) {
      var theProp = this.values[key];
      delete this.values[key];
      return theProp;
    }
    return null;
  };
  
  /**
    Enumerates every key/value pair so that it returns them for use as a 
    function, e.g.
    
    {{{
      myHash.each(function(key, value) {
        console.log(key + ' value is ' + value);
      });
    }}}
  */
  this.each = function(closure) {
    for (prop in this.values) {
      closure(prop, this.values[prop]);
    }
  };
  
  /**
    Same as each, but only the key is passed in the closure
    
    {{{
      myHash.eachKey(function(key) {
        console.log(key + ' value is ' + myHash.get(key);
      });
    }}}
  */
  this.eachKey = function(closure) {
    for (prop in this.values) {
      closure(prop);
    }
  };
  
  /**
    Same as eachKey, but enumerate values
    
    {{{
      myHash.eachValue(function(values) {
        console.log(value);
      });
    }}}
  */
  this.eachValue = function(closure) {
    for (prop in this.values) {
      closure(this.values[prop]);
    }
  };
  
  this.isEmpty = function() {
    
  };
  
  this.fetch = function(key) {
    return this.get(key);
  };
  
  this.hasKey = function(key) {
    return true;
  };
  
  this.replace = function(otherHash) {
    this.values = otherHash;
  };
  
  this.store = function(key, value) {
    this.set(key, value);
  };
  
  this.toString = function() {
    var result = '';
    for (prop in this.values) {
      result += "'" + prop + "': ";
      result += this.values[prop].toString();
    }
    
    return result;
  };
};

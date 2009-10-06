/* 
 * hash.js
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

/**
  New hashes are created, and they are ordered by the order in which they are 
  added: e.g:
  
  var adam = new Hash('bob', 10, 'weight', 40);
*/
var Hash = new Class('Hash', {
  
  initialize: function(props) {
    this.$keys = [ ];
    this.$values = { };
    this.merge(props);
  },
  
  merge: function(other, block) {
    if (other.klass === Hash) {
      // Another Hash object
      var self = this;
      other.each(function(key, val) {
        self.store(key, val);
      });
    }
    else {
      // Normal JS style object
      for (var key in other) {
        this.store(key, other[key]);
      }
    }
  },
  
  each: function(block) {
    for (var i = 0; i < this.$keys.length; i++) {
      block(this.$keys[i], this.$values[this.$keys[i]]);
    }
  },
  
  store: function(key, val) {
    if (this.$keys.indexOf(key) == -1) {
      this.$keys.push(key);
    }
    this.$values[key] = val;
  },
  
  set: function(key, val) {
    this.store(key, val);
  },
  
  get: function(key) {
    return this.$values[key];
  }
});

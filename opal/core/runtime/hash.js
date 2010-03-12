/* 
 * hash.js
 * opal
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

var rb_cHash, rb_envtbl;

function RHash() {
  this.hash = opal_yield_hash();
  this.klass = nil;
  this.flags = T_OBJECT | T_HASH;
  this.ifnone = nil;
  // ordered keys
  this.keys = [];
  // keys.to_s => values
  this.dict = { };
  return this;
};

RHash.prototype = {
  
  toString: function() {
    return "#<Hash:" + this.hash + ">";
  },
  
  hasKey: function(k) {
    return this.keys.indexOf(k) !== -1;
  },
  
  set: function(k, v) {
    if (!this.hasKey(k)) this.keys.push(k);
    this.dict[k] = v;
    return v;
  },
  
  get: function(k) {
    if (this.hasKey(k)) return this.dict[k];
    return this.ifnone;
  }
};

function rb_hash_alloc(klass) {
  var hash = new RHash();
  hash.klass = klass;
  hash.ifnone = nil;
  return hash;
};

function rb_hash_new() {
  var k, v, h = rb_hash_alloc(rb_cHash);
  for (var i = 0; i < arguments.length; i++) {
    k = arguments[i], v = arguments[i+1];
    i ++;
    h.set(k, v);
    // rb_hash_aset(h, "", nil, k, v);
  }
  return h;
};

function Init_Hash() {
  rb_cHash = rb_define_class("Hash", rb_cObject);
};

/* 
 * array.js
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
 
var RHash = function() {
  this.$klass = cHash ;
  this.$type = VN.HASH ;
  this.$keys = [] ;
  this.$values = { } ;
  this.$ifnone = nil ;
  return this;
};

RHash.prototype.$ivar_set = RObject.prototype.$ivar_set;
RHash.prototype.$ivar_get = RObject.prototype.$ivar_get;
RHash.prototype.$call = RObject.prototype.$call;
RHash.prototype.$define_singleton_method = RObject.prototype.$define_singleton_method;
RHash.prototype.$make_metaclass = RObject.prototype.$make_metaclass;

VN.$h = function() {
  var hash = cHash.$call('new', []) ;
  for (var i = 0; i < arguments.length; i++) {
    hash.$call('[]=', [arguments[i][0], arguments[i][1]]);
  }
  return hash;
};

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
});

cHash.$define_singleton_method('[]', function() {
  
});

cHash.$define_singleton_method('try_convert', function() {
  
});

cHash.$define_method('initialize', function() {
  // for now, just set the arg, if exists, as the ifnone for the hash
  if (arguments.length > 0) {
    this.$ifnone = arguments[0] ;
  }
});

cHash.$define_method('initialize_copy', function() {
  
});

cHash.$define_method('rehash', function() {
  
});




cHash.$define_method('to_hash', function() {
  return this ;
});

cHash.$define_method('to_a', function() {
  var ary = [];
  for (var i = 0; i < this.$keys.length; i++) {
    ary.push([this.$keys[i], this.$values[this.$keys[i]]]);
  }
  return ary;
});

cHash.$define_method('to_s', function() {
  if (this.$keys.length == 0) return '{...}';
  
  var str = '{' + this.$keys[0].$call('inspect', []) + '=>' + this.$values[this.$keys[0]].$call('inspect', []);
  for (var i = 1; i < this.$keys.length; i++) {
    str += (', ' + this.$keys[i].$call('inspect', []) + '=>' + this.$values[this.$keys[i]].$call('inspect', []))
  }
  str += '}';
  return str;
});

cHash.$define_method('inspect', function() {
  return this.$call('to_s', []) ;
});




cHash.$define_method('==', function() {
  
});

cHash.$define_method('[]', function(key) {
  if (!this.$values.hasOwnProperty(key)) {
    return this.$call('default', [key]);
  }
  return this.$values[key] ;
});

cHash.$define_method('hash', function() {
  
});

cHash.$define_method('eql?', function() {
  
});

cHash.$define_method('fetch', function() {
  
});

cHash.$define_method('[]=', function(key, val) {
  // if we dont have the key, add it to the ordered array so that we can keep
  // the hash ordered.
  if (!this.$values.hasOwnProperty(key)) {
    this.$keys.push(key);
  }
  
  this.$values[key] = val ;
  return val ;
});

cHash.$define_method('store', function(key, val) {
  return this.$call('[]=', [key, val]);
});

cHash.$define_method('default', function() {
  return this.$ifnone ;
});

cHash.$define_method('default=', function(ifnone) {
  this.$ifnone = ifnone;
  return ifnone;
});

cHash.$define_method('default_proc', function() {
  
});

cHash.$define_method('default_proc=', function() {
  
});

cHash.$define_method('key', function() {
  
});

cHash.$define_method('index', function() {
  
});

cHash.$define_method('size', function() {
  
});

cHash.$define_method('length', function() {
  
});

cHash.$define_method('empty?', function() {
  
});




cHash.$define_method('each_value', function() {
  
});

cHash.$define_method('each_key', function() {
  
});

cHash.$define_method('each_pair', function() {
  
});

cHash.$define_method('each', function() {
  
});




cHash.$define_method('keys', function() {
  
});

cHash.$define_method('values', function() {
  
});

cHash.$define_method('values_at', function() {
  
});




cHash.$define_method('shift', function() {
  
});

cHash.$define_method('delete', function() {
  
});

cHash.$define_method('delete_if', function() {
  
});

cHash.$define_method('select', function() {
  
});

cHash.$define_method('reject', function() {
  
});

cHash.$define_method('reject!', function() {
  
});

cHash.$define_method('clear', function() {
  
});

cHash.$define_method('invert', function() {
  
});

cHash.$define_method('update', function() {
  
});

cHash.$define_method('replace', function() {
  
});

cHash.$define_method('merge!', function() {
  
});

cHash.$define_method('merge', function() {
  
});

cHash.$define_method('assoc', function() {
  
});

cHash.$define_method('rassoc', function() {
  
});

cHash.$define_method('flatten', function() {
  
});




cHash.$define_method('include?', function() {
  
});

cHash.$define_method('member?', function() {
  
});

cHash.$define_method('has_key?', function() {
  
});

cHash.$define_method('has_value?', function() {
  
});

cHash.$define_method('key?', function() {
  
});

cHash.$define_method('value?', function() {
  
});




cHash.$define_method('compare_by_identity', function() {
  
});

cHash.$define_method('compare_by_identity?', function() {
  
});

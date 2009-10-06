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

cHash.$def_s('[]', function() {
  
});

cHash.$def_s('try_convert', function() {
  
});

cHash.$def('initialize', function() {
  // for now, just set the arg, if exists, as the ifnone for the hash
  if (arguments.length > 0) {
    this.$ifnone = arguments[0] ;
  }
});

cHash.$def('initialize_copy', function() {
  
});

cHash.$def('rehash', function() {
  
});




cHash.$def('to_hash', function() {
  return this ;
});

cHash.$def('to_a', function() {
  var ary = [];
  for (var i = 0; i < this.$keys.length; i++) {
    ary.push([this.$keys[i], this.$values[this.$keys[i]]]);
  }
  return ary;
});

cHash.$def('to_s', function() {
  if (this.$keys.length == 0) return '{...}';
  
  var str = '{' + this.$keys[0].$call('inspect', []) + '=>' + this.$values[this.$keys[0]].$call('inspect', []);
  for (var i = 1; i < this.$keys.length; i++) {
    str += (', ' + this.$keys[i].$call('inspect', []) + '=>' + this.$values[this.$keys[i]].$call('inspect', []))
  }
  str += '}';
  return str;
});

cHash.$def('inspect', function() {
  return this.$call('to_s', []) ;
});




cHash.$def('==', function() {
  
});

cHash.$def('[]', function(key) {
  if (!this.$values.hasOwnProperty(key)) {
    return this.$call('default', [key]);
  }
  return this.$values[key] ;
});

cHash.$def('hash', function() {
  
});

cHash.$def('eql?', function() {
  
});

cHash.$def('fetch', function() {
  
});

cHash.$def('[]=', function(key, val) {
  // if we dont have the key, add it to the ordered array so that we can keep
  // the hash ordered.
  if (!this.$values.hasOwnProperty(key)) {
    this.$keys.push(key);
  }
  
  this.$values[key] = val ;
  return val ;
});

cHash.$def('store', function(key, val) {
  return this.$call('[]=', [key, val]);
});

cHash.$def('default', function() {
  return this.$ifnone ;
});

cHash.$def('default=', function(ifnone) {
  this.$ifnone = ifnone;
  return ifnone;
});

cHash.$def('default_proc', function() {
  
});

cHash.$def('default_proc=', function() {
  
});

cHash.$def('key', function() {
  
});

cHash.$def('index', function() {
  
});

cHash.$def('size', function() {
  
});

cHash.$def('length', function() {
  
});

cHash.$def('empty?', function() {
  
});




cHash.$def('each_value', function() {
  
});

cHash.$def('each_key', function() {
  
});

cHash.$def('each_pair', function() {
  
});

cHash.$def('each', function() {
  
});




cHash.$def('keys', function() {
  
});

cHash.$def('values', function() {
  
});

cHash.$def('values_at', function() {
  
});




cHash.$def('shift', function() {
  
});

cHash.$def('delete', function() {
  
});

cHash.$def('delete_if', function() {
  
});

cHash.$def('select', function() {
  
});

cHash.$def('reject', function() {
  
});

cHash.$def('reject!', function() {
  
});

cHash.$def('clear', function() {
  
});

cHash.$def('invert', function() {
  
});

cHash.$def('update', function() {
  
});

cHash.$def('replace', function() {
  
});

cHash.$def('merge!', function() {
  
});

cHash.$def('merge', function() {
  
});

cHash.$def('assoc', function() {
  
});

cHash.$def('rassoc', function() {
  
});

cHash.$def('flatten', function() {
  
});




cHash.$def('include?', function() {
  
});

cHash.$def('member?', function() {
  
});

cHash.$def('has_key?', function() {
  
});

cHash.$def('has_value?', function() {
  
});

cHash.$def('key?', function() {
  
});

cHash.$def('value?', function() {
  
});




cHash.$def('compare_by_identity', function() {
  
});

cHash.$def('compare_by_identity?', function() {
  
});

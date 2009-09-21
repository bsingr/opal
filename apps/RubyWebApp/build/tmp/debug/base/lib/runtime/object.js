/* 
 * object.js
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

var RObject = function(klass, type) {
  this.$klass = klass ;
  this.$type = type ;
  return this;
};

RObject.prototype.$ivar_set = function(id, val) {
  this[id] = val ;
  return val ;
};

RObject.prototype.$ivar_get = function(id) {
  return this[id] ;
};

/*
  $ - call method
  @param id - method name
  @param args - array of all arguments
*/
RObject.prototype.$ = function(id, args) {
  var method = this.$klass.$search_method(id);
  if (!method) throw 'RObject#call cannot find method: ' + id ;
  return method.apply(this, args) ;
};

/**
  We need to copy some of RClass' methods for singletons
*/
RObject.prototype.$define_singleton_method = RClass.prototype.$define_singleton_method;
RObject.prototype.$make_metaclass = RClass.prototype.$make_metaclass;
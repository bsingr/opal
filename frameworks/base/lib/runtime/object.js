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

var RObject = function RObject(klass, type) {
  
  // console.log('in here!');
  // console.log(klass);
  
  this.$klass = klass ;
  this.$type = type ;
  this.$iv_tbl = {};
  return this;
};

// RObject.prototype.toString = function() {
  // console.log('calling toString');
  // return VN$(this, 'to_s');
// }


/**
  Set ivar
  @param obj - object to set ivar on
  @param id - name of variable, e.g. '@background_color'
  @param val - value to set
*/
var rb_ivar_set = function rb_ivar_set(obj, id, val) {
  obj.$iv_tbl[id] = val;
  return val;
};


/**
  For compatibility
*/
RObject.prototype.$i_s = function(id, val) {
  this.$iv_tbl[id] = val ;
  return val ;
};


/**
  Get ivar
*/
var rb_ivar_get = function rb_ivar_get(obj, id) {
  if (obj.$iv_tbl[id] == undefined || obj.$iv_tbl[id] == null) {
    return nil;
  }
  return obj.$iv_tbl[id];
};


/**
  For compatibility
*/
RObject.prototype.$i_g = function(id) {
  if (this.$iv_tbl[id] == undefined || this.$iv_tbl[id] == null) {
    return nil;
  }
  return this.$iv_tbl[id];
};

/*
  $ - call method
  @param id - method name
  @param args - array of all arguments
*/
RObject.prototype.$ = function(id, args) {
  var method = this.$klass.$search_method(id);
  
  if (!method) {
    console.log(this);
    throw 'RObject#call cannot find method: ' + id ;
  } 
  return method.apply(this, args) ;
};

/**
  Call method
*/

var rb_funcall_stack = [];

var rb_funcall = function rb_funcall(self, id) {
  // console.log(id);
  // rb_funcall_stack.push(id);
  if (!self.$klass) {
    console.log('ERROR: rb_funcall');
    console.log(self);
    console.log(id);
  }
  
  var method = self.$klass.$search_method(id);
  
  if (!method) {
    // for (var i = 0; i < 20; i++) {
    //   console.log(rb_funcall_stack.pop());
    // }
    console.log(self);
    throw 'RObject#call cannot find method: ' + id ;
  } 
  // console.log(Array.prototype.slice.call(arguments));
  switch(arguments.length) {
    case 2: return method(self, id);
    case 3: return method(self, id, arguments[2]);
    case 4: return method(self, id, arguments[2], arguments[3]);
    case 5: return method(self, id, arguments[2], arguments[3], arguments[4]);
  }
  
  return method.apply(self, arguments);
}

/**
  For compatibility
*/
var VN$ = rb_funcall;

/**
  Call super method
*/
var rb_supcall = function rb_supcall(from, self, id, args) {
  var method = self.$klass.$search_super_method(from, id);
  if (!method) throw 'RObject#call cannot find super method for: ' + id ;
  
  switch(args.length) {
    case 0: return method(self, id);
    case 1: return method(self, id, args[0]);
    case 2: return method(self, id, args[0], args[1]);
    case 3: return method(self, id, args[0], args[1], args[2]);
    case 4: return method(self, id, args[0], args[1], args[2], args[3]);
  }
  
  return method.apply(self, arguments);
};

/**
  For compatibility
*/
var VN$sup = rb_supcall;

/**
  Call super
  - from = callee
*/
RObject.prototype.$sup = function(from, id, args) {
  // console.log('callee');
  // console.log(from);
  var method = this.$klass.$search_super_method(from, id);
  if (!method) throw 'RObject#call cannot find super method for: ' + id ;
  // console.log('got super');
  // console.log(method);
  return method.apply(this, args) ;
};

/**
  We need to copy some of RClass' methods for singletons
*/
RObject.prototype.$def_s = RClass.prototype.$def_s;
RObject.prototype.$make_metaclass = RClass.prototype.$make_metaclass;
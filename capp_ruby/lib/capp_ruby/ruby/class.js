/* 
 * class.js
 * cappruby
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

function rb_define_class(id, super_class) {
  return rb_define_class_under(rb_cObject, id, super_class);
};

function rb_define_class_under(outer, id, super_class) {
  var klass;
  
  if (rb_const_defined(outer, id)) {
    klass = rb_const_get(outer, id);
    if ((super_class !== CPObject) && (klass.super_class !== super_class)) {
      throw id + " already exists: different super value given"
    }
    return klass;
  }
  
  if (!super_class) {
    // warning?
    super_class = CPObject;
  }
  klass = objj_allocateClassPair(super_class, id);
  // ivars? hmmm, probably dont need to.
  if (outer === rb_cObject) {
    objj_registerClassPair(klass);
  }
  else {
    klass.rb_parent = outer;
  }
  klass.info |= CLS_INITIALIZED;
  klass.isa.info |= CLS_INITIALIZED;
  // console.log(id);
  // _class_initialize(klass);
  // heh?
  objj_addClassForBundle(klass, objj_getBundleWithPath(OBJJ_CURRENT_BUNDLE.path));
  // do we need a class table? maybe not..
  rb_const_set(outer, id, klass);
  return klass;
}

function rb_define_method(klass, id, func, arity) {
  var m = new cappruby_method_t(id, func, []);
  m.arity = arity;
  
  klass.method_list.push(m);
  klass.method_dtable[id] = m;
  m.method_imp.displayName = klass.name + "#" + id;
  return true;
};

function rb_define_singleton_method(klass, id, func, arity) {
  return rb_define_method(rb_singleton_class(klass), id, func, arity);
};

/**
  Returns the singleton class. Meta classes are already singleton classes,
  so this method just returns the meta class itself. Classes in objj are
  not singleton, so a new class will be created, and returned, and then 
  injected into the hierarchy. CLS_META identifies meta classes, while
  CLS_CLASS identifies classes. A singleton class will have a CLS_SINGLETON
  also, which is added on creation. Note, althogh a meta class is singleton,
  it will not have a CLS_SINGLETON mask
*/
function rb_singleton_class(klass) {
  if (klass.isa.info & CLS_CLASS) {
    if (klass.isa.info & CLS_SINGLETON) {
      // already a singleton
      return klass.isa;
    }
    else {
      // not a singleton, so make it one. keep same name
      var s = objj_allocateClassPair(klass.isa, klass.isa.name);
      _class_initialize(s);
      s.info |= CLS_SINGLETON;
      klass.isa = s;
      return klass.isa;
    }
  }
  else {
    // meta class, so its already a singleton
    return klass.isa;
  }
};

function rb_class_real(klass) {
  while (klass.info & CLS_SINGLETON) klass = klass.super_class;
  return klass;
};

function boot_defclass(id, superclass) {
  var o = rb_class_boot(superclass, id);
  // rb_class_tbl[id] = o;
  rb_const_set((rb_cObject ? rb_cObject : o), id, o);
  return o;
};

function rb_class_boot(superclass, name) {
    return rb_objj_create_class(name, superclass);
};

function rb_objj_create_class(name, superclass) {
    var RB_CLASS = 0;
    return rb_objj_alloc_class(name, superclass, RB_CLASS, nil);
};

function rb_alloc_class(type, klass) {
  var obj = new RClass();
  obj.$klass = klass;
  obj.$type = type;
  return obj;
};

rb_anonymous_count = 0;

function rb_objj_alloc_class(name, superclass, type, klass) {
    name = name || ("RubyAnonymous" + rb_anonymous_count++);
    superclass = superclass || rb_cObject;
    var o = objj_allocateClassPair(superclass, name);
    objj_registerClassPair(o);
    return o;
};

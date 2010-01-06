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

var rb_cArray;

function rb_ary_each(ary) {
  var i;
  // if (!rb_block_given_p()) {
    // throw "return enumerator thingy"
  // }
  for (i = 0; i < ary.length; i++) {
    rb_yield(ary[i]);
    // console.log("should yield: " + ary[i]);
  }
  return ary;
}

function Init_Array() {
  
  rb_cArray = rb_define_class("Array", rb_cObject);
  Array.prototype.klass = rb_cArray;
  
  // rb_include_module(rb_cArray, rb_mEnumerable);
  
  // rb_define_alloc_func(rb_cArray, rb_ary_alloc);
  // rb_define_singleton_method(rb_cArray, "[]", rb_ary_s_create, -1);
  // rb_define_singleton_method(rb_cArray, "try_convert", rb_ary_s_try_convert, 1);
  // rb_define_method(rb_cArray, "initialize", rb_ary_initialize, -1);
  // rb_define_method(rb_cArray, "initialize_copy", rb_ary_replace, 1);

  // rb_define_method(rb_cArray, "to_s", rb_ary_inspect, 0);
  // rb_define_method(rb_cArray, "inspect", rb_ary_inspect, 0);
  // rb_define_method(rb_cArray, "to_a", rb_ary_to_a, 0);
  // rb_define_method(rb_cArray, "to_ary", rb_ary_to_ary_m, 0);
  // rb_define_method(rb_cArray, "frozen?",  rb_ary_frozen_p, 0);

  // rb_define_method(rb_cArray, "==", rb_ary_equal, 1);
  // rb_define_method(rb_cArray, "eql?", rb_ary_eql, 1);
  // rb_define_method(rb_cArray, "hash", rb_ary_hash, 0);

  // rb_define_method(rb_cArray, "[]", rb_ary_aref, -1);
  // rb_define_method(rb_cArray, "[]=", rb_ary_aset, -1);
  // rb_define_method(rb_cArray, "at", rb_ary_at, 1);
  // rb_define_method(rb_cArray, "fetch", rb_ary_fetch, -1);
  // rb_define_method(rb_cArray, "first", rb_ary_first, -1);
  // rb_define_method(rb_cArray, "last", rb_ary_last, -1);
  // rb_define_method(rb_cArray, "concat", rb_ary_concat, 1);
  // rb_define_method(rb_cArray, "<<", rb_ary_push, 1);
  // rb_define_method(rb_cArray, "push", rb_ary_push_m, -1);
  // rb_define_method(rb_cArray, "pop", rb_ary_pop_m, -1);
  // rb_define_method(rb_cArray, "shift", rb_ary_shift_m, -1);
  // rb_define_method(rb_cArray, "unshift", rb_ary_unshift_m, -1);
  // rb_define_method(rb_cArray, "insert", rb_ary_insert, -1);
  rb_define_method(rb_cArray, "each", rb_ary_each, 0);
  // rb_define_method(rb_cArray, "each_index", rb_ary_each_index, 0);
  // rb_define_method(rb_cArray, "reverse_each", rb_ary_reverse_each, 0);
  // rb_define_method(rb_cArray, "length", rb_ary_length, 0);
  // rb_define_alias(rb_cArray,  "size", "length");
  // rb_define_method(rb_cArray, "empty?", rb_ary_empty_p, 0);
  // rb_define_method(rb_cArray, "find_index", rb_ary_index, -1);
  // rb_define_method(rb_cArray, "index", rb_ary_index, -1);
  // rb_define_method(rb_cArray, "rindex", rb_ary_rindex, -1);
  // rb_define_method(rb_cArray, "join", rb_ary_join_m, -1);
  // rb_define_method(rb_cArray, "reverse", rb_ary_reverse_m, 0);
  // rb_define_method(rb_cArray, "reverse!", rb_ary_reverse_bang, 0);
  // rb_define_method(rb_cArray, "sort", rb_ary_sort, 0);
  // rb_define_method(rb_cArray, "sort!", rb_ary_sort_bang, 0);
  // rb_define_method(rb_cArray, "collect", rb_ary_collect, 0);
  // rb_define_method(rb_cArray, "collect!", rb_ary_collect_bang, 0);
  // rb_define_method(rb_cArray, "map", rb_ary_collect, 0);
  // rb_define_method(rb_cArray, "map!", rb_ary_collect_bang, 0);
  // rb_define_method(rb_cArray, "select", rb_ary_select, 0);
  // rb_define_method(rb_cArray, "values_at", rb_ary_values_at, -1);
  // rb_define_method(rb_cArray, "delete", rb_ary_delete, 1);
  // rb_define_method(rb_cArray, "delete_at", rb_ary_delete_at_m, 1);
  // rb_define_method(rb_cArray, "delete_if", rb_ary_delete_if, 0);
  // rb_define_method(rb_cArray, "reject", rb_ary_reject, 0);
  // rb_define_method(rb_cArray, "reject!", rb_ary_reject_bang, 0);
  // rb_define_method(rb_cArray, "zip", rb_ary_zip, -1);
  // rb_define_method(rb_cArray, "transpose", rb_ary_transpose, 0);
  // rb_define_method(rb_cArray, "replace", rb_ary_replace, 1);
  // rb_define_method(rb_cArray, "clear", rb_ary_clear, 0);
  // rb_define_method(rb_cArray, "fill", rb_ary_fill, -1);
  // rb_define_method(rb_cArray, "include?", rb_ary_includes, 1);
  // rb_define_method(rb_cArray, "<=>", rb_ary_cmp, 1);

  // rb_define_method(rb_cArray, "slice", rb_ary_aref, -1);
  // rb_define_method(rb_cArray, "slice!", rb_ary_slice_bang, -1);

  // rb_define_method(rb_cArray, "assoc", rb_ary_assoc, 1);
  // rb_define_method(rb_cArray, "rassoc", rb_ary_rassoc, 1);

  // rb_define_method(rb_cArray, "+", rb_ary_plus, 1);
  // rb_define_method(rb_cArray, "*", rb_ary_times, 1);

  // rb_define_method(rb_cArray, "-", rb_ary_diff, 1);
  // rb_define_method(rb_cArray, "&", rb_ary_and, 1);
  // rb_define_method(rb_cArray, "|", rb_ary_or, 1);

  // rb_define_method(rb_cArray, "uniq", rb_ary_uniq, 0);
  // rb_define_method(rb_cArray, "uniq!", rb_ary_uniq_bang, 0);
  // rb_define_method(rb_cArray, "compact", rb_ary_compact, 0);
  // rb_define_method(rb_cArray, "compact!", rb_ary_compact_bang, 0);
  // rb_define_method(rb_cArray, "flatten", rb_ary_flatten, -1);
  // rb_define_method(rb_cArray, "flatten!", rb_ary_flatten_bang, -1);
  // rb_define_method(rb_cArray, "count", rb_ary_count, -1);
  // rb_define_method(rb_cArray, "shuffle!", rb_ary_shuffle_bang, 0);
  // rb_define_method(rb_cArray, "shuffle", rb_ary_shuffle, 0);
  // rb_define_method(rb_cArray, "sample", rb_ary_sample, -1);
  // rb_define_method(rb_cArray, "cycle", rb_ary_cycle, -1);
  // rb_define_method(rb_cArray, "permutation", rb_ary_permutation, -1);
  // rb_define_method(rb_cArray, "combination", rb_ary_combination, 1);
  // rb_define_method(rb_cArray, "product", rb_ary_product, -1);

  // rb_define_method(rb_cArray, "take", rb_ary_take, 1);
  // rb_define_method(rb_cArray, "take_while", rb_ary_take_while, 0);
  // rb_define_method(rb_cArray, "drop", rb_ary_drop, 1);
  // rb_define_method(rb_cArray, "drop_while", rb_ary_drop_while, 0);
}
/* 
 * base.js
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
 
// temp..
var nil = null;

/**
  nodes etc
*/

var NOEX_PUBLIC     = 0,
    NOEX_NOSUPER    = 1,
    NOEX_PRIVATE    = 2,
    NOEX_PROTECTED  = 4,
    NOEX_MASK       = 6,
    NOEX_BASIC      = 8;


function require() {
  
};

// Boolean test. false if null, undefined, nil, or false
function RTEST(val) {
  return (val != null && val != undefined && val != nil && val != false) ? true : false;
};

/**
  Performs an 'or op' with lhs and rhs
*/
function ORTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return rhs;
  }
  return lhs;
};

/**
  Performs an 'and op' with lhs and rhs
*/
function ANDTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return nil;
  }
  return rhs;
};

function NOTTEST(expr) {
  if (expr == null || expr == undefined || expr == nil || expr == false) return true;
  return false;
};

/**
  Fix for browsers not having console
*/
if (typeof console === 'undefined') {
 var console = console || window.console || { };
 console.log = console.info = console.warn = console.error = function() { };
}

function RObject(klass, type) {
  this.klass = klass;
  this.flags = type;
  this.iv_tbl = { };
  return this;
}

function RClass(klass, super_klass) {
  this.klass = klass ;
  this.sup = super_klass ;
  this.flags = T_CLASS ;
  this.m_tbl = { };
  this.iv_tbl = { };
  return this;
};

// Types
var T_CLASS   = 1,
    T_MODULE  = 2,
    T_OBJECT  = 4,
    T_BOOLEAN = 8,
    T_STRING  = 16,
    T_ARRAY   = 32,
    T_NUMBER  = 64,
    T_PROC    = 128,
    T_SYMBOL  = 256,
    T_HASH    = 512,
    T_ICLASS  = 1024;

// Flags
var FL_SINGLETON = 2056;

function FL_TEST(x, f) {
  return x.flags & f;
}

function FL_SET(x, f) {
  x.flags |= f;
}

function FL_UNSET(x, f) {
  x.flags &= (~f);
}

rb_class_tbl = { } ;  // all classes are stored here
rb_global_tbl = { } ; // globals are stored here

function rb_gvar_get(id) {
  
};

function rb_gvar_set(id, val) {
  
};


function boot_defclass(id, super_class) {
  var o = rb_class_boot(super_class);
  rb_name_class(o, id);
  rb_class_tbl[id] = o;
  rb_const_set((rb_cObject ? rb_cObject : o), id, o);
  return o;
};

boot_defmetametaclass = function(klass, metametaclass) {
  klass.klass.klass = metametaclass;
};

obj_alloc = function(klass) {
  // console.log('in base.js, obj_alloc ' + arguments.length);
  // var obj = klass.$('allocate', []);
  var obj = VN$(klass, 'allocate');
  return obj;
};

class_allocate_instance = function() {
  // console.log('doing VN.class_allocate_instance');
  var obj = new RObject(this, T_OBJECT) ;
  return obj;
};

obj_dummy = function() {
  return nil ;
};

equal = function(obj) {
  if (obj == this) return true ;
  var result = this.$funcall('==', [obj]);
  if (result) return true ;
  return false ;
};

eql = function(obj) {
  return this.$funcall('==', [obj]);
};

obj_equal = function(obj) {
  return (obj == this) ? true : false ;
};
/* 
 * browser.js
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

function rb_browser_alert(recv, str) {
  alert(str);
  return nil;
}

function Init_Browser() {
  
  rb_define_method(rb_mKernel, "alert", rb_browser_alert, 1);
}/* 
 * bundle.js
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
 
var vn_all_bundles = { };

function vn_bundle() {
  this.path = null;
  this.files = { };
}

function vn_file() {
  this.path = null;
  this.source = "";
  this.required = false;
}

function Init_Bundle() {
  // do we actually need to do anything?
}

function vn_bundle_load_at_path(path, callback) {
  console.log("load: " + path + ".vn");
  var r = new XMLHttpRequest();
  r.open("GET", path + '.vn', true);
  r.onreadystatechange=function() {
    if (r.readyState==4) {
      var rt = r.responseText;
      var b = new vn_bundle();
      b.path = path;
      vn_bundle_initialize_with_content(b, rt);
      vn_all_bundles[path] = b;
      callback(b);
    }
  }
  r.send(null);
}


function vn_bundle_initialize_with_content(bundle, content) {
  
  var parse_file = function() {
    var flen = marker_count();
    var fname = get_next(flen);
    var clen = marker_count();
    var fcontent = get_next(clen);
    var file = new vn_file();
    file.path = fname;
    file.source = fcontent;
    
    bundle.files[fname] = file; 
  }
  
  
  var next = function(c) {
    if (c && c !== ch) {
      console.log('bundle parse error: Expected ' + c + ', but instead got ' + ch);
    }
    ch = text.charAt(at);
    at += 1;
    return ch;
  };
  
  var get_next = function(i) {
    var result = text.substr(at, i);
    at += i;
    return result;
  };
  
  var marker_count = function() {
    var len = '';
    next();
    while (ch >= '0' && ch <= '9') {
      len += ch;
      next(); // this will also pass us through the $ at the end of length
    }
    return parseInt(len);
  };
  
  var at = 0;
  var ch = '';
  var text = content;
  
  // get bundle format
  var bundle_format = (function() {
    var marker = text.indexOf('$', at);
    var format = text.substr(at, marker - at);
    at = marker + 1;
    return format;
  })();
  
  // get bundle version
  var bundle_version = (function() {
    var marker = text.indexOf('$', at);
    var version = text.substr(at, marker - at);
    at = marker + 1;
    return version;
  })();
  
  while (next()) {
    switch (ch) {
      case 'f':
        parse_file();
        break;
      default:
        throw "unknown bundle part " + ch
    }
  }
  
  return bundle;
}
/* 
 * class.js
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

function rb_class_inherited(super_class, klass) {
  if (!super_class) super_class = rb_cObject ;
  // return rb_funcall(super_class, "inherited", klass);
};

function rb_define_class(id, super_class) {
  var k;
  // if already defined, just ensure right type then return existing class/mod.
  if (rb_const_defined(rb_cObject, id)) {  
    k = rb_const_get(rb_cObject, id);
    if (!(k.flags & T_CLASS)) {
      throw id + " is not a class"
    }
    if (k.sup != super_class) {
      if (k != rb_cObject) {
        throw id + " is already defined"
      }
    }
    return k
  }
  if (!super_class) {
    console.log("no superclass given for " + id + " . Object assumed");
  }
  k = rb_define_class_id(id, super_class);
  rb_class_tbl[id] = k;
  
  // class bundle...?
  // rb_ivar_set(k, '__bundle__', window.vn_current_bundle);
  
  rb_name_class(k, id);
  rb_const_set(rb_cObject, id, k);
  rb_class_inherited(super_class, k);
  return k;
}

function rb_define_class_under(outer, id, super_klass) {
  var klass;
  // if already defined in context... just ensure it is a macthing class def
  /**
    this should be const_defined_at
  */
  if (outer.$c_d_a(id)) {
    // klass = VN.const_get_at(outer, id);
    /**
      this should be const_get_at
    */
    klass = outer.$c_g_a(id);
    // console.log(klass);
    if (klass.$type != VN.CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (RClass.real(klass.$super) != super_klass) {
      // avoid error for cObject
      if (klass != cObject) {
        VN.name_error(id + ' is already defined');
      }
      
    }
    return klass;
  }
  // not existing...
  if (!super_klass) {
    VN.warning('no super class for `' + VN.class2name(outer), + '::' + id + '`, Object assumed');
  }
  klass = RClass.define_class_id(id, super_klass);
  // sets that the klass knows about its outer, i.e. classes within modules know about the module
  klass.$parent = outer;
  
  // set class bundle here....
  // console.log('current bundle ' + window.vn_current_bundle);
  rb_ivar_set(klass, '__bundle__', window.vn_current_bundle);
  
  // VN.set_class_path(klass, outer, id);
  // VN.const_set(outer, id, klass);
  outer.$c_s(id, klass);
  RClass.inherited(super_klass, klass);
  klass.$name(id);

  return klass;
};

RClass.class2name = function(klass) {
  return klass.$class_name();
};

RClass.obj_classname = function(obj) {
  return VN.class2name(obj.$klass);
};

function make_metametaclass(metaclass) {
  var metametaclass, super_of_metaclass;

  if (metaclass.klass == metaclass) {
    metametaclass = rb_class_boot(null);
    metametaclass.klass = metametaclass;
  }
  else {
    metametaclass = rb_class_boot(null);
    metametaclass.klass = metaclass.klass.klass == metaclass.klass ? make_metametaclass(metaclass.klass) : metaclass.klass.klass;
  }
  
  FL_SET(metametaclass, FL_SINGLETON);
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.klass = metametaclass;

  super_of_metaclass = metaclass.sup;
  while (FL_TEST(super_of_metaclass, T_ICLASS)) {
    super_of_metaclass = super_of_metaclass.sup;
  }

  metametaclass.sup = rb_ivar_get(super_of_metaclass.klass, '__attached__') == super_of_metaclass ? super_of_metaclass.klass : make_metametaclass(super_of_metaclass);
  return metametaclass;
};

function rb_class_real(klass) {
  while (klass.flags & FL_SINGLETON) klass = klass.sup;
  return klass;
}

RClass.real = function(klass) {
  while ((klass.$singleton == true) || (klass.$type == VN.ICLASS)) {
    klass = klass.$super
  }
  return klass
};

function class_alloc(type, klass) {
  var o = new RClass();
  o.klass = klass;
  o.flags |= type;
  return o;
}

function rb_class_boot(super_class) {
  var k = class_alloc(T_CLASS, rb_cClass);
  k.sup = super_class;
  return k;
}

function rb_check_inheritable(super_class) {
  if (!FL_TEST(super_class, T_CLASS)) {
    throw 'super class must be a Class (' + VN.obj_classname(super_klass) + ' given)';
  }
  if (super_class.flags & FL_SINGLETON) {
    throw 'can\'t make a subclass of singleton class';
  }
};

function rb_class_create(super_klass) {
  rb_check_inheritable(super_klass);

  if (super_klass == rb_cClass) {
    VN.raise(VN.TypeError, "can't make subclass of Class")
  }
  return rb_class_boot(super_klass);
};

function rb_define_class_id(id, super_klass) {
  var klass;
  if (!super_klass) super_klass = rb_cObject;
  klass = rb_class_create(super_klass);
  rb_make_metaclass(klass, super_klass.klass);
  return klass;
};

function rb_singleton_class(obj) {
  var klass;

  if (FL_TEST(obj, T_NUMBER) || FL_TEST(obj, T_SYMBOL)) {
    console.log(obj);
    throw 'can\'t define singleton';
  }

  if (FL_TEST(obj.klass, FL_SINGLETON) && rb_ivar_get(obj.klass, '__attached__') == obj) {
    klass = obj.klass;
  }
  else {
    // klass = RClass.make_metaclass(obj, obj.$klass);
    // console.log(obj);
    // klass = obj.$make_metaclass(obj.$klass) ;
    klass = rb_make_metaclass(obj, obj.klass);
  }

  if (FL_TEST(obj, T_CLASS)) {
    if (rb_ivar_get(klass.klass, '__attached__') != klass) {
      make_metametaclass(klass);
      // RClass.make_metametaclass(klass);
    }
  }

  return klass;
};

function rb_name_class(klass, id) {
  rb_ivar_set(klass, '__classid__', id);
}

// RClass.prototype.$class_name = function() {
//   return VN.class_path(klass.$real());
// };

function rb_make_metaclass(klass, super_class) {
  if (FL_TEST(klass, T_CLASS) && FL_TEST(klass, FL_SINGLETON)) {
    return make_metametaclass(klass);
  }
  else {
    var meta = rb_class_boot(super_class);
    FL_SET(meta, FL_SINGLETON);
    klass.klass = meta;
    rb_singleton_class_attached(meta, klass);
    
    var metasuper = meta.klass;
    if (metasuper) {
      meta.klass = metasuper;
    }
    return meta;
  }
}

function rb_singleton_class_attached(klass, obj) {
  if (FL_TEST(klass, FL_SINGLETON)) {
    rb_ivar_set(klass, '__attached__', obj);
  }
}


// RClass.prototype.$ = function(id, args) {
//   var method = this.$klass.$search_method(id);
//   // console.log('searching for: ' + id);
//   // console.log(this.$klass);
//   if (!method) throw 'VN#funcall cannot find method: ' + id ;
//   return method.apply(this, args) ;
// };
// 
// /**
//   cvar_get (klassvar_get)
// */
// RClass.prototype.$k_g = function(id) {
//   var tmp = this;
//   var value;
//   while(tmp) {
//     if (value = tmp.$iv_tbl[id]) {
//       return value;
//     }
//     tmp = tmp.$super;
//   }
//   VN.name_error('uninitialized class variable ' + id + ' in ' + this);
//   return nil ;
// };
// 
// /**
//   class var defined
// */
// RClass.prototype.$k_d = function(id) {
//   var tmp = this;
//   var value;
//   while(tmp) {
//     if (value = tmp.$iv_tbl[id]) {
//       return true;
//     }
//     tmp = tmp.$super;
//   }
//   return false;
// }
// 
// /**
//   cvar_set (klassvar_set)
// */
// RClass.prototype.$k_s = function(id, val) {
//   return this.$iv_tbl[id] = val;
// };
// 
// RClass.prototype.$i_g = function(id) {
//   return this.$iv_tbl[id];
// };
// 
// RClass.prototype.$i_s = function(id, val) {
//   this.$iv_tbl[id] = val;
//   return val ;
// }

/**
  Define 'normal' method
*/
function rb_define_method(klass, name, func, argc) {
  func.rb_argc = argc;
  rb_add_method(klass, name, func, NOEX_PUBLIC);
}

function rb_define_private_method(klass, name, func, argc) {
  func.rb_argc = argc;
  rb_add_method(klass, name, func, NOEX_PRIVATE);
}

function rb_define_private_method(klass, name, func, argc) {
  func.rb_argc = argc;
  rb_add_method(klass, name, func, NOEX_PROTECTED);
}

function rb_define_singleton_method(klass, name, func, argc) {
  rb_define_method(rb_singleton_class(klass), name, func, argc);
}

function rb_add_method(klass, name, func) {
  klass.m_tbl[name] = func;
  // func.displayName = klass.iv_tbl.__classid__ + "#" + name;
}

function rb_define_alloc_func(klass, func) {
  rb_define_method(rb_singleton_class(klass), 'allocate', func, 0);
}


// RClass.prototype.$def = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$define_protected_method = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$define_private_method = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$undef_method = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$add_method = function(name, func) {
//   this.$m_tbl[name] = func;
// };

/**
  Define singleton
*/
// RClass.prototype.$def_s = function(name, func) {
//   RClass.singleton_class(this).$def(name, func);
// };
// 
// RClass.prototype.$define_alias = function(id1, id2) {
//   
// };
// 
// RClass.prototype.$define_alloc_func = function(func) {
//   RClass.singleton_class(this).$add_method('allocate', func);
// };
// 
// RClass.prototype.$undef_alloc_func = function() {
//   RClass.singleton_class(this).$add_method('allocate', null);
// };
// 
// RClass.prototype.$search_method = function search_method(id) {
//   // console.log('checking ' + id);
//   // console.log(this);
//   var klass = this; var func ;
//   // console.log(id);
//   // console.log(klass);
//   // return null ;
//   while (!(func = klass.$m_tbl[id])) {
//     klass = klass.$super;
//     // console.log(this.$super.__classid__);
//     if (!klass) return undefined;
//   }
//   // console.log('returning true for ' + id);
//   return func;
// };
// 
// RClass.prototype.$search_super_method = function(from,id) {
//   // get current
//   
//   /**
//     Match func = from, to match current function
//     THEN search by name from there up, otherwise, chains of more then
//     2 supers will keep rematching second super
//   */
//   var klass = this; var func;
//   while (!((func = klass.$m_tbl[id]) && func == from)) {
//     klass = klass.$super;
//     if (!klass) return undefined;
//   }
//   // now skip up one
//   klass = klass.$super;
//   if (!klass) return undefined;
//   while (!(func = klass.$m_tbl[id])) {
//      klass = klass.$super;
//      if(!klass) return undefined;
//    }
//    return func;
//   
//     // 
//     // var klass = this; var func;
//     // while (!((func = klass.$m_tbl[id]) && func != from)) {
//     //    klass = klass.$super;
//     //    if(!klass) return undefined;
//     //  }
//     // 
//     // var klass = this; var func;
//     // // console.log('from');
//     // // console.log(from);
//     // // console.log('views');
//     // // console.log(klass.$m_tbl[id]);
//     // // console.log(klass.$m_tbl[id] === from);
//     // // console.log(klass.$m_tbl[id]);
//     // while (!((func = klass.$m_tbl[id]) && func != from)) {
//     //    klass = klass.$super;
//     //    if(!klass) return undefined;
//     //  }
//     // // return func = klass.$m_tbl[id];
//     // // return func = klass.$m_tbl[id];
//     // return func;
// 
//   // var klass = this; var func ;
//   // 
//   // while (!(func = klass.$m_tbl[id])) {
//   //   klass = klass.$super;
//   //   if (!klass) return undefined;
//   // }
//   // console.log('this point');
//   // // we have the current impl, now we need to search for the super from this point..
//   // klass = klass.$super;
//   // if (!klass) return undefined;
//   // while (!(func = klass.$m_tbl[id])) {
//   //   klass = klass.$super;
//   //   if (!klass) return undefined;
//   // }
//   // return func;
// };
// 
// RClass.prototype.$ = function(id, args) {
//   // var method = this.$search_method(this.$klass, id);
//   var method = this.$klass.$search_method(id);
//   if (!method) throw 'VN#funcall cannot find method: ' + id ;
//   return method.apply(this, args) ;
// };

/**
  $const_set
*/
/* 
 * element.js
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
  Element class is used to access, add, modidy, remove Elements.
*/
var rb_cElement;

/**
  Document is a constant instance of the Element class with methods added that
  are appropriate to the document context.
*/


function Init_Element() {
  rb_cElement = rb_define_class("Element", rb_cObject);
  
}
/* 
 * file.js
 * vienna
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

/**
  @class File
  @super Object
  
  File.
*/
var rb_cFile;

/**
  Base object to store file/dir directory structure
  
  Vienna FileSystem Root ("/")
  
  Every entry has:
    . as a self referring link to current dir
    .. as a link to the parent dir
    $ holds the current dirname (not whole path, just node name)
    
    every other entry is then a file (child) belonging to the directory.
    Objects as childs represent directories, where as a string refers to a
    file, where the string content is the file content.
    
    Directory names do not include a path seperator, and cannot be 0 length.
    0 length is reserved for root directory.
*/
var vn_fs_root = {};
// roots' parent directory points to itself, only exception to rule.
vn_fs_root[".."] = vn_fs_root["."] = vn_fs_root;
vn_fs_root['$'] = "";

/**
  Object/hash, from full file/dir names to either the file contents, for files,
  or the directory structure, for directories. Makes accessing explicit file
  paths easier, instead of splitting the path and manually going through the
  tree, e.g:
  
  ...
  /vendor/vienna/lib/models => [Object object]
  /vendor/vienna/lib/views/button.rb => "class Button < Control ... end"
  ...
*/
var vn_fs_path_hash = {
  "/": vn_fs_root
};

function Init_File() {
  rb_cFile = rb_define_class("File", rb_cObject);
  
  // It seems silly to have all of these, but maybe we should have them to keep
  // code comaptible? Just return current time..?
  // rb_define_singleton_method(rb_cFile, "stat", rb_file_s_stat, 1);
  // rb_define_singleton_method(rb_cFile, "lstat", rb_file_s_lstat, 1);
  // rb_define_singleton_method(rb_cFile, "ftype", rb_file_s_ftype, 1);
  // 
  // rb_define_singleton_method(rb_cFile, "atime", rb_file_s_atime, 1);
  // rb_define_singleton_method(rb_cFile, "mtime", rb_file_s_mtime, 1);
  // rb_define_singleton_method(rb_cFile, "ctime", rb_file_s_ctime, 1);
  // 
  // rb_define_singleton_method(rb_cFile, "utime", rb_file_s_utime, -1);
  // rb_define_singleton_method(rb_cFile, "chmod", rb_file_s_chmod, -1);
  // rb_define_singleton_method(rb_cFile, "chown", rb_file_s_chown, -1);
  // rb_define_singleton_method(rb_cFile, "lchmod", rb_file_s_lchmod, -1);
  // rb_define_singleton_method(rb_cFile, "lchown", rb_file_s_lchown, -1);
  // 
  // rb_define_singleton_method(rb_cFile, "link", rb_file_s_link, 2);
  // rb_define_singleton_method(rb_cFile, "symlink", rb_file_s_symlink, 2);
  // rb_define_singleton_method(rb_cFile, "readlink", rb_file_s_readlink, 1);
  // 
  // rb_define_singleton_method(rb_cFile, "unlink", rb_file_s_unlink, -2);
  // rb_define_singleton_method(rb_cFile, "delete", rb_file_s_unlink, -2);
  // rb_define_singleton_method(rb_cFile, "rename", rb_file_s_rename, 2);
  // rb_define_singleton_method(rb_cFile, "umask", rb_file_s_umask, -1);
  // rb_define_singleton_method(rb_cFile, "truncate", rb_file_s_truncate, 2);
  // rb_define_singleton_method(rb_cFile, "expand_path", rb_file_s_expand_path, -1);
  // rb_define_singleton_method(rb_cFile, "absolute_path", rb_file_s_absolute_path, -1);
  // rb_define_singleton_method(rb_cFile, "basename", rb_file_s_basename, -1);
  // rb_define_singleton_method(rb_cFile, "dirname", rb_file_s_dirname, 1);
  // rb_define_singleton_method(rb_cFile, "extname", rb_file_s_extname, 1);
  // rb_define_singleton_method(rb_cFile, "path", rb_file_s_path, 1);
  // 
  // rb_define_const(rb_cFile, "Separator", "/");
  // rb_define_const(rb_cFile, "SEPARATOR", "/");
  // rb_define_const(rb_cFile, "PATH_SEPARATOR", "/");
  // 
  // rb_define_singleton_method(rb_cFile, "split",  rb_file_s_split, 1);
  // rb_define_singleton_method(rb_cFile, "join",   rb_file_s_join, -2);
}

/* 
 * init.js
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

function rb_call_inits() {
  Init_Object();
  Init_top_self();
  Init_Array();
  Init_Number();
  Init_String();
  Init_VM();
  Init_vm_eval();
  Init_load();
  Init_Bundle();
  
  Init_Browser();
  Init_Element();
}
/* 
 * load.js
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
  Entry point 1.
  ==============
  
  This should be used for apps that do not require the vienna build tools. Simply
  pass it the root .rb file that you wish to use. simples.
  
  usage:
  
    vm_rb_main('my_file.rb');
      => app runs.
      
  All searches, for require() statements, look for .rb files, not bundles.
*/
function vm_rb_main(path) {
  rb_call_inits();
  rb_top_vm.search_style = ".rb";
  if (path.substr(path.length - 3) === ".rb") {
    path = path.substr(0, path.length - 3);
  }
  return rb_f_require(rb_top_self, path);
}

/**
  Entry point 2.
  ==============
  
  Used for the bundles appraoch, where all files are already pre-compiled, or
  vn-server is used to deploy files. This basically means no raw .rb files will
  need to be compiled, so all searches take place for .vn files
  
  This loads the .rb file from the app bundle.
  
  This actually loads each vendor bundle and the app bundle from the server, and
  then, only when that is complete, does it actually load and run the given file.
  
  For now, synchronous callbacks: in future, this will be async to avoid blocking
  browser. Will need to make use of callbacks.
*/
function vm_bundle_main(filename) {
  if (!window.VN_VENDOR_PATH) VN_VENDOR_PATH = '/vendor';
  if (!window.VN_APPLICATION_PATH) VN_APPLICATION_PATH = '/';
  // VN_BOOTSTRAP_APPLICATION = "sample_controls";
  // VN_BOOTSTRAP_BUNDLES = ["vienna"];
  for (var i = 0; i < VN_BOOTSTRAP_BUNDLES.length; i++) {
    var fullpath = VN_VENDOR_PATH + '/' + VN_BOOTSTRAP_BUNDLES[i] + '.vngem';
    console.log("Need to load: " + fullpath);
  }
  
  // app
  var fullpath = VN_BOOTSTRAP_APPLICATION + '.vngem';
  console.log("need to load " + fullpath);
  var r = new XMLHttpRequest();
  r.open("GET", fullpath, false);
  r.send(null);
  console.log(r.responseText);
  // console.log(window.location);
  
  // vm_run_mode_sleep(rb_top_vm);
  // var r = new XMLHttpRequest();
  // r.open("GET", path + '.rb', false);
  // r.onreadystatechange=function() {
  //   if (r.readyState==4) {
  //     var rt = r.responseText;
  //     // console.log(r);
  //     var a = new vn_parser(path + '.rb', rt);
  //     var res = a.parse(rt);
  //     rb_iseq_eval(res);
  //   }
  // }
  // r.send(null);
  
}

// /**
//   Main entry point (ish). At this point, only the core library exists, and all the
//   inits() have been called. In development mode, VN_MAIN_BNDLE_NAME will be used to
//   load the root .rb file. In production mode, it will load the root .vn file. which
//   is a bundle. for now, assume everything is a .vn file.
// */
// function rb_run_vm() {
//   vn_bundle_load_at_path(VN_MAIN_BUNDLE_NAME, function(bundle) {
//     var f = bundle.files['lib/' + VN_MAIN_BUNDLE_NAME + '.rb'];
//     // require_file...
//     var o = eval(f.source);
//     // o is our opcodes..
//     f.required = true;
//     
//     // run vm.
//     rb_iseq_eval(o);
//   });
// }

/**
  Main entry point for a require statement. Basically, this will require the path
  given, unless it has already been required. The same file cannot be required
  twice. This is done by pausing the current thread, doing all the AJAX file
  retrieval, parsing/compiling if required, then executing it. Once the file has
  been dealt with, then a return value of true is pushed onto the stack, and the
  vm begins to run again, doing whatever steps are necessary. There are three
  types of possible files that can be included:
  
  === Ruby source (.rb)
  
  These are parsed as expected. Default search type.
  
  === Javascript source (.js)
  
  As expected. These are the equivalent of .c libraries for vanilla ruby
  
  === Compiled ruby (.vn) <- filename to be determined
  
  Already compiled into bytecode formats.
  
  == On success
  
  Put 'true' on top of stack, and return
  
  == On failure
  
  Throw an eLoadError.
*/
function rb_f_require(obj, path) {
  // pause vm
  vm_run_mode_sleep(rb_top_vm);
  var r = new XMLHttpRequest();
  r.open("GET", path + '.rb', false);
  r.onreadystatechange=function() {
    if (r.readyState==4) {
      var rt = r.responseText;
      // console.log(r);
      var a = new vn_parser(path + '.rb', rt);
      var res = a.parse(rt);
      rb_iseq_eval(res);
    }
  }
  r.send(null);
}

/**
  Load, parse, eval the given text
*/
function rb_eval_raw(str) {
  
}

function Init_load() {
  // require
  rb_define_method(rb_cBasicObject, "require", rb_f_require, 1);
}
/* 
 * module.js
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

var RModule = { } ;

function rb_define_module(id) {
  var module;
  if (rb_const_defined(rb_cObject, id)) {
    // module = cObject.$c_g(id);
    module = rb_const_get(rb_cObject, id);
    if (FL_TEST(module, T_MODULE)) {
      return module;
    }
    throw id + ' is not a module';
  }
  module = rb_define_module_id(id);
  rb_class_tbl[id] = module;
  rb_const_set(rb_cObject, id, module);

  return module;
};

function rb_define_module_under(outer, id) {
  var module;
  if (VN.const_defined_at(outer, id)) {
    module = VN.const_get_at(outer, id);
    if (module.type == VN.MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = VN.define_module_id(id);
  VN.const_set(outer, id, module);
  VN.set_class_path(module, outer, name);
  return module;
};

function rb_define_module_id(id) {
  var mdl = rb_mod_create();
  rb_name_class(mdl, id);
  // VN.name_class(mdl, id);
  // mdl.$name(id);
  // mdl.$name(id);
  return mdl;
};

function rb_mod_create() {
  var m = class_alloc(T_MODULE, rb_cModule);
  m.sup = rb_cObject;
  return m;
}

// RModule.create = function() {
//   var mdl = RClass.alloc(VN.MODULE, cModule);
//   mdl.$super = cObject;
//   return mdl;
// };

function rb_include_module(klass, module) {
  // FIXME: need to check if already included, or its a parent etc etc.
  klass.sup = rb_include_class_new(module, klass);
}


function rb_include_class_new(mod, sup) {
  var klass = class_alloc(T_ICLASS, rb_cClass);
  klass.iv_tbl = mod.iv_tbl;
  klass.m_tbl = mod.m_tbl;
  klass.sup = sup.sup;
  klass.klass = mod;
  // console.log('included class');
  // console.log(klass);
  return klass;
};
/* 
 * number.js
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

var rb_cNumber;

function rb_num_plus(a, b) {
  return a + b;
}

function rb_num_minus(a, b) {
  return a - b;
}

function rb_num_mul(a, b) {
  return a * b;
}

function rb_num_div(a, b) {
  return a / b;
}

function rb_num_modulo(a, b) {
  return a % b;
}

function rb_num_pow(a, b) {
  return Math.pow(a, b);
}






function rb_num_gt(a, b) {
  return a > b;
}

function rb_num_ge(a, b) {
  return a >= b;
}

function rb_num_lt(a, b) {
  return a < b;
}

function rb_num_le(a, b) {
  return a <= b;
}


function Init_Number() {
  
  rb_cNumber = rb_define_class("Number", rb_cObject);
  Number.prototype.klass = rb_cNumber;
  
  // rb_define_method(rb_cNumber, "singleton_method_added", rb_num_sadded, 1);
  // rb_include_module(rb_cNumber, rb_mComparable);
  // rb_define_method(rb_cNumber, "initialize_copy", rb_num_init_copy, 1);
  // rb_define_method(rb_cNumber, "coerce", rb_num_coerce, 1);
  
  // rb_define_method(rb_cNumber, "+@", rb_num_uplus, 0);
  // rb_define_method(rb_cNumber, "-@", rb_num_uminus, 0);
  // rb_define_method(rb_cNumber, "<=>", rb_num_cmp, 1);
  // rb_define_method(rb_cNumber, "eql?", rb_num_eql, 1);
  // rb_define_method(rb_cNumber, "quo", rb_num_quo, 1);
  // rb_define_method(rb_cNumber, "fdiv", rb_num_fdiv, 1);
  // rb_define_method(rb_cNumber, "div", rb_num_div, 1);
  // rb_define_method(rb_cNumber, "divmod", rb_num_divmod, 1);
  // rb_define_method(rb_cNumber, "modulo", rb_num_modulo, 1);
  // rb_define_method(rb_cNumber, "remainder", rb_num_remainder, 1);
  // rb_define_method(rb_cNumber, "abs", rb_num_abs, 0);
  // rb_define_method(rb_cNumber, "magnitude", rb_num_abs, 0);
  // rb_define_method(rb_cNumber, "to_int", rb_num_to_i, 0);

  // rb_define_method(rb_cNumber, "real?", rb_num_real_p, 0);
  // rb_define_method(rb_cNumber, "integer?", rb_num_int_p, 0);
  // rb_define_method(rb_cNumber, "zero?", rb_num_zero_p, 0);
  // rb_define_method(rb_cNumber, "nonzero?", rb_num_nonzero_p, 0);

  // rb_define_method(rb_cNumber, "floor", rb_num_floor, 0);
  // rb_define_method(rb_cNumber, "ceil", rb_num_ceil, 0);
  // rb_define_method(rb_cNumber, "round", rb_num_round, -1);
  // rb_define_method(rb_cNumber, "truncate", rb_num_truncate, 0);
  // rb_define_method(rb_cNumber, "step", rb_num_step, -1);

  // rb_define_method(rb_cNumber, "odd?", rb_num_odd_p, 0);
  // rb_define_method(rb_cNumber, "even?", rb_num_even_p, 0);
  // rb_define_method(rb_cNumber, "upto", rb_num_upto, 1);
  // rb_define_method(rb_cNumber, "downto", rb_num_downto, 1);
  // rb_define_method(rb_cNumber, "times", rb_num_dotimes, 0);
  // rb_define_method(rb_cNumber, "succ", rb_num_succ, 0);
  // rb_define_method(rb_cNumber, "next", rb_num_succ, 0);
  // rb_define_method(rb_cNumber, "pred", rb_num_pred, 0);
  // rb_define_method(rb_cNumber, "chr", rb_num_chr, -1);
  // rb_define_method(rb_cNumber, "ord", rb_num_ord, 0);
  // rb_define_method(rb_cNumber, "to_i", rb_num_to_i, 0);
  // rb_define_method(rb_cNumber, "to_s", rb_num_to_s, -1);
  // rb_define_method(rb_cNumber, "to_f", rb_num_to_f, 0);

  rb_define_method(rb_cNumber, "+", rb_num_plus, 1);
  rb_define_method(rb_cNumber, "-", rb_num_minus, 1);
  rb_define_method(rb_cNumber, "*", rb_num_mul, 1);
  rb_define_method(rb_cNumber, "/", rb_num_div, 1);
  rb_define_method(rb_cNumber, "%", rb_num_modulo, 1);
  rb_define_method(rb_cNumber, "**", rb_num_pow, 1);

  // rb_define_method(rb_cNumber, "==", rb_num_equal, 1);
  // rb_define_method(rb_cNumber, "<=>", rb_num_cmp, 1);
  rb_define_method(rb_cNumber, ">", rb_num_gt, 1);
  rb_define_method(rb_cNumber, ">=", rb_num_ge, 1);
  rb_define_method(rb_cNumber, "<", rb_num_lt, 1);
  rb_define_method(rb_cNumber, "<=", rb_num_le, 1);

  // rb_define_method(rb_cNumber, "~", rb_num_rev, 0);
  // rb_define_method(rb_cNumber, "&", rb_num_and, 1);
  // rb_define_method(rb_cNumber, "|", rb_num_or,  1);
  // rb_define_method(rb_cNumber, "^", rb_num_xor, 1);
  // rb_define_method(rb_cNumber, "[]", rb_num_aref, 1);

  // rb_define_method(rb_cNumber, "<<", rb_num_lshift, 1);
  // rb_define_method(rb_cNumber, ">>", rb_num_rshift, 1);
}
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
 
/**
  Core objects
*/

var rb_cBasicObject, rb_cObject, rb_cModule, rb_cClass;
var rb_cNilClass;


 
 /**
   Set ivar
   @param obj - object to set ivar on
   @param id - name of variable, e.g. '@background_color'
   @param val - value to set
 */
function rb_ivar_set(obj, id, val) {
  obj.iv_tbl[id] = val;
  return val;
}

function rb_ivar_get(obj, id) {
  return obj.iv_tbl[id];
}


 // /**
 //   For compatibility
 // */
 // RObject.prototype.$i_g = function(id) {
 //   if (this.$iv_tbl[id] == undefined || this.$iv_tbl[id] == null) {
 //     return nil;
 //   }
 //   return this.$iv_tbl[id];
 // };
 // 
 // /*
 //   $ - call method
 //   @param id - method name
 //   @param args - array of all arguments
 // */
 // RObject.prototype.$ = function(id, args) {
 //   var method = this.$klass.$search_method(id);
 // 
 //   if (!method) {
 //     console.log(this);
 //     throw 'RObject#call cannot find method: ' + id ;
 //   } 
 //   return method.apply(this, args) ;
 // };







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
 


 // RClass.prototype.$search_super_method = function(from,id) {
 //   // get current
 //   
 //   /**
 //     Match func = from, to match current function
 //     THEN search by name from there up, otherwise, chains of more then
 //     2 supers will keep rematching second super
 //   */
 //   var klass = this; var func;
 //   while (!((func = klass.$m_tbl[id]) && func == from)) {
 //     klass = klass.$super;
 //     if (!klass) return undefined;
 //   }
 //   // now skip up one
 //   klass = klass.$super;
 //   if (!klass) return undefined;
 //   while (!(func = klass.$m_tbl[id])) {
 //      klass = klass.$super;
 //      if(!klass) return undefined;
 //    }
 //    return func;
 //   
 //     // 
 //     // var klass = this; var func;
 //     // while (!((func = klass.$m_tbl[id]) && func != from)) {
 //     //    klass = klass.$super;
 //     //    if(!klass) return undefined;
 //     //  }
 //     // 
 //     // var klass = this; var func;
 //     // // console.log('from');
 //     // // console.log(from);
 //     // // console.log('views');
 //     // // console.log(klass.$m_tbl[id]);
 //     // // console.log(klass.$m_tbl[id] === from);
 //     // // console.log(klass.$m_tbl[id]);
 //     // while (!((func = klass.$m_tbl[id]) && func != from)) {
 //     //    klass = klass.$super;
 //     //    if(!klass) return undefined;
 //     //  }
 //     // // return func = klass.$m_tbl[id];
 //     // // return func = klass.$m_tbl[id];
 //     // return func;
 // 
 //   // var klass = this; var func ;
 //   // 
 //   // while (!(func = klass.$m_tbl[id])) {
 //   //   klass = klass.$super;
 //   //   if (!klass) return undefined;
 //   // }
 //   // console.log('this point');
 //   // // we have the current impl, now we need to search for the super from this point..
 //   // klass = klass.$super;
 //   // if (!klass) return undefined;
 //   // while (!(func = klass.$m_tbl[id])) {
 //   //   klass = klass.$super;
 //   //   if (!klass) return undefined;
 //   // }
 //   // return func;
 // };

 // /**
 //   For compatibility
 // */
 // var VN$sup = rb_supcall;
 // 
 // /**
 //   Call super
 //   - from = callee
 // */
 // RObject.prototype.$sup = function(from, id, args) {
 //   // console.log('callee');
 //   // console.log(from);
 //   var method = this.$klass.$search_super_method(from, id);
 //   if (!method) throw 'RObject#call cannot find super method for: ' + id ;
 //   // console.log('got super');
 //   // console.log(method);
 //   return method.apply(this, args) ;
 // };
 // 
 // /**
 //   We need to copy some of RClass' methods for singletons
 // */
 // RObject.prototype.$def_s = RClass.prototype.$def_s;
 // RObject.prototype.$make_metaclass = RClass.prototype.$make_metaclass;
 
 
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

function rb_obj_alloc(klass) {
  return rb_class_allocate_instance(klass);
 // return rb_funcall(klass, 'allocate', 0);
}

function rb_obj_dummy() {
 return nil;
}

function rb_class_allocate_instance(klass) {
 var o = new RObject();
 o.klass = klass;
 FL_SET(o, T_OBJECT);
 return o;
}

function rb_obj_equal(self, obj) {
 if (self == obj) return true;
 return false;
}

function rb_obj_not(self) {
 return RTEST(self) ? false : true;
}

function rb_obj_not_equal(self, obj) {
 var r = rb_funcall(self, "==", obj);
 return RTEST(r) ? false : true;
}

function rb_false() {
 return false;
}

function rb_true() {
 return true;
}

function rb_equal(self, obj) {
 var r;
 if (self == obj) return true;
 r = rb_funcall(self, "==", obj);
 if (RTEST(r)) return true;
 return false;
}

function rb_obj_match() {
 return nil;
}

function rb_obj_not_match(self, obj) {
 var r = rb_funcall(self, "=~", obj);
 return RTEST(r) ? false : true;
}

function rb_class_real(klass) {
 if (!klass) return nil;
 while (FL_TEST(klass, FL_SINGLETON) || FL_TEST(klass, T_ICLASS)) {
   klass = klass.sup;
 }
 return klass;
}

function rb_obj_class(self) {
 return rb_class_real(self.klass);
}

function rb_obj_clone(self) {
 return self;
}

function rb_obj_dup(self) {
 return self;
}

function rb_obj_init_copy(self) {
 return self;
}

function rb_any_to_s(self) {
 var c = rb_obj_classname(self);
 return "<" + c + ":0x000000>";
}

function rb_obj_inspect(self) {
 return rb_any_to_s(self);
}

function rb_class_new_instance(argc, argv, klass) {
  var o = rb_obj_alloc(klass);
  // call init here
  return o;
}

function rb_f_puts(argc, argv, recv) {
  for (var i = 0; i < argc; i++) {
    console.log(argv[i]);
  }
}





function Init_Object() {
  var metaclass;
  rb_cBasicObject = boot_defclass('BasicObject', null);
  rb_cObject = boot_defclass('Object', rb_cBasicObject);
  rb_cModule = boot_defclass('Module', rb_cObject);
  rb_cClass = boot_defclass('Class', rb_cModule);
  
  // hmm, we jhave to set the const again... or should we?
  rb_const_set(rb_cObject, "BaiscObject", rb_cBasicObject);

  metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
  metaclass = rb_make_metaclass(rb_cObject, metaclass);
  metaclass = rb_make_metaclass(rb_cModule, metaclass);
  metaclass = rb_make_metaclass(rb_cClass, metaclass);

  boot_defmetametaclass(rb_cModule, metaclass);
  boot_defmetametaclass(rb_cObject, metaclass);
  boot_defmetametaclass(rb_cBasicObject, metaclass);
  
  rb_define_private_method(rb_cBasicObject, "initialize", rb_obj_dummy, 0);
  // FIXME: wtf made this break?
  // rb_define_alloc_func(rb_cBasicObject, rb_class_allocate_instance);
  rb_define_method(rb_cBasicObject, "==", rb_obj_equal, 1);
  rb_define_method(rb_cBasicObject, "equal?", rb_obj_equal, 1);
  rb_define_method(rb_cBasicObject, "!", rb_obj_not, 0);
  rb_define_method(rb_cBasicObject, "!=", rb_obj_not_equal, 1);

  rb_define_private_method(rb_cBasicObject, "singleton_method_added", rb_obj_dummy, 1);
  rb_define_private_method(rb_cBasicObject, "singleton_method_removed", rb_obj_dummy, 1);
  rb_define_private_method(rb_cBasicObject, "singleton_method_undefined", rb_obj_dummy, 1);

  rb_mKernel = rb_define_module("Kernel");
  rb_include_module(rb_cObject, rb_mKernel);
  rb_define_private_method(rb_cClass, "inherited", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "included", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "extended", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "method_added", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "method_removed", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "method_undefined", rb_obj_dummy, 1);

  rb_define_method(rb_mKernel, "nil?", rb_false, 0);
  rb_define_method(rb_mKernel, "===", rb_equal, 1); 
  rb_define_method(rb_mKernel, "=~", rb_obj_match, 1);
  rb_define_method(rb_mKernel, "!~", rb_obj_not_match, 1);
  rb_define_method(rb_mKernel, "eql?", rb_obj_equal, 1);

  rb_define_method(rb_mKernel, "class", rb_obj_class, 0);
  rb_define_method(rb_mKernel, "clone", rb_obj_clone, 0);
  rb_define_method(rb_mKernel, "dup", rb_obj_dup, 0);
  rb_define_method(rb_mKernel, "initialize_copy", rb_obj_init_copy, 1);

  // rb_define_method(rb_mKernel, "taint", rb_obj_taint, 0);
  // rb_define_method(rb_mKernel, "tainted?", rb_obj_tainted, 0);
  // rb_define_method(rb_mKernel, "untaint", rb_obj_untaint, 0);
  // rb_define_method(rb_mKernel, "untrust", rb_obj_untrust, 0);
  // rb_define_method(rb_mKernel, "untrusted?", rb_obj_untrusted, 0);
  // rb_define_method(rb_mKernel, "trust", rb_obj_trust, 0);
  // rb_define_method(rb_mKernel, "freeze", rb_obj_freeze, 0);
  // rb_define_method(rb_mKernel, "frozen?", rb_obj_frozen_p, 0);
  
  rb_define_method(rb_mKernel, "puts", rb_f_puts, -1);
  
  rb_define_method(rb_mKernel, "to_s", rb_any_to_s, 0);
  rb_define_method(rb_mKernel, "inspect", rb_obj_inspect, 0);
  // rb_define_method(rb_mKernel, "methods", rb_obj_methods, -1);
  // rb_define_method(rb_mKernel, "singleton_methods", rb_obj_singleton_methods, -1);
  // rb_define_method(rb_mKernel, "protected_methods", rb_obj_protected_methods, -1);
  // rb_define_method(rb_mKernel, "private_methods", rb_obj_private_methods, -1);
  // rb_define_method(rb_mKernel, "public_methods", rb_obj_public_methods, -1);
  // rb_define_method(rb_mKernel, "instance_variables", rb_obj_instance_variables, 0);
  // rb_define_method(rb_mKernel, "instance_variable_get", rb_obj_ivar_get, 1);
  // rb_define_method(rb_mKernel, "instance_variable_set", rb_obj_ivar_set, 2);
  // rb_define_method(rb_mKernel, "instance_variable_defined?", rb_obj_ivar_defined, 1);
  // rb_define_private_method(rb_mKernel, "remove_instance_variable", rb_obj_remove_instance_variable, 1);
  // 
  // rb_define_method(rb_mKernel, "instance_of?", rb_obj_is_instance_of, 1);
  // rb_define_method(rb_mKernel, "kind_of?", rb_obj_is_kind_of, 1);
  // rb_define_method(rb_mKernel, "is_a?", rb_obj_is_kind_of, 1);
  // rb_define_method(rb_mKernel, "tap", rb_obj_tap, 0);
  // 
  // rb_define_global_function("sprintf", rb_f_sprintf, -1);
  // rb_define_global_function("format", rb_f_sprintf, -1);
  // 
  // rb_define_global_function("Integer", rb_f_integer, 1);
  // rb_define_global_function("Float", rb_f_float, 1);
  // 
  // rb_define_global_function("String", rb_f_string, 1);
  // rb_define_global_function("Array", rb_f_array, 1);
  // 
  // rb_cNilClass = rb_define_class("NilClass", rb_cObject);
  // rb_define_method(rb_cNilClass, "to_i", nil_to_i, 0);
  // rb_define_method(rb_cNilClass, "to_f", nil_to_f, 0);
  // rb_define_method(rb_cNilClass, "to_s", nil_to_s, 0);
  // rb_define_method(rb_cNilClass, "to_a", nil_to_a, 0);
  // rb_define_method(rb_cNilClass, "inspect", nil_inspect, 0);
  // rb_define_method(rb_cNilClass, "&", false_and, 1);
  // rb_define_method(rb_cNilClass, "|", false_or, 1);
  // rb_define_method(rb_cNilClass, "^", false_xor, 1);
  // 
  // rb_define_method(rb_cNilClass, "nil?", rb_true, 0);
  // rb_undef_alloc_func(rb_cNilClass);
  // rb_undef_method(rb_cNilClass.klass, "new");
  // rb_define_global_const("NIL", Qnil);
  // 
  // rb_define_method(rb_cModule, "freeze", rb_mod_freeze, 0);
  // rb_define_method(rb_cModule, "===", rb_mod_eqq, 1);
  // rb_define_method(rb_cModule, "==", rb_obj_equal, 1);
  // rb_define_method(rb_cModule, "<=>",  rb_mod_cmp, 1);
  // rb_define_method(rb_cModule, "<",  rb_mod_lt, 1);
  // rb_define_method(rb_cModule, "<=", rb_class_inherited_p, 1);
  // rb_define_method(rb_cModule, ">",  rb_mod_gt, 1);
  // rb_define_method(rb_cModule, ">=", rb_mod_ge, 1);
  // rb_define_method(rb_cModule, "initialize_copy", rb_mod_init_copy, 1);
  // rb_define_method(rb_cModule, "to_s", rb_mod_to_s, 0);
  // rb_define_method(rb_cModule, "included_modules", rb_mod_included_modules, 0);
  // rb_define_method(rb_cModule, "include?", rb_mod_include_p, 1);
  // rb_define_method(rb_cModule, "name", rb_mod_name, 0);
  // rb_define_method(rb_cModule, "ancestors", rb_mod_ancestors, 0);
  // 
  // rb_define_private_method(rb_cModule, "attr", rb_mod_attr, -1);
  // rb_define_private_method(rb_cModule, "attr_reader", rb_mod_attr_reader, -1);
  // rb_define_private_method(rb_cModule, "attr_writer", rb_mod_attr_writer, -1);
  // rb_define_private_method(rb_cModule, "attr_accessor", rb_mod_attr_accessor, -1);
  // 
  // rb_define_alloc_func(rb_cModule, rb_module_s_alloc);
  // rb_define_method(rb_cModule, "initialize", rb_mod_initialize, 0);
  // rb_define_method(rb_cModule, "instance_methods", rb_class_instance_methods, -1);
  // rb_define_method(rb_cModule, "public_instance_methods", rb_class_public_instance_methods, -1);
  // rb_define_method(rb_cModule, "protected_instance_methods", rb_class_protected_instance_methods, -1);
  // rb_define_method(rb_cModule, "private_instance_methods", rb_class_private_instance_methods, -1);
  // 
  // rb_define_method(rb_cModule, "constants", rb_mod_constants, -1);
  // rb_define_method(rb_cModule, "const_get", rb_mod_const_get, -1);
  // rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
  // rb_define_method(rb_cModule, "const_defined?", rb_mod_const_defined, -1);
  // rb_define_private_method(rb_cModule, "remove_const", rb_mod_remove_const, 1);
  // rb_define_method(rb_cModule, "const_missing", rb_mod_const_missing, 1);
  // rb_define_method(rb_cModule, "class_variables", rb_mod_class_variables, 0);
  // rb_define_method(rb_cModule, "remove_class_variable", rb_mod_remove_cvar, 1);
  // rb_define_method(rb_cModule, "class_variable_get", rb_mod_cvar_get, 1);
  // rb_define_method(rb_cModule, "class_variable_set", rb_mod_cvar_set, 2);
  // rb_define_method(rb_cModule, "class_variable_defined?", rb_mod_cvar_defined, 1);
  // 
  rb_define_method(rb_cClass, "allocate", rb_obj_alloc, 0);
  rb_define_method(rb_cClass, "new", rb_class_new_instance, -1);
  // rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);
  // rb_define_method(rb_cClass, "initialize_copy", rb_class_init_copy, 1);
  // rb_define_method(rb_cClass, "superclass", rb_class_superclass, 0);
  // rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
  // rb_undef_method(rb_cClass, "extend_object");
  // rb_undef_method(rb_cClass, "append_features");
  // 
  // rb_cTrueClass = rb_define_class("TrueClass", rb_cObject);
  // rb_define_method(rb_cTrueClass, "to_s", true_to_s, 0);
  // rb_define_method(rb_cTrueClass, "&", true_and, 1);
  // rb_define_method(rb_cTrueClass, "|", true_or, 1);
  // rb_define_method(rb_cTrueClass, "^", true_xor, 1);
  // rb_undef_alloc_func(rb_cTrueClass);
  // rb_undef_method(rb_cTrueClass.klass, "new");
  // rb_define_global_const("TRUE", true);
  // 
  // rb_cFalseClass = rb_define_class("FalseClass", rb_cObject);
  // rb_define_method(rb_cFalseClass, "to_s", false_to_s, 0);
  // rb_define_method(rb_cFalseClass, "&", false_and, 1);
  // rb_define_method(rb_cFalseClass, "|", false_or, 1);
  // rb_define_method(rb_cFalseClass, "^", false_xor, 1);
  // rb_undef_alloc_func(rb_cFalseClass);
  // rb_undef_method(rb_cFalseClass.klass, "new");
  // rb_define_global_const("FALSE", false);
}/* 
 * ruby_eval.js
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

    // lex states
var EXPR_BEG    = 0,    EXPR_END    = 1,    EXPR_ENDARG = 2,    EXPR_ARG    = 3,
    EXPR_CMDARG = 4,    EXPR_MID    = 5,    EXPR_FNAME  = 6,    EXPR_DOT    = 7,
    EXPR_CLASS  = 8,    EXPR_VALUE  = 9;

    // keywords
var kCLASS      = 0,    kMODULE     = 1,    kDEF        = 2,    kUNDEF      = 3,
    kBEGIN      = 4,    kRESCUE     = 5,    kENSURE     = 6,    kEND        = 7,
    kIF         = 8,    kUNLESS     = 9,    kTHEN       = 10,   kELSIF      = 11,
    kELSE       = 12,   kCASE       = 13,   kWHEN       = 14,   kWHILE      = 15,
    kUNTIL      = 16,   kFOR        = 17,   kBREAK      = 18,   kNEXT       = 19,
    kREDO       = 20,   kELSIF      = 21,   kELSE       = 22,   kCASE       = 23, 
    kWHEN       = 24,   kWHILE      = 25,   kUNTIL      = 26,   kFOR        = 27,
    kBREAK      = 28,   kNEXT       = 29,   kREDO       = 30,   kRETRY      = 31,
    kIN         = 32,   kDO_COND    = 33,   kDO_BLOCK   = 34,   kDO_LAMBDA  = 35,
    kRETURN     = 36,   kYIELD      = 37,   kSUPER      = 38,   kSELF       = 39,
    kNIL        = 40,   kTRUE       = 41,   kFALSE      = 42,   kAND        = 43,
    kOR         = 44,   kNOT        = 45,   kIF_MOD     = 46,   kUNLESS_MOD = 47,
    kWHILE_MOD  = 48,   kUNTIL_MOD  = 49,   kRESCUE_MOD = 50,   kALIAS      = 51,
    kDEFINED    = 52,   klBEGIN     = 53,   klEND       = 54,   k__LINE__   = 55,
    k__FILE__   = 56,   kDO         = 57,   kDEFined    = 58,
    // tokens
    tIDENTIFIER = 59,   tFID        = 60,   tGVAR       = 61,   tIVAR       = 62,
    tCONSTANT   = 63,   tCVAR       = 64,   tLABEL      = 65,   tINTEGER    = 66,
    tFLOAT      = 67,   tSTR_CONTENT= 68,   tCHAR       = 69,   tNTH_REF    = 70,
    tBACK_REF   = 71,   tREGEXP_END = 72,   tUPLUS      = 73,   tUMINUS     = 74,
    tPOW        = 75,   tCMP        = 76,   tEQ         = 77,   tEQQ        = 78, 
    tNEQ        = 79,   tGEQ        = 80,   tLEQ        = 81,   tANDOP      = 82,
    tOROP       = 83,   tMATCH      = 84,   tNMATCH	    = 85,   tDOT2       = 86, 
    tDOT3       = 87,   tAREF       = 88,   tASET       = 89,   tLSHFT      = 90, 
    tRSHFT      = 91,   tCOLON2     = 92,   tCOLON3     = 93,   tOP_ASGN    = 94, 
    tASSOC      = 95,   tLPAREN	    = 96,   tLPAREN_ARG	= 97,   tRPAREN     = 98,  
    tLBRACK     = 99,   tLBRACE     = 100,  tLBRACE_ARG = 101,  tSTAR       = 102,
    tAMPER      = 103,  tLAMBDA     = 104,  tSYMBEG     = 105,  tSTRING_BEG = 106,
    tXSTRING_BEG= 107,  tREGEXP_BEG = 108,  tWORDS_BEG  = 109,  tQWORDS_BEG = 110,
    tSTRING_DBEG= 111,  tSTRING_DVAR= 112,  tSTRING_END = 113,  tLAMBEG     = 114,
    tUMINUS_NUM = 115,  tSTRING     = 116,  tXSTRING_END= 117,
        
    tPLUS       = 118,  tMINUS      = 119,  tNL         = 120,  tSEMI       = 121;

    // special tokens (used for generator)
var tCALL       = 150,  tMLHS       = 151;

/**
  Parse the given ruby code, str, with the given filename. This allows us to
  dynamically set the filename, for example, with eval()'d code. This returns
  an Instruction sequence, with all of its sub sequences, opcodes etc.
*/
var vn_parser = function(filename, str) {

  // current lex state
  var lex_state = EXPR_BEG;
  // last lexerparser state
  var last_state;
  // the scanner
  var scanner; //= new vn_ruby_string_scanner(str);
  // current token
  var token = { type: false, value: false };
  // last token
  var last_token = { type: false, value: false };
  // 
  var sym_tbl = { };
  // eval string..
  var eval_arr = [];
  // valid types of stmt that are valid as the first cmd args (helps us identify if the
  // next statemebnt should be appeneded to the current identifer as a cmd arg )
  var valid_cmd_args = [tIDENTIFIER, tINTEGER, tCONSTANT, tSTRING_BEG, kDO, '{', tSYMBEG];
  // start of command (not stmt), when on new line etc
  var cmd_start = false;
  
  // all contexts
  var contexts = [];
  
  // function push_context(c) {
  //   contexts.push(c);
  // }
  
  
  /**
    String parsing
  */
  var string_parse_stack = [];
  
  var push_string_parse = function(o) {
    string_parse_stack.push(o);
  };
  
  var pop_string_parse = function() {
    string_parse_stack.pop();
  };
  
  var current_string_parse = function() {
    if (string_parse_stack.length == 0) {
      return null;
    }
    return string_parse_stack[string_parse_stack.length - 1];
  };
  
  
  // create object dup
  var object_create = function(obj) {
    var targ = { };
    for (var prop in obj) {
      targ[prop] = obj[prop];
    }
    
    return targ;
  };
  
  var original_symbol = {
      nud: function () {
          return this;
      },
      led: function (left) {
          throw 'led unimplemented';
      }
  };
  
  var symbol = function(id, binding_power) {
    var sym = sym_tbl[id];
    binding_power = binding_power || 0;
    if (sym) {
      if (binding_power >= sym.lbp) {
        sym.lbp = binding_power;
      }
    }
    else {
      sym = object_create(original_symbol);
      sym.type = sym.value = id;
      sym.lbp = binding_power;
      sym_tbl[id] = sym;
    }
    return sym;
  };
  
  var sym_stmt = function (id, bp, block) {
    if (!block) {
      block = bp;
      bp = 0;
    }

    var sym = symbol(id);
    sym.std = block;
    return sym;
  };
  
  var infixr = function (id, bp, led) {
      var s = symbol(id, bp);
      s.led = led || function (left) {
          this.first = left;
          this.second = expr(bp - 1);
          this.arity = "binary";
          return this;
      };
      return s;
  };
  
  // make a function for us that has a 'usual beahiour' (saves making a function
  // over and over) - +/-/*// all do the same thing etc
  var infix = function (id, bp, led) {
      var s = symbol(id, bp);
      s.led = led || function (left) {
          this.$lhs = left;
          this.$rhs = expr(bp);
          this.type = id;
          return this;
      };
      return s;
  };
  
  var prefix = function (id, nud) {
      var s = symbol(id);
      s.nud = nud || function () {
          scope.reserve(this);
          this.first = expression(70);
          this.arity = "unary";
          return this;
      };
      return s;
  };
  
  var assignment = function (id) {
      return infixr(id, 10, function (left) {
          if (left.type !== "." && left.type !== "[" && left.type !== tIDENTIFIER && left.type != tIVAR && left.type !== tMLHS && left.type !== tCONSTANT) {
              throw 'bad lhs'
          }
          this.$lhs = left;
          this.$rhs = stmt();
          this.assignment = true;
          // this.type = "assignment";
          return this;
      });
  };
  
  assignment("=");
  
  symbol(kDO).nud = function() {
    if (token.type == '|') {
      var e;
      this.$args = [];
      // gather block params
      next_token();
      e = expr();
      this.$args.push(e);
      while (true) {
        if (token.type == "|") {
          next_token();
          break;
        }
        else if (token.type == ",") {
          next_token();
          continue;
        }
        else {
          this.$args.push(expr());
        }
        // throw "erm.."
      }
    }
    // throw token.value
    // next_token();
    // throw token.type
    this.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return this;
  };
  
  // alt block
  symbol('{').nud = function() {
    // read over {
      this.$stmt = stmt();
      // read over }
      next_token('}');
      return this;
  };
    
  // self... simple, just return
  symbol(kSELF).nud = function() {
    return this;
  };
  
  symbol(kRETURN).nud = function() {
    return this;
  };
  
  symbol(kNIL).nud = function() {
    return this;
  };
  
  symbol(kSUPER).nud = function() {
    return this;
  };
  
  symbol(kTRUE).nud = function() {
    return this;
  };
  
  symbol(kFALSE).nud = function() {
    return this;
  };
  
  symbol(tSTRING_BEG).nud = function() {
    // console.log('in hre..');
    // these will be string_contents mixed with actual ruby parse trees
    this.$parts = [];
    // next_token();
    // throw token.value
    while (true) {
      if (token.type === false) {
        throw 'Parsing string error: not expecting EOF before end of string'
      }
      else {
        // console.log(token.value);
        if (token.type === tSTRING_END) {
          next_token();
          break;
        }
        else {
          if (token.type === tSTR_CONTENT) {
            this.$parts.push(token)
            next_token();
          }
          else if (token.type === tSTRING_DBEG) {
            var d = token;
            // skip over dbeg
            next_token();
            d.$value = stmt();
            this.$parts.push(d);
            // skip over '}'
            next_token();
          }
          // console.log('found a part');
          // this.$parts.push(token);
          // next_token();
        }
        
      }
    }
    return this;
  };
  
  // when we get identifier identifier (treat first like receiver, second like arg1)
  symbol(tIDENTIFIER).nud = function() {
    // we need to check last_state, as lex_state (current) is overridden when parsing current token
    if ((valid_cmd_args.indexOf(token.type) != -1) && (last_state == EXPR_CMDARG)) {
      // console.log("about to gather command args..");
      gather_command_args(this);
      this.type = tCALL;
      this.$recv = null;
      this.$meth = this.value;
      // this.$meth = this;
    }
    return this;
  };
  
  symbol(tCONSTANT).nud = function() {
    return this;
  };
  
  // the 'command' to apply the argumens to
  // FIXME: rewrite to asume first arg is not neceserialy a arg, it could be start
  // of assocs, or might be start of kDO
  var gather_command_args = function(cmd) {
    cmd.$call_args = {
      args: []
    };
    // console.log('tIDENTIFIER "' + token.value + '" lex state: ' + lex_state + ' last state: ' + last_state + ' ,last token: ' + last_token.value);
    if ((token.type !== kDO) && (token.type !== '{')) {
      // dont add if next statement is kDO...
      // console.log("getting exopr..");
      cmd.$call_args.args.push(expr());
    }
    
    // collect remaining params
    if (token.type === ',') {
      // read over initial commar
      next_token();
      while (true) {
        s = expr();
        // s = expr(80);
        // this.$args.push(stmt());
        // check if tok is tASSOC.. if so, , then we
        // are beginning a hash list, so dont add stmt to $args, but push it to
        // the hash arg list instead
        // console.log(token.type);
        if (token.type === tASSOC) {
          // console.log('found tassoc');
          // should we check if we already have assoc list? having it more than once per cmd call
          // might be an error
          var a_keys = [], a_values = [];
          cmd.$assocs = { '$keys': a_keys, '$values': a_values };
          a_keys.push(s);
          // read over tassoc
          next_token();
          a_values.push(expr());
          
          while (true) {
            if (token.type !== ',') {
              // end of assoc list
              break;
            }
            // read over commar
            next_token(',');
            a_keys.push(expr());
            next_token(tASSOC);
            a_values.push(expr());
          }
          
          // console.log(this);
          // throw 'hash begin!'
        }
        else {
          cmd.$call_args.args.push(s);
        }
        // CHECK HERE for do_block
        // move this outside of loop? once we have do_block, command is over
        
        
        if (token.type !== ',') {
          break;
        }
        // any other case, add it as an arg
        
        // console.log(token.type);
        next_token(',');
        // check for 'wrong' token types... a def, class, module etc are NOT valid tokens
        if ([kDEF, kCLASS, kMODULE, kIF].indexOf(token.type) !== -1) {
          throw 'Command Args: Not expecting token "' + token.type + '". Perhaps a trailing commar?'
        }
      }
    }
    if (token.type === kDO) {
      // gather do block
      cmd.$brace_block = stmt();
    }
    else if (token.type === '{') {
      // gather rlcurly block
      cmd.$brace_block = stmt();
    }
  };
  
  // kDO opt_block_param compstmt kEND
  var gather_do_block = function() {
    var result = token;
    // read over kDO
    next_token();
    // throw token.value
    result.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return result;
  }
  
  symbol(tINTEGER).nud = function() { 
    return this; 
  };
  
  symbol(tSYMBEG).nud = function() {
    this.$name = stmt();
    return this;
  };
  
  symbol(tIVAR).nud = function() {
    return this;
  };
  
  symbol(tCVAR).nud = function() {
    return this;
  };
  
  symbol(tGVAR).nud = function() {
    return this;
  };
  
  // Catching block definitions in Def statements.
  symbol("&").nud = function() {
    this.$name = stmt();
    return this;
  }
  
  
  infix(",", 80, function(left) {
    this.type = tMLHS;
    // check if already part of a mLHS chain
    if (left.type == tMLHS) {
      // add to current chain
      throw "in here.." + token.value
    }
    else {
      // start new chain
      this.$parts = [];
      this.$parts.push(left);
      this.$parts.push(expr(10));
      // dont get next_token. expr() gets it for us.
      // next_token();
      // this.$parts.push(next_token());
    }
    // throw token.value
    // throw "in here.." + token.value
    
    
    return this;
  });
  
  
  /**
    Fixme!! this is going to break!!
    
    Argh! not sure how we are going to do mlghs, mrhs
  */
  // infix(',', 80, function(left) {
  //   this.$lhs = left;
  //   if (token.type === tSYMBEG) {
  //     // throw 'we need to parse an assoc.'
  //     next_token();
  //     next_token();
  //     next_token();
  //     next_token();
  //   }
  //   else {
  //     this.$rhs = stmt();
  //   }
  //   
  //   return this;
  // });
  
  // Dot notation
  infix(".", 80, function (left) {
    // console.log('doing dot!')
    this.$recv = left;
    this.$meth = token;
    this.type = tCALL;
    // skip over dot
    next_token();
    if ((valid_cmd_args.indexOf(token.type) != -1) && (last_state === EXPR_CMDARG)) {
      gather_command_args(this);
    }
    // else {
      // if not, check if we just have a block...... no args, just block..
      // e.g. my_array.each do ...
      // could we just add kDO to the valid_cmd_args array...?
      // throw token.value
    // }
    
    return this;
  });
  
  // m - method name
  //  b - binding power
  // used for a + a, a - a,  a << a etc. (as m)
  function meth_call(m, b) {
    return infix(m, b, function(left) {
      this.type = tCALL;
      this.$recv = left;
      this.$meth = this;
      this.$call_args = {
        args: [stmt()]
      }
      return this;
    });
  }
  
  meth_call(tPLUS, 80);
  meth_call(tMINUS, 80);
  meth_call("*", 80);
  meth_call("/", 80);
  
    
  // method calls (with paranthesis)
  infix("(", 80, function (left) {
      var args = {
        args: []
      };
      // valid left values
      if (left.type === '.') {
        // already a method call, so just set $args property
        left.$call_args = args;
      }
      else if (left.type === tIDENTIFIER || left.type === tCONSTANT || left.type === tCALL) {
        // identifier/constant - turn them into a method call, with args
        // as the args (and no receiver!)
        // will identifier already be a method call? unless an actual identifier
        left.$call_args = args;
      }
      else {
        throw left.value + ' is not a valid receiver'
      }
      
      if (token.type !== ')') {
        while (true) {
          // console.log("gaething..");
          args.args.push(expr());
          if (token.type !== ',') {
            break;
          }
          next_token(',');
        }
      }
      next_token(')');
      
      if (token.type === kDO) {
        // gather do block
        left.$block = stmt();
      }
      else if (token.type === '{') {
        // gather rlcurly block
        left.$block = stmt();
      }
      
      return left;
    });
  
  // array declarations (explicit)
  prefix(tLBRACK, function() {
    var arr = [];
    // throw token.value
    if (token.type !== ']') {
      while (true) {
        arr.push(expr());
        if (token.type !== ',') {
          break;
        }
        next_token(',');
      }
    }
    next_token(']');
    this.$values = arr;
    return this;
  });
  
  // hash literal
  prefix(tLBRACE, function () {
    this.$keys = [];
    this.$values = [];
    if (token.type !== '}') {
      while (true) {
        var t = token;
        // check for valid key?
        next_token();
        // should this be a => ?? probbaly...
        next_token();
        this.$keys.push(t);
        this.$values.push(stmt());
        if (token.type !== ',') {
          break;
        }
        next_token(',');
      }
    }
    next_token('}');
    return this;
  });
  
  prefix(kCASE, function() {
    this.$expr = stmt();
    this.$body = [];
    
    if (token.type == tNL || token.type == tSEMI) next_token();
    
    while (true) {
      if (token.type == kEND) {
        next_token();
        break;
      }
      else if (token.type == kWHEN) {
        var s, t = token;
        t.$args = [];
        next_token();
        if ([tNL, tSEMI, ","].indexOf(token.type) != -1) 
          throw "kCASE: not expecting given token type"
        while (true) {
          s = stmt();
          t.$args.push(s);
          if (token.type == ",") next_token();
          else break;
        }
        t.$stmts = stmts([kEND, kELSE, kWHEN]);
      }
      else if (token.type == kELSE) {
        var t = token;
        next_token();
        // throw "jere"
        t.$stmts = stmts([kEND]);
        // throw "erm"
      }
    }
    return this;
  });
  
  // if statment - expression, not really a statement.
  prefix(kIF, function() {
    this.$expr = stmt();
    this.$tail = [];
    
    if (token.type == tNL || token.type == tSEMI) {
      next_token();
      if (token.type == kTHEN) next_token();
    }
    else if (token.type == kTHEN) {
      next_token();
    }
    else {
      throw "kIF: expecting either term or kTHEN"
    }
    
    this.$stmts = stmts([kEND, kELSE, kELSIF]);
    
    while (true) {
      if (token.type == kEND) {
        next_token();
        break;
      }
      else if (token.type == kELSIF) {
        var t = token;
        next_token();
        t.$expr = stmt();

        if (token.type == tNL || token.type == tSEMI) {
          next_token();
          if (token.type == kTHEN) next_token();
        }
        else if (token.type == kTHEN) {
          next_token();
        }
        else {
          throw "kIF: expecting either term or kTHEN"
        }
        
        t.$stmts = stmts([kEND, kELSIF, kELSE]);
        this.$tail.push(t);
      }
      else if (token.type == kELSE) {
        var t = token;
        next_token();
        t.$stmts = stmts([kEND]);
        this.$tail.push(t);
      }
      else {
        throw "kIF: unexpected token: " + token.type + ", " + token.value
      }
    }

    return this;
  });
  
  // method definitions
  sym_stmt(kDEF, function () {
    
    if (token.type === tIDENTIFIER || token.type === tCONSTANT || token.type === kSELF) {
      this.$fname = token;
    }
    else {
      throw 'Method Defintion: expected identifier or constant as def name.'
    }
    // reads over the fname
    next_token();
    
    // check if singleton definition
    if (token.type === '.' || token.type === tCOLON2) {
      // we have a singleton, so put old $fname as singleton name
      this.$sname = this.$fname;
      // stype is either '.' or tCOLON2 - might help code generation
      this.$stype = token.type;
      // now get real fname
      next_token();
      this.$fname = token;
      // read over fname
      next_token();
    }
    else {
      // check we havent shot ourself in the foot
      if (this.$fname.type === kSELF) {
        throw "Cannot use keyword 'self' as method name"
      }
    }
    
    // ignore arglist for the moment.
    if (token.type === tNL || token.type === tSEMI) {
      // we can ignore... nothing to do
    }
    else {
      
      this.$arglist = {
        arg: [],
        rest_arg: [],
        opt_arg: [],
        opt_block_arg: null
      };
      
      if (token.type === '(') {
        // params with paranthesis
        this.$paran = true;
        next_token();
      }
      while (true) {
        if (token.type === ')') {
          // end of params..check if we actually had start paran?
          next_token();
          break;
        }
        else {
          // for now assume every stmt will be a regular arg. need to check actual types
          // later
          var s = stmt();
          this.$arglist.arg.push(s);
          if (token.type == ',') {
            // read over commar
            next_token();
          }
          else {
            
            if (token.type === ')') continue;
            else if (token.type == tNL || token.type == tSEMI) break;
            else throw "Error: def, unsupported param type " + token.type
          }
        }
      }
    }
    
    // read stmts.
    this.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return this;
  });
  
  sym_stmt(kCLASS, function() {
    
    if (token.type === tIDENTIFIER) {
      throw 'Class defintion: cannot use tIDENTIFIER as a class name. Expected tCONSTANT'
    }
    else if(token.type === tCONSTANT) {
      this.$kname = token;
    }
    else {
      throw 'Class definition: expected constant as class name'
    }
    // read over kname
    next_token();
    
    if (token.type == '<') {
      next_token();
      // for now, only constant is valid superclass. we should allow other things..except new line.
      if (token.type == tCONSTANT) {
        this.$super = stmt();
        next_token();
      }
      else {
        throw "Class error: supername?"
      }
    }
    
    this.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return this;
  });
  
  sym_stmt(kMODULE, function() {
    if (token.type === tIDENTIFIER) {
      throw "Module definition: cannot use tIDENTIFIER as a module name. Expected tCONSTANT"
    }
    else if (token.type === tCONSTANT) {
      this.$kname = token;
    }
    else {
      throw "Module definition: Expected tCONSTANT for module name"
    }
    
    // name
    next_token();
    
    this.$stmts = stmts([kEND]);
    // kend
    next_token();
    return this;
  });
  
  
  
  var stmts = function(t) {
    var s;
    var r = [];
    t = t || [];
    while (true) {
      if (token.type === false) {
        if (t.indexOf(false) === -1) {
          break;
        }
        else {
          throw 'stmts: got to EOF before reaching end of statements'
        }
      }
      else if (t.indexOf(token.type) != -1) {
        break;
      }
      else {
        if (token.type === tNL || token.type === tSEMI) {
          next_token();
        }
        else {
          s = stmt();
          r.push(s);
        }
      }
    }
    return r;
  };
  
  var stmt = function() {
    var c = token;
    if (c.std) {
      next_token();
      return c.std();
    }
    var e = expr(0);
    return e;
  };
  
  var expr = function(right_binding_power) {
    var old = token;
    next_token();
    // console.log(old);
    var left = old.nud();
    while (right_binding_power < token.lbp) {
      old = token;
      next_token();
      left = old.led(left);
    }
    return left;
  };
  
  
  
  var get_next_string_token = function() {
    var str_parse = current_string_parse();
    
    // see if we can read end of string/xstring/regexp markers
    if (scanner.scan( new RegExp('^\\' + str_parse.beg))) {
      pop_string_parse();
      if (str_parse.beg == '"' || str_parse.beg == "'") {
        lex_state = EXPR_END;
        return [tSTRING_END, scanner.matched];
      }
      else {
        // assume to be xstring
        return [tXSTRING_END, scanner.matched]
      }
    }
    
    // not end of string, so we must be parsing contents
    var str_buffer = [];
    
    if (scanner.scan(/^#(\$|\@)/)) {
      return [tSTRING_DVAR, scanner.matched];
    }
    else if (scanner.scan(/^#\{/)) {
      // we are into ruby code, so stop parsing content (for the moment)
      str_parse.content = false;
      return [tSTRING_DBEG, scanner.matched];
    }
    else if (scanner.scan(/^#/)) {
      str_buffer.push('#');
    }
    
    // content regexp (what is valid content for strings..)
    var reg_exp = (str_parse.beg == '`') ?
                // xstring: CAN include new lines
                new RegExp('[^\\' + str_parse.beg + '\#\0\\]+|.') :
                // normal string: cannot include new lines
                new RegExp('[^\\' + str_parse.beg + '\#\0\\\n]+|.');
    
    scanner.scan(reg_exp);
    str_buffer.push(scanner.matched);
    return [tSTR_CONTENT, str_buffer.join('')];
  };

  
  // checks id of current token to make sure it matches, only if id is defined.
  var next_token = function(id) {
    // last token support
    last_token = token;
    // capture string stuff
    if (current_string_parse() && current_string_parse().content) {
      // console.log('geting str token');
      var t = get_next_string_token();
      // console.log('string token: (' + t[0] + ' : ' + t[1] + ') lex_state: (' + lex_state + ')');
      // token = object_create(sym_tblt);
      token = { };
      token.type = t[0];
      token.value = t[1];
      return token;
    }    
    
    var t = get_next_token();
    if (id && (id !== token.type)) {
      throw 'Unexpected value "' + token.value + '". Expecting: ' + id
    }
    // console.log('token: (' + t[0] + ' : ' + t[1] + ') lex_state: (' + lex_state + ')');
    // token = { type: t[0], value:t[1] };
    // token = {};
    token = object_create(sym_tbl[t[0]]);
    token.type = t[0];
    token.value = t[1];
    // console.log(token.value + ', ' + last_token.value);
    return token;
  };
  
  // actually get the next token
  var get_next_token = function() {
    var c = '', space_seen = false;
    
    last_state = lex_state;
    cmd_start = false;
        
      
    while (true) {
      // console.log(scanner.working_string);
      // if (scanner.scan(/\ |\t|\r/)) {
        if(scanner.scan(/^(\ |\t|\r)/)) {
        space_seen = true;
        // console.log('found space: "' + scanner.matched + '"');
        // console.log(scanner.working_string);
        continue;
      }
      else if (scanner.scan(/^(\n|#)/)) {
        // console.log('found: ' + scanner.matched);
        c = scanner.matched;
        if (c == '#') {
          scanner.scan(/^(.*\n)/);
        }
        // we can skip any more blank lines..(combine them into one..)
        scanner.scan(/^(\n+)/);
        // console.log('we scanned lots');
        // console.log(scanner.matched);
        
        if (lex_state == EXPR_BEG) {
          continue;
        }
        cmd_start = true;
        lex_state = EXPR_BEG;
        return [tNL, '\n'];
      }
      else if (scanner.scan(/^[+-]/)) {
        var result = scanner.matched == '+' ? tPLUS : tMINUS;
        var sign = (result == tPLUS) ? tUPLUS : tUMINUS;
        // method name
        if (lex_state == EXPR_FNAME || lex_state == EXPR_DOT) {
          lex_state = EXPR_ARG;
          if (scanner.scan(/^@/)) {
            return [sign, result + '@'];
          }
          else {
            return [sign, result];
          }
        }
        // += or -=
        if (scanner.scan(/^\=/)) {
          lex_state = EXPR_BEG;
          return [tOP_ASGN, result];
        }

        if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          lex_state = EXPR_BEG;
          return [sign, result];
        }

        lex_state = EXPR_BEG;
        return [result, scanner.matched];
      }
      
      
      
      
      else if (scanner.scan(/^\//)) {
        lex_state = EXPR_BEG;
        return ['/', scanner.matched];
      }
      
      else if (scanner.scan(/^\*\*\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "**"];
      }
      else if (scanner.scan(/^\*\*/)) {
        return [tPOW, "**"];
      }
      else if (scanner.scan(/^\*\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "*"];
      }
      else if (scanner.scan(/^\*/)) {
        var r;
        if (lex_state == EXPR_FNAME) {
          lex_state = EXPR_BEG;
          r = "*";
        }
        else if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          r = tSTAR;
        }
        else {
          lex_state = EXPR_BEG;
          r = "*"
        }
        return [r, scanner.matched];
      }
      
      
      
      
      
      
      else if (scanner.scan(/^\<\=\>/)) {
        return [tCMP, scanner.matched];
      }
      else if (scanner.scan(/^\<\=/)) {
        return [tLEQ, "<="];
      }
      else if (scanner.scan(/^\<\<\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "<<"];
      }
      else if (scanner.scan(/^\<\</)) {
        if (([EXPR_END, EXPR_DOT, EXPR_ENDARG, EXPR_CLASS].indexOf(lex_state) != -1) && space_seen) {
          return [tLSHFT, "<<"];
        }
        lex_state = EXPR_BEG;
        return [tLSHFT, "<<"];
      }
      else if (scanner.scan(/^\</)) {
        lex_state = EXPR_BEG;
        return ["<", "<"];
      }
      
      
      
      
      else if (scanner.scan(/^\&\&\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "&&"];
      }
      else if (scanner.scan(/^\&\&/)) {
        lex_state = EXPR_BEG;
        return [tANDOP, "&&"];
      }
      else if (scanner.scan(/^\&\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "&"];
      }
      else if (scanner.scan(/^\&/)) {
        var r;
        if (space_seen && !scanner.check(/^\s/)) {
          if (lex_state == EXPR_CMDARG) r = tAMPER;
          else r = "&";
        }
        else if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          r = tAMPER;
        }
        else {
          r = "&";
        }
        return [r, "&"];
      }
      
      
      
      
      // strings.. in order: double, single, xstring
      else if (scanner.scan(/^\"/)) {
        push_string_parse({ beg: '"', content: true });
        return [tSTRING_BEG, scanner.matched];
      }
      else if (scanner.scan(/^\'/)) {
        push_string_parse({ beg: "'", content: true });
        return [tSTRING_BEG, scanner.matched];
      }
      else if (scanner.scan(/^\`/)) {
        push_string_parse({ beg: "`", content: true });
        return [tXSTRING_BEG, scanner.matched];
      }
      
      // numbers
      else if (scanner.check(/^[0-9]/)) {
        lex_state = EXPR_END;
        if (scanner.scan(/^[\d_]+\.[\d_]+\b/)) {
          return [tFLOAT, scanner.matched];
        }
        else if (scanner.scan(/^[\d_]+\b/)) {
          return [tINTEGER, scanner.matched];
        }
        else if (scanner.scan(/^0(x|X)(\d|[a-f]|[A-F])+/)) {
          return [tINTEGER, scanner.matched];
        }
        else {
          console.log('unexpected number type');
          return [false, false];
        }
      }
      
      
      else if (scanner.scan(/^\|\|\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, '||'];
      }
      else if (scanner.scan(/^\|\|/)) {
        lex_state = EXPR_BEG;
        return [tOROP, scanner.matched];
      }
      else if (scanner.scan(/^\|\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, '|'];
      }
      else if (scanner.scan(/^\|/)) {
        lex_state = EXPR_BEG;
        return ["|", scanner.matched];
      }
          
      else if (scanner.scan(/^\:/)) {
        // console.log ("HERE " + lex_state);
        if (lex_state === EXPR_END || lex_state === EXPR_ENDARG || scanner.check(/^\s/)) {
          // FIXME: hack for tertiary statements
          if (!scanner.check(/^\w/)) {
            return [':', scanner.matched];
          }
          
          lex_state = EXPR_BEG;
          return [tSYMBEG, scanner.matched];
        }
        
        lex_state = EXPR_FNAME;
        return [tSYMBEG, ':'];
      }
      
      else if (scanner.scan(/^\[/)) {
        result = scanner.matched;
        
        if (lex_state == EXPR_FNAME || lex_state == EXPR_DOT) {
          lex_state = EXPR_ARG
          if (scanner.scan(/^\]\=/)) {
            return [tASET, '[]='];
          }
          else if (scanner.scan(/^\]/)) {
            return [tAREF, '[]'];
          }
          else {
            throw "error, unexpecrted '[]' token"
          }
        }
        // space seen allows for method calls with array as first param
        // otherwise it thinks its calling the '[]' method
        else if (lex_state == EXPR_BEG || lex_state == EXPR_MID || space_seen) {
          return [tLBRACK, scanner.matched]
        }
        // hmm?
        return ['[', scanner.matched]
      }
      
      else if (scanner.scan(/^\{/)) {
        var result;
        if ([EXPR_END, EXPR_CMDARG].indexOf(lex_state) !== -1) {
          // primary block
          result = '{';
        }
        else if (lex_state == EXPR_ENDARG) {
          // expr block
          result = tLBRACE_ARG;
        }
        else {
          // hash
          result = tLBRACE;
        }
        return [result, scanner.matched];
      }
      
      // ]
      else if (scanner.scan(/^\]/)) {
        lex_state = EXPR_END;
        return [']', scanner.matched];
      }      
      
      else if (scanner.scan(/^\;/)) {
        lex_state = EXPR_BEG;
        return [tSEMI, ';'];
      }
      // #
      else if (scanner.scan(/^\(/)) {
        var result = '(';
        if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          result = tLPAREN;
        }
        else if (space_seen) {
          if (lex_state == EXPR_CMDARG) {
            result = tLPAREN_ARG;
          }
          else if(lex_state == EXPR_ARG) {
            // dont put space before arys
            result = tLPAREN2;
          }
        }
        lex_state = EXPR_BEG;
        return [result, scanner.matched];
      }
      // )
      else if (scanner.scan(/^\)/)) {
        lex_state = EXPR_END;
        return [')', scanner.matched];
      }
      
      // }
      else if (scanner.scan(/^\}/)) {
        lex_state = EXPR_END;
        // throw 'got to end of string'
        if (current_string_parse()) {
          current_string_parse().content = true
        }
        // check if parsing string...
        return ['}', scanner.matched];
      }
      
      // .
      else if (scanner.scan(/^\./)) {
        // should be EXPR_DOT in ALL cases?
        // if (lex_state == EXPR_FNAME) {
          lex_state = EXPR_DOT;
        // }
        return ['.', scanner.matched];
      }
      
      // ,
      else if (scanner.scan(/^\,/)) {
        lex_state = EXPR_BEG;
        return [',', scanner.matched];
      }
      
      // Class variabled
      else if (scanner.scan(/^\@\@\w*/)) {
        lex_state = EXPR_END;
        return [tCVAR, scanner.matched];
      }
      // Instance variables
      else if (scanner.scan(/^\@\w*/)) {
        lex_state = EXPR_END;
        return [tIVAR, scanner.matched];
      }
      
      else if (scanner.scan(/^\=\>/)) {
        lex_state = EXPR_BEG;
        return [tASSOC, scanner.matched];
      }
      
      else if (scanner.scan(/^\=/)) {
        lex_state = EXPR_BEG;
        return ['=', scanner.matched];
      }
              
      else if (scanner.scan(/^\w+[\?\!]?/)) {
        switch (scanner.matched) {
          case 'def':
            lex_state = EXPR_FNAME;
            return [kDEF, scanner.matched];
          case 'end':
            lex_state = EXPR_END;
            return [kEND, scanner.matched];
          case 'class':
            // catch 'class' being used as a method name. This only works when class is used
            // like object.class .. you cannot just use 'class' to call class method on self
            // without explicitly stating self as the receiver.
            if (lex_state == EXPR_DOT) {
              return [tIDENTIFIER, scanner.matched];
            }
            lex_state = EXPR_CLASS;
            return [kCLASS, scanner.matched];
          case 'module':
            lex_state = EXPR_BEG;
            return [kMODULE, scanner.matched];
          case 'do':
            if (lex_state == EXPR_ENDARG) {
              lex_state = EXPR_BEG;
              return [kDO_BLOCK, scanner.matched];
            }
            return [kDO, scanner.matched];
          case 'if':
            if (lex_state == EXPR_BEG) {
              return [kIF, scanner.matched];
            }
            lex_state = EXPR_BEG;
            return [kIF_MOD, scanner.matched];
          case 'then':
            return [kTHEN, scanner.matched];
          case 'else':
            return [kELSE, scanner.matched];
          case 'elsif':
            return [kELSIF, scanner.matched];
          case 'unless':
            if (lex_state == EXPR_BEG) {
              return [kUNLESS, scanner.matched];
            }
            lex_state = EXPR_BEG;
            return [kUNLESS_MOD, scanner.matched];
          case 'self':
            if (lex_state != EXPR_FNAME) {
              lex_state = EXPR_END;
            }
            return [kSELF, scanner.matched];
          case 'super':
            lex_state = EXPR_ARG;
            return [kSUPER, scanner.matched];
          case 'true':
            lex_state = EXPR_END;
            return [kTRUE, scanner.matched];
          case 'false':
            lex_state = EXPR_END;
            return [kFALSE, scanner.matched];
          case 'nil':
            lex_state = EXPR_END;
            return [kNIL, scanner.matched];
          case 'return':
            lex_state = EXPR_MID;
            return [kRETURN, scanner.matched];
          case 'case':
            lex_state = EXPR_BEG;
            return [kCASE, scanner.matched];
          case 'when':
            lex_state = EXPR_BEG;
            return [kWHEN, scanner.matched];
          case 'yield':
            lex_state = EXPR_ARG;
            return [kYIELD, scanner.matched];
        }

        var matched = scanner.matched;

        // labels - avoid picking up a mod/class divide name
        if ((scanner.peek(2) != '::') && (scanner.scan(/^\:/))) {
          return [tLABEL, matched + scanner.matched];
        }

        if (lex_state == EXPR_FNAME) {
          if (scanner.scan(/^=(?:(?![~>=])|(?==>))/)) {
            lex_state = EXPR_END;
            return [tIDENTIFIER, matched + scanner.matched];
          }
        }
        
        // console.log('current state: ' + lex_state);
        
        if ([EXPR_BEG, EXPR_DOT, EXPR_MID, EXPR_ARG, EXPR_CMDARG].indexOf(lex_state) !== -1) {
          lex_state = EXPR_CMDARG;
        }
        else {
          lex_state = EXPR_END;
        }
        
        return [matched.match(/^[A-Z]/) ? tCONSTANT : tIDENTIFIER, matched];
      }

      else {
        // false, false === end of stream
        return [false, false];      
      }
    }
  };
  
  var iseq_stack = [], iseq_stack_current = null;
  var iseq_locals_stack = [], iseq_locals_current = null;
  var iseq_jump_stack = [], iseq_jump_current = null;
  
  function iseq_jump_idx() {
    return (iseq_jump_current++).toString();
  }
  
  function iseq_stack_push(s) {
    iseq_jump_current = 0;
    iseq_jump_stack.push(iseq_jump_current);
    
    iseq_locals_stack.push(iseq_locals_current = []);
    iseq_stack.push(s);
    iseq_stack_current = s;
    return s;
  }
  
  function iseq_stack_pop() {
    // console.log(iseq_stack_current[7]);
    // throw "a"
    var f = iseq_stack_current[7].join("");
    console.log(f);
    var func = new Function(f);
    // console.log("here");
    // console.log(iseq_stack_current);
    iseq_stack_current[7] = func;
    
    
    iseq_jump_stack.pop();
    iseq_jump_current = iseq_jump_stack[iseq_jump_stack.length - 1];
    
    iseq_locals_current = iseq_locals_stack[iseq_locals_stack.length - 2];
    iseq_locals_stack.pop();
    
    iseq_stack_current = iseq_stack[iseq_stack.length - 2];
    return iseq_stack.pop();
  }
  
  function write(str) {
    iseq_stack_current[7].push(str);
  }
  
  // function iseq_opcode_push(opcode) {
    // iseq_stack_current[7].push(opcode);
    // return opcode;
  // }
  
  /**
    checks the given name to see if its in the index. If the result is 0 or above,
    it is, and the idx is the index in the locals array. -1 means it is not in the
    array (so not a local)
  */
  function iseq_locals_idx(name) {
    return iseq_locals_current.indexOf(name);
  }
  
  /**
    push locals name. the return value is the new index for the name
  */
  function iseq_locals_push(name) {
    var len = iseq_locals_current.length;
    iseq_locals_current.push(name);
    return len;
  }
  
  function generate_tree(tree) {
    console.log("tree:");
    console.log(tree);
    var top_iseq = iseq_stack_push([0,0,"<compiled>",filename,ISEQ_TYPE_TOP,0,[],[]]);
    
    var i;
    for (i = 0; i < tree.length; i++) {
      generate_stmt(tree[i], { instance: true, full_stmt: true, last_stmt:(tree.length - 1) == i, top_level: true} );
    }
    console.log(iseq_stack_pop());

    return top_iseq;
  }
  
  function generate_stmt(stmt, context) {
    switch (stmt.type) {
      case kCLASS:
        generate_class(stmt, context);
        break;
      case kMODULE:
        generate_module(stmt, context);
        break;
      case kDEF:
        generate_def(stmt, context);
        break;
      case tCALL:
        generate_call(stmt, context);
        break;
      case tSYMBEG:
        generate_symbol(stmt, context);
        break;
      case tCONSTANT:
        generate_constant(stmt, context);
        break;
      case tIDENTIFIER:
        generate_identifier(stmt, context);
        break;
      case tINTEGER:
        generate_integer(stmt, context);
        break;
      case tSTRING_BEG:
        generate_string(stmt, context);
        break;
      case kSELF:
        generate_self(stmt, context);
        break;
      case kIF:
        generate_if(stmt, context);
        break;
      case '=':
        generate_assign(stmt, context);
        break;
      case kFALSE:
        generate_false(stmt, context);
        break;
      case kTRUE:
        generate_true(stmt, context);
        break;
      case tLBRACK:
        generate_array(stmt, context);
        break;
      default:
        console.log("unknown generate_stmt type: " + stmt.type + ", " + stmt.value);
    }
  }
  
  function generate_array(stmt, context) {
    write("[");
    if (stmt.$values) {
      var i;
      for (i = 0; i < stmt.$values.length; i++) {
        if (i > 0) write(",");
        generate_stmt(stmt.$values[i], {full_stmt:false, last_stmt:false});
      }
    }
    write("]");
    // iseq_opcode_push([iNEWARRAY, stmt.$values ? stmt.$values.length : 0]);
  }
  
  function generate_assign(stmt, context) {
    
    if (context.last_stmt && context.full_stmt) write("return ");
    
    
    if (stmt.$lhs.type == tIDENTIFIER) {
      var idx;
      // iseq_opcode_push([iSETLOCAL, 0]);
      if ((idx = iseq_locals_idx(stmt.$lhs.value)) == -1) {
        // doesnt exist, so we need a new local
        // iseq_opcode_push([iSETLOCAL, iseq_locals_push(stmt.$lhs.value)]);
        write('vm_setlocal(' + iseq_locals_push(stmt.$lhs.value) + ',');
        generate_stmt(stmt.$rhs, {full_stmt: false, last_stmt: false});
        write(')');
      }
      else {
        // already a local, so just get the index
        // iseq_opcode_push([iSETLOCAL, idx]);
      }
    }
    else {
      throw "unsupported lhs, for now"
    }
    
    if (context.full_stmt) write(";");
  }
  
  function generate_if(stmt, context) {
    // if expression..
    generate_stmt(stmt.$expr, {instance:context.instance, full_stmt:false, last_stmt:false});
    var jmp_label = iseq_jump_idx();
    iseq_opcode_push([iBRANCHUNLESS, jmp_label]);
    
    // stmts
    if (stmt.$stmts) {
      var i, s = stmt.$stmts;
      for (i = 0; i < s.length; i++) {
        generate_stmt(s[i], {instance:context.instance, full_stmt:true, last_stmt:false});
      }
    }
    
    iseq_opcode_push(jmp_label);
    
    // if (context.last_stmt && context.full_stmt) write("return ");
    // write("(function(){");
    // 
    // (stmt.type == kIF) ? write("if(RTEST(") : write("if(!RTEST(");
    // 
    // // RTEST expression
    // generate_stmt(stmt.$expr, {instance:context.instance, full_stmt:false, last_stmt:false});
    // write(")){\n");
    // 
    // if (stmt.$stmts) {
    //   var i, s = stmt.$stmts;
    //   for (i = 0; i < s.length; i++) {
    //     generate_stmt(s[i], {instance:context.instance, full_stmt:true, last_stmt:(s[s.length -1] == s[i] ? true : false)});
    //   }
    // }
    // 
    // write("}\n");
    // 
    // if (stmt.$tail) {
    //   var i, t = stmt.$tail;
    //   for (i = 0; i < t.length; i++) {
    //     if (t[i].type == kELSIF) {
    //       write("else if(RTEST(");
    //       generate_stmt(t[i].$expr, {instance:context.instance, full_stmt:false, last_stmt:false});
    //       write(")){\n");
    //     }
    //     else {
    //       write("else{\n");
    //     }
    //     
    //     if (t[i].$stmts) {
    //       var j, k = t[i].$stmts;
    //       for (j = 0; j < k.length; j++) {
    //         // console.log("doing " + k[j].value);
    //         generate_stmt(k[j], {instance:context.instance, full_stmt:true, last_stmt:(k[k.length - 1] == k[i] ? true : false)});
    //       }
    //     }
    //     
    //     write("}\n");
    //   }
    // }
    // 
    // write("})()");
    // if (context.full_stmt) write(";\n");
  }
  
  function generate_false(stmt, context) {
    iseq_opcode_push([iPUTOBJECT, false]);
    
    if (context.last_stmt && context.full_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
  }
  
  function generate_true(stmt, context) {
    iseq_opcode_push([iPUTOBJECT, true]);
    
    if (context.last_stmt && context.full_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
  }
  
  
  function generate_self(stmt, context) {
    if (context.last_stmt && context.full_stmt) write("return ");
    write(current_self());
    if (context.full_stmt) write(";\n");
  }
  
  function generate_string(stmt, context) {
    // iseq_opcode_push([iPUTSTRING, stmt.$parts[0].value]);
    
    // if (context.last_stmt && context.full_stmt) {
      // iseq_opcode_push([iLEAVE]);
    // }
    
    write("'" + stmt.$parts[0].value + "'");
  }
  
  function generate_integer(stmt, context) {
    
    // iseq_opcode_push([iPUTOBJECT, parseInt(stmt.value)]);
    write(parseInt(stmt.value));
    
    if (context.last_stmt && context.full_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
  }
  
  function generate_constant(stmt, context) {
    // iseq_opcode_push([iPUTNIL]);
    // iseq_opcode_push([iGETCONSTANT, stmt.value]);
    write("vm_getconstant(nil,'" + stmt.value + "')");
  }
  
  function generate_identifier(identifier, context) {
    // for now, assumption is that they are all method calls. should check for local or dynamic
    
    // no receiver.
    var idx;
    if ((idx = iseq_locals_idx(identifier.value)) == -1) {
      // not an identifier
      iseq_opcode_push([iPUTNIL]);
      iseq_opcode_push([iSEND, identifier.value, 0, null, 8, null]);
    }
    else {
      // its an identifier
      iseq_opcode_push([iGETLOCAL, idx]);
    }
    
    
    if (context.full_stmt && context.last_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
    else if (context.full_stmt) {
      iseq_opcode_push([iPOP]);
    }
  }
  
  function generate_symbol(sym, context) {
    
    iseq_opcode_push([iPUTOBJECT, ID2SYM(sym.$name.value)]);
    
    if (context.full_stmt && context.last_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
    else if (context.full_stmt) {
      iseq_opcode_push([iPOP]);
    }
  }
  
  function generate_call(call, context) {

    write("vm_send(");
    
    // receiver
    if (call.$recv) {
      generate_stmt(call.$recv, {instance:context.instance, full_stmt:false});
      // fix fcall bit..?
    }
    else {
      write("vm_putself()");
    }
    
    // mid
    var mid = call.$meth;
    if (typeof mid === 'object') { mid = mid.value; }
    write(",'" + mid + "',");
    
    // arguments (argv)
    if (call.$call_args && call.$call_args.args) {
      write("[");
      var i = 0, a = call.$call_args.args;
      for (i = 0; i < a.length; i++) {
        if (i > 0) write(",");
        generate_stmt(a[i], {instance:context.instance, full_stmt:false});
      }
      write("],");
    }
    else {
      write("[],");
    }
    
    // block
    write("null");

    
    // end
    write(")");
    
    if (context.full_stmt) write(";");
    
    
    // var mid = call.$meth;
    // if (typeof mid === 'object') {
    //   mid = mid.value;
    // }
    // 
    // var iseq = [iSEND, mid, 0, null, 8, null];
    // 
    // // receiver
    // if (call.$recv) {
    //   generate_stmt(call.$recv, {instance:context.instance, full_stmt:false});
    //   // fix fcall bit
    //   iseq[4] = 0;
    // }
    // else {
    //   iseq_opcode_push([iPUTNIL]);
    // }
    // 
    // // args..
    // if (call.$call_args && call.$call_args.args) {
    //   var i, a = call.$call_args.args;
    //   for (i = 0; i < a.length; i++) {
    //     generate_stmt(a[i], { instance:context.instance, full_stmt:false });
    //   }
    //   iseq[2] = a.length;
    // }
    // 
    // iseq_opcode_push(iseq);
    // 
    // if (context.full_stmt && context.last_stmt) {
    //   // if last stmt, we want to leave the context (with result of call on stack)
    //   iseq_opcode_push([iLEAVE]);
    // }
    // else if (context.full_stmt) {
    //   // if not last stmt, but a full stmt, remove result from stack. no-one wants it
    //   iseq_opcode_push([iPOP]);
    // }
    // 
    // // block
    // if (call.$brace_block) {
    //   var b_seq = [0, 0, "block in <compiled>", filename, ISEQ_TYPE_BLOCK, 0, [], []];
    //   iseq[3] = b_seq;
    //   
    //   if (call.$brace_block.$stmts) {
    //     // generate stmts
    //     iseq_stack_push(b_seq);
    //     
    //     var i, s = call.$brace_block.$stmts;
    //     for (i = 0; i < s.length; i++) {
    //       generate_stmt(s[i], {full_stmt:true, last_stmt:false});
    //     }
    //     
    //     iseq_stack_pop();
    //   }
    // }
    
    
    
    // iseq_opcode_push([iPUTNIL]);
    // var iseq = [0, 0, definition.$fname.value, filename, ISEQ_TYPE_METHOD, 0, [], []];
    // var opcode = [iDEFINEMETHOD, definition.$fname.value, iseq, 0];
    // iseq_opcode_push(opcode);
    // iseq_stack_push(iseq);
    // 
    // if (definition.$stmts) {
    //   var i, s = definition.$stmts;
    //   for (i = 0; i < s.length; i++) {
    //     generate_stmt(s[i], {instance:(definition.$sname ? false : true), full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), name:definition.$fname});
    //   }
    // }
    
    
    
    // if (context.last_stmt && context.last_stmt) write("return ");
    // 
    // if(call.value.match(/^[A-Z]/)) {
    //   write(call.value);
    //   write("(");
    // }
    // else {
    //   // detect block..
    //   if (call.$brace_block) {
    //     write("rb_block_funcall(");
    //   }
    //   else {
    //     write("rb_funcall(");
    //   }
    //   
    //   
    //   if (call.$recv) {
    //     generate_stmt(call.$recv, {instance:context.instance, full_stmt:false, last_stmt:context.last_stmt, top_level:context.top_level});
    //   }
    //   else {
    //     write(current_self());
    //   }
    //   
    //   write(",'" + call.$meth.value + "'");
    // }
    // 
    // // normal args
    // if (call.$call_args && call.$call_args.args) {
    //   var i, a = call.$call_args.args;
    //   for (i = 0; i < a.length; i++) {
    //     write(",");
    //     generate_stmt(a[i], {instance:context.instance, full_stmt:false});
    //   }
    // }
    // 
    // // assocs
    // if (call.$call_args && call.$call_args.assocs) {
    //   
    // }
    // 
    // // block
    // if (call.$brace_block) {
    //   
    // }
    // 
    // // sym block: &:upcase etc
    // if (call.$call_args && call.$call_args.block_arg) {
    //   write(",rb_funcall(");
    //   generate_stmt(call.$call_args.block_arg.arg, {instance:context.singleton, full_stmt:false, last_stmt:false, top_level:context.top_level});
    //   write(",'to_proc')");
    // }
    // 
    // write(")");
    // if (context.full_stmt) write(";\n");
  }
  
  function generate_def(definition, context) {
    // assume not singleton for now, so define "on nil"
    iseq_opcode_push([iPUTNIL]);
    var iseq = [0, 0, definition.$fname.value, filename, ISEQ_TYPE_METHOD, 0, [], []];
    var opcode = [iDEFINEMETHOD, definition.$fname.value, iseq, 0];
    iseq_opcode_push(opcode);
    iseq_stack_push(iseq);
    
    if (definition.$stmts) {
      var i, s = definition.$stmts;
      for (i = 0; i < s.length; i++) {
        generate_stmt(s[i], {instance:(definition.$sname ? false : true), full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), name:definition.$fname});
      }
    }
    
    
    
    // if (definition.singleton) {
    //   write("rb_define_singleton_method(");
    //   generate_stmt(definition.singleton, {instance: context.instance, full_stmt:false, last_stmt:false});
    //   write(",'" + definition.$fname + "',function(self,_cmd");
    //   current_self_push("self");
    // }
    // else if (context.top_level) {
    //   write("rb_define_singleton_method(rb_top_self, " + definition.$fname + "',function(self,_cmd");
    //   current_self_push("self");
    // }
    // else {
    //   write("rb_define_method(" + current_self() + ",'");
    //   write(definition.$fname.value);
    //   write("',function(self,_cmd");
    //   current_self_push("self");
    // }
    // 
    // // arglist
    // if (definition.$arglist && definition.$arglist.arg) {
    //   var i, a = definition.$arglist.arg;
    //   for (i = 0; i < a.length; i++) {
    //     write(",");
    //     write(a[i].value);
    //     // add_to_nametable(a[i].value);
    //   }
    // }
    // 
    // // block arg support - every method potentialy might have a block.
    // write(",$b");
    // 
    // write("){\n");
    
    // block reference goes here (so if we say &block in params, map var block to $b)
    //   if definition[:arglist] && definition[:arglist][:opt_block_arg]
    //     write "var #{definition[:arglist][:opt_block_arg]} = $b;\n"
    //     add_to_nametable definition[:arglist][:opt_block_arg]
    //   end
 
    // statements
    // push_string_buffer();
    // push_nametable();
    
    // if (definition.$stmts) {
      // var i, s = definition.$stmts;
      // for (i = 0; i < s.length; i++) {
        // generate_stmt(s[i], {instance:(definition.$sname ? false : true), full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), name:definition.$fname});
      // }
    // }
    
    // var body_contents = pop_string_buffer(), name_table = pop_nametable();
    // write each ivar statements..
    //   if name_table.length > 0
    //     write "var #{name_table.join(",")};\n"
    //   end
    
    // write(body_contents);

    // current_self_pop();
    // pop_nametable();
    // write("});\n");
    
    iseq_stack_pop();
  }
  
  function generate_class(stmt, context) {
    
    if (context.full_stmt && context.last_stmt) write("return ");
    
    write("vm_defineclass(");
    
    // base
    write("vm_putnil(),");
    
    // superclass
    if (stmt.$super) {
      generate_stmt(stmt.$super, {full_stmt:false, last_stmt:false});
    }
    else {
      write("vm_putnil()");
    }
    write(",");
    
    // class id
    write("'" + stmt.$kname.value + "'");
    write(",");
    
    // iseq
    write("function(){},")
    
    // op_flag
    write(0);
    
    write(")");
    
    if (context.full_stmt) write(";");
    
    // base (for class << Ben; ...; end)
    // iseq_opcode_push([iPUTNIL]);
    // // superclass
    // if (stmt.$super) {
    //   // console.log("super..");
    //   // console.log(stmt.$super);
    //   generate_stmt(stmt.$super, {full_stmt: false, last_stmt:false});
    // }
    // else {
    //  iseq_opcode_push([iPUTNIL]);
    // }
    // 
    // var iseq = [0, 0, "<class:" + stmt.$kname.value + ">", filename, ISEQ_TYPE_CLASS, 0, [], []];
    // var opcode = [iDEFINECLASS, stmt.$kname.value, iseq, 0];
    // iseq_opcode_push(opcode);
    // iseq_stack_push(iseq);
    // 
    // // statements.
    // if (stmt.$stmts) {
    //   var i, s = stmt.$stmts;
    //   for (i = 0; i < s.length; i++) {
    //     generate_stmt(s[i], {instance:false, full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), top_level:false});
    //   }
    // }
    // 
    // iseq_stack_pop();
    
    // write("(function(self) {\n");
    // push_nametable();
    // current_self_push("self");
    // 
    // if (stmt.$stmts) {
    //   var i, m = stmt.$stmts;
    //   for (i = 0; i < m.length; i++) {
    //     generate_stmt(m[i], {instance: false, full_stmt: true, last_stmt: (m[m.length -1] == m[i] ? true : false), top_level: false});
    //   }
    // }
    // 
    // pop_nametable();
    // current_self_pop();
    // 
    // write("})(");
    // 
    // if (context.top_level) {
    //   write("rb_define_class('")
    //   write(stmt.$kname.value);
    //   write("',");
    // }
    // else {
    //   write("rb_define_class_under(" + current_self() + ",'");
    //   write(stmt.$kname.value);
    //   write("',");
    // }
    // 
    // // superclass
    // if (stmt.$super) {
    //   write("rb_const_get(self, '" + stmt.$super.value + "'))")
    // }
    // else {
    //   write("rb_cObject)");
    // }
    // 
    // write(");\n")
  }
  
  function generate_module(mod, context) {
    write("(function(self) {\n");
    push_nametable();
    current_self_push("self");
    
    if (mod.$stmts) {
      var i, m = mod.$stmts;
      for (i = 0; i < m.length; i++) {
        generate_stmt(m[i], {instance: false, full_stmt: false, last_stmt: (m[m.length -1] == m[i] ? true : false), nested: true});
      }
    }
    
    pop_nametable();
    current_self_pop();
    
    write("})(");
    
    if (context.top_level) {
      write("rb_define_module('");
      write(mod.$kname.value);
      write("'));\n");
    }
    else {
      write("rb_define_module_under(" + current_self() + ",'");
      write(mod.$kname.value);
      write("'));\n")
    }
  }
  
  this.parse = function(str) {
    scanner = new vn_ruby_string_scanner(str);
    next_token();
    var s = stmts();
    return generate_tree(s);
  }
  
  this.contexts = function() {
    return contexts;
  }
  
  // the parser - pass is the source to actually parse
  // return function(parse_text) {
  //   scanner = new vn_ruby_string_scanner(parse_text);
  //   next_token();
  //   var s = stmts();
  //   generate_tree(s);
  //   return s;
  // }
  return this;
};


// String scanner
var vn_ruby_string_scanner = function(str) {
  // whole string
  this.str = str;
  // current index
  this.at = 0;
  // last matched data
  this.matched = "";
  // working string (basically str substr'd from the 'at' index to the end)
  this.working_string = str;
};

vn_ruby_string_scanner.prototype.scan = function(reg) {
  // reg = this._fix_regexp_to_match_beg(reg);
  var res = reg.exec(this.working_string);
  if (res == null) {
    return false;
  }
  else if (typeof res == "object") {
    // array.
    this.at += res[0].length;
    this.working_string = this.working_string.substr(res[0].length);
    this.matched = res[0];
    return res;
  }
  else if (typeof res == "string") {
    this.at += res.length;
    this.working_string = this.working_string.substr(res.length);
    return res;
  }
  return false;
};

vn_ruby_string_scanner.prototype.check = function(reg) {
  // reg = this._fix_regexp_to_match_beg(reg);
  var res = reg.exec(this.working_string);
  return res;
};

vn_ruby_string_scanner.prototype.matched = function() {
  
};

vn_ruby_string_scanner.prototype.peek = function(len) {
  return this.working_string.substr(0, len);
};

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

var rb_cString, rb_cSymbol;

var RSymbol = function(ptr) {
  this.klass = rb_cSymbol ;
  // this.$type = T_SYMBOL;
  this.toString = function() {
  // hack, for associative js arrays, we need a unique string name :(
    return this.ptr;
  };
  this.ptr = ptr;
  return this;
};

// Keys are ids, values are their associated instances of RSymbol
//  'adam' => [Obj]
// keys do not contain the ':'
var rb_sym_table = { };

function ID2SYM(id) {
 if (rb_sym_table.hasOwnProperty(id)) {
   return rb_sym_table[id];
 }
 var sym = new RSymbol(id);
 rb_sym_table[id] = sym
 return sym;
};

function Init_String() {
  
  rb_cString = rb_define_class("String", rb_cObject);
  // rb_include_module(rb_cString, rb_mComparable);
  // rb_define_alloc_func(rb_cString, rb_str_alloc);
  
  // rb_define_singleton_method(rb_cString, "try_convert", rb_str_s_try_convert, 1);
  //   rb_define_method(rb_cString, "initialize", rb_str_init, -1);
  //   rb_define_method(rb_cString, "initialize_copy", rb_str_replace, 1);
  //   rb_define_method(rb_cString, "<=>", rb_str_cmp_m, 1);
  //   rb_define_method(rb_cString, "==", rb_str_equal, 1);
  //   rb_define_method(rb_cString, "eql?", rb_str_eql, 1);
  //   rb_define_method(rb_cString, "hash", rb_str_hash_m, 0);
  //   rb_define_method(rb_cString, "casecmp", rb_str_casecmp, 1);
  //   rb_define_method(rb_cString, "+", rb_str_plus, 1);
  //   rb_define_method(rb_cString, "*", rb_str_times, 1);
  //   rb_define_method(rb_cString, "%", rb_str_format_m, 1);
  //   rb_define_method(rb_cString, "[]", rb_str_aref_m, -1);
  //   rb_define_method(rb_cString, "[]=", rb_str_aset_m, -1);
  //   rb_define_method(rb_cString, "insert", rb_str_insert, 2);
  //   rb_define_method(rb_cString, "length", rb_str_length, 0);
  //   rb_define_method(rb_cString, "size", rb_str_length, 0);
  //   rb_define_method(rb_cString, "bytesize", rb_str_bytesize, 0);
  //   rb_define_method(rb_cString, "empty?", rb_str_empty, 0);
  //   rb_define_method(rb_cString, "=~", rb_str_match, 1);
  //   rb_define_method(rb_cString, "match", rb_str_match_m, -1);
  //   rb_define_method(rb_cString, "succ", rb_str_succ, 0);
  //   rb_define_method(rb_cString, "succ!", rb_str_succ_bang, 0);
  //   rb_define_method(rb_cString, "next", rb_str_succ, 0);
  //   rb_define_method(rb_cString, "next!", rb_str_succ_bang, 0);
  //   rb_define_method(rb_cString, "upto", rb_str_upto, -1);
  //   rb_define_method(rb_cString, "index", rb_str_index_m, -1);
  //   rb_define_method(rb_cString, "rindex", rb_str_rindex_m, -1);
  //   rb_define_method(rb_cString, "replace", rb_str_replace, 1);
  //   rb_define_method(rb_cString, "clear", rb_str_clear, 0);
  //   rb_define_method(rb_cString, "chr", rb_str_chr, 0);
  //   rb_define_method(rb_cString, "getbyte", rb_str_getbyte, 1);
  //   rb_define_method(rb_cString, "setbyte", rb_str_setbyte, 2);

  // rb_define_method(rb_cString, "to_i", rb_str_to_i, -1);
  // rb_define_method(rb_cString, "to_f", rb_str_to_f, 0);
  // rb_define_method(rb_cString, "to_s", rb_str_to_s, 0);
  // rb_define_method(rb_cString, "to_str", rb_str_to_s, 0);
  // rb_define_method(rb_cString, "inspect", rb_str_inspect, 0);
  // rb_define_method(rb_cString, "dump", rb_str_dump, 0);

  // rb_define_method(rb_cString, "upcase", rb_str_upcase, 0);
  // rb_define_method(rb_cString, "downcase", rb_str_downcase, 0);
  // rb_define_method(rb_cString, "capitalize", rb_str_capitalize, 0);
  // rb_define_method(rb_cString, "swapcase", rb_str_swapcase, 0);

  // rb_define_method(rb_cString, "hex", rb_str_hex, 0);
  // rb_define_method(rb_cString, "oct", rb_str_oct, 0);
  // rb_define_method(rb_cString, "split", rb_str_split_m, -1);
  // rb_define_method(rb_cString, "lines", rb_str_each_line, -1);
  // rb_define_method(rb_cString, "bytes", rb_str_each_byte, 0);
  // rb_define_method(rb_cString, "chars", rb_str_each_char, 0);
  // rb_define_method(rb_cString, "codepoints", rb_str_each_codepoint, 0);
  // rb_define_method(rb_cString, "reverse", rb_str_reverse, 0);
  // rb_define_method(rb_cString, "concat", rb_str_concat, 1);
  // rb_define_method(rb_cString, "<<", rb_str_concat, 1);
  // rb_define_method(rb_cString, "crypt", rb_str_crypt, 1);
  // rb_define_method(rb_cString, "intern", rb_str_intern, 0);
  // rb_define_method(rb_cString, "to_sym", rb_str_intern, 0);
  // rb_define_method(rb_cString, "ord", rb_str_ord, 0);

  // rb_define_method(rb_cString, "include?", rb_str_include, 1);
  // rb_define_method(rb_cString, "start_with?", rb_str_start_with, -1);
  // rb_define_method(rb_cString, "end_with?", rb_str_end_with, -1);

  // rb_define_method(rb_cString, "scan", rb_str_scan, 1);

  // rb_define_method(rb_cString, "ljust", rb_str_ljust, -1);
  // rb_define_method(rb_cString, "rjust", rb_str_rjust, -1);
  // rb_define_method(rb_cString, "center", rb_str_center, -1);

  // rb_define_method(rb_cString, "sub", rb_str_sub, -1);
  // rb_define_method(rb_cString, "gsub", rb_str_gsub, -1);
  // rb_define_method(rb_cString, "chop", rb_str_chop, 0);
  // rb_define_method(rb_cString, "chomp", rb_str_chomp, -1);
  // rb_define_method(rb_cString, "strip", rb_str_strip, 0);
  // rb_define_method(rb_cString, "lstrip", rb_str_lstrip, 0);
  // rb_define_method(rb_cString, "rstrip", rb_str_rstrip, 0);

  // rb_define_method(rb_cString, "tr", rb_str_tr, 2);
  // rb_define_method(rb_cString, "tr_s", rb_str_tr_s, 2);
  // rb_define_method(rb_cString, "delete", rb_str_delete, -1);
  // rb_define_method(rb_cString, "squeeze", rb_str_squeeze, -1);
  // rb_define_method(rb_cString, "count", rb_str_count, -1);

  // rb_define_method(rb_cString, "each_line", rb_str_each_line, -1);
  // rb_define_method(rb_cString, "each_byte", rb_str_each_byte, 0);
  // rb_define_method(rb_cString, "each_char", rb_str_each_char, 0);
  // rb_define_method(rb_cString, "each_codepoint", rb_str_each_codepoint, 0);

  // rb_define_method(rb_cString, "sum", rb_str_sum, -1);

  // rb_define_method(rb_cString, "slice", rb_str_aref_m, -1);

  // rb_define_method(rb_cString, "partition", rb_str_partition, 1);
  // rb_define_method(rb_cString, "rpartition", rb_str_rpartition, 1);



  rb_cSymbol = rb_define_class("Symbol", rb_cObject);
  // rb_include_module(rb_cSymbol, rb_mComparable);
  // rb_undef_alloc_func(rb_cSymbol);
  // rb_undef_method(rb_cSymbol.klass, "new");
  // rb_define_singleton_method(rb_cSymbol, "all_symbols", rb_sym_all_symbols, 0);

  // rb_define_method(rb_cSymbol, "==", rb_sym_equal, 1);
  // rb_define_method(rb_cSymbol, "inspect", rb_sym_inspect, 0);
  // rb_define_method(rb_cSymbol, "to_s", rb_sym_to_s, 0);
  // rb_define_method(rb_cSymbol, "id2name", rb_sym_to_s, 0);
  // rb_define_method(rb_cSymbol, "intern", rb_sym_to_sym, 0);
  // rb_define_method(rb_cSymbol, "to_sym", rb_sym_to_sym, 0);
  // rb_define_method(rb_cSymbol, "to_proc", rb_sym_to_proc, 0);
  // rb_define_method(rb_cSymbol, "succ", rb_sym_succ, 0);
  // rb_define_method(rb_cSymbol, "next", rb_sym_succ, 0);

  // rb_define_method(rb_cSymbol, "<=>", rb_sym_cmp, 1);
  // rb_define_method(rb_cSymbol, "casecmp", rb_sym_casecmp, 1);
  // rb_define_method(rb_cSymbol, "=~", rb_sym_match, 1);

  // rb_define_method(rb_cSymbol, "[]", rb_sym_aref, -1);
  // rb_define_method(rb_cSymbol, "slice", rb_sym_aref, -1);
  // rb_define_method(rb_cSymbol, "length", rb_sym_length, 0);
  // rb_define_method(rb_cSymbol, "size", rb_sym_length, 0);
  // rb_define_method(rb_cSymbol, "empty?", rb_sym_empty, 0);
  // rb_define_method(rb_cSymbol, "match", rb_sym_match, 1);

  // rb_define_method(rb_cSymbol, "upcase", rb_sym_upcase, 0);
  // rb_define_method(rb_cSymbol, "downcase", rb_sym_downcase, 0);
  // rb_define_method(rb_cSymbol, "capitalize", rb_sym_capitalize, 0);
  // rb_define_method(rb_cSymbol, "swapcase", rb_sym_swapcase, 0);
}
/* 
 * variable.js
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

function rb_ivar_set(obj, id, val) {
  obj.iv_tbl[id] = val;
  return val;
};

function rb_ivar_get(obj, id) {
  return obj[id];
}

function rb_const_set(k, id, val) {
  return rb_mod_av_set(k, id, val, true);
}

function rb_mod_av_set(k, id, val, isconst) {
  return k.iv_tbl[id] = val;
}

function rb_const_set(k, id, val) {
  return k.iv_tbl[id] = val;
}

function rb_const_get(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.sup;
  }
  throw "NameError: uninitialized constant " + id + " in " + k.name
  return nil;
}

function rb_const_get_full(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.sup;
  }
  // now try parent instead..
  t = k.parent;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.parent;
  }
  throw "NameError: uninitialized constant " + id + " in " + k.name
  return nil;
}

function rb_const_defined(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return true;
    t = t.sup;
  }
  return false;
}

function rb_const_defined_full(k, id) {
  var v, t = k;
  while (t) {
    if (v = t.iv_tbl[id]) return true;
    t = t.sup;
  }
  // now try parent instead..
  t = k.parent;
  while (t) {
    if (v = t.iv_tbl[id]) return true;
    t = t.parent;
  }
  return false;
}

function rb_const_defined_at(k, id) {
  return (k.iv_tbl[id]) ? true : false;
}

function rb_const_get_at(k, id) {
  return (k.iv_tbl[id]) ? k.iv_tbl[id] : nil;
}



// function rb_funcall(self, id) {
//   // console.log(id);
//   // rb_funcall_stack.push(id);
//   if (!self.klass) {
//     console.log('ERROR: rb_funcall');
//     console.log(self);
//     console.log(id);
//   }
//   
//   var method = rb_search_method(self.klass, id);
//   
//   if (!method) {
//     console.log(self);
//     throw 'RObject#call cannot find method: ' + id ;
//   } 
//   // console.log(Array.prototype.slice.call(arguments));
//   switch(arguments.length) {
//     case 2: return method(self, id);
//     case 3: return method(self, id, arguments[2]);
//     case 4: return method(self, id, arguments[2], arguments[3]);
//     case 5: return method(self, id, arguments[2], arguments[3], arguments[4]);
//   }
//   
//   return method.apply(self, arguments);
// }
// 
// /**
//   For compatibility
// */
// var VN$ = rb_funcall;
// 
// /**
//   Call super method
// */
// var rb_supcall = function rb_supcall(from, self, id, args) {
//   var method = self.$klass.$search_super_method(from, id);
//   if (!method) throw 'RObject#call cannot find super method for: ' + id ;
//   
//   switch(args.length) {
//     case 0: return method(self, id);
//     case 1: return method(self, id, args[0]);
//     case 2: return method(self, id, args[0], args[1]);
//     case 3: return method(self, id, args[0], args[1], args[2]);
//     case 4: return method(self, id, args[0], args[1], args[2], args[3]);
//   }
//   
//   return method.apply(self, arguments);
// };

// /**
//   For compatibility
// */
// var VN$sup = rb_supcall;
// 
// /**
//   Call super
//   - from = callee
// */
// RObject.prototype.$sup = function(from, id, args) {
//   // console.log('callee');
//   // console.log(from);
//   var method = this.$klass.$search_super_method(from, id);
//   if (!method) throw 'RObject#call cannot find super method for: ' + id ;
//   // console.log('got super');
//   // console.log(method);
//   return method.apply(this, args) ;
// };
/* 
 * vm.js
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
  Jarv - (Javascript/Just) another ruby vm
  Influenced by yarv, but opcodes are different.
*/
 
// temp so we dont have to change code later;
var nil = null;
 
/**
  Instruction table (opcodes)
*/
var iNOP                    = 0,              iGETLOCAL               = 1,
    iSETLOCAL               = 2,              iGETSPECIAL             = 3,
    iSETSPECIAL             = 4,              iGETDYNAMIC             = 5,
    iSETDYNAMIC             = 6,              iGETINSTANCEVARIABLE    = 7,
    iSETINSTANCEVARIABLE    = 8,              iGETCLASSVARIABLE       = 9,
    iSETCLASSVARIABLE       = 10,             iGETCONSTANT            = 11,
    iSETCONSTANT            = 12,             iGETGLOBAL              = 13,
    iSETGLOBAL              = 14,             iPUTNIL                 = 15,
    iPUTSELF                = 16,             iPUTOBJECT              = 17,
    iPUTSTRING              = 18,             iCONCATSTRINGS          = 19,
    iTOSTRING               = 20,             iTOREGEXP               = 21,
    iNEWARRAY               = 22,             iDUPARRAY               = 23,
    iEXPANDARRAY            = 24,             iCONCATARRAY            = 25,
    iSPLATARRAY             = 26,             iCHECKINCLUDEARRAY      = 27,
    iNEWHASH                = 28,             iNEWRANGE               = 29,
    iPOP                    = 30,             iDUP                    = 31,
    iDUPN                   = 32,             iSWAP                   = 33,
    iREPUT                  = 34,             iTOPN                   = 35,
    iSETN                   = 36,             iADJUSTSTACK            = 37,
    iDEFINEMETHOD           = 38,             iALIAS                  = 39,
    iUNDEF                  = 40,             iDEFINED                = 41,
    iPOSTEXE                = 42,             iTRACE                  = 43,
    iDEFINECLASS            = 44,             iSEND                   = 45,
    iINVOKESUPER            = 46,             iINVOKEBLOCK            = 47,
    iLEAVE                  = 48,             iFINISH                 = 49,
    iTHROW                  = 50,             iJUMP                   = 51,
    iBRANCHIF               = 52,             iBRANCHUNLESS           = 53,
    iGETINLINECACHE         = 54,             iONCEINLINECACHE        = 55,
    iSETINLINECACHE         = 56,             iOPT_CASE_DISPATCH      = 57,
    iOPT_CHECKENV           = 58,             iOPT_PLUS               = 59,
    iOPT_MINUS              = 60,             iOPT_MULT               = 61,
    iOPT_DIV                = 62,             iOPT_MOD                = 63,
    iOPT_EQ                 = 64,             iOPT_NEQ                = 65,
    iOPT_LT                 = 66,             iOPT_LE                 = 67,
    iOPT_GT                 = 68,             iOPT_GE                 = 69,
    iOPT_LTLT               = 70,             iOPT_AREF               = 71,
    iOPT_ASET               = 72,             iOPT_LENGTH             = 73,
    iOPT_SUCC               = 74,             iOPT_NOT                = 75,
    iOPT_REGEXPMATCH1       = 76,             iOPT_REGEXPMATCH2       = 77,
    iOPT_CALL_C_FUNCTION    = 78,             iBITBLT                 = 79,
    iANSWER                 = 80;     

/**
  iseq types
*/
var ISEQ_TYPE_TOP    = 1,
    ISEQ_TYPE_METHOD = 2,
    ISEQ_TYPE_BLOCK  = 3,
    ISEQ_TYPE_CLASS  = 4,
    ISEQ_TYPE_RESCUE = 5,
    ISEQ_TYPE_ENSURE = 6,
    ISEQ_TYPE_EVAL   = 7,
    ISEQ_TYPE_MAIN   = 8;

/**
  == Depreceated
  

  call args
*/
var VM_CALL_ARGS_SPLAT_BIT    = 2,
    VM_CALL_ARGS_BLOCKARG_BIT = 4,
    VM_CALL_FCALL_BIT         = 8,
    VM_CALL_VCALL_BIT         = 16,
    VM_CALL_TAILCALL_BIT      = 32,
    VM_CALL_TAILRECURSION_BIT = 64,
    VM_CALL_SUPER_BIT         = 128,
    VM_CALL_SEND_BIT          = 256;


/**
  Handles some functionality found in thread until thread is added to main repo.
  At the moment, using threads makes to much of a performance impact, so they
  will be added if/when performance can be improved. (Need to determine how much
  performance impact is justified.). See 'threads' branch on vienna.adambeynon.com
  for threads code. Not currently in github branch (or branch for gem building.)
*/
function rb_vm() {
  this.self = null;
  
  this.running = 0;
  
  // current frame pointer - rb_control_frame
  this.cfp = null;
  // control frame stack
  this.cfs = []
  
  // for iterations
  this.passed_block = null;
  
  this.top_self = null;
  this.top_wrapper = null;
  
  // eval env
  this.base_block = null;
  
  // search style.. search for local .rb or .vm files
  this.search_style = ".rb";
}

function rb_control_frame() {
  // stack. every control frame manages its own stack
  this.stack = []
  // stack pointer
  this.sp = 0;
  // program counter
  this.pc = 0;
  // prev env
  this.prev = null;
  // instruction sequence (array we got from json, for now)
  this.iseq = null;
  // local self
  this.self = null;
  // local frame pointer
  this.lfp = null;
  // dynamic frame pointer
  this.dfp = null;
  // block instruction sequences..
  this.block_iseq = null;
  // proc - always 0/false for methods..
  this.proc = 0;
  
  // locals
  this.locals = null;
  
  // this.insn_info_table = {
  //   position: 0, line_no: 0, sp: 0
  // };
  this.line_no = 0;
  
  // 
  this.method_id = null;
  this.method_class = null;
}



// currently the only vm. thread support is currently disabled
var rb_top_vm = null;



// Seq is an array, [:misc, :name etc....]
function rb_iseq_eval(iseq) {
  var val, vm = rb_top_vm;
  vm_set_top_stack(vm, iseq);
  val = vm_run_mode_running(rb_top_vm);
  return val;
}

function vm_set_top_stack(vm, iseq) {
  if (iseq[4] != ISEQ_TYPE_TOP) {
    // rb_raise(rb_eTypeError, "Not a toplevel InstructionSequence");
    throw 'rb_eTypeError: ' + 'Not a top level InstructionSequence'
  }
  

  // vm_push_frame(vm, iseq, ISEQ_TYPE_TOP, vm.top_self, 0, 0, -1, 0, iseq[0][1])
  vm_push_frame(vm, iseq, vm.top_self);
}

function vm_run_mode_sleep(vm) {
  vm.running = 0;
}

function vm_run_mode_running(vm) {
  vm.running = 1;
  return vm_exec(vm);
}

/**
  Execute iseq, for current frame pointer, which will be a function.
*/
function vm_exec(vm) {
  var iseq = vm.cfp.iseq[7];
  return iseq();
}

/**
  getconstant
*/
function vm_getconstant(klass, id) {
  if (klass == nil) {
    // FIXME
    klass = rb_cObject;
  }
  return rb_const_get(klass, id);
}


/**
  vm_setlocal(idx, val)
  
  idx - index of local. Args, then locals.
  val - actual value to set.
  
  == Discussion
  
  Sets local var value. Note, not local ivar.
*/
function vm_setlocal(idx, val) {
  return rb_top_vm.cfp.locals[idx] = val;
}

/**
  vm_send
*/
function vm_send(recv, id, argv, blockiseq) {
  return rb_call(recv.klass, recv, id, argv.length, argv, blockiseq);
}

/**
  get local self for env
*/
function vm_putself() {
  return rb_top_vm.cfp.self;
}

/**
  put nil
*/
function vm_putnil() {
  return nil;
}

/**
  defineclass
*/
function vm_defineclass(base, sup, id, class_iseq, define_type) {
  if (sup == nil) sup = rb_cObject;
  var klass = rb_define_class(id, sup);
  // vm_push_frame(vm, op[2], klass);
  // var val = vm_exec(vm);
  // vm_pop_frame(vm);
}

/**
  For now, use vm instead of thread.
  @param {rb_thread} vm
  @param {rb_iseq} iseq
  @param VALUE type
  @param VALUE self
  @param VALUE specval
  @param VALUE pc
  @param VALUE sp
  @param VALUE lfp
  @param int local_size
*/
// function vm_push_frame(vm, iseq, type, self, specval, pc, sp, lfp, local_size) {
//   var cfp = new rb_control_frame();
//   // push cfp onto stack, then increment sp??
//   cfp.pc = pc;
//   cfp.sp = sp + 1;
//   cfp.bp = sp + 1;
//   cfp.iseq = iseq;
//   cfp.flag = type;
//   cfp.self = self;
//   cfp.lfp = lfp;
//   cfp.dfp = sp;
//   cfp.proc = 0;
//   
//   // console.log("locals size: " + local_size);  
//   vm.cfp = cfp;
//   vm.cfs.push(cfp);
//   // vm.cfp = cfp;
//   
//   
//   return cfp;
// }

function vm_push_frame(vm, iseq, self) {
  var cfp = new rb_control_frame();
  cfp.iseq = iseq;
  cfp.self = self;
  cfp.pc = 0;
  
  cfp.locals = new Array(iseq[0] + iseq[1]);
  
  vm.cfp = cfp;
  vm.cfs.push(cfp);
  return cfp;
}

function vm_pop_frame(vm) {
  // console.log(vm);
  // throw "."
  vm.cfs.pop();
  vm.cfp = vm.cfs[vm.cfs.length - 1];
}

function rb_funcall(recv, mid, argc) {
  var argv = Array.prototype.slice.call(arguments, 3, argc + 3);
  
  return rb_call(recv.klass, recv, mid, argc, argv, nil);
}

function rb_call(klass, recv, mid, argc, argv, blockptr) {
  var body = rb_search_method(klass, mid);
  if (!body) {
    console.log("calling method missing with: " + mid);
    console.log(recv);
    return rb_call(klass, recv, "method_missing", 2, [mid, argv], blockptr);
  }
  
  return rb_vm_call(rb_top_vm, klass, recv, mid, mid, argc, argv, body, 0, blockptr);
}

function rb_search_method(klass, id) {

 var f, k = klass;
 while (!(f = k.m_tbl[id])) {
   k = k.sup;
   if (!k) return undefined;
 }
 return f;
};

function rb_vm_call(vm, klass, recv, id, oid, argc, argv, body, nosuper, blockptr) {
  if (typeof body === 'function') {

    var pcf = vm.cfp;

    var cfp = vm_push_frame(vm, [0,0], recv);
    cfp.block_iseq = blockptr;
    var val = call_cfunc(body, recv, body.rb_argc, argc, argv);
    
    vm_pop_frame(vm);
    return val;
  }
  else {

    var pcf = vm.cfp;
    var cfp = vm_push_frame(vm, body, recv);
    cfp.block_iseq = blockptr;

    for (var i = 0; i < argc; i++) {
      cfp.locals[i] = argv[i];
    }
    
    var val = vm_exec(vm);
    vm_pop_frame(vm);
    return val;
  }
}

function call_cfunc(func, recv, len, argc, argv) {

  if (len >= 0 && argc != len) {
    // rb_raise(rb_eArgError, "wrong number of arguments(" + argc + " for " + len + ")");
    throw "rb_eArgError: wrong number of arguments(" + argc + " for " + len + ")"
  }
  
  // even though 15 is acceptable, we should determine a cut off point. 5 seems reasonable, then after
  // 5, we just push recv to start of argv, and apply().
  switch (len) {
    case -2:
      throw "call_cfunc: unimplemeneted: -2 arg length"
    case -1:
      return func(argc, argv, recv);
    case 0:
      return func(recv);
    case 1:
      return func(recv, argv[0]);
    case 2:
      return func(recv, argv[0], argv[1]);
    case 3:
      return func(recv, argv[0], argv[1], argv[2]);
    case 4:
      return func(recv, argv[0], argv[1], argv[2], argv[3]);
    case 5:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4]);
    case 6:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5]);
    case 7:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6]);
    case 8:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7]);
    case 9:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8]);
    case 10:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9]);
    case 11:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10]);
    case 12:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11]);
    case 13:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11], argv[12]);
    case 14:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11], argv[12], argv[13]);
    case 15:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11], argv[12], argv[13], argv[14]);
    default:
      // rb_raise(rb_eArgError, "too many arguments(" + len + ")");
      throw "rb_eArgError: too many arguments(" + len + ")"
  }
  throw "should never be reached"
}

/**
  Is block given. This is used from c functions that check the current frame
  pointer to see if it has a block.
*/
function rb_block_given_p() {
  
}

/**
  Is block given. This method, accessible from ruby, checks the previous stack
  frame for a block. Calling this method pushes a new stack frame onto the stack,
  so the previous one must be checked.
*/
function rb_f_block_given_p(recv) {
  
}

function rb_yield(val) {
  if (val === nil) return rb_yield_0(0, []);
  return rb_yield_0(1, [val]);
}

function rb_yield_0(argc, argv) {
  var vm = rb_top_vm;
  if (vm.cfp.block_iseq !== nil) {
    var recv = 0; // FIXME: get the correct receiver..


    var pcf = vm.cfp;
    var cfp = vm_push_frame(vm, vm.cfp.block_iseq, recv);
    // cfp.block_iseq = blockptr;
    // var cfp = vm_push_frame(vm, body, 0, recv, null, 0, pcf.sp, 0, body[0][1]);
    for (var i = 0; i < argc; i++) {
      cfp.locals[i] = argv[i];
    }
    
    var val = vm_exec(vm);
    vm_pop_frame(vm);
    return val;
    
    
    
    
    
    
    
    
    // console.log("we have block, push then execute it");
    // return nil;
  }
  throw "rb_yield_0: no block given";
  // console.log("yielding with vm:");
  // console.log(vm.cfp.block_iseq);
  return nil;
}


// Initializie VM - this will run the main VM
function Init_VM() {
  rb_top_vm = new rb_vm();
  rb_top_vm.top_self = rb_top_self;
}

function main_to_s() {
  return "main";
}

rb_top_self = null;

function rb_vm_top_self() {
  return rb_top_vm.top_self;
}


// Initialize top self
function Init_top_self() {
  /**
    Hack. When we run this, our VM isnt actually running.... so we cant use methods.. hmmm
  */
  rb_top_self = new RObject();
  rb_top_self.klass = rb_cObject;
  FL_SET(rb_top_self, T_OBJECT);
  rb_define_singleton_method(rb_top_self, 'to_s', main_to_s, 0); 
}

function rb_method_missing(argc, argv, recv) {
  throw "method missing: " + argv.join(",")
}

function Init_vm_eval() {
  
    // rb_define_method(rb_mKernel, "eval", rb_f_eval, -1);
    // rb_define_method(rb_mKernel, "local_variables", rb_f_local_variables, 0);
    // rb_define_method(rb_mKernel, "iterator?", rb_f_block_given_p, 0);
    // rb_define_method(rb_mKernel, "block_given?", rb_f_block_given_p, 0);
    // 
    // rb_define_method(rb_mKernel, "catch", rb_f_catch, -1);
    // rb_define_method(rb_mKernel, "throw", rb_f_throw, -1);
    // 
    // rb_define_method(rb_mKernel, "loop", rb_f_loop, 0);
    // 
    // rb_define_method(rb_cBasicObject, "instance_eval", rb_obj_instance_eval, -1);
    // rb_define_method(rb_cBasicObject, "instance_exec", rb_obj_instance_exec, -1);
    rb_define_private_method(rb_cBasicObject, "method_missing", rb_method_missing, -1);

    // rb_define_method(rb_cBasicObject, "__send__", rb_f_send, -1);
    // rb_define_method(rb_mKernel, "send", rb_f_send, -1);
    // rb_define_method(rb_mKernel, "public_send", rb_f_public_send, -1);
    // 
    // rb_define_method(rb_cModule, "module_exec", rb_mod_module_exec, -1);
    // rb_define_method(rb_cModule, "class_exec", rb_mod_module_exec, -1);
    // rb_define_method(rb_cModule, "module_eval", rb_mod_module_eval, -1);
    // rb_define_method(rb_cModule, "class_eval", rb_mod_module_eval, -1);
    // 
    // rb_define_method(rb_mKernel, "caller", rb_f_caller, -1);
}

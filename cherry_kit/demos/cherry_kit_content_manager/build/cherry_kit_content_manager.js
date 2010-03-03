/* 
 * array.js
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

var rb_cArray;

if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(obj){
	  for (var i = 0; i< this.length; i++){
	   if (this[i] == obj){
       return i;
	    }
	  }
	  return -1;
	}
}

function rb_ary_each(ary, id, _) {
  // var _ = opal_block; opal_block = nil;
  var i;
  // if (!rb_block_given_p()) {
    // throw "return enumerator thingy"
  // }
  for (i = 0; i < ary.length; i++) {
    vm_yield(_, [ary[i]]);
    // console.log("should yield: " + ary[i]);
  }
  return ary;
};

function rb_ary_includes(ary, val) {
  if (ary.indexOf(val) != -1) return true;
  return false;
};

function rb_ary_push(ary, id, _, val) {
  ary.push(val);
  return ary;
};

function rb_ary_collect(ary, id, _) {
  var i, res = [];
  for (i = 0; i < ary.length; i++) {
    res.push(vm_yield(_, [ary[i]]));
  }
  return res;
};

function rb_ary_to_s(ary) {
  var res = [];
  for (var i = 0; i < ary.length; i++) {
    res.push(vm_send(ary[i], "to_s", [], nil, 0));
  }
  return res.join("");
};

function rb_ary_inspect(ary) {
  var res = ["["]
  for (var i = 0; i < ary.length; i++) {
    if (i > 0) res.push(", ");
    res.push(vm_send(ary[i], "inspect", [], nil, 0));
  }
  res.push("]");
  return res.join("");
};

function rb_ary_select(ary) {
  var _ = opal_block; opal_block = nil;
  var res = [], v;
  for (var i = 0; i < ary.length; i++) {
    v = vm_yield(_, [ary[i]]);
    if (RTEST(v)) res.push(ary[i]);
  }
  return res;
};

function rb_ary_aref(ary, id, _, idx) {
  return ary[idx];
};

function rb_ary_aset(ary, id, _, idx, val) {
  // console.log("index is" + idx);
  return ary[idx] = val;
};

function rb_ary_reject(ary) {
  var _ = opal_block; opal_block = nil;
  var res = [], v;
  for (var i = 0; i < ary.length; i++) {
    v = vm_yield(_, [ary[i]]);
    if (!RTEST(v)) res.push(ary[i]);
  }
  return rest;
};

function rb_ary_length(ary) {
  return ary.length;
};

function rb_ary_plus(a, b) {
  var c = [];
  for (var i = 0; i < a.length; i++) {
    c.push(a[i]);
  }
  for (var i = 0; i < b.length; i++) {
    c.push(b[i]);
  }
  return c;
};

function rb_ary_times(ary, n) {
  if (n.klass == rb_cString) {
    return ary.join(n);
  }
  else {
    var res = [];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < ary.length; j++) {
        res.push(ary[j]);
      }
    }
    return res;
  }
};

function rb_ary_last(ary, id, _, num) {
  if (ary.length == 0) {
    if (num != undefined) {
      return [];
    }
    else {
      return nil;
    }
  }
  if (num != undefined) {
    return ary.slice(ary.length - num, ary.length);
  }
  return ary[ary.length - 1];
};

function rb_ary_first(ary, num) {
  return ary[0];
};

function rb_ary_equal(a, id, _, b) {
  if (a === b) return true;
  if (b.klass !== rb_cArray) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (!rb_funcall(a[i], "==", b[i])) return false;
  }
  return true;
};

function rb_ary_pop_m(ary, id, _, num) {
  if (num === undefined) {
    return ary.pop();
  }
  else if (ary.length == 0) {
    return [];
  }
  else {
    var r = ary.slice(ary.length - num, ary.length);
    ary.splice(ary.length - num, ary.length);
    return r;
  }
};

function rb_ary_at(ary, id, _, at) {
  if (at >= 0) {
    if (at > ary.length) return nil;
    return ary[at];
  }
  else {
    if (at < -ary.length) return nil;
    return ary[ary.length + at];
  }
};

function rb_ary_unshift_m(ary, id, _, val) {
  return ary.unshift(val);
};

function Init_Array() {
  
  rb_cArray = rb_define_class("Array", rb_cObject);
  Array.prototype.klass = rb_cArray;
  Array.prototype.flags = T_ARRAY | T_OBJECT;
  
  // rb_include_module(rb_cArray, rb_mEnumerable);
  
  // rb_define_alloc_func(rb_cArray, rb_ary_alloc);
  // rb_define_singleton_method(rb_cArray, "[]", rb_ary_s_create, -1);
  // rb_define_singleton_method(rb_cArray, "try_convert", rb_ary_s_try_convert, 1);
  // rb_define_method(rb_cArray, "initialize", rb_ary_initialize, -1);
  // rb_define_method(rb_cArray, "initialize_copy", rb_ary_replace, 1);

  rb_define_method(rb_cArray, "to_s", rb_ary_to_s, 0);
  rb_define_method(rb_cArray, "inspect", rb_ary_inspect, 0);
  // rb_define_method(rb_cArray, "to_a", rb_ary_to_a, 0);
  // rb_define_method(rb_cArray, "to_ary", rb_ary_to_ary_m, 0);
  // rb_define_method(rb_cArray, "frozen?",  rb_ary_frozen_p, 0);

  rb_define_method(rb_cArray, "==", rb_ary_equal, 1);
  // rb_define_method(rb_cArray, "eql?", rb_ary_eql, 1);
  // rb_define_method(rb_cArray, "hash", rb_ary_hash, 0);

  rb_define_method(rb_cArray, "[]", rb_ary_aref, -1);
  rb_define_method(rb_cArray, "[]=", rb_ary_aset, -1);
  rb_define_method(rb_cArray, "at", rb_ary_at, 1);
  // rb_define_method(rb_cArray, "fetch", rb_ary_fetch, -1);
  rb_define_method(rb_cArray, "first", rb_ary_first, -1);
  rb_define_method(rb_cArray, "last", rb_ary_last, -1);
  // rb_define_method(rb_cArray, "concat", rb_ary_concat, 1);
  rb_define_method(rb_cArray, "<<", rb_ary_push, 1);
  // rb_define_method(rb_cArray, "push", rb_ary_push_m, -1);
  rb_define_method(rb_cArray, "pop", rb_ary_pop_m, -1);
  // rb_define_method(rb_cArray, "shift", rb_ary_shift_m, -1);
  rb_define_method(rb_cArray, "unshift", rb_ary_unshift_m, -1);
  // rb_define_method(rb_cArray, "insert", rb_ary_insert, -1);
  rb_define_method(rb_cArray, "each", rb_ary_each, 0);
  // rb_define_method(rb_cArray, "each_index", rb_ary_each_index, 0);
  // rb_define_method(rb_cArray, "reverse_each", rb_ary_reverse_each, 0);
  rb_define_method(rb_cArray, "length", rb_ary_length, 0);
  // rb_define_method(rb_cArray, "size", rb_ary_length, 0);
  rb_define_alias(rb_cArray,  "size", "length");
  // rb_define_method(rb_cArray, "empty?", rb_ary_empty_p, 0);
  // rb_define_method(rb_cArray, "find_index", rb_ary_index, -1);
  // rb_define_method(rb_cArray, "index", rb_ary_index, -1);
  // rb_define_method(rb_cArray, "rindex", rb_ary_rindex, -1);
  // rb_define_method(rb_cArray, "join", rb_ary_join_m, -1);
  // rb_define_method(rb_cArray, "reverse", rb_ary_reverse_m, 0);
  // rb_define_method(rb_cArray, "reverse!", rb_ary_reverse_bang, 0);
  // rb_define_method(rb_cArray, "sort", rb_ary_sort, 0);
  // rb_define_method(rb_cArray, "sort!", rb_ary_sort_bang, 0);
  rb_define_method(rb_cArray, "collect", rb_ary_collect, 0);
  // rb_define_method(rb_cArray, "collect!", rb_ary_collect_bang, 0);
  rb_define_method(rb_cArray, "map", rb_ary_collect, 0);
  // rb_define_method(rb_cArray, "map!", rb_ary_collect_bang, 0);
  rb_define_method(rb_cArray, "select", rb_ary_select, 0);
  // rb_define_method(rb_cArray, "values_at", rb_ary_values_at, -1);
  // rb_define_method(rb_cArray, "delete", rb_ary_delete, 1);
  // rb_define_method(rb_cArray, "delete_at", rb_ary_delete_at_m, 1);
  // rb_define_method(rb_cArray, "delete_if", rb_ary_delete_if, 0);
  rb_define_method(rb_cArray, "reject", rb_ary_reject, 0);
  // rb_define_method(rb_cArray, "reject!", rb_ary_reject_bang, 0);
  // rb_define_method(rb_cArray, "zip", rb_ary_zip, -1);
  // rb_define_method(rb_cArray, "transpose", rb_ary_transpose, 0);
  // rb_define_method(rb_cArray, "replace", rb_ary_replace, 1);
  // rb_define_method(rb_cArray, "clear", rb_ary_clear, 0);
  // rb_define_method(rb_cArray, "fill", rb_ary_fill, -1);
  rb_define_method(rb_cArray, "include?", rb_ary_includes, 1);
  // rb_define_method(rb_cArray, "<=>", rb_ary_cmp, 1);

  // rb_define_method(rb_cArray, "slice", rb_ary_aref, -1);
  // rb_define_method(rb_cArray, "slice!", rb_ary_slice_bang, -1);

  // rb_define_method(rb_cArray, "assoc", rb_ary_assoc, 1);
  // rb_define_method(rb_cArray, "rassoc", rb_ary_rassoc, 1);

  rb_define_method(rb_cArray, "+", rb_ary_plus, 1);
  rb_define_method(rb_cArray, "*", rb_ary_times, 1);

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
};
/* 
 * class.js
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
  if (rb_const_defined_at(outer, id)) {
    // klass = VN.const_get_at(outer, id);
    /**
      this should be const_get_at
    */
    // klass = outer.$c_g_a(id);
    klass = rb_const_get_at(outer, id);
    // console.log(klass);
    // if (!(klass.flags & VN.CLASS) {
    //   VN.type_error(id + ' is not a class');
    // }
    // if (RClass.real(klass.$super) != super_klass) {
    //   // avoid error for cObject
    //   if (klass != cObject) {
    //     VN.name_error(id + ' is already defined');
    //   }
    //   
    // }
    return klass;
  }
  // not existing...
  if (!super_klass) {
    VN.warning('no super class for `' + VN.class2name(outer), + '::' + id + '`, Object assumed');
  }
  klass = rb_define_class_id(id, super_klass);
  
  rb_name_class(klass, id);
  rb_const_set(outer, id, klass);
  rb_class_inherited(super_klass, klass);

  return klass;
};

RClass.class2name = function(klass) {
  return klass.$class_name();
};

RClass.obj_classname = function(obj) {
  return VN.class2name(obj.$klass);
};

function make_metametaclass(metaclass) {
  console.log("wwowow");
  var metametaclass, super_of_metaclass;

  if (metaclass.klass == metaclass) {
    // console.log(1);
    metametaclass = rb_class_boot(null);
    metametaclass.klass = metametaclass;
  }
  else {
    // console.log(2);
    metametaclass = rb_class_boot(null);
    metametaclass.klass = metaclass.klass.klass == metaclass.klass ? make_metametaclass(metaclass.klass) : metaclass.klass.klass;
  }
  // console.log(1);
  FL_SET(metametaclass, FL_SINGLETON);
  // console.log(2);
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
  o.flags = type;
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
  // console.log(obj);
  // console.log("here");
  if (FL_TEST(obj, T_NUMBER) || FL_TEST(obj, T_SYMBOL)) {
    console.log(obj);
    throw 'can\'t define singleton';
  }
// console.log("yeap");
  if (FL_TEST(obj.klass, FL_SINGLETON) && rb_ivar_get(obj.klass, '__attached__') == obj) {
    klass = obj.klass;
  }
  else {
    // klass = RClass.make_metaclass(obj, obj.$klass);
    // console.log(obj);
    // klass = obj.$make_metaclass(obj.$klass) ;
    klass = rb_make_metaclass(obj, obj.klass);
  }
  // console.log("nearly done");

  if (FL_TEST(obj, T_CLASS)) {
    if (rb_ivar_get(klass.klass, '__attached__') != klass) {
      // console.log("this far down");
      // console.log(klass);
      
      //FIXME: def need to fix this.!!!!!!!!!!!!! uncomment basically.
      // make_metametaclass(klass);
    }
  }
  // console.log("completely done");

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
};

function rb_singleton_class_attached(klass, obj) {
  if (FL_TEST(klass, FL_SINGLETON)) {
    rb_ivar_set(klass, '__attached__', obj);
  }
};


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
  var m = new rb_method_t();
  m.argc = argc;
  m.body = func;
  rb_add_method(klass, name, m, NOEX_PUBLIC);
};

function rb_define_private_method(klass, name, func, argc) {
  var m = new rb_method_t();
  m.argc = argc;
  m.body = func;
  rb_add_method(klass, name, m, NOEX_PRIVATE);
};

function rb_define_private_method(klass, name, func, argc) {
  var m = new rb_method_t();
  m.argc = argc;
  m.body = func;
  rb_add_method(klass, name, m, NOEX_PROTECTED);
};

function rb_define_singleton_method(klass, name, func, argc) {
  rb_define_method(rb_singleton_class(klass), name, func, argc);
};

function rb_add_method(klass, name, method) {
  klass.m_tbl[name] = method;
  // func.displayName = klass.iv_tbl.__classid__ + "#" + name;
};

function rb_define_alloc_func(klass, func) {
  rb_define_method(rb_singleton_class(klass), 'allocate', func, 0);
};

function rb_define_alias(cls, name, old) {
  var m = rb_search_method(cls, old);
  if (!m) throw "rb_define_alias: no existing method '" + old + "'"
  return rb_define_method(cls, name, m.body, m.argc);
};

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
 * compar.js
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


var rb_mComparable;

function rb_cmp_equal(x, y) {
  if (x == y) return true;
  return false;
};

function rb_cmp_gt(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c > 0) return true;
  return false;
};

function rb_cmp_ge(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c >= 0) return true;
  return false;
};

function rb_cmp_lt(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c < 0) return true;
  return false;
};

function rb_cmp_le(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c <= 0) return true;
  return false;
};

function rb_cmp_between(obj, min, max) {
  if (RTEST(rb_cmp_lt(obj, min))) return false;
  if (RTEST(rb_cmp_gt(obj, max))) return false;
  return true;
};

function Init_Comparable() {
  rb_mComparable = rb_define_module("Comparable");
  rb_define_method(rb_mComparable, "==", rb_cmp_equal, 1);
  rb_define_method(rb_mComparable, ">", rb_cmp_gt, 1);
  rb_define_method(rb_mComparable, ">=", rb_cmp_ge, 1);
  rb_define_method(rb_mComparable, "<", rb_cmp_lt, 1);
  rb_define_method(rb_mComparable, "<=", rb_cmp_le, 1);
  rb_define_method(rb_mComparable, "between?", rb_cmp_between, 2);
};
/* 
 * dir.js
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


var rb_cDir;

// glob
// /^\/app\/.*\/charles\/[^\/]*\.rb$/
//   \/app\/.*\/[^\/]*\.rb
function rb_dir_s_glob(dir, id, _) {
  if (arguments.length > 4) throw "unsupported Dir.glob.. FIXME"
  
  var result = [], eof = false;
  
  var scanner = new vn_ruby_string_scanner(arguments[3]);
  while (!eof) {
    // ** does not HAVE to include a dir, so capture **/ to match .* which will
    // match a dir, or no dir.. allows both to work together.
    if (scanner.scan(/^\*\*\//)) {
      result.push('.*');
    }
    else if (scanner.scan(/^\*\*/)) {
      result.push('.*');
    }
    else if (scanner.scan(/^\//)) {
      result.push('\\/');
    }
    else if (scanner.scan(/^\*/)) {
      result.push('[^\\/]*');
    }
    else if (scanner.scan(/^[a-zA-Z_]+/)) {
      result.push(scanner.matched);
    }
    else if (scanner.scan(/^\./)) {
      result.push('\\.');
    }
    else {
      eof = true;
    }
    // if (result.length > 108)
    // throw result.join("") + scanner.peek(10);
  }
  
  var reg =  new RegExp('^' + result.join("") + '$');
  var matching = [];
  // console.log(reg);
  for (prop in opal_files) {
    if (reg.exec(prop)) {
      matching.push(prop);
    }
  }
  return matching;
}

function Init_Dir() {
  
  rb_cDir = rb_define_class("Dir", rb_cObject);
  // rb_include_module(rb_cDir, rb_mEnumerable);
  
  // rb_define_alloc_func(rb_cDir, rb_dir_s_alloc);
  // rb_define_singleton_method(rb_cDir, "open", rb_dir_s_open, -1);
  // rb_define_singleton_method(rb_cDir, "foreach", rb_dir_foreach, -1);
  // rb_define_singleton_method(rb_cDir, "entries", rb_dir_entries, -1);
  // 
  // rb_define_method(rb_cDir,"initialize", rb_dir_initialize, -1);
  // rb_define_method(rb_cDir,"path", rb_dir_path, 0);
  // rb_define_method(rb_cDir,"inspect", rb_dir_inspect, 0);
  // rb_define_method(rb_cDir,"read", rb_dir_read, 0);
  // rb_define_method(rb_cDir,"each", rb_dir_each, 0);
  // rb_define_method(rb_cDir,"rewind", rb_dir_rewind, 0);
  // rb_define_method(rb_cDir,"tell", rb_dir_tell, 0);
  // rb_define_method(rb_cDir,"seek", rb_dir_seek, 1);
  // rb_define_method(rb_cDir,"pos", rb_dir_tell, 0);
  // rb_define_method(rb_cDir,"pos=", rb_dir_set_pos, 1);
  // rb_define_method(rb_cDir,"close", rb_dir_close, 0);
  // 
  // rb_define_singleton_method(rb_cDir,"chdir", rb_dir_s_chdir, -1);
  // rb_define_singleton_method(rb_cDir,"getwd", rb_dir_s_getwd, 0);
  // rb_define_singleton_method(rb_cDir,"pwd", rb_dir_s_getwd, 0);
  // rb_define_singleton_method(rb_cDir,"chroot", rb_dir_s_chroot, 1);
  // rb_define_singleton_method(rb_cDir,"mkdir", rb_dir_s_mkdir, -1);
  // rb_define_singleton_method(rb_cDir,"rmdir", rb_dir_s_rmdir, 1);
  // rb_define_singleton_method(rb_cDir,"delete", rb_dir_s_rmdir, 1);
  // rb_define_singleton_method(rb_cDir,"unlink", rb_dir_s_rmdir, 1);
  // 
  rb_define_singleton_method(rb_cDir,"glob", rb_dir_s_glob, -1);
  rb_define_singleton_method(rb_cDir,"[]", rb_dir_s_glob, -1);
  // rb_define_singleton_method(rb_cDir,"exist?", rb_file_directory_p, 1);
  // rb_define_singleton_method(rb_cDir,"exists?", rb_file_directory_p, 1);
  // 
  // rb_define_singleton_method(rb_cFile,"fnmatch", rb_file_s_fnmatch, -1);
  // rb_define_singleton_method(rb_cFile,"fnmatch?", rb_file_s_fnmatch, -1);
}/* 
 * enum.js
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



var rb_mEnumerable;

function Init_Enumerable() {
  rb_mEnumerable = rb_define_module("Enumerable");
  
  // rb_define_method(rb_mEnumerable, "to_a", rb_enum_to_a, -1);
  // rb_define_method(rb_mEnumerable, "entries", rb_enum_to_a, -1);

  // rb_define_method(rb_mEnumerable, "sort", rb_enum_sort, 0);
  // rb_define_method(rb_mEnumerable, "sort_by", rb_enum_sort_by, 0);
  // rb_define_method(rb_mEnumerable, "grep", rb_enum_grep, 1);
  // rb_define_method(rb_mEnumerable, "count", rb_enum_count, -1);
  // rb_define_method(rb_mEnumerable, "find", rb_enum_find, -1);
  // rb_define_method(rb_mEnumerable, "detect", rb_enum_find, -1);
  // rb_define_method(rb_mEnumerable, "find_index", rb_enum_find_index, -1);
  // rb_define_method(rb_mEnumerable, "find_all", rb_enum_find_all, 0);
  // rb_define_method(rb_mEnumerable, "select", rb_enum_find_all, 0);
  // rb_define_method(rb_mEnumerable, "reject", rb_enum_reject, 0);
  // rb_define_method(rb_mEnumerable, "collect", rb_enum_collect, 0);
  // rb_define_method(rb_mEnumerable, "map", rb_enum_collect, 0);
  // rb_define_method(rb_mEnumerable, "inject", rb_enum_inject, -1);
  // rb_define_method(rb_mEnumerable, "reduce", rb_enum_inject, -1);
  // rb_define_method(rb_mEnumerable, "partition", rb_enum_partition, 0);
  // rb_define_method(rb_mEnumerable, "group_by", rb_enum_group_by, 0);
  // rb_define_method(rb_mEnumerable, "first", rb_enum_first, -1);
  // rb_define_method(rb_mEnumerable, "all?", rb_enum_all, 0);
  // rb_define_method(rb_mEnumerable, "any?", rb_enum_any, 0);
  // rb_define_method(rb_mEnumerable, "one?", rb_enum_one, 0);
  // rb_define_method(rb_mEnumerable, "none?", rb_enum_none, 0);
  // rb_define_method(rb_mEnumerable, "min", rb_enum_min, 0);
  // rb_define_method(rb_mEnumerable, "max", rb_enum_max, 0);
  // rb_define_method(rb_mEnumerable, "minmax", rb_enum_minmax, 0);
  // rb_define_method(rb_mEnumerable, "min_by", rb_enum_min_by, 0);
  // rb_define_method(rb_mEnumerable, "max_by", rb_enum_max_by, 0);
  // rb_define_method(rb_mEnumerable, "minmax_by", rb_enum_minmax_by, 0);
  // rb_define_method(rb_mEnumerable, "member?", rb_enum_member, 1);
  // rb_define_method(rb_mEnumerable, "include?", rb_enum_member, 1);
  // rb_define_method(rb_mEnumerable, "each_with_index", rb_enum_each_with_index, -1);
  // rb_define_method(rb_mEnumerable, "reverse_each", rb_enum_reverse_each, -1);
  // rb_define_method(rb_mEnumerable, "zip", rb_enum_zip, -1);
  // rb_define_method(rb_mEnumerable, "take", rb_enum_take, 1);
  // rb_define_method(rb_mEnumerable, "take_while", rb_enum_take_while, 0);
  // rb_define_method(rb_mEnumerable, "drop", rb_enum_drop, 1);
  // rb_define_method(rb_mEnumerable, "drop_while", rb_enum_drop_while, 0);
  // rb_define_method(rb_mEnumerable, "cycle", rb_enum_cycle, -1);
}
/* 
 * enumerator.js
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

var rb_cEnumerator;

function Init_Enumerator() {
  // rb_define_method(rb_mKernel, "to_enum", rb_obj_to_enum, -1);
  // rb_define_method(rb_mKernel, "enum_for", rb_obj_to_enum, -1);
};
// 
//  error.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-23.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var rb_eException, rb_eSystemExit, rb_eFatal, rb_eSignal, rb_eInterrupt, rb_eStandardError, rb_eTypeError, rb_eArgError, rb_eIndexError, rb_eKeyError, rb_eRangeError, rb_eScriptError, rb_eSyntaxError, rb_eLoadError, rb_eNotImpError, rb_eNameError, rb_eNoMethodError, rb_eRuntimeError;

function rb_exc_initialize(exc, id, _) {
  if (arguments[3] && arguments[3].klass == rb_cString) {
    exc.iv_tbl.message = arguments[3];
  }
  else {
    exc.iv_tbl.message = exc.klass.iv_tbl.__classid__;
  }
  
  exc.toString = function() { 
    return exc.klass.iv_tbl.__classid__ + ": " + exc.iv_tbl.message;
  };
};

function rb_exc_inspect(exc) {
  return "#<" + exc.klass.iv_tbl.__classid__ + ": " + exc.iv_tbl.message + ">";
};

function rb_exc_to_s(exc) {
  return rb_exc_message(exc);
};

function rb_exc_message(exc) {
  // console.log("into message");
  // console.log(exc.toString());
  // console.log("pfft");
  var m;
  if (!exc.iv_tbl.hasOwnProperty('message')) {
    // throw exc.location
    m = "NativeError: " + exc.message;
  }
  else {
    m = exc.iv_tbl.message;
  }
  exc.iv_tbl = {message: m};
  // console.log(exc.klass);
  // throw exc;
  return m;
};

// Generically raise an exception
function rb_raise(exc, message) {
  var e = rb_obj_alloc(exc);
  rb_exc_initialize(e, "", nil, message);
  return rb_exc_raise(e);
};

// Generic jump raise
function rb_jump_raise(exc, type, message, args) {
  var e = rb_obj_alloc(exc);
  rb_exc_initialize(e, "", nil, message);
  e.iv_tbl.args = args;
  e.iv_tbl.type = type;
  return rb_exc_raise(e);
};

function rb_exc_raise(exc) {
  throw exc
};

function Init_Exception() {
  rb_eException = rb_define_class("Exception", rb_cObject);
  
  Error.prototype.klass = rb_eException;
  Error.prototype.iv_tbl = { };
  // Error.prototype.toString = function() { return "a" + ": " + this.message; };

  // TypeError.prototype.klass = rb_eException;
  // TypeError.prototype.iv_tbl = { };
  
  rb_define_singleton_method(rb_eException, "exception", rb_class_new_instance, -1);
  
  // rb_define_method(rb_eException, "exception", rb_exc_exception, -1);
  rb_define_method(rb_eException, "initialize", rb_exc_initialize, -1);
  // rb_define_method(rb_eException, "==", rb_exc_equal, 1);
  rb_define_method(rb_eException, "to_s", rb_exc_to_s, 0);
  rb_define_method(rb_eException, "message", rb_exc_message, 0);
  rb_define_method(rb_eException, "inspect", rb_exc_inspect, 0);
  // rb_define_method(rb_eException, "backtrace", rb_exc_backtrace, 0);
  // rb_define_method(rb_eException, "set_backtrace", rb_exc_set_backtrace, 1);

  rb_eSystemExit = rb_define_class("SystemExit", rb_eException);
  // rb_define_method(rb_eSystemExit, "initialize", rb_exit_initialize, -1);
  // rb_define_method(rb_eSystemExit, "status", rb_exit_status, 0);
  // rb_define_method(rb_eSystemExit, "success?", rb_exit_success_p, 0);

  rb_eFatal = rb_define_class("fatal", rb_eException);
  rb_eSignal = rb_define_class("SignalException", rb_eException);
  rb_eInterrupt = rb_define_class("Interrupt", rb_eSignal);

  rb_eStandardError = rb_define_class("StandardError", rb_eException);
  rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
  rb_eArgError = rb_define_class("ArgumentError", rb_eStandardError);
  rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
  rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
  rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);

  rb_eScriptError = rb_define_class("ScriptError", rb_eException);
  rb_eSyntaxError = rb_define_class("SyntaxError", rb_eScriptError);
  rb_eLoadError = rb_define_class("LoadError", rb_eScriptError);
  rb_eNotImpError = rb_define_class("NotImplementedError", rb_eScriptError);

  rb_eNameError = rb_define_class("NameError", rb_eStandardError);
  // rb_define_method(rb_eNameError, "initialize", rb_name_err_initialize, -1);
  // rb_define_method(rb_eNameError, "name", rb_name_err_name, 0);
  // rb_define_method(rb_eNameError, "to_s", rb_name_err_to_s, 0);
  // rb_cNameErrorMesg = rb_define_class_under(rb_eNameError, "message", rb_cData);
  // rb_define_singleton_method(rb_cNameErrorMesg, "!", name_err_mesg_new, 3);
  // rb_define_method(rb_cNameErrorMesg, "==", name_err_mesg_equal, 1);
  // rb_define_method(rb_cNameErrorMesg, "to_str", name_err_mesg_to_str, 0);
  // rb_define_method(rb_cNameErrorMesg, "_dump", name_err_mesg_to_str, 1);
  // rb_define_singleton_method(rb_cNameErrorMesg, "_load", name_err_mesg_load, 1);
  rb_eNoMethodError = rb_define_class("NoMethodError", rb_eNameError);
  // rb_define_method(rb_eNoMethodError, "initialize", rb_nometh_err_initialize, -1);
  // rb_define_method(rb_eNoMethodError, "args", rb_nometh_err_args, 0);

  rb_eRuntimeError = rb_define_class("RuntimeError", rb_eStandardError);
  // rb_eSecurityError = rb_define_class("SecurityError", rb_eException);
  // rb_eNoMemError = rb_define_class("NoMemoryError", rb_eException);
  // rb_eEncodingError = rb_define_class("EncodingError", rb_eStandardError);
  // rb_eEncCompatError = rb_define_class_under(rb_cEncoding, "CompatibilityError", rb_eEncodingError);
  
};
/* 
 * file.js
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


/**
  @class File
  @super Object
  
  File.
*/
var rb_cFile;

function opal_file() {
  this.content = "";
  this.path = "";
  this.included = false;
  this.klass = rb_cFile;
};

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
var opal_files = {
  "/": vn_fs_root
};

/**
  define a new file by filename (f), and filecontent (c)
*/
function vn_fs_define_file(f, content) {
  var file = new opal_file();
  file.content = content;
  file.path = f;
  opal_files[f] = file;
  var p = f.split("/");
  var i, c = vn_fs_root, b;
  // for each path segment, except first (which will be empty) and
  // last, which will be a file, so treat differently
  for (i = 1; i < p.length - 1; i++) {
    b = p[i];
    if (c[b] === undefined) {
      c[b] = { };
      c[b]['.'] = c[b];
      c[b]['..'] = c;
      c[b]['$'] = b;
    }
    c = c[b];
  }
  c[p[p.length - 1]] = content;
};


function rb_file_s_dirname(cls, id, _, dirname) {
  return dirname.substr(0, dirname.lastIndexOf('/'));
  // return "/dirname";
};

function rb_file_s_join(cls, id, _) {
  return Array.prototype.slice.call(arguments, 3).join("/");
};

function rb_file_s_expand_path(argc, args, obj) {
  var res_stack = [], cur;
  args = args[0].split("/")
  for (var i = 0; i < args.length; i++) {
    cur = args[i];
    if (cur == '..') {
      res_stack.pop();
    }
    else if (cur == '.' || cur == '') {
      // do nothing
    }
    else {
      res_stack.push(cur);
    }
  }
  return res_stack.join("/");
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
  rb_define_singleton_method(rb_cFile, "expand_path", rb_file_s_expand_path, -1);
  // rb_define_singleton_method(rb_cFile, "absolute_path", rb_file_s_absolute_path, -1);
  // rb_define_singleton_method(rb_cFile, "basename", rb_file_s_basename, -1);
  rb_define_singleton_method(rb_cFile, "dirname", rb_file_s_dirname, 1);
  // rb_define_singleton_method(rb_cFile, "extname", rb_file_s_extname, 1);
  // rb_define_singleton_method(rb_cFile, "path", rb_file_s_path, 1);
  // 
  // rb_define_const(rb_cFile, "Separator", "/");
  // rb_define_const(rb_cFile, "SEPARATOR", "/");
  // rb_define_const(rb_cFile, "PATH_SEPARATOR", "/");
  // 
  // rb_define_singleton_method(rb_cFile, "split",  rb_file_s_split, 1);
  rb_define_singleton_method(rb_cFile, "join",   rb_file_s_join, -1);
}

/* 
 * gem.js
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



/**
  Gem support: only for gems/bundles in the vngem format. Also provides some gem 
  methods and classes that are useful. The majority is not implemented however
  for usage patterns/reasons.
  
  name - gem name, e.g. 'vienna'
  path - bundles will be '/vendor' or similar, app will be '/' or ''
  content - string content of the vngem file. This will possibly be removed once
            the content has been parsed and the necessary files have been created.
  loaded - has this gem/bundle been required()? The content is not parsed or
            processed until it is required... which usually happens straight away.
            This property is useful to avoid loading a bundle twice.
*/
function vn_gem() {
  this.name = "";
  this.path = "";
  this.content = "";
  this.loaded = false;
};

function opal_gem_load_at_path(path, callback) {
  var r = new XMLHttpRequest();
  r.open("GET", path, false);
  r.onreadystatechange = function() {
    if(r.readyState == 4) {
      if (r.responseText == "" || r.status != 200) {
        console.log(path + " failed.");
      }
      else {
        var g = vn_gem_boot(path, r.responseText);
        callback(g);
      }
    }
  }
  r.send(null);
};

// all gems/apps/bundles, name => gem object
var vn_gem_all = { };

/**
  preload the gem at the given path so it will be ready. callbacks used for
  chaining gem loading
*/
function vn_gem_preload(path, name) {
  // preload.
}

/**
  boot a gem with the given name, path and content (i.e. process it)
*/
function vn_gem_boot(path, content) {
  var g = new vn_gem();
  // g.name = name;
  g.path = path;
  g.content = content;
  vn_gem_all[path] = g;
  vm_gem_load(g);
  return g;
}

/**
  Do actual gem processing
*/
function vm_gem_load(gem) {
  if (gem.loaded) throw "Cannot load gem twice... something silly happened"
  
  var at = 0;
  var ch = '';
  var text = gem.content;
  
  // directory of gem
  function parse_directory() {
    var f = get_next(marker_count());
    console.log("directory is " + f);
  }
  
  // parse a file
  function parse_file() {
    var f = get_next(marker_count());
    var c = get_next(marker_count());
    vn_fs_define_file(f, c);
  }
  
  // parse gem definiton
  function parse_gem_def() {
    var g = get_next(marker_count());
    var p = get_next(marker_count());
    console.log('found ' + g + ' at ' + p);
  }
  
  // parse_locales
  // parse a list of locales that this application has defined
  function parse_locales() {
    
  }
  
  // parse a css file..
  // for IE we might need to use:
  // var content = get_next(marker_count());
  // var style = document.createElement("style");
  // style.setAttribute("type", "text/css");
  // if (style.styleSheet) {
  //  // this for internet explorer.. 
  //  style.styleSheet.cssText = content;
  // }
  // else {
  //  style.appendChild(document.createTextNode(content));
  // }
  function parse_css() {
    var content = get_next(marker_count());
    var style = document.createElement('style');
    style.setAttribute("type", "text/css");
    if (style.styleSheet) {
      // ie.
      style.styleSheet.cssText = content;
    }
    else {
      // w3c
      style.appendChild(document.createTextNode(content));
    }
    
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  // get gem format
  var gem_format = (function() {
    var marker = text.indexOf(';', at);
    var format = text.substr(at, marker - at);
    at = marker + 1;
    return format;
  })();
  
  // get gem version
  var gem_version = (function() {
    var marker = text.indexOf(';', at);
    var version = text.substr(at, marker - at);
    at = marker + 1;
    return version;
  })();
  
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
  
  while (next()) {
    switch (ch) {
      case 'd':
        parse_directory();
        break;
      case 'f':
        parse_file();
        break;
      case 'g':
        parse_gem_def();
        break;
      case 'l':
        parse_locales();
        break;
      case 's':
        parse_string_table();
        break;
      case 'p':
        parse_platform_list();
        break;
      case 'c':
        parse_css();
        break;
      default:
        throw "unknown bundle part " + ch
    }
  }
  
  // make sure we dont do this again
  gem.loaded = true;
  return gem;
}


// /**
//   New javascript based "gem" loading
// */
// 
// /**
//   Declare this file contains the gem named 'name' which is located at the path
//   'path'
// */
// function opal_gem(name, path) {
//   
// };
// 
// /**
//   A source file - ruby, yaml etc. NOT Javascript. JS files are handled 
//   seperately so they are eval()'d instantly.
// */
// function opal_file(path, content) {
//   vn_fs_define_file(path, content);
// };
// 
// /**
//   Code - i.e. javascript. Eval these instantly. We retain the path so if an 
//   error occurs, then we can point back to the source file it originates from.
// */
// function opal_code(path, code) {
//   if (window.execScript) {
//     window.execScript(code);
//   } else {
//     with (window) { eval(code); }
//   }
// };
// 
// /**
//   CSS styles - shouldnt be a lot of these, but, if they exist, pop into head of
//   document.
// */
// function opal_style(content) {
//   
// };
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

function rb_hash_alloc(klass) {
  var hash = new RHash();
  hash.klass = klass;
  // FL_SET(hash, T_HASH);
  hash.ifnone = nil;
  return hash;
};

function rb_hash_new() {
  var k, v, h = rb_hash_alloc(rb_cHash);
  for (var i = 0; i < arguments.length; i++) {
    k = arguments[i], v = arguments[i+1];
    i ++;
    rb_hash_aset(h, "", nil, k, v);
  }
  return h;
};

function rb_hash_aset(hash, id, _, k, v) {
  if (hash.keys.indexOf(k) == -1) {
    hash.keys.push(k);
  }
  hash.dict[k] = v;
  return v;
};

function rb_hash_aref(hash, id, _, k) {
  if (hash.keys.indexOf(k) != -1) {
    return hash.dict[k];
  }
  return hash.ifnone;
};

function rb_hash_size(hash) {
  return hash.keys.length;
};

function rb_hash_has_key(hash, id, _, k) {
  if (hash.keys.indexOf(k) != -1) {
    return true;
  }
  return false;
};

function rb_hash_delete(hash, id, _, k) {
  hash.keys.splice(hash.keys.indexOf(k), 1);
  var r = hash.dict[k];
  delete hash.dict[k];
  return r;
};

function rb_hash_equal(a, id, _, b) {
  if (a === b) return true;
  if (b.klass != rb_cHash) return false;
  if (a.keys.length != b.keys.length) return false;
  for (var i = 0; i < a.keys.length; i++) {
    var k = a.keys[i];
    var v = rb_hash_aref(a, k);
    if (!vm_send(v, "==", [rb_hash_aref(b, b.keys[i])], nil, 0)) return false;
  }
  return true;
};

function Init_Hash() {
  rb_cHash = rb_define_class("Hash", rb_cObject);
  // rb_include_module(rb_cHash, rb_mEnumerable);
  // rb_define_alloc_func(rb_cHash, rb_hash_alloc);
  
  // rb_define_singleton_method(rb_cHash, "[]", rb_hash_s_create, -1);
  // rb_define_singleton_method(rb_cHash, "try_convert", rb_hash_s_try_convert, 1);
  
  // rb_define_method(rb_cHash,"initialize", rb_hash_initialize, -1);
  // rb_define_method(rb_cHash,"initialize_copy", rb_hash_replace, 1);
  // rb_define_method(rb_cHash,"rehash", rb_hash_rehash, 0);

  // rb_define_method(rb_cHash,"to_hash", rb_hash_to_hash, 0);
  // rb_define_method(rb_cHash,"to_a", rb_hash_to_a, 0);
  // rb_define_method(rb_cHash,"to_s", rb_hash_inspect, 0);
  // rb_define_method(rb_cHash,"inspect", rb_hash_inspect, 0);

  rb_define_method(rb_cHash,"==", rb_hash_equal, 1);
  rb_define_method(rb_cHash,"[]", rb_hash_aref, 1);
  // rb_define_method(rb_cHash,"hash", rb_hash_hash, 0);
  // rb_define_method(rb_cHash,"eql?", rb_hash_eql, 1);
  // rb_define_method(rb_cHash,"fetch", rb_hash_fetch_m, -1);
  rb_define_method(rb_cHash,"[]=", rb_hash_aset, 2);
  // rb_define_method(rb_cHash,"store", rb_hash_aset, 2);
  // rb_define_method(rb_cHash,"default", rb_hash_default, -1);
  // rb_define_method(rb_cHash,"default=", rb_hash_set_default, 1);
  // rb_define_method(rb_cHash,"default_proc", rb_hash_default_proc, 0);
  // rb_define_method(rb_cHash,"default_proc=", rb_hash_set_default_proc, 1);
  // rb_define_method(rb_cHash,"key", rb_hash_key, 1);
  // rb_define_method(rb_cHash,"index", rb_hash_index, 1);
  rb_define_method(rb_cHash,"size", rb_hash_size, 0);
  rb_define_method(rb_cHash,"length", rb_hash_size, 0);
  // rb_define_method(rb_cHash,"empty?", rb_hash_empty_p, 0);

  // rb_define_method(rb_cHash,"each_value", rb_hash_each_value, 0);
  // rb_define_method(rb_cHash,"each_key", rb_hash_each_key, 0);
  // rb_define_method(rb_cHash,"each_pair", rb_hash_each_pair, 0);
  // rb_define_method(rb_cHash,"each", rb_hash_each_pair, 0);

  // rb_define_method(rb_cHash,"keys", rb_hash_keys, 0);
  // rb_define_method(rb_cHash,"values", rb_hash_values, 0);
  // rb_define_method(rb_cHash,"values_at", rb_hash_values_at, -1);

  // rb_define_method(rb_cHash,"shift", rb_hash_shift, 0);
  rb_define_method(rb_cHash,"delete", rb_hash_delete, 1);
  // rb_define_method(rb_cHash,"delete_if", rb_hash_delete_if, 0);
  // rb_define_method(rb_cHash,"select", rb_hash_select, 0);
  // rb_define_method(rb_cHash,"reject", rb_hash_reject, 0);
  // rb_define_method(rb_cHash,"reject!", rb_hash_reject_bang, 0);
  // rb_define_method(rb_cHash,"clear", rb_hash_clear, 0);
  // rb_define_method(rb_cHash,"invert", rb_hash_invert, 0);
  // rb_define_method(rb_cHash,"update", rb_hash_update, 1);
  // rb_define_method(rb_cHash,"replace", rb_hash_replace, 1);
  // rb_define_method(rb_cHash,"merge!", rb_hash_update, 1);
  // rb_define_method(rb_cHash,"merge", rb_hash_merge, 1);
  // rb_define_method(rb_cHash, "assoc", rb_hash_assoc, 1);
  // rb_define_method(rb_cHash, "rassoc", rb_hash_rassoc, 1);
  // rb_define_method(rb_cHash, "flatten", rb_hash_flatten, -1);

  rb_define_method(rb_cHash,"include?", rb_hash_has_key, 1);
  rb_define_method(rb_cHash,"member?", rb_hash_has_key, 1);
  rb_define_method(rb_cHash,"has_key?", rb_hash_has_key, 1);
  // rb_define_method(rb_cHash,"has_value?", rb_hash_has_value, 1);
  // rb_define_method(rb_cHash,"key?", rb_hash_has_key, 1);
  // rb_define_method(rb_cHash,"value?", rb_hash_has_value, 1);

  // rb_define_method(rb_cHash,"compare_by_identity", rb_hash_compare_by_id, 0);
  // rb_define_method(rb_cHash,"compare_by_identity?",rb_hash_compare_by_id_p, 0);

  // rb_envtbl = rb_obj_alloc(rb_cObject);
  // rb_extend_object(rb_envtbl, rb_mEnumerable);

  // rb_define_singleton_method(rb_envtbl,"[]", rb_f_getenv, 1);
  // rb_define_singleton_method(rb_envtbl,"fetch", env_fetch, -1);
  // rb_define_singleton_method(rb_envtbl,"[]=", env_aset, 2);
  // rb_define_singleton_method(rb_envtbl,"store", env_aset, 2);
  // rb_define_singleton_method(rb_envtbl,"each", env_each_pair, 0);
  // rb_define_singleton_method(rb_envtbl,"each_pair", env_each_pair, 0);
  // rb_define_singleton_method(rb_envtbl,"each_key", env_each_key, 0);
  // rb_define_singleton_method(rb_envtbl,"each_value", env_each_value, 0);
  // rb_define_singleton_method(rb_envtbl,"delete", env_delete_m, 1);
  // rb_define_singleton_method(rb_envtbl,"delete_if", env_delete_if, 0);
  // rb_define_singleton_method(rb_envtbl,"clear", rb_env_clear, 0);
  // rb_define_singleton_method(rb_envtbl,"reject", env_reject, 0);
  // rb_define_singleton_method(rb_envtbl,"reject!", env_reject_bang, 0);
  // rb_define_singleton_method(rb_envtbl,"select", env_select, 0);
  // rb_define_singleton_method(rb_envtbl,"shift", env_shift, 0);
  // rb_define_singleton_method(rb_envtbl,"invert", env_invert, 0);
  // rb_define_singleton_method(rb_envtbl,"replace", env_replace, 1);
  // rb_define_singleton_method(rb_envtbl,"update", env_update, 1);
  // rb_define_singleton_method(rb_envtbl,"inspect", env_inspect, 0);
  // rb_define_singleton_method(rb_envtbl,"rehash", env_none, 0);
  // rb_define_singleton_method(rb_envtbl,"to_a", env_to_a, 0);
  // rb_define_singleton_method(rb_envtbl,"to_s", env_to_s, 0);
  // rb_define_singleton_method(rb_envtbl,"key", env_key, 1);
  // rb_define_singleton_method(rb_envtbl,"index", env_index, 1);
  // rb_define_singleton_method(rb_envtbl,"size", env_size, 0);
  // rb_define_singleton_method(rb_envtbl,"length", env_size, 0);
  // rb_define_singleton_method(rb_envtbl,"empty?", env_empty_p, 0);
  // rb_define_singleton_method(rb_envtbl,"keys", env_keys, 0);
  // rb_define_singleton_method(rb_envtbl,"values", env_values, 0);
  // rb_define_singleton_method(rb_envtbl,"values_at", env_values_at, -1);
  // rb_define_singleton_method(rb_envtbl,"include?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"member?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"has_key?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"has_value?", env_has_value, 1);
  // rb_define_singleton_method(rb_envtbl,"key?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"value?", env_has_value, 1);
  // rb_define_singleton_method(rb_envtbl,"to_hash", env_to_hash, 0);
  // rb_define_singleton_method(rb_envtbl,"assoc", env_assoc, 1);
  // rb_define_singleton_method(rb_envtbl,"rassoc", env_rassoc, 1);

  // rb_define_global_const("ENV", rb_envtbl);
}
/* 
 * init.js
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
 
/**
  Basically start opal.
*/
function ruby_init() {
  rb_call_inits();
};

/**
  embed script name/type
*/
function ruby_script(name) {
  
};


/**
  Init core.
*/
function rb_call_inits() {
  Init_Object();
  Init_BuiltInConstants();
  Init_top_self();
  Init_Array();
  Init_Comparable();
  Init_Enumerable();
  Init_Number();
  Init_String();
  Init_Exception();
  Init_Hash();
  Init_Range();
  Init_Proc();
  Init_Regexp();
  Init_File();
  Init_Dir();
  Init_Time();
  Init_VM();
  Init_vm_eval();
  Init_load();
  
  Init_Math();
  Init_JSON();
};

function Init_BuiltInConstants() {
  rb_const_set(rb_cObject, "RUBY_VERSION", "1.9.1");
  rb_const_set(rb_cObject, "RUBY_PATCHLEVEL", 191);
  rb_const_set(rb_cObject, "RUBY_PLATFORM", "opal");
  rb_const_set(rb_cObject, "RUBY_RELEASE_DATE", "2010.02.27");
};
/* 
 * json.js
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

// JSON module.
var opal_mJSON;

/**
  JSON.parse(source)
*/
function opal_json_s_parse(cls, source) {
  
};

/*
  Convert raw json object => ruby json object (i.e. hashes and arrays etc)
  If root object is array, maintains array, and checks recursively
*/
function opal_json_2_ruby_json(json) {
  // console.log(json);
  // quick check if root object is an array
  if (json.klass && json.klass === rb_cArray) {
    // console.log("TRUE");
    var ary = [];
    for (var i = 0; i < json.length; i++) {
      if (json[i].constructor === Object) {
        ary.push(opal_json_2_ruby_json(json[i]));
      }
      else {
        ary.push(json[i]);
      }
    }
    return ary;
  }
  
  var result = rb_hash_new();
  
  for (var key in json) {
    if (!json.hasOwnProperty(key)) continue;
    
    var val = json[key];
    if (val === null) {
      val = nil;
    }
    else if (val.constructor === Object) {
      val = opal_json_2_ruby_json(val);
    }
    else if (val.klass === rb_cArray) {
      var ary = [];
      for (var i = 0; i < val.length; i++) {
        if (val[i].constructor === Object) {
          ary.push(opal_json_2_ruby_json(val[i]));
        }
        else {
          ary.push(val[i]);
        }
      }
      val = ary;
    }
    rb_hash_aset(result, key, val);
  }
  return result;
};

/**
  Initialize json.
*/
function Init_JSON() {
  opal_mJSON = rb_define_module("JSON");
  rb_define_singleton_method(opal_mJSON, "parse", opal_json_s_parse, 1);
};

/**
    Modified to create ruby hashes etc in replacement of pure objects ready for
    running on opal.
    
    Original source:
  
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html
*/

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
/* 
 * load.js
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
 
/**
  Array of the loadpaths - i.e. where to look for 'require()' statements
*/
var ruby_loadpath;

/**
  load path initialization
*/
function ruby_init_loadpath() {
  ruby_loadpath = [""];
};

/**
  Add path to the loadpaths array
*/
function ruby_incpush(path) {
  ruby_loadpath.push(path);
};

/**
  Actually do a require with the given filename.
  
  Already checked file exists, and we pass the raw filename which is already in
  the vn_fs_path_hash. This method marks the file as being already required and
  will then exectute the file, by putting it to the top of the vm.
*/
function rb_require_file(file_path) {
  var f = opal_files[file_path];
  if (f.included) {
    // already included
    return;
  }
  else {
    f.included = true;
    f.content(opal_top_self);
    // console.log(f.content);
    // if (window.execScript) {
      // return window.execScript(f.content);
    // }
    // else {
      // with (window) {
        // return eval(f.content);
      // }
    // }
  }
};

/**
  Main entry point for a require statement.
*/
function rb_f_require(obj, id, _, path) {
  path = rb_file_s_expand_path(1, [path], nil);
  // the file this was called from (basically last but one sf)
  // var called_from_file = rb_top_vm.cfs[rb_top_vm.cfs.length - 2].iseq[3];
  var correct_path;
  // console.log("want to require: " + path + '.rb');
  // find the file..
  var found = rb_find_require_path(path);
  if (found === nil) {
    // throw "cannot find require: " + path;
    rb_raise(rb_eLoadError, "no such file to load -- " + path);
  }
  else {
    // console.log(found);
    rb_require_file(found);
    return true;
  }
};

/**
  find a require statement path. Returns the full path, or nil if not found.
*/
function rb_find_require_path(path) {
  var try_path;
  for (var i = 0; i < ruby_loadpath.length; i++) {
    // try base
    try_path = ruby_loadpath[i] + path + '.rb';
    if (opal_files[try_path]) {
      return try_path;
    }
    // try without .rb extension incase we included it in path
    try_path = ruby_loadpath[i] + path;
    if (opal_files[try_path]) {
      return try_path;
    }
  }
  return nil;
};

/**
  load root path - only called from js
*/
function rb_loadpath(path) {
  var found = rb_find_require_path(path);
  if (found === nil) {
    throw "cannot find require: " + path + ", called from " + called_from_file;
  }
  else {
    rb_require_file(found);
    return true;
  }
};

/**
  Load, parse, eval the given text using the filename provided
*/
function rb_eval_raw(str, filename) {
  var parser = vn_parser(filename, str);
  var iseq = parser.parse();
  console.log(iseq);
  rb_iseq_eval(iseq);
};

function Init_load() {
  // require
  rb_define_method(rb_cBasicObject, "require", rb_f_require, 1);
  // rb_define_global_variable("$:", // ruby_loadpath);
};
/* 
 * math.js
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

var rb_mMath;

function rb_math_atan2(m, y, x) {
  return Math.atan2(y, x);
};

function rb_math_cos(m, x) {
  return Math.cos(x);
};

function rb_math_sin(m, x) {
  return Math.sin(x);
};

function rb_math_tan(m, x) {
  return Math.tan(x);
};

function rb_math_acos(m, x) {
  return Math.acos(x);
};

function rb_math_asin(m, x) {
  return Math.asin(x);
};

function rb_math_atan(m, x) {
  return Math.atan(x);
};

function rb_math_exp(m, x) {
  return Math.exp(x);
};

function rb_math_log(m, x) {
  return Math.log(x);
};

function rb_math_sqrt(m, x) {
  return Math.sqrt(x);
};

function Init_Math() {
  rb_mMath = rb_define_module("Math");
  
  rb_const_set(rb_mMath, "PI", Math.PI);
  rb_const_set(rb_mMath, "E", Math.E);
  
  rb_define_singleton_method(rb_mMath, "atan2", rb_math_atan2, 2);
  
  rb_define_singleton_method(rb_mMath, "cos", rb_math_cos, 1);
  rb_define_singleton_method(rb_mMath, "sin", rb_math_sin, 1);
  rb_define_singleton_method(rb_mMath, "tan", rb_math_tan, 1);
  
  rb_define_singleton_method(rb_mMath, "acos", rb_math_acos, 1);
  rb_define_singleton_method(rb_mMath, "asin", rb_math_asin, 1);
  rb_define_singleton_method(rb_mMath, "atan", rb_math_atan, 1);
  
  rb_define_singleton_method(rb_mMath, "exp", rb_math_exp, 1);
  rb_define_singleton_method(rb_mMath, "log", rb_math_log, 1);
  rb_define_singleton_method(rb_mMath, "sqrt", rb_math_sqrt, 1);
};
/* 
 * module.js
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
  // console.log("include into " + klass.iv_tbl.__classid__);
  // console.log(module);
  var c = klass;
  while (module) {
    if (module == rb_cObject) break; // hack, stop on rb_cObject for now
    c = c.sup = rb_include_class_new(module, c);
    module = module.sup;
    // module = false;
  }
  // console.log("sklass.sup is now " + klass.sup.klass);
  return;
  // FIXME: need to check if already included, or its a parent etc etc.
  // console.log ("=== " + klass.iv_tbl.__classid__ + " << " + module.iv_tbl.__classid__);
  // console.log("       org sup:" + klass.sup.iv_tbl.__class_id);
  // console.log("       mod sup: " + module.sup.iv_tbl.__classid__);
  klass.sup = rb_include_class_new(module, klass);
  // console.log("       result sup: " + klass.sup.iv_tbl.__classid__);
  // if (klass != rb_cObject)
  // klass.sup.sup = module.sup;
  // console.log("       result sup sup: " + klass.sup.sup.iv_tbl.__classid__);
  
};


function rb_include_class_new(mod, sup) {
  // console.log("=== starting include - " + sup.iv_tbl.__classid__ + " " + sup.flags);
  // console.log(sup);
  // console.log(" from: " + mod.iv_tbl.__classid__ + " " + mod.flags);
  // console.log(mod);
  var klass = class_alloc(T_ICLASS, rb_cClass);
  // console.log();
  if (mod.flags & T_ICLASS) mod = mod.klass;
  // console.log(mod.flags);
  
  klass.iv_tbl = mod.iv_tbl;
  klass.m_tbl = mod.m_tbl;
  klass.sup = sup.sup;
  klass.klass = mod;
  // console.log('included class ' + klass.iv_tbl.__classid__ + " into " + sup.iv_tbl.__classid__);
  // console.log(sup);
  // console.log("ok");
  // console.log(klass.iv_tbl.__classid__);
  // console.log(klass);
  return klass;
};
/* 
 * number.js
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


var rb_cNumber;

function rb_num_plus(a, b) {
  return a + b;
};

function rb_num_minus(a, b) {
  return a - b;
};

function rb_num_mul(a, b) {
  return a * b;
};

function rb_num_div(a, b) {
  return a / b;
};

function rb_num_modulo(a, b) {
  return a % b;
};

function rb_num_pow(a, b) {
  return Math.pow(a, b);
};

function rb_num_gt(a, id, _, b) {
  return a > b;
};

function rb_num_ge(a, id, _, b) {
  return a >= b;
};

function rb_num_lt(a, id, _, b) {
  return a < b;
};

function rb_num_le(a, id, _, b) {
  return a <= b;
};

function rb_num_to_s(num) {
  return num.toString();
};

function rb_num_inspect(num) {
  return num.toString();
};

function rb_num_dotimes(num) {
  var _ = opal_block; opal_block = nil;
  for (var i = 0; i < num; i++) {
    vm_yield(_, [i]);
  }
  return num;
};

function rb_num_downto(num, to) {
  var _ = opal_block; opal_block = nil;
  for (var i = num; i >= to; i--) {
    vm_yield(_, [i]);
  }
  return num;
};

function rb_num_upto(num, id, _, stop) {
  console.log("from " + num + " to " + stop);
  if (stop < num) return num;
  for (var i = num; i <= stop; i++) {
    vm_yield(_, [i]);
  }
  return num;
};

function rb_num_floor(num) {
  return Math.floor(num);
};

function rb_num_ceil(num) {
  return Math.ceil(num);
};

function rb_num_round(num) {
  return Math.round(num);
};

function rb_num_truncate(num) {
  return Math.round(num);
};

function rb_num_step(num, limit, step) {
  var _ = opal_block; opal_block = nil;
  for (var i = num; i <= limit; i+= step) {
    vm_yield(_, [i]);
  }
  return num;
};

function rb_num_to_i(num) {
  return parseInt(num);
};

function rb_num_to_f(num) {
  return parseFloat(num);
};

function rb_num_rev(num) {
  return ~num;
};

function rb_num_and(num, a) {
  return num & a;
};

function rb_num_or(num, a) {
  return num | a;
};

function rb_num_xor(num, a) {
  return num ^ a;
};

function rb_num_lshift(a, b) {
  return a << b;
};

function rb_num_rshift(a, b) {
  return a >> b;
};

function rb_num_succ(a) {
  return ++a;
};

function rb_num_pred(a) {
  return --a;
};

function rb_num_odd_p(a) {
  if (a % 2 == 0) return false;
  return true;
};

function rb_num_even_p(a) {
  if (a % 2 == 0) return true;
  return false;
};

function rb_num_equal(a, id, _, b) {
  return a === b;
};

function rb_num_eql(a, id, _, b) {
  // console.log("comparing " + a + " to " + b);
  return a === b;
};

function rb_num_zero_p(a) {
  return a === 0;
};

function rb_num_nonzero_p(a) {
  return a !== 0;
};

function rb_num_int_p(a) {
  return a == Math.round(a);
};

function rb_num_real_p(a) {
  return a != Math.round(a);
};

function rb_num_cmp(a, b) {
  if (a < b) return -1;
  if (a === b) return 0;
  return 1;
};

function rb_num_uplus(a) {
  return a;
};

function rb_num_uminus(a) {
  return -a;
};

function Init_Number() {
  
  rb_cNumber = rb_define_class("Number", rb_cObject);
  rb_const_set(rb_cObject, "Fixnum", rb_cNumber);
  rb_const_set(rb_cObject, "Float", rb_cNumber);
  Number.prototype.klass = rb_cNumber;
  Number.prototype.flags = T_NUMBER | T_OBJECT;
  
  // rb_define_method(rb_cNumber, "singleton_method_added", rb_num_sadded, 1);
  rb_include_module(rb_cNumber, rb_mComparable);
  // rb_define_method(rb_cNumber, "initialize_copy", rb_num_init_copy, 1);
  // rb_define_method(rb_cNumber, "coerce", rb_num_coerce, 1);
  
  rb_define_method(rb_cNumber, "+@", rb_num_uplus, 0);
  rb_define_method(rb_cNumber, "-@", rb_num_uminus, 0);
  rb_define_method(rb_cNumber, "eql?", rb_num_eql, 1);
  // rb_define_method(rb_cNumber, "quo", rb_num_quo, 1);
  // rb_define_method(rb_cNumber, "fdiv", rb_num_fdiv, 1);
  // rb_define_method(rb_cNumber, "div", rb_num_div, 1);
  // rb_define_method(rb_cNumber, "divmod", rb_num_divmod, 1);
  // rb_define_method(rb_cNumber, "modulo", rb_num_modulo, 1);
  // rb_define_method(rb_cNumber, "remainder", rb_num_remainder, 1);
  // rb_define_method(rb_cNumber, "abs", rb_num_abs, 0);
  // rb_define_method(rb_cNumber, "magnitude", rb_num_abs, 0);
  rb_define_method(rb_cNumber, "to_int", rb_num_to_i, 0);

  rb_define_method(rb_cNumber, "real?", rb_num_real_p, 0);
  rb_define_method(rb_cNumber, "integer?", rb_num_int_p, 0);
  rb_define_method(rb_cNumber, "zero?", rb_num_zero_p, 0);
  rb_define_method(rb_cNumber, "nonzero?", rb_num_nonzero_p, 0);

  rb_define_method(rb_cNumber, "floor", rb_num_floor, 0);
  rb_define_method(rb_cNumber, "ceil", rb_num_ceil, 0);
  rb_define_method(rb_cNumber, "round", rb_num_round, -1);
  rb_define_method(rb_cNumber, "truncate", rb_num_truncate, 0);
  rb_define_method(rb_cNumber, "step", rb_num_step, -1);

  rb_define_method(rb_cNumber, "odd?", rb_num_odd_p, 0);
  rb_define_method(rb_cNumber, "even?", rb_num_even_p, 0);
  rb_define_method(rb_cNumber, "upto", rb_num_upto, 1);
  rb_define_method(rb_cNumber, "downto", rb_num_downto, 1);
  rb_define_method(rb_cNumber, "times", rb_num_dotimes, 0);
  rb_define_method(rb_cNumber, "succ", rb_num_succ, 0);
  rb_define_method(rb_cNumber, "next", rb_num_succ, 0);
  rb_define_method(rb_cNumber, "pred", rb_num_pred, 0);
  // rb_define_method(rb_cNumber, "chr", rb_num_chr, -1);
  // rb_define_method(rb_cNumber, "ord", rb_num_ord, 0);
  rb_define_method(rb_cNumber, "to_i", rb_num_to_i, 0);
  rb_define_method(rb_cNumber, "to_s", rb_num_to_s, -1);
  rb_define_method(rb_cNumber, "inspect", rb_num_inspect, 0);
  rb_define_method(rb_cNumber, "to_f", rb_num_to_f, 0);

  rb_define_method(rb_cNumber, "+", rb_num_plus, 1);
  rb_define_method(rb_cNumber, "-", rb_num_minus, 1);
  rb_define_method(rb_cNumber, "*", rb_num_mul, 1);
  rb_define_method(rb_cNumber, "/", rb_num_div, 1);
  rb_define_method(rb_cNumber, "%", rb_num_modulo, 1);
  rb_define_method(rb_cNumber, "**", rb_num_pow, 1);

  rb_define_method(rb_cNumber, "==", rb_num_equal, 1);
  rb_define_method(rb_cNumber, "<=>", rb_num_cmp, 1);
  rb_define_method(rb_cNumber, ">", rb_num_gt, 1);
  rb_define_method(rb_cNumber, ">=", rb_num_ge, 1);
  rb_define_method(rb_cNumber, "<", rb_num_lt, 1);
  rb_define_method(rb_cNumber, "<=", rb_num_le, 1);

  rb_define_method(rb_cNumber, "~", rb_num_rev, 0);
  rb_define_method(rb_cNumber, "&", rb_num_and, 1);
  rb_define_method(rb_cNumber, "|", rb_num_or,  1);
  rb_define_method(rb_cNumber, "^", rb_num_xor, 1);
  // rb_define_method(rb_cNumber, "[]", rb_num_aref, 1);

  rb_define_method(rb_cNumber, "<<", rb_num_lshift, 1);
  rb_define_method(rb_cNumber, ">>", rb_num_rshift, 1);
};
/* 
 * object.js
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

 
/**
  Core objects
*/

var rb_cBasicObject, rb_cObject, rb_cModule, rb_cClass;
var rb_cNilClass, rb_cBoolean;

function rb_obj_alloc(klass, id, _) {
  return rb_class_allocate_instance(klass);
};

function rb_class_allocate_instance(klass, id, _) {
  var o = new RObject();
  o.klass = klass;
  FL_SET(o, T_OBJECT);
  return o;
};

function rb_obj_dummy() {
  return nil;
};

function rb_obj_equal($, id, _, obj) {
  if ($ == obj) return true;
  return false;
};

function rb_obj_not($, id, _) {
  return RTEST($) ? false : true;
};

function rb_obj_not_equal($, id, _, obj) {
  return RTEST(rb_funcall($, "==", obj)) ? false : true;
};

function rb_false() {
  return false;
};

function rb_true() {
  return true;
};

function rb_equal($, id, _, obj) {
  var r;
  if ($ == obj) return true;
  r = rb_funcall($, "==", obj);
  if (RTEST(r)) return true;
  return false;
};

function rb_obj_match() {
  return nil;
};

function rb_obj_not_match($, id, _, obj) {
  var r = rb_funcall($, "=~", obj);
  return RTEST(r) ? false : true;
};

function rb_class_real(klass) {
  if (!klass) return nil;
  while (FL_TEST(klass, FL_SINGLETON) || FL_TEST(klass, T_ICLASS)) {
    klass = klass.sup;
  }
  return klass;
};

function rb_obj_class(self) {
  return rb_class_real(self.klass);
};

function rb_obj_clone(self) {
  return self;
};

function rb_obj_dup(self) {
  return self;
};

function rb_obj_init_copy(self) {
  return self;
};

function rb_any_to_s(self, id, _) {
 var c = rb_obj_classname(self);
 if (self.flags & T_OBJECT) {
   return "#<" + c + ":" + self.hash + ">";
 }
 else {
   return c;
 }
 // return (self.flags & T_OBJECT ? "" : "#<") + c + ":" + self.hash + ">";
};

function rb_obj_classname(obj, id, _) {
  var klass;
  if (obj.flags & T_OBJECT) 
    klass = rb_class_real(obj.klass);
  else
    klass = obj;
  // console.log(klass);
  return klass.iv_tbl.__classid__;
};

function rb_obj_inspect(self, id, _) {
  return rb_any_to_s(self);
};

function rb_class_new_instance(klass, id, _) {
  var o = rb_obj_alloc(klass);
  var argv = Array.prototype.slice.call(arguments, 3);
  rb_funcall3(o, "initialize", _, argv);
  // console.log("after initialize" + argv);
  return o;
};

function rb_f_puts(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3)
  for (var i = 0; i < argv.length; i++) {
    console.log(vm_send(argv[i], "inspect", [], nil, 8));
  }
};

function rb_mod_attr_reader(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3);
  for (var i = 0; i < argv.length; i++) {
    var s = argv[i].ptr;
    var f = new Function('r','id','_','return rb_ivar_get(r, "@' + s + '");');
    rb_define_method(recv, s, f, 0);
  }
  return nil;
};

function rb_mod_attr_writer(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3);
  for (var i = 0; i < argv.length; i++) {
    var s = argv[i].ptr;
    var f = new Function('r','id','_','v','return rb_ivar_set(r, "@'+s+'", v);');
    rb_define_method(recv, s + '=', f, 1);
  }
  return nil;  
};

function rb_mod_attr_accessor(recv, id, _) {
  rb_mod_attr_reader.apply(recv, arguments);
  rb_mod_attr_writer.apply(recv, arguments);
  return nil;
};

function rb_mod_const_set(mod, id, _, name, val) {
  // FIXME: should really check that id is valid... i.e. does it start with an
  // uppercase letter.
  rb_const_set(mod, name, val);
  return val;
};

function rb_obj_respond_to(obj, id, _, sym) {
  var f = rb_search_method(obj.klass, sym.ptr);
  if (f) return true;
  return false;
};

function rb_obj_is_instance_of(obj, id, _, c) {
  if (rb_class_real(obj.klass) == c) {
    return true;
  }
  return false;
};

function rb_obj_is_kind_of(obj, id, _, c) {
  var k = obj.klass;
  while (k) {
    
    if (k == c) return true;
    k = k.sup;
  }
  return false;
};

function rb_obj_tap(obj, id, _) {
  vm_yield(_, [obj]);
  return obj;
};

function rb_nil_to_s() {
  return "";
};

function rb_nil_inspect() {
  return "nil";
};

function rb_nil_and(n, id, _, obj) {
  return false;
};

function rb_nil_or(n, id, _, obj) {
  if (obj === nil || obj === false) return false;
  return true;
};

function rb_nil_xor(n, id, _, obj) {
  if (obj === nil || obj === false) return false;
  return true;
};

function rb_nil_to_a() {
  return [];
};

function rb_nil_to_f() {
  return 0.0;
};

function rb_nil_to_i() {
  return 0;
};

/**
  ensure nil matches null and undefined as well as itself
*/
function rb_nil_eql(self, id, _, other) {
  return (other === nil || other === null || other === undefined);
};

/**
  Object#instance_eval(&block)
  
  Currently, only takes blocks as params. Strings will be added once eval.js is
  finished. Throws error if string given (for now)
*/
function rb_obj_instance_eval(obj, id, _, str) {
  if (str) {
    return rb_vm_eval_str(obj, str);
  }
  if (_ == nil) throw "no block given for instance_eval."
  return _.call(_, obj, nil, nil, obj);
};

function rb_obj_mod_eval(obj, id, _) {
  if (_ == nil) throw "no block given for module_eval."
  return _.call(_, obj);
};

function rb_obj_instance_exec(obj, id, _) {
  // console.log("well, here first");
  if (_ == nil) throw "no block given for instance_exec"
  var args = Array.prototype.slice.call(arguments, 3);
  args.unshift(nil);
  args.unshift(nil);
  // recv
  args.unshift(obj); 
  // console.log("this bit in exec");
  return _.apply(_, args);
};

function rb_bool_to_s(bool) {
  return bool ? "true" : "false";
};

function rb_bool_and(bool, id, _, other) {
  return bool ? RTEST(other) : false;
};

function rb_bool_or(bool, id, _, other) {
  return bool ? true : RTEST(other);
};

function rb_bool_xor(bool, id, _, other) {
  return bool ? !RTEST(other) : RTEST(other);
};


function rb_nil_nil_q() {
  return true;
};

function rb_mod_include(cls, id, _, mod) {
  return rb_include_module(cls, mod);
};

function rb_mod_extend(cls, id, _, mod) {
  // possibly fix back to (cls.klass, mod)
  return rb_include_module(rb_singleton_class(cls), mod);
};

function rb_obj_send(recv, id, _, mid) {
  var args = Array.prototype.slice.call(arguments, 4);
  return vm_send(recv, mid, args, nil, 8);
};

function rb_class_initialize(cls, id, _) {
  var sup = (arguments.length > 3) ? arguments[3] : rb_cObject;
  // console.log("initializing from");
  // console.log(sup);
  // console.log("setting class to " + sup.iv_tbl.__classid__);
  // cls.klass = sup.klass;
  cls.m_tbl = {};
  cls.sup = sup;
  // console.log(sup);
  rb_make_metaclass(cls, sup.klass);
  rb_class_inherited(sup, cls);
  
  
  // console.log("new class");
  // console.log(cls);
  // console.log("done");
  return cls;
};

function rb_mod_alias_method(cls, id, _, new_name, old_name) {
  return rb_define_alias(cls, new_name.ptr, old_name.ptr);
};

/*
  raise
  =====
  Simply throws an error
  
  raise(string)
  =============
  simply throws an error with string as message. uses rb_eRuntimeError
  
  raise(exception, [string])
  ==========================
  throws error with the given exception as the exception class
*/
function rb_f_raise($, id, _) {
  // console.log("raising " + arguments[3]);
  var exc, msg = "";
  if (arguments.length > 3) {
    if (arguments[3].klass == rb_cString) {
      msg = arguments[3];
      // console.log("route a");
      exc = vm_send(rb_eRuntimeError, "new", [msg], nil, 0);
    }
    else if (arguments[3].flags & T_OBJECT) {
      // console.log("route b");
      exc = arguments[3];
    }
    else {
      if (arguments[4] && arguments[4].klass == rb_cString) {
        msg = arguments[2];
      }
      // console.log("route c");
      exc = vm_send(arguments[3], "new", [msg], nil, 0);
    }
  }
  else {
    throw "rb_f_raise needs atleast 3 args!!"
  }
  // exc.toString = function() {
    // return "an error string causing problems";
    // console.log(this);
    // return this.klass.iv_tbl.__classid__ + ": " + this.iv_tbl.message;
  // };
  // console.log("about to throw exc " + arguments[3]);
  // console.log(exc);
  throw exc
};

function rb_mod_ancestors(cls) {
  var a = [], k = cls;
  while (k) {
    a.push(k);
    k = k.sup;
  }
  return a;
};

function rb_mod_eqq(mod, id, _, arg) {
  // console.log("matching #=== " + mod);
  // console.log(mod);
  // console.log(" arg: " + arg);
  // console.log(arg);
  return rb_obj_is_kind_of(arg, "", nil, mod);
};

function rb_obj_object_id(obj) {
  if (obj.hash != undefined) return obj.hash;
  var hash = opal_yield_hash();
  obj.hash = hash;
  return hash;
};

function rb_mod_to_s(mod) {
  return mod.iv_tbl.__classid__;
};

function rb_class_superclass(klass) {
  return klass.sup;
};

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
  
  rb_define_method(rb_mKernel, "raise", rb_f_raise, -1);
  rb_define_method(rb_mKernel, "fail", rb_f_raise, -1);

  // rb_define_method(rb_mKernel, "taint", rb_obj_taint, 0);
  // rb_define_method(rb_mKernel, "tainted?", rb_obj_tainted, 0);
  // rb_define_method(rb_mKernel, "untaint", rb_obj_untaint, 0);
  // rb_define_method(rb_mKernel, "untrust", rb_obj_untrust, 0);
  // rb_define_method(rb_mKernel, "untrusted?", rb_obj_untrusted, 0);
  // rb_define_method(rb_mKernel, "trust", rb_obj_trust, 0);
  // rb_define_method(rb_mKernel, "freeze", rb_obj_freeze, 0);
  // rb_define_method(rb_mKernel, "frozen?", rb_obj_frozen_p, 0);
  
  rb_define_method(rb_mKernel, "object_id", rb_obj_object_id, 0);
  
  rb_define_method(rb_mKernel, "module_eval", rb_obj_mod_eval, 0);
  rb_define_method(rb_cModule, "module_eval", rb_obj_mod_eval, 0);
  rb_define_method(rb_mKernel, "instance_eval", rb_obj_instance_eval, 0);
  rb_define_method(rb_mKernel, "instance_exec", rb_obj_instance_exec, 0);
  rb_define_method(rb_mKernel, "send", rb_obj_send, -1);
  rb_define_method(rb_mKernel, "__send__", rb_obj_send, -1);
  
  rb_define_method(rb_mKernel, "respond_to?", rb_obj_respond_to, -1);
  
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
  rb_define_method(rb_mKernel, "instance_of?", rb_obj_is_instance_of, 1);
  rb_define_method(rb_mKernel, "kind_of?", rb_obj_is_kind_of, 1);
  rb_define_method(rb_mKernel, "is_a?", rb_obj_is_kind_of, 1);
  rb_define_method(rb_mKernel, "tap", rb_obj_tap, 0);
  // 
  // rb_define_global_function("sprintf", rb_f_sprintf, -1);
  // rb_define_global_function("format", rb_f_sprintf, -1);
  // 
  // rb_define_global_function("Integer", rb_f_integer, 1);
  // rb_define_global_function("Float", rb_f_float, 1);
  // 
  // rb_define_global_function("String", rb_f_string, 1);
  // rb_define_global_function("Array", rb_f_array, 1);
   
  rb_cNilClass = rb_define_class("NilClass", rb_cObject);
  rb_define_method(rb_cNilClass, "to_i", rb_nil_to_i, 0);
  rb_define_method(rb_cNilClass, "to_f", rb_nil_to_f, 0);
  rb_define_method(rb_cNilClass, "to_s", rb_nil_to_s, 0);
  rb_define_method(rb_cNilClass, "to_a", rb_nil_to_a, 0);
  rb_define_method(rb_cNilClass, "inspect", rb_nil_inspect, 0);
  rb_define_method(rb_cNilClass, "&", rb_nil_and, 1);
  rb_define_method(rb_cNilClass, "|", rb_nil_or, 1);
  rb_define_method(rb_cNilClass, "^", rb_nil_xor, 1);
  rb_define_method(rb_cNilClass, "nil?", rb_nil_nil_q, 0);
  rb_define_method(rb_cNilClass, "==", rb_nil_eql, 0);
  nil = { flags: T_OBJECT, klass: rb_cNilClass };
  // 
  // 
  // 
  // rb_define_method(rb_cModule, "freeze", rb_mod_freeze, 0);
  rb_define_method(rb_cModule, "===", rb_mod_eqq, 1);
  // rb_define_method(rb_cModule, "==", rb_obj_equal, 1);
  // rb_define_method(rb_cModule, "<=>",  rb_mod_cmp, 1);
  // rb_define_method(rb_cModule, "<",  rb_mod_lt, 1);
  // rb_define_method(rb_cModule, "<=", rb_class_inherited_p, 1);
  // rb_define_method(rb_cModule, ">",  rb_mod_gt, 1);
  // rb_define_method(rb_cModule, ">=", rb_mod_ge, 1);
  // rb_define_method(rb_cModule, "initialize_copy", rb_mod_init_copy, 1);
  rb_define_method(rb_cModule, "to_s", rb_mod_to_s, 0);
  // rb_define_method(rb_cModule, "included_modules", rb_mod_included_modules, 0);
  rb_define_method(rb_cModule, "extend", rb_mod_extend, 1);
  rb_define_method(rb_cModule, "include", rb_mod_include, 1);
  // rb_define_method(rb_cModule, "include?", rb_mod_include_p, 1);
  // rb_define_method(rb_cModule, "name", rb_mod_name, 0);
  rb_define_method(rb_cModule, "ancestors", rb_mod_ancestors, 0);
  // 
  // rb_define_private_method(rb_cModule, "attr", rb_mod_attr, -1);
  rb_define_private_method(rb_cModule, "attr_reader", rb_mod_attr_reader, -1);
  rb_define_private_method(rb_cModule, "attr_writer", rb_mod_attr_writer, -1);
  rb_define_private_method(rb_cModule, "attr_accessor", rb_mod_attr_accessor, -1);
  // 
  // rb_define_alloc_func(rb_cModule, rb_module_s_alloc);
  // rb_define_method(rb_cModule, "initialize", rb_mod_initialize, 0);
  // rb_define_method(rb_cModule, "instance_methods", rb_class_instance_methods, -1);
  // rb_define_method(rb_cModule, "public_instance_methods", rb_class_public_instance_methods, -1);
  // rb_define_method(rb_cModule, "protected_instance_methods", rb_class_protected_instance_methods, -1);
  // rb_define_method(rb_cModule, "private_instance_methods", rb_class_private_instance_methods, -1);
  // 
  
  rb_define_method(rb_cModule, "alias_method", rb_mod_alias_method, 2);
  // rb_define_method(rb_cModule, "constants", rb_mod_constants, -1);
  // rb_define_method(rb_cModule, "const_get", rb_mod_const_get, -1);
  rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
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
  rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);
  // rb_define_method(rb_cClass, "initialize_copy", rb_class_init_copy, 1);
  rb_define_method(rb_cClass, "superclass", rb_class_superclass, 0);
  // rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
  // rb_undef_method(rb_cClass, "extend_object");
  // rb_undef_method(rb_cClass, "append_features");
  // 
  rb_cBoolean = rb_define_class("Boolean", rb_cObject);
  Boolean.prototype.klass = rb_cBoolean;
  Boolean.prototype.flags = T_OBJECT | T_BOOLEAN;
  rb_define_method(rb_cBoolean, "to_s", rb_bool_to_s, 0);
  rb_define_method(rb_cBoolean, "inspect", rb_bool_to_s, 0);
  rb_define_method(rb_cBoolean, "&", rb_bool_and, 1);
  rb_define_method(rb_cBoolean, "|", rb_bool_or, 1);
  rb_define_method(rb_cBoolean, "^", rb_bool_xor, 1);

}/* 
 * opal.js
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

var opal_hash_yield = 0;

function opal_yield_hash() {
  return opal_hash_yield++
};
 
// temp..
var nil;

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
  // console.log("val is:" + val);
  return (val !== null && val !== undefined && val !== nil && val !== false) ? true : false;
};

/**
  ORTEST: both lhs and rhs are functions. eval lhs, if ruby false, then return
  result of evaling rhs
*/
ORTEST = function(lhs, rhs) {
  var res = lhs();
  if (RTEST(res)) return res;
  return rhs();
};

/**
  ANDTEST
*/
ANDTEST = function(lhs, rhs) {
  var res = lhs();
  if (RTEST(res)) return rhs();
  return res;
};

function NOTTEST(expr) {
  if (expr == null || expr == undefined || expr == nil || expr == false) return true;
  return false;
};

/**
  Fix for browsers not having console
*/
// if (typeof console === 'undefined') {
//  var console = console || window.console || { };
//  console.log = console.info = console.warn = console.error = function() { };
// }

function RObject(klass, type) {
  this.hash = opal_yield_hash();
  this.toString = function() { return "#<" + this.klass.iv_tbl.__classid__ + ":" + this.hash + ">"; };
  this.klass = klass;
  this.flags = type;
  this.iv_tbl = { };
  return this;
};

function RClass(klass, super_klass) {
  this.hash = opal_yield_hash();
  this.toString = function() { return this.iv_tbl.__classid__; };
  this.klass = klass ;
  this.sup = super_klass ;
  this.flags = T_CLASS ;
  this.m_tbl = { };
  this.iv_tbl = { };
  return this;
};

function RHash() {
  this.hash = opal_yield_hash();
  this.toString = function () { return "#<Hash:" + this.hash + ">" ;};
  this.klass = nil;
  this.flags = T_OBJECT | T_HASH;
  this.ifnone = nil;
  // ordered keys
  this.keys = [];
  // keys.to_s => values
  this.dict = { };
  return this;
};

function rb_method_t() {
  this.argc = 0;
  this.body = nil;
  // this.noex = 0;
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

function rb_define_hooked_variable(id, ptr) {
  return rb_gvar_set(id, ptr);
};

function rb_gvar_get(id) {
  // return rb_global_tbl[id];
  if (id == "$:") return ruby_loadpath;
  return nil;
};

function rb_gvar_set(id, val) {
  return rb_global_tbl[id] = val;
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
 * parse.js
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


    // lex states
var EXPR_BEG    = 0,    EXPR_END    = 1,    EXPR_ENDARG = 2,    EXPR_ARG   = 3,
    EXPR_CMDARG = 4,    EXPR_MID    = 5,    EXPR_FNAME  = 6,    EXPR_DOT   = 7,
    EXPR_CLASS  = 8,    EXPR_VALUE  = 9;

    // keywords
var kCLASS      = 0,    kMODULE     = 1,    kDEF        = 2,    kUNDEF     = 3,
    kBEGIN      = 4,    kRESCUE     = 5,    kENSURE     = 6,    kEND       = 7,
    kIF         = 8,    kUNLESS     = 9,    kTHEN       = 10,   kELSIF     = 11,
    kELSE       = 12,   kCASE       = 13,   kWHEN       = 14,   kWHILE     = 15,
    kUNTIL      = 16,   kFOR        = 17,   kBREAK      = 18,   kNEXT      = 19,
    kREDO       = 20,   kELSIF      = 21,   kELSE       = 22,   kCASE      = 23, 
    kWHEN       = 24,   kWHILE      = 25,   kUNTIL      = 26,   kFOR       = 27,
    kBREAK      = 28,   kNEXT       = 29,   kREDO       = 30,   kRETRY     = 31,
    kIN         = 32,   kDO_COND    = 33,   kDO_BLOCK   = 34,   kDO_LAMBDA = 35,
    kRETURN     = 36,   kYIELD      = 37,   kSUPER      = 38,   kSELF      = 39,
    kNIL        = 40,   kTRUE       = 41,   kFALSE      = 42,   kAND       = 43,
    kOR         = 44,   kNOT        = 45,   kIF_MOD     = 46,   kUNLESS_MOD= 47,
    kWHILE_MOD  = 48,   kUNTIL_MOD  = 49,   kRESCUE_MOD = 50,   kALIAS     = 51,
    kDEFINED    = 52,   klBEGIN     = 53,   klEND       = 54,   k__LINE__  = 55,
    k__FILE__   = 56,   kDO         = 57,   kDEFined    = 58,
    // tokens
    tIDENTIFIER = 59,   tFID        = 60,   tGVAR       = 61,   tIVAR      = 62,
    tCONSTANT   = 63,   tCVAR       = 64,   tLABEL      = 65,   tINTEGER   = 66,
    tFLOAT      = 67,   tSTR_CONTENT= 68,   tCHAR       = 69,   tNTH_REF   = 70,
    tBACK_REF   = 71,   tREGEXP_END = 72,   tUPLUS      = 73,   tUMINUS    = 74,
    tPOW        = 75,   tCMP        = 76,   tEQ         = 77,   tEQQ       = 78, 
    tNEQ        = 79,   tGEQ        = 80,   tLEQ        = 81,   tANDOP     = 82,
    tOROP       = 83,   tMATCH      = 84,   tNMATCH	    = 85,   tDOT2      = 86, 
    tDOT3       = 87,   tAREF       = 88,   tASET       = 89,   tLSHFT     = 90, 
    tRSHFT      = 91,   tCOLON2     = 92,   tCOLON3     = 93,   tOP_ASGN   = 94, 
    tASSOC      = 95,   tLPAREN	    = 96,   tLPAREN_ARG	= 97,   tRPAREN    = 98,  
    tLBRACK     = 99,   tLBRACE     = 100,  tLBRACE_ARG = 101, tSTAR      = 102,
    tAMPER      = 103,  tLAMBDA     = 104,  tSYMBEG     = 105, tSTRING_BEG= 106,
    tXSTRING_BEG= 107,  tREGEXP_BEG = 108,  tWORDS_BEG  = 109, tQWORDS_BEG= 110,
    tSTRING_DBEG= 111,  tSTRING_DVAR= 112,  tSTRING_END = 113, tLAMBEG    = 114,
    tUMINUS_NUM = 115,  tSTRING     = 116,  tXSTRING_END= 117,
        
    tPLUS       = 118,  tMINUS      = 119,  tNL         = 120, tSEMI      = 121;

    // special tokens (used for generator)
var tCALL       = 150,  tMLHS       = 151,  tOPT_PLUS   = 152, tOPT_MINUS = 153,
    tOPT_MULT   = 154,  tOPT_DIV    = 155;
    
/*
  ISeq types
*/
var ISEQ_TYPE_TOP = 1,
    ISEQ_TYPE_METHOD = 2,
    ISEQ_TYPE_BLOCK = 3,
    ISEQ_TYPE_CLASS = 4,
    ISEQ_TYPE_RESCUE = 5,
    ISEQ_TYPE_ENSURE = 6,
    ISEQ_TYPE_EVAL = 7,
    ISEQ_TYPE_MAIN = 8;

/**
  Parse the given ruby code, str, with the given filename. This allows us to
  dynamically set the filename, for example, with eval()'d code. This returns
  an Instruction sequence, with all of its sub sequences, opcodes etc.
*/
var vn_parser = function(filename, str) {
  // current line number
  var line_number = 1;
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
  var valid_cmd_args = [tIDENTIFIER, tINTEGER, tCONSTANT, tSTRING_BEG, kDO, '{', tSYMBEG, tIVAR];
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
    // console.log(this.value + " " + token.value);
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
    this.$meth = token.value;
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
  // t is optinal type (instead of tCALL)
  // used for a + a, a - a,  a << a etc. (as m)
  function meth_call(m, b, t) {
    return infix(m, b, function(left) {
      this.type = t || tCALL;
      this.$recv = left;
      this.$meth = this;
      this.$call_args = {
        args: [stmt()]
      }
      return this;
    });
  }
  
  meth_call(tPLUS, 80, tOPT_PLUS);
  meth_call(tMINUS, 80, tOPT_MINUS);
  meth_call("*", 80, tOPT_MULT);
  meth_call("/", 80, tOPT_DIV);
  
    
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
      else if (left.type === tIDENTIFIER || left.type === tCONSTANT) {
        // identifier/constant - turn them into a method call, with args
        // as the args (and no receiver!)
        // will identifier already be a method call? unless an actual identifier
        left.type = tCALL;
        left.$meth = left.value;
        // console.log(left.value + " " + left.type);
        left.$call_args = args;
      }
      else if (left.type === tCALL) {
        // left.type = tCALL;
        // left.$meth = left.value;
        // console.log(left.value + " " + left.type);
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
        var t = expr();
        // check for valid key?
        // next_token();
        // should this be a => ?? probbaly...
        next_token();
        this.$keys.push(t);
        // console.log(token);
        this.$values.push(expr());
        if (token.type == '}') {
          // console.log(token.value);
          break;
        }
        else if (token.type == tNL || token.type == tSEMI) {
          next_token();
          break;
        }
        next_token(',');
      }
    }
    next_token('}');
    // console.log("finished");
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
        
        // \n and #\n both mean we read one line, so..
        line_number++;
        
        // we can skip any more blank lines..(combine them into one..)
        scanner.scan(/^(\n+)/);
        line_number += scanner.matched.length;
        
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
  
  var iseq_current = null;
  var iseq_stack = [];
  
  function iseq_stack_push(type) {
    iseq_current = new Iseq(type);
    iseq_stack.push(iseq_current);
    return iseq_current;
  };
  
  function iseq_stack_pop() {
    var iseq = iseq_current;
    iseq_stack.pop();
    iseq_current = iseq_stack[iseq_stack.length - 1];
    iseq.finalize();
    return iseq.toString();
  };
  
  function write(opcode) {
    iseq_current.write(opcode);
  };
  
  function write_label(label) {
    iseq_current.write_label(label);
  };
  
  function generate_tree(tree) {
    var top_iseq = iseq_stack_push(ISEQ_TYPE_TOP);
    for (var i = 0; i < tree.length; i++) {
      generate_stmt(tree[i], {full_stmt:true, last_stmt:false});
    }
    return iseq_stack_pop();
  };
  
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
      case tIVAR:
        generate_ivar(stmt, context);
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
      case tLBRACE:
        generate_assoc_list(stmt, context);
        break;
      case tLBRACK:
        generate_array(stmt, context);
        break;
      default:
        console.log("unknown generate_stmt type: " + stmt.type + ", " + stmt.value);
    }
  };
  
  function generate_ivar(stmt, context) {
    if (context.full_stmt && context.last_stmt) write("return ");
    write('vm_ivarget($,"' + stmt.value + '")');
    if (context.full_stmt) write(";");
  };
  
  function generate_assoc_list(list, context) {
    for (var i = 0; i < list.$keys.length; i++) {
      generate_stmt(list.$keys[i], {});
      generate_stmt(list.$values[i], {});
    }
    write([iNEWHASH, list.$keys.length * 2]);
  };
  
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
    write([iPUTSTRING, stmt.$parts[0].value]);
  }
  
  function generate_integer(stmt, context) {
    if(context.last_stmt && context.full_stmt) write("return ");
    write(stmt.value);
    if (context.full_stmt) write(";");
  }
  
  function generate_constant(stmt, context) {
    write([iPUTNIL]);
    write([iGETCONSTANT, stmt.value]);
    // iseq_opcode_push([iPUTNIL]);
    // iseq_opcode_push([iGETCONSTANT, stmt.value]);
    // write("vm_getconstant(nil,'" + stmt.value + "')");
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
    write([iPUTSYMBOL, sym.$name.value]);
    
    if (context.full_stmt) {
      if (context.last_stmt) {
        write([iLEAVE]);
      }
      else {
        write([iPOP]);
      }
    }
  };
  
  function generate_call(call, context) {
    var call_bit;
    if (context.last_stmt && context.full_stmt) write("return ");
    write("vm_send(");
    
    // receiver
    if (call.$recv) {
      call_bit = 0;
      generate_stmt(call.$recv, {full_stmt:false, last_stmt:false});
    }
    else {
      call_bit = 8;
      write("$");
    }
    
    // method id
    write(',"' + call.$meth + '",');
    
    // normal args
    write("[")
    if (call.$call_args && call.$call_args.args) {
      var args = call.$call_args.args;
      for (var i = 0; i < args.length; i++) {
        generate_stmt(args[i], {});
      }
    }
    
    write("],nil,");
    write(call_bit);
    write(")");
    
    if (context.full_stmt) write(";");
    return;
    
    
    
    
    var block_iseq, call_bit, arg_length;
    // if we have a block, do that first.
    if (false) {
      // # if we have a block, do the block first
      // if call[:brace_block]
      //   current_iseq = @iseq_current
      //   block_iseq = iseq_stack_push(ISEQ_TYPE_BLOCK)
      //   # for dynamics..
      //   block_iseq.parent_iseq = current_iseq
      //   
      //   # block arg names
      //   if call[:brace_block][:params]
      //     call[:brace_block][:params].each do |p|
      //       @iseq_current.push_local(p[:value])
      //     end
      //   end
      //   
      //   # block stmts
      //   if call[:brace_block][:stmt]
      //     call[:brace_block][:stmt].each do |a|
      //       generate_stmt a, :full_stmt => true, :last_stmt => call[:brace_block][:stmt].last == a
      //     end
      //   end
      //   
      //   iseq_stack_pop      
    }
    else {
      block_iseq = nil;
    }
    
    // receiver
    if (call.$recv) {
      call_bit = 0;
      generate_stmt(call.$recv, { full_stmt: false, last_stmt: false });
    }
    else {
      call_bit = 8;
      write([iPUTNIL]);
    }
    
    // arguments
    if (call.$call_args && call.$call_args.args) {
      arg_length = call.$call_args.args.length;
      var args = call.$call_args.args;
      for (var i = 0; i < args.length; i++) {
        generate_stmt(args[i], {});
      }
    }
    else {
      arg_length = 0;
    }
    
    // assocs
    
    // call
    write([iSEND, call.$meth, arg_length, block_iseq, call_bit, nil]);
    
    // write %{[#{ISEND},"#{call[:meth]}",#{arg_length},#{block_iseq},#{call_bit},nil]}
    
    // # receiver
    // if call[:recv]
    //   # bits
    //   call_bit = 0
    //   generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
    // else
    //   call_bit = 8
    //   write %{[#{IPUTNIL}]}
    // end
    // 
    // # arguments
    // unless call[:call_args].nil? or call[:call_args][:args].nil?
    //   arg_length = call[:call_args][:args].length
    //   call[:call_args][:args].each do |arg|
    //     generate_stmt arg, :full_stmt => false
    //   end
    // else
    //   arg_length = 0
    // end
    // 
    // # assocs
    // if call[:call_args] and call[:call_args][:assocs]
    //   arg_length = arg_length.succ
    //   call[:call_args][:assocs].each do |assoc|
    //     generate_stmt assoc[:key], :full_stmt => false, :last_stmt => false
    //     generate_stmt assoc[:value], :full_stmt => false, :last_stmt => false
    //   end
    //   write %{[#{INEWHASH},#{call[:call_args][:assocs].length * 2}]}
    // end
    // 
    // # call
    // write %{[#{ISEND},"#{call[:meth]}",#{arg_length},#{block_iseq},#{call_bit},nil]}
    // 
    // unless @iseq_current.type == ISEQ_TYPE_BLOCK
    //   if context[:full_stmt] and not context[:last_stmt]
    //     write "[#{IPOP}]"
    //   elsif context[:full_stmt] and context[:last_stmt]
    //     write %{[#{ILEAVE}]}
    //   end      
    // end
  };
  
  function generate_def(definition, context) {
    var is_singleton = definition.$sname ? 1 : 0;
    
    var current_iseq = iseq_current;
    var def_iseq = iseq_stack_push(ISEQ_TYPE_METHOD, definition.$fname.value);
    
    // dynamics..
    // def_iseq.parent_iseq = current_iseq;
    
    // arg names
    
    // body
    for (var i = 0; i < definition.$stmts.length; i++) {
      generate_stmt(definition.$stmts[i], { last_stmt: (definition.$stmts.length -1 == i), full_stmt: true });
    }
    
    iseq_stack_pop();
    
    // base (singleton method)
    if (is_singleton) {
      generate_stmt(definitions.$sname, {});
    }
    else {
      write([iPUTNIL]);
    }
    
    // define method
    write([iDEFINEMETHOD, definition.$fname.value, def_iseq.toArray(), is_singleton]);
  };
  
  function generate_class(stmt, context) {
    
    var current_iseq = iseq_current;
    var class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS, "<class:" + stmt.$kname.value + ">");
    // for dynamics
    // class_iseq.parent_iseq = current_iseq;
    
    // generate bodystmts
    for (var i = 0; i < stmt.$stmts.length; i++) {
      generate_stmt(stmt.$stmts[i], {});
    }
    
    // if no stmts, fake a stmt by returning nil .. not actually used..
    if (stmt.$stmts.length == 0) {
      write([iPUTNIL]);
      write([iLEAVE]);
    }
    
    iseq_stack_pop();
    
    // base
    write([iPUTNIL]);
    
    // super
    if (false) {
      
    }
    else {
      write([iPUTNIL]);
    }
    
    // define class
    write([iDEFINECLASS, stmt.$kname.value, class_iseq.toArray(), 0]);
    
    // if (context.full_stmt && context.last_stmt) write("return ");
    // 
    // write("vm_defineclass(");
    // 
    // // base
    // write("vm_putnil(),");
    // 
    // // superclass
    // if (stmt.$super) {
    //   generate_stmt(stmt.$super, {full_stmt:false, last_stmt:false});
    // }
    // else {
    //   write("vm_putnil()");
    // }
    // write(",");
    // 
    // // class id
    // write("'" + stmt.$kname.value + "'");
    // write(",");
    // 
    // // iseq
    // write("function(){},")
    // 
    // // op_flag
    // write(0);
    // 
    // write(")");
    // 
    // if (context.full_stmt) write(";");
    
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
  
  /**
    parse returns a js iseq (array) with all the opcodes, as specified by opal.
    This array can then be popped onto the stack and evaluated.
  */
  this.parse = function() {
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

/**
  ISEQ
*/
function Iseq(type) {
  this.type = type;
  this.locals = [];
  this.args = [];
  this.norm_arg_names = [];
  this.opt_arg_names = [];
  this.rest_arg_names = [];
  this.post_arg_names = [];
  this.block_arg_name = nil;
  // dont really need to use this for client side eval
  this.local_current = "a";
  this.code = [];
  
  return this;
};

Iseq.prototype = {
  
  finalize: function() {
    
  },
  
  write: function(str) {
    this.code.push(str);
  },
  
  toString: function() {
    var r = [];
        switch (this.type) {
             case ISEQ_TYPE_TOP:
               r.push("function($){");
               if (this.locals.length > 0) {
                 r.push("var ");
                 for (var i = 0; i < this.locals.length; i++) {
                   if (i != 0) r.push(",");
                   r.push(this.locals[i]);
                 }
                 r.push(";");
               }
               r.push(this.code.join(""));
               r.push("}");
               break;
             case ISEQ_TYPE_CLASS:
               
               break;
             case ISEQ_TYPE_METHOD:
               
               break;
             case ISEQ_TYPE_BLOCK:
               
               break;
             default:
               throw "unknown iseq type in parse.js"
           }
        return r.join("");
  }
};


/**
  String scanner
*/
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
 * proc.js
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

var rb_cProc, rb_eLocalJumpError;

/*
  Converts a javascript function to a ruby compatible proc. Essentially wraps it
  to take a "self" param at start
*/
function rb_js_func_to_proc(func) {
  return function($) {
    var args = Array.prototype.slice.call(arguments, 1);
    return func.apply($, args);
  };
};

function rb_proc_to_proc(proc) {
  return proc;
};

function rb_proc_call(proc, id, _) {
  // console.log("caling proc");
  var args = Array.prototype.slice.call(arguments, 3);
  args.unshift(nil);
  args.unshift(nil);
  args.unshift(nil);
  return proc.apply(proc, args);
};

function rb_proc_s_new(cls, id, _) {
  if (_ == nil) throw "Proc#new no block given"
  return _;
};

function rb_proc_lambda(cls, id, _) {
  if (_ == nil) throw "#lambda no block given"
  return _;
};

function rb_obj_define_method(obj) {
  var klass = rb_singleton_class(obj);
  return rb_mod_define_method(obj);
};

function rb_mod_define_method(obj, id, _, sym) {
  // var _ = opal_block; opal_block = nil;
  var id;
  if (_ == nil) throw "#define_method no block given"
  if (sym.klass == rb_cString) {
    id = sym;
  } 
  else if (sym.klass == rb_cSymbol) {
    id = sym.ptr;
  }
  else {
    throw "#define_method expects a sym for name"
  }
  return rb_define_method(obj, id, _, -1);
};

function Init_Proc() {
  rb_cProc = rb_define_class("Proc", rb_cObject);
  Function.prototype.klass = rb_cProc;
  Function.prototype.flags = T_OBJECT | T_PROC;
  
  rb_define_singleton_method(rb_cProc, "new", rb_proc_s_new, 0);
  
  rb_define_method(rb_cProc, "===", rb_proc_call, -1);
  rb_define_method(rb_cProc, "yield", rb_proc_call, -1);
  rb_define_method(rb_cProc, "call", rb_proc_call, -1);
  rb_define_method(rb_cProc, "[]", rb_proc_call, -1);
  rb_define_method(rb_cProc, "to_proc", rb_proc_to_proc, 0);
  
  rb_define_method(rb_mKernel, "lambda", rb_proc_lambda, 0);
  rb_define_method(rb_mKernel, "proc", rb_proc_s_new, 0);
  
  rb_define_method(rb_mKernel, "define_singleton_method", rb_obj_define_method, -1);
  rb_define_method(rb_cModule, "define_method", rb_mod_define_method, -1);
  
  rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
  // rb_define_method(rb_eLocalJumpError, "exit_value", rb_localjump_xvalue, 0);
  // rb_define_method(rb_eLocalJumpError, "reason", rb_localjump_reason, 0);
};
/* 
 * range.js
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


var rb_cRange;

var RRange = function(beg, end, exc) {
  this.hash = opal_yield_hash();
  this.klass = rb_cRange ;
  this.flags = T_OBJECT;
  this.iv_tbl = {};
  this.beg = beg;
  this.end = end;
  this.exc = RTEST(exc);
  return this;
};

function rb_range_initialize(range, id, _, beg, end, exc) {
  range.beg = beg;
  range.end = end;
  range.exc = RTEST(exc);
};

function rb_range_eqq(range, id, _, other) {
  if (other.klass !== rb_cNumber && other.klass !== rb_cString) {
    // console.log(other);
    rb_raise(rb_eArgError, "bad value for range");
  }
  var beg = range.beg;
  var end = range.exc ? range.end : range.end - 1;
  if (other >= beg && other <= end) return true;
  return false;
};

function rb_range_eq(range, id, _, other) {
  if (other.klass !== rb_cRange) return false;
  if (range.beg !== other.beg) return false;
  if (range.end !== other.end) return false;
  if (range.exc !== range.exc) return false;
  return true;
};

function rb_range_first(range) {
  return range.beg;
};

function rb_range_last(range) {
  return range.end;
};

function rb_range_to_a(range) {
  var res = [], end;
  // case strings
  if (range.beg.klass == rb_cString) {
    end = range.exc ? range.end.charCodeAt(0) - 1 : range.end.charCodeAt(0);
    for (var i = range.beg.charCodeAt(0); i <= end; i++) {
      res.push(String.fromCharCode(i));
    }
  }
  // case numbers
  if (range.beg.klass == rb_cNumber) {
    end = range.exc ? range.end - 1 : range.end;
    for (var i = range.beg; i <= end; i++) {
      res.push(i);
    }
  }
  return res;
};

function rb_range_to_s(range) {
  return range.beg + (range.exc ? ".." : "...") + range.end;
};

function rb_range_inspect(range) {
  return vm_send(range.beg, "inspect", [], nil, 8) + (range.exc ? ".." : "...") + vm_send(range.end, "inspect", [], nil, 8);
};

function rb_range_exclude_end_p(range) {
  return !range.exc;
};

function Init_Range() {
  rb_cRange = rb_define_class("Range", rb_cObject);
  // rb_include_module(rb_cRange, rb_cEnumerable);

  rb_define_method(rb_cRange, "initialize", rb_range_initialize, -1);
  // rb_define_method(rb_cRange, "initialize_copy",rb_range_initialize_copy, 1);
  rb_define_method(rb_cRange, "==", rb_range_eq, 1);
  rb_define_method(rb_cRange, "===", rb_range_eqq, 1);
  // rb_define_method(rb_cRange, "eql?", rb_range_eql, 1);
  // rb_define_method(rb_cRange, "hash", rb_range_hash, 0);
  // rb_define_method(rb_cRange, "each", rb_range_each, 0);
  // rb_define_method(rb_cRange, "step", rb_range_step, -1);
  // rb_define_method(rb_cRange, "begin", rb_range_begin, 0);
  // rb_define_method(rb_cRange, "end", rb_range_end, 0);
  rb_define_method(rb_cRange, "first", rb_range_first, -1);
  rb_define_method(rb_cRange, "last", rb_range_last, -1);
  // rb_define_method(rb_cRange, "min", rb_range_min, 0);
  // rb_define_method(rb_cRange, "max", rb_range_max, 0);
  rb_define_method(rb_cRange, "to_s", rb_range_to_s, 0);
  rb_define_method(rb_cRange, "inspect", rb_range_inspect, 0);
  rb_define_method(rb_cRange, "to_a", rb_range_to_a, 0);

  rb_define_method(rb_cRange, "exclude_end?", rb_range_exclude_end_p, 0);

  // rb_define_method(rb_cRange, "member?", rb_range_include, 1);
  // rb_define_method(rb_cRange, "include?", rrb_ange_include, 1);
  // rb_define_method(rb_cRange, "cover?", rb_range_cover, 1);
}
/* 
 * re.js
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


var rb_cRegexp, rb_eRegexpError, rb_cMatch;

function rb_reg_match_m(reg, str) {
  var m = reg.exec(str);
  if (m == null) return nil;
  return rb_match_new(rb_cMatch, m);
};

/**
  Init matchdata - data is array of match results (as from js)
*/
function rb_match_new(match, data) {
  var o = rb_obj_alloc(match);
  o.iv_tbl.data = data;
  return o;
};

function rb_match_inspect(match) {
  return '#<MatchData "' + match.iv_tbl.data[0] + '">';
};

function rb_match_to_s(match) {
  return match.iv_tbl.data[0];
};

function rb_match_size(match) {
  return match.iv_tbl.data[0];
};

function rb_match_aref(match, idx) {
  return match.iv_tbl.data[idx];
};

function rb_reg_eqq(reg, id, _, str) {
  var m = reg.exec(str);
  if (m == null) return false;
  return true;
};

function Init_Regexp() {
  // rb_eRegexpError = rb_define_class("RegexpError", rb_eStandardError);
  
  // rb_define_virtual_variable("$~", rb_match_getter, rb_match_setter);
  // rb_define_virtual_variable("$&", rb_last_match_getter, 0);
  // rb_define_virtual_variable("$`", rb_prematch_getter, 0);
  // rb_define_virtual_variable("$'", rb_postmatch_getter, 0);
  // rb_define_virtual_variable("$+", rb_last_paren_match_getter, 0);

  // rb_define_virtual_variable("$=", rb_ignorecase_getter, rb_ignorecase_setter);
  // rb_define_virtual_variable("$KCODE", rb_kcode_getter, rb_kcode_setter);
  // rb_define_virtual_variable("$-K", rb_kcode_getter, rb_kcode_setter);

  rb_cRegexp = rb_define_class("Regexp", rb_cObject);
  RegExp.prototype.klass = rb_cRegexp;
  // rb_define_alloc_func(rb_cRegexp, rb_reg_s_alloc);
  // rb_define_singleton_method(rb_cRegexp, "compile", rb_class_new_instance, -1);
  // rb_define_singleton_method(rb_cRegexp, "quote", rb_reg_s_quote, 1);
  // rb_define_singleton_method(rb_cRegexp, "escape", rb_reg_s_quote, 1);
  // rb_define_singleton_method(rb_cRegexp, "union", rb_reg_s_union_m, -2);
  // rb_define_singleton_method(rb_cRegexp, "last_match", rb_reg_s_last_match, -1);
  // rb_define_singleton_method(rb_cRegexp, "try_convert", rb_reg_s_try_convert, 1);

  // rb_define_method(rb_cRegexp, "initialize", rb_reg_initialize_m, -1);
  // rb_define_method(rb_cRegexp, "initialize_copy", rb_reg_init_copy, 1);
  // rb_define_method(rb_cRegexp, "hash", rb_reg_hash, 0);
  // rb_define_method(rb_cRegexp, "eql?", rb_reg_equal, 1);
  // rb_define_method(rb_cRegexp, "==", rb_reg_equal, 1);
  // rb_define_method(rb_cRegexp, "=~", rb_reg_match, 1);
  rb_define_method(rb_cRegexp, "===", rb_reg_eqq, 1);
  // rb_define_method(rb_cRegexp, "~", rb_reg_match2, 0);
  rb_define_method(rb_cRegexp, "match", rb_reg_match_m, -1);
  // rb_define_method(rb_cRegexp, "to_s", rb_reg_to_s, 0);
  // rb_define_method(rb_cRegexp, "inspect", rb_reg_inspect, 0);
  // rb_define_method(rb_cRegexp, "source", rb_reg_source, 0);
  // rb_define_method(rb_cRegexp, "casefold?", rb_reg_casefold_p, 0);
  // rb_define_method(rb_cRegexp, "options", rb_reg_options_m, 0);
  // rb_define_method(rb_cRegexp, "encoding", rb_obj_encoding, 0);
  // rb_define_method(rb_cRegexp, "fixed_encoding?", rb_reg_fixed_encoding_p, 0);
  // rb_define_method(rb_cRegexp, "names", rb_reg_names, 0);
  // rb_define_method(rb_cRegexp, "named_captures", rb_reg_named_captures, 0);
 
  rb_cMatch = rb_define_class("MatchData", rb_cObject);
  // rb_define_alloc_func(rb_cMatch, rb_match_alloc);
  rb_define_singleton_method(rb_cMatch, "new", rb_match_new, 1);
  // rb_define_method(rb_cMatch, "initialize_copy", match_init_copy, 1);
  // rb_define_method(rb_cMatch, "regexp", match_regexp, 0);
  // rb_define_method(rb_cMatch, "names", match_names, 0);
  rb_define_method(rb_cMatch, "size", rb_match_size, 0);
  rb_define_method(rb_cMatch, "length", rb_match_size, 0);
  // rb_define_method(rb_cMatch, "offset", match_offset, 1);
  // rb_define_method(rb_cMatch, "begin", match_begin, 1);
  // rb_define_method(rb_cMatch, "end", match_end, 1);
  // rb_define_method(rb_cMatch, "to_a", match_to_a, 0);
  rb_define_method(rb_cMatch, "[]", rb_match_aref, -1);
  // rb_define_method(rb_cMatch, "captures", match_captures, 0);
  // rb_define_method(rb_cMatch, "values_at", match_values_at, -1);
  // rb_define_method(rb_cMatch, "pre_match", rb_reg_match_pre, 0);
  // rb_define_method(rb_cMatch, "post_match", rb_reg_match_post, 0);
  rb_define_method(rb_cMatch, "to_s", rb_match_to_s, 0);
  rb_define_method(rb_cMatch, "inspect", rb_match_inspect, 0);
  // rb_define_method(rb_cMatch, "string", match_string, 0);
};
/* 
 * string.js
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


var rb_cString, rb_cSymbol;

var RSymbol = function(ptr) {
  this.hash = opal_yield_hash();
  this.flags = T_OBJECT | T_SYMBOL;
  this.klass = rb_cSymbol ;
  // this.$type = T_SYMBOL;
  this.toString = function() {
  // hack, for associative js arrays, we need a unique string name :(
    return "#<Symbol:0x000000 @ptr=\"" + this.ptr + "\">";
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

function rb_sym_to_s(sym) {
  return sym.ptr;
};

function rb_sym_inspect(sym) {
  return ":" + sym.ptr;
};

function rb_sym_equal(sym1, id, _, sym2) {
  if (sym1 === sym2) return true;
  return false;
};

function rb_str_to_s(str) {
  return new String(str);
};

function rb_str_inspect(str) {
  return '"' + str + '"';
};

function rb_sym_to_sym(sym) {
  return sym;
};

function rb_sym_to_proc(sym) {
  var id = sym.ptr;
  var f = function($$, id, _, o) {
    var args = Array.prototype.slice.call(arguments, 2);
    return vm_send(o, id, args, nil, 8);
  };
  return f;
};

function rb_sym_succ(sym) {
  return sym;
};

function rb_sym_length(sym) {
  return sym.ptr.length;
};

function rb_str_upcase(str) {
  return str.toUpperCase();
};

function rb_sym_upcase(sym) {
  return ID2SYM(sym.ptr.toUpperCase());
};

function rb_str_downcase(str) {
  return str.toLowerCase();
};

function rb_sym_downcase(sym) {
  return ID2SYM(sym.ptr.toLowerCase());
};

function rb_str_capitalize(str) {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

function rb_sym_capitalize(sym) {
  return ID2SYM(rb_str_capitalize(sym.ptr));
};

function rb_str_equal(a, id, _, b) {
  return a === b;
};

function rb_str_eql(a, id, _, b) {
  return a === b;
};

function rb_str_plus(a, id, _, b) {
  return a + b;
};

function rb_str_times(s, n) {
  var res = [];
  for (var i = 0; i < n; i++) {
    res.push(s);
  }
  return res.join("");
};

function rb_str_length(str) {
  return str.length;
};

function rb_str_each_line(str, s) {
  var _ = opal_block; opal_block = nil;
  if (s == undefined) s = "\n";
  var parts = str.split(s);
  for (var i = 0; i < parts.length; i++) {
    vm_yield(_, [parts[i]]);
  }
  return str;
};

function rb_str_intern(str) {
  return ID2SYM(str);
};

function rb_str_reverse(str) {
  // console.log(str);
  return str.split("").reverse().join("");
};

function Init_String() {
  
  rb_cString = rb_define_class("String", rb_cObject);
  String.prototype.klass = rb_cString;
  String.prototype.flags = T_OBJECT | T_STRING;
  rb_include_module(rb_cString, rb_mComparable);
  // rb_define_alloc_func(rb_cString, rb_str_alloc);
  
  // rb_define_singleton_method(rb_cString, "try_convert", rb_str_s_try_convert, 1);
  //   rb_define_method(rb_cString, "initialize", rb_str_init, -1);
  //   rb_define_method(rb_cString, "initialize_copy", rb_str_replace, 1);
  //   rb_define_method(rb_cString, "<=>", rb_str_cmp_m, 1);
    rb_define_method(rb_cString, "==", rb_str_equal, 1);
    rb_define_method(rb_cString, "eql?", rb_str_eql, 1);
  //   rb_define_method(rb_cString, "hash", rb_str_hash_m, 0);
  //   rb_define_method(rb_cString, "casecmp", rb_str_casecmp, 1);
    rb_define_method(rb_cString, "+", rb_str_plus, 1);
    rb_define_method(rb_cString, "*", rb_str_times, 1);
  //   rb_define_method(rb_cString, "%", rb_str_format_m, 1);
  //   rb_define_method(rb_cString, "[]", rb_str_aref_m, -1);
  //   rb_define_method(rb_cString, "[]=", rb_str_aset_m, -1);
  //   rb_define_method(rb_cString, "insert", rb_str_insert, 2);
    rb_define_method(rb_cString, "length", rb_str_length, 0);
    rb_define_method(rb_cString, "size", rb_str_length, 0);
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
  rb_define_method(rb_cString, "to_s", rb_str_to_s, 0);
  rb_define_method(rb_cString, "to_str", rb_str_to_s, 0);
  rb_define_method(rb_cString, "inspect", rb_str_inspect, 0);
  // rb_define_method(rb_cString, "dump", rb_str_dump, 0);

  rb_define_method(rb_cString, "upcase", rb_str_upcase, 0);
  rb_define_method(rb_cString, "downcase", rb_str_downcase, 0);
  rb_define_method(rb_cString, "capitalize", rb_str_capitalize, 0);
  // rb_define_method(rb_cString, "swapcase", rb_str_swapcase, 0);

  // rb_define_method(rb_cString, "hex", rb_str_hex, 0);
  // rb_define_method(rb_cString, "oct", rb_str_oct, 0);
  // rb_define_method(rb_cString, "split", rb_str_split_m, -1);
  // rb_define_method(rb_cString, "lines", rb_str_each_line, -1);
  // rb_define_method(rb_cString, "bytes", rb_str_each_byte, 0);
  // rb_define_method(rb_cString, "chars", rb_str_each_char, 0);
  // rb_define_method(rb_cString, "codepoints", rb_str_each_codepoint, 0);
  rb_define_method(rb_cString, "reverse", rb_str_reverse, 0);
  // rb_define_method(rb_cString, "concat", rb_str_concat, 1);
  // rb_define_method(rb_cString, "<<", rb_str_concat, 1);
  // rb_define_method(rb_cString, "crypt", rb_str_crypt, 1);
  rb_define_method(rb_cString, "intern", rb_str_intern, 0);
  rb_define_method(rb_cString, "to_sym", rb_str_intern, 0);
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
  
  rb_define_method(rb_cString, "each", rb_str_each_line, -1);
  rb_define_method(rb_cString, "each_line", rb_str_each_line, -1);
  // rb_define_method(rb_cString, "each_byte", rb_str_each_byte, 0);
  // rb_define_method(rb_cString, "each_char", rb_str_each_char, 0);
  // rb_define_method(rb_cString, "each_codepoint", rb_str_each_codepoint, 0);

  // rb_define_method(rb_cString, "sum", rb_str_sum, -1);

  // rb_define_method(rb_cString, "slice", rb_str_aref_m, -1);

  // rb_define_method(rb_cString, "partition", rb_str_partition, 1);
  // rb_define_method(rb_cString, "rpartition", rb_str_rpartition, 1);



  rb_cSymbol = rb_define_class("Symbol", rb_cObject);
  rb_include_module(rb_cSymbol, rb_mComparable);
  // rb_undef_alloc_func(rb_cSymbol);
  // rb_undef_method(rb_cSymbol.klass, "new");
  // rb_define_singleton_method(rb_cSymbol, "all_symbols", rb_sym_all_symbols, 0);

  rb_define_method(rb_cSymbol, "==", rb_sym_equal, 1);
  rb_define_method(rb_cSymbol, "inspect", rb_sym_inspect, 0);
  rb_define_method(rb_cSymbol, "to_s", rb_sym_to_s, 0);
  rb_define_method(rb_cSymbol, "id2name", rb_sym_to_s, 0);
  rb_define_method(rb_cSymbol, "intern", rb_sym_to_sym, 0);
  rb_define_method(rb_cSymbol, "to_sym", rb_sym_to_sym, 0);
  rb_define_method(rb_cSymbol, "to_proc", rb_sym_to_proc, 0);
  rb_define_method(rb_cSymbol, "succ", rb_sym_succ, 0);
  rb_define_method(rb_cSymbol, "next", rb_sym_succ, 0);

  // rb_define_method(rb_cSymbol, "<=>", rb_sym_cmp, 1);
  // rb_define_method(rb_cSymbol, "casecmp", rb_sym_casecmp, 1);
  // rb_define_method(rb_cSymbol, "=~", rb_sym_match, 1);

  // rb_define_method(rb_cSymbol, "[]", rb_sym_aref, -1);
  // rb_define_method(rb_cSymbol, "slice", rb_sym_aref, -1);
  rb_define_method(rb_cSymbol, "length", rb_sym_length, 0);
  rb_define_method(rb_cSymbol, "size", rb_sym_length, 0);
  // rb_define_method(rb_cSymbol, "empty?", rb_sym_empty, 0);
  // rb_define_method(rb_cSymbol, "match", rb_sym_match, 1);

  rb_define_method(rb_cSymbol, "upcase", rb_sym_upcase, 0);
  rb_define_method(rb_cSymbol, "downcase", rb_sym_downcase, 0);
  rb_define_method(rb_cSymbol, "capitalize", rb_sym_capitalize, 0);
  // rb_define_method(rb_cSymbol, "swapcase", rb_sym_swapcase, 0);
};
// 
//  time.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-25.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var rb_cTime;

function rb_time_init(time) {
  time.native = new Date();
};

function rb_time_to_s(time) {
  return time.native.toString();
};

function rb_time_minus(a, id, _, b) {
  return a.native - b.native;
};

function Init_Time() {
  rb_cTime = rb_define_class("Time", rb_cObject);
  rb_include_module(rb_cTime, rb_mComparable);
  
  // rb_define_alloc_func(rb_cTime, rb_time_s_alloc);
  rb_define_singleton_method(rb_cTime, "now", rb_class_new_instance, -1);
  // rb_define_singleton_method(rb_cTime, "at", rb_time_s_at, -1);
  // rb_define_singleton_method(rb_cTime, "utc", rb_time_s_mkutc, -1);
  // rb_define_singleton_method(rb_cTime, "gm", rb_time_s_mkutc, -1);
  // rb_define_singleton_method(rb_cTime, "local", rb_time_s_mktime, -1);
  // rb_define_singleton_method(rb_cTime, "mktime", rb_time_s_mktime, -1);
  // 
  // rb_define_method(rb_cTime, "to_i", rb_time_to_i, 0);
  // rb_define_method(rb_cTime, "to_f", rb_time_to_f, 0);
  // rb_define_method(rb_cTime, "<=>", rb_time_cmp, 1);
  // rb_define_method(rb_cTime, "eql?", rb_time_eql, 1);
  // rb_define_method(rb_cTime, "hash", rb_time_hash, 0);
  rb_define_method(rb_cTime, "initialize", rb_time_init, 0);
  // rb_define_method(rb_cTime, "initialize_copy", rb_time_init_copy, 1);
  // 
  // rb_define_method(rb_cTime, "localtime", rb_time_localtime, 0);
  // rb_define_method(rb_cTime, "gmtime", rb_time_gmtime, 0);
  // rb_define_method(rb_cTime, "utc", rb_time_gmtime, 0);
  // rb_define_method(rb_cTime, "getlocal", rb_time_getlocaltime, 0);
  // rb_define_method(rb_cTime, "getgm", rb_time_getgmtime, 0);
  // rb_define_method(rb_cTime, "getutc", rb_time_getgmtime, 0);
  // 
  // rb_define_method(rb_cTime, "ctime", rb_time_asctime, 0);
  // rb_define_method(rb_cTime, "asctime", rb_time_asctime, 0);
  rb_define_method(rb_cTime, "to_s", rb_time_to_s, 0);
  rb_define_method(rb_cTime, "inspect", rb_time_to_s, 0);
  // rb_define_method(rb_cTime, "to_a", rb_time_to_a, 0);
  // 
  // rb_define_method(rb_cTime, "+", rb_time_plus, 1);
  rb_define_method(rb_cTime, "-", rb_time_minus, 1);
  // 
  // rb_define_method(rb_cTime, "succ", rb_time_succ, 0);
  // rb_define_method(rb_cTime, "sec", rb_time_sec, 0);
  // rb_define_method(rb_cTime, "min", rb_time_min, 0);
  // rb_define_method(rb_cTime, "hour", rb_time_hour, 0);
  // rb_define_method(rb_cTime, "mday", rb_time_mday, 0);
  // rb_define_method(rb_cTime, "day", rb_time_mday, 0);
  // rb_define_method(rb_cTime, "mon", rb_time_mon, 0);
  // rb_define_method(rb_cTime, "month", rb_time_mon, 0);
  // rb_define_method(rb_cTime, "year", rb_time_year, 0);
  // rb_define_method(rb_cTime, "wday", rb_time_wday, 0);
  // rb_define_method(rb_cTime, "yday", rb_time_yday, 0);
  // rb_define_method(rb_cTime, "isdst", rb_time_isdst, 0);
  // rb_define_method(rb_cTime, "dst?", rb_time_isdst, 0);
  // rb_define_method(rb_cTime, "zone", rb_time_zone, 0);
  // rb_define_method(rb_cTime, "gmtoff", rb_time_utc_offset, 0);
  // rb_define_method(rb_cTime, "gmt_offset", rb_time_utc_offset, 0);
  // rb_define_method(rb_cTime, "utc_offset", rb_time_utc_offset, 0);
  // 
  // rb_define_method(rb_cTime, "utc?", rb_time_utc_p, 0);
  // rb_define_method(rb_cTime, "gmt?", rb_time_utc_p, 0);
  // 
  // rb_define_method(rb_cTime, "sunday?", rb_time_sunday, 0);
  // rb_define_method(rb_cTime, "monday?", rb_time_monday, 0);
  // rb_define_method(rb_cTime, "tuesday?", rb_time_tuesday, 0);
  // rb_define_method(rb_cTime, "wednesday?", rb_time_wednesday, 0);
  // rb_define_method(rb_cTime, "thursday?", rb_time_thursday, 0);
  // rb_define_method(rb_cTime, "friday?", rb_time_friday, 0);
  // rb_define_method(rb_cTime, "saturday?", rb_time_saturday, 0);
  // 
  // rb_define_method(rb_cTime, "tv_sec", rb_time_to_i, 0);
  // rb_define_method(rb_cTime, "tv_usec", rb_time_usec, 0);
  // rb_define_method(rb_cTime, "usec", rb_time_usec, 0);
  // rb_define_method(rb_cTime, "tv_nsec", rb_time_nsec, 0);
  // rb_define_method(rb_cTime, "nsec", rb_time_nsec, 0);
  // 
  // rb_define_method(rb_cTime, "strftime", rb_time_strftime, 1);
  // 
  // rb_define_method(rb_cTime, "_dump", rb_time_dump, -1);
  // rb_define_singleton_method(rb_cTime, "_load", rb_time_load, 1);
};
/* 
 * variable.js
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


function rb_ivar_set(obj, id, val) {
  obj.iv_tbl[id] = val;
  return val;
};

function rb_ivar_get(obj, id) {
  if (obj.iv_tbl.hasOwnProperty(id)) {
    return obj.iv_tbl[id];
  }
  return nil;
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
  // console.log(id);
  // console.log(k);
  // console.log("a");
  var v, t = k;
  while (t) {
    // console.log(t.iv_tbl.__classid__);
    // console.log(t);
    if (v = t.iv_tbl[id]) return v;
    t = t.sup;
  }
  // now try parent instead..
  t = k.parent;
  while (t) {
    if (v = t.iv_tbl[id]) return v;
    t = t.parent;
  }
  console.log("raising name error for " + id);
  rb_raise(rb_eNameError, "uninitialized constant " + id + " in " + k.iv_tbl.__classid__);
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
  console.log("raising name error for " + id);
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

function Init_VM() {
  
};

var opal_top_self;
// var opal_block;

function opal_main_to_s() {
  return "main";
};

function opal_main_include(top, id, _, inc) {
  return rb_include_module(rb_cObject, inc);
};

function Init_top_self() {
  opal_top_self = new RObject();
  opal_top_self.klass = rb_cObject;
  FL_SET(opal_top_self, T_OBJECT);
  rb_define_singleton_method(opal_top_self, "to_s", opal_main_to_s, 0);
  rb_define_singleton_method(opal_top_self, "include", opal_main_include, 1);
};

function rb_method_missing(recv, id, _, mid, args) {
  var obj_type;
  // console.log("eeek " + id);
  if (recv.flags & T_OBJECT) obj_type = ":Object";
  else if (recv.flags & T_CLASS) obj_type = ":Class";
  else if (recv.flags & T_MODULE) obj_type = ":Module";
  else obj_type = "";
  // console.log("well " + mid.ptr);
  // console.log(recv);
  return rb_raise(rb_eNameError, "undefined method `" + mid.ptr + "` for " + rb_funcall(recv, "inspect") + obj_type);
  
};

/*
  Kernel#eval(str)
  
  Eval the raw string in the context of obj, the receiver: for now does it in
  opal_top_self
*/
function rb_vm_eval_str(obj, str) {
  var parser = vn_parser("<main>", str);
  var iseq = parser.parse();
  console.log(iseq);
  if (window.execScript) {
    window.execScript("window.opal_tmp_func = " + iseq + ";");
    return window.opal_tmp_func(obj);
  }
  else {
    with (window) {
      return eval("(" + iseq + ")")(obj);
    }
  }
  
  // var f = eval("(" + iseq + ")");
  // console.log("a");
  // console.log(f);
  // console.log("b");
  // console.log(obj);
  // return f(obj);
};

function Init_vm_eval() {
  rb_define_private_method(rb_cBasicObject, "method_missing", rb_method_missing, -1);
  rb_define_method(rb_mKernel, "eval", rb_vm_eval_str, 1);
};

function rb_search_method(klass, id) {
  // if (id == "initialize") {
    // console.log("searching for id: " + id);
  // console.log(klass);
  /// }
  // if (!klass){ 
    // console.log(id);
    // console.log(klass);
  // }
  var f, k = klass;
  while (!(f = k.m_tbl[id])) {
    k = k.sup;
    if (!k) return undefined;
  }
  return f;
};


/**
  recv - Recveiver
  id - method id
  func - arguments.callee which initiated the super call. this helps us match
  all other arguments are the actual args to pass
*/
function rb_super(recv, id, func) {
  var args = Array.prototype.slice.call(arguments, 3);
  if (recv === null || recv === undefined) recv = nil;
  var body = rb_search_super_method(recv.klass, id, func);
  if (!body) {
    return rb_raise(rb_eNoMethodError, "super: no superclass method '" + id +"'");
  }
  
  var imp = body.body, len = args.length;
  
  switch(len) {
    // case -2: throw "-2 currently unimplemeneted: rb_funcall2"
    // case -1: return imp(argc, args, recv);
    case 0: return imp(recv, id, nil);
    case 1: return imp(recv, id, nil, args[0]);
    case 2: return imp(recv, id, nil, args[0], args[1]);
    case 3: return imp(recv, id, nil, args[0], args[1], args[2]);
    case 4: return imp(recv, id, nil, args[0], args[1], args[2], args[3]);
    case 5: return imp(recv, id, nil, args[0], args[1], args[2], args[3], args[4]);
    default: throw "currently unsupported argc length " + len
  }
  return nil;
};

function rb_search_super_method(klass, id, func) {
  var f, k = klass;
  // find the current method we are on:
  // first lhs finds the right id
  // then we need to make sure that its the current func: more than 2 supers in
  // a row would be recursive otherwise
  while (!((f = k.m_tbl[id]) && f != func)) {
    if (!(k = k.sup)) return undefined;
  }
  // now, we can search from this point up. Any matching id is now the super for
  // the current function. might be the Nth id in chain, but its the next one up
  // from current.
  if (!(k = k.sup)) return undefined;
  while (!(f = k.m_tbl[id])) {
    if (!(k = k.sup)) return undefined;
  }
  return f;
};

/*
  rb_funcall - called from js usually, args are passed in as normal args
  e.g. rb_funcall(myObj, "do_something", arg1, arg2, arg3...);
*/
function rb_funcall(recv, id) {
  var args = Array.prototype.slice.call(arguments, 2);
  return rb_funcall2(recv, id, args);
}

/*
  rbfuncall2 - called usually from vm. Args is an array of args, so it is easier
  and quicker to call from VM, where args are given as an array
*/
function rb_funcall2(recv, id, args) {
  if (recv === null || recv === undefined) recv = nil;
  // console.log("searching in " + id);
  // console.log(recv);
  var body = rb_search_method(recv.klass, id);
  if (!body) {
    args.unshift(ID2SYM(id));
    return rb_funcall2(recv, "method_missing", args);
  }
  var imp = body.body, len = args.length;
    
  switch(len) {
    // case -2: throw "-2 currently unimplemeneted: rb_funcall2"
    // case -1: return imp(argc, args, recv);
    case 0: return imp(recv, id, nil);
    case 1: return imp(recv, id, nil, args[0]);
    case 2: return imp(recv, id, nil, args[0], args[1]);
    case 3: return imp(recv, id, nil, args[0], args[1], args[2]);
    case 4: return imp(recv, id, nil, args[0], args[1], args[2], args[3]);
    case 5: return imp(recv, id, nil, args[0], args[1], args[2], args[3], args[4]);
    default: throw "currently unsupported argc length " + len
  } 
};

function rb_funcall3(recv, id, _, args) {
  try {
    if (recv === null || recv === undefined) recv = nil;
  
    var body = rb_search_method(recv.klass, id);
    if (!body) {
      // console.log ("method missing " + id);
      // console.log(recv);
      args.unshift(ID2SYM(id));
      return rb_funcall2(recv, "method_missing", args);
    }
    var imp = body.body, len = args.length;
  
    switch(len) {
      // case -2: throw "-2 currently unimplemeneted: rb_funcall2"
      // case -1: return imp(argc, args, recv);
      case 0: return imp(recv, id, _);
      case 1: return imp(recv, id, _, args[0]);
      case 2: return imp(recv, id, _, args[0], args[1]);
      case 3: return imp(recv, id, _, args[0], args[1], args[2]);
      case 4: return imp(recv, id, _, args[0], args[1], args[2], args[3]);
      case 5: return imp(recv, id, _, args[0], args[1], args[2], args[3], args[4]);
      default: throw "currently unsupported argc length " + len
    }
  }
  catch (e) {
    /*
      Capture all LocalJumpErrors
    */
    if (e.klass === rb_eLocalJumpError) {
      // first try and capture all return statements
      if (e.iv_tbl.type === "return") {
        return e.iv_tbl.args;
      }
      // next, try break statements
      if (e.iv_tbl.type === "break") {
        if (_ !== nil) return e.iv_tbl.args;
      }
    }
    // rethrow if we dont find the right handler
    throw e
  }
};

function vm_defineclass(base, sup, id, body, type) {
  var klass;
  switch (type) {
    case 0:
      // get right superclass
      if (sup == nil) sup = rb_cObject;
      // get right base for class
      if (base.flags & T_OBJECT) base = rb_class_real(base.klass);
      
      if (rb_const_defined_at(base, id)) {
        klass = rb_const_get_at(base, id);
      }
      else {
        klass = rb_define_class_id(id, sup);
        rb_name_class(klass, id);
        rb_const_set(base, id, klass);
        klass.parent = base;
      }
      break;
    case 2:
      if (base.flags & T_OBJECT) base = rb_class_real(base.klass);
      
      if (rb_const_defined_at(base, id)) {
        klass = rb_const_get_at(base, id);
      }
      else {
        klass = rb_define_module_id(id);
        rb_name_class(klass, id);
        rb_const_set(base, id, klass);
        klass.parent = base;
      }
      break;
    default:
      throw "unknown vm_defineclass type: " + type
  }
  // return result of executing body
  return body(klass);
};

function vm_definemethod(base, id, body, is_singleton) {
  if (base.flags & T_OBJECT) base = base.klass;
  if (is_singleton) {
    return rb_define_method(rb_singleton_class(base), id, body);
  }
  else {
    return rb_define_method(base, id, body);
  }
};

function vm_send(obj, id, args, block, flags) {
  // if (block !== nil) opal_block = block;
  var r = rb_funcall3(obj, id, block, args);
  // opal_block = nil;
  return r;
};

function vm_getconstant(base, id) {
  // console.log("const getting" + id);
  if (base.flags & T_OBJECT) base = rb_class_real(base.klass);
  // console.log("looking in base:");
  // console.log(base);
  return rb_const_get(base, id);
};

function vm_setconstant(base, id, val) {
  if (base.flags & T_OBJECT) base = rb_class_real(base.klass);
  return rb_const_set(base, id, val);
};

function vm_newhash() {
  var ary = Array.prototype.slice.call(arguments), res = rb_hash_new();
  for (var i = 0; i < ary.length; i += 2) {
    rb_hash_aset(res, "", nil, ary[i], ary[i + 1]);
  }
  return res;
};

function vm_newrange(beg, end, inc) {
  return new RRange(beg, end, inc);
};

/*
  break statement
  
  Basically throws an error that will be caught, if it can. If not caught then 
  the break statement was called from an invalid location, and so an error will
  be thrown.
  
  Usage:
  
    rb_break(arg1, arg2, arg3 ... arg)
*/
function rb_break(args) {
  rb_jump_raise(rb_eLocalJumpError, "break", "unexpected break", args);
};

/*
  return statement
*/
function rb_return(args) {
  rb_jump_raise(rb_eLocalJumpError, "return", "unexpected return", args);
};

/**
  yield block given by 'block'. All blocks take a '$$' as a first param, and 
  this should always be nil unless we want to redefine self, e.g. for 
  instance_eval and using the block to define a method. If this first param is
  not nil, then it will be used as the self recv, and assign itselg to $. every
  block does this itself.
*/
function vm_yield(block, args) {
  if (block == nil) rb_raise(rb_eArgError, "yield: no block given");
  // console.log(block);
  args.unshift(nil);
  args.unshift(nil);
  args.unshift(nil);
  // console.log(args);/
  // args.unshift(nil);
  // args.unshift(nil);
  return block.apply(block, args);
  // return block(nil);
};

function vm_ivarset(obj, id, val) {
  return rb_ivar_set(obj, id, val);
};

function vm_ivarget(obj, id) {
  return rb_ivar_get(obj, id);
};

function vm_optplus(a, b) {
  if (typeof a == "number" && typeof b == "number") return a + b;
  return vm_send(a, "+", [b], nil, 8);
};

function vm_optminus(a, b) {
  if (typeof a == "number" && typeof b == "number") return a - b;
  return vm_send(a, "-", [b], nil, 8);
};

function vm_optmult(a, b) {
  if (typeof a == "number" && typeof b == "number") return a * b;
  return vm_send(a, "*", [b], nil, 8);
};

function vm_optdiv(a, b) {
  if (typeof a == "number" && typeof b == "number") return a / b;
  return vm_send(a, "/", [b], nil, 8);
};

function vm_alias(cls, a, b) {
  return rb_define_alias(cls.klass, a.ptr, b.ptr);
};
/* 
 * yaml.js
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

/**
  YAML support: all yml files in the browser will be pre-compiled into the vnyml
  format. They will still, however, have the .yml or .yaml extension. This library
  will reproduce the functionality of vanilla yaml but using the vnyml format
  instead.
*//* 
 * ajax.js
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

// Ajax class
var opal_cAjax;

// JSONP prefix call names
var opal_jsonp_prefix = "opal_jsonp_";
// JSONP prefix counter
var opal_jsonp_counter = 0;

// valid data_types for ajax
var opal_ajax_k_data_types = ['xml', 'html', 'script', 'json', 'jsonp', 'text'];

/*
  main entry point for any ajax request. get, post etc all set custom options 
  then pass control to this function
*/
function opal_ajax_request(ajax, url, options) {
  var _ = opal_block; opal_block = nil;
  var data_type;
  if (rb_hash_has_key(options, ID2SYM('data_type'))) {
    data_type = rb_hash_delete(options, ID2SYM('data_type'));
    if (opal_ajax_k_data_types.indexOf(data_type) == -1) {
      throw data_type + " is a bad data type for Ajax#request"
    }
  }
  else {
    // no data type, so we need to work it out ourselves
  }
    
  switch (data_type) {
    case 'jsonp':
      var callback = opal_jsonp_prefix + (opal_jsonp_counter++);
      url += "?callback=" + callback;
      window[callback] = function(r) {
        if (_ !== nil) {
          // console.log("need to yield result");
          vm_yield(_, [opal_json_2_ruby_json(r)]);
        }
        // console.log("got response");
        // console.log(opal_json_2_ruby_json(r));
        // clean up
        
        // IE throws error on delete :(
        // delete window[callback];
      };
      
      var script = document.createElement("script");
      script.setAttribute("src", url);
      script.setAttribute("type", "text/javascript");
      document.body.appendChild(script);
      break;
    default:
      throw "unimplemented datatype for ajax#request"
  }
};

/**
  Ajax#get(options, &block)
*/
function opal_ajax_s_get(ajax, url, options) {
  // console.log("Doing an ajax get");
  return opal_ajax_request(ajax, url, options);
};

/**
  Initialize Ajax class
*/
function Init_Ajax() {
  opal_cAjax = rb_define_class("Ajax", rb_cObject);
  
  rb_define_singleton_method(opal_cAjax, "get", opal_ajax_s_get, 1);
};
// 
//  bootstrap.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-17.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

/*
  Define a ruby file (compiled) by the name, 'name', with the file embedded in a
  string, 'body'.
*/
function opal_define_file(name, body) {
  vn_fs_define_file(name, body);
};

/*
  Main entry point. Rube the given file.
*/
function opal_browser_main(name) {
  ruby_init();
  // init all browser bits and pieces
  opal_browser_init();
  ruby_script("embedded");
  ruby_init_loadpath();
  ruby_incpush("");
  ruby_incpush("vendor/");
  rb_loadpath(name);
};

function opal_browser_init() {
  
  // function to call on window.load
  var win_on_load = function() {
    opal_oDocument.iv_tbl.is_ready = true;
    var a = opal_oDocument.iv_tbl.ready_blocks;
    for (var i = 0; i < a.length; i++) {
      vm_yield(a[i], []);
      // a[i]();
    }
  };
  
  if (window.addEventListener) {
    window.addEventListener('load', win_on_load, false);
  }
  else {
    window.attachEvent('onload', win_on_load);
  }
  
  Init_Browser_Element();
  Init_Browser_Document();
  Init_Browser_Json();
  Init_Ajax();
};
// 
//  browser.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-17.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_oBrowser;


// 
//  document.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_oDocument;

/*
  Document.ready?(&block)
  
  If block given, then add it to array of blocks to run when window/doc loads.
  They are run in order in which they are given;
  
  If no block given, then simply returns true or false depending on whether the
  document das finished loading.
  
  Usage:
  
    Document.ready? do
      puts "I have now finished loading so I can safely do bits 'n bobs."
    end
    
    if Document.ready?
      puts "document is ready"
    end
*/
function opal_document_ready_q(doc, id, _) {
  // var _ = opal_block; opal_block = nil;
  
  if (_ !== nil) { // block_given?
    // if doc is ready, we just execute the code (ready blocks already done)
    if (doc.iv_tbl.is_ready) {
      _();
    }
    else {
      doc.iv_tbl.ready_blocks.push(_);
    }
    
  }
  return doc.iv_tbl.is_ready;
};

function Init_Browser_Document() {
  opal_oDocument = new RObject();
  opal_oDocument.klass = rb_cObject;
  FL_SET(opal_oDocument, T_OBJECT);
  // really need to inherit from Element.. in ready_q, set native to doc.body
  rb_const_set(rb_cObject, "Document", opal_oDocument);
  
  // Ivars
  opal_oDocument.iv_tbl.is_ready = false;
  opal_oDocument.iv_tbl.ready_blocks = [];
  
  rb_define_singleton_method(opal_oDocument, "ready?", opal_document_ready_q,0);
};
// 
//  element.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_cElement;

function opal_element_wrap(wrap) {
  var o = new RObject();
  o.klass = opal_cElement;
  FL_SET(o, T_OBJECT);
  o.native = wrap;
  return o;
};

/*
  Element[:my_div]
  Element.find[:my_div]
  
  Search the dom for the element with the given name, identifier etc.
  
  If a block is given, then it is instance eval'd so that self within the block
  becomes the found element. If no block is given, then the element is simply
  returned.
  
  Usage:
    
    Element[:my_div] do
      # add a div with the title "My Info" as well as the class properties
      div "My Info", :class => "my_title_div"
    end
    
    a = Element.find(:my_div)
    a.div "My Info", :class => "my_title_div"
*/
function opal_element_s_find(cls, id, _, str) {
  var el;
  // First case: empty string, nil, or nothing is passed: return el as it is.
  if (!str || str === nil) return el;
  
  // Second case: a symbol is passed to the method. If :body or :document, then
  // return these relevant items, if not, then simply return doc.getElementById
  // for the symbol string value
  if (str.klass === rb_cSymbol) {
    str = str.ptr;
    
    if (str == "body") {
      el = opal_element_wrap(document.body)
    }
    else if (str == "document") {
      el = opal_oDocument;
    }
    else {
      // console.log("trying " + str);
      var native = document.getElementById(str);
      // console.log(native);
      if (native) el = opal_element_wrap(native);
    }
  }
  else if (str.klass === rb_cString) {
    var native = document.getElementById(str);
    if (native) el = opal_element_wrap(native);
  }
  
  if (el) {
    // we found it..
    if (_ !== nil) {
      // console.log("instance eval element..");
      _.call(_, el);
    }
    return el;
  }
    
  throw "unknown Element#find type"
  
  // return opal_element_wrap(document.getElementById(str));
};

function opal_element_s_body(el) {
  return opal_element_wrap(document.body);
};

function opal_element_on_click(el) {
  var _ = opal_block; opal_block = nil;
  if (_ === nil) throw "Element#on_click no block given."
  
  var func = function(evt) { return vm_yield(_, []); };
  var native = el.native;
  
  if (native.addEventListener) {
    native.addEventListener('click', func, false);
  }
  else {
    native.attachEvent('onclick', func);
  }
};

/**
  Element#css(styles)
  
  Usage:
    // lookup current background color
    element.css :background_color
    => "blue"
    
    // Set given properties for element. Returns self.
    element.css :background_color => "green"
    => element
*/
function opal_element_css(el, id, _, styles) {
  // return self when no style
  if (!styles) return el;
  
  var native = el.native;
  
  if (styles.klass === rb_cHash) {
    // console.log(styles);
    var style = native.style || native;
    for (var i = 0; i < styles.keys.length; i++) {
      var key = styles.keys[i], val = styles.dict[key];
      if (key.klass == rb_cSymbol) key = key.ptr;
      // need to camelcase name : background_color => backgroundColor.
      // console.log("setting " + val + " for " + key);
      native.style[key] = val;
    }
  }
  else {
    // console.log("we are getting individual property");
  }
};

function opal_element_m_missing(el, id, _, sym) {
  var args = Array.prototype.slice.call(arguments, 4);
  var tag_name = sym.ptr;
  var native = el.native;
  var tag = document.createElement(tag_name);
  for (var i = 0; i < args.length; i++) {
    var cur = args[i];
    if (cur === null || cur == undefined) continue;
    if (cur.klass == rb_cString) {
      tag.appendChild(document.createTextNode(cur));
    }
    else if (cur.klass == rb_cHash) {
      if (rb_hash_has_key(cur, "", nil, ID2SYM('class'))) {
        tag.className = rb_hash_aref(cur, "", nil, ID2SYM('class'));
      }
    }
    else {
      throw "bad param type for Element#method_missing (builder)"
    }
  }
  
  native.appendChild(tag);
  return opal_element_wrap(tag);
};

/*
  Element#has_class?('foo')
*/
function opal_element_has_class_q(elm, name) {
  
};

function opal_element_empty(el) {
  var native = el.native;
  while (native.firstChild) { native.removeChild(native.firstChild); }
  return el;
};

function Init_Browser_Element() {
  opal_cElement = rb_define_class("Element", rb_cObject);
  
  rb_define_singleton_method(opal_cElement, "[]", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "find", opal_element_s_find, 1);
  rb_define_singleton_method(opal_cElement, "body", opal_element_s_body, 1);
  
  rb_define_method(opal_cElement, "on_click", opal_element_on_click, 0);
  rb_define_method(opal_cElement, "empty", opal_element_empty, 0);
  
  rb_define_method(opal_cElement, "css", opal_element_css, 0);
  rb_define_method(opal_cElement, "style", opal_element_css, 0);
  
  rb_define_method(opal_cElement, "has_class?", opal_element_has_class_q, 1)
  
  rb_define_method(opal_cElement, "method_missing", opal_element_m_missing, 1);
};
// 
//  json.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

function Init_Browser_Json() {
  
};
// 
//  window.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-17.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_oWindow;

/*
  Window.title
*/
function opal_win_title() {
  return "placeholder win title";
};

/*
  Window.title=(a_title)
*/
function opal_win_title_m(win, title) {
  return window.title = title;
};


function Init_Window() {
  opal_oWindow = new RObject();
  opal_oWindow.klass = rb_cObject;
  FL_SET(opal_oWindow, T_OBJECT);
  
  rb_define_singleton_method(opal_oWindow, "title", opal_win_title, 0);
  rb_define_singleton_method(opal_oWindow, "title=", opal_win_title_m, 0);
};opal_define_file("app/application.rb",function($){var _ = nil;vm_send($,"include",["cherry_kit"],nil,8);vm_defineclass($,nil,"AppController",function($){vm_definemethod($,"application_will_finish_launching",function($,id,_,_a){},0,1);return vm_definemethod($,"application_did_finish_launching",function($,id,_,_a){},0,1);},0);});
opal_define_file("config/boot.rb",function($){var _ = nil;vm_send($,"require",["cherry_kit"],nil,8);});
opal_define_file("config/environment.rb",function($){var _ = nil;vm_send($,"require",[vm_send(vm_getconstant($,"File"),"join",[vm_send(vm_getconstant($,"File"),"dirname",["config/environment.rb"],nil,0),"boot"],nil,0)],nil,8);});
opal_browser_main("config/environment.rb")

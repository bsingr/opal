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
    default: rb_raise(rb_eArgError, "currently unsupported argc length " + len);
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
      default: rb_raise(rb_eArgError, "currently unsupported argc length " + len);
    }
  }
  catch (e) {
    /*
      Capture all LocalJumpErrors
    */
    if (e.klass === rb_eLocalJumpError) {
      // first try and capture all return statements
      if (e.iv_tbl.type === "return") {
        // console.log(id + ": handling return throw with args " + e.iv_tbl.args);
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
    case 1:
      klass = rb_singleton_class(base);
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
  if (is_singleton) {
    return rb_define_method(rb_singleton_class(base), id, body);
  }
  else {
    if (base.flags & T_OBJECT) base = base.klass;
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

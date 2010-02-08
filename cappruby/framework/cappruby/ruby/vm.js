/* 
 * vm.js
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

/**
  This isnt actually a vm. All the functions in here are what are called in the
  output in the compiled ruby. They are more efficient and handle the delecate
  nature of the ruby commands. They adjust the value of self etc to be the right
  object for the right context;
  
  Every method is prepended with cr_ - cappruby.
*/

/**
  Global block. Used for passing blocks around functions. We need this as we
  are not using a stack based runtime. :(
*/
cappruby_block = nil;

/**
  top self context in ruby. All files will be executed with this top self value
  as "self".
*/
cappruby_top_self = nil;

function cr_top_s_to_s(top, sel) {
  return "main";
};

function cr_top_s_include(top, sel) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    rb_include_module(rb_cObject, args[i]);
  }
  return top;
};

/**
  Initialize vm
*/
function Init_VM() {
  cappruby_top_self = class_createInstance(rb_cObject);
  rb_define_singleton_method(cappruby_top_self, "to_s", cr_top_s_to_s, 0);
  rb_define_singleton_method(cappruby_top_self, "include:",cr_top_s_include, 0);
};

/**
  defineclass
  
  FIXME: this should really include arity as well.. number or array for complex
*/
cr_a = function cr_defineclass(base, super_class, name, body, flag) {
  var klass;
  
  // cheap hack.. it isnt a class, its an object (i.e. top self)
  if (!base.info) {
    base = rb_class_real(base.isa);
  }
  
  switch (flag) {
    // case 0 - define normal class
    case 0:
      if (super_class == nil) super_class = CPObject;
      klass = rb_define_class_under(base, name, super_class);
      body(klass);
      break;
    // case 2 - define module
    case 2:
      klass = rb_define_module_under(base, name);
      body(klass);
      break;
    default:
      throw "unknwon defineclass type"
  }
  return klass;
};

/**
  definemethod
*/
cr_b = function cr_definemethod(base, id, body, is_singleton) {
  // var m = new cappruby_method_t(id, body, []);
  // arity? hmm, maybe..
  if (is_singleton) {
    // throw "cr_b: singleton method not uet implemented"
    rb_define_singleton_method(base, id, body, -1);
  }
  else {
    // arity?
    rb_define_method(base, id, body, -1);
    // base.method_list.push(m);
    // base.method_dtable[id] = m;
    // m.method_imp.displayName = base.name + "#" + id;
  }
};

/**
  send
  
  op_flag can be used to detect private calls etc
*/
cr_b = function cr_send(recv, id, argv, blockiseq, op_flag) {
  var imp, klass;
  // console.log(id);
  // make sure we have a reciever and a class. JSON objects, Rects etc will not
  // have a ".isa" property. In which case, find one for it.
  if (recv === nil || recv === undefined) {
    klass = rb_cNilClass;
  }
  else if (!recv.isa) {
    klass = rb_find_class_for_obj(recv);
  }
  else {
    klass = recv.isa;
  }
  
  imp = rb_search_method(klass, id);
  // if we could not find it, try it with/without a colon on the end
  if (!imp) {
    if (id[id.length -1] == ":") {
      // already has a colon.. so remove it and try
      console.log("could try this");
    }
    else {
      // doesnt have a colon, so add one and try..
      imp = rb_search_method(klass, id + ":");
    }
  }
  
  if (!imp) {
    throw "method missing: " + recv.isa.name + "#" + id + "("+argv.join(",") +")"
  }
  
  // setup block - might be undefined, nil or null..
  if (blockiseq != nil) cappruby_block = blockiseq;
  
  // do actual send message
  try {
    switch (argv.length) {
      case 0: return imp(recv, id);
      case 1: return imp(recv, id, argv[0]);
      case 2: return imp(recv, id, argv[0], argv[1]);
      case 3: return imp(recv, id, argv[0], argv[1], argv[2]);
      case 4: return imp(recv, id, argv[0], argv[1], argv[2], argv[3]);
      case 5: return imp(recv, id, argv[0], argv[1], argv[2], argv[3], argv[4]);
      case 6: return imp(recv, id, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5]);
      default: throw "currently too many args: " + argv.length + " for " + id
    }
  }
  catch (e) {
    if (e.type === "break") {
      return e.args;
    }
    else {
      throw e
    }
  }
};

/**
  getconstant
*/
cr_c = function cr_getconstant(base, id) {
  // if base is an object, then use its class (base.isa)
  if (base.isa.info & CLS_CLASS) base = base.isa;
  return rb_const_get(base, id);
};

/**
  functioncall
*/
cr_d = function cr_functioncall(id, argv) {
  var m = rb_global_functions_search(id);
  if (m === nil) {
    throw "functioncall: cannot find " + id
  }
  return m.apply(this, argv);
};

/**
  newhash
*/
cr_e = function cr_newhash() {
  return rb_hash_new.apply(rb_hash_new, arguments);
};

/**
  invokesuper
*/
cr_f = function cr_invokesuper(recv, sel) {
  var super_class = recv.isa.super_class;
  var args = Array.prototype.slice.call(arguments);
  args[0] = { receiver: recv, super_class: super_class };
  return objj_msgSendSuper.apply(recv, args);
};

/**
  optplus
*/
cr_g = function cr_optplus(a, b) {
  if (a.isa === CPNumber && b.isa === CPNumber) {
    return a + b;
  }
  return cr_send(a, '+', [b], nil, 0);
};

/**
  optminus
*/
cr_h = function cr_optminus(a, b) {
  if (a.isa === CPNumber && b.isa === CPNumber) {
    return a - b;
  }
  return cr_send(a, '-', [b], nil, 0);
};

/**
  optmult
*/
cr_i = function cr_optmult(a, b) {
  if (a.isa === CPNumber && b.isa === CPNumber) {
    return a * b;
  }
  return cr_send(a, '*', [b], nil, 0);
};

/**
  optdiv
*/
cr_j = function cr_optdiv(a, b) {
  if (a.isa === CPNumber && b.isa === CPNumber) {
    return a / b;
  }
  return cr_send(a, '/', [b], nil, 0);
};

/**
  break - all args in arguments
*/
vm_h = function vm_break() {
  throw {
    type: 'break',
    args: Array.prototype.slice.call(arguments),
    toString: function() { return "LocalJumpError: unexpected break" }
  };
};

/**
  yield a block
  
  argv in array
  
  need to wrap in a try block. return/break etc from block/yield is different
  from a proc. if we are a proc, then we need to catch breaks/returns... this
  might/should be done in proc#call ?
*/
cr_y = function cr_yield(block, argv) {
  if (block == nil) throw "no block given..."
  return block.apply(block, argv);
};

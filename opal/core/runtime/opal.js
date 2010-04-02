/* 
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

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
	  for (var i = 0; i< this.length; i++) {
	    if (this[i] == obj) return i;
	  }
	  return -1;
	};
};

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };


var rb_cString, rb_cSymbol;

var RSymbol = function(ptr) {
  this.hash = opal_yield_hash();
  this.flags = T_OBJECT | T_SYMBOL;
  this.klass = rb_cSymbol ;
  this.toString = function() {
    return "#<Symbol:0x000000 @ptr=\"" + this.ptr + "\">";
  };
  this.ptr = ptr;
  return this;
};

var rb_sym_table = { };

function ID2SYM(id) {
 if (rb_sym_table.hasOwnProperty(id)) {
   return rb_sym_table[id];
 }
 var sym = new RSymbol(id);
 rb_sym_table[id] = sym
 return sym;
};

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


// function require() {
  
// };

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

function opal_http_request_new() {
  try {
    return new XMLHttpRequest();
  } catch (e) {
    try { 
      return new ActiveXObject('MSXML2.XMLHTTP');
    } catch (e) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }    
  }
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

/**
  Handle ruby script tags for inline code
*/
if (document && document.getElementsByTagName) {
  var processRuby = function() {
    var tag, tags = document.getElementsByTagName('script');
    console.log("==== inline tags:");
    for (var i = 0; i < tags.length; i++) {
      tag = tags[i];
      if (tag.type === 'text/ruby' && !tag.getAttribute('data-src')) {
        console.log(tag);
      }
    }
  };
  if (window.addEventListener) {
    window.addEventListener('load', processRuby, false);
  }
  else {
    window.attachEvent('onload', processRuby);
  }
}

/**
  Handle ruby script tags for external code (data-src='...').
  This will only work for tags defined before opal
*/
setTimeout(function() {
  // first get ruby 'running' - initialze runtime, load boot files etc.
  opal_init();
  // return;
  // find all tags that might contain external ruby, and load/parse/run them
  var tag, tags = document.getElementsByTagName('script');
  console.log("==== external tags:");
  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];
    if (tag.type === 'text/ruby' && tag.getAttribute('data-src')) {
      // tag is valid, so AJAX get the ruby file, parse and run it.
      var r = opal_http_request_new();
      var filename = tag.getAttribute('data-src');
      r.open('GET', tag.getAttribute('data-src'), true);
      r.onreadystatechange = function() {
        if (r.readyState == 4) {
          // console.log(r.responseText);
          opal_eval(r.responseText, opal_top_self, filename);
        }
      };
      r.send(null);
    }
  }
}, 0);

/**
  Evaluate the given rubyCode in the selfContext. This will most commonly be
  "top self"
*/
function opal_eval(rubyCode, selfContext, filename) {
  var parser = new OpalRubyParser(rubyCode, filename);
  var result = parser.parse();
  console.log("Parser result for " + filename + ":");
  console.log(result);
  if (window.execScript) {
     window.execScript("window.opal_tmp_func = " + result + ";");
     return window.opal_tmp_func(selfContext);
   }
   else {
     with (window) {
       return eval("(" + result + ")")(selfContext);
     }
   }
};

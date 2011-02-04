

/**
  Opal for the browser just contains the runtime in this file. This is the basic
  minimal runtime that is required to run an opal application. To do in browser
  development, opal_dev.js is also required, but is built seperately to minimize
  download size for the essential runtime files.
*/

// Top level Opal object available for us to use
if (typeof Opal == 'undefined')
  Opal = {};

(function(global, exports) {

// print function to make available to runtime
var print = function() {
  if (typeof console != 'undefined' && console.log) {
    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
  }
};

/**
  Document ready listener can take callbacks that are fired when the document
  and/or window is ready to run (all DOM content loaded). If already loaded,
  the callback is just called immediately.
*/
function browser_register_ready_listener(callback) {
  if (browser_is_ready) return callback();

  (function() {
    // w3c - chrome, safari, ff etc
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", callback, false);
    }

    // IE
    (function() {
      try {
        document.documentElement.doScroll('left');
      } catch (e) {
        setTimeout(arguments.callee, 0);
        return;
      }
      callback();
    })
  })();
}

/**
  Register run commands from a js file. These will be used to run the opal
  "program". If this is called, then path 1 (below) will take effect, otherwise
  path 2 will (load script tags etc).
  
  cwd is basically which gem do we pretend we are in the working directory of
  
  program_name is a bin name, e.g. "ospec".
*/
exports.run_opal = function(cwd, program_name) {
  print("running program: " + program_name);
  OPAL_RUN_DIR = cwd;
  OPAL_RUN_BIN = program_name;
}

/**
  Same as above but run a lib instead (no gems defined)
*/
exports.run_lib = function() {};

var load_paths = [];

var OPAL_RUN_DIR = null;
var OPAL_RUN_BIN = null;

/**
  For use with above, keep tracks if we are ready yet.
*/
var browser_is_ready = false;

/**
  default behaviour is to just mark browser_is_ready as true
*/
browser_register_ready_listener(function() {
  browser_is_ready = true;
});

/**
  Main Boot order and sequence
  ============================
  
  There are two ways that opal in the browser works/operates.
  
  1. Run prebuilt code (Deployment)
  =================================
  
  Opalite can be used to prebuild ruby into packages that take the opalite
  format. These are generated from gemspecs.
  
  2. Run code within browser (Development)
  ========================================
  
  Run code from script tags within the browser. Requires opal_dev.js
  
  
  Basically, if Opal.run() is called at any point before this callback is
  triggered, then the first path is taken. Otherwise, script tags are loaded
  and run. Opalite server can be used for automatic package building for step
  1 to avoid manual recompilation between steps.
*/
browser_register_ready_listener(function() {

});

//browser_register_ready_listener(function() {
//    
//    // hardcoded for now:
//    OPAL_RUN_DIR = "browser";
//    
//    var bin_file = OPAL_RUN_BIN;
//    var argv = [];
//    
//    var href_uri = window.location.href;
//    var page_uri = OpalURI.parse(href_uri);
//    var page_dir = rb_file_dirname(page_uri.path);
//
//    // file system paths
//    FS_PAGE_URI = page_uri;
//    FS_OPALS_PATH = rb_file_join(page_dir, "opals");
//    FS_LIB_PATH = rb_file_join(page_dir, "lib");
//    FS_CWD = rb_file_join(FS_OPALS_PATH, OPAL_RUN_DIR);
//    
//    // go through all registered opals and "boot" them
//    for (var i = 0; i < FS_REGISTERED_OPALS.length; i++) {
//      print("registering: " + FS_REGISTERED_OPALS[i].name);
//      
//      var opal_spec = FS_REGISTERED_OPALS[i];
//      var opal_path = rb_file_join(FS_OPALS_PATH, opal_spec.name);
//      // all files
//      for (var opal_file in opal_spec.files) {
//        var file_path = rb_file_join(opal_path, opal_file);
//        FS_FILES[file_path] = opal_spec.files[opal_file];
//      }
//      // executables
//      if (opal_spec.executables) {
//        for (var j = 0; j < opal_spec.executables.length; j++) {
//          var bin_file = opal_spec.executables[j];
//          FS_BIN_FILES[bin_file] = rb_file_join(opal_path, "bin", bin_file);
//        }
//      }
//      
//      // lib path
//      load_paths.push(rb_file_join(opal_path, 'lib'));
//      print("---- " + rb_file_join(opal_path, 'lib'));
//    }
//
//    // replace ruby loader
//    extensions[".rb"] = fs_replaced_ruby_loader;
//    
//    // replace our file glob function
//    file_glob = browser_file_glob;
//    
//    // argv 0 is simply opal..
//    argv[0] = "opal";
//    // replace bin file with its full path
//    argv[1] = FS_BIN_FILES[bin_file];
//    
//    // actual arguments we get from hash:
//    var hash_args = window.location.hash.substr(1).split("&");
//    
//    for (var i = 0; i < hash_args.length; i++) {
//      // decide uri?
//      argv.push(hash_args[i]);
//    }
//    
//    exports.argv = argv;
//    
//    exports.opal_lib_path = FS_LIB_PATH;
//    
//  if (OPAL_RUN_BIN) { // path 1  
//    exports.main();
//  }
//  else { // path 2
//    exports.init();
//    browser_run_ruby_tags();
//  }
//});

// this should be moved over to opalite?! or opal_dev????
//function browser_run_ruby_tags() {
//  // init ruby
//  exports.init();
//  var tags = document.getElementsByTagName('script'), tag;

//  for (var i = 0; i < tags.length; i++) {
//    tag = tags[i];

//    if (tag.type == "text/ruby") {
      // src property - Ajax load file, then run it
//      if (tag.src) {

//      }
      // just run the inner content
//      else {
//        print("run content:");
//        print(tag.innerHTML);
//        rb_run(function() {
//          var res = exports.compile(tag.innerHTML);
//          print(res);
//          var func = new Function('self', '__FILE__', res);
//          func.call(rb_top_self);
//          //func(rb_top_self, "");
//        });
//      }
//    }
//  }
//}

function io_puts(str) {
  print(str);
}


/**
  Platform
*/
var opal_ruby_platform = "browser-opal";


/**
  Import just core runtime (and header)
*/
/*
  Browser specific
*/
/*
  Set a local variable __block__ to either Qnil or the block. Here basically we
  check if the block was intended for us, and then set it to Qnil regardless.
*/
/*
  If no block was given, return an enumerator. This automatically calls 
  USES_BLOCK, so manually calling that is not neceessary.
*/
/*
  Yields the block. This assumes the block is stored locally as __block__, as it
  will be set using USES_BLOCK
*/
/*
  Like above, but yield using the given self:
*/
/*
  Evaluates to true or false whether a block was given or not. again, relies on
  a variable named __block__ which is given by USES_BLOCK
*/
/*
  Simply call a method on the receiver. Method MUST exist
*/
/*
 * try calling method that might not exist - supports method_missing
 */
/**
	Ensure that the args given to a js function exactly equals the given count.
*/
/**
	Ensure that the args given to a js function is atleast the given num
*/
/*
  For loops in JS that take the place of while loops in ruby, we need to 
  capture all the break, next and return throws and deal with them appropriately
*/
/*
  Keywords:
    0 (return) -
    1 (return) - 
    2 (break)  - simply return the break value back to the method it was called
                 from.
    3 (next)   - 
*/
/**
  All files needed for the runtime (platform independant)
*/
// core runtime files
// Boot a base class (only use for very core object classes)
var boot_defclass = function(id, super_klass) {
  var result = rb_class_boot(super_klass);
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
};
// Like boot_defclass, but for root object only (i.e. basicobject)
var boot_defrootclass = function(id) {
  var result = new RClass(null, null);
  // FIXME: set flags - do we need this. already done for us?
  result.$flags = 1;
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
}
// Create a new subclass of the given superclass. We do not name it yet.
var rb_class_boot = function(super_class) {
  // print("rb_class_boot with: " + super_class);
  if (super_class) {
    var ctor = function() {};
    ctor.prototype = super_class.constructor.prototype;
    var result = function() {
       RClass.call(this, null, super_class); return this;
    };
    result.prototype = new ctor();
    var klass = new result();
    klass.$klass = rb_cClass;
    return klass;
  }
  else {
    var result = new RClass(null, null);
    return result;
  }
};
// @global
rb_class_real = function(klass) {
  while (klass.$flags & 4112) klass = klass.$super;
  return klass;
};
// Name the class with the given id.
var rb_name_class = function(klass, id) {
  klass['__classid__'] = id;
  //rb_ivar_set(klass, '__classid__', id);
};
// make metaclass for the given class
var rb_make_metaclass = function(klass, super_class) {
  // print("making metaclass for " + klass.__classid__);
  // if klass is a class, and it is a singleton..
  if ((klass.$flags & 1) && (klass.$flags & 4112)) {
    // console.log("ok");
    // throw "need to implement in rb_make_metaclass"
    return make_metametaclass(klass);
  }
  else {
    // our meta is a 'subclass' of the superclass
    var meta = rb_class_boot(super_class);
    // meta is now also a singleton (as well as class)
    meta.$flags |= 4112;
    // the class of a class is its meta
    klass.$klass = meta;
    // fix method table
    klass.$m = meta.$m_tbl;
    // fix const table
    meta.$c = klass.$c;
    // attach the meta to the klass (so we can refer to it later)
    rb_singleton_class_attached(meta, klass);
    return meta;
  }
};
var rb_singleton_class_attached = function(klass, obj) {
  // make sure klass is a singleton
  if (klass.$flags & 4112) {
    // console.log("setting attacjed..");
    rb_ivar_set(klass, '__attached__', obj);
  }
};
var make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;
  if (metaclass.$klass == metaclass) {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metametaclass;
  }
  else {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metaclass.$klass.$klass == metaclass.$klass ?
    make_metametaclass(metaclass.$klass) :
    metaclass.$klass.$klass;
  }
  metametaclass.$flags |= 4112;
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.$klass = metametaclass;
  metaclass.$m = metametaclass.$m_tbl;
  super_of_metaclass = metaclass.$super;
  // while (super_of_metaclass)
  metametaclass.$super = rb_ivar_get(super_of_metaclass.$klass, '__attached__')
    == super_of_metaclass
    ? super_of_metaclass.$klass
    : make_metametaclass(super_of_metaclass);
return metametaclass;
};
// 
var boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};
// define toll free bridged class
// @local
var rb_define_toll_free_class = function(prototype, flags, id, super_klass) {
  var klass = rb_define_class(id, super_klass);
  prototype.$klass = klass;
  prototype.$m = klass.$m_tbl;
  prototype.$flags = flags;
  prototype.$r = true;
  prototype.$M = RClass.prototype.$M;
  prototype.$B = RClass.prototype.$B;
  prototype.$Y = opalsym;
  // default hashing behaviour
  prototype.$hash = function() {
    // return '$$' + this + '$$';
  return flags + '_' + this;
  };
  return klass;
};
// define a new class (normal way), with the given id and superclass. Will be
// top level.
rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_cObject, id, super_klass);
};
var rb_define_class_under = function(base, id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return the existing class
  if (rb_const_defined(base, id)) {
    // print("already defined..");
    // console.log(id + " alreayd defined");
    // check its a class?
    return rb_const_get(base, id);
  }
  // console.log(super_klass.constructor);
  klass = rb_define_class_id(id, super_klass);
  rb_name_class(klass, id);
  rb_const_set(base, id, klass);
  // if (klass !== rb_object)
  klass.$parent = base;
  // rb_class_inherited(super_klass, klass);
  return klass;
};
// Actually create class
var rb_define_class_id = function(id, super_klass) {
  var klass;
  if (!super_klass)
    super_klass = rb_cObject;
    // console.log("A");
  klass = rb_class_create(super_klass);
  rb_name_class(klass, id);
  // console.log("B " + id);
  rb_make_metaclass(klass, super_klass.$klass);
  return klass;
};
var rb_class_create = function(super_klass) {
  // check inheritable
  // check not rb_class .. error
  return rb_class_boot(super_klass);
};
// get singleton class of obj
var rb_singleton_class = function(obj) {
  var obj;
  // print('finding singleton class for ' + obj.__classid__);
  // console.log("checking for id: " + obj.$h);
  if (obj == rb_cObject) {
    // console.log("right. cchecking rb_cObject");
  }
  // check if number, string etc.. and throw error?
  if ((obj.$klass.$flags & 4112)&& rb_ivar_get(obj.$klass, '__attached__') == obj) {
    // console.log("returning on attacked");
    // print("returning on attached");
    // for (var prop in obj.$k) {print (prop); print(obj.$k[prop]);}
    klass = obj.$klass;
  }
  else {
    var class_id = rb_ivar_get(obj.$klass, '__classid__');
    klass = rb_make_metaclass(obj, obj.$klass);
    // obj
    // klass = obj.$k;
  }
  return klass;
};
// define a top level module with the given id
rb_define_module = function(id) {
  return rb_define_module_under(rb_cObject, id);
};
var rb_define_module_under = function(base, id) {
  var module;
  // print("defining module " + id);
  // if module already exists..
  if (rb_const_defined(base, id)) {
    // print("already defined");
    // make sure it is a module, otherwise error (trying to change class)
    module = rb_const_get(base, id);
    if (module.$flags & 2) {
      return module;
    }
    throw id + " is not a module."
  }
  module = rb_define_module_id(id);
  rb_const_set(base, id, module);
  module.$parent = base;
  return module;
};
var rb_define_module_id = function(id) {
  var module = rb_define_class_id(id, rb_cModule);
  module.$flags = 2;
  rb_name_class(module, id);
  return module;
};
var rb_mod_create = function() {
  // return // rb_define_class_id()
  return rb_class_boot(rb_cModule);
};
var rb_include_module = function(klass, module) {
  // print("YEAH");
  // console.log("including " + module.$i.__classid__);
  // make sure our klass has the included modules array
  if (!klass.$included_modules)
    klass.$included_modules = [];
  // if we already have the module included, just return
  if (klass.$included_modules.indexOf(module) != -1)
    return;
  // make a note of the included module
  klass.$included_modules.push(module);
  // make a note in module that its been included in here? yes we do.
  // print("do we have included_in");
  if (!module.$included_in) {
    // print ("adding inclided in");
    module.$included_in = [];
  }
  // print("are we kernel?");
  // print(rb_mKernel.$h);
  // print(module.$h);
  module.$included_in.push(klass);
  // print(rb_mKernel.$included_in);
  // print(module.method_table);
  for (var method in module.$method_table) {
    // already potentially wrapped, so use define_raw
    rb_define_method_raw(klass, method.substr(1), module.$method_table[method]);
    // print("adding method: " + method);
    // check to make sure we are not overriding? if so, add it to the superclass
    // of klass.
    // klass.$m_prototype_tbl[method] = module.$method_table[method];
 // delted...
  // rb_define_method(klass, method.substr(1), module.$method_table[method]);
  // replaces
    // klass.$m_prototype_tbl[method] = module.$method_table[method];
    // klass.$method_table[method] = module.$method_table[method];
  // $method_table['$' + name] = body;
  }
};
var rb_extend_module = function(klass, module) {
  if (!klass.$extended_modules)
    klass.$extended_modules = [];
  if (klass.$extended_modules.indexOf(module) != -1)
    return;
  klass.$extended_modules.push(module);
  if (!module.$extended_in)
    module.$extended_in = [];
  module.$extended_in.push(klass);
  // for (var prop in klass.$k) {
    // print(prop);
    // print(klass.$k[prop]);
  // }
  for (var method in module.$method_table) {
    // klass.$klass.$m_prototype_tbl[method] = module.$method_table[method];
    rb_define_method_raw(klass.$klass, method.substr(1),
      module.$method_table[method]);
  }
};
//
// DEBUG MODE IS DEPRECEATED!!!!!!!!!!!!!!!!
//
/**
	Debug stack is used as a stack of all method calls. Wrapper methods push the
	method onto the stack, and then pop it off once it has returned. This will be
	an empty array for non debug environments (no backtrace available..).
	
	Items on the stack will be an array:
	  
	  [body, arguments]
	  
	For now arguments will also include the receiver (incase it is needed)
*/
debug_stack = []; // need to make local var once finished writing.
/**
	Push the method body onto the stack. This should be the actual method, not the
	wrapper "fake" method. Returns an index of the current stack (so the method
	knows where it needs to pop to)
*/
function debug_stack_push(body) {
 var idx = debug_stack.length;
 debug_stack.push(body);
 return idx;
}
/**
	Pop the stack. Here, an index is given to pop to, which MUST be the same index
	returned by debug_stack_push. This allows for correct handling of throw/raise.
*/
function debug_stack_pop(idx) {
 debug_stack.splice(idx, debug_stack.length);
 return idx;
}
/**
  Print backtrace. The given array of items from the stack need to be printed to
  the console.
*/
function debug_print_backtrace(items) {
  var item, line = "";
  for (var i = items.length - 1; i >= 0; i--) {
    item = items[i];
    line = "\tfrom " + item[0].displayName;
    // args.. 
    // filename + linenumber.
    if (item[0].displayFileName)
      line += " at " + item[0].displayFileName;
    print(line);
  }
}
/**
	Replacement method for rb_define_method. This will call the original after 
	some modifications. A wrapper is essentially placed around every method which
	logs when a method is called, and when it is left.
*/
function debug_define_method(klass, name, body, filename, lineno) {
  // print("Debug define method.");
 var args = Array.prototype.slice.call(arguments);
 // wrapper function used to log actual calls
 var wrapper = function() {
    // arguments we need to forward on to body
    var args = Array.prototype.slice.call(arguments);
  // stack index
  var idx = debug_stack_push([body]);
  // result from method call
  var res = body.apply(null, args);
  // pop stack
  debug_stack_pop(idx);
  // finally return our result
  return res;
 };
 // wrapper needs to be able to reference original (for rb_super etc)
 wrapper.$wrapped = body;
 // displayName for debugger and "pretty printing". Also, do not do it on 
  // methods that have already have it set on (rb_alias_method etc).
 if (!body.displayName) {
    body.displayName = rb_class_real(klass).__classid__ + '#' + name;
    body.displayFileName = filename;
  }
 // replace body in args with our wraper
 args[2] = wrapper;
 return debug_original_define_method.apply(null, args);
}
/**
	Where to save the original rb_define_method
*/
var debug_original_define_method;
/**
	Replacement method for rb_block_call. Here we need to correct the
	rb_block_func variable to point to the .$wrapped function instead of the outer
	wrapping function. The $wrapped function always checks itself against this var
	to ensure it is correctly getting the block (make sure the block was not given 
	to someone else)
*/
function debug_block_call(block, self, mid) {
  // print("calling block for " + mid);
  // print("block is: " + block.$m.$inspect(block));
 rb_block_proc = block;
 var func = self.$m['$' + mid];
 if (func) {
  // method exists..
  rb_block_func = func.$wrapped;
    // print("SETTING rb_block_func to " + rb_block_func);
  return func.apply(null, Array.prototype.slice.call(arguments, 1));
 } else {
  // method_missing
  func = self.$m['$method_missing'];
  rb_raise(rb_eRuntimeError,
    "need to forward rb_block_call to method missing");
 }
}
/**
	Initialize debug mode. This MUST be called before any Init'ing takes place as
	methods defined before this is called will not have their calls pushed into 
	the stack.
*/
function Init_Debug_Mode() {
 print("Initializing debug mode.");
 // rb_define_method
 debug_original_define_method = rb_define_method;
 rb_define_method = debug_define_method;
 // rb_block_call
 var original_block_call = rb_block_call;
 global.rb_block_call = rb_block_call = debug_block_call;
}
// core classes/objects/modules
// Root Types/Flags
// Core boot classes
rb_cBasicObject = null,
    rb_cObject = null,
    rb_cModule = null,
    rb_cClass = null;
// Other core classes/modules
rb_mKernel = null;
  var rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
  rb_cFile;
// @global Top self context within ruby 
rb_top_self = null;
// some top level objects
Qnil = null;
Qfalse = null;
Qtrue = null;
function mod_name(mod, mid) {
 return rb_ivar_get(mod, "__classid__");
}
function mod_eqq(mod, obj) {
 return obj_is_kind_of(obj, mod);
}
function mod_define_method(mod, mid) {
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil;
 if (!(__block__ != Qnil))
  rb_raise(rb_eLocalJumpError, "no block given");
 rb_define_method(mod, mid.$m["to_s"](mid), __block__);
  return Qnil;
}
function mod_attr_accessor(mod) {
 mod_attr_reader.apply(null, arguments);
 mod_attr_writer.apply(null, arguments);
 return Qnil;
}
function mod_attr_reader(mod) {
 var attribute = null,
   attributes = Array.prototype.slice.call(arguments, 1);
 for (var i = 0; i < attributes.length; i++) {
  var attribute = attributes[i];
  var mid = rb_call(attribute, "to_s");
    // print("defining for: " + mid);
  rb_define_method(mod, mid,
    new Function('self', 'return rb_ivar_get(self, "@' + mid + '");'));
 }
 return Qnil;
}
function mod_attr_writer(mod) {
 var attribute = null,
   attributes = Array.prototype.slice.call(arguments, 1);
 for (var i = 0; i < attributes.length; i++) {
  var attribute = attributes[i];
  var mid = attribute.$m["to_s"](attribute);
  rb_define_method(mod, mid + "=", new Function('self', 'val',
    'return rb_ivar_set(self, "@' + mid + '", val);'));
    // rb_define_method(mod, mid + "=", function(self, val) {
      // return rb_ivar_set(self, "@" + mid, val);
    // });
 }
 return Qnil;
}
function mod_alias_method(mod, new_name, old_name) {
 new_name = rb_call(new_name, "to_s");
 old_name = rb_call(old_name, "to_s");
  // method might be wrapped, so use raw.
 rb_define_method_raw(mod, new_name, mod.$m_tbl[old_name]);
 return mod;
}
function mod_to_s(mod, mid) {
 return rb_ivar_get(mod, "__classid__");
}
function mod_const_set(mod, id, value) {
 return rb_vm_cs(mod, id.$m["to_s"](id), value);
}
function mod_class_eval(mod, mid, string, filename, lineno) {
  // print("global block is: " + rb_block_proc);
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil;
  // print("block is: " + __block__.$m.$inspect(__block__));
 if (!(__block__ != Qnil)) {
  var code = exports.compile(string);
   var func = new Function('self', '__FILE__', code);
   return func(mod, rb_expand_path(filename));
 } else {
  return __block__(mod, __block__.$mid);
 }
}
function mod_private(mod, mid) {
 return mod;
}
function mod_public(mod, mid) {
 return mod;
}
function mod_protected(mod, mid) {
 return mod;
}
function mod_include(cla, mod) {
 rb_include_module(cla, mod);
  return Qnil;
}
function mod_extend(cla, mod) {
 rb_extend_module(cla, mod);
 return Qnil;
}
function class_s_new(clas, sup) {
 var klass = rb_define_class_id("AnonClass", sup || rb_cObject);
 return klass;
};
function class_new_instance(cla) {
 var obj = cla.$m.$allocate(cla, Qnil);
 var args = Array.prototype.slice.call(arguments);
 args[0] = obj;
 // if given a block, we need to reroute it to initialize
  if (rb_block_func == arguments.callee) {
    obj.$B.apply(obj, ['initialize', rb_block_proc].concat(
      Array.prototype.slice.call(arguments, 1)));
  } else {
    obj.$m.$initialize.apply(null, args);
  }
  return obj;
};
function class_initialize(cla, mid, sup) {
 // print("in Class.new initialize");
 var klass = rb_define_class_id('', sup || rb_cObject);
 return klass;
}
function class_superclass(cla, mid) {
 var sup = cla.$super;
 if (!sup) {
  if (cla == rb_cBasicObject) return Qnil;
  rb_raise(rb_eRuntimeError, "uninitialized class");
 }
 return sup;
}
function false_to_s() {
 return "false";
}
function false_and(self, mid, other) {
 return Qfalse;
}
function false_or(self, mid, other) {
 return other.$r ? Qtrue : Qfalse;
}
function false_xor(self, mid, other) {
 return other.$r ? Qtrue : Qfalse;
}
function true_to_s() {
 return "true";
}
function true_and(self, mid, other) {
 return other.$r ? Qtrue : Qfalse;
}
function true_or() {
 return Qtrue;
}
function true_xor(self, mid, other) {
 return other.$r ? Qfalse : Qtrue;
}
function rb_true() {
 return Qtrue;
}
function rb_false() {
 return Qfalse;
}
function nil_to_i() {
 return 0;
}
function nil_to_f() {
 return 0.0;
}
function nil_to_s() {
 return "";
}
function nil_to_a() {
 return [];
}
function nil_inspect() {
 return "nil";
}
/**
	Repeatedly executes the block.

	@note Method does not return an enumerator if no block given(yet).

	@example
	  loop do
	    puts "this will infinetly print"
	  end

	@param [Proc] block
	@return [Object] returns the receiver
*/
function obj_loop(obj, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); };
 if (!(__block__ != Qnil)(block))
  rb_raise(rb_eLocalJumpError, "no block given");
 while (true) {
  try {
  BLOCK_CALL(block);
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return obj;
}
/**
	Simple equivalent to `Proc.new`. Returns a {Proc} instance.

	@example
	  proc { puts "a" }
	  # => #<Proc 0x2828283>

	@param [Proc] block
	@return [Proc]
*/
function obj_proc(obj, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil;
 if (!(__block__ != Qnil))
  rb_raise(rb_eArgError, "block required");
 return __block__;
}
/**
	Prints each argument in turn to the browser console. Currently there is no
	use of `$stdout`, so it is hardcoded into this method to write to the 
	console directly.

	@param [Object] args objects to print using `inspect`
	@return [nil]
*/
function obj_puts(ob) {
 var args = Array.prototype.slice.call(arguments, 1);
 for (var i = 0; i < args.length; i++) {
  console.log(args[i].$m["to_s"](args[i]));
 }
 return Qnil;
}
/**
  Try to load the library or file named `require_path`. Causes an error to be
  thrown if required path cannot be found.

  For in browser async loading, only use string paths. String paths must use 
  their base package name as well (e.g. 'cherry_kit/views/view'). Non string
  names will and cannot be async loaded. (for example, File.join... etc will
  not be async loaded

  @param [String] require_path
  @return [Boolean] success
*/
function obj_require(obj, path) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  return rb_require(path);
}
/**
	Raises an exception. If given a {String} argument, this method will raise a
	{RuntimeError} with the given `string` as a message. Otherwise, if the first
	parameter is a subclass of {Exception}, then the method will raise a new 
	instance of the given `exception` class with the `string` as a method, if it
	exists, or a default message otherwise`

	@example String message
	  raise "some error"
	  # => RuntimeError: some error

	@example Exception subclass
	  raise StandardError, "something went wrong"
	  # => StandardError: something went wrong

	@param [Exception, String] exception exception class or string to throw
	@param [String] string to pass as message for exception
	@return [nil]
*/
function obj_raise(obj, exception, string) {
 //ARG___MIN(1)
 var msg = Qnil, exc;
 if ((exception.$flags & 16)) {
  msg = exception;
  exc = rb_eRuntimeError.$m["new"](rb_eRuntimeError, msg);
 } else if (obj_is_kind_of(exception, "kind_of?", rb_eException)) {
  exc = exception;
 } else {
  if (string != undefined)
   msg = string;
  exc = exception.$m["new"](exception, msg);
 }
  //console.log("ready to raise:");
//console.log(exc);  
 rb_vm_raise(exc);
}
function obj_instance_variable_defined_p(obj, mid, name) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(name.$flags & 16)) { name = to_str(name); }
 return rb_ivar_defined(obj, name) ? Qtrue : Qfalse;
}
function obj_instance_variable_get(obj, mid, name) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(name.$flags & 16)) { name = to_str(name); }
 return rb_ivar_get(obj, name);
}
function obj_instance_variable_set(obj, mid, name, value) {
 if ((arguments.length - 1) != 2) { print(arguments.callee); rb_arg_error(arguments.length, 2); }
 if (!(name.$flags & 16)) { name = to_str(name); }
 return rb_ivar_set(obj, name, value);
}
/**
	Returns `true` if `yield` would execute a block in the current context, 
	`false` otherwise. 

	@note In Opal this is kind of a fake method. The compiler treats 
	`block_given?` as a keyword to make its use easier to deal with in 
	javascript (keep things nice and efficient). Its use is the same to the end
	programmer, apart from it should not be overriden - it is never actually
	called.

	@return [Boolean] was a block given
*/
function obj_block_given_p() {
 return Qfalse;
}
function obj_method_missing(obj, mid, sym) {
 if ((arguments.length - 2) < 1) { print(arguments.callee); rb_arg_error(arguments.length - 2, 1); }
 if (!(sym.$flags & 16)) { sym = to_str(sym); }
 var str = "undefined method `" + sym + "` for " + rb_call(obj, "inspect");
 rb_raise(rb_eNoMethodError, str);
}
function obj_to_a(obj, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return [obj];
}
function obj_tap(obj, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 if (!(__block__ != Qnil)(block))
  rb_raise(rb_eLocalJumpError, "no block given");
 BLOCK_CALL(block, obj);
 return obj;
}
function obj_is_kind_of(obj, klass) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 var search = obj.$klass;
 while (search) {
  if (search == klass)
   return Qtrue;
  search = search.$super;
 }
 return Qfalse;
}
function obj_nil_p(obj) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return Qfalse;
}
function obj_respond_to_p(obj, mid, method) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(method.$flags & 16)) { method = to_str(method); }
 if (obj.$m['$' + method])
  return Qtrue;
 return Qfalse;
}
function obj_eqq(obj, mid, other) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 return rb_call(obj, "==", other);
}
function obj_send(obj, mid, method) {
  // print("sending message: " + method);
 if ((arguments.length - 2) < 1) { print(arguments.callee); rb_arg_error(arguments.length - 2, 1); }
  // print("a");
 if (!(method.$flags & 16)) { method = to_str(method); }
  // print("b");
 var args = Array.prototype.slice.call(arguments, 3);
 // method
  args.unshift(method);
 // recv
 args.unshift(obj);
  // print("args: " + args.join(", "));
 return (obj.$m['$' + method] || rb_vm_meth_m).apply(null, args);
}
function obj_class(obj, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return rb_class_real(obj.$klass);
}
/**
	Returns a random number. If `max` is `nil` then the result is 0. Otherwise
	returns a random number from `0` to `max`.

	@example
	  rand      # => 0.192272821917329
	  rand      # => 0.972628272363732
	  rand 10   # => 8
	  rand 10   # => 4

	@param [Number] max max number to use
	@return [Number] random number
*/
function obj_rand(obj, mid, max) {
 if (max != undefined)
  return Math.floor(Math.random() * max);
 else
  return Math.random();
}
function obj_object_id(obj, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return obj.$hash();
}
function obj_to_s(obj, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return "#<" + rb_call(rb_class_real(obj.$klass), "to_s") + ":" + obj.$hash() +
  ">";
}
function obj_inspect(obj, mid) {
 return rb_call(obj, "to_s");
}
function obj_instance_eval(obj, mid) {
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil;
  // print("about to instance eval..");
 // if (!BLOCK_GIVEN)
 // 	rb_raise(rb_eLocalJumpError, "no block given");
 // ARG_COUNT(0)
 if ((__block__ != Qnil)) {
    // print("instance evaling with a block!!!");
    // print(__block__);
  // we use obj as the self instead of block's self
  // return block(obj, Qnil);
  return __block__(obj, __block__.$mid);
 }
 return obj;
}
function obj_const_set(obj, name, value) {
 if ((arguments.length - 1) != 2) { print(arguments.callee); rb_arg_error(arguments.length, 2); }
 if (!(name.$flags & 16)) { name = to_str(name); }
 return rb_const_set(rb_class_real(obj.$klass), name, value);
}
function obj_const_defined_p(obj, mid, name) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(name.$flags & 16)) { name = to_str(name); }
 return Qfalse;
}
/**
  Equality for basic objects.
*/
function obj_equal(obj1, mid, obj2) {
  if (obj1 == obj2) return Qtrue;
  return Qfalse;
}
/**
  @example
  
    !obj  # => true or false
*/
function obj_not(obj, mid) {
  return (obj).$r ? Qfalse : Qtrue;
}
/**
  @example
  
    obj != obj2  # => true or false
*/
function obj_not_equal(obj1, mid, obj2) {
  var res = obj1.$m["=="](obj1, obj2);
  return (res).$r ? Qfalse : Qtrue;
}
/**
  Basic object initialize
*/
function obj_initialize(obj, mid) {
  // no imp
}
// Init core Object classes with some bootstrap methods
var Init_Object = function() {
 var tmp_metaclass;
 // debug support for filename
 var filename = "opal/runtime/object.js";
 rb_cBasicObject = boot_defrootclass('BasicObject');
 rb_cObject = boot_defclass('Object', rb_cBasicObject);
 rb_cModule = boot_defclass('Module', rb_cObject);
 rb_cClass = boot_defclass('Class', rb_cModule);
 rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);
 tmp_metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
 tmp_metaclass = rb_make_metaclass(rb_cObject, tmp_metaclass);
 tmp_metaclass = rb_make_metaclass(rb_cModule, tmp_metaclass);
 tmp_metaclass = rb_make_metaclass(rb_cClass, tmp_metaclass);
 boot_defmetametaclass(rb_cModule, tmp_metaclass);
 boot_defmetametaclass(rb_cObject, tmp_metaclass);
 boot_defmetametaclass(rb_cBasicObject, tmp_metaclass);
 rb_define_method(rb_cBasicObject, "initialize", obj_initialize);
 rb_define_method(rb_cBasicObject, "==", obj_equal);
 rb_define_method(rb_cBasicObject, "equal?", obj_equal);
 rb_define_method(rb_cBasicObject, "!", obj_not);
 rb_define_method(rb_cBasicObject, "!=", obj_not_equal);
  rb_define_method(rb_cBasicObject, 'zomg', function(){});
 rb_mKernel = rb_define_module('Kernel');
 rb_include_module(rb_cObject, rb_mKernel);
 rb_define_method(rb_cClass, "allocate", rb_obj_alloc);
 rb_define_method(rb_cClass, "new", class_new_instance);
 rb_define_method(rb_cClass, "initialize", class_initialize);
 rb_define_method(rb_cClass, "superclass", class_superclass);
 rb_define_singleton_method(rb_cClass, "new", class_s_new);
 rb_define_method(rb_cModule, "name", mod_name);
 rb_define_method(rb_cModule, "===", mod_eqq);
 rb_define_method(rb_cModule, "define_method", mod_define_method);
 rb_define_method(rb_cModule, "attr_accessor", mod_attr_accessor);
 rb_define_method(rb_cModule, "attr_reader", mod_attr_reader);
 rb_define_method(rb_cModule, "attr_writer", mod_attr_writer);
 rb_define_method(rb_cModule, "alias_method", mod_alias_method);
 rb_define_method(rb_cModule, "to_s", mod_to_s);
 rb_define_method(rb_cModule, "const_set", mod_const_set);
 rb_define_method(rb_cModule, "class_eval", mod_class_eval);
 rb_define_method(rb_cModule, "module_eval", mod_class_eval);
 rb_define_method(rb_cModule, "private", mod_private);
 rb_define_method(rb_cModule, "public", mod_public);
 rb_define_method(rb_cModule, "protected", mod_protected);
 rb_define_method(rb_cModule, "include", mod_include);
 rb_define_method(rb_cModule, "extend", mod_extend);
 rb_define_method(rb_mKernel, "require", obj_require);
 rb_define_method(rb_mKernel, "loop", obj_loop);
 rb_define_method(rb_mKernel, "proc", obj_proc);
 rb_define_method(rb_mKernel, "lambda", obj_proc);
 rb_define_method(rb_mKernel, "puts", obj_puts);
 rb_define_method(rb_mKernel, "raise", obj_raise);
 rb_define_method(rb_mKernel, "fail", obj_raise);
 rb_define_method(rb_mKernel, "instance_variable_defined?",
                obj_instance_variable_defined_p);
 rb_define_method(rb_mKernel, "instance_variable_get",
                obj_instance_variable_get);
 rb_define_method(rb_mKernel, "instance_variable_set",
                obj_instance_variable_set);
 rb_define_method(rb_mKernel, "block_given?", obj_block_given_p);
 rb_define_method(rb_mKernel, "method_missing", obj_method_missing, filename);
 rb_define_method(rb_mKernel, "to_a", obj_to_a);
 rb_define_method(rb_mKernel, "tap", obj_tap);
 rb_define_method(rb_mKernel, "kind_of?", obj_is_kind_of);
 rb_define_method(rb_mKernel, "is_a?", obj_is_kind_of);
 rb_define_method(rb_mKernel, "nil?", obj_nil_p);
 rb_define_method(rb_mKernel, "respond_to?", obj_respond_to_p);
 rb_define_method(rb_mKernel, "===", obj_eqq);
 rb_define_method(rb_mKernel, "send", obj_send);
 rb_define_method(rb_mKernel, "__send__", obj_send);
 rb_define_method(rb_mKernel, "class", obj_class);
 rb_define_method(rb_mKernel, "rand", obj_rand);
 rb_define_method(rb_mKernel, "object_id", obj_object_id);
 rb_define_method(rb_mKernel, "__id__", obj_object_id);
 rb_define_method(rb_mKernel, "to_s", obj_to_s);
 rb_define_method(rb_mKernel, "inspect", obj_inspect);
 rb_define_method(rb_mKernel, "instance_eval", obj_instance_eval);
 rb_define_method(rb_mKernel, "const_set", obj_const_set);
 rb_define_method(rb_mKernel, "const_defined?", obj_const_defined_p);
 // @class NilClass
 rb_cNilClass = rb_define_class('NilClass', rb_cObject);
 // nil literal
 Qnil = rb_obj_alloc(rb_cNilClass);
 // nil is false for truthiness
 Qnil.$r = false;
 rb_define_method(rb_cNilClass, "to_i", nil_to_i);
 rb_define_method(rb_cNilClass, "to_f", nil_to_f);
 rb_define_method(rb_cNilClass, "to_s", nil_to_s);
 rb_define_method(rb_cNilClass, "to_a", nil_to_a);
 rb_define_method(rb_cNilClass, "inspect", nil_inspect);
 rb_define_method(rb_cNilClass, "&", false_and);
 rb_define_method(rb_cNilClass, "|", false_or);
 rb_define_method(rb_cNilClass, "^", false_xor);
 rb_define_method(rb_cNilClass, "nil?", rb_true);
 rb_const_set(rb_cObject, "NIL", Qnil);
 // @class TrueClass
 rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
 // true literal
 Qtrue = rb_obj_alloc(rb_cTrueClass);
 rb_define_method(rb_cTrueClass, "to_s", true_to_s);
 rb_define_method(rb_cTrueClass, "&", true_and);
 rb_define_method(rb_cTrueClass, "|", true_or);
 rb_define_method(rb_cTrueClass, "^", true_xor);
 rb_const_set(rb_cObject, "TRUE", Qtrue);
 // @class FalseClass
 rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
 // false literal
 Qfalse = rb_obj_alloc(rb_cFalseClass);
 // false is false for truthiness
 Qfalse.$r = false;
 rb_define_method(rb_cFalseClass, "to_s", false_to_s);
 rb_define_method(rb_cFalseClass, "&", false_and);
 rb_define_method(rb_cFalseClass, "|", false_or);
 rb_define_method(rb_cFalseClass, "^", false_xor);
 rb_const_set(rb_cObject, "FALSE", Qfalse);
};
// Exception classes
var rb_eException,
    rb_eStandardError,
    rb_eLocalJumpError,
    rb_eNameError,
    rb_eNoMethodError,
    rb_eArgError,
    rb_eScriptError,
    rb_eLoadError,
  rb_eRuntimeError,
  rb_eTypeError,
  rb_eIndexError,
  rb_eKeyError,
  rb_eRangeError;
// Standard jump exceptions to save re-creating them everytime they are needed
var rb_vm_return_instance,
  rb_vm_loop_return_instance,
  // disgard this? yes we can!
  rb_vm_block_return_instance,
  rb_vm_next_instance,
  rb_vm_break_instance;
function exc_initialize(exc, message) {
 // if (message != Qnil)	
  rb_ivar_set(exc, "@message", (message == undefined) ? "" : message);
  exc.message = message;
}
function exc_message(exc) {
 return rb_ivar_get(exc, "@message");
}
function exc_inspect(exc) {
 return "#<" + exc.$klass.__classid__ + ": " + rb_call(exc, "to_s") + ">";
}
function exc_to_s(exc) {
 return rb_ivar_get(exc, "@message");
}
var exc_s_allocate = function(klass) {
  var err = new Error();
  err.$klass = klass;
  return err;
};
Error.prepareStackTrace = function(error, stack) {
  var parts = [];
  // actual error
  parts.push(error.$klass.__classid__ + ': ' + error.message);
  for (var i = 0; i < stack.length; i++) {
    var part = stack[i], func = part.getFunction();
    // we are only interested in ruby methods..
    if (func.$rbName || true) {
      parts.push('\tfrom ' + (part.getFileName() || '(irb)') + ':' + part.getLineNumber() + ':in `' + func.$rbName + '\'');
    }
  }
  return parts.join('\n');
};
var Init_Exception = function() {
 //rb_eException = rb_define_class("Exception", rb_cObject);
  rb_eException = rb_define_toll_free_class(Error.prototype, 4, 'Exception', rb_cObject);
  rb_define_singleton_method(rb_eException, 'allocate', exc_s_allocate);
 rb_define_method(rb_eException, "initialize", exc_initialize);
 rb_define_method(rb_eException, "message", exc_message);
 rb_define_method(rb_eException, "inspect", exc_inspect);
 rb_define_method(rb_eException, "to_s", exc_to_s);
 rb_eStandardError = rb_define_class("StandardError", rb_eException);
 rb_eRuntimeError = rb_define_class("RuntimeError", rb_eException);
 rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
 rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
 rb_eNameError = rb_define_class("NameError", rb_eStandardError);
 rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
 rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);
 rb_eScriptError = rb_define_class('ScriptError', rb_eException);
 rb_eLoadError = rb_define_class('LoadError', rb_eScriptError);
 rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
 rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
 rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);
 // jump error literals. We keep a singular instance to avoid recreating each
 // error every time (expensive).
 rb_vm_return_instance = new RObject(rb_eLocalJumpError, 4);
 rb_ivar_set(rb_vm_return_instance, '@message', 'unexpected return');
 rb_vm_return_instance.$keyword = 0;
 rb_vm_loop_return_instance = new RObject(rb_eLocalJumpError, 4);
 rb_ivar_set(rb_vm_loop_return_instance, '@message', 'unexpected return');
 rb_vm_loop_return_instance.$keyword = 1;
 // disgard this? yes we can!
 rb_vm_block_return_instance = new RObject(rb_eLocalJumpError, 4);
 rb_ivar_set(rb_vm_block_return_instance, '@message', 'unexpected return');
 rb_vm_block_return_instance.$keyword = 0;
 rb_vm_break_instance = new RObject(rb_eLocalJumpError, 4);
 rb_ivar_set(rb_vm_break_instance, "@message", "unexpected break");
 rb_vm_break_instance.$keyword = 2;
 rb_vm_next_instance = new RObject(rb_eLocalJumpError, 4);
 rb_ivar_set(rb_vm_next_instance, '@message', 'unexpected next');
 rb_vm_next_instance.$keyword = 3;
};
// A {String} object holds a sequence of bytes, typically representing 
// characters.
// 
// ## Implementation Details.
// 
// For performance, strings in Opal are built directly on top of native 
// javascript strings, so that they are in fact the same object. This has the
// side effect that all strings are immutable, that is, they cannot be changed.
// Most of the string methods that end in '!' for example are not implemented, 
// but their counterparts are: {#upcase} exists, but {#upcase!} does not, for
// example.
var rb_cString;
var rb_cSymbol;
// Symbol instance
var RSymbol = function(ptr) {
  // hash
  this.$id = opal_yield_hash();
  // ptr
  this.__ptr__ = ptr;
  // Class is rb_symbol
  this.$k = rb_cSymbol;
  // get methods from class
  this.$m = rb_cSymbol.$m_tbl;
  // return new sym
  return this;
};
// Symbol table
var symbol_table = { };
// @global - return/create a symbol
opalsym = function(str) {
  if (symbol_table.hasOwnProperty(str))
    return symbol_table[str];
  var res = new RSymbol(str);
  symbol_table[str] = res;
  return res;
};
// Returns a new string object containing a copy of `str`.
// 
// @param [String] str string to copy
// @return [String] result
function str_s_new(str, mid, text) {
 return new String(text || "");
};
// Copy - Returns a new {String} constaining `num` copies of the receiver.
// 
// @example
//   "Ho! " * 3
//   # => "Ho! Ho! Ho! "
// 
// @param [Number] num number of copies
// @return [String] result
var str_times = function(times) {
 var res = [];
 for (var i = 0; i < times; i++) {
  res.push(this);
 }
 return res.join("");
};
// Concatenation - Returns a new {String} containing `other_str` concatenated
// to `self`.
// 
// @example
//   "Hello from " + self.to_s
//   # => "Hello from main"
// 
// @param [String] other_str string to concatenate
// @return [String] result
var str_plus = function(other) {
 return this + other;
};
// Returns a copy of `self` with the first character converted to uppercase and
// the remainder to lowercase.
// 
// @example
//   "hello".capitalize
//   # => "Hello"
//   "HELLO".capitalize
//   # => "Hello"
//   "123ABC".capitalize
//   # => "123abc"
// 
// @return [String]
var str_capitalize = function() {
 return this[0].toUpperCase() + this.substr(1).toLowerCase();
}
// Returns a copy of `self` with all uppercase letters replaced with their 
// lowercase counterparts.
// 
// @example
//   "hEllO".downcase
//   # => "hello"
// 
// @return [String] result
var str_downcase = function() {
 return this.toLowerCase();
};
var str_to_s = function(str) {
 return str;
};
// Returns a printable version of `self`, surrounded by quote marks, with 
// special characters escaped.
// 
// @todo Does not yet escape special characters
// 
// @example
//   str = "hello"
//   str.inspect
//   # => "\"hello\""
// 
// @return [String]
var str_inspect = function(str) {
 return '"' + str + '"';
};
// Returns the character length of `str`.
// 
// @return [Number] length of string
var str_length = function() {
 return this.length;
};
// Returns the {Symbol} corresponding to `self`, creating the symbol if it did
// not previously exist.
// 
// @example
//   "Koala".to_sym
//   # => :Koala
//   s = 'cat'.to_sym
//   # => :cat
//   s == :cat
//   # => true
//   s = '@cat'.to_sym
//   # => :@cat
//   s == :@cat
//   # => true
// 
// This can also be used to create symbols that cannot be represented using the
// :xxxx notation.
// 
// @example
//   'cat and dog'.to_sym
//   # => :"cat and dog"
// 
// @return [Symbol]
var str_intern = function() {
 return opalsym(this);
};
// Returns a new string with the characters from `self` in reverse order.
// 
// @example
//   "stressed".reverse
//   # => "desserts"
// 
// @return [String]
var str_reverse = function() {
 return this.split("").reverse().join("");
};
var str_sub = function(pattern) {
 return this.replace(pattern, block);
};
var str_gsub = function(pattern) {
 var r = pattern.toString();
 r = r.substr(1, r.lastIndexOf('/') - 1);
 r = new RegExp(r, 'g');
 return this.replace(r, block);
};
var str_slice = function(start, finish) {
 return this.substr(start, finish);
};
var str_split = function(split) {
 return this.split(split);
};
// Comparison - returns -1 if `other_str` is greater than, 0 if `other_str` is
// equal to, and 1 if `other_str` is less than `self`.
// 
// @example
//   "abcdef" <=> "abcde"
//   # => 1
//   "abcdef" <=> "abcdef"
//   # => 0
//   "abcdef" <=> "abcdefg"
//   # => -1
//   "abcdef" <=> "ABCDEF"
//   # => 1
// 
// @param [String] other_str string to compare
// @return [-1, 0, 1, nil] result
var str_cmp_m = function(other) {
  if (!(other.info & TS)) return Qnil;
  else if (this > other) return 1;
  else if (this < other) return -1;
  return 0;
};
// Equality - if `other` is not a {String} return `false`. Otherwise, returns
// `true` if `self` <=> `other` returns zero.
// 
// @param [String] other string to compare
// @return [Boolean] result
var str_equal = function(other) {
 return this.valueOf() == other.valueOf() ? Qtrue : Qfalse;
};
// Match - If obj is a {Regexp}, then uses it to match against self, returning
// `nil` if there is no match, or the index of the match location otherwise. If
// obj is not a regexp, then it calls `=~` on it, using the receiver as an
// argument.
// 
// @todo passing a non regexp is not currently supported
// 
// @param [Regexp, Object] obj
// @return [Number, nil]
var str_match = function(obj) {
 rb_call(obj, "match", this);
 return Qnil;
};
// Case-inseneitive version of {String#<=>}.
// 
// @example
//   "abcdef".casecmp("abcde")
//   # => 1
//   "aBcDeF".casecmp("abcdef")
//   # => 0
//   "abcdef".casecmp("abcdefg")
//   # => -1
//   "abcdef".casecmp("ABCDEF")
//   # => 0
// 
// @param [String] other_str string to compare
// @return [-1, 0, 1, nil] result
var str_casecmp = function(other) {
 var a = this.toLowerCase(), b = other.toLowerCase();
 if (!(b.info & TS)) return Qnil;
 else if (a > b) return 1;
 else if (a < b) return -1;
 return 0;
};
// Returns `true` if `self` has a length of zero.
// 
// @example
//   "hello".empty?
//   # => false
//   "".empty?
//   # => true
// 
// @return [Boolean]
var str_empty = function() {
 return this == "" ? Qtrue : Qfalse;
};
// Returns `true` if `self` ends with a `suffix` given.
// 
// @example
//   "hello".end_with? "lo"
//   # => true
// 
// @param [String] suffix suffix to check
// @return [Boolean]
var str_end_with = function(suffix) {
 if (!suffix) return false;
 if (this.lastIndexOf(suffix) == this.length - suffix.length)
  return Qtrue;
 return Qfalse;
};
// Two strings are equal if they have the same length and content.
// 
// @param [String] other string to comapre
// @return [Boolean]
var str_eql = function(other) {
 return this == other ? Qtrue : Qfalse;
};
// Returns true if `self` contains the given `other_str`.
// 
// @example
//   "hello".include? "lo"
//   # => true
//   "hello".include? "ol"
//   # => false
//   "hello".include? "h"
//   # => true
// 
// @param [String] other_str string to check for
// @return [Boolean]
var str_include = function(other) {
 var res = this.indexOf(other);
 return res == -1 ? Qfalse : Qtrue;
};
// Returns the index of the first occurrence of the given `substring` or
// pattern (regexp) in `self`. Returns `nil` if not found. If the second
// parameter is present, it specifies the position in the string to begin the
// search.
// 
// @todo Use of Regexp or offsets not yet implemented.
// 
// @example
//   "hello".index "e"
//   # => 1
//   "hello".index "lo"
//   # => 3
//   "hello".index "a"
//   # => nil
// 
// @param [String] substring string to look for
// @return [Number, nil] result
var str_index = function(substr) {
 var res = this.indexOf(substr);
 return res == -1 ? Qnil : res;
};
// Returns a copy of `self` with leading whitespace removed. See also
// {String#rstrip} and {String#strip}.
// 
// @example
//   "   hello   ".lstrip
//   # => "hello   "
//   "hello".lstrip
//   # => "hello"
// 
// @return [String]
var str_lstrip = function() {
 return this.replace(/^\s*/, "");
};
// Converts `pattern` to a match, if it isnt alrady one, then invokes its 
// `match` method on the receiver. 
// 
// @param [Regexp] pattern
// @return [MatchData, nil]
var str_match_m = function(pattern) {
 return rb_call(pattern, "match", this);
};
var sym_inspect = function(sym) {
 return ":" + sym.__ptr__;
};
var sym_to_s = function(sym) {
 return sym.__ptr__;
};
function sym_to_sym(sym) {
 return sym;
}
var Init_String = function() {
 // @class String
 rb_cString = rb_define_toll_free_class(String.prototype, 4 | 16,
                    'String', rb_cObject);
 rb_define_singleton_method(rb_cString, "new", str_s_new);
 rb_define_method(rb_cString, "*", str_times);
 rb_define_method(rb_cString, "+", str_plus);
 rb_define_method(rb_cString, "capitalize", str_capitalize);
 rb_define_method(rb_cString, "downcase", str_downcase);
 rb_define_method(rb_cString, "to_s", str_to_s);
 rb_define_method(rb_cString, "inspect", str_inspect);
 rb_define_method(rb_cString, "length", str_length);
 rb_define_method(rb_cString, "size", str_length);
 rb_define_method(rb_cString, "intern", str_intern);
 rb_define_method(rb_cString, "to_sym", str_intern);
 rb_define_method(rb_cString, "reverse", str_reverse);
 rb_define_method(rb_cString, "sub", str_sub);
 rb_define_method(rb_cString, "gsub", str_gsub);
 rb_define_method(rb_cString, "slice", str_slice);
 rb_define_method(rb_cString, "[]", str_slice);
 rb_define_method(rb_cString, "split", str_split);
 rb_define_method(rb_cString, "<=>", str_cmp_m);
 rb_define_method(rb_cString, "==", str_equal);
 rb_define_method(rb_cString, "=~", str_match);
 rb_define_method(rb_cString, "casecmp", str_casecmp);
 rb_define_method(rb_cString, "empty?", str_empty);
 rb_define_method(rb_cString, "end_with?", str_end_with);
 rb_define_method(rb_cString, "eql?", str_eql);
 rb_define_method(rb_cString, "include?", str_include);
 rb_define_method(rb_cString, "index", str_index);
 rb_define_method(rb_cString, "lstrip", str_lstrip);
 rb_define_method(rb_cString, "match", str_match_m);
 // @class Symbol
 rb_cSymbol = rb_define_toll_free_class(RSymbol.prototype, 4 | 256,
                    'Symbol', rb_cObject);
  RClass.prototype.$Y = RObject.prototype.$Y = opalsym;
 rb_define_method(rb_cSymbol, "inspect", sym_inspect);
 rb_define_method(rb_cSymbol, "to_s", sym_to_s);
 rb_define_method(rb_cSymbol, "to_sym", sym_to_sym);
};
var rb_cNumeric;
// Unary Plus - Returns the receiver's value.
// 
// @example
//   +5
//   # => 5
// 
// @return [Number] receiver
var num_uplus = function(num) {
 return num;
};
// Unary Minus - Returns the receiver's value, negated.
// 
// @example
//   -5
//   # => -5
// 
// @return [Number] result
var num_uminus = function(num) {
 return 0 - num;
};
// Returns `self` modulo `other`. See {Number#divmod} for more information.
// 
// @param [Number] other number to use for modulo
// @return [Number]
var num_mod = function(num, num2) {
 return num % num2;
};
// Bitwise AND.
// 
// @param [Number] other number to AND with.
// @return [Number] result
var num_and = function(num, num2) {
 return num & num2;
};
// Performs multiplication.
// 
// @param [Number] other number to multiply with
// @return [Number] result
var num_mul = function(num, num2) {
 return num * num2;
};
// Raises `self` to the `other` power.
// 
// @param [Number] other number to raise to
// @return [Number] result
var num_pow = function(num, other) {
 return Math.pow(num, other);
};
// Performs addition.
// 
// @param [Number] other number to add
// @result [Number] result
var num_plus = function(num, other) {
 return num + other;
};
// Performs subtraction.
// 
// @param [Number] other number to subtract
// @result [Number] result
var num_minus = function(num, other) {
 return num - other;
};
// Performs division.
// 
// @param [Number] other number to divide by.
// @return [Number] result
var num_div = function(num, other) {
 return num / other;
};
// Returns `true` if the value of `self` is less than that of `other`, `false`
// otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] result
var num_lt = function(num, other) {
 return num < other ? Qtrue : Qfalse;
};
// Returns `true` if the value of `self` is less than or equal to `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Number] result
var num_le = function(num, other) {
 return num <= other ? Qtrue : Qfalse;
};
// Returns `true` if the value of `self` is greater than that of `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] result
var num_gt = function(num, other) {
 return num > other ? Qtrue : Qfalse;
};
// Returns `true` if the value of `self` is greater than or equal to `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Number] result
var num_ge = function(num, other) {
 return num >= other ? Qtrue : Qfalse;
};
// Shifts `self` left `count` positions.
// 
// @param [Number] count number to shift
// @return [Number] result
var num_lshift = function(num, count) {
 return num << count;
};
// Shifts `self` right `count` positions.
// 
// @param [Number] count number to shift
// @return [Number] result
var num_rshift = function(num, count) {
 return num >> count;
};
// Comparison - Returns `-1`, `0`, `1` or `nil` depending on whether `self` is
// less than, equal to or greater than `other`.
// 
// @param [Number] other number to compare
// @return [Number, nil] result
var num_cmp = function(num, other) {
 if (!other.$info & 64) return Qnil;
 else if (num < other) return -1;
 else if (num > other) return 1;
 return 0;
};
// Returns `true` if `self` equals `other` numerically, `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] true or false
var num_equal = function(num, other) {
 return num.valueOf() === other.valueOf() ? Qtrue : Qfalse;
};
// Bitwise EXCLUSIVE OR.
// 
// @param [Number] other number to XOR
// @return [Number] result
var num_xor = function(num, other) {
 return num & other;
};
// Returns the absolute value of `self`.
// 
// @example
//   -1234.abs
//   # => 1234
//   1234.abs
//   # => 1234
// 
// @return [Number] absolute value
var num_abs = function(num) {
 return Math.abs(num);
};
// Returns `true` if `self` is even, `false` otherwise.
// 
// @return [Boolean]
var num_even_p = function(num) {
 return (num % 2 == 0) ? Qtrue : Qfalse;
};
// Returns `true` if `self` is odd, `false` otherwise.
// 
// @return [Boolean]
var num_odd_p = function(num) {
 return (num %2 == 0) ? Qfalse : Qtrue;
};
// Returns the number equal to `self` + 1.
// 
// @example
//   1.next
//   # => 2
//   (-1).next
//   # => 0
// 
// @return [Number] result
var num_succ = function(num) {
 return parseInt(num) + 1;
};
// Returns the number equal to `self` - 1.
// 
// @example
//   1.pred
//   # => 0
//   (-1).pred
//   # => -2
// 
// @return [Number] result
var num_pred = function(num) {
 return parseInt(num) - 1;
};
// Iterates `block`, passing in integer values from `self` up to and including
// `finish`.
// 
// If no block is given, an enumerator is returned instead.
// 
// @note Enumerator functionality not yet implemented.
// 
// @example
//   5.upto(10) { |i| puts i }
//   # => 5
//   # => 6
//   # => 7
//   # => 8
//   # => 9
//   # => 10
// 
// @param [Number] finish where to stop iteration
// @return [Number] returns receiver
var num_upto = function(num, finish) {
 for (var i = num; i <= finish; i++) {
  block(block.$self, Qnil, i);
 }
 return num;
};
// Iterates `block`, passing decreasing values from `self` down to and 
// including `finish`.
// 
// If no block is given, an enumerator is returned instead.
// 
// @note Enumerator functionality not currently implemented.
// 
// @example
//   5.downto(1) { |x| puts x }
//   # => 5
//   # => 4
//   # => 3
//   # => 2
//   # => 1
// 
// @param [Number] finish where to stop iteration
// @return [Number] returns receiver
var num_downto = function(num, finish) {
 for (var i = num; i >= finish; i--) {
  block(block.$self, Qnil, i);
 }
 return num;
};
// Iterates `block` `self` times, passing in values from zero to `self` - 1.
// 
// If no block is given, an enumerator is returned instead.
// 
// @note Enumerator functionality not yet implemented.
// 
// @example
//   5.times { |x| puts x }
//   # => 0
//   # => 1
//   # => 2
//   # => 3
//   # => 4
// 
// @return [Number] returns receiver
var num_dotimes = function(num) {
 for (var i = 0; i < num; i++) {
  block(block.$self, Qnil, i);
 }
 return num;
};
// Bitwise OR.
// 
// @param [Number] other number to OR with.
// @return [Number] result
var num_or = function(num, other) {
 return num | other;
};
// Returns `true` if `self` is zero, `false` otherwise.
// 
// @return [Boolean] result
function num_zero_p(num, mid) {
 return num.valueOf() === 0 ? Qtrue : Qfalse;
}
// Returns the receiver if it is not zero, `nil` otherwise.
// 
// @return [Number, nil] receiver or nil
function num_nonzero_p(num, mid) {
 return num.valueOf() === 0 ? Qfalse : Qtrue;
}
// One's complement: returns a number where each bit is flipped.
// 
// @return [Number] result
function num_rev(num, mid) {
 return ~num;
}
// Returns the smallest integer greater than or equal to `num`.
// 
// @example
//   1.ceil
//   # => 1
//   1.2.ceil
//   # => 2
//   (-1.2).ceil
//   # => -1
//   (-1.0).ceil
//   # => -1
// 
// @return [Number] result
function num_ceil(num, mid) {
 return Math.ceil(num);
}
// Returns the largest integer less than or equal to `self`.
// 
// @example
//   1.floor
//   # => 1
//   (-1).fllor
//   -1
// 
// @return [Number] result
function num_floor(num, mid) {
 return Math.floor(num);
}
// Returns `true` if `self` is an integer.
// 
// @return [Boolean]
function num_int_p(num, mid) {
 return num % 1 === 0 ? Qtrue : Qfalse;
}
function num_inspect(num, mid) {
 return num.toString();
}
function num_to_i(num, mid) {
 return parseInt(num);
}
function Init_Numeric() {
 // @class Numeric
 rb_cNumeric = rb_define_toll_free_class(Number.prototype, 4 | 64,
                    'Numeric', rb_cObject);
 rb_define_method(rb_cNumeric, "+@", num_uplus);
 rb_define_method(rb_cNumeric, "-@", num_uminus);
 rb_define_method(rb_cNumeric, "modulo", num_mod);
 rb_define_method(rb_cNumeric, "%", num_mod);
 rb_define_method(rb_cNumeric, "&", num_and);
 rb_define_method(rb_cNumeric, "*", num_mul);
 rb_define_method(rb_cNumeric, "**", num_pow);
 rb_define_method(rb_cNumeric, "+", num_plus);
 rb_define_method(rb_cNumeric, "-", num_minus);
 rb_define_method(rb_cNumeric, "/", num_div);
 rb_define_method(rb_cNumeric, "<", num_lt);
 rb_define_method(rb_cNumeric, "<=", num_le);
 rb_define_method(rb_cNumeric, ">", num_gt);
 rb_define_method(rb_cNumeric, ">=", num_ge);
 rb_define_method(rb_cNumeric, "<<", num_lshift);
 rb_define_method(rb_cNumeric, ">>", num_rshift);
 rb_define_method(rb_cNumeric, "<=>", num_cmp);
 rb_define_method(rb_cNumeric, "==", num_equal);
 rb_define_method(rb_cNumeric, "^", num_xor);
 rb_define_method(rb_cNumeric, "abs", num_abs);
 rb_define_method(rb_cNumeric, "magnitude", num_abs);
 rb_define_method(rb_cNumeric, "even?", num_even_p);
 rb_define_method(rb_cNumeric, "odd?", num_odd_p);
 rb_define_method(rb_cNumeric, "succ", num_succ);
 rb_define_method(rb_cNumeric, "next", num_succ);
 rb_define_method(rb_cNumeric, "pred", num_pred);
 rb_define_method(rb_cNumeric, "upto", num_upto);
 rb_define_method(rb_cNumeric, "downto", num_downto);
 rb_define_method(rb_cNumeric, "times", num_dotimes);
 rb_define_method(rb_cNumeric, "|", num_or);
 rb_define_method(rb_cNumeric, "zero?", num_zero_p);
 rb_define_method(rb_cNumeric, "nonzero?", num_nonzero_p);
 rb_define_method(rb_cNumeric, "~", num_rev);
 rb_define_method(rb_cNumeric, "ceil", num_ceil);
 rb_define_method(rb_cNumeric, "floor", num_floor);
 rb_define_method(rb_cNumeric, "integer?", num_int_p);
 rb_define_method(rb_cNumeric, "inspect", num_inspect);
 rb_define_method(rb_cNumeric, "to_s", num_inspect);
 rb_define_method(rb_cNumeric, "to_i", num_to_i);
}
// @class Array
var rb_cArray;
/**
	Returns a formatted, printable version of the array. #inspect is called on
	each of the elements and appended to the string.
*/
var ary_inspect = function(ary) {
 var description = [];
 for (var i = 0; i < ary.length; i++) {
  description.push(ary[i].$m["inspect"](ary[i]));
 }
 return "[" + description.join(", ") + "]";
};
/**
	Returns a simple string version of the array. #to_s is applied to each of
	the child elements with no seperator.
*/
var ary_to_s = function() {
 // ARG_COUNT(0)
 var description = [];
 for (var i = 0; i < this.length; i++) {
  description.push(this[i].$m["to_s"](this[i]));
 }
 return description.join("");
};
/**
	Append - Pushes the given object on to the end of this array. This 
	expression returns the array itself, so several appends may be chained
	together.

	@example
	  [1, 2] << "c" << "d" << [3, 4]
	  # => [1, 2, "c", "d", [3, 4]]

	@param [Object] obj object to append
	@return [Array] returns the receiver
*/
var ary_push = function(ary, val) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 ary.push(val);
 return this;
};
/**
	Returns the number of elements in `self`. May be zero.

	@example
		[1, 2, 3, 4, 5].length
		# => 5

	@return [Number] length
*/
var ary_length = function(ary) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return ary.length;
};
/**
	Calls block once for each element in `self`, passing that element as a 
	parameter.

	If no block is given, an enumerator is returned instead.

	@note enumerator functionality not yet implemented

	@example
	  a = ["a", "b", "c"]
	  a.each { |x| puts x }
	  # => "a"
	  # => "b"
	  # => "c"

	@return [Array] returns the receiver
*/
var ary_each = function(ary) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "each" + " needs to return an enumerator");
  //console.log("array is: " + ary);  
 for (var i = 0; i < ary.length; i++) {
  try {
  __block__(__block__.$self,ary[i]);
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return ary;
}
function ary_each_with_index(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "each_with_index" + " needs to return an enumerator");
 for (var i = 0; i < ary.length; i++) {
  try {
  __block__(__block__.$self,ary[i])
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return ary;
}
/**
	Same as {Array#each}, but passes the index of the element instead of the
	element itself.

	If no block given, an enumerator is returned instead.

	@note enumerator functionality not yet implemented.

	@example
	  a = ["a", "b", "c"]
	  a.each_index { |x| puts x }
	  # => 0
	  # => 1
	  # => 2

	@return [Array] returns receiver
*/
function ary_each_index(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "each_index" + " needs to return an enumerator");
 for (var i = 0; i < ary.length; i++) {
  try {
  __block__(__block__.$self,i)
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return ary;
}
/**
	Append - Pushes the given object(s) on to the end of this array. This 
	expression returns the array itself, so several appends may be chained
	together

	@example
	  a = ["a", "b", "c"]
	  a.push("d", "e", "f")
	  # => ["a", "b", "c", "d", "e", "f"]

	@param [Object] obj the object(s) to push on to the array
	@return [Array] returns the receiver
*/
function ary_push_m(ary, mid, block) {
 for (var i = 2; i < arguments.length; i++) {
  ary.push(arguments[i]);
 }
 return ary;
}
/**
	Returns the index of the first object in `self` such that it is `==` to 
	`obj`. If a block is given instead of an argument, returns first object for
	which `block` is true. Returns `nil` if no match is found. See also
	Array#rindex.

	If neither a block nor an argument is given, an enumerator is returned 
	instead.

	@note enumerator functionality not yet implemented.

	@example
	  a = ["a", "b", "c"]
	  a.index("b")
	  # => 1
	  a.index("z")
	  # => nil
	  a.index { |x| x == "b" }
	  # => 1

	@param [Object] object to look for
	@return [Number, nil] result
*/
function ary_index(ary, mid, object) {
 // assume object, not block (for now)
 for (var i = 0; i < ary.length; i++) {
  if (rb_call(ary[i], "==", object).$r)
   return i;
 }
 return Qnil;
}
/**
	Returns a new array populated with the given objects.

	@example
	  Array.[](1, 2, 3)
	  # => [1, 2, 3]

	  Array["a", "b", "c"]
	  # => ["a", "b", "c"]

	@param [Object] objs all objects to add to the array
	@return [Array] returns a new array instance
*/
function ary_s_create() {
 return Array.prototype.slice.call(arguments, 2);
}
function ary_alloc() {
 return [];
}
function ary_initialize(ary) {
 for (var i = 2; i < arguments.length; i++) {
  ary.push(arguments[i]);
 }
 return ary;
}
/**
	Concatenation - returns a new array built by concatenating the two arrays
	together to produce a third array.

	@example
	  [1, 2, 3] + [4, 5]
	  # => [1, 2, 3, 4, 5]

	@param [Array] other_ary the array to concat with
	@return [Array] returns new concatenated array
*/
function ary_plus(ary, mid, other) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 return ary.concat(other);
}
/**
	Array difference. Removes a new array that is a copy of the original array,
	removing any items that also appear in other_ary.

	@example
	  [1, 1, 2, 2, 3, 3, 4, 5] - [1, 2, 4]
	  # => [3, 3, 5]

	@param [Array] other_ary array to use for difference
	@return [Array] new array
*/
function ary_diff(ary, mid, other) {
 rb_raise(rb_eException, "Array#- not implemented");
}
/**
	Equality - Two arrays are equal if they contain the same number of elements
	and if each element is equal to (according to {Object#==}) the corresponding
	element in the other array.

	@example
	  ["a", "c"] == ["a", "c", 7]
	  # => false

	  ["a", "c", 7] == ["a", "c", 7]
	  # => true

	  ["a", "c", 7] == ["a", "d", "f"]
	  # => false

	@param [Array] other array to compare
	@return [Boolean] are arrays equal
*/
function ary_equal(ary, mid, other) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (ary.$hash() == other.$hash()) return Qtrue;
 if (!(other.$flags & 32)) return Qfalse;
 if (ary.length != other.length) return Qfalse;
 for (var i = 0; i < ary.length; i++) {
  if (!rb_call(ary[i], "==", other[i]).$r)
   return Qfalse;
 }
 return Qtrue;
};
/**
	Searches through an array whose elements are also arrays comparing `obj`
	with the first element of each contained array using `obj.==`. Returns the
	first contained array that matches (that is, the first associated array), or
	`nil` if no match is found. See also {Array#rassoc}

	@example
	  s1 = ["colors", "red", "blue", "green"]
	  s2 = ["letters", "a", "b", "c"]
	  s3 = "foo"
	  a = [s1, s2, s3]
	  a.assoc "letters"
	  # => ["letter", "a", "b", "c"]
	  a.assoc "foo"
	  # => nil
*/
function ary_assoc(ary, mid, obj) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 var arg;
 for (var i = 0; i < ary.length; i++) {
  arg = ary[i];
  if ((arg.$flags & 32) && arg.length && rb_call(arg[0], "==", obj).$r)
   return arg;
 }
 return Qnil;
}
/**
	Returns the element at `index`. A negative index count from the end of the
	receiver. Returns `nil` if the index is out of range. See also `Array#[]`.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a.at 0
	  # => "a"
	  a.at -1
	  # => "e"

	@param [Number] index index to get
	@return [Object, nil] returns nil or the result
*/
function ary_at(ary, mid, idx) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 // make sure idx is a number. Try to use #to_int
 if (!(idx.$flags.$flags & 64)) {
  // if it responds to to_int
  if (idx.$m.$to_int)
   rb_raise(rb_eException, "need to call to_int");
  else
   rb_arg_error_int(idx);
 }
 if (idx < 0)
  idx += ary.length;
 if (idx < 0 || idx >= ary.length)
  return Qnil;
 return ary[idx];
}
/**
	Removes all elements from `self`.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a.clear
	  # => []

	@return [Array] returns receiver
*/
function ary_clear(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 ary.splice(0);
 return ary;
}
/**
	Invokes the block passing in successive elements from `self`, returning an
	array containing those elements for which the block returns a true value.

	@note enumerator functionality is not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.select { |x| x > 4 }
	  # => [5, 6]

	@return [Array] returns array
*/
function ary_select(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "select" + " needs to return an enumerator");
 var result = [], arg;
 for (var i = 0; i < ary.length; i++) {
  try {
  arg = ary[i];
  if ((__block__(__block__.$self,arg)).$r)
   result.push(arg);
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return result;
}
/**
	Invokes `block` once for each element of `self`. Creates a new array
	containing the values returned by the block. See also {Enumerable#collect}.

	If no block is given, an anumerator is returned instead.

	@todo No enumerator is returned when no block given.

	@example
	  a = ["a", "b", "c", "d"]
	  a.collect { |x| x + "!" }
	  # => ["a!", "b!", "c!", "d!"]
	  a
	  # => ["a", "b", "c", "d"]
 
	@return [Array] new array
*/
function ary_collect(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "collect" + " needs to return an enumerator");
 var result = [];
 for (var i = 0; i < ary.length; i++) {
  try {
  result.push(__block__(__block__.$self,ary[i]));
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return result;
}
/**
	Invokes the `block` once for each element of `self`, replacing the element 
	with the value returned by `block`. See also Enumerable#collect.

	If no block is given, an enumerator is returned instead.

	@todo no block given does not return an enumerator

	@example
	  a = ["a", "b", "c", "d"]
	  a.collect { |x| x + "!" }
	  # => ["a!", "b!", "c!", "d!"]
	  a
	  # => ["a!", "b!", "c!", "d!"]

	@return [Array] returns receiver
*/
function ary_collect_bang(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "collect!" + " needs to return an enumerator");
 for (var i = 0; i < ary.length; i++) {
  try {
  ary[i] = __block__(__block__.$self,ary[i])
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return ary;
};
/**	
	Array#dup
*/
function ary_dup(ary, mid, block) {
 return ary.slice(0);
};
/**
	Returns a copy of `self` with all `nil` elements removed.

	@example
	  ["a", nil, "b", nil, "c", nil].compact
	  # => ["a", "b", "c"]

	@return [Array] new array
*/
function ary_compact(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var result = [], length = ary.length;
 for (var i = 0; i < length; i++) {
   if (ary[i] != Qnil) {
     result.push(ary[i]);
   }
 }
 return result;
}
/**
	Removes nil elements from the array. Returns nil if no changes were made,
	otherwise returns ary.

	@example
	  ["a", nil, "b", nil, "c", nil].compact!
	  # => ["a", "b", "c"]

	  ["a", "b", "c"].compact!
	  # => nil

	@return [Array, nil] returns either the receiver or nil
*/
function ary_compact_bang(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var length = ary.length;
 for (var i = 0; i < ary.length; i++) {
  if (ary[i] == Qnil) {
   ary.splice(i, 1);
   i--;
  }
 }
 return length == ary.length ? Qnil : ary;
}
/**
	Appends the elements of `other_ary` to `self`

	@example
	  ["a", "b"].concat ["c", "d"]
	  # => ["a", "b", "c", "d"]

	@param [Array] other_ary array to concat
	@return [Array] returns receiver
*/
function ary_concat(ary, mid, other) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 var length = other.length;
 for (var i = 0; i < length; i++) {
  ary.push(other[i]);
 }
 return ary;
}
/**
	Returns the number of elements. If an argument is given, counts the number
	of elements which equals to `obj`. If a block is given, counts the number of
	elements yielding a true value.

	@note Block usage not yet implemented

	@example
	  ary = [1, 2, 4, 2]
	  ary.count
	  # => 4
	  ary.count(2)
	  # => 2

	@param [Object] obj object to check
	@return [Number] count or count of obj
*/
function ary_count(ary, mid, obj) {
 if (obj != undefined) {
  var total = 0;
  for (var i = 0; i < ary.length; i++) {
   if (rb_call(ary[i], "==", obj).$r)
    total++;
  }
  return total;
 } else {
  return ary.length;
 }
}
/**
	Deletes items from `self` that are equal to `obj`. If any items are found, 
	returns `obj`. If the itme is not found, returns `nil`. If the optional code
	block is given, returns the result of `block` if the item is not found. (To
	remove nil elements and get an informative return value, use {#compact!})

	@todo block is not yet used

	@example
	  a = ["a", "b", "b", "b", "c"]
	  a.delete("b")
	  # => "b"
	  a
	  # => ["a", "c"]
	  a.delete("z")
	  # => nil
	  a.delete("z") { "not found" }
	  # => "not found"

	@param [Object] obj object to delete
	@return [Object, nil] returns obj or nil
*/
function ary_delete(ary, mid, obj) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 var length = ary.length;
 for (var i = 0; i < ary.length; i++) {
  if (rb_call(ary[i], "==", obj).$r) {
   ary.splice(i, 1);
   i--;
  }
 }
 return length == ary.length ? Qnil : obj;
}
/**
	Deletes the element at the specified index, returning that element, or `nil`
	if the index is out of range. See also Array#slice!.

	@example
	  a = ["ant", "bat", "cat", "dog"]
	  a.delete_at(2)
	  # => "cat"
	  a
	  # => ["ant", "bat", "dog"]
	  a.delete_at(99)
	  # => 99

	@param [Number] index the index to delete
	@return [Object, nil] returns obj at index or nil
*/
function ary_delete_at_m(ary, mid, index) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(index.$flags & 64)) { index = to_num(index); }
 if (index < 0) index += ary.length;
 if (index < 0 || index >= ary.length) return Qnil;
 var res = ary[index];
 ary.splice(index, 1);
 return res;
}
/**
	Deletes every element of `self` for which `block` evaluates to true. See
	also Array#reject!.

	If no block is given, an enumerator is returned instead.

	@note no enumerator is currently returned.

	@example
	  a = [1, 2, 3]
	  a.delete_if { |x| x >= 2 }
	  # => [1]

	@return [Array] returns amended receiver
*/
function ary_delete_if(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 for (var i = 0; i < ary.length; i++) {
  try {
  if ((__block__(__block__.$self,ary[i])).$r) {
   ary.splice(i, 1);
   i--;
  }
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return ary;
}
/**
	Drop first `n` elements from receiver, and returns rest elements in array.

	@example
	  a = [1, 2, 3, 4, 5, 0]
	  a.drop 3
	  # => [4, 5, 0]

	@param [Number] n number to drop
	@return [Array] returns a new array
*/
function ary_drop(ary, mid, n) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(n.$flags & 64)) { n = to_num(n); }
 if (n > ary.length) return [];
 return ary.slice(n);
}
/**
	Drop elements up to, but not including, the first element for which block
	returns `nil` or `false` and returns an array containing the remaining
	elements. 

	If no block is given, an enumerator is returned instead.

	@note returning an enumerator is not yet implemented

	@example
	  a = [1, 2, 3, 4, 5, 0]
	  a.drop_while { |i| i < 3 }
	  # => [3, 4, 5, 0]

	@return [Array] returns new array
*/
function ary_drop_while(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "drop_while" + " needs to return an enumerator");
 for (var i = 0; i < ary.length; i++) {
  if (!block(block.$self, Qnil, ary[i]).$r)
   return ary.slice(i);
 }
 return [];
};
/**
	Returns `true` if `self` contains no elements, `false` otherwise

	@example
	  [].empty?
	  # => true

	@return [Boolean] empty or not
*/
function ary_empty_p(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return ary.length == 0 ? Qtrue : Qfalse;
}
/**
	Tries to return the element at position `index`. If the index lies outside
	the array, the first form throws an `IndexError` exception, the second form
	returns `default`, and the third form returns the value of invoking the 
	block, passing in the index. Negative values of `index` count from the end
	of the array.

	@example First form
	  a = [11, 22, 33, 44]
	  a.fetch(1)
	  # => 22
	  a.fetch(-1)
	  # => 44

	@example Second form
	  a.fetch(4, 'cat')
	  # => "cat"

	@example Third form
	  a.fetch(4) { |i| i * i }
	  # => 16

	@param [Number] index
	@param [Object] defaults
	@return [Object] returns result
*/
function ary_fetch(ary, mid, index, defaults) {
 var original = index;
 if (index < 0) index += ary.length;
 if (index < 0 || index >= ary.length) {
  if (defaults == undefined) {
   rb_raise(rb_eIndexError, "Array#fetch");
  } else if (block != Qnil) {
   return __block__(__block__.$self,original);
  } else {
   return defaults;
  }
 }
 return ary[index];
}
/**
	Returns the first element, or the first `n` elements, of the array. If the
	array is empty, the first form returns `nil`, and the second form returns an
	empty array.

	@example
	  a = ["q", "r", "s", "t"]
	  a.first
	  # => "q"
	  a.first(2)
	  # => ["q", "r"]

	@param [Number] n number of elements
	@return [Object, Array] object or array of objects
*/
function ary_first(ary, mid, count) {
 if (count == undefined) {
  if (ary.length == 0) return Qnil;
  return ary[0];
 }
 return ary.slice(0, count);
}
/**
	Returns a new array that is a one-dimensional flattening of this array
	(recursively). That is, for every element that is an array, extract its
	elements info the new array. If the optional `level` argument determines the
	level of recursion to flatten.

	@example
	  s = [1, 2, 3]
	  # => [1, 2, 3]
	  t = [4, 5, 6, [7, 8]]
	  # => [4, 5, 6, [7, 8]]
	  a = [s, t, 9, 10]
	  # => [[1, 2, 3], [4, 5, 6, [7, 8]], 9, 10]
	  a.flatten
	  # => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	  a = [1, 2, [3, [4, 5]]]
	  a.flatten(1)
	  # => [1, 2, 3, [4, 5]]

	@param [Number] level the level to flatten
	@return [Array] returns new array
*/
function ary_flatten(ary, mid, level) {
 var result = [], item;
 for (var i = 0; i < ary.length; i++) {
  item = ary[i];
  if ((item.$flags & 32)) {
   if (level == undefined)
    result = result.concat(rb_call(item, "flatten"));
   else if (level == 0)
    result.push(item);
   else
    result = result.concat(rb_call(item, "flatten", level - 1));
  } else {
   result.push(item);
  }
 }
 return result;
}
/**
	Flattens `self` in place. Returns `nil` if no modifications were made (i.e.,
	`ary` contains no subarrays.) If the optional `level` argument determines 
	the level of recursion to flatten.

	@todo current implementation is probably not all that ideal.. (efficiency)

	@example
	 a = [1, 2, [3, [4, 5]]]
	 a.flatten!
	 # => [1, 2, 3, 4, 5]
	 a.flatten!
	 # => nil
	 a
	 # => [1, 2, 3, 4, 5]

	@param [Number] level to flatten to
	@return [Array] returns receiver
*/
function ary_flatten_bang(ary, mid, level) {
 var length = ary.length;
 var result = rb_call(ary, "flatten", level);
 ary.splice(0);
 for (var i = 0; i < result.length; i++)
  ary.push(result[i]);
 if (ary.length == length)
  return Qnil;
 return ary;
}
/**
	Returns `true` if the given object is present in `self`, `false` otherwise.

	@example
	  a = ["a", "b", "c"]
	  a.include? "b"
	  # => true
	  a.include? "z"
	  # => false
*/
function ary_include_p(ary, mid, member) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 for (var i = 0; i < ary.length; i++) {
  if (rb_call(ary[i], "==", member).$r)
   return Qtrue;
 }
 return Qfalse;
}
/**
	Replaces the contents of `self` with the contents of `other_ary`, truncating
	or expanding if necessary.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a.replace ["x", "y", "z"]
	  # => ["x", "y", "z"]
	  a
	  # => ["x", "y", "z"]

	@param [Array] other_ary array to replace with
	@return [Array] returns receiver
*/
function ary_replace(ary, mid, other) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (!(other.$flags & 32)) { other = to_ary(other); }
 ary.splice(0);
 for (var i = 0; i < other.length; i++) {
  ary.push(other[i]);
 }
 return ary;
}
/**
	Inserts the given values before the element with the given index (which may
	be negative).

	@example
	  a = ["a", "b", "c", "d"]
	  a.insert(2, 99)
	  # => ["a", "b", 99, "c", "d"]
	  a.insert(-2, 1, 2, 3)
	  # => ["a", "b", 99, "c", 1, 2, 3, "d"]

	@param [Number] index index for insertion
	@param [Object] obj objects to insert
	@return [Array] returns the receiver
*/
function ary_insert(ary, mid, index, obj) {
 obj = Array.prototype.slice.call(2);
 if (index < 0) index += self.length;
 if (index < 0 || index >= self.length)
  rb_raise(rb_eIndexError, "out of range");
 ary.splice.apply(ary, [index, 0].concat(obj));
 return ary;
}
/**
	Returns a string created by converting each element of the array to a string
	separated by `sep`.

	@example
	  ["a", "b", "c"].join
	  # => "abc"
	  ["a", "b", "c"].join '-'
	  "a-b-c"

	@param [String] sep the separator
	@return [String] joined string
*/
function ary_join(ary, mid, sep) {
 if (sep == undefined) sep = "";
 var result = []
 for (var i = 0; i < ary.length; i++) {
  result.push(rb_call(ary[i], "to_s"));
 }
 return result.join(sep);
}
/**
	Deletes every element of `self` for which `block` evaluates to false. See
	also Array#select!

	If no block given, an enumerator is returned instead.

	@todo No enumerator currently returned.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.keep_if { |x| x < 4 }
	  # => [1, 2, 3]

	@return [Array] receiver
*/
function ary_keep_if(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 for (var i = 0; i < ary.length; i++) {
  if (!block(block.$self, Qnil, ary[i]).$r) {
   ary.splice(i, 1);
   i--;
  }
 }
 return ary;
}
/**
	Return the last element(s) of `self`. If the array is empty, the first form
	returns `nil`.

	@example
	  a = ["w", "x", "y", "z"]
	  a.last
	  # => "z"
	  a.last(2)
	  # => ["y", "z"]

	@param [Number] n number of items to get
	@return [Object, Array] result
*/
function ary_last(ary, mid, n) {
 if (n == undefined) {
  if (ary.length == 0) return Qnil;
  return ary[ary.length - 1];
 } else {
   if (n > ary.length) n = ary.length;
  return ary.slice(ary.length - n, ary.length);
 }
}
/**
	Removes the last element from `self` and returns it, or `nil` if array is
	empty.

	If a number `n` is given, returns an array of the last n elements (or less)
	just like `array.slice!(-n, n) does.

	@example
	  a = ["a", "b", "c", "d"]
	  a.pop
	  # => "d"
	  a.pop(2)
	  # => ["b", "c"]
	  a
	  # => ["a"]

	@param [Number] n number to pop
	@return [Array] returns receiver
*/
function ary_pop(ary, mid, n) {
 if (n == undefined) {
  if (ary.length) return ary.pop();
  return Qnil;
 } else {
  return ary.splice(ary.length - n, ary.length);
 }
}
/**
	Searches through the array whose elements are also arrays. Comapres `obj`
	with the second element of each contained array using `==`. Returns the 
	first contained array that matches. See also {Array#assoc}.

	@example
	  a = [[1, "one"], [2, "two"], [3, "three"], ["ii", "two"]]
	  a.rassoc("two")
	  # => [2, "two"]
	  a.rassoc("four")
	  # => nil

	@param [Object] obj object to search for
	@return [Object, nil] result or nil
*/
function ary_rassoc(ary, mid, obj) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 var test;
 for (var i = 0; i < ary.length; i++) {
  test = ary[i];
  if (test.$flags & 32 && test[1] != undefined &&
   rb_call(test[1], "==", obj).$r) {
    return test;
   }
 }
 return Qnil;
}
/**
	Returns a new array containing the items in `self` for which the block is
	not true. See also {Array#delete_if}.

	If no block is given, an enumerator is returned instead.

	@note Enumerator functionality not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.reject { |x| x > 3 }
	  # => [1, 2, 3]
	  a
	  # => [1, 2, 3, 4, 5, 6]

	@return [Array] returns array
*/
function ary_reject(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var result = [];
 for (var i = 0; i < ary.length; i++) {
  if (!block(block.$self, Qnil, ary[i]).$r)
   result.push(ary[i]);
 }
 return result;
}
/**
	Equivalent to {Array#delete_if}, deleting elements from `self` for which the
	block evaluates to true, but returns `nil` if no changes were made. See also
	{Array#delete_if}.

	If no block is given, an enumerator is returned instead.
 
	@note Enumerator functionality is not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.reject! { |x| x > 3 }
	  # => [1, 2, 3]
	  a.reject! { |x| x > 3 }
	  # => nil
	  a
	  # => [1, 2, 3]

	@return [Array] returns receiver
*/
function ary_reject_bang(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var length = ary.length;
 for (var i = 0; i < ary.length; i++) {
  if (block(block.$self, Qnil, ary[i]).$r) {
   ary.splice(i, 1);
   i--;
  }
 }
 return ary.length == length ? Qnil : ary;
}
/**
	Returns a new array containing `self`'s elements in reverse order.

	@example
	  ["a", "b", "c"].reverse
	  # => ["c", "b", "a"]
	  [1].reverse
	  # => [1]

	@return [Array] reversed array
*/
function ary_reverse(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var result = [];
 for (var i = ary.length - 1; i >= 0; i--)
  result.push(ary[i]);
 return result;
}
/**
	Reverses `self` in place.

	@example
	  a = ["a", "b", "c"]
	  a.reverse!
	  # => ["c", "b", "a"]
	  a
	  # => ["c", "b", "a"]

	@return [Array] returns receiver
*/
function ary_reverse_bang(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var length = ary.length / 2;
 var tmp;
 for (var i = 0; i < length; i++) {
  tmp = ary[i];
  ary[i] = ary[ary.length - (i + 1)];
  ary[ary.length - (i + 1)] = tmp;
 }
 return ary;
}
/**
	Same as {Array#each}, but traverses `self` in reverse order.

	@example
	  a = ["a", "b", "c"]
	  a.reverse_each { |x| puts x }
	  # => "c"
	  # => "b"
	  # => "a"

	@return [Array] returns receiver
*/
function ary_reverse_each(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "reverse_each" + " needs to return an enumerator");
 for (var i = ary.length - 1; i >= 0; i--) {
  try {
  __block__(__block__.$self,ary[i]);
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return ary;
}
/**
	Returns the index of the last object in `self` == to `object`. If a block is
	given instead of an argument, returns the first object for which `block` is
	true, starting from the last object. Returns `nil` if no match is found. See
	also {Array#index}.

	@example
	  a = ["a", "b", "b", "b", "c"]
	  a.rindex("b")
	  # => 3
	  a.rindex("z")
	  # => nil
	  a.rindex { |x| x == "b" }
	  # => 3

	@return [Object, nil] returns result or nil
*/
function ary_rindex(ary, mid, object) {
 if (object != undefined) {
  for (var i = ary.length - 1; i > 0; i--) {
   if (rb_call(ary[i], "==", object).$r)
    return i;
  }
 } else if (block != Qnil) {
  rb_raise(rb_eException, "need to rindex deal with block")
 }
 return Qnil;
}
/**
	Invokes the block passing in successive elements from `self`, deleting the
	elements for which the block returns a false value. It returns `self` if
	changes were made, otherwise it returns `nil`. See also {Array#keep_if}.

	If no block is given, an enumerator is returned instead.

	@note Enumerator functionality not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.select! { |x| x > 4 }
	  # => [5, 6]
	  a.select! { |x| x > 4 }
	  # => nil
	  a
	  # => [5, 6]

	@return [Array] returns receiver
*/
function ary_select_bang(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "select!" + " needs to return an enumerator");
 var length = ary.length;
 for (var i = 0; i < ary.length; i++) {
  if (!(__block__(__block__.$self,ary[i])).$r) {
   ary.splice(i, 1);
   i--;
  }
 }
 return ary.length == length ? Qnil : ary;
}
/**
	Returns the first element of `self` and removes it (shifting all other 
	elements down by one). Returns `nil` if the array is empty.

	If a number `n` is given, returns an array of the first n elements (or less)
	just like array.slice!(0, n) does.

	@example
	  a = ["a", "b", "c"]
	  a.shift
	  # => "a"
	  a
	  # => ["b", "c"]
	  a = ["a", "b", "c"]
	  a.shift(2)
	  # => ["b", "c"]
	  a
	  # => ["c"]

	@param [Number] n elements to shift
	@return [Array] result
*/
function ary_shift(ary, mid, n) {
 if (n != undefined)
  return ary.splice(0, n);
 if (ary.length)
  return ary.shift();
 return Qnil;
}
/**
	Deletes the element(s) given by an `index` (optionally with a length) or by
	a range. Returns the deleted object(s), or `nil` if the index is out of
	range.

	@example
	  a = ["a", "b", "c"]
	  a.slice!(1)
	  # => "b"
	  a
	  # => ["a", "c"]
	  a.slice!(-1)
	  # => "c"
	  a
	  # => ["a"]
	  a.slice!(100)
	  # => nil
	  a
	  # => ["a"]

	@todo Does not yet work with ranges.

	@param [Range, Number] index to begin with
	@param [Number] length last index
	@return [Array, nil] result
*/
function ary_slice_bang(ary, mid, index, length) {
 var size = ary.length;
 if (index.$flags & 1024) {
  rb_raise(rb_eException, "need to implement range");
 } else {
  if (index < 0) index += size;
 }
 if (index >= size || index < 0) return Qnil;
 if (length != undefined) {
  if (length <= 0 || length > ary.length) return Qnil;
  return ary.splice(index, index + length);
 } else {
  return ary.splice(index, 1)[0];
 }
}
/**
	Returns first `n` elements from ary.

	@example
	  a = [1, 2, 3, 4, 5, 0]
	  a.take(3)
	  # => [1, 2, 3]

	@return [Array] array of elements
*/
function ary_take(ary, mid, n) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 return ary.slice(0, n);
}
/**
	Passes elements to the block until the block returns `nil` or `false`, then
	stops iterating and returns an array of all prior elements.

	If no block given, an enumerator is returned instead.

	@todo Enumerator functionality not yet implemented.

	@example
	  a = [1, 2, 3, 4, 5, 6]
	  a.take_while { |i| i < 3 }
	  # => [1, 2]

	@return [Array] array with elements
*/
function ary_take_while(ary, mid, block) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var result = [];
 for (var i = 0; i < ary.length; i++) {
  if (block(block.$self, Qnil, ary[i]).$r)
   result.push(ary[i]);
  else
   break;
 }
 return result;
}
/**
	Returns self.

	@example
	  a = [1, 2, 3]
	  a.to_a
	  # => [1, 2, 3]

	@return [Array] returns the receiver
*/
function ary_to_a(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 return ary;
}
/**
	Returns a new array by removing duplicate values in `self`.

	@example

	  a = ["a", "a", "b", "b", "c"]
	  a.uniq
	  # => ["a", "b", "c"]
	  a
	  # => ["a", "a", "b", "b", "c"]

	@return [Array]
*/
function ary_uniq(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var result = [], seen = [];
 for (var i = 0; i < ary.length; i++) {
  var test = ary[i], hash = test.$hash();
  if (seen.indexOf(hash) == -1) {
   seen.push(hash);
   result.push(test);
  }
 }
 return result;
}
/**
	Removes duplicate elements from `self`. Returns `nil` if no changes are
	made (that is, no duplicates are found).

	@example
	
	  a = ["a", "a", "b", "b", "c"]
	  a.uniq!
	  # => ["a", "b", "c"]
	  a.uniq!
	  # => nil

	@return [Array] returns receiver
*/
function ary_uniq_bang(ary, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var seen = [], length = ary.length;
 for (var i = 0; i < ary.length; i++) {
  var test = ary[i], hash = test.$hash();
  if (seen.indexOf(hash) == -1) {
   seen.push(hash)
  } else {
   ary.splice(i, 1);
   i--;
  }
 }
 return ary.length == length ? Qnil : ary;
}
/**
	Prepends objects to the front of `self`, moving other elements upwards.

	@example

	  a = ["b", "c", "d"]
	  a.unshift("a")
	  # => ["a", "b", "c", "d"]
	  a.unshift(1, 2)
	  # => [1, 2, "a", "b", "c", "d"]

	@param [Object] object objects to add
	@return [Array] returns receiver
*/
function ary_unshift(ary, mid) {
 var obj = Array.prototype.slice.call(arguments, 2);
 for (var i = obj.length - 1; i >= 0; i--) {
  ary.unshift(obj[i]);
 }
 return ary;
}
/**
	Set Intersection - Returns a new array containing elements common to the two 
	arrays, with no duplicates.

	@example

	  [1, 1, 3, 5] & [1, 2, 3]
	  # => [1, 3]

	@param [Array] other another array to intersect.
	@return [Array] intersected array
*/
function ary_and(ary, mid, other) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 var result = [], seen = [];
 for (var i = 0; i < ary.length; i++) {
  var test = ary[i], hash = test.$hash();
  if (seen.indexOf(hash) == -1) {
   for (var j = 0; j < other.length; j++) {
    var test_b = other[j], hash_b = test_b.$hash();
    if ((hash == hash_b) && seen.indexOf(hash) == -1) {
     seen.push(hash);
     result.push(test);
    }
   }
  }
 }
 return result;
}
/**
	Repitition - When given a string argument, acts the same as {#join}. 
	Otherwise, returns a new array built by concatenating the `num` copies of
	`self`.

	@example With Number

	  [1, 2, 3] * 3
	  # => [1, 2, 3, 1, 2, 3, 1, 2, 3]

	@example With String

	  [1, 2, 3] * ','
	  # => "1,2,3"

	@param [String, Number] num string or number used for joining/concat
	@result [String, Array] depending on argument
*/
function ary_times(ary, mid, arg) {
 if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
 if (arg.$flags & 16) {
  return ary_join(ary, Qnil, arg);
 } else {
  var result = [];
  for (var i = 0; i < parseInt(arg); i++) {
   result = result.concat(ary);
  }
  return result;
 }
}
/**
	Element Reference - Returns the element at `index`, or returns a subarray at
	`index` and continuing for `length` elements, or returns a subarray if 
	`index` is a range. Negative indices count backward from the end of the 
	array (`-1` is the last element). Returns `nil` if the index (or starting
	index) are out of range.

	@example
	  a = ["a", "b", "c", "d", "e"]
	  a[2] + a[0] + a[1]
	  # => "cab"
	  a[6]
	  # => nil
	  a[1, 2]
	  # => ["b", c""]
	  a[1..3]
	  # => ["b", "c", "d"]
	  a[4..7]
	  # => ["e"]
	  a[6..10]
	  # => nil
	  a[-3, 3]
	  # => ["c", "d", "e"]
	  a[5]
	  # => nil
	  a[5, 1]
	  # => []
	  a[5..10]
	  # => []

	@todo Does not yet work with ranges.

	@param [Range, Number] index to begin with
	@param [Number] length last index
	@return [Array, nil] result
*/
var ary_aref = function(ary, index, length) {
 var size = ary.length;
 if (index.$info & 1024)
  rb_raise(rb_eException, "need to implement range in Array#[]");
 else
  if (index < 0) index += size;
 if (index >= size || index < 0) return Qnil;
 if (length != undefined) {
  if (length <= 0) return [];
  return ary.slice(index, index + length);
 } else {
  return ary[index];
 }
}
/**
	Todo: need to expand functionality
*/
function ary_aset(ary, mid, index, value) {
 return ary[index] = value;
}
// Arrays are ordered, indexed by integers starting at 0.
// 
// ## Implementation details
// 
// For efficiency, an array instance is simply a native javascript array. There
// is no wrapping or referencing, it is simply a toll-free class.
var Init_Array = function() {
  // debug support for filename
 var filename = "opal/runtime/object.js";
 // @class Array
 rb_cArray = rb_define_toll_free_class(Array.prototype, 4 | 32,
                     'Array', rb_cObject);
 // fix for array hash. create it if not already created..
 Array.prototype.$hash = function() {
   if (this.$id) return this.$id;
   return this.$id = opal_yield_hash();
 };
 rb_define_singleton_method(rb_cArray, "[]", ary_s_create);
 rb_define_singleton_method(rb_cArray, "allocate", ary_alloc, filename);
 rb_define_method(rb_cArray, "initialize", ary_initialize, filename);
 rb_define_method(rb_cArray, "inspect", ary_inspect, filename);
 rb_define_method(rb_cArray, "to_s", ary_to_s, filename);
 rb_define_method(rb_cArray, "length", ary_length, filename);
 rb_define_alias(rb_cArray, "size", "length", filename);
 rb_define_method(rb_cArray, "<<", ary_push, filename);
 rb_define_method(rb_cArray, "each", ary_each, filename);
 rb_define_method(rb_cArray, "each_with_index", ary_each_with_index, filename);
 rb_define_method(rb_cArray, "each_index", ary_each_index, filename);
 rb_define_method(rb_cArray, "push", ary_push_m, filename);
 rb_define_method(rb_cArray, "index", ary_index, filename);
 rb_define_method(rb_cArray, "+", ary_plus, filename);
 rb_define_method(rb_cArray, "-", ary_diff, filename);
 rb_define_method(rb_cArray, "==", ary_equal, filename);
 rb_define_method(rb_cArray, "assoc", ary_assoc, filename);
 rb_define_method(rb_cArray, "at", ary_at, filename);
 rb_define_method(rb_cArray, "clear", ary_clear, filename);
 rb_define_method(rb_cArray, "select", ary_select, filename);
 rb_define_method(rb_cArray, "collect", ary_collect, filename);
 rb_define_method(rb_cArray, "map", ary_collect, filename);
 rb_define_method(rb_cArray, "collect!", ary_collect_bang, filename);
 rb_define_method(rb_cArray, "map!", ary_collect_bang, filename);
 rb_define_method(rb_cArray, "dup", ary_dup, filename);
 rb_define_method(rb_cArray, "compact", ary_compact, filename);
 rb_define_method(rb_cArray, "compact!", ary_compact_bang, filename);
 rb_define_method(rb_cArray, "concat", ary_concat, filename);
 rb_define_method(rb_cArray, "count", ary_count, filename);
 rb_define_method(rb_cArray, "delete", ary_delete, filename);
 rb_define_method(rb_cArray, "delete_at", ary_delete_at_m, filename);
 rb_define_method(rb_cArray, "delete_if", ary_delete_if, filename);
 rb_define_method(rb_cArray, "drop", ary_drop, filename);
 rb_define_method(rb_cArray, "drop_while", ary_drop_while, filename);
 rb_define_method(rb_cArray, "empty?", ary_empty_p, filename);
 rb_define_method(rb_cArray, "fetch", ary_fetch, filename);
 rb_define_method(rb_cArray, "first", ary_first, filename);
 rb_define_method(rb_cArray, "flatten", ary_flatten, filename);
 rb_define_method(rb_cArray, "flatten!", ary_flatten_bang, filename);
 rb_define_method(rb_cArray, "include?", ary_include_p, filename);
 rb_define_method(rb_cArray, "replace", ary_replace, filename);
 rb_define_method(rb_cArray, "insert", ary_insert, filename);
 rb_define_method(rb_cArray, "join", ary_join, filename);
 rb_define_method(rb_cArray, "keep_if", ary_keep_if, filename);
 rb_define_method(rb_cArray, "last", ary_last, filename);
 rb_define_method(rb_cArray, "pop", ary_pop, filename);
 rb_define_method(rb_cArray, "rassoc", ary_rassoc, filename);
 rb_define_method(rb_cArray, "reject", ary_reject, filename);
 rb_define_method(rb_cArray, "reject!", ary_reject_bang, filename);
 rb_define_method(rb_cArray, "reverse", ary_reverse, filename);
 rb_define_method(rb_cArray, "reverse!", ary_reverse_bang, filename);
 rb_define_method(rb_cArray, "reverse_each", ary_reverse_each, filename);
 rb_define_method(rb_cArray, "rindex", ary_rindex, filename);
 rb_define_method(rb_cArray, "select!", ary_select_bang, filename);
 rb_define_method(rb_cArray, "shift", ary_shift, filename);
 rb_define_method(rb_cArray, "slice!", ary_slice_bang, filename);
 rb_define_method(rb_cArray, "take", ary_take, filename);
 rb_define_method(rb_cArray, "take_while", ary_take_while, filename);
 rb_define_method(rb_cArray, "to_a", ary_to_a, filename);
 rb_define_method(rb_cArray, "to_ary", ary_to_a, filename);
 rb_define_method(rb_cArray, "uniq", ary_uniq, filename);
 rb_define_method(rb_cArray, "uniq!", ary_uniq_bang, filename);
 rb_define_method(rb_cArray, "unshift", ary_unshift, filename);
 rb_define_method(rb_cArray, "&", ary_and, filename);
 rb_define_method(rb_cArray, "*", ary_times, filename);
 rb_define_method(rb_cArray, "[]", ary_aref, filename);
 rb_define_method(rb_cArray, "slice", ary_aref, filename);
 rb_define_method(rb_cArray, "[]=", ary_aset, filename);
};
/**
  @class Hash

  A {Hash} is a collection of key-value pairs. It is similar to an {Array}, 
  except that indexing is done via arbitrary keys of any object type, not an
  integer index. Hashes enumerate their values in the order that the 
  corresponding keys were inserted. 

  Hashes have a default value that is returned when accessing keys that do not
  exist in the hash. By default, that value is `nil`.
*/
var rb_cHash;
// @object ENV
var envtbl;
var RHash = function(args) {
  var k, v;
  this.$keys = [];
  this.$assocs = {};
  this.$default = Qnil;
  for (var i = 0; i < args.length; i++) {
    k = args[i], v = args[i+1];
    i++;
    this.$keys.push(k);
    this.$assocs[k.$hash()] = v;
  }
  return this;
};
// hash
// @global
opalhash = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};
/**
	Creates a new hash populated with the given objects. Equivalent to the 
	literal `{ key => value, ... }`. 

	@example
	  Hash["a", 100, "b", 200]
	  # => {"a" =>100, "b"=>200}

	@return [Hash]
*/
function hash_s_create(obj, mid) {
 return opalhash.apply(null, Array.prototype.slice.call(arguments, 2));
}
/**
	Returns a new array populated with the values from `self`.

	@example
	  h = { :a => 1, :b => 2 }
	  h.values
	  # => [1, 2]

	@return [Array]
*/
function hash_values(hash, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var result = [];
 for (var i = 0; i < hash.$keys.length; i++) {
  result.push(hash.$assocs[hash.$keys[i].$hash()]);
 }
 return result;
}
/**
	Returns the contents of this hash as a string.

	@example
	  h = { "a" => 100, "b" => 200 }
	  # => "{ \"a\" => 100, \"b\" => 200 }"

	@return [String]
*/
function hash_inspect(hash, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var description = [], key, value;
 for (var i = 0; i < hash.$keys.length; i++) {
  key = hash.$keys[i];
  value = hash.$assocs[key.$hash()];
  description.push(rb_call(key, "inspect") + "=>" + rb_call(value,"inspect"));
 }
 return "{" + description.join(", ") + "}";
}
/**
	Returns a string representation of the hash's keys and values

	@return [String]
*/
function hash_to_s(hash, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var description = [], key, value;
 for (var i = 0; i < hash.$keys.length; i++) {
  key = hash.$keys[i];
  value = hash.$assocs[key.$hash()];
  description.push(rb_call(key, "to_s") + rb_call(value, "to_s"));
 }
 return description.join("");
}
/**
	Calls `block` once for each key in `self`, passing the key-value pair as
	parameters.

	If no block is given, an enumerator is returned instead.

	@todo Enumerator functionality not yet implemented.

	@example
	  h = { "a" => 100, "b" => 200 }
	  h.each { |k, v| puts "#{k} is #{v}" }
	  # => "a is 100"
	  # => "b is 200"

	@return [Hash] returns reciever
*/
function hash_each(hash, mid) {
 if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
 var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "each" + " needs to return an enumerator");
 var keys = hash.$keys, length = keys.length, key;
 for (var i = 0; i < length; i++) {
   try {
  key = keys[i];
  __block__(__block__.$self,key, hash.$assocs[key.$hash()]);
  } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
 }
 return hash;
}
/**
  Searches through the hash comparing `obj` with the key using ==. Returns the
  key-value pair (two elements array) or nil if no match is found. See
  {Array#assoc}.

  @example
    h = { "a" => [1, 2, 3], "b" => [4, 5, 6] }
    h["a"]
    # => ["a", [1, 2, 3]]
    h["c"]
    # => nil

  @param [Object] obj key to search for
  @return [Array<Object, Object>, nil] result or nil
*/
function hash_assoc(hash, mid, obj) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var key;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    if ((rb_call(key, "==", obj)).$r)
      return [key, hash.$assocs[key.$hash()]];
  }
  return Qnil;
}
/**
  Equality - Two hashes are equal if they each contain the same number of keys
  and if each key-value pair is equal to (according to {Object#==}) the
  corresponding elements in the other hash.

  @example
    h1 = {"a" => 1, "c" => 2}
    h2 = {7 => 35, "c" => 2, "a" => 1}
    h3 = {"a" => 1, "c" => 2, 7 => 35}
    h4 = {"a" => 1, "d" => 2, "f" => 35}
    h1 == h2
    # => false
    h2 == h3
    # => true
    h3 == h4
    # => false

  @param [Hash] other another hash to comapre
  @return [Boolean]
*/
function hash_equal(hash1, mid, hash2) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  if (hash1 === hash2) return Qtrue;
  if (!(hash2.$flags & 512)) return Qfalse;
  if (hash1.$keys.length != hash2.$keys.length) return Qfalse;
  for (var i = 0; i < hash1.$keys.length; i++) {
    var key1 = hash1.$keys[i];
    var assoc1 = key1.$hash();
    if (!hash2.$assocs.hasOwnProperty(assoc1))
      return Qfalse;
    var assoc2 = hash2.$assocs[assoc1];
    if (!(hash1.$assocs[assoc1].$m["=="](hash1.$assocs[assoc1], assoc2)).$r)
      return Qfalse;
  }
  return Qtrue;
}
/**
  Element Reference - retrieves the `value` object corresponding to the `key`
  object. If not found, returns the default value.

  @example
    h = {"a" => 100, "b" => 200}
    h["a"]
    # => 100
    h["c"]
    # => nil

  @param [Object] key key to look for
  @return [Object] result or default value
*/
function hash_aref(hash, key) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var assoc = key.$hash();
 if (hash.$assocs.hasOwnProperty(assoc))
  return hash.$assocs[assoc];
 return hash.$default;
}
/**
  Element Assignment - Associates the value give by `value` with the key given
  by `key`. `key` should not have its value changed while it is in use as a
  key.

  @example
    h = {"a" => 100, "b" => 200}
    h["a"] = 9
    # => 9
    h["c"] = 4
    # => 4
    h
    # => {"a" => 9, "b" => 200, "c" => 4}

  @param [Object] key key for hash
  @param [Object] value value for key
  @return [Object] returns the value
*/
function hash_aset(hash, key, value) {
  if ((arguments.length - 1) != 2) { print(arguments.callee); rb_arg_error(arguments.length, 2); }
  var assoc = key.$hash();
  if (!hash.$assocs.hasOwnProperty(assoc))
    hash.$keys.push(key);
  return hash.$assocs[assoc] = value;
}
/**
  Removes all key-value pairs from `self`.

  @example
    h = { "a" => [1, 2, 3], "b" => [4, 5, 6] }
    h.clear
    # => {}

  @return [Hash] returns receiver
*/
function hash_clear(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  hash.$keys = [];
  hash.$assocs = {};
  return hash;
}
/**
  Returns the default value, the value that would be returned by hsh[key] if
  key did not exist in hsh.

  @example
    h = Hash.new          # => {}
    h.default             # => nil
    h.default(2)          # => nil

    h = Hash.new 'cat'    # => {}
    h.default             # => 'cat'
    h.default(2)          # => 'cat'

  @todo Using block as default does not currently work

  @param [Object] key to check with
  @return [Object] returns default
*/
function hash_default(hash, mid, key) {
  return hash.$default;
}
/**
  # Sets the default value, the value returned for a key that does not exist in
  # the hash. It is not possible to set the default to a {Proc} that will be
  # executed on each key lookup.
  # 
  # @example
  #   h = { "a" => 100, "b" => 200 }
  #   h.default = "Go fish"
  #   h['a']
  #   # => 100
  #   h['z']
  #   # => "Go fish"
  # 
  # @param [Object] obj the new default
  # @return [Object] returns the default value
*/
function hash_set_default(hash, mid, obj) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  return hash.$default = obj;
}
/**
  Deletes and returns a key-value pair from `self` whose key is equal to
  `key`. If the key is not found, returns the default value. If the optional
  code block is given and the key is not found, pass in the key and return
  the result of `block`.

  @todo Use with block functionality not yet implemented.

  @example
    h = { "a" => 100,  "b" => 200}
    h.delete("a")
    # => 100
    h.delete("z")
    # => nil

  @param [Object] key to delete
  @return [Object] returns value or default value
*/
function hash_delete(hash, mid, key) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var assoc = key.$hash();
  if (hash.$assocs.hasOwnProperty(assoc)) {
    var ret = hash.$assocs[assoc];
    delete hash.$assocs[assoc];
    hash.$keys.splice(hash.$keys.indexOf(key), 1);
    return ret;
  }
  return hash.$default;
}
/**
  Deletes every key-pair value from `self` for which block evaluates to   
  `true`.

  If no block is given, an enumerator is returned instead.

  @todo Enumerator functionality not yet implemented.

  @example
    h = { "a" => 100, "b" => 200, "c" => 300 }
    h.delete_if { |key, value| key >= "b" }
    # => { "a" => 100 }

  @return [Hash] returns receiver
*/
function hash_delete_if(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "delete_if" + " needs to return an enumerator");
  var key, value;
  for (var i = 0; i < hash.$keys.length; i++) {
    try {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    if ((__block__(__block__.$self,key, value)).$r) {
      hash_delete(hash, "delete", key);
      i--;
    }
    } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
  }
  return hash;
}
/**
  Calls block once for each key in `self`, passing key as a parameter.

  @example
    h = { "a" => 100, "b" => 200 }
    h.each_key { |key| puts key }
    # => "a"
    # => "b"

  @return [Hash] returns receiver
*/
function hash_each_key(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "each_key" + " needs to return an enumerator");
  var key;
  for (var i = 0; i < hash.$keys.length; i++) {
    try {
    key = hash.$keys[i];
    __block__(__block__.$self,key);
    } catch(e) { switch (e.$keyword) { case 2: return e["@exit_value"]; default: throw e; } }
  }
  return hash;
}
/**
  Calls `block` once for each key in `hsh`, passing the value as a parameter.

  @example
    h = { "a" => 100, "b" => 200 }
    h.each_value { |value| puts value }
    # => 100
    # => 200

  @return [Hash] returns receiver
*/
function hash_each_value(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; rb_block_func = rb_block_proc = Qnil; if (__block__ == Qnil) rb_raise(rb_eArgError, "each_value" + " needs to return an enumerator");
  var key, value;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    __block__(__block__.$self,value);
  }
  return hash;
}
/**
  Returns true if `self` contains no key-value pairs.

  @example
    {}.empty?
    # => true

  @return [Boolean]
*/
function hash_empty_p(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return hash.$keys.length == 0 ? Qtrue : Qfalse;
}
/**
  Returns a value from the hash for the given key. If the key can't be found,
  there are several options: With no other arguments, it will raise an
  KeyError exception; if `default` is given, then that will be returned; if 
  the optional code block is specified, then that will be run and its result
  returned.

  @example
    h = { "a" => 100, "b" => 200 }
    h.fetch("a")
    # => 100
    h.fetch("z", "Go fish")
    # => "Go fish"
    h.fetch("z") { |el| "Go fish, #{el}" }
    # => "Go fish, z"
    h.fetch("z")
    # => (opal):2: in `fetch`: key not found (KeyError)

  @param [Object] key the key to lookup
  @param [Object] defaults the default value to return
  @return [Object] value from hash
*/
function hash_fetch(hash, mid, key, defaults) {
  if ((arguments.length - 2) < 1) { print(arguments.callee); rb_arg_error(arguments.length - 2, 1); }
  var value = hash.$assocs[key.$hash()];
  if (value != undefined)
    return value
  else if (defaults == undefined)
    rb_raise(rb_eKeyError, "key not found: " + key.$m["inspect"](key));
  else
    return defaults;
}
/**
  Returns a new array that is a one-dimensional flattening of this hash. That
  is, for every key or value that is an array, extract its elements into the
  new array. Unlike {Array#flatten}, this method does not flatten recursively
  by default. The optional `level` argument determines the level of 
  recursion to flatten.

  @example
    a = { 1 => "one", 2 => [2, "two"], 3 => "three" }
    a.flatten
    # => [1, "one", 2, [2, "two"], 3, "three"]
    a.flatten(2)
    # => [1, "one", 2, 2, "two", 3, "three"]

  @param [Number] level the level to flatten until
  @return [Array] flattened hash
*/
function hash_flatten(hash, mid, level) {
  var result = [], key, value;
  if (level == undefined) level = 1;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    result.push(key);
    if ((value.$flags & 32)) {
      if (level == 1) {
        result.push(value);
      } else {
        var temp = value.$m["flatten"](value, level - 1);
        result = result.concat(temp);
      }
    } else {
      result.push(value);
    }
  }
  return result;
}
/**
  Returns `true` if the given `key` is present in `self`.

  @example
    h = { "a" => 100, "b" => 200 }
    h.has_key? "a"
    # => true
    h.has_key? "b"
    # => false

  @param [Object] key the key to check for
  @return [Boolean]
*/
function hash_has_key(hash, mid, key) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  if (hash.$assocs.hasOwnProperty(key.$hash()))
    return Qtrue;
  return Qfalse;
}
/**
  Returns `true` if the given `value` is present for some key in `self`.

  @example
    h = { "a" => 100,  "b" => 200 }
    h.has_value?(100)
    # => true
    h.has_value?(200)
    # => false

  @param [Object] value the value to check for
  @return [Boolean]
*/
function hash_has_value(hash, mid, value) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var key, val;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    val = hash.$assocs[key.$hash()];
    if ((value.$m["=="](value, val)).$r)
      return Qtrue;
  }
  return Qfalse;
}
/**
  Replaces the contents of `self` with the contents of `other_hash`.

  @example
    h = { "a" => 100, "b" => 200 }
    h.replace({ "c" => 200, "d" => 300 })
    # => { "c" => 200, "d" => 300 }

  @param [Hash] other_hash hash for contents
  @return [Hash] returns receiver
*/
function hash_replace(hash, mid, hash2) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  hash.$keys = [];
  hash.$assocs = {};
  for (var i = 0; i < hash2.$keys.length; i++) {
    var key = hash2.$keys[i];
    var val = hash2.$assocs[key.$hash()];
    hash.$keys.push(key);
    hash.$assocs[key.$hash()] = val;
  }
  return hash;
}
/**
  Returns a new hash created by using `self`'s values as keys, and the keys as
  values.

  @example
    h  = { "n" => 100, "m" => 100, "y" => 300, "d" => 200, "a" => 0 }
    h.invert
    # => { 0 => "a", 100 => "m", 200 => "d", 300 => "y" }

  @return [Hash] inverted hash
*/
function hash_invert(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  var res = new RHash([]);
  for (var i = 0; i < hash.$keys.length; i++) {
    var key = hash.$keys[i];
    var val = hash.$assocs[key.$hash()];
    res.$keys.push(val);
    res.$assocs[val.$hash()] = key;
  }
  return res;
}
/**
  Returns the key for a given value. If not found, returns `nil`.

  @example
    h = { "a" => 100, "b" => 200 }
    h.key(200)
    # => "b"
    h.key(300)
    # => nil

  @param [Object] value to check for
  @return [Object] key or nil
*/
function hash_key(hash, mid, value) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var key, val;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    val = hash.$assocs[key.$hash()];
    if ((value.$m["=="](value, val)).$r)
      return key;
  }
  return Qnil
}
/**
  Returns a new array populated with the keys from this hash. See also
  {Hash#values}.

  @example
    h = { "a" => 100, "b" => 200, "c" => 300 }
    h.keys
    # => ["a", "b", "c"]

  @return [Array] keys
*/
function hash_keys(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return hash.$keys.slice(0);
}
/**
  Returns the number of key-value pairs in the hash.

  @example
    h = { "a" => 100, "b" => 200 }
    h.length
    # => 2
    h.delete "a"
    h.length
    # => 1

  @return [Number] length
*/
function hash_size(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return hash.$keys.length;
}
/**
  Returns a new hash containing the contents of `other_hash` and the contents
  of `self`. If no block is specified, the value for entries with duplicate
  keys will be that of `other_hash`. Otherwise the value for each duplicate
  key is determined by calling the block with the key, its value in `self` and
  its valye in `other_hash`.

  @todo Block functionality not yet implemented.

  @example
    h = { "a" => 100, "b" => 200 }
    h2 = { "b" => 300, "c" => 400 }
    h.merge(h2)
    # => { "a" => 100, "b" => 300, "c" => 400 }
    h
    # => { "a" => 100, "b" => 200 }

  @param [Hash] other_hash hash to merge
  @return [Hash] returns new hash with merged contents
*/
function hash_merge(hash1, mid, hash2) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var result = new RHash([]), key, val;
  for (var i = 0; i < hash1.$keys.length; i++) {
    key = hash1.$keys[i], val = hash1.$assocs[key.$hash()];
    result.$keys.push(key);
    result.$assocs[key.$hash()] = val;
  }
  for (var i = 0; i < hash2.$keys.length; i++) {
    key = hash2.$keys[i], val = hash2.$assocs[key.$hash()];
    result.$keys.push(key);
    result.$assocs[key.$hash()] = val;
  }
  return result;
}
/**
  Adds the contents of `other_hash` to `self`. If no block is specified,
  entries with duplicate keys are overwritten with the values from
  `other_hash`, otherwise the value of each duplicate key is determined by
  calling the block with the key, its value in `self` and its value in
  `other_hash`.

  @todo Block functionality not yet implemented.

  @example
    h = { "a" => 100, "b" => 200 }
    h2 = { "b" => 300, "c" => 400 }
    h.merge!(h2)
    # => { "a" => 100, "b" => 300, "c" => 400 }
    h
    # => { "a" => 100, "b" => 300, "c" => 400 }

  @param [Hash] other_hash hash to merge
  @return [Hash] returns receiver
*/
function hash_update(hash1, mid, hash2) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var key, val;
  for (var i = 0; i < hash2.$keys.length; i++) {
    key = hash2.$keys[i], val = hash2.$assocs[key.$hash()];
    hash1.$keys.push(key);
    hash1.$assocs[key.$hash()] = val;
  }
  return hash1;
}
/**
  Searches through the hash comapring obj with the value using ==. Returns the
  first key-value pair (two-element array) that matches. See also 
  {Array#rassoc}.

  @example
    a = { 1 => "one", 2 => "two", 3 => "three" }
    a.rassoc "two"
    # => [2, "two"]
    a.rassoc "four"
    # => nil

  @param [Object] obj object to check
  @return [Array]
*/
function hash_rassoc(hash, mid, obj) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  var key, val;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    val = hash.$assocs[key.$hash()];
    if ((val.$m["=="](val, obj)).$r)
      return [key, val];
  }
  return Qnil;
}
/**
  Removes a key-value pair from `self` and returns it as the two-item array, 
  [key, value], or returns the hash's default value if the hash is empty.

  @example
    h = { :a => 1, :b => 2}
    h.shift
    # => [:a, 1]
    h
    # => {:b => 1}
    {}.shift
    # => nil

  @return [Array, Object] array or default value
*/
function hash_shift(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  var key, value;
  if (hash.$keys.length > 0) {
    key = hash.$keys[0];
    value = hash.$assocs[key.$hash()];
    hash.$keys.shift();
    delete hash.$assocs[key.$hash()];
    return [key, value];
  } else {
    return hash.$default;
  }
}
/**
  Convert `self` to a nested array of `[key, value]` arrays.

  @example
    h = { :a => 1, :b => 2, :c => 3 }
    h.to_a
    # => [[:a, 1], [:b, 2], [:c, 3]]

  @return [Array]
*/
function hash_to_a(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  var result = [], key, value;
  for (var i = 0; i < hash.$keys.length; i++) {
    key = hash.$keys[i];
    value = hash.$assocs[key.$hash()];
    result.push([key, value]);
  }
  return result;
}
/**
  Returns self.

  @return [Hash] self
*/
function hash_to_hash(hash, mid) {
  if ((arguments.length - 1) != 0) { print(arguments.callee); rb_arg_error(arguments.length, 0); }
  return hash;
}
function env_to_s(env) {
 return "ENV";
}
function env_inspect(env) {
 return "ENV";
}
function env_aref(env, key) {
 return Qnil;
}
var Init_Hash = function() {
 rb_cHash = rb_define_toll_free_class(RHash.prototype, 4 | 512,
                   'Hash', rb_cObject);
 RHash.prototype.$hash = function() {
   if (this.$id) return this.$id;
   return this.$id = opal_yield_hash();
 };
 rb_define_singleton_method(rb_cHash, "[]", hash_s_create);
 rb_define_method(rb_cHash, "values", hash_values);
 rb_define_method(rb_cHash, "inspect", hash_inspect);
 rb_define_method(rb_cHash, "to_s", hash_to_s);
 rb_define_method(rb_cHash, "each", hash_each);
 rb_define_method(rb_cHash, "each_pair", hash_each);
 rb_define_method(rb_cHash, "assoc", hash_assoc);
 rb_define_method(rb_cHash, "==", hash_equal);
 rb_define_method(rb_cHash, "eql?", hash_equal);
 rb_define_method(rb_cHash, "[]", hash_aref);
 rb_define_method(rb_cHash, "[]=", hash_aset);
 rb_define_method(rb_cHash, "store", hash_aset);
 rb_define_method(rb_cHash, "clear", hash_clear);
 rb_define_method(rb_cHash, "default", hash_default);
 rb_define_method(rb_cHash, "default=", hash_set_default);
 rb_define_method(rb_cHash, "delete", hash_delete);
 rb_define_method(rb_cHash, "delete_if", hash_delete_if);
 rb_define_method(rb_cHash, "each_key", hash_each_key);
 rb_define_method(rb_cHash, "each_value", hash_each_value);
 rb_define_method(rb_cHash, "empty?", hash_empty_p);
 rb_define_method(rb_cHash, "fetch", hash_fetch);
 rb_define_method(rb_cHash, "flatten", hash_flatten);
 rb_define_method(rb_cHash, "include?", hash_has_key);
 rb_define_method(rb_cHash, "member?", hash_has_key);
 rb_define_method(rb_cHash, "has_key?", hash_has_key);
 rb_define_method(rb_cHash, "key?", hash_has_key);
 rb_define_method(rb_cHash, "has_value?", hash_has_value);
 rb_define_method(rb_cHash, "value?", hash_has_value);
 rb_define_method(rb_cHash, "invert", hash_invert);
 rb_define_method(rb_cHash, "key", hash_key);
 rb_define_method(rb_cHash, "keys", hash_keys);
 rb_define_method(rb_cHash, "length", hash_size);
 rb_define_method(rb_cHash, "size", hash_size);
 rb_define_method(rb_cHash, "merge", hash_merge);
 rb_define_method(rb_cHash, "merge!", hash_update);
 rb_define_method(rb_cHash, "update", hash_update);
 rb_define_method(rb_cHash, "rassoc", hash_rassoc);
 rb_define_method(rb_cHash, "shift", hash_shift);
 rb_define_method(rb_cHash, "to_a", hash_to_a);
 rb_define_method(rb_cHash, "to_hash", hash_to_hash);
 envtbl = rb_obj_alloc(rb_cObject);
 rb_const_set(rb_cObject, "ENV", envtbl);
 rb_define_singleton_method(envtbl, "[]", env_aref);
 rb_define_singleton_method(envtbl, "to_s", env_to_s);
 rb_define_singleton_method(envtbl, "inspect", env_inspect);
};
/**
  @class Regexp

  A Regexp holds a regular expression, used to match a pattern against strings.
  Regexps are created using the `/.../` and `%r{...}` literals, and by the
  {Regexp.new} constructor.

  ## Implementation

  Toll free bridged with native regexp object.
*/
var rb_cRegexp;
// @class MatchData
var rb_cMatch;
/**
  Produce a nicely formatted string-version of `self`.

  @example
    /^abc/.inspect
    # => "/^abc/"

  @return [String] string
*/
function reg_inspect(reg, mid) {
  return reg.toString();
}
/**
  Equality - Two regexps are equal if their patterns are identical, they have
  the same character set code, and their {#casefold?} values are the same.

  @example
    /abc/ == /abc/x     # => false
    /abc/ == /abc/i     # => false
    /abc/ == /abc/n     # => false
    /abc/u == /abc/n    # => false

  @param [Regexp] other_regexp another regexp to comapre
  @return [Boolean]
*/
function reg_equal(reg, mid, reg2) {
  if ((arguments.length - 1) != 1) { print(arguments.callee); rb_arg_error(arguments.length, 1); }
  return reg.toString() === reg2.toString() ? Qtrue : Qfalse;
}
/**
  Returns a {MatchData} object describing the match, or `nil` if there was no
  match. This is equivalent to retrieving the value of the special variable
  $~ following a normal match. If the second parameter is present, it 
  specifies the position in the string to begin the search.

  @example
    /(.)(.)(.)/.match("abc")[2]
    # => "b"
    /(.)(.)/.match("abc")[2]
    # => "c"

  @todo Passing a block is not yet supported.

  @param [Sring] string to match against
  @return [MatchData, nil] result or nil
*/
function reg_match(reg, mid, str) {
  var test, match = Qnil;
 if (test = reg.exec(str)) {
  match = rb_obj_alloc(rb_cMatch);
  rb_ivar_set(match, '@data', []);
 }
 return match;
}
function match_to_a(match, mid) {
  return rb_ivar_get(match, "@data");
}
function match_inspect(match, mide) {
  return "#<MatchData \"\">";
}
function match_aref(match, mid, idx) {
  return Qnil;
}
var Init_Regexp = function() {
 // @class Regexp
 rb_cRegexp = rb_define_toll_free_class(RegExp.prototype, 4,
   "Regexp", rb_cObject);
 rb_define_method(rb_cRegexp, "inspect", reg_inspect);
 rb_define_method(rb_cRegexp, "==", reg_equal);
 rb_define_method(rb_cRegexp, "eql?", reg_equal);
 rb_define_method(rb_cRegexp, "match", reg_match);
 rb_cMatch = rb_define_class("MatchData", rb_cObject);
 rb_define_method(rb_cMatch, "to_a", match_to_a);
 rb_define_method(rb_cMatch, "inspect", match_inspect);
 rb_define_method(rb_cMatch, "aref", match_aref);
};
var rb_cProc;
function proc_to_proc(proc, mid) {
  return proc;
}
function proc_call(proc, mid) {
  var args = Array.prototype.slice.call(arguments, 2);
  // mid
  args.unshift('');
  // self
  args.unshift(proc.$self);
  return proc.apply(null, args);
}
function Init_Proc() {
  // @class Proc
  rb_cProc = rb_define_toll_free_class(Function.prototype, 4 | 128,
    "Proc", rb_cObject);
  Function.prototype.$hash = function() {
    if (this.$id) return this.$id;
   return this.$id = opal_yield_hash();
  };
  rb_define_method(rb_cProc, "to_proc", proc_to_proc);
  rb_define_method(rb_cProc, "call", proc_call);
}
var rb_cRange;
/**
  Global VM method used for creating a range (from the VM)
  
  FIXME: This should be placed in vm.js
*/
global.rb_vm_range = function(beg, end, exclude_end) {
  return new RRange(beg, end, exclude_end)
};
/**
  Range ruby object
*/
function RRange(beg, end, exclude_end) {
  // begin - first item belonging to range
  this.$beg = beg;
  // end - last item belonging to range
  this.$end = end;
  // exclude end - whether last item is excluded or not
  this.$exc = exclude_end;
  return this;
}
function range_to_s(range, mid) {
  var str = range.$beg.$m["to_s"](range.$beg);
  var str2 = range.$end.$m["to_s"](range.$end);
  var join = range.$exc ? "..." : "..";
  return str + join + str2;
}
function range_inspect(range, mid) {
  var str = range.$beg.$m["inspect"](range.$beg);
  var str2 = range.$end.$m["inspect"](range.$end);
  var join = range.$exc ? "..." : "..";
  return str + join + str2;
}
function Init_Range() {
  rb_cRange = rb_define_toll_free_class(RRange.prototype, 4 | 1024,
   "Range", rb_cObject);
 RRange.prototype.$hash = function() {
   if (this.$id) return this.$id;
   return this.$id = opal_yield_hash();
 };
 rb_define_method(rb_cRange, "to_s", range_to_s);
 rb_define_method(rb_cRange, "inspect", range_inspect);
}
// extra runtime files
// set the constant on the given class
var rb_const_set = function(klass, id, val) {
  // klass.$i[id] = val;
  klass.$c_prototype[id] = val;
  return val;
};
var rb_const_get = function(klass, id) {
  // print("finding id: " + id);
  // io_puts('finding id ' + id);
  // io_puts(klass.__classid__);
  // io_puts(klass.$f);
  if (klass.$c[id])
    return (klass.$c[id]);
  var parent = klass.$parent;
  // io_puts(parent.__classid__);
  // stop infinite loop (objects object is object??)
  while (parent && parent != rb_cObject) {
    // io_puts(parent.__classid__);
    // print(parent == rb_cObject);
    if (parent.$c[id])
      return parent.$c[id];
    parent = parent.$parent;
  }
  // print("trying from " + klass.__classid__);
  // for (var prop in klass.$c) print(prop);
  io_puts("Cannot find constant: " + id);
  rb_raise(rb_eNameError, 'uninitialized constant ' + id);
};
// is const defined
var rb_const_defined = function(klass, id) {
  if (klass.$c[id])
    return true;
  return false;
};
// set ivar
// @global
rb_ivar_set = function(obj, id, val) {
  obj[id] = val;
  return val;
};
// @global
rb_ivar_get = function(obj, id) {
  return obj.hasOwnProperty(id) ? obj[id] : Qnil;
};
// @global
rb_ivar_defined = function(obj, id) {
  return obj.hasOwnProperty(id) ? true : false;
};
// global id table
// @local
// 
// @entries are mapped globalid => Object. Object contains the keys:
//  - name, value, getter, setter.
var rb_global_tbl = {};
// defined a hooked (global) variable
// 
// @local
// 
// @param [String] name the name of the global (e.g. '$:')
// @param [Function] getter the getter function to use for the variable
// @param [Function] setter the setter function to use for setting variable
// @returns null
// 
var rb_define_hooked_variable = function(name, getter, setter) {
  var entry = {
    "name": name,
    "value": Qnil,
    "getter": getter,
    "setter": setter
  };
  rb_global_tbl[name] = entry;
};
// A default read only getter for a global variable. This will simply throw a
// name error with the given id. This can be used for variables that should not
// be altered.
var rb_gvar_readonly_setter = function(id, value) {
  rb_raise(rb_eNameError, id + " is a read-only variable");
};
// Retrieve a global variable. This will use the assigned getter.
// 
// @local
var rb_gvar_get = function(id) {
  var entry = rb_global_tbl[id];
  if (!entry) return Qnil;
  return entry.getter(id);
};
// Set a global. If not already set, then we assign basic getters and setters
// 
// @local
var rb_gvar_set = function(id, value) {
  var entry = rb_global_tbl[id];
  if (entry) return entry.setter(id, value);
  // make a new default..
  rb_define_hooked_variable(id,
    // getter
    function(id) {
      return rb_global_tbl[id].value;
    },
    // setter
    function(id, value) {
      return rb_global_tbl[id].value = value;
    }
  );
  return rb_gvar_set(id, value);
};
// Every object has a unique id. This count is used as the next id for the next
// created object. Therefore, first ruby object has id 0, next has 1 etc.
var opal_hash_yield = 0;
// Yield the next object id, updating the count, and returning it.
var opal_yield_hash = function() {
  return opal_hash_yield++;
};
// The root class. Every class in opal is an instance of RClass.
var RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$id = opal_yield_hash();
  // Ivars. All ivars etc stored in here - no longer?
  // this.$i = {};
  // Constants. All constants belonging to class stored here.
  // this.$c = {};
  // SuperClass.
  this.$super = super_klass;
  // Method_table - all methods are stored here. This is prototype based so that
  // methods are inherited between subclasses etc.
  // 
  // m_tbl is the actual instance
  // m_prototype_tbl is the prototype, so add methods to that so that they get 
  // inherited
  if (super_klass) {
    // console.log("inheriting");
    var ctor = function() {};
    ctor.prototype = super_klass.$m_prototype_tbl;
    var m_ctor = function() {};
    m_ctor.prototype = new ctor();
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    // constants..
    var cctor = function() {};
    cctor.prototype = super_klass.$c_prototype;
    var c_ctor = function() {};
    c_ctor.prototype = new cctor();
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  else {
    // console.log("making fresh");
    // root object behaviour..
    var m_ctor = function() {};
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    // constants..
    var c_ctor = function() {};
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  // methods added to this actual class instance
  this.$method_table = {};
  return this;
};
// Flags. Every RClass instance is simply a T_CLASS, so mark as so.
RClass.prototype.$flags = 1;
// RTest/truthiness - every RClass instance is true.
RClass.prototype.$r = true;
// method missing support - these are methods called, so we need to register them for method
// missing on rb_cBasicObject.
//
// All added method names should set $isMM to true so that respond_to? can determine if it is
// a method, or just a MM shortcut. normal methods dont have $isMM.
RClass.prototype.$M = function(method_ids) {
  for (var i = 0; i < method_ids.length; i++) {
    // only add if not already defined..
    if (!rb_cBasicObject.$m_prototype_tbl[method_ids[i]]) {
      rb_cBasicObject.$m_prototype_tbl[method_ids[i]] = (function(id) {
       return function() {
         // should call self.$m.method_missing..
         throw new Error(id + " is needed for method_missing");
        };
     })(method_ids[i]);
    }
  }
};
// hash literals
RClass.prototype.$H = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};
// block call
RClass.prototype.$B = function(mid, block) {
  var args = [].slice.call(arguments, 2), self = this;
  //console.log("in $B for " + self + "    " + mid);
  //console.log(self);
  args.unshift(self);
  //console.log(1);
  rb_block_proc = block;
 var func = self.$m['$' + mid];
 //console.log(2);
 if (func) {
  // method exists..
  rb_block_func = func;
  return func.apply(null,args);
 } else {
  // method_missing
    console.log("method missing for block call " + mid);
  func = self.$m['$method_missing'];
  rb_raise(rb_eRuntimeError,
    "need to forward rb_block_call to method missing");
 }
  return Qnil;
};
// The root object. Every object in opal (apart from toll free bridged classes 
// like array, string etc) are an instance of RObject.
var RObject = function(klass) {
  // Hash. get out object_id
  this.$id = opal_yield_hash();
  // Ivars. no longer?
  // this.$i = {};
  // klass of the object becomes klass
  this.$klass = klass;
  // from the class, we set our local methods property (in sync with our class)
  this.$m = klass.$m_tbl;
  // return object.
  return this;
};
// Flags - every RObject instance is simply a T_OBJECT
RObject.prototype.$flags = 4;
// RTest - every RObject instance is true.
RObject.prototype.$r = true;
// method missing
RObject.prototype.$M = RClass.prototype.$M;
RObject.prototype.$H = RClass.prototype.$H;
RObject.prototype.$B = RClass.prototype.$B;
RObject.prototype.$hash = RClass.prototype.$hash = function() {
  return this.$id;
};
// define method
rb_define_method = function(klass, name, body, file_name, line_number) {
  rb_define_method_raw(klass, name, body);
  if (!body.$rbName) {
    body.$rbName = name;
  }
  return Qnil;
  // // console.log("defininf " + name + " on:");
  //   // console.log(klass);
  //   klass.$m_prototype_tbl['$' + name] = body;
  //   klass.$method_table['$' + name] = body;
  //  // only define method name if not already set (alias, include etc)
  //  if (!body.displayName) {
  //    body.displayName = klass.__classid__ + "#" + name;
  //    // if we have a filename:
  //    if (file_name) {
  //      body.displayName += " at " + file_name;
  //    }
  //    
  //  }
  //  
  //   // if we are adding to a module, then check to see if mdethod needs to be
  //   // included into "included_in" classes
  //   if (klass.$flags & T_MODULE) {
  //     // print("in module for: " + name);
  //     // print(klass.$h);
  //     // for (var prop in klass) print(prop);
  //     if (klass.$included_in) {
  //       for (var i = 0; i < klass.$included_in.length; i++) {
  //         // deleted this..
  //        // rb_define_method(klass.$included_in[i], name, body);
  //        // replaced with this..
  //        klass.$included_in[i].$m_prototype_tbl['$' + name] = body;
  //        klass.$included_in[i].$method_table['$' + name] = body;
  //       }
  //       // for (var recv_klass in klass.$included_i)
  //       // print("need to include in: " + klass.$i.__classid__);
  //       // klass.$m_prototype_tbl['$' + name] = body;
  //     }
  //   }
};
/**
  The raw functionality of rb_define_method. Seeing as rb_define_method can be
  overriden in debug mode, this is the raw functionlaity used to actually define
  a method. Any wrapper functions are assumed to have been already applied, so
  calling this will apply the method to the receiver directly.
*/
function rb_define_method_raw(klass, name, body) {
  // insert raw method into prototype chain
  klass.$m_prototype_tbl[name] = body;
  // insert method into singular method table (methods defined ON this class)
  klass.$method_table[name] = body;
  // if in module, apply method to all classes we are included in
  if (klass.$included_in) {
    for (var i = 0; i < klass.$included_in.length; i++) {
      // insert method into both prototype and singular chain.
      klass.$included_in[i].$m_prototype_tbl[name] = body;
   klass.$included_in[i].$method_table[name] = body;
    }
  }
}
function rb_define_global_function(name, body) {
 rb_define_method(rb_mKernel, name, body);
 rb_define_singleton_method(rb_mKernel, name, body);
};
// singleton method
rb_define_singleton_method = function(klass, name, body) {
  rb_define_method(rb_singleton_class(klass), name, body);
};
var rb_define_alias = function(base, new_name, old_name) {
  rb_define_method(base, new_name, base.$m_tbl[old_name]);
  return Qnil;
};
// Class#new
var rb_class_new_instance = function(klass) {
  var result = rb_obj_alloc(klass);
  // call initialize
  return result;
};
// Class#allocate
// @global
rb_obj_alloc = function(klass) {
  var result = new RObject(klass, 4);
  return result;
};
// call from js
function rb_call(recv, mid) {
 // all args are just from our arguments
 var args = Array.prototype.slice.call(arguments, 0);
 // recv
  // args.unshift(recv);
 // simply replace mid with our block (nil)
 // args[1] = Qnil;
 // check method exists
 return (recv.$m[mid] || rb_vm_meth_m).apply(null, args);
}
// normal return called in normal context? (should just be the same as block???)
// @global
rb_vm_return = function(value) {
  console.log("throwing rb_vm_return");
  rb_ivar_set(rb_vm_return_instance, '@exit_value', value);
  throw rb_vm_return_instance;
};
// called (thrown) when returning inside a while loop
// @global
rb_vm_loop_return = function(value) {
  console.log("throwing rb_vm_loop_return");
  rb_ivar_set(rb_vm_loop_return_instance, '@exit_value', value);
  throw rb_vm_loop_return_instance;
};
// called (thrown) when returning inside a block (that might be called by a 
// while loop
// @global
rb_vm_block_return = function(value, jump_function) {
  // console.log("throwing rb_vm_block_return");
  rb_ivar_set(rb_vm_block_return_instance, '@exit_value', value);
  rb_ivar_set(rb_vm_block_return_instance, '@jump_function', jump_function);
  throw rb_vm_block_return_instance;
};
// called for next keyword
rb_vm_next = function(value) {
  rb_ivar_set(rb_vm_next_instance, '@exit_value', value);
  throw rb_vm_next_instance;
};
// need fixing:
// global
rb_break = function(value) {
  rb_ivar_set(rb_vm_break_instance, "@exit_value", value);
  throw rb_vm_break_instance;
};
// raise exception class with our given string
// @global
rb_raise = function(exc, str) {
  if (str == undefined) {
    str = exc;
    exc = rb_eException;
  }
  var exception = new RObject(exc, 4);
 // var exception = exc_new_instance(exc);
  rb_ivar_set(exception, '@message', str);
  rb_vm_raise(exception);
};
// convert natiuve error into proper error
rb_vm_make_exception = function(native_error) {
  var exc = new RObject(rb_eException, 4);
  rb_ivar_set(exc, '@message', new String(native_error));
  return exc;
};
// raise an exception instance (DO NOT pass strings to this)
rb_vm_raise = function(exc) {
  // backtrace
  rb_ivar_set(exc, '@backtrace', debug_stack.slice(0, debug_stack.length));
  throw exc;
};
/**
	Throw an argument error when the wrong number of arguments were given to a 
	method
	
	@param [Number] given the number of arguments actually given
	@param [Number] expected the number of arguments we expected to have
*/
function rb_arg_error(given, expected) {
 rb_raise(rb_eArgError,
  "wrong number of arguments(" + given + " for " + expected + ")");
}
/**
	Convert the given object into a number using #to_int. DO NOT check whether it
	is already a number (it has already been checked).
	
	This may raise a TypeError if number cannot be converted
*/
function to_num(obj) {
 if (obj.$m.$to_int) {
  var result = obj.$m.$to_int(obj, Qnil);
  // make sure result is actually a number..
  if ((result.$flags & 64)) return result;
  rb_raise(rb_eTypeError,
   "can't convert Object to Integer (Object#to_int gives String)");
 }
 rb_raise(rb_eTypeError, "can't convert Object into Integer");
}
/**
	Convert the given object to an array using #to_ary.
*/
function to_ary(obj) {
 rb_raise(rb_eTypeError, "can't convert Object into Array");
}
/**
  Convert the given object into a string
*/
function to_str(obj) {
  return obj.$m.$to_s(obj);
}
// Run a function - this should be used as an entry point for anything that 
// calls ruby code or may throw an error.
// 
// This is only an entry point, so system events, ruby_init() etc should use
// this. Browser wraps every DOM event in this, for instance.
// 
// @global
rb_run = function(func) {
  // always clear backtrace
  debug_stack.length = 0;
  try {
    debug_stack_push([rb_run], [rb_top_self]);
    return func();
  }
  catch(err) {
    if (err['@message']) {
      err.message = err['@message'];
    }
    console.log(err.stack);
    // should check if err is native or ruby error (.$k) also check not string
    //if (err.$klass && typeof err != "string") {
      // print('caught error: ' + err.__classid__);
      //print(err.$klass.__classid__ + ': ' + err['@message']);
   //if (err['@backtrace']) {
   //  debug_print_backtrace(err['@backtrace']);
   //}
    //}
    //else {
    //  print('NativeError: ' + err);
 //		debug_print_backtrace(debug_stack);
   // }
  }
};
// Stack trace support
rb_run.$rbName = "<main>"
exports.rb_run = rb_run;
// Opal module within ruby
// @local
var rb_mOpal;
global.rb_block_func = global.rb_block_proc = Qnil;
/**
	A method call (from the VM) with a block must use this method. This method 
	sets the block and ensures the right method can receive it. To do this, the
	following varoables are set (globally):
	
	* rb_block_proc - the actual proc object (function). This is the proc that
										yield should use.
										
	* rb_block_func - the function prototype that the block was sent to. This will
										be ary_each, for Array#each (for example). ary_each must
										then check the global func is itself to ensure the right
										method is capturing the block (and then set it to Qnil)
	
	At this point, there is no guarantee that the method even exists, so we need
	to check first. Also, if it doesnt, we dispatch to method_missing and we must
	then fix the rb_block_func global to point to the method_missing instead.
*/
global.rb_block_call = function rb_block_call(block, self, mid) {
 // print("block is: " + block);
 rb_block_proc = block;
 var func = self.$m['m$' + mid];
 if (func) {
  // method exists..
  rb_block_func = func;
  return func.apply(null, Array.prototype.slice.call(arguments, 2));
 } else {
  // method_missing
  func = self.$m['$method_missing'];
  rb_raise(rb_eRuntimeError,
    "need to forward rb_block_call to method missing");
 }
}
/**
  Call a super method.
  
  callee is the function that actually called super(). We use this to find the
  right place in the tree to find the method that actually called super. This is
  actually done in rb_super_find, 
*/
global.rb_super = function(callee, mid, self, args) {
  // print("looking for super " + callee);
  var func = rb_super_find(self.$klass, callee, mid);
  if (!func)
    rb_raise(rb_eNoMethodError, "super: no super class method `" + mid + "`" +
      " for " + self.$m["inspect"](self));
  // print("found the super!" + func);
  var args_to_send = [self, mid].concat(args);
  return func.apply(null, args_to_send);
};
/**
  Actually find super impl to call.  Returns null if cannot find it.
  This is the debug version!!!!!!!!!!!!!!!!!!!!. also need non debug version
*/
function rb_super_find(klass, callee, mid) {
  var mid = '$' + mid;
  var cur_method;
  // find current method
  while (klass) {
    if (klass.$method_table[mid]) {
      if (klass.$method_table[mid].$wrapped == callee) {
        // cur_method = klass.$method_table[mid];
        break;
      }
    }
    klass = klass.$super;
  }
  if (!klass) return null;
  // find super() from klass up
  klass = klass.$super;
  while (klass) {
    if (klass.$method_table[mid]) {
      return klass.$method_table[mid];
    }
    klass = klass.$super;
  }
  return null;
}
// define class/module
// @global
rb_vm_class = function(base, super_class, id, body, flag) {
  var klass;
  switch (flag) {
    // normal class
    case 0:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & 4)
        base = rb_class_real(base.$klass);
      // If no superclass specified, use Object.
      if (super_class == Qnil)
        super_class = rb_cObject;
      klass = rb_define_class_under(base, id, super_class);
      break;
    // class shift (<<)
    case 1:
      klass = rb_singleton_class(base);
      break;
    // module
    case 2:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & 4)
        base = rb_class_real(base.$klass);
      klass = rb_define_module_under(base, id);
      break;
    // If default, something has gone wrong (in compiler).
    default:
      rb_raise(rb_eException, "define_class got a unknown flag " + flag);
  }
  // evaluate and return class body using class as the self
  return body(klass);
};
// define method (normal or singleton)
// @global
rb_vm_defn = function(base, m_id, body, singleton) {
  // print("defining: " + m_id);
  if (singleton) {
    // print("defining singleton method: " + m_id);
    rb_define_singleton_method(base, m_id, body);
  }
  else {
    if (base.$flags & 4)
      base = base.$klass;
    rb_define_method(base, m_id, body);
  }
  // always return nil
  return Qnil;
};
global.rb_vm_meth_m = function(recv, mid) {
  var args = [recv, 'method_missing'].concat(
    Array.prototype.slice.call(arguments, 1));
    return recv.$m.$method_missing.apply(null, args);
}
// Get constant from base
// @global
rb_vm_cg = function(base, id) {
  if (base.$flags & 4)
    base = rb_class_real(base.$klass);
  return rb_const_get(base, id);
};
// Set constant in base
// @global
rb_vm_cs = function(base, id, val) {
  if (base.$flags & 4)
    base = rb_class_real(base.$klass);
  return rb_const_set(base, id, val);
};
// get global by id
// @global
rb_vm_gg = function(id) {
  return rb_gvar_get(id);
};
// set global by id
// @global
rb_vm_gs = function(id, value) {
  return rb_gvar_set(id, value);
};
var opal_context_eval = function(opal, mid, block, self, string, filename, lineno) {
 var code = exports.compile(string);
  var func = new Function('self', '__FILE__', code);
  return func(self, rb_expand_path(filename));
};
var opal_s_compile = function(opal, mid, string) {
  var code = exports.compile(string);
  return "function(self, __FILE__) {" + code + "}";
}
/**
  top self #to_s
*/
function top_self_to_s(self, mid) {
  //ARG_COUNT(0)
  return "main";
}
/**
  top self #include(mod)
*/
function top_self_include(self, mod) {
  rb_include_module(rb_cObject, mod);
}
var Init_VM = function() {
 //rb_mOpal = rb_define_module('Opal');
 //rb_define_singleton_method(rb_mOpal, 'context_eval', opal_context_eval);
 //rb_define_singleton_method(rb_mOpal, 'compile', opal_s_compile);
  // Top self
  console.log("init top self");
 rb_top_self = rb_obj_alloc(rb_cObject);
  //rb_top_self.$dm('to_s', top_self_to_s, 1);
  rb_define_singleton_method(rb_top_self, "to_s", top_self_to_s);
  rb_define_singleton_method(rb_top_self, "include", top_self_include);
 //rb_const_set(rb_cObject, "RUBY_PLATFORM", opal_ruby_platform);
};
// NEW - we piggy back nodejs loading system....yay!
// basically just wrap require(). should we try/catch to make a nicer ruby
// error? probably..
//
// Also, this will return Qtrue or Qfalse - it will not return the exports
// as we cant do anything with them...maybe obj_require should return true
// and this should retunr the exports so that opal libraries can use them.
// ..
var rb_require = function(fname) {
  console.log("trying to require: " + fname);
  require(fname);
  return Qtrue;
};
// OLD
// All extensions that are loadable. Currently only 'rb' and 'js' are supported.
// Loaders register their extension and their factory function which should take
// a single argument: fname. This is the filename (already assured to exist),
// and the loader will need to load that file. Loaders do not need to worry 
// about making sure files are not included twice, this will be done before 
// the factories are actually called.
// 
// @local
var extensions = {};
rb_load_paths = load_paths;
/**
  Ruby loader. This will load raw ruby code (compile => run)
*/
extensions[".rb"] = function(fname) {
  // get file content
  var content = rb_read_file(fname).toString();
  // compile ruby
  var code = exports.compile(content);
  // print('#################################################################');
  console.log(code);
  // function prototype. we only pass filename as argument.
  var func = new Function(code);
  // execute function (code)
 // print("===== loading at " + fname);
 print(rb_expand_path(fname));
 // print("!!!!!");
  func.call(rb_top_self);
};
/**
  Javascript loader. This will just raw eval the given javascript (wrapped in a
  closure).
*/
extensions[".js"] = function(fname) {
};
// All files that have already been loaded: we do not want to load a file more
// than once. This is a fully path (path + extension). Key is the filename, and
// value is the relative feature.
var loaded_filenames = {};
// All features that have been loaded. These are qualified from their load_path
// onwards, so for '/Users/adam/lib/a/b.rb', we use 'a/b.rb'
var loaded_features = [];
// Main way to require a file. This is the method that can be used from ruby or
// from javascript directly.
// 
// @local
//var rb_require = function(fname) {
//  var resolved = resolve_require_filename(fname);
  // if we have already loaded the file, return false.. (no error)
//  if (loaded_filenames[resolved[0]]) return Qfalse;
  // we have not loaded the file, so load it
//  loaded_filenames[resolved[0]] = resolved[1];
//  loaded_features.push(resolved[1]);
  // get the correct extension
//  var ext_name = rb_file_extname(resolved[0]);
//  extensions[ext_name](resolved[0]);
//  return Qtrue;
//};
// Find correct filename for the given fname path
// 
// @returns [full_path, feature_path]
var resolve_require_filename = function(fname) {
  var resolved = find_require_filename(fname);
  if (!resolved) {
    // could not find a file, so LoadError..
    rb_raise(rb_eLoadError, 'no such file to load -- ' + fname);
  }
  return resolved;
};
// Find the filename to use for the require (do not actually require it!!), or
// return false if one cannot be found. To do this, loop over each load_path,
// and with each registered extension, using the given fname.
var find_require_filename = function(fname) {
  // current path to lookup
  var cur_path, given_ext = rb_file_extname(fname);
  // loop over each load_path
  for (var path_idx = 0; path_idx < load_paths.length; path_idx++) {
    // if we were given an extension, dont loop through, just use that
    if (given_ext) {
      cur_path = rb_file_join(load_paths[path_idx], fname + ext_name);
      if (opal_file_exists(cur_path)) {
        return [cur_path, cur_path];
      }
    }
    else {
      // loop over each extension
      for (var ext_name in extensions) {
        cur_path = rb_file_join(load_paths[path_idx], fname + ext_name);
        if (opal_file_exists(cur_path))
          // cur_path is our file to load!!
          return [cur_path, fname + ext_name];
      }
    }
  }
  // try full path..
  // FIXME: this doesnt support windows paths, and doesnt check the extension
  // name!!
  if (fname[0] === '/') {
    // if we have an extension..
    if (given_ext) {
      if (opal_file_exists(fname)) {
        return [fname, fname];
      }
    }
    // otherwise loop over all extensions..
    else {
      for (var ext_name in extensions) {
        cur_path = fname + ext_name;
        if (opal_file_exists(cur_path)) {
          return [cur_path, cur_path];
        }
      }
    }
  }
  // could not find a path to load
  return false;
};
// gets the load path
// @local
var load_path_getter = function(id) {
  return load_paths;
};
// gets laoded features
var loaded_feature_getter = function(id) {
  return loaded_features;
};
var Init_Load = function() {
  //print("adding load path:" + exports.opal_lib_path);
  // add core libs to load_paths
  load_paths.unshift(exports.opal_lib_path);
rb_define_hooked_variable('$:', load_path_getter, rb_gvar_readonly_setter);
rb_define_hooked_variable("$LOAD_PATH", load_path_getter, rb_gvar_readonly_setter);
rb_define_hooked_variable('$"', loaded_feature_getter, rb_gvar_readonly_setter);
 //rb_const_set(rb_cObject, 'ARGV', init_argv);
};
// Initialize ruby/opal. This should really get passed ARGV, but we will do this
// later.
// make sure init/main are only called once.
var rb_opal_done_init = false,
  rb_opal_done_main = false;
// where we can save our global argv once calculated
var init_argv = [];
exports.init = function() {
 if (rb_opal_done_init) return;
 rb_opal_done_init = true;
  //Init_Debug_Mode();
 // core inits.
 Init_Object();
 Init_Array();
 Init_Numeric();
 Init_Hash();
 //Init_Regexp();
 Init_Load();
 //Init_IO();
 //Init_Dir();
 Init_VM();
 Init_Exception();
 Init_String();
 Init_Proc();
 //Init_Range();
  // if running in browser, init it
  //if (typeof Init_Browser != 'undefined') Init_Browser();
  // Instead of init_browser, each platform will have its own Init_Platform
  // method; node uses this to init FS module etc, and all the File and Dir
  // methods; while browser uses this to Init Browser, Element, Document etc.
  Init_Platform();
};
// main.. we might or might not call this.. more likely we will...
// init() just boots, where as main() will load a specific program
exports.main = function() {
 if (rb_opal_done_main) return;
 rb_opal_done_main = true;
 // make sure we are init()ed
 exports.init();
 // deal with argv. argv is from native, so includes program name at [0]
 var argv = exports.argv;
 // have we finished with flags ('-')
 var finished_flags = false;
 // all flags - ignore these for now
 var all_flags = [];
 // program name..
 var program_name = null;
 for (var i = 1; i < argv.length; i++) {
    // print(argv);
  if (argv[i][0] === '-' && !finished_flags) {
   all_flags.push(argv[i]);
  }
  else {
   // ensure we are done with flags..
   finished_flags = true;
   // it is porogram name unless already set
   if (program_name == null) {
    program_name = argv[i];
   }
   else {
    init_argv.push(argv[i]);
   }
  }
 }
 // if we have a program name, then lets run it. if not, print help
 if (program_name) {
  rb_run(function() {
    if (opal_file_exists(program_name))
     extensions['.rb'](program_name);
   else
     rb_raise(rb_eLoadError, "Cannot find bin file: " + program_name);
  });
 }
 else {
    exports.start_repl();
 }
};
exports.print_help = function() {
 var help = [
  "Usage: opal [switches] [programfile] [arguments]"
 ];
 for (var i = 0; i < help.length; i++) {
  print(help[i]);
 }
};
// Hash of module names to their implementation.
var MODULES = {};
// Used to register a single module
exports.module = function(module_name, module_body) {
  console.log('defining module ' + module_name);
};
// Used to register a package
exports.package = function() {
};
// External interface to require/run a module. This simply uses the internal
// require system, so a module will only ever be called once as per commonjs.
exports.require = function(module_name) {
};
// regexp for matching uri. will match as:
// 
// [
//  url,
//  scheme,
//  ..,
//  userinfo,
//  user,
//  password,
//  domain,
//  port,
//  ..
//  path,
//  ..,
//  ..,
//  query,
//  fragment
// ]
var URI_REGEXP = new RegExp("^(?:([^:/?#]+):)?(?://((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?))?((((?:[^?#/]*/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)");
var OpalURI = function(scheme, userinfo, host, port, registry, path, opaque, query, fragment) {
  this.scheme = scheme;
  this.user = userinfo.substr(0, userinfo.indexOf(':'));
  this.password = userinfo.substr(userinfo.indexOf(':') + 1);
  this.host = host;
  this.port = port;
  this.registry = registry;
  this.path = path;
  this.query = query;
  this.opaque = opaque;
  this.fragment = fragment;
  return this;
};
// parse the given uri string into a URI
OpalURI.parse = function(uri_str) {
  // console.log("parsing " + uri_str);
  // console.log(URI_RegExp.exec(uri_str));
  var res = URI_REGEXP.exec(uri_str);
  return new OpalURI( res[1] || "", // scheme 
                      res[3] || "", // userinfo
                      res[6] || "", // host
                      res[7] || "", // port
                      "", // registry
                      res[9], // path
                      "", // opaque
                      res[12] || "", // query
                      res[13] || "" // fragment
                      );
};
OpalURI.prototype.toString = function() {
  return "#<OpalURI \"" + this.to_s() + "\">";
};
// to_s
OpalURI.prototype.to_s = function() {
  var str = [''];
  if (this.scheme) {
    str.push(this.scheme);
    str.push(':');
  }
  if (this.opaque) {
    // false
  }
  else {
    str.push('//');
    if (this.host) {
      str.push(this.host);
    }
    if (this.path) {
      str.push(this.path);
    }
  }
  return str.join("");
};
// duplicate
OpalURI.prototype.dup = function() {
  return new OpalURI(this.scheme, this.user + ':' + this.password, this.host, this.port, this.registry, this.path, this.opaque, this.query, this.fragment);
};
// ,merge other (String, URI)
OpalURI.prototype.merge = function(other) {
  if (typeof other == 'string') other = OpalURI.parse(other);
  var base = this.dup(), rel = other;
  base.path = this.merge_path(base.path, rel.path);
  return base;
};
// is uri absolute?
OpalURI.prototype.is_absolute = function() {
  return this.scheme ? true : false;
};
// is uri relative?
OpalURI.prototype.is_relative = function() {
  return !this.is_absolute();
};
OpalURI.prototype.extension = function() {
  var idx = this.path.lastIndexOf('.');
  return idx == -1 ? '' : this.path.substr(idx + 1);
};
OpalURI.prototype.merge_path = function(base, rel) {
  base = base.split('/');
  rel = rel.split('/');
  // console.log("starting witrh:");
  // console.log(base);
  // console.log(rel);
  if (base[base.length - 1] == '..') base.push('');
  // need to remove all '..' from base here.
  // todo.
  // if first in rel is empty, then rel began with a '/', so we need to redo
  // base completely (/x/y/z merged into /a/b/c simply becomes /x/y/z)
  if (rel[0] && rel[0] == '') {
    base = [];
    rel.shift();
  }
  if (rel[rel.length - 1] == '.' || rel[rel.length - 1] == '..') {
    rel.push('');
  }
  // remove all '.' from rel
  for (var i = 0; i < rel.length; i++) {
    if (rel[i] == '.') {
      rel.splice(i, 1);
      i--;
    }
  }
  var working = [];
  for (var i = 0; i < rel.length; i++) {
    if (rel[i] == '..') {
      if (working.length) working.pop();
    }
    else {
      working.push(rel[i]);
    }
  }
  var add_trailer = working.length > 0;
  // if base is empty
  if (base.length == 0) {
    base.push('');
  }
  else if (add_trailer) {
    // if we have a working, then remove one off base
    base.pop();
  }
  // add all from working
  if (working.length > 0) {
    add_trailer = false;
  }
  for (var i = 0; i < working.length; i++) {
    base.push(working[i]);
  }
  if (add_trailer) base.push('');
  // console.log("base and rel:");
  // console.log(base);
  // console.log(rel);
  // console.log(working);
  return base.join("/");
};
// does browser really have a platofrm??
var Init_Platform = function() { };
// init ruby asap
exports.init();
})(this, Opal);

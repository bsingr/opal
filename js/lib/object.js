// Root Types/Flags
    
// Core boot classes
rb_cBasicObject = null,
    rb_cObject = null,
    rb_cModule = null,
    rb_cClass = null;

// Other core classes/modules
var rb_mKernel,
    rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
    rb_proc,
		rb_cFile,
		rb_cDir;

// @global Top self context within ruby 
rb_top_self = null;

// some top level objects
Qnil = null;
Qfalse = null;
Qtrue = null;


function mod_name(mod) {
	return rb_ivar_get(mod, "__classid__");
}

function mod_eqq(mod, block, obj) {
	return obj_is_kind_of(obj, Qnil, mod);
}

function mod_define_method(mod, block, mid) {
	rb_define_method(mod, rb_call(mid, "to_s"), block);
  return Qnil;
}

function mod_attr_accessor(mod, block) {
	mod_attr_reader.apply(null, arguments);
	mod_attr_writer.apply(null, arguments);
	return Qnil;
}

function mod_attr_reader(mod, block) {
	var mid				 = null,
			attribute	 = null,
			attributes = Array.prototype.slice.call(arguments, 2);
	
	for (var i = 0; i < attributes.length; i++) {
		attribute = attributes[i];
		mid = rb_call(attribute, "to_s");

		rb_define_method(mod, mid, function(self) {
			return rb_ivar_get(self, "@" + mid);
		});
	}
	
	return Qnil;
}

function mod_attr_writer(mod, block) {
	var mid				 = null,
			attribute	 = null,
			attributes = Array.prototype.slice.call(arguments, 2);
	
	for (var i = 0; i < attributes.length; i++) {
		attribute = attributes[i];
		mid = rb_call(attribute, "to_s");
		
		rb_define_method(mod, mid + "=", function(self, block, val) {
			return rb_ivar_set(self, "@" + mid, val);
		});
	}
	
	return Qnil;
}

function mod_alias_method(mod, block, new_name, old_name) {
	new_name = rb_call(new_name, "to_s");
	old_name = rb_call(old_name, "to_s");
	rb_define_method(mod, new_name, mod.$m_tbl['$' + old_name]);
	return mod;
}

function mod_to_s(mod) {
	return rb_ivar_get(mod, "__classid__");
}

function mod_const_set(mod, block, id, value) {
	return rb_vm_cs(mod, rb_call(id, "to_s"), value);
}

function mod_class_eval(mod, block, string, filename, lineno) {
	if (block != Qnil) {
		return block(mod, Qnil);
	} else {
		var code = exports.compile(string);
	  var func = new Function('self', '__FILE__', code);
	  return func(mod, io_expand_path(filename));
	}
}

function mod_private(mod) {
	return mod;
}

function mod_public(mod) {
	return mod;
}

function mod_protected(mod) {
	return mod;
}

function mod_include(cla, block, mod) {
	rb_include_module(cla, mod);
  return Qnil;
}

function mod_extend(cla, block, mod) {
	rb_extend_module(cla, mod);
	return Qnil;
}

function class_s_new(clas, block, sup) {
	var klass = rb_define_class_id("AnonClass", sup || rb_cObject);
	return klass;
};

function class_new_instance(cla, block) {
	var obj = cla.$m.$allocate(cla, Qnil);
	var args = Array.prototype.slice.call(arguments);
	args[0] = obj;
	obj.$m.$initialize.apply(null, args);
	return obj;
};

function class_initialize(cla, block, sup) {
	// print("in Class.new initialize");
	var klass = rb_define_class_id('', sup || rb_cObject);
	return klass;
}

function class_superclass(cla) {
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

function false_and(self, block, other) {
	return Qfalse;
}

function false_or(self, block, other) {
	return other.$r ? Qtrue : Qfalse;
}

function false_xor(self, block, other) {
	return other.$r ? Qtrue : Qfalse;
}

function true_to_s() {
	return "true";
}

function true_and(self, block, other) {
	return other.$r ? Qtrue : Qfalse;
}

function true_or() {
	return Qtrue;
}

function true_xor(self, block, other) {
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

// Init core Object classes with some bootstrap methods
var InitObject = function() {
	var tmp_metaclass;

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
	
	// @class Proc
	rb_proc = rb_define_toll_free_class(Function.prototype, T_OBJECT | T_PROC, 'Proc', rb_cObject);

	// Top self
	rb_top_self = new RObject(rb_cObject, T_OBJECT);

	var rb_main_include = function() {
	  // console.log("main include, should error..");
	};

	rb_define_singleton_method(rb_top_self, 'include', rb_main_include);
	
};

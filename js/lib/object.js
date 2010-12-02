// Root Types/Flags
var T_CLASS       = 1,
    T_MODULE      = 2,
    T_OBJECT      = 4,
    T_BOOLEAN     = 8,
    T_STRING      = 16,
    T_ARRAY       = 32,
    T_NUMBER      = 64,
    T_PROC        = 128,
    T_SYMBOL      = 256,
    T_HASH        = 512,
    T_ICLASS      = 1024,
    FL_SINGLETON  = 2056;
    
// Core boot classes
rb_cBasicObject = null,
    rb_cObject = null,
    rb_module = null,
    rb_class = null;

// Other core classes/modules
var rb_mKernel,
    rb_nil_class,
    rb_number,
    rb_true_class,
    rb_false_class,
    rb_proc,
		rb_cFile,
		rb_cDir;

// @global Top self context within ruby 
rb_top_self = null;

// some top level objects
rb_nil = null;
rb_false = null;
rb_true = null;

// Init core Object classes with some bootstrap methods
var InitObject = function() {
	var tmp_metaclass;

	rb_cBasicObject = boot_defrootclass('BasicObject');
	rb_cObject = boot_defclass('Object', rb_cBasicObject);
	rb_module = boot_defclass('Module', rb_cObject);
	rb_class = boot_defclass('Class', rb_module);

	rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);

	tmp_metaclass = rb_make_metaclass(rb_cBasicObject, rb_class);
	tmp_metaclass = rb_make_metaclass(rb_cObject, tmp_metaclass);
	tmp_metaclass = rb_make_metaclass(rb_module, tmp_metaclass);
	tmp_metaclass = rb_make_metaclass(rb_class, tmp_metaclass);

	boot_defmetametaclass(rb_module, tmp_metaclass);
	boot_defmetametaclass(rb_cObject, tmp_metaclass);
	boot_defmetametaclass(rb_cBasicObject, tmp_metaclass);

	rb_mKernel = rb_define_module('Kernel');

	rb_include_module(rb_cObject, rb_mKernel);

	rb_define_method(rb_class, 'allocate', rb_obj_alloc);
	rb_define_method(rb_class, 'new', rb_class_new_instance);
	rb_define_method(rb_class, 'initialize', function() {});

	// @class Numeric
	rb_number = rb_define_toll_free_class(Number.prototype, T_OBJECT | T_NUMBER, 'Numeric', rb_cObject);


	// @class Proc
	rb_proc = rb_define_toll_free_class(Function.prototype, T_OBJECT | T_PROC, 'Proc', rb_cObject);

	// @class TrueClass
	rb_true_class = rb_define_class('TrueClass', rb_cObject);
	// true literal
	rb_true = rb_obj_alloc(rb_true_class);

	// @class FalseClass
	rb_false_class = rb_define_class('FalseClass', rb_cObject);
	// false literal
	rb_false = rb_obj_alloc(rb_false_class);
	// false is false for truthiness
	rb_false.$r = false;

	// @class NilClass
	rb_nil_class = rb_define_class('NilClass', rb_cObject);
	// nil literal
	rb_nil = rb_obj_alloc(rb_nil_class);
	// nil is false for truthiness
	rb_nil.$r = false;

	// Top self
	rb_top_self = new RObject(rb_cObject, T_OBJECT);

	var rb_main_include = function() {
	  // console.log("main include, should error..");
	};

	rb_define_singleton_method(rb_top_self, 'include', rb_main_include);
	
};

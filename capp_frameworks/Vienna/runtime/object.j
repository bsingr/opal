// This shouldnt be here.. class tbl for all of ruby.
rb_class_tbl = { };

function boot_defclass(id, superclass) {
    var o = rb_class_boot(superclass);
    rb_class_tbl[id] = o;
    rb_const_set((rb_cObject ? rb_cObject : o), id, o);
    return o;
}

function rb_module_s_alloc() {
    return rb_module_new();
}

function rb_class_s_alloc() {
    return rb_class_boot();
}

function rb_class_new_instance_imp(klass, _cmd) {
    var o = rb_funcall(klass, "alloc");
    // FIXME: no initialize params being sent
    rb_funcall(o, "initialize");
    return o;
}

function rb_obj_dummy(self, _cmd) {
    return null;
}

function rb_obj_equal(self, _cmd, other) {
    return (self == other) ? true : false;
}

function rb_obj_not(self, _cmd) {
    return RTEST(self) ? false : true;
}

function rb_obj_not_equal(self, _cmd, other) {
    return (rb_funcall(self, "==", other)) ? false : true; 
}

function rb_obj_dummy2(self, _cmd, other) {
    return null;
}

function rb_mod_attr(self, _cmd) {
    console.log('in attr.');
}

function rb_mod_attr_reader(self, _cmd) {
    var i, a = Array.prototype.slice.call(arguments, 2);
    for (i = 0; i < a.length; i++) {
        rb_objj_define_kvo_getter(self, a[i]);
    }
    return self;
}

function rb_mod_attr_writer(self, _cmd) {
    var i, a = Array.prototype.slice.call(arguments, 2);
    for (i = 0; i < a.length; i++) {
        rb_objj_define_kvo_setter(self, a[i]);
    }
    return self;
}

function rb_mod_attr_accessor(self, _cmd) {
    var i, a = Array.prototype.slice.call(arguments, 2);
    for (i = 0; i < a.length; i++) {
        rb_objj_define_kvo_setter(self, a[i]);
        rb_objj_define_kvo_getter(self, a[i]);
    }
    return self;
}

function rb_objj_define_kvo_setter(klass, id) {
    id = rb_funcall(id, 'to_s');
    var k = 'set' + id.charAt(0).toUpperCase() + id.substr(1) + ':';
    rb_define_method(klass, k, function(self, _cmd, v) {
        var k = id;
        return rb_ivar_set(self, k, v);
    }, 1);
}

function rb_objj_define_kvo_getter(klass, id) {
    id = rb_funcall(id, 'to_s');
    rb_define_method(klass, id, function(self, _cmd) {
        return rb_ivar_get(self, _cmd);
    }, 0);
}

function rb_equal_imp(self, _cmd, other) {
    return rb_equal(self, other);
}

function rb_equal(obj1, obj2) {
    if (obj1 == obj2) {
        return true;
    }
    if (RTEST(rb_funcall(obj1, "==", obj2))) {
        return true;
    }
    return false;
}

function rb_obj_ivar_set(self, _cmd, id, val) {
    if (id.substr(0,1) == "@")
        id = id.substr(1);
    
    return self[id] = val;
}

function rb_obj_match(self, _cmd, obj2) {
    return null;
}

function rb_obj_not_match(self, _cmd, obj2) {
    return RTEST(rb_funcall(self, "=~", obj2)) ? true : false;
}

function rb_obj_include(self, _cmd, mod) {
    return rb_include_module(self.isa, mod);
}


function false_and(self, _cmd, o) {
    
}

function false_or(self, _cmd, o) {
    
}

function false_xor(self, _cmd, o) {
    
}

function rb_true(self, _cmd) {
    return true;
}

function rb_false(self, _cmd) {
    return false;
}



function nil_to_i(self, _cmd) {
    return 0;
}

function nil_to_f(self, _cmd) {
    return 0.0;
}

function nil_to_s(self, _cmd) {
    return "";
}

function nil_to_a(self, _cmd) {
    return [];
}

function nil_inspect(self, _cmd) {
    return "nil";
}



rb_cObject = objj_getClass("CPObject");
rb_const_set(rb_cObject, "Object", rb_cObject);

/**
    BasicObject
    ===========
    
    Make it a 'root' object in objj, so it doesnt get many methods. BasicObject is
    REALLY useful for meta building etc. Object inherits most responsibility.
    Because of the way objj is set up, the few methods that are defined on 
    BasicObject must also be defined on Object, as BasicObject in objj isnt actually
    a superclass of Object. There are only 7 methods, so not a big problem.
*/
rb_cBasicObject = objj_allocateClassPair(null, 'BasicObject');
rb_const_set(rb_cObject, "BasicObject", rb_cBasicObject);

rb_cModule = boot_defclass("Module", rb_cObject);
rb_cClass = boot_defclass("Class", rb_cModule);


rb_define_singleton_method(rb_cModule, "alloc", rb_module_s_alloc, 0);
rb_define_singleton_method(rb_cClass, "alloc", rb_class_s_alloc, 0);

// include class and module on the object meta.
rb_include_module(rb_cObject.isa, rb_cClass);
rb_include_module(rb_cObject.isa, rb_cModule);
 
rb_define_singleton_method(rb_cObject, "new:", rb_class_new_instance_imp, -1);
 
rb_define_method(rb_cObject, "initialize", rb_obj_dummy, 0);
rb_define_method(rb_cObject, "==", rb_obj_equal, 1);
rb_define_method(rb_cObject, "equal?", rb_obj_equal, 1);
rb_define_method(rb_cObject, "!", rb_obj_not, 0);
rb_define_method(rb_cObject, "!=", rb_obj_not_equal, 1);

rb_define_method(rb_cBasicObject, "initialize", rb_obj_dummy, 0);
rb_define_method(rb_cBasicObject, "==", rb_obj_equal, 1);
rb_define_method(rb_cBasicObject, "equal?", rb_obj_equal, 1);
rb_define_method(rb_cBasicObject, "!", rb_obj_not, 0);
rb_define_method(rb_cBasicObject, "!=", rb_obj_not_equal, 1);

rb_define_method(rb_cObject, "singleton_method_added:", rb_obj_dummy2, 1);
rb_define_method(rb_cObject, "singleton_method_removed:", rb_obj_dummy2, 1);
rb_define_method(rb_cObject, "singleton_method_undefined:", rb_obj_dummy2, 1);

rb_define_method(rb_cBasicObject, "singleton_method_added:", rb_obj_dummy2, 1);
rb_define_method(rb_cBasicObject, "singleton_method_removed:", rb_obj_dummy2, 1);
rb_define_method(rb_cBasicObject, "singleton_method_undefined:", rb_obj_dummy2, 1);

rb_mKernel = rb_define_module("Kernel");
rb_include_module(rb_cObject, rb_mKernel);
// puts, handle case where more than one arg is sent. This should be done by rb_funcall.
rb_define_method(rb_mKernel, "puts:", rb_f_puts, 1);
rb_define_method(rb_mKernel, "puts", rb_f_puts, 1);

// added..
rb_define_method(rb_mKernel, "include:", rb_obj_include, -1);

rb_define_method(rb_cClass, "inherited:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "included:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "extended:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "method_added:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "method_removed:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "method_undefined:", rb_obj_dummy2, 1);

rb_define_method(rb_mKernel, "nil?", rb_false, 0);
rb_define_method(rb_mKernel, "===", rb_equal_imp, 1);
rb_define_method(rb_mKernel, "=~", rb_obj_match, 1);
rb_define_method(rb_mKernel, "!~", rb_obj_not_match, 1);
rb_define_method(rb_mKernel, "eql?", rb_obj_equal, 1);

// rb_define_method(rb_cObject, "clone", rb_obj_clone_imp, 0);
// rb_define_method(rb_cObject, "dup", rb_nsobj_dup, 0);
// 
// rb_define_method(rb_mKernel, "to_s", rb_any_to_string, 0);
// rb_define_method(rb_mKernel, "inspect", rb_obj_inspect, 0);
// rb_define_method(rb_mKernel, "methods", rb_obj_methods, -1);
// 
// rb_define_method(rb_mKernel, "singleton_methods", rb_obj_singleton_methods, -1);
// rb_define_method(rb_mKernel, "protected_methods", rb_obj_protected_methods, -1);
// rb_define_method(rb_mKernel, "private_methods", rb_obj_private_methods, -1);
// rb_define_method(rb_mKernel, "public_methods", rb_obj_public_methods, -1);
// rb_define_method(rb_mKernel, "instance_variables", rb_obj_instance_variables, 0);
// rb_define_method(rb_mKernel, "instance_variable_get", rb_obj_ivar_get, 1);
rb_define_method(rb_mKernel, "instance_variable_set", rb_obj_ivar_set, 2);
// rb_define_method(rb_mKernel, "instance_variable_defined?", rb_obj_ivar_defined, 1);
// rb_define_method(rb_mKernel, "remove_instance_variable", rb_obj_remove_instance_variable, 1);
// 
// rb_define_method(rb_mKernel, "instance_of?", rb_obj_is_instance_of_imp, 1);
// rb_define_method(rb_mKernel, "kind_of?", rb_obj_is_kind_of_imp, 1);
// rb_define_method(rb_mKernel, "is_a?", rb_obj_is_kind_of_imp, 1);
// rb_define_method(rb_mKernel, "tap", rb_obj_tap, 0);

/**
    rb_cNilClass
*/
rb_cNilClass = rb_define_class("NilClass", rb_cObject);
rb_define_method(rb_cNilClass, "to_i", nil_to_i, 0);
rb_define_method(rb_cNilClass, "to_f", nil_to_f, 0);
rb_define_method(rb_cNilClass, "to_s", nil_to_s, 0);
rb_define_method(rb_cNilClass, "to_a", nil_to_a, 0);
rb_define_method(rb_cNilClass, "inspect", nil_inspect, 0);
rb_define_method(rb_cNilClass, "&", false_and, 1);
rb_define_method(rb_cNilClass, "|", false_or, 1);
rb_define_method(rb_cNilClass, "^", false_xor, 1);

rb_define_method(rb_cNilClass, "nil?", rb_true, 0);












// these need fixing.. we have now added module and class to the meta object (kernel remains on class object)
// so, instances can access kernel methods, but only class level can accesss module and class, i.e. attr_accessor.
rb_define_method(rb_cModule, "attr:", rb_mod_attr, -1);
rb_define_method(rb_cModule, "attr_reader:", rb_mod_attr_reader, -1);
rb_define_method(rb_cModule, "attr_writer:", rb_mod_attr_writer, -1);
rb_define_method(rb_cModule, "attr_accessor:", rb_mod_attr_accessor, -1);
// fixme: we need a way of going between a method with a colon, and one without.
// maybe if it cant find method, then we should check with/without colon as appropriate.
rb_define_method(rb_cModule, "attr", rb_mod_attr, -1);
rb_define_method(rb_cModule, "attr_reader", rb_mod_attr_reader, -1);
rb_define_method(rb_cModule, "attr_writer", rb_mod_attr_writer, -1);
rb_define_method(rb_cModule, "attr_accessor", rb_mod_attr_accessor, -1);

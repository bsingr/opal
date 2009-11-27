
function rb_define_class(id, super_klass) {
    var klass;
    // check if defined
    if (objj_lookUpClass(id)) {
        klass = objj_lookUpClass(id);
        if ((super_klass !== CPObject) && (klass.super_class !== super_klass)) {
            throw id + ' already exists! (different super given)'
        }
        
        return klass;
    }
    
    if (!super_klass) {
        console.log('Warning: no superclass for ' + id + '. CPObject assumed');
        super_klass = CPObject;
    }
    klass = objj_allocateClassPair(super_klass, id);
    // ivars....?
    objj_registerClassPair(klass);
    objj_addClassForBundle(klass, objj_getBundleWithPath(OBJJ_CURRENT_BUNDLE.path));
    return klass;
};

// from class
function rb_class_boot(superclass) {
    return rb_objj_create_class(null, superclass);
}

function rb_objj_create_class(name, superclass) {
    var RB_CLASS = 0;
    return rb_objj_alloc_class(name, superclass, RB_CLASS, nil);
}

function rb_alloc_class(type, klass) {
  var obj = new RClass();
  obj.$klass = klass;
  obj.$type = type;
  return obj;
}

rb_anonymous_count = 0;

function rb_objj_alloc_class(name, superclass, type, klass) {
    name = name || ("RubyAnonymous" + rb_anonymous_count++);
    superclass = superclass || rb_cObject;
    var o = objj_allocateClassPair(superclass, name);
    objj_registerClassPair(o);
    return o;
}

function rb_define_method(klass, id, func, arity) {
    var m = new objj_method(id, func, []);
    // in ruby, this is very useful
    m.arity = arity;
    
    klass.method_list.push(m);
    klass.method_dtable[id] = m;
    
    m.method_imp.displayName = klass.name + "#" + id;
    
    return true;
}

function rb_define_singleton_method(klass, id, func, arity) {
    // check type... class, or obj etc.. might need singleton class
    return rb_define_method(klass.isa, id, func, arity);
}

rb_funcall = objj_msgSend;

// function rb_funcall(klass, _cmd) {
//     if (!klass.isa) {
//         // not a class... so we can check...
//         if (klass === null || klass === undefined) {
//             // use nil (note: objj overrides nil, so we should use rb_nil;)
//         }
//     }
// }
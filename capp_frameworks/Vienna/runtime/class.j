
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
    rb_class_tbl[id] = klass;
    rb_const_set(rb_cObject, id, klass);
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

function rb_search_method(klass, _cmd) {
    // FIXME: need to be a 'good citizen' and do this
    // if (!ISINITIALIZED(klass))
        // _class_initialize(klass);
    
    var method = klass.method_dtable[_cmd];

    if (!method) {
        klass = (klass & CLS_META) ? klass : klass.isa;
        // check modules etc
        while(klass) {
            if (klass._rb_included_modules) {
                // console.log('has included!');
                for (var i = 0; i < klass._rb_included_modules.length; i++) {
                    if (method = klass._rb_included_modules[i].method_dtable[_cmd]) {
                        break;
                    }
                }
                if (method) {
                    break;
                }
            }
            // console.log('trying ' + klass.name);
            klass = klass.super_class;
        }
        // we found it..
        if (method)
            return method.method_imp;
        
        return null;
    }
    
    return method.method_imp;
}

function rb_funcall(klass, _cmd) {
    if ((klass == nil) || (!klass.isa)) {
        throw 'sending to nil? or struct?'
    }
 
    var imp = rb_search_method(klass.isa, _cmd);
    // could try checking for ir with/without semi colon? maybe the method takes var args..
    
    if (!imp) {
        throw 'method not found... use method_missing?: ' + _cmd
    }

    switch(arguments.length)
    {
        case 2: return imp(klass, _cmd);
        case 3: return imp(klass, _cmd, arguments[2]);
        case 4: return imp(klass, _cmd, arguments[2], arguments[3]);
        case 4: return imp(klass, _cmd, arguments[2], arguments[3], arguments[4]);
    }

    return imp.apply(klass, arguments);
}
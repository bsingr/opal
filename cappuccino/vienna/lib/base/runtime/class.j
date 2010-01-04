
function rb_define_class(id, super_klass) {
    var klass;
    // check if defined
    if (rb_const_defined(rb_cObject, id)) {
        klass = rb_const_get(rb_cObject, id);
        if ((super_klass !== CPObject) && (klass.super_class !== super_klass)) {
            throw id + ' already exists! (different super given)'
        }
        
        return klass;
    }
    
    // console.log("making new class: " + id);
    
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
}

/**
    Do NOT register class pair. If we register a class pair, they will be added to
    global scope. This will break cappuccino side of things if we get name clashes.
*/
function rb_define_class_under(outer, id, super_class) {
    var klass;
    // class defined?
    if (rb_const_defined(outer, id)) {
        klass = rb_const_get(outer, id);
        if ((super_class !== CPObject) && (klass.super_class !== super_class)) {
            throw id + ' already exists! different super given..'
        }
        return klass;
    }
    
    if (!super_class) {
        console.log('warnng: no superclass given for ' + id + '. CPObject assumed');
        super_class = CPObject;
    }
    klass = objj_allocateClassPair(super_class, id);
    objj_addClassForBundle(klass, objj_getBundleWithPath(OBJJ_CURRENT_BUNDLE.path));
    rb_const_set(outer, id, klass);
    return klass;
}


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
    return rb_define_method(rb_singleton_class(klass), id, func, arity);
}

/**
    Returns the singleton class. Meta classes are already singleton classes,
    so this method just returns the meta class itself. Classes in objj are
    not singleton, so a new class will be created, and returned, and then 
    injected into the hierarchy. CLS_META identifies meta classes, while
    CLS_CLASS identifies classes. A singleton class will have a CLS_SINGLETON
    also, which is added on creation. Note, althogh a meta class is singleton,
    it will not have a CLS_SINGLETON mask
*/
function rb_singleton_class(klass) {
    if (klass.isa.info & CLS_CLASS) {
        if (klass.isa.info & CLS_SINGLETON) {
            // already a singleton
            return klass.isa;
        }
        else {
            // not a singleton, so need to make it
            // keep same name...
            var s = objj_allocateClassPair(klass.isa, klass.isa.name);
            _class_initialize(s);
            s.info |= CLS_SINGLETON
            klass.isa = s;
            return klass.isa;
        }
    }
    else {
        // meta class:
        return klass.isa
    }
}

function rb_search_method(klass, _cmd) {
    // FIXME: need to be a 'good citizen' and do this
    // if (!ISINITIALIZED(klass))
        // _class_initialize(klass);
    
    var method = klass.method_dtable[_cmd];

    if (!method) {
        while(klass) {
            if (klass._rb_included_modules) {
                for (var i = 0; i < klass._rb_included_modules.length; i++) {
                    if (method = klass._rb_included_modules[i].method_dtable[_cmd]) {
                        break;
                    }
                }
                if (method) break;
            }
            klass = klass.super_class;
        }
        // we found it..
        if (method) return method.method_imp;
        return null;
    }
    
    return method.method_imp;
}

// Returns true or false. true if we found a type, false if we didnt.
// we set the isa on the struct for future reference. This will not affect
// cappuccino etc, and it does not use a .isa property (hence why we are
// trying to find one!)

// Supported structs:
//      CPRect, CPSize, CPPoint.
function rb_resolve_struct_type(s) {
    if (s.hasOwnProperty('size') && s.hasOwnProperty('origin')) {
        s.isa = rb_const_get(rb_cObject, 'CPRect');
        return true;
    }
    else if (s.hasOwnProperty('width') && s.hasOwnProperty('height')) {
        s.isa = rb_const_get(rb_cObject, 'CPSize');
        return true;
    }
    else if (s.hasOwnProperty('x') && s.hasOwnProperty('y')) {
        s.isa = rb_const_get(rb_cObject, 'CPPoint');
        return true;
    }
    return false;
}

function rb_funcall(klass, _cmd) {
    var imp;
    if ((klass == nil) || (!klass.isa)) {
        if (klass == null || klass == undefined) {
            imp = rb_search_method(rb_cNilClass, _cmd);
        }
        else {
            // Now we start to try and find the type of struct we found:
            if (!rb_resolve_struct_type(klass)) {
                console.log(klass);
                throw 'sending "' + _cmd + '" to struct? ' + klass
            }
            imp = rb_search_method(klass.isa, _cmd);
        }
    }
    else { // normal class, so...
        imp = rb_search_method(klass.isa, _cmd);
    }
    
    if (!imp) {
        // should pass arguments as well..
        return rb_funcall(klass, "method_missing:", _cmd);
        // throw klass.isa.name + '#' + _cmd + ' is not defined. method_midding.'
        // throw 'method not found... use method_missing?: ' + _cmd
    }
    try {
        switch(arguments.length)
        {
            case 2: return imp(klass, _cmd);
            case 3: return imp(klass, _cmd, arguments[2]);
            case 4: return imp(klass, _cmd, arguments[2], arguments[3]);
            case 5: return imp(klass, _cmd, arguments[2], arguments[3], arguments[4]);
        }

        return imp.apply(klass, arguments);
    }
    catch (e) {
        // Only catch "return statements", throw anything else (again)
        // Also, if we are calling a block in this method call, then we should not capture the
        // throw, and instead propagate the throw to the method containing the block (This is so
        // that the method containing the block returns, not just the block.) Break can be used
        // to exit the current block yielding.
        if ((e.type === "return") && (!arguments[arguments.length - 1].rb_is_block)) return e.args
        throw e
    }
}

/**
    Wont need this in about 10 mins. here for compatibility at the moemnt.
*/
function rb_funcall_block(klass, _cmd) {
    var b = arguments[arguments.length - 1];
    b.rb_is_block = true;
    
    try {
        return rb_funcall.apply(klass, arguments);
    }
    catch (e) {
        // capture "break" - return any passed arg from block loop
        if (e.type === "break") return e.args;
        throw e
    }
}
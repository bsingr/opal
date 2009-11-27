function objj_duplicateClass(klass, name) {
    // duplicate.. quick hack fix. this should be done PROPERLY!
    // at the moment we just subclass :/
    var c = objj_allocateClassPair(klass, name);
        
    objj_registerClassPair(c);
    _class_initialize(c);
    return c;
}
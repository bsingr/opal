/**
    CLS_SINGLETON
    =============
    This is used for singleton objects. When defining a singleton method on any
    ruby or objective-j object, such as:
    
        o = Object.new
        def o.my_new_method
        
        end
    
    We are essentially subclassing Object, adding the my_new_method as the only
    new method to the new class, and then retunring it. This 'subclassing' shoulc
    only be done once, so if we define a new method on 'o', we declare it on the
    'virtual class' we just created . This avoids injecting methods into the
    Object prototype and mucking up methods. the CLS_SINGLETON flag is applied to
    a class's info to let us know that the class has already been 'singleton`d'
*/
CLS_SINGLETON = 0x16;

/**
    Duplicate class (so BasicObject === Object === CPObject).
*/
function objj_duplicateClass(klass, name) {
    // duplicate.. quick hack fix. this should be done PROPERLY!
    // at the moment we just subclass :/
    var c = objj_allocateClassPair(klass, name);
        
    objj_registerClassPair(c);
    _class_initialize(c);
    return c;
}
// 
//  runtime.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// struct objc_class {
//      Class isa;
//      Class super_class
//      const char *name;
//      struct objc_ivar_list *ivars
//      struct objc_method_list **method_list
//      struct objc_method_list **method_table
//      struct objc_protocol_list *protocols
//      void *alloc;
// };
// 
function objc_class()
{
    this.isa = null;
    this.super_class = null;
    this.name = null;
    this.ivars = [];
    this.method_list = [];
    this.method_table = function() {};
    this.protocols = [];
    this.alloc = function() {};
    // cache
    // protocols
}

// struct objc_ivar {
//     char *ivar_name;
//     char *ivar_type;
//     int ivar_offset;
// };
// 
function objc_ivar()
{
    this.ivar_name = null;
    this.ivar_type = null;
}

// struct objc_method {
//     SEL method_name;
//     char *method_types;
//     IMP method_imp;
// };
// 
function objc_method()
{
    this.method_name = null;
    this.method_types = [];
    this.method_imp = null;
}

// extern id object_copy(id obj);
// 
function object_copy(obj)
{
    
}

// extern id object_dispose(id obj);
// 
function object_dispose(obj)
{
    
}

// extern Class object_getClass(id obj);
// 
function object_getClass(obj)
{
    return obj.isa;
}

// extern Class object_setClass(id obj, Class cls);
// 
function object_setClass(obj, cls)
{
    obj.isa = cls;
    return obj.isa;
}

// extern const char *object_getClassName(id obj);
// 
function object_getClassName(obj)
{
    return obj.isa.name;
}

// extern void *object_getIndexedIvars(id obj);
// 
function object_getIndexedIvars(obj)
{
    // FIXME: generate indexed ivars
}

// extern id object_getIvar(id obj, Ivar ivar) ;
// 
function object_getIvar(obj, ivar)
{
    return obj[ivar_getName(ivar)];
}

// extern void object_setIvar(id obj, Ivar ivar, id value);
// 
function object_setIvar(obj, ivar, value)
{
    obj[ivar_getName(ivar)] = value;
}

// extern Ivar object_setInstanceVariable(id obj, const char *name, void *value);
// 
function object_setInstanceVariable(obj, name, value)
{
    obj[name] = value;
}

// extern Ivar object_getInstanceVariable(id obj, const char *name, void **outValue);
// 
function object_getInstanceVariable(obj, name, outValue)
{
    return obj[name];
}

// extern id objc_getClass(const char *name);
// 
function objc_getClass(name)
{
    return eval(name);
}

// extern id objc_getMetaClass(const char *name);
// 
function objc_getMetaClass(name)
{
    var theClass = objc_getClass(name);
    return theClass.isa;
}

// extern id objc_lookUpClass(const char *name);
// 
function objc_lookUpClass(name)
{
    return objc_getClass;
}

// extern id objc_getRequiredClass(const char *name);
// 
function objc_getRequiredClass(name)
{
    return objc_getMetaClass(name);
}

// extern Class objc_getFutureClass(const char *name);
// 
function objc_getFutureClass(name)
{
    // TODO: Not yet implemented
}

// extern void objc_setFutureClass(Class cls, const char *name);
// 
function objc_setFutureClass(cls, name)
{
    // TODO: Not yet implemented
}

// extern int objc_getClassList(Class *buffer);
// 
function objc_getClassList(buffer)
{
    // TODO: Not yet implemented
}

// extern Protocol *objc_getProtocol(const char *name);
// 
function objc_getProtocol(name)
{
    // TODO: Not yet implemented
}

// extern Protocol **objc_copyProtocolList(unsigned int *outCount);
// 
function objc_copyProtocolList(outCount)
{
    // TODO: Not yet implemented
}

// extern const char *class_getName(Class cls);
// 
function class_getName(cls)
{
    
}

// extern BOOL class_isMetaClass(Class cls);
// 
function class_isMetaClass(cls)
{
    
}

// extern Class class_getSuperclass(Class cls);
// 
function class_getSuperclass(cls)
{
    
}

// extern Class class_setSuperclass(Class cls, Class newSuper);
// 
function class_setSuperclass(cls, newSuper)
{
    
}

// extern int class_getVersion(Class cls);
// 
function class_getVersion(cls)
{
    
}

// extern void class_setVersion(Class cls, int version);
// 
function class_setVersion(cls, version)
{
    
}

// extern size_t class_getInstanceSize(Class cls);
// 
function class_getInstanceSize(cls)
{
    
}

// extern Ivar class_getInstanceVariable(Class cls, const char *name);
// 
function class_getInstanceVariable(cls, name)
{
    
}

// extern Ivar class_getClassVariable(Class cls, const char *name);
// 
function class_getClassVariable(cls, name)
{
    
}

// extern Ivar *class_copyIvarList(Class cls, unsigned int *outCount);
// 
function class_copyIvarList(cls, outCount)
{
    
}

// extern Method class_getInstanceMethod(Class cls, SEL name);
// 
function class_getInstanceMethod(cls, name)
{
    var theMethod = cls.method_table.prototype[name];
    return theMethod;
}

// extern Method class_getClassMethod(Class cls, SEL name);
// 
function class_getClassMethod(cls, name)
{
    
}

// extern IMP class_getMethodImplementation(Class cls, SEL name);
// 
function class_getMethodImplementation(cls, name)
{
    // FIXME: check for instance/class methods
    var theMethod = class_getInstanceMethod(cls, name);
    if (!theMethod)
        printf("[" + cls.name + " " + name + "] does not exist.");

    return method_getImplementation(theMethod);
}

// extern BOOL class_respondsToSelector(Class cls, SEL sel);
// 
function class_respondsToSelector(cls, sel)
{
    var theMethod = class_getInstanceMethod(cls, sel);
    if(!theMethod)
        return false;
    
    return true;
}

// extern Method *class_copyMethodList(Class cls, unsigned int *outCount);
// 
function class_copyMethodList(cls)
{
    
}

// extern BOOL class_conformsToProtocol(Class cls, Protocol *protocol);
// 
function class_conformsToProtocol(cls, protocol)
{
    
}

// extern Protocol **class_copyProtocolList(Class cls, unsigned int *outCount);
// 
function class_copyProtocolList(cls)
{
    
}

// extern objc_property_t class_getProperty(Class cls, const char *name);
// 
function class_getProperty(cls, name)
{
    
}

// extern objc_property_t *class_copyPropertyList(Class cls, unsigned int *outCount);
// 
function class_copyPropertyList(cls)
{
    
}

// extern id class_createInstance(Class cls);
// 
function class_createInstance(cls)
{
    var newObject = new cls.alloc();
    newObject.isa = cls;
    return newObject;
}

// extern Class objc_allocateClassPair(Class superclass, const char *name);
// 
function objc_allocateClassPair(superclass, name)
{
    var newClass = new objc_class();
    var newMetaClass = new objc_class();
    
    if(superclass)
    {
        // Copy Ivars...
        newClass.alloc.prototype = new superclass.alloc();
        // Copy instance methods...        
        newClass.method_table.prototype = new superclass.method_table();
        // Copy class methods
        newMetaClass.method_table.prototype = new superclass.isa.method_table();
        
        newClass.super_class = superclass;
        newMetaClass.super_class = superclass.isa;    
    }
    else
    {
        newClass.alloc.prototype = new objc_object();
    }
    
    newClass.isa = newMetaClass;
    newClass.name = name;
    newMetaClass.name = name;
    return newClass;
}

// extern void objc_registerClassPair(Class cls);
// 
function objc_registerClassPair(cls)
{
    window[cls.name] = cls;
    CFBundleSetBundleForClass(__bootstrap_bundles_current, cls);
}

// extern Class objc_duplicateClass(Class original, const char *name);
// 
function objc_duplicateClass(original, name)
{
    
}
// extern void objc_disposeClassPair(Class cls);
// 
function objc_disposeClassPair(cls)
{
    
}

// extern BOOL class_addMethod(Class cls, SEL name, IMP imp, const char *types);
// 
function class_addMethod(cls, name, imp, types)
{
    var newMethod = new objc_method();
    newMethod.method_name = name;
    newMethod.method_types = types;
    newMethod.method_imp = imp;
    
    cls.method_list.push(newMethod);
    cls.method_table.prototype[name] = newMethod;
    
    if(name == "load")
        imp(cls, "load");
    
    return true;
}

// extern IMP class_replaceMethod(Class cls, SEL name, IMP imp, const char *types);
// 
function class_replaceMethod(cls, name, imp, types)
{
    
}

// extern BOOL class_addIvar(Class cls, const char *name, const char *types);
// 
function class_addIvar(cls, name, types)
{
    var classPrototype = cls.alloc.prototype;
    classPrototype[name] = null;
    
    var newIvar = new objc_ivar();
    newIvar.name = name;
    newIvar.types = types;
    
    cls.ivars.push(newIvar);
    
    return true;
}

// extern BOOL class_addProtocol(Class cls, Protocol *protocol);
// 
function class_addProtocol(cls, protocol)
{
    
}

// extern SEL method_getName(Method m);
// 
function method_getName(m)
{
    return m.name;
}

// extern IMP method_getImplementation(Method m);
// 
function method_getImplementation(m)
{
    return m.method_imp;
}

// extern const char *method_getTypeEncoding(Method m);
// 
function method_getTypeEncoding(m)
{
    return m.method_types;
}

// extern unsigned int method_getNumberOfArguments(Method m);
// 
function method_getNumberOfArguments(m)
{
    
}

// extern char *method_copyReturnType(Method m);
// 
function method_copyReturnType(m)
{
    
}

// extern char *method_copyArgumentType(Method m, unsigned int index);
// 
function method_copyArgumentType(m, index)
{
    
}

// extern IMP method_setImplementation(Method m, IMP imp);
// 
function method_setImplementation(m, imp)
{
    
}

// extern void method_exchangeImplementations(Method m1, Method m2);
// 
function method_exchangeImplementations(m1, m2)
{
    
}

// extern const char *ivar_getName(Ivar v);
// 
function ivar_getName(v)
{
    return v.ivar_name;
}

// extern const char *ivar_getTypeEncoding(Ivar v);
// 
function ivar_getTypeEncoding(v)
{
    
}

// extern const char *property_getName(objc_property_t property);
// 
function property_getName(property)
{
    
}

// extern const char *property_getAttributes(objc_property_t property);
// 
function property_getAttributes(property)
{
    
}

// extern BOOL protocol_conformsToProtocol(Protocol *proto, Protocol *other);
// 
function protocol_conformsToProtocol(proto, other)
{
    
}

// extern BOOL protocol_isEqual(Protocol *proto, Protocol *other);
// 
function protocol_isEqual(proto, other)
{
    
}

// extern const char *protocol_getName(Protocol *p);
// 
function protocol_getName(p)
{
    
}

// extern const char *sel_getName(SEL sel);
// 
function sel_getName(sel)
{
    
}

// extern SEL sel_getUid(const char *str);
// 
function sel_getUid(str)
{
    
}

// extern SEL sel_registerName(const char *str);
// 
function sel_registerName(str)
{
    
}

// extern BOOL sel_isEqual(SEL lhs, SEL rhs);
// 
function sel_isEqual(lhs, rhs)
{
    
}

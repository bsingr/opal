// // 
// //  bootstrap.js
// //  vienna
// //  
// //  Created by Adam Beynon on 2009-06-05.
// //  Copyright 2009 Adam Beynon. All rights reserved.
// // 
// 
// // Bootstrap code has finished. this is used to identify when main() can be called
// var __bootstrap_completed = false;
// 
// // CFDictionaryRef for all the files that are downloaded (in cache).
// // If a file is not in this, then it needs to be downloaded..
// // keys => file path
// // values => CFDataRef of file
// var __bootstrap_files = null;
// 
// var __bootstrap_bundles = {};
// // Hash of class object(the class, not a string version.)
// var __bootstrap_bundles_for_class = {};
// // current bundle that objc is processing
// var __bootstrap_bundles_current = null;
// 
// // CFBundleRef for the main (application) bundle.
// var __bootstrap_main_bundle = null;
// 
// // CFArrayRef of files to load. main() will not be called until all these images are loaded.
// // Custom views etc can use this to ensure that images are "ready to go" when ready to draw.
// // 
// // Trying to draw images otherwise may cause application to hang until images are downloaded..
// // This also stores the main xib file for the application, so this needs to be ready as well.
// var __bootstrap_preload_files = [];
// 
// // extern void __bootstrap_main(void);
// // 
// function __bootstrap_main()
// {
//     __bootstrap_files = CFDictionaryCreateMutable();
//     __bootstrap_link();
// }
// 
// function __bootstrap_link()
// {
//  var the_framework = __bootstrap_frameworks.shift();
//                                  
//  if (the_framework == null)
//  {
//      if (__bootstrap_completed)
//      {
//          var main_bundle_dictionary = CFBundleGetMainBundle()._infoDictionary;
//                      
//          if (CFDictionaryContainsKey(main_bundle_dictionary, "NSMainNibFile"))
//          {
//              var nib_data = CFDataCreateFromURL("Resources/" + CFDictionaryGetValue(main_bundle_dictionary, "NSMainNibFile") + ".xib", function() {
//                                 
//                    __bootstrap_preload_finished(nib_data);
//              });
//              
//              CFArrayAppendValue(__bootstrap_preload_files, nib_data);
//          }           
//      }
//      else
//      {
//          var new_bundle = CFBundleCreate("Info.plist", function() {
//                 // When plist is loaded....
//                 __bootstrap_main_bundle = new_bundle;
//                 
//                 if(CFDictionaryContainsKey(new_bundle._infoDictionary, "CFBundleExecutable"))
//                 {
//                     __bootstrap_bundles_current = new_bundle;
//                     dlopen(CFDictionaryGetValue(new_bundle._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
//                         __bootstrap_completed = true;
//                      __bootstrap_link();
//                     });
//                 }            
//          });
//      }
//  }
//  else
//  {
//      var new_bundle = CFBundleCreate("Frameworks/" + the_framework + "/Info.plist", function() {
//             // When plist is loaded....
//             if(CFDictionaryContainsKey(new_bundle._infoDictionary, "CFBundleExecutable"))
//             {
//                 __bootstrap_bundles_current = new_bundle;
//                 dlopen("Frameworks/" + the_framework + "/" + CFDictionaryGetValue(new_bundle._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
//                  __bootstrap_link();
//                 });
//             }            
//      });
//  }
// }
// 
// // We finished loading this item..
// function __bootstrap_preload_finished(item)
// {
//     NSLog(CFArrayGetCount(__bootstrap_preload_files));
//     CFArrayRemoveValueAtIndex(__bootstrap_preload_files, CFArrayGetFirstIndexOfValue(__bootstrap_preload_files, null, item));
//     
//     if((CFArrayGetCount(__bootstrap_preload_files) == 0) && __bootstrap_completed)
//     {
//         main(1, ["SimpleApp"]);
//     }
// }
// 

// Cached files (plists, xibs etc)
var __bootstrap_files = null;
// Simple Array of files (yet) to finished downloading... run main once complete
var __bootstrap_preload_files = [];
// All bundles
var __bootstrap_bundles = {};
// Hash of class object(the class, not a string version.)
var __bootstrap_bundles_for_class = {};
// current bundle that objc is processing
var __bootstrap_bundles_current = null;

// CFBundleRef for the main (application) bundle.
var __bootstrap_main_bundle = null;

// 
var __bootstrap_finished_linking_stage = false;

// Main bootstrap entry point (on window load)
function __bootstrap_main()
{
    __bootstrap_files = CFDictionaryCreateMutable();
    __bootstrap_link_next_bundle();
}

function __bootstrap_link_next_bundle()
{
    var the_framework = __bootstrap_frameworks.shift();
    
    if (the_framework)
    {
        var new_bundle = CFBundleCreate("Frameworks/" + the_framework + "/Info.plist", function() {
            printf("Finished loading plist for bundle: " +  CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleName"));
            
            dlopen("Frameworks/" + the_framework + "/" + CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
                __bootstrap_link_next_bundle();
            });
        });
        __bootstrap_bundles_current = new_bundle;
    }
    else
    {
        printf("Now trying to load application");
        
        var new_bundle = CFBundleCreate("Info.plist", function() {
            printf("Finished loading plist for bundle: " +  CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleName"));
            
            dlopen(CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
                // __bootstrap_link_next_bundle();
                printf("Finished loading application!");
                
                var nib_data = CFDataCreateFromURL("Resources/" + CFDictionaryGetValue(__bootstrap_main_bundle._infoDictionary, "NSMainNibFile") + ".xib", function()
                {
                    __bootstrap_preload_item_finished(nib_data);
                });
                             
                CFArrayAppendValue(__bootstrap_preload_files, nib_data);
                
                __bootstrap_finished_linking_stage = true;
                __bootstrap_check_application_state();
            });
        });
        __bootstrap_main_bundle = new_bundle
        __bootstrap_bundles_current = new_bundle;
    }
}

function __bootstrap_check_application_state()
{
    if(__bootstrap_finished_linking_stage && __bootstrap_preload_files.length == 0)
    {
        printf("Ready to run application");
        main(1, ["SimpleApp"]);
    }
}

function __bootstrap_preload_item_finished(item)
{
    printf("finished loading an item");
    CFArrayRemoveValueAtIndex(__bootstrap_preload_files, CFArrayGetFirstIndexOfValue(__bootstrap_preload_files, null, item));
    __bootstrap_check_application_state();
}

// 
//  constants.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

var YES = true;
var NO = false;

var nil = null;
var NULL = null;

var ROUND = Math.round;

var MIN = Math.min;
var MAX = Math.max;
// 
//  dlfcn.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct {
//     const char  *dli_fname;
//     void        *dli_fbase;
//     const char  *dli_sname;
//     void        *dli_saddr;
// } Dl_info;
 
// extern int dladdr(const void *, Dl_info *);
function dladdr()
{
    
}
 
// extern int dlclose(void *module);
function dlclose(module)
{
    
}

// extern char *dlerror(void);
function dlerror()
{
    
}

// extern void *dlopen(const char *path, int mode, void *callback);
function dlopen(path, mode, callback)
{
    var e = document.createElement("script");
   	e.src = path + "?" + new Date().getTime();
   	e.type = "text/javascript";
   	e.onload = callback;
   	e.onreadystatechange = function() {
   	    if (this.readyState == 'loaded' && !window.opera)
   	    {
   	        callback();
   	    }
   	};
   	document.getElementsByTagName("head")[0].appendChild(e);
}

// extern void *dlsym(void *module, const char *symbol);
function dlsym(module, symbol)
{
    
} 
// 
//  message.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// struct objc_super {
//     id receiver;
//     Class super_class;
// };
// 
function objc_super()
{
    this.receiver = null;
    this.super_class = null;
}

// extern id objc_msgSend(id self, SEL op, ...);
// 
function objc_msgSend(self, op)
{
    if(!self)
        printf("[... " + op + "]");
    var theMethodImp = class_getMethodImplementation(self.isa, op);
    return theMethodImp.apply(self, arguments);
}

// extern id objc_msgSendSuper(struct objc_super *super, SEL op, ...);
// 
function objc_msgSendSuper(superCls, op)
{
    var theMethodImp = class_getMethodImplementation(superCls.super_class, op);
    // We need to set args[0] to be 'self' and set it here to apply self to be function context
    return theMethodImp.apply(arguments[0] = superCls.receiver, arguments);
}
// 
//  objc-exception.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function objc_exception()
{
    this._name = "";
    this._reason = ""
    this._userInfo = new CFDictionaryRef();
    return this;
}

objc_exception.prototype.toString = function()
{
    return this._name + ": " + this._reason;
}

function objc_exception_create()
{
    return new objc_exception();
}

// extern void objc_exception_throw(id exception);
// 
function objc_exception_throw(exception)
{
    throw exception;
}

// extern void objc_exception_try_enter(void *localExceptionData);
// 
function objc_exception_try_enter(localExcdptionData)
{
    
}

// extern void objc_exception_try_exit(void *localExceptionData);
// 
function objc_exception_try_exit(localExceptionData)
{
    
}

// extern id objc_exception_extract(void *localExceptionData);
// 
function objc_exception_extract(localExceptionData)
{
    
}

// extern int objc_exception_match(Class exceptionClass, id exception);
// 
function objc_exception_match(exceptionClass, exception)
{
    
}
// 
//  objc.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct objc_class *Class;
// typedef struct objc_object {
//  Class isa;
// } *id;
// 
function objc_object()
{
    this.isa = null;
}

// typedef struct objc_selector *SEL;
// typedef signed char BOOL;
// 


// extern const char *sel_getName(SEL sel);
// 
function sel_getName(sel)
{
    return sel;
}

// extern SEL sel_registerName(const char *str);
// 
function sel_registerName(str)
{
    return str;
}

// extern const char *object_getClassName(id obj);
function object_getClassName(obj)
{
    
}

// extern void *object_getIndexedIvars(id obj)
// 
function object_getIndexedIvard(obj)
{
    
}
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
// 
//  standard_c.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function printf(format)
{
	console.log(format);
}
// 
//  stdarg.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// void va_start(va_list ap, void *last); 
// 
function va_start(ap, last)
{
    var foundIndex;
	for (var i = 0; i < ap.all.length; i++)
	{
		if (ap.all[i] == last)
		{
			foundIndex = i;
			break;
		}
	}
	
	for (var j = foundIndex + 1; j < ap.all.length; j++)
		ap.trailing.push(ap.all[j]);
}

// void *va_arg(va_list ap, void *type); 
// 
function va_arg(ap, type)
{
	if (ap.trailing.length == 0)
		return false;

	return ap.trailing.shift();
}

// void va_end(va_list ap); 
// 
function va_end(ap)
{
    // Nothing really to do...
}

// void va_copy(va_list dest, va_list src);
// 
function va_copy(dest, src)
{
    // FIXME: Need to implemenet
}
// 
//  stdio.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern int fclose(FILE *stream);
// extern int feof(FILE *stream);
// extern int ferror(FILE *);
// extern int fflush(FILE *);
// extern int fgetc(FILE *);
// extern int fgetpos(FILE * __restrict, int *);
// extern char *fgets(char * __restrict, int, FILE *);
// extern FILE *fopen(const char *filename, const char *mode);
function fopen(filename, mode)
{
    
}

// extern int fprintf(FILE * __restrict, const char * __restrict, ...);
// extern int fputc(int, FILE *);
// extern int fputs(const char * __restrict, FILE * __restrict);
// extern int fread(void *ptr, int size, int count, FILE *stream);
function fread(ptr, size, count, stream)
{
    
}

// extern FILE *freopen(const char * __restrict, const char * __restrict, FILE * __restrict);
// extern int fscanf(FILE * __restrict, const char * __restrict, ...);
// extern int fseek(FILE *, long, int);
// extern int fsetpos(FILE *, const int *);
// extern long ftell(FILE *);
// extern int fwrite(const void * __restrict, int, int, FILE * __restrict);
// extern int getc(FILE *);
// extern int getchar(void);
// extern char *gets(char *);
// extern void perror(const char *);
// extern int printf(const char *format, ...);


function printf(format)
{
    if (window.opera && !window.console)
    {
        opera.postError(format);
    }
    else
    {
        console.log(format);
    }
}

// extern int putc(int, FILE *);
// extern int putchar(int);
// extern int puts(const char *);
// extern int remove(const char *);
// extern int rename (const char *, const char *);
// extern void rewind(FILE *);
// extern int scanf(const char * __restrict, ...);
// extern void setbuf(FILE * __restrict, char * __restrict);
// extern int setvbuf(FILE * __restrict, char * __restrict, int, int);
// extern int sprintf(char * __restrict, const char * __restrict, ...);
// extern int sscanf(const char * __restrict, const char * __restrict, ...);
// extern FILE *tmpfile(void);
// extern char *tmpnam(char *);
// extern int ungetc(int, FILE *);

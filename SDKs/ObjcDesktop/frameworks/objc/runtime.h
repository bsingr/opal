// 
//  runtime.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <objc/objc.h>

// Types

typedef struct objc_method *Method;
typedef struct objc_ivar *Ivar;
typedef struct objc_property *objc_property_t;

struct objc_class {
   Class isa;
   Class super_class
   const char *name;
   struct objc_ivar_list *ivars
   struct objc_method_list **method_list
   struct objc_protocol_list *protocols
   void *alloc;
};

struct objc_ivar {
  char *ivar_name;
  char *ivar_type;
  int ivar_offset;
};

struct objc_method {
  SEL method_name;
  char *method_types;
  IMP method_imp;
};

extern id object_copy(id obj);
extern id object_dispose(id obj);

extern Class object_getClass(id obj);
extern Class object_setClass(id obj, Class cls);

extern const char *object_getClassName(id obj);
extern void *object_getIndexedIvars(id obj);

extern id object_getIvar(id obj, Ivar ivar) ;
extern void object_setIvar(id obj, Ivar ivar, id value);

extern Ivar object_setInstanceVariable(id obj, const char *name, void *value);
extern Ivar object_getInstanceVariable(id obj, const char *name, void **outValue);

extern id objc_getClass(const char *name);
extern id objc_getMetaClass(const char *name);
extern id objc_lookUpClass(const char *name);
extern id objc_getRequiredClass(const char *name);
extern Class objc_getFutureClass(const char *name);
extern void objc_setFutureClass(Class cls, const char *name);
extern int objc_getClassList(Class *buffer);

extern Protocol *objc_getProtocol(const char *name);
extern Protocol **objc_copyProtocolList(unsigned int *outCount);

extern const char *class_getName(Class cls);
extern BOOL class_isMetaClass(Class cls);
extern Class class_getSuperclass(Class cls);
extern Class class_setSuperclass(Class cls, Class newSuper);

extern int class_getVersion(Class cls);
extern void class_setVersion(Class cls, int version);

extern int class_getInstanceSize(Class cls);

extern Ivar class_getInstanceVariable(Class cls, const char *name);
extern Ivar class_getClassVariable(Class cls, const char *name);
extern Ivar *class_copyIvarList(Class cls, unsigned int *outCount);

extern Method class_getInstanceMethod(Class cls, SEL name);
extern Method class_getClassMethod(Class cls, SEL name);
extern IMP class_getMethodImplementation(Class cls, SEL name);
extern IMP class_getMethodImplementation_stret(Class cls, SEL name);
extern BOOL class_respondsToSelector(Class cls, SEL sel);
extern Method *class_copyMethodList(Class cls, unsigned int *outCount);

extern BOOL class_conformsToProtocol(Class cls, Protocol *protocol);
extern Protocol **class_copyProtocolList(Class cls, unsigned int *outCount);

extern objc_property_t class_getProperty(Class cls, const char *name);
extern objc_property_t *class_copyPropertyList(Class cls, unsigned int *outCount);

extern const char *class_getIvarLayout(Class cls);
extern const char *class_getWeakIvarLayout(Class cls);

extern id class_createInstance(Class cls, int extraBytes);

extern Class objc_allocateClassPair(Class superclass, const char *name, int extraBytes);
extern void objc_registerClassPair(Class cls);
extern Class objc_duplicateClass(Class original, const char *name, int extraBytes);
extern void objc_disposeClassPair(Class cls);

extern BOOL class_addMethod(Class cls, SEL name, IMP imp, const char *types);
extern IMP class_replaceMethod(Class cls, SEL name, IMP imp, const char *types);
extern BOOL class_addIvar(Class cls, const char *name, int size, uint8_t alignment, const char *types);
extern BOOL class_addProtocol(Class cls, Protocol *protocol);
extern void class_setIvarLayout(Class cls, const char *layout);
extern void class_setWeakIvarLayout(Class cls, const char *layout);


extern SEL method_getName(Method m);
extern IMP method_getImplementation(Method m);
extern const char *method_getTypeEncoding(Method m);

extern unsigned int method_getNumberOfArguments(Method m);
extern char *method_copyReturnType(Method m);
extern char *method_copyArgumentType(Method m, unsigned int index);
extern void method_getReturnType(Method m, char *dst, int dst_len);
extern void method_getArgumentType(Method m, unsigned int index, char *dst, int dst_len);
extern struct objc_method_description *method_getDescription(Method m);

extern IMP method_setImplementation(Method m, IMP imp);
extern void method_exchangeImplementations(Method m1, Method m2);

extern const char *ivar_getName(Ivar v);
extern const char *ivar_getTypeEncoding(Ivar v);
extern ptrdiff_t ivar_getOffset(Ivar v);

extern const char *property_getName(objc_property_t property);
extern const char *property_getAttributes(objc_property_t property);

extern BOOL protocol_conformsToProtocol(Protocol *proto, Protocol *other);
extern BOOL protocol_isEqual(Protocol *proto, Protocol *other);
extern const char *protocol_getName(Protocol *p);
extern struct objc_method_description protocol_getMethodDescription(Protocol *p, SEL aSel, BOOL isRequiredMethod, BOOL isInstanceMethod);
extern struct objc_method_description *protocol_copyMethodDescriptionList(Protocol *p, BOOL isRequiredMethod, BOOL isInstanceMethod, unsigned int *outCount);
extern objc_property_t protocol_getProperty(Protocol *proto, const char *name, BOOL isRequiredProperty, BOOL isInstanceProperty);
extern objc_property_t *protocol_copyPropertyList(Protocol *proto, unsigned int *outCount);
extern Protocol **protocol_copyProtocolList(Protocol *proto, unsigned int *outCount);

extern const char **objc_copyImageNames(unsigned int *outCount);
extern const char *class_getImageName(Class cls);
extern const char **objc_copyClassNamesForImage(const char *image, unsigned int *outCount);

extern const char *sel_getName(SEL sel);
extern SEL sel_getUid(const char *str);
extern SEL sel_registerName(const char *str);
extern BOOL sel_isEqual(SEL lhs, SEL rhs);

extern void objc_enumerationMutation(id);
extern void objc_setEnumerationMutationHandler(void (*handler)(id));

extern void objc_setForwardHandler(void *fwd, void *fwd_stret);

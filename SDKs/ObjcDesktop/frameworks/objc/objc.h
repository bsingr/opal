// 
//  objc.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#include "curl.h"
#include "dlfcn.h"
#include "math.h"
#include "stdarg.h"
#include "stdio.h"
#include "objc_exception.h"

typedef void *Protocol;
typedef void *IMP;

typedef struct objc_class *Class;
typedef struct objc_object {
	Class isa;
} *objc_object;

typedef struct objc_selector *SEL;
// typedef signed char BOOL;

extern const char *sel_getName(SEL sel);
extern SEL sel_registerName(const char *str);
extern const char *object_getClassName(id obj); 
extern void *object_getIndexedIvars(id obj);
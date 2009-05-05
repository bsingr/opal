// 
//  objc-exception.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <objc/objc.h>

extern void objc_exception_throw(id exception);
extern void objc_exception_try_enter(void *localExceptionData);
extern void objc_exception_try_exit(void *localExceptionData);
extern id objc_exception_extract(void *localExceptionData);
extern int objc_exception_match(Class exceptionClass, id exception);
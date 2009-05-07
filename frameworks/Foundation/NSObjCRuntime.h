// 
//  NSObjCRuntime.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <objc/objc.h>

typedef long NSInteger;
typedef unsigned long NSUInteger;

@class NSString;

extern NSString *NSStringFromSelector(SEL aSelector);
extern SEL NSSelectorFromString(NSString *aSelectorName);

extern NSString *NSStringFromClass(Class aClass);
extern Class NSClassFromString(NSString *aClassName);

extern void NSLog(NSString *format, ...);
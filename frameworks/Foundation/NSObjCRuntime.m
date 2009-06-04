// 
//  NSObjCRuntime.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSObjCRuntime.h"

void NSLog(NSString *format)
{
	printf(format);
}


Class NSClassFromString(NSString *aClassName)
{
    return objc_getClass(aClassName);
}
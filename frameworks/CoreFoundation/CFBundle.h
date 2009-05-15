// 
//  CFBundle.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>
#import <CoreFoundation/CFArray.h>
#import <CoreFoundation/CFDictionary.h>
#import <CoreFoundation/CFError.h>
#import <CoreFoundation/CFString.h>
#import <CoreFoundation/CFURL.h>

typedef struct {
	char *name;
} CFBundleRef;

typedef struct {
	char *name;
} CFPlugInRef;

extern CFBundleRef CFBundleGetMainBundle(void);

extern CFBundleRef CFBundleGetBundleWithIdentifier(CFStringRef bundleID);
extern CFArrayRef CFBundleGetAllBundles(void);

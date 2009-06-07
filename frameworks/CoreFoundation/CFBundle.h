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
	CFStringRef _path;
    CFDictionaryRef _infoDictionary;
} CFBundleRef;

typedef struct {
	char *name;
} CFPlugInRef;

extern CFStringRef kCFBundleInfoDictionaryVersionKey;
extern CFStringRef kCFBundleExecutableKey;
extern CFStringRef kCFBundleIdentifierKey;
extern CFStringRef kCFBundleVersionKey;
extern CFStringRef kCFBundleDevelopmentRegionKey;
extern CFStringRef kCFBundleNameKey;
extern CFStringRef kCFBundleLocalizationsKey;

extern CFBundleRef CFBundleGetMainBundle(void);

extern CFBundleRef CFBundleGetBundleWithIdentifier(CFStringRef bundleID);
extern CFArrayRef CFBundleGetAllBundles(void);

// Creates a bundle asynchronously. This is not synchronous like cocoa, as the
// bundle might need to be loaded from a url path on the internet with AJAX. The
// callback block is called upon sucsessul (or failure) to alert the callee that
// the referenced bundle has finished initialisation.
extern CFBundleRef CFBundleCreate(CFStringRef bundleURL, void (^callback)(void));

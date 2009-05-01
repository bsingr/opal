#import <CoreFoundation/CFBase.h>
#import <CoreFoundation/CFArray.h>
#import <CoreFoundation/CFDictionary.h>
#import <CoreFoundation/CFError.h>
#import <CoreFoundation/CFString.h>
#import <CoreFoundation/CFURL.h>

typedef struct __CFBundle *CFBundleRef;
typedef struct __CFBundle *CFPlugInRef;

extern CFBundleRef CFBundleGetMainBundle(void);

extern CFBundleRef CFBundleGetBundleWithIdentifier(CFStringRef bundleID);
extern CFArrayRef CFBundleGetAllBundles(void);

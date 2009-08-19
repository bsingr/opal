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

extern CFArrayRef CFBundleCreateBundlesFromDirectory(CFURLRef directoryURL, CFStringRef bundleType);


extern CFURLRef CFBundleCopyBundleURL(CFBundleRef bundle);

extern CFTypeRef CFBundleGetValueForInfoDictionaryKey(CFBundleRef bundle, CFStringRef key);

extern CFDictionaryRef CFBundleGetInfoDictionary(CFBundleRef bundle);

extern CFDictionaryRef CFBundleGetLocalInfoDictionary(CFBundleRef bundle);


extern CFStringRef CFBundleGetIdentifier(CFBundleRef bundle);

extern int CFBundleGetVersionNumber(CFBundleRef bundle);

extern CFStringRef CFBundleGetDevelopmentRegion(CFBundleRef bundle);

extern CFURLRef CFBundleCopySupportFilesDirectoryURL(CFBundleRef bundle);

extern CFURLRef CFBundleCopyResourcesDirectoryURL(CFBundleRef bundle);

extern CFURLRef CFBundleCopyPrivateFrameworksURL(CFBundleRef bundle);

extern CFURLRef CFBundleCopySharedFrameworksURL(CFBundleRef bundle);

extern CFURLRef CFBundleCopySharedSupportURL(CFBundleRef bundle);

extern CFURLRef CFBundleCopyBuiltInPlugInsURL(CFBundleRef bundle);




extern CFURLRef CFBundleCopyResourceURL(CFBundleRef bundle, CFStringRef resourceName, CFStringRef resourceType, CFStringRef subDirName);

extern CFArrayRef CFBundleCopyResourceURLsOfType(CFBundleRef bundle, CFStringRef resourceType, CFStringRef subDirName);

extern CFStringRef CFBundleCopyLocalizedString(CFBundleRef bundle, CFStringRef key, CFStringRef value, CFStringRef tableName);


extern CFArrayRef CFBundleCopyBundleLocalizations(CFBundleRef bundle);

extern CFArrayRef CFBundleCopyPreferredLocalizationsFromArray(CFArrayRef locArray);

extern CFArrayRef CFBundleCopyLocalizationsForPreferences(CFArrayRef locArray, CFArrayRef prefArray);

extern CFURLRef CFBundleCopyResourceURLForLocalization(CFBundleRef bundle, CFStringRef resourceName, CFStringRef resourceType, CFStringRef subDirName, CFStringRef localizationName);

extern CFArrayRef CFBundleCopyResourceURLsOfTypeForLocalization(CFBundleRef bundle, CFStringRef resourceType, CFStringRef subDirName, CFStringRef localizationName);

extern CFDictionaryRef CFBundleCopyInfoDictionaryForURL(CFURLRef url);

extern CFArrayRef CFBundleCopyLocalizationsForURL(CFURLRef url);

extern CFURLRef CFBundleCopyExecutableURL(CFBundleRef bundle);

// extern bool CFBundleLoadExecutableAndReturnError(CFBundleRef bundle, CFErrorRef *error);

extern bool CFBundleLoadExecutable(CFBundleRef bundle);

extern bool CFBundleIsExecutableLoaded(CFBundleRef bundle);


// ==============================================================================
// = Vienna added methods for associating classes with bundles, and preloading. =
// ==============================================================================

extern CFBundleRef CFBundleGetBundleForClass(Class aClass);
extern void CFBundleSetBundleForClass(CFBundleRef bundle, Class aClass);

extern void CFBundlePreloadResource(CFBundleRef bundle, CFStringRef resourceName, CFStringRef resourceType, CFStringRef subDirName);

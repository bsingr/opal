// 
//  CFBundle.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct {
//  CFStringRef _path;
//     CFDictionaryRef _infoDictionary;
// } CFBundleRef;
// 
function CFBundleRef()
{
    this._path = "";
    this._infoDictionary = new CFDictionaryRef();
    return this;
}

// typedef struct {
//  char *name;
// } CFPlugInRef;
// 
// extern CFBundleRef CFBundleGetMainBundle(void);
// 
function CFBundleGetMainBundle()
{
    return CFBundleCreate("Info.plist");
}

// extern CFBundleRef CFBundleGetBundleWithIdentifier(CFStringRef bundleID);
// 
function CFBundleGetBundleWithIdentifier(bundleID)
{
    
}

// extern CFArrayRef CFBundleGetAllBundles(void);
// 
function CFBundleGetAllBundles()
{
    
}

// extern CFBundleRef CFBundleCreate(CFURLRef bundleURL);
// 
function CFBundleCreate(bundleURL)
{
    var the_bundle = __bootstrap_bundles["bundleURL"]
    var bundle_object = new CFBundleRef();
    bundle_object.path = bundleURL;
    bundle_object._infoDictionary = the_bundle;
}

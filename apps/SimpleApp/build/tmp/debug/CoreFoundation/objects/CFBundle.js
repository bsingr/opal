// 
//  CFBundle.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

 
function CFBundleRef()
{
    this._path = "";
    this._infoDictionary = new CFDictionaryRef();
    return this;
}

var kCFBundleInfoDictionaryVersionKey = "";
var kCFBundleExecutableKey = "CFBundleExecutable";
var kCFBundleIdentifierKey = "";
var kCFBundleVersionKey = "";
var kCFBundleDevelopmentRegionKey = "";
var kCFBundleNameKey = "";
var kCFBundleLocalizationsKey = "";

// extern CFBundleRef CFBundleGetMainBundle(void);
function CFBundleGetMainBundle()
{
    return __bootstrap_main_bundle;
}

// extern CFBundleRef CFBundleGetBundleWithIdentifier(CFStringRef bundleID);
function CFBundleGetBundleWithIdentifier(bundleID)
{
    
}

// extern CFArrayRef CFBundleGetAllBundles(void);
function CFBundleGetAllBundles()
{
    
}

// extern CFBundleRef CFBundleCreate(CFStringRef bundleURL, void (^callback)(void));
function CFBundleCreate(bundleURL, callback)
{
    var the_bundle = new CFBundleRef();
    the_bundle._path = bundleURL;
    
    var request = CFHTTPRequestCreate("GET", bundleURL, true, function(evt) {
        switch (request.readyState)
        {
            case 4:
                the_bundle._infoDictionary = CFPropertyListCreateFromJSONData(request.responseText);
                callback();
                break;
        }
    });
    CFHTTPRequestSetMimeType(request, "text/javascript");
    CFHTTPRequestSend(request, null);
    
    return the_bundle;
}



// ========================
// = Vienna added methods =
// ========================

// extern CFBundleRef CFBundleGetBundleForClass(Class aClass);
function CFBundleGetBundleForClass(aClass)
{
    return __bootstrap_bundles_for_class[aClass.name];
}

// extern void CFBundleSetBundleForClass(CFBundleRef bundle, Class aClass);
function CFBundleSetBundleForClass(bundle, aClass)
{
    __bootstrap_bundles_for_class[aClass.name] = bundle;
}

// extern void CFBundlePreloadResource(CFBundleRef bundle, CFStringRef resourceName, CFStringRef resourceType, CFStringRef subDirName);
function CFBundlePreloadResource(bundle, resourceName, resourceType, subDirName)
{
    NSLog("Need to preload: " + resourceName + "." + resourceType);
    
    var theImage = new Image();
    theImage.src = "file:///Users/adam/Sites/lumpy.png";
    CFArrayAppendValue(__bootstrap_preload_files, theImage);
    
    theImage.onload =  function() {    	           
       __bootstrap_preload_finished(theImage);
    };
}

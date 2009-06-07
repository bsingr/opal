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
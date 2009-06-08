// 
//  CFData.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CFDataRef()
{
    this._bytes = "";
    return this;
}

// extern CFDataRef CFDataCreateFromURL(CFStringRef path, void (^callback)(void));
function CFDataCreateFromURL(path, callback)
{
    if (CFDictionaryContainsKey(__bootstrap_files, path))
    {
        callback(CFDictionaryGetValue(__bootstrap_files, path));
        return CFDictionaryGetValue(__bootstrap_files, path);
    }

    // Do not already have file, so download..
    
    var the_data = new CFDataRef();
    CFDictionarySetValue(__bootstrap_files, path, the_data);
    
    var request = CFHTTPRequestCreate("GET", path, true, function(evt) {
        switch (request.readyState)
        {
            case 4:
                the_data._bytes = request.responseText;
                callback();
                break;
        }
    });
    CFHTTPRequestSetMimeType(request, "text/plain");
    CFHTTPRequestSend(request, null);
    
    return the_data;
}

// extern CFDataRef CFDataCreate(void *bytes, CFIndex length);
// 
function CFDataCreate(bytes, length)
{
    var the_data = new CFDataRef();
    the_data._bytes = bytes;
    return the_data;
}

// extern CFDataRef CFDataCreateCopy(CFDataRef theData);
// 
function CFDataCreateCopy(theData)
{
    
}

// extern CFMutableDataRef CFDataCreateMutable(CFIndex capacity);
// 
function CFDataCreateMutable(capacity)
{
    
}

// extern CFMutableDataRef CFDataCreateMutableCopy(CFIndex capacity, CFDataRef theData);
// 
function CFDataCreateMutableCopy(capacity, theData)
{
    
}

// extern CFIndex CFDataGetLength(CFDataRef theData);
// 
function CFDataGetLength(theData)
{
    
}

// extern void CFDataGetBytes(CFDataRef theData, CFRange range, void *buffer);
// 
function CFDataGetBytes(theData, range, buffer)
{
    
}

// extern void CFDataAppendBytes(CFMutableDataRef theData, void *bytes, CFIndex length);
// 
function CFDataAppendCytes(theData, bytes, length)
{
    
}

// extern void CFDataReplaceBytes(CFMutableDataRef theData, CFRange range, void *newBytes, CFIndex newLength);
// 
function CFDataReplaceBytes(theData, range, newBytes, newLength)
{
    
}

// extern void CFDataDeleteBytes(CFMutableDataRef theData, CFRange range);
// 
function CFDataDeleteBytes(theData, range)
{
    
}

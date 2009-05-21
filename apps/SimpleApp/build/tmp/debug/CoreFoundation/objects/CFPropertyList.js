// 
//  CFPropertyList.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// enum {
//     kCFPropertyListImmutable = 0,
//     kCFPropertyListMutableContainers,
//     kCFPropertyListMutableContainersAndLeaves
// };

// extern CFPropertyListRef CFPropertyListCreateFromXMLData(CFDataRef xmlData, CFOptionFlags mutabilityOption, CFStringRef *errorString);
// 
function CFPropertyListCreateFromXMLData(xmlData, mutabilityOption, errorString)
{
    
}

// extern CFDataRef CFPropertyListCreateXMLData (CFPropertyListRef propertyList);
// 
function CFPropertyListCreateXMLData(propertyList)
{
    
}

// extern CFPropertyListRef CFPropertyListCreateFromJSONData(CFDataRef jsonData, CFOptionFlags mutabilityOption, CFStringRef *errorString);
// 
function CFPropertyListCreateFromJSONData(jsonData, mutabilityOption, errorString)
{
    var theResult = CFJSONParserCreate(jsonData);
    
    if(!CFDictionaryContainsKey(theResult, "plist"))
        return null;
        
    var plistElement = CFDictionaryGetValue(theResult, "plist");
    if(!CFDictionaryContainsKey(plistElement, "dict"))
        return null;
    
    var rootElement = CFDictionaryGetValue(plistElement, "dict");
    _CFPropertyListReformatDictionary(rootElement);
    
    return theResult;
}

function _CFPropertyListReformatDictionary(theDict)
{
    var count = CFDictionaryGetCount(theDict);
    var allKeys = [];
    var allValues = [];
    CFDictionaryGetKeysAndValues(theDict, allKeys, allValues);
    
    console.log(allKeys);
    
    for(var i = 0; i < count; i++)
    {
        
    }
}


// extern CFDataRef CFPropertyListCreateJSONData (CFPropertyListRef propertyList);
// 
function CFPropertyListCreateJSONData(propertyList)
{
    
}

// extern CFPropertyListRef CFPropertyListCreateDeepCopy (CFPropertyListRef propertyList, CFOptionFlags mutabilityOption);
// 
function CFPropertyListCreateDeepCopy(propertyList, mutabilityOption)
{
    
}

// enum {
//     kCFPropertyListOpenStepFormat = 1,
//     kCFPropertyListXMLFormat_v1_0 = 100,
//     kCFPropertyListBinaryFormat_v1_0 = 200
// };

// extern bool CFPropertyListIsValid (CFPropertyListRef plist, CFPropertyListFormat format);
// 
function CFPropertyListIsValid(plist, format)
{
    
}
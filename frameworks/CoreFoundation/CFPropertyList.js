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
    var the_parser = CFJSONParserCreate(jsonData);
    var the_result = CFJSONParserParse(the_parser);
    
    if(CFDictionaryContainsKey(the_result, "plist"))
        the_result = CFDictionaryGetValue(CFDictionaryGetValue(the_result, "plist"), "dict");
    else if(CFDictionaryContainsKey(the_result, "archive"))
        the_result = CFDictionaryGetValue(CFDictionaryGetValue(the_result, "archive"), "data");
    
    _CFPropertyListReformatDictionary(the_result);
    
    return the_result;
}

function _CFPropertyListReformatDictionary(theDict)
{
    var keys = [];
    var values = [];
    CFDictionaryGetKeysAndValues(theDict, keys, values);
    
    for(var i = 0; i < CFDictionaryGetCount(theDict); i++)
    {
        if(CFDictionaryContainsKey(values[i], "string"))
            CFDictionarySetValue(theDict, keys[i], CFDictionaryGetValue(values[i], "string"));
        else if(CFDictionaryContainsKey(values[i], "int"))
                CFDictionarySetValue(theDict, keys[i], CFDictionaryGetValue(values[i], "int"));
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
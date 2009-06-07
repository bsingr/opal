// 
//  CFDictionary.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct CFDictionaryRef {
//     CFArrayRef _keys;
//     CFArrayRef _values;
//     CFIndex _count;
// };
// 
function CFDictionaryRef()
{
    this._keys = [];
    this._values = {};
    this._count = 0;
    return this;
}

// typedef struct *CFMutableDictionaryRef {
//     CFArrayRef _keys;
//     CFArrayRef _values;
//     CFIndex _count;
// };
// 
function CFMutableDictionaryRef()
{
    this._keys = [];
    this._values = {};
    this._count = 0;
    return this;
}

// extern CFDictionaryRef CFDictionaryCreate(void **keys, void **values);
// 
function CFDictionaryCreate(keys, values)
{
    var theDictionary = new CFDictionaryRef();
    
    for(var i = 0; i < keys.length; i++)
        CFDictionarySetValue(theDictionary, keys[i]. values[i]);
    
    return theDictionary;
}

// extern CFDictionaryRef CFDictionaryCreateCopy(CFDictionaryRef theDict);
// 
function CFDictionaryCreateCopy(theDict)
{
    var newDictionary = new CFDictionaryRef();
    newDictionary._count = theDict._count;
    
    for (newKey in theDict._keys)
        newDictionary._keys.push(newKey);
    
    for (newValue in theDict._values)
        newDictionary._values.push(newKey);
    
    return newDictionary;
}

// extern CFMutableDictionaryRef CFDictionaryCreateMutable();
// 
function CFDictionaryCreateMutable()
{
    return new CFMutableDictionaryRef();
}

// extern CFMutableDictionaryRef CFDictionaryCreateMutableCopy(CFDictionaryRef theDict);
// 
function CFDictionaryCreateMutableCopy(theDict)
{
    var newDictionary = new CFMutableDictionaryRef();
    newDictionary._count = theDict._count;
    
    for (newKey in theDict._keys)
        newDictionary._keys.push(newKey);
    
    for (newValue in theDict._values)
        newDictionary._values.push(newKey);
    
    return newDictionary;    
}

// extern CFIndex CFDictionaryGetCount(CFDictionaryRef theDict);
// 
function CFDictionaryGetCount(theDict)
{
    return theDict._count;
}

// extern CFIndex CFDictionaryGetCountOfKey(CFDictionaryRef theDict, void *key);
// 
function CFDictionaryGetCountOfKey (theDict, key)
{
    
}

// extern CFIndex CFDictionaryGetCountOfValue(CFDictionaryRef theDict, void *value);
// 
function CFDictionaryGetCountOfValue(theDict, value)
{
    
}

// extern bool CFDictionaryContainsKey(CFDictionaryRef theDict, void *key);
// 
function CFDictionaryContainsKey(theDict, key)
{
    return (theDict._values[key]) != null;
}

// extern bool CFDictionaryContainsValue(CFDictionaryRef theDict, void *value);
// 
function CFDictionaryContainsValue(theDict, value)
{
    
}

// extern void *CFDictionaryGetValue(CFDictionaryRef theDict, void *key);
// 
function CFDictionaryGetValue(theDict, key)
{
    return theDict._values[key];
}

// extern bool CFDictionaryGetValueIfPresent(CFDictionaryRef theDict, void *key, void **value);
// 
function CFDictionaryGetValueIfPresent(theDict, key, value)
{
    
}

// extern void CFDictionaryGetKeysAndValues(CFDictionaryRef theDict, void **keys, void **values);
// 
function CFDictionaryGetKeysAndValues(theDict, keys, values)
{
    for(i in theDict._keys)
    {
        keys.push(theDict._keys[i]);
        values.push(CFDictionaryGetValue(theDict, theDict._keys[i]));
    }
    // keys = theDict._keys;
    // value = theDict._values;
}

// extern void CFDictionaryAddValue(CFMutableDictionaryRef theDict, void *key, void *value);
// 
function CFDictionaryAddValue(theDict, key, value)
{
    
}

// extern void CFDictionarySetValue(CFMutableFictionaryRef theDict, void *key, void *value);
// 
function CFDictionarySetValue(theDict, key, value)
{
    if (!CFDictionaryContainsKey(theDict, key))
    {
        theDict._keys.push(key);
        theDict._count ++;
    }

    theDict._values[key] = value;
}

// extern void CFDictionaryReplaceValue(CFMutableDitionaryRef theDict, void *key, void *value);
// 
function CFDictionaryReplaceValue(theDict, key, value)
{
    
}

// extern void CFDictionaryRemoveValue(CFMutableDictionaryRef theDict, void *key);
// 
function CFDictionaryRemoveValue(theDict, key)
{
    
}

// extern void CFDictionaryRemoveAllValues(CFMutableDictionaryRef theDict);
// 
function CFDictionaryRemoveAllValues(theDict)
{
    
}

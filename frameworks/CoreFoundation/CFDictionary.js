var CFDictionaryCreate = function (keys, values)
{
    var theDictionary = {
        keys: keys,
        count: 0,
        values: values,
    }
    
    return theDictionary;
}

var CFDictionaryCreateCopy = function (theDict)
{
    var count = CFDictionaryGetCount(theDict);
    
    return theDict;
}

var CFDictionaryCreateMutable = function ()
{
    var theDictionary = {
        keys: [],
        count: 0,
        values: []
    }
    
    return theDictionary;
}

var CFDictionaryCreateMutableCopy = function (theDict)
{
    return theDict;
}

var CFDictionaryGetCount = function (theDict)
{
    return theDict.count;
}

var CFDictionaryGetCountOfKey = function (theDict, key)
{
    
}

var CFDictionaryGetCountOfValue = function (theDict, value)
{
    
}

var CFDictionaryContainsKey = function (theDict, key)
{
    
}

var CFDictionaryContainsValue = function (theDict, value)
{
    
}

var CFDictionaryGetValue = function (theDict, key)
{
    
}

var CFDictionaryGetValueIfPresent = function (theDict, key, value)
{
    
}

var CFDictionaryGetKeysAndValues = function (theDict, keys, values)
{
    
}

var CFDictionaryAddValue = function (theDict, key, value)
{
    
}

var CFDictionarySetValue = function (theDict, key, value)
{
    
}

var CFDictionaryReplaceValue = function (theDict, key, value)
{
    
}

var CFDictionaryRemoveValue = function (theDict, key)
{
    
}

var CFDictionaryRemoveAllValues = function (theDict)
{
    
}

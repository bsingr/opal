var CFArrayCreate = function (values, numValues)
{
    var newArray = [];
    for (var i = 0; i < numValues; i++)
        newArray.push(values[i])
    
    return newArray;
}

var CFArrayCreateCopy = function (theArray)
{
    return CFArrayCreate(theArray, theArray.length);
}

var CFArrayCreateMutable = function (capacity)
{
    return [];
}

var CFArrayCreateMutableCopy = function (capacity, theArray)
{
    return CFArrayCreate (theArray, capacity);
}

var CFArrayGetCount = function (theArray)
{
    return theArray.length;
}

var CFArrayGetCountOfValue = function (theArray, range, value)
{
    return 0;
}

var CFArrayContainsValue = function (theArray, theRange, value)
{
    if (theArray.indexOf[value] != -1)
        return true;
    
    return false;
}

var CFArrayGetValueAtIndex = function (theArray, idx)
{
    return theArray[idx];
}

extern void CFArrayGetValues(CFArrayRef theArray, CFRange range, void **values);

extern CFIndex CFArrayGetFirstIndexOfValue(CFArrayRef theArray, CFRange range, void *value);
extern CFIndex CFArrayGetLastIndexOfValue(CFArrayRef theArray, CFRange range, void *value);

extern void CFArrayAppendValue(CFMutableArrayRef theArray, void *value);
extern void CFArrayInsertValueAtIndex(CFMutableArrayRef theArray, CFIndex idx, void *value);
extern void CFArraySetValueAtIndex(CFMutableArrayRef theArray, CFIndex idx, void *value);

extern void CFArrayRemoveValueAtIndex(CFMutableArrayRef theArray, CFIndex idx);
extern void CFArrayRemoveAllValues(CFMutableArrayRef theArray);

extern void CFArrayReplaceValues(CFMutableArrayRef theArray, CFRange range, void *newValues, CFIndex newCount);
extern void CFArrayExchangeValuesAtIndices(CFMutableArrayRef theArray, CFIndex idx1, CFIndex idx2);

extern void CFArrayAppendArray(CFMutableArrayRef theArray, CFArrayRef otherArray, CFRange otherRange);

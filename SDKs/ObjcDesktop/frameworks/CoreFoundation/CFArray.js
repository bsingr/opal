// 
//  CFArray.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFArrayRef CFArrayCreate(void **values, numValues);
// 
function CFArrayCreate(values, numValues)
{
    return CFArrayCreateCopy(values);
}

// extern CFArrayRef CFArrayCreateCopy(CFArrayRef theArray);
// 
function CFArrayCreateCopy(theArray)
{
    var new_array = CFArrayCreateMutable(0);
    
    for(var i = 0; i < theArray.length; i++)
        CFArrayAppendValue(new_array, theArray[i]);
    
    return new_array;
}

// extern CFMutableArrayRef CFArrayCreateMutable(CFIndex capacity);
// 
function CFArrayCreateMutable(capacity)
{
    return new Array();
}

// extern CFMutableArrayRef CFArrayCreateMutableCopy(CFIndex capacity, CFArrayRef theArray);
// 
function CFArrayCreateMutableCopy(capacity, theArray)
{
    return CFArrayCreateCopy(theArray);
}

// extern CFIndex CFArrayGetCount(CFArrayRef theArray);
// 
function CFArrayGetCount(theArray)
{
    return theArray.length;
}

// extern CFIndex CFArrayGetCountOfValue(CFArrayRef theArray, CFRange range, void *value);
// 
function CFArrayGetCountOfValue(theArray, range, value)
{
    
}

// extern bool CFArrayContainsValue(CFArrayRef theArray, CFRange theRange, void *value);
// 
function CFArrayContainsValue(theArray, theRange, value)
{
    
}

// extern void *CFArrayGetValueAtIndex(CFArrayRef theArray, CFIndex idx);
// 
function CFArrayGetValueAtIndex(theArray, idx)
{
    return theArray[idx];
}

// extern void CFArrayGetValues(CFArrayRef theArray, CFRange range, void **values);
// 
function CFArrayGetValues(theArray, range, values)
{
    
}

// extern CFIndex CFArrayGetFirstIndexOfValue(CFArrayRef theArray, CFRange range, void *value);
// 

// Fix for IE not having indexOf property.
if (!Array.prototype.indexOf) Array.prototype.indexOf = function(item, i)
{
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++)
        if (this[i] === item) return i;
            return -1;
};

function CFArrayGetFirstIndexOfValue(theArray, range, value)
{
    return theArray.indexOf(value);
}

// extern CFIndex CFArrayGetLastIndexOfValue(CFArrayRef theArray, CFRange range, void *value);
// 
function CFArrayGetLastIndexOfValue(theArray, range, value)
{
    
}

// extern void CFArrayAppendValue(CFMutableArrayRef theArray, void *value);
// 
function CFArrayAppendValue(theArray, value)
{
    theArray.push(value);
}

// extern void CFArrayInsertValueAtIndex(CFMutableArrayRef theArray, CFIndex idx, void *value);
// 
function CFArrayInsertValueAtIndex(theArray, idx, value)
{

}

// extern void CFArraySetValueAtIndex(CFMutableArrayRef theArray, CFIndex idx, void *value);
// 
function CFArraySetValueAtIndex(theArray, idx, value)
{
    
}

// extern void CFArrayRemoveValueAtIndex(CFMutableArrayRef theArray, CFIndex idx);
// 
function CFArrayRemoveValueAtIndex(theArray, idx)
{
    theArray.splice(idx, 1);
}

// extern void CFArrayRemoveAllValues(CFMutableArrayRef theArray);
// 
function CFArrayRemoveAllValues(theArray)
{
    
}

// extern void CFArrayReplaceValues(CFMutableArrayRef theArray, CFRange range, void *newValues, CFIndex newCount);
// 
function CFArrayReplaceValues(theArray, range, newValues, newCount)
{
    
}

// extern void CFArrayExchangeValuesAtIndices(CFMutableArrayRef theArray, CFIndex idx1, CFIndex idx2);
// 
function CFArrayExchnageValuesAtIndices(theArray, idx1, idx2)
{
    
}

// extern void CFArrayAppendArray(CFMutableArrayRef theArray, CFArrayRef otherArray, CFRange otherRange);
// 
function CFArrayAppendArray(theArray, otherArray, otherRange)
{
    
}

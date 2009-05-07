// 
//  CFArray.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>

typedef void *CFArrayRef;
typedef void *CFMutableArrayRef;

extern CFArrayRef CFArrayCreate(void **values, size_t numValues);
extern CFArrayRef CFArrayCreateCopy(CFArrayRef theArray);

extern CFMutableArrayRef CFArrayCreateMutable(CFIndex capacity);
extern CFMutableArrayRef CFArrayCreateMutableCopy(CFIndex capacity, CFArrayRef theArray);

extern CFIndex CFArrayGetCount(CFArrayRef theArray);
extern CFIndex CFArrayGetCountOfValue(CFArrayRef theArray, CFRange range, void *value);

extern bool CFArrayContainsValue(CFArrayRef theArray, CFRange theRange, void *value);
extern void *CFArrayGetValueAtIndex(CFArrayRef theArray, CFIndex idx);
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

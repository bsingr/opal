// 
//  CFData.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>

typedef struct {
	
} CFDataRef;

typedef struct {
	
} CFMutableDataRef;

extern CFDataRef CFDataCreate(void *bytes, CFIndex length);
extern CFDataRef CFDataCreateCopy(CFDataRef theData);

extern CFMutableDataRef CFDataCreateMutable(CFIndex capacity);
extern CFMutableDataRef CFDataCreateMutableCopy(CFIndex capacity, CFDataRef theData);

extern CFIndex CFDataGetLength(CFDataRef theData);

extern void CFDataGetBytes(CFDataRef theData, CFRange range, void *buffer);

extern void CFDataAppendBytes(CFMutableDataRef theData, void *bytes, CFIndex length);
extern void CFDataReplaceBytes(CFMutableDataRef theData, CFRange range, void *newBytes, CFIndex newLength);
extern void CFDataDeleteBytes(CFMutableDataRef theData, CFRange range);

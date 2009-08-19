// 
//  CFBase.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// C defined types?????????
typedef int bool;

typedef unsigned long CFTypeID;
typedef unsigned long CFOptionFlags;
typedef unsigned long CFHashCode;
typedef signed long CFIndex;

typedef const void *CFTypeRef;

typedef void *CFStringRef;
typedef void *CFMutableStringRef;

typedef CFTypeRef CFPropertyListRef;

enum {
  kCFCompareLessThan    = -1,
  kCFCompareEqualTo     = 0,
  kCFCompareGreaterThan   = 1
};
typedef CFIndex CFComparisonResult;

enum {
  kCFNotFound = -1
};

typedef struct {
  CFIndex location;
  CFIndex length;
} CFRange;

extern CFRange CFRangeMake(CFIndex loc, CFIndex len);

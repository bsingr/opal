// 
//  NSRange.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSValue.h>
#import <Foundation/NSObjCRuntime.h>

@class NSString;

typedef struct _NSRange {
    NSUInteger location;
    NSUInteger length;
} NSRange;

typedef NSRange *NSRangePointer;

extern NSRange NSMakeRange(NSUInteger loc, NSUInteger len);

extern NSUInteger NSMaxRange(NSRange range);

extern BOOL NSLocationInRange(NSUInteger loc, NSRange range);

extern BOOL NSEqualRanges(NSRange range1, NSRange range2);

extern NSRange NSUnionRange(NSRange range1, NSRange range2);
extern NSRange NSIntersectionRange(NSRange range1, NSRange range2);
extern NSString *NSStringFromRange(NSRange range);
extern NSRange NSRangeFromString(NSString *aString);

@interface NSValue (NSValueRangeExtensions)

+ (NSValue *)valueWithRange:(NSRange)range;
- (NSRange)rangeValue;

@end

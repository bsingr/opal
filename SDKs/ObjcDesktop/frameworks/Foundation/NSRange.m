// 
//  NSRange.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSRange.h"

NSRange NSMakeRange(NSUInteger loc, NSUInteger len)
{
  NSRange r;
  r.location = loc;
  r.length = len;
  return r;
}

NSUInteger NSMaxRange(NSRange range)
{
  return (range.location + range.length);
}

BOOL NSLocationInRange(NSUInteger loc, NSRange range)
{
  return (loc - range.location < range.length);
}

BOOL NSEqualRanges(NSRange range1, NSRange range2)
{
  return (range1.location == range2.location && range1.length == range2.length);
}

NSRange NSUnionRange(NSRange range1, NSRange range2)
{
  
}

NSRange NSIntersectionRange(NSRange range1, NSRange range2)
{
  
}

NSString *NSStringFromRange(NSRange range)
{
  
}

NSRange NSRangeFromString(NSString *aString)
{
  
}


@implementation NSValue (NSValueRangeExtensions)

+ (NSValue *)valueWithRange:(NSRange)range
{
  
}

- (NSRange)rangeValue
{
  
}

@end

// 
//  NSDate.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>

@class NSString;

typedef double NSTimeInterval;

#define NSTimeIntervalSince1970 978307200.0

@interface NSDate : NSObject <NSObject, NSCoding>

- (NSTimeInterval)timeIntervalSinceReferenceDate;

@end
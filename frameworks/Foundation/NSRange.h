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

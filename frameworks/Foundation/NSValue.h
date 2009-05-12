// 
//  NSValue.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-12.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>

@class NSDictionary;
@class NSString;

@interface NSValue : NSObject <NSCopying, NSCoding>

- (void)getValue:(void *)value;
- (const char *)objCType;

@end
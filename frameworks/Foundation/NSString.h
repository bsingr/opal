// 
//  NSString.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-12.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSRange.h>

@class NSData;
@class NSArray;
@class NSDictionary;
@class NSURL;
@class NSError;
@class NSLocale;

extern NSString *const NSParseErrorException;

enum {
    NSCaseInsensitiveSearch         = 1,
    NSLiteralSearch                 = 2,
    NSBackwardsSearch               = 4,
    NSAnchoredSearch                = 8,
    NSNumericSearch                 = 64,
    NSDiacriticInsensitiveSearch    = 128,
    NSWidthInsensitiveSearch        = 256,
    NSForcedOrderingSearch          = 512
};
typedef NSUInteger NSStringCompareOptions;

@interface NSString : NSObject <NSCopying, NSMutableCopying, NSCoding>

- (NSUInteger)length;
- (char *)characterAtIndex:(NSUInteger)index;

@end


@interface NSMutableString : NSString

- (void)replaceCharactersInRange:(NSRange)range withString:(NSString *)aString;

@end

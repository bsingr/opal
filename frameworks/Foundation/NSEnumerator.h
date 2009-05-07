// 
//  NSEnumerator.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>

@class NSArray;

typedef struct {
    unsigned long state;
} NSFastEnumerationState;

@protocol NSFastEnumeration

- (NSUInteger)countByEnumeratingWithState:(NSFastEnumerationState *)state objects:(id *)stackbuf count:(NSUInteger)len;

@end

@interface NSEnumerator : NSObject <NSFastEnumeration>

- (id)nextObject;

@end

@interface NSEnumerator (NSExtendedEnumerator)

- (NSArray *)allObjects;

@end

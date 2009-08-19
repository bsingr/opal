// 
//  NSTextStorage.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextStorage.h"

NSString *NSTextStorageWillProcessEditingNotification = @"NSTextStorageWillProcessEditingNotification";
NSString *NSTextStorageDidProcessEditingNotification = @"NSTextStorageDidProcessEditingNotification";

@implementation NSTextStorage

- (id)init
{
  self = [super init];
  
  _layoutManagers = [NSMutableArray array];
  
  return self;
}

- (void)addLayoutManager:(NSLayoutManager *)aLayoutManager
{
  [_layoutManagers addObject:aLayoutManager];
  [aLayoutManager setTextStorage:self];
}

- (void)removeLayoutManager:(NSLayoutManager *)aLayoutManager
{
  [_layoutManagers removeObject:aLayoutManager];
}

- (NSArray *)layoutManagers
{
  return _layoutManagers;
}

- (void)edited:(NSUInteger)editedMask range:(NSRange)range changeInLength:(NSInteger)delta
{
  
}

- (void)processEditing
{
  
}

- (void)invalidateAttributesInRange:(NSRange)range
{
  
}

- (void)ensureAttributesAreFixedInRange:(NSRange)range
{
  
}

- (BOOL)fixesAttributesLazily
{
  
}
  
- (NSUInteger)editedMask
{
  
}

- (NSRange)editedRange
{
  
}

- (NSInteger)changeInLength
{
  
}

- (void)setDelegate:(id)delegate
{
  
}

- (id)delegate
{
  
}

@end

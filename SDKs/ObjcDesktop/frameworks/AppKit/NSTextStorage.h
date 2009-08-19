// 
//  NSTextStorage.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <AppKit/NSAttributedString.h>

@class NSLayoutManager, NSMutableArray;

enum {
  NSTextStorageEditedAttributes = 1,
  NSTextStorageEditedCharacters = 2
};

@interface NSTextStorage : NSAttributedString
{
  NSRange      _editedRange;
  NSInteger    _editedDelta;
  NSMutableArray  *_layoutManagers;
  id         _sideData;
}

- (void)addLayoutManager:(NSLayoutManager *)aLayoutManager;
- (void)removeLayoutManager:(NSLayoutManager *)aLayoutManager;
- (NSArray *)layoutManagers;

- (void)edited:(NSUInteger)editedMask range:(NSRange)range changeInLength:(NSInteger)delta;
- (void)processEditing;

- (void)invalidateAttributesInRange:(NSRange)range;
- (void)ensureAttributesAreFixedInRange:(NSRange)range;
- (BOOL)fixesAttributesLazily;
  
- (NSUInteger)editedMask;
- (NSRange)editedRange;
- (NSInteger)changeInLength;

- (void)setDelegate:(id)delegate;
- (id)delegate;

@end


@protocol NSTextStorageDelegate

- (void)textStorageWillProcessEditing:(NSNotification *)notification;
- (void)textStorageDidProcessEditing:(NSNotification *)notification;

@end


extern NSString *NSTextStorageWillProcessEditingNotification;
extern NSString *NSTextStorageDidProcessEditingNotification;

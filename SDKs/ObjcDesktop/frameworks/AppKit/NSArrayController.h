// 
//  NSArrayController.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>
#import <AppKit/NSObjectController.h>

@interface NSArrayController : NSObjectController
{
    NSUInteger      _selectionIndex;
    BOOL            _preservesSelection;
}

- (id)init;
- (void)prepareContent;
- (id)arrangedObjects;
- (void)add:(id)sender;
- (BOOL)preservesSelection;
- (void)setPreservesSelection:(BOOL)flag;
- (NSUInteger)selectionIndex;
- (BOOL)setSelectionIndex:(NSUInteger)index;
- (BOOL)setSelectionIndexes:(NSIndexSet *)indexes;
- (NSIndexSet *)selectionIndexes;
- (NSArray *)selectedObjects;
- (void)selectNext:(id)sender;
- (BOOL)canSelectNext;
- (void)selectPrevious:(id)sender;
- (BOOL)canSelectPrevious;
- (BOOL)canInsert;
- (void)insert:(id)sender;
- (void)addObject:(id)sender;
- (void)addObjects:(NSArray *)objects;
- (void)removeObjectAtArrangedObjectIndex:(NSUInteger)index;
- (void)removeObjectsAtArrangedObjectIndexes:(NSIndexSet *)indexes;
- (void)remove:(id)sender;
- (void)removeObject:(id)object;
- (void)removeObjects:(NSArray *)objects;

@end
// 
//  NSArrayController.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSArrayController.h"

@implementation NSArrayController

- (id)init
{
    if((self = [super init]))
    {
    }
    return self;
}

- (void)prepareContent
{
    NSMutableArray *anArray = [[NSMutableArray alloc] initWithCapacity:1];
    [anArray addObject:[self newObject]];
    [self setContent:anArray];
}

- (id)arrangedObjects
{
   return _content;
}

- (void)add:(id)sender
{
    if ([self canAdd])
        [self insert:sender];
}

- (BOOL)preservesSelection
{
   return _preservesSelection;
}

- (void)setPreservesSelection:(BOOL)flag
{
    _preservesSelection = flag;
}

- (NSUInteger)selectionIndex
{
   return _selectionIndex;
}

- (void)setSelectionIndex:(NSUInteger)index
{
   [self setSelectionIndexes:index];
}

- (void)setSelectionIndexes:(NSIndexSet *)indexes
{
    _selectionIndex = indexes;
    return YES;
}

- (NSIndexSet *)selectionIndexes
{
   return _selectionIndex;
}

- (NSArray *)selectedObjects
{
    NSMutableArray *theObjects = [NSMutableArray arrayWithCapacity:0];
    [theObjects addObject:[_content objectAtIndex:[self selectionIndex]]];
    return theObjects;
}

- (void)selectNext:(id)sender
{
	NSUInteger currentSelection = [self selectionIndex];
	
	if ([self canSelectNext])
		[self setSelectionIndex:(currentSelection + 1)];
}

- (BOOL)canSelectNext
{
	if (([_content count] > 1) && ([self selectionIndex] < ([_content count] - 1)))
		return YES;
	
	return NO;
}

- (void)selectPrevious:(id)sender
{
	NSUInteger currentSelection = [self selectionIndex];
	
	if ([self canSelectPrevious])
		[self setSelectionIndex:(currentSelection - 1)];
}

- (BOOL)canSelectPrevious
{
	return NO;
}

- (BOOL)canInsert
{
	return [self isEditable];
}

- (void)insert:(id)sender
{
	if (![self canInsert])
		return;
	
	[self addObject:[self newObject]];
}

- (void)addObject:(id)object
{
	if (![self canAdd])
		return;
	
	[_content addObject:object];
}

- (void)addObjects:(NSArray *)objects
{
}

- (void)removeObjectAtArrangedObjectIndex:(NSUInteger)index
{
}

- (void)removeObjectsAtArrangedObjectIndexes:(NSIndexSet *)indexes
{
}

- (void)remove:(id)sender
{
    NSLog(@"[NSArrayController remove] - Need to implement");
	[self removeObjectsAtArrangedObjectIndexes:[self selectionIndexes]];
}

- (void)removeObject:(id)object
{
	if (![self canRemove])
		return;
	
	[_content removeObject:object];
}

- (void)removeObjects:(NSArray *)objects
{
	
}

@end

// 
//  NSArray.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSArray.h"

@implementation NSArray

+ (id)alloc
{
  return CFArrayCreateMutable(1);
}

- (NSUInteger)count
{
  return CFArrayGetCount(self);
}

- (id)objectAtIndex:(NSUInteger)index
{
  return CFArrayGetValueAtIndex(self, index);
}
  
@end


@implementation NSArray (NSExtendedArray)

- (NSArray *)arrayByAddingObject:(id)anObject
{
  
}

- (NSArray *)arrayByAddingObjectsFromArray:(NSArray *)otherArray
{
  
}

- (NSString *)componentsJoinedByString:(NSString *)separator
{
  
}

- (BOOL)containsObject:(id)anObject
{
  
}

- (NSString *)description
{
  
}

- (NSString *)descriptionWithLocale:(id)locale
{
  
}

- (NSString *)descriptionWithLocale:(id)locale indent:(NSUInteger)level
{
  
}

- (id)firstObjectCommonWithArray:(NSArray *)otherArray
{
  
}

- (void)getObjects:(id *)objects
{
  
}

- (void)getObjects:(id *)objects range:(NSRange)range
{
  
}

- (NSUInteger)indexOfObject:(id)anObject
{
  
}

- (NSUInteger)indexOfObject:(id)anObject inRange:(NSRange)range
{
  
}

- (NSUInteger)indexOfObjectIdenticalTo:(id)anObject
{
  
}

- (NSUInteger)indexOfObjectIdenticalTo:(id)anObject inRange:(NSRange)range
{
  
}

- (BOOL)isEqualToArray:(NSArray *)otherArray
{
  
}

- (id)lastObject
{
  return [self objectAtIndex:[self count] - 1];
}

- (NSEnumerator *)objectEnumerator
{
  return [[NSEnumerator alloc] initWithArray:[NSMutableArray arrayWithArray:self]];
}

- (NSEnumerator *)reverseObjectEnumerator
{
  
}

- (NSData *)sortedArrayHint
{
  
}

- (NSArray *)sortedArrayUsingFunction:(NSInteger (*)(id, id, void *))comparator context:(void *)context
{
  
}

- (NSArray *)sortedArrayUsingFunction:(NSInteger (*)(id, id, void *))comparator context:(void *)context hint:(NSData *)hint
{
  
}

- (NSArray *)sortedArrayUsingSelector:(SEL)comparator
{
  
}

- (NSArray *)subarrayWithRange:(NSRange)range
{
  
}

- (BOOL)writeToFile:(NSString *)path atomically:(BOOL)useAuxiliaryFile
{
  
}

- (BOOL)writeToURL:(NSURL *)url atomically:(BOOL)atomically
{
  
}

- (void)makeObjectsPerformSelector:(SEL)aSelector
{
  
}

- (void)makeObjectsPerformSelector:(SEL)aSelector withObject:(id)argument
{
  
}

- (NSArray *)objectsAtIndexes:(NSIndexSet *)indexes
{
  
}

@end


@implementation NSArray (NSArrayCreation)

+ (id)array
{
  return CFArrayCreateMutable();
}

+ (id)arrayWithObject:(id)anObject
{
  
}

+ (id)arrayWithObjects:(const id *)objects count:(NSUInteger)cnt
{
  
}

+ (id)arrayWithObjects:(id)firstObj, ...
{
	NSLog(@"Array with objects...");
}

+ (id)arrayWithArray:(NSArray *)array
{
  return CFArrayCreateCopy(array);
}

- (id)initWithObjects:(const id *)objects count:(NSUInteger)cnt
{
  
}

- (id)initWithObjects:(id)firstObj, ...
{
  
}

- (id)initWithArray:(NSArray *)array
{
  return CFArrayCreateCopy(array);
}

- (id)initWithArray:(NSArray *)array copyItems:(BOOL)flag
{
  
}


+ (id)arrayWithContentsOfFile:(NSString *)path
{
  
}

+ (id)arrayWithContentsOfURL:(NSURL *)url
{
  
}

- (id)initWithContentsOfFile:(NSString *)path
{
  
}

- (id)initWithContentsOfURL:(NSURL *)url
{
  
}

- (id)initWithCoder:(NSCoder *)aCoder
{
  NSArray *newObjects = [aCoder decodeObjectForKey:@"NS.objects"];
  
  id a;
  for(a in newObjects)
  {
    [self addObject:a];
  }
  
  return self;
}

@end


@implementation NSMutableArray

+ (id)alloc
{
  return CFArrayCreateMutable(1);
}

- (void)addObject:(id)anObject
{
  CFArrayAppendValue(self, anObject);
}

- (void)insertObject:(id)anObject atIndex:(NSUInteger)index
{
  
}

- (void)removeLastObject
{
  CFArrayRemoveValueAtIndex(self, [self count] - 1);
}

- (void)removeObjectAtIndex:(NSUInteger)index
{
  CFArrayRemoveValueAtIndex(self, index);
}

- (void)replaceObjectAtIndex:(NSUInteger)index withObject:(id)anObject
{
  
}

@end


@implementation NSMutableArray (NSExtendedMutableArray)
  
- (void)addObjectsFromArray:(NSArray *)otherArray
{
  
}

- (void)exchangeObjectAtIndex:(NSUInteger)idx1 withObjectAtIndex:(NSUInteger)idx2
{
  
}

- (void)removeAllObjects
{
  
}

- (void)removeObject:(id)anObject inRange:(NSRange)range
{
  
}

- (void)removeObject:(id)anObject
{
  
}

- (void)removeObjectIdenticalTo:(id)anObject inRange:(NSRange)range
{
  
}

- (void)removeObjectIdenticalTo:(id)anObject
{
  
}

- (void)removeObjectsFromIndices:(NSUInteger *)indices numIndices:(NSUInteger)cnt
{
  
}

- (void)removeObjectsInArray:(NSArray *)otherArray
{
  
}

- (void)removeObjectsInRange:(NSRange)range
{
  
}

- (void)replaceObjectsInRange:(NSRange)range withObjectsFromArray:(NSArray *)otherArray range:(NSRange)otherRange
{
  
}

- (void)replaceObjectsInRange:(NSRange)range withObjectsFromArray:(NSArray *)otherArray
{
  
}

- (void)setArray:(NSArray *)otherArray
{
  
}

- (void)sortUsingFunction:(NSInteger (*)(id, id, void *))compare context:(void *)context
{
  
}

- (void)sortUsingSelector:(SEL)comparator
{
  
}


- (void)insertObjects:(NSArray *)objects atIndexes:(NSIndexSet *)indexes
{
  
}

- (void)removeObjectsAtIndexes:(NSIndexSet *)indexes
{
  
}

- (void)replaceObjectsAtIndexes:(NSIndexSet *)indexes withObjects:(NSArray *)objects
{
  
}

@end


@implementation NSMutableArray (NSMutableArrayCreation)

+ (id)arrayWithCapacity:(NSUInteger)numItems
{
  return [[self alloc] initWithCapacity:numItems];
}

- (id)initWithCapacity:(NSUInteger)numItems
{
  return self;
}

@end

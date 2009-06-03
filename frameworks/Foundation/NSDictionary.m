// 
//  NSDictionary.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSDictionary.h"

@implementation NSDictionary

- (id)init
{
	return CFDictionaryCreateMutable();
}

- (NSUInteger)count
{
	
}

- (id)objectForKey:(id)aKey
{
	
}

- (NSEnumerator *)keyEnumerator
{
	
}

@end

@implementation NSDictionary (NSExtendedDictionary)

- (NSArray *)allKeys
{
	
}

- (NSArray *)allKeysForObject:(id)anObject
{
	
}

- (NSArray *)allValues
{
	
}

- (NSString *)description
{
	
}

- (NSString *)descriptionInStringsFileFormat
{
	
}

- (NSString *)descriptionWithLocale:(id)locale
{
	
}

- (NSString *)descriptionWithLocale:(id)locale indent:(NSUInteger)level
{
	
}

- (BOOL)isEqualToDictionary:(NSDictionary *)otherDictionary
{
	
}

- (NSEnumerator *)objectEnumerator
{
	
}

- (NSArray *)objectsForKeys:(NSArray *)keys notFoundMarker:(id)marker
{
	
}

- (BOOL)writeToFile:(NSString *)path atomically:(BOOL)useAuxiliaryFile
{
	
}

- (BOOL)writeToURL:(NSURL *)url atomically:(BOOL)atomically
{
	
}

- (NSArray *)keysSortedByValueUsingSelector:(SEL)comparator
{
	
}

- (void)getObjects:(id *)objects andKeys:(id *)keys
{
	
}

@end


@implementation NSDictionary (NSDictionaryCreation)

+ (id)dictionary
{
	
}

+ (id)dictionaryWithObject:(id)object forKey:(id)key
{
	
}

+ (id)dictionaryWithObjects:(id *)objects forKeys:(id *)keys count:(NSUInteger)cnt
{
	
}

+ (id)dictionaryWithObjectsAndKeys:(id)firstObject, ...
{
	
}

+ (id)dictionaryWithDictionary:(NSDictionary *)dict
{
	
}

+ (id)dictionaryWithObjects:(NSArray *)objects forKeys:(NSArray *)keys
{
	
}


- (id)initWithObjects:(id *)objects forKeys:(id *)keys count:(NSUInteger)cnt
{
	
}

- (id)initWithObjectsAndKeys:(id)firstObject, ...
{
	
}

- (id)initWithDictionary:(NSDictionary *)otherDictionary
{
	
}

- (id)initWithDictionary:(NSDictionary *)otherDictionary copyItems:(BOOL)flag
{
	
}

- (id)initWithObjects:(NSArray *)objects forKeys:(NSArray *)keys
{
	
}

+ (id)dictionaryWithContentsOfFile:(NSString *)path
{
	
}

+ (id)dictionaryWithContentsOfURL:(NSURL *)url
{
	
}

- (id)initWithContentsOfFile:(NSString *)path
{
	
}

- (id)initWithContentsOfURL:(NSURL *)url
{
	
}

@end


@implementation NSMutableDictionary

- (void)removeObjectForKey:(id)aKey
{
	
}

- (void)setObject:(id)anObject forKey:(id)aKey
{
	
}

@end


@implementation NSMutableDictionary (NSExtendedMutableDictionary)

- (void)addEntriesFromDictionary:(NSDictionary *)otherDictionary
{
	
}

- (void)removeAllObjects
{
	
}

- (void)removeObjectsForKeys:(NSArray *)keyArray
{
	
}

- (void)setDictionary:(NSDictionary *)otherDictionary
{
	
}

@end


@implementation NSMutableDictionary (NSMutableDictionaryCreation)

+ (id)dictionaryWithCapacity:(NSUInteger)numItems
{
	
}

- (id)initWithCapacity:(NSUInteger)numItems
{
	
}

@end

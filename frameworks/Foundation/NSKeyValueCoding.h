// 
//  NSKeyValueCoding.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSArray.h>
#import <Foundation/NSDictionary.h>
#import <Foundation/NSSet.h>

@class NSError, NSString;

extern NSString *NSUndefinedKeyException;
extern NSString *NSAverageKeyValueOperator;
extern NSString *NSCountKeyValueOperator;
extern NSString *NSDistinctUnionOfArraysKeyValueOperator;
extern NSString *NSDistinctUnionOfObjectsKeyValueOperator;
extern NSString *NSDistinctUnionOfSetsKeyValueOperator;
extern NSString *NSMaximumKeyValueOperator;
extern NSString *NSMinimumKeyValueOperator;
extern NSString *NSSumKeyValueOperator;
extern NSString *NSUnionOfArraysKeyValueOperator;
extern NSString *NSUnionOfObjectsKeyValueOperator;
extern NSString *NSUnionOfSetsKeyValueOperator;

@interface NSObject (NSKeyValueCoding)

+ (BOOL)accessInstanceVariablesDirectly;
- (id)valueForKey:(NSString *)key;
- (void)setValue:(id)value forKey:(NSString *)key;
- (BOOL)validateValue:(id *)ioValue forKey:(NSString *)inKey error:(NSError **)outError;
- (NSMutableArray *)mutableArrayValueForKey:(NSString *)key;
// - (NSMutableSet *)mutableSetValueForKey:(NSString *)key;
- (id)valueForKeyPath:(NSString *)keyPath;
- (void)setValue:(id)value forKeyPath:(NSString *)keyPath;
- (BOOL)validateValue:(id *)ioValue forKeyPath:(NSString *)inKeyPath error:(NSError **)outError;
- (NSMutableArray *)mutableArrayValueForKeyPath:(NSString *)keyPath;
// - (NSMutableSet *)mutableSetValueForKeyPath:(NSString *)keyPath;
- (id)valueForUndefinedKey:(NSString *)key;
- (void)setValue:(id)value forUndefinedKey:(NSString *)key;
- (void)setNilValueForKey:(NSString *)key;
- (NSDictionary *)dictionaryWithValuesForKeys:(NSArray *)keys;
- (void)setValuesForKeysWithDictionary:(NSDictionary *)keyedValues;

@end


@interface NSArray (NSKeyValueCoding)

- (id)valueForKey:(NSString *)key;
- (void)setValue:(id)value forKey:(NSString *)key;

@end


@interface NSDictionary (NSKeyValueCoding)

- (id)valueForKey:(NSString *)key;

@end


@interface NSMutableDictionary (NSKeyValueCoding)

- (void)setValue:(id)value forKey:(NSString *)key;

@end


// @implementation NSSet (NSKeyValueCoding)
// 
// - (id)valueForKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// - (void)setValue:(id)value forKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// @end


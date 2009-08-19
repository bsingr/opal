// 
//  NSKeyValueCoding.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSKeyValueCoding.h"

NSString *NSUndefinedKeyException = @"NSUndefinedKeyException";
NSString *NSAverageKeyValueOperator = @"NSAverageKeyValueOperator";
NSString *NSCountKeyValueOperator = @"NSCountKeyValueOperator";
NSString *NSDistinctUnionOfArraysKeyValueOperator = @"NSDistinctUnionOfArraysKeyValueOperator";
NSString *NSDistinctUnionOfObjectsKeyValueOperator = @"NSDistinctUnionOfObjectsKeyValueOperator";
NSString *NSDistinctUnionOfSetsKeyValueOperator = @"NSDistinctUnionOfSetsKeyValueOperator";
NSString *NSMaximumKeyValueOperator = @"NSMaximumKeyValueOperator";
NSString *NSMinimumKeyValueOperator = @"NSMinimumKeyValueOperator";
NSString *NSSumKeyValueOperator = @"NSSumKeyValueOperator";
NSString *NSUnionOfArraysKeyValueOperator = @"NSUnionOfArraysKeyValueOperator";
NSString *NSUnionOfObjectsKeyValueOperator = @"NSUnionOfObjectsKeyValueOperator";
NSString *NSUnionOfSetsKeyValueOperator = @"NSUnionOfSetsKeyValueOperator";

@implementation NSObject (NSKeyValueCoding)

+ (BOOL)accessInstanceVariablesDirectly
{
  return YES;
}

- (id)valueForKey:(NSString *)key
{
  // -get<Key>
  NSString *accessorName = [@"get" stringByAppendingString:[key capitalizedString]];
  if ([self respondsToSelector:NSSelectorFromString(accessorName)])
    return [self performSelector:NSSelectorFromString(accessorName)];
 
  // -<key>
  accessorName = key;
  if ([self respondsToSelector:NSSelectorFromString(accessorName)])
    return [self performSelector:NSSelectorFromString(accessorName)];
 
  // -is<Key>
  accessorName = [@"is" stringByAppendingString:[key capitalizedString]];
  if ([self respondsToSelector:NSSelectorFromString(accessorName)])
    return [self performSelector:NSSelectorFromString(accessorName)];

  if ([self.isa accessInstanceVariablesDirectly])
  {  
    id theIvar;
    // _<key>
    accessorName = [@"_" stringByAppendingString:key];
    if(theIvar = object_getInstanceVariable(self, accessorName))
      return theIvar;
    
    // _is<Key>
    accessorName = [@"_" stringByAppendingString:[@"is" stringByAppendingString:[key capitalizedString]]];
    if(theIvar = object_getInstanceVariable(self, accessorName))
      return theIvar;
    
    // <key>
    accessorName = key;
    if(theIvar = object_getInstanceVariable(self, accessorName))
      return theIvar;
    
    // is<Key>
    accessorName = [@"is" stringByAppendingString:[key capitalizedString]];
    if(theIvar = object_getInstanceVariable(self, accessorName))
      return theIvar;
  }

  // If not found..
  return [self valueForUndefinedKey:key];
}

- (void)setValue:(id)value forKey:(NSString *)key
{
  // TODO: Need to implement
}

- (BOOL)validateValue:(id *)ioValue forKey:(NSString *)inKey error:(NSError **)outError
{
  // TODO: Need to implement
}

- (NSMutableArray *)mutableArrayValueForKey:(NSString *)key
{
  // TODO: Need to implement
}

// - (NSMutableSet *)mutableSetValueForKey:(NSString *)key
// {
//   // TODO: Need to implement
// }

- (id)valueForKeyPath:(NSString *)keyPath
{
  // TODO: Need to implement
}

- (void)setValue:(id)value forKeyPath:(NSString *)keyPath
{
  // TODO: Need to implement
}

- (BOOL)validateValue:(id *)ioValue forKeyPath:(NSString *)inKeyPath error:(NSError **)outError
{
  // TODO: Need to implement
}

- (NSMutableArray *)mutableArrayValueForKeyPath:(NSString *)keyPath
{
  // TODO: Need to implement
}

// - (NSMutableSet *)mutableSetValueForKeyPath:(NSString *)keyPath
// {
//   // TODO: Need to implement
// }

- (id)valueForUndefinedKey:(NSString *)key
{
  [[NSException exceptionWithName:NSUndefinedKeyException reason:[@"Undefined key was requested from object: " stringByAppendingString:key] userInfo:nil] raise];
  return nil;
}

- (void)setValue:(id)value forUndefinedKey:(NSString *)key
{
  // TODO: Need to implement
}

- (void)setNilValueForKey:(NSString *)key
{
  // TODO: Need to implement
}

- (NSDictionary *)dictionaryWithValuesForKeys:(NSArray *)keys
{
  // TODO: Need to implement
}

- (void)setValuesForKeysWithDictionary:(NSDictionary *)keyedValues
{
  // TODO: Need to implement
}

@end


@implementation NSArray (NSKeyValueCoding)

- (id)valueForKey:(NSString *)key
{
  // TODO: Need to implement
}

- (void)setValue:(id)value forKey:(NSString *)key
{
  // TODO: Need to implement
}

@end


@implementation NSDictionary (NSKeyValueCoding)

- (id)valueForKey:(NSString *)key
{
  // TODO: Need to implement
}

@end


@implementation NSMutableDictionary (NSKeyValueCoding)

- (void)setValue:(id)value forKey:(NSString *)key
{
  // TODO: Need to implement
}

@end
// 
// 
// @implementation NSSet (NSKeyValueCoding)
// 
// - (id)valueForKey:(NSString *)key
// {
//   // TODO: Need to implement
// }
// 
// - (void)setValue:(id)value forKey:(NSString *)key
// {
//   // TODO: Need to implement
// }
// 
// @end
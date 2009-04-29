#import <Foundation/NSArray.m>
#import <Foundation/NSDictionary.m>
#import <Foundation/NSSet.m>

@class NSError, NSString;

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
    // see if accessor method defined: -get<Key>, -<key>, or -is<Key>
	NSString *accessorName = @"get" + aKey.charAt(0).toUpperCase() + aKey.substr(1);
	if ([self respondsToSelector:NSSelectorFromString(accessorName)])
        return [self performSelector:NSSelectorFromString(accessorName)];
	
	
	accessorName = key;
	if ([self respondsToSelector:NSSelectorFromString(accessorName)])
        return [self performSelector:NSSelectorFromString(accessorName)];
	
	accessorName = "is" + aKey.charAt(0).toUpperCase() + aKey.substr(1);
	if ([self respondsToSelector:NSSelectorFromString(accessorName)])
        return [self performSelector:NSSelectorFromString(accessorName)];
	
	if ([self accessInstanceVariablesDirectly]) {
	    
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

- (NSMutableSet *)mutableSetValueForKey:(NSString *)key
{
    // TODO: Need to implement
}

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

- (NSMutableSet *)mutableSetValueForKeyPath:(NSString *)keyPath
{
    // TODO: Need to implement
}

- (id)valueForUndefinedKey:(NSString *)key
{
    // TODO: Need to implement
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


@implementation NSSet (NSKeyValueCoding)

- (id)valueForKey:(NSString *)key
{
    // TODO: Need to implement
}

- (void)setValue:(id)value forKey:(NSString *)key
{
    // TODO: Need to implement
}

@end
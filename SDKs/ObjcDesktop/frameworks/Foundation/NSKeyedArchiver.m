// 
//  NSKeyedArchiver.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSKeyedArchiver.h"

NSString *NSInvalidArchiveOperationException = @"NSInvalidArchiveOperationException";
NSString *NSInvalidUnarchiveOperationException = @"NSInvalidUnarchiveOperationException";

@implementation NSKeyedArchiver

+ (NSData *)archivedDataWithRootObject:(id)rootObject
{
  
}

+ (BOOL)archiveRootObject:(id)rootObject toFile:(NSString *)path
{
  
}

- (id)initForWritingWithMutableData:(NSMutableData *)data
{
  
}

- (void)setDelegate:(id)delegate
{
  
}

- (id)delegate
{
  
}

- (void)setOutputFormat:(NSPropertyListFormat)format
{
  
}

- (NSPropertyListFormat)outputFormat
{
  
}

- (void)finishEncoding
{
  
}

+ (void)setClassName:(NSString *)codedName forClass:(Class)cls
{
  
}

- (void)setClassName:(NSString *)codedName forClass:(Class)cls
{
  
}

+ (NSString *)classNameForClass:(Class)cls
{
  
}

- (NSString *)classNameForClass:(Class)cls
{
  
}

- (void)encodeObject:(id)objv forKey:(NSString *)key
{
  
}

- (void)encodeConditionalObject:(id)objv forKey:(NSString *)key
{
  
}

- (void)encodeBool:(BOOL)boolv forKey:(NSString *)key
{
  
}

- (void)encodeInt:(int)intv forKey:(NSString *)key
{
  
}

- (void)encodeInt32:(int)intv forKey:(NSString *)key
{
  
}

- (void)encodeInt64:(int)intv forKey:(NSString *)key
{
  
}

- (void)encodeFloat:(float)realv forKey:(NSString *)key
{
  
}

- (void)encodeDouble:(double)realv forKey:(NSString *)key
{
  
}

- (void)encodeBytes:(const int *)bytesp length:(NSUInteger)lenv forKey:(NSString *)key
{
  
}

@end


@implementation NSKeyedUnarchiver

+ (id)unarchiveObjectWithData:(NSData *)data
{
  return [[self alloc] initForReadingWithData:data];
}

+ (id)unarchiveObjectWithFile:(NSString *)path
{
  
}

- (id)initForReadingWithData:(NSData *)data
{
  self = [self init];
  if (self) {
    _data = data;
    _rootDict = CFPropertyListCreateFromJSONData([_data bytes], 0, @"");
    _contextStack = [NSMutableArray array];
    [_contextStack addObject:_rootDict];
    _unarchivedObjects = [NSMutableDictionary dictionary];
  }
  return self;
}

- (void)setDelegate:(id)delegate
{
  
}

- (id)delegate
{
  
}

- (void)finishDecoding
{
  
}

+ (void)setClass:(Class)cls forClassName:(NSString *)codedName
{
  
}

- (void)setClass:(Class)cls forClassName:(NSString *)codedName
{
  
}

+ (Class)classForClassName:(NSString *)codedName
{
  
}

- (Class)classForClassName:(NSString *)codedName
{
  
}

- (BOOL)containsValueForKey:(NSString *)key
{
  id *theContext = [_contextStack lastObject];

  if(CFDictionaryContainsKey(theContext, key))
    return YES;
    
  return NO;
}

- (id)decodeObjectForKey:(NSString *)key
{
  id *theContext = [_contextStack lastObject];
  
  if(theContext.isa == NSClassFromString(@"NSMutableArray"))
  {
    NSMutableArray *array = [NSMutableArray array];
    
    id a;
    for(a in theContext)
    {
      [_contextStack addObject:a];
      [array addObject:[self _decodeObject:a]];
      [_contextStack removeLastObject];
    }
    return array;
  }
  
  // should look in cache
  // if(CFDictionaryContainsKey(theContext, @"id"))
  //     return nil;

  id theObject = [theContext objectForKey:key];

  return [self _decodeObject:theObject];
   
}

- (id)_decodeObject:(id)theObject
{
  // if no context...
  if(!theObject)
    return nil;
  
  // If decodign a stirng, then just return it...
  if(CFDictionaryContainsKey(theObject, @"string"))
    return [theObject objectForKey:@"string"];
  
  // Check for nil key... return nil object
  if(CFDictionaryContainsKey(theObject, @"nil"))
    return nil;
    
  
  Class theClass = NSClassFromString([theObject objectForKey:@"class"]);

  if(!theClass)
  {
    if(CFDictionaryContainsKey(_unarchivedObjects, [theObject objectForKey:@"id"]))
      return [_unarchivedObjects objectForKey:[theObject objectForKey:@"id"]];
    else
      return nil;
  }

  id newObject = [theClass alloc];
  [_unarchivedObjects setObject:newObject forKey:[theObject objectForKey:@"id"]];
  
  if([theObject objectForKey:@"class"] == @"NSCustomObject")
  {
    [newObject init];
  }
  else
  {
    [_contextStack addObject:[theObject objectForKey:@"objects"]];
    [newObject initWithCoder:self];
    [_contextStack removeLastObject];
  }
  
  newObject = [newObject awakeAfterUsingCoder:self];
  
  [_unarchivedObjects setObject:newObject forKey:[theObject objectForKey:@"id"]];
  return newObject;
}

- (BOOL)decodeBoolForKey:(NSString *)key
{
  id theContext = [_contextStack lastObject];
  id theObject = [theContext objectForKey:key];
  
  if(!theObject)
    return NO;
  
  return ([theObject objectForKey:@"bool"] == "YES") ? YES : NO;
}

- (int)decodeIntForKey:(NSString *)key
{
  id theContext = [_contextStack lastObject];
  id theObject = [theContext objectForKey:key];
  return parseInt([theObject objectForKey:@"int"]);
}

- (int)decodeInt32ForKey:(NSString *)key
{
  
}

- (int)decodeInt64ForKey:(NSString *)key
{
  
}

- (float)decodeFloatForKey:(NSString *)key
{
  id theContext = [_contextStack lastObject];
  id theObject = [theContext objectForKey:key];
  return parseFloat([theObject objectForKey:@"float"]);  
}

- (double)decodeDoubleForKey:(NSString *)key
{
  id theContext = [_contextStack lastObject];
  id theObject = [theContext objectForKey:key];
  return parseFloat([theObject objectForKey:@"double"]);  
}

- (const int *)decodeBytesForKey:(NSString *)key returnedLength:(NSUInteger *)lengthp
{
  
}

@end


@implementation NSCoder (NSGeometryKeyedCoding)

- (void)encodePoint:(NSPoint)point forKey:(NSString *)key
{
  
}

- (void)encodeSize:(NSSize)size forKey:(NSString *)key
{
  
}

- (void)encodeRect:(NSRect)rect forKey:(NSString *)key
{
  
}

- (NSPoint)decodePointForKey:(NSString *)key
{
  NSString *thePoint = [self decodeObjectForKey:key];
  return NSPointFromString(thePoint);
}

- (NSSize)decodeSizeForKey:(NSString *)key
{
  NSString *theSize = [self decodeObjectForKey:key];
  return NSSizeFromString(theSize);
}

- (NSRect)decodeRectForKey:(NSString *)key
{
  NSString *theRect = [self decodeObjectForKey:key];
  return NSRectFromString(theRect);
}

@end

@implementation NSObject (AwakeAfterUsingCoder)

- (id)awakeAfterUsingCoder:(NSCoder *)aCoder
{
  return self;
}

@end

// 
//  NSCoder.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>

@class NSString;
@class NSData;

@interface NSCoder : NSObject

- (void)encodeValueOfObjCType:(const char *)type at:(const void *)addr;
- (void)encodeDataObject:(NSData *)data;
- (void)decodeValueOfObjCType:(const char *)type at:(void *)data;
- (NSData *)decodeDataObject;
- (NSInteger)versionForClassName:(NSString *)className;

@end


@interface NSCoder (NSExtendedCoder)
  
- (void)encodeObject:(id)object;
- (void)encodePropertyList:(id)aPropertyList;
- (void)encodeRootObject:(id)rootObject;
- (void)encodeBycopyObject:(id)anObject;
- (void)encodeByrefObject:(id)anObject;
- (void)encodeConditionalObject:(id)object;
- (void)encodeValuesOfObjCTypes:(const char *)types, ...;
- (void)encodeArrayOfObjCType:(const char *)type count:(NSUInteger)count at:(const void *)array;
- (void)encodeBytes:(const void *)byteaddr length:(NSUInteger)length;

- (id)decodeObject;
- (id)decodePropertyList;
- (void)decodeValuesOfObjCTypes:(const char *)types, ...;
- (void)decodeArrayOfObjCType:(const char *)itemType count:(NSUInteger)count at:(void *)array;
- (void *)decodeBytesWithReturnedLength:(NSUInteger *)lengthp;

- (unsigned int)systemVersion;

- (BOOL)allowsKeyedCoding;

- (void)encodeObject:(id)objv forKey:(NSString *)key;
- (void)encodeConditionalObject:(id)objv forKey:(NSString *)key;
- (void)encodeBool:(BOOL)boolv forKey:(NSString *)key;
- (void)encodeInt:(int)intv forKey:(NSString *)key;
- (void)encodeFloat:(float)realv forKey:(NSString *)key;
- (void)encodeDouble:(double)realv forKey:(NSString *)key;
- (void)encodeBytes:(const void *)bytesp length:(NSUInteger)lenv forKey:(NSString *)key;

- (BOOL)containsValueForKey:(NSString *)key;
- (id)decodeObjectForKey:(NSString *)key;
- (BOOL)decodeBoolForKey:(NSString *)key;
- (int)decodeIntForKey:(NSString *)key;
- (float)decodeFloatForKey:(NSString *)key;
- (double)decodeDoubleForKey:(NSString *)key;
- (const void *)decodeBytesForKey:(NSString *)key returnedLength:(NSUInteger *)lengthp;

- (void)encodeInteger:(NSInteger)intv forKey:(NSString *)key;
- (NSInteger)decodeIntegerForKey:(NSString *)key;

@end

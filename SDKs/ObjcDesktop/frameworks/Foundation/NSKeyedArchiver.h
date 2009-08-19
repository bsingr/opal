// 
//  NSKeyedArchiver.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSArray.h>
#import <Foundation/NSDictionary.h>
#import <Foundation/NSCoder.h>
#import <Foundation/NSGeometry.h>
#import <Foundation/NSPropertyList.h>

@class NSArray, NSMutableData, NSData;

extern NSString *NSInvalidArchiveOperationException;
extern NSString *NSInvalidUnarchiveOperationException;

@interface NSKeyedArchiver : NSCoder
{
}

+ (NSData *)archivedDataWithRootObject:(id)rootObject;
+ (BOOL)archiveRootObject:(id)rootObject toFile:(NSString *)path;

- (id)initForWritingWithMutableData:(NSMutableData *)data;

- (void)setDelegate:(id)delegate;
- (id)delegate;

- (void)setOutputFormat:(NSPropertyListFormat)format;
- (NSPropertyListFormat)outputFormat;

- (void)finishEncoding;

+ (void)setClassName:(NSString *)codedName forClass:(Class)cls;
- (void)setClassName:(NSString *)codedName forClass:(Class)cls;

+ (NSString *)classNameForClass:(Class)cls;
- (NSString *)classNameForClass:(Class)cls;

- (void)encodeObject:(id)objv forKey:(NSString *)key;
- (void)encodeConditionalObject:(id)objv forKey:(NSString *)key;
- (void)encodeBool:(BOOL)boolv forKey:(NSString *)key;
- (void)encodeInt:(int)intv forKey:(NSString *)key;
- (void)encodeInt32:(int)intv forKey:(NSString *)key;
- (void)encodeInt64:(int)intv forKey:(NSString *)key;
- (void)encodeFloat:(float)realv forKey:(NSString *)key;
- (void)encodeDouble:(double)realv forKey:(NSString *)key;
- (void)encodeBytes:(const int *)bytesp length:(NSUInteger)lenv forKey:(NSString *)key;

@end


@interface NSKeyedUnarchiver : NSCoder
{
  id           _delegate;
  id           _data;
  NSMutableDictionary *_rootDict;
  NSMutableArray    *_contextStack;
  NSMutableDictionary *_unarchivedObjects;
}

+ (id)unarchiveObjectWithData:(NSData *)data;
+ (id)unarchiveObjectWithFile:(NSString *)path;

- (id)initForReadingWithData:(NSData *)data;

- (void)setDelegate:(id)delegate;
- (id)delegate;

- (void)finishDecoding;

+ (void)setClass:(Class)cls forClassName:(NSString *)codedName;
- (void)setClass:(Class)cls forClassName:(NSString *)codedName;

+ (Class)classForClassName:(NSString *)codedName;
- (Class)classForClassName:(NSString *)codedName;

- (BOOL)containsValueForKey:(NSString *)key;

- (id)decodeObjectForKey:(NSString *)key;
- (BOOL)decodeBoolForKey:(NSString *)key;
- (int)decodeIntForKey:(NSString *)key;
- (int)decodeInt32ForKey:(NSString *)key;
- (int)decodeInt64ForKey:(NSString *)key;
- (float)decodeFloatForKey:(NSString *)key;
- (double)decodeDoubleForKey:(NSString *)key;
- (const int *)decodeBytesForKey:(NSString *)key returnedLength:(NSUInteger *)lengthp;

@end

@interface NSCoder (NSGeometryKeyedCoding)

- (void)encodePoint:(NSPoint)point forKey:(NSString *)key;
- (void)encodeSize:(NSSize)size forKey:(NSString *)key;
- (void)encodeRect:(NSRect)rect forKey:(NSString *)key;

- (NSPoint)decodePointForKey:(NSString *)key;
- (NSSize)decodeSizeForKey:(NSString *)key;
- (NSRect)decodeRectForKey:(NSString *)key;

@end

@interface NSObject (NSKeyedArchiverDelegate)

- (id)archiver:(NSKeyedArchiver *)archiver willEncodeObject:(id)object;
- (void)archiver:(NSKeyedArchiver *)archiver didEncodeObject:(id)object;
- (void)archiver:(NSKeyedArchiver *)archiver willReplaceObject:(id)object withObject:(id)newObject;
- (void)archiverWillFinish:(NSKeyedArchiver *)archiver;
- (void)archiverDidFinish:(NSKeyedArchiver *)archiver;

@end


@interface NSObject (NSKeyedUnarchiverDelegate)

- (Class)unarchiver:(NSKeyedUnarchiver *)unarchiver cannotDecodeObjectOfClassName:(NSString *)name originalClasses:(NSArray *)classNames;
- (id)unarchiver:(NSKeyedUnarchiver *)unarchiver didDecodeObject:(id)object;
- (void)unarchiver:(NSKeyedUnarchiver *)unarchiver willReplaceObject:(id)object withObject:(id)newObject;
- (void)unarchiverWillFinish:(NSKeyedUnarchiver *)unarchiver;
- (void)unarchiverDidFinish:(NSKeyedUnarchiver *)unarchiver;

@end


@interface NSObject (NSKeyedArchiverObjectSubstitution)

- (Class)classForKeyedArchiver;
- (id)replacementObjectForKeyedArchiver:(NSKeyedArchiver *)archiver;
+ (NSArray *)classFallbacksForKeyedArchiver;

@end


@interface NSObject (NSKeyedUnarchiverObjectSubstitution)

+ (Class)classForKeyedUnarchiver;

@end

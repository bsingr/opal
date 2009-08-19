// 
//  NSString.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSString.h"

@implementation NSString

- (NSUInteger)length
{
  
}

- (char *)characterAtIndex:(NSUInteger)index
{
  
}

@end


@implementation NSString (NSStringExtensionMethods)

- (void)getCharacters:(char *)buffer
{
  
}

- (void)getCharacters:(char *)buffer range:(NSRange)aRange
{
  
}

- (NSString *)substringFromIndex:(NSUInteger)from
{
  
}

- (NSString *)substringToIndex:(NSUInteger)to
{
  
}

- (NSString *)substringWithRange:(NSRange)range
{
  
}

- (NSComparisonResult)compare:(NSString *)string
{
  
}

- (NSComparisonResult)compare:(NSString *)string options:(NSStringCompareOptions)mask
{
  
}

- (NSComparisonResult)compare:(NSString *)string options:(NSStringCompareOptions)mask range:(NSRange)compareRange
{
  
}

- (NSComparisonResult)compare:(NSString *)string options:(NSStringCompareOptions)mask range:(NSRange)compareRange locale:(id)locale
{
  
}

- (NSComparisonResult)caseInsensitiveCompare:(NSString *)string
{
  
}

- (NSComparisonResult)localizedCompare:(NSString *)string
{
  
}

- (NSComparisonResult)localizedCaseInsensitiveCompare:(NSString *)string
{
  
}

- (BOOL)isEqualToString:(NSString *)aString
{
  
}

- (BOOL)hasPrefix:(NSString *)aString
{
  
}

- (BOOL)hasSuffix:(NSString *)aString
{
  
}

- (NSRange)rangeOfString:(NSString *)aString
{
  
}

- (NSRange)rangeOfString:(NSString *)aString options:(NSStringCompareOptions)mask
{
  
}

- (NSRange)rangeOfString:(NSString *)aString options:(NSStringCompareOptions)mask range:(NSRange)searchRange
{
  
}

- (NSRange)rangeOfString:(NSString *)aString options:(NSStringCompareOptions)mask range:(NSRange)searchRange locale:(NSLocale *)locale
{
  
}

- (NSRange)rangeOfCharacterFromSet:(NSCharacterSet *)aSet
{
  
}

- (NSRange)rangeOfCharacterFromSet:(NSCharacterSet *)aSet options:(NSStringCompareOptions)mask
{
  
}

- (NSRange)rangeOfCharacterFromSet:(NSCharacterSet *)aSet options:(NSStringCompareOptions)mask range:(NSRange)searchRange
{
  
}

- (NSRange)rangeOfComposedCharacterSequenceAtIndex:(NSUInteger)index
{
  
}

- (NSRange)rangeOfComposedCharacterSequencesForRange:(NSRange)range
{
  
}

- (NSString *)stringByAppendingString:(NSString *)aString
{
  return CFStringByAppendingStrings(self, aString);
}

- (NSString *)stringByAppendingFormat:(NSString *)format, ...
{
  
}


- (double)doubleValue
{
  
}

- (float)floatValue
{
  
}

- (int)intValue
{
  
}

- (NSInteger)integerValue
{
  
}

- (long long)longLongValue
{
  
}

- (BOOL)boolValue
{
  
}

- (NSArray *)componentsSeparatedByString:(NSString *)separator
{
  
}

- (NSArray *)componentsSeparatedByCharactersInSet:(NSCharacterSet *)separator
{
  
}

- (NSString *)commonPrefixWithString:(NSString *)aString options:(NSStringCompareOptions)mask
{
  
}

- (NSString *)uppercaseString
{
  
}

- (NSString *)lowercaseString
{
  
}

- (NSString *)capitalizedString
{
  return CFStringCapitalize(self, nil);
}

- (NSString *)stringByTrimmingCharactersInSet:(NSCharacterSet *)set
{
  
}

- (NSString *)stringByPaddingToLength:(NSUInteger)newLength withString:(NSString *)padString startingAtIndex:(NSUInteger)padIndex
{
  
}

- (void)getLineStart:(NSUInteger *)startPtr end:(NSUInteger *)lineEndPtr contentsEnd:(NSUInteger *)contentsEndPtr forRange:(NSRange)range
{
  
}

- (NSRange)lineRangeForRange:(NSRange)range
{
  
}

- (void)getParagraphStart:(NSUInteger *)startPtr end:(NSUInteger *)parEndPtr contentsEnd:(NSUInteger *)contentsEndPtr forRange:(NSRange)range
{
  
}

- (NSRange)paragraphRangeForRange:(NSRange)range
{
  
}

- (NSString *)description
{
  
}

- (NSUInteger)hash
{
  
}


- (NSStringEncoding)fastestEncoding
{
  
}

- (NSStringEncoding)smallestEncoding
{
  
}


- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)lossy
{
  
}

- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding
{
  
}


- (BOOL)canBeConvertedToEncoding:(NSStringEncoding)encoding
{
  
}


- (const char *)cStringUsingEncoding:(NSStringEncoding)encoding
{
  
}

- (BOOL)getCString:(char *)buffer maxLength:(NSUInteger)maxBufferCount encoding:(NSStringEncoding)encoding
{
  
}


- (BOOL)getBytes:(void *)buffer maxLength:(NSUInteger)maxBufferCount usedLength:(NSUInteger *)usedBufferCount encoding:(NSStringEncoding)encoding options:(NSStringEncodingConversionOptions)options range:(NSRange)range remainingRange:(NSRangePointer)leftover
{
  
}


- (NSUInteger)maximumLengthOfBytesUsingEncoding:(NSStringEncoding)enc
{
  
}

- (NSUInteger)lengthOfBytesUsingEncoding:(NSStringEncoding)enc
{
  
}


- (NSString *)decomposedStringWithCanonicalMapping
{
  
}

- (NSString *)precomposedStringWithCanonicalMapping
{
  
}

- (NSString *)decomposedStringWithCompatibilityMapping
{
  
}

- (NSString *)precomposedStringWithCompatibilityMapping
{
  
}


- (NSString *)stringByFoldingWithOptions:(NSStringCompareOptions)options locale:(NSLocale *)locale
{
  
}


- (NSString *)stringByReplacingOccurrencesOfString:(NSString *)target withString:(NSString *)replacement options:(NSStringCompareOptions)options range:(NSRange)searchRange
{
  
}


- (NSString *)stringByReplacingOccurrencesOfString:(NSString *)target withString:(NSString *)replacement
{
  
}


- (NSString *)stringByReplacingCharactersInRange:(NSRange)range withString:(NSString *)replacement
{
  
}


- (const char *)UTF8String
{
  
}


+ (NSStringEncoding)defaultCStringEncoding
{
  
}


+ (const NSStringEncoding *)availableStringEncodings
{
  
}

+ (NSString *)localizedNameOfStringEncoding:(NSStringEncoding)encoding
{
  
}


- (id)init
{
  
}

- (id)initWithCharactersNoCopy:(char *)characters length:(NSUInteger)length freeWhenDone:(BOOL)freeBuffer
{
  
}

- (id)initWithCharacters:(const char *)characters length:(NSUInteger)length
{
  
}

- (id)initWithUTF8String:(const char *)nullTerminatedCString
{
  
}

- (id)initWithString:(NSString *)aString
{
  
}

- (id)initWithFormat:(NSString *)format, ...
{
  
}

- (id)initWithFormat:(NSString *)format arguments:(va_list)argList
{
  
}

- (id)initWithFormat:(NSString *)format locale:(id)locale, ...
{
  
}

- (id)initWithFormat:(NSString *)format locale:(id)locale arguments:(va_list)argList
{
  
}

- (id)initWithData:(NSData *)data encoding:(NSStringEncoding)encoding
{
  
}

- (id)initWithBytes:(const void *)bytes length:(NSUInteger)len encoding:(NSStringEncoding)encoding
{
  
}


- (id)initWithBytesNoCopy:(void *)bytes length:(NSUInteger)len encoding:(NSStringEncoding)encoding freeWhenDone:(BOOL)freeBuffer
{
  
}


+ (id)string
{
  
}

+ (id)stringWithString:(NSString *)string
{
  
}

+ (id)stringWithCharacters:(const char *)characters length:(NSUInteger)length
{
  
}

+ (id)stringWithUTF8String:(const char *)nullTerminatedCString
{
  
}

+ (id)stringWithFormat:(NSString *)format, ...
{
  
}

+ (id)localizedStringWithFormat:(NSString *)format, ...
{
  
}


- (id)initWithCString:(const char *)nullTerminatedCString encoding:(NSStringEncoding)encoding
{
  
}

+ (id)stringWithCString:(const char *)cString encoding:(NSStringEncoding)enc
{
  
}


- (id)initWithContentsOfURL:(NSURL *)url encoding:(NSStringEncoding)enc error:(NSError **)error
{
  
}

- (id)initWithContentsOfFile:(NSString *)path encoding:(NSStringEncoding)enc error:(NSError **)error
{
  
}

+ (id)stringWithContentsOfURL:(NSURL *)url encoding:(NSStringEncoding)enc error:(NSError **)error
{
  
}

+ (id)stringWithContentsOfFile:(NSString *)path encoding:(NSStringEncoding)enc error:(NSError **)error
{
  
}

- (id)initWithContentsOfURL:(NSURL *)url usedEncoding:(NSStringEncoding *)enc error:(NSError **)error
{
  
}

- (id)initWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error
{
  
}

+ (id)stringWithContentsOfURL:(NSURL *)url usedEncoding:(NSStringEncoding *)enc error:(NSError **)error
{
  
}

+ (id)stringWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error
{
  
}


- (BOOL)writeToURL:(NSURL *)url atomically:(BOOL)useAuxiliaryFile encoding:(NSStringEncoding)enc error:(NSError **)error
{
  
}

- (BOOL)writeToFile:(NSString *)path atomically:(BOOL)useAuxiliaryFile encoding:(NSStringEncoding)enc error:(NSError **)error
{
  
}

@end


@implementation NSMutableString

- (void)replaceCharactersInRange:(NSRange)range withString:(NSString *)aString
{
  
}

@end


@implementation NSMutableString (NSMutableStringExtensionMethods)

- (void)insertString:(NSString *)aString atIndex:(NSUInteger)loc
{
  
}

- (void)deleteCharactersInRange:(NSRange)range
{
  
}

- (void)appendString:(NSString *)aString
{
  
}

- (void)appendFormat:(NSString *)format, ...
{
  
}

- (void)setString:(NSString *)aString
{
  
}


- (id)initWithCapacity:(NSUInteger)capacity
{
  
}

+ (id)stringWithCapacity:(NSUInteger)capacity
{
  
}


- (NSUInteger)replaceOccurrencesOfString:(NSString *)target withString:(NSString *)replacement options:(NSStringCompareOptions)options range:(NSRange)searchRange
{
  
}


@end


@implementation NSString (NSExtendedStringPropertyListParsing)
  
- (id)propertyList
{
  
}

- (NSDictionary *)propertyListFromStringsFileFormat
{
  
}

@end

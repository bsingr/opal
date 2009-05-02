// 
//  NSArchiver.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

NSString *NSInconsistentArchiveException = @"NSInconsistentArchiveException";

@implementation NSArchiver

- (id)initForWritingWithMutableData:(NSMutableData *)mdata
{
    
}
    
- (NSMutableData *)archiverData
{
    
}

- (void)encodeRootObject:(id)rootObject
{
    
}

- (void)encodeConditionalObject:(id)object
{
    
}

+ (NSData *)archivedDataWithRootObject:(id)rootObject
{
    
}

+ (BOOL)archiveRootObject:(id)rootObject toFile:(NSString *)path
{
    
}

- (void)encodeClassName:(NSString *)trueName intoClassName:(NSString *)inArchiveName
{
    
}

- (NSString *)classNameEncodedForTrueClassName:(NSString *)trueName
{
    
}

- (void)replaceObject:(id)object withObject:(id)newObject
{
    
}

@end


@implementation NSUnarchiver

- (id)initForReadingWithData:(NSData *)data
{
    
}

- (BOOL)isAtEnd
{
    
}

+ (id)unarchiveObjectWithData:(NSData *)data
{
    
}

+ (id)unarchiveObjectWithFile:(NSString *)path
{
    
}

+ (void)decodeClassName:(NSString *)inArchiveName asClassName:(NSString *)trueName
{
    
}

- (void)decodeClassName:(NSString *)inArchiveName asClassName:(NSString *)trueName
{
    
}

+ (NSString *)classNameDecodedForArchiveClassName:(NSString *)inArchiveName
{
    
}

- (NSString *)classNameDecodedForArchiveClassName:(NSString *)inArchiveName
{
    
}

- (void)replaceObject:(id)object withObject:(id)newObject
{
    
}

@end

#import <Foundation/NSCoder.h>

@class NSString, NSData, NSMutableData, NSMutableDictionary, NSMutableArray;

@interface NSArchiver : NSCoder
{
    
}

- (id)initForWritingWithMutableData:(NSMutableData *)mdata;
    
- (NSMutableData *)archiverData;

- (void)encodeRootObject:(id)rootObject;
- (void)encodeConditionalObject:(id)object;

+ (NSData *)archivedDataWithRootObject:(id)rootObject;
+ (BOOL)archiveRootObject:(id)rootObject toFile:(NSString *)path;

- (void)encodeClassName:(NSString *)trueName intoClassName:(NSString *)inArchiveName;
- (NSString *)classNameEncodedForTrueClassName:(NSString *)trueName;

- (void)replaceObject:(id)object withObject:(id)newObject;

@end


@interface NSUnarchiver : NSCoder
{

}

- (id)initForReadingWithData:(NSData *)data;

- (void)setObjectZone:(NSZone *)zone;
- (NSZone *)objectZone;

- (BOOL)isAtEnd;
- (unsigned)systemVersion;

+ (id)unarchiveObjectWithData:(NSData *)data;
+ (id)unarchiveObjectWithFile:(NSString *)path;

+ (void)decodeClassName:(NSString *)inArchiveName asClassName:(NSString *)trueName;
- (void)decodeClassName:(NSString *)inArchiveName asClassName:(NSString *)trueName;

+ (NSString *)classNameDecodedForArchiveClassName:(NSString *)inArchiveName;
- (NSString *)classNameDecodedForArchiveClassName:(NSString *)inArchiveName;

- (void)replaceObject:(id)object withObject:(id)newObject;

@end

extern NSString *NSInconsistentArchiveException;

@interface NSObject (NSArchiverCallback)

- (Class)classForArchiver;
- (id)replacementObjectForArchiver:(NSArchiver *)archiver;

@end
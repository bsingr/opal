#import <Foundation/NSBundle.h>

@class NSString, NSDictionary;

@interface NSBundle (NSNibLoading)

+ (BOOL)loadNibFile:(NSString *)fileName externalNameTable:(NSDictionary *)context withZone:(NSZone *)zone;
+ (BOOL)loadNibNamed:(NSString *)nibName owner:(id)owner;
- (BOOL)loadNibFile:(NSString *)fileName externalNameTable:(NSDictionary *)context withZone:(NSZone *)zone;

@end

@interface NSObject (NSNibAwaking)

- (void)awakeFromNib;

@end
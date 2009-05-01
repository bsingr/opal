#import <Foundation/Foundation.h>

@class NSArray, NSBundle, NSData, NSDictionary, NSURL;

@interface NSNib : NSObject <NSCoding>
{
}

- (id)initWithContentsOfURL:(NSURL *)nibFileURL;
- (id)initWithNibNamed:(NSString *)nibName bundle:(NSBundle *)bundle;
- (BOOL)instantiateNibWithExternalNameTable:(NSDictionary *)externalNameTable;
- (BOOL)instantiateNibWithOwner:(id)owner topLevelObjects:(NSArray **)topLevelObjects;

@end

extern NSString *NSNibOwner;
extern NSString *NSNibTopLevelObjects;

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>
#import <AppKit/NSGraphics.h>

@class NSArray;

@interface NSScreen : NSObject
{
}

+ (NSScreen *)mainScreen;

- (NSRect)frame;
- (NSRect)visibleFrame;

@end

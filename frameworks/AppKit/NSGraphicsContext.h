#import <AppKit/NSGraphics.h>
#import <Foundation/NSGeometry.h>
#import <Foundation/NSObject.h>

@class NSDictionary, NSString, NSWindow, NSBitmapImageRep;

@interface NSGraphicsContext : NSObject
{
}

+ (NSGraphicsContext *)graphicsContextWithAttributes:(NSDictionary *)attributes;

+ (NSGraphicsContext *)graphicsContextWithWindow:(NSWindow *)window;

+ (NSGraphicsContext *)graphicsContextWithBitmapImageRep:(NSBitmapImageRep *)bitmapRep;

+ (NSGraphicsContext *)graphicsContextWithGraphicsPort:(void *)graphicsPort flipped:(BOOL)initialFlippedState;

+ (NSGraphicsContext *)currentContext;
+ (void)setCurrentContext:(NSGraphicsContext *)context;

+ (BOOL)currentContextDrawingToScreen;

+ (void)saveGraphicsState;

+ (void)restoreGraphicsState;

+ (void)setGraphicsState:(NSInteger)gState;

- (NSDictionary *)attributes;

- (BOOL)isDrawingToScreen;

- (void)saveGraphicsState;
- (void)restoreGraphicsState;

- (void)flushGraphics;

- (id)focusStack;
- (void)setFocusStack:(id)stack;

- (void *)graphicsPort;

- (BOOL)isFlipped;

@end
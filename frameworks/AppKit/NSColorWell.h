#import <AppKit/NSControl.h>

@interface NSColorWell : NSObject
{
}

- (void)deactivate;
- (void)activate:(BOOL)exclusive;
- (BOOL)isActive;

- (void)drawWellInside:(NSRect)insideRect;

- (BOOL)isBordered;
- (void)setBordered:(BOOL)flag;

- (void)takeColorFrom:(id)sender;
- (void)setColor:(NSColor *)color;
- (NSColor *)color;

@end
#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>

@class NSColor;


@interface NSShadow : NSObject <NSCopying, NSCoding>
{
}

- (id)init;

- (NSSize)shadowOffset;
- (void)setShadowOffset:(NSSize)offset;

- (CGFloat)shadowBlurRadius;
- (void)setShadowBlurRadius:(CGFloat)val;

- (NSColor *)shadowColor;
- (void)setShadowColor:(NSColor *)color;

- (void)set;

@end

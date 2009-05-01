typedef struct CGColor *CGColorRef;

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGColorSpace.h>
#import <CoreGraphics/CGPattern.h>

extern CGColorRef CGColorCreate(CGColorSpaceRef space, CGFloat components[]);

extern CGColorRef CGColorCreateGenericGray(CGFloat gray, CGFloat alpha);
extern CGColorRef CGColorCreateGenericRGB(CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
extern CGColorRef CGColorCreateGenericCMYK(CGFLoat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
extern CGColorRef CGColorGetConstantColor(CFStringRef colorName);
extern CGColorRed CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);
extern CGColorRef CGColorCreateCopy(CGColorRef color);
extern CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha);
extern CGColorRef CGColorRetain(CGColorRef color);
extern void CGColorRelease(CGColorRef color);
extern bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2);
extern size_t CGColorGetNumberOfComponents(CGColorRef color);
extern const CGFloat *CGColorGetComponents(CGColorRef color);
extern CGFloat CGColorGetAlpha(CGColorRef color);
extern CGColorSpaceRef CGColorGetColorSpace(CGColorRef color);
extern CGPatternRef CGColorGetPattern(CGColorRef color);
extern CFTypeID CGColorGetTypeID(void);

extern CFStringRef kCGColorWhite;
extern CFStringRef kCGColorBlack;
extern CFStringRef kCGColorClear;

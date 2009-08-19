/* 
 * CGColor.h
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#import <CoreGraphics/CGBase.h>

typedef struct CGColor {
  CGFloat _red;
  CGFloat _blue;
  CGFloat _green;
  CGFloat _alpha;
} CGColorRef;

#import <CoreGraphics/CGColorSpace.h>
#import <CoreGraphics/CGPattern.h>

extern CGColorRef CGColorCreate(CGColorSpaceRef space, CGFloat components[]);

extern CGColorRef CGColorCreateGenericGray(CGFloat gray, CGFloat alpha);
extern CGColorRef CGColorCreateGenericRGB(CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
extern CGColorRef CGColorCreateGenericCMYK(CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
extern CGColorRef CGColorGetConstantColor(CFStringRef colorName);
// extern CGColorRef CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);
extern CGColorRef CGColorCreateCopy(CGColorRef color);
extern CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha);
extern CGColorRef CGColorRetain(CGColorRef color);
extern void CGColorRelease(CGColorRef color);
extern bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2);
extern int CGColorGetNumberOfComponents(CGColorRef color);
extern const CGFloat *CGColorGetComponents(CGColorRef color);
extern CGFloat CGColorGetAlpha(CGColorRef color);
extern CGColorSpaceRef CGColorGetColorSpace(CGColorRef color);
// extern CGPatternRef CGColorGetPattern(CGColorRef color);
extern CFTypeID CGColorGetTypeID(void);

extern CFStringRef kCGColorWhite;
extern CFStringRef kCGColorBlack;
extern CFStringRef kCGColorClear;

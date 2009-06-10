// 
//  CGColor.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGColorRef CGColorCreate(CGColorSpaceRef space, CGFloat components[]);
// 

// extern CGColorRef CGColorCreateGenericGray(CGFloat gray, CGFloat alpha);
// extern CGColorRef CGColorCreateGenericRGB(CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
function CGColorCreateGenericRGB(red, green, blue, alpha)
{
	return {
		_red: red,
		_blue: blue,
		_green: green,
		_alpha: alpha
	};
}
// extern CGColorRef CGColorCreateGenericCMYK(CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// extern CGColorRef CGColorGetConstantColor(CFStringRef colorName);
// // extern CGColorRef CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);
// extern CGColorRef CGColorCreateCopy(CGColorRef color);
// extern CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha);
// extern CGColorRef CGColorRetain(CGColorRef color);
// extern void CGColorRelease(CGColorRef color);
// extern bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2);
// extern size_t CGColorGetNumberOfComponents(CGColorRef color);
// extern const CGFloat *CGColorGetComponents(CGColorRef color);
// extern CGFloat CGColorGetAlpha(CGColorRef color);
// extern CGColorSpaceRef CGColorGetColorSpace(CGColorRef color);
// // extern CGPatternRef CGColorGetPattern(CGColorRef color);
// extern CFTypeID CGColorGetTypeID(void);
// 
// extern CFStringRef kCGColorWhite;
// extern CFStringRef kCGColorBlack;
// extern CFStringRef kCGColorClear;
// 

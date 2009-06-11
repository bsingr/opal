// 
//  CGGradient.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGColorSpace.h>
#import <CoreGraphics/CGContext.h>

typedef struct CGGradient{
    CFArrayRef  *_colors;
    CFArrayRef  *_locations;
} *CGGradientRef;

enum {
    kCGGradientDrawsBeforeStartLocation = (1 << 0),
    kCGGradientDrawsAfterEndLocation    = (1 << 1)
};
typedef int CGGradientDrawingOptions;

extern CGGradientRef CGGradientCreateWithColorComponents(CGColorSpaceRef space, CGFloat components[], CGFloat locations[], size_t count);
extern CGGradientRef CGGradientCreateWithColors(CGColorSpaceRef space, CFArrayRef colors, CGFloat locations[]);

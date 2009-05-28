// 
//  NSShadow.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSShadow.h"

@implementation NSShadow

- (void)set {
    id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    ctx.shadowBlur = _shadowBlurRadius;
    ctx.shadowColor = [_shadowColor rgbaString];
    ctx.shadowOffsetX = _shadowOffset.width;
    ctx.shadowOffsetY = _shadowOffset.height;
}

- (void)setShadowBlurRadius:(int)val {
    _shadowBlurRadius = val;
}

- (void)setShadowColor:(NSColor *)color {
    _shadowColor = color;
}

- (void)setShadowOffset:(NSSize)offset {
    _shadowOffset = offset;
}

- (int)shadowBlurRadius {
    return _shadowBlurRadius;
}

- (NSColor *)shadowColor {
    return _shadowColor;
}

- (NSSize)shadowOffset {
    return _shadowOffset;
}

@end


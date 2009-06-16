// 
//  NSScroller.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSScroller.h"


@implementation NSScroller

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    if (_bounds.size.width < _bounds.size.height)
        _isVertical = YES;
    else
        _isVertical = NO;
    
    return self;
}

- (id)initWithFrame:(NSRect)frameRect
{
    self = [super initWithFrame:frameRect];
    
    if (self) {
    }
    
    return self;
}

- (void)drawRect:(NSRect)rect
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextFillRect(c, rect);
}

- (BOOL)isVertical
{
    return _isVertical;
}

@end


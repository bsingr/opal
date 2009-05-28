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
    [super initWithFrame:frameRect];
    if (self) {
    }
    return self;
}

- (void)drawRect:(NSRect)rect
{
    // The blue-ish background
    [[NSColor colorWithCalibratedRed:0.4 green:0.5 blue:0.4 alpha:1] set];
    [NSBezierPath fillRect:rect];
}

- (BOOL)isVertical
{
    return _isVertical;
}

@end


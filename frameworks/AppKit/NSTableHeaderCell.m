// 
//  NSTableHeaderCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTableHeaderCell.h"


@implementation NSTableHeaderCell

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    _value = [aCoder decodeObjectForKey:@"NSContents"];
    
    return self;
}

- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    // Border Bottom
    NSBezierPath *borderBottom = [NSBezierPath bezierPath];
    [[NSColor colorWithCalibratedRed:0.702 green:0.702 blue:0.702 alpha:1.0] set];
    [borderBottom setLineWidth:1.0];
    [borderBottom moveToPoint:NSMakePoint (cellFrame.origin.x + 0.5, cellFrame.origin.y + 0.5)];
    [borderBottom lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width, cellFrame.origin.y + 0.5)];
    [borderBottom stroke];
    
    // Border Right
    NSBezierPath *borderRight = [NSBezierPath bezierPath];
    [[NSColor colorWithCalibratedRed:0.702 green:0.702 blue:0.702 alpha:1.0] set];
    [borderRight setLineWidth:1.0];
    [borderRight moveToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 0.5, cellFrame.origin.y + 1.5)];
    [borderRight lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 0.5, cellFrame.origin.y + cellFrame.size.height)];
    [borderRight stroke];
    
    // Draw header cell title
    [NSGraphicsContext saveGraphicsState];
    [[NSColor colorWithCalibratedRed:0.325 green:0.325 blue:0.325 alpha:1.0] set];
    [[NSFont systemFontOfSize:[NSFont smallSystemFontSize]] set];
    
    NSShadow *titleShadow = [[NSShadow alloc] init];
    [titleShadow setShadowOffset:NSMakeSize (1,1)];
    [titleShadow setShadowBlurRadius:1];
    [titleShadow setShadowColor:[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:0.5]];
    [titleShadow set];
    
    [_value drawWithRect:NSMakeRect (cellFrame.origin.x + 4, cellFrame.origin.y + 4, cellFrame.size.width, 0) options:nil attributes: nil];
    [NSGraphicsContext restoreGraphicsState];
}

- (void)highlight:(BOOL)flag withFrame:(NSRect)cellFrame inView:(NSView *)controlView {
    
}

@end



// 
//  NSTextFieldCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextFieldCell.h"

@implementation NSTextFieldCell

- (id)init
{
    [super init];
    if (self) {
        _textColor= [NSColor controlTextColor];
    }
    
    return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    _drawsBackground = [aCoder decodeBoolForKey:@"NSDrawsBackground"];
    
    return self;
}

- (void)setGBorderType:(int)type
{
    _gBorderType = type;
}

- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextSaveGState(c);
        
    // text
    if(_isEnabled)
    {
        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.204, 0.204, 0.204, 1.0));

        CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

        CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
        CGContextSetFont(c, theFont);
        CGContextShowTextAtPoint(c, 20, ((cellFrame.size.height + 12) / 2), _value, 14);
    }
    else
    {
        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.704, 0.704, 0.704, 1.0));

        CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

        CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
        CGContextSetFont(c, theFont);
        // 12 being the size of the text, although this could change
        CGContextShowTextAtPoint(c, 20, ((cellFrame.size.height + 12) / 2), _value, 14);
    }
    
    
    CGContextRestoreGState(c);
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    
    // background
    if([self drawsBackground])
    {
        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(1, 1, 1, 1.0));
        CGContextFillRect(c, cellFrame);
    }
    
    
    [self drawInteriorWithFrame:cellFrame inView:controlView];
    
    
    // [NSGraphicsContext saveGraphicsState];
    //     
    //     _controlView = controlView;
    //     
    //     if (_isBezeled)
    //     {
    //         [[NSColor colorWithCalibratedRed:0.439 green:0.439 blue:0.439 alpha:1.0] set];
    //         NSBezierPath *topOuterBorder = [NSBezierPath bezierPath];
    //         [topOuterBorder setLineWidth:1];
    //         [topOuterBorder moveToPoint:NSMakePoint (cellFrame.origin.x + 3.5, cellFrame.origin.y + cellFrame.size.height - 3.5)];
    //         [topOuterBorder lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 3.5, cellFrame.origin.y + cellFrame.size.height - 3.5)];
    //         [topOuterBorder stroke];
    //         
    //         [[NSColor colorWithCalibratedRed:0.851 green:0.851 blue:0.851 alpha:1.0] set];
    //         NSBezierPath *topInnerBorder = [NSBezierPath bezierPath];
    //         [topInnerBorder setLineWidth:1];
    //         [topInnerBorder moveToPoint:NSMakePoint (cellFrame.origin.x + 3.5, cellFrame.origin.y + cellFrame.size.height - 4.5)];
    //         [topInnerBorder lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 3.5, cellFrame.origin.y + cellFrame.size.height - 4.5)];
    //         [topInnerBorder stroke];
    //         
    //         [[NSColor colorWithCalibratedRed:0.808 green:0.808 blue:0.808 alpha:1.0] set];
    //         NSBezierPath *bottomOuterBorder = [NSBezierPath bezierPath];
    //         [bottomOuterBorder setLineWidth:1];
    //         [bottomOuterBorder moveToPoint:NSMakePoint (cellFrame.origin.x + 3.5, cellFrame.origin.y + 3.5)];
    //         [bottomOuterBorder lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 3.5, cellFrame.origin.y + 3.5)];
    //         [bottomOuterBorder stroke];
    //         
    //         [[NSColor colorWithCalibratedRed:0.671 green:0.671 blue:0.671 alpha:1.0] set];
    //         NSBezierPath *sideBorders = [NSBezierPath bezierPath];
    //         [sideBorders setLineWidth:1];
    //         [sideBorders moveToPoint:NSMakePoint (cellFrame.origin.x + 3.5, cellFrame.origin.y + 3.5)];
    //         [sideBorders lineToPoint:NSMakePoint (cellFrame.origin.x + 3.5, cellFrame.origin.y + cellFrame.size.height -  3.5)];
    //         
    //         [sideBorders moveToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 3.5, cellFrame.origin.y + 3.5)];
    //         [sideBorders lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width - 3.5, cellFrame.origin.y + cellFrame.size.height -  3.5)];
    //         [sideBorders stroke];
    //     }
    //     
    //     if ([self drawsBackground]) {
    //         
    //         [NSGraphicsContext saveGraphicsState];
    //         
    //         if ([self isHighlighted])
    //         {
    //             NSShadow *highlightShadow = [[NSShadow alloc] init];
    //             [highlightShadow setShadowColor:[NSColor colorWithCalibratedRed:0.239 green:0.502 blue:0.875 alpha:1.0]];
    //             //[highlightShadow setShadowColor:[NSColor colorWithCalibratedRed:0.467 green:0.553 blue:0.941 alpha:1.0]];
    //             [highlightShadow setShadowBlurRadius:6];
    //             [highlightShadow setShadowOffset:NSMakeSize(0,0)];
    //             [highlightShadow set];
    //         }
    //         
    //         [[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1.0] set];
    //         [NSBezierPath fillRect:NSMakeRect (cellFrame.origin.x + 4, cellFrame.origin.y + 4, cellFrame.size.width - 8, cellFrame.size.height - 9)];;
    //         [NSGraphicsContext restoreGraphicsState];
    //     }
    //     
    //     [NSGraphicsContext restoreGraphicsState];
    //     
    //     [self drawInteriorWithFrame:cellFrame inView:controlView];
}

- (BOOL)drawsBackground
{
    return _drawsBackground;
}

- (void)setDrawsBackground:(BOOL)flag
{
    _drawsBackground = flag;
    
    if (_drawsBackground == 0)
        _drawsBackground = NO;
}

- (void)setBezeled:(BOOL)flag
{
    _bezeled = flag;
}

- (BOOL)isBezeled
{
    return _bezeled;
}

- (void)setBezelStyle:(NSTextFieldBezelStyle)style
{
    _bezelStyle = style;
}

- (NSTextFieldBezelStyle)bezelStyle
{
    return _bezelStyle;
}

- (void)setTextColor:(NSColor *)aColor
{   
    _textColor = aColor;
}

- (NSColor *)textColor
{
    return _textColor;
}

- (NSRect)titleRectForBounds:(NSRect)theRect
{
    if (_isEditable)
    {
        NSRect *titleRect = NSMakeRect (theRect.origin.x + 4, theRect.origin.y + 4, theRect.size.width - 8, theRect.size.height - 9);
        return titleRect;
    }
    
    return theRect;
}

@end


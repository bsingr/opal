// 
//  NSScrollView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSScrollView.h"


@implementation NSScrollView

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    NSInteger flags = [aCoder decodeIntForKey:@"NSsFlags"];
    
    if (flags & 0x10)
        _hasVerticalScroller = YES;
    else
        _hasVerticalScroller = NO;
    
    if (flags & 0x20)
        _hasHorizontalScroller = YES;
    else
        _hasHorizontalScroller = NO;
    
    _borderType = flags & 0x303;
    
    //_verticalScroller = [aCoder decodeObjectForKey:@"NSVScroller"];
    //_horizontalScroller = [aCoder decodeObjectForKey:@"NSHScroller"];
    //_clipView = [aCoder decodeObjectForKey:@"NSContentView"];
    //_headerClipView = [aCoder decodeObjectForKey:@"NSHeaderClipView"];
    //_cornerView = [aCoder decodeObjectForKey:@"NSCornerView"];
    
    for (int i = 0; i < [_subviews count]; i++)
    {
        if ([[_subviews objectAtIndex:i] NSClassName] == @"_NSCornerView")
        {
            _cornerView = [_subviews objectAtIndex:i];
        }
        else if ([[_subviews objectAtIndex:i] NSClassName] == @"NSScroller")
        {
            for (int j = 0; j < [[[_subviews objectAtIndex:i] subviews] count]; j++)
            {
                if ([[[[_subviews objectAtIndex:i] subviews] objectAtIndex:j] isVertical])
                {
                    NSLog(@"Found vertical scroller");
                }
                else
                {
                    NSLog(@"found horizontal scroller");
                }
            }
        }
        else if ([[_subviews objectAtIndex:i] NSClassName] == @"NSClipView")
        {
            for (int k = 0; k < [[[_subviews objectAtIndex:i] subviews] count]; k++)
            {
                if ([[[[_subviews objectAtIndex:i] subviews] objectAtIndex:k] NSClassName] == @"NSTableView")
                {
                    _clipView = [_subviews objectAtIndex:i];
                }
                else
                {
                    _headerClipView = [_subviews objectAtIndex:i];
                }
            }
        }
    }
    
    [self tile];
    
    return self;
}

- (id)initWithFrame:(NSRect)frameRect
{
    [super initWithFrame:frameRect];
    
    _contentView = [[NSView alloc] initWithFrame:NSMakeRect(0,0,0,0)];
    return self;
}

- (void)resizeSubviewsWithOldSize:(NSSize)oldBoundsSize
{
    [self tile];
}

- (void)tile
{
    NSRect tilingFrame;
    
    // header clip view
    if (_headerClipView)
    {
        NSLog(@"got header clip view");
        tilingRect = NSMakeRect (1, _frame.size.height - [_headerClipView bounds].size.height, _frame.size.width, [_headerClipView bounds].size.height);
        [_headerClipView setFrame:tilingRect];
    }
    
    if (_clipView)
    {
        NSLog(@"got header clip view");
        tilingRect = NSMakeRect (1, 1, _frame.size.width, [_clipView bounds].size.height);
        [_clipView setFrame:tilingRect];
    }
    
}

- (void)drawRect:(NSView *)dirtyRect
{
    [[NSColor colorWithCalibratedRed:0.851 green:0.851 blue:0.851 alpha:1.0]set];
    [NSBezierPath strokeRect:NSMakeRect(0.5, 0.5, _bounds.size.width - 1, _bounds.size.height - 1)];
}

@end


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
  
  _verticalScroller = [aCoder decodeObjectForKey:@"NSVScroller"];
  _horizontalScroller = [aCoder decodeObjectForKey:@"NSHScroller"];
  _clipView = [aCoder decodeObjectForKey:@"NSContentView"];
  _headerClipView = [aCoder decodeObjectForKey:@"NSHeaderClipView"];
  _cornerView = [aCoder decodeObjectForKey:@"NSCornerView"];
  
  NSLog(_subviews);
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
    tilingFrame = NSMakeRect (1, _frame.size.height - [_headerClipView bounds].size.height, _frame.size.width, [_headerClipView bounds].size.height);
    [_headerClipView setFrame:tilingFrame];
  }
  
  if (_clipView)
  {
    NSLog(@"got clip view");
    tilingFrame = NSMakeRect (1, 1, _frame.size.width, [_clipView bounds].size.height);
    [_clipView setFrame:tilingFrame];
  }
  
}

- (void)drawRect:(NSView *)dirtyRect
{
  // [[NSColor colorWithCalibratedRed:0.851 green:0.851 blue:0.851 alpha:1.0]set];
  // [NSBezierPath strokeRect:NSMakeRect(0.5, 0.5, _bounds.size.width - 1, _bounds.size.height - 1)];
}

@end


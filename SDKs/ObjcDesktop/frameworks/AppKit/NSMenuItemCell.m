// 
//  NSMenuItemCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSMenuItemCell.h"


@implementation NSMenuItemCell

// MARK: Configuring menu item attributes
- (NSMenuItem *)menuItem
{
  return _menuItem;
}

- (void)setMenuItem:(NSMenuItem *)item
{
  _menuItem = item;
}

- (NSMenuView *)menuView
{
  return _menuView;
}

- (void)setMenuView:(NSMenuView *)menuView
{
  _menuView = menuView;
}

// MARK: Calculating the size of a menu item
- (void)calcSize
{
  
}

- (BOOL)needsSizing
{
  
}

- (void)setNeedsSizing:(BOOL)flag
{
  
}

- (NSInteger)imageWidth
{
  
}

- (NSInteger)titleWidth
{
  
}

- (NSInteger)keyEquivalentWidth
{
  
}

- (NSInteger)stateImageWidth
{
  
}

// MARK: Getting the menu item's drawing rectangle
- (NSRect)keyEquivalentRectForBounds:(NSRect)cellFrame
{
  
}

- (NSRect)stateImageRectForBounds:(NSRect)cellFrame
{
  
}

- (NSRect)titleRectForBounds:(NSRect)cellFrame
{
  
}

// MARK: Drawing the menu item
- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  if (![[self menuItem] title])
  {
    [self drawSeparatorItemWithFrame:cellFrame inView:controlView];
    return;
  }
  
  [NSGraphicsContext saveGraphicsState];
  
  [self drawBorderAndBackgroundWithFrame:cellFrame inView:controlView];
  [self drawImageWithFrame:cellFrame inView:controlView];
  [self drawKeyEquivalentWithFrame:cellFrame inView:controlView];
  [self drawTitleWithFrame:cellFrame inView:controlView];
  
  [NSGraphicsContext restoreGraphicsState];
}

- (void)drawBorderAndBackgroundWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  if ([self isHighlighted])
  {
    NSColor *highlightTop = [NSColor colorWithCalibratedRed:0.663 green:0.714 blue:0.765 alpha:1.0];
    NSColor *highlightBottom = [NSColor colorWithCalibratedRed:0.506 green:0.569 blue:0.639 alpha:1.0];
    
    NSGradient *highlightGradient = [[NSGradient alloc] initWithStartingColor:highlightTop endingColor:highlightBottom];
    [highlightGradient drawInRect:cellFrame angle:0];
    
    [[NSColor colorWithCalibratedRed:0.529 green:0.573 blue:0.612 alpha:1] set];
    NSBezierPath *topBorder = [NSBezierPath bezierPath];
    [topBorder moveToPoint:NSMakePoint (cellFrame.origin.x, cellFrame.origin.y + cellFrame.size.height - 0.5)];
    [topBorder lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width, cellFrame.origin.y + cellFrame.size.height - 0.5)];
    [topBorder stroke];
    
    [[NSColor colorWithCalibratedRed:0.737 green:0.776 blue:0.816 alpha:1] set];
    NSBezierPath *topBorderInner = [NSBezierPath bezierPath];
    [topBorderInner moveToPoint:NSMakePoint (cellFrame.origin.x, cellFrame.origin.y + cellFrame.size.height - 1.5)];
    [topBorderInner lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width, cellFrame.origin.y + cellFrame.size.height - 1.5)];
    [topBorderInner stroke];
    
    [[NSColor colorWithCalibratedRed:0.404 green:0.455 blue:0.510 alpha:1] set];
    NSBezierPath *bottomBorder = [NSBezierPath bezierPath];
    [bottomBorder moveToPoint:NSMakePoint (cellFrame.origin.x, cellFrame.origin.y + 0.5)];
    [bottomBorder lineToPoint:NSMakePoint (cellFrame.origin.x + cellFrame.size.width, cellFrame.origin.y + 0.5)];
    [bottomBorder stroke];
  }
}

- (void)drawImageWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  
}

- (void)drawKeyEquivalentWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  
}

- (void)drawSeparatorItemWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  
}

- (void)drawStateImageWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  
}

- (void)drawTitleWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  NSString *_title = [[self menuItem] title];
 
  if (!_title)
    return;
  
  if ([self isHighlighted])
  {
    [[NSColor colorWithCalibratedRed:0.953 green:0.953 blue:0.953 alpha:1] set];
    NSShadow *titleShadow = [[NSShadow alloc] init];
    
    [titleShadow setShadowOffset:NSMakeSize (1,1)];
    [titleShadow setShadowBlurRadius:1];
    [titleShadow setShadowColor:[NSColor colorWithCalibratedRed:0.396 green:0.435 blue:0.510 alpha:0.5]];
    [titleShadow set];
  }
    
  else
  {
    [[NSColor controlTextColor] set];
    NSShadow *titleShadow = [[NSShadow alloc] init];
    [titleShadow setShadowOffset:NSMakeSize (1,1)];
    [titleShadow setShadowBlurRadius:1];
    [titleShadow setShadowColor:[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:0.5]];
    [titleShadow set];
  }   
    
      
  [[NSFont systemFontOfSize:[NSFont systemFontSize]] set];
  
  if ([_menuView isHorizontal])
    [_title drawWithRect:NSMakeRect(cellFrame.origin.x + 25, cellFrame.origin.y + 9,40,0) options:nil attributes: nil];
  else
    [_title drawWithRect:NSMakeRect(cellFrame.origin.x + 25, cellFrame.origin.y + 6,40,0) options:nil attributes: nil];
  
  
}

- (BOOL)needsDisplay
{
  
}

- (void)setNeedsDisplay:(BOOL)flag
{
  
}

// MARK: Assigning a tag
- (NSInteger)tag
{
  
}

@end



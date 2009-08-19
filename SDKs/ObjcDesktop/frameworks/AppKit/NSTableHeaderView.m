// 
//  NSTableHeaderView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTableHeaderView.h"


@implementation NSTableHeaderView

- (id)initWithCoder:(NSCoder *)aCoder
{
  [super initWithCoder:aCoder];
  
  _tableView = [aCoder decodeObjectForKey:@"NSTableView"];
  NSLog(@"Decoded table view:");
  NSLog(_tableView);
  
  return self;
}

- (id)initWithFrame:(NSRect)frameRect
{
  [super initWithFrame:frameRect];
  if (self){
    
  }
  return self;
}

- (void)setTableView:(NSTableView *)aTableView {
  _tableView = aTableView;
  [self setNeedsDisplay:YES];
}

- (NSTableView *)tableView {
  return _tableView;
}

- (void)drawRect:(NSRect)rect
{
  NSLog(@"Drawing");
  CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
  // CGContextClearRect(c, rect);
  // CGContextSetAlpha(c, 0.3);
  CGContextSaveGState(c);
  CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(1, 0, 0, 1.0));
  CGContextFillRect(c, rect);
  CGContextRestoreGState(c);
  NSLog(rect);
  NSLog(_bounds);
  // if(_tableView && [_tableView tableColumns])
  //   {
  //     for(int i = 0; i < [[_tableView tableColumns] count]; i++)
  //     {
  //       NSTableColumn *column = [[_tableView tableColumns] objectAtIndex:i];
  //       [[column headerCell] drawWithFrame:CGRectMake(0,0,100,100) inView:self];
  //     }
  //   }
  
  
  
  //[[NSColor colorWithCalibratedRed:1 green:1 blue:0.4 alpha:1] set];
  //[NSBezierPath fillRect:rect];
  
  // Background Gradient
  // NSColor *gradientTop = [NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1.0];
  //  NSColor *gradientBottom = [NSColor colorWithCalibratedRed:0.902 green:0.902 blue:0.902 alpha:1.0];
  //  NSGradient *backgroundGradient = [[NSGradient alloc] initWithStartingColor:gradientTop endingColor:gradientBottom];
  //  [backgroundGradient drawInRect:NSMakeRect (rect.origin.x, rect.origin.y, rect.size.width, rect.size.height) angle:0];
  //  
  //  // Top border
  //  [[NSColor colorWithCalibratedRed:0.851 green:0.851 blue:0.851 alpha:1] set];
  //  NSBezierPath *topBorder = [NSBezierPath bezierPath];
  //  [topBorder moveToPoint:NSMakePoint(rect.origin.x, rect.origin.y + rect.size.height - 0.5)];
  //  [topBorder lineToPoint:NSMakePoint(rect.origin.x + rect.size.width, rect.origin.y + rect.size.height - 0.5)];
  //  [topBorder stroke];
  //  
  //  if (_tableView) {
  //    NSArray *tableColumns = [_tableView tableColumns];
  //    int count = [tableColumns count];
  //    
  //    NSSize spacing = [_tableView intercellSpacing];
  //    NSRect columnRect = NSMakeRect(_bounds.origin.x, _bounds.origin.y, _bounds.size.width, _bounds.size.height);
  //        
  //    for (int i = 0; i < count; i ++) {
  //      NSTableColumn *column = [tableColumns objectAtIndex:i];
  //    
  //      columnRect.size.width = [column width] + spacing.width;
  //      [[column headerCell] drawWithFrame:columnRect inView:self];    
  //      columnRect.origin.x = columnRect.origin.x + columnRect.size.width;
  //    }
  //  }
}

- (NSRect)headerRectOfColumn:(NSInteger)columnIndex {
  
}

@end


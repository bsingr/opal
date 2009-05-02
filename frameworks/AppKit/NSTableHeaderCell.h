// 
//  NSTableHeaderCell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSTextFieldCell.h>

@interface NSTableHeaderCell : NSTextFieldCell
{
}

- (void)drawSortIndicatorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView ascending:(BOOL)ascending priority:(NSInteger)priority;
- (NSRect)sortIndicatorRectForBounds:(NSRect)theRect;

@end

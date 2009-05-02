// 
//  NSTableHeaderView.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSView.h>

@class NSTableView, NSColor, NSImage, NSCursor;

@interface NSTableHeaderView : NSView
{
}

- (void)setTableView:(NSTableView *)tableView;
- (NSTableView *)tableView;
- (NSInteger)draggedColumn;
- (CGFloat)draggedDistance;
- (NSInteger)resizedColumn;
- (NSRect)headerRectOfColumn:(NSInteger)column;
- (NSInteger)columnAtPoint:(NSPoint)point;

@end

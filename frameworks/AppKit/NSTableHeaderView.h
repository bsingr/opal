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

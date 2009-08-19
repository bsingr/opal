// 
//  NSTableView.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSControl.h>

@class NSTableHeaderView, NSTableColumn, NSMutableArray, NSIndexSet, NSMutableIndexSet;

enum {
  NSTableViewGridNone          = 0,
  NSTableViewSolidVerticalGridLineMask   = 1 << 0,
  NSTableViewSolidHorizontalGridLineMask = 1 << 1
};

enum {
  NSTableViewSelectionHighlightStyleRegular     = 0,
  NSTableViewSelectionHighlightStyleSourceList  = 1
};
typedef NSInteger NSTableViewSelectionHighlightStyle;

@interface NSTableView : NSControl <NSUserInterfaceValidations>
{
  id           _dataSource;
  id           _delegate;
  
  NSScrollView    *_scrollView;
  NSTableHeaderView   *_headerView;
  
  NSView        *_cornerView;
  
  NSMutableArray    *_tableColumns;
  NSMutableArray    *_tableColumnViews;
  
  NSUInteger       _numberOfRows;
  NSUInteger       _numberOfColumns;
  
  NSMutableArray    *_tableCells;
  
  NSSize         _intercellSpacing;
  NSUInteger       _rowHeight;
  
  NSMutableIndexSet   *_selectedRowIndexes;
  
  NSUInteger       _editedColumn;
  NSUInteger       _editedRow;
  
  BOOL         _drawsGrid;
  BOOL         _alternatingRowBackground;
}

- (void)setDataSource:(id)aSource;
- (id)dataSource;
- (void)setDelegate:(id)delegate;
- (id)delegate;
- (void)setHeaderView:(NSTableHeaderView *)headerView;
- (NSTableHeaderView *)headerView;

- (void)setCornerView:(NSView *)cornerView;
- (NSView *)cornerView;

- (void)setAllowsColumnReordering:(BOOL)flag;
- (BOOL)allowsColumnReordering;

- (void)setAllowsColumnResizing:(BOOL)flag;
- (BOOL)allowsColumnResizing;

- (void)setGridStyleMask:(NSUInteger)gridType;
- (NSUInteger)gridStyleMask;

- (void)setIntercellSpacing:(NSSize)aSize;
- (NSSize)intercellSpacing;

- (void)setUsesAlternatingRowBackgroundColors:(BOOL)useAlternatingRowColors;
- (BOOL)usesAlternatingRowBackgroundColors;

- (void)setBackgroundColor:(NSColor *)color;
- (NSColor *)backgroundColor;

- (void)setGridColor:(NSColor *)color;
- (NSColor *)gridColor;

- (void)setRowHeight:(CGFloat)rowHeight;
- (CGFloat)rowHeight;


- (void)noteHeightOfRowsWithIndexesChanged:(NSIndexSet *)indexSet;

- (NSArray *)tableColumns;
- (NSInteger)numberOfColumns;
- (NSInteger)numberOfRows;

- (void)addTableColumn:(NSTableColumn *)column;
- (void)removeTableColumn:(NSTableColumn *)column;
- (NSInteger)columnWithIdentifier:(id)identifier;
- (NSTableColumn *)tableColumnWithIdentifier:(id)identifier;

- (void)tile;
- (void)sizeToFit;
- (void)sizeLastColumnToFit;
- (void)scrollRowToVisible:(NSInteger)row;
- (void)scrollColumnToVisible:(NSInteger)column;
- (void)moveColumn:(NSInteger)column toColumn:(NSInteger)newIndex;

- (void)reloadData;
- (void)noteNumberOfRowsChanged;

- (NSInteger)editedColumn;
- (NSInteger)editedRow;
- (NSInteger)clickedColumn;
- (NSInteger)clickedRow;

- (void)setDoubleAction:(SEL)aSelector;
- (SEL)doubleAction;

- (void)setSortDescriptors:(NSArray *)array;
- (NSArray *)sortDescriptors;

- (void)setIndicatorImage:(NSImage *)anImage inTableColumn:(NSTableColumn *)tc;
- (NSImage *)indicatorImageInTableColumn:(NSTableColumn *)tc;

- (void)setHighlightedTableColumn:(NSTableColumn *)tc;
- (NSTableColumn *)highlightedTableColumn;


- (void)setAllowsMultipleSelection:(BOOL)flag;
- (BOOL)allowsMultipleSelection;
- (void)setAllowsEmptySelection:(BOOL)flag;
- (BOOL)allowsEmptySelection;
- (void)setAllowsColumnSelection:(BOOL)flag;
- (BOOL)allowsColumnSelection;
- (void)selectAll:(id)sender;
- (void)deselectAll:(id)sender;

- (void)selectColumnIndexes:(NSIndexSet *)indexes byExtendingSelection:(BOOL)extend;

- (void)selectRowIndexes:(NSIndexSet *)indexes byExtendingSelection:(BOOL)extend;

- (NSIndexSet *)selectedColumnIndexes;
- (NSIndexSet *)selectedRowIndexes;

- (void)deselectColumn:(NSInteger)column;
- (void)deselectRow:(NSInteger)row;
- (NSInteger)selectedColumn;
- (NSInteger)selectedRow;
- (BOOL)isColumnSelected:(NSInteger)column;
- (BOOL)isRowSelected:(NSInteger)row;
- (NSInteger)numberOfSelectedColumns;
- (NSInteger)numberOfSelectedRows;

- (BOOL)allowsTypeSelect;
- (void)setAllowsTypeSelect:(BOOL)value;

- (NSTableViewSelectionHighlightStyle)selectionHighlightStyle;
- (void)setSelectionHighlightStyle:(NSTableViewSelectionHighlightStyle)selectionHighlightStyle;

- (NSRect)rectOfColumn:(NSInteger)column;

- (NSRect)rectOfRow:(NSInteger)row;

- (NSIndexSet *)columnIndexesInRect:(NSRect)rect;

- (NSRange)rowsInRect:(NSRect)rect;

- (NSInteger)columnAtPoint:(NSPoint)point;

- (NSInteger)rowAtPoint:(NSPoint)point;

- (NSRect)frameOfCellAtColumn:(NSInteger)column row:(NSInteger)row;

- (NSCell *)preparedCellAtColumn:(NSInteger)column row:(NSInteger)row;

- (BOOL)textShouldBeginEditing:(NSText *)textObject;
- (BOOL)textShouldEndEditing:(NSText *)textObject;
- (void)textDidBeginEditing:(NSNotification *)notification;
- (void)textDidEndEditing:(NSNotification *)notification;
- (void)textDidChange:(NSNotification *)notification;


- (void)editColumn:(NSInteger)column row:(NSInteger)row withEvent:(NSEvent *)theEvent select:(BOOL)select;
- (void)drawRow:(NSInteger)row clipRect:(NSRect)clipRect;
- (void)highlightSelectionInClipRect:(NSRect)clipRect;
- (void)drawGridInClipRect:(NSRect)clipRect;
- (void)drawBackgroundInClipRect:(NSRect)clipRect;

@end


@interface NSObject (NSTableViewDelegate)

- (void)tableView:(NSTableView *)tableView willDisplayCell:(id)cell forTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (BOOL)tableView:(NSTableView *)tableView shouldEditTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (BOOL)selectionShouldChangeInTableView:(NSTableView *)tableView;

- (BOOL)tableView:(NSTableView *)tableView shouldSelectRow:(NSInteger)row;
- (NSIndexSet *)tableView:(NSTableView *)tableView selectionIndexesForProposedSelection:(NSIndexSet *)proposedSelectionIndexes;


- (BOOL)tableView:(NSTableView *)tableView shouldSelectTableColumn:(NSTableColumn *)tableColumn;

- (void)tableView:(NSTableView *)tableView mouseDownInHeaderOfTableColumn:(NSTableColumn *)tableColumn;
- (void)tableView:(NSTableView *)tableView didClickTableColumn:(NSTableColumn *)tableColumn;
- (void)tableView:(NSTableView *)tableView didDragTableColumn:(NSTableColumn *)tableColumn;


// - (NSString *)tableView:(NSTableView *)tableView toolTipForCell:(NSCell *)cell rect:(NSRectPointer)rect tableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row mouseLocation:(NSPoint)mouseLocation;
- (CGFloat)tableView:(NSTableView *)tableView heightOfRow:(NSInteger)row;
- (NSString *)tableView:(NSTableView *)tableView typeSelectStringForTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (NSInteger)tableView:(NSTableView *)tableView nextTypeSelectMatchFromRow:(NSInteger)startRow toRow:(NSInteger)endRow forString:(NSString *)searchString;
- (BOOL)tableView:(NSTableView *)tableView shouldTypeSelectForEvent:(NSEvent *)event withCurrentSearchString:(NSString *)searchString;
- (BOOL)tableView:(NSTableView *)tableView shouldShowCellExpansionForTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (BOOL)tableView:(NSTableView *)tableView shouldTrackCell:(NSCell *)cell forTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (NSCell *)tableView:(NSTableView *)tableView dataCellForTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (BOOL)tableView:(NSTableView *)tableView isGroupRow:(NSInteger)row;

@end


extern NSString *NSTableViewSelectionDidChangeNotification;
extern NSString *NSTableViewColumnDidMoveNotification;
extern NSString *NSTableViewColumnDidResizeNotification;
extern NSString *NSTableViewSelectionIsChangingNotification;


@interface NSObject (NSTableViewNotifications)

- (void)tableViewSelectionDidChange:(NSNotification *)notification;
- (void)tableViewColumnDidMove:(NSNotification *)notification;
- (void)tableViewColumnDidResize:(NSNotification *)notification;
- (void)tableViewSelectionIsChanging:(NSNotification *)notification;

@end


@interface NSObject (NSTableDataSource)

- (NSInteger)numberOfRowsInTableView:(NSTableView *)tableView;
- (id)tableView:(NSTableView *)tableView objectValueForTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;
- (void)tableView:(NSTableView *)tableView setObjectValue:(id)object forTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row;

- (void)tableView:(NSTableView *)tableView sortDescriptorsDidChange:(NSArray *)oldDescriptors;

- (BOOL)tableView:(NSTableView *)tableView writeRowsWithIndexes:(NSIndexSet *)rowIndexes toPasteboard:(NSPasteboard*)pboard;

@end

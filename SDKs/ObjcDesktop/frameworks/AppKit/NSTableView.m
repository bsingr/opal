// 
//  NSTableView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTableView.h"


@implementation NSTableView

- (id)initWithCoder:(NSCoder *)aCoder
{
  [super initWithCoder:aCoder];
   
  NSInteger flags = [aCoder decodeIntForKey:@"NSTvFlags"];
  
  if (flags & 0x20000000)
    _drawsGrid = YES;
  else
    _drawsGrid = NO;
  
  if (flags & 0x00800000)
    _alternatingRowBackground = YES;
  else
    _alternatingRowBackground = NO;
    
  _headerView = [aCoder decodeObjectForKey:@"NSHeaderView"];
  
  if(_headerView)
    [_headerView setTableView:self];
    
  _cornerView = [aCoder decodeObjectForKey:@"NSCornerView"];
    
  _tableColumns = [aCoder decodeObjectForKey:@"NSTableColumns"];
  
  _numberOfRows = 0;
  _numberOfColumns = [_tableColumns count];
  
  // for (int i =0; i < [_tableColumns count]; i++) {
  //     [[_tableColumns objectAtIndex:i] setTableView:self];
  //   }
  return self;
}

- (id)initWithFrame:(NSRect)frameRect
{
  [super initWithFrame:frameRect];
  
  if (self) {
    _rowHeight = 16;
    _numberOfRows = 0;
    _numberOfColumns = 0;
    _selectedRowIndexes = [[NSMutableIndexSet alloc] init];
    [self setIntercellSpacing:NSMakeSize(3,2)];
    
    
    _tableCells = [NSMutableArray arrayWithCapacity:0];
    _tableColumns = [NSMutableArray arrayWithCapacity:0];
    _tableColumnViews = [NSMutableArray arrayWithCapacity:0];
  }
  
  return self;
}

- (void)drawRect:(NSRect)rect
{
  CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
  CGContextClearRect(c, rect);
  // CGContextSetAlpha(c, 0.3);
  CGContextSaveGState(c);
  CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(1, 1, 1, 1.0));
  CGContextFillRect(c, CGRectInset(rect, 20, 20));
  CGContextRestoreGState(c);
  
  // if (_alternatingRowBackground)
  //   {
  //     // Background.. for now, hard code that it must be alternating
  //     NSArray *backgroundColors = [NSColor controlAlternatingRowBackgroundColors];
  //     if (_rowHeight) {
  //       // NSUInteger rowsToDraw = Math.round(_bounds.size.height / _rowHeight) + 1;
  //       
  //       BOOL oddRow = YES;
  //       NSColor colorToDraw;
  //       
  //       for (int i = 0; i < rowsToDraw; i++) {
  //         if (oddRow) {
  //           colorToDraw = [backgroundColors objectAtIndex:0];
  //           oddRow = NO;
  //         } else {
  //           colorToDraw = [backgroundColors objectAtIndex:1];
  //           oddRow = YES;
  //         }
  //         
  //         [colorToDraw set];
  //         [NSBezierPath fillRect:[self rectOfRow:i]];
  //       }
  //     }    
  //   }
  //   else
  //   {
  //     [[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1] set];
  //     [NSBezierPath fillRect:dirtyRect];
  //   }
  //   
  //   // Highlught selections
  //   
  //   if (_selectedRowIndexes)
  //   {
  //     NSArray theHighlightedRows = [_selectedRowIndexes indexes];
  //     
  //     for (int i = 0; i < [theHighlightedRows count]; i++) {
  //       
  //       if ([theHighlightedRows objectAtIndex:i] != -1)
  //       {
  //         [[NSColor colorWithCalibratedRed:0.467 green:0.553 blue:0.659 alpha:1.0] set];
  //         [NSBezierPath fillRect:[self rectOfRow:[theHighlightedRows objectAtIndex:i]]];
  //       }
  //       
  //     }
  //   }
  //   
  //     
  //   // Vertical Column lines
  //   if (_tableColumns && _drawsGrid) {
  //     for (int i = 0; i < [_tableColumns count]; i++) {
  //       NSRect columnRect = [self rectOfColumn:i];
  //       [[NSColor colorWithCalibratedRed:0.851 green:0.851 blue:0.851 alpha:1.0] set];
  //       
  //       NSBezierPath *borderRight = [NSBezierPath bezierPath];
  //       [borderRight setLineWidth:1.0];
  //       [borderRight moveToPoint:NSMakePoint (columnRect.origin.x + columnRect.size.width - 0.5, columnRect.origin.y + 0.5)];
  //       [borderRight lineToPoint:NSMakePoint (columnRect.origin.x + columnRect.size.width - 0.5, columnRect.origin.y + columnRect.size.height)];
  //       [borderRight stroke];
  //     }
  //   }
  //   
  //   // Draw cell data
  //   for (int columnIndex = 0; columnIndex < _numberOfColumns; columnIndex++)
  //   {
  //     for (int rowIndex = 0; rowIndex < _numberOfRows; rowIndex++)
  //     {
  //       NSCell *dataCell = [self preparedCellAtColumn:columnIndex row:rowIndex];
  //       [dataCell drawInteriorWithFrame:[self frameOfCellAtColumn:columnIndex row:rowIndex] inView:self];
  //     }
  //   }
}

- (NSCell *)preparedCellAtColumn:(NSInteger)column row:(NSInteger)row
{
  NSTableColumn *column = [_tableColumns objectAtIndex:column];
  NSCell *dataCell = [column dataCellForRow:row];
  [dataCell setObjectValue:[_dataSource tableView:self objectValueForTableColumn:column row:row]];
  
  if ([self isRowSelected:row]) {
    [dataCell setTextColor:[NSColor selectedTextColor]];
  } else {
    [dataCell setTextColor:[NSColor textColor]];
  }
  
  return dataCell;
}

- (BOOL)isRowSelected:(NSInteger)rowIndex
{
  if ([_selectedRowIndexes containsIndex:rowIndex])
    return YES;
  else
    return NO;
}

- (void)tile
{
  // adjust headerview and scrollview scrollers to fit
  // Scrollers by default are hidden, and the containing nssrcollview div uses css scrollers when needed... fix? yeah, probably should..
}

- (void)setIntercellSpacing:(NSSize)aSize
{
  _intercellSpacing = aSize;
}

- (NSSize)intercellSpacing
{
  return _intercellSpacing;
}

- (void)setRowHeight:(NSInteger)rowHeight
{
  _rowHeight = rowHeight;
}
- (NSInteger)rowHeight
{
  return _rowHeight;
}

- (void)addTableColumn:(NSTableColumn *)aColumn
{  
  NSInteger i;
  NSInteger xOffset = 0;
  
  for(i = 0; i < [_tableColumns count]; i++) {
    xOffset = xOffset + [[_tableColumns objectAtIndex:i] width];
  }
  
  [_tableColumns addObject:aColumn];
  
  _numberOfColumns = [_tableColumns count];
  [self reloadData];
}

- (void)removeTableColumn:(NSTableColumn *)aTableColumn
{
  // FIXME: need to implement
}

- (NSArray *)tableColumns
{
  return _tableColumns;
}

- (NSInteger)numberOfRows
{
  return _numberOfRows;
}

- (NSInteger)numberOfColumns
{
  return _numberOfColumns;
}

- (void)setDataSource:(id)anObject
{
  // if (![anObject respondsToSelector:@selector(numberOfRowsInTableView:)] || ![anObject respondsToSelector:@selector(tableView:objectValueForTableColumn:row:)])
  //     NSLog(@"TableView datasource does not respond to one of the two data source methods");
  //   
  _dataSource = anObject;
  [self reloadData];
}

- (id)dataSource
{
  return _dataSource;
}

- (void)setDelegate:(id)anObject
{
  _delegate = anObject;
}

- (id)delegate
{
  return _delegate;
}

- (void)reloadData
{
  
  if (!_dataSource)
    return;
  
  if (![_dataSource respondsToSelector:@selector(numberOfRowsInTableView:)])
    return;
  
  _numberOfRows = [_dataSource numberOfRowsInTableView:self];
    
  [self setNeedsDisplay:YES];
  
  if (_headerView)
    [_headerView setNeedsDisplay:YES];
}

- (void)setHeaderView:(NSTableHeaderView *)aHeaderView {
  _headerView = aHeaderView;
  [_headerView setTableView:self];
}

- (NSTableHeaderView *)headerView {
  return _headerView;
}

- (NSRect)frameOfCellAtColumn:(NSInteger)columnIndex row:(NSInteger)rowIndex
{
  NSRect columnRect = [self rectOfColumn:columnIndex];
  NSRect rowRect = [self rectOfRow:rowIndex];
  return NSMakeRect (columnRect.origin.x, rowRect.origin.y, columnRect.size.width, rowRect.size.height);
}

- (NSRect)rectOfColumn:(NSInteger)columnIndex
{
  NSRect columnRect = NSMakeRect(_bounds.origin.x, _bounds.origin.y, 0, _bounds.size.height);
  
  for (int i = 0; i < columnIndex; i ++) {
    NSTableColumn *column = [_tableColumns objectAtIndex:i];
    columnRect.origin.x = columnRect.origin.x + [[_tableColumns objectAtIndex:i] width] + _intercellSpacing.width;
  }
  columnRect.size.width = [[_tableColumns objectAtIndex:columnIndex] width] + _intercellSpacing.width;
  //NSLog(@"RectOfColumn for column: " + columnIndex + " is: " + columnRect.origin.x + " " + columnRect.origin.y + " " + columnRect.size.width + " " + columnRect.size.height);

  return columnRect;
}

- (NSRect)rectOfRow:(NSInteger)rowIndex
{
  // Start at top, each row is also the width of this _bounds size, and the height is set (default 17)
  NSRect rowRect = NSMakeRect (_bounds.origin.x, _bounds.size.height + _bounds.origin.x, _bounds.size.width, _rowHeight );
  
  int eachRowHeight = 18;
  int yOffset = eachRowHeight * rowIndex;
  
  rowRect.origin.y = _bounds.size.height - yOffset - eachRowHeight - 1;
  rowRect.size.height = eachRowHeight + _intercellSpacing.height;
  
  return rowRect;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
  if (context == @"selectionIndexes")
  {
    if (![_selectedRowIndexes isEqualToIndexSet:[object valueForKeyPath:keyPath]])
    {
      // Do not send this if the set is already the same.. wasted journey
      [self selectRowIndexes:[object valueForKeyPath:keyPath] byExtendingSelection:NO];
    }   
  }
  else
  {
    //[super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
  }
}

- (NSInteger)columnAtPoint:(NSPoint)aPoint
{
  for (int i = 0; i < [_tableColumns count]; i++) {
    if (NSPointInRect (aPoint, [self rectOfColumn:i]))
      return i;
  }
  
  return -1;
}

- (NSInteger)rowAtPoint:(NSPoint)aPoint
{
  for (int i = 0; i < _numberOfRows; i++) {    
    if (NSPointInRect (aPoint, [self rectOfRow:i]))
      return i;
  }
  return -1;
}

/*- (void)keyDown:(NSEvent *)theEvent
{   
  NSInteger rowToSelect = -1;
  
  if (([_selectedRowIndexes count] == 0) || ([_selectedRowIndexes firstIndex] == -1))
  {
    rowToSelect = 0;
  }
  else
  {
    if ([theEvent valueForKey:@"code"] == NSUpArrowFunctionKey)
    {
      if (0 < [_selectedRowIndexes firstIndex])
        rowToSelect = [_selectedRowIndexes firstIndex] - 1;
      else
        rowToSelect = _numberOfRows - 1;
    }
    else if ([theEvent valueForKey:@"code"] == NSDownArrowFunctionKey)
    {
      if ([_selectedRowIndexes firstIndex] < (_numberOfRows -1))
        rowToSelect = [_selectedRowIndexes firstIndex] + 1;
      else
        rowToSelect = 0;
    } 
  }
  
  NSIndexSet *rowsToSelect = [[NSIndexSet alloc] initWithIndex:rowToSelect];
  
  [self selectRowIndexes:rowsToSelect byExtendingSelection:YES];
}*/

- (void)mouseDown:(NSEvent *)theEvent
{
  [_window makeFirstResponder:self];
  
  NSPoint location = [self convertPoint:[theEvent locationInWindow] fromView:nil];
  NSInteger clickedColumnIndex = [self columnAtPoint:location];
  NSInteger clickedRowIndex = [self rowAtPoint:location];

  NSTableColumn *clickedColumn = [_tableColumns objectAtIndex:clickedColumnIndex];
  NSCell *clickedCell = [clickedColumn dataCellForRow:clickedRowIndex];
  
  if ([theEvent clickCount] < 2)
  {
    // FIXME: Should ask delegate here if selection can change
    
    if ([theEvent modifierFlags] & NSShiftKeyMask)
    {
      // Select all rows between clicks
    }
    else if ([theEvent modifierFlags] & (NSCommandKeyMask | NSAlternateKeyMask))
    {
      // Extend individual selection/chnage
      if ([self isRowSelected:clickedRowIndex])
      {
        // Already selected, so deselect
        [self deselectRow:clickedRowIndex];
      }
      else
      {
        [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:clickedRowIndex] byExtendingSelection:YES];
      }
    }
    else
    {
      // Normal Key press with no modifiers
      NSLog(@"here");
      [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:clickedRowIndex] byExtendingSelection:NO];
    }
  }
  else if ([theEvent clickCount] == 2)
  {
    // Should edit cell here
    if ([[_tableColumns objectAtIndex:clickedColumnIndex] isEditable])
    {
      [self editColumn:clickedColumnIndex row:clickedRowIndex withEvent:theEvent select:NO];
    }
  }
  
}

- (void)mouseUp:(NSEvent *)theEvent
{
   
}

- (void)selectRowIndexes:(NSIndexSet *)indexes byExtendingSelection:(BOOL)extend
{
  if (extend)
  {
    [_selectedRowIndexes addIndexes:indexes];
  }
  else
  {
    [_selectedRowIndexes removeAllIndexes];
    [_selectedRowIndexes addIndexes:indexes];    
  }
  
  [self setNeedsDisplay:YES];
}

- (void)deselectRow:(NSInteger)rowIndex
{
  [_selectedRowIndexes removeIndex:rowIndex];
  [self setNeedsDisplay:YES];
}
      
// MARK: Editing cells
- (void)editColumn:(NSInteger)columnIndex row:(NSInteger)rowIndex withEvent:(NSEvent *)theEvent select:(BOOL)flag
{
  NSLog(@"editing tableview");
  
  NSTableColumn  *columnToEdit = [_tableColumns objectAtIndex:columnIndex];
  NSCell     *cellToEdit;
  
  if (!columnToEdit)
    return;
  
  if (rowIndex < 0)
    return;
  
  _editedColumn = columnIndex;
  _editedRow = rowIndex;
  
  NSRect *editingFrame = [self frameOfCellAtColumn:columnIndex row:rowIndex];
  cellToEdit = [columnToEdit dataCellForRow:rowIndex];
  
  NSLog(editingFrame);
  
  [cellToEdit setDrawsBackground:YES];
  [cellToEdit setBezeled:NO];
  [cellToEdit setBordered:YES];
  //[cellToEdit setBackgroundColor:_background
  [cellToEdit setObjectValue:[_dataSource tableView:self objectValueForTableColumn:columnIndex row:rowIndex]];
  
  _currentEditor = [[self window] fieldEditor:YES forObject:self];
  _currentEditor = [cellToEdit setUpFieldEditorAttributes:_currentEditor];
  
  if (flag)
    [cellToEdit selectWithFrame:editingFrame inView:self editor:_currentEditor delegate:self start:0 length:0];
  else
    [cellToEdit editWithFrame:editingFrame inView:self editor:_currentEditor delegate:self event:theEvent];
  
  [self setNeedsDisplay:YES];
}

- (NSInteger)editedColumn
{
  
}

- (NSInteger)editedRow
{
  
}

- (void)textDidEndEditing:(NSNotification *)aNotification
{
  NSLog(@"i was called...");
}

- (void)moveUp:(id)sender
{
  
  if ([_selectedRowIndexes firstIndex] < 1)
    return;
  
  NSInteger newIndex = [_selectedRowIndexes firstIndex] - 1;
  [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:newIndex] byExtendingSelection:NO];
}

- (void)moveUpAndModifySelection:(id)sender
{
  if ([_selectedRowIndexes firstIndex] < 1)
    return;
  
  NSInteger newIndex = [_selectedRowIndexes firstIndex] - 1;
  [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:newIndex] byExtendingSelection:YES];
}

- (void)moveDown:(id)sender
{
  if (_numberOfRows < ([_selectedRowIndexes firstIndex] + 2))
    return;
  
  NSInteger newIndex = [_selectedRowIndexes firstIndex] + 1;
  [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:newIndex] byExtendingSelection:NO];
}

- (void)moveDownAndModifySelection:(id)sender
{
  if (_numberOfRows < ([_selectedRowIndexes lastIndex] + 2))
    return;
  
  NSInteger newIndex = [_selectedRowIndexes lastIndex] + 1;
  [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:newIndex] byExtendingSelection:YES];
}

/*- (void)scrollPageDown:(id)sender
{
  [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:(_numberOfRows - 1)] byExtendingSelection:NO];
}

- (void)scrollPageUp:(id)sender
{
  [self selectRowIndexes:[[NSIndexSet alloc] initWithIndex:0] byExtendingSelection:NO];
}*/

- (void)selectAll:(id)sender
{
  NSIndexSet newIndexSet = [[NSMutableIndexSet alloc] initWithIndex:0];
  
  for (int i = 1; i < _numberOfRows; i++)
  {
    [newIndexSet addIndexes:[[NSIndexSet alloc] initWithIndex:i]];
  }
  [self selectRowIndexes:newIndexSet byExtendingSelection:NO];
}

@end


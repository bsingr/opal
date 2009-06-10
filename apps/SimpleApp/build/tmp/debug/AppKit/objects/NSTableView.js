var the_class = objc_allocateClassPair(NSControl, "NSTableView");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_superview", "NSView");
class_addIvar(the_class, "_subviews", "NSMutableArray");
class_addIvar(the_class, "_nextKeyView", "NSView");
class_addIvar(the_class, "_previousKeyView", "NSView");
class_addIvar(the_class, "_isHidden", "BOOL");
class_addIvar(the_class, "_postsNotificationOnFrameChange", "BOOL");
class_addIvar(the_class, "_postsNotificationOnBoundsChange", "BOOL");
class_addIvar(the_class, "_autoresizesSubviews", "BOOL");
class_addIvar(the_class, "_inLiveResize", "BOOL");
class_addIvar(the_class, "_autoresizingMask", "int");
class_addIvar(the_class, "_tag", "int");
class_addIvar(the_class, "_draggedTypes", "NSArray");
class_addIvar(the_class, "_defaultToolTipTag", "NSToolTipTag");
class_addIvar(the_class, "_toolTip", "NSString");
class_addIvar(the_class, "_invalidRect", "NSRect");
class_addIvar(the_class, "_validTransforms", "BOOL");
class_addIvar(the_class, "_transformFromWindow", "CGAffineTransform");
class_addIvar(the_class, "_transformToWindow", "CGAffineTransform");
class_addIvar(the_class, "_visibleRect", "NSRect");
class_addIvar(the_class, "_DOMContainer", "CGDOMElementRef");
class_addIvar(the_class, "_DOMGraphicsContext", "CGDOMElementRef");
class_addIvar(the_class, "_graphicsContext", "CGContextRef");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_dataSource", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_scrollView", "NSScrollView");
class_addIvar(the_class, "_headerView", "NSTableHeaderView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_tableColumns", "NSMutableArray");
class_addIvar(the_class, "_tableColumnViews", "NSMutableArray");
class_addIvar(the_class, "_numberOfRows", "NSUInteger");
class_addIvar(the_class, "_numberOfColumns", "NSUInteger");
class_addIvar(the_class, "_tableCells", "NSMutableArray");
class_addIvar(the_class, "_intercellSpacing", "NSSize");
class_addIvar(the_class, "_rowHeight", "NSUInteger");
class_addIvar(the_class, "_selectedRowIndexes", "NSMutableIndexSet");
class_addIvar(the_class, "_editedColumn", "NSUInteger");
class_addIvar(the_class, "_editedRow", "NSUInteger");
class_addIvar(the_class, "_drawsGrid", "BOOL");
class_addIvar(the_class, "_alternatingRowBackground", "BOOL");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSTvFlags");
if (flags & 0x20000000)
_drawsGrid = YES;
else
_drawsGrid = NO;

if (flags & 0x00800000)
_alternatingRowBackground = YES;
else
_alternatingRowBackground = NO;

_headerView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderView");
if (_headerView)
objc_msgSend(_headerView, "setTableView:", self);

_cornerView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCornerView");
_tableColumns = objc_msgSend(aCoder, "decodeObjectForKey:", "NSTableColumns");
_numberOfRows = 0;
_numberOfColumns = objc_msgSend(_tableColumns, "count");
/* for statement needs to go here*/return self;
}
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
with(self) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
_rowHeight = 16;
_numberOfRows = 0;
_numberOfColumns = 0;
_selectedRowIndexes = objc_msgSend(objc_msgSend(NSMutableIndexSet, "alloc"), "init");
objc_msgSend(self, "setIntercellSpacing:", NSMakeSize(3,2));
_tableCells = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_tableColumns = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_tableColumnViews = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);

}

return self;
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
with(self) {
if (_alternatingRowBackground)
{
var backgroundColors = objc_msgSend(NSColor, "controlAlternatingRowBackgroundColors");
if (_rowHeight)
{
var oddRow = YES;
var colorToDraw;
/* for statement needs to go here*/
}


}
else
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1), "set");
objc_msgSend(NSBezierPath, "fillRect:", dirtyRect);

}

if (_selectedRowIndexes)
{
var theHighlightedRows = objc_msgSend(_selectedRowIndexes, "indexes");
/* for statement needs to go here*/
}

if (_tableColumns && _drawsGrid)
{
/* for statement needs to go here*/
}

/* for statement needs to go here*/}
}, "void");

class_addMethod(the_class, "preparedCellAtColumn:row:", function(self, _cmd, column, row) {
with(self) {
var column = objc_msgSend(_tableColumns, "objectAtIndex:", column);
var dataCell = objc_msgSend(column, "dataCellForRow:", row);
objc_msgSend(dataCell, "setObjectValue:", objc_msgSend(_dataSource, "tableView:objectValueForTableColumn:row:", self, column, row));
if (objc_msgSend(self, "isRowSelected:", row))
{
objc_msgSend(dataCell, "setTextColor:", objc_msgSend(NSColor, "selectedTextColor"));

}
else
{
objc_msgSend(dataCell, "setTextColor:", objc_msgSend(NSColor, "textColor"));

}

return dataCell;
}
}, "void");

class_addMethod(the_class, "isRowSelected:", function(self, _cmd, rowIndex) {
with(self) {
if (objc_msgSend(_selectedRowIndexes, "containsIndex:", rowIndex))
return YES;
else
return NO;

}
}, "void");

class_addMethod(the_class, "tile", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIntercellSpacing:", function(self, _cmd, aSize) {
with(self) {
_intercellSpacing = aSize;
}
}, "void");

class_addMethod(the_class, "intercellSpacing", function(self, _cmd) {
with(self) {
return _intercellSpacing;
}
}, "void");

class_addMethod(the_class, "setRowHeight:", function(self, _cmd, rowHeight) {
with(self) {
_rowHeight = rowHeight;
}
}, "void");

class_addMethod(the_class, "rowHeight", function(self, _cmd) {
with(self) {
return _rowHeight;
}
}, "void");

class_addMethod(the_class, "addTableColumn:", function(self, _cmd, aColumn) {
with(self) {
var i = 0;
var xOffset = 0;
/* for statement needs to go here*/objc_msgSend(_tableColumns, "addObject:", aColumn);
_numberOfColumns = objc_msgSend(_tableColumns, "count");
objc_msgSend(self, "reloadData");
}
}, "void");

class_addMethod(the_class, "removeTableColumn:", function(self, _cmd, aTableColumn) {
with(self) {
}
}, "void");

class_addMethod(the_class, "tableColumns", function(self, _cmd) {
with(self) {
return _tableColumns;
}
}, "void");

class_addMethod(the_class, "numberOfRows", function(self, _cmd) {
with(self) {
return _numberOfRows;
}
}, "void");

class_addMethod(the_class, "numberOfColumns", function(self, _cmd) {
with(self) {
return _numberOfColumns;
}
}, "void");

class_addMethod(the_class, "setDataSource:", function(self, _cmd, anObject) {
with(self) {
_dataSource = anObject;
objc_msgSend(self, "reloadData");
}
}, "void");

class_addMethod(the_class, "dataSource", function(self, _cmd) {
with(self) {
return _dataSource;
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
with(self) {
_delegate = anObject;
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
return _delegate;
}
}, "void");

class_addMethod(the_class, "reloadData", function(self, _cmd) {
with(self) {
if (!_dataSource)
return ;

if (!objc_msgSend(_dataSource, "respondsToSelector:", "selector:"))
return ;

_numberOfRows = objc_msgSend(_dataSource, "numberOfRowsInTableView:", self);
objc_msgSend(self, "setNeedsDisplay:", YES);
if (_headerView)
objc_msgSend(_headerView, "setNeedsDisplay:", YES);

}
}, "void");

class_addMethod(the_class, "setHeaderView:", function(self, _cmd, aHeaderView) {
with(self) {
_headerView = aHeaderView;
objc_msgSend(_headerView, "setTableView:", self);
}
}, "void");

class_addMethod(the_class, "headerView", function(self, _cmd) {
with(self) {
return _headerView;
}
}, "void");

class_addMethod(the_class, "frameOfCellAtColumn:row:", function(self, _cmd, columnIndex, rowIndex) {
with(self) {
var columnRect = objc_msgSend(self, "rectOfColumn:", columnIndex);
var rowRect = objc_msgSend(self, "rectOfRow:", rowIndex);
return NSMakeRect(columnRect.origin.x,rowRect.origin.y,columnRect.size.width,rowRect.size.height);
}
}, "void");

class_addMethod(the_class, "rectOfColumn:", function(self, _cmd, columnIndex) {
with(self) {
var columnRect = NSMakeRect(_bounds.origin.x,_bounds.origin.y,0,_bounds.size.height);
/* for statement needs to go here*/columnRect.size.width = objc_msgSend(objc_msgSend(_tableColumns, "objectAtIndex:", columnIndex), "width") + _intercellSpacing.width;
return columnRect;
}
}, "void");

class_addMethod(the_class, "rectOfRow:", function(self, _cmd, rowIndex) {
with(self) {
var rowRect = NSMakeRect(_bounds.origin.x,_bounds.size.height + _bounds.origin.x,_bounds.size.width,_rowHeight);
var eachRowHeight = 18;
var yOffset = eachRowHeight * rowIndex;
rowRect.origin.y = _bounds.size.height - yOffset - eachRowHeight - 1;
rowRect.size.height = eachRowHeight + _intercellSpacing.height;
return rowRect;
}
}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
with(self) {
if (context == "selectionIndexes")
{
if (!objc_msgSend(_selectedRowIndexes, "isEqualToIndexSet:", objc_msgSend(object, "valueForKeyPath:", keyPath)))
{
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(object, "valueForKeyPath:", keyPath), NO);

}


}
else
{

}

}
}, "void");

class_addMethod(the_class, "columnAtPoint:", function(self, _cmd, aPoint) {
with(self) {
/* for statement needs to go here*/return -1;
}
}, "void");

class_addMethod(the_class, "rowAtPoint:", function(self, _cmd, aPoint) {
with(self) {
/* for statement needs to go here*/return -1;
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
objc_msgSend(_window, "makeFirstResponder:", self);
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
var clickedColumnIndex = objc_msgSend(self, "columnAtPoint:", location);
var clickedRowIndex = objc_msgSend(self, "rowAtPoint:", location);
var clickedColumn = objc_msgSend(_tableColumns, "objectAtIndex:", clickedColumnIndex);
var clickedCell = objc_msgSend(clickedColumn, "dataCellForRow:", clickedRowIndex);
if (objc_msgSend(theEvent, "clickCount") < 2)
{
if (objc_msgSend(theEvent, "modifierFlags") & NSShiftKeyMask)
{

}
else
if (objc_msgSend(theEvent, "modifierFlags") & (NSCommandKeyMask | NSAlternateKeyMask))
{
if (objc_msgSend(self, "isRowSelected:", clickedRowIndex))
{
objc_msgSend(self, "deselectRow:", clickedRowIndex);

}
else
{
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", clickedRowIndex), YES);

}


}
else
{
NSLog("here");
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", clickedRowIndex), NO);

}



}
else
if (objc_msgSend(theEvent, "clickCount") == 2)
{
if (objc_msgSend(objc_msgSend(_tableColumns, "objectAtIndex:", clickedColumnIndex), "isEditable"))
{
objc_msgSend(self, "editColumn:row:withEvent:select:", clickedColumnIndex, clickedRowIndex, theEvent, NO);

}


}


}
}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectRowIndexes:byExtendingSelection:", function(self, _cmd, indexes, extend) {
with(self) {
if (extend)
{
objc_msgSend(_selectedRowIndexes, "addIndexes:", indexes);

}
else
{
objc_msgSend(_selectedRowIndexes, "removeAllIndexes");
objc_msgSend(_selectedRowIndexes, "addIndexes:", indexes);

}

objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "deselectRow:", function(self, _cmd, rowIndex) {
with(self) {
objc_msgSend(_selectedRowIndexes, "removeIndex:", rowIndex);
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "editColumn:row:withEvent:select:", function(self, _cmd, columnIndex, rowIndex, theEvent, flag) {
with(self) {
NSLog("editing tableview");
var columnToEdit = objc_msgSend(_tableColumns, "objectAtIndex:", columnIndex);
var cellToEdit;
if (!columnToEdit)
return ;

if (rowIndex < 0)
return ;

_editedColumn = columnIndex;
_editedRow = rowIndex;
var editingFrame = objc_msgSend(self, "frameOfCellAtColumn:row:", columnIndex, rowIndex);
cellToEdit = objc_msgSend(columnToEdit, "dataCellForRow:", rowIndex);
NSLog(editingFrame);
objc_msgSend(cellToEdit, "setDrawsBackground:", YES);
objc_msgSend(cellToEdit, "setBezeled:", NO);
objc_msgSend(cellToEdit, "setBordered:", YES);
objc_msgSend(cellToEdit, "setObjectValue:", objc_msgSend(_dataSource, "tableView:objectValueForTableColumn:row:", self, columnIndex, rowIndex));
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
_currentEditor = objc_msgSend(cellToEdit, "setUpFieldEditorAttributes:", _currentEditor);
if (flag)
objc_msgSend(cellToEdit, "selectWithFrame:inView:editor:delegate:start:length:", editingFrame, self, _currentEditor, self, 0, 0);
else
objc_msgSend(cellToEdit, "editWithFrame:inView:editor:delegate:event:", editingFrame, self, _currentEditor, self, theEvent);

objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "editedColumn", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "editedRow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textDidEndEditing:", function(self, _cmd, aNotification) {
with(self) {
NSLog("i was called...");
}
}, "void");

class_addMethod(the_class, "moveUp:", function(self, _cmd, sender) {
with(self) {
if (objc_msgSend(_selectedRowIndexes, "firstIndex") < 1)
return ;

var newIndex = objc_msgSend(_selectedRowIndexes, "firstIndex") - 1;
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), NO);
}
}, "void");

class_addMethod(the_class, "moveUpAndModifySelection:", function(self, _cmd, sender) {
with(self) {
if (objc_msgSend(_selectedRowIndexes, "firstIndex") < 1)
return ;

var newIndex = objc_msgSend(_selectedRowIndexes, "firstIndex") - 1;
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), YES);
}
}, "void");

class_addMethod(the_class, "moveDown:", function(self, _cmd, sender) {
with(self) {
if (_numberOfRows < (objc_msgSend(_selectedRowIndexes, "firstIndex") + 2))
return ;

var newIndex = objc_msgSend(_selectedRowIndexes, "firstIndex") + 1;
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), NO);
}
}, "void");

class_addMethod(the_class, "moveDownAndModifySelection:", function(self, _cmd, sender) {
with(self) {
if (_numberOfRows < (objc_msgSend(_selectedRowIndexes, "lastIndex") + 2))
return ;

var newIndex = objc_msgSend(_selectedRowIndexes, "lastIndex") + 1;
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), YES);
}
}, "void");

class_addMethod(the_class, "selectAll:", function(self, _cmd, sender) {
with(self) {
var newIndexSet = objc_msgSend(objc_msgSend(NSMutableIndexSet, "alloc"), "initWithIndex:", 0);
/* for statement needs to go here*/objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", newIndexSet, NO);
}
}, "void");


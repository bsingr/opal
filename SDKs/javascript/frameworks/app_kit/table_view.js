/* 
 * table_view.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

include('app_kit/view');

// NSTableViewColumnAutoresizingStyle
var NSTableViewNoColumnAutoresizing                         = 0;
var NSTableViewUniformColumnAutoresizingStyle               = 1;
var NSTableViewSequentialColumnAutoresizingStyle            = 2;
var NSTableViewReverseSequentialColumnAutoresizingStyle     = 3;
var NSTableViewLastColumnOnlyAutoresizingStyle              = 4;
var NSTableViewFirstColumnOnlyAutoresizingStyle             = 5;

// gridstylemask
var NSTableViewGridNone                                     = 0;
var NSTableViewSolidVerticalGridLineMask                    = 1 << 0;
var NSTableViewSolidHorizontalGridLineMask                  = 1 << 1;

// NSTableViewSelectionHighlightStyle
var NSTableViewSelectionHighlightStyleRegular               = 0;
var NSTableViewSelectionHighlightStyleSourceList            = 1;


/*
 * Tableview delegate notifications
 */
var NSTableViewSelectionDidChangeNotification               = "NSTableViewSelectionDidChangeNotification";
var NSTableViewColumnDidMoveNotification                    = "NSTableViewColumnDidMoveNotification";
var NSTableViewColumnDidResizeNotification                  = "NSTableViewColumnDidResizeNotification";
var NSTableViewSelectionIsChangingNotification              = "NSTableViewSelectionIsChangingNotification";



var NSTableView = NSView.extend({
    
    _drawsGrid: null,
    
    _alternatingRowBackground: null,
    
    _headerView: null,
    
    _cornerView: null,
    
    _tableColumns: null,
    
    _numberOfRows: null,
    
    _numberOfColumns: null,
    
    _backgroundColor: null,
    
    _delegate: null,
    
    _dataSource: null,
    
    _intercellSpacing: null,
    
    _rowHeight: null,
    
    _lastSelectedColumn: null,
    
    _lastSelectedRow: null,
    
    _editingRow: null,
    
    _editingColumn: null,
    
    _selectedColumns: null,
    
    _selectedRows: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        
        var flags = aCoder.decodeIntForKey("NSTvFlags");
        
        this._drawsGrid = (flags & 0x20000000) ? true : false;
        this._alternatingRowBackground = (flags & 0x00800000) ? true : false;
        
        this._gridColor = aCoder.decodeObjectForKey("NSGridColor");
        
        this._backgroundColor = NSColor.whiteColor();
        
        this._rowHeight = aCoder.decodeDoubleForKey("NSRowHeight");
        
        this._headerView = aCoder.decodeObjectForKey("NSHeaderView");
        
        if (this._headerView)
            this._headerView.setTableView(this);
        
        this._cornerView = aCoder.decodeObjectForKey("NSCornerView");
        this._tableColumns = aCoder.decodeObjectForKey("NSTableColumns");
        
        this._numberOfRows = -1;
        this._numberOfColumns = this._tableColumns.length;
        
        this._intercellSpacing = NSMakeSize(2, 2);
        
        for (var idx = 0; idx < this._numberOfColumns; idx++) {
            // do we need this?
            this._tableColumns[idx].setTableView(this);
        }
        
        return this;
    },
    
    /**
        Sets the datasource, conforming to NSTableViewDataSource.
    */
    setDataSource: function(aSource) {
        this._dataSource = aSource;
		this.reloadData();
    },
    
    dataSource: function() {
        return this._dataSource;
    },
    
    /*
        Sets the delegate conforming to NSTableViewDelegate.
    */
    setDelegate: function(delegate) {
        this._delegate = delegate;
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    setHeaderView: function(headerView) {
        this._headerView = headerView;
    },
    
    headerView: function() {
        return this._headerView;
    },
    
    setCornerView: function(cornerView) {
        this._cornerview = cornerView;
    },
    
    cornerView: function() {
        return this._cornerView;
    },
    
    setAllowsColumnReordering: function(flag) {
        
    },
    
    allowsColumnReordering: function() {
        
    },
    
    setAllowsColumnResizing: function(flag) {
        
    },
    
    allowsColumnResizing: function() {
        
    },

    setColumnAutoresizingStyle: function(style) {
        
    },
    
    columnAutoresizingStyle: function() {
        
    },
    
    setGridStyleMask: function(gridType) {
        
    },
    
    gridStyleMask: function() {
        
    },
    
    setIntercellSpacing: function(aSize) {
        this._intercellSpacing = aSize;
    },
    
    intercellSpacing: function() {
        return this._intercellSpacing;
    },
    
    setUsesAlternatingRowBackgroundColors: function(flag) {
        
    },
    
    usesAlternatingRowBackgroundColors: function() {
        
    },
    
    setBackgroundColor: function(aColor) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setGridColor: function(aColor) {
        
    },
    
    gridColor: function() {
        
    },
    
    setRowHeight: function(rowHeight) {
        
    },
    
    rowHeight: function() {
        
    },
    
    noteHeightOfRowsWithIndexesChanged: function(indexSet) {
        
    },
    
    tableColumns: function() {
        return this._tableColumns;
    },
    
    numberOfColumns: function() {
        return this._numberOfColumns;
    },
    
    numberOfRows: function() {
        if (this._numberOfRows < 0) {
			if (this._dataSource) {
				if (this._dataSource.respondsTo('numberOfRowsInTableView')) {
					this._numberOfRows = this._dataSource.numberOfRowsInTableView(this);   
				}
				else {
					console.log("TableView's datasource does not respond to numberOfRowsInTableView")
					this._numberOfRows = 0;
				}
			}
			else {
				this._numberOfRows = 0;
			}
		}
		
		return this._numberOfRows;
    },
    
    addTableColumn: function(tableColumn) {
        
    },
    
    removeTableColumn: function(tableColumn) {
        
    },
    
    moveColumn: function(oldIndex, newIndex) {
        
    },
    
    columnWithIdentifier: function(identifier) {
        
    },
    
    tableColumnWithIdentifier: function(identifier) {
        
    },
    
    tile: function() {
        
    },
    
    sizeToFit: function() {
        
    },
    
    sizeLastColumnToFit: function() {
        
    },
    
    scrollRowToVisible: function(row) {
        
    },
    
    scrollColumnToVisible: function(column) {
        
    },
    
    reloadData: function() {
        this._numberOfRows = -1;
		this.noteNumberOfRowsChanged();
		this.setNeedsDisplay(true);
		this._headerView.setNeedsDisplay(true);
    },
    
    noteNumberOfRowsChanged: function() {
        
    },
    
    editedColumn: function() {
        
    },
    
    editedRow: function() {
        
    },
    
    clickedColumn: function() {
        
    },
    
    clickedRow: function() {
        
    },
    
    setDoubleAction: function(anAction) {
        
    },
    
    doubleAction: function() {
        
    },
    
    setSortDescriptors: function(array) {
        
    },
    
    sortDescriptors: function() {
        
    },
    
    setIndicatorImageInTableColumn: function(anImage, tableColumn) {
        
    },
    
    indicatorImageInTableColumn: function(tableColumn) {
        
    },
    
    setHighlightedTableColumn: function(tableColumn) {
        
    },
    
    highlightedTableColumn: function() {
        
    },
    
    /*
        Drag an drop
    */
    setVerticalMotionCanBeginDrag: function(flag) {
        
    },
    
    verticalMotionCanBeginDrag: function() {
        
    },
    
    canDragRowsWithIndexes: function(rowIndexes, mouseDownPoint) {
        
    },
    
    dragImageForRowsWithIndexes: function(dragRows, tableColumns, theEvent, dragImageOffset) {
        
    },
    
    setDraggingSourceOperationMask: function(mask, isLocal) {
        
    },
    
    setDropRow: function(row, dropOperation) {
        
    },
    
    /*
        Selection
    */
    setAllowsMultipleSelection: function(flag) {
        
    },
    
    allowsMultipleSelection: function() {
        
    },
    
    setAllowsEmptySelection: function(flag) {
        
    },
    
    allowsEmptySelection: function() {
        
    },
    
    setAllowsColumnSelection: function(flag) {
        
    },
    
    allowsColumnSelection: function() {
        
    },
    
    selectAll: function(sender) {
        
    },
    
    deselectAll: function(sender) {
        
    },
    
    selectColumnIndexes: function(indexes, extendSelection) {
        
    },
    
    selectRowIndexes: function(indexes, extendSelection) {
        
    },
    
    selectedColumnIndexes: function() {
        
    },
    
    selectedRowIndexes: function() {
        
    },
    
    deselectColumn: function(column) {
        
    },
    
    deselectRow: function(row) {
        
    },
    
    selectedColumn: function() {
        
    },
    
    selectedRow: function() {
        
    },
    
    isColumnSelected: function(column) {
        
    },
    
    isRowSelected: function(row) {
        
    },
    
    numberOfSelectedColumns: function() {
        
    },
    
    numberOfSelectedRows: function() {
        
    },
    
    allowsTypeSelect: function() {
        
    },
    
    setAllowsTypeSelect: function(flag) {
        
    },
    
    selectionHighlightStyle: function() {
        
    },
    
    setSelectionHighlightStyle: function(selectionHighlightStyle) {
        
    },
    
    rectOfColumn: function(column) {
        var theRect = NSMakeRect(0, 0, 0, 0);
        
        if (column < 0 || column > this._tableColumns.length)
            throw "NSTableView -rectOfColumn invalidIndex: " + column;
        
        for (var idx = 0; idx < column; idx++)
            theRect.origin.x += this._tableColumns[idx].width() + this._intercellSpacing.width;
        
        for (var idx = 0; idx < this.numberOfRows(); idx++)
            theRect.size.height += this._rowHeight + this._intercellSpacing.height;
        
        theRect.origin.y = 0.0;
        theRect.size.width = this._tableColumns[column].width() + this._intercellSpacing.width;
        
        return theRect;
    },
    
    rectOfRow: function(row) {
		var theRect = NSMakeRect(0, 0, 0, 0);
	
		// if index outside valid range, return zero rect
        if (row < 0 || row > this.numberOfRows())
			return theRect;
		
		for (var idx = 0; idx < this._tableColumns.length; idx ++)
			theRect.size.width += this._tableColumns[idx].width() + this._intercellSpacing.width;
		
		theRect.origin.y = this.bounds().origin.y + ((this._rowHeight + this._intercellSpacing.height) * row);
		theRect.size.height = this._rowHeight + this._intercellSpacing.height;
		theRect.origin.x = this.bounds().origin.x;
		
		return theRect;
    },
    
    columnIndexesInRect: function(rect) {
        return NSMakeRange(0, 2);
    },
    
    rowsInRect: function(rect) {
        return NSMakeRange(0, 5);
    },
    
    columnAtPoint: function(point) {
        
    },
    
    rowAtPoint: function(point) {
        
    },
    
    frameOfCellAtColumnRow: function(column, row) {
        var theRect = NSMakeRect(0, 0, 0, 0);
        
        if (column < 0 || column > this.numberOfColumns())
            return theRect;
        
        if (row < 0 || row > this.numberOfRows())
            return theRect;
        
        for (var idx = 0; idx < column; idx++)
            theRect.origin.x += this._tableColumns[idx].width() + this._intercellSpacing.width;
        
        for (var idx = 0; idx < row; idx++)
            theRect.origin.y += this._rowHeight + this._intercellSpacing.height;
        
        theRect.size.width = this._tableColumns[column].width() + this._intercellSpacing.width;
        theRect.size.height += this._rowHeight + this._intercellSpacing.height;
        
        return theRect;
    },
    
    preparedCellAtColumnRow: function(column, row) {
        var dataCell = this._tableColumns[column].dataCellForRow(row);
        dataCell.setObjectValue(this.dataSourceObjectValueForColumnRow(column, row));
        return dataCell;        
    },
    
    dataSourceObjectValueForColumnRow: function(column, row) {
        if (this._dataSource && this._dataSource.respondsTo('tableViewObjectValueForTableColumnRow'))
            return this._dataSource.tableViewObjectValueForTableColumnRow(this, column, row);
        
        console.log('Tableview data source does not respond to tableViewObjectValueForTableColumnRow');
        return null;
    },

    /*
        Text delegate methods
    */
    textShouldBeginEditing: function(textObject) {
        
    },
    
    textShouldEndEditing: function(textObject) {
        
    },
    
    textDidBeginEditing: function(aNotification) {
        
    },
    
    textDidEndEditing: function(aNotification) {
        
    },
    
    textDidChange: function(aNotification) {
        
    },
    
    // 
    
    setAutosaveName: function(name) {
        
    },
    
    autosaveName: function() {
        
    },
    
    setAutosaveTableColumns: function(flag) {
        
    },
    
    autosaveTableColumns: function() {
        
    },
    
    focusedColumn: function() {
        
    },
    
    // 
    editColumnRow: function(column, row, theEvent, select) {
        
    },
    
    drawRect: function(clipRect) {
        // draw background
        this.drawBackgroundInClipRect(clipRect);
        // draw grid
        this.drawGridInClipRect(clipRect);
        
        // draw highlighted row backgrounds (each row is drawn on top of this)
        
        // draw each row
        if (this.numberOfRows() > 0) {
            var visibleRows = this.rowsInRect(clipRect);
            console.log(visibleRows);
            if (visibleRows.length > 0) {
                for (var idx = visibleRows.location; idx < visibleRows.location + visibleRows.length; idx++) {
                    this.drawRowInClipRect(idx, clipRect);
                }
            }
        }
    },
    
    drawRowInClipRect: function(row, clipRect) {
        var visibleColumns = this.columnIndexesInRect(clipRect);
        
        if (row < 0 || row >= this.numberOfRows()) {
            console.log('Invalid row number in table. ' + row);
            return;
        }
        
        for (var idx = visibleColumns.location; idx < visibleColumns.location + visibleColumns.length; idx++) {
            var dataCell = this.preparedCellAtColumnRow(idx, row);
            var cellRect = this.frameOfCellAtColumnRow(idx, row);
            
            if (this._delegate && this._delegate.respondsTo('tableViewWillDisplayCell')) {
                this._delegate.tableViewWillDisplayCell(this, dataCell, this._tableColumns[idx], row);
            }
                
            dataCell.drawWithFrame(cellRect, this);
        }
        
        // draw only visible columns.
        // NSRange visibleColumns = [self columnsInRect:clipRect];
        //         int drawThisColumn = visibleColumns.location;
        //         NSInteger numberOfRows=[self numberOfRows];
        // 
        //         if (row < 0 || row >= numberOfRows)
        //             [NSException raise:NSInvalidArgumentException
        //                         format:@"invalid row in drawRow:clipRect:"];
        // 
        //         while (drawThisColumn < NSMaxRange(visibleColumns)) {
        //            if (!(row == _editedRow && drawThisColumn == _editedColumn)) {
        //               NSCell *dataCell=[self preparedCellAtColumn:drawThisColumn row:row];
        //               NSTableColumn *column = [_tableColumns objectAtIndex:drawThisColumn];
        //               NSRect cellRect = [self _adjustedFrame:[self frameOfCellAtColumn:drawThisColumn row:row] forCell:dataCell];
        //               if ([_delegate respondsToSelector:@selector(tableView:willDisplayCell:forTableColumn:row:)])
        //                  [_delegate tableView:self willDisplayCell:dataCell forTableColumn:column row:row];
        // 
        //               [dataCell drawWithFrame:cellRect inView:self];
        //            }
        //            drawThisColumn++;
        //         }
                
    },
    
    highlightSelectionInClipRect: function(clipRect) {
        
    },
    
    drawGridInClipRect: function(clipRect) {
        
        if (this._drawsGrid) {
            var c = NSGraphicsContext.currentContext().graphicsPort();
            CGContextBeginPath(c);
            CGContextSetStrokeColorWithColor(c, this._gridColor);
            
            var columnsToDraw = this.columnIndexesInRect(clipRect);
            for (var idx = columnsToDraw.location; idx < columnsToDraw.location + columnsToDraw.length; idx++) {
                var theRect = this.rectOfColumn(idx);
                var columnX = theRect.origin.x + theRect.size.width - 0.5; // draw not in line center (draws 1px instead of 2px)
                
                CGContextMoveToPoint(c, NSMakePoint(columnX, clipRect.origin.y));
                CGContextAddLineToPoint(c, NSMakePoint(columnX, clipRect.origin.y + clipRect.size.height));            
            }   
            CGContextStrokePath(c);
        }
    },
    
    drawBackgroundInClipRect: function(clipRect) {
        if (this._backgroundColor) {
            var c = NSGraphicsContext.currentContext().graphicsPort();
            
            if (!this._alternatingRowBackground) {
                CGContextSetFillColorWithColor(c, this._backgroundColor);
                CGContextFillRect(c, clipRect);
            }
            else {
                var altColors = NSColor.controlAlternatingRowBackgroundColors();
                var rowsInRect = this.rowsInRect(clipRect);
                
                for (var idx = rowsInRect.location; idx < rowsInRect.location + rowsInRect.length; idx++) {
                    CGContextSetFillColorWithColor(c, altColors[idx % altColors.length]);
                    CGContextFillRect(c, this.rectOfRow(idx));
                }
            }
        }
    }
});

var NSTableViewDelegate = {
    
    tableViewWillDisplayCell: function(tableView, cell, tableColumn, row) {
    },
    
    tableViewShouldEditTableColumn: function(tableView, tableColumn, row) {
    },
    
    selectionShouldChangeInTableView: function(tableView) {
    },
    
    tableViewShouldSelectRow: function(tableView, row) {
    },
    
    tableViewSelectionIndexesForProposedSelection: function(tableView, proposedIndexes) {
    },
    
    tableViewShouldSelectTableColumn: function(tableView, tableColumn) {
    },
    
    tableViewMouseDownInHeaderOfTableColumn: function(tableview, tableColumn) {
    },
    
    tableViewDidClickTableColumn: function(tableview, tableColumn) {
    },
    
    tableViewDidDragTableColumn: function(tableview, tablecolumn) {
    },
    
    tableViewToolTipForCell: function(tableview, cell, rect, tableColumn, row, mouseLocation) {
    },
    
    tableViewHeightOfRow: function(tableview, row) {
    },
    
    tableViewTypeSelectStringForTableColumn: function(tableview, tableColumn, row) {
    },
    
    tableviewNextTypeSelectMatchFromRow: function(tableview, startRow, endRow, searchString) {
    },
    
    tableViewShouldTypeSelectForEvent: function(tableView, theEvent, searchString) {
    },
    
    tableViewShouldShowCellExpansionForTableColumn: function(tableView, tableColumn, row) {
    },
    
    tableViewShouldTrackCell: function(tableView, cell, tableColumn, row) {
    },
    
    tableViewDataCellForTableColumn: function(tableView, tableColumn, row) {
    },
    
    tableViewIsGroupRow: function(tableView, row) {
    },
    
    /**
        Notification
    */
    tableViewSelectionDidChange: function(aNotification) {
    },
    
    tableViewColumnDidMove: function(aNotification) {
    },
    
    tableViewColumnDidResize: function(aNotification) {
    },
    
    tableViewSelectionIsChanging: function(aNotification) {
    }
};


var NSTableViewDataSource = {
    
    /*
        Required.
    */
    numberOfRowsInTableView: function(tableView) {
    },
    
    /*
        Required.
    */
    tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
    },
    
    tableViewSetObjectValueFor: function(tableView, objectValue, tableColumn, row) {
    },
    
    tableViewSortDescriptorsDidChange: function(tableView, oldDescriptors) {
    },
    
    tableViewWriteRowsWithIndexesToPasteboard: function(tableView, rowIndexes, pboard) {
    },
    
    tableViewValidateDrop: function(tableView, info, row, dropOperation) {
    },
    
    tableViewAcceptDrop: function(tableView, info, row, dropOperation) {
    }  
};

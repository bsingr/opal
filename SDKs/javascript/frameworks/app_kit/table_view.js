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

// Tableview delegate notifications
var NSTableViewSelectionDidChangeNotification               = "NSTableViewSelectionDidChangeNotification";
var NSTableViewColumnDidMoveNotification                    = "NSTableViewColumnDidMoveNotification";
var NSTableViewColumnDidResizeNotification                  = "NSTableViewColumnDidResizeNotification";
var NSTableViewSelectionIsChangingNotification              = "NSTableViewSelectionIsChangingNotification";


/**
    @class NSTableView
    @extends NSView
*/
var NSTableView = NSControl.extend({
    
    /**
        @type Boolean
    */
    _drawsGrid: null,
    
    /**
        @@type Boolean
    */
    _alternatingRowBackground: null,
    
    /**
        @type NSTableHeaderView
    */
    _headerView: null,
    
    /**
        @type NSView
    */
    _cornerView: null,
    
    /**
        @type NSArray
    */
    _tableColumns: null,
    
    /**
        @type Integer
    */
    _numberOfRows: null,
    
    /**
        @type Integer
    */
    _numberOfColumns: null,
    
    /**
        @type NSColor
    */
    _backgroundColor: null,
    
    /**
        @type NSObject
    */
    _delegate: null,
    
    /**
        @type NSObject
    */
    _dataSource: null,
    
    /**
        @type NSSize
    */
    _intercellSpacing: null,
    
    /**
        @type Float
    */
    _rowHeight: null,
    
    /**
        @type Integer
    */
    _lastSelectedColumn: null,
    
    /**
        @type Integer
    */
    _lastSelectedRow: null,
    
    /**
        @type 
    */
    _editingRow: null,
    
    /**
        @type
    */
    _editingColumn: null,
    
    /**
        A set of all selected Columns
        
        @type NSIndexSet
    */
    _selectedColumns: null,
    
    /**
        A set of all selected Rows
    
        @type NSIndexSet
    */
    _selectedRows: null,
    
    /**
        Array of all the rows in the table view (elements)
        
        @type NSArray
    */
    _tableViewRowRenderContexts: null,
    
    /**
        @param {NSCoder} aCoder
        @returns NSTableView
    */
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        
        var flags = aCoder.decodeIntForKey("NSTvFlags");
        
        this._drawsGrid = (flags & 0x20000000) ? true : false;
        this._alternatingRowBackground = (flags & 0x00800000) ? true : false;
        
        this._gridColor = aCoder.decodeObjectForKey("NSGridColor");
        
        this._backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
        
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
        
        this._selectedRows = NSIndexSet.indexSet();
        this._selectedColumns = NSIndexSet.indexSet();
        
        return this;
    },
    
    /**
        Sets the datasource, conforming to NSTableViewDataSource.
        
        @param {NSObject} <NSTableViewDataSource> aSource
    */
    setDataSource: function(aSource) {
        this._dataSource = aSource;
		this.reloadData();
    },
    
    /**
        @returns NSObject <NSTableViewDataSource>
    */
    dataSource: function() {
        return this._dataSource;
    },
    
    /**
        Sets the delegate conforming to NSTableViewDelegate.
        
        @param {NSObject} <NSTableViewDelegate> delegate
    */
    setDelegate: function(delegate) {
        if (this._delegate == delegate)
            return;
        
        var nc = NSNotificationCenter.defaultCenter();
        
        if (this._delegate) {
            nc.removeObserver(this._delegate, NSTableViewSelectionDidChangeNotification, this);
            nc.removeObserver(this._delegate, NSTableViewColumnDidMoveNotification, this);
            nc.removeObserver(this._delegate, NSTableViewColumnDidResizeNotification, this);
            nc.removeObserver(this._delegate, NSTableViewSelectionIsChangingNotification, this);
        }
        
        this._delegate = delegate;
        
        if (this._delegate.respondsTo('tableViewSelectionDidChange'))
            nc.addObserver(this._delegate, 'tableViewSelectionDidChange', NSTableViewSelectionDidChangeNotification, this);
        
        if (this._delegate.respondsTo('tableViewColumnDidMove'))
            nc.addObserver(this._delegate, 'tableViewColumnDidMove', NSTableViewColumnDidMoveNotification, this);
            
        if (this._delegate.respondsTo('tableViewColumnDidResize'))
            nc.addObserver(this._delegate, 'tableViewColumnDidResize', NSTableViewColumnDidResizeNotification, this);
        
        if (this._delegate.respondsTo('tableViewSelectionIsChanging'))
            nc.addObserver(this._delegate, 'tableViewSelectionIsChanging', NSTableViewSelectionIsChangingNotification, this);
    },
    
    /**
        @returns NSObject <NSTableViewDelegate>
    */
    delegate: function() {
        return this._delegate;
    },
    
    /**
        @param {NSTableHeaderView} headerView
    */
    setHeaderView: function(headerView) {
        this._headerView = headerView;
        this._headerView.setTableView(this);
        this.enclosingScrollView().tile();
    },
    
    /**
        @returns NSTableHeaderView
    */
    headerView: function() {
        return this._headerView;
    },
    
    /**
        @param {NSView} cornerView
    */
    setCornerView: function(cornerView) {
        this._cornerview = cornerView;
        this.enclosingScrollView().tile();
    },
    
    /**
        @returns NSView
    */
    cornerView: function() {
        return this._cornerView;
    },
    
    /**
        @param {Boolean} flag
    */
    setAllowsColumnReordering: function(flag) {
        this._allowsColumnReordering = flag;
    },
    
    /**
        @returns Boolean
    */
    allowsColumnReordering: function() {
        return this._allowsColumnReordering;
    },
    
    /**
        @param {Boolean} flag
    */
    setAllowsColumnResizing: function(flag) {
        this._allowsColumnResizing = flag;
    },
    
    /**
        @returns Boolean
    */
    allowsColumnResizing: function() {
        return this._allowsColumnResizing;
    },

    setColumnAutoresizingStyle: function(style) {
        
    },
    
    columnAutoresizingStyle: function() {
        
    },
    
    /**
        A value from gridstylemask above.
        
        @param {Integer} gridType
    */
    setGridStyleMask: function(gridType) {
        this._gridStyleMask = gridType;
    },
    
    /**
        @returns Integer
    */
    gridStyleMask: function() {
        return this._gridStyleMask;
    },
    
    /**
        @param {NSSize} aSize
    */
    setIntercellSpacing: function(aSize) {
        this._intercellSpacing = aSize;
    },
    
    /**
        @returns NSSize
    */
    intercellSpacing: function() {
        return this._intercellSpacing;
    },
    
    /**
        @param {Boolean} flag
    */
    setUsesAlternatingRowBackgroundColors: function(flag) {
        this._alternatingRowBackground = flag;
    },
    
    /**
        @returns Boolean
    */
    usesAlternatingRowBackgroundColors: function() {
        return this._alternatingRowBackground;
    },
    
    /**
        @param {NSColor} aColor
    */
    setBackgroundColor: function(aColor) {
        this._backgroundColor = aColor;
    },
    
    /**
        @returns NSColor
    */
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    /**
        @param {NSColor} aColor
    */
    setGridColor: function(aColor) {
        this._gridColor = aColor;
    },
    
    /**
        @returns NSColor
    */
    gridColor: function() {
        return this._gridColor;
    },
    
    /**
        @param {Float} rowHeight
    */
    setRowHeight: function(rowHeight) {
        this._rowHeight = rowHeight;
    },
    
    /**
        @returns Float
    */
    rowHeight: function() {
        return this._rowHeight;
    },
    
    /**
        @param {NSIndexSet} indexSet
    */
    noteHeightOfRowsWithIndexesChanged: function(indexSet) {
        
    },
    
    /**
        @returns NSArray
    */
    tableColumns: function() {
        return this._tableColumns;
    },
    
    /**
        @returns Integer
    */
    numberOfColumns: function() {
        return this._numberOfColumns;
    },
    
    /**
        @returns Integer
    */
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
    
    /**
        @param {NSTableColumn} tableColumn
    */
    addTableColumn: function(tableColumn) {
        this._tableColumns.push(tableColumn);
        tableColumn.setTableView(this);
        this.realodData();
        this._headerView.setNeedsDisplay(true);
    },
    
    /**
        @param {NSTableColumn} tableColumn
    */
    removeTableColumn: function(tableColumn) {
        
    },
    
    /**
        @param {Integer} oldIndex
        @param {Integer} newIndex
    */
    moveColumn: function(oldIndex, newIndex) {
        
    },
    
    /**
        @param {NSString} identifier
        @returns Integer
    */
    columnWithIdentifier: function(identifier) {
        for (var idx = 0; idx < this._tableColumns.length; idx++) {
            if (this._tableColumns[idx].identifier() == identifier)
                return idx;
        }
        
        return -1;
    },
    
    /**
        @param {NSString} identifier
        @returns NSTableColumn
    */
    tableColumnWithIdentifier: function(identifier) {
        for (var idx = 0; idx < this._tableColumns.length; idx++) {
            if (this._tableColumns[idx].identifier() == identifier)
                return this._tableColumns[idx];
        }
        
        return null;
    },
    
    /**
        Tiles the table view, and the header view. Also ensures the vertical
        scroller for the scroll view has a line scroll of the rowheight plus
        cell spacing height
    */
    tile: function() {
        
    },
    
    /**
        Sizes the tableView to take the smallest room required.
    */
    sizeToFit: function() {
        
    },
    
    /**
        Expands the last column to take up any remaining room left in the table
        view.
    */
    sizeLastColumnToFit: function() {
        
    },
    
    /**
        @param {Integer} row
    */
    scrollRowToVisible: function(row) {
        
    },
    
    /**
        @param {Integer} row
    */
    scrollColumnToVisible: function(column) {
        
    },
    
    /**
        Reloads the data from the datasource and then sets itself for needing
        display. This recalculates the number of rows from the source.
    */
    reloadData: function() {
		this.noteNumberOfRowsChanged();
		this.setNeedsDisplay(true);
		this._headerView.setNeedsDisplay(true);
    },
    
    noteNumberOfRowsChanged: function() {
        var frameSize = this.frame().size;
        
        this._numberOfRows = -1;
        var numberOfRows = this.numberOfRows();
        
        var children = this._renderContext.element().childNodes.length;
        
        if (children < numberOfRows) {
            for (var i = 0; i < (numberOfRows - children); i++)
                this._renderContext.push('div', 'ns-table-view-row');
        }
        
        if (numberOfRows > 0)
            frameSize.width = this.rectOfRow(0).size.width;
        
        if (this._tableColumns.length > 0)
            frameSize.height = this.rectOfColumn(0).size.height;
        
        this.setFrameSize(frameSize);
    },
    
    /**
        The column to be editied.
    
        @returns Integer
    */
    editedColumn: function() {
        return this._editedColumn;
    },
    
    /**
        The row to be edited
        
        @returns Integer
    */
    editedRow: function() {
        return this._editedRow;
    },
    
    /**
        The column that was clicked
        
        @returns Integer
    */
    clickedColumn: function() {
        return this._clickedColumn;
    },
    
    /**
        The row that was clicked
        
        @returns Integer
    */
    clickedRow: function() {
        return this._clickedRow;
    },
    
    /**
        @param {Selector} anAction
    */
    setDoubleAction: function(anAction) {
        this._doubleAction = anAction;
    },
    
    /**
        @returns Selector
    */
    doubleAction: function() {
        return this._doubleAction;
    },
    
    /**
        @param {NSArray}
    */
    setSortDescriptors: function(array) {
        if (this._sortDescriptors != array)
            this._sortDescriptors = array;
    },
    
    /**
        @returns NSArray
    */
    sortDescriptors: function() {
        return this._sortDescriptors;
    },
    
    /**
        @param {NSImage} anImage
        @param {NSTableColumn} tableColumn
    */
    setIndicatorImageInTableColumn: function(anImage, tableColumn) {
        
    },
    
    /**
        @param {NSTableColumn} tableColumn
        @returns NSImage
    */
    indicatorImageInTableColumn: function(tableColumn) {
        
    },
    
    /**
        @param {NSTableColumn} tableColumn
    */
    setHighlightedTableColumn: function(tableColumn) {
        
    },
    
    /**
        @returns NSTableColumn
    */
    highlightedTableColumn: function() {
        
    },
    
    /**
        @param {Boolean} flag
    */
    setVerticalMotionCanBeginDrag: function(flag) {
        
    },
    
    /**
        @returns Boolean
    */
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
    
    /**
        Selects the passed indexes. If extendSelection is true, then the passed
        indexes are appended to the selected set. 
        
        @param {NSIndexSet} indexes
        @param {Boolean} extendSelection
    */
    selectRowIndexes: function(indexes, extendSelection) {
        if (extendSelection)
            this._selectedRows.addIndexes(indexes);
        else
            this._selectedRows = indexes;
    },
    
    selectedColumnIndexes: function() {
        
    },
    
    /**
        @retuns {NSIndexSet}
    */
    selectedRowIndexes: function() {
        return this._selectedRows;
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
    
    /**
        @param {Integer} row
        @returns Boolean
    */
    isRowSelected: function(row) {
        return this._selectedRows.containsIndex(row);
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
        return NSMakeRange(0, this.numberOfColumns());
    },
    
    /*
        @param {NSRect} rect
        @returns NSRange
    */
    rowsInRect: function(rect) {
        // return NSMakeRange(0, this.numberOfRows());
        var numberOfRows = this.numberOfRows(), range = NSMakeRange(0, 0);
        var idx = 0; height = 0.0;
        
        for (idx = 0; idx < numberOfRows; idx++) {
            if (height + this._rowHeight + this._intercellSpacing.height > rect.origin.y)
                break;
            else
                height += this._rowHeight + this._intercellSpacing.height;
        }
        if (idx < numberOfRows) {
            range.location = idx;
            
            for ( ; idx < numberOfRows; idx++) {
                if (height > rect.origin.y + rect.size.height)
                    break;
                else
                    height += this._rowHeight + this._intercellSpacing.height;
            }
            if (idx < numberOfRows)
                range.length = idx - range.location + 1;
            else
                range.length = numberOfRows - range.location;
        }
        
        return range;
    },
    
    columnAtPoint: function(point) {
        
    },
    
    /*
        @param {NSPoint} point
        @returns Integer
    */
    rowAtPoint: function(point) {
        var range = this.rowsInRect(NSMakeRect(point.x, point.y, 0.0, 0.0));
        
        if (range.length > 0)
            return range.location;
        
        // no row, returns NSNotFound
        return -1;
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
        dataCell.setObjectValue(this.dataSourceObjectValueForColumnRow(this._tableColumns[column], row));
        return dataCell;        
    },
    
    dataSourceObjectValueForColumnRow: function(column, row) {
        if (this._dataSource && this._dataSource.respondsTo('tableViewObjectValueForTableColumnRow'))
            return this._dataSource.tableViewObjectValueForTableColumnRow(this, column, row);
        
        console.log('Tableview data source does not respond to tableViewObjectValueForTableColumnRow');
        return null;
    },

    /**
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
    
    /**
        @param {NSRect} clipRect
    */
    drawRect: function(clipRect) {
        // draw background
        this.drawBackgroundInClipRect(clipRect);

        // draw grid
        this.drawGridInClipRect(clipRect);
        
        // draw highlighted row backgrounds (each row is drawn on top of this)
        this.highlightSelectionInClipRect(clipRect);

        // draw each row
        if (this.numberOfRows() > 0) {
            var visibleRows = this.rowsInRect(clipRect);
            if (visibleRows.length > 0) {
                for (var idx = visibleRows.location; idx < visibleRows.location + visibleRows.length; idx++) {
                    this.drawRowInClipRect(idx, clipRect);
                }
            }
        }
    },
    
    /**
        NSTableView handles rendering slightly differently, in the sense that
        firstTime is seen in a different context. firstTime is used to flag
        whenever the data is reloaded, in that whenever all the data from
        a datasource needs to be recalculated, then firsTime is used to 
        indicate this.
        
        @param {NSRect} aRect
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    renderRect: function(aRect, firstTime, context) {
        this.renderBackgroundInClipRect(aRect, firstTime, context);
        this.renderSelectionInClipRect(aRect, firstTime, context);
    },
    
    renderSelectionInClipRect: function(aRect, firstTime, context) {
        if (!this._tableColumns)
            return;
        
        var numberOfRows = this.numberOfRows();
        
        for (var row = 0; row <  numberOfRows; row++) {
            if (this.isRowSelected(row)) {
                console.log('adding selected for ' + row);
                context.addClassForChildAtIndex('selected', row);
            }
            else {
                context.removeClassForChildAtIndex('selected', row);
            }
        }
    },
    
    renderBackgroundInClipRect: function(aRect, firstTime, context) {
        console.log('rendering background');
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
    },
    
    /**
        @param {NSRect} clipRect
    */
    highlightSelectionInClipRect: function(clipRect) {
        if (!this._tableColumns)
            return;
        
        var c = NSGraphicsContext.currentContext().graphicsPort();
        var row = 0, column = 0, numberOfRows = this.numberOfRows();
        
        for (column = 0; column < this._tableColumns.length; column++) {
            for (row = 0; row < numberOfRows; row++) {
                if (this.isColumnSelected(column) || this.isRowSelected(row)) {
                    CGContextSetFillColorWithColor(c, NSColor.selectedControlColor());
                    CGContextFillRect(c, this.frameOfCellAtColumnRow(column, row));
                }
            }
        }
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
    },
    
    mouseDown: function(theEvent) {
        var location = this.convertPointFromView(theEvent.locationInWindow(), null);
        location.y = this.bounds().size.height - location.y;
        
        var extendSelection = (theEvent.modifierFlags() & NSCommandKeyMask) ? true : false;
        this.selectRowIndexes(NSIndexSet.indexSetWithIndex(this.rowAtPoint(location)), extendSelection);
        this.setNeedsDisplay(true);
    },
    
    /**
        TableView can now receive (interpreted) keys
        
        @param {NSEvent} theEvent
    */
    keyDown: function(theEvent) {
        this.interpretKeyEvents([theEvent]);
    },
    
    /**
        @param {NSObject} sender
    */
    moveUp: function(sender) {
        if (this._selectedRows.firstIndex() < 1)
            return;
        
        var newIndex = this._selectedRows.firstIndex() - 1;
        this.selectRowIndexes(NSIndexSet.indexSetWithIndex(newIndex), false);
        this.setNeedsDisplay(true);
    },
    
    /**
        @param {NSObject} sender
    */
    moveDown: function(sender) {
        if (this.numberOfRows() < this._selectedRows.firstIndex() + 2)
            return;

        var newIndex = this._selectedRows.firstIndex() + 1;
        this.selectRowIndexes(NSIndexSet.indexSetWithIndex(newIndex), false);
        this.setNeedsDisplay(true);
    },
    
    /**
        TableView can become a first responder in all cases
        
        @returns Boolean
    */
    acceptsFirstResponder: function() {
        return true;
    },
    
    /**
        Instantiate a binding to the object. Placeholders and other information
        can be specified in the options dictionary.
        
        @param binding - NSString
        @param toObject - NSObject
        @param withKeyPath - NSString
        @param options - NSDictionary
    */
    bind: function(binding, toObject, withKeyPath, options) {
        // value binding - NSValueBinding
        if (binding == "selectionIndexes") {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, NSSelectionIndexesBinding);
            
            var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [NSObservedObjectKey, NSObservedKeyPathKey, NSOptionsKey]);
            
            this._kvb_info.setObjectForKey(bindingInfo, NSSelectionIndexesBinding);
        }
    },
    
    /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        // binding for selection indexes. select new indexes, and display.
        if (context == NSSelectionIndexesBinding) {
            var newValue = ofObject.valueForKeyPath(keyPath);
            this.selectRowIndexes(newValue, false);
            this.setNeedsDisplay(true);

        }
    }
});

/**
    @protocol NSTableViewDelegate
    @conforms NSControlTextEditingDelegate
*/
var NSTableViewDelegate = NSObject.protocol({
    
    /**
        @optional
        
        Futher setup the provided cell with custom attributes. No drawing to be
        carried out, only setting up cell state. For example, setting some cells
        to appear disabled, italic font etc.
        
        @param {NSTableView} tableView
        @param {NSCell} cell
        @param {NSTableColumn} tableColumn
        @param {Integer} row
    */
    tableViewWillDisplayCellForTableColumnRow: function(tableView, cell, tableColumn, row) {
    },
    
    /**
        @optional
        
        Return true if the specified column/row can be editable by the user. A
        textfieldcell for example will allow the user to edit text, a slider
        cell will allow the user to change value. Returning false will deny the
        cell from being editable.
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @returns Boolean
    */
    tableViewShouldEditTableColumnRow: function(tableView, tableColumn, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @returns Boolean
    */
    selectionShouldChangeInTableView: function(tableView) {
    },
    
    /**
        @optional
        
        Return true if the row should be selected, false otherwise. For more
        control, tableViewSelectionIndexesForProposedSelection() is a better
        option.
        
        @param {NSTableView} tableView
        @param {Integer} row
        @returns Boolean
    */
    tableViewShouldSelectRow: function(tableView, row) {
    },
    
    /**
        @optional
        
        Returns the set of indexes to select when the user manually changes
        selection.
        
        @param {NSTableView} tableview
        @param {NSIndexSet} proposedIndexes
        @returns {NSIndexSet}
    */
    tableViewSelectionIndexesForProposedSelection: function(tableView, proposedIndexes) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
        @returns Boolean
    */
    tableViewShouldSelectTableColumn: function(tableView, tableColumn) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
    */
    tableViewMouseDownInHeaderOfTableColumn: function(tableview, tableColumn) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
    */
    tableViewDidClickTableColumn: function(tableview, tableColumn) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
    */
    tableViewDidDragTableColumn: function(tableview, tablecolumn) {
    },
    
    /**
        @optional
        
        The returned string is used as a tooltip when the mouse hovers over the
        relevant column/row.
        
        @param {NSTableView} tableView
        @param {NSCell} cell
        @param {NSRect} rect
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @param {NSPoint} mouseLocation
        @returns NSString
    */
    tableViewToolTipForCell: function(tableview, cell, rect, tableColumn, row, mouseLocation) {
    },
    
    /**
        @optional
        
        Used for specifying variable row heights. If not implemented, then the
        default row height for the table will be used.
        
        @param {NSTableView} tableView
        @param {Integer} row
        @returns Float
    */
    tableViewHeightOfRow: function(tableView, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @returns NSString
    */
    tableViewTypeSelectStringForTableColumnRow: function(tableview, tableColumn, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {Integer} startRow
        @param {Integer} endRow
        @param {NSString} searchString
        @returns Integer
    */
    tableViewNextTypeSelectMatchFromRowToRowForString: function(tableview, startRow, endRow, searchString) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSEvent} theEvent
        @param {NSString} searchString
        @returns Boolean
    */
    tableViewShouldTypeSelectForEventWithCurrentSearchString: function(tableView, theEvent, searchString) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @returns Boolean
    */
    tableViewShouldShowCellExpansionForTableColumnRow: function(tableView, tableColumn, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSCell} cell
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @returns Boolean
    */
    tableViewShouldTrackCellForTableColumnRow: function(tableView, cell, tableColumn, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @returns NSCell
    */
    tableViewDataCellForTableColumnRow: function(tableView, tableColumn, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {Integer} row
        @returns Boolean
    */
    tableViewIsGroupRow: function(tableView, row) {
    },
    
    /**
        @optional
        
        For responding to table's notifications
        
        @notification NSTableViewSelectionDidChangeNotification
        @param {NSNotification} aNotification
    */
    tableViewSelectionDidChange: function(aNotification) {
    },
    
    /**
        @optional
        
        For responding to table's notifications
        
        @notification NSTableViewColumnDidMoveNotification
        @param {NSNotification} aNotification
    */
    tableViewColumnDidMove: function(aNotification) {
    },
    
    /**
        @optional
        
        For responding to table's notifications
        
        @notification NSTableViewColumnDidResizeNotification
        @param {NSNotification} aNotification
    */
    tableViewColumnDidResize: function(aNotification) {
    },
    
    /**
        @optional
        
        For responding to table's notifications
        
        @notification NSTableViewSelectionIsChangingNotification
        @param {NSNotification} aNotification
    */
    tableViewSelectionIsChanging: function(aNotification) {
    }
});

/**
    @protocol NSTableViewDataSource
*/
var NSTableViewDataSource = NSObject.protocol({
    
    /**
        @required
        
        Returns the number of rows in the table
        
        @param {NSTableView} tableView
        @returns Integer
    */
    numberOfRowsInTableView: function(tableView) {
    },
    
    /**
        @required
        
        Object value for the column/row to be passed to the cell for display.
        
        @param {NSTableView} tableView
        @param {NSTableColumn} tableColumn
        @param {Integer} row
        @returns NSObject
    */
    tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
    },
    
    /**
        @optional
        
        Support for editing. When a value is edited, the data source is given
        the new value, objectValue for storing.
        
        @param {NSTableView} tableView
        @param {NSObject} objectValue
        @param {NSTableColumn} tableColumn
        @param {Integer} row
    */
    tableViewSetObjectValueForTableColumnRow: function(tableView, objectValue, tableColumn, row) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSArray} oldDescriptors
    */
    tableViewSortDescriptorsDidChange: function(tableView, oldDescriptors) {
    },
    
    /**
        @optional
        
        @param {NSTableView} tableView
        @param {NSIndexSet} rowIndexes
        @param {NSPasteboard} pboard
        @returns Boolean
    */
    tableViewWriteRowsWithIndexesToPasteboard: function(tableView, rowIndexes, pboard) {
    } 
});

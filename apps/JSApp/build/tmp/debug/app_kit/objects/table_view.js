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
        
        this._backgroundColor = NSColor.whiteColor();
        
        
        this._headerView = aCoder.decodeObjectForKey("NSHeaderView");
        
        if (this._headerView)
            this._headerView.setTableView(this);
        
        this._cornerView = aCoder.decodeObjectForKey("NSCornerView");
        this._tableColumns = aCoder.decodeObjectForKey("NSTableColumns");
        
        this._numberOfRows = 0;
        this._numberOfColumns = this._tableColumns.length;
        
        for (var idx = 0; idx < this._numberOfColumns; idx++) {
            // do we need this?
            this._tableColumns[idx].setTableView(this);
        }
        
        return this;
    },
    
    drawRect: function(dirtyRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this._backgroundColor) {
            CGContextSetFillColorWithColor(c, this._backgroundColor);
            CGContextFillRect(c, dirtyRect);
        }
    },
    
    /**
        Sets the datasource, conforming to NSTableViewDataSource.
    */
    setDataSource: function(aSource) {
        this._dataSource = aSource;
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
        
    },
    
    noteNumberOfRowsChnaged: function() {
        
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
        
    },
    
    rectOfRow: function(row) {
        
    },
    
    columnIndexesInRect: function(rect) {
        
    },
    
    rowsInRect: function(rect) {
        
    },
    
    columnAtPoint: function(point) {
        
    },
    
    rowAtPoint: function(point) {
        
    },
    
    frameOfCellAtColumnRow: function(column, row) {
        
    },
    
    preparedCellAtColumnRow: function(column, row) {
        
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
    
    drawRow: function(row, clipRect) {
        
    },
    
    highlightSelectionInClipRect: function(clipRect) {
        
    },
    
    drawGridInClipRect: function(clipRect) {
        
    },
    
    drawBackgroundInClipRect: function(clipRect) {
        
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

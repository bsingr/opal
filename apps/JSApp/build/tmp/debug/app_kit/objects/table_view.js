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


// VN.TableViewColumnAutoresizingStyle
VN.TABLE_VIEW_NO_COLUMN_AUTORESIZING = 0;
VN.TABLE_VIEW_UNIFORM_COLUMN_AUTORESIZING_STYLE = 1;
VN.TABLE_VIEW_SEQUENTIAL_COLUMN_AUTORESIZING_STYLE = 2;
VN.TABLE_VIEW_REVERSE_SEQUENTIAL_COLUMN_AUTORESIZING_STYLE = 3;
VN.TABLE_VIEW_LAST_COLUMN_ONLY_AUTORESIZING_STYLE = 4;
VN.TABLE_VIEW_FIRST_COLUMN_ONLY_AUTORESIZING_STYLE = 5;

// gridstylemask
VN.TABLE_VIEW_GRID_NONE = 0;
VN.TABLE_VIEW_SOLID_VERTICAL_GRID_LINE_MASK = 1 << 0;
VN.TABLE_VIEW_SOLID_HORIZONTAL_GRID_LINE_MASK = 1 << 1;

// VN.TableViewSelectionHighlightStyle
VN.TABLE_VIEW_SELECTION_HIGHLIGHT_STLYE_REGULAR = 0;
VN.TABLE_VIEW_SELECTION_HIGHLIGHT_STLYE_SOURCE_LIST = 1;

// Tableview delegate notifications
VN.TABLE_VIEW_SELECTION_DID_CHANGE_NOTIFICATION = "VN.TableViewSelectionDidChangeNotification";
VN.TABLE_VIEW_COLUMN_DID_MOVE_NOTIFICATION = "VN.TableViewColumnDidMoveNotification";
VN.TABLE_VIEW_COLUMN_DID_RESIZE_NOTIFICATION = "VN.TableViewColumnDidResizeNotification";
VN.TABLE_VIEW_SELECTION_IS_CHANGING_NOTIFICATION = "VN.TableViewSelectionIsChangingNotification";


/**
    @class VN.TableView
    @extends VN.View
*/
var NSTableView = VN.TableView = VN.Control.extend({
    
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
    _reusableRenderContext: null,
    
    /**
        @type VN.String
    */
    renderTagName: 'div',
    
    /**
        @type VN.String
    */
    renderClassName: 'vn-table-view',
    
    /**
        This is used for binding against a controller, usually an Array
        Controller for managing the content of the tableview. If set, all
        other possible data sources are ignored, but some delegate methods
        might still be used if appropriate.
        
        @type VN.Array
    */
    _content: null,
    
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
            if (this._kvb_info.objectForKey(VN.CONTENT_BINDING)) {
                this._numberOfRows = this._content.length;
            }
			else if (this._dataSource) {
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
        
        var children = this.renderElement.childNodes.length;
        
        // add rows/cells if current number is fewer than that is required
        if (children < numberOfRows) {
            for (var i = 0; i < (numberOfRows - children); i++) {
                this.renderContext.push('div', 'vn-table-view-row', this.guidForRow(children + i));
                var rowContext = VN.RenderContext.renderContextWithElement(this.renderElement.childNodes[children + i]);
                
                for (var j = 0; j < this._tableColumns.length; j++) {
                    rowContext.push('div', 'vn-view', this.guidForRowInColumn(children + i, j));
                }
            }        
        }
        // otherwise, if number is more, remove the excess rows
        else if (children > numberOfRows) {
            for (var i = 0; i < (children - numberOfRows); i++) {
                this.renderContext.element().removeChild(VN.$(this.guidForRow(numberOfRows + i)));
            }
        }
        
        if (numberOfRows > 0)
            frameSize.width = this.rectOfRow(0).size.width;
        
        if (this._tableColumns.length > 0)
            frameSize.height = this.rectOfColumn(0).size.height;
        
        this.setFrameSize(frameSize);
    },
    
    /**
        Returns the guid for the row number 'row'. This returns the string that
        is the id of the DOM element representing that row
        
        @param {Integer} row
        @returns {VN.String}
    */
    guidForRow: function(row) {
        return 'guid_' + this.guid() + '_r_' + row;
    },
    
    guidForRowInColumn: function(row, column) {
        return this.guidForRow(row) + '_c_' + column;
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
        if (extendSelection) {
            // add select clas to the extended rows
            this._oldSelectionRows = null;
            this._selectedRows.addIndexes(indexes);
        }  
        else {
            // remove selection from current selection, then select
            // the new selection indexes
            this._oldSelectionRows = this._selectedRows;
            this._selectedRows = indexes;
        }            
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
        
        // y origin is 0 (in relation to row)
        // for (var idx = 0; idx < row; idx++)
            // theRect.origin.y += this._rowHeight + this._intercellSpacing.height;
        
        theRect.size.width = this._tableColumns[column].width() + this._intercellSpacing.width;
        theRect.size.height += this._rowHeight + this._intercellSpacing.height;
        
        return theRect;
    },
    
    /**
        @param {Integer} column
        @param {Integer} row
        @returns VN.Cell
    */
    preparedCellAtColumnRow: function(column, row) {
        var dataCell = this._tableColumns[column].dataCellForRow(row);
        
        if (this._kvb_info.objectForKey(VN.CONTENT_BINDING)) {
            // use content binding
            dataCell.setObjectValue(this.contentBindingObjectValueForColumnRow(this._tableColumns[column], row))
        }
        else {
            // use datasource
            dataCell.setObjectValue(this.dataSourceObjectValueForColumnRow(this._tableColumns[column], row));
        }
        
        
        return dataCell;        
    },
    
    /**
        @param {VN.TableColumn} column
        @param {Integer} row
        @returns {VN.Object}
    */
    contentBindingObjectValueForColumnRow: function(column, row) {
        return this._content[row][column.identifier()];
    },
    
    /**
        @param {VN.TableColumn} column
        @param {Integer} row
        @returns {VN.Object}
    */
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
        this.render(context, firstTime);
    },
    
    render: function(context, firstTime) {
        var aRect = NSMakeRect(100,100,100,100);
        this.renderBackgroundInClipRect(aRect, firstTime, context);
        this.renderSelectionInClipRect(aRect, firstTime, context);
        
        // if (firstTime) {
            if (this.numberOfRows() > 0) {
                if (!this._reusableRenderContext)
                    this._reusableRenderContext = VN.RenderContext.renderContextWithElement(context.element().childNodes[0])
                // var visibleRows = this.rowsInRect(aRect);
                // if (visibleRows.length > 0) {
                    // for (var idx = visibleRows.location; idx < visibleRows.location + visibleRows.length; idx++) {
                    for (var idx = 0; idx < this.numberOfRows(); idx++) {
                        this._reusableRenderContext.setElement(context.element().childNodes[idx]);
                        this.renderRowInContext(idx, this._reusableRenderContext);
                    }
                // }
            }
        // }
    },
    
    renderRowInContext: function(row, context) {
        var visibleColumns = this.columnIndexesInRect(this.bounds());
        // context.set(row % 2 ? 'rgb(243, 243, 243)' : 'white', 'background');
        context.setFrame(this.rectOfRow(row));
        
        for (var idx = visibleColumns.location; idx < visibleColumns.location + visibleColumns.length; idx++) {
            var dataCell = this.preparedCellAtColumnRow(idx, row);
            var cellRect = this.frameOfCellAtColumnRow(idx, row);
            var columnContext = this._tableColumns[idx].renderContext;
            columnContext.setElement(VN.$(this.guidForRowInColumn(row, idx)));
            columnContext.setFrame(cellRect);
            dataCell.renderWithFrameInView(cellRect, this, columnContext, true)
        }
    },
    
    renderSelectionInClipRect: function(aRect, firstTime, context) {
        if (!this._tableColumns)
            return;
        
        for (var idx = 0; idx < this._selectedRows._ranges.length; idx++) {
            var currentRange = this._selectedRows._ranges[idx]
            for (var j = currentRange.location; j < currentRange.location + currentRange.length; j++) {
                context.addClassForChildAtIndex('selected', j);
            }
        }
        
        if (this._oldSelectionRows) {
            for (var idx = 0; idx < this._oldSelectionRows._ranges.length; idx++) {
                var currentRange = this._oldSelectionRows._ranges[idx]
                for (var j = currentRange.location; j < currentRange.location + currentRange.length; j++) {
                    context.removeClassForChildAtIndex('selected', j);
                }
            }
        }
        
        
        // var numberOfRows = this.numberOfRows();
        //         
        //         for (var row = 0; row <  numberOfRows; row++) {
        //             if (this.isRowSelected(row)) {
        //                 context.addClassForChildAtIndex('selected', row);
        //             }
        //             else {
        //                 context.removeClassForChildAtIndex('selected', row);
        //             }
        //         }
    },
    
    renderBackgroundInClipRect: function(aRect, firstTime, context) {
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
        console.log(location.y);
        location.y = this.bounds().size.height - location.y;
        console.log(location.y + '    ' + this.rowAtPoint(location));
        var extendSelection = (theEvent.modifierFlags() & NSCommandKeyMask) ? true : false;
        this.selectRowIndexes(NSIndexSet.indexSetWithIndex(this.rowAtPoint(location)), extendSelection);
        // this.setNeedsDisplay(true);
        this.renderSelectionInClipRect(null, false, this.renderContext);
        
        // var bindingInfo = this._kvb_info.valueForKey(VN.SELECTION_INDEXES_BINDING);
        // if (bindingInfo) {
            // bindingInfo.valueForKey(VN.OBSERVED_OBJECT_KEY).setValueForKeyPath(this._selectedRows, bindingInfo.valueForKey(VN.OBSERVED_KEY_PATH_KEY));
        // }
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
        if (binding == 'selectionIndexes') {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.SELECTION_INDEXES_BINDING);
            
            var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
            
            this._kvb_info.setObjectForKey(bindingInfo, VN.SELECTION_INDEXES_BINDING);
        }
        else if (binding == 'content') {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.CONTENT_BINDING);
            
            var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
            
            this._kvb_info.setObjectForKey(bindingInfo, VN.CONTENT_BINDING);
            
            this._content = toObject.valueForKeyPath(withKeyPath);
            this.reloadData();
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
        if (context == VN.SELECTION_INDEXES_BINDING) {
            var newValue = ofObject.valueForKeyPath(keyPath);
            this.selectRowIndexes(newValue, false);
            this.renderSelectionInClipRect(null, false, this.renderContext);
        }
        else if (context == VN.CONTENT_BINDING) {
            this._content = ofObject.valueForKeyPath(keyPath);
            this.reloadData();
        }
    }
});

/**
    @protocol VN.TableViewDelegate
    @conforms VN.ControlTextEditingDelegate
*/
VN.TableViewDelegate = VN.protocol({
    
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
    @protocol VN.TableViewDataSource
*/
VN.TableViewDataSource = NSObject.protocol({
    
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

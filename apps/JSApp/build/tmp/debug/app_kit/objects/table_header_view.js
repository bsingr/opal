/* 
 * table_header_view.js
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


var NSTableHeaderView = NSView.extend({
  
  renderClassName: 'vn-table-view-header',
  
  
  _tableView: null,
  _resizedColumn: null,
  _draggedColumn: null,
  _pressedColumn: null,
  _headerDragImage: null,
  _draggedDistance: null,
  _isColumnResizing: null,
  _showHandCursorFired: null,
  _toolTipRectsDirty: null,
  _alignTitleWithDataCell: null,
  _skipDrawingSeparator: null,
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this._tableView = aCoder.decodeObjectForKey("NSTableView");
    return this;
  },
  
  setTableView: function(aTableView) {
    this._tableView = aTableView;
  },
  
  tableView: function() {
    return this._tableView;
  },
  
  drawRect: function(dirtyRect) {
    // var c = NSGraphicsContext.currentContext().graphicsPort();
    // var tableColumns = this._tableView.tableColumns();
    // var columnRect = this.bounds(), spacing = this._tableView._intercellSpacing;
    // 
    // for (var idx = 0; idx < tableColumns.length; idx++) {
    //   var theColumn = tableColumns[idx];
    //   columnRect.size.width = theColumn.width() + spacing.width;
    //   theColumn.headerCell.drawWithFrame(columnRect, this);
    //   columnRect.origin.x = theColumn.width() + spacing.width;
    // }
  },
  
  draggedColumn: function() {
    
  },
  
  draggedDistance: function() {
    
  },
  
  resizedColumn: function() {
    
  },
  
  headerRectOfColumn: function(column) {
    
  },
  
  columnAtPoint: function(point) {
    
  }
});

/* 
 * table_column.js
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


// NSTablecolumn resizing
var NSTableColumnNoResizing         = 0;
var NSTableColumnAutoresizingMask   = ( 1 << 0 );
var NSTableColumnUserResizingMask   = ( 1 << 1 );

var NSTableColumn = NSObject.extend({
    
    _identifier: null,
    _headerCell: null,
    _dataCell: null,
    _width: null,
    _minWidth: null,
    _maxWidth: null,
    
    _tableView: null,
    
    initWithCoder: function(aCoder) {
        // this._super(aCoder);
        
        this._identifier = aCoder.decodeObjectForKey("NSIdentifier");
        // this._headerCell = aCoder.decodeObjectForKey("NSHeaderCell");
        this._dataCell = aCoder.decodeObjectForKey("NSDataCell");
        this._width = aCoder.decodeIntForKey("NSWidth");
        this._minWidth = aCoder.decodeIntForKey("NSMinWidth");
        this._maxWidth = aCoder.decodeIntForKey("NSMaxWidth");
        this._tableView = aCoder.decodeObjectForKey("NSTableView");
        
        return this;
    },
    
    setTableView: function(aTableView) {
        this._tableView = aTableView;
    },
    
    tableView: function() {
        return this._tableView;
    },
    
    setIdentifier: function(identifier) {
        this._identifier = identifier;
    },
    
    identifier: function() {
        return this._identifier;
    },
    
    setWidth: function(width) {
        this._width = width;
    },
    
    width: function() {
        return this._width;
    },
    
    setMinWidth: function(minWidth) {
        this._minWidth = minWidth;
    },
    
    minWidth: function() {
        return this._minWidth;
    },
    
    setMaxWidth: function(maxWidth) {
        this._maxWidth = maxWidth;
    },
    
    maxWidth: function() {
        return this._maxWidth;
    },
    
    setHeaderCell: function(cell) {
        this._headerCell = cell;
    },
    
    headerCell: function() {
        return this._headerCell;
    },
    
    setDataCell: function(cell) {
        this._dataCell = cell;
    },
    
    dataCell: function() {
        return this._dataCell;
    },
    
    dataCellForRow: function() {
        return this._dataCell;
    },
    
    setEditable: function(flag) {
        this._isEditable = flag;
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    sizeToFit: function() {
        
    },
    
    setSortDescriptorPrototype: function(sortDescriptor) {
        this._sortDescriptorPrototype = sortDescriptor;
    },
    
    sortDescriptorPrototype: function() {
        return this._sortDescriptorPrototype;
    },
    
    setResizingMask: function(resizingMask) {
        this._resizingMask = resizingMask;
    },
    
    resizingMask: function() {
        return this._resizingMask;
    },
    
    setHeaderToolTip: function(aString) {
        this._headerToolTip = aString;
    },
    
    headerToolTip: function() {
        return this._headerToolTip;
    },
    
    isHidden: function() {
        return this._isHidden;
    },
    
    setHidden: function(flag) {
        this._isHidden = flag;
    }    
});

/* 
 * outline_view.js
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

include('app_kit/table_view');

/**
  @class NSOutlineView
  @extend NSTableView
*/
var NSOutlineView = NSTableView.extend({
  
  /**
    @type Integer
  */
  _numberOfRows: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSOutlineView
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    return this;
  },
  
  /**
    @param {NSObject} <NSOutlineViewDelegate> anObject
  */
  setDelegate: function(anObject) {
    
  },
  
  /**
    @returns NSObject <NSOutlineViewDelegate>
  */
  delegate: function() {
    
  },
  
  /**
    @param {NSObject} <NSOutlineViewDataSource> aSource
  */
  setDataSource: function(aSource) {
    
  },
  
  /**
    @returns NSObject <NSOutlineViewDataSource>
  */
  dataSource: function() {
    
  },
  
  /**
    @param {NSTableColumn} outlineTableColumn
  */
  setOutlineTableColumn: function(outlineTableColumn) {
    
  },
  
  /**
    @retuns NSTableColumn
  */
  outlineTableColumn: function() {
    
  },
  
  /**
    @param {NSObject} item
    @returns Boolean
  */
  isExpandable: function(item) {
    
  },
  
  /**
    Expands the passed item, as well as all it's children if the flag is
    true. Passing null for item will cause all root itrms to expand.
    
    @param {NSObject} item
    @param {Boolean} expandChildren - optional, default false.
  */
  expandItem: function(item, expandChildren) {
    
  },
  
  /**
    @param {NSObject} item
    @param {Boolean} collapseChildren - optional, default false
  */
  collapseItem: function(item, collapseChildren) {
    
  },
  
  /**
    @param {NSObject} item
    @param {Boolean} reloadChildren - optional, defailt false
  */
  reloadItem: function(item, reloadChildren) {
    
  },
  
  /**
    @param {NSObject} item
    @returns NSObject
  */
  parentForItem: function(item) {
    
  },
  
  /**
    @param {Integer} row
    @returns NSObject
  */
  itemAtRow: function(row) {
    
  },
  
  /**
    @param {NSObject} item
    @returns Integer
  */
  rowForItem: function(item) {
    
  },
  
  /**
    @param {NSObject} item
    @returns Integer
  */
  levelForItem: function(item) {
    
  },
  
  /**
    @param {Integer} row
    @returns Integer
  */
  levelForRow: function(row) {
    
  },
  
  /**
    @param {NSObject} item
    @returns Boolean
  */
  isItemExpanded: function(item) {
    
  },
  
  /**
    Sets the indentation per level. Default is 16.0
    
    @param {Float} indentationPerLevel
  */
  setIndentationPerLevel: function(indentationPerLevel) {
    
  },
  
  /**
    @returns Float
  */
  indentationPerLevel: function() {
    
  },
  
  /**
    @param {Boolean} drawInCell
  */
  setIndentationMarkerFollowsCell: function(drawInCell) {
    
  },
  
  /**
    @returns Boolean
  */
  indentationMarkerFollowsCell: function() {
    
  },
  
  /**
    @param {Boolean} resize
  */
  setAutoresizesOutlineColumn: function(resize) {
    
  },
  
  /**
    @returns Boolean
  */
  autoresizesOutlineColumn: function() {
    
  },
  
  /**
    @param {Integer} row
    @returns NSRect
  */
  frameOfOutlineCellAtRow: function(row) {
    
  },
  
  /**
    @param {NSObject} item
    @param {Integer} index
  */
  setDropItemDropChildIndex: function(item, index) {
    
  },
  
  /**
    @param {Boolean} depositied
    @returns {Boolean}
  */
  shouldCollapseAutoExpandedItemsForDeposited: function(deposited) {
    
  },
  
  /**
    @returns Boolean
  */
  autosaveExpandedItems: function() {
    
  },
  
  /**
    @param {Boolean} save
  */
  setAutosaveExpandedItems: function(save) {
    
  }
});

/**
  @protocol NSOutlineViewDataSource
*/
var NSOutlineViewDataSource = NSObject.protocol({
  
  /**
    @required
    
    @param {NSOutlineView} outlineView
    @param {Integer} index
    @param {NSObject} item
    @returns NSObject
  */
  outlineViewChildOfItem: function(outlineView, index, item) {
  },
  
  /**
    @required
    
    @param {NSOutlineview} outlineView
    @param {NSObject} item
    @returns Boolean
  */
  outlineViewIsItemExpandable: function(outlineView, item) {
  },
  
  /**
    @required
    
    @param {NSOutlineview} outlineView
    @param {NSObject} item
    @returns Integer
  */
  outlineViewNumberOfChildrenOfItem: function(outlineview, item) {
  },
  
  /**
    @required
    
    @param {NSOutlineview} outlineView
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
    @returns NSObject
  */
  outlineViewObjectValueForTableColumnByItem: function(outlineView, tableColumn, item) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineview
    @param {NSObject} object
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
  */
  outlineViewSetObjectValueForTableColumnByItem: function(outlineView, object, tableColumn, item) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} object
    @returns NSObject
  */
  outlineViewItemForPersistentObject: function(outlineView, object) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} item
    @returns NSObject
  */
  outlineViewPersistentObjectForItem: function(outlineView, item) {
  },
  
  /**
    @optional
    
    This states that sorting needs to take place. It is expected that the 
    data source will sort, then reload and adjust selections
    
    @param {NSOutlineView} outlineView
    @param {NSArray} oldDescriptors
  */
  outlineViewSortDescriptorsDidChange: function(outlineView, oldDescriptors) {
  },
  
  /**
    @optional
    
    This is called after the drag has been decided, but before any action
    takes place. Returning false will refuse the drag. true will intiate
    the drag action.
    
    @param {NSOutlineView} outlineView
    @param {NSArray} items
    @param {NSPasteboard} pasteboard
    @returns Boolean
  */
  outlineViewWriteItemsToPasteboard: function(outlineView, items, pasteboard) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} <NSDraggingInfo> info
    @param {NSObject} proposedItem
    @param {Integer} index
    @returns NSDragOperation
  */
  outlineViewValidateDropProposedItemProposedChildIndex: function(outlineView, info, item, index) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} <NSDraggingInfo> info
    @param {NSObject} item
    @param {Integer} index
    @returns Boolean
  */
  outlineViewAcceptDropItemIndex: function(outlineView, info, item, index) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSURL} dropDestination
    @param {NSArray} items
  */
  outlineViewNamesOfPromisedFilesDroppedAtDestinationForDraggedItems: function(outlineView, dropDestination, items) {
  }
});


/**
  @protocol NSOutlineViewDelegate
  @conforms NSControlTextEditingDelegate
*/
var NSOutlineViewDelegate = NSObject.protocol({
  
  /**
    @param {NSOutlineview} outlineView
    @paeam {NSCell} cell
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
  */
  outlineViewWillDisplayCellForTablueColumnItem: function(outlineView, cell, tableColumn, item) {
  },
  
  /**
    @param {NSOutlineView} outlineView
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
    @returns Boolean
  */
  outlineViewShouldEditTableColumnItem: function(outlineView, tableColumn, item) {
  },
  
  /**
    @param {NSOutlineView} outlineView
    @returns Boolean
  */
  selectionShouldChangeInOutlineView: function(outlineView) {
  },
  
  /**
    @optional
    
    Return true so the item should select, and false otherwise.
    
    @param {NSOutlineView} outlineView
    @param {NSObject} item
    @returns Boolean
  */
  outlineViewShouldSelectItem: function(outlineView, item) {
  },
  
  // rest to follow...
});

/**
  Notification constants
*/
var NSOutlineViewSelectionDidChangeNotification   = "NSOutlineViewSelectionDidChangeNotification";
var NSOutlineViewColumnDidMoveNotification      = "NSOutlineViewColumnDidMoveNotification";
var NSOutlineViewColumnDidResizeNotification    = "NSOutlineViewColumnDidResizeNotification";
var NSOutlineViewSelectionIsChangingNotification  = "NSOutlineViewSelectionIsChangingNotification";
var NSOutlineViewItemWillExpandNotification     = "NSOutlineViewItemWillExpandNotification";
var NSOutlineViewItemDidExpandNotification      = "NSOutlineViewItemDidExpandNotification";
var NSOutlineViewItemWillCollapseNotification     = "NSOutlineViewItemWillCollapseNotification";
var NSOutlineViewItemDidCollapseNotification    = "NSOutlineViewItemDidCollapseNotification";

/**
  @protocol NSOutlineViewNotifications
*/
var NSOutlineViewNotifications = NSObject.protocol({
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewSelectionDidChange: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewColumnDidMove: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewColumnDidResize: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewSelectionIsChanging: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemWillExpand: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemDidExpand: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemWillCollapse: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemDidCollapse: function(aNotification) {
  }  
});

/* 
 * menu_view.js
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

var NSMenuView = NSView.extend({
    
    _isHorizontal: null,
    
    _menu: null,
    
    _needsSizing: null,
    
    _horizontalEdgePadding: null,
    
    _font: null,
    
    // used to hold the minimum rect required bu a menu item (and its cell) to draw
    // itself. when a view is updated, it needs to be recalculated.
    // the index of the item, is its index in the array.
    _cachedMenuItemRects: null,
    
    _menuItemCell: [],
    
    // used to hold a submenu for the view
    _submenu: null,
    
    initWithMenu: function(aMenu) {
        
        this._subviews = [];
        
        this._menu = aMenu;
        this._needsSizing = true;
        
        this._horizontalEdgePadding = 11;
        
        this._cachedMenuItemRects = [];
        this._menuItemCell = NSMenuItemCell.create();
        this._menuItemCell.setMenuView(this);
        
        this._menu.setMenuView(this);
        
        this.initWithFrame(NSMakeRect(0, 0, 100, 38));
        // this.update();
        return this;
    },
    
    mouseDown: function(theEvent) {
        this.trackWithEvent(theEvent);
    },
    
    isHorizontal: function() {
        return this._isHorizontal;
    },
    
    setHorizontal: function(flag) {
        this._isHorizontal = flag;
    },
    
    setMenu: function(aMenu) {
        this._menu = aMenu;
    },
    
    menu: function() {
        return this._menu;
    },
    
    itemChanged: function(aNotification) {
        
    },
    
    itemAdded: function(aNotification) {
        
    },
    
    itemRemoved: function(aNotification) {
        
    },
    
    update: function() {
        if (!this.needsSizing())
            return;
        
        this.sizeToFit();
    },
    
    setFont: function(aFont) {
        
    },
    
    font: function() {
        return this.isHorizontal() ? NSFont.menuBarFontOfSize(12) : NSFont.menuFontOfSize(12);
    },
    
    innerRect: function() {
        return this._frame;
    },
    
    /**
        Calculates the rect of each item at the specified index. This basically
        has two main considerations. Horizontal menus only display their title,
        and their height is just restricted to the height of the main menubar.
        
        Vertical menus might have views inside their cells, so their height 
        cannot be assumed to be a fixed value.
    */
    rectOfItemAtIndex: function(index) {
        var currentOffset = NSMakePoint(0, 0);
        for (var idx = 0; idx < index; idx++) {
            if (this.isHorizontal()) {
                currentOffset.x += (this._cachedMenuItemRects[idx].width + (2 * this.horizontalEdgePadding()));
            }
            else {
                currentOffset.y += (this._cachedMenuItemRects[idx].height)
            }
        }
        
        if (this.isHorizontal()) {
            return NSMakeRect(currentOffset.x+ this.horizontalEdgePadding(), currentOffset.y, this._cachedMenuItemRects[index].width + (2 * this.horizontalEdgePadding()), NSMenu.menuBarHeight())
        }
        else {
            // nned to fix this
            return NSMakeRect(currentOffset.x,
                                currentOffset.y + this.horizontalEdgePadding(), // the top item has this padding, so knock on the effect..
                                this._frame.size.width, // the rect is the width of the menu... every item is as wide as the menu, even if it doesnt need to be
                                this._cachedMenuItemRects[index].height);
        }
        
    },
    
    indexOfItemAtPoint: function(aPoint) {
        for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
            if (NSPointInRect(aPoint, this.rectOfItemAtIndex(idx))) {
                return idx;
            }
        }
        
        return -1;
    },
    
    setNeedsDisplayForItemAtIndex: function(index) {
        
    },
    
    setHighlightedItemIndex: function(index) {
        
    },
    
    highlightedItemIndex: function() {
        
    },
    
    stateImageOffset: function() {
        
    },
    
    stateImageWidth: function() {
        
    },
    
    imageAndTitleOffset: function() {
        
    },
    
    imageAndTitleWidth: function() {
        
    },
    
    keyEquivalentOffset: function() {
        
    },
    
    keyEquivalentWidth: function() {
        
    },

    setMenuItemCellForItemAtIndex: function(cell, forIndex) {
        
    },
    
    menuItemCellForItemAtIndex: function(index) {
        return this._menuItemCell;
    },
    
    attatchedMenuView: function() {
        
    },
    
    setNeedsSizing: function(flag) {
        this._needsSizing = flag;
    },
    
    needsSizing: function() {
        return this._needsSizing;
    },
    
    sizeToFit: function() {
        
        NSGraphicsContext.setCurrentContext(this.graphicsContext());
        
        var theItem, theCell = this._menuItemCell;
        var requiredWidth = 0;
        var requiredHeight = 0;
        var theMinWidth = 0;
        
        for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
            theItem = this._menu.itemAtIndex(idx);
            this._menuItemCell.setMenuItem(theItem);
            this._cachedMenuItemRects[idx] = this._menuItemCell.cellSize();
            
            if (this.isHorizontal()) {
                // each item has the padding to left and right, and first item has this padding from the left
                requiredWidth += this._cachedMenuItemRects[idx].width + (3 * this.horizontalEdgePadding());
            }
            else {
                requiredHeight += this._cachedMenuItemRects[idx].height;
                
                if (theMinWidth < this._cachedMenuItemRects[idx].width) {
                    theMinWidth = this._cachedMenuItemRects[idx].width;
                }
            }
        }
        
        if (this.isHorizontal()) {
            requiredHeight = NSMenu.menuBarHeight();
        }
        else {
            // the padding: above top item, and below bottom item.
            requiredHeight += (2 * this.horizontalEdgePadding())
            requiredWidth = theMinWidth;
        }
        
        this.setFrameSize(NSMakeSize(requiredWidth, requiredHeight));
        
        NSGraphicsContext.setCurrentContext(null);
    },
    
    drawRect: function(rect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this._cachedMenuItemRects.length < 1)
            return;
        
        var theItem, theCell = this._menuItemCell;
        
        for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
            theItem = this._menu.itemAtIndex(idx);
            theCell.setMenuItem(theItem);
            theCell.drawWithFrame(this.rectOfItemAtIndex(idx), this);
        }
    },
    
    attatchedMenu: function() {
        
    },
    
    isAttatched: function() {
        
    },
    
    isTornOff: function() {
        
    },
    
    locationForSubmenu: function(aSubmenu) {
        
    },
    
    setWindowFrameForAttachingToRect: function(screenRect, preferredEdge, selectedItemIndex) {
        
    },
    
    detachSubmenu: function() {
        console.log('detatch submenu');
        this._submenu.menuView().window().close();
    },
    
    attachSubmenuForItemAtIndex: function(index) {
        console.log('attatch submenu for index: ' + index);
        var theMenuItem = this._menu.itemAtIndex(index);
        this._submenu = theMenuItem.submenu();
        var theWindow = NSMenuWindow.create('initWithMenu', this._submenu);
        
        var currentItemRect = this.rectOfItemAtIndex(index);
        
        theWindow.setFrameOrigin(NSMakePoint(currentItemRect.origin.x, window.innerHeight - (23 + theWindow.frame().size.height)));
    },
    
    performActionWithHighlightingForItemAtIndex: function(index) {
        
    },
    
    /**
        Tracks menu selection from an event. Whichever menu view is initially
        clicked becomes in charge of orchastrating event ownership until an item
        is clicked, or the menu is dismissed. Therefore, a stack of menus and 
        their respective views is held by the menu view in charge, and events 
        are passed down as appropriate. This can be for the menubar, but also
        popup menus might instantiate menu handling.
    */
    trackWithEvent: function(theEvent) {
        
        var location = this.convertPointFromView(theEvent.locationInWindow(), null);
        
        var theIndex = this.indexOfItemAtPoint(location);
        
        this._menu.setHighlightedItem(this._menu.itemAtIndex(theIndex));
        this.setNeedsDisplay(true);
        
        this.attachSubmenuForItemAtIndex(theIndex);
                
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {            
            
            var location = this.convertPointFromView(theEvent.locationInWindow(), null);

            var theIndex = this.indexOfItemAtPoint(location);
            
            if (theEvent.type() == NSLeftMouseUp) {
                NSApplication.sharedApplication().unbindEvents();
                this._menu.setHighlightedItem(null);
                this.setNeedsDisplay(true);
                
                if (this._submenu)
                    this.detachSubmenu();
                    
                return;
            }
            
            var theMenuItem = this._menu.itemAtIndex(theIndex);
            
            if (this._menu.highlightedItem() != theMenuItem) {
                this._menu.setHighlightedItem(this._menu.itemAtIndex(theIndex));
                this.setNeedsDisplay(true);
                
                if (theMenuItem.hasSubmenu()) {
                    if (this._submenu)
                        this.detachSubmenu();

                    this.attachSubmenuForItemAtIndex(theIndex);
                    // var theWindow = NSMenuWindow.create('initWithMenu', theMenuItem.submenu());
                }
            }  
        });
    },
    
    horizontalEdgePadding: function() {
        return this._horizontalEdgePadding;
    },
    
    setHorizontalEdgePadding: function(pad) {
        this._horizontalEdgePadding = pad;
    }
});

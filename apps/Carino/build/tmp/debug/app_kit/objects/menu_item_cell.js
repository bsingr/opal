/* 
 * menu_item_cell.js
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
 

var NSMenuItemCell = NSCell.extend({
    
    _menuItem: null,
    
    _menuView: null,
    
    _needsSizing: null,
    
    setMenuItem: function(item) {
        this._menuItem = item;
    },
    
    menuItem: function() {
        return this._menuItem;
    },
    
    setMenuView: function(menuView) {
        this._menuView = menuView;
    },
    
    menuView: function() {
        return this._menuView;
    },
    
    setNeedsSizing: function(flag) {
        this._needsSizing = flag;
    },
    
    needsSizing: function() {
        return this._needsSizing;
    },
    
    calcSize: function() {
        
    },
    
    /**
        Returns the minimum size needed for this menu item. Note: this DOES NOT
        take into account padding etc that the menuview adds itself. This is
        purely for the cell's internal drawing. Padding may be added if necessary.
    */
    cellSize: function() {
        
        if (this._menuItem.isSeparatorItem())
            return NSMakeSize(0, 10);
            
        var theTitle = this._menuItem.attributedTitle();
        var titleSize = theTitle.size();
        
        if (this._menuView.isHorizontal()) {
            // if horizontal, just consider the title. nothing else is drawn for 
            // horizontal cells
            return titleSize;
        }
        
        titleSize.height += 6; // basic room on top and bottom
        titleSize.width += 60; // until we fix others/
        
        return titleSize;
    },
    
    setNeedsDisplay: function(flag) {
        
    },
    
    needsDisplay: function() {
        
    },
    
    stateImageWidth: function() {
        
    },
    
    imageWidth: function() {
        
    },
    
    titleWidth: function() {
        return this._menuItem.attributedTitle().size().width;
    },
    
    keyEquivalentWidth: function() {
        if (this._menuItem.keyEquivalent()) {
            
        }
        
        // no key equiv? return 0;
        return 0;
    },
    
    stateImageRectForBounds: function(cellFrame) {
        
    },
    
    titleRectForBounds: function(theRect) {
        var textSize = this._menuItem.attributedTitle().size();
        return NSMakeRect(theRect.origin.x + this._menuView.horizontalEdgePadding(),
                            theRect.origin.y + ((theRect.size.height - textSize.height) / 2),
                            theRect.size.width - 30,
                            textSize.height);
    },
    
    keyEquivalentRectForBounds: function(cellFrame) {
        var titleRect = this.titleRectForBounds(cellFrame);
        return NSMakeRect(titleRect.origin.x + titleRect.size.width, titleRect.origin.y, titleRect.size.width, titleRect.size.height);
    },
    
    tag: function() {
        
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        
        if (this._menuItem.isSeparatorItem()) {
            this.drawSeparatorItemWithFrameInView(cellFrame, controlView);
            return;
        }
        
        this.drawBorderAndBackgroundWithFrameInView(cellFrame, controlView);
        this.drawTitleWithFrameInView(this.titleRectForBounds(cellFrame), controlView);
        if (this._menuItem.keyEquivalent()) {
            this.drawKeyEquivalentWithFrameInView(this.keyEquivalentRectForBounds(cellFrame), controlView);
        }
        
        // this.drawTitleWithFrameInView(cellFrame, controlView);
    },
    
    drawSeparatorItemWithFrameInView: function(cellFrame, controlView) {
        // should draw line bezel thing
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSetStrokeColorWithColor(c, NSColor.selectedMenuItemColor());
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, cellFrame.origin.x + this._menuView.horizontalEdgePadding(), cellFrame.origin.y + (cellFrame.size.height / 2));
        CGContextAddLineToPoint(c, cellFrame.origin.x + cellFrame.size.width - (2 * this._menuView.horizontalEdgePadding(), cellFrame.origin.y + (cellFrame.size.height / 2)));
        CGContextClosePath(c);
        
        CGContextStrokePath(c);
    },
    
    drawStateImageWithFrameInView: function(cellFrame, controlView) {
        
    },
    
    drawImageWithFrameInView: function(cellFrame, controlView) {
        
    },
    
    drawTitleWithFrameInView: function(cellFrame, controlView) {
        this._menuItem.attributedTitle().drawWithRectAndOptions(cellFrame, null);
    },
    
    drawKeyEquivalentWithFrameInView: function(cellFrame, controlView) {
        this._menuItem.attributedKeyEquivalent().drawWithRectAndOptions(cellFrame, null);
    },
    
    drawBorderAndBackgroundWithFrameInView: function(cellFrame, controlView) {
        if (this._menuItem.isHighlighted()) {
            var c = NSGraphicsContext.currentContext().graphicsPort();
            CGContextSaveGState(c);
            CGContextSetFillColorWithColor(c, NSColor.selectedMenuItemColor());
            CGContextFillRect(c, cellFrame);
            
            // gradient
		    var lingrad = c.createLinearGradient(cellFrame.origin.x, cellFrame.origin.y, cellFrame.origin.x, cellFrame.origin.y + cellFrame.size.height);
            lingrad.addColorStop(0, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(1, 1, 1, 0.504)));
            lingrad.addColorStop(1, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(0.404, 0.404, 0.404, 0.304)));
            c.fillStyle = lingrad;
            c.fillRect(cellFrame.origin.x, cellFrame.origin.y, cellFrame.size.width, cellFrame.size.height);
            
            CGContextRestoreGState(c);
        }
    }
});

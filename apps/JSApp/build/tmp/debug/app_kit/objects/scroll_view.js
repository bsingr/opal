/* 
 * scroll_view.js
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

var NSScrollView = NSView.extend({
   
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSsFlags");
        
        this._hasVerticalScroller = (flags & 0x10) ? true : false;
        this._hasHorizontalScroller = (flags & 0x20) ? true : false;
        this._borderType = flags & 0x303;

        this._verticalScroller = aCoder.decodeObjectForKey("NSVScroller");
        this._horizontalScroller = aCoder.decodeObjectForKey("NSHScroller");
        this._clipView = aCoder.decodeObjectForKey("NSContentView");
        this._headerClipView = aCoder.decodeObjectForKey("NSHeaderClipView");
        this._cornerView = aCoder.decodeObjectForKey("NSCornerView");
        
        if (!this._hasVerticalScroller)
            this._verticalScroller.removeFromSuperview();
        
        if (!this._hasHorizontalScroller)
            this._horizontalScroller.removeFromSuperview();
        
        this.tile();
        return this;
    },
    
    tile: function() {
        
    },
    
    // hitTest: function() {
        // return null;
    // },
    
    documentVisibleRect: function() {
        
    },
    
    contentSize: function() {
        
    },
    
    setDocumentView: function(aView) {
        
    },
    
    documentView: function() {
        
    },
    
    setContentView: function(contentView) {
        
    },
    
    contentView: function() {
        
    },
    
    setDocumentCursor: function(aCursor) {
        
    },
    
    documentCursor: function() {
        
    },
    
    setBorderType: function(aType) {
        
    },
    
    borderType: function() {
        
    },
    
    setBackgroundColor: function(aColor) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setDrawsBackground: function(flag) {
        
    },
    
    drawsBackground: function() {
        
    },
    
    setHasVerticalScroller: function(flag) {
        
    },
    
    hasVerticalScroller: function() {
        
    },
    
    setVericalScroller: function(aScroller) {
        
    },
    
    verticalScroller: function() {
        
    },
    
    setHasHorizontalSroller: function(flag) {
        
    },
    
    hasHorizontalScroller: function() {
        
    },
    
    setHorizontalScroller: function(aScroller) {
        
    },
    
    horizontalScroller: function() {
        
    },
    
    autohidesScrollers: function() {
        
    },
    
    setAutohidesScrollers: function(flag) {
        
    },
    
    
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_3
    //  - (BOOL)autohidesScrollers;
    //  - (void)setAutohidesScrollers:(BOOL)flag;
    //  #endif
    //  - (void)setHorizontalLineScroll:(CGFloat)value;
    //  - (void)setVerticalLineScroll:(CGFloat)value;
    //  - (void)setLineScroll:(CGFloat)value;
    //  - (CGFloat)horizontalLineScroll;
    //  - (CGFloat)verticalLineScroll;
    //  - (CGFloat)lineScroll;
    //  - (void)setHorizontalPageScroll:(CGFloat)value;
    //  - (void)setVerticalPageScroll:(CGFloat)value;
    //  - (void)setPageScroll:(CGFloat)value;
    //  - (CGFloat)horizontalPageScroll;
    //  - (CGFloat)verticalPageScroll;
    //  - (CGFloat)pageScroll;
    //  - (void)setScrollsDynamically:(BOOL)flag;
    //  - (BOOL)scrollsDynamically;
    //  - (void)tile;
    //  - (void)reflectScrolledClipView:(NSClipView *)cView;
    //  - (void)scrollWheel:(NSEvent *)theEvent;
    //  @end
});

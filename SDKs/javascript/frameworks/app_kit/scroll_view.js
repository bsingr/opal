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

/**
    @class NSScrollView
    @extends NSView
*/
var NSScrollView = NSView.extend({
    
    /**
        @type Boolean
    */
    _hasVerticalScroller: null,
    
    /**
        @type Boolean
    */
    _hasHorizontalScroller: null,
    
    /**
        @type Integer
    */
    _borderType: null,
    
    /**
        @type NSScroller
    */
    _verticalScroller: null,
    
    /**
        @type NSScroller
    */
    _horizontalScroller: null,
    
    /**
        @type NSClipView
    */
    _clipView: null,
    
    /**
        @type NSClipView
    */
    _headerClipView: null,
    
    /**
        @type NSView
    */
    _cornerView: null,
    
    /**
        @param {NSCoder} aCoder
        @returns NSScrollView
    */
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
    
    /**
        Tiles the scrollview and all of its contents
    */
    tile: function() {
        var frame;
        
        // headerClipView
        if (this._headerClipView) {
            frame = NSMakeRect(0, this.bounds().size.height - this._headerClipView.bounds().size.height, this.bounds().size.width, this._headerClipView.bounds().size.height);
            this._headerClipView.setFrame(frame);
        }
        
        // clipView
        if (this._clipView) {
            var heightOffset = (this._headerClipView) ? this._headerClipView.bounds().size.height : 0;
            frame = NSMakeRect(0, 0, this.bounds().size.width, this.bounds().size.height - heightOffset);
            this._clipView.setFrame(frame);
        }
    },
    
    documentVisibleRect: function() {
        
    },
    
    contentSize: function() {
        
    },
    
    setDocumentView: function(aView) {
        
    },
    
    /**
        @returns NSClipView
    */
    documentView: function() {
        return this._clipView;
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
    
    /**
        @returns Boolean
    */
    autohidesScrollers: function() {
        
    },
    
    /**
        @param {Boolean} flag
    */
    setAutohidesScrollers: function(flag) {
        
    },
    
    /**
        @param {Float} value
    */
    setHorizontalLineScroll: function(value) {
        
    },
    
    /**
        @returns Float
    */
    horizontalLineScroll: function() {
        
    },
    
    /**
        @param {Float} value
    */
    setVerticalLineScroll: function(value) {
        
    },
    
    /**
        @returns Float
    */
    verticalLineScroll: function() {
        
    },
    
    /**
        @param {Float} value
    */
    setLineScroll: function(value) {
        
    },
    
    /**
        @returns Float
    */
    lineScroll: function() {
        
    },
    
    /**
        @param {Float} value
    */
    setHorizontalPageScroll: function(value) {
        
    },
    
    /**
        @returns Float
    */
    horizontalPageScroll: function() {
        
    },
    
    /**
        @param {Float} value
    */
    setVerticalPageScroll: function(value) {
        
    },
    
    /**
        @returns Float
    */
    verticalPageScroll: function() {
        
    },
    
    /**
        @param {Float} value
    */
    setPageScroll: function(value) {
        
    },
    
    /**
        @returns Float
    */
    pageScroll: function() {
        
    },
    
    /**
        @param {Boolean} flag
    */
    setScrollsDynamically: function(flag) {
        
    },
    
    /**
        @returns Boolean
    */
    scrollsDynamically: function() {
        
    },
    
    /**
        @param {NSClipView} aView
    */
    reflectScrolledClipView: function(aView) {
        
    },
    
    /**
        @param {NSEvent} theEvent
    */
    scrollWheel: function(theEvent) {
        
    }
});

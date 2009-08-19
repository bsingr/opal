/* 
 * clip_view.js
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

/**
  @class NSClipView
  @extends NSView
*/
var NSClipView = NSView.extend({
  
  /**
    @type NSColor
  */
  _backgroundColor: null,
  
  /**
    @type NSView
  */
  _docView: null,
  
  /**
    @type NSRect
  */
  _docRect: null,
  
  /**
    @type NSRect
  */
  _oldDocFrame: null,
  
  /**
    @type Boolean
  */
  _drawsBackground: null,
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-clip-view',
  
  /**
    @param {NSCoder} aCoder
    @returns NSClipView
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this._docView = aCoder.decodeObjectForKey("NSDocView");
    return this;
  },
  
  /**
    @param {NSColor} color
  */
  setBackgroundColor: function(color) {
    this._backgroundColor = color;
  },
  
  /**
    @returns NSColor
  */
  backgroundColor: function() {
    return this._backgroundColor;
  },
  
  /**
    @param {Boolean} flag
  */
  setDrawsBackground: function(flag) {
    this._drawsBackground = flag;
  },
  
  /**
    @returns Boolean
  */
  drawsBackground: function() {
    return this._drawsBackground;
  },
  
  /**
    @param {NSView} aView
  */
  setDocumentView: function(aView) {
    this._docView = aView;
  },
  
  /**
    @returns NSView
  */
  documentView: function() {
    return this._docView;
  },
  
  /**
    The rect of the document's frame. This is used along with the bounds
    of the clip view for the scrollview to calculate knob positions.
  
    @returns NSRect
  */
  documentRect: function() {
    this._docRect = this._docView.frame();
    return this._docRect;
  },
  
  /**
    @param {NSCursor} aCursor
  */
  setDocumentCursor: function(aCursor) {
    
  },
  
  /**
    @returns NSCursor
  */
  documentCursor: function() {
    
  },
  
  /**
    The rect of the visible area of the document's frame.
  
    @returns NSRect
  */
  documentVisibleRect: function() {
    return this.convertRectToView(this.bounds(), this._docView);
  },
  
  /**
    @param {NSNotification} aNotification
  */
  viewFrameChanged: function(aNotification) {
    
  },
  
  /**
    @param {NSNotification} aNotification
  */
  viewBoundsChanged: function(aNotification) {
    
  },
  
  /**
    @param {Boolean} flag
  */
  setCopiesOnScroll: function(flag) {
    
  },
  
  /**
    @returns Boolean
  */
  copiesOnScroll: function() {
    
  },
  
  /**
    @param {NSEvent} theEvent
    @returns Boolean
  */
  autoscroll: function(theEvent) {
    
  },
  
  /**
    @param {NSPoint} newOrigin
    @returns NSPoint
  */
  constrainScrollPoint: function(newOrigin) {
    var docRect = this.documentRect();
    var bounds = this.bounds();
    return NSMakePoint(0, newOrigin.y - (docRect.size.height - bounds.size.height));
  },
  
  /**
    @param {NSPoint} newOrigin
  */
  scrollToPoint: function(newOrigin) {
    this._docView.setFrameOrigin(this.constrainScrollPoint(newOrigin));
  }
});

/**
  @mixin NSClipViewSuperview
  @class NSView
*/
NSView.mixin({
  
  /**
    @param {NSClipView} aClipView
  */
  reflectScrolledClipView: function(aClipView) {
    
  },
  
  /**
    @param {NSClipView} aClipView
    @param {NSPoint} aPoint
  */
  scrollClipViewToPoint: function(aClipView, aPoint) {
    
  }
});

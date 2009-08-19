/* 
 * scroller.js
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
 

// NSScroller Vertical
// resource('NSScrollerBottomArrowNormal.png');  // 15 x 18
// resource('NSScrollerTopArrowNormal.png');     // 15 x 30
// resource('NSScrollerTopSlotNormal.png');    // 15 x 18
// resource('NSScrollerVBackgroundNormal.png');  // 15 x 6
// 
// resource('NSScrollerTopKnobNormal.png');    // 15 x 10
// resource('NSScrollerBottomKnobNormal.png');   // 15 x 10
// resource('NSScrollerVerticalKnobNormal.png');   // 15 x 1
// 
// // NSScroller Horizontal
// resource('NSScrollerRightArrowNormal.png');   // 18 x 15
// resource('NSScrollerLeftArrowNormal.png');    // 30 x 15
// resource('NSScrollerLeftSlotNormal.png');     // 18 x 15
// resource('NSScrollerHBackgroundNormal.png');  // 6 x 15
// 
// resource('NSScrollerLeftKnobNormal.png');     // 10 x 15
// resource('NSScrollerRightSlotNormal.png');    // 10 x 15
resource('NSScrollerHorizontalKnobNormal.png'); // 1 x 15

// NSScrollArrowPosition
var NSScrollerArrowsDefaultSetting	= 0;
var NSScrollerArrowsNone	     	= 2;

// NSUsableScrollerParts
var NSNoScrollerParts			  = 0;
var NSOnlyScrollerArrows		  = 1;
var NSAllScrollerParts			  = 2;

// NSScrollerPart
var NSScrollerNoPart			  = 0;
var NSScrollerDecrementPage		  = 1;
var NSScrollerKnob			    = 2;
var NSScrollerIncrementPage		  = 3;
var NSScrollerDecrementLine  	  = 4;
var NSScrollerIncrementLine	 	  = 5;
var NSScrollerKnobSlot			  = 6;

// NSScrollerArrow
var NSScrollerIncrementArrow    = 0;
var NSScrollerDecrementArrow	  = 1;

var NSScroller = NSView.extend({
  
  _isVertical: null,
  
  /**
    Proportion of the available area that the knob takes up
    
    0.0 being the min - this does not mean a size of 0.0. If below a min size
    (say 20px for example), then the knob should remian a min size, to ensure
    it is still visible and still scrollable
    
    1.0 being the max - it fills the slot 100%.
  */
  _knobProportion: null,
  
  /**
    value , between 0,0 and 1.0. the position depends upon the size of the
    knob. 
  */
  _value: null,
  
  /*
    @ivar _knobTrackStartPoint - NSPoint
    Used to maintain the start point that the mouse was pressed when tracking.
    It is important to know at what point the mouse was pressed so that the
    position within the knob can be calculated.
  */
  _knobTrackStartPoint: null,
  
  /**
    @type VN.String
  */
  renderTagName: 'div',
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-scroller',
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    
    this._isVertical = (this.bounds.size.width < this.bounds.size.height) ? true : false;
    
    this._value = aCoder.decodeDoubleForKey("NSCurValue");
    if (!this._value)
      this._value = 1;
      
    this._knobProportion = aCoder.decodeDoubleForKey("NSPercent");
    if (!this._knobProportion)
      this._knobProportion = 1;
    
          
    return this;
  },
  
  renderRect: function(aRect, firstTime, context) {
    if (firstTime) {
      context.push('div', 'vn-scroller-top');
      context.push('div', 'vn-scroller-knob');
      context.push('div', 'vn-scroller-middle');
      context.push('div', 'vn-scroller-up');
      context.push('div', 'vn-scroller-down');
    }
      
    // this.renderBezel(aRect, firstTime, context);
      // this.renderInteriorWithFrame(cellFrame, controlView, firstTime, context);
    // this.renderTitle(this._value, this.titleRectForBounds(aRect), firstTime, context);
  },
  
  drawRect: function(aRect) {
    var c = NSGraphicsContext.currentContext().graphicsPort();
    
    if (this._isVertical) {
      this.drawKnobSlotInRect(this.rectForPart(NSScrollerKnobSlot), false);
      NSImage.imageNamed('NSScrollerTopSlotNormal.png').drawInRect(NSMakeRect(0, 0, 15, 18));
      
      this.drawArrow(NSScrollerIncrementArrow, false);
      this.drawArrow(NSScrollerDecrementArrow, false);
       
      this.drawKnob();
    }
    else {
      this.drawKnobSlotInRect(this.rectForPart(NSScrollerKnobSlot), false);
      NSImage.imageNamed('NSScrollerLeftSlotNormal.png').drawInRect(NSMakeRect(0, 0, 18, 15));

      this.drawArrow(NSScrollerIncrementArrow, false);
      this.drawArrow(NSScrollerDecrementArrow, false);

      this.drawKnob();
    }
  },
  
  drawParts: function() {
    
  },
  
  /**
    One value from NSScrollerPart
  */
  rectForPart: function(partCode) {
    if (this._isVertical) {
      switch (partCode) {
        case NSScrollerKnobSlot:
          return NSMakeRect(0, 8, 15, this.bounds.size.height - 45);
          break;
        case NSScrollerIncrementLine:
          // bottom arrow (facing down)
          return NSMakeRect(0, this.bounds.size.height - 18, 15, 18);
          break;
        case NSScrollerDecrementLine:
          // top arrow
          return NSMakeRect(0, this.bounds.size.height - (18 + 30), 15, 30);
          break;
        case NSScrollerNoPart:
          // returns the area between slot and top arrow
          return NSMakeRect(0, 18, 15, this.bounds.size.height - (18 + 30 + 18));
          break;
        
        case NSScrollerKnob:
          var slotRect = this.rectForPart(NSScrollerKnobSlot);
          var scrollerHeight = this._knobProportion * slotRect.size.height;
          var yOffset = (slotRect.size.height - scrollerHeight) * this._value;
          return NSMakeRect(0, yOffset + slotRect.origin.y, 15, scrollerHeight);
          break;
      }
    }
    else {
      switch (partCode) {
        case NSScrollerKnobSlot:
          return NSMakeRect(8, 0, this.bounds.size.width - 45, 15);
          break;
        case NSScrollerIncrementLine:
          // bottom arrow (facing down)
          return NSMakeRect(this.bounds.size.width - 18, 0, 18, 15);
          break;
        case NSScrollerDecrementLine:
          // top arrow
          return NSMakeRect(this.bounds.size.width - (18 + 30), 0, 30, 15);
          break;
        case NSScrollerNoPart:
          // returns the area between slot and top arrow
          return NSMakeRect(18, 0, this.bounds.size.width - (18 + 30 + 18), 15);
          break;
        
        case NSScrollerKnob:
          var slotRect = this.rectForPart(NSScrollerKnobSlot);
          var scrollerWidth = this._knobProportion * slotRect.size.width;
          var xOffset = (slotRect.size.width - scrollerWidth) * this._value;
          return NSMakeRect(xOffset + slotRect.origin.x, 0, scrollerWidth, 15);
          break;
      }
    }
    return NSMakeRect(0, 0, 0, 0);
  },
  
  checkSpaceForParts: function() {
    
  },
  
  /*
    One from NSUsableScrollerParts
  */
  usableParts: function() {
    
  },
  
  /*
    One from NSScrollArrowPosition
  */
  setArrowsPosition: function(position) {
    
  },
  
  arrowsPosition: function() {
    
  },
  
  /*
    @param anArrow - NSScrollArrow
    @param highlight - Boolean
  */
  drawArrow: function(anArrow, highlight) {
    if (anArrow == NSScrollerIncrementArrow) {
      var theRect = this.rectForPart(NSScrollerIncrementLine);
      if (this._isVertical)
        NSImage.imageNamed('NSScrollerBottomArrowNormal.png').drawInRect(theRect);
      else
        NSImage.imageNamed('NSScrollerRightArrowNormal.png').drawInRect(theRect);
    }
    else if (anArrow == NSScrollerDecrementArrow) {
      var theRect = this.rectForPart(NSScrollerDecrementLine);
      if (this._isVertical)
        NSImage.imageNamed('NSScrollerTopArrowNormal.png').drawInRect(theRect);
      else
        NSImage.imageNamed('NSScrollerLeftArrowNormal.png').drawInRect(theRect);
    }
    
  },
  
  drawKnob: function() {
    var knobRect = this.rectForPart(NSScrollerKnob);
    if (this._isVertical) {
      NSImage.imageNamed('NSScrollerTopKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y, 15, 10));
      NSImage.imageNamed('NSScrollerVerticalKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y + 10, 15, knobRect.size.height - 20));
      NSImage.imageNamed('NSScrollerBottomKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y + 10 + (knobRect.size.height - 20), 15, 10));
    }
    else {
      // NSImage.imageNamed('NSScrollerLeftKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y, 10, 15));
      // NSImage.imageNamed('NSScrollerHorizontalKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x + 10, knobRect.origin.y, knobRect.size.width - 20, 15));
      // NSImage.imageNamed('NSScrollerRightKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x + 10 + (knobRect.size.width - 20), knobRect.origin.y, 10, 15));
    }
  },
  
  /*
    @param slotRect - NSRect
    @param highlight - Boolean
  */
  drawKnobSlotInRect: function(slotRect, highlight) {
    if (this._isVertical)
      NSImage.imageNamed('NSScrollerVBackgroundNormal.png').drawInRect(slotRect);
    else
      NSImage.imageNamed('NSScrollerHBackgroundNormal.png').drawInRect(slotRect);
  },
  
  /*
    @param highlight - Boolean
  */
  highlight: function(flag) {
    
  },
  
  /*
    @param thePoint - NSPoint
    @return NSScrollerPart
  */
  testPart: function(thePoint) {
    if (NSPointInRect(thePoint, this.rectForPart(NSScrollerKnob)))
      return NSScrollerKnob;    
    return -1;
  },
  
  /*
    @param theEvent - NSEvent
  */
  trackKnob: function(theEvent) {
    var location = this.convertPointFromView(theEvent.locationInWindow(), null);
    // Temp fix for inverted co-ord (cocoa origin bottom left)
    location.y = this.bounds.size.height - location.y;
    this._knobTrackStartPoint = location;
    
    NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
      
      if (theEvent.type() == NSLeftMouseUp) {
        NSApplication.sharedApplication().unbindEvents();
        return;
      }
      
      var location = this.convertPointFromView(theEvent.locationInWindow(), null);
      // Temp fix for inverted co-ord (cocoa origin bottom left)
      location.y = this.bounds.size.height - location.y;
      
      var knobRect = this.rectForPart(NSScrollerKnob);
      var slotRect = this.rectForPart(NSScrollerKnobSlot);
      // var change = (location.y - this._knobTrackStartPoint.y) * knobRect.size.height;
      var offsetY = (location.y - this._knobTrackStartPoint.y) / (slotRect.size.height - knobRect.size.height);// - knobRect.origin.y;
      // var newValue = offsetY / (slotRect.size.height - knobRect.size.height);
      this.setDoubleValue(offsetY + 0.5);
      // this.setNeedsDisplay(true);
      // console.log(offsetY + '(' + this._value + ')');
    });
  },
  
  setDoubleValue: function(aDouble) {
    if (aDouble < 0)
      this._value = 0;
    else if (aDouble > 1)
      this._value = 1;
    else
      this._value = aDouble;
    
    this.setNeedsDisplay(true);
  },
  
  /*
    @param theEvent - NSEvent
  */
  trackScrollButtons: function(theEvent) {
    
  },
  
  /*
    @return NSScrollerPart
  */
  hitPart: function() {
    
  },
  
  /*
    @return CGFloat
  */
  knobProportion: function() {
    return this._knobProportion;
  },
  
  /*
    @param knobProportion - CGFloat
  */
  setKnobProportion: function(knobProportion) {
    this._knobProportion = knobProportion;
    this.setNeedsDisplay(true);
  },
  
  /*
    @param theEvent - NSEvent
  */
  mouseDown: function(theEvent) {
    var location = this.convertPointFromView(theEvent.locationInWindow(), null);
    // Temp fix for inverted co-ord (cocoa origin bottom left)
    location.y = this.bounds.size.height - location.y;
    var theTarget = this.testPart(location);
    
    switch (theTarget) {
      case NSScrollerKnob:
        this.trackKnob(theEvent);
        break;
      default:
        break;
    }
  }
});

/*
  Scroller width. To keep in with Interface builder, scrollers are 15px
  wide (or height if horizontal scroller).
*/
NSScroller.scrollerWidth = function() {
  return 15;
};

/* 
 * cell.js
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
  @class VN.Cell
  @extends VN.Object
*/
var NSCell = VN.Cell = VN.Object.extend({
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Cell
  */
  initWithCoder: function(aCoder) {
    this.value = aCoder.decodeObjectForKey("NSContents");
    var flags = aCoder.decodeIntForKey("NSCellFlags");
    var flags2 = aCoder.decodeIntForKey("NSCellFlags2");
    this.state = (flags & 0x80000000) ? VN.ON_STATE : VN.OFF_STATE;
    this.isHighlighted = (flags & 0x40000000) ? true : false;
    this.isEnabled = (flags & 0x20000000) ? false : true;

    this.isEditable = (flags & 0x10000000) ? true : false;
    this.isBordered = (flags & 0x00800000) ? true : false;
    this.isBezeled = (flags & 0x00400000) ? true : false;
    this.isSelectable = (flags & 0x00200000) ? true : false;
    this.isScrollable = (flags & 0x00100000) ? true : false;
    this.alignment = (flags2 & 0x1c000000) >> 26;
    this.controlSize = (flags2 & 0xE0000) >> 17;
    this.isContinuous = (flags & 0x00080100) ? true : false;
    
    this.lineBreakMode = (flags & 0x00007000) >> 12;
    this.wraps = (flags & 0x40) ? false : true;
    this.font = aCoder.decodeObjectForKey("NSSupport");
    return this;
  },
  
  /**
    @param {VN.String} aString
    @returns VN.Cell
  */
  initTextCell: function(aString) {
    
  },
  
  /**
    @param {VN.Image} image
    @returns VN.Cell
  */
  initImageCell: function(image) {
    
  },
  
  /**
    @type VN.Control
  */
  controlView: null,
  
  /**
    @type VN.CellType
  */
  cellType: null,
  
  /**
    @type Integer
  */
  state: null,
  
  /**
    @type VN.Object
  */
  target: null,
  
  /**
    @type Selector
  */
  action: null,
  
  /**
    @type Integer
  */
  tag: null,
  
  /**
    @param {VN.String} aString
  */
  setTitle: function(aString) {
    this._value = aString;
  },
  
  /**
    @returns VN.String
  */
  title: function() {
    return this._title;
  },
  
  /**
    @returns Boolean
  */
  isOpaque: function() {
    return false;
  },
  
  /**
    @type Boolean
  */
  isEnabled: null,
  
  /**
    @type Boolean
  */
  isContinuous: null,
  
  /**
    @type Boolean
  */
  isEditable: null,

  /**
    @type Boolean
  */
  isSelectable: null,
  
  /**
    @type Boolean
  */
  isBordered: null,
  
  /**
    @type Boolean
  */
  isBezeled: null,
  
  /**
    @type Boolean
  */
  isScrollable: null,
 
  /**
		Enabling scrolling means that the cell cannot wrap. Override scrollable
		to set wraps to false if scrollable is true.
		
    @param {Boolean} flag
  */
  setScrollable: function(flag) {
    this.isScrollable = flag;
    if (flag) this.setValueForKey(false, 'wraps');
  },
  
  /**
    @type Boolean
  */
  isHighlighted: null,

  /**
    @type VN.TextAlignment
  */
  alignment: null,
  
  /**
    @type Boolean
  */
  wraps: null,
  
  /**
    @param {Boolean} flag
  */
  setWraps: function(flag) {
    this._wraps = flag;
    if (flag) this.setValueForKey('false', 'isScrollable');
  },
  
  /**
    @type VN.Font
  */
  font: null,
  
  /**
    @param {VN.String} aString
    @returns Boolean
  */
  isEntryAcceptable: function(aString) {
    return true;
  },
  
  /**
    @returns VN.String
  */
  keyEquivalent: function() {
    return "";
  },
  
  /**
    @type VN.Formatter
  */
  formatter: null,
  
  /**
    @type Object
  */
  value: null,
  
  /**
    @returns Object
  */
  objectValue: function() {
    return this.value;
  },
  
  /**
    @param {Object} obj
  */
  setObjectValue: function(obj) {
    this.value = obj;
  },
  
  /**
    @returns Boolean
  */
  hasValidObjectValue: function() {
    return true;
  },
  
  /**
    @returns VN.String
  */
  stringValue: function() {
    return this.value;
  },
  
  /**
    @param {VN.String} aString
  */
  setStringValue: function(aString) {
    this.value = aString;
  },
  
  /**
    @param {VN.Cell} otherCell
    @returns VN.ComparisonResult
  */
  compare: function(otherCell) {
    return 0;
  },
  
  /**
    @returns Integer
  */
  intValue: function() {
    return this.value;
  },
  
  /**
    @param {Integer} anInt
  */
  setIntValue: function(anInt) {
    this.value = anInt;
  },
  
  /**
    @retuns Float
  */
  floatValue: function() {
    return this.value;
  },
  
  /**
    @param {Float} aFloat
  */
  setFloatValue: function(aFloat) {
    this.value = aFloat;
  },
  
  /**
    @retuns Float
  */
  doubleValue: function() {
    return this.value;
  },
  
  /**
    @param {Float} aFloat
  */
  setDoubleValue: function(aFloat) {
    this.value = aFloat;
  },
  
  /**
    @param {VN.Object} sender
  */
  takeIntValueFrom: function(sender) {
    this.setIntValue(sender.intValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeFloatValueFrom: function(sender) {
    this.setFloatValue(sender.floatValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeDoubleValueFrom: function(sender) {
    this.setDoubleValue(sender.doubleValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeStringValueFrom: function(sender) {
    this.setStringValue(sender.stringValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeObjectValueFrom: function(sender) {
    this.setObjectValue(sender.objectValue());
  },
  
  /**
    @type VN.Image
  */
  image: null,
  
  /**
    @type VN.ControlTint
  */
  controlTint: null,
  
  /**
    @type VN.ControlSize
  */
  controlSize: null,
   
  /**
    @type VN.Object
  */
  representedObject: null,
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  imageRectForBounds: function(theRect) {
    return theRect;
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  titleRectForBounds: function(theRect) {
    return theRect;
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  drawingRectForBounds: function(theRect) {
    return theRect;
  },
  
  /**
    @returns VN.Size
  */
  cellSize: function() {
    return VN.MakeSize(0, 0);
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Size
  */
  cellSizeForBounds: function(theRect) {
    return theRect.size;
  },
  
  /**
    @param {VN.Rect} theRect
  */
  calcDrawInfo: function(theRect) {
    // calculate bounds etc
  },
  
  /**
    @param {VN.Text} textObj
    @returns VN.Text
  */
  setUpFieldEditorAttributes: function(textObj) {
    textObj.setAlignment(this.alignment());
    textObj.setString(this.stringValue());
    textObj.setSelectable(this.isSelectable());
    textObj.setEditable(this.isEditable());
    textObj.setFont(this.font());
    
    if (this.respondsTo('drawsBackground'))
      textObj.setDrawsBackground(this.drawsBackground());
    
    if (this.respondsTo('backgroundColor'))
      textObj.setBackgroundColor(this.backgroundColor());
    
    return textObj;
  },
  
  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  renderInteriorWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    // render interior: images etc
  },

  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */  
  renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    // main rendering control
  },
  
  /**
    @param {Boolean} flag
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  highlightWithFrameInView: function(flag, cellFrame, controlView, renderContext, firstTime) {
    this.setValueForKey(flag, 'highlighted');
    this.renderWithFrameInView(cellFrame, controlView, renderContext, firstTime);
  },
  
  /**
    @returns Integer
  */
  mouseDownFlags: function() {
    // return previously used mouse down flags
  },
  
  /**
    @param {VN.Point} startPoint
    @param {VN.View} controlView
    @returns Boolean
  */
  startTrackingInView: function(startPoint, controlView) {
    return this.isEnabled;
  },
  
  /**
    @param {VN.Point} lastPoint
    @param {VN.Point} currentPoint
    @param {VN.View} controlView
    @returns Boolean
  */
  continueTrackingInView: function(lastPoint, currentPoint, controlView) {
    return true;
  },
  
  /**
    @param {VN.Point} lastPoint
    @param {VN.Point} stopPoint
    @param {VN.View} controlView
    @param {Boolean} mouseIsUp
  */
  stopTrackingInView: function(lastPoint, stopPoint, controlView, mouseIsUp) {
    // informed that tracking has finished
  },
  
  /**
    @param {VN.Event} theEvent
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {Boolean} untilMouseIsUp
    @returns Boolean
  */
  trackMouseInView: function(theEvent, cellFrame, controlView, untilMouseIsUp) {
    var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
    if (!(this.startTrackingInView(theEvent.locationInWindow(), controlView)))
      return false;
    
    this.highlightWithFrameInView(true, cellFrame, controlView, controlView.renderContext, false);
    if (this.isContinuous)
      NSApplication.sharedApplication().sendAction(this._action, this._target, this);
    
    // for every further event
    NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
      var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
      
      if (untilMouseIsUp) {
        if (theEvent.type() == VN.LEFT_MOUSE_UP) {
          this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, true);
          NSApplication.sharedApplication().unbindEvents();
          
          this.state = (this.state == VN.OFF_STATE) ? VN.ON_STATE : VN.OFF_STATE;
          // this.setHighlighted(false);
          
          if (NSPointInRect(location, cellFrame))
            NSApplication.sharedApplication().sendAction(this.action, this.target, this.controlView);
          
          this.highlightWithFrameInView(false, cellFrame, controlView, controlView.renderContext, false);
          return;
        }
        else {
          if (!(this.continueTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView))) {
            NSApplication.sharedApplication().unbindEvents();
          }
          
          this.highlightWithFrameInView(NSPointInRect(location, cellFrame) ? true : false, cellFrame, controlView, controlView.renderContext, false);
        }
      }
      else if (NSPointInRect(location, cellFrame)) {
        console.log('Got here in frame');
      }
      else {
        console.log('moved out fo frame');
        this.stopTracking(theEvent.locationInWindow(), theEvent.locationInWindow(), false);
        NSApplication.sharedApplication().unbindEvents();
      }
      
      // draw frame
      
      if (this.isContinuous) {
         NSApplication.sharedApplication().sendAction(this.action, this.target, this);
      }
    });
  },
  
  /**
    @param {VN.Rect} aRect
    @param {VN.View} controlView
    @param {VN.Text} textObj
    @param {VN.Object} aDelegate
    @param {VN.Event} theEvent
  */
  editWithFrameInView: function(aRect, controlView, textObj, aDelegate, theEvent) {
    if (!this.isEditable() && !this.isSelectable())
      return;

    textObj.setFrame(this.titleRectForBounds(aRect));
    controlView.addSubview(textObj);
    controlView.window().makeFirstResponder(textObj);
    textObj.setDelegate(anObject);
    textObj.mouseDown(theEvent);
  },
  
  /**
    @param {VN.Rect} aRect
    @param {VN.View} controlView
    @param {VN.Text} textObj
    @param {VN.Object} aDelegate
    @param {Integer} start
    @param {Integer} length
  */
  selectWithFrameInView: function(aRect, controlView, textObj, aDelegate, start, length) {
    if (!this.isEditable() && !this.isSelectable()) return;

    textObj.setFrame(this.titleRectForBounds(aRect));
    controlView.addSubview(textObj);
    controlView.window().makeFirstResponder(textObj);
    textObj.setDelegate(anObject);
    textObj.setSelectedRange(null);
  },
  
  /**
    @param {VN.Text} textObj
  */
  endEditing: function(textObj) {
    this.setStringValue(textObj.string());
  },
  
  /**
    @type VN.Menu
  */
  menu: null,
  
  /**
    @type Boolean
  */
  sendsActionOnEndEditing: null,
  
  /**
    @type VN.LineBreakMode
  */
  lineBreakMode: null,
  
  /**
    @type Boolean
  */
  allowsUndo: null,
});


/**
  @mixin VN.KeyboardUI
  @class VN.Cell
*/
VN.Cell.mixin({
  
  /**
    @type Boolean
  */
  refusesFirstResponder: null,
  
  /**
    @returns Boolean
  */
  acceptsFirstResponder: function() {
    return !this.valueForKey('refusesFirstResponder');
  },
  
  /**
    @type Boolean
  */
  showsFirstResponder: null,
  
  /**
    @param {VN.Object} sender
  */
  performClick: function(sender) {
    // send action. on space bar
  } 
});


/**
  @mixin VN.CellAttributedStringMethods
  @class VN.Cell
*/
VN.Cell.mixin({
  
  /**
    @returns VN.AttributedString
  */
  attributedStringValue: function() {
    return this._value;
  },
  
  /**
    @param {VN.AttributedString} obj
  */
  setAttributedStringValue: function(obj) {
    this._value = obj;
  },
  
  /**
    @type Boolean
  */
  allowsEditingTextAttributes: null,
  
  /**
    @param {Boolean} flag
  */
  setAllowsEditingTextAttributes: function(flag) {
    this.allowsEditingTextAttributes = flag;
    if (!flag) this.setValueForKey(false, 'importsGraphics');
  },
  
  /**
    @type Boolean
  */
  importsGraphics: null,
  
  /**
    @param {Boolean} flag
  */
  setImportsGraphics: function(flag) {
    this._importsGraphics = flag;
    if (flag) this.setImportsGraphics(true);
  }
});


/**
  @mixin VN.CellMixedState
  @class VN.Cell
*/
VN.Cell.mixin({
  
  /**
    @type Boolean
  */
  allowsMixedState: null,
  
  /**
    @retuns Integer
  */
  nextState: function() {
    return VN.ON_STATE
  },
  
  /**
    Gets the next state and sets it on the cell
  */
  setNextState: function() {
    this.setValueForKey(this.nextState(), 'state');
  }
});

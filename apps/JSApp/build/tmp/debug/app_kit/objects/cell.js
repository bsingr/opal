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


VN.ANY_TYPE                           = 0;
VN.INT_TYPE                           = 1;
VN.POSITIVE_INT_TYPE                  = 2;
VN.FLOAT_TYPE                         = 3;
VN.POSITIVE_FLOAT_TYPE                = 4;
VN.DOUBLE_TYPE                        = 6;
VN.POSITIVE_DOUBLE_TYPE               = 7;
                                        
/**
    VN.CellType
*/
VN.NULL_CELL_TYPE                     = 0;
VN.TEXT_CELL_TYPE                     = 1;
VN.IMAGE_CELL_TYPE                    = 2;
                                        
/**
    VN.CellAttribute
*/                      
VN.CELL_DISABLED                      = 0;
VN.CELL_STATE                         = 1;
VN.PUSH_IN_CELL                       = 2;
VN.CELL_EDITABLE                      = 3;
VN.CHANGE_GRAY_CELL                   = 4;
VN.CELL_HIGHLIGHTED                   = 5;
VN.CELL_LIGHTS_BY_CONTENTS            = 6;
VN.CELL_LIGHTS_BY_GRAY                = 7;
VN.CHANGE_BACKGROUND_CELL             = 8;
VN.CELL_LIGHTS_BY_BACKGROUND          = 9;
VN.CELL_IS_BORDERED                   = 10;
VN.CELL_HAS_OVERLAPPING_IMAGE         = 11;
VN.CELL_HAS_IMAGE_HORIZONTAL          = 12;
VN.CELL_HAS_IMAGE_ON_LEFT_OR_BOTTOM   = 13;
VN.CELL_CHANGES_CONTENTS              = 14;
VN.CELL_IS_INSET_BUTTON               = 15;
VN.CELL_ALLOWS_MIXED_STATE            = 16;
                                        

// VN.CellImagePosition constants

/**
    draw the cell as if there is no image
*/
VN.NO_IMAGE = 0;

/**
    Only draw the cell's image: do not draw other interior items like the title
*/
VN.IMAGE_ONLY = 1;

/**
    Draw the image on the left side of the cell, so that the title sits to the
    right hand side
*/
VN.IMAGE_LEFT = 2;

/**
    Draw the image on the right side of the cell, so that the title sits to the
    left hand side
*/
VN.IMAGE_RIGHT                        = 3;
VN.IMAGE_BELOW                        = 4;
VN.IMAGE_ABOVE                        = 5;
VN.IMAGE_OVERLAPS                     = 6;
                                        
/**
    VN.ImageScaling
*/                       
VN.IMAGE_SCALE_PROPORTIONALLY_DOWN      = 0;
VN.IMAGE_SCALE_AXES_INDEPENDENTLY       = 1;
VN.IMAGE_SCALE_NONE                     = 2;
VN.IMAGE_SCALE_PROPORTIONALLY_UP_OR_DOWN = 3;

/**
    VN.CellStateValue
*/
VN.MIXED_STATE                        = -1;
VN.OFF_STATE                          = 0;
VN.ON_STATE                           = 1;
                                        
VN.NO_CELL_MASK                       = 0;
VN.CONTENTS_CELL_MASK                 = 1;
VN.PUSH_IN_CELL_MASK                  = 2;
VN.CHANGE_GRAY_CELL_MASK              = 4;
VN.CHANGE_BACKGROUND_CELL_MASK        = 8;

VN.DEFAULT_CONTROL_TINT               = 0;
VN.BLUE_CONTROL_TINT                  = 1;
VN.GRAPHITE_CONTROL_TINT              = 6;
VN.CLEAR_CONTROL_TINT                 = 7;

/**
    VN.ControlSize
*/
VN.REGULAR_CONTROL_SIZE               = 0;
VN.SMALL_CONTROL_SIZE                 = 1;
VN.MINI_CONTROL_SIZE                  = 2;

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
        this._value = aCoder.decodeObjectForKey("NSContents");
        var flags = aCoder.decodeIntForKey("NSCellFlags");
        var flags2 = aCoder.decodeIntForKey("NSCellFlags2");
        this._state = (flags & 0x80000000) ? VN.ON_STATE : VN.OFF_STATE;
        this._isHighlighted = (flags & 0x40000000) ? true : false;
        this._isEnabled = (flags & 0x20000000) ? false : true;

        this._isEditable = (flags & 0x10000000) ? true : false;
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._isBezeled = (flags & 0x00400000) ? true : false;
        this._isSelectable = (flags & 0x00200000) ? true : false;
        this._isScrollable = (flags & 0x00100000) ? true : false;
        this._alignment = (flags2 & 0x1c000000) >> 26;
        this._controlSize = (flags2 & 0xE0000) >> 17;
        this._isContinuous = (flags & 0x00080100) ? true : false;
        
        this._lineBreakMode = (flags & 0x00007000) >> 12;
        this._wraps = (flags & 0x40) ? false : true;
        this._font = aCoder.decodeObjectForKey("NSSupport");
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
        @type VN.View
    */
    _controlView: null,
    
    /**
        @returns VN.View
    */
    controlView: function() {
        return this._controlView;
    },
    
    /**
        @param {VN.View} aView
    */
    setControlView: function(aView) {
        this._controlView = aView;
    },
    
    /**
        @type VN.CellType
    */
    _cellType: null,
    
    /**
        @returns VN.CellType
    */
    type: function() {
        return this._type;
    },
    
    /**
        @param {VN.CellType} aType
    */
    setType: function(aType) {
        this._type = aType;
    },
    
    /**
        @type Integer
    */
    _state: null,
    
    /**
        @returns {Integer}
    */
    state: function() {
        return this._state;
    },
    
    /**
        @param {Integer} value
    */
    setState: function(value) {
        this._state = value;
    },
    
    /**
        @type VN.Object
    */
    _target: null,
    
    /**
        @returns VN.Object
    */
    target: function() {
        return this._target;
    },
    
    /**
        @param {VN.Object} anObject
    */
    setTarget: function(anObject) {
        this._target = anObject;
    },
    
    /**
        @type Selector
    */
    _action: null,
    
    /**
        @returns Selector
    */
    action: function() {
        return this._action;
    },
    
    /**
        @param {Selector} anAction
    */
    setAction: function(anAction) {
        this._action = anAction;
    },
    
    /**
        @type Integer
    */
    _tag: null,
    
    /**
        @param {integer} anInt
    */
    setTag: function(anInt) {
        this._tag = anInt;
    },
    
    /**
        @returns Integer
    */
    tag: function() {
        return this._tag;
    },
    
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
    _isEnabled: null,
    
    /**
        @returns Boolean
    */
    isEnabled: function() {
        return this._isEnabled;
    },
    
    /**
        @param {Boolean} flag
    */
    setEnabled: function(flag) {
        this._isEnabled = flag;
    },
    
    /**
        @type Boolean
    */
    _isContinuous: null,
    
    /**
        @returns Boolean
    */
    isContinuous: function() {
        return this._isContinuous;
    },
    
    /**
        @param {Boolean} flag
    */
    setContinuous: function(flag) {
        this._isContinuous = flag;
    },
    
    /**
        @type Boolean
    */
    _isEditable: null,
    
    /**
        @returns Boolean
    */
    isEditable: function() {
        return this._isEditable;
    },
    
    /**
        @param {Boolean} flag
    */
    setEditable: function(flag) {
        this._isEditable = flag;
    },
    
    /**
        @type Boolean
    */
    _isSelectable: null,
    
    /**
        @returns Boolean
    */
    isSelectable: function() {
        return this._isSelectable;
    },
    
    /**
        @param {Boolean} flag
    */
    setSelectable: function(flag) {
        this._isSelectable = flag;
    },
    
    /**
        @type Boolean
    */
    _isBordered: null,
    
    /**
        @returns Boolean
    */
    isBordered: function() {
        return this._isBordered;
    },
    
    /**
        @param {Boolean} flag
    */
    setBordered: function(flag) {
        this._isBordered = flag;
    },
    
    /**
        @type Boolean
    */
    _isBezeled: null,
    
    /**
        @returns Boolean
    */
    isBezeled: function() {
        return this._isBezeled;
    },
    
    /**
        @param {Boolean} flag
    */
    setBezeled: function(flag) {
        this._isBezeled = flag;
    },
    
    /**
        @type Boolean
    */
    _isScrollable: null,
    
    /**
        @returns Boolean
    */
    isScrollable: function() {
        return this._isScrollable;
    },
    
    /**
        @param {Boolean} flag
    */
    setScrollable: function(flag) {
        this._isScrollable = flag;
        if (flag) this.setWraps(false);
    },
    
    /**
        @type Boolean
    */
    _isHighlighted: null,
    
    /**
        @returns Boolean
    */
    isHighlighted: function() {
        return this._isHighlighted;
    },
    
    /**
        @param {Boolean} flag
    */
    setHighlighted: function(flag) {
        this._isHighlighted = flag;
    },
    
    /**
        @type VN.TextAlignment
    */
    _alignment: null,
    
    /**
        @returns VN.TextAlignment
    */
    alignment: function() {
        return this._alignment;
    },
    
    /**
        @param {VN.TextAlignment} mode
    */
    setAlignment: function(mode) {
        this._alignment = mode;
    },
    
    /**
        @type Boolean
    */
    _wraps: null,
    
    /**
        @returns Boolean
    */
    wraps: function() {
        return this._wraps;
    },
    
    /**
        @param {Boolean} flag
    */
    setWraps: function(flag) {
        this._wraps = flag;
        if (flag) this.setScrollable(false);
    },
    
    /**
        @type VN.Font
    */
    _font: null,
    
    /**
        @param {VN.Font} fontObj
    */
    setFont: function(fontObj) {
        this._font = fontObj;
    },
    
    /**
        @returns VN.Font
    */
    font: function() {
        return this._font;
    },
    
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
    _formatter: null,
    
    /**
        @param {VN.Formatter} newFormatter
    */
    setFormatter: function(newFormatter) {
        this._formatter = newFormatter;
    },
    
    /**
        @returns VN.Formatter
    */
    formatter: function() {
        return this._formatter;
    },
    
    /**
        @type Object
    */
    _value: null,
    
    /**
        @returns Object
    */
    objectValue: function() {
        return this._value;
    },
    
    /**
        @param {Object} obj
    */
    setObjectValue: function(obj) {
        this._value = obj;
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
        return this._value;
    },
    
    /**
        @param {VN.String} aString
    */
    setStringValue: function(aString) {
        this._value = aString;
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
        return this._value;
    },
    
    /**
        @param {Integer} anInt
    */
    setIntValue: function(anInt) {
        this._value = anInt;
    },
    
    /**
        @retuns Float
    */
    floatValue: function() {
        return this._value;
    },
    
    /**
        @param {Float} aFloat
    */
    setFloatValue: function(aFloat) {
        this._value = aFloat;
    },
    
    /**
        @retuns Float
    */
    doubleValue: function() {
        return this._value;
    },
    
    /**
        @param {Float} aFloat
    */
    setDoubleValue: function(aFloat) {
        this._value = aFloat;
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
    _image: null,
    
    /**
        @returns VN.Image
    */
    image: function() {
        return this._image;
    },
    
    /**
        @param {VN.Image} image
    */
    setImage: function(image) {
        this._image = image;
    },
    
    /**
        @type VN.ControlTint
    */
    _controlTint: null,
    
    /**
        @param {VN.ControlTint} controlTint
    */
    setControlTint: function(controlTint) {
        this._controlTint = controlTint;
    },
    
    /**
        @returns VN.ControlTint
    */
    controlTint: function() {
        return this._controlTint;
    },
    
    /**
        @type VN.ControlSize
    */
    _controlSize: null,
    
    /**
        @param {VN.ControlSize} size
    */
    setControlSize: function(size) {
        this._controlSize = size;
    },
    
    /**
        @returns VN.ControlSize
    */
    controlSize: function() {
        return this._controlSize;
    },
    
    /**
        @type VN.Object
    */
    _representedObject: null,
    
    /**
        @param {VN.Object} anObject
    */
    setRepresentedObject: function(anObject) {
        this._representedObject = anObject;
    },
    
    /**
        @returns VN.Object
    */
    representedObject: function() {
        return this._representedObject;
    },
    
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
        this.setHighlighted(flag);
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
        return this.isEnabled() ? true : false;
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
        if (this.isContinuous())
            NSApplication.sharedApplication().sendAction(this._action, this._target, this);
        
        // for every further event
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
            
            if (untilMouseIsUp) {
                if (theEvent.type() == VN.LEFT_MOUSE_UP) {
                    this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, true);
                    NSApplication.sharedApplication().unbindEvents();
                    
                    this._state = (this.state() == VN.OFF_STATE) ? VN.ON_STATE : VN.OFF_STATE;
                    // this.setHighlighted(false);
                    
                    if (NSPointInRect(location, cellFrame))
                        NSApplication.sharedApplication().sendAction(this._action, this._target, this);
                    
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
            
            if (this.isContinuous()) {
                 NSApplication.sharedApplication().sendAction(this._action, this._target, this);
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
    _menu: null,
    
    /**
        @param {VN.Menu} aMenu
    */
    setMenu: function(aMenu) {
        this._menu = aMenu;
    },
    
    /**
        @returns VN.Menu
    */
    menu: function() {
        return this._menu;
    },
    
    /**
        @type Boolean
    */
    _sendsActionOnEndEditing: null,
    
    /**
        @param {Boolean} flag
    */
    setSendsActionOnEndEditing: function(flag) {
        this._sendsActionOnEndEditing = flag;
    },
    
    /**
        @returns Boolean
    */
    sendsActionOnEditing: function() {
        return this._sendsActionOnEndEditing;
    },
    
    /**
        @type VN.LineBreakMode
    */
    _lineBreakMode: null,
    
    /**
        @param {VN.LineBreakMode} mode
    */
    setLineBreakMode: function(mode) {
        this._lineBreakMode = mode;
    },
    
    /**
        @returns VN.LineBreakMode
    */
    lineBreakMode: function() {
        return this._lineBreakMode;
    },
    
    /**
        @type Boolean
    */
    _allowsUndo: null,
    
    /**
        @param {Boolean} flag
    */
    setAllowsUndo: function(flag) {
        this._allowsUndo = flag;
    },
    
    /**
        @returns Boolean
    */
    allowsUndo: function() {
        return this._allowsUndo;
    } 
});

/**
    @mixin VN.KeyboardUI
    @class VN.Cell
*/
VN.Cell.mixin({
    
    /**
        @type Boolean
    */
    _refusesFirstResponder: null,
    
    /**
        @param {Boolean} flag
    */
    setRefusesFirstResponder: function(flag) {
        this._refusesFirstResponder = flag;
    },
    
    /**
        @returns Boolean
    */
    refusesFirstResponder: function() {
        return this._refusesFirstResponder;
    },
    
    /**
        @returns Boolean
    */
    acceptsFirstResponder: function() {
        return !this.refusesFirstResponder();
    },
    
    /**
        @type Boolean
    */
    _showsFirstResponder: null,
    
    /**
        @param {Boolean} flag
    */
    setShowsFirstResponder: function(flag) {
        this._showsFirstResponder = flag;
    },
    
    /**
        @returns Boolean
    */
    showsFirstResponder: function() {
        return this._showsFirstResponder;
    },
    
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
    _allowsEditingTextAttributes: null,
    
    /**
        @returns Boolean
    */
    allowsEditingTextAttributes: function() {
        return this._allowsEditingTextAttributes;
    },
    
    /**
        @param {Boolean} flag
    */
    setAllowsEditingTextAttributes: function(flag) {
        this._allowsEditingTextAttributes = flag;
        if (!flag) this.setImportsGraphics(false);
    },
    
    /**
        @type Boolean
    */
    _importsGraphics: null,
    
    /**
        @returns Boolean
    */
    importsGraphics: function() {
        return this._importsGraphics;
    },
    
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
    _allowsMixedState: null,
    
    /**
        @param {Boolean} flag
    */
    setAllowsMixedState: function(flag) {
        this._allowsMixedState = flag;
    },
    
    /**
        @returns Boolean
    */
    allowsMixedState: function() {
        return this._allowsMixedState;
    },
    
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
        this.setState(this.nextState());
    }
});

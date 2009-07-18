/* 
 * control.js
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
                                        
/**
    VN.CellImagePosition
*/
VN.NO_IMAGE                           = 0;
VN.IMAGE_ONLY                         = 1;
VN.IMAGE_LEFT                         = 2;
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
    VN.Control notifications
*/
VN.CONTROL_TEXT_DID_BEGIN_EDITING_NOTIFICATION    = "NSControlTextDidBeginEditingNotification";
VN.CONTROL_TEXT_DID_END_EDITING_NOTIFICATION      = "NSControlTextDidEndEditingNotification";
VN.CONTROL_TEXT_DID_CHANGE_NOTIFICATION           = "NSControlTextDidChangeNotification";

/**
    @class VN.Control
    @extends VN.View
*/
var NSControl = VN.Control = VN.View.extend({
   
    _tag: null,
    
    _cell: null,
    
    _currentEditor: null,
    
    _value: null,
    _state: null,
    _isHighlighted: null,
    _isEnabled: null,
    _isEditable: null,
    _isBordered: null,
    _isBezeled: null,
    _isSelectable: null,
    _isScrollable: null,
    _alignment: null,
    _controlSize: null,
    
    _isContinuous: null,
    
    _lineBreakMode: null,
    _wraps: null,
    
    _controlView: null,
    
    _target: null,
    _action: null,
    
    /**
        @param {VN.Rect} frameRect
        @returns VN.Control
    */
    initWithFrame: function(frameRect) {
        this._super(frameRect);
        this.setCell(this.cellClass().create());
        return this;
    },
    
    /**
        @param {VN.Coder} aCoder
        @returns VN.Control
    */
    initWithCoder: function(aCoder) {
        this._value = "";
        
        this._super(aCoder);
        this._cell = aCoder.decodeObjectForKey("NSCell");
        
        if (!this._cell) return this;
        
        this._value = this._cell._value;
        this._state = this._cell._state;
        this._isHighlighted = this._cell._isHighlighted;
        this._isEnabled = this._cell._isEnabled;

        this._isEditable = this._cell._isEditable;
        this._isBordered = this._cell._isBordered;
        this._isBezeled = this._cell._isBezeled;
        this._isSelectable = this._cell._isSelectable;
        this._isScrollable = this._cell._isScrollable;
        this._alignment = this._cell._alignment;
        this._controlSize = this._cell._controlSize;
        this._isContinuous = this._cell._isContinuous;
        
        this._lineBreakMode = this._cell._lineBreakMode;
        this._wraps = this._cell._wraps;
        this._font = this._cell._font;
        this.setFrame(this._frame);
        return this;
    },
    
    /**
        @param {VN.TextView} textObj
        @returns VN.TextView
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
        @param {VN.Rect} aRect
        @param {VN.View} controlView
        @param {VN.TextView} textObj
        @param {VN.Object} anObject the delegate
        @param {VN.Event} theEvent
    */
    editWithFrame: function(aRect, controlView, textObj, anObject, theEvent) {
        if (!this.isEditable() && !this.isSelectable())
            return;

        textObj.setFrame(this.titleRectForBounds(aRect));
        controlView.addSubview(textObj);
        controlView.window().makeFirstResponder(textObj);
        textObj.setDelegate(anObject);
        textObj.mouseDown(theEvent);
    },

    selectWithFrameInView: function(aRect, controlView, textObj, anObject, selStart, selLength) {

        if (!this.isEditable() && !this.isSelectable()) return;

        textObj.setFrame(this.titleRectForBounds(aRect));
        controlView.addSubview(textObj);
        controlView.window().makeFirstResponder(textObj);
        textObj.setDelegate(anObject);
        textObj.setSelectedRange(null);
    },

    endEditing: function(textObj) {
        this.setStringValue(textObj.string());
    },
    
    sizeToFit: function() {
        
    },
    
    calcSize: function() {
        
    },
    
    cell: function() {
        return this._cell;
    },
    
    setCell: function(aCell) {
        this._cell = aCell;
        this._cell.setControlView(this);
        this.setNeedsDisplay(true);
    },
    
    selectedCell: function() {
        
    },
    
    target: function() {
        return this._target;
    },
    
    setTarget: function(anObject) {
        this._target = anObject;
    },
    
    action: function() {
        return this._action;
    },
    
    setAction: function(anAction) {
        this._action = anAction;
    },
    
    state: function() {
        return this._state;
    },
    
    setstate: function(value) {
        this._state = value;
    },
    
    tag: function() {
        return this._tag;
    },
    
    setTag: function(anInt) {
        this._tag = anInt;
    },
    
    selectedTag: function() {
        
    },
    
    setIgnoresMultiClick: function(flag) {
        
    },
    
    ignoresMultiClick: function() {
        
    },
    
    sendActionOn: function(mask) {
        
    },
    
    isContinuous: function() {
        return this._isContinuous;
    },
    
    setContinuous: function(flag) {
        this._isContinuous = flag;
    },
    
    isEnabled: function() {
        return this._isEnabled;
    },
    
    setEnabled: function(flag) {
        this._isEnabled = flag;
        this.setNeedsDisplay(true);
    },
    
    alignment: function() {
        return this._alignment;
    },
    
    setAlignment: function(mode) {
        this._alignment = mode;
        this.setNeedsDisplay(true);
    },
    
    font: function() {
        return this._font;
    },
    
    setFont: function(fontObj) {
        this._font = fontObj;
    },
    
    setFormatter: function(newFormatter) {
        this._formatter = newFormatter;
    },
    
    formatter: function() {
        return this._formatter;
    },
    
    setObjectValue: function(obj) {
        this._value = obj;
        this.setNeedsDisplay(true);
    },
    
    setStringValue: function(aString) {
        this._value = aString;
        this.setNeedsDisplay(true);
    },
    
    setIntValue: function(anInt) {
        this._value = anInt;
        this.setNeedsDisplay(true);
    },
    
    setFloatValue: function(aFloat) {
        this._value = aFloat;
        this.setNeedsDisplay(true);
    },
    
    setDoubleValue: function(aDouble) {
        this._value = aDouble;
        this.setNeedsDisplay(true);
    },
    
    objectValue: function() {
        return this._value;
    },
    
    stringValue: function() {
        return new String(this._value);
    },
    
    intValue: function() {
        return parseInt(this._value);
    },
    
    floatValue: function() {
        return parseFloat(this._value);
    },
    
    doubleValue: function() {
        return parseFloat(this._value);
    },
    
    /**
        Core graphics (canvas & vml) based rendering
    */
    drawRect: function(rect) {
        // default is to draw nothing.
    },
    
    /**
        Draws the receiver in the given rect. This method is intended for old
        browser routines using the DOM. No canvas/VML based drawing should be
        carried out in these routines. Drawing can use css etc as intended. 
        See wiki for examples and more information.
        
        @param {NSRect} aRect
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    renderRect: function(aRect, firstTime, context) {
        // default is to render nothing.
    },
    
    /**
        @param {Selector} theAction
        @param {NSObject} theTarget
    */
    sendActionTo: function(theAction, theTarget) {
        if (theAction && theTarget) {
            NSApplication.sharedApplication().sendActionTo(theAction, theTarget, this);
            return true;
        }
        
        return false;
    },
    
    takeIntValueFrom: function(sender) {
        this.setIntValue(sender.intValue());
        this.setNeedsDisplay(true);
    },
    
    takeFloatValueFrom: function(sender) {
        this.setFloatValue(sender.doubleValue());
        this.setNeedsDisplay(true);
    },
    
    takeDoubleValueFrom: function(sender) {
        this.setDoubleValue(sender.doubleValue());
        this.setNeedsDisplay(true);
    },
    
    takeStringValueFrom: function(sender) {
        this.setStringValue(sender.stringValue());
        this.setNeedsDisplay(true);
    },

    takeObjectValueFrom: function(sender) {
        this.setObjectValue(sender.objectValue());
        this.setNeedsDisplay(true);
    },
    
    currentEditor: function() {
        return this._currentEditor;
    },
    
    abortEditing: function() {
        if (this._currentEditor) {
            this.window().endEditingFor(this);
            this._currentEditor = null;
            return true;
        }
        
        return false;
    },
    
    validateEditing: function() {
        return true;
    },
    
    mouseDown: function(theEvent) {
        this.trackMouse(theEvent, true);
    },
    
    /**
        @param {NSPoint} startPoint
        @returns Boolean
    */
    startTracking: function(startPoint) {
        return this.isEnabled() ? true : false;
    },
    
    /**
        @param {NSPoint} lastPoint
        @param {NSPoint} currentPoint
        @returns Boolean
    */
    continueTracking: function(lastPoint, currentPoint) {
        return true;
    },
    
    /**
        @param {NSPoint} lastPoint
        @param {NSPoint} stopPoint
        @param {Boolean} mouseUp
    */
    stopTracking: function(lastPoint, stopPoint, mouseUp) {
        // empty implementation
    },
    
    /**
        @param {NSEvent} theEvent
        @param {Boolean} untilMouseUp
    */
    trackMouse: function(theEvent, untilMouseUp) {
        var location = this.convertPointFromView(theEvent.locationInWindow(), null);
        if (!(this.startTracking(theEvent.locationInWindow())))
            return false;
        
        this.setHighlighted(true); // hmmm?
        this.setNeedsDisplay(true);
        if (this.isContinuous())
            NSApplication.sharedApplication().sendAction(this._action, this._target, this);
        
        // for every further event
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            var location = this.convertPointFromView(theEvent.locationInWindow(), null);
            
            if (untilMouseUp) {
                if (theEvent.type() == NSLeftMouseUp) {
                    this.stopTracking(theEvent.locationInWindow(), theEvent.locationInWindow(), true);
                    NSApplication.sharedApplication().unbindEvents();
                    
                    this._state = (this.state() == VN.OFF_STATE) ? VN.ON_STATE : VN.OFF_STATE;
                    this.setHighlighted(false);
                    
                    if (NSPointInRect(location, this.bounds()))
                        NSApplication.sharedApplication().sendAction(this._action, this._target, this);
                    
                    this.setNeedsDisplay(true);
                    return;
                }
                else {
                    this.setHighlighted(NSPointInRect(location, this.bounds()) ? true : false);
                    this.setNeedsDisplay(true);

                    if (!(this.continueTracking(theEvent.locationInWindow(), theEvent.locationInWindow()))) {
                        NSApplication.sharedApplication().unbindEvents();
                    }
                }
            }
            else if (NSPointInRect(location, this.bounds())) {
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
    
    highlight: function(flag) {
        if (this.isHighlighted() != flag) {
            this.setHighlighted(flag);
            this.renderRect(this.bounds(), false, this._renderContext);
        }
    },
    
    isHighlighted: function() {
        return this._isHighlighted;
    },
    
    setHighlighted: function(flag) {
        this._isHighlighted = flag;
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    lineBreakMode: function() {
        return this._lineBreakMode;
    },
    
    setLineBreakMode: function(mode) {
        this._lineBreakMode = mode;
    },
    
    baseWritingDirection: function() {
        return this._baseWritingDirection;
    },
    
    setBaseWritingDirection: function(writingDirection) {
        this._baseWritingDirection = writingDirection;
    },
    
    integerValue: function() {
        return parseInt(this._value);
    },
    
    setIntegerValue: function(anInteger) {
        this._value = anInteger;
    },
    
    takeIntegerValueFrom: function(sender) {
        this.setIntegerValue(sender.integerValue());
        this.setNeedsDisplay(true);
    }
});
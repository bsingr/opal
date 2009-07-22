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

include('foundation/foundation');
include('app_kit/view');
include('app_kit/cell');
include('app_kit/text');
include('app_kit/application');

/**
    VN.Control notifications
*/
VN.CONTROL_TEXT_DID_BEGIN_EDITING_NOTIFICATION = "VNControlTextDidBeginEditingNotification";
VN.CONTROL_TEXT_DID_END_EDITING_NOTIFICATION = "VNControlTextDidEndEditingNotification";
VN.CONTROL_TEXT_DID_CHANGE_NOTIFICATION = "VNControlTextDidChangeNotification";

/**
    @class VN.Control
    @extends VN.View
*/
var NSControl = VN.Control = VN.View.extend({
    
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
        this._super(aCoder);
        this._cell = aCoder.decodeObjectForKey("NSCell");
        if (this._cell) this._cell._controlView = this;
        this.setFrame(this._frame);
        return this;
    },
    
    /**
        Sizes the reciever so that it fits its contents
    */
    sizeToFit: function() {
        
    },
    
    /**
        Calculates the necessary size for the controls contents
    */
    calcSize: function() {
        
    },
    
    /**
        Draws the receiver in the given rect. This method is intended for old
        browser routines using the DOM. No canvas/VML based drawing should be
        carried out in these routines. Drawing can use css etc as intended. 
        See wiki for examples and more information.
        
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    render: function(context, firstTime) {
        if (this._cell) {
            this._cell.renderWithFrameInView(this.bounds(), this, context, firstTime);
        }
        else {
            // no cell available before drawing..
            context.setFirstTime(true);
        }
    },
    
    /**
        Instantiate a binding to the object. Placeholders and other information
        can be specified in the options dictionary.
        
        @param binding - NSString
        @param toObject - NSObject
        @param withKeyPath - NSString
        @param options - NSDictionary
    */
    bind: function(binding, toObject, withKeyPath, options) {
        if (binding == 'enabled') {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.ENABLED_BINDING);
            
            var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
            
            this._kvb_info.setObjectForKey(bindingInfo, VN.ENABLED_BINDING);
            this.setEnabled(toObject.valueForKeyPath(withKeyPath));
        }
    },
    
    /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        if (context == VN.ENABLED_BINDING) {
            this.setEnabled(ofObject.valueForKeyPath(keyPath));
        }
    },
    
    /**
        @type VN.Cell
    */
    _cell: null,
    
    /**
        @returns VN.Cell
    */
    cell: function() {
        return this._cell;
    },
    
    /**
        @param {VN.Cell} aCell
    */
    setCell: function(aCell) {
        this._cell = aCell;
    },
    
    /**
        @returns VN.Cell
    */
    selectedCell: function() {
        return this._cell;
    },
    
    /**
        @returns VN.Object
    */
    target: function() {
        return this._cell.target();
    },
    
    /**
        @param {VN.Object} anObject
    */
    setTarget: function(anObject) {
        this._cell.setTarget(anObject);
    },
    
    /**
        @returns Selector
    */
    action: function() {
        return this._cell.action();
    },
    
    /**
        @param {Selector} anAction
    */
    setAction: function(anAction) {
        this._cell.setAction(anAction);
    },
    
    /**
        @returns Integer
    */
    tag: function() {
        return this._cell.tag();
    },
    
    /**
        @param {Integer} anInt
    */
    setTag: function(anInt) {
        this._cell.setTag(anInt);
    },
    
    /**
        @returns Integer
    */
    selectedTag: function() {
        return this._cell.tag();
    },
    
    /**
        @returns Boolean
    */
    isContinuous: function() {
        return this._cell.isContinuous();
    },
    
    /**
        @param {Boolean} flag
    */
    setContinuous: function(flag) {
        this._cell.setContinuous(flag);
    },
    
    /**
        @returns Boolean
    */
    isEnabled: function() {
        return this._cell.isEnabled();
    },
    
    /**
        @param {Boolean} flag
    */
    setEnabled: function(flag) {
        this._cell.setEnabled(flag);
        this.setNeedsDisplay(true);
    },
    
    /**
        @returns VN.TextAlignment
    */
    alignment: function() {
        return this._cell.alignment();
    },
    
    /**
        @param {VN.TextAlignment} mode
    */
    setAlignment: function(mode) {
        this._cell.setAlignment(mode);
    },
    
    /**
        @returns VN.Font
    */
    font: function() {
        return this._cell.font();
    },
    
    /**
        @param {VN.Font} fontObj
    */
    setFont: function(fontObj) {
        this._cell.setFont(fontObj);
    },
    
    /**
        @returns VN.Formatter
    */
    formatter: function() {
        return this._cell.formatter();
    },
    
    /**
        @param {VN.Formatter} newformatter
    */
    setFormatter: function(newFormatter) {
        this._cell.setFormatter(newFormatter);
    },
    
    /**
        @param {VN.Object} obj
    */
    setObjectValue: function(obj) {
        this._cell.setObjectValue(obj);
        this.setNeedsDisplay(true);
    },
    
    /**
        @param {VN.String} aString
    */
    setStringValue: function(aString) {
        this._cell.setStringValue(aString);
        this.setNeedsDisplay(true);
    },
    
    /**
        @param {Integer} anInt
    */
    setIntValue: function(anInt) {
        this._cell.setIntValue(anInt);
        this.setNeedsDisplay(true);
    },
    
    /**
        @param {Float} aFloat
    */
    setFloatValue: function(aFloat) {
        this._cell.setFloatValue(aFloat);
        this.setNeedsDisplay(true);
    },
    
    /**
        @param {Double} aDouble
    */
    setDoubleValue: function(aDouble) {
        this._cell.setDoubleValue(aDouble);
        this.setNeedsDisplay(true);
    },
    
    /**
        @returns VN.Object
    */
    objectValue: function() {
        return this._cell.objectValue();
    },
    
    /**
        @returns VN.String
    */
    stringValue: function() {
        return this._cell.stringValue();
    },
    
    /**
        @returns Integer
    */
    intValue: function() {
        return this._cell.intValue();
    },
    
    /**
        @returns Float
    */
    floatValue: function() {
        return this._cell.floatValue();
    },
    
    /**
        @returns Double
    */
    doubleValue: function() {
        return this._cell.doubleValue();
    },

    /**
        @param {selector} theAction
        @param {VN.Object} theTarget
        @returns Boolean
    */
    sendAction: function(theAction, theTarget) {
        if (theAction && theTarget) {
            VN.Application.sharedApplication().sendActionTo(theAction, theTarget, this);
            return true;
        }
        
        return false;
    },
    
    /**
        @param {VN.Object} sender
    */
    takeIntValueFrom: function(sender) {
        this._cell.takeIntValueFrom(sender);
    },
    
    /**
        @param {VN.Object} sender
    */
    takeFloatValueFrom: function(sender) {
        this._cell.takeFloatValueFrom(sender);
    },
    
    /**
        @param {VN.Object} sender
    */
    takeDoubleValueFrom: function(sender) {
        this._cell.takeDoubleValueFrom(sender);
    },
    
    /**
        @param {VN.Object} sender
    */
    takeStringValueFrom: function(sender) {
        this._cell.takeStringValueFrom(sender);
    },
    
    /**
        @param {VN.Object} sender
    */
    takeObjectValueFrom: function(sender) {
        this._cell.takeObjectValueFrom(sender);
    },
    
    /**
        @type VN.Text
    */
    _currentEditor: null,
    
    /**
        @returns VN.Text
    */
    currentEditor: function() {
        return this._currentEditor;
    },
    
    /**
        @returns Boolean
    */
    abortEditing: function() {
        if (this._currentEditor) {
            this.window().endEditingFor(this);
            this._currentEditor = null;
            return true;
        }
        
        return false;
    },
    
    /**
        Validate the editing
    */
    validateEditing: function() {
        // do something
    },
    
    /**
        @param {VN.Event} theEvent
    */
    mouseDown: function(theEvent) {
        this._cell.trackMouseInView(theEvent, this.bounds(), this, true);
    }
});


/**
    @returns Class
*/
VN.Control.cellClass = function() {
    return VN.Cell;
};


/**
    @mixin VN.KeyboardUI
    @class VN.Control
*/
VN.Control.mixin({
    
    /**
        @param {VN.Object} sender
    */
    performClick: function(sender) {
        this._cell.performClick(sender);
    },
    
    /**
        @param {Boolean} flag
    */
    setRefusesFirstResponder: function(flag) {
        this._cell.setRefusesFirstResponder(flag);
    },
    
    /**
        @returns Boolean
    */
    refusesFirstResponder: function() {
        this._cell.refusesFirstResponder();
    }
});


/**
    @protocol VN.ControlSubclassNotifications
*/
VN.ControlSunclassNotifications = VN.protocol({
    
    /**
        @param {VN.Notification} obj
    */
    controlTextDidBeginEditing: function(obj) {
    },
    
    /**
        @param {VN.Notification} obj
    */
    controlTextDidEndEditing: function(obj) {
    },
    
    /**
        @param {VN.Notification} obj
    */
    controlTextDidChange: function(obj) {
    },
});


/**
    @protocol VN.ControlTextEditingDelegate
*/
VN.ControlTextEditingDelegate = VN.protocol({
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.Text} fieldEditor
        @returns Boolean
    */
    controlTextShouldBeginEditing: function(control, fieldEditor) {
    },
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.Text} fieldEditor
        @returns Boolean
    */
    controlTextShouldEndEditing: function(control, fieldEditor) {
    },
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.String} string
        @param {VN.String} error
        @returns Boolean
    */
    controlDidFailToFormatString: function(control, string, error) {
    },
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.String} string
        @param {VN.String} error
    */
    controlDidFailToValidatePartialString: function(control, string, error) {
    },
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.Object} obj
        @returns Boolean
    */
    controlIsValidObject: function(control, obj) {
    },
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.TextView} textView
        @param {Selector} commandSelector
        @returns Boolean
    */
    controlTextViewDoCommandBySelector: function(control, textView, commandSelector) {
    },
    
    /**
        @optional
        
        @param {VN.Control} control
        @param {VN.TextView} textView
        @param {VN.Array} words
        @param {VN.Range} charRange
        @param {Integer} index
        @returns VN.Array
    */
    controlTextViewCompletionsForPartialWordRange: function(control, textView, words, charRange, index) {
    },
});


/**
    @mixin VN.ControlAttributedStringMethods
    @class VN.Control
*/
VN.Cell.mixin({
    
    /**
        @returns VN.AttributedString
    */
    attributedStringValue: function() {
        return this._cell.attributedStringValue();
    },
    
    /**
        @param {VN.AttributedString} obj
    */
    setAttributedStringValue: function(obj) {
        this._cell.setAttributedStringValue(obj);
    }
});

/* 
 * text_field.js
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
    @enum NSTextFieldBezelStyle
*/
var NSTextFieldSquareBezel  = 0;
var NSTextFieldRoundedBezel = 1;

/**
    @class NSTextField
    @extends NSControl
*/
var NSTextField = NSControl.extend({
    
    _drawsBackground: null,
    _backgroundColor: null,
    _textColor: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        this._drawsBackground = this._cell._drawsBackground;
        this._backgroundColor = this._cell._backgroundColor;
        this._textColor = this._cell._textColor;
        return this;
    },
    
    
    renderRect: function(aRect, firstTime, context) {    
        if (firstTime) {
            context.setClass('ns-text-field');
            context.push('span', 'ns-text-field-title');
        }
        else {
            if (this._drawsBackground) {
                context.addClass('bezeled');
            }
            
            this.renderInterior(aRect, firstTime, context);
        }
    },
    
    renderInterior: function(aRect, firstTime, context) {
        var titleRect = this.titleRectForBounds(aRect);
        context.$('ns-text-field-title').setFrame(titleRect);
        context.$('ns-text-field-title').renderAttributedString(this.attributedStringValue());
    },
    
    drawInteriorWithFrame: function(cellFrame, controlView) {
		this.attributedStringValue().drawWithRectAndOptions(this.titleRectForBounds(cellFrame), null);
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this.drawsBackground()) {
            CGContextSetFillColorWithColor(c, this._backgroundColor);
            CGContextFillRect(c, cellFrame);
        }
        
        if (this.isBezeled()) {
            NSImage.imageNamed('NSTextFieldBezelTopLeft.png').drawInRect(CGRectMake(0 ,0, 2, 2));
            NSImage.imageNamed('NSTextFieldBezelTopMiddle.png').drawInRect(CGRectMake(2,0,cellFrame.size.width - 4,2));
            NSImage.imageNamed('NSTextFieldBezelTopRight.png').drawInRect(CGRectMake(cellFrame.size.width-2,0,2,2));
            NSImage.imageNamed('NSTextFieldBezelSides.png').drawInRect(CGRectMake(0, 2, 1, cellFrame.size.height - 2));
            NSImage.imageNamed('NSTextFieldBezelSides.png').drawInRect(CGRectMake(cellFrame.size.width - 1, 2, 1, cellFrame.size.height - 2));
            NSImage.imageNamed('NSTextFieldBezelBottom.png').drawInRect(CGRectMake(1, cellFrame.size.height - 1, cellFrame.size.width - 2, 1));
        }
        
        this.drawInteriorWithFrame(cellFrame, controlView);
    },
    
    
    mouseDown: function(theEvent) {
        if (!this._cell.isEnabled())
            return;
        
        if (this._cell.isSelectable() || this._cell.isEditable()) {
            if (!this._currentEditor) {
                this._currentEditor = this.window().fieldEditor(true, this);
                this._currentEditor = this._cell.setUpFieldEditorAttributes(this._currentEditor);
            }
            
            this._cell.setHighlighted(true);
            this._cell.editWithFrame(this._bounds, this, this._currentEditor, this, theEvent);
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
        // value binding - NSValueBinding
        if (binding == "value") {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, NSValueBinding);
            
            var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [NSObservedObjectKey, NSObservedKeyPathKey, NSOptionsKey]);
            
            this._kvb_info.setObjectForKey(bindingInfo, NSValueBinding);
        }
    },
    
    /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        if (context == NSValueBinding) {
            var newValue = ofObject.valueForKeyPath(keyPath);
            this.setObjectValue(newValue);
        }
    },
    
    drawsBackground: function() {
        return this._drawsBackground;
    },
    
    setDrawsBackground: function(flag) {
        this._drawsBackground = flag;
    },
    
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    setBackgroundColor: function(aColor) {
        this._backgroundColor = aColor;
    },
    
    setBezeled: function(flag) {
        this._isBezeled = flag;
    },
    
    isBezeled: function() {
        return this._isBezeled;
    },
    
    setBezelStyle: function(style) {
        this._bezelStyle = style;
    },
    
    bezelStyle: function() {
        return this._bezelStyle;
    },
    
    setTextColor: function(aColor) {
        this._textColor = aColor;
    },
    
    textColor: function() {
        return this._textColor;
    },
    
    titleRectForBounds: function(theRect) {
        if (this.isEditable()) {
            return NSMakeRect(theRect.origin.x + 2, theRect.origin.y + 3, theRect.size.width - 4, theRect.size.height - 5);
        }
        
        return theRect;
    },

	attributedStringValue: function() {
        // if (this._value.typeOf(NSAttributedString)) {
            // return this._value;
        // }
		
		var attributes = NSDictionary.create();
		
		// font
		if (this.font())
			attributes.setObjectForKey(this.font(), NSFontAttributeName);
		
		// textColor
		if (this.isEnabled()) {
			if (this.textColor())
				attributes.setObjectForKey(this.textColor(), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
		// paragraph style
        var paragraphStyle = NSParagraphStyle.defaultParagraphStyle();
        paragraphStyle.setAlignment(this.alignment());
        paragraphStyle.setLineBreakMode(this.lineBreakMode());
        
        attributes.setObjectForKey(paragraphStyle, NSParagraphStyleAttributeName);
		
		return NSAttributedString.create('initWithStringAndAttributes', this._value, attributes);
	},
    
    // setUpFieldEditorAttributes: function(textObj) {
    //     return textObj;
    // },
    
    setPlaceholderString: function(aString) {
        
    },
    
    placeholderString: function() {
        
    },
    
    setPlaceholderAttributedString: function(aString) {
        
    },
    
    placeholderAttributedString: function() {
        
    },
    
    setWantsNotificationForMarkedText: function(flag) {
        
    }
});

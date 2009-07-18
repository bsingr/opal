/* 
 * button.js
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
 
include('app_kit/control');
include('app_kit/button_cell');

/**
    VN.ButtonType
*/
VN.MOMENTARY_LIGHT_BUTTON         = 0;
VN.PUSH_ON_PUSH_OFF_BUTTON        = 1;
VN.TOGGLE_BUTTON                  = 2;
VN.SWITCH_BUTTON                  = 3;
VN.RADIO_BUTTON                   = 4;
VN.MOMENTARY_CHANGE_BUTTON        = 5;
VN.ON_OFF_BUTTON                  = 6;
VN.MOMENTARY_PUSH_IN_BUTTON       = 7;

/**
    VN.BezelStyle
*/
VN.ROUNDED_BEZEL_STYLE            = 1;
VN.REGULAR_SQUARE_BEZEL_STYLE     = 2;
VN.THICK_SQUARE_BEZEL_STYLE       = 3;
VN.THICKER_SQUARE_BEZEL_STLYE     = 4;
VN.DISCLOSURE_BEZEL_STYLE         = 5;
VN.SHADOWLESS_SQUARE_BEZEL_STLYE  = 6;
VN.CIRCULAR_BEZEL_STYLE           = 7;
VN.TEXTURED_SQUARE_BEZEL_STYLE    = 8
VN.HELP_BUTTON_BEZEL_STYLE        = 9;
VN.SMALL_SQUARE_BEZEL_STYLE       = 10;
VN.TEXTURED_ROUNDED_BEZEL_STYLE   = 11;
VN.ROUNDED_RECT_BEZEL_STYLE       = 12;
VN.RECESSED_BEZEL_STYLE           = 13;
VN.ROUNDED_DISCLOSURE_BEZEL_STYLE = 14;    

/**
    VN.GradientType
*/
VN.GRADIENT_NONE                  = 0;
VN.GRADIENT_CONCAVE_WEAK          = 1;
VN.GRADIENT_CONCAVE_STRONG        = 2;
VN.GRADIENT_CONVEX_WEAK           = 3;
VN.GRADIENT_CONVEX_STRONG         = 4;

/**
    @class VN.Button
    @extends VN.Control
*/
var NSButton = VN.Button = VN.Control.extend({
    
    /**
        @type VN.Image
    */
    _alternateImage: null,
    
    /**
        @type VN.Image
    */
    _image: null,
    
    /**
        @param {VN.Coder} aCoder
        @returns VN.Button
    */
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        return this;
    },
    
    /**
        @param {NSRect} aRect
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    renderRect: function(aRect, firstTime, context) { 
        if (firstTime) {
            context.setClass('ns-button');
            context.push('div', 'ns-button-left');
            context.push('div', 'ns-button-middle');
            context.push('div', 'ns-button-right');
            context.push('span', 'ns-button-title');
        }
            
        this.renderBezel(aRect, firstTime, context);
            // this.renderInteriorWithFrame(cellFrame, controlView, firstTime, context);
        this.renderTitle(this._value, this.titleRectForBounds(aRect), firstTime, context);
    },
    
    /**
        @param {NSRect} aRect
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    renderBezel: function(aRect, firstTime, context) {
        // enabled
        if (this._isEnabled)
            context.removeClass('disabled');
        else
            context.addClass('disabled');
        
        // bordered
        if (this._isBordered)
            context.addClass('bordered');
        else
            context.removeClass('bordered');
        
        // highlighted
        if (this._isHighlighted)
            context.addClass('highlighted');
        else
            context.removeClass('highlighted');
    },
    
    renderTitle: function(title, titleRect, firstTime, context) {
        context.$('ns-button-title').setFrame(titleRect);
        context.$('ns-button-title').renderAttributedString(this.attributedStringValue());
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        this.renderWithFrame(cellFrame, controlView, false, controlView._renderContext);
        return;
        
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextClearRect(c, cellFrame);
        
        this.drawBezelWithFrameInView(cellFrame, controlView);
        this.drawInteriorWithFrame(cellFrame, controlView);
        this.drawTitleWithFrameInView(this._value, this.titleRectForBounds(cellFrame), controlView);
    },
    
    drawInteriorWithFrame: function(cellFrame, controlView) {
        if (this._image) {
            if (this._state == NSOnState)
                this.drawImageWithFrameInView(this._alternateImage, this.imageRectForBounds(cellFrame), controlView);
            else
                this.drawImageWithFrameInView(this._image, this.imageRectForBounds(cellFrame), controlView);
        }
    },
    
    drawImageWithFrameInView: function(image, frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (!this._isEnabled)
            CGContextSetAlpha(c, 0.8);
        
        // CGContextDrawImage(c, frame, image);
        image.drawInRect(frame);
        CGContextRestoreGState(c);
    },

    drawTitleWithFrameInView: function(title, rect, controlView) {
        // var c = NSGraphicsContext.currentContext().graphicsPort();
        this.attributedStringValue().drawWithRectAndOptions(rect, null);
        // CGContextFillRect(c, rect);
    },
    
    drawBezelWithFrameInView: function(frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (this._isEnabled && this._isBordered) {
            if (this._isHighlighted) {
                NSImage.imageNamed('NSButtonHighlightedLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
                NSImage.imageNamed('NSButtonHighlightedMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
                NSImage.imageNamed('NSButtonHighlightedRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
            }
            else {
                NSImage.imageNamed('NSButtonNormalLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
                NSImage.imageNamed('NSButtonNormalMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
                NSImage.imageNamed('NSButtonNormalRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
            }
        }
        else if (this._isBordered) {
            CGContextSetAlpha(c, 0.8);
            NSImage.imageNamed('NSButtonNormalLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
            NSImage.imageNamed('NSButtonNormalMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
            NSImage.imageNamed('NSButtonNormalRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
        }
        
        CGContextRestoreGState(c);
    },
    
    cellClass: function() {
        return NSButtonCell;
    },
    
    title: function() {
        
    },
    
    setTitle: function(aString) {
        
    },
    
    titleRectForBounds: function(theRect) {
        
        var xImageOffset = theRect.origin.x + 2;
        
        if (this._image) {
            xImageOffset += this._image.size().width + 3;
        }
        
        
        return NSMakeRect(xImageOffset,
                            theRect.origin.y + 2,
                            theRect.size.width - 4,
                            theRect.size.height - 4);
    },
    
    imageRectForBounds: function(theRect) {
        var theHeight = 0, theWidth = 0;
        
        if (this._image) {
            return NSMakeRect(2, (theRect.size.height - this._image.size().height) / 2, this._image.size().width, this._image.size().height);
        }
        
        return NSMakeRect(0, 0, 0, 0);
    },
    
    attributedStringValue: function() {
		if (this._value.typeOf(NSAttributedString)) {
			return this._value;
		}
		
		var attributes = NSDictionary.create();
		
		
		// font
		if (!this.font()) {
		    this.setFont(NSFont.controlContentFontOfSize(12));
		    
		}
		attributes.setObjectForKey(this.font(), NSFontAttributeName);
		
		// textColor
		var textColor;
		if (this.isEnabled())
		    textColor = this.isHighlighted() ? NSColor.selectedControlTextColor() : NSColor.controlTextColor();
		else
		    textColor = NSColor.disabledControlTextColor();
		
		attributes.setObjectForKey(textColor, NSForegroundColorAttributeName);
		
        // paragraph style
        var paragraphStyle = NSParagraphStyle.defaultParagraphStyle();
        paragraphStyle.setAlignment(this.alignment());
        
        attributes.setObjectForKey(paragraphStyle, NSParagraphStyleAttributeName);
		
		return NSAttributedString.create('initWithStringAndAttributes', this._value, attributes);
	},
});

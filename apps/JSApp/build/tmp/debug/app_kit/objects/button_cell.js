/* 
 * button_cell.js
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
    VN.ButtonType
*/
VN.MOMENTARY_LIGHT_BUTTON = 0;
VN.PUSH_ON_PUSH_OFF_BUTTON = 1;
VN.TOGGLE_BUTTON = 2;
VN.SWITCH_BUTTON = 3;
VN.RADIO_BUTTON = 4;
VN.MOMENTARY_CHANGE_BUTTON = 5;
VN.ON_OFF_BUTTON = 6;
VN.MOMENTARY_PUSH_IN_BUTTON = 7;

/**
    VN.BezelStyle
*/
VN.ROUNDED_BEZEL_STYLE = 1;
VN.REGULAR_SQUARE_BEZEL_STYLE = 2;
VN.THICK_SQUARE_BEZEL_STYLE = 3;
VN.THICKER_SQUARE_BEZEL_STLYE = 4;
VN.DISCLOSURE_BEZEL_STYLE = 5;
VN.SHADOWLESS_SQUARE_BEZEL_STLYE = 6;
VN.CIRCULAR_BEZEL_STYLE = 7;
VN.TEXTURED_SQUARE_BEZEL_STYLE = 8
VN.HELP_BUTTON_BEZEL_STYLE = 9;
VN.SMALL_SQUARE_BEZEL_STYLE = 10;
VN.TEXTURED_ROUNDED_BEZEL_STYLE = 11;
VN.ROUNDED_RECT_BEZEL_STYLE = 12;
VN.RECESSED_BEZEL_STYLE = 13;
VN.ROUNDED_DISCLOSURE_BEZEL_STYLE = 14;    

/**
    VN.GradientType
*/
VN.GRADIENT_NONE = 0;
VN.GRADIENT_CONCAVE_WEAK = 1;
VN.GRADIENT_CONCAVE_STRONG = 2;
VN.GRADIENT_CONVEX_WEAK = 3;
VN.GRADIENT_CONVEX_STRONG = 4;

/**
    @class VN.ButtonCell
    @class VN.Cell
*/
var NSButtonCell = VN.ButtonCell = NSCell.extend({
        
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSButtonFlags");
        var flags2 = aCoder.decodeIntForKey("NSButtonFlags2");
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
        
        this._alternateImage = aCoder.decodeObjectForKey("NSAlternateImage");
        if (this._alternateImage) {
            this._image = this._alternateImage.normalImage();
            this._alternateImage = this._alternateImage.alternateImage();
        }
        
        return this;
    },
    
    /**
        @param {VN.Rect} cellFrame
        @param {VN.View} controlView
        @param {VN.RenderContext} renderContext
        @param {Boolean} firstTime
    */    
    renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
        if (firstTime) {
            renderContext.setClass('vn-button');
            renderContext.push('div', 'vn-button-left');
            renderContext.push('div', 'vn-button-middle');
            renderContext.push('div', 'vn-button-right');
            renderContext.push('span', 'vn-button-title');
        }
            
        this.renderBezelWithFrameInView(cellFrame, controlView, renderContext, firstTime);
        this.renderInteriorWithFrameInView(cellFrame, controlView, renderContext, firstTime);
        this.renderTitleWithFrameInView(this._value, this.titleRectForBounds(cellFrame), renderContext, firstTime);
    },
    
    /**
        @param {VN.Rect} cellFrame
        @param {VN.View} controlView
        @param {VN.RenderContext} renderContext
        @param {Boolean} firstTime
    */
    renderBezelWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
        if (this.isEnabled())
            renderContext.removeClass('disabled');
        else
            renderContext.addClass('disabled');
            
        if (this.isBordered())
            renderContext.addClass('bordered');
        else
            renderContext.removeClass('bordered');
        
        if (this.isHighlighted())
            renderContext.addClass('highlighted');
        else
            renderContext.removeClass('highlighted');
    },
    
    /**
        @param {VN.Rect} cellFrame
        @param {VN.View} controlView
        @param {VN.RenderContext} renderContext
        @param {Boolean} firstTime
    */
    renderInteriorWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
        // 
    },
    
    /**
        @param {VN.Rect} cellFrame
        @param {VN.View} controlView
        @param {VN.RenderContext} renderContext
        @param {Boolean} firstTime
    */
    renderTitleWithFrameInView: function(title, titleRect, renderContext, firstTime) {
        renderContext.$('vn-button-title').setFrame(titleRect);
        renderContext.$('vn-button-title').renderAttributedString(this.attributedStringValue());
    },
    
    /**
        @param {VN.Rect} theRect
        @returns VN.Rect
    */
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
    
    /**
        @param {VN.Rect} theRect
        @returns VN.Rect
    */
    imageRectForBounds: function(theRect) {
        var theHeight = 0, theWidth = 0;
        
        if (this._image) {
            return NSMakeRect(2, (theRect.size.height - this._image.size().height) / 2, this._image.size().width, this._image.size().height);
        }
        
        return NSMakeRect(0, 0, 0, 0);
    },
    
    /**
        @returns VN.AttributedString
    */
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

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

include('app_kit/cell');

// NSButton normal
resource('NSButtonNormalLeft.png');
resource('NSButtonNormalMiddle.png');
resource('NSButtonNormalRight.png');
// NSButton highlighted
resource('NSButtonHighlightedLeft.png');
resource('NSButtonHighlightedMiddle.png');
resource('NSButtonHighlightedRight.png');
// NSSwitch
resource('NSSwitchNormal.png');
resource('NSSwitchAlternate.png');
// NSRadioButton
resource('NSRadioButtonNormal.png');
resource('NSRadioButtonAlternate.png');

// NSButtonType
var NSMomentaryLightButton		    = 0;
var NSPushOnPushOffButton		    = 1;
var NSToggleButton			        = 2;
var NSSwitchButton			        = 3;
var NSRadioButton			        = 4;
var NSMomentaryChangeButton		    = 5;
var NSOnOffButton			        = 6;
var NSMomentaryPushInButton		    = 7;

// NSBezelStyle
var NSRoundedBezelStyle             = 1;
var NSRegularSquareBezelStyle       = 2;
var NSThickSquareBezelStyle         = 3;
var NSThickerSquareBezelStyle       = 4;
var NSDisclosureBezelStyle          = 5;
var NSShadowlessSquareBezelStyle    = 6;
var NSCircularBezelStyle            = 7;
var NSTexturedSquareBezelStyle      = 8
var NSHelpButtonBezelStyle          = 9;
var NSSmallSquareBezelStyle         = 10;
var NSTexturedRoundedBezelStyle     = 11;
var NSRoundRectBezelStyle           = 12;
var NSRecessedBezelStyle            = 13;
var NSRoundedDisclosureBezelStyle   = 14;    


// NSGradientType
var NSGradientNone                  = 0;
var NSGradientConcaveWeak           = 1;
var NSGradientConcaveStrong         = 2;
var NSGradientConvexWeak            = 3;
var NSGradientConvexStrong          = 4;

var NSButtonCell = NSCell.extend({
    
    _alternateImage: null,
    
    _image: null,
    
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
    
    drawWithFrame: function(cellFrame, controlView) {
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
        
        CGContextDrawImage(c, frame, image);
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
    
    titleRectForBounds: function(theRect) {
        
        var xImageOffset = theRect.origin.x + 2;
        
        if (this._image) {
            xImageOffset += this._image.width + 3;
        }
        
        
        return NSMakeRect(xImageOffset,
                            theRect.origin.y + 2,
                            theRect.size.width - 4,
                            theRect.size.height - 4);
    },
    
    imageRectForBounds: function(theRect) {
        var theHeight = 0, theWidth = 0;
        
        if (this._image) {
            return NSMakeRect(2, (theRect.size.height - this._image.height) / 2, this._image.width, this._image.height);
        }
        
        return NSMakeRect(0, 0, 0, 0);
    },
    
    attributedStringValue: function() {
		if (this._value.typeOf(NSAttributedString)) {
			return this._value;
		}
		
		var attributes = NSDictionary.create();
		
		// font
		if (this.font())
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
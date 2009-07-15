/* 
 * string_drawing.js
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


// NSStringDrawingOptions
var NSStringDrawingTruncatesLastVisibleLine         = (1 << 5);
var NSStringDrawingUsesLineFragmentOrigin           = (1 << 0);
var NSStringDrawingUsesFontLeading                  = (1 << 1);
var NSStringDrawingDisableScreenFontSubstitution    = (1 << 2);
var NSStringDrawingUsesDeviceMetrics                = (1 << 3);
var NSStringDrawingOneShot                          = (1 << 4);

Object.extend(String.prototype, {
    
    sizeWithAttributes: function(attrs) {
        
    },
    
    drawAtPoint: function(aPoint, attrs) {
        
    },
    
    drawInRect: function(aRect, attrs) {
        
    }
});

NSAttributedString.mixin({
    
    size: function() {
        
	    var c = NSGraphicsContext.currentContext().graphicsPort();
	    CGContextSaveGState(c);
	    
	    var theFont = this._attributes.objectForKey(NSFontAttributeName);
		CGContextSetFont(c, theFont);
		
	    var theSize = NSMakeSize(c.measureText(this._string).width, this._attributes.objectForKey(NSFontAttributeName).fontSize());
	    CGContextRestoreGState(c);
	    return theSize;
	},
    
    drawAtPoint: function(aPoint) {
        
    },
    
    drawInRect: function(aRect) {
        
    }
});

Object.extend(String.prototype, {
    
    drawWithRectAndOptions: function(aRect, options, attributes) {
        
    },
    
    boundingRectWithSize: function(aSize, options, attributes) {
        
    }
});

NSAttributedString.mixin({
    
    drawWithRectAndOptions: function(aRect, options) {
        
        var c = NSGraphicsContext.currentContext().graphicsPort();
		var fontSize = this.size();
		
        // font
		var theFont = this._attributes.objectForKey(NSFontAttributeName);
		CGContextSetFont(c, theFont);
		
        // text color
		var theColor = this._attributes.objectForKey(NSForegroundColorAttributeName);
		CGContextSetFillColorWithColor(c, theColor);
		
        // text shadow, if any
        if (this._attributes.containsKey(NSShadowAttributeName)) {
            // CGContextSetShadowWithColor(c, NSMakeSize(1, 1), 1, NSColor.)
        }
        
        var alignmentOrigin = 0;
        // paragraph style
        if (this._attributes.containsKey(NSParagraphStyleAttributeName)) {
            var paragraphStyle = this._attributes.objectForKey(NSParagraphStyleAttributeName);
            switch (paragraphStyle.alignment()) {
                case NSLeftTextAlignment:
                    break;
                case NSRightTextAlignment:
                    break;
                case NSCenterTextAlignment:
                    // position text in middle...
                    alignmentOrigin = (aRect.size.width - fontSize.width) / 2;
                    break;
                case NSJustifiedTextAlignment:
                    // "easiest" way is to work out how far short the line is, and then to split
                    // the string, and insert an equal amount of space between each word, so that
                    // each word has a gap between it. this wont put gaps between letters within
                    // a word, but this might take a LOT more of processing? or will it?
                    break;
            }
            
            // console.log('line break mode: ' + paragraphStyle.lineBreakMode());
        }
		
		CGContextShowTextAtPoint(c, aRect.origin.x + alignmentOrigin, (aRect.size.height * 0.75) + aRect.origin.y, this._string);
    },
    
    boundingRectWithSize: function(aSize, options) {
        
    }
});

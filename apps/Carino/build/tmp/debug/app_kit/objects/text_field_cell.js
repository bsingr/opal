/* 
 * text_field_cell.js
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


resource('NSTextFieldBezelTopLeft.png');
resource('NSTextFieldBezelTopMiddle.png');
resource('NSTextFieldBezelTopRight.png');
resource('NSTextFieldBezelSides.png');
resource('NSTextFieldBezelBottom.png');

var NSTextFieldCell = NSCell.extend({
  
  _backgroundColor: null,
  
  init: function() {
    this._super();
    return this;
  },
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    
    this._drawsBackground = aCoder.decodeBoolForKey("NSDrawsBackground");
    this._backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
    this._textColor = aCoder.decodeObjectForKey("NSTextColor");
    
    return this;
  },
  
  drawInteriorWithFrame: function(cellFrame, controlView) {
		this.attributedStringValue().drawWithRectAndOptions(cellFrame, null);
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
  
  textColor: function(aColor) {
    return this._textColor;
  },
  
  titleRectForBounds: function(theRect) {
    if (this.isEditable()) {
      return NSMakeRect(theRect.origin.x + 4, theRect.origin.y + 4, theRect.size.width - 8, theRect.size.height - 8);
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
		
		return NSAttributedString.create('initWithStringAndAttributes', this._value, attributes);
	},
  
  setupFieldEditorAttributes: function(textObj) {
    return textObj;
  },
  
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

/* 
 * application_title_view.js
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


var NSApplicationTitleView = NSView.extend({
  
  _appTitle: null,
  
  initWithFrame: function(frameRect) {
    this._super(frameRect);
    this._appTitle = "Application";
    return this;
  },
  
  requiredSize: function() {
    return NSMakeSize(100, NSMenu.menuBarHeight());
  },
  
  attributedTitle: function() {
    if (!this._appTitle)
      this._appTitle = "";
    
    var attributes = NSDictionary.create();

		// font
      attributes.setObjectForKey(NSFont.applicationTitleFontOfSize(14), NSFontAttributeName);

		// textColor
    // if (this.isEnabled()) {
    //  if (this.textColor())
    //    attributes.setObjectForKey(this.textColor(), NSForegroundColorAttributeName);
    // }
    // else {
			attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0), NSForegroundColorAttributeName);
    // }

		return NSAttributedString.create('initWithStringAndAttributes', this._appTitle, attributes);
  },
  
  drawRect: function(aRect) {
    // var c = NSGraphicsContext.currentContext().graphicsPort();
    // CGContextSetShadowWithColor(c, NSMakeSize(1, 1), 0, NSColor.colorWithCalibratedRGBA(0.204, 0.204, 0.204, 0.8));
    // this.attributedTitle().drawWithRectAndOptions(aRect, null);
  }
});

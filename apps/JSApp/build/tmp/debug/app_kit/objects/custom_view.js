/* 
 * custom_view.js
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


var NSCustomView = NSView.extend({
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    
    var theFrame = NSMakeRect(0, 0, 0, 0);
    if (aCoder.containsValueForKey("NSFrame"))
      theFrame = aCoder.decodeRectForKey("NSFrame");
    else if (aCoder.containsValueForKey("NSFrameSize"))
      theFrame.size = aCoder.decodeSizeForKey("NSFrameSize");
    
    var theClassName = aCoder.decodeObjectForKey("NSClassName");
    console.log(theClassName);
    var theView = window[theClassName].create('initWithFrame', theFrame);
    
    var subviews = aCoder.decodeObjectForKey("NSSubviews");
    theView.superview = aCoder.decodeObjectForKey("NSSuperview");
    theView.window = null;
    theView.subviews = [];
    
    if (subviews) {
      for (var idx = 0; idx < subviews.length; idx++) {
        theView.addSubview(subviews[idx]);
      }
    }
    theView._bounds = NSMakeRect(0, 0, 0, 0);
    theView.setFrame(theFrame);
    
    theView._bounds.origin = NSMakePoint(0, 0);
    theView._bounds.size = this.frame.size;
    
    var vFlags = aCoder.decodeIntForKey("NSvFlags");
    theView.autoResizesSubviews = true;
    theView.autoResizeMask = vFlags & 0x3F;
    
    return theView;
  }
});

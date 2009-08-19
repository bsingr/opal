/* 
 * shadow.js
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


var NSShadow = NSObject.extend({
  
  _shadowOffset: null,
  _shadowBlurRadius: null,
  _shadowColor: null,
  
  init: function() {
    this._shadowOffset = NSMakeSize(0, 0);
    this._shadowBlurRadius = 0.0;
    this._shadowColor = NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.333);
    return this;
  },
  
  shadowOffset: function() {
    return this._shadowOffset;
  },
  
  setShadowOffset: function(offset) {
    this._shadowOffset = offset;
  },
  
  shadowBlurRadius: function() {
    return this._shadowBlurRadius;
  },
  
  setShadowBlurRadius: function(val) {
    this._shadowBlurRadius = val;
  },
  
  shadowColor: function() {
    return this.shadowColor;
  },
  
  setShadowColor: function(aColor) {
    this._shadowColor = aColor;
  },
  
  set: function() {
    var c = NSGraphicsContext.currentContext().graphicsPort();
    CGContextSetShadowWithColor(c, this.__shadowOffset, this._shadowBlurRadius, this._shadowColor);
  }
});

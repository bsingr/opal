/* 
 * text_container.js
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

var NSTextContainer = NSObject.extend({
   
  _size: null,
  _textView: null,
  _layoutManager: null,
  _lineFragmentPadding: null,
  _widthTracksTextView: null,
  _heightTracksTextView: null,
  
  initWithCoder: function(aCoder) {
    this._size = NSMakeSize(aCoder.decodeFloatForKey("NSWidth"), 0);
    this._textView = aCoder.decodeObjectForKey("NSTextView");
    this._layoutManager = aCoder.decodeObjectForKey("NSLayoutManager");
        console.log(this._textView.frame());
    this._size.height = this._textView.frame().size.height;
    this._lineFragmentPadding = 0;
    this._widthTracksTextView = true;
    this._heightTracksTextView = true;
    return this;
  },
  
  containerSize: function() {
    return this._size;
  },
  
  textView: function() {
    return this._textView;
  },
  
  lineFragmentPadding: function() {
    return this._lineFragmentPadding;
  },
  
  setContainerSize: function(aSize) {
    this._size = aSize;
    this._layoutManager.textContainerChangedGeometry(this);
  },
  
  setTextView: function(aTextView) {
    this._textView = aTextView;
    this._textView.setTextContainer(this);
  },
  
  widthTracksTextView: function() {
    return this._widthTracksTextView;
  },
  
  setWidthTracksTextView: function(flag) {
    this._widthTracksTextView = flag;
  },
  
  heightTracksTextView: function() {
    return this._heightTracksTextView;
  },
  
  setHeightTracksTextView: function(flag) {
    this._heightTracksTextView = flag;
  },
  
  layoutManager: function() {
    return this._layoutManager;
  },
  
  setLayoutManager: function(layoutManager) {
    this._layoutManager = layoutManager;
  },
  
  setLineFragmentPadding: function(padding) {
    this._lineFragmentPadding = padding;
  }
});

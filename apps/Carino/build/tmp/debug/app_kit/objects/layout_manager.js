/* 
 * layout_manager.js
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

var NSLayoutManager = NSObject.extend({
  
  _textStorage: null,
  _typesetter: null,
  
  _delegate: null,
  
  _textContainers: null,
  
  initWithCoder: function(aCoder) {
    this._textStorage = aCoder.decodeObjectForKey("NSTextStorage");
    this._typesetter = NSTypesetter.create();
    this._delegate = aCoder.decodeObjectForKey("NSDelegate");
    
    this._textContainers = [];
    var textContainers = aCoder.decodeObjectForKey("NSTextContainers");
    for (var idx = 0; idx < textContainers.length; idx++) {
      this._textContainers.push(textContainers[idx]);
    }
    
    return this;
  },
  
  textStorage: function() {
    return this._textStorage;
  },
  
  setTextStorage: function(textStorage) {
    this._textStorage = textStorage;
  },
  
  typesetter: function() {
    return this._typesetter;
  },
  
  delegate: function() {
    return this._delegate;
  },
  
  textContainers: function() {
    return this._textContainers;
  }
});

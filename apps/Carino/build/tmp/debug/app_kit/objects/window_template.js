/* 
 * window_template.js
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


var NSWindowTemplate = NSObject.extend({
  
  _maxSize: null,
  _minSize: null,
  _screenRect: null,
  
  _viewClass: null,
  _wtFlags: null,
  _windowBacking: null,
  _windowClass: null,
  _windowRect: null,
  
  _windowTitle: null,
  _windowView: null,
  
  _styleMask: null,
  _windowAutosave: null,
  
  initWithCoder: function(aCoder) {
    this._maxSize = aCoder.decodeSizeForKey("NSMaxSize");
    this._minSize = aCoder.decodeSizeForKey("NSMinSize");
    this._screenRect = aCoder.decodeRectForKey("NSScreenRect");

    this._viewClass = aCoder.decodeObjectForKey("NSViewClass");
    this._wtFlags = aCoder.decodeIntForKey("NSWTFlags");
    this._windowBacking = aCoder.decodeIntForKey("NSWindowBacking");
    this._windowClass = aCoder.decodeObjectForKey("NSWindowClass");
    this._windowRect = aCoder.decodeRectForKey("NSWindowRect");

    this._windowTitle = aCoder.decodeObjectForKey("NSWindowTitle");
    this._windowView = aCoder.decodeObjectForKey("NSWindowView");

    this._styleMask = aCoder.decodeIntForKey("NSWindowStyleMask");
    this._windowAutosave = aCoder.decodeObjectForKey("NSFrameAutosaveName");

    return this;
  },
  
  awakeAfterUsingCoder: function(aCoder) {
    var theClass = window[this._windowClass];
    var theWindow = theClass.create('initWithContentRectAndStyleMask', this._windowRect, this._styleMask);
    theWindow.setContentView(this._windowView);
    return theWindow;
  }
});

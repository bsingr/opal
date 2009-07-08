/* 
 * graphics_context.js
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


var NSGraphicsContextCurrent = null;

var NSGraphicsContext = NSObject.extend({
    
    // low level context: (2d context for canvas)
    _graphicsPort: null,
    
    // not flipped means origin is bottom left. A Flipped context has the origin
    // at the top left (opposite to what 2d canvas in browser has)
    _isFlipped: null,
    
    initWithGraphicsPort: function(graphicsPort, initialFlippedState) {
        this._graphicsPort = graphicsPort;
        this._isFlipped = initialFlippedState;
        return this;
    },
    
    graphicsPort: function() {
        return this._graphicsPort;
    },
    
    isFlipped: function() {
        return this._isFlipped;
    }
});

Object.extend(NSGraphicsContext, {
   
    graphicsContextWithGraphicsPort: function(graphicsPort, initialFlippedState) {
        return NSGraphicsContext.create('initWithGraphicsPort', graphicsPort, initialFlippedState);
    },
    
    currentContext: function() {
        return NSGraphicsContextCurrent;
    },
    
    setCurrentContext: function(context) {
        NSGraphicsContextCurrent = context;
    },
    
    saveGraphicsState: function() {
        var ctx = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(ctx);
    },
    
    restoreGraphicsState: function() {
        var ctx = NSGraphicsContext.currentContext().graphicsPort();
        CGContextRestoreGState(ctx);     
    }
});

/* 
 * panel.js
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


var NSPanel = NSWindow.extend({
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        // bottom
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.1, 0.1, 0.1, 0.6));
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, aRect.origin.x, aRect.origin.y + 19);
        CGContextAddLineToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + 19);
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + aRect.size.height,
                                aRect.origin.x + aRect.size.width - 6, aRect.origin.y + aRect.size.height,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y + aRect.size.height,
                                aRect.origin.x, aRect.origin.y + aRect.size.height - 6,
                                6)

        CGContextClosePath(c);
        CGContextFillPath(c);
        
        // top
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.25, 0.25, 0.25, 0.6));
        // CGContextFillRect(c, NSMakeRect(aRect.origin.x, aRect.origin.y, aRect.size.width, 19));
        CGContextBeginPath(c);
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, aRect.origin.x, aRect.origin.y + 19);
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y, aRect.origin.x + 6, aRect.origin.y, 6);
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y, aRect.origin.x + aRect.size.width, aRect.origin.y + 6, 6);
        CGContextAddLineToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + 19);
        CGContextClosePath(c);
        CGContextFillPath(c);
    }
});

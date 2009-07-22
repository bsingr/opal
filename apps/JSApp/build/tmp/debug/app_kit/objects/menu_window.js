/* 
 * menu_window.js
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


var NSMenuWindow = NSWindow.extend({
    
    _menu: null,
    
    initWithMenu: function(aMenu) {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._backgroundColor = NSColor.colorWithCalibratedRGBA(0.904, 0.904, 0.904, 1);
        this._hasShadow = true;
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(NSMakeRect(100,100,100,100));
        this._firstResponder = this;
        
        this._menu = aMenu;
        
        // menu view
        this._contentView = NSMenuView.create('initWithMenu', this._menu);
        this._contentView.setHorizontal(false);
        this._contentView.update();
        this._contentView._window = this;
        this.setFrame(this._contentView.frame());
        // this._DOMContainer.appendChild(this._contentView.renderElement);
        
        this.setNextResponder(NSApplication.sharedApplication());
        
        this.setLevel(NSPopUpMenuWindowLevel);
        
        return this;
    },
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.1, 0.1, 0.1, 0.604));
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, aRect.origin.x + 6, aRect.origin.y);
        
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y,
                                aRect.origin.x + aRect.size.width, aRect.origin.y + 6,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + aRect.size.height,
                                aRect.origin.x + aRect.size.width - 6, aRect.origin.y + aRect.size.height,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y + aRect.size.height,
                                aRect.origin.x, aRect.origin.y + aRect.size.height - 6,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y,
                                aRect.origin.x + 6, aRect.origin.y,
                                6);

        CGContextClosePath(c);
        
        // shadow
        CGContextSetShadowWithColor(c, NSMakeSize(0, 5), 10, NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.694));
        CGContextFillPath(c);
    },
    
    /**
        Used to work out the actual framerect for the winow based on the provided
        content rect. This window basically needs to consider that the menu will 
        have a shadow, and thus provide room for it.
    */
    frameRectForContentRect: function(contentRect) {
        return NSMakeRect(contentRect.origin.x - 20, // 20px shadow room
                        contentRect.origin.y - 20, // 20px shadow room
                        contentRect.size.width + 40, // 20px shadow on either side
                        contentRect.size.height + 40); // 20px shadow on bottom and top
    },
    
    contentRectForFrameRect: function(frameRect) {
        return NSMakeRect(frameRect.origin.x + 20,
                        frameRect.origin.y + 20,
                        frameRect.size.width,
                        frameRect.size.height);
    }
});

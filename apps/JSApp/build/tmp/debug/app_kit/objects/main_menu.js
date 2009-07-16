/* 
 * main_menu.js
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


/**
    MainMenu. This holds the main menu itself, a title (app title) and the status
    bar for the application. This window does not have a content view, and instead
    holds three views. one for each of the previously outlined responsibilities.
    
    Due to the massive internal chnages that the window undertakes, a lot of the
    functionality is removed abnd over-ridden.
*/
var NSMainMenu = NSWindow.extend({
    
    _mainMenu: null,
    _mainMenuView: null,
    
    _applicationTitleView: null,
    
    _hasGradient: null,
    
    initWithMainMenu: function(aMenu) {
        this.setupGraphicsContextDisplay();
        
        this._backgroundColor = NSColor.colorWithCalibratedRGBA(0.33, 0.33, 0.33, 1);
        this._hasGradient = true;
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(NSMakeRect(100,100,100,100));
        this._firstResponder = this;
        
        this._mainMenu = aMenu;
        
        // menu view
        this._mainMenuView = NSMenuView.create('initWithMenu', this._mainMenu);
        this._mainMenuView.setHorizontal(true);
        this._mainMenuView.update();
        this._DOMContainer.appendChild(this._mainMenuView.DOMContainer());
        
        // menu title
        this._applicationTitleView = NSApplicationTitleView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));
        this._DOMContainer.appendChild(this._applicationTitleView.DOMContainer());
        
        this.setNextResponder(NSApplication.sharedApplication());
        
        this.setLevel(NSMainMenuWindowLevel);
        
        this.tile();
        
        return this;
    },
    
    applicationDidChangeScreenParameters: function(aNotification) {
        // console.log('main menu got new screen co-ordinates');
        this.tile();
    },
    
    setMainMenu: function(aMenu) {
        this._mainMenu = aMenu;
    },
    
    mainMenu: function() {
        return this._mainMenu;
    },
    
    setHasGradient: function(flag) {
        this._hasGradient = flag;
    },
    
    hasGradient: function() {
        return this._hasGradient;
    },
    
    sendEvent: function(theEvent) {
        var hitTest, aPoint = theEvent.locationInWindow();
        
        switch (theEvent.type()) {
            case NSLeftMouseDown:
                hitTest = this._mainMenuView.hitTest(aPoint);
                if (hitTest) {
                    hitTest.mouseDown(theEvent);
                    // console.log('hitTest in mainMenu');
                }
                else {
                    console.log('Sending mouse down to (else)');
                }
                break;
            case NSLeftMouseUp:
                console.log('mouse up;');
                break;
        }
    },
    
    contentRectForFrameRect: function(frameRect) {
        return NSMakeRect(0, 0, frameRect.size.width, frameRect.size.height);
    },
    
    frameRectForContentRect: function(contentRect) {
        return NSMakeRect(contentRect.origin.x, contentRect.origin.y, contentRect.size.width, contentRect.size.height);
    },
    
    /**
        Calculates the size and position of the window, and moves it into place using setFrame
    */
    tile: function() {
        this.setFrame(NSMakeRect(0, window.innerHeight - NSMenu.menuBarHeight(), window.innerWidth, NSMenu.menuBarHeight()));
    },
    
    setFrame: function(frameRect) {
        this._frame = frameRect;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        this.setNeedsDisplay(true);
        
        // application title view
        this._applicationTitleView.setFrame(NSMakeRect(frameRect.size.width / 2, 0, 100, 38));
    },
    
    drawRect: function(rect) {
		var c = NSGraphicsContext.currentContext().graphicsPort();
		CGContextClearRect(c, rect);
		CGContextSaveGState(c);
		CGContextSetFillColorWithColor(c, this._backgroundColor);
		CGContextFillRect(c, rect);
		
		if (this.hasGradient()) {
		    var lingrad = c.createLinearGradient(0,0,0,rect.size.height);
            lingrad.addColorStop(0, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(0.604, 0.604, 0.604, 0.504)));
            lingrad.addColorStop(1, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(0.264, 0.264, 0.264, 0.504)));
            
            c.fillStyle = lingrad;
            c.fillRect(0,0,rect.size.width,rect.size.height);
		}
		
		c.strokeStyle = "black";
		c.beginPath();
		c.moveTo(0, rect.size.height - 0.5);
		c.lineTo(rect.size.width, rect.size.height - 0.5)
		c.stroke();
		
		CGContextRestoreGState(c);
	}
});

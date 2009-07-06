/* 
 * window.js
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


var NSBorderlessWindowMask              = 0;
var NSTitledWindowMask                  = 1 << 0;
var NSClosableWindowMask                = 1 << 1;
var NSMiniaturizableWindowMask          = 1 << 2;
var NSResizableWindowMask               = 1 << 3;
var NSTexturedBackgroundWindowMask      = 1 << 8;
var NSUnifiedTitleAndToolbarWindowMask  = 1 << 12;

var NSNormalWindowLevel                 = 10;
var NSFloatingWindowLevel               = 10;
var NSSubmenuWindowLevel                = 10;
var NSTornOffMenuWindowLevel            = 10;
var NSMainMenuWindowLevel               = 70;
var NSStatusWindowLevel                 = 10;
var NSModalPanelWindowLevel             = 10;
var NSPopUpMenuWindowLevel              = 60;
var NSScreenSaverWindowLevel            = 10;

var NSWindowCloseButton                 = 0;
var NSWindowMiniaturizeButton           = 1;
var NSWindowZoomButton                  = 2;
var NSWindowToolbarButton               = 3;
var NSWindowDocumentIconButton          = 4;

var NSWindowDidBecomeKeyNotification            = "NSWindowDidBecomeKeyNotification";
var NSWindowDidBecomeMainNotification           = "NSWindowDidBecomeMainNotification";
var NSWindowDidChangeScreenNotification         = "NSWindowDidChangeScreenNotification";
var NSWindowDidDeminiaturizeNotification        = "NSWindowDidDeminiaturizeNotification";
var NSWindowDidExposeNotification               = "NSWindowDidExposeNotification";
var NSWindowDidMiniaturizeNotification          = "NSWindowDidMiniaturizeNotification";
var NSWindowDidMoveNotification                 = "NSWindowDidMoveNotification";
var NSWindowDidResignKeyNotification            = "NSWindowDidResignKeyNotification";
var NSWindowDidResignMainNotification           = "NSWindowDidResignMainNotification";
var NSWindowDidResizeNotification               = "NSWindowDidResizeNotification";
var NSWindowDidUpdateNotification               = "NSWindowDidUpdateNotification";
var NSWindowWillCloseNotification               = "NSWindowWillCloseNotification";
var NSWindowWillMiniaturizeNotification         = "NSWindowWillMiniaturizeNotification";
var NSWindowWillMoveNotification                = "NSWindowWillMoveNotification";
var NSWindowWillBeginSheetNotification          = "NSWindowWillBeginSheetNotification";
var NSWindowDidEndSheetNotification             = "NSWindowDidEndSheetNotification";
var NSWindowDidChangeScreenProfileNotification  = "NSWindowDidChangeScreenProfileNotification";


var NSWindow = NSResponder.extend({
    
    _contentRectOrigin: null,
    _contentRectSize: null,

    _isVisible: false,

    _hasShadow: true,
    _hidesOnDeactivate: false,
    _releasedWhenClosed: true,
    _styleMask: 0,
    _title: "Window",
    _visibleAtLaunch: true,
    _resizable: true,

    _showNormalTitlebar: true,
    _unifiedTitleAndToolbar: false,

    _toolbar: null,

    _contentView: null,

    _delegate: null,
    _windowNumber: -1,

    _frame: null,
    _bounds: null,
    _visible: false,

    _level: 0,
    _keyWindow: false,
    _mainWindow: false,
    _firstResponder: null,

    _movableByWindowBackground: true,

    _eventBindingCurrent: null,

    _windowCloseButton: null,
    _fieldEditor: null,
    
    _isZoomed: false,

    _maxSize: null,
    _minSize: null,
    _wtFlags: 0,
    _windowClass: null,


    _DOMContainer: null,         // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    _DOMGraphicsContext: null,   // Rendering context: usually a canvas (exceptions for DOM rendering and VML)
    _graphicsContext: null,      // a cache of the actual graphics context (from canvas, or VML representation).
    
    // used to hold the old frame size for when a window is "unZoomed"
    _oldZoomFrame: null,
    
    DOMContainer: function() {
        return this._DOMContainer;
    },
    
    contentRectForFrameRect: function(frameRect) {
        
        var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
        
        if (this.hasShadow()) {
            xOffset += 20;
            yOffset += 20;
        }
              
        return NSMakeRect(0 + xOffset, 0 + yOffset, frameRect.size.width, frameRect.size.height);
    },
    
    frameRectForContentRect: function(contentRect) {
        
        var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
        
        if (this.hasShadow()) {
            xOffset -= 20;
            yOffset -= 20;
            wOffset += 40;
            hOffset += 40;
        }
        
        return NSMakeRect(contentRect.origin.x + xOffset, contentRect.origin.y + yOffset, contentRect.size.width + wOffset, contentRect.size.height + hOffset);
    },
    
    init: function() {
        this._super();
        return this;
    },
    
    initWithContentRectAndStyleMask: function(contentRect, aStyle) {
        this.init();
                
        // DOM etc
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        this._styleMask = aStyle;
        
        this._hasShadow = (aStyle == NSBorderlessWindowMask) ? false : true;
        
        this._level = NSNormalWindowLevel;
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(contentRect);
        this._firstResponder = this;
        
        this.setContentView(NSView.create('initWithFrame', NSMakeRect(0, 0, 0, 0)));
        this.setNextResponder(NSApplication.sharedApplication());
        this.setFrame(contentRect, false);
        this.setNeedsDisplay(true);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        
        if (this.isZoomed())
            return;
        
        // this.makeMainWindow();     
        this._eventBindingCurrent = theEvent.locationInWindow();
        
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            
            if (theEvent.type() == NSLeftMouseUp) {
                NSApplication.sharedApplication().unbindEvents();
                return;
            }
            
            var location = theEvent.locationInWindow();
            
            // if we move the mouse too quickly, the mouse may jump outside the window, so that the location
            // in the window will be null. therefore, we need to get the location from the cursor's location
            // on screen, and adjust it into this window's co-ordinates. hack, but it works.
            if (!location) {
                location = this.convertScreenToBase(theEvent.locationInScreen());
            }
            
            var newOrigin = NSMakePoint(this._frame.origin.x + (location.x - this._eventBindingCurrent.x),
                                        this._frame.origin.y + (location.y - this._eventBindingCurrent.y));
            
            this.setFrameOrigin(newOrigin);
            
        });
    },
    
    /**
        Receieved from the application when the browser window chnages its
        co-ordinates: likely to result from the user adjusting the window
        size manually. For standard windows, the current default action to
        take is to adjust the window only if the window is currently zoomed.
        
        By being zoomed, the window wants to take up the entire available
        space. Non zoomed windows will not do anything.
        
        In future, it might be a consideration to move non-zoomed windows
        to ensure they stay visible if the window is resized such to hide
        them entirely or perhaps partially.
    */
    applicationDidChangeScreenParameters: function(aNotification) {
        // console.log('main menu got new screen co-ordinates');
        if (this._isZoomed) {
            this.setFrame(NSMakeRect(0, 0, window.innerWidth, window.innerHeight - NSMenu.menuBarHeight()));
        }
    },

    title: function() {
        return this._title;
    },
    
    setTitle: function(aString) {
        this._title = aString;
        this.setNeedsDisplay(true);
    },
    
    setRepresentedURL: function(url) {
        
    },
    
    representedURL: function() {
        
    },
    
    representedFilename: function() {
        
    },
    
    setRepresentedFilename: function(aString) {
        
    },
    
    isExcludedFromWindowsMenu: function() {
        return false;
    },
    
    setContentView: function(aView) {
        if (this._contentView)
            this._contentView.removeFromSuperview();
    
        this._contentView = aView;
        
        aView.viewWillMoveToSuperview(null);
        aView.viewWillMoveToWindow(this);
        aView.setFrame(this.contentRectForFrameRect(this.frame()));
        aView.viewDidMoveToSuperview();
        aView.viewDidMoveToWindow();
        aView.setNextResponder(this);
        this._DOMContainer.appendChild(aView._DOMContainer);
    },
    
    contentView: function() {
        return this._contentView;
    },
    
    setDelegate: function(anObject) {
        this._delegate = anObject;
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    windowNumber: function() {
        return this._windowNumber;
    },
    
    fieldEditor: function(createFlag, anObject) {
        if (!this._fieldEditor) {
            this._fieldEditor = NSTextView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));
            this._fieldEditor.viewWillMoveToWindow(this);
            return this._fieldEditor;
        }
        else {
            if (this._fieldEditor.resignFirstResponder())
                return this._fieldEditor;
            
            this._fieldEditor = NSTextView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));        
            this._fieldEditor.viewWillMoveToWindow(this);
            return this._fieldEditor;
        }
    },
    
    endEditingFor: function(anObject) {
        this._fieldEditor.removeFromSuperview();
        this._fieldEditor.setString("");
    },
    
    setFrame: function(frameRect, flag, animate) {
        this._frame = frameRect;
        
        var actualFrameRect = this.frameRectForContentRect(this._frame);
        
        CGDOMElementSetFrame(this._DOMContainer, actualFrameRect);
        CGDOMElementSetFrame(this._DOMGraphicsContext, NSMakeRect(0, 0, actualFrameRect.size.width, actualFrameRect.size.height));
        
        this._contentView.setFrame(this.contentRectForFrameRect(this._frame));
        
        this.setNeedsDisplay(true);
    },
    
    setContentSize: function(aSize) {
        
    },
    
    setFrameOrigin: function(aPoint) {
        this._frame.origin = aPoint;
        CGDOMElementSetFrameOrigin(this._DOMContainer, this.frameRectForContentRect(this._frame).origin);
    },
    
    frame: function() {
        return this._frame;
    },
    
    bounds: function() {
        var frameRect = this.contentRectForFrameRect(this._frame);
        return frameRect;
        // return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
    },
    
    animationResizeTime: function(newFrame) {
        
    },

    setShowsResizeIndicator: function(show) {
        
    },
    
    showsResizeIndication: function() {
        
    },
    
    setResizeIncrements: function(increments) {
        
    },
    
    reszieIncrements: function() {
        
    },
    
    setAspectRatio: function(ratio) {
        
    },
    
    aspectRatio: function() {
        
    },
    
    useOptimizedDrawing: function(flag) {
        
    },
    
    setViewsNeedDisplay: function(flag) {
        
    },
    
    viewsNeedDisplay: function() {
        
    },
    
    displayIfNeeded: function() {
        
    },
    
    display: function() {
        
    },
    
    setAutodisplay: function(flag) {
        
    },
    
    isAutodisplay: function() {
        
    },
    
    preservesContentDuringLiveResize: function() {
        
    },
    
    setPreservesContentDuringLiveResize: function(flag) {
        
    },
    
    update: function() {
        
    },
    
    makeFirstResponder: function(aResponder) {
        
    },
    
    firstResponder: function() {
        
    },
    
    resizeFlags: function() {
        
    },
    
    keyDown: function(theEvent) {
        
    },
    
    close: function() {
        console.log('window needs to close');
        document.body.removeChild(this._DOMContainer);
    },
    
    setReleasedWhenClosed: function(flag) {
        
    },
    
    isReleasedWhenClosed: function() {
        
    },
    
    miniaturize: function(sender) {
        
    },
    
    deminiaturize: function(sender) {
        
    },
    
    isZoomed: function() {
        return this._isZoomed;
    },
    
    zoom: function(sender) {
        console.log('zoom window');
    },
    
    isMiniaturized: function() {
        
    },
    
    tryToPerform: function(anAction, anObject) {
        
    },
    
    setBackgroundColor: function(color) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setContentBorderThicknessForEdge: function(thicknedd, edge) {
        
    },
    
    contentBorderThickneddForEdge: function(edge) {
        
    },
    
    setMovableByWindowBackground: function(flag) {
        
    },
    
    isMovableByWindowBackground: function() {
        
    },
    
    setHidesOnDeactivate: function(flag) {
        
    },
    
    hidesOnDeactivate: function() {
        
    },
    
    center: function() {
        
    },
    
    makeKeyAndOrderFront: function(sender) {
        
    },
    
    orderFront: function(sender) {
        
    },
    
    orderBack: function(sender) {
        
    },
    
    orderOut: function(sender) {
        
    },
    
    orderWindowRelativeTo: function(place, otherWin) {
        
    },
    
    orderFrontRegardless: function() {
        
    },
    
    setMiniwindowImage: function(image) {
        
    },
    
    setMiniwindowTitle: function(title) {
        
    },
    
    miniwindowImage: function() {
        
    },
    
    miniwindowTitle: function() {
        
    },
    
    setDocumentEdited: function(flag) {
        
    },
    
    isDocumentEdited: function() {
        
    },
    
    isVisible: function() {
        
    },
    
    isKeyWindow: function() {
        
    },
    
    isMainWindow: function() {
        
    },
    
    canBecomeKeyWindow: function() {
        
    },
    
    canBecomeMainWindow: function() {
        
    },
    
    makeKeyWindow: function() {
        
    },
    
    makeMainWindow: function() {
        
    },
    
    becomeKeyWindow: function() {
        
    },
    
    becomeMainWindow: function() {
        
    },
    
    resignKeyWindow: function() {
        
    },
    
    resignMainWindow: function() {
        
    },
    
    worksWhenModal: function() {
        return false;
    },
    
    convertBaseToScreen: function(aPoint) {
        
    },
    
    convertScreenToBase: function(aPoint) {
        return {
            x: aPoint.x - this._frame.origin.x,
            y: aPoint.y - this._frame.origin.y
        };
    },
    
    performClose: function(sender) {
        
    },
    
    performMiniaturize: function(sender) {
        
    },
    
    performZoom: function(sender) {
        this._isZoomed = true;
        this.setFrame(NSMakeRect(0, 0, window.innerWidth, window.innerHeight - NSMenu.menuBarHeight()));
    },
    
    setOneShot: function(flag) {
        
    },
    
    isOneShot: function() {
        
    },
    
    disableCursorRects: function() {
        
    },
    
    enableCursorRects: function() {
        
    },
    
    discardCursorRects: function() {
        
    },
    
    areCursorRectsEnabled: function() {
        
    },
    
    invalidateCursorRectsForView: function(aView) {
        
    },
    
    resetCursorRects: function() {
        
    },
    
    setLevel: function(newLevel) {
        this._DOMContainer.style.zIndex = newLevel;
        this._level = newLevel;
    },
    
    level: function() {
        return this._level;
    },
    
    screen: function() {
        
    },
    
    setHasShadow: function(hasShadow) {
        this._hasShadow = hasShadow;
    },
    
    hasShadow: function() {
        return this._hasShadow;
    },
    
    invalidateShadow: function() {
        
    },
    
    setAlphaValue: function(windowAlpha) {
        
    },
    
    alphaValue: function() {
        
    },
    
    setOpaque: function(isOpaque) {
        
    },
    
    isOpaque: function() {
        
    },
    
    cacheImageInRect: function(aRect) {
        
    },
    
    restoreCachedImage: function() {
        
    },
    
    discardCachedImage: function() {
    
    },
    
    minSize: function() {
        
    },
    
    maxSize: function() {
        
    },
    
    setMinSize: function(size) {
        
    },
    
    setMaxSize: function(size) {
        
    },
    
    postEvent: function(theEvent, flag) {
        
    },
    
    currentEvent: function() {
        
    },
    
    setAcceptsMouseMovedEvents: function(flag) {
        
    },
    
    acceptsMouseMovedEvents: function() {
        
    },
    
    setIgnoresMouseEvents: function(flag) {
        
    },
    
    ignoresMouseEvents: function() {
        
    },
    
    sendEvent: function(theEvent) {
        var hitTest, aPoint = theEvent.locationInWindow();
        switch (theEvent.type()) {
            case NSLeftMouseDown:

                hitTest = this._contentView.hitTest(aPoint);
                if (hitTest) {
                    hitTest.mouseDown(theEvent);
                    // console.log(hitTest);
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
    
    mouseLocationOutsideOfEventStream: function() {
        
    },
    
    windowController: function() {
        
    },
    
    setWindowController: function(windowController) {
        
    },
    
    isSheet: function() {
        
    },
    
    attatchedSheet: function() {
        
    },
    
    addChildWindow: function(childWin, place) {
        
    },
    
    removeChildWindow: function(childWin) {
        
    },
    
    childWindows: function() {
        
    },
    
    parentWindow: function() {
        
    },
    
    setParentWindow: function(window) {
        
    },
    
    graphicsContext: function() {
        return this._DOMGraphicsContext.getContext('2d');
    },

    setInitialFirstResponder: function(view) {
        
    },
    
    initialFirstResponder: function() {
        
    },
    
    selectNextKeyView: function(sender) {
        
    },
    
    selectPreviousKeyView: function(sender) {
        
    },
    
    selectKeyViewFollowingView: function(aView) {
        
    },
    
    selectKeyViewPrecedingView: function(aView) {
        
    },
    
    keyViewSelectionDirection: function() {
        
    },
    
    setDefaultButtonCell: function(defButt) {
	
	},
	
	defautButtonCell: function() {
		
	},
	
	recalculateKeyViewLoop: function() {
		
	},
	
	setToolbar: function(toolbar) {
		
	},
	
	toolbar: function() {
		
	},
	
	toggleToolbarShown: function(sender) {
		
	},
	
	runToolbarCustomizationPalette: function(sender) {
		
	},
	
	setShowsToolbarButton: function(show) {
		
	},
	
	showsToolbarButton: function() {
		
	},
	
	dragImage: function(anImage, baseLocation, initialOffset, theEvent, pboard, sourceObj, slideFlag) {
		
	},
	
	registerForDraggedTypes: function(newTypes) {
		
	},
	
	unregisterDraggedTypes: function() {
		
	},
	
	canDraw: function() {
		
	},
	
	setNeedsDisplay: function(flag) {
        // if (flag) {
        //     var actualBounds = this.frameRectForContentRect(this._frame);
        //     actualBounds.origin.x = 0;
        //     actualBounds.origin.y = 0;
        //     this.setNeedsDisplayInRect(actualBounds);
        // }
        this.setNeedsDisplayInRect(this.bounds());
	},
	
	setNeedsDisplayInRect: function(invalidRect) {

		this.displayRect(invalidRect);
	},
	
	needsDisplay: function() {
		
	},
	
	lockFocus: function() {
		if (!this._graphicsContext)
			this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
		
		NSGraphicsContext.setCurrentContext(this._graphicsContext);
		CGContextSaveGState(this._graphicsContext.graphicsPort());
		CGContextClearRect(this._graphicsContext.graphicsPort(), NSMakeRect(0, 0, this._DOMGraphicsContext.width, this._DOMGraphicsContext.height));
	},
	
	unlockFocus: function() {
		CGContextRestoreGState(this._graphicsContext.graphicsPort());
		NSGraphicsContext.setCurrentContext(null);
	},
	
	lockFocusIfCanDraw: function() {
		
	},
	
	lockFocusIfCanDrawInContext: function(context) {
		
	},
	
	display: function() {
		this.displayRect(this.bounds());
	},
	
	displayIfNeeded: function() {
		if (this.needsDisplay())
			this.displayRect(this.bounds());
	},
	
	displayIfNeededIgnoringOpacity: function() {
		
	},
	
	displayRect: function(rect) {
		this.displayRectIgnoringOpacityInContext(rect, null);
	},
	
	displayIfNeededInRect: function(rect) {
		if (this.needsDisplay())
			this.displayRect(this.bounds());
	},

    drawRect: function(rect) {
		var c = NSGraphicsContext.currentContext().graphicsPort();
		CGContextClearRect(c, rect);
		CGContextSaveGState(c);
		console.log('drawing window');
		
		if (this.hasShadow()) {
		    CGContextSetShadowWithColor(c, NSMakeSize(0, 5), 10, NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.694));
		}
		
		CGContextSetFillColor(c, [0.944, 0.944, 0.944, 1.0]);
		CGContextFillRect(c, rect);
	},
	
	displayRectIgnoringOpacityInContext: function(aRect, context) {
		this.lockFocus();
		this.drawRect(aRect);
		this.unlockFocus();
	},

    bitmapImageRepForCachingDisplayInRect: function(aRect) {
	
	},
	
	cacheDisplayInRectToBitmapImageRep: function(aRect, bitmapImageRep) {
		
	}
});

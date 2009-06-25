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

include('foundation/geometry');
include('app_kit/responder');
include('app_kit/graphics');
include('app_kit/text');
include('app_kit/application');
include('app_kit/gradient');

var NSBorderlessWindowMask              = 0;
var NSTitledWindowMask                  = 1 << 0;
var NSClosableWindowMask                = 1 << 1;
var NSMiniaturizableWindowMask          = 1 << 2;
var NSResizableWindowMask               = 1 << 3,;
var NSTexturedBackgroundWindowMask      = 1 << 8;
var NSUnifiedTitleAndToolbarWindowMask  = 1 << 12;

var NSNormalWindowLevel                 = 10;
var NSFloatingWindowLevel               = 10;
var NSSubmenuWindowLevel                = 10;
var NSTornOffMenuWindowLevel            = 10;
var NSMainMenuWindowLevel               = 10;
var NSStatusWindowLevel                 = 10;
var NSModalPanelWindowLevel             = 10;
var NSPopUpMenuWindowLevel              = 10;
var NSScreenSaverWindowLevel            = 10;

var NSWindowCloseButton                 = 0;
var NSWindowMiniaturizeButton           = 1;
var NSWindowZoomButton                  = 2;
var NSWindowToolbarButton               = 3;
var NSWindowDocumentIconButton          = 4;


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

    _eventBindingCurrentX: null,
    _eventBindingCurrentY: null,

    _windowCloseButton: null,
    _fieldEditor: null,

    _maxSize: null,
    _minSize: null,
    _wtFlags: 0,
    _windowClass: null,


    _DOMContainer: null,         // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    _DOMGraphicsContext: null,   // Rendering context: usually a canvas (exceptions for DOM rendering and VML)
    _graphicsContext: null,      // a cache of the actual graphics context (from canvas, or VML representation).
    
    contentRectForFrameRect: function(frameRect) {
        return CGRectMake(0, 0, frameRect.size.width, frameRect.size.height);
    },
    
    init: function() {
        this._super();
        return this;
    },
    
    initWithContentRectAndStyleMask: function(contentRect, aStyle) {
        this = this.init();
        
        // DOM etc
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        this._styleMask = aStyle;
        this._level = NSNormalWindowLevel;
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(contentRect);
        this._firstResponder = this;
        
        this.setContentView(new NSView('initWithFrame', contentRect));
        this.setNextResponder(NSApplication.sharedApplication());
        this.setFrame(this.frameRectForContentRect(contentRect), false);
        this.setNeedsDisplay(true);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        this.makeMainWindow();
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
    
    fieldEditorForObject: function(createFlag, anObject) {
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
        this.setNeedsDisplay(true);
    },
    
    setContentSize: function(aSize) {
        
    },
    
    setFrameOrigin: function(aPoint) {
        
    },
    
    frame: function() {
        return this._frame;
    },
    
    bounds: function() {
        return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
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
        
    },
    
    zoom: function(sender) {
        
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
        
    }
    
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
        
    },
    
    level: function() {
        
    },
    
    screen: function() {
        
    },
    
    setHasShadow: function(hasShadow) {
        
    },
    
    hasShadow: function() {
        
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
        var hitTest;
        if (theEvent.type() == NSLeftMouseDown) {
            hitTest = this._contentView.hitTest(theEvent.locationInWindow);
            if (hitTest)
                hitTest.mouseDown(theEvent);
            else
                NSLog("Mouse event (down) did not find a target");
        }
        else if (theEvent.type() == NSLeftMouseUp) {
            // mouse up
        }
        else if (theEvent.type() == NSKeyDown) {
            if (this._firstResponder) {
                NSLog("Sending key down to first responder");
                this._firstReponder.keyDown(theEvent);
            }
            else
                NSLog("No key responder");
        }
        else {
            
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
    
    
    
    
    - (void)setDefaultButtonCell:(NSButtonCell *)defButt
    {
        // TODO: Need to implement
    }

    - (NSButtonCell *)defaultButtonCell
    {
        // TODO: Need to implement
    }

    - (void)disableKeyEquivalentForDefaultButtonCell
    {
        // TODO: Need to implement
    }

    - (void)enableKeyEquivalentForDefaultButtonCell
    {
        // TODO: Need to implement
    }

    - (void)setAutorecalculatesKeyViewLoop:(BOOL)flag
    {
        // TODO: Need to implement
    }

    - (BOOL)autorecalculatesKeyViewLoop
    {
        // TODO: Need to implement
    }

    - (void)recalculateKeyViewLoop
    {
        // TODO: Need to implement
    }

    @end

    @implementation NSWindow (NSToolbarSupport)

    - (void)setToolbar:(NSToolbar*)toolbar
    {
        // TODO: Need to implement
    }

    - (NSToolbar *)toolbar
    {
        // TODO: Need to implement
    }

    - (void)toggleToolbarShown:(id)sender
    {
        // TODO: Need to implement
    }

    - (void)runToolbarCustomizationPalette:(id)sender
    {
        // TODO: Need to implement
    }

    - (void)setShowsToolbarButton:(BOOL)show
    {
        // TODO: Need to implement
    }

    - (BOOL)showsToolbarButton
    {
        // TODO: Need to implement
    }

    @end


    @implementation NSWindow (NSDrag)

    - (void)dragImage:(NSImage *)anImage at:(NSPoint)baseLocation offset:(NSSize)initialOffset event:(NSEvent *)event pasteboard:(NSPasteboard *)pboard source:(id)sourceObj slideBack:(BOOL)slideFlag
    {
        // TODO: Need to implement
    }

    - (void)registerForDraggedTypes:(NSArray *)newTypes
    {
        // TODO: Need to implement
    }

    - (void)unregisterDraggedTypes
    {
        // TODO: Need to implement
    }

    @end


    @implementation NSWindow (ViennaWindowDrawingExtensions)

    - (BOOL)canDraw
    {
        // TODO: Need to implement
    }

    - (void)setNeedsDisplay:(BOOL)flag
    {
        if (flag)
    		[self setNeedsDisplayInRect:[self bounds]];
    }

    - (void)setNeedsDisplayInRect:(NSRect)invalidRect
    {
    	[self displayRect:invalidRect];
    }

    - (BOOL)needsDisplay
    {
        // TODO: Need to implement
    }

    - (void)lockFocus
    {
        if (!_graphicsContext)
    		_graphicsContext = [NSGraphicsContext graphicsContextWithGraphicsPort:CGDOMElementGetContext(_DOMGraphicsContext) flipped:NO];

        // CGContextClearRect(_graphicsContext, [self bounds]);
    	[NSGraphicsContext setCurrentContext:_graphicsContext];
    	CGContextSaveGState([_graphicsContext graphicsPort]);
    }

    - (void)unlockFocus
    {
    	CGContextRestoreGState([_graphicsContext graphicsPort]);
    	[NSGraphicsContext setCurrentContext:nil];
    }

    - (BOOL)lockFocusIfCanDraw
    {
        // TODO: Need to implement
    }

    - (BOOL)lockFocusIfCanDrawInContext:(NSGraphicsContext *)context
    {
        // TODO: Need to implement
    }

    - (void)display
    {
    	[self displayRect:[self bounds]];
    }

    - (void)displayIfNeeded
    {
        if ([self needsDisplay])
    		[self displayRect:[self bounds]];
    }

    - (void)displayIfNeededIgnoringOpacity
    {
        // TODO: Need to implement
    }

    - (void)displayRect:(NSRect)rect
    {
    	// [self viewWillDraw];
    	[self displayRectIgnoringOpacity:rect inContext:nil];
    }

    - (void)displayIfNeededInRect:(NSRect)rect
    {
        if ([self needsDisplay])
    		[self displayRect:[self bounds]];
    }

    - (void)displayRectIgnoringOpacity:(NSRect)rect
    {
        // TODO: Need to implement
    }

    - (void)displayIfNeededInRectIgnoringOpacity:(NSRect)rect
    {
        // TODO: Need to implement
    }

    - (void)drawRect:(NSRect)rect
    {
    	CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
        CGContextClearRect(c, rect);
        // CGContextSetAlpha(c, 0.3);
        CGContextSaveGState(c);
        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.944, 0.944, 0.944, 1.0));
        CGContextSetShadowWithColor(c, CGSizeMake(0,5), 10, CGColorCreateGenericRGB(0.2,0.2,0.2,0.8));
        CGContextFillRect(c, CGRectInset(rect, 20, 20));
        CGContextRestoreGState(c);
        CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSWindowBackgroundMiddle.png");

                CGContextDrawImage(c, CGRectMake(20,20,rect.size.width - 40,56), theImage);

    	// CGRect newRect = CGRectInset(rect, 5, 5);
    	//     CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.3,0.8,0.2,0.5));
    	//     CGContextFillRect(c, newRect);

        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.204,0.204,0.204, 1.0));
        CGContextSetAlpha(c, 1);
        CGFontRef theFont = CGFontCreate(@"Arial", 12, YES);
        CGContextSetFont(c, theFont);

        CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

        CGContextShowTextAtPoint(c, 200, 36, @"Hello there!", 20);
    }

    - (void)displayRectIgnoringOpacity:(NSRect)aRect inContext:(NSGraphicsContext *)context
    {
    	[self lockFocus];
    	[self drawRect:aRect];
    	[self unlockFocus];
    }

    - (NSBitmapImageRep *)bitmapImageRepForCachingDisplayInRect:(NSRect)rect
    {
        // TODO: Need to implement
    }

    - (void)cacheDisplayInRect:(NSRect)rect toBitmapImageRep:(NSBitmapImageRep *)bitmapImageRep
    {
        // TODO: Need to implement
    }

    @end

    NSString *NSWindowDidBecomeKeyNotification = @"NSWindowDidBecomeKeyNotification";
    NSString *NSWindowDidBecomeMainNotification = @"NSWindowDidBecomeMainNotification";
    NSString *NSWindowDidChangeScreenNotification = @"NSWindowDidChangeScreenNotification";
    NSString *NSWindowDidDeminiaturizeNotification = @"NSWindowDidDeminiaturizeNotification";
    NSString *NSWindowDidExposeNotification = @"NSWindowDidExposeNotification";
    NSString *NSWindowDidMiniaturizeNotification = @"NSWindowDidMiniaturizeNotification";
    NSString *NSWindowDidMoveNotification = @"NSWindowDidMoveNotification";
    NSString *NSWindowDidResignKeyNotification = @"NSWindowDidResignKeyNotification";
    NSString *NSWindowDidResignMainNotification = @"NSWindowDidResignMainNotification";
    NSString *NSWindowDidResizeNotification = @"NSWindowDidResizeNotification";
    NSString *NSWindowDidUpdateNotification = @"NSWindowDidUpdateNotification";
    NSString *NSWindowWillCloseNotification = @"NSWindowWillCloseNotification";
    NSString *NSWindowWillMiniaturizeNotification = @"NSWindowWillMiniaturizeNotification";
    NSString *NSWindowWillMoveNotification = @"NSWindowWillMoveNotification";
    NSString *NSWindowWillBeginSheetNotification = @"NSWindowWillBeginSheetNotification";
    NSString *NSWindowDidEndSheetNotification = @"NSWindowDidEndSheetNotification";
    NSString *NSWindowDidChangeScreenProfileNotification = @"NSWindowDidChangeScreenProfileNotification";

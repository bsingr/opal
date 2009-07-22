/* 
 * view.js
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
 
 
//  Frame sizing
var NSViewNotSizable    = VN.VIEW_NOT_SIZABLE       = 0;
var NSViewMinXMargin    = VN.VIEW_MIN_X_MARGIN      = 1;
var NSViewWidthSizable  = VN.VIEW_WIDTH_SIZABLE     = 2;
var NSViewMaxXMargin    = VN.VIEW_MAX_X_MARGIN      = 4;
var NSViewMinYMargin    = VN.VIEW_MIN_Y_MARGIN      = 8;
var NSViewHeightSizable = VN.VIEW_HEIGHT_SIZABLE    = 16;
var NSViewMaxYMargin    = VN.VIEW_MAX_Y_MARGIN      = 32;

// NSBorderType
var NSNoBorder          = VN.NO_BORDER              = 0;
var NSLineBorder        = VN.LINE_BORDER            = 1;
var NSBezelBorder       = VN.BEZEL_BORDER           = 2;
var NSGrooveBorder      = VN.GROOVE_BORDER          = 3;

// Frame Notifications
var NSViewFrameDidChangeNotification            = VN.VIEW_FRAME_DID_CHANGE_NOTIFICATION           = "NSViewFrameDidChangeNotification";
var NSViewFocusDidChangeNotification            = VN.VIEW_FOCUS_DID_CHANGE_NOTIFICATION           = "NSViewFocusDidChangeNotification";
var NSViewBoundsDidChangeNotification           = VN.VIEW_BOUNDS_DID_CHANGE_NOTIFICATION          = "NSViewBoundsDidChangeNotification";
var NSViewGlobalFrameDidChangeNotification      = VN.VIEW_GLOBAL_FRAME_DID_CHANGE_NOTIFICATION    = "NSViewGlobalFrameDidChangeNotification";
var NSViewDidUpdateTrackingAreasNotification    = VN.VIEW_DID_UPDATE_TRACKING_AREAS_NOTIFICATION  = "NSViewDidUpdateTrackingAreasNotification";

/**
    @class VN.View
    @extend VN.Responder
*/
var NSView = VN.View = VN.Responder.extend({
    
    _frame: null,
    _bounds: null,
    _window: null,
    _gState: null,
    
    _menu: null,
    _superview: null,
    _subviews: null,
    
    _nextKeyView: null,
    _previousKeyView: null,
    
    _isHidden: null,
    _postsNotificationOnFrameChange: null,
    _postsNotificationOnBoundsChange: null,
    _autoresizesSubviews: null,
    _inLiveResize: null,
    _autoresizingMask: null,
    
    _tag: null,
    _draggedTypes: null,
    _defaultToolTipTag: null,
    _toolTip: null,
    
    _invalidRect: null,
    
    _validTransforms: null,
    _transformFromWindow: null,
    _transformToWindow: null,
    _visibleRect: null,
    
    _DOMContainer: null,
    _DOMGraphicsContext : null,
    
    _graphicsContext: null,
    
    /**
        @type VN.RenderContext
    */
    renderContext: null,
    
    /**
        @type Element
    */
    renderElement: null,
    
    /**
        @type VN.String
    */
    renderTagName: 'div',
    
    /**
        @type VN.String
    */
    renderClassName: 'vn-view',
    
    /**
        Sets up the render context so that it is ready to be rendered. This
        will be called before the elements can be rendered.
    */  
    setupRenderContext: function() {
        this.renderElement = document.createElement(this.renderTagName);
        this.renderElement.className = this.renderClassName;
        this.renderElement.id = 'guid_' + this.guid();
        this.renderContext = VN.RenderContext.renderContextWithElement(this.renderElement);
    },
        
    setupGraphicsContextDisplay: function() {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('div');
        
        
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        this._DOMContainer.style.overflowX = "hidden";
        this._DOMContainer.style.overflowY = "hidden";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        this._DOMGraphicsContext.style.overflowX = "hidden";
        this._DOMGraphicsContext.style.overflowY = "hidden";
        
        this._renderContext = NSRenderContext.renderContextWithElement(this._DOMGraphicsContext);
    },
    
    /**
        The containing DOM element for the view (usually a div)
    */
    DOMContainer: function() {
        return this._DOMContainer;
    },
    
    init: function() {
        this.setupGraphicsContextDisplay();     
        this._frame = NSMakeRect (0, 0, 0, 0);
        
        return this;
    },
    
    /**
        Initialize with the given frame
    */
    initWithFrame: function(frameRect) {
        
        // this.init();
        
        this._frame = NSMakeRect (0, 0, 0, 0);
        // this.setupGraphicsContextDisplay();
        this.setupRenderContext();
        this._subviews = [];
        
        this.setFrame(frameRect);
        return this;
    },
    
    /**
        Initialize with the given coder
    */
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        // this.setupGraphicsContextDisplay();
        this.setupRenderContext();
        
        this._frame = NSMakeRect(0, 0, 0, 0);
        this._bounds = NSMakeRect(0, 0, 0, 0);
        
        if (aCoder.containsValueForKey("NSFrame"))
            this._frame = aCoder.decodeRectForKey("NSFrame");
        else if (aCoder.containsValueForKey("NSFrameSize"))
            this._frame.size = aCoder.decodeSizeForKey("NSFrameSize");
        
        this.setFrame(this._frame);
        
        var subviews = aCoder.decodeObjectForKey("NSSubviews");
        this._superview = aCoder.decodeObjectForKey("NSSuperview");
        this._window = null;
        this._subviews = [];
        
        if (subviews) {
            for (var idx = 0; idx < subviews.length; idx++) {
                this.addSubview(subviews[idx]);
            }
        }
        
        this._bounds.origin = NSMakePoint(0, 0);
        this._bounds.size = this._frame.size;
        
        var vFlags = aCoder.decodeIntForKey("NSvFlags");
        this._autoResizesSubviews = true;
        this._autoResizeMask = vFlags & 0x3F;
        
        return this;
    },
    
    // awakeAfterUsingCoder: function(aCoder) {
    //     this.setNeedsDisplay(true);
    //     return this;
    // },
    
    window: function() {
        return this._window;
    },
    
    superview: function() {
        return this._superview;
    },
    
    subviews: function() {
        return this._subviews;
    }, 
    
    isDescendantOf: function(aView) {
        
    },
    
    ancestorSharedWithView: function(aView) {
        
    },
    
    opaqueAncestor: function() {
        
    },
    
    setHidden: function(flag) {
        this._isHidden = flag;
        
        if (flag)
            this._DOMContainer.style.visibility = "hidden";
        else
            this._DOMContainer.style.visibility = "visible";
    },
    
    isHidden: function() {
        return this._isHidden;
    },
    
    isHiddenOrHasHiddenAncestor: function() {
        
    },
    
    needsToDrawRect: function(aRect) {
        
    },
    
    wantsDefaultClipping: function() {
        
    },
    
    viewDidHide: function() {
        
    },
    
    viewDidUnhide: function() {
        
    },
    
    setSubviews: function(newSubviews) {
        
    },
    
    addSubview: function(aView) {
        aView.viewWillMoveToSuperview(this);
        aView.viewWillMoveToWindow(this._window);
        this.renderElement.appendChild(aView.renderElement);
        aView.viewDidMoveToSuperview();
        aView.viewDidMoveToWindow();
        this.didAddSubview(aView);
        this._subviews.addObject(aView);
    },
    
    addSubviewPositionedRelativeTo: function(aView, place,otherView) {
        
    },
    
    sortSubviewsUsingFunction: function(compare, context) {
        
    },
    
    viewWillMoveToWindow: function(newWindow) {
        
        this._window = newWindow;
        
        for (var i = 0; i < this._subviews.length; i++) {
            this._subviews[i].viewWillMoveToWindow(newWindow);
        }
    },
    
    viewDidMoveToWindow: function() {
        
    },
    
    viewWillMoveToSuperview: function(newSuperview) {
        this._superview = newSuperview;
    },
    
    viewDidMoveToSuperview: function() {
        this.setNeedsDisplay(true);
    },
    
    didAddSubview: function(subview) {
        
    },
    
    willRemoveSubview: function(subview) {
        
    },
    
    removeFromSuperview: function() {
        
        var theParentElement;
        
        if (this._superview) {
            theParentElement = this._superview.renderElement;
            theParentElement.removeChild(this.renderElement);
        }
        else if (this._window) {
            theParentElement = this._window.DOMContainer();
            theParentElement.removeChild(this.renderElement);
        }
    },
    
    replaceSubview: function(oldView, newView) {
        
    },
    
    removeFromSuperviewWithoutNeedingDisplay: function() {
        
    },
    
    setPostsFrameChangedNotifications: function(flag) {
        
    },
    
    postsFrameChangedNotifications: function() {
        
    },
    
    resizeSubviewsWithOldSize: function(oldSize) {
        for (var idx = 0; idx < this._subviews.length; idx++)
            this._subviews[idx].resizeWithOldSuperviewSize(oldSize);
    },

    resizeWithOldSuperviewSize: function(oldSize) {
        var superFrame = this._superview.frame();
        var thisFrame = this.frame();
        var originChanged = false, sizeChanged = false;
        
        // x dimensions first
        if (this._autoResizeMask & NSViewMinXMargin) {
            if (this._autoResizeMask & NSViewWidthSizable) {
                if (this._autoResizeMask & NSViewMinXMargin) {
                    thisFrame.origin.x = thisFrame.origin.x + ((superFrame.size.width - oldSize.width) / 3);
                    thisFrame.size.width = thisFrame.size.width + ((superFrame.size.width - oldSize.width) / 3);
                }
                else {
                    thisFrame.origin.x = thisFrame.origin.x + ((superFrame.size.width - oldSize.width) / 3);
                    thisFrame.size.width = thisFrame.size.width + ((superFrame.size.width - oldSize.width) / 3);
                }
                sizeChanged = true;
                originChanged = true;
            }
            else if (this._autoResizeMask & NSViewMaxXMargin) {
                thisFrame.origin.x = thisFrame.origin.x + ((superFrame.size.width - oldSize.width) / 2);
                originChanged = true;
            }
            else {
                thisFrame.origin.x = thisFrame.origin.x + (superFrame.size.width - oldSize.width);
                originChanged = true;
            }
        }
        else if (this._autoResizeMask & NSViewWidthSizable) {
            if (this._autoResizeMask & NSViewMaxXMargin) {
                thisFrame.size.width = thisFrame.size.width + ((superFrame.size.width - oldSize.width) / 2);
            }
            else {
                thisFrame.size.width = thisFrame.size.width + (superFrame.size.width - oldSize.width);
            }
            
            sizeChanged = true;
        }
        
        // now do y dimensions
        if (this._autoResizeMask & NSViewMinYMargin) {
            if (this._autoResizeMask & NSViewHeightSizable) {
                if (this._autoResizeMask & NSViewMinYMargin) {
                    thisFrame.origin.y = thisFrame.origin.y + ((superFrame.size.height - oldSize.height) / 3);
                    thisFrame.size.height = thisFrame.size.height + ((superFrame.size.height - oldSize.height) / 3);
                }
                else {
                    thisFrame.origin.y = thisFrame.origin.y + ((superFrame.size.height - oldSize.height) / 3);
                    thisFrame.size.height = thisFrame.size.height + ((superFrame.size.height - oldSize.height) / 3);
                }
                sizeChanged = true;
                originChanged = true;
            }
            else if (this._autoResizeMask & NSViewMaxYMargin) {
                thisFrame.origin.y = thisFrame.origin.y + ((superFrame.size.height - oldSize.height) / 2);
                originChanged = true;
            }
            else {
                thisFrame.origin.y = thisFrame.origin.y + (superFrame.size.height - oldSize.height);
                originChanged = true;
            }
        }
        else if (this._autoResizeMask & NSViewHeightSizable) {
            if (this._autoResizeMask & NSViewMaxYMargin) {
                thisFrame.size.height = thisFrame.size.height + ((superFrame.size.height - oldSize.height) / 2);
            }
            else {
                thisFrame.size.height = thisFrame.size.height + (superFrame.size.height - oldSize.height);
            }
            
            sizeChanged = true;
        }
        
        if (sizeChanged || originChanged)
            this.setFrame(thisFrame);        
    },
    
    setAutoresizesSubviews: function(flag) {
        
    },
    
    autoresizesSubviews: function() {
        
    },
    
    setAutoresizingMask: function(mask) {
        
    },
    
    autoresizingMask: function() {
        
    },
    
    setFrameOrigin: function(newOrigin) {
        this._frame.origin = newOrigin;
        CGDOMElementSetFrame(this.renderElement, this._frame);
    },
    
    setFrameSize: function(newSize) {
        var oldBounds = this.bounds();
        
        this._frame.size = newSize;
        CGDOMElementSetFrame(this.renderElement, this._frame);
        // CGDOMElementSetFrame(this.renderElement, this.bounds());
        
        if (this._autoResizesSubviews)
            this.resizeSubviewsWithOldSize(oldBounds.size);
            
        this.setNeedsDisplay(true);
    },
    
    setFrame: function(frameRect) {
        var oldBounds = this.bounds();
        
        this._frame = frameRect;
        CGDOMElementSetFrame(this.renderElement, this._frame);
        // CGDOMElementSetFrame(this.renderElement, this.bounds());
        
        if (this._autoResizesSubviews)
            this.resizeSubviewsWithOldSize(oldBounds.size);
                
        this.setNeedsDisplay(true);
    },
    
    frame: function() {
        return this._frame;
    },
    
    setFrameRotation: function(angle) {
        
    },
    
    frameRotation: function() {
        
    },
    
    setFrameCenterRotation: function(angle) {
        
    },
    
    frameCenterRotation: function() {
        
    },
    
    setBoundsOrigin: function(newOrigin) {
        
    },
    
    setBoundsSize: function(newSize) {
        
    },
    
    setBoundsRotation: function(angle) {
        
    },
    
    boundsRotation: function() {
        
    },
    
    rotateByAnfle: function(angle) {
        
    },
    
    setBounds: function(aRect) {
        
    },
    
    bounds: function() {
        // if (this._bounds)
            // return this._bounds;
        
        return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
    },
    
    isFlipped: function() {
        
    },
    
    isRotatedFromBase: function() {
        
    },
    
    isRotatedOrScaledFromBase: function() {
        
    },
    
    isOpaque: function() {
        
    },
    
    convertPointFromView: function(aPoint, aView) {
        if (!aView)
            return this.convertPointFromBase(aPoint);
        
        return {
            x: aPoint.x - this._frame.origin.x,
            y: aPoint.y - this._frame.origin.y
        };
    },
    
    convertPointToView: function(aPoint, aView) {
        
    },
    
    convertSizeFromView: function(aSize, aView) {
        
    },
    
    convertSizeToView: function(aSize, aView) {
        
    },
    
    convertRectFromView: function(aRect, aView) {
        
    },
    
    /**
        @param {NSRect} aRect
        @param {NSView} aView
        @returns NSRect
    */
    convertRectToView: function(aRect, aView) {
        if (!aView)
            return this.convertRectFromBase(aRect);
        
        return {
            size: {
                width: aRect.size.width,
                height: aRect.size.height
            },
            origin: {
                x: aRect.origin.x - aView.frame().origin.x,
                y: aRect.origin.y - aView.frame().origin.y,
            }
        };
    },
    
    centerScanRect: function(aRect) {
        
    },
    
    convertPointToBase: function(aPoint) {
        
    },
    
    convertPointFromBase: function(aPoint) {
        if (this._superview) {
            return this._superview.convertPointFromBase({ 
                x: aPoint.x - this._frame.origin.x,
                y: aPoint.y - this._frame.origin.y
            });
        }
        // else if (this._window) {
        //     return {
        //         x: aPoint.x - this._window.frame().origin.x,
        //         y: aPoint.y - this._window.frame().origin.y
        //     };
        // }
        else {
            return aPoint;
        }
    },
    
    convertSizeToBase: function(aSize) {
        
    },
    
    convertSizeFromBase: function(aSize) {
        
    },
    
    convertRectToBase: function(aRect) {
        
    },
    
    convertRectFromBase: function(aRect) {
        
    },
    
    canDraw: function() {
        
    },
    
    setNeedsDisplay: function(flag) {
        
        if (flag)
            this.setNeedsDisplayInRect(this.bounds());
    },
    
    setNeedsDisplayInRect: function(invalidRect) {
        
        this.displayRect(invalidRect);
    },
    
    needsDisplay: function() {
        
    },
    
    lockFocus: function() {    
        return;
        
        if (!this._graphicsContext)
            this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
        
        
        NSGraphicsContext.setCurrentContext(this._graphicsContext);
        CGContextSaveGState(this._graphicsContext.graphicsPort());
        CGContextClearRect(this._graphicsContext.graphicsPort(), this.bounds());
    },
    
    unlockFocus: function() {
        return;
               
        CGContextRestoreGState(this._graphicsContext.graphicsPort());
        NSGraphicsContext.setCurrentContext(null);
    },
    
    lockFocusIfCanDraw: function() {
        
    },
    
    lockFocusIfCanDrawInContext: function(context) {
        
    },
    
    visibleRect: function() {
        
    },
    
    display: function() {
        
    },
    
    displayIfNeeded: function() {
        
    },
    
    displayIfNeededIgnoringOpacity: function() {
        
    },
    
    displayRect: function(rect) {
        
        this.viewWillDraw();
        this.displayRectIgnoringOpacityInContext(rect, null);
    },
    
    displayIfNeededInRect: function(rect) {
        
    },
    
    displayRectIgnoringOpacity: function(rect) {
        
    },
    
    displayIfNeededInRectIgnoringOpacity: function(rect) {
        
    },
    
    /**
        Draws the reciever in the given rect. This method is intended for rich
        web applications using HTML5's canvas feature, or VML for IE browsers
        that do not include canvas support. All drawing is carried out by the
        CoreGraphics library. This will not be called for applications using 
        render drawing, where drawing is carried out using DOM based routines.
    */
    drawRect: function(rect) {
        // Render using CoreGraphics.
    },
    
    /**
        Draws the receiver in the given rect. This method is intended for old
        browser routines using the DOM. No canvas/VML based drawing should be
        carried out in these routines. Drawing can use css etc as intended. 
        See wiki for examples and more information.
        
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    render: function(context, firstTime) {
        // Render using DOM.
    },
    
    displayRectIgnoringOpacityInContext: function(aRect, context) {
        this.lockFocus();
        // this.drawRect(aRect);
        var firstTime = this.renderContext.firstTime();
        this.renderContext.setFirstTime(false);
        this.render(this.renderContext, firstTime);
        
        this.unlockFocus();
    },
    
    bitmapImageRepForCachingDisplayInRect: function(rect) {
        
    },
    
    cacheDisplayInRectToBitmapImageRep: function(bitmapImageRep) {
        
    },
    
    viewWillDraw: function() {
        
    },
    
    graphicsContext: function() {
        return this._graphicsContext;
    },

    scrollPoint: function(aPoint) {
        
    },
    
    scrollRectToVisible: function(aRect) {
        
    },
    
    autoScroll: function(theEvent) {
        
    },
    
    adjustScroll: function(newVisible) {
        
    },
    
    scrollRectBy: function(aRect, delta) {
        
    },
    
    hitTest: function(aPoint) {
        aPoint = this.convertPointFromView(aPoint, this._superview);
        if (!NSPointInRect(aPoint, this.bounds())) {
            return null;
        }
        else {
            var count = this._subviews.count();

            for (var i = 0; i < count; i++) {
                var viewToCheck = this._subviews[i];
                var hitTest = viewToCheck.hitTest(aPoint);
                if (hitTest) return hitTest;
            }
            
            return this;
        }
    },
    
    mouseInRect: function(aPoint, aRect) {
        
    },
    
    viewWithTag: function(aTag) {
        
    },
    
    tag: function() {
        
    },
    
    performKeyEquivalent: function(theEvent) {
        
    },
    
    acceptsFirstMouse: function(theEvent) {
        
    },
    
    shouldDelayWindowOrderingForEvent: function(theEvent) {
        
    },
    
    needsPanelToBecomeKey: function() {
        
    },
    
    mouseDownCanMoveWindow: function() {
        
        return false;
    },
    
    addCursorRect: function(aRect, aCursor) {
        
    },
    
    removeCursorRect: function(aRect, aCursor) {
        
    },
    
    discardCursorRects: function() {
        
    },
    
    resetCursorRects: function() {
        
    },
    
    addTrackingRect: function(aRect, anObject, data, flag) {
        
    },
    
    removeTrackingRect: function(tag) {
        
    },
    
    setWantsLayer: function(flag) {
        
    },
    
    wantsLayer: function() {
        
    },
    
    setLayer: function(newLayer) {
        
    },
    
    layer: function() {
        
    },
    
    setAlphaValue: function(viewAlpha) {
        
    },
    
    alphaValue: function() {
        
    },
    
    setBackgroundFilters: function(filters) {
        
    },
    
    backgroundFilters: function() {
        
    },
    
    setCompositingFilter: function(filter) {
        
    },
    
    compositingFilter: function() {
        
    },
    
    setContentFilters: function(filters) {
        
    },
    
    contentFilters: function() {
        
    },
    
    setShadow: function(shadow) {
        
    },
    
    shadow: function() {
        
    },
    
    addTrackingArea: function(trackingArea) {
        
    },
    
    removeTrackingArea: function(trackingArea) {
        
    },
    
    trackingAreas: function() {
        
    },
    
    updateTrackingAreas: function() {
        
    },
    
    shouldDrawColor: function() {
        
    },
    
    setPostsBoundsChangedNotifications: function(flag) {
        
    },
    
    postsBoundsChangedNotifications: function() {
        
    },
    
    enclosingScrollView: function() {
        
    },
    
    menuForEvent: function(theEvent) {
        
    },
    
    setToolTip: function(string) {
        
    },
    
    toolTip: function() {
        
    },
    
    addToolTipRect: function(aRect, anObject, data) {
        
    },
    
    removeToolTip: function(tag) {
        
    },
    
    removeAllToolTips: function() {
        
    },
    
    viewWillStartLiveResize: function() {
        
    },
    
    viewDidEndLiveResize: function() {
        
    },
    
    inLiveResize: function() {
        
    },
    
    preservesContentDuringLiveResize: function() {
        
    },
    
    rectPreservedDuringLiveResize: function() {
        
    },
    
    getRectsExposedDuringLiveResize: function() {
        
    },
    
    performMnemonic: function(theString) {
        
    },
    
    selectNextKeyView: function(next) {
        
    },
    
    nextKeyView: function() {
        
    },
    
    previousKeyView: function() {
        
    },
    
    nextValidKeyView: function() {
        
    },
    
    previousValidKeyView: function() {
        
    },
    
    canBecomeKeyView: function() {
        
    },
    
    setKeyboardFocusRingNeedsDisplayInRect: function(rect) {
        
    },
    
    setFocusRingType: function(focusRingType) {
        
    },
    
    focusRingType: function() {
        
    },
    
    dragImage: function(anImage, viewLocation, initialOffset, theEvent, pboard, sourceObj, slideFlag) {
        
    },
    
    registeredDraggedTypes: function() {
        
    },
    
    registerForDraggedTypes: function(newTypes) {
        
    },
    
    unregisterDraggedTypes: function() {
        
    },
    
    dragFile: function(filename, fromRect, slideBack, theEvent) {
        
    }
});

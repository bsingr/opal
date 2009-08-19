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
 

VN.VIEW_AUTO_RESIZE = [
  'none', 'minX', 'width', 'maxX', 'minY', 'height', 'maxY'
];

VN.VIEW_BORDER_TYPES = [
  'none', 'line', 'bezel', 'groove'
];

VN.VIEW_NOTIFICATIONS = [
  'frameDidChange', 'focusDidChange', 'boundsDidChange', 'globalFrameDidChange',
  'didUpdateTrackingAreas'
];

/**
  @class VN.View
  @extend VN.Responder
*/
VN.View = VN.Responder.extend({
  
  default_options: { frame: [0, 0, 0, 0] },
  
	/**
		Default initializer
		
		@returns VN.View
	*/
	init: function(options) {
    this.setupGraphicsContextDisplay();   
    this.frame = NSMakeRect (0, 0, 0, 0);
    return this;
  },
  
  init_with_options: function(options) {
    return this.init_with_frame(options.remove('frame'));
  },
  
  /**
    Initialize with the given frame

		@param {VN.Rect} frameRect
		@returns VN.View
  */
  init_with_frame: function(frame) {
    this.frame = frame;
    this.bounds = [0, 0, frame[2], frame[3]];
    this.subviews = [];
    
    this.setup_render_context();
    this.set('frame', frame);

    return this;
  },
  
  /**
    Initialize with the given coder
    
    @param {VN.Coder} aCoder
    @returns VN.View
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this.setupRenderContext();
    
    this.frame = NSMakeRect(0, 0, 0, 0);
    this.bounds = NSMakeRect(0, 0, 0, 0);
    
    if (aCoder.containsValueForKey("NSFrame"))
      this.frame = aCoder.decodeRectForKey("NSFrame");
    else if (aCoder.containsValueForKey("NSFrameSize"))
      this.frame.size = aCoder.decodeSizeForKey("NSFrameSize");
    
    this.setFrame(this.frame);
    
    var theSubviews = aCoder.decodeObjectForKey("NSSubviews");
    this.superview = aCoder.decodeObjectForKey("NSSuperview");
    this.window = null;
    this.subviews = [];
    
    if (theSubviews) {
      for (var idx = 0; idx < theSubviews.length; idx++) {
        this.addSubview(theSubviews[idx]);
      }
    }
    
    // this.bounds.origin = NSMakePoint(0, 0);
    // this.bounds.size = this.frame.size;
    
    var vFlags = aCoder.decodeIntForKey("NSvFlags");
    this.autoResizesSubviews = true;
    this.autoResizeMask = vFlags & 0x3F;
    
    return this;
  },

	/*
		@type VN.Rect
	*/
	frame: null,
	
	/*
		@param {VN.Rect} frameRect
	*/
	set_frame: function(frame) {
    var old = this.bounds;    
    this.frame = frame;
    CGDOMElementSetFrame(this.render_element, this.frame);
    
    if (this.auto_resizes_subviews)
      this.resize_subviews_with_old_size(old.size);
    
    this.bounds.size = this.frame.size;
    this.set_needs_display(true);
  },
	
	/*
		@param {VN.Point} newOrigin
	*/
	setFrameOrigin: function(newOrigin) {
    this.frame.origin = newOrigin;
    CGDOMElementSetFrame(this.renderElement, this.frame);
  },
  
	/*
		@param {VN.Size} newSize
	*/
  setFrameSize: function(newSize) {
    var oldBounds = this.bounds;
    this.frame.size = newSize;
    CGDOMElementSetFrame(this.renderElement, this.frame);
    
    if (this._autoResizesSubviews)
      this.resizeSubviewsWithOldSize(oldBounds.size);
    
    this.bounds.size = this.frame.size;
    this.setNeedsDisplay(true);
  },
  
	/*
		@type VN.Rect
	*/
  bounds: null,

  _window: null,
  _gState: null,
  
  _menu: null,
  superview: null,
  subviews: null,
  
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
    Whether or not the view needs display.
    @type Boolean
  */
  needsDisplay: null,
  
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
   
  /*
  	Returns true if this view is in the hierarchy of aView

		@param {VN.View} aView
		@returns Boolean
  */
  isDescendantOf: function(aView) {
    return true;
  },
  
  ancestorSharedWithView: function(aView) {
    
  },
  
  opaqueAncestor: function() {
    
  },

	/*
		@type Boolean
	*/
	isHidden: null,
	
  /*
  	@param {Boolean} flag
  */
  setHidden: function(flag) {
    this.isHidden = flag;
    // just sets style parameter directly
		this.renderElement.style.visibility = flag ? 'hidden' : 'visible';
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
    this.subviews.addObject(aView);
  },
  
  addSubviewPositionedRelativeTo: function(aView, place,otherView) {
    
  },
  
  sortSubviewsUsingFunction: function(compare, context) {
    
  },
  
	/*
		@param {VN.Window} newWindow
	*/
  viewWillMoveToWindow: function(newWindow) {
    this.window = newWindow;
    
    for (var idx = 0; idx < this.subviews.length; idx++) {
      this.subviews[idx].viewWillMoveToWindow(newWindow);
    }
  },
  
  viewDidMoveToWindow: function() {
    
  },
  
  viewWillMoveToSuperview: function(newSuperview) {
    this.superview = newSuperview;
    this._nextResponder = newSuperview;
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
    
    if (this.superview) {
      theParentElement = this.superview.renderElement;
      theParentElement.removeChild(this.renderElement);
      this.superview.subviews.splice(this.superview.subviews.indexOf(this), 1);
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
    for (var idx = 0; idx < this.subviews.length; idx++)
      this.subviews[idx].resizeWithOldSuperviewSize(oldSize);
  },

  resizeWithOldSuperviewSize: function(oldSize) {
    var superFrame = this.superview.frame;
    var thisFrame = this.frame;
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
      x: aPoint.x - this.frame.origin.x,
      y: aPoint.y - this.frame.origin.y
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
    if (!aView) return this.convertRectFromBase(aRect);
    
    return {
			size: { width: aRect.size.width,
				  height: aRect.size.height },
      origin: { x: aRect.origin.x - aView.frame.origin.x,
        	  y: aRect.origin.y - aView.frame.origin.y }
    };
  },
  
  centerScanRect: function(aRect) {
    
  },
  
  convertPointToBase: function(aPoint) {
    
  },
  
  convertPointFromBase: function(aPoint) {
    if (this.superview) {
      return this.superview.convertPointFromBase({ 
        x: aPoint.x - this.frame.origin.x,
        y: aPoint.y - this.frame.origin.y
      });
    }
    // else if (this._window) {
    //   return {
    //     x: aPoint.x - this._window.frame().origin.x,
    //     y: aPoint.y - this._window.frame().origin.y
    //   };
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
    this.needsDisplay = flag;
    VN.Application.sharedApplication().markViewForDisplay(this, flag);
  },
  
  setNeedsDisplayInRect: function(invalidRect) {
    this.displayRect(invalidRect);
  },
  
  lockFocus: function() {  
    return;
    
    if (!this._graphicsContext)
      this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
    
    
    NSGraphicsContext.setCurrentContext(this._graphicsContext);
    CGContextSaveGState(this._graphicsContext.graphicsPort());
    CGContextClearRect(this._graphicsContext.graphicsPort(), this.bounds);
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
    console.log(this.bounds);
    aPoint = this.convertPointFromView(aPoint, this.superview);
    if (!NSPointInRect(aPoint, this.bounds)) {
      return null;
    }
    else {
      var count = this.subviews.count();

      for (var i = 0; i < count; i++) {
        var viewToCheck = this.subviews[i];
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

/**
  Create a view with the given frame, and then set each of the given properties
  on the newly created view.
  
  @param {VN.Rect} frameRect
  @param {Object} properties optional
  @returns {VN.View} new view
*/
VN.View.createWithFrame = function(frameRect, props) {
  var ret = this.create('initWithFrame', frameRect);
  if (props) {
    for (key in args[0])
      ret[key] = args[0][key];
  }
  return ret;
};

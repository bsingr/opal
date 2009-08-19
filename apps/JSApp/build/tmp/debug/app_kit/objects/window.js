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


/**
  Valid window styles for setting the appearance of VN.Windows.
*/
VN.WINDOW_STYLES = {
  borderless: 0, titled: 1 << 0, closable: 1 << 1, miniaturizable: 1 << 2,
  resizable: 1 << 3, textured: 1 << 8, unified: 1 << 12
};

/**
  Window levels array for the specified type of window. Setting a window to
  main/key might also append 5 to that window to ensure it lays above other
  windows of the same level
*/
VN.WINDOW_LEVELS = {
  normal: 10, floating: 10, submenu: 10, torn_off_menu: 10, main_menu: 70,
  status: 10, modal_panel: 10, pop_up_menu: 60
};

/**
  Notifications sent by the window for various events/
*/
VN.WINDOW_NOTIFICATIONS = [
  'didBecomeKey', 'didBecomeMain', 'didDeminiaturize', 'didExpose', 'didMiniaturize',
  'didMove', 'didResignKey', 'didResignMain', 'didResize', 'didUpdate', 'willClose',
  'willMiniaturize', 'willMove', 'willBeginSheet', 'didEndSheet'
];

/**
  @class VN.Window
  @extends VN.Responder
*/
VN.Window = VN.Responder.extend({
  
  /**
    VN.Window defaultOptions for initialisation
  */
  defaultOptions: { style: ['titled', 'closable', 'miniaturizable', 'resizable'],
                    show: true,
                    view: 'layout',
                    defaultLayout: { }
  },
  
  /**
    @param {Object} options
    @returns VN.Window
  */
  initWithOptions: function(options) {  
    if (!options.hasKey('frame')) {
      var size = options.remove('size') || [450, 400];
      var origin = options.remove('origin') || [200, 200];
      var x = origin[0], y = origin[1], width = size[0], height = size[1];
      options.store('frame', [x, y, width, height]);
    }
    
    this.initWithContentRect(options.remove('frame'), options.remove('style'));
    return this;
  },
  
  /**
    @type VN.Array holds the style array from the options available at the top
    of this document
  */
  style: null,
  
  /**
    @type Boolean
  */
  hasShadow: null,
  
  /**
    @type Integer
  */
  level: null,
  
  /**
    @type VN.Array
  */
  minSize: null,
  
  /**
    @type VN.Array
  */
  maxSize: null,
  
  /**
    @type VN.Responder
  */
  firstResponder: null,
  
  /**
    @type VN.Responder
  */
  nextResponder: null,
  
  /**
    @param {VN.Array} rect array of the form [x, y, width, height]
    @param {VN.Array} style array containing the relevant display properties
    @returns VN.Window
  */
  initWithContentRect: function(rect, style) {

    this.setupRenderContext();    
    this.windowNumber = VN.App.addWindow(this);
    this.style = style;

    this.hasShadow = (style.indexOf('borderless') > -1) ? false : true; 
    this.minSize = [0.0, 0.0];
    this.maxSize = [9999.0, 9999.0];
  
    this.firstResponder = this;
    this.nextResponder = VN.App;
    
    this.set('level', VN.WINDOW_LEVELS['normal']); 
    this.set('contentView', VN.View.create({ frame: [0, 0, 0, 0] }));
    this.set('frame', rect);
    this.setNeedsDisplay(true);
        
    return this;
  },
  
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
  renderClassName: 'vn-window',
  
  /**
    Sets up the rendering context and elements required for the window
  */
  setupRenderContext: function() {
    this.renderElement = document.createElement(this.renderTagName);
    this.renderElement.className = this.renderClassName;
    this.renderElement.id = 'guid_' + this.get('guid');
    this.renderContext = VN.RenderContext.renderContextWithElement(this.renderElement);
    document.body.appendChild(this.renderElement);
  },

  /**
    @param {VN.Array} frameRect
    @returns VN.Array
  */
  contentRectForFrameRect: function(frameRect) {
    var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
    if (this.valueForKey('shadow')) { }
    return [0 + xOffset, 0 + yOffset, frameRect[2], frameRect[3]];
  },
  
  /**
    @param {VN.Array} contentRect
    @returns VN.Array
  */
  frameRectForContentRect: function(contentRect) {
    var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
    if (this.valueForKey('shadow')) { }
    return [contentRect[0] + xOffset, contentRect[1] + yOffset, contentRect[2] + wOffset, contentRect[3] + hOffset];
  },
  
  /**
    @type VN.Array
    The Point that the event is referring to
  */
  eventBindingCurrent: null,
  
  /**
    @param {VN.Event} theEvent
  */
  mouseDown: function(theEvent) {
    if (this.get('zoomed')) return ;
  
    this.eventBindingCurrent = theEvent.locationInWindow();
    
    VN.App.bindEvents(['mouseup', 'mousemoved'], this, function(event) {
      if (event.type == 'mouseup') return VN.App.unbindEvents() ;
      
      var location = event.locationInWindow();
      if (!location) location = this.convertScreenToBase(event.locationInScreen());
      
      var newOrigin = [this.frame[0] + (location[0] - this.eventBindingCurrent[0]),
                      this.frame[1] + (location[1] - this.eventBindingCurrent[1])];
      
      this.set('frameOrigin', newOrigin);
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
  didChangeScreenParameters: function(notification) {
    if (this.valueForKey('isZoomed'))
      this.setValueForKey([0, 0, window.innerWidth, window.innerHeight], 'frame');
  },
  
  /**
    @type VN.String
  */
  title: null,
  
  /**
    @type VN.String
  */
  representedURL: null,
  
  /**
    @type VN.String
  */
  representedFilename: null,
  
  /**
    If the window should be considered for display in the windows menu
    @returns Boolean
  */
  isExcludedFromWindowsMenu: function() {
    return false;
  },
  
  /**
    @type VN.View
  */
  contentView: null,
  
  /**
    @param {VN.View} view
  */
  setContentView: function(view) {
    if (this.contentView)
      this.contentView.removeFromSuperview();
  
    this.contentView = view;
    
    view.viewWillMoveToSuperview(null);
    view.viewWillMoveToWindow(this);
    view.setFrame(this.contentRectForFrameRect(this.valueForKey('frame')));
    view.viewDidMoveToSuperview();
    view.viewDidMoveToWindow();
    view.setNextResponder(this);
    this.renderElement.appendChild(aView.renderElement);
  },
  
  /**
    Adds the given view(s) to the contentview for the window. If the passed
    object is an array, then each element in the array is added in turn
  */
  push: function(view) {
    this.contentView.push(view);
  },
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    @param {VN.Object} object
  */
  setDelegate: function(object) {
    this.delegate = object;
  },
  
  /**
    @type VN.Array
  */
  frame: null,
  
  /**
    @param {VN.Array} frame
  */
  setFrame: function(frame) {
    this.frame = frame;
    
    var actualFrameRect = this.frameRectForContentRect(this._frame);
    CGDOMElementSetFrame(this.renderElement, actualFrameRect);
    
    this.contentView.setValueForKey(this.contentRectForFrameRect(this._frame), 'frame');
    
    this.setNeedsDisplay(true);
  },
  
  /**
    @param {VN.Array} origin
  */
  setFrameOrigin: function(origin) {
    this.frame[0] = origin[0], this.frame[1] = origin[1];
    CGDOMElementSetFrame(this.renderElement, this.frameRectForContentRect(this.frame));
  },
  
  /**
    @type VN.Array
  */
  bounds: null,

  /**
    @type VN.Responder
  */
  firstResponder: null,
  
  /**
    @param {VN.Responder} responder
  */
  makeFirstResponder: function(responder) {
    if (this.firstResponder == responder) return true ;
    
    if (!this.firstResponder.resignFirstResponder()) return false ;

    if (!responder || !responder.acceptsFirstResponder() || !responder.becomeFirstResponder())
      return false;
      
    this.firstResponder = aResponder;
    return true;
  },
  
  /**
    @param {VN.Event} event
  */
  keyDown: function(event) {
    console.log('key down in window');
    console.log(this.firstResponder());
    
    if (!this.performKeyEquivalent(event))
      this.interpretKeyEvents([event]); // pass in an array?
  },
  
  /**
    Closes the window
  */
  close: function() {
    console.log('window needs to close');
    document.body.removeChild(this.renderElement);
  },
 
  /**
    @type Boolean
  */
  isZoomed: null,
  
  /**
    @param {VN.Object} sender
  */
  zoom: function(sender) {
    console.log('zoom window');
  },
  
  /**
    @param {VN.Object} sender
  */
  makeKeyAndOrderFront: function(sender) {
    this.makeKeyWindow();
    this.makeMainWindow();
    this.orderFront();
  },
  
  /**
    @param {VN.Object} sender
  */
  orderFront: function(sender) {
    
  },
  
  /**
    @param {VN.Object} sender
  */
  orderBack: function(sender) {
    
  },
  
  /**
    @param {VN.Object} sender
  */
  orderOut: function(sender) {
    
  },
 
  /**
    @type Boolean
  */
  isVisible: null,
  
  /**
    @param {Boolean} flag
  */
  setVisible: function(flag) {
    this.renderElement.style.visibility = flag ? 'visible' : 'hidden';
  },
  
  /**
    @type Boolean
  */
  keyWindow: null,
  
  /**
    @type Boolean
  */
  mainWindow: null,
  
  /**
    @returns Boolean
  */
  canBecomeKeyWindow: function() {
    return true;
  },
  
  /**
    @returns Boolean
  */
  canBecomeMainWindow: function() {
    return true;
  },
  
  /**
    Makes the receiver the key window
  */
  makeKeyWindow: function() {
    if (this.canBecomeKeyWindow())
      this.becomeKeyWindow();
  },
  
  /**
    Makes the receiver the main window
  */
  makeMainWindow: function() {
    if (this.canBecomeMainWindow())
      this.becomeMainWindow();
  },
  
  becomeKeyWindow: function() {
    if (VN.App.valueForKey('keyWindow'))
      VN.App.valueForKey('keyWindow').resignKeyWindow();
    
    this.keyWindow = true;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'] + 5, 'level');      
  },
  
  becomeMainWindow: function() {
    if (VN.App.valueForKey('mainWindow'))
      VN.App.valueForKey('mainWindow').resignKeyWindow();
    
    this.mainWindow = true;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'] + 5, 'level');
  },
  
  resignKeyWindow: function() {
    this.keyWindow = false;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'], 'level');
  },
  
  resignMainWindow: function() {
    this.mainWindow = false;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'], 'level');
  },
  
  worksWhenModal: function() {
    return false;
  },
  
  convertBaseToScreen: function(aPoint) {
    
  },
  
  /**
    @param {VN.Array} point
    @returns VN.Array
  */
  convertScreenToBase: function(point) {
    return [point[0] - this.frame[0], point[1] - this.frame[1]];
  },
  
  performClose: function(sender) {
    console.log('close window');
    // borrowed.. nice effect from webkit.
    var duration = 0.5;
    this.renderElement.style.webkitTransition = '-webkit-transform ' + duration + 's ease-in, opacity ' + duration + 's ease-in';
    this.renderElement.offsetTop;
    this.renderElement.style.webkitTransformOrigin = "0 0";
    this.renderElement.style.webkitTransform = 'skew(30deg, 0deg) scale(0)';
    this.renderElement.style.opacity = '0';
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
    this.renderElement.style.zIndex = newLevel;
    this.level = newLevel;
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
          if (hitTest != this._firstResponder && hitTest.acceptsFirstResponder()) {
            this.makeFirstResponder(hitTest);
          }
          
          hitTest.mouseDown(theEvent);
        }
        else {
          console.log('Sending mouse down to (else)');
        }
        break;
      case NSLeftMouseUp:
        // console.log('mouse up;');
        break;
      case NSKeyDown:
        if (this._firstResponder) {
          // console.log('sending keydown to firstresponder');
          // console.log(this._firstResponder);
          this._firstResponder.keyDown(theEvent);
        }
        else {
          console.log('No Key Responder');
        }
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
    //   var actualBounds = this.frameRectForContentRect(this._frame);
    //   actualBounds.origin.x = 0;
    //   actualBounds.origin.y = 0;
    //   this.setNeedsDisplayInRect(actualBounds);
    // }
    this.setNeedsDisplayInRect(this.bounds());
	},
	
	setNeedsDisplayInRect: function(invalidRect) {

		this.displayRect(invalidRect);
	},
	
	needsDisplay: function() {
		
	},
	
	lockFocus: function() {
	  return;
	  
	  NSApplication.sharedApplication().setFocusView(this);
	  
		if (!this._graphicsContext)
			this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
		
		NSGraphicsContext.setCurrentContext(this._graphicsContext);
		CGContextSaveGState(this._graphicsContext.graphicsPort());
		CGContextClearRect(this._graphicsContext.graphicsPort(), NSMakeRect(0, 0, this._DOMGraphicsContext.width, this._DOMGraphicsContext.height));
	},
	
	unlockFocus: function() {
	  return;
	  NSApplication.sharedApplication().setFocusView(null);
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
	
	/**
    Draws the receiver in the given rect. This method is intended for old
    browser routines using the DOM. No canvas/VML based drawing should be
    carried out in these routines. Drawing can use css etc as intended. 
    See wiki for examples and more information.
    
    @param {NSRect} aRect
    @param {Boolean} firstTime
    @param {NSRenderContext} context
  */
  renderRect: function(aRect, firstTime, context) {
    if (firstTime) {
      context.setClass('ns-window');
      context.addClass('shadow');
      context.addClass('rounded');
    }
  },
	
	displayRectIgnoringOpacityInContext: function(aRect, context) {
		this.lockFocus();
    // this.drawRect(aRect);
    this.renderRect(aRect, this._renderContext.firstTime(), this._renderContext);
		this.unlockFocus();
	},

  bitmapImageRepForCachingDisplayInRect: function(aRect) {
	
	},
	
	cacheDisplayInRectToBitmapImageRep: function(aRect, bitmapImageRep) {
		
	}
});

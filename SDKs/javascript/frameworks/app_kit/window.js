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

/**
  Valid window styles for setting the appearance of VN.Windows.
*/
VN.WINDOW_STYLES = {
  borderless: 0, titled: 1 << 0, closable: 1 << 1, miniaturizable: 1 << 2,
  resizable: 1 << 3, textured: 1 << 8, unified: 1 << 12
} ;

/**
  Window levels array for the specified type of window. Setting a window to
  main/key might also append 5 to that window to ensure it lays above other
  windows of the same level
*/
VN.WINDOW_LEVELS = {
  normal: 10, floating: 10, submenu: 10, torn_off_menu: 10, main_menu: 70,
  status: 10, modal_panel: 10, pop_up_menu: 60
} ;

/**
  Notifications sent by the window for various events/
*/
VN.WINDOW_NOTIFICATIONS = [
  'didBecomeKey', 'didBecomeMain', 'didDeminiaturize', 'didExpose', 'didMiniaturize',
  'didMove', 'didResignKey', 'didResignMain', 'didResize', 'didUpdate', 'willClose',
  'willMiniaturize', 'willMove', 'willBeginSheet', 'didEndSheet'
] ;

/**
  @class VN.Window
  @extends VN.Responder
*/
VN.Window = VN.Responder.extend({
  
  /**
    VN.Window defaultOptions for initialisation
  */
  defaultOptions: { style: ['titled', 'closable', 'miniaturizable', 'resizable'],
                    show: true, view: 'layout', defaultLayout: { } },
  
  /**
    @param {Object} options
    @returns VN.Window
  */
  init_with_options: function(options) {  
    if (!options.has_key('frame')) {
      var size = options.remove('size') || VN.Size(450, 400);
      var origin = options.remove('origin') || VN.Point(200, 200);
      options.store('frame', VN.Rect(origin.x, origin.y, size.width, size.height));
    }
    
    this.init_with_content_rect(options.remove('frame'), options.remove('style'));
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
  has_shadow: null,
  
  /**
    @type Integer
  */
  level: null,
  
  /**
    @type VN.Array
  */
  min_size: null,
  
  /**
    @type VN.Array
  */
  max_size: null,
  
  /**
    @type VN.Responder
  */
  first_responder: null,
  
  /**
    @param {VN.Array} rect array of the form [x, y, width, height]
    @param {VN.Array} style array containing the relevant display properties
    @returns VN.Window
  */
  init_with_content_rect: function(rect, style) {

    this.setup_render_context();    
    this.window_number = VN.App.add_window(this);
    this.style = style;

    this.has_shadow = style.contains('borderless') ? false : true;
    this.min_size = VN.Size(0.0, 0.0);
    this.max_size = VN.Size(9999.0, 9999.0);
  
    this.first_responder = this;
    this.nezt_responder = VN.App;
    
    this.set('level', VN.WINDOW_LEVELS['normal']); 
    this.set('content_view', VN.View.create({ frame: VN.Rect(0, 0, 0, 0) }));
    this.set('frame', rect);
    this.set_needs_display(true);
        
    return this;
  },
  
  /**
    Whether or not the view needs display.
    @type Boolean
  */
  needs_display: null,
  
  /**
    @type VN.RenderContext
  */
  render_context: null,
  
  /**
    @type Element
  */
  render_element: null,
  
  /**
    @type VN.String
  */
  tag_name: 'div',
  
  /**
    @type VN.String
  */
  class_name: 'vn-window',
  
  /**
    Sets up the rendering context and elements required for the window
  */
  setup_render_context: function() {
    this.render_element = document.createElement(this.tag_name);
    this.render_element.className = this.class_name;
    this.render_element.id = 'guid_' + this.get('guid');
    this.render_context = VN.RenderContext.context_with_element(this.render_element);
    document.body.appendChild(this.render_element);
  },

  /**
    @param {VN.Array} frameRect
    @returns VN.Array
  */
  content_rect_for_frame_rect: function(rect) {
    var offset = VN.Rect(0, 0, 0, 0);
    if (this.get('shadow')) { }
    return VN.Rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
  },
  
  /**
    @param {VN.Array} contentRect
    @returns VN.Array
  */
  frame_rect_for_content_rect: function(rect) {
    var offset = VN.Rect(0, 0, 0, 0);
    if (this.get('shadow')) { }
    return (rect.origin.x + offset.origin.x, rect.origin.y + offset.origin.y, 
            rect.size.width + offset.size.width, rect.size.height + offset.size.height);
  },
  
  /**
    @type VN.Array
    The Point that the event is referring to
  */
  event_binding_current: null,
  
  /**
    @param {VN.Event} theEvent
  */
  mouse_down: function(event) {
    if (this.get('zoomed')) return ; // skip if zoomed.
  
    this.event_binding_current = event.location_in_window;
    
    VN.App.bind_events(['mouseup', 'mousemoved'], this, function(event) {
      if (event.type == 'mouseup') return VN.App.unbind_events() ;
      
      var location = event.location_in_window;
      if (!location) location = this.convert_screen_to_base(event.location_in_screen);
      
      var new_origin = [this.frame.origin.x + (location.x - this.event_binding_current.x),
                        this.frame.origin.y + (location.y - this.event_binding_current.y)];
      
      this.set('frame_origin', new_origin);
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
  did_change_screen_parameters: function(notification) {
    if (this.get('zoomed')) {
      this.set('frame', VN.Rect(0, 0, window.innerWidth, window.innerHeight));
    }
  },
  
  /**
    @type VN.String
  */
  title: null,
  
  /**
    @type VN.String
  */
  represented_url: null,
  
  /**
    @type VN.String
  */
  represented_filename: null,
  
  /**
    If the window should be considered for display in the windows menu
    @returns Boolean
  */
  is_excluded_from_windows_menu: function() {
    return false;
  },
  
  /**
    @type VN.View
  */
  content_view: null,
  
  /**
    @param {VN.View} view
  */
  set_content_view: function(view) {
    if (this.content_view)
      this.content_view.remove_from_superview();
  
    this.content_view = view;
    
    view.view_will_move_to_superview(null);
    view.view_will_move_to_window(this);
    view.set('frame', this.content_rect_for_frame_rect(this.get('frame')));
    view.view_did_move_to_superview();
    view.view_did_move_to_window();
    view.set('next_responder', this);
    this.renderElement.appendChild(aView.render_element);
  },
  
  /**
    Adds the given view(s) to the contentview for the window. If the passed
    object is an array, then each element in the array is added in turn
  */
  push: function(view) {
    this.content_view.push(view);
  },
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    @param {VN.Object} object
  */
  set_delegate: function(object) {
    this.delegate = object;
  },
  
  /**
    @type VN.Array
  */
  frame: null,
  
  /**
    @param {VN.Array} frame
  */
  set_frame: function(frame) {
    this.frame = frame;
    
    var actual_frame = this.frame_rect_for_content_rect(this.frame);
    CGDOMElementSetFrame(this.render_element, actual_frame);
    
    this.content_view.set('frame', this.content_rect_for_frame_rect(this.frame));
    
    this.set_needs_display(true);
  },
  
  /**
    @param {VN.Array} origin
  */
  set_frame_origin: function(origin) {
    this.frame.origin = origin;
    CGDOMElementSetFrame(this.render_element, this.frame_rect_for_content_rect(this.frame));
  },
  
  /**
    @type VN.Array
  */
  bounds: null,
  
  /**
    @param {VN.Responder} responder
  */
  make_first_responder: function(responder) {
    if (this.first_responder == responder) return true ;
    
    if (!this.first_responder.resign_first_responder()) return false ;

    if (!responder || !responder.accepts_first_responder() || !responder.become_first_responder())
      return false ;
      
    this.first_responder = responder;
    return true ;
  },
  
  /**
    @param {VN.Event} event
  */
  key_down: function(event) {
    console.log('key down in window');
    console.log(this.first_responder));
    
    if (!this.perform_key_equivalent(event))
      this.interpret_key_events([event]); // pass in an array?
  },
  
  /**
    Closes the window
  */
  close: function() {
    console.log('window needs to close');
    document.body.removeChild(this.render_element);
  },
 
  /**
    @type Boolean
  */
  zoomed: null,
  
  /**
    @param {VN.Object} sender
  */
  zoom: function(sender) {
    console.log('zoom window');
  },
  
  /**
    @param {VN.Object} sender
  */
  make_key_and_order_front: function(sender) {
    this.make_key_window();
    this.make_main_window();
    this.order_front();
  },
  
  /**
    @param {VN.Object} sender
  */
  order_front: function(sender) {
    
  },
  
  /**
    @param {VN.Object} sender
  */
  order_back: function(sender) {
    
  },
  
  /**
    @param {VN.Object} sender
  */
  order_out: function(sender) {
    
  },
 
  /**
    @type Boolean
  */
  visible: null,
  
  /**
    @param {Boolean} flag
  */
  set_visible: function(flag) {
    this.render_element.style.visibility = flag ? 'visible' : 'hidden';
  },
  
  /**
    @type Boolean
  */
  key_window: null,
  
  /**
    @type Boolean
  */
  main_window: null,
  
  /**
    @returns Boolean
  */
  can_become_key_window: function() {
    return true;
  },
  
  /**
    @returns Boolean
  */
  can_become_main_window: function() {
    return true;
  },
  
  /**
    Makes the receiver the key window
  */
  make_key_window: function() {
    if (this.can_become_key_window())
      this.become_key_window();
  },
  
  /**
    Makes the receiver the main window
  */
  make_main_window: function() {
    if (this.can_become_main_window())
      this.become_main_window();
  },
  
  become_key_window: function() {
    if (VN.App.key_window())
      VN.App.key_window().resign_key_window();
    
    this.key_window = true;
    this.set('level', VN.WINDOW_LEVELS['normal'] + 5) ;
  },
  
  become_main_window: function() {    
    if (VN.App.main_window()) { VN.App.main_window().resign_main_window() } ;
    
    this.main_window = true;
    this.set('level', VN.WINDOW_LEVELS['normal'] + 5);
  },
  
  resign_key_window: function() {
    this.key_window = false;
    this.set('level', VN.WINDOW_LEVELS['normal']) ;
  },
  
  resign_main_window: function() {
    this.main_window = false;
    this.set('level', VN.WINDOW_LEVELS['normal']) ;
  },
  
  works_when_modal: function() {
    return false;
  },
  
  convert_base_to_screen: function(point) {
    
  },
  
  /**
    @param {VN.Array} point
    @returns VN.Array
  */
  convert_screen_to_base: function(point) {
    return VN.Point(point.x - this.frame.origin.x, 
                    point.y - this.frame.origin.y) ;
  },
  
  perform_close: function(sender) {
    console.log('close window');
    // borrowed.. nice effect from webkit.
    var duration = 0.5;
    this.render_element.style.webkitTransition = '-webkit-transform ' + duration + 's ease-in, opacity ' + duration + 's ease-in';
    this.render_element.offsetTop;
    this.render_element.style.webkitTransformOrigin = "0 0";
    this.render_element.style.webkitTransform = 'skew(30deg, 0deg) scale(0)';
    this.render_element.style.opacity = '0';
  },
  
  performminiaturize: function(sender) {
    
  },
  
  perform_zoom: function(sender) {
    this.zoomed = true;
    this.set('frame', VN.Rect(0, 0, window.innerWidth, window.innerHeight));
  },
  
  set_level: function(new_level) {
    this.render_element.style.zIndex = new_level;
    this.level = new_level;
  },
  
  /**
    Sends the event according to its type and app setup
    
    @param {VN.Event} event
  */
  send_event: function(event) {
    var hit_test, point = theEvent.location_in_window;
    switch (event.type) {
      case 'mousedown':

        hit_test = this.content_view.hit_test(point);
        if (hit_test) {
          if (hit_test != this.first_responder && hit_test.accepts_first_responder()) {
            this.make_first_responder(hit_test);
          }
          
          hit_test.mouse_down(event);
        }
        else {
          console.log('Sending mouse down to (else)');
        }
        break;
      case 'mouseup':
        break;
      case 'keydown':
        if (this.first_responder) {
          this.first_responder.key_down(event);
        }
        else {
          console.log('No Key Responder');
        }
        break;
    }
  },
  
  /**
    @type VN.WindowController
  */
  window_controller: null,
  
  /**
    @type VN.Responder
  */
  initial_first_responder: null,
  
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
	
	recalculateKeyViewLoop: function() {
		
	},
	
	/**
	  @type VN.Toolbar
	*/
	toolbar: null,
	
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

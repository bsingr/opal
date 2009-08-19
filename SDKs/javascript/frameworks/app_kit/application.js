/* 
 * application.js
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

include('foundation/foundation');
include('app_kit/responder');
include('app_kit/graphics_context');
include('app_kit/window');

/**
  Run loop mode when using a modal panel
*/
VN.MODAL_PANEL_RUN_LOOP_MODE = "VNModalPanelRunLoopMode";

/**
  Run loop mode for tracking. Use the trackEventsForKeyMask method of 
  VN.Application
*/
VN.EVENT_TRACKING_RUN_LOOP_MODE = "VNEventTrackingRunLoopMode";

// VN.Application notification constants
VN.APPLICATION_DID_BECOME_ACTIVE_NOTIFICATION = "VNApplicationDidBecomeActiveNotification";
VN.APPLICATION_DID_HIDE_NOTIFICATION = "VNApplicationDidHideNotification";
VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION = "VNApplicationDidFinishLaunchingNotification";
VN.APPLICATION_DID_RESIGN_ACTIVE_NOTIFICATION = "VNApplicationDidResignActiveNotification";
VN.APPLICATION_DID_UNHIDE_NOTIFICATION = "VNApplicationDidUnhideNotification";
VN.APPLICATION_DID_UPDATE_NOTIFICATION          = "VNApplicationDidUpdateNotification";
VN.APPLICATION_WILL_BECOME_ACTIVE_NOTIFICATION      = "VNApplicationWillBecomeActiveNotification";
VN.APPLICATION_WILL_HIDE_NOTIFICATION           = "VNApplicationWillHideNotification";
VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION     = "VNApplicationWillFinishLaunchingNotification";
VN.APPLICATION_WILL_RESIGN_ACTIVE_NOTIFICATION      = "VNApplicationWillResignActiveNotification";
VN.APPLICATION_WILL_UNHIDE_NOTIFICATION           = "VNApplicationWillUnhideNotification";
VN.APPLICATION_WILL_UPDATE_NOTIFICATION           = "VNApplicationWillUpdateNotification";
VN.APPLICATION_WILL_TERMINATE_NOTIFICATION        = "VNApplicationWillTerminateNotification";
VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION  = "VNApplicationDidChangeScreenParametersNotification";


/**
  @class VN.Application
  @extends VN.Responder
*/
VN.Application = VN.Responder.extend({
  
  /**
    @type VN.Array all windows
  */
  windows: null,
  
  /**
    @type VN.Array queue of events needing processing
  */
  event_queue: null,
  
  /**
    Designated initializer
  */
  init: function() {  
    this.windows = [];
    this.event_queue = [];
    this.views_needing_display = [];
    
    return this;
  },
  
  /**
    @type VN.Array
  */
  views_needing_display: null,
  
  /**
    Marks the view as needing display if flag is true
    
    @param {VN.View} view
    @param {Boolean} flag
  */
  mark_view_for_display: function(view, flag) {
    if (this.views_needing_display.indexOf(view) == -1)
      this.views_needing_display.push(view);
  },
  
  /**
    Every view requiring rendering will be drawn by calling this
    function. This is called after every event is recieved by the
    system. Non user intiiated events, such as mouse/key events will
    also trigger this redraw. These events include timers/json requests
    etc.
  */
  display_required_views: function() {
    var the_view;
    while (the_view = this.views_needing_display.pop()) {
      var first_time = the_view.render_context.first_time();
      the_view.render_context.set('first_time', false);
      the_view.render(the_view.render_context, first_time);
    };
  },
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    Sets the delegate for the singleton instance of NSApplication. This will
    also register the delegate for any NSApp related notifications that it
    responds to. Any that it does not implement, will not be registered.
    
    @param an_pbject The delegate object (usually setup in MainMenu.nib)
  */
  set_delegate: function(an_object) {
    if (this.delegate == an_object) return ;
    
    var nc = NSNotificationCenter.default_center();
    
    if (this.delegate) {
      nc.remove_observer(this.delegate, VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
      nc.remove_observer(this.delegate, VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
      nc.remove_observer(this.delegate, VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    }
    
    this.delegate = anObject;
    
    if (this.delegate.responds_to('will_finish_launching'))
      nc.add_observer(this.delegate, 'will_finish_launching', VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
    
    if (this.delegate.responds_to('did_finish_launching'))
      nc.add_observer(this.delegate, 'did_finish_launching', VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
      
    if (this.delegate.respondsTo('did_change_screen_parameters'))
      nc.add_observer(this.delegate, 'did_change_screen_parameters', VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
  },
   
  add_window: function(a_window) {
    // Register for screen chnages (if it wants them)
    var default_center = NSNotificationCenter.default_center();
    default_center.add_observer(a_window, 'did_change_screen_parameters', VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    
    this.windows.push(a_window);
    return this.windows.indexOf(a_window);
  },
  
  window_at_point: function(point) {
    for (var i = 0; i < this.windows.length; i++) {
      if(NSPointInRect(point, this.windows[i].frame())) {
        return this.windows[i];
      }
    }

    return null;
  },
  
  /**
    Gets the main window of the application by asking each window in turn
    if it is registered as the main window.
    
    @returns VN.Window
  */
  main_window: function() {
    for (var idx = 0; idx < this.windows.length; idx++) {
      if (this.windows[idx].is_main_window()) {
        return this.windows[idx];
      }
    }
    
    return null;
  },
  
  key_window: function() {
    for (var idx = 0; idx < this.windows.length; idx++) {
      if (this.windows[idx].is_key_window()) {
        return this.windows[idx];
      }
    }
    
    return null;
  },
  
  is_running: function() {
    
  },
  
  finish_launching: function() {
    var default_center = NSNotificationCenter.default_center();
    default_center.post_notification(VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
    default_center.post_notification(VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
    this.display_required_views();
  },
  
  /**
    Runs the application once all necessary parts are loaded. Event handlers
    are attatched here.
  */
  run: function(closure) {
    closure(this);
    document.onmousedown = VN.Event.create;
    document.onmouseup = VN.Event.create;
    document.onmousemove = VN.Event.create;
    document.onkeypress = VN.Event.create;
    // match special keys that will not be caugh by onkeypress. It is important
    // to stop the event here for those key events, but we must allow other keys
    // to pass (by not returning false)
    document.onkeydown = function(theEvent) {
      switch (theEvent.keyCode) {
        case NSUpArrowFunctionKey:
        case NSDownArrowFunctionKey:
        case NSLeftArrowFunctionKey:
        case NSRightArrowFunctionKey:
        case NSDeleteForwardFunctionKey:
        case NSDeleteBackwardFunctionKey:
        case NSReturnFunctionKey:
        case NSEscapeFunctionKey:
        case NSTabFunctionKey:
        case NSPageUpFunctionKey:
        case NSPageDownFunctionKey:
          VN.Event.create(theEvent);
          break;
      };
    };
    
    // On resize, post notification (for app delegate, also windows listen and handle accordingly)
    window.onresize = function() {
      var defaultCenter = NSNotificationCenter.default_center();
      default_center.post_notification(VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    };
    
    this.finish_launching();
  },
   
  post_event: function(event, at_start) {
    this.send_event(event);
  },
  
  current_event: null,
  
  send_event: function(event) {
    this.current_event = event;
    if (this.event_binding_queued) {   
      if (((1 << event.type()) & this.event_binding_mask) != 0) {
        this.event_binding_callback.apply(this.event_binding_context, [event]);
      }
      else {
        console.log('dropping event, as not matching bind mask');
      }
      return;
    }
    
    if (event.window())
      event.window().send_event(event);
    else // no window so drop event. dont drop if a key event?
      console.log('dropping event, as no window');
  },
  
  /**
    This will bind any event matching the mask, and pass the event onto the
    call back function specified. All other events that are not within this
    criteria will be dropped. 
    
    This is useful for tracking the mouse, e.g. in controls like a slider. 
    Requesting the mouse move and mouse up events will allow the control
    to acurately track the mouse as it moves a slider.
    
    It is cruicial that the unbindEvents method is called when the need
    for events is through (usually on the mouse up event).
    
    The callback will be of the form function(theEvent) { ... };
    
    The context will be the 'this' inside of the object. This is usually
    set to be the receiver, but can be any custom object. It is recomended
    to use the receiver, as this ensures that the function executes in the
    same context as it was created.
  */
  bindEventsMatchingMask: function(mask, context, withCallback) {
    this._eventBindingQueued = true;
    this._eventBindingCallback = withCallback;
    this._eventBindingMask = mask;
    this._eventBindingContext = context;
  },
  
  /**
    Unbinds the event request, so that normal event passing may resume. See
    bindEventsMatchingMask for more.
  */
  unbindEvents: function() {
    this._eventBindingQueued = false;
  },
  
  preventWindowOrdering: function() {
    
  },
  
  makeWindowsPerform: function(aSelector, inOrder) {
    
  },
  
  windows: function() {
    return this.windows;
  },
  
  setWindowsNeedUpdate: function(needUpdate) {
    
  },
  
  updateWindows: function() {
    
  },
  
  /**
    @param {NSMenu} aMenu
  */
  setMainMenu: function(aMenu) {
    this._mainMenu = aMenu;
    
    if (!this._menuBar) {
      this._menuBar = NSMainMenu.create('initWithMainMenu', this._mainMenu);
    }
    
    this._menuBar.setMainMenu(this._mainMenu);
  },
  
  mainMenu: function() {
    return this._mainMenu;
  },
  
  setApplicationIconImage: function(image) {
    
  },
  
  applicationIconImage: function() {
    
  },
  
  sendAction: function(theAction, theTarget, sender) {
    if (theAction && theTarget)
      theTarget[theAction](sender);
  },
  
  targetForAction: function(theAction, theTarget, theSender) {
    
  },

  tryToPerform: function (anAction, anObject) {
    
  }
});

/**
  Returns the singleton instance of the NSApplication object that exists
  for the application. This creates NSApp if it does not already exist.
    
  It is pretty safe to just reference NSApp itself in code, as it will 
  already have been created before any user code is likely to run, 
  assuming that no user code exists in the global scope.
*/
VN.Application.sharedApplication = function() {
  if (!VN.App) {
    VN.App = VN.Application.create();
  }
  
  return VN.App;
};



/**
  @protocol VN.ApplicationDelegate
*/
VN.ApplicationDelegate = VN.protocol({
  
  /**
    @optional
    
    @param {NSApplication} sender
    @returns NSApplicationTerminateReply
  */
  shouldTerminate: function(sender) {
  },
  
  /**
    @optional
    
    @param {NSApplication} sender
    @param {NSString} filename
    @returns Boolean
  */
  openFile: function(sender, filename) {
  },
  
  /**
    @optional
    
    @param {NSApplication} sender
    @returns Boolean
  */
  shouldOpenUntitledFile: function(sender) {
  },
  
  /**
    @optional
    
    @param {NSApplication} application
    @param {NSError} error
    @returns NSError
  */
  willPresentError: function(application, error) {
  },
  
  /**
    @optional
    
    @notification NSApplicationWillFinishLaunchingNotification
    @param {NSNotification} notification
  */
  
  willFinishLaunching: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didFinishLaunching: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willHide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didHide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  wullUnhide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didUnhide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willBecomeActive: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didBecomeActive: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willResignActive: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willUpdate: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willTerminate: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didChangeScreenParameters: function(notification) {
  }
});

/**
  @type VN.Application the global VN.Application singleton
*/
VN.App = VN.Application.create();

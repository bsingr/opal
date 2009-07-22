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


/**
    @type VN.Application the global VN.Application singleton
*/
VN.App = null;

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
VN.APPLICATION_DID_UPDATE_NOTIFICATION                    = "VNApplicationDidUpdateNotification";
VN.APPLICATION_WILL_BECOME_ACTIVE_NOTIFICATION            = "VNApplicationWillBecomeActiveNotification";
VN.APPLICATION_WILL_HIDE_NOTIFICATION                     = "VNApplicationWillHideNotification";
VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION         = "VNApplicationWillFinishLaunchingNotification";
VN.APPLICATION_WILL_RESIGN_ACTIVE_NOTIFICATION            = "VNApplicationWillResignActiveNotification";
VN.APPLICATION_WILL_UNHIDE_NOTIFICATION                   = "VNApplicationWillUnhideNotification";
VN.APPLICATION_WILL_UPDATE_NOTIFICATION                   = "VNApplicationWillUpdateNotification";
VN.APPLICATION_WILL_TERMINATE_NOTIFICATION                = "VNApplicationWillTerminateNotification";
VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION  = "VNApplicationDidChangeScreenParametersNotification";

/**
    @class VN.Application
    @extends VN.Responder
*/
var NSApplication = VN.Application = VN.Responder.extend({
    
    _delegate: null,
    
    _windows: null,
    
    _currentEvent: null,
    
    _eventQueue: null,
    
    _eventBindingQueued: false,
    
    _eventBindingTarget: null,
    
    _eventBindingBlock: null,
    
    _eventBindingMask: null,
    
    _menuBar: null,
    
    _mainMenu: null,
    
    _focusView: null,
    
    init: function() {
        // this._super();
        
        this._windows = [];
        this._eventQueue = [];
        
        return this;
    },
    
    /**
        Sets the delegate for the singleton instance of NSApplication. This will
        also register the delegate for any NSApp related notifications that it
        responds to. Any that it does not implement, will not be registered.
        
        @param anObject The delegate object (usually setup in MainMenu.nib)
    */
    setDelegate: function(anObject) {
        if (this._delegate == anObject)
            return;
        
        var nc = NSNotificationCenter.defaultCenter();
        
        if (this._delegate) {
            nc.removeObserver(this._delegate, VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
            nc.removeObserver(this._delegate, VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
            nc.removeObserver(this._delegate, VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
        }
        
        this._delegate = anObject;
        
        if (this._delegate.respondsTo('applicationWillFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationWillFinishLaunching', VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
        
        if (this._delegate.respondsTo('applicationDidFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationDidFinishLaunching', VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
            
        if (this._delegate.respondsTo('applicationDidChangeScreenParameters'))
            nc.addObserver(this._delegate, 'applicationDidChangeScreenParameters', VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    context: function() {
        
    },
    
    windowWithWindowNumber: function(windowNum) {
        
    },
    
    addWindow: function(aWindow) {
        // Register for screen chnages (if it wants them)
        var defaultCenter = NSNotificationCenter.defaultCenter();
        defaultCenter.addObserver(aWindow, 'applicationDidChangeScreenParameters', VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
        
        this._windows.push(aWindow);
        return this._windows.indexOf(aWindow);
    },
    
    windowAtPoint: function(point) {
        for (var i = 0; i < this._windows.length; i++) {
            if(NSPointInRect(point, this._windows[i].frame())) {
                return this._windows[i];
            }
        }

        return null;
    },
    
    setFocusView: function(aView) {
        this._focusView = aView;
    },
    
    focusView: function() {
        return this._focusView;
    },
    
    /**
        Gets the main window of the application by asking each window in turn
        if it is registered as the main window.
        
        @returns VN.Window
    */
    mainWindow: function() {
        for (var idx = 0; idx < this._windows.length; idx++) {
            if (this._windows[idx].isMainWindow()) {
                return this._windows[idx];
            }
        }
        
        return null;
    },
    
    keyWindow: function() {
        for (var idx = 0; idx < this._windows.length; idx++) {
            if (this._windows[idx].isKeyWindow()) {
                return this._windows[idx];
            }
        }
        
        return null;
    },
    
    isRunning: function() {
        
    },
    
    finishLaunching: function() {
        var defaultCenter = NSNotificationCenter.defaultCenter();
        defaultCenter.postNotificationName(VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
        defaultCenter.postNotificationName(VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
    },
    
    /**
        Runs the application once all necessary parts are loaded. Event handlers
        are attatched here.
    */
    run: function() {
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
                    return false;
                    break;
                default:
            };
        };
        
        // On resize, post notification (for app delegate, also windows listen and handle accordingly)
        window.onresize = function() {
            var defaultCenter = NSNotificationCenter.defaultCenter();
            defaultCenter.postNotificationName(VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
        };
        
        this.finishLaunching();
    },
   
    postEvent: function(theEvent, atStart) {
        
    },
    
    currentEvent: function() {
        return this._currentEvent;
    },
    
    sendEvent: function(theEvent) {
        this._currentEvent = theEvent;
        if (this._eventBindingQueued) {   
            if (((1 << theEvent.type()) & this._eventBindingMask) != 0) {
                this._eventBindingCallback.apply(this._eventBindingContext, [theEvent]);
            }
            else {
                console.log('dropping event, as not matching bind mask');
            }
            return;
        }
        
        if (theEvent.window())
            theEvent.window().sendEvent(theEvent);
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
        return this._windows;
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
    applicationShouldTerminate: function(sender) {
    },
    
    /**
        @optional
        
        @param {NSApplication} sender
        @param {NSString} filename
        @returns Boolean
    */
    applicationOpenFile: function(sender, filename) {
    },
    
    /**
        @optional
        
        @param {NSApplication} sender
        @returns Boolean
    */
    applicationShouldOpenUntitledFile: function(sender) {
    },
    
    /**
        @optional
        
        @param {NSApplication} application
        @param {NSError} error
        @returns NSError
    */
    applicationWillPresentError: function(application, error) {
    },
    
    /**
        @optional
        
        @notification NSApplicationWillFinishLaunchingNotification
        @param {NSNotification} notification
    */
    
    applicationWillFinishLaunching: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationDidFinishLaunching: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationWillHide: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationDidHide: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationWillUnhide: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationDidUnhide: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationWillBecomeActive: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationDidBecomeActive: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationWillResignActive: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationWillUpdate: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationWillTerminate: function(notification) {
    },
    
    /**
        @optional
        
        @notification applicationDidFinishLaunching
        @param {NSNotification} notification
    */
    
    applicationDidChangeScreenParameters: function(notification) {
    }
});

/**
    This function is called to initialize the application once all resources 
    have been loaded. It is called by default from within an app's main()
    function, and should not be called otherwise. Calling this more than 
    once will likely have undefined results, with, at minimum, a duplicate
    interface defined in the main nib file.
*/
VN.ApplicationMain = function(argc, argv) {
	var mainBundle = NSBundle.mainBundle();
	var principalClass = mainBundle.principalClass();
    var topLevel = NSBundle.loadNibNamed("MainMenu", principalClass.sharedApplication());
    
    for (var idx = 0; idx < topLevel.length; idx++) {
        if (topLevel[idx] && topLevel[idx]._title == "Main Menu") {
            principalClass.sharedApplication().setMainMenu(topLevel[idx]);
        }
    }
    
	principalClass.sharedApplication().run();
	return 0;
};

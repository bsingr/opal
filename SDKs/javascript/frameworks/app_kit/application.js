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

var NSApp = null;

var NSModalPanelRunLoopMode                             = "NSModalPanelRunLoopMode";
var NSEventTrackingRunLoopMode                          = "NSEventTrackingRunLoopMode";

var NSApplicationDidBecomeActiveNotification            = "NSApplicationDidBecomeActiveNotification";
var NSApplicationDidHideNotification                    = "NSApplicationDidHideNotification";
var NSApplicationDidFinishLaunchingNotification         = "NSApplicationDidFinishLaunchingNotification";
var NSApplicationDidResignActiveNotification            = "NSApplicationDidResignActiveNotification";
var NSApplicationDidUnhideNotification                  = "NSApplicationDidUnhideNotification";
var NSApplicationDidUpdateNotification                  = "NSApplicationDidUpdateNotification";
var NSApplicationWillBecomeActiveNotification           = "NSApplicationWillBecomeActiveNotification";
var NSApplicationWillHideNotification                   = "NSApplicationWillHideNotification";
var NSApplicationWillFinishLaunchingNotification        = "NSApplicationWillFinishLaunchingNotification";
var NSApplicationWillResignActiveNotification           = "NSApplicationWillResignActiveNotification";
var NSApplicationWillUnhideNotification                 = "NSApplicationWillUnhideNotification";
var NSApplicationWillUpdateNotification                 = "NSApplicationWillUpdateNotification";
var NSApplicationWillTerminateNotification              = "NSApplicationWillTerminateNotification";
var NSApplicationDidChangeScreenParametersNotification  = "NSApplicationDidChangeScreenParametersNotification";


var NSApplication = NSResponder.extend({
    
    _delegate: null,
    
    _windows: [],
    
    _currentEvent: null,
    
    _eventQueue: [],
    
    _eventBindingQueued: false,
    
    _eventBindingTarget: null,
    
    _eventBindingBlock: null,
    
    _eventBindingMask: null,
    
    _menuBar: null,
    
    _mainMenu: null,
    
    _focusView: null,
    
    init: function() {
        // this._super();
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
            nc.removeObserver(this._delegate, NSApplicationWillFinishLaunchingNotification, this);
            nc.removeObserver(this._delegate, NSApplicationDidFinishLaunchingNotification, this);
            nc.removeObserver(this._delegate, NSApplicationDidChangeScreenParametersNotification, this);
        }
        
        this._delegate = anObject;
        
        if (this._delegate.respondsTo('applicationWillFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationWillFinishLaunching', NSApplicationWillFinishLaunchingNotification, this);
        
        if (this._delegate.respondsTo('applicationDidFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationDidFinishLaunching', NSApplicationDidFinishLaunchingNotification, this);
            
        if (this._delegate.respondsTo('applicationDidChangeScreenParameters'))
            nc.addObserver(this._delegate, 'applicationDidChangeScreenParameters', NSApplicationDidChangeScreenParametersNotification, this);
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
        defaultCenter.addObserver(aWindow, 'applicationDidChangeScreenParameters', NSApplicationDidChangeScreenParametersNotification, this);
        
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
    
    mainWindow: function() {
        
    },
    
    keyWindow: function() {
        
    },
    
    isRunning: function() {
        
    },
    
    finishLaunching: function() {
        var defaultCenter = NSNotificationCenter.defaultCenter();
        defaultCenter.postNotificationName(NSApplicationWillFinishLaunchingNotification, this);
        defaultCenter.postNotificationName(NSApplicationDidFinishLaunchingNotification, this);
    },
    
    /**
        Runs the application once all necessary parts are loaded. Event handlers
        are attatched here.
    */
    run: function() {
        document.onmousedown = NSEventFromRawEvent;
        document.onmouseup = NSEventFromRawEvent;
        document.onmousemove = NSEventFromRawEvent;
        
        // On resize, post notification (for app delegate, also windows listen and handle accordingly)
        window.onresize = function() {
            var defaultCenter = NSNotificationCenter.defaultCenter();
            defaultCenter.postNotificationName(NSApplicationDidChangeScreenParametersNotification, this);
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

Object.extend(NSApplication, {

    /**
        Returns the singleton instance of the NSApplication object that exists
        for the application. This creates NSApp if it does not already exist.
        
        It is pretty safe to just reference NSApp itself in code, as it will 
        already have been created before any user code is likely to run, 
        assuming that no user code exists in the global scope.
    */
    sharedApplication: function() {
        if (!NSApp)
            NSApp = NSApplication.create();
	    
	    return NSApp;
    }
});

/**
    This function is called to initialize the application once all resources 
    have been loaded. It is called by default from within an app's main()
    function, and should not be called otherwise. Calling this more than 
    once will likely have undefined results, with, at minimum, a duplicate
    interface defined in the main nib file.
*/
function NSApplicationMain(argc, argv)
{
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
}

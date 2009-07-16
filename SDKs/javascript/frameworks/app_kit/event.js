/* 
 * event.js
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

// NSEventType
var NSLeftMouseDown             = 1;            
var NSLeftMouseUp               = 2;
var NSRightMouseDown            = 3;
var NSRightMouseUp              = 4;
var NSMouseMoved                = 5;
var NSLeftMouseDragged          = 6;
var NSRightMouseDragged         = 7;
var NSMouseEntered              = 8;
var NSMouseExited               = 9;
var NSKeyDown                   = 10;
var NSKeyUp                     = 11;
var NSFlagsChanged              = 12;
var NSAppKitDefined             = 13;
var NSSystemDefined             = 14;
var NSApplicationDefined        = 15;
var NSPeriodic                  = 16;
var NSCursorUpdate              = 17;
var NSScrollWheel               = 22;
var NSTabletPoint               = 23;
var NSTabletProximity           = 24;
var NSOtherMouseDown            = 25;
var NSOtherMouseUp              = 26;
var NSOtherMouseDragged         = 27;
var NSEventTypeGesture          = 29;
var NSEventTypeMagnify          = 30;
var NSEventTypeSwipe            = 31;
var NSEventTypeRotate           = 18;
var NSEventTypeBeginGesture     = 19;
var NSEventTypeEndGesture       = 20;

// NSEventMasks
var NSLeftMouseDownMask         = 1 << NSLeftMouseDown;
var NSLeftMouseUpMask           = 1 << NSLeftMouseUp;
var NSRightMouseDownMask        = 1 << NSRightMouseDown;
var NSRightMouseUpMask          = 1 << NSRightMouseUp;
var NSMouseMovedMask            = 1 << NSMouseMoved;
var NSLeftMouseDraggedMask      = 1 << NSLeftMouseDragged;
var NSRightMouseDraggedMask     = 1 << NSRightMouseDragged;
var NSMouseEnteredMask          = 1 << NSMouseEntered;
var NSMouseExitedMask           = 1 << NSMouseExited;
var NSKeyDownMask               = 1 << NSKeyDown;
var NSKeyUpMask                 = 1 << NSKeyUp;
var NSFlagsChangedMask          = 1 << NSFlagsChanged;
var NSAppKitDefinedMask         = 1 << NSAppKitDefined;
var NSSystemDefinedMask         = 1 << NSSystemDefined;
var NSApplicationDefinedMask    = 1 << NSApplicationDefined;
var NSPeriodicMask              = 1 << NSPeriodic;
var NSCursorUpdateMask          = 1 << NSCursorUpdate;
var NSScrollWheelMask           = 1 << NSScrollWheel;
var NSTabletPointMask           = 1 << NSTabletPoint;
var NSTabletProximityMask       = 1 << NSTabletProximity;
var NSOtherMouseDownMask        = 1 << NSOtherMouseDown;
var NSOtherMouseUpMask          = 1 << NSOtherMouseUp;
var NSOtherMouseDraggedMask     = 1 << NSOtherMouseDragged;
var NSEventMaskGesture          = 1 << NSEventTypeGesture;
var NSEventMaskMagnify          = 1 << NSEventTypeMagnify;
var NSEventMaskSwipe            = 1 << NSEventTypeSwipe;
var NSEventMaskRotate           = 1 << NSEventTypeRotate;
var NSEventMaskBeginGesture     = 1 << NSEventTypeBeginGesture;
var NSEventMaskEndGesture       = 1 << NSEventTypeEndGesture;

// NSevent modifier flags
var NSAlphaShiftKeyMask         = 1 << 16; // caps lock - not the same as shift
var NSShiftKeyMask              = 1 << 17;
var NSControlKeyMask            = 1 << 18;
var NSAlternateKeyMask          = 1 << 19;
var NSCommandKeyMask            = 1 << 20;
var NSNumericPadKeyMask         = 1 << 21;
var NSHelpKeyMask               = 1 << 22;
var NSFunctionKeyMask           = 1 << 23;

/**
    @class NSEvent
*/
var NSEvent = NSObject.extend({
    
    _type: null,
    _location: null,
    _locationInScreen: null,
    _modifierFlags: null,
    _timestamp: null,
    _windowNumber: null,
    _window: null,
    _context: null,
    
    _eventNumber: null,
    _clickCount: null,
    _pressure: null,
    
    _deltaX: null,
    _deltaY: null,
    
    _keys: null,
    _unmodKeys: null,
    _keyCode: null,
    _isARepeat: null,

// all events
    type: function() {
        return this._type;
    },
    
    modifierFlags: function() {
        return this._modifierFlags;
    },
    
    timestamp: function() {
        return this._timestamp;
    },
    
    window: function() {
        return this._window;
    },
    
    windowNumber: function() {
        return this._windowNumber;
    },
    
    content: function() {
        return this._context;
    },

// mouse down/up/drag events
    clickCount: function() {
        return this._clickCount;
    },
    
    buttonNumber: function() {
        return this._buttonNumber;
    },
    
    eventNumber: function() {
        return this._eventNumber;
    },
    
    locationInWindow: function() {
        return this._location;
    },
    
    locationInScreen: function() {
        return this._locationInScreen;
    },
    
// key up/down events
    characters: function() {
        return this._keys;
    },
    
    charactersIgnoringModifiers: function() {
        return this._unmodKeys;
    },
    
    isARepeat: function() {
        return this._isARepeat;
    },
    
    keyCode: function() {
        return this._keyCode;
    }
});

/**
    Main entrance point for  mouse events. This handles a raw JS event, and
    creates an NSEvent, and posts it off to NSApplication.
    
    @param {Event} event
*/
function NSEventFromMouseEvent(event)
{
    // event type
    var eventType;    
    switch (event.type) {
        case "mousedown":
            eventType = NSLeftMouseDown;
            break;
        case "mouseup":
            eventType = NSLeftMouseUp;
            break;
        case "mousemove":
            eventType = NSMouseMoved;
            break;
        default:
            console.log("unable to determine event type");
            return;
    }
    
    // modifier flags
    var modifierFlags = 1;
    if (event.metaKey)  modifierFlags = modifierFlags | NSCommandKeyMask;
    if (event.shiftKey) modifierFlags = modifierFlags | NSShiftKeyMask;
    if (event.altKey)   modifierFlags = modifierFlags | NSAlternateKeyMask;
    if (event.ctrlKey)  modifierFlags = modifierFlags | NSControlKeyMask;
    
    // event location
    var screenLocation = NSMakePoint(event.clientX, window.innerHeight - event.clientY);
    
    // timestamp
    var timestamp = new Date().getTime();
    
    // the window, windowNumber (might both be null....)
    var theWindow = NSApplication.sharedApplication().windowAtPoint(screenLocation);
    var windowLocation, windowNumber, theContext;
    if (theWindow) {
        windowLocation = theWindow.convertScreenToBase(screenLocation);
        windowNumber = theWindow.windowNumber();
        // theContext = theWindow.graphicsContext();
    }
    
    var theEvent = NSEvent.mouseEventWithType(eventType, windowLocation, modifierFlags, timestamp, windowNumber, theContext, 0, 1, 1);
    theEvent._window = theWindow;
    theEvent._locationInScreen = screenLocation;
    NSApplication.sharedApplication().sendEvent(theEvent);
    
    // to stop event bubbling
    return false;
}

/**
    Main entry point for key events.
    
    @param {Event} event
*/
function NSEventFromKeyEvent(event)
{
    // event type
    var eventType;    
    switch (event.type) {
        case "keypress":
        case "keydown":
            eventType = NSKeyDown;
            break;
        default:
            console.log("unable to determine event type");
            return;
    }
    
    // modifier flags
    var modifierFlags = 1;
    if (event.metaKey)  modifierFlags = modifierFlags | NSCommandKeyMask;
    if (event.shiftKey) modifierFlags = modifierFlags | NSShiftKeyMask;
    if (event.altKey)   modifierFlags = modifierFlags | NSAlternateKeyMask;
    if (event.ctrlKey)  modifierFlags = modifierFlags | NSControlKeyMask;
    
    // timestamp
    var timestamp = new Date().getTime();
    
    // characters
    var keyCode = event.charCode || event.keyCode;
    var theCharacters = String.fromCharCode(keyCode);
    
    // set the window to NSApp's keyWindow?
    var theWindow = NSApplication.sharedApplication().keyWindow();
    
    var theEvent = NSEvent.keyEventWithType(eventType, null, modifierFlags, timestamp, null, null, theCharacters, theCharacters, false, keyCode);
    theEvent._window = theWindow;
    NSApplication.sharedApplication().sendEvent(theEvent);
    
    // if a controller key is pressed, allow control back to the browser. other
    // wise block bubbling of event. In future, registered commands (involving
    // control, meta, alt) will not allow control back, others will
    if (!event.metaKey && !event.altKey && !event.ctrlKey)
        return false;
}

NSEvent.mouseEventWithType = function(type, location, modifierFlags, timestamp, windowNumber, context, eventNumber, clickCount, pressure)
{
    var theEvent = NSEvent.create();
    theEvent._type = type;
    theEvent._location = location;
    theEvent._modifierFlags = modifierFlags;
    theEvent._timestamp = timestamp;
    theEvent._windowNumber = windowNumber;
    theEvent._context = context;
    theEvent._eventNumber = eventNumber;
    theEvent._clickCount = clickCount;
    theEvent._pressure = pressure;
    return theEvent;
};

NSEvent.keyEventWithType = function(type, location, modifierFlags, timestamp, windowNumber, context, characters, charactersIgnoringModifiers, isARepeat, keyCode)
{
    var theEvent = NSEvent.create();
    theEvent._type = type;
    theEvent._location = location;
    theEvent._modifierFlags = modifierFlags;
    theEvent._timestamp = timestamp;
    theEvent._windowNumber = windowNumber;
    theEvent._context = context;
    theEvent._keys = characters;
    theEvent._unmodKeys = charactersIgnoringModifiers;
    theEvent._isARepeat = isARepeat;
    theEvent._keyCode = keyCode;
    return theEvent;
};

NSEvent.mouseLocation = function()
{
    
};

// reserved keycodes
var NSUpArrowFunctionKey        = 38;
var NSDownArrowFunctionKey      = 40;
var NSLeftArrowFunctionKey      = 37;
var NSRightArrowFunctionKey     = 39;
var NSDeleteForwardFunctionKey  = 46;
var NSDeleteBackwardFunctionKey = 8;
var NSReturnFunctionKey         = 13;
var NSEscapeFunctionKey         = 27;
var NSTabFunctionKey            = 9;
var NSPageUpFunctionKey         = 33;
var NSPageDownFunctionKey       = 34;

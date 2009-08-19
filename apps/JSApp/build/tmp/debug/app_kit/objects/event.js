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


// VN.EventType
var NSLeftMouseDown       = VN.LEFT_MOUSE_DOWN = 1;      
var NSLeftMouseUp         = VN.LEFT_MOUSE_UP = 2;
var NSRightMouseDown      = VN.RIGHT_MOUSE_DOWN = 3;
var NSRightMouseUp        = VN.RIGHT_MOUSE_UP = 4;
var NSMouseMoved        = VN.MOUSE_MOVED = 5;
var NSLeftMouseDragged      = VN.LEFT_MOUSE_DRAGGED = 6;
var NSRightMouseDragged     = VN.RIGHT_MOUSE_DRAGGED = 7;
var NSMouseEntered        = VN.MOUSE_ENTERED = 8;
var NSMouseExited         = VN.MOUSE_EXITED = 9;
var NSKeyDown           = VN.KEY_DOWN = 10;
var NSKeyUp           = VN.KEY_UP = 11;
var NSFlagsChanged        = VN.FLAGS_CHNAGED = 12;
var NSCursorUpdate        = VN.CURSOR_UPDATE = 17;
var NSScrollWheel         = VN.SCROLL_WHEEL = 22;

// VN.EventMasks
var NSLeftMouseDownMask     = 1 << NSLeftMouseDown;
var NSLeftMouseUpMask       = 1 << NSLeftMouseUp;
var NSRightMouseDownMask    = 1 << NSRightMouseDown;
var NSRightMouseUpMask      = 1 << NSRightMouseUp;
var NSMouseMovedMask      = 1 << NSMouseMoved;
var NSLeftMouseDraggedMask    = 1 << NSLeftMouseDragged;
var NSRightMouseDraggedMask   = 1 << NSRightMouseDragged;
var NSMouseEnteredMask      = 1 << NSMouseEntered;
var NSMouseExitedMask       = 1 << NSMouseExited;
var NSKeyDownMask         = 1 << NSKeyDown;
var NSKeyUpMask         = 1 << NSKeyUp;
var NSFlagsChangedMask      = 1 << NSFlagsChanged;
var NSCursorUpdateMask      = 1 << NSCursorUpdate;
var NSScrollWheelMask       = 1 << NSScrollWheel;

// NSevent modifier flags
var NSAlphaShiftKeyMask     = 1 << 16; // caps lock - not the same as shift
var NSShiftKeyMask        = 1 << 17;
var NSControlKeyMask      = 1 << 18;
var NSAlternateKeyMask      = 1 << 19;
var NSCommandKeyMask      = 1 << 20;
var NSNumericPadKeyMask     = 1 << 21;
var NSHelpKeyMask         = 1 << 22;
var NSFunctionKeyMask       = 1 << 23;

/**
  @class VN.Event
*/
VN.Event = function(theEvent) {
  
  this._event = theEvent;
  
  // eventType
  switch (theEvent.type) {
    case 'mousedown': this._type = VN.LEFT_MOUSE_DOWN; break;
    case 'mouseup': this._type = VN.LEFT_MOUSE_UP; break;
    case 'mousemove': this._type = VN.MOUSE_MOVED; break;
    case 'keypress': this._type = VN.KEY_DOWN; break;
    case 'keydown': this._type = VN.KEY_DOWN; break;
    default: console.log('unable to determine event type'); return;
  }
  
  // modifierFlags
  var modifierFlags = 1;
  if (theEvent.metaKey) { modifierFlags = modifierFlags | NSCommandKeyMask; theEvent._allowsBrowserControl = true; }
  if (theEvent.shiftKey) modifierFlags = modifierFlags | NSShiftKeyMask;
  if (theEvent.altKey) modifierFlags = modifierFlags | NSAlternateKeyMask;
  if (theEvent.ctrlKey) modifierFlags = modifierFlags | NSControlKeyMask;
  this._modifierFlags = modifierFlags;
  
  // screenLocation
  this._screenLocation = NSMakePoint(theEvent.clientX, window.innerHeight - theEvent.clientY);
  
  // timeStamp
  this._timeStamp = theEvent.timeStamp || new Date().getTime();
  
  // window etc
  this._window = VN.Application.sharedApplication().windowAtPoint(this._screenLocation);
  if (!this._window) this._window = VN.App.keyWindow();
  
  if (this._window) {
    this._windowLocation = this._window.convertScreenToBase(this._screenLocation);
    this._windowNumber = this._window.windowNumber();
  }
  
  // characters
  this._keyCode = theEvent.charCode || theEvent.keyCode;
  this._characters = String.fromCharCode(this._keyCode);
  
  return this;
};

VN.Event.create = function(event) {
  VN.Application.sharedApplication().sendEvent(new VN.Event(event));
  return event._allowBrowserControl ? true : false;
};

VN.Event.mixin = function(props) {
  VN.extend(this.prototype, props);
};

VN.Event.mixin({
  
  type: function() {
    return this._type;
  },
  
  locationInWindow: function() {
    return this._windowLocation;
  },
  
  window: function() {
    return this._window;
  },
  
  modifierFlags: function() {
    return this._modifierFlags;
  },
  
  keyCode: function() {
    return this._keyCode;
  }
});

var NSEvent = VN.Event;


// reserved keycodes
var NSUpArrowFunctionKey    = 38;
var NSDownArrowFunctionKey    = 40;
var NSLeftArrowFunctionKey    = 37;
var NSRightArrowFunctionKey   = 39;
var NSDeleteForwardFunctionKey  = 46;
var NSDeleteBackwardFunctionKey = 8;
var NSReturnFunctionKey     = 13;
var NSEscapeFunctionKey     = 27;
var NSTabFunctionKey      = 9;
var NSPageUpFunctionKey     = 33;
var NSPageDownFunctionKey     = 34;

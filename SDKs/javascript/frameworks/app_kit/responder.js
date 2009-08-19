/* 
 * responder.js
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

include('foundation/object');
include('foundation/array');
include('app_kit/event');

VN.KEY_BINDINGS = {
  escape: 'cancel',
  backspace: 'deleteBackward',
  'delete': 'deleteForward',
  'return': 'insertNewline',
  tab: 'insertTab',
  left: 'moveLeft',
  right: 'moveRight',
  up: 'moveUp',
  down: 'moveDown',
  home: 'moveToBeginningOfDocument',
  end: 'moveToEndOfDocument',
  pagedown: 'pageDown',
  pageup: 'pageUp',
  shift_tab: 'insertBacktab',
  shift_left: 'moveLeftAndModifySelection',
  shift_right: 'moveRightAndModifySelection',
  shift_up: 'moveUpAndModifySelection',
  shift_down: 'moveDownAndModifySelection',
  alt_left: 'moveLeftAndModifySelection',
  alt_right: 'moveRightAndModifySelection',
  alt_up: 'moveUpAndModifySelection',
  alt_down: 'moveDownAndModifySelection',
  ctrl_a: 'selectAll'
} ;

/**
  @class VN.Responder
  @extend VN.Object
*/
VN.Responder = VN.Object.extend({

  /**
    @type VN.Responder
  */
  next_responder: null,
  
  /**
    @type VN.Menu
  */
  menu: null,
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Responder
  */
  init_with_coder: function(aCoder) {
    this._nextResponder = aCoder.decodeObjectForKey("NSNextResponder");
    return this;
  },
  
  /**
    @param {Selector} anAction
    @param {NSObject} anObject
    @returns Boolean
  */
  try_to_perform: function(action, object) {
    
    if (this.responds_to(action)) {
      this.perform(action, object);
      return true;
    }
    
    return this.next_responder.try_to_perform(action, object);
  },
  
  /**
    @param {NSEvent} theEvent
    @returns Boolean
  */
  perform_key_equivalent: function(event) {
    return false;
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouse_down: function(event) {
    this.next_responder.mouse_down(event);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  right_mouse_down: function(event) {
    this.next_responder.right_mouse_down(event);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  otherMouseDown: function(theEvent) {
    this._nextResponder.otherMouseDown(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseUp: function(theEvent) {
    this._nextResponder.mouseUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  rightMouseUp: function(theEvent) {
    this._nextResponder.rightMouseUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  otherMouseUp: function(theEvent) {
    this._nextResponder.otherMouseUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseMoved: function(theEvent) {
    this._nextResponder.mouseMoved(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseDragged: function(theEvent) {
    this._nextResponder.mouseDragged(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  scrollWheel: function(theEvent) {
    this._nextResponder.scrollWheel(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  rightMouseDragged: function(theEvent) {
    this._nextResponder.rightMouseDragged(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  otherMouseDragged: function(theEvent) {
    this._nextResponder.otherMouseDragged(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseEntered: function(theEvent) {
    this._nextResponder.mouseEntered(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseExited: function(theEvent) {
    this._nextResponder.mouseExited(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  keyDown: function(theEvent) {
    // console.log('seidng event to');
    // console.log(this._nextResponder);
    this._nextResponder.keyDown(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  keyUp: function(theEvent) {
    this._nextResponder.keyUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  flagsChanged: function(theEvent) {
    
  },
  
  /**
    @param {NSEvent} theEvent
  */
  cursorUpdate: function(theEvent) {
    
  },
  
  /**
    @param {Selector} eventSelector
  */
  noResponderFor: function(eventSelector) {
    
  },
  
  /**
    @returns Boolean
  */
  acceptsFirstResponder: function() {
    return false;
  },
  
  /**
    @returns Boolean
  */
  becomeFirstResponder: function() {
    return true;
  },
  
  /**
    @returns Boolean
  */
  resignFirstResponder: function() {
    return true;
  },
  
  /**
    @param {NSArray} eventArray
  */
  interpretKeyEvents: function(eventArray) {
    for (var idx = 0; idx < eventArray.length; idx++) {
      var theEvent = eventArray[idx];
      
      switch (theEvent.keyCode()) {
        case NSUpArrowFunctionKey:
          this.doCommandBySelector('moveUp');
          break;
        case NSDownArrowFunctionKey:
          this.doCommandBySelector('moveDown');
          break;
        case NSLeftArrowFunctionKey:
          this.doCommandBySelector('moveLeft');
          break;
        case NSRightArrowFunctionKey:
          this.doCommandBySelector('moveRight');
          break;
        case NSDeleteForwardFunctionKey:
          this.doCommandBySelector('deleteForward');
          break;
        case NSDeleteBackwardFunctionKey:
          this.doCommandBySelector('deleteBackward');
          break;
        case NSReturnFunctionKey:
          this.doCommandBySelector('insertLineBreak');
          break;
        case NSEscapeFunctionKey:
          this.doCommandBySelector('cancel');
          break;
        case NSTabFunctionKey:
          this.doCommandBySelector('insertTab');
          break;
        case NSPageUpFunctionKey:
          this.doCommandBySelector('pageUp');
          break;
        case NSPageDownFunctionKey:
          this.doCommandBySelector('pageDown');
          break;
        default:
          if (this.respondsTo('insertText'))
            this.insertText(theEvent.characters());
          break;
      }
    }
  },
  
  /**
    @param {NSMenu} menu
  */
  setMenu: function(menu) {
    this._menu = menu;
  },
  
  /**
    @returns NSMenu
  */
  menu: function() {
    return this._menu;
  },
  
  /**
    @param {NSOject} sender
  */
  showContextHelp: function(sender) {
    
  },
  
  /**
    @param {NSEvent} theEvent
  */
  helpRequested: function(theEvent) {
    
  },
  
  /**
    @param {Selector} aSelector
  */
  doCommandBySelector: function(aSelector) {
    if (this.respondsTo(aSelector))
      this.perform(aSelector, this);
    // else // we could just drop the event...
    //   this._nextResponder.doCommandBySelector(aSelector);
  },
});

/**
  @mixin NSUndoSupport
  @class NSResponder
*/
NSResponder.mixin({
  
  /**
    @returns NSUndoManager
  */
  undoManager: function() {
    
  }
});


/**
  @mixin NSErrorPresentation
  @class NSResponder
*/
NSResponder.mixin({
  
  /**
    @param {NSError} error
    @param {NSWindow} window
    @param {NSObject} delegate
    @param {Selector} didPresentSelector
    @param {Object} contextInfo
  */
  presentErrorModalForWindowDelegateDidPresentSelectorContextInfo: function(error, window, delegate, didPresentSelector, contextInfo) {
    
  },
  
  /**
    @param {NSError} error
    @returns {Boolean}
  */
  presentError: function(error) {
    
  },
  
  /**
    @param {NSError} error
    @returns NSError
  */
  willPresentError: function(error) {
    
  }
});

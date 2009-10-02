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
 
Vienna.extend({
  
  KEY_BINDINGS: {
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
  },
  
  Responder: new Class('Responder', {
    
    attrAccessor: ['menu', 'nextResponder'],
    
    tryToPerform: function(action, object) {
      if (this.respondsTo(action)) {
        this.perform(action, object);
        return true;
      }
      return this.nextResponder().tryToPerform(action, object);
    },
    
    performKeyEquivalent: function(event) {
      return false ;
    },
    
    mouseDown: function(event) {
      this.$nextResponder.mouseDown(event);
    },
    
    rightMouseDown: function(event) {
      this.$nextResponder.rightMouseDown(event);
    },
    
    otherMouseDown: function(event) {
      this.$nextResponder.otherMouseDown(event);
    },
    
    mouseUp: function(event) {
      this.$nextResponder.mouseUp(event);
    },
    
    rightMouseUp: function(event) {
      this.$nextResponder.rightMouseUp(event);
    },
    
    otherMouseUp: function(event) {
      this.$nextResponder.otherMouseUp(event);
    },

    mouseMoved: function(event) {
      this.$nextResponder.mouseMoved(event);
    },
    
    mouseDragged: function(event) {
      this.$nextResponder.mouseDragged(event);
    },
    
    scrollWheel: function(event) {
      this.$nextResponder.scrollWheel(event);
    },
    
    mouseEntered: function(event) {
      this.$nextResponder.mouseEntered(event);
    },
    
    mouseExited: function(event) {
      this.$nextResponder.mouseExited(event);
    },

    keyDown: function(event) {
      this.$nextResponder.keyDown(event);
    },
    
    keyUp: function(event) {
      this.$nextResponder.keyUp(event);
    },

    acceptsFirstResponder: function() {
      return false;
    },
    
    becomeFirstResponder: function() {
      return true;
    },
    
    resignFirstResponder: function() {
      return true;
    },
    
    interpretKeyEvents: function(events) {
      
    }
  })
});

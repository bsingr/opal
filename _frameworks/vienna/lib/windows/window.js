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

Vienna.extend({
  
  // Notifications
  WINDOW_DID_BECOME_KEY: 'VNWindowDidBecomeKey',
  WINDOW_DID_BECOME_MAIN: 'VNWindowDidBecomeKey',
  WINDOW_DID_MINIATURIZE: 'VNWindowDidBecomeKey',
  WINDOW_DID_EXPOSE: 'VNWindowDidBecomeKey',
  WINDOW_DID_DEMINIATURIZE: 'VNWindowDidBecomeKey',
  WINDOW_DID_MOVE: 'VNWindowDidBecomeKey',
  WINDOW_DID_RESIGN_KEY: 'VNWindowDidBecomeKey',
  WINDOW_DID_RESIGN_MAIN: 'VNWindowDidBecomeKey',
  WINDOW_DID_RESIZE: 'VNWindowDidBecomeKey',
  WINDOW_DID_UPDATE: 'VNWindowDidBecomeKey',
  WINDOW_WILL_CLOSE: 'VNWindowDidBecomeKey',
  WINDOW_WILL_MINIATURIZE: 'VNWindowDidBecomeKey',
  WINDOW_WILL_MOVE: 'VNWindowDidBecomeKey',
  WINDOW_WILL_BEGIN_SHEET: 'VNWindowDidBecomeKey',
  WINDOW_DID_END_SHEET: 'VNWindowDidBecomeKey',
  
  
  Window: new Class('Window', Vienna.Responder, {
    
    attrAccessor: ['hasShadow', 'level', 'minSize', 'maxSize', 'firstResponder'],
    
    initialize: function(rect, style) {
      
    },
    
    contentRectForFrameRect: function(rect) {
      var offset = new VN.Rect(0, 0, 0, 0);
      if (this.$shadow) {
        
      }
    },
    
    frameRectForContentRect: function(rect) {
      
    }    
  })
});

/* 
 * control.js
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
  
  MIXED_STATE: 'mixed',
  OFF_STATE: 'off',
  ON_STATE: 'on',
  
  REGULAR_CONTROL_SIZE: 'regular',
  SMALL_CONTROL_SIZE: 'small',
  MINI_CONTROL_SIZE: 'mini',

  CONTROL_TEXT_DID_BEGIN_EDITING: "VNControlTextDidBeginEditingNotification",
  CONTROL_TEXT_DID_END_EDITING: "VNControlTextDidEndEditingNotification",
  CONTROL_TEXT_DID_CHANGE: "VNControlTextDidChangeNotification",
  
  
  Control: Class.create(Vienna.View, {
    
    displayProperties: ['enabled', 'selected', 'state'],
    
    initialize: function(frame) {
      console.log('control calling super');
      // console.log(this.callSuper);
      this.callSuper(frame);
      return this;
    },
    
    sizeToFit: function() {
      
    },
    
    calcSize: function() {
      
    },

    bind: function(binding, toObject, keyPath, options) {
      
    },
    
    sendAction: function(action, target) {
      if (action && target) {
        VN.App.sendAction(action, target, this);
        return true;
      }
      return false;
    },
    
    takeValueFrom: function(sender) {
      this.setValue(sender.value());
    }    
  })
});

require('button');
require('slider');

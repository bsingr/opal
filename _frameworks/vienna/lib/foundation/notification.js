/* 
 * notification.js
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
  
  /**
    @class VN.Notification
    
  */
  Notification: Class.create({
    
    attrAccessor: 'name obj info'.w(),
    
    initialize: function(name, obj, info) {
      this.$name = name ;
      this.$obj = obj ;
      this.$info = info;
    }
  }),
  
  /**
    @class VN.NotificationCenter
    
  */
  NotificationCenter: Class.create({
    
    initialize: function() {
      this.callSuper();
      this.$dispatchTable = [ ] ;
    },
    
    addObserver: function(observer, action, name, sender) {
      this.$dispatchTable.push({ observer: observer,
        action: action, name: name, 
        sender: sender, working: true
      });
    },
    
    postNotification: function(name, sender, info) {
      for (var i = 0; i < this.$dispatchTable.length; i++) {
        var obj = this.$dispatchTable[i];
        if (obj.name === name) {
          obj.observer.perform(obj.action, sender, info);
        }
      }
    },

    $defaultCenter: function() {
      if (!this.$defaultCenter) {
        this.$defaultCenter = new VN.NotificationCenter();
      }
      return this.$defaultCenter;
    }
  })
});

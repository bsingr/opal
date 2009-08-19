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

include('foundation/object');

var NSNotification = NSObject.extend({
  
  _name: null,
  _object: null,
  _userInfo: null,
  
  name: function() {
    return this._name;
  },
  
  object: function() {
    return this._object;
  },
  
  _userInfo: function() {
    return this._userInfo;
  }
});

/**
  Main method of creating a notification. userInfo can be null, and in which
  case a default dictionary will be created.
*/
NSNotification.notificationWithName = function(aName, anObject, userInfo) {
  
  var theNotification = NSNotification.create();
  
  theNotification._name = aName;
  theNotification._object = anObject
  theNotification._userInfo = userInfo;
  
  return theNotification;
};

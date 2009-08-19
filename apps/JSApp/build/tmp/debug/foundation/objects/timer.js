/* 
 * timer.js
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
  @class NSTimer
  @extends NSObject
*/
var NSTimer = NSObject.extend({
  
  /**
    Native browser timer.
  */
  _rawTimer: null,
  
  _timeInterval: null,
  
  _target: null,
  
  _selector: null,
  
  _userInfo: null,
  
  _repeats: null,
  
  initWithTimeInterval: function(timeInterval, aTarget, aSelector, userInfo, repeats) {
    this.init();
    this._timeInterval = timeInterval;
    this._target = aTarget;
    this._selector = aSelector;
    this._userInfo = userInfo;
    this._repeats = repeats;
    return this;
  },
  
  fire: function() {
    if (this._repeats)
      this._rawTimer = setInterval(this._timerDidFire, this._timeInterval);
    else
      this._rawTimer = setTimeout(this._timerDidFire, this._timeInterval);
  },
  
  _timerDidFire: function() {
    console.log('timer did fire');
  },
  
  timeInterval: function() {
    return this._timeInterval;
  },
  
  invalidate: function() {
    clearTimeout(this._rawTimer);
  },
  
  isValid: function() {
    return true;
  },
  
  userInfo: function() {
    return this._userInfo;
  }
});

NSTimer.timerWithTimeInterval = function(timeInterval, aTarget, aSelector, userInfo, repeats) {
  return this.create('initWithTimeInterval', timeInterval, aTarget, aSelector, userInfo, repeats);
};

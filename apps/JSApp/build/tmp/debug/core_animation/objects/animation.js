/* 
 * animation.js
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
  @class CAAnimation
  @extends NSObject
*/
var CAAnimation = NSObject.extend({
  
  /**
    @type CAMediaTimingFunction
  */
  _timingFunction: null,
  
  /**
    @type NSObject
  */
  _delegate: null,
  
  /**
    @type Booleans
  */
  _removedOnCompletion: null,
  
  /**
    @param {CAMediaTimingFunction} timingFunction
  */
  setTimingFunction: function(timingFunction) {
    this._timingFunction = timingFunction;
  },
  
  /**
    @returns CAMediaTimingFunction
  */
  timingFunction: function() {
    return this._timingFunction;
  },
  
  /**
    @param {NSObject} delegate
  */
  setDelegate: function(delegate) {
    
  },
  
  /**
    @returns NSObject
  */
  delegate: function() {
    return this._delegate;
  },
  
  /**
    @param {Boolean} flag
  */
  setRemovedOnCompletion: function(flag) {
    this._removedOnCompletion = flag;
  },
  
  /**
    @returns Boolean
  */
  isRemovedOnCompletion: function() {
    return this._removedOnCompletion;
  }
});

/**
  @returns CAAnimation
*/
CAAnimation.animation = function() {
  
};

/**
  @param {NSString} key
  @returns CAAnimation
*/
CAAnimation.defaultValueForKey = function(key) {
  
};

/**
  @protocol CAAnimationDelegate
*/
var CAAnimationDelegate = NSObject.protocol({
  
  /**
    @param {CAAnimation} animation
  */
  animationDidStart: function(animation) {
  },
  
  /**
    @param {CAAnimation} animation
    @param {Boolean} flag
  */
  animationDidStopFinished: function(animation, flag) {
  }
});


/**
  @class CAPropertyAnimation
  @extends CAAnimation
*/
var CAPropertyAnimation = CAAnimation.extend({
  
  /**
    @type NSString
  */
  _keyPath: null,
  
  /**
    @param {NSString} keyPath
  */
  setKeyPath: function(keyPath) {
    this._keyPath = keyPath;
  },
  
  /**
    @returns NSString
  */
  keyPath: function() {
    return this._keyPath;
  },
  
  /**
    @type Boolean
  */
  _additive: null,
  
  /**
    @param {Boolean} additive
  */
  setAdditive: function(additive) {
    this._additive = additive;
  },
  
  /**
    @returns {Boolean}
  */
  isAdditive: function() {
    return this._additive;
  },
  
  /**
    @type Boolean
  */
  _cumulative: null,
  
  /**
    @param {Boolean} cumulative
  */
  setCumulative: function(cumulative) {
    this._cumulative = cumulative;
  },
  
  /**
    @returns {Boolean}
  */
  isCumulative: function() {
    return this._cumulative;
  }
});


/**
  @class CABasicAnimation
  @extends CAPropertyAnimation
*/
var CABasicAnimation = CAPropertyAnimation.extend({
  
  /**
    @type id
  */
  _byValue: null,
  
  /**
    @param {id} value
  */
  setByValue: function(value) {
    this._byValue = value;
  },
  
  /**
    @returns id
  */
  byValue: function() {
    return this._byValue;
  },
  
  /**
    @type id
  */
  _toValue: null,
  
  /**
    @param {id} value
  */
  setToValue: function(value) {
    this._toValue = value;
  },
  
  /**
    @returns id
  */
  toValue: function() {
    return this._toValue;
  },
  
  /**
    @type id
  */
  _fromValue: null,
  
  /**
    @param {id} value
  */
  setFromValue: function(value) {
    this._fromValue = value;
  },
  
  /**
    @returns id
  */
  fromValue: function() {
    return this._fromValue;
  },
});


/**
  @class CAKeyframeAnimation
  @extends CAPropertyAnimation
*/
var CAKeyFrameAnimation = CAPropertyAnimation.extend({
  
  /**
    @type NSArray
  */
  _values: null,
  
  setValues: function(values) {
    this._values = values;
  },
  
  values: function() {
    return this._values;
  },
  
  /**
    @type CGPathRef
  */
  _path: null,
  
  setPath: function(path) {
    this._path = path;
  },
  
  path: function() {
    return this._path;
  },
  
  /**
    @type NSArray
  */
  _keyTimes: null,
  
  setKeyTimes: function(times) {
    this._keyTimes = times;
  },
  
  keyTimes: function() {
    return this._keyTimes;
  },
  
  /**
    @type NSArray
  */
  _timingFunctions: null,
  
  setTimingFunctions: function(functions) {
    this._timingFunctions = functions;
  },
  
  timingFunctions: function() {
    return this._timingFunctions;
  },
  
  /**
    @type NSString
  */
  _calculationMode: null,
  
  setCalculationMode: function(mode) {
    this._calculationMode = mode;
  },
  
  calculationMode: function() {
    return this._calculationMode;
  },
  
  /**
    @type rotationMode
  */
  _rotationMode: null,
  
  setRotationMode: function(mode) {
    this._rotationMode = mode;
  },
  
  rotationMode: function() {
    return this._rotationMode;
  }
});


/**
  Calculation mode..
*/
var kCAAnimationLinear        = "kCAAnimationLinear";
var kCAAnimationDiscrete      = "kCAAnimationDiscrete";
var kCAAnimationPaced         = "kCAAnimationPaced";

/**
  Rotation mode
*/
var kCAAnimationRotateAuto      = "kCAAnimationRotateAuto";
var kCAAnimationRotateAutoReverse   = "kCAAnimationRotateAutoReverse";


/**
  @class CATransition
  @extends CAAnimation
*/
var CATransition = CAAnimation.extend({
  
  /**
    @type NSString
  */
  _type: null,
  
  setType: function(aType) {
    this._type = aType;
  },
  
  type: function() {
    return this._type;
  },
  
  /**
    @type NSString
  */
  _subType: null,
  
  setSubType: function(aType) {
    this._subType = aType;
  },
  
  subType: function() {
    return this._subType;
  },
  
  /**
    @type Float
  */
  _startProgress: null,
  
  setStartProgress: function(progress) {
    this._startProgress = progress;
  },
  
  startProgress: function() {
    return this._startProgress;
  },
  
  /**
    @type Float
  */
  _endProgress: null,
  
  setEndProgress: function(progress) {
    this._endProgress = progress;
  },
  
  endProgress: function() {
    return this._endProgress;
  },
  
  /**
    @type id
  */
  _filter: null,
  
  setFilter: function(filter) {
    this._filter = filter;
  },
  
  filter: function() {
    return this._filter;
  }
});

/**
  Transition types..
*/
var kCATransitionFade     = "kCATransitionFade";
var kCATransitionMoveIn   = "kCATransitionMoveIn";
var kCATransitionPush     = "kCATransitionPush";
var kCATransitionReveal   = "kCATransitionReveal";

var kCATransitionFromRight  = "kCATransitionFromRight";
var kCATransitionFromLeft   = "kCATransitionFromLeft";
var kCATransitionFromTop  = "kCATransitionFromTop";
var kCATransitionFromBottom = "kCATransitionFromBottom";


/**
  @class CAAnimationGroup
  @extends CAAnimation
*/
var CAAnimationGroup = CAAnimation.extend({
  
  /**
    @type NSArray
  */
  _animations: null,
  
  /**
    @param {NSArray} animations
  */
  setAnimations: function(animations) {
    this._animations = animations;
  },
  
  /**
    @returns NSArray
  */
  animations: function() {
    return this._animations;
  }
});

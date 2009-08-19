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

include('foundation/foundation');

/**
  @enum NSAnimationCurve
*/
var NSAnimationEaseInOut    = 0; // default
var NSAnimationEaseIn       = 1;
var NSAnimationEaseOut      = 2;
var NSAnimationLinear       = 3;


var NSAnimationProgressMarkNotification = "NSAnimationProgressMarkNotification";
var NSAnimationProgressMark       = "NSAnimationProgressMark";

/**
  @class NSAnimation
  @extends NSObject
*/
var NSAnimation = NSObject.extend({
  
  /**
    @type Float time interval
  */
  _duration: null,
  
  /**
    @type Float the progress
  */
  _currentProgress: null,
  
  /**
    @type Float
  */
  _framesPerSecond: null,
  
  /**
    @type NSObject
  */
  _delegate: null,
  
  /**
    @type NSTimer
  */
  _timer: null,
  
  /**
    @type Float time interval
  */
  _startTime: null,
  
  /**
    @type NSArray
  */
  _progressMarks: null,
  
  /**
    @type NSAnimation
  */
  _startAnimation: null,
  
  /**
    @type NSAnimation
  */
  _stopAnimation: null,
  
  /**
    @type Integer
  */
  _nextProgressMark: null,
  
  /**
    @param {Float} duration
    @param {NSAnimationCurve} animationCurve
    @returns NSAnimation
  */
  initWithDurationAnimationCurve: function(duration, animationCurve) {
    
  },
  
  /**
    Starts the animation
  */
  startAnimation: function() {
    
  },
  
  /**
    Stops the animation
  */
  stopAnimation: function() {
    
  },
  
  /**
    @returns Boolean
  */
  isAnimating: function() {
    
  },
  
  /**
    @returns Float
  */
  currentProgress: function() {
    
  },
  
  /**
    @param {Float} progress
  */
  setCurrentProgress: function() {
    
  },
  
  /**
    @param {Float} duration
  */
  setDuration: function(duration) {
    
  },
  
  /**
    @returns Float
  */
  duration: function() {
    
  },
  
  /**
    @param {NSAnimationCurve} curve
  */
  setAnimationCurve: function(curve) {
    
  },
  
  /**
    @returns NSAnimationCurve
  */
  animationCurve: function() {
    
  },
  
  /**
    @returns Float
  */
  currentValue: function() {
    
  },
  
  /**
    @param {NSObject} <NSAnimationDelegate> delegate
  */
  setDelegate: function(delegate) {
    
  },
  
  /**
    @returns NSObject <NSAnimationDelegate>
  */
  delegate: function() {
    return this._delegate;
  },
  
  /**
    @returns NSArray
  */
  progressMarks: function() {
    
  },
  
  /**
    @param {NSArray} progressMarks
  */
  setProgressMarks: function(progressMarks) {
    
  },
  
  /**
    @param {Float} progressMark
  */
  addProgressMark: function(progressMark) {
    
  },
  
  /**
    @param {Float} progressMark
  */
  removeProgressMark: function(progressMark) {
    
  },
  
  /**
    @param {NSAnimation} animation
    @param {Float} startProgress
  */
  startWhenAnimationReachesProgress: function(animation, startProgress) {
    
  },
  
  /**
    @param {NSAnimation} animation
    @param {Float} stopProgress
  */
  stopWhenAnimationReachesProgress: function(animation, stopProgress) {
    
  },
  
  /**
    Clear animation
  */
  clearStartAnimation: function() {
    
  },
  
  
  /**
    Clear animation
  */
  clearStopAnimation: function() {
    
  }
});

/**
  @protocol NSAnimationDelegate
*/
var NSAnimationDelegate = NSObject.protocol({
  
  /**
    @optional
    
    @param {NSAnimation} animation
    @returns Boolean
  */
  animationShouldStart: function(animation) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
  */
  animationDidStop: function(animation) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
  */
  animationDidEnd: function(animation) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
    @param {Float} progress
    @returns Float
  */
  animationValueForProgress: function(animation, progress) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
    @param {Float} progress
  */
  animationDidReachProgressMark: function(animation, progress) {
  }
});


/**
  Animation info keys
*/
var NSViewAnimationTargetKey    = "NSViewAnimationTargetKey";     // @required an NSWindow or NSView
var NSViewAnimationStartFrameKey  = "NSViewAnimationStartFrameKey";   // @optional NSRect
var NSViewAnimationEndFrameKey    = "NSViewAnimationEndFrameKey";   // @optional NSRect
var NSViewAnimationEffectKey    = "NSViewAnimationEffectKey";     // @optional NSString
var NSViewAnimationFadeInEffect   = "NSViewAnimationFadeInEffect";
var NSViewAnimationFadeOutEffect  = "NSViewAnimationFadeOutEffect";


/**
  @class NSViewAnimation
  @extends NSAnimation
*/
var NSViewAnimation = NSAnimation.extend({
  
  /**
    @type NSArray
  */
  _viewAnimations: null,
  
  /**
    @type NSDictionary
  */
  _viewAnimationInfo: null,
  
  /**
    @type NSDictionary
  */
  _windowAnimationInfo: null,
  
  /**
    @param {NSArray} viewAnimations
    @returns NSViewAnimation
  */
  initWithViewAnimations: function(viewAnimations) {
    
  },
  
  /**
    @returns NSArray
  */
  viewAnimations: function() {
    return this._viewAnimations;
  },
  
  /**
    @param {NSArray} viewAnimations
  */
  setViewAnimations: function(viewAnimations) {
    
  }
});


/**
  @protocol NSAnimatablePropertyContainer
*/
var NSAnimatablePropertyContainer = NSObject.protocol({
  
  /**
    @returns
  */
  animator: function() {
  },
  
  /**
    @returns NSDictionary
  */
  animations: function() {
  },
  
  /**
    @param {NSDictionary} animations
  */
  setAnimations: function(animations) {
  },
  
  /**
    @param {NSString} key
    @returns 
  */
  animationForKey: function(key) {
  },
  
  /**
    @class-method
    @param {NSString} key
    @returns 
  */
  defaultAnimationForKey: function(key) {
  }
});

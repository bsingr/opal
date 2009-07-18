/* 
 * slider.js
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

include('app_kit/control');
include('app_kit/slider_cell');

/**
    VN.TickMarkPosition
*/
VN.TICK_MARK_BELOW  = 0;
VN.TICK_MARK_ABOVE  = 1;
VN.TICK_MARK_LEFT   = 1;
VN.TICK_MARK_RIGHT  = 0;

/**
    VN.SliderType
*/
VN.LINEAR_SLIDER    = 0;
VN.CIRCULAR_SLIDER  = 1;

/**
    @class VN.Slider
    @extends VN.Control
*/
var NSSlider = VN.Slider = VN.Control.extend({
    
    _minValue: 0,

    _maxValue: 0,
    
    /**
        @param {VN.Coder} aCoder
        @returns VN.Slider
    */
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        this._minValue = this._cell._minValue;
        this._maxValue = this._cell._maxValue;
        this._value = this._cell._value;
        return this;
    },
    
    /**
        Instantiate a binding to the object. Placeholders and other information
        can be specified in the options dictionary.
        
        @param {VN.String} binding
        @param {VN.Object} toObject
        @param {VN.String} withKeyPath
        @param {VN.Dictionary} options
    */
    bind: function(binding, toObject, withKeyPath, options) {
        // value binding - VN.VALUE_BINDING
        if (binding == "value") {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.VALUE_BINDING);
            
            var bindingInfo = VN.Dictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
            
            this._kvb_info.setObjectForKey(bindingInfo, VN.VALUE_BINDING);
        }
    },
    
    /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        if (context == VN.VALUE_BINDING) {
            var newValue = ofObject.valueForKeyPath(keyPath);
            this.setDoubleValue(newValue);
        }
    },
    
     /**
         Draw the slider using CoreGraphics (canvas/vml)
         @param {NSRect} cellFrame
         @param {NSView} controlView
     */
     drawWithFrame: function(cellFrame, controlView) {
         this.renderWithFrame(cellFrame, controlView, false, controlView._renderContext);
         return;

        var SLIDER_PADDING = 9.5;
        var KNOB_PADDING = 2;

        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        if (!this.isEnabled()) CGContextSetAlpha(c, 0.8);

        // draw the bar
        NSImage.imageNamed('NSSliderHorizontalLeft.png').drawInRect(CGRectMake(KNOB_PADDING, 8, 5, 5));
        NSImage.imageNamed('NSSliderHorizontalMiddle.png').drawInRect(CGRectMake(5 + KNOB_PADDING, 8, (cellFrame.size.width - 10) - (2 * KNOB_PADDING), 5));
        NSImage.imageNamed('NSSliderHorizontalRight.png').drawInRect(CGRectMake((cellFrame.size.width-5) - KNOB_PADDING, 8 ,5 ,5));

        // draw the knob
        var knobPosition = (((this._value / (this._maxValue - this._minValue)) * ((cellFrame.size.width - (2 * SLIDER_PADDING)))));
        // use math.round to make sure knob is aligned to a pixel... this avoids a blurry knob if it is aligned between pixel boundries.
        NSImage.imageNamed('NSSliderHorizontalKnobNormal.png').drawInRect(CGRectMake(Math.round(knobPosition), 1, 19, 19));

        CGContextRestoreGState(c);
     },

     /**
         @param {NSRect} cellFrame
         @param {NSView} controlView
         @param {Boolean} firstTime
         @param {NSRenderContext} context
     */
     renderRect: function(aRect, firstTime, context) {
         var SLIDER_PADDING = 9.5, KNOB_PADDING = 2.0;

         if (firstTime) {
             context.setClass('ns-slider');
             context.push('div', 'ns-slider-track-left');
             context.push('div', 'ns-slider-track');
             context.push('div', 'ns-slider-track-right');
             context.push('div', 'ns-slider-knob');
         }
         else {
             // set knob position
             var knobPosition = Math.round(((this._value / (this._maxValue - this._minValue)) * ((aRect.size.width - (2 * SLIDER_PADDING)))));
             context.$('ns-slider-knob').set(knobPosition + 'px', 'left');

             // enabled/disabled
             if (this._isEnabled)
                 context.removeClass('disabled');
             else
                 context.addClass('disabled');
         }
     },

     startTracking: function(startPoint) {
        if (this.isEnabled()) {
            var SLIDER_PADDING = 8.5;
            var location = this.convertPointFromView(startPoint, null);
            this.setDoubleValue(((location.x - SLIDER_PADDING) / (this.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
            this.setNeedsDisplay(true);

            return true;
        }
        return false;
    },

     /**
         Sets the double value for the slider. If the value is below the minValue,
         then the value is adjusted to be the minValue. Similarly, if the value
         is greater than the maxValue, it is also adjusted acordingly.
     */
     setDoubleValue: function(aDouble) {     
         this._value = Math.max(Math.min(aDouble, this._maxValue), this._minValue);
     },

     continueTracking: function(lastPoint, currentPoint) {
         var SLIDER_PADDING = 9.5;
         var location = this.convertPointFromView(currentPoint, null);
         this.setDoubleValue(((location.x - SLIDER_PADDING) / (this.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
         this.setNeedsDisplay(true);
         return true;
     },

    /**
         @param flag - If the mouseIsUp
    */
    stopTracking: function(lastPoint, stopPoint, flag) {

    },

    prefersTrackingUntilMouseUp: function() {

    },

    minValue: function() {
        return this._minValue;
    },

    setMinValue: function(aDouble) {
        this._minValue = aDouble;
    },

    maxValue: function() {
        return this._maxValue;
    },

    setMaxValue: function(aDouble) {
        this._maxValue = aDouble;
    }
});

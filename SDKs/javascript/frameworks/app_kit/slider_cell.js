/* 
 * slider_cell.js
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

include('app_kit/cell');

/**
    @class VN.SliderCell
    @extends VN.Cell
*/
var NSSliderCell = VN.SliderCell = VN.Cell.extend({

    /**
        Padding of the track from the bounds. The track should not go all the
        way to the bounds so that the knob slighty overlaps it when the knob
        is positioned at the min or max values.
    */
    TRACK_PADDING: 2.0,
    
    /**
        Padding of the slider knob. This is basically half the width of the 
        slider. This allows for a more accurate positoning value for the
        slider knob
    */
    KNOB_PADDING: 9.5,
    
    /**
        Same as the knob padding, but for a 'mini' slider control. The track
        padding remains the same for both control sizes
    */
    KNOB_PADDING_MINI: 6.5,
   
    /**
        @param {VN.Coder} aCoder
        @returns VN.SliderCell
    */
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        this._minValue = aCoder.decodeDoubleForKey("NSMinValue");
        this._maxValue = aCoder.decodeDoubleForKey("NSMaxValue");
        this._value = aCoder.decodeDoubleForKey("NSValue");
        return this;
    },
    
    /**
        @param {NSRect} cellFrame
        @param {NSView} controlView
        @param {NSRenderContext} renderContext
        @param {Boolean} firstTime
    */
    renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime)  {
        if (firstTime) {
            renderContext.setClass('vn-slider');
            renderContext.push('div', 'vn-slider-track-left');
            renderContext.push('div', 'vn-slider-track');
            renderContext.push('div', 'vn-slider-track-right');
            renderContext.push('div', 'vn-slider-knob');
        }
        else {
            // set knob position
            var knobPosition = Math.round(((this._value / (this._maxValue - this._minValue)) * ((cellFrame.size.width - (2 * this.KNOB_PADDING)))));
            renderContext.$('vn-slider-knob').set(knobPosition + 'px', 'left');

            // enabled/disabled
            if (this._isEnabled)
                renderContext.removeClass('disabled');
            else
                renderContext.addClass('disabled');
        }
    },
    
    /**
        @returns Boolean
    */
    prefersTrackingUntilMouseUp: function() {
        return true;
    },
    
    /**
        @type Double
    */
    _minValue: null,
    
    /**
        @returns Double
    */
    minValue: function() {
        return this._minValue;
    },
    
    /**
        @param {Double} aDouble
    */
    setMinValue: function(aDouble) {
        this._minValue = aDouble;
    },
    
    /**
        @type Double
    */
    _maxValue: null,
    
    /**
        @returns Double
    */
    maxValue: function() {
        return this._maxValue;
    },
    
    /**
        @param {Double} aDouble
    */
    setMaxValue: function(aDouble) {
        this._maxValue = aDouble;
    },
    
    /**
        @param {Double} aDouble
    */
    setDoubleValue: function(aDouble) {
        this._value = Math.max(Math.min(aDouble, this._maxValue), this._minValue);
    },
    
    /**
        @param {Float} aFloat
    */
    setFloatValue: function(aFloat) {
        this._value = Math.max(Math.min(aFloat, this._maxValue), this._minValue);
    },
    
    /**
        @param {Integer} anInt
    */
    setIntValue: function(anInt) {
        this._value = Math.max(Math.min(anInt, this._maxValue), this._minValue);
    },

    /**
        @param {VN.Point} startPoint
        @param {VN.View} controlView
        @returns Boolean
    */
    startTrackingInView: function(startPoint, controlView) {
        if (this.isEnabled()) {
            var location = controlView.convertPointFromView(startPoint, null);
            this.setDoubleValue(((location.x - this.KNOB_PADDING) / (controlView.bounds().size.width - (2 * this.KNOB_PADDING))) * (this._maxValue - this._minValue));
            
            if (controlView._kvb_info.containsKey(VN.VALUE_BINDING)) {
                var bindingInfo = controlView._kvb_info.valueForKey(VN.VALUE_BINDING);
                bindingInfo.valueForKey(VN.OBSERVED_OBJECT_KEY).setValueForKeyPath(this._value, bindingInfo.valueForKey(VN.OBSERVED_KEY_PATH_KEY));
            }
            
            return true;
        }
        return false;
    },

    /**
        @param {VN.Point} lastPoint
        @param {VN.Point} currentPoint
        @param {VN.View} controlView
        @returns Boolean 
    */
    continueTrackingInView: function(lastPoint, currentPoint, controlView) {
        var location = controlView.convertPointFromView(currentPoint, null);
        this.setDoubleValue(((location.x - this.KNOB_PADDING) / (controlView.bounds().size.width - (2 * this.KNOB_PADDING))) * (this._maxValue - this._minValue));
        
        if (controlView._kvb_info.containsKey(VN.VALUE_BINDING)) {
            var bindingInfo = controlView._kvb_info.valueForKey(VN.VALUE_BINDING);
            bindingInfo.valueForKey(VN.OBSERVED_OBJECT_KEY).setValueForKeyPath(this._value, bindingInfo.valueForKey(VN.OBSERVED_KEY_PATH_KEY));
        }
        return true;
    },

    /**
         @param flag - If the mouseIsUp
    */
    stopTracking: function(lastPoint, stopPoint, flag) {

    },
});

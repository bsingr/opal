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


/**
    VN.TickMarkPosition
*/
VN.TICK_MARK_BELOW  = 0;
VN.TICK_MARK_ABOVE  = 1;
VN.TICK_MARK_LEFT   = 1;
VN.TICK_MARK_RIGHT  = 0;


/**
    @enum VN.SliderType A regular slider (vertical or horizontal)
*/
VN.LINEAR_SLIDER = 0;

/**
    @enum VN.SliderType A circular slider that the user can move around.
*/
VN.CIRCULAR_SLIDER = 1;


/**
    @class VN.Slider
    @extends VN.Control
*/
var NSSlider = VN.Slider = VN.Control.extend({
        
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
        @returns Boolean
    */
    prefersTrackingUntilMouseUp: function() {
        return this._cell.prefersTrackingUntilMouseUp();
    },
    
    /**
        @returns Double
    */
    minValue: function() {
        return this._cell.minValue();
    },
    
    /**
        @param {Double} aDouble
    */
    setMinValue: function(aDouble) {
        this._cell.setMinValue(aDouble);
    },
    
    /**
        @returns Double
    */
    maxValue: function() {
        return this._cell.maxValue();
    },
    
    /**
        @param {Double} aDouble
    */
    setMaxValue: function(aDouble) {
        this._cell.setMaxValue(aDouble);
    }
});

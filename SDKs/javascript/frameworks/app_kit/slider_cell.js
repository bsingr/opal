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

// NSTickMarkPosition
var NSTickMarkBelow = 0;
var NSTickMarkAbove = 1;
var NSTickMarkLeft  = 1;
var NSTickMarkRight = 0;

// NSSliderType
var NSLinearSlider   = 0;
var NSCircularSlider = 1;

/**
    @class NSSliderCell
    
    Cell used for the drawing parts of the NSSlider control. A min and max value
    can be set to constrain drawing. Both normal sliders (vertical as well as
    horizontal) and round knobs can be used.
*/
var NSSliderCell = NSCell.extend({
   
   _minValue: 0,
   
   _maxValue: 0,
   
   initWithCoder: function(aCoder) {
       this._super(aCoder);
       this._minValue = aCoder.decodeDoubleForKey("NSMinValue");
       this._maxValue = aCoder.decodeDoubleForKey("NSMaxValue");
       this._value = aCoder.decodeDoubleForKey("NSValue");
       return this;
   }.initializer("coder"),
   
   drawWithFrameInView: function(cellFrame, controlView) {
       var SLIDER_PADDING = 8.5;
       var KNOB_PADDING = 2;
       
       var c = NSGraphicsContext.currentContext().graphicsPort();
       CGContextSaveGState(c);
       if (!this.isEnabled()) CGContextSetAlpha(c, 0.8);
   },
   
   startTrackingAtInView: function(startPoint, controlView) {
       if (this.isEnabled()) {
           var SLIDER_PADDING = 8.5;
           var location = controlView.convertPointFromView(startPoint, null);
           this.setDoubleValue(((location.x - SLIDER_PADDING) / (controlView.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
           this.drawFrameInView(controlView.bounds(), controlView);
           return true;
       }
       return false;
   },

   setDoubleValue: function(aDouble) {
       if (aDouble < this._minValue) this._value = this._minValue;
       else if (aDouble > this._maxValue) this._value = this._maxValue;
       else this._value = aDouble;
   },
   
   continueTrackingAtInView: function(lastPoint, currentPoint, controlView) {
       var SLIDER_PADDING = 8.5;
       var location = controlView.convertPointFromView(currentPoint, null);
       this.setDoubleValue(((location.x - SLIDER_PADDING) / (controlView.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
       this.drawFrameInView(controlView.bounds(), controlView);
       return true;
   },
   
   /**

        @param flag - If the mouseIsUp

   */
   stopTrackingInView: function(lastPoint, stopPoint, controlView, flag) {
       
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

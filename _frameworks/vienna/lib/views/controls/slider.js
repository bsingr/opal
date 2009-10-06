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

Vienna.extend({
  
  // Tick mark position
  TICK_MARK_BELOW: 0,
  TICK_MARK_ABOVE: 1,
  TICK_MARK_LEFT: 1,
  TICK_MARK_RIGHT: 0,

  // Slider type
  LINEAR_SLIDER: 0,
  CIRCULAR_SLIDER: 1,
  
  /**
    @class Slider
    @extends Control
    
  */
  Slider: Class.create(VN.Control, {
    
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
    
    attrAccessor: ['minValue', 'maxValue'],
    
    displayProperties: ['minValue', 'maxValue'],
    
    bind: function(binding, obj, keyPath, options) {
      
      if (binding === 'value') {
        obj.addObserver(this, keyPath, 0, VN.VALUE_BINDING);
      }
    }
    
  })
});

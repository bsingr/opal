/* 
 * segmented_control.js
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


VN.SEGMENT_STYLE_AUTOMATIC = 0;
VN.SEGMENT_STYLE_ROUNDED = 1;
VN.SEGMENT_STYLE_TEXTURED_ROUNDED = 2;
VN.SEGMENT_STYLE_ROUND_RECT = 3;
VN.SEGMENT_STYLE_TEXTURED_SQUARE = 4;
VN.SEGMENT_STYLE_CAPSULE = 5;
VN.SEGMENT_STYLE_SMALL_SQUARE = 6;

var NSSegmentedControl = VN.SegmentedControl = VN.Control.extend({
  
  /**
    @type Integer
  */
  segmentCount: null,
  
  /**
    @type Integer
  */
  selectedSegment: null,
  
  /**
    @type VN.Array
  */
  segmentWidths: null,
  
  /**
    @param {Float} width
    @param {Integer} segment
  */
  setWidthForSegment: function(width, segment) {
    
  },
  
  /**
    @param {Integer} segment
    @returns Float
  */
  widthForSegment: function(segment) {
    
  },
  
  /**
    @type VN.Array
  */
  segmentImages: null,
  
  
});
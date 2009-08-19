/* 
 * button.js
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
include('app_kit/button_cell');

/**
  VN.BezelStyle
*/
VN.ROUNDED_BEZEL = 'rounded';
VN.REGULAR_SQUARE_BEZEL = 'regular_square';
VN.THICK_SQUARE_BEZEL = 'thick_square';
VN.THICKER_SQUARE_BEZEL = 'thicker_square';
VN.DISCLOSURE_BEZEL = 'disclosure';
VN.SHADOWLESS_SQUARE_BEZEL = 'shadowless_square';
VN.CIRCULAR_BEZEL = 'circular_bezel';
VN.TEXTURED_SQUARE_BEZEL = 'textured_square';
VN.HELP_BUTTON_BEZEL = 'help_button';
VN.SMALL_SQUARE_BEZEL = 'small_square';
VN.TEXTURED_ROUNDED_BEZEL = 'textured_rounded';
VN.ROUNDED_RECT_BEZEL = 'rounded_rect';
VN.RECESSED_BEZEL = 'recessed';
VN.ROUNDED_DISCLOSURE_BEZEL = 'rounded_disclosure';

/**
  VN.ButtonType
*/
VN.MOMENTARY_LIGHT_BUTTON = 0;
VN.PUSH_ON_PUSH_OFF_BUTTON = 1;
VN.TOGGLE_BUTTON = 2;
VN.SWITCH_BUTTON = 3;
VN.RADIO_BUTTON = 4;
VN.MOMENTARY_CHANGE_BUTTON = 5;
VN.ON_OFF_BUTTON = 6;
VN.MOMENTARY_PUSH_IN_BUTTON = 7;

/**
  @class VN.Button
  @extends VN.Control
*/
VN.Button = VN.Control.extend({
  
  /**
    VN.Button default options
  */
  defaultOptions: { bezel: 'rounded', frame: [0, 0, 0, 0], layout: { } },
  
  /**
    @type VN.Image
  */
  alternateImage: null,
  
  /**
    @type VN.Image
  */
  image: null,
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Button
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    return this;
  }
});

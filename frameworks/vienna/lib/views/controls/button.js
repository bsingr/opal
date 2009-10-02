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

Vienna.extend({
  
  // Bezel styles
  ROUNDED_BEZEL: 'rounded',
  REGULAR_SQUARE_BEZEL: 'regular_square',
  THICK_SQUARE_BEZEL: 'thick_square',
  THICKER_SQUARE_BEZEL: 'thicker_square',
  DISCLOSURE_BEZEL: 'disclosure',
  SHADOWLESS_SQUARE_BEZEL: 'shadowless_square',
  CIRCULAR_BEZEL: 'circular_bezel',
  TEXTURED_SQUARE_BEZEL: 'textured_square',
  HELP_BUTTON_BEZEL: 'help_button',
  SMALL_SQUARE_BEZEL: 'small_square',
  TEXTURED_ROUNDED_BEZEL: 'textured_rounded',
  ROUNDED_RECT_BEZEL: 'rounded_rect',
  RECESSED_BEZEL: 'recessed',
  ROUNDED_DISCLOSURE_BEZEL: 'rounded_disclosure',

  // Button types
  MOMENTARY_LIGHT_BUTTON: 0,
  PUSH_ON_PUSH_OFF_BUTTON: 1,
  TOGGLE_BUTTON: 2,
  SWITCH_BUTTON: 3,
  RADIO_BUTTON: 4,
  MOMENTARY_CHANGE_BUTTON: 5,
  ON_OFF_BUTTON: 6,
  MOMENTARY_PUSH_IN_BUTTON: 7,
  
  Button: new Class('Button', Vienna.Control, {
    
    defaultOptions: {
      bezel: 'rounded'
    }
    
    // ROUNDED_NORMAL_LEFT: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //    ROUNDED_NORMAL_MIDDLE:
    //    
    //    IMAGES: {
    //      rounded: {
    //        normal: {
    //          left: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //          middle: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //          right: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24))
    //        },
    //        disabled: {
    //          left: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //          middle: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //          right: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24))
    //        },
    //        pressed: {
    //          left: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //          middle: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24)),
    //          right: VN.Image.sprite('controls.png', new VN.Rect(0, 20, 16, 24))
    //        },
    //      }
    //    }
    //    
    //    drawRect: function(rect) {
    //      var leftImg = this.IMAGES['rounded']['normal']['left']
    //      leftImg.drawInRect()
    //    }
  })
});

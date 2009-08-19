/* 
 * text.js
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

include ('app_kit/view');

// Important character codes
VN.ENTER_CHARACTER = 0x0003;
VN.BACKSPACE_CHARACTER = 0x0008;
VN.TAB_CHARACTER = 0x0009;
VN.NEWLINE_CHARACTER = 0x000a;
VN.FORM_FEED_CHARACTER = 0x000c;
VN.CARRIAGE_RETURN_CHARACTER = 0x000d;
VN.BACK_TAB_CHARACTER = 0x0019;
VN.DELETE_CHARACTER = 0x007f;
VN.LINE_SEPARATOR_CHARACTER = 0x2028;
VN.PARAGRAPH_SEPARATOR_CHARACTER = 0x2029;
                  
// VN.TextAlignment          
VN.LEFT_TEXT_ALIGNMENT = 0;
VN.RIGHT_TEXT_ALIGNMENT = 1;
VN.CENTER_TEXT_ALIGNMENT = 2;
VN.JUSTIFIED_TEXT_ALIGNMENT = 3;
VN.NATURAL_TEXT_ALIGNMENT = 4;
                  
// VN.WritingDirection         
VN.WRITING_DIRECTION_NATURAL = -1;
VN.WRITING_DIRECTION_LEFT_TO_RIGHT = 0;
VN.WRITING_DIRECTION_RIGHT_TO_LEFT = 1;
VN.WRITING_DIRECTION_EMBEDDING = (0 << 1);
VN.WRITING_DIRECTION_OVERRIDE = (1 << 1);
                  
// Movement codes
VN.ILLEGAL_TEXT_MOVEMENT = 0;
VN.RETURN_TEXT_MOVEMENT = 0x10;
VN.TAB_TEXT_MOVEMENT = 0x11;
VN.BACKTAB_TEXT_MOVEMENT = 0x12;
VN.LEFT_TEXT_MOVEMENT = 0x13;
VN.RIGHT_TEXT_MOVEMENT = 0x14;
VN.UP_TEXT_MOVEMENT = 0x15;
VN.DOWN_TEXT_MOVEMENT = 0x16;
VN.CANCEL_TEXT_MOVEMENT = 0x17;
VN.OTHER_TEXT_MOVEMENT = 0;

// Notifications
VN.TEXT_DID_BEGIN_EDITING_NOTIFICATION = "NSTextDidBeginEditingNotification";
VN.TEXT_DID_END_EDITING_NOTIFICATION = "NSTextDidEndEditingNotification";
VN.TEXT_DID_CHANGE_NOTIFICATION = "NSTextDidChangeNotification";

/**
  @prototol VN.TextDelegate
  
  Protocol defining the text delegate methods.
*/
VN.TextDelegate = VN.protocol({
  
  textShouldBeginEditing: function(textObject) {  
  },
  
  textShouldBeginEditing: function(textObject) {
  },
  
  textDidBeginEditing: function(aNotification) {
  },
  
  textDidEndEditing: function(aNotification) {
  },
  
  textDidChange: function(aNotification) {
  }
});

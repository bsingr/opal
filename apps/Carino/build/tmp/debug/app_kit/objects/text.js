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

// important character codes
var NSEnterCharacter                    = 0x0003;
var NSBackspaceCharacter                = 0x0008;
var NSTabCharacter                      = 0x0009;
var NSNewlineCharacter                  = 0x000a;
var NSFormFeedCharacter                 = 0x000c;
var NSCarriageReturnCharacter           = 0x000d;
var NSBackTabCharacter                  = 0x0019;
var NSDeleteCharacter                   = 0x007f;
var NSLineSeparatorCharacter            = 0x2028;
var NSParagraphSeparatorCharacter       = 0x2029;
                                    
// NSTextAlignment                  
var NSLeftTextAlignment		            = 0;
var NSRightTextAlignment	            = 1;
var NSCenterTextAlignment	            = 2;
var NSJustifiedTextAlignment	        = 3;
var NSNaturalTextAlignment	            = 4;
                                    
// NSWritingDirection               
var NSWritingDirectionNatural           = -1;
var NSWritingDirectionLeftToRight       = 0;
var NSWritingDirectionRightToLeft       = 1;
var NSTextWritingDirectionEmbedding     = (0 << 1);
var NSTextWritingDirectionOverride      = (1 << 1);
                                    
// Movement codes                   
var NSIllegalTextMovement		        = 0;
var NSReturnTextMovement		        = 0x10;
var NSTabTextMovement			        = 0x11;
var NSBacktabTextMovement		        = 0x12;
var NSLeftTextMovement			        = 0x13;
var NSRightTextMovement			        = 0x14;
var NSUpTextMovement			        = 0x15;
var NSDownTextMovement			        = 0x16;
var NSCancelTextMovement		        = 0x17;
var NSOtherTextMovement			        = 0;

// Notifications
var NSTextDidBeginEditingNotification   = "NSTextDidBeginEditingNotification";
var NSTextDidEndEditingNotification     = "NSTextDidEndEditingNotification";
var NSTextDidChangeNotification         = "NSTextDidChangeNotification";

/*
    @prototol NSTextDelegate
    
    Protocol defining the text delegate methods.
*/
var NSTextDelegate = {
    
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
};

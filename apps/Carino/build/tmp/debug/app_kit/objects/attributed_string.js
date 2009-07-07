/* 
 * attributed_string.js
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
    Attributes used for strings. If not present, then defaults will be used 
    instead.
*/
var NSFontAttributeName                 = "NSFontAttributeName";
var NSParagraphStyleAttributeName       = "NSParagraphStyleAttributeName";
var NSForegroundColorAttributeName      = "NSForegroundColorAttributeName";
var NSUnderlineStyleAttributeName       = "NSUnderlineStyleAttributeName";
var NSSuperscriptAttributeName          = "NSSuperscriptAttributeName";
var NSBackgroundColorAttributeName      = "NSBackgroundColorAttributeName";
var NSAttachmentAttributeName           = "NSAttachmentAttributeName";
var NSLigatureAttributeName             = "NSLigatureAttributeName";
var NSBaselineOffsetAttributeName       = "NSBaselineOffsetAttributeName";
var NSKernAttributeName                 = "NSKernAttributeName";
var NSLinkAttributeName                 = "NSLinkAttributeName";

var NSStrokeWidthAttributeName          = "NSStrokeWidthAttributeName";
var NSStrokeColorAttributeName          = "NSStrokeColorAttributeName";
var NSUnderlineColorAttributeName       = "NSUnderlineColorAttributeName";
var NSStrikethroughStyleAttributeName   = "NSStrikethroughStyleAttributeName";
var NSStrikethroughColorAttributeName   = "NSStrikethroughColorAttributeName";
var NSShadowAttributeName               = "NSShadowAttributeName";
var NSObliquenessAttributeName          = "NSObliquenessAttributeName";
var NSExpansionAttributeName            = "NSExpansionAttributeName";
var NSCursorAttributeName               = "NSCursorAttributeName";
var NSToolTipAttributeName              = "NSToolTipAttributeName";

// NSUnderlineStyleAttributeName and NSStrikethroughStyleAttributeName
var NSUnderlineStyleNone                = 0x00;
var NSUnderlineStyleSingle              = 0x01;
var NSUnderlineStyleThick               = 0x02;
var NSUnderlineStyleDouble              = 0x09;

var NSUnderlinePatternSolid             = 0x0000;
var NSUnderlinePatternDot               = 0x0100;
var NSUnderlinePatternDash              = 0x0200;
var NSUnderlinePatternDashDot           = 0x0300;
var NSUnderlinePatternDashDotDot        = 0x0400;

NSAttributedString.mixin({
	
	fontAttributesInRange: function(range) {
		
	},
	
	lineBreakBeforeIndex: function(location, withinRange) {
		
	},
	
	lineBreakByHyphenatingBeforeIndex: function(location, withinRange) {
		
	},
	
	doubleClickAtIndex: function(location) {
		
	},
	
	nextWordFromIndex: function(location, isForward) {
		
	},
	
	URLAtIndex: function(location, effectiveRange) {
		
	},
	
	rangeOfTextBlock: function(block, atIndex) {
		
	},
	
	rangeOfTextTable: function(table, atIndex) {
		
	},
	
	rangeOfTextList: function(list, atIndex) {
		
	},
	
	itemNumberInTextList: function(list, atIndex) {
		
	}
});

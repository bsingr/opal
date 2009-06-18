/* 
 * CTStringAttributes.h
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

#include <CoreFoundation/CFNumber.h>
#include <CoreFoundation/CFString.h>
#include <CoreGraphics/CGColor.h>

extern const CFStringRef kCTFontAttributeName;
extern const CFStringRef kCTForegroundColorFromContextAttributeName;
extern const CFStringRef kCTKernAttributeName;
extern const CFStringRef kCTLigatureAttributeName;
extern const CFStringRef kCTForegroundColorAttributeName;
extern const CFStringRef kCTParagraphStyleAttributeName;
extern const CFStringRef kCTStrokeWidthAttributeName;
extern const CFStringRef kCTStrokeColorAttributeName;
extern const CFStringRef kCTUnderlineStyleAttributeName;
extern const CFStringRef kCTSuperscriptAttributeName;
extern const CFStringRef kCTUnderlineColorAttributeName;
extern const CFStringRef kCTVerticalFormsAttributeName;
extern const CFStringRef kCTGlyphInfoAttributeName;
extern const CFStringRef kCTCharacterShapeAttributeName;

enum {
	kCTUnderlineStyleNone				 = 0x00,
	kCTUnderlineStyleSingle				 = 0x01,
	kCTUnderlineStyleThick				 = 0x02,
	kCTUnderlineStyleDouble				 = 0x09
};
typedef int CTUnderlineStyle;

enum {
	kCTUnderlinePatternSolid			 = 0x0000,
	kCTUnderlinePatternDot				 = 0x0100,
	kCTUnderlinePatternDash				 = 0x0200,
	kCTUnderlinePatternDashDot			 = 0x0300,
	kCTUnderlinePatternDashDotDot		 = 0x0400
};
typedef int CTUnderlineStyleModifiers;

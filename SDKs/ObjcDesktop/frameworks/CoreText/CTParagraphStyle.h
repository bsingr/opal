/* 
 * CTParagraphStyle.h
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

#include <CoreFoundation/CFArray.h>
#include <CoreGraphics/CGBase.h>

typedef const struct __CTParagraphStyle *CTParagraphStyleRef;

enum {
	kCTLeftTextAlignment    = 0,
	kCTRightTextAlignment     = 1,
	kCTCenterTextAlignment    = 2,
	kCTJustifiedTextAlignment   = 3,
	kCTNaturalTextAlignment   = 4
};
typedef int CTTextAlignment;

enum {
	kCTLineBreakByWordWrapping    = 0,
	kCTLineBreakByCharWrapping    = 1,
	kCTLineBreakByClipping      = 2,
	kCTLineBreakByTruncatingHead  = 3,
	kCTLineBreakByTruncatingTail  = 4,
	kCTLineBreakByTruncatingMiddle  = 5
};
typedef int CTLineBreakMode;

enum {
	kCTWritingDirectionNatural    = -1,
	kCTWritingDirectionLeftToRight  = 0,
	kCTWritingDirectionRightToLeft  = 1
};
typedef int CTWritingDirection;

enum {
	kCTParagraphStyleSpecifierAlignment         = 0,
	kCTParagraphStyleSpecifierFirstLineHeadIndent     = 1,
	kCTParagraphStyleSpecifierHeadIndent        = 2,
	kCTParagraphStyleSpecifierTailIndent        = 3,
	kCTParagraphStyleSpecifierTabStops          = 4,
	kCTParagraphStyleSpecifierDefaultTabInterval    = 5,
	kCTParagraphStyleSpecifierLineBreakMode       = 6,
	kCTParagraphStyleSpecifierLineHeightMultiple    = 7,
	kCTParagraphStyleSpecifierMaximumLineHeight     = 8,
	kCTParagraphStyleSpecifierMinimumLineHeight     = 9,
	kCTParagraphStyleSpecifierLineSpacing         = 10,
	kCTParagraphStyleSpecifierParagraphSpacing      = 11,
	kCTParagraphStyleSpecifierParagraphSpacingBefore  = 12,
	kCTParagraphStyleSpecifierBaseWritingDirection    = 13,

	kCTParagraphStyleSpecifierCount           = 14
};
typedef int CTParagraphStyleSpecifier;

typedef struct CTParagraphStyleSetting
{
	CTParagraphStyleSpecifier   spec;
	int             valueSize;
	const void         *value;

} CTParagraphStyleSetting;


extern CTParagraphStyleRef CTParagraphStyleCreate(const CTParagraphStyleSetting* settings, CFIndex settingCount );

extern CTParagraphStyleRef CTParagraphStyleCreateCopy(CTParagraphStyleRef paragraphStyle);

extern bool CTParagraphStyleGetValueForSpecifier(CTParagraphStyleRef paragraphStyle, CTParagraphStyleSpecifier spec, int valueBufferSize, void* valueBuffer);

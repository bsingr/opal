/* 
 * CTFrame.h
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
#include <CoreFoundation/CFDictionary.h>
#include <CoreFoundation/CFNumber.h>
#include <CoreFoundation/CFString.h>
#include <CoreGraphics/CGContext.h>

typedef struct __CTFrame *CTFrameRef;

enum
{
	kCTFrameProgressionTopToBottom = 0,
	kCTFrameProgressionRightToLeft = 1
};
typedef int CTFrameProgression;

extern const CFStringRef kCTFrameProgressionAttributeName;

extern CFRange CTFrameGetStringRange(CTFrameRef frame);

extern CFRange CTFrameGetVisibleStringRange(CTFrameRef frame);

extern CGPathRef CTFrameGetPath(CTFrameRef frame);

extern CFDictionaryRef CTFrameGetFrameAttributes(CTFrameRef frame);

extern CFArrayRef CTFrameGetLines(CTFrameRef frame);

extern void CTFrameGetLineOrigins(CTFrameRef frame, CFRange range, CGPoint origins[]);

extern void CTFrameDraw(CTFrameRef frame, CGContextRef context);

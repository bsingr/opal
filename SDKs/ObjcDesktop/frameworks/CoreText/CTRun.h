/* 
 * CTRun.h
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

#include <CoreFoundation/CFDictionary.h>
#include <CoreGraphics/CGContext.h>

typedef const struct __CTRun * CTRunRef;

enum {
	kCTRunStatusNoStatus        = 0,
	kCTRunStatusRightToLeft       = (1 << 0),
	kCTRunStatusNonMonotonic      = (1 << 1),
	kCTRunStatusHasNonIdentityMatrix  = (1 << 2)
};
typedef int CTRunStatus;

extern CFIndex CTRunGetGlyphCount(CTRunRef run);

extern CFDictionaryRef CTRunGetAttributes(CTRunRef run);

extern CTRunStatus CTRunGetStatus(CTRunRef run);

extern const CGGlyph* CTRunGetGlyphsPtr(CTRunRef run);

extern void CTRunGetGlyphs(CTRunRef run, CFRange range, CGGlyph buffer[]);

extern const CGPoint* CTRunGetPositionsPtr(CTRunRef run);

extern void CTRunGetPositions(CTRunRef run, CFRange range, CGPoint buffer[]);

extern const CGSize* CTRunGetAdvancesPtr(CTRunRef run);

extern void CTRunGetAdvances(CTRunRef run, CFRange range, CGSize buffer[]);

extern const CFIndex* CTRunGetStringIndicesPtr(CTRunRef run);

extern void CTRunGetStringIndices(CTRunRef run, CFRange range, CFIndex buffer[]);

extern CFRange CTRunGetStringRange(CTRunRef run);

extern double CTRunGetTypographicBounds(CTRunRef run, CFRange range, CGFloat* ascent, CGFloat* descent, CGFloat* leading);

extern CGRect CTRunGetImageBounds(CTRunRef run, CGContextRef context, CFRange range);

extern CGAffineTransform CTRunGetTextMatrix(CTRunRef run);

extern void CTRunDraw(CTRunRef run, CGContextRef context, CFRange range);

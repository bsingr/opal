/* 
 * CTFontTraits.h
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

extern const CFStringRef kCTFontSymbolicTrait;

extern const CFStringRef kCTFontWeightTrait;

extern const CFStringRef kCTFontWidthTrait;

extern const CFStringRef kCTFontSlantTrait;

enum {
  kCTFontClassMaskShift = 28
};

enum {
  kCTFontItalicTrait        = (1 << 0),
  kCTFontBoldTrait        = (1 << 1),
  kCTFontExpandedTrait      = (1 << 5),
  kCTFontCondensedTrait       = (1 << 6),
  kCTFontMonoSpaceTrait       = (1 << 10),
  kCTFontVerticalTrait      = (1 << 11),
  kCTFontUIOptimizedTrait     = (1 << 12),

  kCTFontClassMaskTrait       = (15 << kCTFontClassMaskShift)
};
typedef int CTFontSymbolicTraits;

enum {
  kCTFontUnknownClass       = (0 << kCTFontClassMaskShift),
  kCTFontOldStyleSerifsClass    = (1 << kCTFontClassMaskShift),
  kCTFontTransitionalSerifsClass  = (2 << kCTFontClassMaskShift),
  kCTFontModernSerifsClass    = (3 << kCTFontClassMaskShift),
  kCTFontClarendonSerifsClass   = (4 << kCTFontClassMaskShift),
  kCTFontSlabSerifsClass      = (5 << kCTFontClassMaskShift),
  kCTFontFreeformSerifsClass    = (7 << kCTFontClassMaskShift),
  kCTFontSansSerifClass       = (8 << kCTFontClassMaskShift),
  kCTFontOrnamentalsClass     = (9 << kCTFontClassMaskShift),
  kCTFontScriptsClass       = (10 << kCTFontClassMaskShift),
  kCTFontSymbolicClass      = (12 << kCTFontClassMaskShift)
};
typedef int CTFontStylisticClass;

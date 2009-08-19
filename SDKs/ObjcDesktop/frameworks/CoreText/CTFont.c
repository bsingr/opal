/* 
 * CTFont.c
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

#include "CTFont.h"

const CFStringRef kCTFontCopyrightNameKey = "kCTFontCopyrightNameKey";
const CFStringRef kCTFontFamilyNameKey = "kCTFontFamilyNameKey";
const CFStringRef kCTFontSubFamilyNameKey = "kCTFontSubFamilyNameKey";
const CFStringRef kCTFontStyleNameKey = "kCTFontStyleNameKey";
const CFStringRef kCTFontUniqueNameKey = "kCTFontUniqueNameKey";
const CFStringRef kCTFontFullNameKey = "kCTFontFullNameKey";
const CFStringRef kCTFontVersionNameKey = "kCTFontVersionNameKey";
const CFStringRef kCTFontPostScriptNameKey = "kCTFontPostScriptNameKey";
const CFStringRef kCTFontTrademarkNameKey = "kCTFontTrademarkNameKey";
const CFStringRef kCTFontManufacturerNameKey = "kCTFontManufacturerNameKey";
const CFStringRef kCTFontDesignerNameKey = "kCTFontDesignerNameKey";
const CFStringRef kCTFontDescriptionNameKey = "kCTFontDescriptionNameKey";
const CFStringRef kCTFontVendorURLNameKey = "kCTFontVendorURLNameKey";
const CFStringRef kCTFontDesignerURLNameKey = "kCTFontDesignerURLNameKey";
const CFStringRef kCTFontLicenseNameKey = "kCTFontLicenseNameKey";
const CFStringRef kCTFontLicenseURLNameKey = "kCTFontLicenseURLNameKey";
const CFStringRef kCTFontSampleTextNameKey = "kCTFontSampleTextNameKey";
const CFStringRef kCTFontPostScriptCIDNameKey = "kCTFontPostScriptCIDNameKey";


CTFontRef CTFontCreateWithName(CFStringRef name, CGFloat size, const CGAffineTransform *matrix)
{
  CTFontRef theFont;
  return theFont;
}

CTFontRef CTFontCreateWithFontDescriptor(CTFontDescriptorRef descriptor, CGFloat size, const CGAffineTransform *matrix)
{
  
}

CTFontRef CTFontCreateUIFontForLanguage(CTFontUIFontType uiType, CGFloat size, CFStringRef language)
{
  
}

CTFontRef CTFontCreateCopyWithAttributes(CTFontRef font, CGFloat size, const CGAffineTransform *matrix, CTFontDescriptorRef attributes)
{
  
}

CTFontRef CTFontCreateCopyWithSymbolicTraits(CTFontRef font, CGFloat size, const CGAffineTransform *matrix, CTFontSymbolicTraits symTraitValue, CTFontSymbolicTraits symTraitMask)
{
  
}

CTFontRef CTFontCreateCopyWithFamily(CTFontRef font, CGFloat size, const CGAffineTransform *matrix, CFStringRef family)
{
  
}

CTFontRef CTFontCreateForString(CTFontRef currentFont, CFStringRef string, CFRange range)
{
  
}

CTFontDescriptorRef CTFontCopyFontDescriptor(CTFontRef font)
{
  
}

CFTypeRef CTFontCopyAttribute(CTFontRef font, CFStringRef attribute)
{
  
}

CGFloat CTFontGetSize(CTFontRef font)
{
  
}

CGAffineTransform CTFontGetMatrix(CTFontRef font)
{
  
}

CTFontSymbolicTraits CTFontGetSymbolicTraits(CTFontRef font)
{
  
}

CFDictionaryRef CTFontCopyTraits(CTFontRef font)
{
  
}

CFStringRef CTFontCopyPostScriptName(CTFontRef font)
{
  
}

CFStringRef CTFontCopyFamilyName(CTFontRef font)
{
  
}

CFStringRef CTFontCopyFullName(CTFontRef font)
{
  
}

CFStringRef CTFontCopyDisplayName(CTFontRef font)
{
  
}

CFStringRef CTFontCopyName(CTFontRef font, CFStringRef nameKey)
{
  
}

CFStringRef CTFontCopyLocalizedName(CTFontRef font, CFStringRef nameKey, CFStringRef *language)
{
  
}

CFCharacterSetRef CTFontCopyCharacterSet(CTFontRef font)
{
  
}

CFStringEncoding CTFontGetStringEncoding(CTFontRef font)
{
  
}

CFArrayRef CTFontCopySupportedLanguages(CTFontRef font)
{
  
}

bool CTFontGetGlyphsForCharacters(CTFontRef font, const char characters[], CGGlyph glyphs[], CFIndex count)
{
  
}


CGFloat CTFontGetAscent(CTFontRef font)
{
  
}

CGFloat CTFontGetDescent(CTFontRef font)
{
  
}

CGFloat CTFontGetLeading(CTFontRef font)
{
  
}

int CTFontGetUnitsPerEm(CTFontRef font)
{
  
}

CFIndex CTFontGetGlyphCount(CTFontRef font)
{
  
}

CGRect CTFontGetBoundingBox(CTFontRef font)
{
  
}

CGFloat CTFontGetUnderlinePosition(CTFontRef font)
{
  
}

CGFloat CTFontGetUnderlineThickness(CTFontRef font)
{
  
}

CGFloat CTFontGetSlantAngle(CTFontRef font)
{
  
}

CGFloat CTFontGetCapHeight(CTFontRef font)
{
  
}

CGFloat CTFontGetXHeight(CTFontRef font)
{
  
}

CGGlyph CTFontGetGlyphWithName(CTFontRef font, CFStringRef glyphName)
{
  
}

CGRect CTFontGetBoundingRectsForGlyphs(CTFontRef font, CTFontOrientation orientation, const CGGlyph glyphs[], CGRect boundingRects[], CFIndex count)
{
  
}

double CTFontGetAdvancesForGlyphs(CTFontRef font, CTFontOrientation orientation, const CGGlyph glyphs[], CGSize advances[], CFIndex count)
{
  
}

void CTFontGetVerticalTranslationsForGlyphs(CTFontRef font, const CGGlyph glyphs[], CGSize translations[], CFIndex count)
{
  
}

CGPathRef CTFontCreatePathForGlyph(CTFontRef font, CGGlyph glyph, const CGAffineTransform *transform)
{
  
}

const CFStringRef kCTFontVariationAxisIdentifierKey = "kCTFontVariationAxisIdentifierKey";
const CFStringRef kCTFontVariationAxisMinimumValueKey = "kCTFontVariationAxisMinimumValueKey";
const CFStringRef kCTFontVariationAxisMaximumValueKey = "kCTFontVariationAxisMaximumValueKey";
const CFStringRef kCTFontVariationAxisDefaultValueKey = "kCTFontVariationAxisDefaultValueKey";
const CFStringRef kCTFontVariationAxisNameKey = "kCTFontVariationAxisNameKey";


CFArrayRef CTFontCopyVariationAxes(CTFontRef font)
{
  
}

CFDictionaryRef CTFontCopyVariation(CTFontRef font)
{
  
}


const CFStringRef kCTFontFeatureTypeIdentifierKey = "kCTFontFeatureTypeIdentifierKey";
const CFStringRef kCTFontFeatureTypeNameKey = "kCTFontFeatureTypeNameKey";
const CFStringRef kCTFontFeatureTypeExclusiveKey = "kCTFontFeatureTypeExclusiveKey";
const CFStringRef kCTFontFeatureTypeSelectorsKey = "kCTFontFeatureTypeSelectorsKey";
const CFStringRef kCTFontFeatureSelectorIdentifierKey = "kCTFontFeatureSelectorIdentifierKey";
const CFStringRef kCTFontFeatureSelectorNameKey = "kCTFontFeatureSelectorNameKey";
const CFStringRef kCTFontFeatureSelectorDefaultKey = "kCTFontFeatureSelectorDefaultKey";
const CFStringRef kCTFontFeatureSelectorSettingKey = "kCTFontFeatureSelectorSettingKey";


CFArrayRef CTFontCopyFeatures(CTFontRef font)
{
  
}

CFArrayRef CTFontCopyFeatureSettings(CTFontRef font)
{
  
}


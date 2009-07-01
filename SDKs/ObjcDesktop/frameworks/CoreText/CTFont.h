/* 
 * CTFont.h
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

#include <CoreText/CTFontDescriptor.h>

#include <CoreGraphics/CGFont.h>
#include <CoreGraphics/CGPath.h>

typedef const struct __CTFont * CTFontRef;


extern const CFStringRef kCTFontCopyrightNameKey;
extern const CFStringRef kCTFontFamilyNameKey;
extern const CFStringRef kCTFontSubFamilyNameKey;
extern const CFStringRef kCTFontStyleNameKey;
extern const CFStringRef kCTFontUniqueNameKey;
extern const CFStringRef kCTFontFullNameKey;
extern const CFStringRef kCTFontVersionNameKey;
extern const CFStringRef kCTFontPostScriptNameKey;
extern const CFStringRef kCTFontTrademarkNameKey;
extern const CFStringRef kCTFontManufacturerNameKey;
extern const CFStringRef kCTFontDesignerNameKey;
extern const CFStringRef kCTFontDescriptionNameKey;
extern const CFStringRef kCTFontVendorURLNameKey;
extern const CFStringRef kCTFontDesignerURLNameKey;
extern const CFStringRef kCTFontLicenseNameKey;
extern const CFStringRef kCTFontLicenseURLNameKey;
extern const CFStringRef kCTFontSampleTextNameKey;
extern const CFStringRef kCTFontPostScriptCIDNameKey;


extern CTFontRef CTFontCreateWithName(CFStringRef name, CGFloat size, const CGAffineTransform *matrix);

extern CTFontRef CTFontCreateWithFontDescriptor(CTFontDescriptorRef descriptor, CGFloat size, const CGAffineTransform *matrix);


enum {	
    kCTFontOptionsDefault               = 0,
    kCTFontOptionsPreventAutoActivation = 1 << 0,
    kCTFontOptionsPreferSystemFont      = 1 << 2
};
typedef CFOptionFlags CTFontOptions;


enum {
    kCTFontNoFontType                           = -1,
    kCTFontUserFontType                         =  0,
    kCTFontUserFixedPitchFontType               =  1,
    kCTFontSystemFontType                       =  2,
    kCTFontEmphasizedSystemFontType             =  3,
    kCTFontSmallSystemFontType                  =  4,
    kCTFontSmallEmphasizedSystemFontType        =  5,
    kCTFontMiniSystemFontType                   =  6,
    kCTFontMiniEmphasizedSystemFontType         =  7,
    kCTFontViewsFontType                        =  8,
    kCTFontApplicationFontType                  =  9,
    kCTFontLabelFontType                        = 10,
    kCTFontMenuTitleFontType                    = 11,
    kCTFontMenuItemFontType                     = 12,
    kCTFontMenuItemMarkFontType                 = 13,
    kCTFontMenuItemCmdKeyFontType               = 14,
    kCTFontWindowTitleFontType                  = 15,
    kCTFontPushButtonFontType                   = 16,
    kCTFontUtilityWindowTitleFontType           = 17,
    kCTFontAlertHeaderFontType                  = 18,
    kCTFontSystemDetailFontType                 = 19,
    kCTFontEmphasizedSystemDetailFontType       = 20,
    kCTFontToolbarFontType                      = 21,
    kCTFontSmallToolbarFontType                 = 22,
    kCTFontMessageFontType                      = 23,
    kCTFontPaletteFontType                      = 24,
    kCTFontToolTipFontType                      = 25,
    kCTFontControlContentFontType               = 26
};
typedef int CTFontUIFontType;


extern CTFontRef CTFontCreateUIFontForLanguage(CTFontUIFontType uiType, CGFloat size, CFStringRef language);

extern CTFontRef CTFontCreateCopyWithAttributes(CTFontRef font, CGFloat size, const CGAffineTransform *matrix, CTFontDescriptorRef attributes);

extern CTFontRef CTFontCreateCopyWithSymbolicTraits(CTFontRef font, CGFloat size, const CGAffineTransform *matrix, CTFontSymbolicTraits symTraitValue, CTFontSymbolicTraits symTraitMask);

extern CTFontRef CTFontCreateCopyWithFamily(CTFontRef font, CGFloat size, const CGAffineTransform *matrix, CFStringRef family);

extern CTFontRef CTFontCreateForString(CTFontRef currentFont, CFStringRef string, CFRange range);

extern CTFontDescriptorRef CTFontCopyFontDescriptor(CTFontRef font);

extern CFTypeRef CTFontCopyAttribute(CTFontRef font, CFStringRef attribute);

extern CGFloat CTFontGetSize(CTFontRef font);

extern CGAffineTransform CTFontGetMatrix(CTFontRef font);

extern CTFontSymbolicTraits CTFontGetSymbolicTraits(CTFontRef font);

extern CFDictionaryRef CTFontCopyTraits(CTFontRef font);

extern CFStringRef CTFontCopyPostScriptName(CTFontRef font);

extern CFStringRef CTFontCopyFamilyName(CTFontRef font);

extern CFStringRef CTFontCopyFullName(CTFontRef font);

extern CFStringRef CTFontCopyDisplayName(CTFontRef font);

extern CFStringRef CTFontCopyName(CTFontRef font, CFStringRef nameKey);

extern CFStringRef CTFontCopyLocalizedName(CTFontRef font, CFStringRef nameKey, CFStringRef *language);

extern CFCharacterSetRef CTFontCopyCharacterSet(CTFontRef font);

extern CFStringEncoding CTFontGetStringEncoding(CTFontRef font);

extern CFArrayRef CTFontCopySupportedLanguages(CTFontRef font);

extern bool CTFontGetGlyphsForCharacters(CTFontRef font, const char characters[], CGGlyph glyphs[], CFIndex count);


extern CGFloat CTFontGetAscent(CTFontRef font);

extern CGFloat CTFontGetDescent(CTFontRef font);

extern CGFloat CTFontGetLeading(CTFontRef font);

extern int CTFontGetUnitsPerEm(CTFontRef font);

extern CFIndex CTFontGetGlyphCount(CTFontRef font);

extern CGRect CTFontGetBoundingBox(CTFontRef font);

extern CGFloat CTFontGetUnderlinePosition(CTFontRef font);

extern CGFloat CTFontGetUnderlineThickness(CTFontRef font);

extern CGFloat CTFontGetSlantAngle(CTFontRef font);

extern CGFloat CTFontGetCapHeight(CTFontRef font);

extern CGFloat CTFontGetXHeight(CTFontRef font);

extern CGGlyph CTFontGetGlyphWithName(CTFontRef font, CFStringRef glyphName);


extern CGRect CTFontGetBoundingRectsForGlyphs(CTFontRef font, CTFontOrientation orientation, const CGGlyph glyphs[], CGRect boundingRects[], CFIndex count);

extern double CTFontGetAdvancesForGlyphs(CTFontRef font, CTFontOrientation orientation, const CGGlyph glyphs[], CGSize advances[], CFIndex count);

extern void CTFontGetVerticalTranslationsForGlyphs(CTFontRef font, const CGGlyph glyphs[], CGSize translations[], CFIndex count);

extern CGPathRef CTFontCreatePathForGlyph(CTFontRef font, CGGlyph glyph, const CGAffineTransform *transform);


extern const CFStringRef kCTFontVariationAxisIdentifierKey;
extern const CFStringRef kCTFontVariationAxisMinimumValueKey;
extern const CFStringRef kCTFontVariationAxisMaximumValueKey;
extern const CFStringRef kCTFontVariationAxisDefaultValueKey;
extern const CFStringRef kCTFontVariationAxisNameKey;


extern CFArrayRef CTFontCopyVariationAxes(CTFontRef font);

extern CFDictionaryRef CTFontCopyVariation(CTFontRef font);


extern const CFStringRef kCTFontFeatureTypeIdentifierKey;
extern const CFStringRef kCTFontFeatureTypeNameKey;
extern const CFStringRef kCTFontFeatureTypeExclusiveKey;
extern const CFStringRef kCTFontFeatureTypeSelectorsKey;
extern const CFStringRef kCTFontFeatureSelectorIdentifierKey;
extern const CFStringRef kCTFontFeatureSelectorNameKey;
extern const CFStringRef kCTFontFeatureSelectorDefaultKey;
extern const CFStringRef kCTFontFeatureSelectorSettingKey;


extern CFArrayRef CTFontCopyFeatures(CTFontRef font);

extern CFArrayRef CTFontCopyFeatureSettings(CTFontRef font);


/* 
 * font.js
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
 
include('core_text/font_descriptor'){}
include('core_graphics/font'){}
include('core_graphics/path'){}

function CTFontRef()
{
    
};

var kCTFontCopyrightNameKey = "kCTFontCopyrightNameKey";
var kCTFontFamilyNameKey = "kCTFontFamilyNameKey";
var kCTFontSubFamilyNameKey = "kCTFontSubFamilyNameKey";
var kCTFontStyleNameKey = "kCTFontStyleNameKey";
var kCTFontUniqueNameKey = "kCTFontUniqueNameKey";
var kCTFontFullNameKey = "kCTFontFullNameKey";
var kCTFontVersionNameKey = "kCTFontVersionNameKey";
var kCTFontPostScriptNameKey = "kCTFontPostScriptNameKey";
var kCTFontTrademarkNameKey = "kCTFontTrademarkNameKey";
var kCTFontManufacturerNameKey = "kCTFontManufacturerNameKey";
var kCTFontDesignerNameKey = "kCTFontDesignerNameKey";
var kCTFontDescriptionNameKey = "kCTFontDescriptionNameKey";
var kCTFontVendorURLNameKey = "kCTFontVendorURLNameKey";
var kCTFontDesignerURLNameKey = "kCTFontDesignerURLNameKey";
var kCTFontLicenseNameKey = "kCTFontLicenseNameKey";
var kCTFontLicenseURLNameKey = "kCTFontLicenseURLNameKey";
var kCTFontSampleTextNameKey = "kCTFontSampleTextNameKey";
var kCTFontPostScriptCIDNameKey = "kCTFontPostScriptCIDNameKey";

var kCTFontVariationAxisIdentifierKey = "kCTFontVariationAxisIdentifierKey";
var kCTFontVariationAxisMinimumValueKey = "kCTFontVariationAxisMinimumValueKey";
var kCTFontVariationAxisMaximumValueKey = "kCTFontVariationAxisMaximumValueKey";
var kCTFontVariationAxisDefaultValueKey = "kCTFontVariationAxisDefaultValueKey";
var kCTFontVariationAxisNameKey = "kCTFontVariationAxisNameKey";

var kCTFontFeatureTypeIdentifierKey = "kCTFontFeatureTypeIdentifierKey";
var kCTFontFeatureTypeNameKey = "kCTFontFeatureTypeNameKey";
var kCTFontFeatureTypeExclusiveKey = "kCTFontFeatureTypeExclusiveKey";
var kCTFontFeatureTypeSelectorsKey = "kCTFontFeatureTypeSelectorsKey";
var kCTFontFeatureSelectorIdentifierKey = "kCTFontFeatureSelectorIdentifierKey";
var kCTFontFeatureSelectorNameKey = "kCTFontFeatureSelectorNameKey";
var kCTFontFeatureSelectorDefaultKey = "kCTFontFeatureSelectorDefaultKey";
var kCTFontFeatureSelectorSettingKey = "kCTFontFeatureSelectorSettingKey";

// CTFontOptions;	
var kCTFontOptionsDefault                       = 0;
var kCTFontOptionsPreventAutoActivation         = 1 << 0;
var kCTFontOptionsPreferSystemFont              = 1 << 2;

// CTFontUIFontType
var kCTFontNoFontType                           = -1;
var kCTFontUserFontType                         =  0;
var kCTFontUserFixedPitchFontType               =  1;
var kCTFontSystemFontType                       =  2;
var kCTFontEmphasizedSystemFontType             =  3;
var kCTFontSmallSystemFontType                  =  4;
var kCTFontSmallEmphasizedSystemFontType        =  5;
var kCTFontMiniSystemFontType                   =  6;
var kCTFontMiniEmphasizedSystemFontType         =  7;
var kCTFontViewsFontType                        =  8;
var kCTFontApplicationFontType                  =  9;
var kCTFontLabelFontType                        = 10;
var kCTFontMenuTitleFontType                    = 11;
var kCTFontMenuItemFontType                     = 12;
var kCTFontMenuItemMarkFontType                 = 13;
var kCTFontMenuItemCmdKeyFontType               = 14;
var kCTFontWindowTitleFontType                  = 15;
var kCTFontPushButtonFontType                   = 16;
var kCTFontUtilityWindowTitleFontType           = 17;
var kCTFontAlertHeaderFontType                  = 18;
var kCTFontSystemDetailFontType                 = 19;
var kCTFontEmphasizedSystemDetailFontType       = 20;
var kCTFontToolbarFontType                      = 21;
var kCTFontSmallToolbarFontType                 = 22;
var kCTFontMessageFontType                      = 23;
var kCTFontPaletteFontType                      = 24;
var kCTFontToolTipFontType                      = 25;
var kCTFontControlContentFontType               = 26;


function CTFontCreateWithName(name, size, matrix)
{
    
}

function CTFontCreateWithFontDescriptor(descriptor, size, matrix)
{
    
}

function CTFontCreateUIFontForLanguage(uiType, size, language){}

function CTFontCreateCopyWithAttributes(font, size, matrix, attributes){}

function CTFontCreateCopyWithSymbolicTraits(font, size, matrix, symTraitValue, symTraitMask){}

function CTFontCreateCopyWithFamily(font, size, matrix, family){}

function CTFontCreateForString(currentFont, string, range){}

function CTFontCopyFontDescriptor(font){}

function CTFontCopyAttribute(font, attribute){}

function CTFontGetSize(font){}

function CTFontGetMatrix(font){}

function CTFontGetSymbolicTraits(font){}

function CTFontCopyTraits(font){}

function CTFontCopyPostScriptName(font){}

function CTFontCopyFamilyName(font){}

function CTFontCopyFullName(font){}

function CTFontCopyDisplayName(font){}

function CTFontCopyName(font, nameKey){}

function CTFontCopyLocalizedName(font, nameKey, language){}

function CTFontCopyCharacterSet(font){}

function CTFontGetStringEncoding(font){}

function CTFontCopySupportedLanguages(font){}

function CTFontGetGlyphsForCharacters(font, characters, glyphs, count){}


function CTFontGetAscent(font){}

function CTFontGetDescent(font){}

function CTFontGetLeading(font){}

function CTFontGetUnitsPerEm(font){}

function CTFontGetGlyphCount(font){}

function CTFontGetBoundingBox(font){}

function CTFontGetUnderlinePosition(font){}

function CTFontGetUnderlineThickness(font){}

function CTFontGetSlantAngle(font){}

function CTFontGetCapHeight(font){}

function CTFontGetXHeight(font){}

function CTFontGetGlyphWithName(font, glyphName){}


function CTFontGetBoundingRectsForGlyphs(font, orientation, glyphs, boundingRects, count){}

function CTFontGetAdvancesForGlyphs(font, orientation, glyphs, advances, count){}

function CTFontGetVerticalTranslationsForGlyphs(font, glyphs, translations, count){}

function CTFontCreatePathForGlyph(font, glyph, transform){}


function CTFontCopyVariationAxes(font){}

function CTFontCopyVariation(font){}


function CTFontCopyFeatures(font){}

function CTFontCopyFeatureSettings(font){}


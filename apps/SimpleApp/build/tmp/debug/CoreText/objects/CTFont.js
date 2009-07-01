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
function CTFontCreateWithName(name,size,matrix)
{
var theFont = {};
return theFont;
}
function CTFontCreateWithFontDescriptor(descriptor,size,matrix)
{
}
function CTFontCreateUIFontForLanguage(uiType,size,language)
{
}
function CTFontCreateCopyWithAttributes(font,size,matrix,attributes)
{
}
function CTFontCreateCopyWithSymbolicTraits(font,size,matrix,symTraitValue,symTraitMask)
{
}
function CTFontCreateCopyWithFamily(font,size,matrix,family)
{
}
function CTFontCreateForString(currentFont,string,range)
{
}
function CTFontCopyFontDescriptor(font)
{
}
function CTFontCopyAttribute(font,attribute)
{
}
function CTFontGetSize(font)
{
}
function CTFontGetMatrix(font)
{
}
function CTFontGetSymbolicTraits(font)
{
}
function CTFontCopyTraits(font)
{
}
function CTFontCopyPostScriptName(font)
{
}
function CTFontCopyFamilyName(font)
{
}
function CTFontCopyFullName(font)
{
}
function CTFontCopyDisplayName(font)
{
}
function CTFontCopyName(font,nameKey)
{
}
function CTFontCopyLocalizedName(font,nameKey,language)
{
}
function CTFontCopyCharacterSet(font)
{
}
function CTFontGetStringEncoding(font)
{
}
function CTFontCopySupportedLanguages(font)
{
}
function CTFontGetGlyphsForCharacters(font,characters,glyphs,count)
{
}
function CTFontGetAscent(font)
{
}
function CTFontGetDescent(font)
{
}
function CTFontGetLeading(font)
{
}
function CTFontGetUnitsPerEm(font)
{
}
function CTFontGetGlyphCount(font)
{
}
function CTFontGetBoundingBox(font)
{
}
function CTFontGetUnderlinePosition(font)
{
}
function CTFontGetUnderlineThickness(font)
{
}
function CTFontGetSlantAngle(font)
{
}
function CTFontGetCapHeight(font)
{
}
function CTFontGetXHeight(font)
{
}
function CTFontGetGlyphWithName(font,glyphName)
{
}
function CTFontGetBoundingRectsForGlyphs(font,orientation,glyphs,boundingRects,count)
{
}
function CTFontGetAdvancesForGlyphs(font,orientation,glyphs,advances,count)
{
}
function CTFontGetVerticalTranslationsForGlyphs(font,glyphs,translations,count)
{
}
function CTFontCreatePathForGlyph(font,glyph,transform)
{
}
function CTFontCopyVariationAxes(font)
{
}
function CTFontCopyVariation(font)
{
}
function CTFontCopyFeatures(font)
{
}
function CTFontCopyFeatureSettings(font)
{
}

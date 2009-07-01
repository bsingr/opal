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
var kCTFontURLAttribute = "kCTFontURLAttribute";
var kCTFontNameAttribute = "kCTFontNameAttribute";
var kCTFontDisplayNameAttribute = "kCTFontDisplayNameAttribute";
var kCTFontFamilyNameAttribute = "kCTFontFamilyNameAttribute";
var kCTFontStyleNameAttribute = "kCTFontStyleNameAttribute";
var kCTFontTraitsAttribute = "kCTFontTraitsAttribute";
var kCTFontVariationAttribute = "kCTFontVariationAttribute";
var kCTFontSizeAttribute = "kCTFontSizeAttribute";
var kCTFontMatrixAttribute = "kCTFontMatrixAttribute";
var kCTFontCascadeListAttribute = "kCTFontCascadeListAttribute";
var kCTFontCharacterSetAttribute = "kCTFontCharacterSetAttribute";
var kCTFontLanguagesAttribute = "kCTFontLanguagesAttribute";
var kCTFontBaselineAdjustAttribute = "kCTFontBaselineAdjustAttribute";
var kCTFontMacintoshEncodingsAttribute = "kCTFontMacintoshEncodingsAttribute";
var kCTFontFeaturesAttribute = "kCTFontFeaturesAttribute";
var kCTFontFeatureSettingsAttribute = "kCTFontFeatureSettingsAttribute";
var kCTFontFixedAdvanceAttribute = "kCTFontFixedAdvanceAttribute";
var kCTFontOrientationAttribute = "kCTFontOrientationAttribute";
function CTFontDescriptorCreateWithNameAndSize(name,size)
{
}
function CTFontDescriptorCreateWithAttributes(attributes)
{
}
function CTFontDescriptorCreateCopyWithAttributes(original,attributes)
{
}
function CTFontDescriptorCreateCopyWithVariation(original,variationIdentifier,variationValue)
{
}
function CTFontDescriptorCreateCopyWithFeature(original,featureTypeIdentifier,featureSelectorIdentifier)
{
}
function CTFontDescriptorCreateMatchingFontDescriptors(descriptor,mandatoryAttributes)
{
}
function CTFontDescriptorCreateMatchingFontDescriptor(descriptor,mandatoryAttributes)
{
}
function CTFontDescriptorCopyAttributes(descriptor)
{
}
function CTFontDescriptorCopyAttribute(descriptor,attribute)
{
}
function CTFontDescriptorCopyLocalizedAttribute(descriptor,attribute,language)
{
}
var kCTFontSymbolicTrait = "kCTFontSymbolicTrait";
var kCTFontWeightTrait = "kCTFontWeightTrait";
var kCTFontWidthTrait = "kCTFontWidthTrait";
var kCTFontSlantTrait = "kCTFontSlantTrait";
var kCTFrameProgressionAttributeName = "kCTFrameProgressionAttributeName";
function CTFrameGetStringRange(frame)
{
}
function CTFrameGetVisibleStringRange(frame)
{
}
function CTFrameGetPath(frame)
{
}
function CTFrameGetFrameAttributes(frame)
{
}
function CTFrameGetLines(frame)
{
}
function CTFrameGetLineOrigins(frame,range,origins)
{
}
function CTFrameDraw(frame,context)
{
}
function CTFramesetterCreateWithAttributedString(string)
{
}
function CTFramesetterCreateFrame(framesetter,stringRange,path,frameAttributes)
{
}
function CTFramesetterGetTypesetter(framesetter)
{
}
function CTFramesetterSuggestFrameSizeWithConstraints(framesetter,stringRange,frameAttributes,constraints,fitRange)
{
}
function CTGlyphInfoCreateWithGlyphName(glyphName,font,baseString)
{
}
function CTGlyphInfoCreateWithGlyph(glyph,font,baseString)
{
}
function CTGlyphInfoCreateWithCharacterIdentifier(cid,collection,baseString)
{
}
function CTGlyphInfoGetGlyphName(glyphInfo)
{
}
function CTGlyphInfoGetCharacterIdentifier(glyphInfo)
{
}
function CTGlyphInfoGetCharacterCollection(glyphInfo)
{
}
function CTLineCreateWithAttributedString(string)
{
}
function CTLineCreateTruncatedLine(line,width,truncationType,truncationToken)
{
}
function CTLineCreateJustifiedLine(line,justificationFactor,justificationWidth)
{
}
function CTLineGetGlyphCount(line)
{
}
function CTLineGetGlyphRuns(line)
{
}
function CTLineGetStringRange(line)
{
}
function CTLineGetPenOffsetForFlush(line,flushFactor,flushWidth)
{
}
function CTLineDraw(line,context)
{
}
function CTLineGetImageBounds(line,context)
{
}
function CTLineGetTypographicBounds(line,ascent,descent,leading)
{
}
function CTLineGetTrailingWhitespaceWidth(line)
{
}
function CTLineGetStringIndexForPosition(line,position)
{
}
function CTLineGetOffsetForStringIndex(line,charIndex,secondaryOffset)
{
}
function CTParagraphStyleCreate(settings,settingCount)
{
}
function CTParagraphStyleCreateCopy(paragraphStyle)
{
}
function CTParagraphStyleGetValueForSpecifier(paragraphStyle,spec,valueBufferSize,valueBuffer)
{
}
function CTRunGetGlyphCount(run)
{
}
function CTRunGetAttributes(run)
{
}
function CTRunGetStatus(run)
{
}
function d()
{
}
function CTRunGetGlyphs(run,range,buffer)
{
}
function d()
{
}
function CTRunGetPositions(run,range,buffer)
{
}
function d()
{
}
function CTRunGetAdvances(run,range,buffer)
{
}
function d()
{
}
function CTRunGetStringIndices(run,range,buffer)
{
}
function CTRunGetStringRange(run)
{
}
function CTRunGetTypographicBounds(run,range,ascent,descent,leading)
{
}
function CTRunGetImageBounds(run,context,range)
{
}
function CTRunGetTextMatrix(run)
{
}
function CTRunDraw(run,context,range)
{
}
var kCTFontAttributeName = "kCTFontAttributeName";
var kCTForegroundColorFromContextAttributeName = "kCTForegroundColorFromContextAttributeName";
var kCTKernAttributeName = "kCTKernAttributeName";
var kCTLigatureAttributeName = "kCTLigatureAttributeName";
var kCTForegroundColorAttributeName = "kCTForegroundColorAttributeName";
var kCTParagraphStyleAttributeName = "kCTParagraphStyleAttributeName";
var kCTStrokeWidthAttributeName = "kCTStrokeWidthAttributeName";
var kCTStrokeColorAttributeName = "kCTStrokeColorAttributeName";
var kCTUnderlineStyleAttributeName = "kCTUnderlineStyleAttributeName";
var kCTSuperscriptAttributeName = "kCTSuperscriptAttributeName";
var kCTUnderlineColorAttributeName = "kCTUnderlineColorAttributeName";
var kCTVerticalFormsAttributeName = "kCTVerticalFormsAttributeName";
var kCTGlyphInfoAttributeName = "kCTGlyphInfoAttributeName";
var kCTCharacterShapeAttributeName = "kCTCharacterShapeAttributeName";
var kCTTabColumnTerminatorsAttributeName = "kCTTabColumnTerminatorsAttributeName";
function CTTextTabCreate(alignment,location,options)
{
}
function CTTextTabGetAlignment(tab)
{
}
function CTTextTabGetLocation(tab)
{
}
function CTTextTabGetOptions(tab)
{
}
var kCTTypesetterOptionDisableBidiProcessing = "kCTTypesetterOptionDisableBidiProcessing";
var kCTTypesetterOptionForcedEmbeddingLevel = "kCTTypesetterOptionForcedEmbeddingLevel";
function CTTypesetterCreateWithAttributedString(string)
{
}
function CTTypesetterCreateWithAttributedStringAndOptions(string,options)
{
}
function CTTypesetterCreateLine(typesetter,stringRange)
{
}
function CTTypesetterSuggestLineBreak(typesetter,startIndex,width)
{
}
function CTTypesetterSuggestClusterBreak(typesetter,startIndex,width)
{
}
/* 
 * CTVienna.js
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

// ==================================
// = Core Text additions for Vienna =
// ==================================

// global system collection of (loaded) font faces
var __bootstrap_font_faces = {};

function CTViennaLoadFont(font)
{
    var family = font.familyName.toLowerCase();
    
    if(!__bootstrap_font_faces[family])
        __bootstrap_font_faces[family] = {};
    
    if(!__bootstrap_font_faces[family][font.cssFontWeight])
        __bootstrap_font_faces[family][font.cssFontWeight] = {};

    var face = __bootstrap_font_faces[familyName][font.cssFontWeight][font.cssFontStyle] = font;
	face.loaded = true;
}

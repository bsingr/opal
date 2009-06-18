/* 
 * CTFontDescriptor.c
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

#include "CTFontDescriptor.h"

const CFStringRef kCTFontURLAttribute = "kCTFontURLAttribute";
const CFStringRef kCTFontNameAttribute = "kCTFontNameAttribute";
const CFStringRef kCTFontDisplayNameAttribute = "kCTFontDisplayNameAttribute";
const CFStringRef kCTFontFamilyNameAttribute = "kCTFontFamilyNameAttribute";
const CFStringRef kCTFontStyleNameAttribute = "kCTFontStyleNameAttribute";
const CFStringRef kCTFontTraitsAttribute = "kCTFontTraitsAttribute";
const CFStringRef kCTFontVariationAttribute = "kCTFontVariationAttribute";
const CFStringRef kCTFontSizeAttribute = "kCTFontSizeAttribute";
const CFStringRef kCTFontMatrixAttribute = "kCTFontMatrixAttribute";
const CFStringRef kCTFontCascadeListAttribute = "kCTFontCascadeListAttribute";
const CFStringRef kCTFontCharacterSetAttribute = "kCTFontCharacterSetAttribute";
const CFStringRef kCTFontLanguagesAttribute = "kCTFontLanguagesAttribute";
const CFStringRef kCTFontBaselineAdjustAttribute = "kCTFontBaselineAdjustAttribute";
const CFStringRef kCTFontMacintoshEncodingsAttribute = "kCTFontMacintoshEncodingsAttribute";
const CFStringRef kCTFontFeaturesAttribute = "kCTFontFeaturesAttribute";
const CFStringRef kCTFontFeatureSettingsAttribute = "kCTFontFeatureSettingsAttribute";
const CFStringRef kCTFontFixedAdvanceAttribute = "kCTFontFixedAdvanceAttribute";
const CFStringRef kCTFontOrientationAttribute = "kCTFontOrientationAttribute";


CTFontDescriptorRef CTFontDescriptorCreateWithNameAndSize(CFStringRef name, CGFloat size)
{
    
}

CTFontDescriptorRef CTFontDescriptorCreateWithAttributes(CFDictionaryRef attributes)
{
    
}

CTFontDescriptorRef CTFontDescriptorCreateCopyWithAttributes(CTFontDescriptorRef original, CFDictionaryRef attributes)
{
    
}

CTFontDescriptorRef CTFontDescriptorCreateCopyWithVariation(CTFontDescriptorRef original, CFNumberRef variationIdentifier, CGFloat variationValue)
{
    
}

CTFontDescriptorRef CTFontDescriptorCreateCopyWithFeature(CTFontDescriptorRef original, CFNumberRef featureTypeIdentifier, CFNumberRef featureSelectorIdentifier)
{
    
}

CFArrayRef CTFontDescriptorCreateMatchingFontDescriptors(CTFontDescriptorRef descriptor, CFSetRef mandatoryAttributes)
{
    
}

CTFontDescriptorRef CTFontDescriptorCreateMatchingFontDescriptor(CTFontDescriptorRef descriptor, CFSetRef mandatoryAttributes)
{
    
}

CFDictionaryRef CTFontDescriptorCopyAttributes(CTFontDescriptorRef descriptor)
{
    
}

CFTypeRef CTFontDescriptorCopyAttribute(CTFontDescriptorRef descriptor, CFStringRef attribute)
{
    
}

CFTypeRef CTFontDescriptorCopyLocalizedAttribute(CTFontDescriptorRef descriptor, CFStringRef attribute, CFStringRef *language)
{
    
}

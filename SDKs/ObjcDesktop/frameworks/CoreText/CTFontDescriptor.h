/* 
 * CTFontDescriptor.h
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

#include <CoreText/CTFontTraits.h>

#include <CoreFoundation/CFArray.h>
#include <CoreFoundation/CFCharacterSet.h>
#include <CoreFoundation/CFData.h>
#include <CoreFoundation/CFDictionary.h>
#include <CoreFoundation/CFSet.h>
#include <CoreGraphics/CGAffineTransform.h>

typedef const struct __CTFontDescriptor *CTFontDescriptorRef;


extern const CFStringRef kCTFontURLAttribute;
extern const CFStringRef kCTFontNameAttribute;
extern const CFStringRef kCTFontDisplayNameAttribute;
extern const CFStringRef kCTFontFamilyNameAttribute;
extern const CFStringRef kCTFontStyleNameAttribute;
extern const CFStringRef kCTFontTraitsAttribute;
extern const CFStringRef kCTFontVariationAttribute;
extern const CFStringRef kCTFontSizeAttribute;
extern const CFStringRef kCTFontMatrixAttribute;
extern const CFStringRef kCTFontCascadeListAttribute;
extern const CFStringRef kCTFontCharacterSetAttribute;
extern const CFStringRef kCTFontLanguagesAttribute;
extern const CFStringRef kCTFontBaselineAdjustAttribute;
extern const CFStringRef kCTFontMacintoshEncodingsAttribute;
extern const CFStringRef kCTFontFeaturesAttribute;
extern const CFStringRef kCTFontFeatureSettingsAttribute;
extern const CFStringRef kCTFontFixedAdvanceAttribute;
extern const CFStringRef kCTFontOrientationAttribute;

enum {
    kCTFontDefaultOrientation       = 0,
    kCTFontHorizontalOrientation    = 1,
    kCTFontVerticalOrientation      = 2
};
typedef int CTFontOrientation;


extern CTFontDescriptorRef CTFontDescriptorCreateWithNameAndSize(CFStringRef name, CGFloat size);

extern CTFontDescriptorRef CTFontDescriptorCreateWithAttributes(CFDictionaryRef attributes);

extern CTFontDescriptorRef CTFontDescriptorCreateCopyWithAttributes(CTFontDescriptorRef original, CFDictionaryRef attributes);

extern CTFontDescriptorRef CTFontDescriptorCreateCopyWithVariation(CTFontDescriptorRef original, CFNumberRef variationIdentifier, CGFloat variationValue);

extern CTFontDescriptorRef CTFontDescriptorCreateCopyWithFeature(CTFontDescriptorRef original, CFNumberRef featureTypeIdentifier, CFNumberRef featureSelectorIdentifier);

extern CFArrayRef CTFontDescriptorCreateMatchingFontDescriptors(CTFontDescriptorRef descriptor, CFSetRef mandatoryAttributes);

extern CTFontDescriptorRef CTFontDescriptorCreateMatchingFontDescriptor(CTFontDescriptorRef descriptor, CFSetRef mandatoryAttributes);

extern CFDictionaryRef CTFontDescriptorCopyAttributes(CTFontDescriptorRef descriptor);

extern CFTypeRef CTFontDescriptorCopyAttribute(CTFontDescriptorRef descriptor, CFStringRef attribute);

extern CFTypeRef CTFontDescriptorCopyLocalizedAttribute(CTFontDescriptorRef descriptor, CFStringRef attribute, CFStringRef *language);

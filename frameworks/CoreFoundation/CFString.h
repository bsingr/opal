// 
//  CFString.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>
#import <CoreFoundation/CFArray.h>
#import <CoreFoundation/CFData.h>
#import <CoreFoundation/CFDictionary.h>
#import <CoreFoundation/CFLocale.h>

enum {	
    kCFCompareCaseInsensitive       = 1,	
    kCFCompareBackwards             = 4,
    kCFCompareAnchored              = 8,
    kCFCompareNonliteral            = 16,
    kCFCompareLocalized             = 32,
    kCFCompareNumerically           = 64,
    kCFCompareDiacriticInsensitive  = 128,
    kCFCompareWidthInsensitive      = 256,
    kCFCompareForcedOrdering        = 512
};
typedef CFOptionFlags CFStringCompareFlags;


extern CFStringRef CFStringCreateWithSubstring(CFStringRef str, CFRange range);
extern CFStringRef CFStringCreateCopy(CFStringRef theString);

extern CFStringRef CFStringCreateWithFormat (CFDictionaryRef formatOptions, CFStringRef format, ...);
extern CFStringRef CFStringCreateWithFormatAndArguments(CFDictionaryRef formatOptions, CFStringRef format, void *arguments);

extern CFMutableStringRef CFStringCreateMutable(CFIndex maxLength);
extern CFMutableStringRef CFStringCreateMutableCopy(CFIndex maxLength, CFStringRef theString);

extern CFIndex CFStringGetLength(CFStringRef theString);

extern CFStringRef CFStringGetCharacterAtIndex(CFStringRef theString, CFIndex idx);
extern void CFStringGetCharacters(CFStringRef theString, CFRange theRange, char *buffer);

extern CFStringRef CFStringCreateFromExternalRepresentation(CFDataRef theData);
extern CFDataRef CFStringCreateExternalRepresentation(CFStringRef theString);

extern CFComparisonResult CFStringCompareWithOptionsAndLocale(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions, CFLocaleRef locale);
extern CFComparisonResult CFStringCompareWithOptions(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions);
extern CFComparisonResult CFStringCompare(CFStringRef theString1, CFStringRef theString2, CFOptionFlags compareOptions);

extern bool CFStringFindWithOptionsAndLocale(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFLocaleRef locale, CFRange *result);
extern bool CFStringFindWithOptions(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFRange *result);

extern CFArrayRef CFStringCreateArrayWithFindResults(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags compareOptions);
extern CFRange CFStringFind(CFStringRef theString, CFStringRef stringToFind, CFOptionFlags compareOptions);

extern bool CFStringHasPrefix(CFStringRef theString, CFStringRef prefix);
extern bool CFStringHasSuffix(CFStringRef theString, CFStringRef suffix);

extern CFStringRef CFStringCreateByCombiningStrings(CFArrayRef theArray, CFStringRef separatorString);
extern CFArrayRef CFStringCreateArrayBySeparatingStrings(CFStringRef theString, CFStringRef separatorString);

extern int CFStringGetIntValue(CFStringRef str);
extern double CFStringGetDoubleValue(CFStringRef str);



extern void CFStringAppend(CFMutableStringRef theString, CFStringRef appendedString);
extern void CFStringAppendFormat(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, ...);
extern void CFStringAppendFormatAndArguments(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, void *arguments);

extern void CFStringInsert(CFMutableStringRef str, CFIndex idx, CFStringRef insertedStr);
extern void CFStringDelete(CFMutableStringRef theString, CFRange range);
extern void CFStringReplace(CFMutableStringRef theString, CFRange range, CFStringRef replacement);
extern void CFStringReplaceAll(CFMutableStringRef theString, CFStringRef replacement);

extern CFIndex CFStringFindAndReplace(CFMutableStringRef theString, CFStringRef stringToFind, CFStringRef replacementString, CFRange rangeToSearch, CFOptionFlags compareOptions);


extern void CFStringPad(CFMutableStringRef theString, CFStringRef padString, CFIndex length, CFIndex indexIntoPad);
extern void CFStringTrim(CFMutableStringRef theString, CFStringRef trimString);
extern void CFStringTrimWhitespace(CFMutableStringRef theString);
extern void CFStringLowercase(CFMutableStringRef theString, CFLocaleRef locale);
extern void CFStringUppercase(CFMutableStringRef theString, CFLocaleRef locale);
extern void CFStringCapitalize(CFMutableStringRef theString, CFLocaleRef locale);

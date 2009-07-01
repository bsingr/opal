// 
//  CFString.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// enum {   
//     kCFCompareCaseInsensitive       = 1, 
//     kCFCompareBackwards             = 4,
//     kCFCompareAnchored              = 8,
//     kCFCompareNonliteral            = 16,
//     kCFCompareLocalized             = 32,
//     kCFCompareNumerically           = 64,
//     kCFCompareDiacriticInsensitive  = 128,
//     kCFCompareWidthInsensitive      = 256,
//     kCFCompareForcedOrdering        = 512
// };
// typedef CFOptionFlags CFStringCompareFlags;


// extern CFStringRef CFStringCreateWithSubstring(CFStringRef str, CFRange range);
//
function CFStringCreateWithSubstring(str, range)
{
    
}

// extern CFStringRef CFStringCreateCopy(CFStringRef theString);
// 
function CFStringCreateCopy(theString)
{
    return new String(theString);
}

// extern CFStringRef CFStringCreateWithFormat (CFDictionaryRef formatOptions, CFStringRef format, ...);
// 
function CFStringCreateWithFormat(formatOptions, format, args)
{
    
}

// extern CFStringRef CFStringCreateWithFormatAndArguments(CFDictionaryRef formatOptions, CFStringRef format, void *arguments);
// 
function CFStringCreateWithFormatAndArguments(formatOptions, format, arguments)
{
    
}

// extern CFMutableStringRef CFStringCreateMutable(CFIndex maxLength);
// 
function CFStringCreateMutable(maxLength)
{
    return new String("");
}

// extern CFMutableStringRef CFStringCreateMutableCopy(CFIndex maxLength, CFStringRef theString);
// 
function CFStringCreateMutableCopy(maxLength, theString)
{
    return new String(theString);
}

// extern CFIndex CFStringGetLength(CFStringRef theString);
// 
function CFStringGetLength(theString)
{
    return theString.length;
}

// extern CFStringRef CFStringGetCharacterAtIndex(CFStringRef theString, CFIndex idx);
// 
function CFStringGetCharacterAtIndex(theString, idx)
{
    return theString.charAt(idx);
}

// extern void CFStringGetCharacters(CFStringRef theString, CFRange theRange, char *buffer);
// 
function CFStringGetCharacters(theString, theRange, buffer)
{
    
}

// extern CFStringRef CFStringCreateFromExternalRepresentation(CFDataRef theData)
// 
function CFStringCreateFromExternalRepresentation(theData)
{
    
}

// extern CFDataRef CFStringCreateExternalRepresentation(CFStringRef theString);
// 
function CFStringCreateExternalRepresentation(theString)
{
    
}

// extern CFComparisonResult CFStringCompareWithOptionsAndLocale(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions, CFLocaleRef locale);
// 
function CFStringCompareWithOptionsAndLocale(theString1, theString2, rangeToCompare, compareOptions, locale)
{
    
}

// extern CFComparisonResult CFStringCompareWithOptions(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions);
// 
function CFStringComapreWithOptions(theString1, theString2, rangeToComapre, compareOptions)
{
    
}

// extern CFComparisonResult CFStringCompare(CFStringRef theString1, CFStringRef theString2, CFOptionFlags compareOptions);
// 
function CFStringCompare(theString1, theString2, compareOptions)
{
    
}

// extern bool CFStringFindWithOptionsAndLocale(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFLocaleRef locale, CFRange *result);
// 
function CFStringFindWithOptionsAndLocale(theString, stringToFind, rangeToSearch, searchOptions, locale, result)
{
    
}

// extern bool CFStringFindWithOptions(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFRange *result);
// 
function CFStringFindWithOptions(theString, stringToFind, rangeToSearch, searchOptions, result)
{
    
}

// extern CFArrayRef CFStringCreateArrayWithFindResults(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags compareOptions);
// 
function CFStringCreateArrayWithFindResults(theString, stringToFind, rangeToSearch, compareOptions)
{
    
}

// extern CFRange CFStringFind(CFStringRef theString, CFStringRef stringToFind, CFOptionFlags compareOptions);
// 
function CFStringFind(theString, stringToFind, compareOptions)
{
    
}

// extern bool CFStringHasPrefix(CFStringRef theString, CFStringRef prefix);
// 
function CFStringHasPrefix(theString, prefix)
{
    
}

// extern bool CFStringHasSuffix(CFStringRef theString, CFStringRef suffix);
// 
function CFStringHasSuffix(theString, suffix)
{
    
}

// extern CFStringRef CFStringCreateByCombiningStrings(CFArrayRef theArray, CFStringRef separatorString);
// 
function CFStringCreateByCombiningStrings(theArray, separatorString)
{
    
}

// extern CFArrayRef CFStringCreateArrayBySeparatingStrings(CFStringRef theString, CFStringRef separatorString);
// 
function CFStringCreateArrayBySeparatingStrings(theString, separatorString)
{
    
}

// extern int CFStringGetIntValue(CFStringRef str);
// 
function CFStringGetIntValue(str)
{
    
}

// extern double CFStringGetDoubleValue(CFStringRef str);
// 
function CFStringGetDoubleValue(str)
{
    
}

// extern void CFStringAppend(CFMutableStringRef theString, CFStringRef appendedString);
// 
function CFStringAppend(theString, appendedString)
{
    theString = theString + appendedString;
}

function CFStringByAppendingStrings(theFirst, theSecond)
{
    return theFirst + theSecond;
}

// extern void CFStringAppendFormat(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, ...);
// 
function CFStringAppendFormat(theString, formatOptions, format, arguments)
{
    
}

// extern void CFStringAppendFormatAndArguments(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, void *arguments);
// 
function CFStringAppendFormatAndArguments(theString, formatOptions, format, arguments)
{
    
}

// extern void CFStringInsert(CFMutableStringRef str, CFIndex idx, CFStringRef insertedStr);
// 
function CFStringInsert(str, idx, insertedString)
{
    
}

// extern void CFStringDelete(CFMutableStringRef theString, CFRange range);
// 
function CFStringDelete(theString, range)
{
    
}

// extern void CFStringReplace(CFMutableStringRef theString, CFRange range, CFStringRef replacement);
// 
function CFStringReplace(theString, range, replacement)
{
    
}

// extern void CFStringReplaceAll(CFMutableStringRef theString, CFStringRef replacement);
// 
function CFStringReplaceAll(theString, replacement)
{
    
}

// extern CFIndex CFStringFindAndReplace(CFMutableStringRef theString, CFStringRef stringToFind, CFStringRef replacementString, CFRange rangeToSearch, CFOptionFlags compareOptions);
// 
function CFStringFindAndReplace(theString, stringToFind, replacementString, rangeToSearch, compareOptions)
{
    
}

// extern void CFStringPad(CFMutableStringRef theString, CFStringRef padString, CFIndex length, CFIndex indexIntoPad);
// 
function CFStringPad(theString, padString, length, lengthIntoPad)
{
    
}

// extern void CFStringTrim(CFMutableStringRef theString, CFStringRef trimString);
// 
function CFStringTrim(theString, trimString)
{
    
}

// extern void CFStringTrimWhitespace(CFMutableStringRef theString);
// 
function CFStringTrimWhitespace(theString)
{
    
}

// extern void CFStringLowercase(CFMutableStringRef theString, CFLocaleRef locale);
// 
function CFStringLowecase(theString, locale)
{
    
}

// extern void CFStringUppercase(CFMutableStringRef theString, CFLocaleRef locale);
// 
function CFStringUppercase(theStirng, locale)
{
    
}

// extern void CFStringCapitalize(CFMutableStringRef theString, CFLocaleRef locale);
// 
function CFStringCapitalize(theString, locale)
{
    return theString.charAt(0).toUpperCase() + theString.substr(1);
}

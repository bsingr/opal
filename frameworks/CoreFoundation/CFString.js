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
var CFStringCreateWithSubstring = function(str, range)
{
    
}

// extern CFStringRef CFStringCreateCopy(CFStringRef theString);
// 
var CFStringCreateCopy = function(theString)
{
    return new String(theString);
}

// extern CFStringRef CFStringCreateWithFormat (CFDictionaryRef formatOptions, CFStringRef format, ...);
// 
var CFStringCreateWithFormat = function(formatOptions, format, args)
{
    
}

// extern CFStringRef CFStringCreateWithFormatAndArguments(CFDictionaryRef formatOptions, CFStringRef format, void *arguments);
// 
var CFStringCreateWithFormatAndArguments = function(formatOptions, format, arguments)
{
    
}

// extern CFMutableStringRef CFStringCreateMutable(CFIndex maxLength);
// 
var CFStringCreateMutable = function(maxLength)
{
    return new String("");
}

// extern CFMutableStringRef CFStringCreateMutableCopy(CFIndex maxLength, CFStringRef theString);
// 
var CFStringCreateMutableCopy = function(maxLength, theString)
{
    return new String(theString);
}

// extern CFIndex CFStringGetLength(CFStringRef theString);
// 
var CFStringGetLength = function(theString)
{
    return theString.length;
}

// extern CFStringRef CFStringGetCharacterAtIndex(CFStringRef theString, CFIndex idx);
// 
var CFStringGetCharacterAtIndex = function(theString, idx)
{
    return theString.charAt(idx);
}

// extern void CFStringGetCharacters(CFStringRef theString, CFRange theRange, char *buffer);
// 
var CFStringGetCharacters = function(theString, theRange, buffer)
{
    
}

// extern CFStringRef CFStringCreateFromExternalRepresentation(CFDataRef theData)
// 
var CFStringCreateFromExternalRepresentation = function(theData)
{
    
}

// extern CFDataRef CFStringCreateExternalRepresentation(CFStringRef theString);
// 
var CFStringCreateExternalRepresentation = function(theString)
{
    
}

// extern CFComparisonResult CFStringCompareWithOptionsAndLocale(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions, CFLocaleRef locale);
// 
var CFStringCompareWithOptionsAndLocale = function(theString1, theString2, rangeToCompare, compareOptions, locale)
{
    
}

// extern CFComparisonResult CFStringCompareWithOptions(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions);
// 
var CFStringComapreWithOptions = function(theString1, theString2, rangeToComapre, compareOptions)
{
    
}

// extern CFComparisonResult CFStringCompare(CFStringRef theString1, CFStringRef theString2, CFOptionFlags compareOptions);
// 
var CFStringCompare = function(theString1, theString2, compareOptions)
{
    
}

// extern bool CFStringFindWithOptionsAndLocale(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFLocaleRef locale, CFRange *result);
// 
var CFStringFindWithOptionsAndLocale = function(theString, stringToFind, rangeToSearch, searchOptions, locale, result)
{
    
}

// extern bool CFStringFindWithOptions(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFRange *result);
// 
var CFStringFindWithOptions = function(theString, stringToFind, rangeToSearch, searchOptions, result)
{
    
}

// extern CFArrayRef CFStringCreateArrayWithFindResults(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags compareOptions);
// 
var CFStringCreateArrayWithFindResults = function(theString, stringToFind, rangeToSearch, compareOptions)
{
    
}

// extern CFRange CFStringFind(CFStringRef theString, CFStringRef stringToFind, CFOptionFlags compareOptions);
// 
var CFStringFind = function(theString, stringToFind, compareOptions)
{
    
}

// extern bool CFStringHasPrefix(CFStringRef theString, CFStringRef prefix);
// 
var CFStringHasPrefix = function(theString, prefix)
{
    
}

// extern bool CFStringHasSuffix(CFStringRef theString, CFStringRef suffix);
// 
var CFStringHasSuffix = function(theString, suffix)
{
    
}

// extern CFStringRef CFStringCreateByCombiningStrings(CFArrayRef theArray, CFStringRef separatorString);
// 
var CFStringCreateByCombiningStrings = function(theArray, separatorString)
{
    
}

// extern CFArrayRef CFStringCreateArrayBySeparatingStrings(CFStringRef theString, CFStringRef separatorString);
// 
var CFStringCreateArrayBySeparatingStrings = function(theString, separatorString)
{
    
}

// extern int CFStringGetIntValue(CFStringRef str);
// 
var CFStringGetIntValue = function(str)
{
    
}

// extern double CFStringGetDoubleValue(CFStringRef str);
// 
var CFStringGetDoubleValue = function(str)
{
    
}

// extern void CFStringAppend(CFMutableStringRef theString, CFStringRef appendedString);
// 
var CFStringAppend = function(theString, appendedString)
{
    
}

// extern void CFStringAppendFormat(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, ...);
// 
var CFStringAppendFormat = function(theString, formatOptions, format, arguments)
{
    
}

// extern void CFStringAppendFormatAndArguments(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, void *arguments);
// 
var CFStringAppendFormatAndArguments = function(theString, formatOptions, format, arguments)
{
    
}

// extern void CFStringInsert(CFMutableStringRef str, CFIndex idx, CFStringRef insertedStr);
// 
var CFStringInsert = function(str, idx, insertedString)
{
    
}

// extern void CFStringDelete(CFMutableStringRef theString, CFRange range);
// 
var CFStringDelete = function(theString, range)
{
    
}

// extern void CFStringReplace(CFMutableStringRef theString, CFRange range, CFStringRef replacement);
// 
var CFStringReplace = function(theString, range, replacement)
{
    
}

// extern void CFStringReplaceAll(CFMutableStringRef theString, CFStringRef replacement);
// 
var CFStringReplaceAll = function(theString, replacement)
{
    
}

// extern CFIndex CFStringFindAndReplace(CFMutableStringRef theString, CFStringRef stringToFind, CFStringRef replacementString, CFRange rangeToSearch, CFOptionFlags compareOptions);
// 
var CFStringFindAndReplace = function(theString, stringToFind, replacementString, rangeToSearch, compareOptions)
{
    
}

// extern void CFStringPad(CFMutableStringRef theString, CFStringRef padString, CFIndex length, CFIndex indexIntoPad);
// 
var CFStringPad = function(theString, padString, length, lengthIntoPad)
{
    
}

// extern void CFStringTrim(CFMutableStringRef theString, CFStringRef trimString);
// 
var CFStringTrim = function(theString, trimString)
{
    
}

// extern void CFStringTrimWhitespace(CFMutableStringRef theString);
// 
var CFStringTrimWhitespace = function(theString)
{
    
}

// extern void CFStringLowercase(CFMutableStringRef theString, CFLocaleRef locale);
// 
var CFStringLowecase = function(theString, locale)
{
    
}

// extern void CFStringUppercase(CFMutableStringRef theString, CFLocaleRef locale);
// 
var CFStringUppercase = function(theStirng, locale)
{
    
}

// extern void CFStringCapitalize(CFMutableStringRef theString, CFLocaleRef locale);
// 
var CFStringCapitalize = function(theString, locale)
{
    
}

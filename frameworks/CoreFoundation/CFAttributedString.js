// 
//  CFAttributedString.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFAttributedStringRef CFAttributedStringCreate(CFStringRef str, CFDictionaryRef attributes);
// 
var CFAttributedStringCreate = function(str, attributes)
{
    
}

// extern CFAttributedStirngRef CFAttributedStringCreateWithSubstring(CFAttributedStringRef aStr, CFRange range);
// 
var CFAttributedStringCreateWithSubstring = function(aStr, range)
{
    
}

// extern CFAttributedStringRef CFAttributedStringCreateCopy(CFAttributedStringRef aStr);
// 
var CFAttributedStringCreateCopy = function(aStr)
{
    
}

// extern CFStringRef CFAttributedStringGetString(CFAttributedStringRef aStr);
// 
var CFAttributedStringGetString = function(aStr)
{
    
}

// extern CFIndex CFAttributedStringGetLength(CFAttributedStringRef aStr);
// 
var CFAttributedStringGetLength = function(aStr)
{
    
}

// extern CFDictionaryRef CFAttributedStringGetAttributes(CFAttributedStringRef aStr, CFIndex loc, CFRange *effectiveRange);
// 
var CFAttributedStringGetAttributes = function(aStr, loc, effectiveRange)
{
    
}

// extern CFTypeRef CFAttributedStringGetAttribute(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange *effectiveRange);
// 
var CFAttributedStringGetAttribute = function(aStr, loc, attrName, effectiveRange)
{
    
}

// extern CFDictionaryRef CFAttributedStringGetAttributesAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFRange inRange, CFRange *longestEffectiveRange);
// 
var CFAttributedStringGetAttributesAndLongestEffectiveRange = function(aStr, loc, inRange, longestEffectiveRange)
{
    
}

// extern CFTypeRef CFAttributedStringGetAttributeAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange inRange, CFRange *longestEffectiveRange);
// 
var CFAttributedStringGetAttributeAndLongestEffectiveRange = function(aStr, loc, attrName, inRange, longestEffectiveRange)
{
    
}

// extern CFMutableAttributedStringRef CFAttributedStringCreateMutableCopy(CFIndex maxLength, CFAttributedStringRef aStr);
// 
var CFAttributedStringCreateMutableCopy = function(maxLength, aStr)
{
    
}

// extern CFMutableAttributedStringRef CFAttributedStringCreateMutable(CFIndex maxLength);
// 
var CFAttributedStringCreateMutable = function(maxLength)
{
    
}

// extern void CFAttributedStringReplaceString(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef replacement);
// 
var CFAttributedStringReplaceString = function(aStr, range, replacement)
{
    
}

// extern CFMutableStringRef CFAttributedStringGetMutableString(CFMutableAttributedStringRef aStr);
// 
var CFAttributedStringGetMutableString = function(aStr)
{
    
}

// extern void CFAttributedStringSetAttributes(CFMutableAttributedStringRef aStr, CFRange range, CFDictionaryRef replacement, Boolean clearOtherAttributes);
// 
var CFAttributedStringSetAttributes = function(aStr, range, replacement, clearOtherAttributes)
{
    
}

// extern void CFAttributedStringSetAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName, CFTypeRef value);
// 
var CFAttributedStringSetAttribute = function(aStr, range, attrName, value)
{
    
}

// extern void CFAttributedStringRemoveAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName);
// 
var CFAttributedStringRemoveAttribute = function(aStr, range, attrName)
{
    
}

// extern void CFAttributedStringReplaceAttributedString(CFMutableAttributedStringRef aStr, CFRange range, CFAttributedStringRef replacement);
// 
var CFAttributedStringReplaceAttributedString = function(aStr, range, replacement)
{
    
}

// extern void CFAttributedStringBeginEditing(CFMutableAttributedStringRef aStr);
// 
var CFAttributedStringBeginEditing = function(aStr)
{
    
}

// extern void CFAttributedStringEndEditing(CFMutableAttributedStringRef aStr);
// 
var CFAttributedStringEndEditing = function(aStr)
{
    
}

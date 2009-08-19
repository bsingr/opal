// 
//  CFAttributedString.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CFAttributedStringRef()
{
  this._string = "";
  this._ranges = [];
}

function CFMutableAttributedStringRef()
{
  this._string = "";
  this._ranges = [];
}

// extern CFAttributedStringRef CFAttributedStringCreate(CFStringRef str, CFDictionaryRef attributes);
// 
function CFAttributedStringCreate(str, attributes)
{
  var theString = new CFAttributedStringRef();
  theString._string = CFStringCreateCopy(str);
  
  return theString;
}

// extern CFAttributedStirngRef CFAttributedStringCreateWithSubstring(CFAttributedStringRef aStr, CFRange range);
// 
function CFAttributedStringCreateWithSubstring(aStr, range)
{
  
}

// extern CFAttributedStringRef CFAttributedStringCreateCopy(CFAttributedStringRef aStr);
// 
function CFAttributedStringCreateCopy(aStr)
{
  var theString = new CFAttributedStringRef();
  theString._string = CFStringCreateCopy(CFAttributedStringGetString(aStr));
  
  return theString;
}

// extern CFStringRef CFAttributedStringGetString(CFAttributedStringRef aStr);
// 
function CFAttributedStringGetString(aStr)
{
  return aStr._string;
}

// extern CFIndex CFAttributedStringGetLength(CFAttributedStringRef aStr);
// 
function CFAttributedStringGetLength(aStr)
{
  return aStr._string.length;
}

// extern CFDictionaryRef CFAttributedStringGetAttributes(CFAttributedStringRef aStr, CFIndex loc, CFRange *effectiveRange);
// 
function CFAttributedStringGetAttributes(aStr, loc, effectiveRange)
{
  
}

// extern CFTypeRef CFAttributedStringGetAttribute(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange *effectiveRange);
// 
function CFAttributedStringGetAttribute(aStr, loc, attrName, effectiveRange)
{
  
}

// extern CFDictionaryRef CFAttributedStringGetAttributesAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFRange inRange, CFRange *longestEffectiveRange);
// 
function CFAttributedStringGetAttributesAndLongestEffectiveRange(aStr, loc, inRange, longestEffectiveRange)
{
  
}

// extern CFTypeRef CFAttributedStringGetAttributeAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange inRange, CFRange *longestEffectiveRange);
// 
function CFAttributedStringGetAttributeAndLongestEffectiveRange(aStr, loc, attrName, inRange, longestEffectiveRange)
{
  
}

// extern CFMutableAttributedStringRef CFAttributedStringCreateMutableCopy(CFIndex maxLength, CFAttributedStringRef aStr);
// 
function CFAttributedStringCreateMutableCopy(maxLength, aStr)
{
  
}

// extern CFMutableAttributedStringRef CFAttributedStringCreateMutable(CFIndex maxLength);
// 
function CFAttributedStringCreateMutable(maxLength)
{
  
}

// extern void CFAttributedStringReplaceString(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef replacement);
// 
function CFAttributedStringReplaceString(aStr, range, replacement)
{
  
}

// extern CFMutableStringRef CFAttributedStringGetMutableString(CFMutableAttributedStringRef aStr);
// 
function CFAttributedStringGetMutableString(aStr)
{
  
}

// extern void CFAttributedStringSetAttributes(CFMutableAttributedStringRef aStr, CFRange range, CFDictionaryRef replacement, Boolean clearOtherAttributes);
// 
function CFAttributedStringSetAttributes(aStr, range, replacement, clearOtherAttributes)
{
  
}

// extern void CFAttributedStringSetAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName, CFTypeRef value);
// 
function CFAttributedStringSetAttribute(aStr, range, attrName, value)
{
  
}

// extern void CFAttributedStringRemoveAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName);
// 
function CFAttributedStringRemoveAttribute(aStr, range, attrName)
{
  
}

// extern void CFAttributedStringReplaceAttributedString(CFMutableAttributedStringRef aStr, CFRange range, CFAttributedStringRef replacement);
// 
function CFAttributedStringReplaceAttributedString(aStr, range, replacement)
{
  
}

// extern void CFAttributedStringBeginEditing(CFMutableAttributedStringRef aStr);
// 
function CFAttributedStringBeginEditing(aStr)
{
  
}

// extern void CFAttributedStringEndEditing(CFMutableAttributedStringRef aStr);
// 
function CFAttributedStringEndEditing(aStr)
{
  
}

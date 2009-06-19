// 
//  CFAttributedString.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>
#import <CoreFoundation/CFString.h>
#import <CoreFoundation/CFDictionary.h>

typedef struct __CFAttributedString 
{
    CFStringRef     _string;
    CFArrayRef      _ranges;
    
} CFAttributedStringRef;

typedef struct __CFAttributedString
{
    CFStringRef     _string;
    CFArrayRef      _ranges;    

} CFMutableAttributedStringRef;

extern CFAttributedStringRef CFAttributedStringCreate(CFStringRef str, CFDictionaryRef attributes);
extern CFAttributedStringRef CFAttributedStringCreateWithSubstring(CFAttributedStringRef aStr, CFRange range);

extern CFAttributedStringRef CFAttributedStringCreateCopy(CFAttributedStringRef aStr);

extern CFStringRef CFAttributedStringGetString(CFAttributedStringRef aStr);
extern CFIndex CFAttributedStringGetLength(CFAttributedStringRef aStr);

extern CFDictionaryRef CFAttributedStringGetAttributes(CFAttributedStringRef aStr, CFIndex loc, CFRange *effectiveRange);
extern CFTypeRef CFAttributedStringGetAttribute(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange *effectiveRange);

extern CFDictionaryRef CFAttributedStringGetAttributesAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFRange inRange, CFRange *longestEffectiveRange);
extern CFTypeRef CFAttributedStringGetAttributeAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange inRange, CFRange *longestEffectiveRange);


extern CFMutableAttributedStringRef CFAttributedStringCreateMutableCopy(CFIndex maxLength, CFAttributedStringRef aStr);
extern CFMutableAttributedStringRef CFAttributedStringCreateMutable(CFIndex maxLength);
extern void CFAttributedStringReplaceString(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef replacement);
extern CFMutableStringRef CFAttributedStringGetMutableString(CFMutableAttributedStringRef aStr);

extern void CFAttributedStringSetAttributes(CFMutableAttributedStringRef aStr, CFRange range, CFDictionaryRef replacement, bool clearOtherAttributes);
extern void CFAttributedStringSetAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName, CFTypeRef value);

extern void CFAttributedStringRemoveAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName);
extern void CFAttributedStringReplaceAttributedString(CFMutableAttributedStringRef aStr, CFRange range, CFAttributedStringRef replacement);

extern void CFAttributedStringBeginEditing(CFMutableAttributedStringRef aStr);
extern void CFAttributedStringEndEditing(CFMutableAttributedStringRef aStr);

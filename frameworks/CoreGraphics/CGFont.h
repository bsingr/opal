// 
//  CGFont.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#include <CoreGraphics/CGBase.h>
#include <CoreGraphics/CGGeometry.h>
#include <CoreFoundation/CFArray.h>
#include <CoreFoundation/CFData.h>
#include <CoreFoundation/CFDictionary.h>

typedef struct CGFont {
    CFStringRef *_name;
    CGFloat      _size;
    BOOL         _isBold;
}*CGFontRef;

extern CGFontRef CGFontCreate(CFStringRef name, CGFloat size, BOOL isBold);

extern CGFontRef CGFontCreateWithFontName(CFStringRef name);

extern CFStringRef CGFontGetFontName(CGFontRef font);
extern CGFloat CGFontGetFontSize(CGFontRef font);
extern BOOL CGFontGetIsBold(CGFontRef font);

extern CFStringRef CGFontGetStringRepresentation(CGFontRef font);

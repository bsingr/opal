// 
//  CTLine.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#include <CoreFoundation/CFArray.h>
#include <CoreFoundation/CFAttributedString.h>
#include <CoreGraphics/CGContext.h>

typedef const struct __CTLine * CTLineRef;

enum
{
	kCTLineTruncationStart	= 0,
	kCTLineTruncationEnd	= 1,
	kCTLineTruncationMiddle = 2
};
typedef int CTLineTruncationType;

extern CTLineRef CTLineCreateWithAttributedString(CFAttributedStringRef string);

extern CTLineRef CTLineCreateTruncatedLine(CTLineRef line, double width, CTLineTruncationType truncationType, CTLineRef truncationToken);

extern CTLineRef CTLineCreateJustifiedLine(CTLineRef line, CGFloat justificationFactor, double justificationWidth);

extern CFIndex CTLineGetGlyphCount(CTLineRef line);

extern CFArrayRef CTLineGetGlyphRuns(CTLineRef line);

extern CFRange CTLineGetStringRange(CTLineRef line);

extern double CTLineGetPenOffsetForFlush(CTLineRef line, CGFloat flushFactor, double flushWidth);

extern void CTLineDraw(CTLineRef line, CGContextRef context);

extern CGRect CTLineGetImageBounds(CTLineRef line, CGContextRef context);

extern double CTLineGetTypographicBounds(CTLineRef line, CGFloat* ascent, CGFloat* descent, CGFloat* leading);

extern double CTLineGetTrailingWhitespaceWidth(CTLineRef line);

extern CFIndex CTLineGetStringIndexForPosition(CTLineRef line, CGPoint position);

extern CGFloat CTLineGetOffsetForStringIndex(CTLineRef line, CFIndex charIndex, CGFloat* secondaryOffset);

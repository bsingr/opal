// 
//  CGContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// enum CGLineJoin {
//     kCGLineJoinMiter,
//     kCGLineJoinRound,
//     kCGLineJoinBevel
// };

// enum CGLineCap {
//     kCGLineCapButt,
//     kCGLineCapRound,
//     kCGLineCapSquare
// };

// enum CGPathDrawingMode {
//     kCGPathFill,
//     kCGPathEOFill,
//     kCGPathStroke,
//     kCGPathFillStroke,
//     kCGEOFillStroke
// };
 
// enum CGTextDrawingMode {
//     kCGTextFill,
//     kCGTextStroke,
//     kCGFillStroke,
//     kCGTextInvisible,
//     kCGTextFillClip,
//     kCGTextStrokeClip,
//     kCGTextFillStrokeClip,
//     kCGTextClip
// };

// extern CFTypeID CGContextGetTypeID(void);
// 

// extern void CGContextSaveGState(CGContextRef c);
// 
var CGContextSaveGState = function (c)
{
    
}

// extern void CGContextRestoreGState(CGContextRef c);
// 
var CGContextRestoreGState = function (c)
{
    
}

// extern void CGContextScaleCTM(CGContextRef c, CGFloat sx, CGFloat sy);
// 
var CGContextScaleCTM = function(c, sx, sy)
{
    
}

// extern void CGContextTranslateCTM(CGContextRef c, CGFloat tx, CGFloat ty);
// 
var CGContextTranslateCTM = function(c, tx, ty)
{
    
}

// extern void CGContextRotateCTM(CGContextRef c, CGFloat angle);
// 
var CGContextRotateCTM = function(c, angle)
{
    
}

// extern void CGContextConcatCTM(CGContextRef c, CGAffineTransform transform);
// 
var CGContextConcatCTM = function(c, transform)
{
    
}

// extern CGAffineTransform CGContextGetCTM(CGContextRef c);
// 
var CGContextGetCTM = function(c)
{
    
}

// extern void CGContextSetLineWidth(CGContextRef c, CGFloat width);
// 
var CGContextSetLineWidth = function(c, width)
{
    
}

// extern void CGContextSetLineCap(CGContextRef c, CGLineCap cap);
// 
var CGContextSetLineCap = function(c, cap)
{
    
}

// extern void CGContextSetLineJoin(CGContextRef c, CGLineJoin join);
// 
var CGContextSetLineJoin = function(c, join)
{
    
}

// extern void CGContextSetMiterLimit(CGContextRef c, CGFloat limit);
// 
var CGContextSetMiterLimit = function(c, limit)
{
    
}

// extern void CGContextSetLineDash(CGContextRef c, CGFloat phase, const CGFloat lengths[], size_t count);
// 
var CGContextSetLineDash = function(c, phase, lengths, count)
{
    
}

// extern void CGContextSetFlatness(CGContextRef c, CGFloat flatness);
// 
var CGContextSetFlatness = function(c, flatness)
{
    
}

// extern void CGContextSetAlpha(CGContextRef c, CGFloat alpha);
// 
var CGContextSetAlpha = function(c, alpha)
{
    
}

// extern void CGContextSetBlendMode(CGContextRef context, CGBlendMode mode);
// 
var CGContextSetBlendMode = function(c, mode)
{
    
}

// extern void CGContextBeginPath(CGContextRef c);
// 
var CGContextBeginPath = function(c)
{
    
}

// extern void CGContextMoveToPoint(CGContextRef c, CGFloat x, CGFloat y);
// 
var CGContextMoveToPoint = function(c, x, y)
{
    
}

// extern void CGContextAddLineToPoint(CGContextRef c, CGFloat x, CGFloat y);
// 
var CGContextAddLineToPoint = function(c, x, y)
{
    
}

// extern void CGContextAddCurveToPoint(CGContextRef c, CGFloat cp1x, CGFloat cp1y, CGFloat cp2x, CGFloat cp2y, CGFloat x, CGFloat y);
// 
var CGContextAddCurveToPoint = function(c, cp1x, cp1y, cp2x, cp2y, x, y)
{
    
}

// extern void CGContextAddQuadCurveToPoint(CGContextRef c, CGFloat cpx, CGFloat cpy, CGFloat x, CGFloat y);
// 
var CGContextAddQuadCurveToPoint = function(c, cpx, cpy, x, y)
{
    
}

// extern void CGContextClosePath(CGContextRef c);
// 
var CGContextClosePath = function(c)
{
    
}

// extern void CGContextAddRect(CGContextRef c, CGRect rect);
// 
var CGContextAddRect = function(c, rect)
{
    
}

// extern void CGContextAddRects(CGContextRef c, const CGRect rects[], size_t count);
// 
var CGContextAddRects = function(c, rects, count)
{
    
}

// extern void CGContextAddLines(CGContextRef c, const CGPoint points[], size_t count);
// 
var CGContextAddLines = function(c, points, count)
{
    
}

// extern void CGContextAddEllipseInRect(CGContextRef context, CGRect rect);
// 
var CGContextAddEllipeInRect = function(c, rect)
{
    
}

// extern void CGContextAddArc(CGContextRef c, CGFloat x, CGFloat y, CGFloat radius, CGFloat startAngle, CGFloat endAngle, int clockwise);
// 
var CGContextAddArc = function(c, x, y, radius, startAngle, endAngle, clockwise)
{
    
}

// extern void CGContextAddArcToPoint(CGContextRef c, CGFloat x1, CGFloat y1, CGFloat x2, CGFloat y2, CGFloat radius);
// 
var CGContextAddArcToPoint = function(c, x1, y1, x2, y2, radius)
{
    
}

// extern void CGContextAddPath(CGContextRef context, CGPathRef path);
// 
var CGContextAddPath = function(c, path)
{
    
}

// extern void CGContextReplacePathWithStrokedPath(CGContextRef c);
// 
var CGContextReplacePathWithStrokedPath = function(c)
{
    
}

// extern bool CGContextIsPathEmpty(CGContextRef c);
// 
var CGContextIsPathEmpty = function(c)
{
    
}

// extern CGPoint CGContextGetPathCurrentPoint(CGContextRef c);
// 
var CGContectGetPathCurrentPoint = function(c)
{
    
}

// extern CGRect CGContextGetPathBoundingBox(CGContextRef c);
// 
var CGContextGetPathBoundingBox = function(c)
{
    
}

// extern bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode);
// 
var CGContextPathContainsPoint = function(c, point, mode)
{
    
}

// extern void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode);
// 
var CGContextDrawPath = function(c, mode)
{
    
}

// extern void CGContextFillPath(CGContextRef c);
// 
var CGContextFillPath = function(c)
{
    
}

// extern void CGContextEOFillPath(CGContextRef c);
// 
var CGContextEOFillPath = function(c)
{
    
}

// extern void CGContextStrokePath(CGContextRef c);
// 
var CGContextStrokePath = function(c)
{
    
}

// extern void CGContextFillRect(CGContextRef c, CGRect rect);
// 
var CGContextFillRect = function(c, rect)
{
    
}

// extern void CGContextFillRects(CGContextRef c, const CGRect rects[], size_t count);
// 
var CGContextFillRects = function(c, rects, count)
{
    
}

// extern void CGContextStrokeRect(CGContextRef c, CGRect rect);
// 
var CGContextStrokeRect = function(c, rect)
{
    
}

// extern void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width);
// 
var CGContextStrokeRectWithWidth = function(c, rect, width)
{
    
}

// extern void CGContextClearRect(CGContextRef c, CGRect rect);
// 
var CGContextClearRect = function(c, rect)
{
    
}

// extern void CGContextFillEllipseInRect(CGContextRef context, CGRect rect);
// 
var CGContextFillEllipseInRect = function(c, rect)
{
    
}

// extern void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect);
// 
var CGContextStrokeEllipseInRect = function(c, rect)
{
    
}

// extern void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], size_t count);
// 
var CGContextStrokeLineSegments = function(c, points, count)
{
    
}

// extern void CGContextClip(CGContextRef c);
// 
var CGContextClip = function(c)
{
    
}

// extern void CGContextEOClip(CGContextRef c);
var CGContextEOClip = function (c)
{
    
}

// extern void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask);
// 
var CGContextClipToMask = function(c, rect, mask)
{
    
}

// extern CGRect CGContextGetClipBoundingBox(CGContextRef c);
// 
var CGContextGetClipBoundingBox = function(c)
{
    
}

// extern void CGContextClipToRect(CGContextRef c, CGRect rect);
// 
var CGContextClipToRect = function(c, rect)
{
    
}

// extern void CGContextClipToRects(CGContextRef c, const CGRect rects[], size_t count);
// 
var CGContextClipToRects = function(c, rects, count)
{
    
}

// extern void CGContextSetFillColorWithColor(CGContextRef c, CGColorRef color);
// 
var CGContextSetFillColorWithColor = function(c, color)
{
    
}

// extern void CGContextSetStrokeColorWithColor(CGContextRef c, CGColorRef color);
// 
var CGContextSetStrokeColorWithColor = function (c, color)
{
    
}

// extern void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// 
var CGContextSetFillColorSpace = function(c, colorspace)
{
    
}

// extern void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// 
var CGContextSetStrokeColorSpace = function(c, colorspace)
{
    
}

// extern void CGContextSetFillColor(CGContextRef c, const CGFloat components[]);
// 
var CGContextSetFillColor = function(c, componenets)
{
    
}

// extern void CGContextSetStrokeColor(CGContextRef c, const CGFloat components[]);
// 
var CGContextSetStrokeColor = function(c, componenets)
{
    
}

// extern void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// 
var CGContextSetFillPattern = function(c, pattern, components)
{
    
}

// extern void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// 
var CGContextSetStrokePattern = function(c, pattern, components)
{
    
}

// extern void CGContextSetPatternPhase(CGContextRef c, CGSize phase);
// 
var CGContextSetPatternPhase = function(c, phase)
{
    
}

// extern void CGContextSetGrayFillColor(CGContextRef c, CGFloat gray, CGFloat alpha);
// 
var CGContextSetGrayFillColor = function(c, gray, alpha)
{
    
}

// extern void CGContextSetGrayStrokeColor(CGContextRef c, CGFloat gray, CGFloat alpha);
// 
var CGContextSetGrayStrokeColor = function(c, gray, alpha)
{
    
}

// extern void CGContextSetRGBFillColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
// 
var CGContextSetRGBFillColor = function(c, red, green, blue, alpha)
{
    
}

// extern void CGContextSetRGBStrokeColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
// 
var CGContextSetRGBStrokeColor = function(c, red, green, blue, alpha)
{
    
}

// extern void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// 
var CGContextSetCMYKFillColor = function(c, cyan, magenta, yellow, black, alpha)
{
    
}

// extern void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// 
var CGContextSetCMYKStrokeColor = function(c, cyan, magenta, yellow, black, alpha)
{
    
}
// extern void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent);
// 
var CGContextSetRenderingIntent = function(c, intent)
{
    
}

// extern void CGContextDrawImage(CGContextRef c, CGRect rect, CGImageRef image);
// 
var CGContextDrawImage = function(c, rect, image)
{
    
}

// extern void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image);
// 
var CGContextDrawTiledImage = function(c, rect, image)
{
    
}

// extern CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
// 
var CGContextGetInterpolationQuality = function(c)
{
    
}

// extern void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);
// 
var CGContextSetInterpolationQuality = function(c, quality)
{
    
}

// extern void CGContextSetShadowWithColor(CGContextRef context, CGSize offset, CGFloat blur, CGColorRef color);
// 
var CGContextSetShadowWithColor = function(c, offset, blur, color)
{
    
}

// extern void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur);
// 
var CGContextSetShadow = function(c, offset, blur)
{
    
}

// extern void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options);
// 
var CGContextDrawLinearGradient = function(c, gradient, startPoint, endPoint, options)
{
    
}

// extern void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options);
// 
var CGContextDrawRadialGradient = function(c, gradient, startCenter, startRadius, endCenter, endRadius, options)
{
    
}

// extern void CGContextDrawShading(CGContextRef context, CGShadingRef shading);
// 
var CGContextDrawShading = function(c, shading)
{
    
}

// extern void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing);
// 
var CGContextSetCharacterSpacing = function(c, spacing)
{
    
}

// extern void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y);
// 
var CGContextSetTextPosition = function(c, x, y)
{
    
}

// extern CGPoint CGContextGetTextPosition(CGContextRef c);
// 
var CGContextGetTextPosition = function(c)
{
    
}


// extern void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t);
// 
var CGContextSetTextMatrix = function(c, t)
{
    
}


// extern CGAffineTransform CGContextGetTextMatrix(CGContextRef c);
// 
var CGContextGetTextMatrix = function(c)
{
    
}

// extern void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode);
// 
var CGContextSetTextDrawingMode = function(c, mode)
{
    
}

// extern void CGContextSetFont(CGContextRef c, CGFontRef font);
// 
var CGContextSetFont = function(c, font)
{
    
}

// extern void CGContextSetFontSize(CGContextRef c, CGFloat size);
// 
var CGContextSetFontSize = function(c, size)
{
    
}

// extern void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
// 
var CGContextSelectFont = function(c, name, size, textEncoding)
{
    
}

// extern void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], size_t count);
// 
var CGContextShowGlyphsAtPositions = function(c, glyphs, positions, count)
{
    
}

// extern void CGContextShowText(CGContextRef c, const char *string, size_t length);
// 
var CGContextShowText = function(c, string, length)
{
    
}

// extern void CGContextShowTextAtPoint(CGContextRef c, CGFloat x, CGFloat y, const char *string, size_t length);
// 
var CGContextShowTextAtPoint = function(c, x, y, string, length)
{
    
}

// extern void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], size_t count);
// 
var CGContextShowGlyphs = function(c, g, count)
{
    
}

// extern void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], size_t count);
// 
var CGContextShowGlyphsAtPoint = function(c, x, y, glyphs, count)
{
    
}

// extern void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], size_t count);
// 
var CGContextShowGlyphsWithAdvances = function(c, glyphs, advances, count)
{
    
}

// extern void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo);
// 
var CGContextBeginTransparencyLayer = function(c, auxiliaryInfo)
{
    
}

// extern void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo);
// 
var CGContextBeginTransparencyLayerWithRect = function(c, rect, auxiliaryInfo)
{
    
}

// extern void CGContextEndTransparencyLayer(CGContextRef context);
// 
var CGContextEndTransparencyLayer = function(c)
{
    
}

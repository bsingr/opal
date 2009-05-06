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
function CGContextSaveGState (c)
{
    
}

// extern void CGContextRestoreGState(CGContextRef c);
// 
function CGContextRestoreGState (c)
{
    
}

// extern void CGContextScaleCTM(CGContextRef c, CGFloat sx, CGFloat sy);
// 
function CGContextScaleCTM(c, sx, sy)
{
    
}

// extern void CGContextTranslateCTM(CGContextRef c, CGFloat tx, CGFloat ty);
// 
function CGContextTranslateCTM(c, tx, ty)
{
    
}

// extern void CGContextRotateCTM(CGContextRef c, CGFloat angle);
// 
function CGContextRotateCTM(c, angle)
{
    
}

// extern void CGContextConcatCTM(CGContextRef c, CGAffineTransform transform);
// 
function CGContextConcatCTM(c, transform)
{
    
}

// extern CGAffineTransform CGContextGetCTM(CGContextRef c);
// 
function CGContextGetCTM(c)
{
    
}

// extern void CGContextSetLineWidth(CGContextRef c, CGFloat width);
// 
function CGContextSetLineWidth(c, width)
{
    
}

// extern void CGContextSetLineCap(CGContextRef c, CGLineCap cap);
// 
function CGContextSetLineCap(c, cap)
{
    
}

// extern void CGContextSetLineJoin(CGContextRef c, CGLineJoin join);
// 
function CGContextSetLineJoin(c, join)
{
    
}

// extern void CGContextSetMiterLimit(CGContextRef c, CGFloat limit);
// 
function CGContextSetMiterLimit(c, limit)
{
    
}

// extern void CGContextSetLineDash(CGContextRef c, CGFloat phase, const CGFloat lengths[], size_t count);
// 
function CGContextSetLineDash(c, phase, lengths, count)
{
    
}

// extern void CGContextSetFlatness(CGContextRef c, CGFloat flatness);
// 
function CGContextSetFlatness(c, flatness)
{
    
}

// extern void CGContextSetAlpha(CGContextRef c, CGFloat alpha);
// 
function CGContextSetAlpha(c, alpha)
{
    
}

// extern void CGContextSetBlendMode(CGContextRef context, CGBlendMode mode);
// 
function CGContextSetBlendMode(c, mode)
{
    
}

// extern void CGContextBeginPath(CGContextRef c);
// 
function CGContextBeginPath(c)
{
    
}

// extern void CGContextMoveToPoint(CGContextRef c, CGFloat x, CGFloat y);
// 
function CGContextMoveToPoint(c, x, y)
{
    
}

// extern void CGContextAddLineToPoint(CGContextRef c, CGFloat x, CGFloat y);
// 
function CGContextAddLineToPoint(c, x, y)
{
    
}

// extern void CGContextAddCurveToPoint(CGContextRef c, CGFloat cp1x, CGFloat cp1y, CGFloat cp2x, CGFloat cp2y, CGFloat x, CGFloat y);
// 
function CGContextAddCurveToPoint(c, cp1x, cp1y, cp2x, cp2y, x, y)
{
    
}

// extern void CGContextAddQuadCurveToPoint(CGContextRef c, CGFloat cpx, CGFloat cpy, CGFloat x, CGFloat y);
// 
function CGContextAddQuadCurveToPoint(c, cpx, cpy, x, y)
{
    
}

// extern void CGContextClosePath(CGContextRef c);
// 
function CGContextClosePath(c)
{
    
}

// extern void CGContextAddRect(CGContextRef c, CGRect rect);
// 
function CGContextAddRect(c, rect)
{
    
}

// extern void CGContextAddRects(CGContextRef c, const CGRect rects[], size_t count);
// 
function CGContextAddRects(c, rects, count)
{
    
}

// extern void CGContextAddLines(CGContextRef c, const CGPoint points[], size_t count);
// 
function CGContextAddLines(c, points, count)
{
    
}

// extern void CGContextAddEllipseInRect(CGContextRef context, CGRect rect);
// 
function CGContextAddEllipeInRect(c, rect)
{
    
}

// extern void CGContextAddArc(CGContextRef c, CGFloat x, CGFloat y, CGFloat radius, CGFloat startAngle, CGFloat endAngle, int clockwise);
// 
function CGContextAddArc(c, x, y, radius, startAngle, endAngle, clockwise)
{
    
}

// extern void CGContextAddArcToPoint(CGContextRef c, CGFloat x1, CGFloat y1, CGFloat x2, CGFloat y2, CGFloat radius);
// 
function CGContextAddArcToPoint(c, x1, y1, x2, y2, radius)
{
    
}

// extern void CGContextAddPath(CGContextRef context, CGPathRef path);
// 
function CGContextAddPath(c, path)
{
    
}

// extern void CGContextReplacePathWithStrokedPath(CGContextRef c);
// 
function CGContextReplacePathWithStrokedPath(c)
{
    
}

// extern bool CGContextIsPathEmpty(CGContextRef c);
// 
function CGContextIsPathEmpty(c)
{
    
}

// extern CGPoint CGContextGetPathCurrentPoint(CGContextRef c);
// 
function CGContectGetPathCurrentPoint(c)
{
    
}

// extern CGRect CGContextGetPathBoundingBox(CGContextRef c);
// 
function CGContextGetPathBoundingBox(c)
{
    
}

// extern bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode);
// 
function CGContextPathContainsPoint(c, point, mode)
{
    
}

// extern void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode);
// 
function CGContextDrawPath(c, mode)
{
    
}

// extern void CGContextFillPath(CGContextRef c);
// 
function CGContextFillPath(c)
{
    
}

// extern void CGContextEOFillPath(CGContextRef c);
// 
function CGContextEOFillPath(c)
{
    
}

// extern void CGContextStrokePath(CGContextRef c);
// 
function CGContextStrokePath(c)
{
    
}

// extern void CGContextFillRect(CGContextRef c, CGRect rect);
// 
function CGContextFillRect(c, rect)
{
    c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
}

// extern void CGContextFillRects(CGContextRef c, const CGRect rects[], size_t count);
// 
function CGContextFillRects(c, rects, count)
{
    for (var i = 0; i < count; i ++)
        CGContextFillRect(c, rects[i]);
}

// extern void CGContextStrokeRect(CGContextRef c, CGRect rect);
// 
function CGContextStrokeRect(c, rect)
{
    c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
}

// extern void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width);
// 
function CGContextStrokeRectWithWidth(c, rect, width)
{
    
}

// extern void CGContextClearRect(CGContextRef c, CGRect rect);
// 
function CGContextClearRect(c, rect)
{
    
}

// extern void CGContextFillEllipseInRect(CGContextRef context, CGRect rect);
// 
function CGContextFillEllipseInRect(c, rect)
{
    
}

// extern void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect);
// 
function CGContextStrokeEllipseInRect(c, rect)
{
    
}

// extern void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], size_t count);
// 
function CGContextStrokeLineSegments(c, points, count)
{
    
}

// extern void CGContextClip(CGContextRef c);
// 
function CGContextClip(c)
{
    
}

// extern void CGContextEOClip(CGContextRef c);
function CGContextEOClip (c)
{
    
}

// extern void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask);
// 
function CGContextClipToMask(c, rect, mask)
{
    
}

// extern CGRect CGContextGetClipBoundingBox(CGContextRef c);
// 
function CGContextGetClipBoundingBox(c)
{
    
}

// extern void CGContextClipToRect(CGContextRef c, CGRect rect);
// 
function CGContextClipToRect(c, rect)
{
    
}

// extern void CGContextClipToRects(CGContextRef c, const CGRect rects[], size_t count);
// 
function CGContextClipToRects(c, rects, count)
{
    
}

// extern void CGContextSetFillColorWithColor(CGContextRef c, CGColorRef color);
// 
function CGContextSetFillColorWithColor(c, color)
{
    
}

// extern void CGContextSetStrokeColorWithColor(CGContextRef c, CGColorRef color);
// 
function CGContextSetStrokeColorWithColor (c, color)
{
    
}

// extern void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// 
function CGContextSetFillColorSpace(c, colorspace)
{
    
}

// extern void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// 
function CGContextSetStrokeColorSpace(c, colorspace)
{
    
}

// extern void CGContextSetFillColor(CGContextRef c, const CGFloat components[]);
// 
function CGContextSetFillColor(c, componenets)
{
    
}

// extern void CGContextSetStrokeColor(CGContextRef c, const CGFloat components[]);
// 
function CGContextSetStrokeColor(c, componenets)
{
    
}

// extern void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// 
function CGContextSetFillPattern(c, pattern, components)
{
    
}

// extern void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// 
function CGContextSetStrokePattern(c, pattern, components)
{
    
}

// extern void CGContextSetPatternPhase(CGContextRef c, CGSize phase);
// 
function CGContextSetPatternPhase(c, phase)
{
    
}

// extern void CGContextSetGrayFillColor(CGContextRef c, CGFloat gray, CGFloat alpha);
// 
function CGContextSetGrayFillColor(c, gray, alpha)
{
    
}

// extern void CGContextSetGrayStrokeColor(CGContextRef c, CGFloat gray, CGFloat alpha);
// 
function CGContextSetGrayStrokeColor(c, gray, alpha)
{
    
}

// extern void CGContextSetRGBFillColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
// 
function CGContextSetRGBFillColor(c, red, green, blue, alpha)
{
    
}

// extern void CGContextSetRGBStrokeColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
// 
function CGContextSetRGBStrokeColor(c, red, green, blue, alpha)
{
    
}

// extern void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// 
function CGContextSetCMYKFillColor(c, cyan, magenta, yellow, black, alpha)
{
    
}

// extern void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// 
function CGContextSetCMYKStrokeColor(c, cyan, magenta, yellow, black, alpha)
{
    
}
// extern void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent);
// 
function CGContextSetRenderingIntent(c, intent)
{
    
}

// extern void CGContextDrawImage(CGContextRef c, CGRect rect, CGImageRef image);
// 
function CGContextDrawImage(c, rect, image)
{
    
}

// extern void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image);
// 
function CGContextDrawTiledImage(c, rect, image)
{
    
}

// extern CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
// 
function CGContextGetInterpolationQuality(c)
{
    
}

// extern void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);
// 
function CGContextSetInterpolationQuality(c, quality)
{
    
}

// extern void CGContextSetShadowWithColor(CGContextRef context, CGSize offset, CGFloat blur, CGColorRef color);
// 
function CGContextSetShadowWithColor(c, offset, blur, color)
{
    
}

// extern void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur);
// 
function CGContextSetShadow(c, offset, blur)
{
    
}

// extern void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options);
// 
function CGContextDrawLinearGradient(c, gradient, startPoint, endPoint, options)
{
    
}

// extern void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options);
// 
function CGContextDrawRadialGradient(c, gradient, startCenter, startRadius, endCenter, endRadius, options)
{
    
}

// extern void CGContextDrawShading(CGContextRef context, CGShadingRef shading);
// 
function CGContextDrawShading(c, shading)
{
    
}

// extern void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing);
// 
function CGContextSetCharacterSpacing(c, spacing)
{
    
}

// extern void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y);
// 
function CGContextSetTextPosition(c, x, y)
{
    
}

// extern CGPoint CGContextGetTextPosition(CGContextRef c);
// 
function CGContextGetTextPosition(c)
{
    
}


// extern void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t);
// 
function CGContextSetTextMatrix(c, t)
{
    
}


// extern CGAffineTransform CGContextGetTextMatrix(CGContextRef c);
// 
function CGContextGetTextMatrix(c)
{
    
}

// extern void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode);
// 
function CGContextSetTextDrawingMode(c, mode)
{
    
}

// extern void CGContextSetFont(CGContextRef c, CGFontRef font);
// 
function CGContextSetFont(c, font)
{
    
}

// extern void CGContextSetFontSize(CGContextRef c, CGFloat size);
// 
function CGContextSetFontSize(c, size)
{
    
}

// extern void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
// 
function CGContextSelectFont(c, name, size, textEncoding)
{
    
}

// extern void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], size_t count);
// 
function CGContextShowGlyphsAtPositions(c, glyphs, positions, count)
{
    
}

// extern void CGContextShowText(CGContextRef c, const char *string, size_t length);
// 
function CGContextShowText(c, string, length)
{
    
}

// extern void CGContextShowTextAtPoint(CGContextRef c, CGFloat x, CGFloat y, const char *string, size_t length);
// 
function CGContextShowTextAtPoint(c, x, y, string, length)
{
    
}

// extern void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], size_t count);
// 
function CGContextShowGlyphs(c, g, count)
{
    
}

// extern void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], size_t count);
// 
function CGContextShowGlyphsAtPoint(c, x, y, glyphs, count)
{
    
}

// extern void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], size_t count);
// 
function CGContextShowGlyphsWithAdvances(c, glyphs, advances, count)
{
    
}

// extern void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo);
// 
function CGContextBeginTransparencyLayer(c, auxiliaryInfo)
{
    
}

// extern void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo);
// 
function CGContextBeginTransparencyLayerWithRect(c, rect, auxiliaryInfo)
{
    
}

// extern void CGContextEndTransparencyLayer(CGContextRef context);
// 
function CGContextEndTransparencyLayer(c)
{
    
}

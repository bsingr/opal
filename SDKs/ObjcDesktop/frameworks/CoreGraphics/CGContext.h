/* 
 * CGContext.h
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

typedef struct CGContext
{
    void    (*save)(void);
    
} *CGContextRef;

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGAffineTransform.h>
#import <CoreGraphics/CGColor.h>
#import <CoreGraphics/CGColorSpace.h>
#import <CoreGraphics/CGFont.h>
#import <CoreGraphics/CGGradient.h>
#import <CoreGraphics/CGImage.h>
#import <CoreGraphics/CGPath.h>
#import <CoreGraphics/CGPattern.h>
#import <CoreGraphics/CGShading.h>

enum CGLineJoin {
    kCGLineJoinMiter,
    kCGLineJoinRound,
    kCGLineJoinBevel
};
typedef enum CGLineJoin CGLineJoin;

enum CGLineCap {
    kCGLineCapButt,
    kCGLineCapRound,
    kCGLineCapSquare
};
typedef enum CGLineCap CGLineCap;

enum CGPathDrawingMode {
    kCGPathFill,
    kCGPathEOFill,
    kCGPathStroke,
    kCGPathFillStroke,
    kCGEOFillStroke
};
typedef enum CGPathDrawingMode CGPathDrawingMode;

enum CGTextDrawingMode {
    kCGTextFill,
    kCGTextStroke,
    kCGFillStroke,
    kCGTextInvisible,
    kCGTextFillClip,
    kCGTextStrokeClip,
    kCGTextFillStrokeClip,
    kCGTextClip
};
typedef enum CGTextDrawingMode CGTextDrawingMode;

extern CFTypeID CGContextGetTypeID(void);
extern void CGContextSaveGState(CGContextRef c);
extern void CGContextRestoreGState(CGContextRef c);
extern void CGContextScaleCTM(CGContextRef c, CGFloat sx, CGFloat sy);
extern void CGContextTranslateCTM(CGContextRef c, CGFloat tx, CGFloat ty);
extern void CGContextRotateCTM(CGContextRef c, CGFloat angle);
extern void CGContextConcatCTM(CGContextRef c, CGAffineTransform transform);
extern CGAffineTransform CGContextGetCTM(CGContextRef c);
extern void CGContextSetLineWidth(CGContextRef c, CGFloat width);
extern void CGContextSetLineCap(CGContextRef c, CGLineCap cap);
extern void CGContextSetLineJoin(CGContextRef c, CGLineJoin join);
extern void CGContextSetMiterLimit(CGContextRef c, CGFloat limit);
extern void CGContextSetLineDash(CGContextRef c, CGFloat phase, const CGFloat lengths[], int count);
extern void CGContextSetFlatness(CGContextRef c, CGFloat flatness);
extern void CGContextSetAlpha(CGContextRef c, CGFloat alpha);
// extern void CGContextSetBlendMode(CGContextRef context, CGBlendMode mode);
extern void CGContextBeginPath(CGContextRef c);
extern void CGContextMoveToPoint(CGContextRef c, CGFloat x, CGFloat y);
extern void CGContextAddLineToPoint(CGContextRef c, CGFloat x, CGFloat y);
extern void CGContextAddCurveToPoint(CGContextRef c, CGFloat cp1x, CGFloat cp1y, CGFloat cp2x, CGFloat cp2y, CGFloat x, CGFloat y);
extern void CGContextAddQuadCurveToPoint(CGContextRef c, CGFloat cpx, CGFloat cpy, CGFloat x, CGFloat y);
extern void CGContextClosePath(CGContextRef c);
extern void CGContextAddRect(CGContextRef c, CGRect rect);
extern void CGContextAddRects(CGContextRef c, const CGRect rects[], int count);
extern void CGContextAddLines(CGContextRef c, const CGPoint points[], int count);
extern void CGContextAddEllipseInRect(CGContextRef context, CGRect rect);
extern void CGContextAddArc(CGContextRef c, CGFloat x, CGFloat y, CGFloat radius, CGFloat startAngle, CGFloat endAngle, int clockwise);
extern void CGContextAddArcToPoint(CGContextRef c, CGFloat x1, CGFloat y1, CGFloat x2, CGFloat y2, CGFloat radius);
extern void CGContextAddPath(CGContextRef context, CGPathRef path);
extern void CGContextReplacePathWithStrokedPath(CGContextRef c);
extern bool CGContextIsPathEmpty(CGContextRef c);
extern CGPoint CGContextGetPathCurrentPoint(CGContextRef c);
extern CGRect CGContextGetPathBoundingBox(CGContextRef c);
extern bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode);
extern void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode);
extern void CGContextFillPath(CGContextRef c);
extern void CGContextEOFillPath(CGContextRef c);
extern void CGContextStrokePath(CGContextRef c);
extern void CGContextFillRect(CGContextRef c, CGRect rect);
extern void CGContextFillRects(CGContextRef c, const CGRect rects[], int count);
extern void CGContextStrokeRect(CGContextRef c, CGRect rect);
extern void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width);
extern void CGContextClearRect(CGContextRef c, CGRect rect);
extern void CGContextFillEllipseInRect(CGContextRef context, CGRect rect);
extern void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect);
extern void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count);
extern void CGContextClip(CGContextRef c);
extern void CGContextEOClip(CGContextRef c);
extern void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask);
extern CGRect CGContextGetClipBoundingBox(CGContextRef c);
extern void CGContextClipToRect(CGContextRef c, CGRect rect);
extern void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count);
extern void CGContextSetFillColorWithColor(CGContextRef c, CGColorRef color);
extern void CGContextSetStrokeColorWithColor(CGContextRef c, CGColorRef color);
extern void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
extern void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
extern void CGContextSetFillColor(CGContextRef c, const CGFloat components[]);
extern void CGContextSetStrokeColor(CGContextRef c, const CGFloat components[]);
// extern void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// extern void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
extern void CGContextSetPatternPhase(CGContextRef c, CGSize phase);
extern void CGContextSetGrayFillColor(CGContextRef c, CGFloat gray, CGFloat alpha);
extern void CGContextSetGrayStrokeColor(CGContextRef c, CGFloat gray, CGFloat alpha);
extern void CGContextSetRGBFillColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
extern void CGContextSetRGBStrokeColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
extern void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
extern void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
extern void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent);
extern void CGContextDrawImage(CGContextRef c, CGRect rect, CGImageRef image);
extern void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image);
// extern CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
// extern void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);
extern void CGContextSetShadowWithColor(CGContextRef context, CGSize offset, CGFloat blur, CGColorRef color);
extern void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur);
extern void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options);
extern void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options);
// extern void CGContextDrawShading(CGContextRef context, CGShadingRef shading);
extern void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing);
extern void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y);
extern CGPoint CGContextGetTextPosition(CGContextRef c);
extern void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t);
extern CGAffineTransform CGContextGetTextMatrix(CGContextRef c);
extern void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode);
// extern void CGContextSetFont(CGContextRef c, CGFontRef font);
extern void CGContextSetFontSize(CGContextRef c, CGFloat size);
// extern void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
// extern void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], int count);
extern void CGContextShowText(CGContextRef c, const char *string, int length);
extern void CGContextShowTextAtPoint(CGContextRef c, CGFloat x, CGFloat y, const char *string, int length);
// extern void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], int count);
// extern void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], int count);
// extern void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], int count);
// extern void CGContextDrawPDFPage(CGContextRef c, CGPDFPageRef page);
// extern void CGContextDrawPDFDocument(CGContextRef c, CGRect rect, CGPDFDocumentRef document, int page);
// extern void CGContextBeginPage(CGContextRef c, const CGRect *mediaBox);
extern void CGContextEndPage(CGContextRef c);
extern CGContextRef CGContextRetain(CGContextRef c);
extern void CGContextRelease(CGContextRef c);
extern void CGContextFlush(CGContextRef c);
extern void CGContextSynchronize(CGContextRef c);
extern void CGContextSetShouldAntialias(CGContextRef c, bool shouldAntialias);
extern void CGContextSetAllowsAntialiasing(CGContextRef context, bool allowsAntialiasing);
extern void CGContextSetShouldSmoothFonts(CGContextRef c, bool shouldSmoothFonts);
extern void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo);
extern void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo);
extern void CGContextEndTransparencyLayer(CGContextRef context);
extern CGAffineTransform CGContextGetUserSpaceToDeviceSpaceTransform(CGContextRef c);
extern CGPoint CGContextConvertPointToDeviceSpace(CGContextRef c, CGPoint point);
extern CGPoint CGContextConvertPointToUserSpace(CGContextRef c, CGPoint point);
extern CGSize CGContextConvertSizeToDeviceSpace(CGContextRef c, CGSize size);
extern CGSize CGContextConvertSizeToUserSpace(CGContextRef c, CGSize size);
extern CGRect CGContextConvertRectToDeviceSpace(CGContextRef c, CGRect rect);
extern CGRect CGContextConvertRectToUserSpace(CGContextRef c, CGRect rect);
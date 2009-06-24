/* 
 * context.js
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

include('core_graphics/affine_transform');
include('core_graphics/color');
include('core_graphics/color_space');
include('core_graphics/font');
include('core_graphics/gradient');
include('core_graphics/image');
include('core_graphics/path');
include('core_graphics/pattern');
include('core_graphics/shading');

// CGLineJoin
var kCGLineJoinMiter    = 0;
var kCGLineJoinRound    = 1;
var kCGLineJoinBevel    = 2;


// CGLineCap
var kCGLineCapButt      = 0;
var kCGLineCapRound     = 1;
var kCGLineCapSquare    = 2;

// enum CGPathDrawingMode {
//     kCGPathFill,
//     kCGPathEOFill,
//     kCGPathStroke,
//     kCGPathFillStroke,
//     kCGEOFillStroke
// };
// typedef enum CGPathDrawingMode CGPathDrawingMode;
// 
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
// typedef enum CGTextDrawingMode CGTextDrawingMode;

function CGContextSaveGState(c)
{
    
}

function CGContextRestoreGState(c)
{
    
}

function CGContextScaleCTM(c, sx, sy)
{
    
}

function CGContextTranslateCTM(c, tx, ty)
{
    
}

function CGContextRotateCTM(c, angle)
{
    
}

function CGContextConcatCTM(c, transform)
{
    
}

function CGContextGetCTM(c)
{
    
}

function CGContextSetLineWidth(c, width)
{
    
}

function CGContextSetLineCap(c, CGLineCap cap)
{
    
}

function CGContextSetLineJoin(c, CGLineJoin join)
{
    
}

function CGContextSetMiterLimit(c, limit)
{
    
}

function CGContextSetLineDash(c, phase, lengths, int count)
{
    
}

function CGContextSetFlatness(c, flatness)
{
    
}

function CGContextSetAlpha(c, alpha)
{
    
}

// function CGContextSetBlendMode(context, CGBlendMode mode);
function CGContextBeginPath(c)
{
    
}

function CGContextMoveToPoint(c, x, y)
{
    
}

function CGContextAddLineToPoint(c, x, y)
{
    
}

function CGContextAddCurveToPoint(c, cp1x, cp1y, cp2x, cp2y, x, y)
{
    
}

function CGContextAddQuadCurveToPoint(c, cpx, cpy, x, y);
function CGContextClosePath(c);
function CGContextAddRect(c, CGRect rect);
function CGContextAddRects(c, const CGRect rects[], int count);
function CGContextAddLines(c, const CGPoint points[], int count);
function CGContextAddEllipseInRect(context, CGRect rect);
function CGContextAddArc(c, x, y, radius, startAngle, endAngle, int clockwise);
function CGContextAddArcToPoint(c, x1, y1, x2, y2, radius);
function CGContextAddPath(context, CGPathRef path);
function CGContextReplacePathWithStrokedPath(c);
extern bool CGContextIsPathEmpty(c);
function CGContextGetPathCurrentPoint(c);
function CGContextGetPathBoundingBox(c);
extern bool CGContextPathContainsPoint(context, CGPoint point, CGPathDrawingMode mode);
function CGContextDrawPath(c, CGPathDrawingMode mode);
function CGContextFillPath(c);
function CGContextEOFillPath(c);
function CGContextStrokePath(c);
function CGContextFillRect(c, CGRect rect);
function CGContextFillRects(c, const CGRect rects[], int count);
function CGContextStrokeRect(c, CGRect rect);
function CGContextStrokeRectWithWidth(c, CGRect rect, width);
function CGContextClearRect(c, CGRect rect);
function CGContextFillEllipseInRect(context, CGRect rect);
function CGContextStrokeEllipseInRect(context, CGRect rect);
function CGContextStrokeLineSegments(c, const CGPoint points[], int count);
function CGContextClip(c);
function CGContextEOClip(c);
function CGContextClipToMask(c, CGRect rect, CGImageRef mask);
function CGContextGetClipBoundingBox(c);
function CGContextClipToRect(c, CGRect rect);
function CGContextClipToRects(c, const CGRect rects[], int count);
function CGContextSetFillColorWithColor(c, CGColorRef color);
function CGContextSetStrokeColorWithColor(c, CGColorRef color);
function CGContextSetFillColorSpace(c, CGColorSpaceRef colorspace);
function CGContextSetStrokeColorSpace(c, CGColorSpaceRef colorspace);
function CGContextSetFillColor(c, const components[]);
function CGContextSetStrokeColor(c, const components[]);
// function CGContextSetFillPattern(c, CGPatternRef pattern, const components[]);
// function CGContextSetStrokePattern(c, CGPatternRef pattern, const components[]);
function CGContextSetPatternPhase(c, CGSize phase);
function CGContextSetGrayFillColor(c, gray, alpha);
function CGContextSetGrayStrokeColor(c, gray, alpha);
function CGContextSetRGBFillColor(c, red, green, blue, alpha);
function CGContextSetRGBStrokeColor(c, red, green, blue, alpha);
function CGContextSetCMYKFillColor(c, cyan, magenta, yellow, black, alpha);
function CGContextSetCMYKStrokeColor(c, cyan, magenta, yellow, black, alpha);
function CGContextSetRenderingIntent(c, CGColorRenderingIntent intent);
function CGContextDrawImage(c, CGRect rect, CGImageRef image);
function CGContextDrawTiledImage(c, CGRect rect, CGImageRef image);
// extern CGInterpolationQuality CGContextGetInterpolationQuality(c);
// function CGContextSetInterpolationQuality(c, CGInterpolationQuality quality);
function CGContextSetShadowWithColor(context, CGSize offset, blur, CGColorRef color);
function CGContextSetShadow(context, CGSize offset, blur);
function CGContextDrawLinearGradient(context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options);
function CGContextDrawRadialGradient(context, CGGradientRef gradient, CGPoint startCenter, startRadius, CGPoint endCenter, endRadius, CGGradientDrawingOptions options);
// function CGContextDrawShading(context, CGShadingRef shading);
function CGContextSetCharacterSpacing(c, spacing);
function CGContextSetTextPosition(c, x, y);
function CGContextGetTextPosition(c);
function CGContextSetTextMatrix(c, CGAffineTransform t);
function CGContextGetTextMatrix(c);
function CGContextSetTextDrawingMode(c, CGTextDrawingMode mode);
// function CGContextSetFont(c, CGFontRef font);
function CGContextSetFontSize(c, size);
// function CGContextSelectFont(c, const char *name, size, CGTextEncoding textEncoding);
// function CGContextShowGlyphsAtPositions(context, const CGGlyph glyphs[], const CGPoint positions[], int count);
function CGContextShowText(c, const char *string, int length);
function CGContextShowTextAtPoint(c, x, y, const char *string, int length);
// function CGContextShowGlyphs(c, const CGGlyph g[], int count);
// function CGContextShowGlyphsAtPoint(c, x, y, const CGGlyph glyphs[], int count);
// function CGContextShowGlyphsWithAdvances(c, const CGGlyph glyphs[], const CGSize advances[], int count);
// function CGContextDrawPDFPage(c, CGPDFPageRef page);
// function CGContextDrawPDFDocument(c, CGRect rect, CGPDFDocumentRef document, int page);
// function CGContextBeginPage(c, const CGRect *mediaBox);
function CGContextEndPage(c);
function CGContextRetain(c);
function CGContextRelease(c);
function CGContextFlush(c);
function CGContextSynchronize(c);
function CGContextSetShouldAntialias(c, bool shouldAntialias);
function CGContextSetAllowsAntialiasing(context, bool allowsAntialiasing);
function CGContextSetShouldSmoothFonts(c, bool shouldSmoothFonts);
function CGContextBeginTransparencyLayer(context, CFDictionaryRef auxiliaryInfo);
function CGContextBeginTransparencyLayerWithRect(context, CGRect rect, CFDictionaryRef auxiliaryInfo);
function CGContextEndTransparencyLayer(context);
function CGContextGetUserSpaceToDeviceSpaceTransform(c);
function CGContextConvertPointToDeviceSpace(c, CGPoint point);
function CGContextConvertPointToUserSpace(c, CGPoint point);
function CGContextConvertSizeToDeviceSpace(c, CGSize size);
function CGContextConvertSizeToUserSpace(c, CGSize size);
function CGContextConvertRectToDeviceSpace(c, CGRect rect);
function CGContextConvertRectToUserSpace(c, CGRec
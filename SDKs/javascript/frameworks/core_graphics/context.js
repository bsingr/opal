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

include('core_graphics/base');
include('core_graphics/affine_transform');
include('core_graphics/color');
include('core_graphics/color_space');
include('core_graphics/font');
include('core_graphics/gradient');
include('core_graphics/image');
include('core_graphics/path');
include('core_graphics/pattern');


// CGLineJoin
var kCGLineJoinMiter        = 0;
var kCGLineJoinRound        = 1;
var kCGLineJoinBevel        = 2;

// CGLineCap
var kCGLineCapButt          = 0;
var kCGLineCapRound         = 1;
var kCGLineCapSquare        = 2;

// CGPathDrawingMode
var kCGPathFill             = 0;
var kCGPathEOFill           = 1;
var kCGPathStroke           = 2;
var kCGPathFillStroke       = 3;
var kCGEOFillStroke         = 4;

// CGTextDrawingMode
var kCGTextFill             = 0;
var kCGTextStroke           = 1;
var kCGFillStroke           = 2;
var kCGTextInvisible        = 3;
var kCGTextFillClip         = 4;
var kCGTextStrokeClip       = 5;
var kCGTextFillStrokeClip   = 6;
var kCGTextClip             = 7;


var CGLineJoinCanvas = ["miter", "round", "bevel"];
var CGLineCapCanvas = ["butt", "round", "square"];


function CGContextSaveGState(c)
{
    c.save();
}

function CGContextRestoreGState(c)
{
    c.restore();
}

function CGContextScaleCTM(c, sx, sy)
{
    c.scale(sx, sy);
}

function CGContextTranslateCTM(c, tx, ty)
{
    c.translate(tx, ty);
}

function CGContextRotateCTM(c, angle)
{
    c.rotate(angle);
}

function CGContextConcatCTM(c, transform)
{
    
}

function CGContextGetCTM(c)
{
    
}

function CGContextSetLineWidth(c, width)
{
    c.lineWidth = width;
}

function CGContextSetLineCap(c, cap)
{
    c.lineCap = CGLineCapCanvas[cap];
}

function CGContextSetLineJoin(c, join)
{
    c.lineJoin = CGLineJoinCanvas[join];
}

function CGContextSetMiterLimit(c, limit)
{
    c.miterLimit = limit;
}

function CGContextSetLineDash(c, phase, lengths, count)
{
    
}

function CGContextSetFlatness(c, flatness)
{
    
}

function CGContextSetAlpha(c, alpha)
{
    c.globalAlpha = alpha;
}

function CGContextBeginPath(c)
{
    c.beginPath();
}

function CGContextMoveToPoint(c, x, y)
{
    c.moveTo(x, y);
}

function CGContextAddLineToPoint(c, x, y)
{
    c.lineTo(x, y);
}

function CGContextAddCurveToPoint(c, cp1x, cp1y, cp2x, cp2y, x, y)
{
    c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
}

function CGContextAddQuadCurveToPoint(c, cpx, cpy, x, y)
{
    c.quadraticCurveTo(cpx, cpy, x, y);
}

function CGContextClosePath(c)
{
    c.closePath();
}

function CGContextAddRect(c, rect)
{
    c.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}

function CGContextAddRects(c, rects, count)
{
    
}

function CGContextAddLines(c, points, count)
{
    
}

function CGContextAddEllipseInRect(context, rect)
{
    
}

function CGContextAddArc(c, x, y, radius, startAngle, endAngle, clockwise)
{
    c.arc(x, y, radius, startAngle, endAngle, clockwise);
}

function CGContextAddArcToPoint(c, x1, y1, x2, y2, radius)
{
    c.arcTo(x1, y1, x2, y2, radius);
}

// void CGContextAddPath(CGContextRef context, CGPathRef path)
// {
//     
// }
// 
// void CGContextReplacePathWithStrokedPath(CGContextRef c)
// {
//     
// }
// 
// bool CGContextIsPathEmpty(CGContextRef c)
// {
//     
// }
// 
// CGPoint CGContextGetPathCurrentPoint(CGContextRef c)
// {
//     
// }
// 
// CGRect CGContextGetPathBoundingBox(CGContextRef c)
// {
//     
// }
// 
// bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode)
// {
//     
// }
// 
// void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode)
// {
//     
// }
// 
function CGContextFillPath(c)
{
    c.fill();
}
// 
// void CGContextEOFillPath(CGContextRef c)
// {
//     
// }
// 
function CGContextStrokePath(c)
{
    c.stroke();
}
// 
function CGContextFillRect(c, rect)
{
    c.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}
// 
// void CGContextFillRects(CGContextRef c, const CGRect rects[], int count)
// {
//     
// }
// 
// void CGContextStrokeRect(CGContextRef c, CGRect rect)
// {
//     c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// }
// 
// void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width)
// {
//     
// }
// 
// void CGContextClearRect(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// void CGContextFillEllipseInRect(CGContextRef context, CGRect rect)
// {
//     
// }
// 
// void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect)
// {
//     
// }
// 
// void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count)
// {
//     
// }
// 
// void CGContextClip(CGContextRef c)
// {
//     
// }
// 
// void CGContextEOClip(CGContextRef c)
// {
//     
// }
// 
// void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask)
// {
//     
// }
// 
// CGRect CGContextGetClipBoundingBox(CGContextRef c)
// {
//     
// }
// 
// void CGContextClipToRect(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count)
// {
//     
// }
// 
// void CGContextSetFillColorWithColor(CGContextRef c, CGColorRef color)
// {
//     
// }
// 
// void CGContextSetStrokeColorWithColor(CGContextRef c, CGColorRef color)
// {
//     
// }
// 
// void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace)
// {
//     
// }
// 
// void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace)
// {
//     
// }
// 
// void CGContextSetFillColor(CGContextRef c, const CGFloat components[])
// {
//     
// }
// 
// void CGContextSetStrokeColor(CGContextRef c, const CGFloat components[])
// {
//     
// }
// 
// //void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// //void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// 
// void CGContextSetPatternPhase(CGContextRef c, CGSize phase)
// {
//     
// }
// 
// void CGContextSetGrayFillColor(CGContextRef c, CGFloat gray, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetGrayStrokeColor(CGContextRef c, CGFloat gray, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetRGBFillColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetRGBStrokeColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent)
// {
//     
// }
// 
function CGContextDrawImage(c, rect, image)
{
    c.drawImage(image, rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}
// 
// void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image)
// {
//     
// }
// 
// //CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
// //void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);
// 
function CGContextSetShadowWithColor(c, offset, blur, color)
{
    c.shadowOffsetX = offset.width;
    c.shadowOffsetY = offset.height;
    c.shadowBlur = blur;
    c.shadowColor = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// 
// void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur)
// {
//     c.shadowOffsetX = offset.width;
//     c.shadowOffsetY = offset.height;
//     c.shadowBlur = blur;
//     c.shadowColor = "rgba(1,1,1,1)";
// }
// 
// void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options)
// {
//     
// }
// 
// void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options)
// {
//     
// }
// 
// //void CGContextDrawShading(CGContextRef context, CGShadingRef shading);
// 
// void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing)
// {
//     
// }
// 
// void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y)
// {
//     
// }
// 
// CGPoint CGContextGetTextPosition(CGContextRef c)
// {
//     
// }
// 
// void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t)
// {
//     
// }
// 
// CGAffineTransform CGContextGetTextMatrix(CGContextRef c)
// {
//     
// }
// 
// void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode)
// {
//     
// }
// 
function CGContextSetFont(c, font)
{
    c.font = CGFontGetStringRepresentation(font);
}
// 
// void CGContextSetFontSize(CGContextRef c, CGFloat size)
// {
//     
// }
// 
// //void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
// //void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], int count);
// 
// void CGContextShowText(CGContextRef c, const char *string, int length)
// {
//     
// }
// 
function CGContextShowTextAtPoint(c, x, y, string, length)
{
    if (!window.opera)
        c.fillText(string, x, y);
}
// 
// //void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], int count);
// //void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], int count);
// //void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], int count);
// //void CGContextDrawPDFPage(CGContextRef c, CGPDFPageRef page);
// //void CGContextDrawPDFDocument(CGContextRef c, CGRect rect, CGPDFDocumentRef document, int page);
// //void CGContextBeginPage(CGContextRef c, const CGRect *mediaBox);
// void CGContextEndPage(CGContextRef c)
// {
//     
// }
// 
// CGContextRef CGContextRetain(CGContextRef c)
// {
//     
// }
// 
// void CGContextRelease(CGContextRef c)
// {
//     
// }
// 
// void CGContextFlush(CGContextRef c)
// {
//     
// }
// 
// void CGContextSynchronize(CGContextRef c)
// {
//     
// }
// 
// void CGContextSetShouldAntialias(CGContextRef c, bool shouldAntialias)
// {
//     
// }
// 
// void CGContextSetAllowsAntialiasing(CGContextRef context, bool allowsAntialiasing)
// {
//     
// }
// 
// void CGContextSetShouldSmoothFonts(CGContextRef c, bool shouldSmoothFonts)
// {
//     
// }
// 
// void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo)
// {
//     
// }
// 
// void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo)
// {
//     
// }
// 
// void CGContextEndTransparencyLayer(CGContextRef context)
// {
//     
// }
// 
// CGAffineTransform CGContextGetUserSpaceToDeviceSpaceTransform(CGContextRef c)
// {
//     
// }
// 
// CGPoint CGContextConvertPointToDeviceSpace(CGContextRef c, CGPoint point)
// {
//     
// }
// 
// CGPoint CGContextConvertPointToUserSpace(CGContextRef c, CGPoint point)
// {
//     
// }
// 
// CGSize CGContextConvertSizeToDeviceSpace(CGContextRef c, CGSize size)
// {
//     
// }
// 
// CGSize CGContextConvertSizeToUserSpace(CGContextRef c, CGSize size)
// {
//     
// }
// 
// CGRect CGContextConvertRectToDeviceSpace(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// CGRect CGContextConvertRectToUserSpace(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// // =========================
// // = Vienna added methods: =
// // =========================
// 
function CGContextRGBAStringFromColor(color)
{
    return "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// 
// 
// // {
// //     c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// // }
// // 
// 
// // 
// // function CGContextStrokeRect(c, rect)
// // {
// //     c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// // }
// // 
// // //void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width);
// // // 
// // function CGContextStrokeRectWithWidth(c, rect, width)
// // {
// //     
// // }
// // 
// // //void CGContextClearRect(CGContextRef c, CGRect rect);
// // // 
function CGContextClearRect(c, rect)
{
    c.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}
// // 
// // //void CGContextFillEllipseInRect(CGContextRef context, CGRect rect);
// // // 
// // function CGContextFillEllipseInRect(c, rect)
// // {
// //     
// // }
// // 
// // //void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect);
// // // 
// // function CGContextStrokeEllipseInRect(c, rect)
// // {
// //     
// // }
// // 
// // //void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count);
// // // 
// // function CGContextStrokeLineSegments(c, points, count)
// // {
// //     
// // }
// // 
// // //void CGContextClip(CGContextRef c);
// // // 
// // function CGContextClip(c)
// // {
// //     
// // }
// // 
// // //void CGContextEOClip(CGContextRef c);
// // function CGContextEOClip (c)
// // {
// //     
// // }
// // 
// // //void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask);
// // // 
// // function CGContextClipToMask(c, rect, mask)
// // {
// //     
// // }
// // 
// // //CGRect CGContextGetClipBoundingBox(CGContextRef c);
// // // 
// // function CGContextGetClipBoundingBox(c)
// // {
// //     
// // }
// // 
// // //void CGContextClipToRect(CGContextRef c, CGRect rect);
// // // 
// // function CGContextClipToRect(c, rect)
// // {
// //     
// // }
// // 
// // //void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count);
// // // 
// // function CGContextClipToRects(c, rects, count)
// // {
// //     
// // }
// // 
function CGContextSetFillColorWithColor(c, color)
{
    c.fillStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// // 
function CGContextSetStrokeColorWithColor(c, color)
{
    c.strokeStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// // 
// // //void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// // // 
// // function CGContextSetFillColorSpace(c, colorspace)
// // {
// //     
// // }
// // 
// // //void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// // // 
// // function CGContextSetStrokeColorSpace(c, colorspace)
// // {
// //     
// // }
// // 
function CGContextSetFillColor(c, componenets)
{
    c.fillStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
}
// // 
// // function CGContextSetStrokeColor(c, componenets)
// // {
// //     c.strokeStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
// // }
// // 
// // //void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// // // 
// // function CGContextSetFillPattern(c, pattern, components)
// // {
// //     
// // }
// // 
// // //void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// // // 
// // function CGContextSetStrokePattern(c, pattern, components)
// // {
// //     
// // }
// // 
// // //void CGContextSetPatternPhase(CGContextRef c, CGSize phase);
// // // 
// // function CGContextSetPatternPhase(c, phase)
// // {
// //     
// // }
// //  
// // function CGContextSetGrayFillColor(c, gray, alpha)
// // {
// //  c.strokeStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// // }
// // 
// // function CGContextSetGrayStrokeColor(c, gray, alpha)
// // {
// //     c.fillStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// // }
// // 
// // function CGContextSetRGBFillColor(c, red, green, blue, alpha)
// // {
// //     c.fillStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")";    
// // }
// // 
// // function CGContextSetRGBStrokeColor(c, red, green, blue, alpha)
// // {
// //     c.strokeStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")"; 
// // }

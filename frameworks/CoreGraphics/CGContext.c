/* 
 * CGContext.c
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

#include "CGContext.h"

CFTypeID CGContextGetTypeID(void)
{
    int bob[] = { 2, 3, 4 };
    CGContextRef c = { .age = 10, .weith = 30 };
}

void CGContextSaveGState(CGContextRef c)
{
    c.save();
}

void CGContextRestoreGState(CGContextRef c)
{
    c.restore();
}

void CGContextScaleCTM(CGContextRef c, CGFloat sx, CGFloat sy)
{
    
}

void CGContextTranslateCTM(CGContextRef c, CGFloat tx, CGFloat ty)
{
    
}

void CGContextRotateCTM(CGContextRef c, CGFloat angle)
{
    
}

void CGContextConcatCTM(CGContextRef c, CGAffineTransform transform)
{
    
}

CGAffineTransform CGContextGetCTM(CGContextRef c)
{
    
}

void CGContextSetLineWidth(CGContextRef c, CGFloat width)
{
    
}

void CGContextSetLineCap(CGContextRef c, CGLineCap cap)
{
    
}

void CGContextSetLineJoin(CGContextRef c, CGLineJoin join)
{
    
}

void CGContextSetMiterLimit(CGContextRef c, CGFloat limit)
{
    
}

void CGContextSetLineDash(CGContextRef c, CGFloat phase, const CGFloat lengths[], int count)
{
    
}

void CGContextSetFlatness(CGContextRef c, CGFloat flatness)
{
    
}

void CGContextSetAlpha(CGContextRef c, CGFloat alpha)
{
    
}

//void CGContextSetBlendMode(CGContextRef context, CGBlendMode mode);

void CGContextBeginPath(CGContextRef c)
{
    
}

void CGContextMoveToPoint(CGContextRef c, CGFloat x, CGFloat y)
{
    
}

void CGContextAddLineToPoint(CGContextRef c, CGFloat x, CGFloat y)
{
    
}

void CGContextAddCurveToPoint(CGContextRef c, CGFloat cp1x, CGFloat cp1y, CGFloat cp2x, CGFloat cp2y, CGFloat x, CGFloat y)
{
    
}

void CGContextAddQuadCurveToPoint(CGContextRef c, CGFloat cpx, CGFloat cpy, CGFloat x, CGFloat y)
{
    
}

void CGContextClosePath(CGContextRef c)
{
    
}

void CGContextAddRect(CGContextRef c, CGRect rect)
{
    
}

void CGContextAddRects(CGContextRef c, const CGRect rects[], int count)
{
    
}

void CGContextAddLines(CGContextRef c, const CGPoint points[], int count)
{
    
}

void CGContextAddEllipseInRect(CGContextRef context, CGRect rect)
{
    
}

void CGContextAddArc(CGContextRef c, CGFloat x, CGFloat y, CGFloat radius, CGFloat startAngle, CGFloat endAngle, int clockwise)
{
    
}

void CGContextAddArcToPoint(CGContextRef c, CGFloat x1, CGFloat y1, CGFloat x2, CGFloat y2, CGFloat radius)
{
    
}

void CGContextAddPath(CGContextRef context, CGPathRef path)
{
    
}

void CGContextReplacePathWithStrokedPath(CGContextRef c)
{
    
}

bool CGContextIsPathEmpty(CGContextRef c)
{
    
}

CGPoint CGContextGetPathCurrentPoint(CGContextRef c)
{
    
}

CGRect CGContextGetPathBoundingBox(CGContextRef c)
{
    
}

bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode)
{
    
}

void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode)
{
    
}

void CGContextFillPath(CGContextRef c)
{
    
}

void CGContextEOFillPath(CGContextRef c)
{
    
}

void CGContextStrokePath(CGContextRef c)
{
    
}

void CGContextFillRect(CGContextRef c, CGRect rect)
{
    
}

void CGContextFillRects(CGContextRef c, const CGRect rects[], int count)
{
    
}

void CGContextStrokeRect(CGContextRef c, CGRect rect)
{
    
}

void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width)
{
    
}

void CGContextClearRect(CGContextRef c, CGRect rect)
{
    
}

void CGContextFillEllipseInRect(CGContextRef context, CGRect rect)
{
    
}

void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect)
{
    
}

void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count)
{
    
}

void CGContextClip(CGContextRef c)
{
    
}

void CGContextEOClip(CGContextRef c)
{
    
}

void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask)
{
    
}

CGRect CGContextGetClipBoundingBox(CGContextRef c)
{
    
}

void CGContextClipToRect(CGContextRef c, CGRect rect)
{
    
}

void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count)
{
    
}

void CGContextSetFillColorWithColor(CGContextRef c, CGColorRef color)
{
    
}

void CGContextSetStrokeColorWithColor(CGContextRef c, CGColorRef color)
{
    
}

void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace)
{
    
}

void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace)
{
    
}

void CGContextSetFillColor(CGContextRef c, const CGFloat components[])
{
    
}

void CGContextSetStrokeColor(CGContextRef c, const CGFloat components[])
{
    
}

//void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
//void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);

void CGContextSetPatternPhase(CGContextRef c, CGSize phase)
{
    
}

void CGContextSetGrayFillColor(CGContextRef c, CGFloat gray, CGFloat alpha)
{
    
}

void CGContextSetGrayStrokeColor(CGContextRef c, CGFloat gray, CGFloat alpha)
{
    
}

void CGContextSetRGBFillColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
{
    
}

void CGContextSetRGBStrokeColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
{
    
}

void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
{
    
}

void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
{
    
}

void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent)
{
    
}

void CGContextDrawImage(CGContextRef c, CGRect rect, CGImageRef image)
{
    
}

void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image)
{
    
}

//CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
//void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);

void CGContextSetShadowWithColor(CGContextRef context, CGSize offset, CGFloat blur, CGColorRef color)
{
    
}

void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur)
{
    
}

void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options)
{
    
}

void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options)
{
    
}

//void CGContextDrawShading(CGContextRef context, CGShadingRef shading);

void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing)
{
    
}

void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y)
{
    
}

CGPoint CGContextGetTextPosition(CGContextRef c)
{
    
}

void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t)
{
    
}

CGAffineTransform CGContextGetTextMatrix(CGContextRef c)
{
    
}

void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode)
{
    
}

//void CGContextSetFont(CGContextRef c, CGFontRef font);

void CGContextSetFontSize(CGContextRef c, CGFloat size)
{
    
}

//void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
//void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], int count);

void CGContextShowText(CGContextRef c, const char *string, int length)
{
    
}

void CGContextShowTextAtPoint(CGContextRef c, CGFloat x, CGFloat y, const char *string, int length)
{
    
}

//void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], int count);
//void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], int count);
//void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], int count);
//void CGContextDrawPDFPage(CGContextRef c, CGPDFPageRef page);
//void CGContextDrawPDFDocument(CGContextRef c, CGRect rect, CGPDFDocumentRef document, int page);
//void CGContextBeginPage(CGContextRef c, const CGRect *mediaBox);
void CGContextEndPage(CGContextRef c)
{
    
}

CGContextRef CGContextRetain(CGContextRef c)
{
    
}

void CGContextRelease(CGContextRef c)
{
    
}

void CGContextFlush(CGContextRef c)
{
    
}

void CGContextSynchronize(CGContextRef c)
{
    
}

void CGContextSetShouldAntialias(CGContextRef c, bool shouldAntialias)
{
    
}

void CGContextSetAllowsAntialiasing(CGContextRef context, bool allowsAntialiasing)
{
    
}

void CGContextSetShouldSmoothFonts(CGContextRef c, bool shouldSmoothFonts)
{
    
}

void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo)
{
    
}

void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo)
{
    
}

void CGContextEndTransparencyLayer(CGContextRef context)
{
    
}

CGAffineTransform CGContextGetUserSpaceToDeviceSpaceTransform(CGContextRef c)
{
    
}

CGPoint CGContextConvertPointToDeviceSpace(CGContextRef c, CGPoint point)
{
    
}

CGPoint CGContextConvertPointToUserSpace(CGContextRef c, CGPoint point)
{
    
}

CGSize CGContextConvertSizeToDeviceSpace(CGContextRef c, CGSize size)
{
    
}

CGSize CGContextConvertSizeToUserSpace(CGContextRef c, CGSize size)
{
    
}

CGRect CGContextConvertRectToDeviceSpace(CGContextRef c, CGRect rect)
{
    
}

CGRect CGContextConvertRectToUserSpace(CGContextRef c, CGRect rect)
{
    
}

// var CGLineJoinCanvas = ["miter", "round", "bevel"];
// 
// var CGLineCapCanvas = ["butt", "round", "square"];
// 
// function CGContextSaveGState(c)
// {
//     c.save();
// }
// 
// function CGContextRestoreGState(c)
// {
//     c.restore();
// }
// 
// function CGContextScaleCTM(c, sx, sy)
// {
//     c.scale(sx, sy);
// }
// 
// function CGContextTranslateCTM(c, tx, ty)
// {
//     c.translate(tx, ty);
// }
// 
// function CGContextRotateCTM(c, angle)
// {
//     c.rotate(angle);
// }
// 
// //void CGContextConcatCTM(CGContextRef c, CGAffineTransform transform);
// // 
// function CGContextConcatCTM(c, transform)
// {
//     
// }
// 
// //CGAffineTransform CGContextGetCTM(CGContextRef c);
// // 
// function CGContextGetCTM(c)
// {
//     
// }
// 
// function CGContextSetLineWidth(c, width)
// {
//     c.lineWidth = width;
// }
// 
// function CGContextSetLineCap(c, cap)
// {
//     c.lineCap = CGLineCapCanvas[cap];
// }
// 
// function CGContextSetLineJoin(c, join)
// {
//     c.lineJoin = CGLineJoinCanvas[join];
// }
// 
// function CGContextSetMiterLimit(c, limit)
// {
//     c.miterLimit = limit;
// }
// 
// //void CGContextSetLineDash(CGContextRef c, CGFloat phase, const CGFloat lengths[], int count);
// // 
// function CGContextSetLineDash(c, phase, lengths, count)
// {
//     
// }
// 
// //void CGContextSetFlatness(CGContextRef c, CGFloat flatness);
// // 
// function CGContextSetFlatness(c, flatness)
// {
//     
// }
// 
// function CGContextSetAlpha(c, alpha)
// {
//     c.globalAlpha = alpha;
// }
// 
// //void CGContextSetBlendMode(CGContextRef context, CGBlendMode mode);
// // 
// function CGContextSetBlendMode(c, mode)
// {
//     
// }
// 
// function CGContextBeginPath(c)
// {
//     c.beginPath();
// }
// 
// function CGContextMoveToPoint(c, x, y)
// {
//     c.moveTo(x, y);
// }
// 
// function CGContextAddLineToPoint(c, x, y)
// {
//     c.lineTo(x, y);
// }
// 
// function CGContextAddCurveToPoint(c, cp1x, cp1y, cp2x, cp2y, x, y)
// {
//     c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
// }
// 
// function CGContextAddQuadCurveToPoint(c, cpx, cpy, x, y)
// {
//     c.quadraticCurveTo(cpx, cpy, x, y);
// }
// 
// function CGContextClosePath(c)
// {
//     c.closePath();
// }
// 
// function CGContextAddRect(c, rect)
// {
//     c.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
// }
// 
// //void CGContextAddRects(CGContextRef c, const CGRect rects[], int count);
// // 
// function CGContextAddRects(c, rects, count)
// {
//     
// }
// 
// //void CGContextAddLines(CGContextRef c, const CGPoint points[], int count);
// // 
// function CGContextAddLines(c, points, count)
// {
//     
// }
// 
// //void CGContextAddEllipseInRect(CGContextRef context, CGRect rect);
// // 
// function CGContextAddEllipeInRect(c, rect)
// {
//     
// }
// 
// function CGContextAddArc(c, x, y, radius, startAngle, endAngle, clockwise)
// {
//     c.arc(x, y, radius, startAngle, endAngle, clockwise);
// }
// 
// function CGContextAddArcToPoint(c, x1, y1, x2, y2, radius)
// {
//     c.arcTo(x1, y1, x2, y2, radius);
// }
// 
// //void CGContextAddPath(CGContextRef context, CGPathRef path);
// // 
// function CGContextAddPath(c, path)
// {
//     
// }
// 
// //void CGContextReplacePathWithStrokedPath(CGContextRef c);
// // 
// function CGContextReplacePathWithStrokedPath(c)
// {
//     
// }
// 
// //bool CGContextIsPathEmpty(CGContextRef c);
// // 
// function CGContextIsPathEmpty(c)
// {
//     
// }
// 
// //CGPoint CGContextGetPathCurrentPoint(CGContextRef c);
// // 
// function CGContectGetPathCurrentPoint(c)
// {
//     
// }
// 
// //CGRect CGContextGetPathBoundingBox(CGContextRef c);
// // 
// function CGContextGetPathBoundingBox(c)
// {
//     
// }
// 
// //bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode);
// // 
// function CGContextPathContainsPoint(c, point, mode)
// {
//     
// }
// 
// //void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode);
// // 
// function CGContextDrawPath(c, mode)
// {
//     
// }
// 
// //void CGContextFillPath(CGContextRef c);
// // 
// function CGContextFillPath(c)
// {
//     
// }
// 
// //void CGContextEOFillPath(CGContextRef c);
// // 
// function CGContextEOFillPath(c)
// {
//     
// }
// 
// //void CGContextStrokePath(CGContextRef c);
// // 
// function CGContextStrokePath(c)
// {
//     
// }
// 
// function CGContextFillRect(c, rect)
// {
//     c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// }
// 

// 
// function CGContextStrokeRect(c, rect)
// {
//     c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// }
// 
// //void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width);
// // 
// function CGContextStrokeRectWithWidth(c, rect, width)
// {
//     
// }
// 
// //void CGContextClearRect(CGContextRef c, CGRect rect);
// // 
// function CGContextClearRect(c, rect)
// {
//     c.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
// }
// 
// //void CGContextFillEllipseInRect(CGContextRef context, CGRect rect);
// // 
// function CGContextFillEllipseInRect(c, rect)
// {
//     
// }
// 
// //void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect);
// // 
// function CGContextStrokeEllipseInRect(c, rect)
// {
//     
// }
// 
// //void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count);
// // 
// function CGContextStrokeLineSegments(c, points, count)
// {
//     
// }
// 
// //void CGContextClip(CGContextRef c);
// // 
// function CGContextClip(c)
// {
//     
// }
// 
// //void CGContextEOClip(CGContextRef c);
// function CGContextEOClip (c)
// {
//     
// }
// 
// //void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask);
// // 
// function CGContextClipToMask(c, rect, mask)
// {
//     
// }
// 
// //CGRect CGContextGetClipBoundingBox(CGContextRef c);
// // 
// function CGContextGetClipBoundingBox(c)
// {
//     
// }
// 
// //void CGContextClipToRect(CGContextRef c, CGRect rect);
// // 
// function CGContextClipToRect(c, rect)
// {
//     
// }
// 
// //void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count);
// // 
// function CGContextClipToRects(c, rects, count)
// {
//     
// }
// 
// function CGContextSetFillColorWithColor(c, color)
// {
//     c.fillStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
// }
// 
// function CGContextSetStrokeColorWithColor(c, color)
// {
//     c.strokeStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
// }
// 
// //void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// // 
// function CGContextSetFillColorSpace(c, colorspace)
// {
//     
// }
// 
// //void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// // 
// function CGContextSetStrokeColorSpace(c, colorspace)
// {
//     
// }
// 
// function CGContextSetFillColor(c, componenets)
// {
//     c.fillStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
// }
// 
// function CGContextSetStrokeColor(c, componenets)
// {
//     c.strokeStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
// }
// 
// //void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// // 
// function CGContextSetFillPattern(c, pattern, components)
// {
//     
// }
// 
// //void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// // 
// function CGContextSetStrokePattern(c, pattern, components)
// {
//     
// }
// 
// //void CGContextSetPatternPhase(CGContextRef c, CGSize phase);
// // 
// function CGContextSetPatternPhase(c, phase)
// {
//     
// }
//  
// function CGContextSetGrayFillColor(c, gray, alpha)
// {
//  c.strokeStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// }
// 
// function CGContextSetGrayStrokeColor(c, gray, alpha)
// {
//     c.fillStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// }
// 
// function CGContextSetRGBFillColor(c, red, green, blue, alpha)
// {
//     c.fillStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")";    
// }
// 
// function CGContextSetRGBStrokeColor(c, red, green, blue, alpha)
// {
//     c.strokeStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")"; 
// }
// 
// //void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// // 
// function CGContextSetCMYKFillColor(c, cyan, magenta, yellow, black, alpha)
// {
//     
// }
// 
// //void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// // 
// function CGContextSetCMYKStrokeColor(c, cyan, magenta, yellow, black, alpha)
// {
//     
// }
// //void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent);
// // 
// function CGContextSetRenderingIntent(c, intent)
// {
//     
// }
// 
// //void CGContextDrawImage(CGContextRef c, CGRect rect, CGImageRef image);
// // 
// function CGContextDrawImage(c, rect, image)
// {
//     c.drawImage(image._representations[0], rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
//     
//     // if(CGImageDataRepresentationFinishedLoading(image) == 4)
//     //     {
//     //         NSLog("Image has loaded, so can draw...");
//     //     }
//     //     else
//     //     {
//     //         NSLog("Image has not loaded, so cannot draw");
//     //     }
// }
// 
// //void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image);
// // 
// function CGContextDrawTiledImage(c, rect, image)
// {
//     
// }
// 
// //CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
// // 
// function CGContextGetInterpolationQuality(c)
// {
//     
// }
// 
// //void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);
// // 
// function CGContextSetInterpolationQuality(c, quality)
// {
//     
// }
// 
// //void CGContextSetShadowWithColor(CGContextRef context, CGSize offset, CGFloat blur, CGColorRef color);
// // 
// function CGContextSetShadowWithColor(c, offset, blur, color)
// {
//     c.shadowOffsetX = offset.width;
//     c.shadowOffsetY = offset.height;
//     c.shadowBlur = blur;
//     c.shadowColor = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
// }
// 
// //void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur);
// // 
// function CGContextSetShadow(c, offset, blur)
// {
//     c.shadowOffsetX = offset.width;
//     c.shadowOffsetY = offset.height;
//     c.shadowBlur = blur;
//     c.shadowColor = "rgba(1,1,1,1)";
// }
// 
// //void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options);
// // 
// function CGContextDrawLinearGradient(c, gradient, startPoint, endPoint, options)
// {
//     var theGradient = c.createLinearGradient(startPoint.x, startPoint.y, 0, endPoint.y);
//     for(var i = 0; i < gradient._colors.length; i++)
//     {
//         theGradient.addColorStop(gradient._locations[i], CGContextRGBAStringFromColor(gradient._colors[i]));
//     }
//     c.fillStyle = theGradient;
//     c.fillRect();
// }
// 
// //void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options);
// // 
// function CGContextDrawRadialGradient(c, gradient, startCenter, startRadius, endCenter, endRadius, options)
// {
//     
// }
// 
// //void CGContextDrawShading(CGContextRef context, CGShadingRef shading);
// // 
// function CGContextDrawShading(c, shading)
// {
//     
// }
// 
// //void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing);
// // 
// function CGContextSetCharacterSpacing(c, spacing)
// {
//     
// }
// 
// //void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y);
// // 
// function CGContextSetTextPosition(c, x, y)
// {
//     
// }
// 
// //CGPoint CGContextGetTextPosition(CGContextRef c);
// // 
// function CGContextGetTextPosition(c)
// {
//     
// }
// 
// 
// //void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t);
// // 
// function CGContextSetTextMatrix(c, t)
// {
//     
// }
// 
// 
// //CGAffineTransform CGContextGetTextMatrix(CGContextRef c);
// // 
// function CGContextGetTextMatrix(c)
// {
//     
// }
// 
// //void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode);
// // 
// function CGContextSetTextDrawingMode(c, mode)
// {
//     
// }
// 
// //void CGContextSetFont(CGContextRef c, CGFontRef font);
// // 
// function CGContextSetFont(c, font)
// {
//     c.font = CGFontGetStringRepresentation(font);
// }
// 
// //void CGContextSetFontSize(CGContextRef c, CGFloat size);
// // 
// function CGContextSetFontSize(c, size)
// {
//     
// }
// 
// //void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
// // 
// function CGContextSelectFont(c, name, size, textEncoding)
// {
//     
// }
// 
// //void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], int count);
// // 
// function CGContextShowGlyphsAtPositions(c, glyphs, positions, count)
// {
//     
// }
// 
// //void CGContextShowText(CGContextRef c, const char *string, int length);
// // 
// function CGContextShowText(c, string, length)
// {
//     
// }
// 
// //void CGContextShowTextAtPoint(CGContextRef c, CGFloat x, CGFloat y, const char *string, int length);
// // 
// function CGContextShowTextAtPoint(c, x, y, string, length)
// {
//     if (!window.opera)
//         c.fillText(string, x, y);
// }
// 
// //void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], int count);
// // 
// function CGContextShowGlyphs(c, g, count)
// {
//     
// }
// 
// //void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], int count);
// // 
// function CGContextShowGlyphsAtPoint(c, x, y, glyphs, count)
// {
//     
// }
// 
// //void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], int count);
// // 
// function CGContextShowGlyphsWithAdvances(c, glyphs, advances, count)
// {
//     
// }
// 
// //void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo);
// // 
// function CGContextBeginTransparencyLayer(c, auxiliaryInfo)
// {
//     
// }
// 
// //void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo);
// // 
// function CGContextBeginTransparencyLayerWithRect(c, rect, auxiliaryInfo)
// {
//     
// }
// 
// //void CGContextEndTransparencyLayer(CGContextRef context);
// // 
// function CGContextEndTransparencyLayer(c)
// {
//     
// }
// 
// // =========================
// // = Vienna added methods: =
// // =========================
// 
// function CGContextRGBAStringFromColor(color)
// {
//     return "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
// }

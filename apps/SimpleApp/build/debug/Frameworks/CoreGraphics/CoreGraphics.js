// 
//  CGAffineTransform.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// struct CGAffineTransform {
//     CGFloat a, b, c, d;
//     CGFloat tx, ty;
// };
// 
function CGAffineTransform()
{
    this.a = 0; this.b = 0; this.c = 0; this.d = 0; this.tx = 0; this.ty = 0;
}

// extern const CGAffineTransform CGAffineTransformIdentity;
//
var CGAffineTransformIdentity = {
  a:0, b:0, c:0, d:0, tx:0, ty:0
};

// extern CGAffineTransform CGAffineTransformMake (CGFloat a, CGFloat b, CGFloat c, CGFloat d, CGFLoat tx, CGFloat ty);
// 
function CGAffineTransformMake(a, b, c, d, tx, ty)
{
    var t = new CGAffineTransform();
    t.a = a; t.b = b; t.c = c; t.d = d; t.tx = tx; t.ty = ty;
    return t;
}

// extern CGAffineTransform CGAffineTransformMakeTranslation(CGFloat tx, CGFloat ty);
// 

// extern CGAffineTransform CGAffineTransformMakeScale(CGFloat sx, CGFloat sy);
// 
// extern CGAffineTransform CGAffineTransformMakeRotation(CGFloat angle);
// 
// extern bool CGAffineTransformIsIdentity(CGAffineTransform t);
// 
// extern CGAffineTransform CGAffineTransformTranslate(CGAffineTransform t, CGFloat tx, CGFloat ty);
// 
// extern CGAffineTransform CGAffineTransformScale(CGAffineTransform t, CGFloat sx, CGFloat sy);
// 
// extern CGAffineTransform CGAffineTransformRotate(CGAffineTransform t, CGFloat angle);
// 
// extern CGAffineTransform CGAffineTransformInvert(CGAffineTransform t);
// 
// extern CGAffineTransform CGAffineTransformConcat(CGAffineTransform t1, CGAffineTransform t2);
// 
// extern bool CGAffineTransformEqualToTransform(CGAffineTransform t1, CGAffineTransform t2);
// 
// extern CGPoint CGPointApplyAffineTransform(CGPoint point, CGAffineTransform t);
// 
// extern CGSize CGSizeApplyAffineTransform(CGSize size, CGAffineTransform t);
// 
// extern CGRect CGRectApplyAffineTransform(CGRect rect, CGAffineTransform t);// 
//  CGBitmapContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGContentRef CGBitmapContextCreate (void *data, size_t width, size_t height, size_t bitsPerComponent, size_t bytesPerRow, CGColorSpaceRef colorSpace, CGBitmapInfo bitmapInfo);
// 
function CGBitmapContextCreate(data, width, height, bitsPerComponent, bytesPerRow, colorSpace, bitmapInfo)
{
    // Essentially return a canvas element.
    var theContext = document.createElement("canvas");
    
    // do other stuff here... height etc
    // do not need to add it to the window
    return theContext;
}

// extern void *CGBitmapContextGetData (CGContentRef c);
// 
function CGBitmapContextGetData(c)
{
    
}

// extern size_t CGBitmapContextGetWidth(CGContextRef c);
// 
function CGBitmapContextGetWidth(c)
{
    
}

// extern size_t CGBitmapContextGetHeight(CGContextRef c);
// 
function CGBitmapContextGetHeight(c)
{
    
}

// extern size_t CGBitmapContextGetBitsPerComponent(CGContextRef c);
// 
function CGBitmapContextGetBitsPerComponent(c)
{
    
}

// extern size_t CGBitmapContextGetBytesPerRow(CGContextRef c);
// 
function CGBitmapContextGetBytesPerRow(c)
{
    
}

// extern CGColorSpaceRef CGBitmapContextGetColorSpace(CGContextRef c);
// 
function CGBitmapContextGetColorSpace(c)
{
    
}

// extern CGImageAlphaInfo CGBitmapContextGetAlphaInfo(CGContextRef c);
// 
function CGBitmapContextGetAlphaInfo(c)
{
    
}

// extern CGBitmapInfo CGBitmapContextGetBitmapInfo(CGContextRef c);
// 
function CGBitmapContextGetBitmapInfo (c)
{
    
}

// extern CGImageRef CGBitmapContextCreateImage(CGContextRef c);
// 
function CGBitmapContextCreateImage (c)
{
    
}
// 
//  CGColor.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGColorRef CGColorCreate(CGColorSpaceRef space, CGFloat components[]);
// 

// extern CGColorRef CGColorCreateGenericGray(CGFloat gray, CGFloat alpha);
// extern CGColorRef CGColorCreateGenericRGB(CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha);
function CGColorCreateGenericRGB(red, green, blue, alpha)
{
	return {
		_red: red,
		_blue: blue,
		_green: green,
		_alpha: alpha
	};
}


// extern CGColorRef CGColorCreateGenericCMYK(CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha);
// extern CGColorRef CGColorGetConstantColor(CFStringRef colorName);
// // extern CGColorRef CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);
// extern CGColorRef CGColorCreateCopy(CGColorRef color);
// extern CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha);
// extern CGColorRef CGColorRetain(CGColorRef color);
// extern void CGColorRelease(CGColorRef color);
// extern bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2);
// extern size_t CGColorGetNumberOfComponents(CGColorRef color);
// extern const CGFloat *CGColorGetComponents(CGColorRef color);
// extern CGFloat CGColorGetAlpha(CGColorRef color);
// extern CGColorSpaceRef CGColorGetColorSpace(CGColorRef color);
// // extern CGPatternRef CGColorGetPattern(CGColorRef color);
// extern CFTypeID CGColorGetTypeID(void);
// 
// extern CFStringRef kCGColorWhite;
// extern CFStringRef kCGColorBlack;
// extern CFStringRef kCGColorClear;
// 
// 
//  CGContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

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

function CGContextSetAlpha(c, alpha)
{
    c.globalAlpha = alpha;
}

// extern void CGContextSetBlendMode(CGContextRef context, CGBlendMode mode);
// 
function CGContextSetBlendMode(c, mode)
{
    
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

function CGContextAddArc(c, x, y, radius, startAngle, endAngle, clockwise)
{
    c.arc(x, y, radius, startAngle, endAngle, clockwise);
}

function CGContextAddArcToPoint(c, x1, y1, x2, y2, radius)
{
    c.arcTo(x1, y1, x2, y2, radius);
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

function CGContextFillRect(c, rect)
{
    c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
}

function CGContextFillRects(c, rects, count)
{
    for (var i = 0; i < count; i ++)
        CGContextFillRect(c, rects[i]);
}

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
    c.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
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

function CGContextSetFillColorWithColor(c, color)
{
    c.fillStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}

function CGContextSetStrokeColorWithColor(c, color)
{
    c.strokeStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
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

function CGContextSetFillColor(c, componenets)
{
    c.fillStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
}

function CGContextSetStrokeColor(c, componenets)
{
    c.strokeStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
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
 
function CGContextSetGrayFillColor(c, gray, alpha)
{
	c.strokeStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
}

function CGContextSetGrayStrokeColor(c, gray, alpha)
{
    c.fillStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
}

function CGContextSetRGBFillColor(c, red, green, blue, alpha)
{
    c.fillStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")";    
}

function CGContextSetRGBStrokeColor(c, red, green, blue, alpha)
{
    c.strokeStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")"; 
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
    c.drawImage(image._representations[0], rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    
    // if(CGImageDataRepresentationFinishedLoading(image) == 4)
    //     {
    //         NSLog("Image has loaded, so can draw...");
    //     }
    //     else
    //     {
    //         NSLog("Image has not loaded, so cannot draw");
    //     }
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
    c.shadowOffsetX = offset.width;
    c.shadowOffsetY = offset.height;
    c.shadowBlur = blur;
    c.shadowColor = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}

// extern void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur);
// 
function CGContextSetShadow(c, offset, blur)
{
    c.shadowOffsetX = offset.width;
    c.shadowOffsetY = offset.height;
    c.shadowBlur = blur;
    c.shadowColor = "rgba(1,1,1,1)";
}

// extern void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options);
// 
function CGContextDrawLinearGradient(c, gradient, startPoint, endPoint, options)
{
    var theGradient = c.createLinearGradient(startPoint.x, startPoint.y, 0, endPoint.y);
    for(var i = 0; i < gradient._colors.length; i++)
    {
        theGradient.addColorStop(gradient._locations[i], CGContextRGBAStringFromColor(gradient._colors[i]));
    }
    c.fillStyle = theGradient;
    c.fillRect();
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
    c.font = CGFontGetStringRepresentation(font);
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
    if (!window.opera)
        c.fillText(string, x, y);
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

// =========================
// = Vienna added methods: =
// =========================

function CGContextRGBAStringFromColor(color)
{
    return "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// 
//  CGDOMElement.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGDOMElementRef CGDOMElementGetRootElement(void);
// 
function CGDOMElementGetRootElement()
{
    return document.body;
}

// extern CGDOMElementRef CGDOMElementCreate(CFStringRef type);
// 
function CGDOMElementCreate(type)
{
    var theElement = document.createElement(type);
    theElement.style.display = "block";
    theElement.style.position = "absolute";
    return theElement;
}

// extern CGDOMElementRef CGDOMElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes);
// 
function CGDOMElementCreateWithAttributes(type, attributes)
{
    return document.createElement(type);
}

// extern void CGDOMElementAppendChild(CGDOMElementRef parent, CGDOMElementRef child);
// 
function CGDOMElementAppendChild(parent, child)
{
    parent.appendChild(child);
}

// extern void CGDOMElementRemoveChild(CGDOMElementRef parent, CGDOMElementRef child);
// 
function CGDOMElementRemoveChild(parent, child)
{
    parent.removeChild(child);
}

// extern void CGDOMElementReplaceChild(CGDOMElementRef parent, CGDOMElementRef oldChild, CGDOMElementRef newChild);
// 
function CGDOMElementReplaceChild(parent, oldChild, newChild)
{
    parent.replaceChild(newChild, oldChild);
}

// extern CFStringRef CGDOMElementGetAttribute(CGDOMElementRef element, CFStringRef attribute);
// 
function CGDOMElementGetAttribute(element, attribute)
{
    return element.getAttribute(attribute);
}

// extern bool CGDOMElementHasAttribute(CGDOMElementRef element, CFStringRef attribute);
// 
function CGDOMElementHasAttribute(element, attribute)
{
    return element.hasAttribute(attribute);
}

// extern void CGDOMElementRemoveAttribute(CGDOMElementRef element, CFStringRef attribute);
// 
function CGDOMElementRemoveAttribute(element, attribute)
{
    element.removeAttribute(attribute);
}

// extern void CGDOMElementSetAttribute(CGDOMElementRef element, CFStringRef name, CFStringRef value);
// 
function CGDOMElementSetAttribute(element, name, value)
{
    element.setAttribute(name, value);
}

// extern void CGDOMElementSetFrame(CGDOMElementRef element, CGRect frame);
// 
function CGDOMElementSetFrame(element, frame)
{
    element.style.bottom = frame.origin.y + "px";
    element.style.left = frame.origin.x + "px";
    element.style.width = frame.size.width + "px";
    element.style.height = frame.size.height + "px";
    element.height = frame.size.height;
    element.width = frame.size.width;
}

// extern void CGDOMElementSetFrameOrigin(CGDOMElementRef element, CGPoint origin);
function CGDOMElementSetFrameOrigin(element, origin)
{
    
}

// extern void CGDOMElementSetFrameSize(CGDOMElementRef element, CGSize size);
// 
function CGDOMElementSetFrameSize(element, size)
{
    
}

// extern CGContextRef CGDOMElementGetContext(CGDOMElementRef element);
// 
function CGDOMElementGetContext(element)
{
    return element.getContext("2d");
}
// 
//  CGDOMRenderingContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

if (navigator.appName == 'Microsoft Internet Explorer') {
    Element.prototype.getContext = function(name) {
        var theContext = {
            // reference to rendering canvas
            canvas: "",
            
            // state
            save: function() {
                
            },
            
            restore: function() {
                
            },
            
            // transformation
            scale: function(x, y) {
                
            },
            
            rotate: function(angle) {
                
            },
            
            translate: function(x, y) {
                
            },
            
            trasform: function(m11, m12, m21, m22, dx, dy) {
                
            },
            
            setTransform: function(m11, m21, m12, m22, dx, dy) {
                
            },
            
            // compositing
            globalAlpha: 1.0,
            
            globalCompositeOperation: "source-over",
            
            // colors and styles
            strokeStyle: "black",
            
            fillStyle: "black",
            
            createLinearGradient: function(x0, y0, x1, y1) {
                
            },
            
            createRadialGradient: function(x0, y0, r0, x1, y1, r1) {
                
            },
            
            createPattern: function(image, repetition) {
                
            },

            // line caps/joins
            lineWidth: 1,
            
            lineCap: "butt",
            
            lineJoin: "miter",
            
            miterLimit: 10,

            // shadows
            shadowOffsetX: 0,
            
            shadowOffsetY: 0,
            
            shadowBlur: 0,
            
            shadowColor: "black",

            // rects
            clearRect: function(x, y, w, h) {
                
            },
            
            fillRect: function(x, y, w, h) {
                var theDiv = document.createElement("div");
                theDiv.style.background = "black";// = this.fillStyle;
                this.canvas.appendChild(theDiv);
            },
            
            strokeRect: function(x, y, w, h) {
                
            },

            // path API
            beginPath: function() {
                
            },
            
            closePath: function() {
                
            },
            
            moveTo: function(x, y) {
                
            },
            
            lineTo: function(x, y) {
                
            },
            
            quadraticCurveTo: function(cpx, cpy, x, y) {
                
            },
            
            bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                
            },
            
            arcTo: function(x1, y1, x2, y2, radius) {
                
            },
            
            rect: function(x, y, w, h) {
                
            },
            
            arc: function(x, y, radius, startAngle, endAngle, anticlockwise) {
                
            },
            
            fill: function() {
                
            },
            
            stroke: function() {
                
            },
            
            clip: function() {
                
            },
            
            isPointInPath: function(x, y) {
                
            },

            // text
            font: "10px Arial",
            
            textAlign: "start",
            
            textBaseline: "alphabetic",
            
            fillText: function(text, x, y, maxWidth) {
                this.strokeText(text, x, y, maxWidth);
            },
            
            strokeText: function(text, x, y, maxWidth) {
                var theSpan = document.createElement("span");
                theSpan.innerHTML = text;
                theSpan.style.font = this.font;
                this.canvas.appendChild(theSpan);
            },
            
            measureText: function(text) {
                
            },
            
            // drawing images
            drawImage: function(image, dx, dy,  dw, dh) {
                
            },
            
            drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
                
            },

            // pixel manipulation
            createImageData: function(sw, sh) {
                
            },

            createImageData: function(imagedata) {
                
            },

            getImageData: function(sx, sy, sw, sh) {
                
            },

            putImageData: function(imagedata, dx, dy,  dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                
            }
        };
        theContext.canvas = this;
        return theContext;
    };
}// 
//  CGEvent.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 
// =============================================================================
// = Capture all window events for use in AppKit etc. some might return false  =
// =============================================================================
document.onmousedown = function(event)
{
    NSEventMouseEventFromCGEvent(event);
    // var theEvent = objc_msgSend(NSEvent, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:",
    //     1, CGPointMake(event.clientX, (window.innerHeight - event.clientY)), null, null, 0, null, 1, 1, 1);
    // 
    // objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendEvent:", theEvent);
};

document.onmouseup = function(event)
{
    NSEventMouseEventFromCGEvent(event);
    // var theEvent = objc_msgSend(NSEvent, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:",
    //     2, CGPointMake(event.clientX, (window.innerHeight - event.clientY)), null, null, 0, null, 1, 1, 1);
    // 
    // objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendEvent:", theEvent);
};


function CGEventScreenFrameRect()
{
    return CGRectMake(0, 0, window.innerWidth, window.innerHeight);
}

// extern CGEventType CGEventGetType(CGEventRef event);
function CGEventGetType(event)
{
    if(event.type == "mousedown")
        return 1;
    else if(event.type == "mouseup")
        return 2;
    else return -1;
}

// extern CGPoint CGEventGetLocation(CGEventRef event);
function CGEventGetLocation(event)
{
    return CGPointMake(event.clientX, (window.innerHeight - event.clientY));
}

// extern CGPoint CGEventGetUnflippedLocation(CGEventRef event);
function CGEventGetUnflippedLocation(event)
{
    return CGPointMake(event.clientX, event.clientY);
}

// extern void CGEventSetLocation(CGEventRef event, CGPoint location);
// 
// extern CGEventFlags CGEventGetFlags(CGEventRef event);
// extern void CGEventSetFlags(CGEventRef event, CGEventFlags flags);
// 
// extern void CGEventKeyboardGetUnicodeString(CGEventRef event, int maxStringLength, int actualStringLength, char unicodeString);
// 
// extern void CGEventKeyboardSetUnicodeString(CGEventRef event, int stringLength, const char unicodeString);
// 
//  CGFont.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGFontRef()
{
    this._name = "Arial";
    this._size = "10"
    this._isBold = false;
}

function CGFontCreate(name, size, isBold)
{
    var theFont = new CGFontRef();
    theFont._name = name;
    theFont._size = size;
    theFont._isBold = isBold;
    return theFont;
}

function CGFontCreateWithFontName(name)
{
    var theFont = new CGFontRef();
    theFont._name = name;
    return theFont;
}

function CGFontGetFontName(font)
{
    return font._name;
}

function CGFontGetFontSize(font)
{
    return font._size;
}

function CGFontGetIsBold(font)
{
    return font._isBold;
}

function CGFontGetStringRepresentation(font)
{
    return (font._isBold ? "bold " : "") + Math.round(font._size) + "px '" + font._name + "'"; 
}
// 
//  CGGeometry.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGPoint()
{
    this.x = 0;
    this.y = 0;
}

function CGSize()
{
    this.width = 0;
    this.height = 0;
}

function CGRect()
{
    this.origin = new CGPoint();
    this.size = new CGSize();
}

function CGPointMake(x, y)
{
    return {
        x: x,
        y: y
    };
}

function CGSizeMake(width, height)
{
    return {
        width: width,
        height: height
    };
}

function CGRectMake(x, y, width, height)
{
    return {
        size: CGSizeMake(width, height),
        origin: CGPointMake(x, y)
    };
}

function CGRectGetMinX(rect)
{
    return rect.origin.x;
}

function CGRectGetMidX(rect)
{
    return rect.origin.x + (rect.size.width / 2.0);
}

function CGRectGetMaxX(rect)
{
	return rect.origin.x + rect.size.width;
}

function CGRectGetMinY(rect)
{
	return rect.origin.y;
}

function CGRectGetMidY(rect)
{
	return rect.origin.y + (rect.size.height / 2.0);
}

function CGRectGetMaxY(rect)
{
	return rect.origin.y + rect.size.height;
}

function CGRectGetWidth(rect)
{
	return rect.size.width;
}

function CGRectGetHeight(rect)
{
	return rect.size.height;
}

function CGPointEqualToPoint(point1, point2)
{
	return (point1.x == point2.x) && (point1.y == point2.y);
}

function CGSizeEqualToSize(size1, size2)
{
	return (size1.width == size2.width) && (size1.height == size2.height);
}

function CGRectEqualToRect(rect1, rect2)
{
	return CGPointEqualToPoint(rect1.origin, rect2.origin) && CGSizeEqualToSize(rect1.size, rect2.size);
}

function CGRectStandardize(rect)
{
	var newRect = CGRectMake(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
	// fix width/x
	if(rect.size.width < 0)
	{
		newRect.size.width = rect.size.width * -1;
		newRect.origin.x = rect.origin.x - newRect.size.width;
	}
	// fix height/y
	if(rect.size.height < 0)
	{
		newRect.size.height = rect.size.height * -1;
		newRect.origin.y = rect.origin.y - newRect.size.height;
	}
	
	return newRect;
}

function CGRectIsEmpty(rect)
{
	if(CGRectIsNull(rect))
		return true;
		
	return ((rect.size.height == 0) || (rect.size.width == 0));
}

function CGRectIsNull(rect)
{
	if(!(rect.size && rect.origin))
		return false;
	
	if(!(rect.origin.x && rect.origin.y && rect.size.width && rect.size.height))
		return false
	
	return true;
}

// extern bool CGRectIsInfinite(CGRect rect);
function CGRectIsInfinite(rect)
{
	
}

function CGRectInset(rect, dx, dy)
{
	return CGRectMake(rect.origin.x + dx, rect.origin.y + dy, rect.size.width - (2 * dx), rect.size.height - (2 * dy));
}

function CGRectIntegral(rect)
{
	return CGRectMake(Math.floor(rect.origin.x), Math.floor(rect.origin.y), Math.ceil(rect.size.width), Math.ceil(rect.size.height));
}

// extern CGRect CGRectUnion(CGRect r1, CGRect r2);
function CGRectUnion(r1, r2)
{
	
}

// extern CGRect CGRectIntersection(CGRect r1, CGRect r2);
function CGRectIntersection(r1, r2)
{
	
}

// extern CGRect CGRectOffset(CGRect rect, CGFloat dx, CGFloat dy);
function CGRectOffset(rect, dx, dy)
{
	
}

// extern void CGRectDivide(CGRect rect, CGRect *slice, CGRect *remainder, CGFloat amount, CGRectEdge edge);
function CGRectDivide(rect, slice, remainder, amount, edge)
{
	
}

// extern bool CGRectContainsPoint(CGRect rect, CGPoint point);
function CGRectContainsPoint(rect, point)
{
	return point.x >= CGRectGetMinX(rect) && point.y >= CGRectGetMinY(rect) && point.x < CGRectGetMaxX(rect) && point.y < CGRectGetMaxY(rect);
}

// extern bool CGRectContainsRect(CGRect rect1, CGRect rect2);
function CGRectContainsRect(rect1, rect2)
{
	
}

// extern bool CGRectIntersectsRect(CGRect rect1, CGRect rect2);
function CGRectIntersectsRect(rect1, rect2)
{
	
}

// extern CFDictionaryRef CGPointCreateDictionaryRepresentation(CGPoint point);
function CGPointCreateDictionaryRepresentation(point)
{
	
}

// extern bool CGPointMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGPoint *point);
function CGPointMakeWithDictionaryRepresentation(dict, point)
{
	
}

// extern CFDictionaryRef CGSizeCreateDictionaryRepresentation(CGSize size);
function CGSizeCreateDictionaryRepresentation(size)
{
	
}

// extern bool CGSizeMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGSize *size);
function CGSizeMakeWithDictionaryRepresentation(dict, size)
{
	
}

// extern CFDictionaryRef CGRectCreateDictionaryRepresentation(CGRect rect);
function CGRectCreateDictionaryRepresentation(rect)
{
	
}

// extern bool CGRectMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGRect *rect);
function CGRectMakeWithDictionaryRepresentation(dict, rect)
{
	
}

function CGRectFromString(aString)
{
	var thePoint = CGPointFromString(aString.substr(1, aString.indexOf("},") - 1));
	var theSize = CGSizeFromString(aString.substr(aString.indexOf("},") + 3, aString.length - 3));
	return {
		origin: thePoint,
		size: theSize
	};
}

function CGStringFromRect(aRect)
{
    return "{" + CGStringFromPoint(aRect.origin) + ", " + CGStringFromSize(aRect.size) + "}";
}

function CGStringFromPoint(aPoint)
{
    return "{" + aPoint.x + ", " + aPoint.y + "}";
}

function CGStringFromSize(aSize)
{
    return "{" + aSize.width + ", " + aSize.height + "}";
}

function CGPointFromString(aString)
{
	return CGPointMake(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length - 1)));
}

function CGSizeFromString(aString)
{
	return CGSizeMake(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length-  1)));
}
// 
//  CGGradient.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGGradientRef()
{
    this._colors = [];
    this._locations = [];
    return this;
}

// extern CGGradientRef CGGradientCreateWithColorComponents(CGColorSpaceRef space, CGFloat components[], CGFloat locations[], size_t count);
// 
function CGGradientCreateWithColorComponenets(space, componenets, locations, count)
{
    
}

// extern CGGradientRef CGGradientCreateWithColors(CGColorSpaceRef space, CGArrayRef colors, CGFloat locations[]);
// 
function CGGradientCreateWithColors(space, colors, locations)
{
    var theGradient = new CGGradientRef();
    theGradient._colors = colors;
    theGradient._locations = locations;
    return theGradient;
}
// 
//  CGImage.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// need to add to Js's Image object prototype... ismask...colrospace, bitmapinfo, rendering intent etc

function CGImageRef()
{
    this._imageSource = "";
    this._representations = [];
    this._loadingStatus = [0];
    return this;
}


// extern CGImageRef CGImageCreate(size_t width, size_t height, size_t bitsPerComponent, size_t bitsPerPixel, size_t bytesPerRow, CGColorSpaceRef colorspace, CGBitmapInfo bitmapInfo, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
// 
function CGImageCreate(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, colorspace, bitmapInfo, provider, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageMaskCreate(size_t width, size_t height, size_t bitsPerComponent, size_t bitsPerPixel, size_t bytesPerRow, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate);
// 
function CGImageMaskCreate(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, provider, decode, shouldInterpolate)
{
    
}

// extern CGImageRef CGImageCreateCopy(CGImageRef image);
// 
function CGImageCreateCopy(image)
{
    
}

// extern CGImageRef CGImageCreateWithJPEGDataProvider(CGDataProviderRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
// 
function CGImageCreateWithJPEGDataProvider(source, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageCreateWithPNGDataProvider(CGDataProviderRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
// 
function CGImageCreateWithPNGDataProvider(source, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageCreateWithImageInRect(CGImageRef image, CGRect rect);
// 
function CGImageCreateWithImageInRect(image, rect)
{
    
}

// extern CGImageRef CGImageCreateWithMask(CGImageRef image, CGImageRef mask);
// 
function CGImageCreateWithMask(image, mask)
{
    
}

// extern CGImageRef CGImageCreateWithMaskingColors(CGImageRef image, const CGFloat components[]);
// 
function CGImageCreateWithMaskingColors(image, components)
{
    
}

// extern CGImageRef CGImageCreateCopyWithColorSpace(CGImageRef image, CGColorSpaceRef colorspace);
// 
function CGImageCreateCopyWithColorSpace(image, colorspace)
{
    
}

// extern bool CGImageIsMask(CGImageRef image);
// 
function CGImageIsMask(image)
{
    
}

// extern size_t CGImageGetWidth(CGImageRef image);
// 
function CGImageGetWidth(image)
{
    
}

// extern size_t CGImageGetHeight(CGImageRef image);
// 
function CGImageGetHeight(image)
{
    
}

// extern size_t CGImageGetBitsPerComponent(CGImageRef image);
// 
function CGImaheGetBitsPerComponent(image)
{
    
}

// extern size_t CGImageGetBitsPerPixel(CGImageRef image);
// 
function CGImageGetBitsPerPixel(image)
{
    
}

// extern size_t CGImageGetBytesPerRow(CGImageRef image);
// 
function CGImageGetBytesPerRow(image)
{
    
}

// extern CGColorSpaceRef CGImageGetColorSpace(CGImageRef image);
// 
function CGImageGetColorSpace(image)
{
    
}

// extern CGImageAlphaInfo CGImageGetAlphaInfo(CGImageRef image);
// 
function CGImageGetAlphaInfo(image)
{
    
}

// extern CGDataProviderRef CGImageGetDataProvider(CGImageRef image);
// 
function CGImageGetDataProvider(image)
{
    
}

// extern const CGFloat *CGImageGetDecode(CGImageRef image);
// 
function CGImageGetDecode(image)
{
    
}

// extern bool CGImageGetShouldInterpolate(CGImageRef image);
// 
function CGImageGetShouldInterpolate(image)
{
    
}

// extern CGColorRenderingIntent CGImageGetRenderingIntent(CGImageRef image);
// 
function CGImageGetRenderingIntent(image)
{
    
}

// extern CGBitmapInfo CGImageGetBitmapInfo(CGImageRef image);
function CGImageGetBitmapInfo(image)
{
    
}

// ========================
// = Vienna Added methods =
// ========================

function CGImageCreateWithURLDataProvider(source)
{
    var theImage = new CGImageRef();
    theImage._imageSource = source;
    var theRepresentation = new Image();
    theImage._representations[0] = theRepresentation;
    theRepresentation.src = source;
    
    theRepresentation.onload = function() {
        theImage._loadingStatus[0] == 4;
    };
    
    return theImage;
}

// extern CGImageRef CGImageCreateWithFileDataProvider(CFStringRef source);

// extern BOOL CGImageDataRepresentationFinishedLoading(CGImageRef image);
function CGImageDataRepresentationFinishedLoading(image)
{
    return (image._loadingStatus[0] == 4);
}

// 
//  CGPath.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFTypeID CGPathGetTypeID(void);
// 
function CGPathGetTypeID()
{
    
}

// extern CGMutablePathRef CGPathCreateMutable(void);
// 
function CGPathCreateMutable()
{
    
}

// extern CGPathRef CGPathCreateCopy(CGPathRef path);
// 
function CGPathCreateCopy()
{
    
}

// extern CGMutablePathRef CGPathCreateMutableCopy(CGPathRef path);
// 
function CGPathCreateMutableCopy(path)
{
    
}

// extern bool CGPathEqualToPath(CGPathRef path1, CGPathRef path2);
// 
function CGPathEqualToPath(path1, path2)
{
    
}

// extern bool CGPathMoveToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat x, CGFloat y);
// 
function CGPathMoveToPoint(path, m, x, y)
{
    
}

// extern void CGPathAddLineToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat x, CGFloat y);
// 
function CGPathAddLineToPoint(path, m, x, y)
{
    
}

// extern void CGPathAddQuadCurveToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat cpx, CGFloat cpy, CGFloat x, CGFloat y);
// 
function CGPathAddQuadCurveToPoint(path, m, cpx, cpy, x, y)
{
    
}

// extern void CGPathAddCurveToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat cp1x, CGFloat cp1y, CGFloat cp2x, CGFloat cp2y, CGFloat x, CGFloat y);
// 
function CGPathAddCurveToPoint(path, m, cp1x, cp2y, cp2x, cp2y, x, y)
{
    
}

// extern void CGPathCloseSubpath(CGMutablePathRef path);
// 
function CGPathCloseSubpath(path)
{
    
}

// extern void CGPathAddRect(CGMutablePathRef path, CGAffineTransform *m, CGRect rect);
// 
function CGPathAddRect(path, m, rect)
{
    
}

// extern void CGPathAddRects(CGMutablePathRef path, CGAffineTransform *m, CGRect rects[], size_t count);
// 
function CGPathAddRects(path, m, rects, count)
{
    
}

// extern void CGPathAddLines(CGMutablePathRef path, CGAffineTransform *m, CGPoint points[], size_t count);
// 
function CGPathAddLines(path, m, point, count)
{
    
}

// extern void CGPathAddEllipseInRect(CGMutablePathRef path, CGAffineTransform *m, CGRect rect);
// 
function CGPathAddEllipseInRect(path, m, rect)
{
    
}

// extern void CGPathAddArc(CGMutablePathRef path, CGAffineTransform *m, CGFloat x, CGFloat y, CGFloat radius, CGFloat startAngle, CGFloat endAngle, bool clockwise);
// 
function CGPathAddArc(path, m, x, y, radius, startAngle, endAngle, clockwise)
{
    
}

// extern void CGPathAddArcToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat x1, CGFloat y1, CGFloat x2, CGFloat y2, CGFloat radius);
// 
function CGPathAddArcToPoint(path, m, x1, y1, x2, y2, radius)
{
    
}

// extern void CGPathAddPath(CGMutablePathRef path1, CGAffineTransform *m, CGPathRef path2);
// 
function CGPathAddPath(path1, m, path2)
{
    
}

// extern bool CGPathIsEmpty(CGPathRef path);
// 
function CGPathIsEmpty(path)
{
    
}

// extern bool CGPathIsRect(CGPathRef path, CGRect *rect);
// 
function CGPathIsRect(path, rect)
{
    
}

// extern CGPoint CGPathGetCurrentPoint(CGPathRef path);
// 
function CGPathGetCurrentPoint(path)
{
    
}

// extern CGRect CGPathGetBoundingBox(CGPathRef path);
// 
function CGPathGetBoudingBox(path)
{
    
}

// extern bool CGPathContainsPoint(CGPathRef path, CGAffineTransform *m, CGPoint point, bool eoFill);
// 
function CGPathContainsPoint(path, m, point, eoFill)
{
    
}
// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Known Issues:
//
// * Patterns are not implemented.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// Only add this code if we do not already have a canvas implementation
if (!document.createElement('canvas').getContext) {
(function() {

  // alias some functions to make (compiled) code shorter
  var m = Math;
  var mr = m.round;
  var ms = m.sin;
  var mc = m.cos;
  var abs = m.abs;
  var sqrt = m.sqrt;

  // this is used for sub pixel precision
  var Z = 10;
  var Z2 = Z / 2;

  /**
   * This funtion is assigned to the <canvas> elements as element.getContext().
   * @this {HTMLElement}
   * @return {CanvasRenderingContext2D_}
   */
  function getContext() {
    return this.context_ ||
        (this.context_ = new CanvasRenderingContext2D_(this));
  }

  var slice = Array.prototype.slice;

  /**
   * Binds a function to an object. The returned function will always use the
   * passed in {@code obj} as {@code this}.
   *
   * Example:
   *
   *   g = bind(f, obj, a, b)
   *   g(c, d) // will do f.call(obj, a, b, c, d)
   *
   * @param {Function} f The function to bind the object to
   * @param {Object} obj The object that should act as this when the function
   *     is called
   * @param {*} var_args Rest arguments that will be used as the initial
   *     arguments when the function is called
   * @return {Function} A new function that has bound this
   */
  function bind(f, obj, var_args) {
    var a = slice.call(arguments, 2);
    return function() {
      return f.apply(obj, a.concat(slice.call(arguments)));
    };
  }

  var G_vmlCanvasManager_ = {
    init: function(opt_doc) {
      if (/MSIE/.test(navigator.userAgent) && !window.opera) {
        var doc = opt_doc || document;
        // Create a dummy element so that IE will allow canvas elements to be
        // recognized.
        doc.createElement('canvas');
        doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
      }
    },

    init_: function(doc) {
      // create xmlns
      if (!doc.namespaces['g_vml_']) {
        doc.namespaces.add('g_vml_', 'urn:schemas-microsoft-com:vml',
                           '#default#VML');

      }
      if (!doc.namespaces['g_o_']) {
        doc.namespaces.add('g_o_', 'urn:schemas-microsoft-com:office:office',
                           '#default#VML');
      }

      // Setup default CSS.  Only add one style sheet per document
      if (!doc.styleSheets['ex_canvas_']) {
        var ss = doc.createStyleSheet();
        ss.owningElement.id = 'ex_canvas_';
        ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
            // default size is 300x150 in Gecko and Opera
            'text-align:left;width:300px;height:150px}' +
            'g_vml_\\:*{behavior:url(#default#VML)}' +
            'g_o_\\:*{behavior:url(#default#VML)}';

      }

      // find all canvas elements
      var els = doc.getElementsByTagName('canvas');
      for (var i = 0; i < els.length; i++) {
        this.initElement(els[i]);
      }
    },

    /**
     * Public initializes a canvas element so that it can be used as canvas
     * element from now on. This is called automatically before the page is
     * loaded but if you are creating elements using createElement you need to
     * make sure this is called on the element.
     * @param {HTMLElement} el The canvas element to initialize.
     * @return {HTMLElement} the element that was created.
     */
    initElement: function(el) {
      if (!el.getContext) {

        el.getContext = getContext;

        // Remove fallback content. There is no way to hide text nodes so we
        // just remove all childNodes. We could hide all elements and remove
        // text nodes but who really cares about the fallback content.
        el.innerHTML = '';

        // do not use inline function because that will leak memory
        el.attachEvent('onpropertychange', onPropertyChange);
        el.attachEvent('onresize', onResize);

        var attrs = el.attributes;
        if (attrs.width && attrs.width.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setWidth_(attrs.width.nodeValue);
          el.style.width = attrs.width.nodeValue + 'px';
        } else {
          el.width = el.clientWidth;
        }
        if (attrs.height && attrs.height.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setHeight_(attrs.height.nodeValue);
          el.style.height = attrs.height.nodeValue + 'px';
        } else {
          el.height = el.clientHeight;
        }
        //el.getContext().setCoordsize_()
      }
      return el;
    }
  };

  function onPropertyChange(e) {
    var el = e.srcElement;

    switch (e.propertyName) {
      case 'width':
        el.style.width = el.attributes.width.nodeValue + 'px';
        el.getContext().clearRect();
        break;
      case 'height':
        el.style.height = el.attributes.height.nodeValue + 'px';
        el.getContext().clearRect();
        break;
    }
  }

  function onResize(e) {
    var el = e.srcElement;
    if (el.firstChild) {
      el.firstChild.style.width =  el.clientWidth + 'px';
      el.firstChild.style.height = el.clientHeight + 'px';
    }
  }

  G_vmlCanvasManager_.init();

  // precompute "00" to "FF"
  var dec2hex = [];
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      dec2hex[i * 16 + j] = i.toString(16) + j.toString(16);
    }
  }

  function createMatrixIdentity() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  }

  function matrixMultiply(m1, m2) {
    var result = createMatrixIdentity();

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        var sum = 0;

        for (var z = 0; z < 3; z++) {
          sum += m1[x][z] * m2[z][y];
        }

        result[x][y] = sum;
      }
    }
    return result;
  }

  function copyState(o1, o2) {
    o2.fillStyle     = o1.fillStyle;
    o2.lineCap       = o1.lineCap;
    o2.lineJoin      = o1.lineJoin;
    o2.lineWidth     = o1.lineWidth;
    o2.miterLimit    = o1.miterLimit;
    o2.shadowBlur    = o1.shadowBlur;
    o2.shadowColor   = o1.shadowColor;
    o2.shadowOffsetX = o1.shadowOffsetX;
    o2.shadowOffsetY = o1.shadowOffsetY;
    o2.strokeStyle   = o1.strokeStyle;
    o2.globalAlpha   = o1.globalAlpha;
    o2.arcScaleX_    = o1.arcScaleX_;
    o2.arcScaleY_    = o1.arcScaleY_;
    o2.lineScale_    = o1.lineScale_;
  }

  function processStyle(styleString) {
    var str, alpha = 1;

    styleString = String(styleString);
    if (styleString.substring(0, 3) == 'rgb') {
      var start = styleString.indexOf('(', 3);
      var end = styleString.indexOf(')', start + 1);
      var guts = styleString.substring(start + 1, end).split(',');

      str = '#';
      for (var i = 0; i < 3; i++) {
        str += dec2hex[Number(guts[i])];
      }

      if (guts.length == 4 && styleString.substr(3, 1) == 'a') {
        alpha = guts[3];
      }
    } else {
      str = styleString;
    }

    return {color: str, alpha: alpha};
  }

  function processLineCap(lineCap) {
    switch (lineCap) {
      case 'butt':
        return 'flat';
      case 'round':
        return 'round';
      case 'square':
      default:
        return 'square';
    }
  }

  /**
   * This class implements CanvasRenderingContext2D interface as described by
   * the WHATWG.
   * @param {HTMLElement} surfaceElement The element that the 2D context should
   * be associated with
   */
  function CanvasRenderingContext2D_(surfaceElement) {
    this.m_ = createMatrixIdentity();

    this.mStack_ = [];
    this.aStack_ = [];
    this.currentPath_ = [];

    // Canvas context properties
    this.strokeStyle = '#000';
    this.fillStyle = '#000';

    this.lineWidth = 1;
    this.lineJoin = 'miter';
    this.lineCap = 'butt';
    this.miterLimit = Z * 1;
    this.globalAlpha = 1;
    this.canvas = surfaceElement;

    var el = surfaceElement.ownerDocument.createElement('div');
    el.style.width =  surfaceElement.clientWidth + 'px';
    el.style.height = surfaceElement.clientHeight + 'px';
    el.style.overflow = 'hidden';
    el.style.position = 'absolute';
    surfaceElement.appendChild(el);

    this.element_ = el;
    this.arcScaleX_ = 1;
    this.arcScaleY_ = 1;
    this.lineScale_ = 1;
  }

  var contextPrototype = CanvasRenderingContext2D_.prototype;
  contextPrototype.clearRect = function() {
    this.element_.innerHTML = '';
  };

  contextPrototype.beginPath = function() {
    // TODO: Branch current matrix so that save/restore has no effect
    //       as per safari docs.
    this.currentPath_ = [];
  };

  contextPrototype.moveTo = function(aX, aY) {
    var p = this.getCoords_(aX, aY);
    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.lineTo = function(aX, aY) {
    var p = this.getCoords_(aX, aY);
    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
                                            aCP2x, aCP2y,
                                            aX, aY) {
    var p = this.getCoords_(aX, aY);
    var cp1 = this.getCoords_(aCP1x, aCP1y);
    var cp2 = this.getCoords_(aCP2x, aCP2y);
    bezierCurveTo(this, cp1, cp2, p);
  };

  // Helper function that takes the already fixed cordinates.
  function bezierCurveTo(self, cp1, cp2, p) {
    self.currentPath_.push({
      type: 'bezierCurveTo',
      cp1x: cp1.x,
      cp1y: cp1.y,
      cp2x: cp2.x,
      cp2y: cp2.y,
      x: p.x,
      y: p.y
    });
    self.currentX_ = p.x;
    self.currentY_ = p.y;
  }

  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
    // the following is lifted almost directly from
    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

    var cp = this.getCoords_(aCPx, aCPy);
    var p = this.getCoords_(aX, aY);

    var cp1 = {
      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
    };
    var cp2 = {
      x: cp1.x + (p.x - this.currentX_) / 3.0,
      y: cp1.y + (p.y - this.currentY_) / 3.0
    };

    bezierCurveTo(this, cp1, cp2, p);
  };

  contextPrototype.arc = function(aX, aY, aRadius,
                                  aStartAngle, aEndAngle, aClockwise) {
    aRadius *= Z;
    var arcType = aClockwise ? 'at' : 'wa';

    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

    // IE won't render arches drawn counter clockwise if xStart == xEnd.
    if (xStart == xEnd && !aClockwise) {
      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                       // that can be represented in binary
    }

    var p = this.getCoords_(aX, aY);
    var pStart = this.getCoords_(xStart, yStart);
    var pEnd = this.getCoords_(xEnd, yEnd);

    this.currentPath_.push({type: arcType,
                           x: p.x,
                           y: p.y,
                           radius: aRadius,
                           xStart: pStart.x,
                           yStart: pStart.y,
                           xEnd: pEnd.x,
                           yEnd: pEnd.y});

  };

  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
  };

  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.stroke();

    this.currentPath_ = oldPath;
  };

  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.fill();

    this.currentPath_ = oldPath;
  };

  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
    var gradient = new CanvasGradient_('gradient');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    return gradient;
  };

  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
                                                   aX1, aY1, aR1) {
    var gradient = new CanvasGradient_('gradientradial');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.r0_ = aR0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    gradient.r1_ = aR1;
    return gradient;
  };

  contextPrototype.drawImage = function(image, var_args) {
    var dx, dy, dw, dh, sx, sy, sw, sh;

    // to find the original width we overide the width and height
    var oldRuntimeWidth = image.runtimeStyle.width;
    var oldRuntimeHeight = image.runtimeStyle.height;
    image.runtimeStyle.width = 'auto';
    image.runtimeStyle.height = 'auto';

    // get the original size
    var w = image.width;
    var h = image.height;

    // and remove overides
    image.runtimeStyle.width = oldRuntimeWidth;
    image.runtimeStyle.height = oldRuntimeHeight;

    if (arguments.length == 3) {
      dx = arguments[1];
      dy = arguments[2];
      sx = sy = 0;
      sw = dw = w;
      sh = dh = h;
    } else if (arguments.length == 5) {
      dx = arguments[1];
      dy = arguments[2];
      dw = arguments[3];
      dh = arguments[4];
      sx = sy = 0;
      sw = w;
      sh = h;
    } else if (arguments.length == 9) {
      sx = arguments[1];
      sy = arguments[2];
      sw = arguments[3];
      sh = arguments[4];
      dx = arguments[5];
      dy = arguments[6];
      dw = arguments[7];
      dh = arguments[8];
    } else {
      throw Error('Invalid number of arguments');
    }

    var d = this.getCoords_(dx, dy);

    var w2 = sw / 2;
    var h2 = sh / 2;

    var vmlStr = [];

    var W = 10;
    var H = 10;

    // For some reason that I've now forgotten, using divs didn't work
    vmlStr.push(' <g_vml_:group',
                ' coordsize="', Z * W, ',', Z * H, '"',
                ' coordorigin="0,0"' ,
                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

    // If filters are necessary (rotation exists), create them
    // filters are bog-slow, so only create them if abbsolutely necessary
    // The following check doesn't account for skews (which don't exist
    // in the canvas spec (yet) anyway.

    if (this.m_[0][0] != 1 || this.m_[0][1]) {
      var filter = [];

      // Note the 12/21 reversal
      filter.push('M11=', this.m_[0][0], ',',
                  'M12=', this.m_[1][0], ',',
                  'M21=', this.m_[0][1], ',',
                  'M22=', this.m_[1][1], ',',
                  'Dx=', mr(d.x / Z), ',',
                  'Dy=', mr(d.y / Z), '');

      // Bounding box calculation (need to minimize displayed area so that
      // filters don't waste time on unused pixels.
      var max = d;
      var c2 = this.getCoords_(dx + dw, dy);
      var c3 = this.getCoords_(dx, dy + dh);
      var c4 = this.getCoords_(dx + dw, dy + dh);

      max.x = m.max(max.x, c2.x, c3.x, c4.x);
      max.y = m.max(max.y, c2.y, c3.y, c4.y);

      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                  filter.join(''), ", sizingmethod='clip');")
    } else {
      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
    }

    vmlStr.push(' ">' ,
                '<g_vml_:image src="', image.src, '"',
                ' style="width:', Z * dw, 'px;',
                ' height:', Z * dh, 'px;"',
                ' cropleft="', sx / w, '"',
                ' croptop="', sy / h, '"',
                ' cropright="', (w - sx - sw) / w, '"',
                ' cropbottom="', (h - sy - sh) / h, '"',
                ' />',
                '</g_vml_:group>');

    this.element_.insertAdjacentHTML('BeforeEnd',
                                    vmlStr.join(''));
  };

  contextPrototype.stroke = function(aFill) {
    var lineStr = [];
    var lineOpen = false;
    var a = processStyle(aFill ? this.fillStyle : this.strokeStyle);
    var color = a.color;
    var opacity = a.alpha * this.globalAlpha;

    var W = 10;
    var H = 10;

    lineStr.push('<g_vml_:shape',
                 ' filled="', !!aFill, '"',
                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                 ' coordorigin="0 0" coordsize="', Z * W, ' ', Z * H, '"',
                 ' stroked="', !aFill, '"',
                 ' path="');

    var newSeq = false;
    var min = {x: null, y: null};
    var max = {x: null, y: null};

    for (var i = 0; i < this.currentPath_.length; i++) {
      var p = this.currentPath_[i];
      var c;

      switch (p.type) {
        case 'moveTo':
          c = p;
          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
          break;
        case 'lineTo':
          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
          break;
        case 'close':
          lineStr.push(' x ');
          p = null;
          break;
        case 'bezierCurveTo':
          lineStr.push(' c ',
                       mr(p.cp1x), ',', mr(p.cp1y), ',',
                       mr(p.cp2x), ',', mr(p.cp2y), ',',
                       mr(p.x), ',', mr(p.y));
          break;
        case 'at':
        case 'wa':
          lineStr.push(' ', p.type, ' ',
                       mr(p.x - this.arcScaleX_ * p.radius), ',',
                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
                       mr(p.x + this.arcScaleX_ * p.radius), ',',
                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
                       mr(p.xStart), ',', mr(p.yStart), ' ',
                       mr(p.xEnd), ',', mr(p.yEnd));
          break;
      }


      // TODO: Following is broken for curves due to
      //       move to proper paths.

      // Figure out dimensions so we can do gradient fills
      // properly
      if (p) {
        if (min.x == null || p.x < min.x) {
          min.x = p.x;
        }
        if (max.x == null || p.x > max.x) {
          max.x = p.x;
        }
        if (min.y == null || p.y < min.y) {
          min.y = p.y;
        }
        if (max.y == null || p.y > max.y) {
          max.y = p.y;
        }
      }
    }
    lineStr.push(' ">');

    if (!aFill) {
      var lineWidth = this.lineScale_ * this.lineWidth;

      // VML cannot correctly render a line if the width is less than 1px.
      // In that case, we dilute the color to make the line look thinner.
      if (lineWidth < 1) {
        opacity *= lineWidth;
      }

      lineStr.push(
        '<g_vml_:stroke',
        ' opacity="', opacity, '"',
        ' joinstyle="', this.lineJoin, '"',
        ' miterlimit="', this.miterLimit, '"',
        ' endcap="', processLineCap(this.lineCap), '"',
        ' weight="', lineWidth, 'px"',
        ' color="', color, '" />'
      );
    } else if (typeof this.fillStyle == 'object') {
      var fillStyle = this.fillStyle;
      var angle = 0;
      var focus = {x: 0, y: 0};

      // additional offset
      var shift = 0;
      // scale factor for offset
      var expansion = 1;

      if (fillStyle.type_ == 'gradient') {
        var x0 = fillStyle.x0_ / this.arcScaleX_;
        var y0 = fillStyle.y0_ / this.arcScaleY_;
        var x1 = fillStyle.x1_ / this.arcScaleX_;
        var y1 = fillStyle.y1_ / this.arcScaleY_;
        var p0 = this.getCoords_(x0, y0);
        var p1 = this.getCoords_(x1, y1);
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        angle = Math.atan2(dx, dy) * 180 / Math.PI;

        // The angle should be a non-negative number.
        if (angle < 0) {
          angle += 360;
        }

        // Very small angles produce an unexpected result because they are
        // converted to a scientific notation string.
        if (angle < 1e-6) {
          angle = 0;
        }
      } else {
        var p0 = this.getCoords_(fillStyle.x0_, fillStyle.y0_);
        var width  = max.x - min.x;
        var height = max.y - min.y;
        focus = {
          x: (p0.x - min.x) / width,
          y: (p0.y - min.y) / height
        };

        width  /= this.arcScaleX_ * Z;
        height /= this.arcScaleY_ * Z;
        var dimension = m.max(width, height);
        shift = 2 * fillStyle.r0_ / dimension;
        expansion = 2 * fillStyle.r1_ / dimension - shift;
      }

      // We need to sort the color stops in ascending order by offset,
      // otherwise IE won't interpret it correctly.
      var stops = fillStyle.colors_;
      stops.sort(function(cs1, cs2) {
        return cs1.offset - cs2.offset;
      });

      var length = stops.length;
      var color1 = stops[0].color;
      var color2 = stops[length - 1].color;
      var opacity1 = stops[0].alpha * this.globalAlpha;
      var opacity2 = stops[length - 1].alpha * this.globalAlpha;

      var colors = [];
      for (var i = 0; i < length; i++) {
        var stop = stops[i];
        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
      }

      // When colors attribute is used, the meanings of opacity and o:opacity2
      // are reversed.
      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                   ' method="none" focus="100%"',
                   ' color="', color1, '"',
                   ' color2="', color2, '"',
                   ' colors="', colors.join(','), '"',
                   ' opacity="', opacity2, '"',
                   ' g_o_:opacity2="', opacity1, '"',
                   ' angle="', angle, '"',
                   ' focusposition="', focus.x, ',', focus.y, '" />');
    } else {
      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                   '" />');
    }

    lineStr.push('</g_vml_:shape>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  contextPrototype.fill = function() {
    this.stroke(true);
  }

  contextPrototype.closePath = function() {
    this.currentPath_.push({type: 'close'});
  };

  /**
   * @private
   */
  contextPrototype.getCoords_ = function(aX, aY) {
    var m = this.m_;
    return {
      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
    }
  };

  contextPrototype.save = function() {
    var o = {};
    copyState(this, o);
    this.aStack_.push(o);
    this.mStack_.push(this.m_);
    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
  };

  contextPrototype.restore = function() {
    copyState(this.aStack_.pop(), this);
    this.m_ = this.mStack_.pop();
  };

  function matrixIsFinite(m) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 2; k++) {
        if (!isFinite(m[j][k]) || isNaN(m[j][k])) {
          return false;
        }
      }
    }
    return true;
  }

  function setM(ctx, m, updateLineScale) {
    if (!matrixIsFinite(m)) {
      return;
    }
    ctx.m_ = m;

    if (updateLineScale) {
      // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.
      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      ctx.lineScale_ = sqrt(abs(det));
    }
  }

  contextPrototype.translate = function(aX, aY) {
    var m1 = [
      [1,  0,  0],
      [0,  1,  0],
      [aX, aY, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.rotate = function(aRot) {
    var c = mc(aRot);
    var s = ms(aRot);

    var m1 = [
      [c,  s, 0],
      [-s, c, 0],
      [0,  0, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.scale = function(aX, aY) {
    this.arcScaleX_ *= aX;
    this.arcScaleY_ *= aY;
    var m1 = [
      [aX, 0,  0],
      [0,  aY, 0],
      [0,  0,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
    var m1 = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
    var m = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, m, true);
  };

  /******** STUBS ********/
  contextPrototype.clip = function() {
    // TODO: Implement
  };

  contextPrototype.arcTo = function() {
    // TODO: Implement
  };

  contextPrototype.createPattern = function() {
    return new CanvasPattern_;
  };

  // Gradient / Pattern Stubs
  function CanvasGradient_(aType) {
    this.type_ = aType;
    this.x0_ = 0;
    this.y0_ = 0;
    this.r0_ = 0;
    this.x1_ = 0;
    this.y1_ = 0;
    this.r1_ = 0;
    this.colors_ = [];
  }

  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
    aColor = processStyle(aColor);
    this.colors_.push({offset: aOffset,
                       color: aColor.color,
                       alpha: aColor.alpha});
  };

  function CanvasPattern_() {}

  // set up externs
  G_vmlCanvasManager = G_vmlCanvasManager_;
  CanvasRenderingContext2D = CanvasRenderingContext2D_;
  CanvasGradient = CanvasGradient_;
  CanvasPattern = CanvasPattern_;

})();

} // if
// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Known Issues:
//
// * Patterns are not implemented.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// Only add this code if we do not already have a canvas implementation
if (!document.createElement('canvas').getContext) {

(function() {

  // alias some functions to make (compiled) code shorter
  var m = Math;
  var mr = m.round;
  var ms = m.sin;
  var mc = m.cos;
  var abs = m.abs;
  var sqrt = m.sqrt;

  // this is used for sub pixel precision
  var Z = 10;
  var Z2 = Z / 2;

  /**
   * This funtion is assigned to the <canvas> elements as element.getContext().
   * @this {HTMLElement}
   * @return {CanvasRenderingContext2D_}
   */
  function getContext() {
    return this.context_ ||
        (this.context_ = new CanvasRenderingContext2D_(this));
  }

  var slice = Array.prototype.slice;

  /**
   * Binds a function to an object. The returned function will always use the
   * passed in {@code obj} as {@code this}.
   *
   * Example:
   *
   *   g = bind(f, obj, a, b)
   *   g(c, d) // will do f.call(obj, a, b, c, d)
   *
   * @param {Function} f The function to bind the object to
   * @param {Object} obj The object that should act as this when the function
   *     is called
   * @param {*} var_args Rest arguments that will be used as the initial
   *     arguments when the function is called
   * @return {Function} A new function that has bound this
   */
  function bind(f, obj, var_args) {
    var a = slice.call(arguments, 2);
    return function() {
      return f.apply(obj, a.concat(slice.call(arguments)));
    };
  }

  var G_vmlCanvasManager_ = {
    init: function(opt_doc) {
      if (/MSIE/.test(navigator.userAgent) && !window.opera) {
        var doc = opt_doc || document;
        // Create a dummy element so that IE will allow canvas elements to be
        // recognized.
        doc.createElement('canvas');
        doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
      }
    },

    init_: function(doc) {
      // create xmlns
      if (!doc.namespaces['g_vml_']) {
        doc.namespaces.add('g_vml_', 'urn:schemas-microsoft-com:vml',
                           '#default#VML');

      }
      if (!doc.namespaces['g_o_']) {
        doc.namespaces.add('g_o_', 'urn:schemas-microsoft-com:office:office',
                           '#default#VML');
      }

      // Setup default CSS.  Only add one style sheet per document
      if (!doc.styleSheets['ex_canvas_']) {
        var ss = doc.createStyleSheet();
        ss.owningElement.id = 'ex_canvas_';
        ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
            // default size is 300x150 in Gecko and Opera
            'text-align:left;width:300px;height:150px}' +
            'g_vml_\\:*{behavior:url(#default#VML)}' +
            'g_o_\\:*{behavior:url(#default#VML)}';

      }

      // find all canvas elements
      var els = doc.getElementsByTagName('canvas');
      for (var i = 0; i < els.length; i++) {
        this.initElement(els[i]);
      }
    },

    /**
     * Public initializes a canvas element so that it can be used as canvas
     * element from now on. This is called automatically before the page is
     * loaded but if you are creating elements using createElement you need to
     * make sure this is called on the element.
     * @param {HTMLElement} el The canvas element to initialize.
     * @return {HTMLElement} the element that was created.
     */
    initElement: function(el) {
      if (!el.getContext) {

        el.getContext = getContext;

        // Remove fallback content. There is no way to hide text nodes so we
        // just remove all childNodes. We could hide all elements and remove
        // text nodes but who really cares about the fallback content.
        el.innerHTML = '';

        // do not use inline function because that will leak memory
        el.attachEvent('onpropertychange', onPropertyChange);
        el.attachEvent('onresize', onResize);

        var attrs = el.attributes;
        if (attrs.width && attrs.width.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setWidth_(attrs.width.nodeValue);
          el.style.width = attrs.width.nodeValue + 'px';
        } else {
          el.width = el.clientWidth;
        }
        if (attrs.height && attrs.height.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setHeight_(attrs.height.nodeValue);
          el.style.height = attrs.height.nodeValue + 'px';
        } else {
          el.height = el.clientHeight;
        }
        //el.getContext().setCoordsize_()
      }
      return el;
    }
  };

  function onPropertyChange(e) {
    var el = e.srcElement;

    switch (e.propertyName) {
      case 'width':
        el.style.width = el.attributes.width.nodeValue + 'px';
        el.getContext().clearRect();
        break;
      case 'height':
        el.style.height = el.attributes.height.nodeValue + 'px';
        el.getContext().clearRect();
        break;
    }
  }

  function onResize(e) {
    var el = e.srcElement;
    if (el.firstChild) {
      el.firstChild.style.width =  el.clientWidth + 'px';
      el.firstChild.style.height = el.clientHeight + 'px';
    }
  }

  G_vmlCanvasManager_.init();

  // precompute "00" to "FF"
  var dec2hex = [];
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      dec2hex[i * 16 + j] = i.toString(16) + j.toString(16);
    }
  }

  function createMatrixIdentity() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  }

  function matrixMultiply(m1, m2) {
    var result = createMatrixIdentity();

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        var sum = 0;

        for (var z = 0; z < 3; z++) {
          sum += m1[x][z] * m2[z][y];
        }

        result[x][y] = sum;
      }
    }
    return result;
  }

  function copyState(o1, o2) {
    o2.fillStyle     = o1.fillStyle;
    o2.lineCap       = o1.lineCap;
    o2.lineJoin      = o1.lineJoin;
    o2.lineWidth     = o1.lineWidth;
    o2.miterLimit    = o1.miterLimit;
    o2.shadowBlur    = o1.shadowBlur;
    o2.shadowColor   = o1.shadowColor;
    o2.shadowOffsetX = o1.shadowOffsetX;
    o2.shadowOffsetY = o1.shadowOffsetY;
    o2.strokeStyle   = o1.strokeStyle;
    o2.globalAlpha   = o1.globalAlpha;
    o2.arcScaleX_    = o1.arcScaleX_;
    o2.arcScaleY_    = o1.arcScaleY_;
    o2.lineScale_    = o1.lineScale_;
  }

  function processStyle(styleString) {
    var str, alpha = 1;

    styleString = String(styleString);
    if (styleString.substring(0, 3) == 'rgb') {
      var start = styleString.indexOf('(', 3);
      var end = styleString.indexOf(')', start + 1);
      var guts = styleString.substring(start + 1, end).split(',');

      str = '#';
      for (var i = 0; i < 3; i++) {
        str += dec2hex[Number(guts[i])];
      }

      if (guts.length == 4 && styleString.substr(3, 1) == 'a') {
        alpha = guts[3];
      }
    } else {
      str = styleString;
    }

    return {color: str, alpha: alpha};
  }

  function processLineCap(lineCap) {
    switch (lineCap) {
      case 'butt':
        return 'flat';
      case 'round':
        return 'round';
      case 'square':
      default:
        return 'square';
    }
  }

  /**
   * This class implements CanvasRenderingContext2D interface as described by
   * the WHATWG.
   * @param {HTMLElement} surfaceElement The element that the 2D context should
   * be associated with
   */
  function CanvasRenderingContext2D_(surfaceElement) {
    this.m_ = createMatrixIdentity();

    this.mStack_ = [];
    this.aStack_ = [];
    this.currentPath_ = [];

    // Canvas context properties
    this.strokeStyle = '#000';
    this.fillStyle = '#000';

    this.lineWidth = 1;
    this.lineJoin = 'miter';
    this.lineCap = 'butt';
    this.miterLimit = Z * 1;
    this.globalAlpha = 1;
    this.canvas = surfaceElement;

    var el = surfaceElement.ownerDocument.createElement('div');
    el.style.width =  surfaceElement.clientWidth + 'px';
    el.style.height = surfaceElement.clientHeight + 'px';
    el.style.overflow = 'hidden';
    el.style.position = 'absolute';
    surfaceElement.appendChild(el);

    this.element_ = el;
    this.arcScaleX_ = 1;
    this.arcScaleY_ = 1;
    this.lineScale_ = 1;
  }

  var contextPrototype = CanvasRenderingContext2D_.prototype;
  contextPrototype.clearRect = function() {
    this.element_.innerHTML = '';
  };

  contextPrototype.beginPath = function() {
    // TODO: Branch current matrix so that save/restore has no effect
    //       as per safari docs.
    this.currentPath_ = [];
  };

  contextPrototype.moveTo = function(aX, aY) {
    var p = this.getCoords_(aX, aY);
    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.lineTo = function(aX, aY) {
    var p = this.getCoords_(aX, aY);
    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
                                            aCP2x, aCP2y,
                                            aX, aY) {
    var p = this.getCoords_(aX, aY);
    var cp1 = this.getCoords_(aCP1x, aCP1y);
    var cp2 = this.getCoords_(aCP2x, aCP2y);
    bezierCurveTo(this, cp1, cp2, p);
  };

  // Helper function that takes the already fixed cordinates.
  function bezierCurveTo(self, cp1, cp2, p) {
    self.currentPath_.push({
      type: 'bezierCurveTo',
      cp1x: cp1.x,
      cp1y: cp1.y,
      cp2x: cp2.x,
      cp2y: cp2.y,
      x: p.x,
      y: p.y
    });
    self.currentX_ = p.x;
    self.currentY_ = p.y;
  }

  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
    // the following is lifted almost directly from
    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

    var cp = this.getCoords_(aCPx, aCPy);
    var p = this.getCoords_(aX, aY);

    var cp1 = {
      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
    };
    var cp2 = {
      x: cp1.x + (p.x - this.currentX_) / 3.0,
      y: cp1.y + (p.y - this.currentY_) / 3.0
    };

    bezierCurveTo(this, cp1, cp2, p);
  };

  contextPrototype.arc = function(aX, aY, aRadius,
                                  aStartAngle, aEndAngle, aClockwise) {
    aRadius *= Z;
    var arcType = aClockwise ? 'at' : 'wa';

    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

    // IE won't render arches drawn counter clockwise if xStart == xEnd.
    if (xStart == xEnd && !aClockwise) {
      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                       // that can be represented in binary
    }

    var p = this.getCoords_(aX, aY);
    var pStart = this.getCoords_(xStart, yStart);
    var pEnd = this.getCoords_(xEnd, yEnd);

    this.currentPath_.push({type: arcType,
                           x: p.x,
                           y: p.y,
                           radius: aRadius,
                           xStart: pStart.x,
                           yStart: pStart.y,
                           xEnd: pEnd.x,
                           yEnd: pEnd.y});

  };

  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
  };

  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.stroke();

    this.currentPath_ = oldPath;
  };

  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.fill();

    this.currentPath_ = oldPath;
  };

  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
    var gradient = new CanvasGradient_('gradient');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    return gradient;
  };

  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
                                                   aX1, aY1, aR1) {
    var gradient = new CanvasGradient_('gradientradial');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.r0_ = aR0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    gradient.r1_ = aR1;
    return gradient;
  };

  contextPrototype.drawImage = function(image, var_args) {
    var dx, dy, dw, dh, sx, sy, sw, sh;

    // to find the original width we overide the width and height
    var oldRuntimeWidth = image.runtimeStyle.width;
    var oldRuntimeHeight = image.runtimeStyle.height;
    image.runtimeStyle.width = 'auto';
    image.runtimeStyle.height = 'auto';

    // get the original size
    var w = image.width;
    var h = image.height;

    // and remove overides
    image.runtimeStyle.width = oldRuntimeWidth;
    image.runtimeStyle.height = oldRuntimeHeight;

    if (arguments.length == 3) {
      dx = arguments[1];
      dy = arguments[2];
      sx = sy = 0;
      sw = dw = w;
      sh = dh = h;
    } else if (arguments.length == 5) {
      dx = arguments[1];
      dy = arguments[2];
      dw = arguments[3];
      dh = arguments[4];
      sx = sy = 0;
      sw = w;
      sh = h;
    } else if (arguments.length == 9) {
      sx = arguments[1];
      sy = arguments[2];
      sw = arguments[3];
      sh = arguments[4];
      dx = arguments[5];
      dy = arguments[6];
      dw = arguments[7];
      dh = arguments[8];
    } else {
      throw Error('Invalid number of arguments');
    }

    var d = this.getCoords_(dx, dy);

    var w2 = sw / 2;
    var h2 = sh / 2;

    var vmlStr = [];

    var W = 10;
    var H = 10;

    // For some reason that I've now forgotten, using divs didn't work
    vmlStr.push(' <g_vml_:group',
                ' coordsize="', Z * W, ',', Z * H, '"',
                ' coordorigin="0,0"' ,
                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

    // If filters are necessary (rotation exists), create them
    // filters are bog-slow, so only create them if abbsolutely necessary
    // The following check doesn't account for skews (which don't exist
    // in the canvas spec (yet) anyway.

    if (this.m_[0][0] != 1 || this.m_[0][1]) {
      var filter = [];

      // Note the 12/21 reversal
      filter.push('M11=', this.m_[0][0], ',',
                  'M12=', this.m_[1][0], ',',
                  'M21=', this.m_[0][1], ',',
                  'M22=', this.m_[1][1], ',',
                  'Dx=', mr(d.x / Z), ',',
                  'Dy=', mr(d.y / Z), '');

      // Bounding box calculation (need to minimize displayed area so that
      // filters don't waste time on unused pixels.
      var max = d;
      var c2 = this.getCoords_(dx + dw, dy);
      var c3 = this.getCoords_(dx, dy + dh);
      var c4 = this.getCoords_(dx + dw, dy + dh);

      max.x = m.max(max.x, c2.x, c3.x, c4.x);
      max.y = m.max(max.y, c2.y, c3.y, c4.y);

      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                  filter.join(''), ", sizingmethod='clip');")
    } else {
      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
    }

    vmlStr.push(' ">' ,
                '<g_vml_:image src="', image.src, '"',
                ' style="width:', Z * dw, 'px;',
                ' height:', Z * dh, 'px;"',
                ' cropleft="', sx / w, '"',
                ' croptop="', sy / h, '"',
                ' cropright="', (w - sx - sw) / w, '"',
                ' cropbottom="', (h - sy - sh) / h, '"',
                ' />',
                '</g_vml_:group>');

    this.element_.insertAdjacentHTML('BeforeEnd',
                                    vmlStr.join(''));
  };

  contextPrototype.stroke = function(aFill) {
    var lineStr = [];
    var lineOpen = false;
    var a = processStyle(aFill ? this.fillStyle : this.strokeStyle);
    var color = a.color;
    var opacity = a.alpha * this.globalAlpha;

    var W = 10;
    var H = 10;

    lineStr.push('<g_vml_:shape',
                 ' filled="', !!aFill, '"',
                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                 ' coordorigin="0 0" coordsize="', Z * W, ' ', Z * H, '"',
                 ' stroked="', !aFill, '"',
                 ' path="');

    var newSeq = false;
    var min = {x: null, y: null};
    var max = {x: null, y: null};

    for (var i = 0; i < this.currentPath_.length; i++) {
      var p = this.currentPath_[i];
      var c;

      switch (p.type) {
        case 'moveTo':
          c = p;
          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
          break;
        case 'lineTo':
          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
          break;
        case 'close':
          lineStr.push(' x ');
          p = null;
          break;
        case 'bezierCurveTo':
          lineStr.push(' c ',
                       mr(p.cp1x), ',', mr(p.cp1y), ',',
                       mr(p.cp2x), ',', mr(p.cp2y), ',',
                       mr(p.x), ',', mr(p.y));
          break;
        case 'at':
        case 'wa':
          lineStr.push(' ', p.type, ' ',
                       mr(p.x - this.arcScaleX_ * p.radius), ',',
                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
                       mr(p.x + this.arcScaleX_ * p.radius), ',',
                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
                       mr(p.xStart), ',', mr(p.yStart), ' ',
                       mr(p.xEnd), ',', mr(p.yEnd));
          break;
      }


      // TODO: Following is broken for curves due to
      //       move to proper paths.

      // Figure out dimensions so we can do gradient fills
      // properly
      if (p) {
        if (min.x == null || p.x < min.x) {
          min.x = p.x;
        }
        if (max.x == null || p.x > max.x) {
          max.x = p.x;
        }
        if (min.y == null || p.y < min.y) {
          min.y = p.y;
        }
        if (max.y == null || p.y > max.y) {
          max.y = p.y;
        }
      }
    }
    lineStr.push(' ">');

    if (!aFill) {
      var lineWidth = this.lineScale_ * this.lineWidth;

      // VML cannot correctly render a line if the width is less than 1px.
      // In that case, we dilute the color to make the line look thinner.
      if (lineWidth < 1) {
        opacity *= lineWidth;
      }

      lineStr.push(
        '<g_vml_:stroke',
        ' opacity="', opacity, '"',
        ' joinstyle="', this.lineJoin, '"',
        ' miterlimit="', this.miterLimit, '"',
        ' endcap="', processLineCap(this.lineCap), '"',
        ' weight="', lineWidth, 'px"',
        ' color="', color, '" />'
      );
    } else if (typeof this.fillStyle == 'object') {
      var fillStyle = this.fillStyle;
      var angle = 0;
      var focus = {x: 0, y: 0};

      // additional offset
      var shift = 0;
      // scale factor for offset
      var expansion = 1;

      if (fillStyle.type_ == 'gradient') {
        var x0 = fillStyle.x0_ / this.arcScaleX_;
        var y0 = fillStyle.y0_ / this.arcScaleY_;
        var x1 = fillStyle.x1_ / this.arcScaleX_;
        var y1 = fillStyle.y1_ / this.arcScaleY_;
        var p0 = this.getCoords_(x0, y0);
        var p1 = this.getCoords_(x1, y1);
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        angle = Math.atan2(dx, dy) * 180 / Math.PI;

        // The angle should be a non-negative number.
        if (angle < 0) {
          angle += 360;
        }

        // Very small angles produce an unexpected result because they are
        // converted to a scientific notation string.
        if (angle < 1e-6) {
          angle = 0;
        }
      } else {
        var p0 = this.getCoords_(fillStyle.x0_, fillStyle.y0_);
        var width  = max.x - min.x;
        var height = max.y - min.y;
        focus = {
          x: (p0.x - min.x) / width,
          y: (p0.y - min.y) / height
        };

        width  /= this.arcScaleX_ * Z;
        height /= this.arcScaleY_ * Z;
        var dimension = m.max(width, height);
        shift = 2 * fillStyle.r0_ / dimension;
        expansion = 2 * fillStyle.r1_ / dimension - shift;
      }

      // We need to sort the color stops in ascending order by offset,
      // otherwise IE won't interpret it correctly.
      var stops = fillStyle.colors_;
      stops.sort(function(cs1, cs2) {
        return cs1.offset - cs2.offset;
      });

      var length = stops.length;
      var color1 = stops[0].color;
      var color2 = stops[length - 1].color;
      var opacity1 = stops[0].alpha * this.globalAlpha;
      var opacity2 = stops[length - 1].alpha * this.globalAlpha;

      var colors = [];
      for (var i = 0; i < length; i++) {
        var stop = stops[i];
        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
      }

      // When colors attribute is used, the meanings of opacity and o:opacity2
      // are reversed.
      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                   ' method="none" focus="100%"',
                   ' color="', color1, '"',
                   ' color2="', color2, '"',
                   ' colors="', colors.join(','), '"',
                   ' opacity="', opacity2, '"',
                   ' g_o_:opacity2="', opacity1, '"',
                   ' angle="', angle, '"',
                   ' focusposition="', focus.x, ',', focus.y, '" />');
    } else {
      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                   '" />');
    }

    lineStr.push('</g_vml_:shape>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  contextPrototype.fill = function() {
    this.stroke(true);
  }

  contextPrototype.closePath = function() {
    this.currentPath_.push({type: 'close'});
  };

  /**
   * @private
   */
  contextPrototype.getCoords_ = function(aX, aY) {
    var m = this.m_;
    return {
      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
    }
  };

  contextPrototype.save = function() {
    var o = {};
    copyState(this, o);
    this.aStack_.push(o);
    this.mStack_.push(this.m_);
    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
  };

  contextPrototype.restore = function() {
    copyState(this.aStack_.pop(), this);
    this.m_ = this.mStack_.pop();
  };

  function matrixIsFinite(m) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 2; k++) {
        if (!isFinite(m[j][k]) || isNaN(m[j][k])) {
          return false;
        }
      }
    }
    return true;
  }

  function setM(ctx, m, updateLineScale) {
    if (!matrixIsFinite(m)) {
      return;
    }
    ctx.m_ = m;

    if (updateLineScale) {
      // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.
      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      ctx.lineScale_ = sqrt(abs(det));
    }
  }

  contextPrototype.translate = function(aX, aY) {
    var m1 = [
      [1,  0,  0],
      [0,  1,  0],
      [aX, aY, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.rotate = function(aRot) {
    var c = mc(aRot);
    var s = ms(aRot);

    var m1 = [
      [c,  s, 0],
      [-s, c, 0],
      [0,  0, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.scale = function(aX, aY) {
    this.arcScaleX_ *= aX;
    this.arcScaleY_ *= aY;
    var m1 = [
      [aX, 0,  0],
      [0,  aY, 0],
      [0,  0,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
    var m1 = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
    var m = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, m, true);
  };

  /******** STUBS ********/
  contextPrototype.clip = function() {
    // TODO: Implement
  };

  contextPrototype.arcTo = function() {
    // TODO: Implement
  };

  contextPrototype.createPattern = function() {
    return new CanvasPattern_;
  };

  // Gradient / Pattern Stubs
  function CanvasGradient_(aType) {
    this.type_ = aType;
    this.x0_ = 0;
    this.y0_ = 0;
    this.r0_ = 0;
    this.x1_ = 0;
    this.y1_ = 0;
    this.r1_ = 0;
    this.colors_ = [];
  }

  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
    aColor = processStyle(aColor);
    this.colors_.push({offset: aOffset,
                       color: aColor.color,
                       alpha: aColor.alpha});
  };

  function CanvasPattern_() {}

  // set up externs
  G_vmlCanvasManager = G_vmlCanvasManager_;
  CanvasRenderingContext2D = CanvasRenderingContext2D_;
  CanvasGradient = CanvasGradient_;
  CanvasPattern = CanvasPattern_;

})();

} // if

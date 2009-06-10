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

function CGContextSaveGState (c)
{
    c.save();
}

function CGContextRestoreGState (c)
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
    return document.createElement(type);
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
    element.bottom = frame.origin.x;
    element.left = frame.origin.y;
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

// extern CFTypeID CGGradientGetTypeID(void);
// 
function CGGradientGetTypeID()
{
    
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
    
}
// 
//  CGImage.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// need to add to Js's Image object prototype... ismask...colrospace, bitmapinfo, rendering intent etc


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
function CGImageGetDecode (image)
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

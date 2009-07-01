var CGAffineTransformIdentity = "";
function CGAffineTransformMake(a,b,c,d,tx,ty)
{
}
function CGAffineTransformMakeTranslation(tx,ty)
{
}
function CGAffineTransformMakeScale(sx,sy)
{
}
function CGAffineTransformMakeRotation(angle)
{
}
function CGAffineTransformIsIdentity(t)
{
}
function CGAffineTransformTranslate(t,tx,ty)
{
}
function CGAffineTransformScale(t,sx,sy)
{
}
function CGAffineTransformRotate(t,angle)
{
}
function CGAffineTransformInvert(t)
{
}
function CGAffineTransformConcat(t1,t2)
{
}
function CGAffineTransformEqualToTransform(t1,t2)
{
}
function CGPointApplyAffineTransform(point,t)
{
}
function CGSizeApplyAffineTransform(size,t)
{
}
function CGRectApplyAffineTransform(rect,t)
{
}
function CGBitmapContextCreate(data,width,height,bitsPerComponent,bytesPerRow,colorSpace,bitmapInfo)
{
}
function d()
{
}
function CGBitmapContextGetWidth(c)
{
}
function CGBitmapContextGetHeight(c)
{
}
function CGBitmapContextGetBitsPerComponent(c)
{
}
function CGBitmapContextGetBytesPerRow(c)
{
}
function CGBitmapContextCreateImage(c)
{
}
var kCGColorWhite = "kCGColorWhite";
var kCGColorBlack = "kCGColorBlack";
var kCGColorClear = "kCGColorClear";
function CGColorCreate(space,components)
{
}
function CGColorCreateGenericGray(gray,alpha)
{
}
function CGColorCreateGenericRGB(red,green,blue,alpha)
{
}
function CGColorCreateGenericCMYK(cyan,magenta,yellow,black,alpha)
{
}
function CGColorGetConstantColor(colorName)
{
}
function CGColorCreateCopy(color)
{
}
function CGColorCreateCopyWithAlpha(color,alpha)
{
}
function CGColorRetain(color)
{
}
function CGColorRelease(color)
{
}
function CGColorEqualToColor(color1,color2)
{
}
function CGColorGetNumberOfComponents(color)
{
}
function d()
{
}
function CGColorGetAlpha(color)
{
}
function CGColorGetColorSpace(color)
{
}
function CGColorGetTypeID()
{
}
function CGContextGetTypeID()
{
}
function CGContextSaveGState(c)
{
c.save();
}
function CGContextRestoreGState(c)
{
c.restore();
}
function CGContextScaleCTM(c,sx,sy)
{
c.scale(sx,sy);
}
function CGContextTranslateCTM(c,tx,ty)
{
c.translate(tx,ty);
}
function CGContextRotateCTM(c,angle)
{
c.rotate(angle);
}
function CGContextConcatCTM(c,transform)
{
}
function CGContextGetCTM(c)
{
}
function CGContextSetLineWidth(c,width)
{
c.lineWidth = width;
}
function CGContextSetLineCap(c,cap)
{
c.lineCap = CGLineCapCanvas;
}
function CGContextSetLineJoin(c,join)
{
c.lineJoin = CGLineJoinCanvas;
}
function CGContextSetMiterLimit(c,limit)
{
c.miterLimit = limit;
}
function CGContextSetLineDash(c,phase,lengths,count)
{
}
function CGContextSetFlatness(c,flatness)
{
}
function CGContextSetAlpha(c,alpha)
{
c.globalAlpha = alpha;
}
function CGContextBeginPath(c)
{
c.beginPath();
}
function CGContextMoveToPoint(c,x,y)
{
c.moveTo(x,y);
}
function CGContextAddLineToPoint(c,x,y)
{
c.lineTo(x,y);
}
function CGContextAddCurveToPoint(c,cp1x,cp1y,cp2x,cp2y,x,y)
{
c.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
}
function CGContextAddQuadCurveToPoint(c,cpx,cpy,x,y)
{
c.quadraticCurveTo(cpx,cpy,x,y);
}
function CGContextClosePath(c)
{
c.closePath();
}
function CGContextAddRect(c,rect)
{
c.rect(rect.origin.x,rect.origin.y,rect.size.wdith,rect.size.height);
}
function CGContextAddRects(c,rects,count)
{
}
function CGContextAddLines(c,points,count)
{
}
function CGContextAddEllipseInRect(context,rect)
{
}
function CGContextAddArc(c,x,y,radius,startAngle,endAngle,clockwise)
{
c.arc(x,y,radius,startAngle,endAngle,clockwise);
}
function CGContextAddArcToPoint(c,x1,y1,x2,y2,radius)
{
c.arcTo(x1,y1,x2,y2,radius);
}
function CGContextAddPath(context,path)
{
}
function CGContextReplacePathWithStrokedPath(c)
{
}
function CGContextIsPathEmpty(c)
{
}
function CGContextGetPathCurrentPoint(c)
{
}
function CGContextGetPathBoundingBox(c)
{
}
function CGContextPathContainsPoint(context,point,mode)
{
}
function CGContextDrawPath(c,mode)
{
}
function CGContextFillPath(c)
{
}
function CGContextEOFillPath(c)
{
}
function CGContextStrokePath(c)
{
}
function CGContextFillRect(c,rect)
{
c.fillRect(rect.origin.x,c.canvas.height - rect.origin.y - rect.size.height,rect.size.width,rect.size.height);
}
function CGContextFillRects(c,rects,count)
{
}
function CGContextStrokeRect(c,rect)
{
c.strokeRect(rect.origin.x,c.canvas.height - rect.origin.y - rect.size.height,rect.size.width,rect.size.height);
}
function CGContextStrokeRectWithWidth(c,rect,width)
{
}
function CGContextClearRect(c,rect)
{
}
function CGContextFillEllipseInRect(context,rect)
{
}
function CGContextStrokeEllipseInRect(context,rect)
{
}
function CGContextStrokeLineSegments(c,points,count)
{
}
function CGContextClip(c)
{
}
function CGContextEOClip(c)
{
}
function CGContextClipToMask(c,rect,mask)
{
}
function CGContextGetClipBoundingBox(c)
{
}
function CGContextClipToRect(c,rect)
{
}
function CGContextClipToRects(c,rects,count)
{
}
function CGContextSetFillColorWithColor(c,color)
{
}
function CGContextSetStrokeColorWithColor(c,color)
{
}
function CGContextSetFillColorSpace(c,colorspace)
{
}
function CGContextSetStrokeColorSpace(c,colorspace)
{
}
function CGContextSetFillColor(c,components)
{
}
function CGContextSetStrokeColor(c,components)
{
}
function CGContextSetPatternPhase(c,phase)
{
}
function CGContextSetGrayFillColor(c,gray,alpha)
{
}
function CGContextSetGrayStrokeColor(c,gray,alpha)
{
}
function CGContextSetRGBFillColor(c,red,green,blue,alpha)
{
}
function CGContextSetRGBStrokeColor(c,red,green,blue,alpha)
{
}
function CGContextSetCMYKFillColor(c,cyan,magenta,yellow,black,alpha)
{
}
function CGContextSetCMYKStrokeColor(c,cyan,magenta,yellow,black,alpha)
{
}
function CGContextSetRenderingIntent(c,intent)
{
}
function CGContextDrawImage(c,rect,image)
{
c.drawImage(image._representations,rect.origin.x,rect.origin.y,rect.size.width,rect.size.height);
}
function CGContextDrawTiledImage(c,rect,image)
{
}
function CGContextSetShadowWithColor(context,offset,blur,color)
{
c.shadowOffsetX = offset.width;
c.shadowOffsetY = offset.height;
c.shadowBlur = blur;
c.shadowColor = "rgba(" + parseInt(color._red * 255) + "," + parseInt(color._green * 255) + "," + parseInt(color._blue * 255) + "," + color._alpha + ")";
}
function CGContextSetShadow(context,offset,blur)
{
c.shadowOffsetX = offset.width;
c.shadowOffsetY = offset.height;
c.shadowBlur = blur;
c.shadowColor = "rgba(1,1,1,1)";
}
function CGContextDrawLinearGradient(context,gradient,startPoint,endPoint,options)
{
}
function CGContextDrawRadialGradient(context,gradient,startCenter,startRadius,endCenter,endRadius,options)
{
}
function CGContextSetCharacterSpacing(c,spacing)
{
}
function CGContextSetTextPosition(c,x,y)
{
}
function CGContextGetTextPosition(c)
{
}
function CGContextSetTextMatrix(c,t)
{
}
function CGContextGetTextMatrix(c)
{
}
function CGContextSetTextDrawingMode(c,mode)
{
}
function CGContextSetFont(c,font)
{
c.font = CGFontGetStringRepresentation(font);
}
function CGContextSetFontSize(c,size)
{
}
function CGContextShowText(c,string,length)
{
}
function CGContextShowTextAtPoint(c,x,y,string,length)
{
if (!window.opera)
c.fillText(string,x,y);

}
function CGContextEndPage(c)
{
}
function CGContextRetain(c)
{
}
function CGContextRelease(c)
{
}
function CGContextFlush(c)
{
}
function CGContextSynchronize(c)
{
}
function CGContextSetShouldAntialias(c,shouldAntialias)
{
}
function CGContextSetAllowsAntialiasing(context,allowsAntialiasing)
{
}
function CGContextSetShouldSmoothFonts(c,shouldSmoothFonts)
{
}
function CGContextBeginTransparencyLayer(context,auxiliaryInfo)
{
}
function CGContextBeginTransparencyLayerWithRect(context,rect,auxiliaryInfo)
{
}
function CGContextEndTransparencyLayer(context)
{
}
function CGContextGetUserSpaceToDeviceSpaceTransform(c)
{
}
function CGContextConvertPointToDeviceSpace(c,point)
{
}
function CGContextConvertPointToUserSpace(c,point)
{
}
function CGContextConvertSizeToDeviceSpace(c,size)
{
}
function CGContextConvertSizeToUserSpace(c,size)
{
}
function CGContextConvertRectToDeviceSpace(c,rect)
{
}
function CGContextConvertRectToUserSpace(c,rect)
{
}
function CGContextRGBAStringFromColor(color)
{
return "rgba(" + parseInt(color._red * 255) + "," + parseInt(color._green * 255) + "," + parseInt(color._blue * 255) + "," + color._alpha + ")";
}
function CGDOMElementGetRootElement()
{
return document.body;
}
function CGDOMElementCreate(type)
{
var theElement = document.createElement(type);
theElement.style.display = "block";
theElement.style.position = "absolute";
return theElement;
}
function CGDOMElementCreateWithAttributes(type,attributes)
{
return document.createElement(type);
}
function CGDOMElementAppendChild(parent,child)
{
parent.appendChild(child);
}
function CGDOMElementRemoveChild(parent,child)
{
parent.removeChild(child);
}
function CGDOMElementReplaceChild(parent,oldChild,newChild)
{
parent.replaceChild(newChild,oldChild);
}
function CGDOMElementGetAttribute(element,attribute)
{
return element.getAttribute(attribute);
}
function CGDOMElementHasAttribute(element,attribute)
{
return element.hasAttribute(attribute);
}
function CGDOMElementRemoveAttribute(element,attribute)
{
element.removeAttribute(attribute);
}
function CGDOMElementSetAttribute(element,name,value)
{
element.setAttribute(name,value);
}
function CGDOMElementSetFrame(element,frame)
{
element.style.bottom = frame.origin.y + "px";
element.style.left = frame.origin.x + "px";
element.style.width = frame.size.width + "px";
element.style.height = frame.size.height + "px";
element.height = frame.size.height;
element.width = frame.size.width;
}
function CGDOMElementSetFrameOrigin(element,origin)
{
element.style.bottom = origin.y + "px";
element.style.left = origin.x + "px";
}
function CGDOMElementSetFrameSize(element,size)
{
}
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

function CGDOMRenderingContext()
{
    this.canvas = null;
    
    // compositing
    this.globalAlpha = 1.0;
    this.globalCompositeOperation = "source-over";
    
    // colors and styles
    this.strokeStyle = "black";
    this.fillStyle = "black";
    
    // text
    this.font = "10px Arial";
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    
    // line caps/joins
    this.lineWidth = 1;
    this.lineCap = "butt";
    this.lineJoin = "miter";
    this.miterLimit = 10;

    // shadows
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.shadowBlur = 0;
    this.shadowColor = "black";
    return this;
}

CGDOMRenderingContext.prototype.save = function()
{
    
};

CGDOMRenderingContext.prototype.restore = function()
{
    
};

CGDOMRenderingContext.prototype.scale = function(x, y)
{
    
};

CGDOMRenderingContext.prototype.rotate = function(angle)
{
    
};

CGDOMRenderingContext.prototype.translate = function(x, y)
{
    
};

CGDOMRenderingContext.prototype.transform = function(m11, m12, m21, m22, dx, dy)
{
    
};
        

            
CGDOMRenderingContext.prototype.setTransform = function(m11, m21, m12, m22, dx, dy)
{
                
};
            
CGDOMRenderingContext.prototype.createLinearGradient = function(x0, y0, x1, y1)
{
                
};
            
CGDOMRenderingContext.prototype.createRadialGradient =  function(x0, y0, r0, x1, y1, r1)
{
                
};
            
CGDOMRenderingContext.prototype.createPattern = function(image, repetition)
{
                
};

CGDOMRenderingContext.prototype.clearRect = function(x, y, w, h)
{
    if (this.canvas.hasChildNodes())
    {
        while (this.canvas.childNodes.length >= 1)
        {
            this.canvas.removeChild(this.canvas.firstChild);       
        } 
    }
};
            
CGDOMRenderingContext.prototype.fillRect = function(x, y, w, h)
{
    var theDiv = document.createElement("div");
    theDiv.style.height = h + 'px';
    theDiv.style.width = w + 'px';
    theDiv.style.background = "yellow";// = this.fillStyle;
    this.canvas.appendChild(theDiv);
};
            
CGDOMRenderingContext.prototype.strokeRect = function(x, y, w, h)
{
                
};

CGDOMRenderingContext.prototype.beginPath = function()
{
                
};
            
CGDOMRenderingContext.prototype.closePath = function()
{
                
};
            
CGDOMRenderingContext.prototype.moveTo = function(x, y)
{
                
};
            
CGDOMRenderingContext.prototype.lineTo = function(x, y)
{
                
};
            
CGDOMRenderingContext.prototype.quadraticCurveTo = function(cpx, cpy, x, y)
{
                
};
            
CGDOMRenderingContext.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y)
{
                
};
            
CGDOMRenderingContext.prototype.arcTo = function(x1, y1, x2, y2, radius)
{
                
};
            
CGDOMRenderingContext.prototype.rect = function(x, y, w, h)
{
                
};
            
CGDOMRenderingContext.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise)
{

};
            
CGDOMRenderingContext.prototype.fill = function()
{
                
};
            
CGDOMRenderingContext.prototype.stroke = function()
{
                
};
            
CGDOMRenderingContext.prototype.clip = function()
{
                
};
            
CGDOMRenderingContext.prototype.isPointInPath = function(x, y)
{
                
};
            
CGDOMRenderingContext.prototype.fillText = function(text, x, y, maxWidth)
{
    this.strokeText(text, x, y, maxWidth);
};
            
CGDOMRenderingContext.prototype.strokeText = function(text, x, y, maxWidth)
{
    var theSpan = document.createElement("span");
    theSpan.innerHTML = text;
    theSpan.style.font = this.font;
    this.canvas.appendChild(theSpan);
};
            
CGDOMRenderingContext.prototype.measureText = function(text)
{

};

CGDOMRenderingContext.prototype.drawImage = function(image, dx, dy,  dw, dh)
{

};

CGDOMRenderingContext.prototype.drawImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh)
{

};

CGDOMRenderingContext.prototype.createImageData = function(sw, sh)
{

};
CGDOMRenderingContext.prototype.createImageData = function(imagedata)
{

};
CGDOMRenderingContext.prototype.getImageData = function(sx, sy, sw, sh)
{

};

CGDOMRenderingContext.prototype.putImageData = function(imagedata, dx, dy,  dirtyX, dirtyY, dirtyWidth, dirtyHeight)
{
    
};
// 
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
};

document.onmouseup = function(event)
{
    NSEventMouseEventFromCGEvent(event);
};

document.onmousemove = function(event)
{
    NSEventMouseEventFromCGEvent(event);
};

document.onkeypress = function(event)
{
    NSEventKeyEventFromCGEvent(event);
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
    else if(event.type == "mousemove")
        return 5;
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
function CGEventGetFlags(event)
{
    var modifierFlags = 1;
    
    if (event.metaKey)
     modifierFlags = modifierFlags | (1 << 20);
     
     if (event.shiftKey)
     modifierFlags = modifierFlags | (1 << 17);
     
     if (event.altKey)
     modifierFlags = modifierFlags | (1 << 19);
     
     if (event.ctrlKey)
     modifierFlags = modifierFlags | (1 << 18);
    
    return modifierFlags;
}

// extern void CGEventSetFlags(CGEventRef event, CGEventFlags flags);
// 
// extern void CGEventKeyboardGetUnicodeString(CGEventRef event, int maxStringLength, int actualStringLength, char unicodeString);
// 
// extern void CGEventKeyboardSetUnicodeString(CGEventRef event, int stringLength, const char unicodeString);

// extern CFStringRef CGEventKeyGetUnicodeString(CGEventRef event);
function CGEventKeyGetUnicodeString(event)
{
    var keyCode = event.charCode;
    var theCharacters = String.fromCharCode(keyCode);

    // if ( theCharacters.toUpperCase() === theCharacters && theCharacters.toLowerCase() !== theCharacters && !theCharacters.shiftKey ) {
    //                     NSLog("caps: " + theCharacters);
    //             }
    
    return theCharacters;
}function CGFontCreate(name,size,isBold)
{
var theFont = {_name:0,_size:0,_isBold:0,};
theFont._name = name;
theFont._size = size;
theFont._isBold = isBold;
return theFont;
}
function CGFontCreateWithFontName(name)
{
var theFont = {_name:0,_size:0,_isBold:0,};
theFont._name = name;
theFont._size = 12;
theFont._isBold = NO;
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

// extern CGGradientRef CGGradientCreateWithColorComponents(CGColorSpaceRef space, CGFloat components[], CGFloat locations[], int count);
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


// extern CGImageRef CGImageCreate(int width, int height, int bitsPerComponent, int bitsPerPixel, int bytesPerRow, CGColorSpaceRef colorspace, CGBitmapInfo bitmapInfo, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
// 
function CGImageCreate(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, colorspace, bitmapInfo, provider, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageMaskCreate(int width, int height, int bitsPerComponent, int bitsPerPixel, int bytesPerRow, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate);
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

// extern int CGImageGetWidth(CGImageRef image);
// 
function CGImageGetWidth(image)
{
    
}

// extern int CGImageGetHeight(CGImageRef image);
// 
function CGImageGetHeight(image)
{
    
}

// extern int CGImageGetBitsPerComponent(CGImageRef image);
// 
function CGImaheGetBitsPerComponent(image)
{
    
}

// extern int CGImageGetBitsPerPixel(CGImageRef image);
// 
function CGImageGetBitsPerPixel(image)
{
    
}

// extern int CGImageGetBytesPerRow(CGImageRef image);
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

// extern void CGPathAddRects(CGMutablePathRef path, CGAffineTransform *m, CGRect rects[], int count);
// 
function CGPathAddRects(path, m, rects, count)
{
    
}

// extern void CGPathAddLines(CGMutablePathRef path, CGAffineTransform *m, CGPoint points[], int count);
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

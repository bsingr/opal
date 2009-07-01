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

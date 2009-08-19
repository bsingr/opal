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


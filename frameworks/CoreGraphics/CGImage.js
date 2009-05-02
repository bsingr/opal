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
var CGImageCreate = function(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, colorspace, bitmapInfo, provider, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageMaskCreate(size_t width, size_t height, size_t bitsPerComponent, size_t bitsPerPixel, size_t bytesPerRow, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate);
// 
var CGImageMaskCreate = function(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, provider, decode, shouldInterpolate)
{
    
}

// extern CGImageRef CGImageCreateCopy(CGImageRef image);
// 
var CGImageCreateCopy = function(image)
{
    
}

// extern CGImageRef CGImageCreateWithJPEGDataProvider(CGDataProviderRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
// 
var CGImageCreateWithJPEGDataProvider = function(source, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageCreateWithPNGDataProvider(CGDataProviderRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
// 
var CGImageCreateWithPNGDataProvider = function(source, decode, shouldInterpolate, intent)
{
    
}

// extern CGImageRef CGImageCreateWithImageInRect(CGImageRef image, CGRect rect);
// 
var CGImageCreateWithImageInRect = function(image, rect)
{
    
}

// extern CGImageRef CGImageCreateWithMask(CGImageRef image, CGImageRef mask);
// 
var CGImageCreateWithMask = function(image, mask)
{
    
}

// extern CGImageRef CGImageCreateWithMaskingColors(CGImageRef image, const CGFloat components[]);
// 
var CGImageCreateWithMaskingColors = function(image, components)
{
    
}

// extern CGImageRef CGImageCreateCopyWithColorSpace(CGImageRef image, CGColorSpaceRef colorspace);
// 
var CGImageCreateCopyWithColorSpace = function(image, colorspace)
{
    
}

// extern bool CGImageIsMask(CGImageRef image);
// 
var CGImageIsMask = function(image)
{
    
}

// extern size_t CGImageGetWidth(CGImageRef image);
// 
var CGImageGetWidth = function(image)
{
    
}

// extern size_t CGImageGetHeight(CGImageRef image);
// 
var CGImageGetHeight = function(image)
{
    
}

// extern size_t CGImageGetBitsPerComponent(CGImageRef image);
// 
var CGImaheGetBitsPerComponent = function(image)
{
    
}

// extern size_t CGImageGetBitsPerPixel(CGImageRef image);
// 
var CGImageGetBitsPerPixel = function(image)
{
    
}

// extern size_t CGImageGetBytesPerRow(CGImageRef image);
// 
var CGImageGetBytesPerRow = function(image)
{
    
}

// extern CGColorSpaceRef CGImageGetColorSpace(CGImageRef image);
// 
var CGImageGetColorSpace = function(image)
{
    
}

// extern CGImageAlphaInfo CGImageGetAlphaInfo(CGImageRef image);
// 
var CGImageGetAlphaInfo = function(image)
{
    
}

// extern CGDataProviderRef CGImageGetDataProvider(CGImageRef image);
// 
var CGImageGetDataProvider = function(image)
{
    
}

// extern const CGFloat *CGImageGetDecode(CGImageRef image);
// 
var CGImageGetDecode = function (image)
{
    
}

// extern bool CGImageGetShouldInterpolate(CGImageRef image);
// 
var CGImageGetShouldInterpolate = function(image)
{
    
}

// extern CGColorRenderingIntent CGImageGetRenderingIntent(CGImageRef image);
// 
var CGImageGetRenderingIntent = function(image)
{
    
}

// extern CGBitmapInfo CGImageGetBitmapInfo(CGImageRef image);
var CGImageGetBitmapInfo = function(image)
{
    
}

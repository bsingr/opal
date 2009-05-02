// 
//  CGImage.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

typedef struct CGImage *CGImageRef;

#import <CoreGraphics/CGColorSpace.h>
#import <CoreGraphics/CGDataProvider.h>
#import <CoreGraphics/CGGeometry.h>

enum CGImageAlphaInfo {
    kCGImageAlphaNone,
    kCGImageAlphaPremultipliedLast,
    kCGImageAlphaPremultipliedFirst,
    kCGImageAlphaLast,
    kCGImageAlphaFirst,
    kCGImageAlphaNoneSkipLast,
    kCGImageAlphaNoneSkipFirst,
    kCGImageAlphaOnly
};
typedef enum CGImageAlphaInfo CGImageAlphaInfo;

enum {
    kCGBitmapAlphaInfoMask      = 0x1F,
    kCGBitmapFloatComponents    = (1 << 8),
    kCGBitmapByteOrderMask      = 0x7000,
    kCGBitmapByteOrderDefault   = (0 << 12),
    kCGBitmapByteOrder16Little  = (1 << 12),
    kCGBitmapByteOrder32Little  = (2 << 12),
    kCGBitmapByteOrder16Big     = (3 << 12),
    kCGBitmapByteOrder32Big     = (4 << 12)
};
typedef int CGBitmapInfo;

extern CGImageRef CGImageCreate(size_t width, size_t height, size_t bitsPerComponent, size_t bitsPerPixel, size_t bytesPerRow, CGColorSpaceRef colorspace, CGBitmapInfo bitmapInfo, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
extern CGImageRef CGImageMaskCreate(size_t width, size_t height, size_t bitsPerComponent, size_t bitsPerPixel, size_t bytesPerRow, CGDataProviderRef provider, const CGFloat decode[], bool shouldInterpolate);
extern CGImageRef CGImageCreateCopy(CGImageRef image);
extern CGImageRef CGImageCreateWithJPEGDataProvider(CGDataProviderRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
extern CGImageRef CGImageCreateWithPNGDataProvider(CGDataProviderRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
extern CGImageRef CGImageCreateWithImageInRect(CGImageRef image, CGRect rect);
extern CGImageRef CGImageCreateWithMask(CGImageRef image, CGImageRef mask);
extern CGImageRef CGImageCreateWithMaskingColors(CGImageRef image, const CGFloat components[]);
extern CGImageRef CGImageCreateCopyWithColorSpace(CGImageRef image, CGColorSpaceRef colorspace);
extern CGImageRef CGImageRetain(CGImageRef image);
extern void CGImageRelease(CGImageRef image);
extern bool CGImageIsMask(CGImageRef image);
extern size_t CGImageGetWidth(CGImageRef image);
extern size_t CGImageGetHeight(CGImageRef image);
extern size_t CGImageGetBitsPerComponent(CGImageRef image);
extern size_t CGImageGetBitsPerPixel(CGImageRef image);
extern size_t CGImageGetBytesPerRow(CGImageRef image);
extern CGColorSpaceRef CGImageGetColorSpace(CGImageRef image);
extern CGImageAlphaInfo CGImageGetAlphaInfo(CGImageRef image);
extern CGDataProviderRef CGImageGetDataProvider(CGImageRef image);
extern const CGFloat *CGImageGetDecode(CGImageRef image);
extern bool CGImageGetShouldInterpolate(CGImageRef image);
extern CGColorRenderingIntent CGImageGetRenderingIntent(CGImageRef image);
extern CGBitmapInfo CGImageGetBitmapInfo(CGImageRef image);

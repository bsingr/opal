// 
//  CGImage.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGColorSpace.h>
#import <CoreFoundation/CFData.h>
#import <CoreGraphics/CGGeometry.h>

typedef struct CGImage {
    CFStringRef *_imageSource;
    CFArrayRef  *_respresentations;
    CFArrayRef  *_loadingStatus;
} *CGImageRef;

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

extern CGImageRef CGImageCreate(int width, int height, int bitsPerComponent, int bitsPerPixel, int bytesPerRow, CGColorSpaceRef colorspace, CGBitmapInfo bitmapInfo, CFDataRef provider, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
extern CGImageRef CGImageMaskCreate(int width, int height, int bitsPerComponent, int bitsPerPixel, int bytesPerRow, CFDataRef provider, const CGFloat decode[], bool shouldInterpolate);
extern CGImageRef CGImageCreateCopy(CGImageRef image);
extern CGImageRef CGImageCreateWithJPEGDataProvider(CFDataRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
extern CGImageRef CGImageCreateWithPNGDataProvider(CFDataRef source, const CGFloat decode[], bool shouldInterpolate, CGColorRenderingIntent intent);
extern CGImageRef CGImageCreateWithImageInRect(CGImageRef image, CGRect rect);
extern CGImageRef CGImageCreateWithMask(CGImageRef image, CGImageRef mask);
extern CGImageRef CGImageCreateWithMaskingColors(CGImageRef image, const CGFloat components[]);
extern CGImageRef CGImageCreateCopyWithColorSpace(CGImageRef image, CGColorSpaceRef colorspace);
extern CGImageRef CGImageRetain(CGImageRef image);
extern void CGImageRelease(CGImageRef image);
extern bool CGImageIsMask(CGImageRef image);
extern int CGImageGetWidth(CGImageRef image);
extern int CGImageGetHeight(CGImageRef image);
extern int CGImageGetBitsPerComponent(CGImageRef image);
extern int CGImageGetBitsPerPixel(CGImageRef image);
extern int CGImageGetBytesPerRow(CGImageRef image);
extern CGColorSpaceRef CGImageGetColorSpace(CGImageRef image);
extern CGImageAlphaInfo CGImageGetAlphaInfo(CGImageRef image);
extern CFDataRef CGImageGetDataProvider(CGImageRef image);
extern const CGFloat *CGImageGetDecode(CGImageRef image);
extern bool CGImageGetShouldInterpolate(CGImageRef image);
extern CGColorRenderingIntent CGImageGetRenderingIntent(CGImageRef image);
extern CGBitmapInfo CGImageGetBitmapInfo(CGImageRef image);

// ========================
// = Vienna Added methods =
// ========================

extern CGImageRef CGImageCreateWithURLDataProvider(CFStringRef source);
extern CGImageRef CGImageCreateWithFileDataProvider(CFStringRef source);

extern BOOL CGImageDataRepresentationFinishedLoading(CGImageRef image);

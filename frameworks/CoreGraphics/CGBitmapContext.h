// 
//  CGBitmapContext.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGContext.h>

extern CGContextRef CGBitmapContextCreate (void *data, size_t width, size_t height, size_t bitsPerComponent, size_t bytesPerRow, CGColorSpaceRef colorSpace, CGBitmapInfo bitmapInfo);
extern void *CGBitmapContextGetData (CGContextRef c);

extern size_t CGBitmapContextGetWidth(CGContextRef c);
extern size_t CGBitmapContextGetHeight(CGContextRef c);
extern size_t CGBitmapContextGetBitsPerComponent(CGContextRef c);
extern size_t CGBitmapContextGetBytesPerRow(CGContextRef c);
// extern CGColorSpaceRef CGBitmapContextGetColorSpace(CGContextRef c);
// extern CGImageAlphaInfo CGBitmapContextGetAlphaInfo(CGContextRef c);
// extern CGBitmapInfo CGBitmapContextGetBitmapInfo(CGContextRef c);

extern CGImageRef CGBitmapContextCreateImage(CGContextRef c);
// 
//  CGBitmapContext.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGContext.h>

extern CGContextRef CGBitmapContextCreate (void *data, int width, int height, int bitsPerComponent, int bytesPerRow, CGColorSpaceRef colorSpace, CGBitmapInfo bitmapInfo);
extern void *CGBitmapContextGetData (CGContextRef c);

extern int CGBitmapContextGetWidth(CGContextRef c);
extern int CGBitmapContextGetHeight(CGContextRef c);
extern int CGBitmapContextGetBitsPerComponent(CGContextRef c);
extern int CGBitmapContextGetBytesPerRow(CGContextRef c);
// extern CGColorSpaceRef CGBitmapContextGetColorSpace(CGContextRef c);
// extern CGImageAlphaInfo CGBitmapContextGetAlphaInfo(CGContextRef c);
// extern CGBitmapInfo CGBitmapContextGetBitmapInfo(CGContextRef c);

extern CGImageRef CGBitmapContextCreateImage(CGContextRef c);
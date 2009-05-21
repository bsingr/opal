// 
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

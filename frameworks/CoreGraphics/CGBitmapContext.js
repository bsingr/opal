// 
//  CGBitmapContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGContentRef CGBitmapContextCreate (void *data, size_t width, size_t height, size_t bitsPerComponent, size_t bytesPerRow, CGColorSpaceRef colorSpace, CGBitmapInfo bitmapInfo);
// 
var CGBitmapContextCreate = function(data, width, height, bitsPerComponent, bytesPerRow, colorSpace, bitmapInfo)
{
    // Essentially return a canvas element.
    var theContext = document.createElement("canvas");
    
    // do other stuff here... height etc
    // do not need to add it to the window
    return theContext;
}

// extern void *CGBitmapContextGetData (CGContentRef c);
// 
var CGBitmapContextGetData = function(c)
{
    
}

// extern size_t CGBitmapContextGetWidth(CGContextRef c);
// 
var CGBitmapContextGetWidth = function(c)
{
    
}

// extern size_t CGBitmapContextGetHeight(CGContextRef c);
// 
var CGBitmapContextGetHeight = function(c)
{
    
}

// extern size_t CGBitmapContextGetBitsPerComponent(CGContextRef c);
// 
var CGBitmapContextGetBitsPerComponent = function(c)
{
    
}

// extern size_t CGBitmapContextGetBytesPerRow(CGContextRef c);
// 
var CGBitmapContextGetBytesPerRow = function(c)
{
    
}

// extern CGColorSpaceRef CGBitmapContextGetColorSpace(CGContextRef c);
// 
var CGBitmapContextGetColorSpace = function(c)
{
    
}

// extern CGImageAlphaInfo CGBitmapContextGetAlphaInfo(CGContextRef c);
// 
var CGBitmapContextGetAlphaInfo = function(c)
{
    
}

// extern CGBitmapInfo CGBitmapContextGetBitmapInfo(CGContextRef c);
// 
var CGBitmapContextGetBitmapInfo = function (c)
{
    
}

// extern CGImageRef CGBitmapContextCreateImage(CGContextRef c);
// 
var CGBitmapContextCreateImage = function (c)
{
    
}

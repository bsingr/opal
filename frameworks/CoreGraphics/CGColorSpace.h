// 
//  CGColorSpace.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

typedef struct CGColorSpace {

} CGColorSpaceRef;

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGDataProvider.h>

enum CGColorRenderingIntent {
    kCGRenderingIntentDefault,
    kCGRenderingIntentAbsoluteColorimetric,
    kCGRenderingIntentRelavtiveColormetric,
    kCGRenderingIntentPerceptual,
    kCGRenderingIntentSaturation
};
typedef enum CGColorRenderingIntent CGColorRenderingIntent;

enum CGColorSpaceModel {
    kCGColorSpaceModelUnknown   = -1,
    kCGColorSpaceModelMonochrome,
    kCGColorSpaceModelRGB,
    kCGColorSpaceModelCMYK,
    kCGColorSpaceModelLab,
    kCGColorSpaceModelDeviceN,
    kCGColorSpaceModelIndexed,
    kCGColorSpaceModelPattern
};
typedef enum CGColorSpaceModel CGColorSpaceModel;


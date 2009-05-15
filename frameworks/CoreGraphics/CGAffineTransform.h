// 
//  CGAffineTransform.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGGeometry.h>

typedef struct _CGAffineTransform {
    CGFloat a, b, c, d;
    CGFloat tx, ty;
} CGAffineTransform;

extern const CGAffineTransform CGAffineTransformIdentity;

extern CGAffineTransform CGAffineTransformMake (CGFloat a, CGFloat b, CGFloat c, CGFloat d, CGFLoat tx, CGFloat ty);

extern CGAffineTransform CGAffineTransformMakeTranslation(CGFloat tx, CGFloat ty);

extern CGAffineTransform CGAffineTransformMakeScale(CGFloat sx, CGFloat sy);

extern CGAffineTransform CGAffineTransformMakeRotation(CGFloat angle);

extern bool CGAffineTransformIsIdentity(CGAffineTransform t);

extern CGAffineTransform CGAffineTransformTranslate(CGAffineTransform t, CGFloat tx, CGFloat ty);

extern CGAffineTransform CGAffineTransformScale(CGAffineTransform t, CGFloat sx, CGFloat sy);

extern CGAffineTransform CGAffineTransformRotate(CGAffineTransform t, CGFloat angle);

extern CGAffineTransform CGAffineTransformInvert(CGAffineTransform t);

extern CGAffineTransform CGAffineTransformConcat(CGAffineTransform t1, CGAffineTransform t2);

extern bool CGAffineTransformEqualToTransform(CGAffineTransform t1, CGAffineTransform t2);

extern CGPoint CGPointApplyAffineTransform(CGPoint point, CGAffineTransform t);

extern CGSize CGSizeApplyAffineTransform(CGSize size, CGAffineTransform t);

extern CGRect CGRectApplyAffineTransform(CGRect rect, CGAffineTransform t);
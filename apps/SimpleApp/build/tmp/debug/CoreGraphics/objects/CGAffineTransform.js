// 
//  CGAffineTransform.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// struct CGAffineTransform {
//     CGFloat a, b, c, d;
//     CGFloat tx, ty;
// };
// 
function CGAffineTransform()
{
    this.a = 0; this.b = 0; this.c = 0; this.d = 0; this.tx = 0; this.ty = 0;
}

// extern const CGAffineTransform CGAffineTransformIdentity;
//
var CGAffineTransformIdentity = {
  a:0, b:0, c:0, d:0, tx:0, ty:0
};

// extern CGAffineTransform CGAffineTransformMake (CGFloat a, CGFloat b, CGFloat c, CGFloat d, CGFLoat tx, CGFloat ty);
// 
function CGAffineTransformMake(a, b, c, d, tx, ty)
{
    var t = new CGAffineTransform();
    t.a = a; t.b = b; t.c = c; t.d = d; t.tx = tx; t.ty = ty;
    return t;
}

// extern CGAffineTransform CGAffineTransformMakeTranslation(CGFloat tx, CGFloat ty);
// 

// extern CGAffineTransform CGAffineTransformMakeScale(CGFloat sx, CGFloat sy);
// 
// extern CGAffineTransform CGAffineTransformMakeRotation(CGFloat angle);
// 
// extern bool CGAffineTransformIsIdentity(CGAffineTransform t);
// 
// extern CGAffineTransform CGAffineTransformTranslate(CGAffineTransform t, CGFloat tx, CGFloat ty);
// 
// extern CGAffineTransform CGAffineTransformScale(CGAffineTransform t, CGFloat sx, CGFloat sy);
// 
// extern CGAffineTransform CGAffineTransformRotate(CGAffineTransform t, CGFloat angle);
// 
// extern CGAffineTransform CGAffineTransformInvert(CGAffineTransform t);
// 
// extern CGAffineTransform CGAffineTransformConcat(CGAffineTransform t1, CGAffineTransform t2);
// 
// extern bool CGAffineTransformEqualToTransform(CGAffineTransform t1, CGAffineTransform t2);
// 
// extern CGPoint CGPointApplyAffineTransform(CGPoint point, CGAffineTransform t);
// 
// extern CGSize CGSizeApplyAffineTransform(CGSize size, CGAffineTransform t);
// 
// extern CGRect CGRectApplyAffineTransform(CGRect rect, CGAffineTransform t);
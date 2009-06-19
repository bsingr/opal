/* 
 * CGAffineTransform.h
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGGeometry.h>

typedef struct _CGAffineTransform {
    CGFloat a, b, c, d;
    CGFloat tx, ty;
} CGAffineTransform;

extern const CGAffineTransform CGAffineTransformIdentity;

extern CGAffineTransform CGAffineTransformMake (CGFloat a, CGFloat b, CGFloat c, CGFloat d, CGFloat tx, CGFloat ty);

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
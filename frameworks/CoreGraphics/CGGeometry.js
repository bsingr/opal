// 
//  CGGeometry.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// struct CGPoint {
//     CGFloat x;
//     CGFloat y;
// };
// typedef struct CGPoint CGPoint;
// 
function CGPoint()
{
    this.x = 0;
    this.y = 0;
}

// struct CGSize {
//     CGFloat width;
//     CGFloat height;
// };
// typedef struct CGSize CGSize;
// 
function CGSize()
{
    this.width = 0;
    this.height = 0;
}

// struct CGRect {
//     CGPoint origin;
//     CGSize size;
// };
// typedef struct CGRect CGRect;
// 
function CGRect()
{
    this.origin = new CGPoint();
    this.size = new CGSize();
}

// enum {
//     CGRectMinXEdge,
//     CGRectMinYEdge,
//     CGRectMaxXEdge,
//     CGRectMaxYEdge
// };
// typedef enum CGRectEdge CGRectEdge;

// extern CGPoint CGPointMake(CGFloat x, CGFloat y);
// 
function CGPointMake(x, y)
{
    return {
        x: x,
        y: y
    };
}

// extern CGSize CGSizeMake(CGFloat width, CGFloat height);
// 
function CGSizeMake(width, height)
{
    return {
        width: width,
        height: height
    };
}

// extern CGRect CGRectMake (CGFloat x, CGFloat y, CGFloat width, CGFloat height);
// 
function CGRectMake(x, y, width, height)
{
    return {
        size: CGSizeMake(width, height),
        origin: CGPointMake(x, y)
    };
}

// extern CGFloat CGRectGetMinX(CGRect rect);
// 
function CGRectGetMinX(rect)
{
    
}

// extern CGFloat CGRectGetMidX(CGRect rect);
// 
function CGRectGetMidX(rect)
{
    
}

// extern CGFloat CGRectGetMaxX(CGRect rect);
// extern CGFloat CGRectGetMinY(CGRect rect);
// extern CGFloat CGRectGetMidY(CGRect rect);
// extern CGFloat CGRectGetMaxY(CGRect rect);
// extern CGFloat CGRectGetWidth(CGRect rect);
// extern CGFloat CGRectGetHeight(CGRect rect);
// extern bool CGPointEqualToPoint(CGPoint point1, CGPoint point2);
// extern bool CGSizeEqualToSize(CGSize size1, CGSize size2);
// extern bool CGRectEqualToRect(CGRect rect1, CGRect rect2);
// extern CGRect CGRectStandardize(CGRect rect);
// extern bool CGRectIsEmpty(CGRect rect);
// extern bool CGRectIsNull(CGRect rect);
// extern bool CGRectIsInfinite(CGRect rect);
// extern CGRect CGRectInset(CGRect rect, CGFloat dx, CGFloat dy);
// extern CGRect CGRectIntegral(CGRect rect);
// extern CGRect CGRectUnion(CGRect r1, CGRect r2);
// extern CGRect CGRectIntersection(CGRect r1, CGRect r2);
// extern CGRect CGRectOffset(CGRect rect, CGFloat dx, CGFloat dy);
// extern void CGRectDivide(CGRect rect, CGRect *slice, CGRect *remainder, CGFloat amount, CGRectEdge edge);
// extern bool CGRectContainsPoint(CGRect rect, CGPoint point);
// extern bool CGRectContainsRect(CGRect rect1, CGRect rect2);
// extern bool CGRectIntersectsRect(CGRect rect1, CGRect rect2);
// extern CFDictionaryRef CGPointCreateDictionaryRepresentation(CGPoint point);
// extern bool CGPointMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGPoint *point);
// extern CFDictionaryRef CGSizeCreateDictionaryRepresentation(CGSize size);
// extern bool CGSizeMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGSize *size);
// extern CFDictionaryRef CGRectCreateDictionaryRepresentation(CGRect rect);
// extern bool CGRectMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGRect *rect);


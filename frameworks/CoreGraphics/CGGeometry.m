#import "CGGeometry.h"

CGPoint CGPointMake(CGFloat x, CGFloat y)
{
    CGPoint point;
    point.x = x;
    point.y = y;
    return point;
}

CGSize CGSizeMake(CGFloat width, CGFloat height)
{
    CGSize size;
    size.width = width;
    size.height = height;
    return size;
}

CGRect CGRectMake(CGFloat x, CGFloat y, CGFloat width, CGFloat height)
{
    CGRect rect;
    CGRect.origin.x = x;
    CGRect.origin.y = y;
    CGRect.size.width = width;
    CGRect.size.height = height;
    return rect;
}
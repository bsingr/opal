// 
//  CGGeometry.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGPoint()
{
    this.x = 0;
    this.y = 0;
}

function CGSize()
{
    this.width = 0;
    this.height = 0;
}

function CGRect()
{
    this.origin = new CGPoint();
    this.size = new CGSize();
}

function CGPointMake(x, y)
{
    return {
        x: x,
        y: y
    };
}

function CGSizeMake(width, height)
{
    return {
        width: width,
        height: height
    };
}

function CGRectMake(x, y, width, height)
{
    return {
        size: CGSizeMake(width, height),
        origin: CGPointMake(x, y)
    };
}

function CGRectGetMinX(rect)
{
    return rect.origin.x;
}

function CGRectGetMidX(rect)
{
    return rect.origin.x + (rect.size.width / 2.0);
}

function CGRectGetMaxX(rect)
{
	return rect.origin.x + rect.size.width;
}

function CGRectGetMinY(rect)
{
	return rect.origin.y;
}

function CGRectGetMidY(rect)
{
	return rect.origin.y + (rect.size.height / 2.0);
}

function CGRectGetMaxY(rect)
{
	return rect.origin.y + rect.size.height;
}

function CGRectGetWidth(rect)
{
	return rect.size.width;
}

function CGRectGetHeight(rect)
{
	return rect.size.height;
}

function CGPointEqualToPoint(point1, point2)
{
	return (point1.x == point2.x) && (point1.y == point2.y);
}

function CGSizeEqualToSize(size1, size2)
{
	return (size1.width == size2.width) && (size1.height == size2.height);
}

function CGRectEqualToRect(rect1, rect2)
{
	return CGPointEqualToPoint(rect1.origin, rect2.origin) && CGSizeEqualToSize(rect1.size, rect2.size);
}

function CGRectStandardize(rect)
{
	var newRect = CGRectMake(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
	// fix width/x
	if(rect.size.width < 0)
	{
		newRect.size.width = rect.size.width * -1;
		newRect.origin.x = rect.origin.x - newRect.size.width;
	}
	// fix height/y
	if(rect.size.height < 0)
	{
		newRect.size.height = rect.size.height * -1;
		newRect.origin.y = rect.origin.y - newRect.size.height;
	}
	
	return newRect;
}

function CGRectIsEmpty(rect)
{
	if(CGRectIsNull(rect))
		return true;
		
	return ((rect.size.height == 0) || (rect.size.width == 0));
}

function CGRectIsNull(rect)
{
	if(!(rect.size && rect.origin))
		return false;
	
	if(!(rect.origin.x && rect.origin.y && rect.size.width && rect.size.height))
		return false
	
	return true;
}

// extern bool CGRectIsInfinite(CGRect rect);
function CGRectIsInfinite(rect)
{
	
}

function CGRectInset(rect, dx, dy)
{
	return CGRectMake(rect.origin.x + dx, rect.origin.y + dy, rect.size.width - (2 * dx), rect.size.height - (2 * dy));
}

function CGRectIntegral(rect)
{
	return CGRectMake(Math.floor(rect.origin.x), Math.floor(rect.origin.y), Math.ceil(rect.size.width), Math.ceil(rect.size.height));
}

// extern CGRect CGRectUnion(CGRect r1, CGRect r2);
function CGRectUnion(r1, r2)
{
	
}

// extern CGRect CGRectIntersection(CGRect r1, CGRect r2);
function CGRectIntersection(r1, r2)
{
	
}

// extern CGRect CGRectOffset(CGRect rect, CGFloat dx, CGFloat dy);
function CGRectOffset(rect, dx, dy)
{
	
}

// extern void CGRectDivide(CGRect rect, CGRect *slice, CGRect *remainder, CGFloat amount, CGRectEdge edge);
function CGRectDivide(rect, slice, remainder, amount, edge)
{
	
}

// extern bool CGRectContainsPoint(CGRect rect, CGPoint point);
function CGRectContainsPoint(rect, point)
{
	return point.x >= CGRectGetMinX(rect) && point.y >= CGRectGetMinY(rect) && point.x < CGRectGetMaxX(rect) && point.y < CGRectGetMaxY(rect);
}

// extern bool CGRectContainsRect(CGRect rect1, CGRect rect2);
function CGRectContainsRect(rect1, rect2)
{
	
}

// extern bool CGRectIntersectsRect(CGRect rect1, CGRect rect2);
function CGRectIntersectsRect(rect1, rect2)
{
	
}

// extern CFDictionaryRef CGPointCreateDictionaryRepresentation(CGPoint point);
function CGPointCreateDictionaryRepresentation(point)
{
	
}

// extern bool CGPointMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGPoint *point);
function CGPointMakeWithDictionaryRepresentation(dict, point)
{
	
}

// extern CFDictionaryRef CGSizeCreateDictionaryRepresentation(CGSize size);
function CGSizeCreateDictionaryRepresentation(size)
{
	
}

// extern bool CGSizeMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGSize *size);
function CGSizeMakeWithDictionaryRepresentation(dict, size)
{
	
}

// extern CFDictionaryRef CGRectCreateDictionaryRepresentation(CGRect rect);
function CGRectCreateDictionaryRepresentation(rect)
{
	
}

// extern bool CGRectMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGRect *rect);
function CGRectMakeWithDictionaryRepresentation(dict, rect)
{
	
}

function CGRectFromString(aString)
{
	var thePoint = CGPointFromString(aString.substr(1, aString.indexOf("},") - 1));
	var theSize = CGSizeFromString(aString.substr(aString.indexOf("},") + 3, aString.length - 3));
	return {
		origin: thePoint,
		size: theSize
	};
}

function CGStringFromRect(aRect)
{
    return "{" + CGStringFromPoint(aRect.origin) + ", " + CGStringFromSize(aRect.size) + "}";
}

function CGStringFromPoint(aPoint)
{
    return "{" + aPoint.x + ", " + aPoint.y + "}";
}

function CGStringFromSize(aSize)
{
    return "{" + aSize.width + ", " + aSize.height + "}";
}

function CGPointFromString(aString)
{
	return CGPointMake(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length - 1)));
}

function CGSizeFromString(aString)
{
	return CGSizeMake(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length-  1)));
}

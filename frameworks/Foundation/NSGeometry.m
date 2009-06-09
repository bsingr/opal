// 
//  NSGeometry.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSGeometry.h"

NSPoint NSMakePoint(CGFloat x, CGFloat y)
{
    NSPoint p;
    p.x = x;
    p.y = y;
    return p;
}

NSSize NSMakeSize(CGFloat w, CGFloat h)
{
    NSSize s;
    s.width = w;
    s.height = h;
    return s;
}

NSRect NSMakeRect(CGFloat x, CGFloat y, CGFloat w, CGFloat h)
{
    NSRect r;
    r.origin.x = x;
    r.origin.y = y;
    r.size.width = w;
    r.size.height = h;
    return r;
}

CGFloat NSMaxX(NSRect aRect)
{
    
}

CGFloat NSMaxY(NSRect aRect)
{
    
}

CGFloat NSMidX(NSRect aRect)
{
    
}

CGFloat NSMidY(NSRect aRect)
{
    
}

CGFloat NSMinX(NSRect aRect)
{
    
}

CGFloat NSMinY(NSRect aRect)
{
    
}

CGFloat NSWidth(NSRect aRect)
{
    
}

CGFloat NSHeight(NSRect aRect)
{
    
}


NSRect NSRectFromCGRect(CGRect cgrect)
{
    
}

CGRect NSRectToCGRect(NSRect nsrect)
{
    
}

NSPoint NSPointFromCGPoint(CGPoint cgpoint)
{
    
}


CGPoint NSPointToCGPoint(NSPoint nspoint)
{
    
}

NSSize NSSizeFromCGSize(CGSize cgsize)
{
    
}

CGSize NSSizeToCGSize(NSSize nssize)
{
    
}


BOOL NSEqualPoints(NSPoint aPoint, NSPoint bPoint)
{
    
}

BOOL NSEqualSizes(NSSize aSize, NSSize bSize)
{
    
}

BOOL NSEqualRects(NSRect aRect, NSRect bRect)
{
    
}

BOOL NSIsEmptyRect(NSRect aRect)
{
    
}


NSRect NSInsetRect(NSRect aRect, CGFloat dX, CGFloat dY)
{
    
}

NSRect NSIntegralRect(NSRect aRect)
{
    
}

NSRect NSUnionRect(NSRect aRect, NSRect bRect)
{
    
}

NSRect NSIntersectionRect(NSRect aRect, NSRect bRect)
{
    
}

NSRect NSOffsetRect(NSRect aRect, CGFloat dX, CGFloat dY)
{
    
}

void NSDivideRect(NSRect inRect, NSRect *slice, NSRect *rem, CGFloat amount, NSRectEdge edge)
{
    
}

BOOL NSPointInRect(NSPoint aPoint, NSRect aRect)
{
    
}

BOOL NSMouseInRect(NSPoint aPoint, NSRect aRect, BOOL flipped)
{
    
}

BOOL NSContainsRect(NSRect aRect, NSRect bRect)
{
    
}

BOOL NSIntersectsRect(NSRect aRect, NSRect bRect)
{
    
}


NSString *NSStringFromPoint(NSPoint aPoint)
{
    
}

NSString *NSStringFromSize(NSSize aSize)
{
    
}

NSString *NSStringFromRect(NSRect aRect)
{
    
}

NSPoint NSPointFromString(NSString *aString)
{
	if (!aString)
		return NSMakePoint(0,0);
		
    return CGPointFromString(aString);
}

NSSize NSSizeFromString(NSString *aString)
{
	if (!aString)
		return NSMakeSize(0,0);
		
	return CGSizeFromString(aString);
}

NSRect NSRectFromString(NSString *aString)
{
	if (!aString)
		return NSMakeRect(0,0,0,0);
		
    return CGRectFromString(aString);
}

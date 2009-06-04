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

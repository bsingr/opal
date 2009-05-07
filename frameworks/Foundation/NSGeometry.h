// 
//  NSGeometry.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSValue.h>
#import <Foundation/NSCoder.h>
#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGGeometry.h>

typedef CGPoint NSPoint;
typedef CGSize NSSize;
typedef CGRect NSRect;

#define NSMinXEdge CGRectMinXEdge
#define NSMinYEdge CGRectMinYEdge
#define NSMaxXEdge CGRectMaxXEdge
#define NSMaxYEdge CGRectMaxYEdge

typedef NSUInteger NSRectEdge;

@class NSString;

extern const NSPoint NSZeroPoint;
extern const NSSize NSZeroSize;
extern const NSRect NSZeroRect;
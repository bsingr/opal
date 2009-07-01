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

extern NSPoint NSMakePoint(CGFloat x, CGFloat y);
extern NSSize NSMakeSize(CGFloat w, CGFloat h);
extern NSRect NSMakeRect(CGFloat x, CGFloat y, CGFloat w, CGFloat h);

extern CGFloat NSMaxX(NSRect aRect);
extern CGFloat NSMaxY(NSRect aRect);
extern CGFloat NSMidX(NSRect aRect);
extern CGFloat NSMidY(NSRect aRect);
extern CGFloat NSMinX(NSRect aRect);
extern CGFloat NSMinY(NSRect aRect);
extern CGFloat NSWidth(NSRect aRect);
extern CGFloat NSHeight(NSRect aRect);

extern NSRect NSRectFromCGRect(CGRect cgrect);
extern CGRect NSRectToCGRect(NSRect nsrect);
extern NSPoint NSPointFromCGPoint(CGPoint cgpoint);

extern CGPoint NSPointToCGPoint(NSPoint nspoint);
extern NSSize NSSizeFromCGSize(CGSize cgsize);
extern CGSize NSSizeToCGSize(NSSize nssize);

extern BOOL NSEqualPoints(NSPoint aPoint, NSPoint bPoint);
extern BOOL NSEqualSizes(NSSize aSize, NSSize bSize);
extern BOOL NSEqualRects(NSRect aRect, NSRect bRect);
extern BOOL NSIsEmptyRect(NSRect aRect);

extern NSRect NSInsetRect(NSRect aRect, CGFloat dX, CGFloat dY);
extern NSRect NSIntegralRect(NSRect aRect);
extern NSRect NSUnionRect(NSRect aRect, NSRect bRect);
extern NSRect NSIntersectionRect(NSRect aRect, NSRect bRect);
extern NSRect NSOffsetRect(NSRect aRect, CGFloat dX, CGFloat dY);
extern void NSDivideRect(NSRect inRect, NSRect *slice, NSRect *rem, CGFloat amount, NSRectEdge edge);
extern BOOL NSPointInRect(NSPoint aPoint, NSRect aRect);
extern BOOL NSMouseInRect(NSPoint aPoint, NSRect aRect, BOOL flipped);
extern BOOL NSContainsRect(NSRect aRect, NSRect bRect);
extern BOOL NSIntersectsRect(NSRect aRect, NSRect bRect);

extern NSString *NSStringFromPoint(NSPoint aPoint);
extern NSString *NSStringFromSize(NSSize aSize);
extern NSString *NSStringFromRect(NSRect aRect);
extern NSPoint NSPointFromString(NSString *aString);
extern NSSize NSSizeFromString(NSString *aString);
extern NSRect NSRectFromString(NSString *aString);


@interface NSValue (NSValueGeometryExtensions)

+ (NSValue *)valueWithPoint:(NSPoint)point;
+ (NSValue *)valueWithSize:(NSSize)size;
+ (NSValue *)valueWithRect:(NSRect)rect;

- (NSPoint)pointValue;
- (NSSize)sizeValue;
- (NSRect)rectValue;

@end

@interface NSCoder (NSGeometryCoding)

- (void)encodePoint:(NSPoint)point;
- (NSPoint)decodePoint;

- (void)encodeSize:(NSSize)size;
- (NSSize)decodeSize;

- (void)encodeRect:(NSRect)rect;
- (NSRect)decodeRect;

@end

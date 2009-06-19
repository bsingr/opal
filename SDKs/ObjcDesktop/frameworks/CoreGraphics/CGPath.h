typedef struct CGPath *CGMutablePathRef;
typedef struct CGPath *CGPathRef;

#import <CoreGraphics/CGBase.h>
#import <CoreGraphics/CGAffineTransform.h>
#import <CoreFoundation/CFBase.h>

extern CFTypeID CGPathGetTypeID(void);

extern CGMutablePathRef CGPathCreateMutable(void);
extern CGPathRef CGPathCreateCopy(CGPathRef path);
extern CGMutablePathRef CGPathCreateMutableCopy(CGPathRef path);

extern bool CGPathEqualToPath(CGPathRef path1, CGPathRef path2);

extern bool CGPathMoveToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat x, CGFloat y);
extern void CGPathAddLineToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat x, CGFloat y);

extern void CGPathAddQuadCurveToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat cpx, CGFloat cpy, CGFloat x, CGFloat y);
extern void CGPathAddCurveToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat cp1x, CGFloat cp1y, CGFloat cp2x, CGFloat cp2y, CGFloat x, CGFloat y);

extern void CGPathCloseSubpath(CGMutablePathRef path);

extern void CGPathAddRect(CGMutablePathRef path, CGAffineTransform *m, CGRect rect);
extern void CGPathAddRects(CGMutablePathRef path, CGAffineTransform *m, CGRect rects[], int count);
extern void CGPathAddLines(CGMutablePathRef path, CGAffineTransform *m, CGPoint points[], int count);
extern void CGPathAddEllipseInRect(CGMutablePathRef path, CGAffineTransform *m, CGRect rect);
extern void CGPathAddArc(CGMutablePathRef path, CGAffineTransform *m, CGFloat x, CGFloat y, CGFloat radius, CGFloat startAngle, CGFloat endAngle, bool clockwise);
extern void CGPathAddArcToPoint(CGMutablePathRef path, CGAffineTransform *m, CGFloat x1, CGFloat y1, CGFloat x2, CGFloat y2, CGFloat radius);
extern void CGPathAddPath(CGMutablePathRef path1, CGAffineTransform *m, CGPathRef path2);
extern bool CGPathIsEmpty(CGPathRef path);
extern bool CGPathIsRect(CGPathRef path, CGRect *rect);
extern CGPoint CGPathGetCurrentPoint(CGPathRef path);
extern CGRect CGPathGetBoundingBox(CGPathRef path);
extern bool CGPathContainsPoint(CGPathRef path, CGAffineTransform *m, CGPoint point, bool eoFill);

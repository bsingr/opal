// 
//  NSGraphics.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSGeometry.h>

@class NSColor, NSView;

enum {
    NSCompositeClear		    = 0,
    NSCompositeCopy		        = 1,
    NSCompositeSourceOver	    = 2,
    NSCompositeSourceIn		    = 3,
    NSCompositeSourceOut	    = 4,
    NSCompositeSourceAtop	    = 5,
    NSCompositeDestinationOver	= 6,
    NSCompositeDestinationIn	= 7,
    NSCompositeDestinationOut	= 8,
    NSCompositeDestinationAtop	= 9,
    NSCompositeXOR		        = 10,
    NSCompositePlusDarker	    = 11,
    NSCompositeHighlight	    = 12,
    NSCompositePlusLighter	    = 13
};
typedef NSUInteger NSCompositingOperation;

enum {
    NSBackingStoreRetained	    = 0,
    NSBackingStoreNonretained	= 1,
    NSBackingStoreBuffered	    = 2
};
typedef NSUInteger NSBackingStoreType;

enum {
    NSWindowAbove		        =  1,
    NSWindowBelow		        = -1,
    NSWindowOut			        =  0
};
typedef NSInteger NSWindowOrderingMode;

enum {
    NSFocusRingOnly	            = 0,
    NSFocusRingBelow	        = 1,
    NSFocusRingAbove	        = 2
};
typedef NSUInteger NSFocusRingPlacement;

enum {
    NSFocusRingTypeDefault = 0,
    NSFocusRingTypeNone = 1,
    NSFocusRingTypeExterior = 2
};
typedef NSUInteger NSFocusRingType;

extern NSString *NSCalibratedWhiteColorSpace;
extern NSString *NSCalibratedBlackColorSpace;
extern NSString *NSCalibratedRGBColorSpace;
extern NSString *NSDeviceWhiteColorSpace;
extern NSString *NSDeviceBlackColorSpace;
extern NSString *NSDeviceRGBColorSpace;
extern NSString *NSDeviceCMYKColorSpace;
extern NSString *NSNamedColorSpace;
extern NSString *NSPatternColorSpace;
extern NSString *NSCustomColorSpace;


extern const CGFloat NSWhite;
extern const CGFloat NSLightGray;
extern const CGFloat NSDarkGray;
extern const CGFloat NSBlack;


extern void NSRectFill(NSRect aRect);
extern void NSRectFillList(const NSRect *rects, NSInteger count);
extern void NSRectFillListWithGrays(const NSRect *rects, const CGFloat *grays, NSInteger num);
extern void NSRectFillListWithColors(const NSRect *rects, NSColor **colors, NSInteger num);
extern void NSRectFillUsingOperation(NSRect aRect, NSCompositingOperation op);
extern void NSRectFillListUsingOperation(const NSRect *rects, NSInteger count, NSCompositingOperation op);
extern void NSRectFillListWithColorsUsingOperation(const NSRect *rects, NSColor **colors, NSInteger num, NSCompositingOperation op);
extern void NSFrameRect(NSRect aRect);
extern void NSFrameRectWithWidth(NSRect aRect, CGFloat frameWidth);
extern void NSFrameRectWithWidthUsingOperation(NSRect aRect, CGFloat frameWidth, NSCompositingOperation op);
extern void NSRectClip(NSRect aRect);
extern void NSRectClipList(const NSRect *rects, NSInteger count);
extern NSRect NSDrawTiledRects(NSRect boundsRect, NSRect clipRect, const NSRectEdge *sides, const CGFloat *grays, NSInteger count);
extern void NSDrawGrayBezel(NSRect aRect, NSRect clipRect);
extern void NSDrawGroove(NSRect aRect, NSRect clipRect);
extern void NSDrawWhiteBezel(NSRect aRect, NSRect clipRect);
extern void NSDrawButton(NSRect aRect, NSRect clipRect);
extern void NSEraseRect(NSRect aRect);
extern void NSDrawBitmap(NSRect rect, NSInteger width, NSInteger height, NSInteger bps, NSInteger spp, NSInteger bpp, NSInteger bpr, BOOL isPlanar, BOOL hasAlpha, NSString *colorSpaceName, const unsigned char *const data[5]);
extern void NSCopyBits(NSInteger srcGState, NSRect srcRect, NSPoint destPoint);
extern void NSHighlightRect(NSRect aRect);

extern NSRect NSDrawColorTiledRects(NSRect boundsRect, NSRect clipRect, const NSRectEdge *sides, NSColor **colors, NSInteger count);
extern void NSDrawDarkBezel(NSRect aRect, NSRect clipRect);
extern void NSDrawLightBezel(NSRect aRect, NSRect clipRect);
extern void NSDottedFrameRect(NSRect aRect);

extern void NSDrawWindowBackground(NSRect aRect);
extern void NSSetFocusRingStyle(NSFocusRingPlacement placement);

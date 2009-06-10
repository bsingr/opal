// 
//  CGEventType.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#include <CoreGraphics/CGBase.h>

typedef struct __CGEvent *CGEventRef;

enum _CGMouseButton
{
    kCGMouseButtonLeft          = 0,
    kCGMouseButtonRight         = 1,
    kCGMouseButtonCenter        = 2
};
typedef int CGMouseButton;


enum {
    kCGScrollEventUnitPixel     = 0,
    kCGScrollEventUnitLine      = 1
};
typedef int CGScrollEventUnit;

enum _CGEventFlags {
    kCGEventFlagMaskAlphaShift  = 0,
    kCGEventFlagMaskShift       = 0,
    kCGEventFlagMaskControl     = 0,
    kCGEventFlagMaskAlternate   = 0,
    kCGEventFlagMaskCommand     = 0,
    kCGEventFlagMaskHelp        = 0,
    kCGEventFlagMaskSecondaryFn = 0,
    kCGEventFlagMaskNumericPad  = 0
};
typedef int CGEventFlags;


enum _CGEventType {
    kCGEventNull = 0,
    // mouse ...
    kCGEventLeftMouseDown       = 0,
    kCGEventLeftMouseUp         = 0,
    kCGEventRightMouseDown      = 0,
    kCGEventRightMouseUp        = 0,
    kCGEventMouseMoved          = 0,
    kCGEventLeftMouseDragged    = 0,
    kCGEventRightMouseDragged   = 0,
    // keyboard ...
    kCGEventKeyDown             = 0,
    kCGEventKeyUp               = 0,
    kCGEventFlagsChanged        = 0,
    // extra ...
    kCGEventScrollWheel         = 0,
    kCGEventTabletPointer       = 0,
    kCGEventTabletProximity     = 0,
    kCGEventOtherMouseDown      = 0,
    kCGEventOtherMouseUp        = 0,
    kCGEventOtherMouseDragged   = 0
};
typedef int CGEventType;

typedef int CGEventTimestamp;

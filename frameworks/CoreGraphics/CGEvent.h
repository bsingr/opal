// 
//  CGEvent.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#include <CoreGraphics/CGBase.h>
#include <CoreGraphics/CGGeometry.h>
#include <CoreFoundation/CoreFoundation.h>
#include <CoreGraphics/CGEventType.h>

extern CGEventRef CGEventCreate(id source);


extern CGEventRef CGEventCreateMouseEvent(id source, CGEventType mouseType, CGPoint mouseCursorPosition, CGMouseButton mouseButton);
// extern CGEventRef CGEventCreateKeyboardEvent(id source, CGKeyCode virtualKey, bool keyDown);
                                                 
// extern CGEventRef CGEventCreateScrollWheelEvent(id source, CGScrollEventUnit units, CGWheelCount wheelCount, int wheel1, ...);

extern CGEventRef CGEventCreateCopy(CGEventRef event);

extern CGEventType CGEventGetType(CGEventRef event);
extern void CGEventSetType(CGEventRef event, CGEventType type);

extern CGEventTimestamp CGEventGetTimestamp(CGEventRef event);
extern void CGEventSetTimestamp(CGEventRef event, CGEventTimestamp timestamp);

extern CGPoint CGEventGetLocation(CGEventRef event);
extern CGPoint CGEventGetUnflippedLocation(CGEventRef event);
extern void CGEventSetLocation(CGEventRef event, CGPoint location);

extern CGEventFlags CGEventGetFlags(CGEventRef event);
extern void CGEventSetFlags(CGEventRef event, CGEventFlags flags);

extern void CGEventKeyboardGetUnicodeString(CGEventRef event, int maxStringLength, int actualStringLength, char unicodeString);

extern void CGEventKeyboardSetUnicodeString(CGEventRef event, int stringLength, const char unicodeString);

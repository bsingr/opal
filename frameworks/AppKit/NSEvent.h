// 
//  NSEvent.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSDate.h>
#import <Foundation/NSGeometry.h>
#import <CoreGraphics/CGEvent.h>

@class NSGraphicsContext;
@class NSWindow;
@class NSTrackingArea;
@class NSApplication;

enum {
    NSLeftMouseDown             = 1,
    NSLeftMouseUp               = 2,
    NSRightMouseDown            = 3,
    NSRightMouseUp              = 4,
    NSMouseMoved                = 5,
    NSLeftMouseDragged          = 6,
    NSRightMouseDragged         = 7,
    NSMouseEntered              = 8,
    NSMouseExited               = 9,
    NSKeyDown                   = 10,
    NSKeyUp                     = 11,
    NSFlagsChanged              = 12,
    NSAppKitDefined             = 13,
    NSSystemDefined             = 14,
    NSApplicationDefined        = 15,
    NSPeriodic                  = 16,
    NSCursorUpdate              = 17,
    NSScrollWheel               = 22,
    NSOtherMouseDown            = 25,
    NSOtherMouseUp              = 26,
    NSOtherMouseDragged         = 27
};
typedef NSUInteger NSEventType;

enum {
    NSLeftMouseDownMask         = 1 << NSLeftMouseDown,
    NSLeftMouseUpMask           = 1 << NSLeftMouseUp,
    NSRightMouseDownMask        = 1 << NSRightMouseDown,
    NSRightMouseUpMask          = 1 << NSRightMouseUp,
    NSMouseMovedMask            = 1 << NSMouseMoved,
    NSLeftMouseDraggedMask      = 1 << NSLeftMouseDragged,
    NSRightMouseDraggedMask     = 1 << NSRightMouseDragged,
    NSMouseEnteredMask          = 1 << NSMouseEntered,
    NSMouseExitedMask           = 1 << NSMouseExited,
    NSKeyDownMask               = 1 << NSKeyDown,
    NSKeyUpMask                 = 1 << NSKeyUp,
    NSFlagsChangedMask          = 1 << NSFlagsChanged,
    NSAppKitDefinedMask         = 1 << NSAppKitDefined,
    NSSystemDefinedMask         = 1 << NSSystemDefined,
    NSApplicationDefinedMask    = 1 << NSApplicationDefined,
    NSPeriodicMask              = 1 << NSPeriodic,
    NSCursorUpdateMask          = 1 << NSCursorUpdate,
    NSScrollWheelMask           = 1 << NSScrollWheel,
    NSOtherMouseDownMask        = 1 << NSOtherMouseDown,
    NSOtherMouseUpMask          = 1 << NSOtherMouseUp,
    NSOtherMouseDraggedMask     = 1 << NSOtherMouseDragged
};

extern NSUInteger NSEventMaskFromType(NSEventType type);

enum {
    NSAlphaShiftKeyMask         = 1 << 16,
    NSShiftKeyMask              = 1 << 17,
    NSControlKeyMask            = 1 << 18,
    NSAlternateKeyMask          = 1 << 19,
    NSCommandKeyMask            = 1 << 20,
    NSNumericPadKeyMask         = 1 << 21,
    NSHelpKeyMask               = 1 << 22,
    NSFunctionKeyMask           = 1 << 23
};

@interface NSEvent : NSObject <NSCopying, NSCoding>
{
    NSEventType     _type;
    NSPoint         _location;
    int             _modifierFlags;
    NSTimeInterval  _timestamp;
    NSInteger       _windowNumber;
    NSWindow       *_window;
    id              _context;                         
    id              _characters;                      
    id              _charactersIgnoringModifiers;     
    id              _isARepeat;                       
    id              _keyCode;                         
                                                 
    id              _clickCount;                      
    id              _locationInBase;                  
    id              _eventRef;                        
    id              _buttonNumber;                    
    id              _deltaX;                          
    id              _deltaY;                          
    id              _deltaZ;                          
}

- (NSEventType)type;
- (NSUInteger)modifierFlags;
- (NSTimeInterval)timestamp;
- (NSWindow *)window;
- (NSInteger)windowNumber;
- (NSGraphicsContext*)context;

- (NSInteger)clickCount;
- (NSInteger)buttonNumber;
- (NSInteger)eventNumber;

- (NSPoint)locationInWindow;

- (CGFloat)deltaX;    
- (CGFloat)deltaY;    

- (NSString *)characters;
- (NSString *)charactersIgnoringModifiers;
- (BOOL)isARepeat;
- (unsigned short)keyCode;

- (NSInteger)trackingNumber;
- (void *)userData;
- (NSTrackingArea *)trackingArea; 

- (short)subtype;

- (NSInteger)data1;
- (NSInteger)data2;

+ (void)startPeriodicEventsAfterDelay:(NSTimeInterval)delay withPeriod:(NSTimeInterval)period;
+ (void)stopPeriodicEvents;

+ (NSEvent *)mouseEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context eventNumber:(NSInteger)eNum clickCount:(NSInteger)cNum pressure:(float)pressure;
+ (NSEvent *)keyEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context characters:(NSString *)keys charactersIgnoringModifiers:(NSString *)ukeys isARepeat:(BOOL)flag keyCode:(unsigned short)code;
+ (NSEvent *)enterExitEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context eventNumber:(NSInteger)eNum trackingNumber:(NSInteger)tNum userData:(void *)data;
+ (NSEvent *)otherEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context subtype:(short)subtype data1:(NSInteger)d1 data2:(NSInteger)d2;

+ (NSPoint)mouseLocation;

@end

enum {
    NSUpArrowFunctionKey        = 0xF700,
    NSDownArrowFunctionKey      = 0xF701,
    NSLeftArrowFunctionKey      = 0xF702,
    NSRightArrowFunctionKey     = 0xF703,
    NSInsertFunctionKey         = 0xF727,
    NSDeleteFunctionKey         = 0xF728,
    NSHomeFunctionKey           = 0xF729,
    NSBeginFunctionKey          = 0xF72A,
    NSEndFunctionKey            = 0xF72B,
    NSPageUpFunctionKey         = 0xF72C,
    NSPageDownFunctionKey       = 0xF72D,
    NSPrintScreenFunctionKey    = 0xF72E,
    NSScrollLockFunctionKey     = 0xF72F,
    NSPauseFunctionKey          = 0xF730,
    NSSysReqFunctionKey         = 0xF731,
    NSBreakFunctionKey          = 0xF732,
    NSResetFunctionKey          = 0xF733,
    NSStopFunctionKey           = 0xF734,
    NSMenuFunctionKey           = 0xF735,
    NSUserFunctionKey           = 0xF736,
    NSSystemFunctionKey         = 0xF737,
    NSPrintFunctionKey          = 0xF738,
    NSClearLineFunctionKey      = 0xF739,
    NSClearDisplayFunctionKey   = 0xF73A,
    NSInsertLineFunctionKey     = 0xF73B,
    NSDeleteLineFunctionKey     = 0xF73C,
    NSInsertCharFunctionKey     = 0xF73D,
    NSDeleteCharFunctionKey     = 0xF73E,
    NSPrevFunctionKey           = 0xF73F,
    NSNextFunctionKey           = 0xF740,
    NSSelectFunctionKey         = 0xF741,
    NSExecuteFunctionKey        = 0xF742,
    NSUndoFunctionKey           = 0xF743,
    NSRedoFunctionKey           = 0xF744,
    NSFindFunctionKey           = 0xF745,
    NSHelpFunctionKey           = 0xF746,
    NSModeSwitchFunctionKey     = 0xF747
};

// =========================================================================
// = Vienna Added methods: easier transition between CGEvents and NSEvents =
// =========================================================================

extern void NSEventMouseEventFromCGEvent(CGEventRef event);

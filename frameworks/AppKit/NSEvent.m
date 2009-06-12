// 
//  NSEvent.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 


#import "NSEvent.h"

@implementation NSEvent

- (NSEventType)type
{
    
}

- (NSUInteger)modifierFlags
{
    
}

- (NSTimeInterval)timestamp
{
    
}

- (NSWindow *)window
{
    return _window;
}

- (NSInteger)windowNumber
{
    return _windowNumber;
}

- (NSGraphicsContext*)context
{
    
}


- (NSInteger)clickCount
{
    
}

- (NSInteger)buttonNumber
{
    
}

- (NSInteger)eventNumber
{
    
}

- (NSPoint)locationInWindow
{
    
}

- (CGFloat)deltaX
{
    
}

- (CGFloat)deltaY
{
    
}

- (NSString *)characters
{
    
}

- (NSString *)charactersIgnoringModifiers
{
    
}

- (BOOL)isARepeat
{
    
}

- (unsigned short)keyCode
{
    
}

- (NSInteger)trackingNumber
{
    
}

- (void *)userData
{
    
}

- (NSTrackingArea *)trackingArea
{
    
}


- (short)subtype
{
    
}


- (NSInteger)data1
{
    
}

- (NSInteger)data2
{
    
}


+ (void)startPeriodicEventsAfterDelay:(NSTimeInterval)delay withPeriod:(NSTimeInterval)period
{
    
}

+ (void)stopPeriodicEvents
{
    
}


+ (NSEvent *)mouseEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context eventNumber:(NSInteger)eNum clickCount:(NSInteger)cNum pressure:(float)pressure
{
    NSEvent *theEvent = [[NSEvent alloc] init];
    theEvent._type = type;
    theEvent._location = location;
    theEvent._modifierFlags = flags;
    theEvent._timestamp = time;
    theEvent._windowNumber = wNum;
    theEvent._window = [[NSApplication sharedApplication] windowWithWindowNumber:wNum];
    theEvent._context = context;
    theEvent._eventNumber = eNum;
    theEvent._clickCount = cNum;
    theEvent._pressure = pressure;
    return theEvent;
}

+ (NSEvent *)keyEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context characters:(NSString *)keys charactersIgnoringModifiers:(NSString *)ukeys isARepeat:(BOOL)flag keyCode:(unsigned short)code
{
    
}

+ (NSEvent *)enterExitEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context eventNumber:(NSInteger)eNum trackingNumber:(NSInteger)tNum userData:(void *)data
{
    
}

+ (NSEvent *)otherEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(NSTimeInterval)time windowNumber:(NSInteger)wNum context:(NSGraphicsContext*)context subtype:(short)subtype data1:(NSInteger)d1 data2:(NSInteger)d2
{
    
}


+ (NSPoint)mouseLocation
{
    
}


@end

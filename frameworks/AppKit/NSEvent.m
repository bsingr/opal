// 
//  NSEvent.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 


#import "NSEvent.h"

@implementation NSEvent

// MARK: Creating events
+ (NSEvent *)keyEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(int)time windowNumber:(NSInteger)windowNum context:(NSGraphicsContext *)context characters:(NSString *)characters charactersIgnoringModifiers:(NSString *)unmodCharacters isARepeat:(BOOL)repeatKey keyCode:(int)code
{
    return [[NSEvent alloc] initKeyEventWithType:type 
                                        location:location 
                                   modifierFlags:flags 
                                       timestamp:time 
                                    windowNumber:windowNum 
                                         context:context 
                                      characters:characters 
                     charactersIgnoringModifiers:unmodCharacters 
                                       isARepeat:repeatKey 
                                         keyCode:code];
}

+ (NSEvent *)mouseEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(int)time windowNumber:(NSInteger)windowNum context:(NSGraphicsContext *)context eventNumber:(NSInteger)eventNumber clickCount:(NSInteger)clickNumber pressure:(void)pressure
{
    return [[NSEvent alloc] initMouseEventWithType:type 
                                          location:location 
                                     modifierFlags:flags 
                                         timestamp:time 
                                      windowNumber:windowNum 
                                           context:context 
                                       eventNumber:eventNumber 
                                        clickCount:clickNumber 
                                          pressure:pressure];
}

- (NSEvent *)initKeyEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(int)time windowNumber:(NSInteger)windowNum context:(NSGraphicsContext *)context characters:(NSString *)characters charactersIgnoringModifiers:(NSString *)unmodCharacters isARepeat:(BOOL)repeatKey keyCode:(int)code
{
    [self init];
    if (self)
    {
        _type = type;
        _locationInWindow = location;
        _modifierFlags = flags;
        _timestamp = time;
        _windowNumber = windowNum;
        _context = context;
        _characters = characters;
        _charactersIgnoringModifiers = unmodCharacters;
        _isARepeat = repeatKey;
        _keyCode = code;
        
        //_window = [[NSApplication sharedApplication] windowWithWindowNumber:_windowNumber];
    }
    
    return self;
}

- (NSEvent *)initMouseEventWithType:(NSEventType)type location:(NSPoint)location modifierFlags:(NSUInteger)flags timestamp:(int)time windowNumber:(NSInteger)windowNum context:(NSGraphicsContext *)context eventNumber:(NSInteger)eventNumber clickCount:(NSInteger)clickNumber pressure:(void)pressure
{
    [self init];
    if (self)
    {
        _type = type;
        _locationInWindow = location;
        _modifierFlags = flags;
        _timestamp = time;
        _windowNumber = windowNum;
        _context = context;
        _clickCount = clickNumber;
        
        _window = [[NSApplication sharedApplication] windowWithWindowNumber:_windowNumber];
        
        if (_modifierFlags & NSCommandKeyMask)
            NSLog(@"Command key was pressed");
        
        if (_modifierFlags & NSShiftKeyMask)
            NSLog(@"Shift key was pressed");
        
        if (_modifierFlags & NSAlternateKeyMask)
            NSLog(@"Alt key was pressed");
        
        if (_modifierFlags & NSControlKeyMask)
            NSLog(@"Control key was pressed");
    }
    
    return self;
}


// MARK: Getting general event information
- (NSGraphicsContext *)context
{
    return _context;
}

- (NSPoint)locationInWindow
{
    return _locationInWindow;
}

- (NSUInteger)modifierFlags
{
    return _modifierFlags;
}

- (int)timestamp
{
    return _timestamp;
}

- (NSEventType)type
{
    return _type;
}

- (NSWindow *)window
{
    return _window;
}

- (void)setWindow:(NSWindow *)aWindow
{
    _window = aWindow;
}

- (void)setLocationInBase:(NSPoint)aPoint
{
    _locationInBase = aPoint;
}

- (NSPoint)locationInBase
{
    return _locationInBase;
}

- (NSInteger)windowNumber
{
    return _windowNumber;
}

- (void)eventRef
{
    return _eventRef;
}

// MARK: Getting key event information
- (NSString *)characters
{
    return _characters;
}

- (NSString *)charactersIgnoringModifiers
{
    return _charactersIgnoringModifiers;
}

- (BOOL)isARepeat
{
    return _isARepeat;
}

- (int)keyCode
{
    return _keyCode;
}

// MARK: Getting mouse event information
+ (NSPoint)mouseLocation
{
    return NSMakePoint (0,0);
}

- (NSInteger)buttonNumber
{
    return _buttonNumber;
}

- (NSInteger)clickCount
{
    return _clickCount;
}

// MARK: Getting scroll wheel event information
- (CGFloat)deltaX
{
    return _deltaX;
}

- (CGFloat)deltaY
{
    return _deltaY;
}

- (CGFloat)deltaZ
{
    return _deltaZ;
}

// // MARK: MOCHA methods for converitng JS events into Cocoa Events
// + (void)createKeyDownEvent:(Event *)theEvent
// {
//     NSLog(@"doing event");
//     
//     NSUInteger keyCode = theEvent.charCode;
//     
//     id theCharacters;
//     
//     if (theEvent.shiftKey)
//         theCharacters = String.fromCharCode(keyCode);
//     else
//         theCharacters = String.fromCharCode(keyCode).toLowerCase();
//     
//     NSInteger modifierFlags = 1;
//     
//      if (theEvent.metaKey)
//      modifierFlags = modifierFlags | NSCommandKeyMask;
//      
//      if (theEvent.shiftKey)
//      modifierFlags = modifierFlags | NSShiftKeyMask;
//      
//      if (theEvent.altKey)
//      modifierFlags = modifierFlags | NSAlternateKeyMask;
//      
//      if (theEvent.ctrlKey)
//      modifierFlags = modifierFlags | NSControlKeyMask;
//     
//     id target = [[[NSApplication sharedApplication] windows] objectAtIndex:0];
//     
//     NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                         location:nil 
//                                    modifierFlags:modifierFlags 
//                                        timestamp:nil 
//                                     windowNumber:nil
//                                          context:nil 
//                                       characters:theCharacters 
//                      charactersIgnoringModifiers:theCharacters 
//                                        isARepeat:nil 
//                                          keyCode:keyCode];
//     
//     [[NSApplication sharedApplication] sendEvent:anEvent];
//     Event.stop(theEvent);
// }
// 
// + (void)createPartialKeyDownEvent:(Event *)theEvent
// {
//     NSInteger modifierFlags = 1;
//     
//     if (theEvent.metaKey)
//         modifierFlags = modifierFlags | NSCommandKeyMask;
//     
//     if (theEvent.shiftKey)
//         modifierFlags = modifierFlags | NSShiftKeyMask;
//     
//     if (theEvent.altKey)
//         modifierFlags = modifierFlags | NSAlternateKeyMask;
//     
//     if (theEvent.ctrlKey)
//         modifierFlags = modifierFlags | NSControlKeyMask;
//     
//     
//     NSLog(theEvent.keyCode);
//     if (theEvent.keyCode == NSTabKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSDeleteFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSPageUpFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSPageDownFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSUpArrowFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSDownArrowFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSLeftArrowFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
//     else if (theEvent.keyCode == NSRightArrowFunctionKey)
//     {
//         NSEvent *anEvent = [NSEvent keyEventWithType:NSKeyDown 
//                                             location:nil 
//                                        modifierFlags:modifierFlags 
//                                            timestamp:nil 
//                                         windowNumber:nil
//                                              context:nil 
//                                           characters:theEvent.keyCode 
//                          charactersIgnoringModifiers:theEvent.keyCode 
//                                            isARepeat:nil 
//                                              keyCode:theEvent.keyCode];
//         
//         [[NSApplication sharedApplication] sendEvent:anEvent];
//         Event.stop(theEvent);
//     }
// }
// 
// + (void)createMouseDownEvent:(Event *)theEvent
// {
//     NSRect screenRect = [[NSScreen mainScreen] frame];
//     
//  id *element = [Event element:theEvent];
//  NSWindow *target = element.dataOwner;
//     int elementX = [theEvent pointerX] - [target frame].origin.x;
//     int elementY = screenRect.size.height - [theEvent pointerY] - [target frame].origin.y;
//     
//     NSUInteger modifierFlags = 1;
//     
//     if (theEvent.metaKey)
//         modifierFlags = modifierFlags | NSCommandKeyMask;
//     
//     if (theEvent.shiftKey)
//         modifierFlags = modifierFlags | NSShiftKeyMask;
//     
//     if (theEvent.altKey)
//         modifierFlags = modifierFlags | NSAlternateKeyMask;
//     
//     if (theEvent.ctrlKey)
//         modifierFlags = modifierFlags | NSControlKeyMask;
//     
//     NSEvent *anEvent = [NSEvent mouseEventWithType:NSLeftMouseDown
//                                           location:NSMakePoint (elementX, elementY) 
//                                      modifierFlags:modifierFlags 
//                                          timestamp:nil 
//                                       windowNumber:[target windowNumber]
//                                            context:nil 
//                                        eventNumber:nil 
//                                         clickCount:1 
//                                           pressure:nil];
//     
//     [anEvent setWindow:target];
//     [anEvent setLocationInBase:NSMakePoint (Event.pointerX(theEvent), window.innerHeight - Event.pointerY(theEvent))];
//     [[NSApplication sharedApplication] sendEvent:anEvent];
// }
// 
// + (void)createMouseUpEvent:(Event *)theEvent
// {
//     NSRect screenRect = [[NSScreen mainScreen] frame];
//     
//  id *element = [Event element:theEvent];
//  NSWindow *target = element.dataOwner;
//     int elementX = [theEvent pointerX] - [target frame].origin.x;
//     int elementY = screenRect.size.height - [theEvent pointerY] - [target frame].origin.y;
//     
//     NSEvent *anEvent = [NSEvent mouseEventWithType:NSLeftMouseUp
//                                           location:NSMakePoint (elementX, elementY) 
//                                      modifierFlags:nil 
//                                          timestamp:nil 
//                                       windowNumber:[target windowNumber] 
//                                            context:nil 
//                                        eventNumber:nil 
//                                         clickCount:1 
//                                           pressure:nil];
//     
//     [anEvent setWindow:target];
//     [anEvent setLocationInBase:NSMakePoint (Event.pointerX(theEvent), window.innerHeight - Event.pointerY(theEvent))];
//     [[NSApplication sharedApplication] sendEvent:anEvent];
// }
// 
// + (void)createMouseMoveEvent:(Event *)theEvent
// {
//     NSRect screenRect = [[NSScreen mainScreen] frame];
//     
//  id *element = [Event element:theEvent];
//  NSWindow *target = element.dataOwner;
//     int elementX = [theEvent pointerX] - [target frame].origin.x;
//     int elementY = screenRect.size.height - [theEvent pointerY] - [target frame].origin.y;
//     
//     NSEvent *anEvent = [NSEvent mouseEventWithType:NSMouseMoved
//                                           location:NSMakePoint (elementX, elementY) 
//                                      modifierFlags:nil 
//                                          timestamp:nil 
//                                       windowNumber:[target windowNumber] 
//                                            context:nil 
//                                        eventNumber:nil 
//                                         clickCount:1 
//                                           pressure:nil];
//     
//     [anEvent setWindow:target];
//     [anEvent setLocationInBase:NSMakePoint (Event.pointerX(theEvent), window.innerHeight - Event.pointerY(theEvent))];
//     [[NSApplication sharedApplication] sendEvent:anEvent];
// }
// 
@end

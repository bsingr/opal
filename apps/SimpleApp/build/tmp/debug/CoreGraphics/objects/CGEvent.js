// 
//  CGEvent.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 
// =============================================================================
// = Capture all window events for use in AppKit etc. some might return false  =
// =============================================================================
document.onmousedown = function(event)
{
    NSEventMouseEventFromCGEvent(event);
    // var theEvent = objc_msgSend(NSEvent, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:",
    //     1, CGPointMake(event.clientX, (window.innerHeight - event.clientY)), null, null, 0, null, 1, 1, 1);
    // 
    // objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendEvent:", theEvent);
};

document.onmouseup = function(event)
{
    NSEventMouseEventFromCGEvent(event);
    // var theEvent = objc_msgSend(NSEvent, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:",
    //     2, CGPointMake(event.clientX, (window.innerHeight - event.clientY)), null, null, 0, null, 1, 1, 1);
    // 
    // objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendEvent:", theEvent);
};


function CGEventScreenFrameRect()
{
    return CGRectMake(0, 0, window.innerWidth, window.innerHeight);
}

// extern CGEventType CGEventGetType(CGEventRef event);
function CGEventGetType(event)
{
    if(event.type == "mousedown")
        return 1;
    else if(event.type == "mouseup")
        return 2;
    else return -1;
}

// extern CGPoint CGEventGetLocation(CGEventRef event);
function CGEventGetLocation(event)
{
    return CGPointMake(event.clientX, (window.innerHeight - event.clientY));
}

// extern CGPoint CGEventGetUnflippedLocation(CGEventRef event);
function CGEventGetUnflippedLocation(event)
{
    return CGPointMake(event.clientX, event.clientY);
}

// extern void CGEventSetLocation(CGEventRef event, CGPoint location);
// 
// extern CGEventFlags CGEventGetFlags(CGEventRef event);
// extern void CGEventSetFlags(CGEventRef event, CGEventFlags flags);
// 
// extern void CGEventKeyboardGetUnicodeString(CGEventRef event, int maxStringLength, int actualStringLength, char unicodeString);
// 
// extern void CGEventKeyboardSetUnicodeString(CGEventRef event, int stringLength, const char unicodeString);

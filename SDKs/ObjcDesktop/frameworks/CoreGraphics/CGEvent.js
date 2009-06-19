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
};

document.onmouseup = function(event)
{
    NSEventMouseEventFromCGEvent(event);
};

document.onmousemove = function(event)
{
    NSEventMouseEventFromCGEvent(event);
};

document.onkeypress = function(event)
{
    NSEventKeyEventFromCGEvent(event);
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
    else if(event.type == "mousemove")
        return 5;
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
function CGEventGetFlags(event)
{
    var modifierFlags = 1;
    
    if (event.metaKey)
     modifierFlags = modifierFlags | (1 << 20);
     
     if (event.shiftKey)
     modifierFlags = modifierFlags | (1 << 17);
     
     if (event.altKey)
     modifierFlags = modifierFlags | (1 << 19);
     
     if (event.ctrlKey)
     modifierFlags = modifierFlags | (1 << 18);
    
    return modifierFlags;
}

// extern void CGEventSetFlags(CGEventRef event, CGEventFlags flags);
// 
// extern void CGEventKeyboardGetUnicodeString(CGEventRef event, int maxStringLength, int actualStringLength, char unicodeString);
// 
// extern void CGEventKeyboardSetUnicodeString(CGEventRef event, int stringLength, const char unicodeString);

// extern CFStringRef CGEventKeyGetUnicodeString(CGEventRef event);
function CGEventKeyGetUnicodeString(event)
{
    var keyCode = event.charCode;
    var theCharacters = String.fromCharCode(keyCode);

    // if ( theCharacters.toUpperCase() === theCharacters && theCharacters.toLowerCase() !== theCharacters && !theCharacters.shiftKey ) {
    //                     NSLog("caps: " + theCharacters);
    //             }
    
    return theCharacters;
}
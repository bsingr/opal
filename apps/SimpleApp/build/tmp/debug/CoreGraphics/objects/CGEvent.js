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
document.onmousedown = function(event) {    
    var theEvent = objc_msgSend(NSEvent, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:",
    1, CGPointMake(event.clientX, event.clientY), null, null, 0, null, 1, 1, 1);

    objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendEvent:", theEvent);
};

document.onmouseup = function(event) {
    printf("mouse up:(" + event.clientX + "," + event.clientY + ")");
};

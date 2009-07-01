/* 
 * responder.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var NSResponder = NSObject.extend({

    _nextResponder: null,
    
    nextResponder: function() {
        return this._nextResponder;
    },
    
    setNextResponder: function(aResponder) {
        this._nextResponder = aResponder;
    },
    
    tryToPerform: function(anAction, anObject) {
        
        if (this.respondsTo(anAction)) {
            this.perform(anAction, anObject);
            return true;
        }
        
        return this._nextResponder.tryToPerform(anAction, anObject);
    }

    // - (BOOL)performKeyEquivalent:(NSEvent *)theEvent
    // {
    //     return NO;
    // }
    // 
    // - (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)mouseDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseDown:theEvent];
    // }
    // 
    // - (void)rightMouseDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder rightMouseDown:theEvent];
    // }
    // 
    // - (void)otherMouseDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder otherMouseDown:theEvent];
    // }
    // 
    // - (void)mouseUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseUp:theEvent];
    // }
    // 
    // - (void)rightMouseUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder rightMouseUp:theEvent];
    // }
    // 
    // - (void)otherMouseUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder otherMouseUp:theEvent];
    // }
    // 
    // - (void)mouseMoved:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseMoved:theEvent];
    // }
    // 
    // - (void)mouseDragged:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseDragged:theEvent];
    // }
    // 
    // - (void)scrollWheel:(NSEvent *)theEvent
    // {
    //     [_nextResponder scrollWheel:theEvent];
    // }
    // 
    // - (void)rightMouseDragged:(NSEvent *)theEvent
    // {
    //     [_nextResponder rightMouseDragged:theEvent];
    // }
    // 
    // - (void)otherMouseDragged:(NSEvent *)theEvent
    // {
    //     [_nextResponder otherMouseDragged:theEvent];
    // }
    // 
    // - (void)mouseEntered:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseEntered:theEvent];
    // }
    // 
    // - (void)mouseExited:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseExited:theEvent];
    // }
    // 
    // - (void)keyDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder keyDown:theEvent];
    // }
    // 
    // - (void)keyUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder keyUp:theEvent];
    // }
    // 
    // - (void)flagsChanged:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)tabletPoint:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)tabletProximity:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)cursorUpdate:(NSEvent *)event
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)noResponderFor:(SEL)eventSelector
    // {
    //     if (eventSelector == @selector(keyDown:))
    //     {
    //         // TODO: Make a beeping sound
    //     }
    // }
    // 
    // - (BOOL)acceptsFirstResponder
    // {
    //     return NO;
    // }
    // 
    // - (BOOL)becomeFirstResponder
    // {
    //     return YES;
    // }
    // 
    // - (BOOL)resignFirstResponder
    // {
    //     return YES;
    // }
    // 
    // 
    // - (void)interpretKeyEvents:(NSArray *)eventArray
    // {
    //     NSInteger eventsCount = [eventArray count];
    //     for (int i = 0; i < eventsCount; i++)
    //     {
    //         // NSEvent *event = [eventArray objectAtIndex:i];
    //         //         NSString *eventString = [event charactersIgnoringModifiers];
    //         //         
    //         //         switch ([event keyCode]) {
    //         //             case NSBackspaceKey:
    //         //                 if ([self respondsToSelector:@selector(deleteBackward:)])
    //         //                     [self deleteBackward:event];
    //         //                 break;
    //         //             case NSTabKey:
    //         //                 if ([self respondsToSelector:@selector(insertTab:)])
    //         //                     [self insertTab:event];
    //         //                 break;
    //         //             default:
    //         //             NSLog(@"Does not respond to - interptretKeyEvents:");
    //         //         }
    //     }
    // }
    // 
    // - (void)flushBufferedKeyEvents
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (void)setMenu:(NSMenu *)menu
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (NSMenu *)menu
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (void)showContextHelp:(id)sender
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (void)helpRequested:(NSEvent *)eventPtr
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (BOOL)shouldBeTreatedAsInkEvent:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
});

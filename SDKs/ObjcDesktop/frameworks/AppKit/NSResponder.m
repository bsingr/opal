// 
//  NSResponder.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSResponder.h"

@implementation NSResponder

- (NSResponder *)nextResponder
{
    return _nextResponder;
}

- (void)setNextResponder:(NSResponder *)aResponder
{
    _nextResponder = aResponder;
}

- (BOOL)tryToPerform:(SEL)anAction with:(id)anObject
{
    if ([self respondsToSelector:anAction]) {
        [self performSelector:anAction with:anObject];
        return YES;
    }
    
    return [_nextResponder tryToPerform:anAction with:anObject];
}

- (BOOL)performKeyEquivalent:(NSEvent *)theEvent
{
    return NO;
}

- (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType
{
    // TODO: Need to implement
}

- (void)mouseDown:(NSEvent *)theEvent
{
    [_nextResponder mouseDown:theEvent];
}

- (void)rightMouseDown:(NSEvent *)theEvent
{
    [_nextResponder rightMouseDown:theEvent];
}

- (void)otherMouseDown:(NSEvent *)theEvent
{
    [_nextResponder otherMouseDown:theEvent];
}

- (void)mouseUp:(NSEvent *)theEvent
{
    [_nextResponder mouseUp:theEvent];
}

- (void)rightMouseUp:(NSEvent *)theEvent
{
    [_nextResponder rightMouseUp:theEvent];
}

- (void)otherMouseUp:(NSEvent *)theEvent
{
    [_nextResponder otherMouseUp:theEvent];
}

- (void)mouseMoved:(NSEvent *)theEvent
{
    [_nextResponder mouseMoved:theEvent];
}

- (void)mouseDragged:(NSEvent *)theEvent
{
    [_nextResponder mouseDragged:theEvent];
}

- (void)scrollWheel:(NSEvent *)theEvent
{
    [_nextResponder scrollWheel:theEvent];
}

- (void)rightMouseDragged:(NSEvent *)theEvent
{
    [_nextResponder rightMouseDragged:theEvent];
}

- (void)otherMouseDragged:(NSEvent *)theEvent
{
    [_nextResponder otherMouseDragged:theEvent];
}

- (void)mouseEntered:(NSEvent *)theEvent
{
    [_nextResponder mouseEntered:theEvent];
}

- (void)mouseExited:(NSEvent *)theEvent
{
    [_nextResponder mouseExited:theEvent];
}

- (void)keyDown:(NSEvent *)theEvent
{
    [_nextResponder keyDown:theEvent];
}

- (void)keyUp:(NSEvent *)theEvent
{
    [_nextResponder keyUp:theEvent];
}

- (void)flagsChanged:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (void)tabletPoint:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (void)tabletProximity:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (void)cursorUpdate:(NSEvent *)event
{
    // TODO: Need to implement
}

- (void)noResponderFor:(SEL)eventSelector
{
    if (eventSelector == @selector(keyDown:))
    {
        // TODO: Make a beeping sound
    }
}

- (BOOL)acceptsFirstResponder
{
    return NO;
}

- (BOOL)becomeFirstResponder
{
    return YES;
}

- (BOOL)resignFirstResponder
{
    return YES;
}


- (void)interpretKeyEvents:(NSArray *)eventArray
{
    NSInteger eventsCount = [eventArray count];
    for (int i = 0; i < eventsCount; i++)
    {
        // NSEvent *event = [eventArray objectAtIndex:i];
        //         NSString *eventString = [event charactersIgnoringModifiers];
        //         
        //         switch ([event keyCode]) {
        //             case NSBackspaceKey:
        //                 if ([self respondsToSelector:@selector(deleteBackward:)])
        //                     [self deleteBackward:event];
        //                 break;
        //             case NSTabKey:
        //                 if ([self respondsToSelector:@selector(insertTab:)])
        //                     [self insertTab:event];
        //                 break;
        //             default:
        //             NSLog(@"Does not respond to - interptretKeyEvents:");
        //         }
    }
}

- (void)flushBufferedKeyEvents
{
    // TODO: Need to implement
}


- (void)setMenu:(NSMenu *)menu
{
    // TODO: Need to implement
}

- (NSMenu *)menu
{
    // TODO: Need to implement
}


- (void)showContextHelp:(id)sender
{
    // TODO: Need to implement
}


- (void)helpRequested:(NSEvent *)eventPtr
{
    // TODO: Need to implement
}


- (BOOL)shouldBeTreatedAsInkEvent:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

@end


@implementation NSResponder (NSUndoSupport)

- (NSUndoManager *)undoManager
{
    // TODO: Need to implement
}

@end

@implementation NSResponder(NSErrorPresentation)

- (void)presentError:(NSError *)error modalForWindow:(NSWindow *)window delegate:(id)delegate didPresentSelector:(SEL)didPresentSelector contextInfo:(void *)contextInfo
{
    // TODO: Need to implement
}

- (BOOL)presentError:(NSError *)error
{
    // TODO: Need to implement
}

- (NSError *)willPresentError:(NSError *)error
{
    // TODO: Need to implement
}

@end
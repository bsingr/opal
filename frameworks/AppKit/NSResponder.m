#import <Foundation/NSObject.m>

@implementation NSResponder : NSObject <NSCoding>
{
    id _nextResponder;
}

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
        NSEvent *event = [eventArray objectAtIndex:i];
        NSString *eventString = [event charactersIgnoringModifiers];
        
        switch ([event keyCode]) {
            case NSBackspaceKey:
                if ([self respondsToSelector:@selector(deleteBackward:)])
                    [self deleteBackward:event];
                break;
            case NSTabKey:
                if ([self respondsToSelector:@selector(insertTab:)])
                    [self insertTab:event];
                break;
            default:
            NSLog(@"Does not respond to - interptretKeyEvents:");
        }
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

@interface NSReponder (NSStandardKeyBindingMethods)

// NSResponder does not implement any of these, and should be implmented by custom classes
// Defining methods as they would appear in an interface means they are not implemented 
// (used to indicate they can/should be in custom views)

- (void)insertText:(id)insertString;

- (void)doCommandBySelector:(SEL)aSelector;

- (void)moveForward:(id)sender;
- (void)moveRight:(id)sender;
- (void)moveBackward:(id)sender;
- (void)moveLeft:(id)sender;
- (void)moveUp:(id)sender;
- (void)moveDown:(id)sender;
- (void)moveWordForward:(id)sender;
- (void)moveWordBackward:(id)sender;
- (void)moveToBeginningOfLine:(id)sender;
- (void)moveToEndOfLine:(id)sender;
- (void)moveToBeginningOfParagraph:(id)sender;
- (void)moveToEndOfParagraph:(id)sender;
- (void)moveToEndOfDocument:(id)sender;
- (void)moveToBeginningOfDocument:(id)sender;
- (void)pageDown:(id)sender;
- (void)pageUp:(id)sender;
- (void)centerSelectionInVisibleArea:(id)sender;

- (void)moveBackwardAndModifySelection:(id)sender;
- (void)moveForwardAndModifySelection:(id)sender;
- (void)moveWordForwardAndModifySelection:(id)sender;
- (void)moveWordBackwardAndModifySelection:(id)sender;
- (void)moveUpAndModifySelection:(id)sender;
- (void)moveDownAndModifySelection:(id)sender;

- (void)moveWordRight:(id)sender;
- (void)moveWordLeft:(id)sender;
- (void)moveRightAndModifySelection:(id)sender;
- (void)moveLeftAndModifySelection:(id)sender;
- (void)moveWordRightAndModifySelection:(id)sender;
- (void)moveWordLeftAndModifySelection:(id)sender;

- (void)scrollPageUp:(id)sender;
- (void)scrollPageDown:(id)sender;
- (void)scrollLineUp:(id)sender;
- (void)scrollLineDown:(id)sender;

- (void)transpose:(id)sender;
- (void)transposeWords:(id)sender;

- (void)selectAll:(id)sender;
- (void)selectParagraph:(id)sender;
- (void)selectLine:(id)sender;
- (void)selectWord:(id)sender;

- (void)indent:(id)sender;
- (void)insertTab:(id)sender;
- (void)insertBacktab:(id)sender;
- (void)insertNewline:(id)sender;
- (void)insertParagraphSeparator:(id)sender;
- (void)insertNewlineIgnoringFieldEditor:(id)sender;
- (void)insertTabIgnoringFieldEditor:(id)sender;
- (void)insertLineBreak:(id)sender;
- (void)insertContainerBreak:(id)sender;

- (void)changeCaseOfLetter:(id)sender;
- (void)uppercaseWord:(id)sender;
- (void)lowercaseWord:(id)sender;
- (void)capitalizeWord:(id)sender;

- (void)deleteForward:(id)sender;
- (void)deleteBackward:(id)sender;
- (void)deleteBackwardByDecomposingPreviousCharacter:(id)sender;
- (void)deleteWordForward:(id)sender;
- (void)deleteWordBackward:(id)sender;
- (void)deleteToBeginningOfLine:(id)sender;
- (void)deleteToEndOfLine:(id)sender;
- (void)deleteToBeginningOfParagraph:(id)sender;
- (void)deleteToEndOfParagraph:(id)sender;

- (void)yank:(id)sender;

- (void)complete:(id)sender;

- (void)setMark:(id)sender;
- (void)deleteToMark:(id)sender;
- (void)selectToMark:(id)sender;
- (void)swapWithMark:(id)sender;

- (void)cancelOperation:(id)sender;

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
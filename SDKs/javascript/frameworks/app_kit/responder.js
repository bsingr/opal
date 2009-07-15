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

include('foundation/object');
include('foundation/array');
include('app_kit/event');

/**
    @class NSResponder
    @extend NSObject
*/
var NSResponder = NSObject.extend({

    /**
        @type NSResponder
    */
    _nextResponder: null,
    
    /**
        @type NSMenu
    */
    _menu: null,
    
    /**
        @param {NSCoder} aCoder
        @returns NSResponder
    */
    initWithCoder: function(aCoder) {
        this._nextResponder = aCoder.decodeObjectForKey("NSNextResponder");
        return this;
    },
    
    /**
        @returns NSResponder
    */
    nextResponder: function() {
        return this._nextResponder;
    },
    
    /**
        @param {NSResponder} aResponder
    */
    setNextResponder: function(aResponder) {
        this._nextResponder = aResponder;
    },
    
    /**
        @param {Selector} anAction
        @param {NSObject} anObject
        @returns Boolean
    */
    tryToPerform: function(anAction, anObject) {
        
        if (this.respondsTo(anAction)) {
            this.perform(anAction, anObject);
            return true;
        }
        
        return this._nextResponder.tryToPerform(anAction, anObject);
    },
    
    /**
        @param {NSEvent} theEvent
        @returns Boolean
    */
    performKeyEquivalent: function(theEvent) {
        return false;
    },
    
    /**
        @param {NSEvent} theEvent
    */
    mouseDown: function(theEvent) {
        this._nextResponder.mouseDown(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    rightMouseDown: function(theEvent) {
        this._nextResponder.rightMouseDown(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    otherMouseDown: function(theEvent) {
        this._nextResponder.otherMouseDown(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    mouseUp: function(theEvent) {
        this._nextResponder.mouseUp(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    rightMouseUp: function(theEvent) {
        this._nextResponder.rightMouseUp(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    otherMouseUp: function(theEvent) {
        this._nextResponder.otherMouseUp(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    mouseMoved: function(theEvent) {
        this._nextResponder.mouseMoved(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    mouseDragged: function(theEvent) {
        this._nextResponder.mouseDragged(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    scrollWheel: function(theEvent) {
        this._nextResponder.scrollWheel(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    rightMouseDragged: function(theEvent) {
        this._nextResponder.rightMouseDragged(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    otherMouseDragged: function(theEvent) {
        this._nextResponder.otherMouseDragged(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    mouseEntered: function(theEvent) {
        this._nextResponder.mouseEntered(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    mouseExited: function(theEvent) {
        this._nextResponder.mouseExited(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    keyDown: function(theEvent) {
        // console.log('seidng event to');
        // console.log(this._nextResponder);
        this._nextResponder.keyDown(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    keyUp: function(theEvent) {
        this._nextResponder.keyUp(theEvent);
    },
    
    /**
        @param {NSEvent} theEvent
    */
    flagsChanged: function(theEvent) {
        
    },
    
    /**
        @param {NSEvent} theEvent
    */
    cursorUpdate: function(theEvent) {
        
    },
    
    /**
        @param {Selector} eventSelector
    */
    noResponderFor: function(eventSelector) {
        
    },
    
    /**
        @returns Boolean
    */
    acceptsFirstResponder: function() {
        return false;
    },
    
    /**
        @returns Boolean
    */
    becomeFirstResponder: function() {
        return true;
    },
    
    /**
        @returns Boolean
    */
    resignFirstResponder: function() {
        return true;
    },
    
    /**
        @param {NSArray} eventArray
    */
    interpretKeyEvents: function(eventArray) {
        for (var idx = 0; idx < eventArray.length; idx++) {
            var theEvent = eventArray[idx];
            
            switch (theEvent.keyCode()) {
                case NSUpArrowFunctionKey:
                    this.doCommandBySelector('moveUp');
                    break;
                case NSDownArrowFunctionKey:
                    this.doCommandBySelector('moveDown');
                    break;
                case NSLeftArrowFunctionKey:
                    this.doCommandBySelector('moveLeft');
                    break;
                case NSRightArrowFunctionKey:
                    this.doCommandBySelector('moveRight');
                    break;
                case NSDeleteForwardFunctionKey:
                    this.doCommandBySelector('deleteForward');
                    break;
                case NSDeleteBackwardFunctionKey:
                    this.doCommandBySelector('deleteBackward');
                    break;
                case NSReturnFunctionKey:
                    this.doCommandBySelector('insertLineBreak');
                    break;
                case NSEscapeFunctionKey:
                    this.doCommandBySelector('cancel');
                    break;
                case NSTabFunctionKey:
                    this.doCommandBySelector('insertTab');
                    break;
                case NSPageUpFunctionKey:
                    this.doCommandBySelector('pageUp');
                    break;
                case NSPageDownFunctionKey:
                    this.doCommandBySelector('pageDown');
                    break;
                default:
                    if (this.respondsTo('insertText'))
                        this.insertText(theEvent.characters());
                    break;
            }
        }
    },
    
    /**
        @param {NSMenu} menu
    */
    setMenu: function(menu) {
        this._menu = menu;
    },
    
    /**
        @returns NSMenu
    */
    menu: function() {
        return this._menu;
    },
    
    /**
        @param {NSOject} sender
    */
    showContextHelp: function(sender) {
        
    },
    
    /**
        @param {NSEvent} theEvent
    */
    helpRequested: function(theEvent) {
        
    },
    
    /**
        @param {Selector} aSelector
    */
    doCommandBySelector: function(aSelector) {
        if (this.respondsTo(aSelector))
            this.perform(aSelector, this);
        // else // we could just drop the event...
        //     this._nextResponder.doCommandBySelector(aSelector);
    },
});


/**
    @protocol NSStandardKeyBindingMethods
    @class NSResponder
    
    None of these are implemented, but if they are implemented by a subclass,
    then that responder will recieve the relevant key bindings.
*/
var NSStandardKeyBindingMethods = NSResponder.protocol({
    
    /**
        @param {NSString} insertString
    */
    insertText: function(insertString) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveForward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveRight: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveBackward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveLeft: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveUp: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveDown: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordForward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordBackward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToBeginningOfLine: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToEndOfLine: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToBeginningOfParagraph: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToEndOfParagraph: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToBeginningOfDocument: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToEndOfDocument: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    pageDown: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    pageUp: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    centerSelectionInVisibleArea: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveBackwardAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveForwardAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordForwardAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordBackwardAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveUpAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveDownAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToBeginningOfLineAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToEndOfLineAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToBeginningOfParagraphAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToEndOfParagraphAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToEndOfDocumentAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveToBeginningOfDocumentAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    pageDownAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    pageUpAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveParagraphForwardAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveParagraphBackwardAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordRight: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordLeft: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveRightAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveLeftAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordRightAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    moveWordLeftAndModifySelection: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    scrollPageUp: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    scrollPageDown: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    scrollLineUp: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    scrollLineDown: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    scrollToBeginningOfDocument: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    scrollToEndOfDocument: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    transpose: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    transposeWords: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    selectAll: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    selectParagraph: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    selectLine: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    selectWord: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    indent: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertTab: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertBacktab: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertNewline: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertParagraphSeparator: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertNewlineIgnoringFieldEditor: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertTabIgnoringFieldEditor: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertLineBreak: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertContainerBreak: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertSingleQuoteIgnoringSubstitution: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    insertDoubleQuoteIgnoringSubstitution: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    changeCaseOfLetter: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    uppercaseWord: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    lowercaseWord: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    capitalizeWord: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteForward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteBackward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteBackwardByDecomposingPreviousCharacter: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteWordForward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteWordBackward: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteToBeginningOfLine: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteToEndOfLine: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteToBeginningOfParagraph: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteToEndOfParagraph: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    yank: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    complete: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    setMark: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    deleteToMark: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    selectToMark: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    swapWithMark: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    cancelOperation: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    makeBaseWritingDirectionNatural: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    makeBaseWritingDirectionLeftToRight: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    makeBaseWritingDirectionRightToLeft: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    makeTextWritingDirectionNatural: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    makeTextWritingDirectionLeftToRight: function(sender) {
    },
    
    /**
        @param {NSObject} sender
    */
    makeTextWritingDirectionRightToLeft: function(sender) {
    } 
});


/**
    @mixin NSUndoSupport
    @class NSResponder
*/
NSResponder.mixin({
    
    /**
        @returns NSUndoManager
    */
    undoManager: function() {
        
    }
});


/**
    @mixin NSErrorPresentation
    @class NSResponder
*/
NSResponder.mixin({
    
    /**
        @param {NSError} error
        @param {NSWindow} window
        @param {NSObject} delegate
        @param {Selector} didPresentSelector
        @param {Object} contextInfo
    */
    presentErrorModalForWindowDelegateDidPresentSelectorContextInfo: function(error, window, delegate, didPresentSelector, contextInfo) {
        
    },
    
    /**
        @param {NSError} error
        @returns {Boolean}
    */
    presentError: function(error) {
        
    },
    
    /**
        @param {NSError} error
        @returns NSError
    */
    willPresentError: function(error) {
        
    }
});

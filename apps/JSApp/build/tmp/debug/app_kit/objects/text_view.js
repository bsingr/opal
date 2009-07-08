/* 
 * text_view.js
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

/**
    The interface for the text system. NSTextView relies on other classes to
    calculate and hold display information. In most cases:
    
    NSTextView      - presents view
        ^
    NSTextContainer - geometry of layout area
        ^
    NSLayoutManager - controller to keep models and views in sync
        ^
    NSTextStorage   - a model of the text data
    
    Other classes are involved, such as NSTypesetter. Users usually only have
    to deal with NSTextView, as this provides the recomended interface and 
    class views of the text system. Subclassing the other objects is heavly
    non recomended.
*/
var NSTextView = NSView.extend({

    _textStorage: null,
    _textContainer: null,
    _textContainerInset: null,
    _typingAttributes: null,

    _delegate: null,
    _isEditable: null,
    _isSelectable: null,
    _isRichText: null,
    _backgroundColor: null,
    _drawsBackground: null,
    _font: null,
    _textColor: null,
    _textAlignment: null,
   
    _insertionPointColor: null,
    _insertionPointRect: null,
    _insertionPointOn: null,
    _insertionPointTimer: null,
   
    _isFieldEditor: null,
    _maxSize: null,
    _isHorizontallyResizable: null,
    _isVerticallyResizable: null,
    _usesRuler: null,
    _rulerVisible: null,
    _allowsUndo: null,
   
    _selectedRange: null,
    _selectionAffinity: null,
    _selectionGranularity: null,
    _selectedTextAttributes: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSTVFlags");
        var sharedData = aCoder.decodeObjectForKey("NSSharedData");
        
        this._textContainer = aCoder.decodeObjectForKey("NSTextContainer");
        this._textStorage = this._textContainer.layoutManager().textStorage();
        this._textStorage.addLayoutManager(this._textContainer.layoutManager());
        
        this._typingAttributes = NSDictionary.create();
        this._delegate = aCoder.decodeObjectForKey("NSDelegate");
        
        this._isEditable = sharedData.isEditable();
        this._isSelectable = sharedData.isSelectable();
        this._isRichText = sharedData.isRichText();
        this._backgroundColor = sharedData.backgroundColor();
        this._drawsBackground = true;
        this._font = null;
        this._textColor = null;
        
        // this._textAlignment = sharedData.defaultParagraphStyle().alignment();
        this._insertionPointColor = sharedData.insertionColor();
        
        this._isFieldEditor = false;
        
        
        // this._textStorage.addAttribute(NSFontAttributeName, this._font, NSMakeRange(0, this._textStorage.length()));
        // this._textStorage.addAttribute(NSForegroundColorAttributeName, this._textColor, NSMakeRange(0, this._textStorage.length()));
        
        return this;
    },
    
    initWithFrame: function(frameRect) {
        this._super(frameRect);
        
        this._textStorage = NSTextStorage.create();
        this._textContainer = NSTextContainer.create('initWithContainerSize', frameRect.size);
        var theLayoutManager = NSLayoutManager.create();
        
        this._textStorage.addLayoutManager(theLayoutManager);
        theLayoutManager.addTextContainer(this._textContainer);
        
        this._textContainer.setTextView(this);
        
        this._textContainerInset = NSMakeSize(0, 0);
        
        this._isEditable = true;
        this._isSelectable = true;
        this._isRichText = true;
        
        this._backgroundColor = NSColor.whiteColor();
        this._drawsBackground = true;
        
        this._textColor = NSColor.textColor();
        this._font = NSFont.userFontOfSize(10);
        this._textAlignment = NSLeftTextAlignment;
        this._insertionPointColor = NSColor.blackColor();
        
        this._isFieldEditor = false;
        this._maxSize = this.bounds().size;
        this._isHorizontallyResizable = false;
        this._isVerticallyResizable = true;
        this._selectedRange = NSMakeRange(0, 0);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        console.log('mouse down in text view');
    },
    
    textContainer: function() {
        return this._textContainer;
    },
    
    setTextContainer: function(aContainer) {
        this._textContainer = aContainer;
    },
    
    layoutManager: function() {
        return this._layoutManager;
    },
    
    textStorage: function() {
        return this._textStorage;
    },
    
    typingAttributes: function() {
        return this._typingAttributes;
    },
    
    selectedTextAttributes: function() {
        return this._selectedTextAttributes;
    },
    
    selectionRangeForProposedRange: function(range, granularity) {
        return range;
    },
    
    setSelectedRange: function(range, affinity, stillSelecting) {
        
    },
    
    rangeForUserCompletion: function() {
        
    },
    
    completionsForPartialWordRange: function(range, indexOfSelectedItem) {
        
    },
    
    insertCompletion: function(string, forPartialWordRange, movement, isFinal) {
        
    },
    
    writablePasteboardTypes: function() {
        
    },
    
    writeSelectionToPasteboard: function(pasteboard, types) {
        
    },
    
    rangeForUserTextChange: function() {
        
    },
    
    rangeForUserCharacterAttributeChange: function() {
        
    },
    
    rangeForUserParagraphAttributeChange: function() {
        
    },
    
    shouldChangeTextInRange: function(range, replacementString) {
        
    },
    
    didChangeText: function() {
        
    },
    
    shouldDrawInsertionPoint: function() {
        if (!this._isEditable) 
            return false;
        
        return true;
    },
    
    drawInsertionPointInRect: function(aRect, color, turnedOn) {
        
    },
    
    undo: function(sender) {
        
    },
    
    redo: function(sender) {
        
    },
    
    cut: function(sender) {
        
    },
    
    copy: function(sender) {
        
    },
    
    paste: function(sender) {
        
    },
    
    selectAll: function(sender) {
        
    },
    
    insertTab: function(sender) {
        
    },
    
    insertTabIgnoringFieldEditor: function(sender) {
        
    },
    
    performClick: function(sender) {
        
    },
    
    insertNewLine: function(sender) {
        
    },
    
    insertNewLineIgnoringFieldEditor: function(sender) {
        
    },
    
    cancel: function(sender) {
        
    },
    
    moveForward: function(sender) {
        
    },
    
    moveForwardAndModifySelection: function(sender) {
        
    },
    
    moveWordForward: function(sender) {
        
    },
    
    moveWordForwardAndModifySelection: function(sender) {
        
    },
    
    moveDown: function(sender) {
        
    },
    
    moveDownAndModifySelection: function(sender) {
        
    },
    
    moveUp: function(sender) {
        
    },
    
    moveUpAndModifySelection: function(sender) {
        
    },
    
    moveLeft: function(sender) {
        
    },
    
    moveRight: function(sender) {
        
    },
    
    moveBackward: function(sender) {
        
    },
    
    moveBackwardAndModifySelection: function(sender) {
        
    },
    
    moveWordBackward: function(sender) {
        
    },
    
    moveWordBackwardAndModifySelection: function(sender) {
        
    },
    
    moveToBeginningOfDocument: function(sender) {
        
    },
    
    moveToBeginningOfDocumentAndModifySelection: function(sender) {
        
    },
    
    moveToEndOfDocument: function(sender) {
        
    },
    
    moveToEndOfDocumentAndModifySelection: function(sender) {
        
    },
    
    scrollToBeginningOfDocument: function(sender) {
        
    },
    
    scrollToEndOfDocument: function(sender) {
        
    },
    
    deleteForward: function(sender) {
        
    },
    
    deleteBackward: function(sender) {
        
    },
    
    deleteToBeginningOfLine: function(sender) {
        
    },
    
    deleteToEndOfLine: function(sender) {
        
    },
    
    deleteToBeginningOfParagraph: function(sender) {
        
    },
    
    deleteToEndOfParagraph: function(sender) {
        
    },
    
    deleteWordBackward: function(sender) {
        
    },
    
    deleteWordForward: function(sender) {
        
    },
    
    clear: function(sender) {
        
    },
    
    moveToBeginningOfLine: function(sender) {
        
    },
    
    moveToBeginningOfLineAndModifySelection: function(sender) {
        
    },
    
    moveToEndOfLine: function(sender) {
        
    },
    
    moveToEndOfLineAndModifySelection: function(sender) {
        
    },
    
    moveToBeginningOfParagraph: function(sender) {
        
    },
    
    moveParagraphBackwardAndModifySelection: function(sender) {
        
    },
    
    moveToEndOfParagraph: function(sender) {
        
    },
    
    moveParagraphForwardAndModifySelection: function(sender) {
        
    },
    
    scrollPageUp: function(sender) {
        
    },
    
    pageUp: function(sender) {
        
    },
    
    pageUpAndModifySelection: function(sender) {
        
    },
    
    scrollPageDown: function(sender) {
        
    },
    
    pageDown: function(sender) {
        
    },
    
    pageDownAndModifySelection: function(sender) {
        
    },
    
    transpose: function(sender) {
        
    },
    
    yank: function(sender) {
        
    },
    
    transposeWords: function(sender) {
        
    },
    
    complete: function(sender) {
        
    },
    
    endUserCompletion: function(sender) {
        
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    setDelegate: function(anObject) {
        
    },
    
    string: function() {
        return this._textStorage.string();
    },
    
    setString: function(aString) {
        // console.log('setting string to ' + aString);
        this.replaceCharactersInRange(NSMakeRange(0, this._textStorage.length()), aString);
        // console.log(this._textStorage);
    },
    
    replaceCharactersInRange: function(range, withString) {
        this._textStorage.replaceCharactersInRange(range, withString);
        this._textStorage.setAttributes(null, NSMakeRange(range.location, withString.length));
        this.setSelectedRange(NSMakeRange(range.location + withString.length, 0));
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    setEditable: function(flag) {
        this._isEditable = flag;
    },
    
    isSelectable: function() {
        return this._isSelectable;
    },
    
    setSelectable: function(flag) {
        this._isSelectable = flag;
    },
    
    isRichText: function() {
        return this._isRichText;
    },
    
    setRichText: function(flag) {
        this._isRichText = flag;
    },
    
    isFieldEditor: function() {
        return this._isFieldEditor;
    },
    
    setFieldEditor: function(flag) {
        this._isFieldEditor = flag;
    },
    
    font: function() {
        return this._font;
    },
    
    setFont: function(font) {
        this._font = font;
    },
    
    alignment: function() {
        return this._alignment;
    },
    
    setAlignment: function(alignment) {
        this._alignment = alignment;
    },
    
    textColor: function() {
        return this._textColor;
    },
    
    setTextColor: function(aColor) {
        this._textColor = aColor;
    },
    
    drawsBackground: function() {
        return this._drawsBackground;
    },
    
    setDrawsBackground: function(flag) {
        this._drawsBackground = flag;
    },
    
    setBackgroundColor: function(aColor) {
        this._backgroundColor = aColor;
    },
    
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    isHorizontallyResizable: function() {
        return this._isHorizontallyResizable;
    },
    
    setHorizontallyResizable: function(flag) {
        this._isHorizontallyResizable = flag;
    },
    
    isVerticallyResizable: function() {
        return this._isVerticallyResizable;
    },
    
    setVerticallyResizable: function(flag) {
        this_isVerticallyResizable = flag;
    },
    
    maxSize: function() {
        return this._maxSize;
    },
    
    setMaxSize: function(aSize) {
        this._maxSize = aSize;
    },
    
    minSize: function() {
        return this._minSize;
    },
    
    setMinSize: function(aSize) {
        this._minSize = aSize;
    },
    
    selectedRange: function() {
        return this._selectedRange;
    },
    
    setSelectedRange: function(range) {
        // this.setSelectedRange(range, null, false);
    },
    
    sizeToFit: function() {
        
    },
    
    drawRect: function(theRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this._backgroundColor) {
            CGContextSetFillColorWithColor(c, this._backgroundColor);
            CGContextFillRect(c, theRect);
        }
    }
});

/* 
 * control.js
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

include('foundation/foundation');
include('app_kit/view');
include('app_kit/cell');
include('app_kit/text');
include('app_kit/application');

var NSControlTextDidBeginEditingNotification    = "NSControlTextDidBeginEditingNotification";
var NSControlTextDidEndEditingNotification      = "NSControlTextDidEndEditingNotification";
var NSControlTextDidChangeNotification          = "NSControlTextDidChangeNotification";

var NSControl = NSView.extend({
   
    _tag: null,
    
    _cell: null,
    
    _currentEditor: null,
    
    _isEnabled: null,
    
    _value: null,
    
    initWithFrame: function(frameRect) {
        
        this._super(frameRect);
        this.setCell(this.cellClass().create());
        return this;
    },
    
    initWithCoder: function(aCoder) {
        
        this._super(aCoder);
        this._cell = aCoder.decodeObjectForKey("NSCell");
        this.setFrame(this._frame);
        return this;
    },
    
    sizeToFit: function() {
        
    },
    
    calcSize: function() {
        
    },
    
    cell: function() {
        
        return this._cell;
    },
    
    setCell: function(aCell) {
        
        this._cell = aCell;
        this._cell.setControlView(this);
        this.setNeedsDisplay(true);
    },
    
    selectedCell: function() {
        
    },
    
    target: function() {
        
        return this._cell.target();
    },
    
    setTarget: function(anObject) {
        
        this._cell.setTarget(anObject);
    },
    
    action: function() {
        
        return this._cell.action();
    },
    
    setAction: function(anAction) {
        this._cell.setAction(anAction);
    },
    
    tag: function() {
        
    },
    
    setTag: function(anInt) {
        
    },
    
    selectedTag: function() {
        
    },
    
    setIgnoresMultiClick: function(flag) {
        
    },
    
    ignoresMultiClick: function() {
        
    },
    
    sendActionOn: function(mask) {
        
    },
    
    isContinuous: function() {
        
    },
    
    setContinuous: function(flag) {
        
    },
    
    isEnabled: function() {
        
        return this._cell.isEnabled();
    },
    
    setEnabled: function(flag) {
        
        this._cell.setEnabled(flag);
    },
    
    alignment: function() {
        
        return this._cell.alignment();
    },
    
    setAlignment: function(mode) {
        
        this._cell.setAlignment(mode);
        this.setNeedsDisplay(true);
    },
    
    font: function() {
        
    },
    
    setFont: function(fontObj) {
        
    },
    
    setFormatter: function(newFormatter) {
        
    },
    
    formatter: function() {
        
    },
    
    setObjectValue: function(obj) {
        
        this._cell.setObjectValue(obj);
        this.setNeedsDisplay(true);
    },
    
    setStringValue: function(aString) {
        
        this._cell.setStringValue(aString);
        this.setNeedsDisplay(true);
    },
    
    setIntValue: function(anInt) {
        
        this._cell.setIntValue(anInt);
        this.setNeedsDisplay(true);
    },
    
    setFloatValue: function(aFloat) {
        
        this._cell.setFloatValue(aFloat);
        this.setNeedsDisplay(true);
    },
    
    setDoubleValue: function(aDouble) {
        
        this._cell.setDoubleValue(aDouble);
        this.setNeedsDisplay(true);
    },
    
    objectValue: function() {
        
        return this._cell.objectValue();
    },
    
    stringValue: function() {
        
        return this._cell.stringValue();
    },
    
    intValue: function() {
        
        return this._cell.intValue();
    },
    
    floatValue: function() {
        
        return this._cell.floatValue();
    },
    
    doubleValue: function() {
        
        return this._cell.doubleValue();
    },
    
    updateCell: function(aCell) {
        
    },
    
    updateCellInside: function(aCell) {
        
    },
    
    drawCellInside: function(aCell) {
        
    },
    
    drawCell: function(aCell) {
        
    },
    
    selectCell: function(aCell) {
        
    },
    
    /**
        Core graphics (canvas & vml) based rendering
    */
    drawRect: function(rect) {
        if (this._cell)
            this._cell.drawWithFrame(this.bounds(), this);
    },
    
    /**
        DOM based rendering.
    */
    renderRect: function(rect) {
        if (this._cell)
            this._cell.renderWithFrame(this.bounds(), this);
    },
    
    sendActionTo: function(theAction, theTarget) {
        
        if (theAction && theTarget) {
            NSApplication.sharedApplication().sendActionTo(theAction, theTarget, this);
            return true;
        }
        
        return false;
    },
    
    takeIntValueFrom: function(sender) {
        
    },
    
    takeFloatValueFrom: function(sender) {
        
    },
    
    takeDoubleValueFrom: function(sender) {
        this._cell.takeDoubleValueFrom(sender);
        this.setNeedsDisplay(true);
    },
    
    takeStringValueFrom: function(sender) {
        
    },

    takeObjectValueFrom: function(sender) {
        
    },
    
    currentEditor: function() {
        
    },
    
    abortEditing: function() {
        
        if (this._currentEditor) {
            this.window().endEditingFor(this);
            this._currentEditor = null;
            return true;
        }
        
        return false;
    },
    
    validateEditing: function() {
        
    },
    
    mouseDown: function(theEvent) {
        
        this._cell.trackMouseInView(theEvent, this.bounds(), this, true);
    },
    
    baseWritingDirection: function() {
        
    },
    
    setBaseWritingDirection: function(writingDirection) {
        
    },
    
    integerValue: function() {
        
    },
    
    setIntegerValue: function(anInteger) {
        
    },
    
    takeIntegerValueFrom: function(sender) {
        
    }
});
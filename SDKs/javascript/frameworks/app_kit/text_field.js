/* 
 * text_field.js
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

include('app_kit/control');

var NSTextField = NSControl.extend({
    
    /**
        @type NSRenderContext
    */
    _renderContext: null,
    
    setupGraphicsContextDisplay: function() {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('div');
        
        
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        this._DOMContainer.style.overflowX = "hidden";
        this._DOMContainer.style.overflowY = "hidden";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        this._DOMGraphicsContext.style.overflowX = "hidden";
        this._DOMGraphicsContext.style.overflowY = "hidden";
        
        this._renderContext = NSRenderContext.renderContextWithElement(this._DOMGraphicsContext);
    },
    
    lockFocus: function() {
        
    },
    
    drawRect: function() {
        if (this._cell) {
            this._cell.renderWithFrame(this.bounds(), this, this._renderContext.firstTime(), this._renderContext);
            this._renderContext.setFirstTime(false);
        }
            
    },
    
    unlockFocus: function() {
        
    },
    
    mouseDown: function(theEvent) {
        if (!this._cell.isEnabled())
            return;
        
        if (this._cell.isSelectable() || this._cell.isEditable()) {
            if (!this._currentEditor) {
                this._currentEditor = this.window().fieldEditor(true, this);
                this._currentEditor = this._cell.setUpFieldEditorAttributes(this._currentEditor);
            }
            
            this._cell.setHighlighted(true);
            this._cell.editWithFrame(this._bounds, this, this._currentEditor, this, theEvent);
        }
    },
    
    /*
        Instantiate a binding to the object. Placeholders and other information
        can be specified in the options dictionary.
        
        @param binding - NSString
        @param toObject - NSObject
        @param withKeyPath - NSString
        @param options - NSDictionary
    */
    bind: function(binding, toObject, withKeyPath, options) {
        // value binding - NSValueBinding
        if (binding == "value") {
            toObject.addObserverForKeyPath(this, withKeyPath, 0, NSValueBinding);
            
            var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
                [toObject, withKeyPath, options],
                [NSObservedObjectKey, NSObservedKeyPathKey, NSOptionsKey]);
            
            this._kvb_info.setObjectForKey(bindingInfo, NSValueBinding);
        }
    },
    
    /*
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        if (context == NSValueBinding) {
            var newValue = ofObject.valueForKeyPath(keyPath);
            this.setObjectValue(newValue);
        }
    }
});

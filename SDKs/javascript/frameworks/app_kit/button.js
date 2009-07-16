/* 
 * button.js
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
include('app_kit/button_cell');

var NSButton = NSControl.extend({
    
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
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        return this;
    },
    
    cellClass: function() {
        return NSButtonCell;
    },
    
    title: function() {
        
    },
    
    setTitle: function(aString) {
        
    }
});

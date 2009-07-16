/* 
 * render_context.js
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

/**
    @class NSRenderContext
    @extends NSObject
*/
var NSRenderContext = NSObject.extend({
    
    /**
        @type Boolean
    */
    _firstTime: null,
    
    /**
        @type Element
    */
    _element: null,
    
    /**
        @returns Element
    */
    element: function() {
        return this._element;
    },
    
    initWithElement: function(element) {
        this._element = element;
        this._firstTime = true;
        return this;
    },
    
    firstTime: function() {
        return this._firstTime;
    },
    
    setFirstTime: function(flag) {
        this._firstTime = flag;
    },
    
    /**
        @param {Element} anElement
    */
    setElement: function(anElement) {
        this._element = anElement;
    },
    
    /**
        Uses the path, after splitting it, to get the dom element. Path should
        be a dot-seperated string, where each path element can be a class-name
        of the selector. For example $('inner.title') might be used to return
        the title span in:
        
        {{{
            <div class='the-view'>
                <div class="inner">
                    <span class = "title">
                        hey
                    </span>
                </div>
            </div>
        }}}
        
        The first retireved class will be used. i.e. if the dom has two elements
        of the relevant class, then the first is always returned.
        
        @param {NSString} path
        @returns NSRenderContext
    */
    $: function(path) {
        return NSRenderContext.renderContextWithElement(this._element.getElementsByClassName(path)[0]);
    },
    
    set: function(value, key) {
        this._element.style[key] = value;
    },
    
    /**
        Pushes a new 'element' with class 'className' into the _element's 
        context.
        
        @param {NSString} element
        @param {NSString} className
        @param {NSString} innerHTML - entirely optional
    */
    push: function(element, className, innerHTML) {
        var theElement = document.createElement(element);
        theElement.className = className;
        this._element.appendChild(theElement);
    },
    
    setClass: function(className) {
        this._element.className = className;
    },
    
    addClassForElement: function(className, element) {
        var classes = element.className.split(' '), index = classes.indexOf(className);
        if (index > -1) return; // already has class
        
        element.className = element.className + " " + className;
    },
    
    removeClassForElement: function(className, element) {
        var classes = element.className.split(' '), index = classes.indexOf(className);
        if (index > -1) {
            classes.splice(index, 1);
            element.className = classes.join(' ');
        }
    },
    
    addClass: function(className) {
        this.addClassForElement(className, this._element);
    },
    
    removeClass: function(className) {
        this.removeClassForElement(className, this._element);
    },
    
    addClassForChildAtIndex: function(className, index) {
        this.addClassForElement(className, this._element.childNodes[index]);
    },
    
    removeClassForChildAtIndex: function(className, index) {
        this.removeClassForElement(className, this._element.childNodes[index]);
    },
    
    setFrame: function(frameRect) {
        this.set(frameRect.origin.x + 'px', 'left');
        this.set(frameRect.origin.y + 'px', 'top');
        this.set(frameRect.size.width + 'px', 'width');
        this.set(frameRect.size.height + 'px', 'height');
    },
    
    renderAttributedString: function(attributedString) {
        this._element.innerHTML = attributedString._string;
        
        // the font
        var theFont = attributedString._attributes.objectForKey(NSFontAttributeName);
        this.set(theFont.renderingRepresentation(), 'font');
        
        // text color
		var theColor = attributedString._attributes.objectForKey(NSForegroundColorAttributeName);
		this.set(theColor.rgbString(), 'color');
		
		if (attributedString._attributes.containsKey(NSParagraphStyleAttributeName)) {
            var paragraphStyle = attributedString._attributes.objectForKey(NSParagraphStyleAttributeName);
            switch (paragraphStyle.alignment()) {
                case NSLeftTextAlignment:
                    this.set('left', 'textAlign');
                    break;
                case NSRightTextAlignment:
                    this.set('right', 'textAlign');
                    break;
                case NSCenterTextAlignment:
                    // position text in middle...
                    this.set('center', 'textAlign');
                    break;
                case NSJustifiedTextAlignment:
                    break;
            }
            
            // console.log('line break mode: ' + paragraphStyle.lineBreakMode());
        }
    }
});

NSRenderContext.renderContextWithElement = function(element) {
    return this.create('initWithElement', element);
};
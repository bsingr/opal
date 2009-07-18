/* 
 * font.js
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

include('foundation/string');
include('app_kit/cell');

var NSFont = NSObject.extend({
    
    _name: null,
    
    _size: null,
    
    initWithCoder: function(aCoder) {
        var name = "Arial";
        var size = aCoder.decodeIntForKey("NSSize");
        return NSFont.fontWithNameAndSize(name, size);
    },
    
    fontName: function() {
        return this._name;
    },
    
    fontSize: function() {
        return this._size;
    },
    
    renderingRepresentation: function() {
        return (this._isBold ? "bold " : "") + Math.round(this._size) + "px '" + this._name + "'"; 
    }
});

VN.extend(NSFont, {
    
    fontWithNameAndSize: function(fontName, fontSize) {
        var font = NSFont.create();
        font._name = fontName;
        font._size = fontSize;
        return font;
    },
    
    fontWithFontDescriptorAndSize: function(fontDescriptor, fontSize) {
        
    },
    
    userFontOfSize: function(fontSize) {
        
    },
    
    setUserFont: function(aFont) {
        
    },
    
    systemFontOfSize: function(fontSize) {
        
    },
    
    boldSystemFontOfSize: function(fontSize) {
        
    },
    
    labelFontOfSize: function(fontSize) {
        
    },
    
    titleBarFontOfSize: function(fontSize) {
        
    },
    
    menuFontOfSize: function(fontSize) {
        var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
        theFont._isBold = true;
        return theFont;
    },
    
    menuBarFontOfSize: function(fontSize) {
        var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
        theFont._isBold = true;
        return theFont;
    },
    
    applicationTitleFontOfSize: function(fontSize) {
        var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
        theFont._isBold = true;
        return theFont;
    },
    
    messageFontOfSize: function(fontSize) {
        
    },
    
    paletteFontOfSize: function(fontSize) {
        
    },
    
    toolTipsFontOfSize: function(fontSize) {
        
    },
    
    controlContentFontOfSize: function(fontSize) {
        var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
        return theFont;
    },
    
    systemFontSize: function() {
        
    },
    
    smallSystemFontSize: function() {
        
    },
    
    labelFontSize: function() {
        
    },
    
    systemFontSizeForControlSize: function(controlSize) {
        
    }
});

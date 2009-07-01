/* 
 * text_view_shared_data.js
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

var NSTextViewSharedData = NSObject.extend({

    _backgroundColor: null,
    _defaultParagraphStyle: null,
    _flags: null,
    _insertionColor: null,
    _linkAttributes: null,
    _markedAttributes: null,
    _selectedAttributes: null,
    
    _isEditable: null,
    _isSelectable: null,
    _isRichText: null,
    
    initWithCoder: function(aCoder) {
        var flags = aCoder.decodeIntForKey("NSFlags");
        
        this._isEditable = (flags & 0x00000002) ? true : false;
        this._isSelectable = (flags & 0x00000001) ? true : false;
        this._isRichText = (flags & 0x00000004) ? true : false;
        
        this._backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
        this._defaultParagraphStyle = aCoder.decodeObjectForKey("NSDefaultParagraphStyle");
        
        this._insertionColor = aCoder.decodeObjectForKey("NSInsertionColor");
        // this._linkAttributes = aCoder.decodeObjectForKey("NSLinkAttributes");
        this._markedAttributes = aCoder.decodeObjectForKey("NSMarkedAttributes");
        // this._selectedAttributed = aCoder.decodeObjectForKey("NSSelectedAttributes");
        
        return this;
    },
    
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    insertionColor: function() {
        return this._insertionColor;
    },
    
    defaultParagraphStyle: function() {
        return this._defaultParagraphStyle;
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    isSelectable: function() {
        return this._isSelectable;
    },
    
    isRichText: function() {
        return this._isRichText;
    }
});

/* 
 * cell.js
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
include('app_kit/text');

/**
    @class NSCell
    @extends NSObject
*/
var NSCell = NSObject.extend({
    
    initWithCoder: function(aCoder) {
        this._value = aCoder.decodeObjectForKey("NSContents");
        var flags = aCoder.decodeIntForKey("NSCellFlags");
        var flags2 = aCoder.decodeIntForKey("NSCellFlags2");
        this._state = (flags & 0x80000000) ? VN.ON_STATE : VN.OFF_STATE;
        this._isHighlighted = (flags & 0x40000000) ? true : false;
        this._isEnabled = (flags & 0x20000000) ? false : true;

        this._isEditable = (flags & 0x10000000) ? true : false;
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._isBezeled = (flags & 0x00400000) ? true : false;
        this._isSelectable = (flags & 0x00200000) ? true : false;
        this._isScrollable = (flags & 0x00100000) ? true : false;
        this._alignment = (flags2 & 0x1c000000) >> 26;
        this._controlSize = (flags2 & 0xE0000) >> 17;
        this._isContinuous = (flags & 0x00080100) ? true : false;
        
        this._lineBreakMode = (flags & 0x00007000) >> 12;
        this._wraps = (flags & 0x40) ? false : true;
        this._font = aCoder.decodeObjectForKey("NSSupport");
        return this;
    }
});     

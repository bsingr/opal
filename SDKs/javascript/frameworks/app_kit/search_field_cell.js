/* 
 * search_field_cell.js
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

include('app_kit/text_field_cell');

var NSSearchFieldCell = VN.SearchFieldCell = VN.TextFieldCell.extend({
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this.searchButtonCell = aCoder.decodeObjectForKey('NSSearchButtonCell');
    this.cancelButtonCell = aCoder.decodeObjectForKey('NSCancelButtonCell');
    return this;
  },
  
  titleRectForBounds: function(theRect) {
    if (this.isEditable) {
      return NSMakeRect(18, 3, theRect.size.width - 36, theRect.size.height - 5);
    }
    
    return theRect;
  },
  
  /**
    @type VN.ButtonCell
  */
  searchButtonCell: null,
  
  /**
    @type VN.ButtonCell
  */
  cancelButtonCell: null,
  
  /**
    @param {VN.Rect} rect
    @returns VN.Rect
  */
  searchTextRectForBounds: function(rect) {
    return rect;
  },
  
  /**
    @param {VN.Rect} rect
    @returns VN.Rect
  */
  searchButtonRectForBounds: function(rect) {
    return rect;
  },
  
  /**
    @param {VN.Rect} rect
    @returns VN.Rect
  */
  cancelButtonRectForBounds: function(rect) {
    return rect;
  }
});

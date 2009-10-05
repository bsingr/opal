/* 
 * geometry.js
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

VN.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

VN.Size = function(w, h) {
  this.width = w;
  this.height = h;
};

VN.Rect = function(x, y, w, h) {
  this.origin = new VN.Point(x, y);
  this.size = new VN.Size(w, h);
};

Object.extend(VN.Rect.prototype, {
  
  minX: function() {
    return this.origin.x;
  },
  
  midX: function() {
    return this.origin.x + (this.size.width / 2.0) ;
  },
  
  maxX: function() {
    return this.origin.x + this.size.width;
  },
  
  toString: function() {
    return '{%@, %@}'.format(this.origin, this.size);
  },
  
  toArray: function() {
    return [this.origin.x, this.origin.y, this.size.width, this.size.height];
  },
  
  containsPoint: function(point) {
    
  }  
});

Object.extend(VN.Point.prototype, {

  equalTo: function(point) {
    return (this.x == point.x) && (this.y == point.y);
  }
});

Object.extend(VN.Size.prototype, {

  equalTo: function(size) {
    return (this.width == size.width) && (this.height == size.height);
  }
});

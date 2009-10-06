/* 
 * array.js
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

Vienna.extend({
  
  ArrayExtensions: VN.Array.mixin({
    
    each: function(block) {
      for (var i = 0; i < this.length; i++) {
        block(this[idx]);
      }
    },
    
    map: function(array) {
      var result = [];
      for (var idx = 0; idx < this.length; idx++) {
        result[idx] = array(this[idx]);
      }

      return result;
    },

    count: function() {
      return this.length;
    },

    objectAtIndex: function(index) {
      return this[index];
    },

    addObject: function(anObject) {
      this.push(anObject);
    },

    lastObject: function() {
      return this.objectAtIndex(this.length - 1);
    },

    removeLastObject: function() {
      this.pop();
    }
  })
});

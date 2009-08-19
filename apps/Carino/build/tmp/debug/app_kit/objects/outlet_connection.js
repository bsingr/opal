/* 
 * outlet_connection.js
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


var IBOutletConnection = NSObject.extend({

  _label: null,
  _source: null,
  _destination: null,

  initWithCoder: function(aCoder) {
    this._label = aCoder.decodeObjectForKey("label")
    this._source = aCoder.decodeObjectForKey("source");
    this._destination = aCoder.decodeObjectForKey("destination");
    return this;
  },

  /**
    Instantiate the connection. The source is the object with the outlet, and
    the destination is the target object. The label is the KVC compliant key
    name to set, so we use KVC to set the outlet correctly.
  */
  awakeAfterUsingCoder: function(aCoder) {
    this._source.setValueForKey(this._destination, this._label);
    return this;
  }
});

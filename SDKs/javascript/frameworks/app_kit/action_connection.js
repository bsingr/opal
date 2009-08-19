/* 
 * action_connection.js
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
 
include('foundation/object');

 /**
   The source is the receiver of the action. The destination sends the 
   action 'label' to the source when triggered.
 */
var IBActionConnection = NSObject.extend({
  
  _label: null,
  _source: null,
  _destination: null,
  
  initWithCoder: function(aCoder) {
    // replace @selector style name with js compatible identifier.
    this._label = aCoder.decodeObjectForKey("label").replace(/:/, "");
    this._source = aCoder.decodeObjectForKey("source");
    this._destination = aCoder.decodeObjectForKey("destination");
    return this;
  },
  
  awakeAfterUsingCoder: function(aCoder) {
    this._destination.setAction(this._label);
    this._destination.setTarget(this._source);
    return this;
  }
});

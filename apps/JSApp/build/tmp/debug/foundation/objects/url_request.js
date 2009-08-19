/* 
 * url_request.js
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


/**
  @class VN.URLRequest
  @extends VN.Object
*/
VN.URLRequest = VN.Object.extend({
  
  /**
    @param {VN.URL} URL
    @returns {VN.URLRequest}
  */
  initWithURL: function(URL) {
    this.URL = URL;
    return this;
  },
  
  /**
    @type VN.URL
  */
  URL: null,
  
  /**
    @type {VN.String}
  */
  HTTPMethod: 'GET',
  
  /**
    @type {VN.Dictionary}
  */
  allHTTPHeaderFields: null,
  
  /**
    @param {VN.String} field
    @returns {VN.String}
  */
  valueForHTTPHeaderField: function(field) {
    return this.allHTTPHeaderFields.valueForKey(field);
  },
  
  /**
    @param {VN.String} value
    @param {VN.String} field
  */
  setValueForHTTPHeaderField: function(value, field) {
    this.allHTTPHeaderFields.setValueForKey(value, field);
  },
  
  /**
    @param {VN.String} value
    @param {VN.String} field
  */
  addValueForHTTPHeaderField: function(value, field) {
    this.allHTTPHeaderFields.setValueForKey(value, field);
  },
  
  /**
    @type VN.String
  */
  HTTPBody: null
});

/**
  @param {VN.URL} URL
  @returns {VN.URLRequest}
*/
VN.URLRequest.requestWithURL = function(URL) {
  return this.create('initWithURL', URL);
};

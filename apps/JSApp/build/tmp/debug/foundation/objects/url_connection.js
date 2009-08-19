/* 
 * url_connection.js
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
  @class VN.URLConnection
  @extends VN.Object
*/
VN.URLConnection = VN.Object.extend({
  
  /**
    @param {VN.URLRequest} request
    @param {VN.Object} delegate
    @param {Boolean} startImmediately
    @returns {VN.URLConnection}
  */
  initWithRequest: function(request, delegate, startImmediately) {
    this.request = request;
    this.delegate = delegate;
    if (startImmediately) this.start() ;
    return this;
  },
  
  /**
    @type VN.URLRequest
  */
  request: null,
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    @type XMLHttpRequest or MS* equivalent
  */
  rawHttpRequest: null,
  
  /**
    Start the request
  */
  start: function() {
    if (!this.rawHttpRequest) {
      var theRequest = this.rawHttpRequest = new XMLHttpRequest() ;
      theRequest.open(this.request.valueForKey('HTTPMethod'),
                              this.request.valueForKey('URL'),
                              true) ;
      
      theRequest.onreadystatechange = function(event) {
        console.log(theRequest.readyState) ;
        if (theRequest.readyState == 4) {
          if (theRequest.status == 200)
            console.log('success: ' + theRequest.responseText) ;
          else
            console.log('error! ' + theRequest.status + ' ' + theRequest.responseText) ;
        }
      };
                              
      this.rawHttpRequest.send(null);
    }
  },
  
  /**
    Cancel the request
  */
  cancel: function() {
    
  }
});

VN.URLConnection.connectionWithRequest = function(request, delegate, startImmediately) {
  return this.create('initWithRequest', request, delegate, startImmediately) ;
}


/**
  @protocol VN.URLConnectionDelegate
*/
VN.URLConnectionDelegate = VN.protocol({
  
  /**
    @optional
    @param {VN.URLConnection} connection
    @param {VN.URLResponse} response
  */
  connectionDidReceiveResponse: function(connection, response) {
  },
  
  /**
    @optional
    @param {VN.URLConnection} connection
    @param {VN.String} data
  */
  connectionDidReceiveData: function(connection, data) {
  },
  
  /**
    @optional
    @param {VN.URLConnection} connection
  */
  connectionDidFinishLoading: function(connection) {
  },
  
  /**
    @optional
    @param {VN.URLConnection} connection
    @param {VN.Error} error
  */
  connectionDidFailWithError: function(connection, error) {
  }
});

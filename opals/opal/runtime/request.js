var try_request = null;
// native xml http request
var native_request = (function() {
  try {
    try_request = new XMLHttpRequest();
    return function() {
      return new XMLHttpRequest();
    };
  }
  catch (e) {
    try {
      try_request = new ActiveXObject('MSXML2.XMLHTTP');
      return function() {
        return new ActiveXObject('MSXML2.XMLHTTP');
      };
    }
    catch (e) {
      try {
        try_request = new ActiveXObject('Microsoft.XMLHTTP');
        return function() {
          return new ActiveXObject('Microsoft.XMLHTTP');
        };
      }
      catch (e) {
        return function() {
          console.log("cannot create a native XMLHttpRequest");
        }
      }
    }
  }
})();

var OpalRequest = function() {
  this._request = new native_request();
};

OpalRequest.prototype.open = function(method, url, async, user, pass) {
  return this._request.open(method, url, async, user, pass);
};

OpalRequest.prototype.send = function(body) {
  return this._request.send(body);
};

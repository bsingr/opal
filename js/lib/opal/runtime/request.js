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
  this._event_listeners = {};
};

OpalRequest.prototype.add_event_listener = function(name, callback) {
  if (!this._event_listeners.hasOwnProperty(name)) {
    this._event_listeners[name] = [];
  }
  this._event_listeners[name].push(callback);
};

OpalRequest.prototype.dispatch_event = function(name) {
  console.log("dispatching event " + name);
  var listeners = this._event_listeners[name];
  
  if (listeners) {
    for (var i = 0; i < listeners.length; i++) {
      console.log("callback " + i);
      listeners[i](this);
    }
  }
};

OpalRequest.prototype.open = function(method, url, async, user, pass) {
  return this._request.open(method, url, async, user, pass);
};

OpalRequest.prototype.send = function(body) {
  var self = this;
  this._request.onreadystatechange = function() {
    self.state_changed();
  };
  return this._request.send(body);
};

OpalRequest.prototype.is_success = function() {
  var s = this.status();
  
  return ((s >= 200 && s < 300) || (s == 0 && this.responseText() && this.responseText() !== ""));
};

OpalRequest.prototype.responseText = function() {
  return this._request.responseText;
};

OpalRequest.prototype.status = function() {
  try {
    return this._request.status || 0;
  }
  catch (e) {
    return 0;
  }
};

OpalRequest.prototype.state_changed = function() {
  var request = this._request;
  
  if (request.readyState == 4) {
    this.dispatch_event(this.is_success() ? 'success' : 'failure');
  }
};

OpalRequest.file = function(uri, success, failure) {
  var request = new OpalRequest();
  
  request.add_event_listener('success', success);
  
  request.add_event_listener('failure', failure);
  
  request.open("GET", uri.to_s(), true);
  request.send("");
};

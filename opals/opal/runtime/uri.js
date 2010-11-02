

var OpalURI = function(uri) {
  if (!uri) uri = "";
  
  this._uri = uri;
  
  return this;
};

// regexp for matching uri
var URI_RegExp = new RegExp("^(?:([^:/?#]+):)?(?://((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?))?((((?:[^?#/]*/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)");


OpalURI.prototype.toString = function() {
  return "#<OpalURI \"" + this._uri + "\">";
};

OpalURI.prototype.route_to = function(other) {
  
};

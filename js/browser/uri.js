
// regexp for matching uri. will match as:
// 
// [
//  url,
//  scheme,
//  ..,
//  userinfo,
//  user,
//  password,
//  domain,
//  port,
//  ..
//  path,
//  ..,
//  ..,
//  query,
//  fragment
// ]
var URI_REGEXP = new RegExp("^(?:([^:/?#]+):)?(?://((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?))?((((?:[^?#/]*/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)");

var OpalURI = function(scheme, userinfo, host, port, registry, path, opaque, query, fragment) {
  this.scheme = scheme;
  this.user = userinfo.substr(0, userinfo.indexOf(':'));
  this.password = userinfo.substr(userinfo.indexOf(':') + 1);
  this.host = host;
  this.port = port;
  this.registry = registry;
  this.path = path;
  this.query = query;
  this.opaque = opaque;
  this.fragment = fragment;
  
  return this;
};

// parse the given uri string into a URI
OpalURI.parse = function(uri_str) {
  // console.log("parsing " + uri_str);
  // console.log(URI_RegExp.exec(uri_str));
  var res = URI_REGEXP.exec(uri_str);
  return new OpalURI( res[1] || "",       // scheme 
                      res[3] || "",       // userinfo
                      res[6] || "",       // host
                      res[7] || "",       // port
                      "",                 // registry
                      res[9],             // path
                      "",                 // opaque
                      res[12] || "",      // query
                      res[13] || ""       // fragment
                      ); 
};

OpalURI.prototype.toString = function() {
  return "#<OpalURI \"" + this.to_s() + "\">";
};

// to_s
OpalURI.prototype.to_s = function() {
  var str = [''];
  if (this.scheme) {
    str.push(this.scheme);
    str.push(':');
  }
  
  if (this.opaque) {
    // false
  }
  else {
    str.push('//');
    if (this.host) {
      str.push(this.host);
    }
    if (this.path) {
      str.push(this.path);
    }
  }
  return str.join("");
};

// duplicate
OpalURI.prototype.dup = function() {
  return new OpalURI(this.scheme, this.user + ':' + this.password, this.host, this.port, this.registry, this.path, this.opaque, this.query, this.fragment);
};

// ,merge other (String, URI)
OpalURI.prototype.merge = function(other) {
  if (typeof other == 'string') other = OpalURI.parse(other);
  
  var base = this.dup(), rel = other;
  
  base.path = this.merge_path(base.path, rel.path);
  
  return base;
};

// is uri absolute?
OpalURI.prototype.is_absolute = function() {
  return this.scheme ? true : false;
};

// is uri relative?
OpalURI.prototype.is_relative = function() {
  return !this.is_absolute();
};

OpalURI.prototype.extension = function() {
  var idx = this.path.lastIndexOf('.');
  return idx == -1 ? '' : this.path.substr(idx + 1);
};

OpalURI.prototype.merge_path = function(base, rel) {
  base = base.split('/');
  rel = rel.split('/');
  
  // console.log("starting witrh:");
  // console.log(base);
  // console.log(rel);
  
  if (base[base.length - 1] == '..') base.push('');
  
  // need to remove all '..' from base here.
  // todo.
  
  // if first in rel is empty, then rel began with a '/', so we need to redo
  // base completely (/x/y/z merged into /a/b/c simply becomes /x/y/z)
  if (rel[0] && rel[0] == '') {
    base = [];
    rel.shift();
  }
  
  if (rel[rel.length - 1] == '.' || rel[rel.length - 1] == '..') {
    rel.push('');
  }
  
  // remove all '.' from rel
  for (var i = 0; i < rel.length; i++) {
    if (rel[i] == '.') {
      rel.splice(i, 1);
      i--;
    }
  }
  
  var working = [];
  for (var i = 0; i < rel.length; i++) {
    if (rel[i] == '..') {
      if (working.length) working.pop();
    }
    else {
      working.push(rel[i]);
    }
  }
  
  var add_trailer = working.length > 0;
  
  // if base is empty
  if (base.length == 0) {
    base.push('');
  }
  else if (add_trailer) {
    // if we have a working, then remove one off base
    base.pop();
  }
  
  // add all from working
  if (working.length > 0) {
    add_trailer = false;
  }
  
  for (var i = 0; i < working.length; i++) {
    base.push(working[i]);
  }
  
  if (add_trailer) base.push('');
  
  // console.log("base and rel:");
  // console.log(base);
  // console.log(rel);
  // console.log(working);
  
  return base.join("/");
};

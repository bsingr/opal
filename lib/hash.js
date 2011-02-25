var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;






$class(self, nil, "Hash", function() {var self = this;  








  $def(self, "values", function() {var self = this;    
    var result = [], length = self.$keys.length;

    for (var i = 0; i < length; i++) {
      result.push(self.$assocs[self.$keys[i].$hash()]);
    }

    return result;
  }, 0);  









  $def(self, "inspect", function() {var self = this;    
    var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push(key.m$inspect() + '=>' + value.m$inspect());
    }

    return '{' + description.join(', ') + '}';
  }, 0);  




  $def(self, "to_s", function() {var self = this;    
    var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push(key.m$inspect() + value.m$inspect());
    }

    return description.join('');
  }, 0);  











  $def(self, "each", function() {var self = this;    
    var keys = self.$keys, values = self.$assocs, length = keys.length, key;

    for (var i = 0; i < length; i++) {
      try {
        key = keys[i];
        __block__.call(__block__.$self);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;
  }, 0);  














  $def(self, "assoc", function(obj) {var self = this;    
    var key, keys = self.$keys, length = keys.length;

    for (var i = 0; i < length; i++) {
      key = keys[i];
      if (key["m$=="](self.m$obj()).$r) {
        return [key, self.$assocs[key.$hash()]];
      }
    }

    return nil;
  }, 0);  


















  $def(self, "==", function(other) {var self = this;    
    if (self === other) return Qtrue;
    if (!other.$keys || !other.$assocs) return Qfalse;
    if (self.$keys.length != other.$keys.length) return Qfalse;

    for (var i = 0; i < self.$keys.length; i++) {
      var key1 = self.$keys[i], assoc1 = key1.$hash();

      if (!other.$assocs.hasOwnProperty(assoc1))
        return Qfalse;

      var assoc2 = other.$assocs[assoc1];

      if (!self.$assocs[assoc1]["m$=="](assoc2).$r)
        return Qfalse;
    }

    return Qtrue;
  }, 0);  














  $def(self, "[]", function(key) {var self = this;    
    var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc))
      return self.$assocs[assoc];

    return self.$default;
  }, 0);  
















  $def(self, "[]=", function(key, value) {var self = this;    
    var assoc = key.$hash();

    if (!self.$assocs.hasOwnProperty(assoc))
      self.$keys.push(key);

    return self.$assocs[assoc] = value;
  }, 0);  










  $def(self, "clear", function() {var self = this;    
    self.$keys = [];
    self.$assocs = {};
    
    return self;
  }, 0);  


  $def(self, "default", function() {var self = this;    
    return self.$default;
  }, 0);  





  $def(self, "default=", function(obj) {var self = this;    
    return self.$default = obj;
  }, 0);  
















  $def(self, "delete", function(key) {var self = this;    
    var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc)) {
      var ret = self.$assocs[assoc];
      delete self.$assocs[assoc];
      self.$keys.splice(self.$keys.indexOf(key), 1);
      return ret;
    }

    return self.$default;
  }, 0);  











  $def(self, "delete_if", function() {var self = this;    
    var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        key = self.$keys[i];
        value = self.$assocs[key.$hash()];

        if (__block__.call(__block__.$self).$r) {
          delete self.$assocs[key.$hash()];
          self.$keys.splice(i, 1);
          i--;
        }
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;
  }, 0);  












  $def(self, "each_key", function() {var self = this;    
    var key;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        key = self.$keys[i];
        __block__.call(__block__.$self);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;
  }, 0);  












  $def(self, "each_value", function() {var self = this;    
    var val;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        val = self.$assocs[self.$keys[i].$hash()];
        __block__.call(__block__.$self);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;
  }, 0);  









  $def(self, "empty?", function() {var self = this;    
    return self.$keys.length == 0 ? Qtrue : Qfalse;
  }, 0);  

















  $def(self, "fetch", function(key, defaults) {var self = this;    
    var value = self.$assocs[key.$hash()];

    if (value != undefined)
      return value;
    else if (defaults == undefined)
      rb_raise('KeyError: key not found');
    else
      return defaults;
  }, 0);  

















  $def(self, "flatten", function(level) {var self = this;    
    var result = [], key, value;
    
    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push(key);

      if (value instanceof Array) {
        if (level == 1) {
          result.push(value);
        } else {
          var tmp = value.m$flatten(level - 1);
          result = result.concat(tmp);
        }
      } else {
        result.push(value);
      }
    }

    return result;
  }, 0);  













  $def(self, "has_key?", function(key) {var self = this;    
    if (self.$assocs.hasOwnProperty(key.$hash()))
      return Qtrue;

    return Qfalse;
  }, 0);  













  $def(self, "has_value?", function(value) {var self = this;    
    var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if (value["m$=="](val).$r)
        return Qtrue;
    }

    return Qfalse;
  }, 0);  











  $def(self, "replace", function(other) {var self = this;    
    self.$keys = []; self.$assocs = {};

    for (var i = 0; i < other.$keys.length; i++) {
      var key = other.$keys[i];
      var val = other.$assocs[key.$hash()];
      self.$keys.push(key);
      self.$assocs[key.$hash()] = val;
    }

    return self;
  }, 0);  











  $def(self, "invert", function() {var self = this;    return nil;

  }, 0);  













  $def(self, "key", function(value) {var self = this;    
    var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if (value["m$=="](val).$r) {
        return key;
      }
    }

    return nil;
  }, 0);  











  $def(self, "keys", function() {var self = this;    
    return self.$keys.slice(0);
  }, 0);  










  $def(self, "length", function() {var self = this;    
    return self.$keys.length;
  }, 0);  


















  $def(self, "merge", function(other) {var self = this;    
    var result = $opal.H() , key, val;
    
    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i], val = self.$assocs[key.$hash()];

      result.$keys.push(key);
      result.$assocs[key.$hash()] = val;
    }
  
    for (var i = 0; i < other.$keys.length; i++) {
      key = other.$keys[i], val = other.$assocs[key.$hash()];

      if (!result.$assocs.hasOwnProperty(key.$hash())) {
        result.$keys.push(key);
      }

      result.$assocs[key.$hash()] = val;
    }

    return result;
  }, 0);  















  $def(self, "merge!", function(other) {var self = this;    
    var key, val;

    for (var i = 0; i < other.$keys.length; i++) {
      key = other.$keys[i];
      val = other.$assocs[key.$hash()];

      if (!self.$assocs.hasOwnProperty(key.$hash())) {
        self.$keys.push(key);
      }

      self.$assocs[key.$hash()] = val;
    }

    return self;
  }, 0);  














  $def(self, "rassoc", function(obj) {var self = this;    
    var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if (val["m$=="](self.m$obj()).$r)
        return [key, val];
    }

    return nil;
  }, 0);  















  $def(self, "shift", function() {var self = this;    
    var key, val;

    if (self.$keys.length > 0) {
      key = self.$keys[0];
      val = self.$assocs[key.$hash()];

      self.$keys.shift();
      delete self.$assocs[key.$hash()];
      return [key, val];
    }

    return self.$default;
  }, 0);  










  $def(self, "to_a", function() {var self = this;    
    var result = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push([key, value]);
    }

    return result;
  }, 0);  




  $def(self, "to_hash", function() {var self = this;    
    return self;
  }, 0);
}, 0);
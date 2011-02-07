(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['inspect', '==', 'flatten']);
return ($class(self, nil, "Hash", function(self) {
return ($def(self, "values", function(self) {
var result = [], length = self.$keys.length;

    for (var i = 0; i < length; i++) {
      result.push(self.$assocs[self.$keys[i].$hash()]);
    }

    return result;}, 0), $def(self, "inspect", function(self) {
var __a;
var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push((__a = key).$m.inspect(__a) + '=>' + (__a = value).$m.inspect(__a));
    }

    return '{' + description.join(', ') + '}';}, 0), $def(self, "to_s", function(self) {
var __a;
var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push((__a = key).$m.inspect(__a) + (__a = value).$m.inspect(__a));
    }

    return description.join('');}, 0), $def(self, "each", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var keys = self.$keys, values = self.$assocs, length = keys.length, key;

    for (var i = 0; i < length; i++) {
      try {
        key = keys[i];
        __block__(__block__.$self, key, values[key.$hash()]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "assoc", function(self, obj) {
var __a;
var key, keys = self.$keys, length = keys.length;

    for (var i = 0; i < length; i++) {
      key = keys[i];
      if ((__a = key).$m["=="](__a, obj).$r) {
        return [key, self.$assocs[key.$hash()]];
      }
    }

    return nil;}, 0), $def(self, "==", function(self, other) {
var __a;
if (self === other) return Qtrue;
    if (!other.$keys || !other.$assocs) return Qfalse;
    if (self.$keys.length != other.$keys.length) return Qfalse;

    for (var i = 0; i < self.$keys.length; i++) {
      var key1 = self.$keys[i], assoc1 = key1.$hash();

      if (!other.$assocs.hasOwnProperty(assoc1))
        return Qfalse;

      var assoc2 = other.$assocs[assoc1];

      if (!(__a = self.$assocs[assoc1]).$m["=="](__a, assoc2).$r)
        return Qfalse;
    }

    return Qtrue;}, 0), $def(self, "[]", function(self, key) {
var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc))
      return self.$assocs[assoc];

    return self.$default;}, 0), $def(self, "[]=", function(self, key, value) {
var assoc = key.$hash();

    if (!self.$assocs.hasOwnProperty(assoc))
      self.$keys.push(key);

    return self.$assocs[assoc] = value;}, 0), $def(self, "clear", function(self) {
self.$keys = [];
    self.$assocs = {};
    
    return self;}, 0), $def(self, "default", function(self) {
return self.$default;}, 0), $def(self, "default=", function(self, obj) {
return self.$default = obj;}, 0), $def(self, "delete", function(self, key) {
var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc)) {
      var ret = self.$assocs[assoc];
      delete self.$assocs[assoc];
      self.$keys.splice(self.$keys.indexOf(key), 1);
      return ret;
    }

    return self.$default;}, 0), $def(self, "delete_if", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        key = self.$keys[i];
        value = self.$assocs[key.$hash()];

        if (__block__(__block__.$self, key, value).$r) {
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

    return self;}, 0), $def(self, "each_key", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var key;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        key = self.$keys[i];
        __block__(__block__.$self, key);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "each_value", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var val;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        val = self.$assocs[self.$keys[i].$hash()];
        __block__(__block__.$self, val);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "empty?", function(self) {
return self.$keys.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "fetch", function(self, key, defaults) {
if (defaults === undefined) defaults = undefined;
var value = self.$assocs[key.$hash()];

    if (value != undefined)
      return value;
    else if (defaults == undefined)
      rb_raise('KeyError: key not found');
    else
      return defaults;}, 0), $def(self, "flatten", function(self, level) {
var __a;
if (level === undefined) level = 1;
var result = [], key, value;
    
    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push(key);

      if (value instanceof Array) {
        if (level == 1) {
          result.push(value);
        } else {
          var tmp = (__a = value).$m.flatten(__a, level - 1);
          result = result.concat(tmp);
        }
      } else {
        result.push(value);
      }
    }

    return result;}, 0), $def(self, "has_key?", function(self, key) {
if (self.$assocs.hasOwnProperty(key.$hash()))
      return Qtrue;

    return Qfalse;}, 0), $def(self, "has_value?", function(self, value) {
var __a;
var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = value).$m["=="](__a, val).$r)
        return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "replace", function(self, other) {
self.$keys = []; self.$assocs = {};

    for (var i = 0; i < other.$keys.length; i++) {
      var key = other.$keys[i];
      var val = other.$assocs[key.$hash()];
      self.$keys.push(key);
      self.$assocs[key.$hash()] = val;
    }

    return self;}, 0), $def(self, "invert", function(self) {
return (nil);}, 0), $def(self, "key", function(self, value) {
var __a;
var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = value).$m["=="](__a, val).$r) {
        return key;
      }
    }

    return nil;}, 0), $def(self, "keys", function(self) {
return self.$keys.slice(0);}, 0), $def(self, "length", function(self) {
return self.$keys.length;}, 0), $def(self, "merge", function(self, other) {
var result = opalhash() , key, val;
    
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

    return result;}, 0), $def(self, "merge!", function(self, other) {
var key, val;

    for (var i = 0; i < other.$keys.length; i++) {
      key = other.$keys[i];
      val = other.$assocs[key.$hash()];

      if (!self.$assocs.hasOwnProperty(key.$hash())) {
        self.$keys.push(key);
      }

      self.$assocs[key.$hash()] = val;
    }

    return self;}, 0), $def(self, "rassoc", function(self, obj) {
var __a;
var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = val).$m["=="](__a, obj).$r)
        return [key, val];
    }

    return nil;}, 0), $def(self, "shift", function(self) {
var key, val;

    if (self.$keys.length > 0) {
      key = self.$keys[0];
      val = self.$assocs[key.$hash()];

      self.$keys.shift();
      delete self.$assocs[key.$hash()];
      return [key, val];
    }

    return self.$default;}, 0), $def(self, "to_a", function(self) {
var result = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push([key, value]);
    }

    return result;}, 0), $def(self, "to_hash", function(self) {
return (self);}, 0));}, 0));})();
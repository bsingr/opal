(function(self) {self.$M(['inspect', '==', 'flatten']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Hash", function(self) {
return (rb_vm_defn(self, "values", function(self) {
var nil = Qnil;
var result = [], length = self.$keys.length;

    for (var i = 0; i < length; i++) {
      result.push(self.$assocs[self.$keys[i].$hash()]);
    }

    return result;}, 0), rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
var __a;
var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push((__a = key, __a.$m.inspect)(__a) + '=>' + (__a = value, __a.$m.inspect)(__a));
    }

    return '{' + description.join(', ') + '}';}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
var __a;
var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push((__a = key, __a.$m.inspect)(__a) + (__a = value, __a.$m.inspect)(__a));
    }

    return description.join('');}, 0), rb_vm_defn(self, "each", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var keys = self.$keys, values = self.$assocs, length = keys.length, key;

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

    return self;}, 0), rb_vm_defn(self, "assoc", function(self, obj) {
var nil = Qnil;
var __a;
var key, keys = self.$keys, length = keys.length;

    for (var i = 0; i < length; i++) {
      key = keys[i];
      if ((__a = key, __a.$m["=="])(__a, obj).$r) {
        return [key, self.$assocs[key.$hash()]];
      }
    }

    return nil;}, 0), rb_vm_defn(self, "==", function(self, other) {
var nil = Qnil;
var __a;
if (self === other) return Qtrue;
    if (!other.$keys || !other.$assocs) return Qfalse;
    if (self.$keys.length != other.$keys.length) return Qfalse;

    for (var i = 0; i < self.$keys.length; i++) {
      var key1 = self.$keys[i], assoc1 = key1.$hash();

      if (!other.$assocs.hasOwnProperty(assoc1))
        return Qfalse;

      var assoc2 = other.$assocs[assoc1];

      if (!(__a = self.$assocs[assoc1], __a.$m["=="])(__a, assoc2).$r)
        return Qfalse;
    }

    return Qtrue;}, 0), rb_vm_defn(self, "[]", function(self, key) {
var nil = Qnil;
var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc))
      return self.$assocs[assoc];

    return self.$default;}, 0), rb_vm_defn(self, "[]=", function(self, key, value) {
var nil = Qnil;
var assoc = key.$hash();

    if (!self.$assocs.hasOwnProperty(assoc))
      self.$keys.push(key);

    return self.$assocs[assoc] = value;}, 0), rb_vm_defn(self, "clear", function(self) {
var nil = Qnil;
self.$keys = [];
    self.$assocs = {};
    
    return self;}, 0), rb_vm_defn(self, "default", function(self) {
var nil = Qnil;
return self.$default;}, 0), rb_vm_defn(self, "default=", function(self, obj) {
var nil = Qnil;
return self.$default = obj;}, 0), rb_vm_defn(self, "delete", function(self, key) {
var nil = Qnil;
var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc)) {
      var ret = self.$assocs[assoc];
      delete self.$assocs[assoc];
      self.$keys.splice(self.$keys.indexOf(key), 1);
      return ret;
    }

    return self.$default;}, 0), rb_vm_defn(self, "delete_if", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var key, value;

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

    return self;}, 0), rb_vm_defn(self, "each_key", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var key;

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

    return self;}, 0), rb_vm_defn(self, "each_value", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var val;

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

    return self;}, 0), rb_vm_defn(self, "empty?", function(self) {
var nil = Qnil;
return self.$keys.length == 0 ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "fetch", function(self, key, defaults) {
var nil = Qnil;
if (defaults === undefined) defaults = undefined;
var value = self.$assocs[key.$hash()];

    if (value != undefined)
      return value;
    else if (defaults == undefined)
      rb_raise('KeyError: key not found');
    else
      return defaults;}, 0), rb_vm_defn(self, "flatten", function(self, level) {
var nil = Qnil;
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
          var tmp = (__a = value, __a.$m.flatten)(__a, level - 1);
          result = result.concat(tmp);
        }
      } else {
        result.push(value);
      }
    }

    return result;}, 0), rb_vm_defn(self, "has_key?", function(self, key) {
var nil = Qnil;
if (self.$assocs.hasOwnProperty(key.$hash()))
      return Qtrue;

    return Qfalse;}, 0), rb_vm_defn(self, "has_value?", function(self, value) {
var nil = Qnil;
var __a;
var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = value, __a.$m["=="])(__a, val).$r)
        return Qtrue;
    }

    return Qfalse;}, 0), rb_vm_defn(self, "replace", function(self, other) {
var nil = Qnil;
self.$keys = []; self.$assocs = {};

    for (var i = 0; i < other.$keys.length; i++) {
      var key = other.$keys[i];
      var val = other.$assocs[key.$hash()];
      self.$keys.push(key);
      self.$assocs[key.$hash()] = val;
    }

    return self;}, 0), rb_vm_defn(self, "invert", function(self) {
var nil = Qnil;
return (nil);}, 0), rb_vm_defn(self, "key", function(self, value) {
var nil = Qnil;
var __a;
var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = value, __a.$m["=="])(__a, val).$r) {
        return key;
      }
    }

    return nil;}, 0), rb_vm_defn(self, "keys", function(self) {
var nil = Qnil;
return self.$keys.slice(0);}, 0), rb_vm_defn(self, "length", function(self) {
var nil = Qnil;
return self.$keys.length;}, 0), rb_vm_defn(self, "merge", function(self, other) {
var nil = Qnil;
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

    return result;}, 0), rb_vm_defn(self, "merge!", function(self, other) {
var nil = Qnil;
var key, val;

    for (var i = 0; i < other.$keys.length; i++) {
      key = other.$keys[i];
      val = other.$assocs[key.$hash()];

      if (!self.$assocs.hasOwnProperty(key.$hash())) {
        self.$keys.push(key);
      }

      self.$assocs[key.$hash()] = val;
    }

    return self;}, 0), rb_vm_defn(self, "rassoc", function(self, obj) {
var nil = Qnil;
var __a;
var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = val, __a.$m["=="])(__a, obj).$r)
        return [key, val];
    }

    return nil;}, 0), rb_vm_defn(self, "shift", function(self) {
var nil = Qnil;
var key, val;

    if (self.$keys.length > 0) {
      key = self.$keys[0];
      val = self.$assocs[key.$hash()];

      self.$keys.shift();
      delete self.$assocs[key.$hash()];
      return [key, val];
    }

    return self.$default;}, 0), rb_vm_defn(self, "to_a", function(self) {
var nil = Qnil;
var result = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push([key, value]);
    }

    return result;}, 0), rb_vm_defn(self, "to_hash", function(self) {
var nil = Qnil;
return (self);}, 0));}, 0));})(rb_top_self);